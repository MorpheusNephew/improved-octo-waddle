import { Injectable } from '@nestjs/common';
import { NhlService } from 'src/nhl/nhl.service';
import { GameService } from 'src/game/game.service';
import * as pMap from 'p-map';

@Injectable()
export class SeasonService {
  constructor(
    private readonly nhlService: NhlService,
    private readonly gameService: GameService,
  ) {}

  async load(seasonId: string) {
    const season = await this.nhlService.getSeason(seasonId);

    const loadGamesMapper = async (game: { gamePk: number }) =>
      await this.gameService.load(game.gamePk);

    const getGamesForDateMapper = async (date: {
      games: { gamePk: number }[];
    }) => await pMap(date.games, loadGamesMapper);

    await pMap(season.dates, getGamesForDateMapper);

    return season;
  }
}
