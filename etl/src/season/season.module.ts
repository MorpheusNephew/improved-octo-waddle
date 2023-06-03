import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { NhlService } from 'src/nhl/nhl.service';
import { GameService } from 'src/game/game.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerGameStat } from 'src/game/models/playerGameStat.model';

@Module({
  imports: [SequelizeModule.forFeature([PlayerGameStat])],
  controllers: [SeasonController],
  providers: [SeasonService, NhlService, GameService],
})
export class SeasonModule {}
