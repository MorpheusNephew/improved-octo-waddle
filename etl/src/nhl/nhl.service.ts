import { HttpException, Injectable } from '@nestjs/common';
import { SeasonDto, GameDto } from './dto';
import axiosRetry from 'axios-retry';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

const BASE_TEAMS = [
  'ANA', 'BOS', 'BUF', 'CAR', 'CBJ', 'CGY', 'CHI', 'COL', 'DAL', 'DET',
  'EDM', 'FLA', 'LAK', 'MIN', 'MTL', 'NJD', 'NSH', 'NYI', 'NYR', 'OTT',
  'PHI', 'PIT', 'SJS', 'STL', 'TBL', 'TOR', 'VAN', 'WPG', 'WSH',
];

@Injectable()
export class NhlService {
  constructor(private readonly httpService: HttpService) {
    axiosRetry(httpService.axiosRef, { retries: 3 });
  }

  async getSeason(seasonId: string): Promise<SeasonDto> {
    const startYear = Number.parseInt(seasonId.slice(0, 4), 10);
    const teams = [
      ...BASE_TEAMS,
      startYear >= 2024 ? 'UTA' : 'ARI',
      ...(startYear >= 2017 ? ['VGK'] : []),
      ...(startYear >= 2021 ? ['SEA'] : []),
    ];
    const schedules = await Promise.all(
      teams.map(async (team) => {
        const response = await lastValueFrom(
          this.httpService.get(`/club-schedule-season/${team}/${seasonId}`),
        );

        if (response.status >= 400) {
          throw new HttpException(response.statusText, response.status);
        }

        return response.data as SeasonDto;
      }),
    );

    return { games: schedules.flatMap((schedule) => schedule.games ?? []) };
  }

  async getGame(gameId: number): Promise<GameDto> {
    const gameResponse = await lastValueFrom(
      this.httpService.get(`/gamecenter/${gameId}/boxscore`),
    );

    if (gameResponse.status >= 400) {
      throw new HttpException(gameResponse.statusText, gameResponse.status);
    }

    return gameResponse.data;
  }
}
