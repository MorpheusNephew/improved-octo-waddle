import { Injectable, Logger } from '@nestjs/common';
import { NhlService } from '../nhl/nhl.service';
import { isEmpty } from 'lodash';
import {
  AbstractGameState,
  PlayersBoxscore,
  TeamDto,
} from '../nhl/dto/game.dto';
import { PlayerGameStat } from './models/playerGameStat.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GameService {
  private readonly logger = new Logger('GameService', { timestamp: true });

  constructor(
    private readonly nhlService: NhlService,
    @InjectModel(PlayerGameStat)
    private readonly playerGameStatModel: typeof PlayerGameStat,
  ) {}

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

        this.logger.log({ allPlayerStats, homePlayerStats, awayPlayerStats });

        const createResult = await this.playerGameStatModel.bulkCreate(
          allPlayerStats,
          {
            updateOnDuplicate: [
              'assists',
              'goals',
              'hits',
              'points',
              'penaltyMinutes',
            ],
          },
        );

        this.logger.log({ createResult });
      } catch (error) {
        this.logger.error('There was an error saving player stats', {
          error,
          gameId,
          homePlayers,
          homeTeam,
          awayPlayers,
          awayTeam,
        });

        gameStatus = 'Final';
      }
    } while (gameStatus === 'Live');
  }
}
