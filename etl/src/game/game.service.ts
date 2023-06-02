import { Injectable } from '@nestjs/common';
import { LoadGameDto } from './dto/load-game.dto';
import { NhlService } from 'src/nhl/nhl.service';
import { isEmpty } from 'lodash';
import { PlayerGameDto, TeamDto } from 'src/nhl/dto/game.dto';

@Injectable()
export class GameService {
  constructor(private readonly nhlService: NhlService) {}

  async load({ gameId }: LoadGameDto) {
    const game = await this.nhlService.getGame(gameId);

    if (!game) {
      throw `game with id (${gameId}) not found`;
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
            player: {
              id: player.person.id,
              name: player.person.fullName,
              number: playerInfo.primaryNumber,
              position: playerInfo.primaryPosition,
            },
            team: {
              id: playerInfo.currentTeam.id,
              name: playerInfo.currentTeam.name,
            },
            playerAge: playerInfo.currentAge,
            playerNumber: playerInfo.primaryNumber,
            playerPosition: playerInfo.primaryPosition,
            assists: playerStats.assists,
            goals: playerStats.goals,
            hits: playerStats.hits ?? 0,
            points: playerStats.assists + playerStats.goals, // https://en.wikipedia.org/wiki/Point_(ice_hockey)
            penaltyMinutes: playerStats.penaltyMinutes ?? 0,
            opponentTeam: {
              id: opponentTeam.id,
              name: opponentTeam.name,
            },
          };
        });

    const homePlayerStats = extractPlayersStats(homePlayers, awayTeam);
    const awayPlayerStats = extractPlayersStats(awayPlayers, homeTeam);

    const allPlayerStats = [...homePlayerStats, awayPlayerStats];

    console.log('Home player stats', JSON.stringify(homePlayerStats));
    console.log('Away player stats', JSON.stringify(awayPlayerStats));
    console.log('All player stats', JSON.stringify(allPlayerStats));

    return game;
  }
}
