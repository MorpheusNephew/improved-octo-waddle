import { Injectable } from '@nestjs/common';
import { NhlService } from '../nhl/nhl.service';
import { GameService } from '../game/game.service';
import * as pMap from 'p-map';

@Injectable()
export class SeasonService {
  constructor(
    private readonly nhlService: NhlService,
    private readonly gameService: GameService,
  ) {}

  async load(seasonId: string) {
    const season = await this.nhlService.getSeason(seasonId);

    if (!season || season.dates.length < 1) {
      return;
    }

    const loadGamesMapper = async (game: { gamePk: number }) =>
      await this.gameService.load(game.gamePk);

    const getGamesForDateMapper = async (date: {
      games: { gamePk: number }[];
    }) => await pMap(date.games, loadGamesMapper);

    await pMap(season.dates, getGamesForDateMapper);
  }
}
