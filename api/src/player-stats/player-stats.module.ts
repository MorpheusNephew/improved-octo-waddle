import { Module } from '@nestjs/common';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStatsResolver } from './player-stats.resolver';

@Module({
  providers: [PlayerStatsResolver, PlayerStatsService]
})
export class PlayerStatsModule {}
