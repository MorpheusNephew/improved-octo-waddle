import { HttpException, Injectable } from '@nestjs/common';
import { Axios } from 'axios';
import { SeasonDto, GameDto } from './dto';

@Injectable()
export class NhlService {
  private readonly axios: Axios;

  constructor() {
    this.axios = new Axios({
      baseURL: 'https://statsapi.web.nhl.com/api/v1',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getSeason(seasonId: string): Promise<SeasonDto> {
    const seasonResponse = await this.axios.get(`/schedule?season=${seasonId}`);

    if (seasonResponse.status >= 400) {
      throw new HttpException(seasonResponse.statusText, seasonResponse.status);
    }

    return JSON.parse(seasonResponse.data);
  }

  async getGame(gameId: number): Promise<GameDto> {
    const gameResponse = await this.axios.get(`/game/${gameId}/feed/live`);

    if (gameResponse.status >= 400) {
      throw new HttpException(gameResponse.statusText, gameResponse.status);
    }

    return JSON.parse(gameResponse.data);
  }
}
