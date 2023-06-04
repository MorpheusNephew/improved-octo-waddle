import { Injectable } from '@nestjs/common';
import { NhlService } from 'src/nhl/nhl.service';
import { isEmpty } from 'lodash';
import {
  AbstractGameState,
  PlayersBoxscore,
  TeamDto,
} from 'src/nhl/dto/game.dto';
import { PlayerGameStat } from './models/playerGameStat.model';
import { InjectModel } from '@nestjs/sequelize';
import { Logger, createLogger, transports } from 'winston';

@Injectable()
export class GameService {
  private readonly logger: Logger;

  constructor(
    private readonly nhlService: NhlService,
    @InjectModel(PlayerGameStat)
    private readonly playerGameStatModel: typeof PlayerGameStat,
  ) {
    this.logger = createLogger({
      transports: [
        new transports.File({
          level: 'error',
          handleRejections: true,
          handleExceptions: true,
          filename: `logs/errors/${new Date().toISOString()}-etl.log`,
        }),
        new transports.File({
          level: 'info',
          filename: `logs/info/${new Date().toISOString()}-etl.log`,
        }),
      ],
    });
  }

  async load(gameId: number) {
    let gameStatus: AbstractGameState;

    do {
      const game = await this.nhlService.getGame(gameId);
      gameStatus = game.gameData.status.abstractGameState;

      if (gameStatus === 'Preview') {
        return;
      }

      const {
        gameData: {
          teams: { home: homeTeam, away: awayTeam },
          players: allPlayers,
        },
        liveData: {
          boxscore: {
            teams: {
              home: { players: homePlayers },
              away: { players: awayPlayers },
            },
          },
        },
      } = game;

      const extractPlayersStats = (
        playersInfo: PlayersBoxscore,
        team: TeamDto,
        opponentTeam: TeamDto,
      ) =>
        Object.entries(playersInfo)
          .filter((playerInfo) => !isEmpty(playerInfo))
          .filter(([_id, player]) => !isEmpty(player.stats))
          .map(([id, player]) => {
            const playerInfo = allPlayers[id];
            const playerStats =
              player.stats.skaterStats ?? player.stats.goalieStats;

            return {
              gameId,
              playerId: player.person.id,
              playerName: player.person.fullName,
              teamId: team.id,
              teamName: team.name,
              playerAge: playerInfo.currentAge,
              playerNumber: playerInfo.primaryNumber,
              playerPosition: player.position.name,
              assists: playerStats.assists,
              goals: playerStats.goals,
              hits: playerStats.hits,
              points: playerStats.assists + playerStats.goals, // https://en.wikipedia.org/wiki/Point_(ice_hockey)
              penaltyMinutes: playerStats.penaltyMinutes,
              opponentTeamName: opponentTeam.name,
              opponentTeamId: opponentTeam.id,
            };
          });

      if (isEmpty(allPlayers)) {
        return;
      }

      try {
        const homePlayerStats = extractPlayersStats(
          homePlayers,
          homeTeam,
          awayTeam,
        );
        const awayPlayerStats = extractPlayersStats(
          awayPlayers,
          awayTeam,
          homeTeam,
        );

        const allPlayerStats = [...homePlayerStats, ...awayPlayerStats];

        this.logger.info({ allPlayerStats, homePlayerStats, awayPlayerStats });

        const createResult = await this.playerGameStatModel.bulkCreate(
          allPlayerStats,
          {
            ignoreDuplicates: true,
          },
        );

        this.logger.info({ createResult });
      } catch (currentError) {
        this.logger.error({
          currentError,
          gameId,
          homePlayers,
          homeTeam,
          awayPlayers,
          awayTeam,
        });

        // Not sure if I want to do this yet
        gameStatus = 'Final';
      }
    } while (gameStatus === 'Live');
  }
}
