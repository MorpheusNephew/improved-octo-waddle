import { Injectable } from '@nestjs/common';
import { CreatePlayerStatInput } from './dto/create-player-stat.input';
import { InjectModel } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { QueryPlayerStatsInput } from './dto/query-player-stats.input';
import { PlayerStats } from './entities/player-stat.entity';

@Injectable()
export class PlayerStatsService {
  constructor(
    @InjectModel(PlayerGameStat)
    private readonly playerGameStatModel: typeof PlayerGameStat,
  ) {}

  load(createPlayerStatInput: CreatePlayerStatInput) {
    return 'This action adds a new playerStat';
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
