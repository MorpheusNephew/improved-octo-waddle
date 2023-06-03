import { Injectable } from '@nestjs/common';
import { LoadSeasonDto } from './dto/load-season.dto';
import { NhlService } from 'src/nhl/nhl.service';
import { GameService } from 'src/game/game.service';

@Injectable()
export class SeasonService {
  constructor(
    private readonly nhlService: NhlService,
    private readonly gameService: GameService,
  ) {}

  async load({ seasonId }: LoadSeasonDto) {
    const season = await this.nhlService.getSeason(seasonId);

    await Promise.all(
      season.dates.map(
        async (date) =>
          await Promise.all(
            date.games.map((game) =>
              this.gameService.load({ gameId: game.gamePk }),
            ),
          ),
      ),
    );

    return season;
  }
}
