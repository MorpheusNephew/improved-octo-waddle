import { Module } from '@nestjs/common';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStatsResolver } from './player-stats.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    SequelizeModule.forFeature([PlayerGameStat]),
    ClientsModule.register([
      {
        name: 'INGEST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
          ],
          queue: process.env.RABBITMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [PlayerStatsResolver, PlayerStatsService],
})
export class PlayerStatsModule {}
