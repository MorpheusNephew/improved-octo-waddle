import { Inject, Injectable } from '@nestjs/common';
import { LoadPlayersStatsInput } from './dto/load-players-stats.input';
import { InjectModel } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { QueryPlayerStatsInput } from './dto/query-player-stats.input';
import { PlayerStats } from './entities/player-stats.entity';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

@Injectable()
export class PlayerStatsService {
  constructor(
    @InjectModel(PlayerGameStat)
    private readonly playerGameStatModel: typeof PlayerGameStat,
    @Inject('INGEST_SERVICE') private readonly client: ClientProxy,
  ) {}

  load({ gameId, seasonId }: LoadPlayersStatsInput) {
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
