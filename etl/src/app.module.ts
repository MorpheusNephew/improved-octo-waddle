import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeasonModule } from './season/season.module';
import { GameModule } from './game/game.module';
import { NhlService } from './nhl/nhl.service';

@Module({
  imports: [SeasonModule, GameModule],
  controllers: [AppController],
  providers: [AppService, NhlService],
})
export class AppModule {}
