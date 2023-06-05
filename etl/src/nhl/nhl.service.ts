import { HttpException, Injectable } from '@nestjs/common';
import { SeasonDto, GameDto } from './dto';
import axiosRetry from 'axios-retry';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NhlService {
  constructor(private readonly httpService: HttpService) {
    axiosRetry(httpService.axiosRef, { retries: 3 });
  }

  async getSeason(seasonId: string): Promise<SeasonDto> {
    const seasonResponse = await lastValueFrom(
      this.httpService.get(`/schedule?season=${seasonId}`),
    );

    if (seasonResponse.status >= 400) {
      throw new HttpException(seasonResponse.statusText, seasonResponse.status);
    }

    return seasonResponse.data;
  }

  async getGame(gameId: number): Promise<GameDto> {
    const gameResponse = await lastValueFrom(
      this.httpService.get(`/game/${gameId}/feed/live`),
    );

    if (gameResponse.status >= 400) {
      throw new HttpException(gameResponse.statusText, gameResponse.status);
    }

    return gameResponse.data;
  }
}
