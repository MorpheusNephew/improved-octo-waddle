import { Inject, Injectable } from '@nestjs/common';
import { LoadPlayersStatsInput } from './dto/load-players-stats.input';
import { InjectModel } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { QueryPlayerStatsInput } from './dto/query-player-stats.input';
import { PlayerStats } from './entities/player-stats.entity';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { GraphQLError } from 'graphql';

@Injectable()
export class PlayerStatsService {
  constructor(
    @InjectModel(PlayerGameStat)
    private readonly playerGameStatModel: typeof PlayerGameStat,
    @Inject('INGEST_SERVICE') private readonly client: ClientProxy,
  ) {}

  loadPlayersStats({ gameId, seasonId }: LoadPlayersStatsInput) {
    if ((gameId && seasonId) || !(gameId && seasonId)) {
      throw new GraphQLError(
        'Invalid argument: must use either gameId or seasonId',
        { extensions: { code: 'BAD_USER_INPUT' } },
      );
    }

    const statusId = randomUUID();
    const type = gameId ? 'game' : 'season';
    const typeId = gameId ?? seasonId;

    const result = this.client.emit('load_players_stats', {
      type,
      typeId,
      statusId,
    });

    console.log({ result });

    return statusId;
  }

  async queryPlayerStats({
    gameId,
  }: QueryPlayerStatsInput): Promise<PlayerStats[]> {
    const result = (
      await this.playerGameStatModel.findAll({
        where: {
          gameId,
        },
      })
    ).map((playerGameStats) => playerGameStats.dataValues);

    return result;
  }
}
