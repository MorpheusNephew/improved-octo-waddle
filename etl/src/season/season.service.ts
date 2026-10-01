import { Injectable } from '@nestjs/common';
import { NhlService } from '../nhl/nhl.service';
import { GameService } from '../game/game.service';
import pMap from 'p-map';

@Injectable()
export class SeasonService {
  constructor(
    private readonly nhlService: NhlService,
    private readonly gameService: GameService,
  ) {}

  async load(seasonId: string) {
    const season = await this.nhlService.getSeason(seasonId);

    if (!season || season.games.length < 1) {
      return;
    }

    const gameIds = [...new Set(season.games.map((game) => game.id))];
    const loadGamesMapper = async (gameId: number) =>
      await this.gameService.load(gameId);

    await pMap(gameIds, loadGamesMapper, { concurrency: 4 });
  }
}
