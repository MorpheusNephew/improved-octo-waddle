import { Injectable } from '@nestjs/common';
import { LoadGameDto } from './dto/load-game.dto';
import { NhlService } from 'src/nhl/nhl.service';
import { isEmpty } from 'lodash';
import { PlayerGameDto, TeamDto } from 'src/nhl/dto/game.dto';
import { PlayerGameStat } from './models/playerGameStat.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GameService {
  constructor(
    private readonly nhlService: NhlService,
    @InjectModel(PlayerGameStat)
    private readonly playerGameStatModel: typeof PlayerGameStat,
  ) {}

  async load({ gameId }: LoadGameDto) {
    const game = await this.nhlService.getGame(gameId);

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
      playersInfo: Record<string, PlayerGameDto>,
      opponentTeam: TeamDto,
    ) =>
      Object.entries(playersInfo)
        .filter(([_id, player]) => !isEmpty(player.stats))
        .map(([id, player]) => {
          const playerInfo = allPlayers[id];
          const playerStats =
            player.stats.skaterStats ?? player.stats.goalieStats;

          return {
            gameId,
            playerId: player.person.id,
            playerName: player.person.fullName,
            teamId: playerInfo.currentTeam.id,
            teamName: playerInfo.currentTeam.name,
            playerAge: playerInfo.currentAge,
            playerNumber: playerInfo.primaryNumber,
            playerPosition: playerInfo.primaryPosition.name,
            assists: playerStats.assists,
            goals: playerStats.goals,
            hits: playerStats.hits,
            points: playerStats.assists + playerStats.goals, // https://en.wikipedia.org/wiki/Point_(ice_hockey)
            penaltyMinutes: playerStats.penaltyMinutes,
            opponentTeamName: opponentTeam.name,
            opponentTeamId: opponentTeam.id,
          };
        });

    const homePlayerStats = extractPlayersStats(homePlayers, awayTeam);
    const awayPlayerStats = extractPlayersStats(awayPlayers, homeTeam);

    const allPlayerStats = [...homePlayerStats, ...awayPlayerStats];

    const results = await this.playerGameStatModel.bulkCreate(allPlayerStats, {
      ignoreDuplicates: true,
    });

    console.log(results);

    return game;
  }
}
