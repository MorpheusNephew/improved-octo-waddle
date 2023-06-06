import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { NhlModule } from '../nhl/nhl.module';

@Module({
  imports: [SequelizeModule.forFeature([PlayerGameStat]), NhlModule],
  exports: [
    SequelizeModule.forFeature([PlayerGameStat]),
    GameService,
    NhlModule,
  ],
  providers: [GameService],
})
export class GameModule {}
