import { Injectable } from '@nestjs/common';
import { CreatePlayerStatInput } from './dto/create-player-stat.input';

@Injectable()
export class PlayerStatsService {
  create(createPlayerStatInput: CreatePlayerStatInput) {
    return 'This action adds a new playerStat';
  }

  findAll() {
    return `This action returns all playerStats`;
  }
}
