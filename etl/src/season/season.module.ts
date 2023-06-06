import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { GameModule } from '../game/game.module';

@Module({
  imports: [GameModule],
  exports: [GameModule, SeasonService],
  providers: [SeasonService],
})
export class SeasonModule {}
