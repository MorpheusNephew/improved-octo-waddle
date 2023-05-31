import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { NhlService } from 'src/nhl/nhl.service';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService, NhlService],
})
export class SeasonModule {}
