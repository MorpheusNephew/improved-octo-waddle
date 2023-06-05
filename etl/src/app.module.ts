import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SeasonModule } from './season/season.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { PlayerGameStat } from './game/models/playerGameStat.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    SeasonModule,
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
  providers: [],
})
export class AppModule {}
