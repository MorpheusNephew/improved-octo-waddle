import { Injectable } from '@nestjs/common';

@Injectable()
export class NhlService {
  async getSeason(seasonId: string) {
    return Promise.resolve({ seasonId, status: 'Season Retrieved' });
  }

  async getGame(gameId: string) {
    return Promise.resolve({ gameId, status: 'Game Retrieved' });
  }
}
