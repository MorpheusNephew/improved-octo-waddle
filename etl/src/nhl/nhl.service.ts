import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';
import { SeasonDto, GameDto } from './dto';

const nhlApiBaseUrl = 'https://statsapi.web.nhl.com/api/v1';

@Injectable()
export class NhlService {
  private readonly axios: Axios;

  constructor() {
    this.axios = new Axios({
      baseURL: nhlApiBaseUrl,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getSeason(seasonId: string): Promise<SeasonDto> {
    const { data: seasonResponse } = await this.axios.get(
      `/schedule?season=${seasonId}`,
    );

    return JSON.parse(seasonResponse);
  }

  async getGame(gameId: string): Promise<GameDto> {
    const { data: gameResponse } = await this.axios.get(
      `/game/${gameId}/feed/live`,
    );

    return JSON.parse(gameResponse);
  }
}
