import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SeasonModule } from './season/season.module';
import { GameModule } from './game/game.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { GameService } from './game/game.service';
import { SeasonService } from './season/season.service';
import { NhlService } from './nhl/nhl.service';
import { PlayerGameStat } from './game/models/playerGameStat.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    SeasonModule,
    GameModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT
        ? parseInt(process.env.POSTGRES_PORT)
        : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([PlayerGameStat]),
  ],
  controllers: [AppController],
  providers: [GameService, SeasonService, NhlService],
})
export class AppModule {}
