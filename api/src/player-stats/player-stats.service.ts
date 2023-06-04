import { Inject, Injectable } from '@nestjs/common';
import { LoadPlayersStatsInput } from './dto/load-players-stats.input';
import { InjectModel } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { QueryPlayerStatsInput } from './dto/query-player-stats.input';
import { PlayerStats } from './entities/player-stats.entity';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { GraphQLError } from 'graphql';
import { Op } from 'sequelize';

@Injectable()
export class PlayerStatsService {
  constructor(
    @InjectModel(PlayerGameStat)
    private readonly playerGameStatModel: typeof PlayerGameStat,
    @Inject('INGEST_SERVICE') private readonly client: ClientProxy,
  ) {}

  loadPlayersStats({ gameId, seasonId }: LoadPlayersStatsInput) {
    if ((gameId && seasonId) || (!gameId && !seasonId)) {
      throw new GraphQLError(
        'Invalid argument: must use either gameId or seasonId',
        { extensions: { code: 'BAD_USER_INPUT' } },
      );
    }

    const statusId = randomUUID();
    const type = gameId ? 'game' : 'season';
    const typeId = gameId ?? seasonId;

    this.client.emit('load_players_stats', {
      type,
      typeId,
      statusId,
    });

    return statusId;
  }

  async queryPlayerStats(
    queryPlayerStatsInput: QueryPlayerStatsInput,
  ): Promise<PlayerStats[]> {
    const { options: { limit = undefined, offset = undefined } = {} } =
      queryPlayerStatsInput;

    const result = (
      await this.playerGameStatModel.findAll({
        where: this.generateWhereClause(queryPlayerStatsInput),
        limit,
        offset,
      })
    ).map((playerGameStats) => playerGameStats.dataValues);

    return result;
  }

  private generateWhereClause({
    gameIds,
    playerIds,
    playerNumbers,
    playerAge,
    playerAssists,
    playerGoals,
    playerHits,
    playerPoints,
  }: QueryPlayerStatsInput) {
    const clauseInputs: {
      data: any;
      column: string;
      operator?: boolean;
      key?: string;
    }[] = [
      { data: gameIds, column: 'gameId' },
      { data: playerIds, column: 'playerId' },
      { data: playerNumbers, column: 'playerNumber' },
      { data: playerAge, column: 'playerAge', operator: true, key: 'age' },
      {
        data: playerAssists,
        column: 'assists',
        operator: true,
        key: 'assists',
      },
      { data: playerGoals, column: 'goals', operator: true, key: 'assists' },
      { data: playerHits, column: 'hits', operator: true, key: 'hits' },
      { data: playerPoints, column: 'points', operator: true, key: 'points' },
    ];
    const whereClause: Record<any, any> = {};

    for (const clauseInput of clauseInputs) {
      if (!clauseInput.data) {
        continue;
      }

      if (clauseInput.operator) {
        whereClause[clauseInput.column] = {
          [Op[clauseInput.data.operator]]: clauseInput.data[clauseInput.key],
        };
      } else {
        whereClause[clauseInput.column] = {
          [Op.in]: clauseInput.data,
        };
      }
    }

    return whereClause;
  }
}
