import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeasonModule } from './season/season.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [SeasonModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
