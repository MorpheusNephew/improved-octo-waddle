import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { NhlService } from 'src/nhl/nhl.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';

@Module({
  imports: [SequelizeModule.forFeature([PlayerGameStat])],
  providers: [GameService, NhlService],
})
export class GameModule {}
