import { EventPattern } from '@nestjs/microservices';
import { SeasonService } from './season/season.service';
import { GameService } from './game/game.service';
import { PlayersStatsIngestRequestDto } from './dto/players-stats-ingest-request.dto';
import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly seasonService: SeasonService,
    private readonly gameService: GameService,
  ) {}

  @EventPattern('load_players_stats')
  async loadPlayersStats({ statusId, type, typeId }: PlayersStatsIngestRequestDto) {
    console.log({ statusId });

    if (type === 'game') {
      await this.gameService.load(typeId as number);
    } else if (type === 'season') {
      await this.seasonService.load(typeId as string);
    } else {
      throw new Error('Invalid type');
    }

    console.log('Finished running', { statusId });
  }
}
