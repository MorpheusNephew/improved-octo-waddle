import { Injectable, Logger } from '@nestjs/common';
import { NhlService } from '../nhl/nhl.service';
import { isEmpty } from 'lodash';
import { GoalieStatsDto, SkaterStatsDto, TeamDto } from '../nhl/dto/game.dto';
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
    const game = await this.nhlService.getGame(gameId);

    if (!['LIVE', 'CRIT', 'FINAL', 'OFF'].includes(game.gameState)) {
      return;
    }

    const teamName = (team: TeamDto) =>
      `${team.placeName.default} ${team.commonName.default}`;
    const extractSkaterStats = (
      players: SkaterStatsDto[], team: TeamDto, opponentTeam: TeamDto,
    ) => players.map((player) => ({
      gameId,
      playerId: player.playerId,
      playerName: player.name.default,
      teamId: team.id,
      teamName: teamName(team),
      playerNumber: String(player.sweaterNumber),
      playerPosition: player.position,
      assists: player.assists,
      goals: player.goals,
      hits: player.hits ?? 0,
      points: player.assists + player.goals,
      penaltyMinutes: player.pim ?? 0,
      opponentTeamName: teamName(opponentTeam),
      opponentTeamId: opponentTeam.id,
    }));
    const extractGoalieStats = (
      players: GoalieStatsDto[], team: TeamDto, opponentTeam: TeamDto,
    ) => players.map((player) => ({
      gameId,
      playerId: player.playerId,
      playerName: player.name.default,
      teamId: team.id,
      teamName: teamName(team),
      playerNumber: String(player.sweaterNumber),
      playerPosition: player.position,
      assists: 0,
      goals: 0,
      hits: 0,
      points: 0,
      penaltyMinutes: player.pim ?? 0,
      opponentTeamName: teamName(opponentTeam),
      opponentTeamId: opponentTeam.id,
    }));

    const { homeTeam, awayTeam, playerByGameStats } = game;
    const homePlayerStats = [
      ...extractSkaterStats(playerByGameStats.homeTeam.forwards, homeTeam, awayTeam),
      ...extractSkaterStats(playerByGameStats.homeTeam.defense, homeTeam, awayTeam),
      ...extractGoalieStats(playerByGameStats.homeTeam.goalies, homeTeam, awayTeam),
    ];
    const awayPlayerStats = [
      ...extractSkaterStats(playerByGameStats.awayTeam.forwards, awayTeam, homeTeam),
      ...extractSkaterStats(playerByGameStats.awayTeam.defense, awayTeam, homeTeam),
      ...extractGoalieStats(playerByGameStats.awayTeam.goalies, awayTeam, homeTeam),
    ];
    const allPlayerStats = [...homePlayerStats, ...awayPlayerStats];

    if (isEmpty(allPlayerStats)) {
      return;
    }

    try {
      const createResult = await this.playerGameStatModel.bulkCreate(allPlayerStats, {
        updateOnDuplicate: ['assists', 'goals', 'hits', 'points', 'penaltyMinutes'],
      });
      this.logger.log({ gameId, playersSaved: createResult.length });
    } catch (error) {
      this.logger.error('There was an error saving player stats', { error, gameId });
    }
  }
}
