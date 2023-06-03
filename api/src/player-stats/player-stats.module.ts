import { Module } from '@nestjs/common';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStatsResolver } from './player-stats.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';

@Module({
  imports: [SequelizeModule.forFeature([PlayerGameStat])],
  providers: [PlayerStatsResolver, PlayerStatsService],
})
export class PlayerStatsModule {}
