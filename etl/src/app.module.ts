import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeasonModule } from './season/season.module';

@Module({
  imports: [SeasonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
