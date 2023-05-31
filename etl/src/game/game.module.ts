import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { NhlService } from 'src/nhl/nhl.service';

@Module({
  controllers: [GameController],
  providers: [GameService, NhlService]
})
export class GameModule {}
