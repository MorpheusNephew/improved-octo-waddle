import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { SeasonDto, GameDto } from './dto';
import axiosRetry from 'axios-retry';

@Injectable()
export class NhlService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://statsapi.web.nhl.com/api/v1',
      headers: { 'Content-Type': 'application/json' },
    });

    axiosRetry(this.axios, { retries: 3 });
  }

  async getSeason(seasonId: string): Promise<SeasonDto> {
    const seasonResponse = await this.axios.get(`/schedule?season=${seasonId}`);

    if (seasonResponse.status >= 400) {
      throw new HttpException(seasonResponse.statusText, seasonResponse.status);
    }

    return seasonResponse.data;
  }

  async getGame(gameId: number): Promise<GameDto> {
    const gameResponse = await this.axios.get(`/game/${gameId}/feed/live`);

    if (gameResponse.status >= 400) {
      throw new HttpException(gameResponse.statusText, gameResponse.status);
    }

    return gameResponse.data;
  }
}
