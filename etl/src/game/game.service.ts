import { Injectable } from '@nestjs/common';
import { LoadGameDto } from './dto/load-game.dto';
import { NhlService } from 'src/nhl/nhl.service';

@Injectable()
export class GameService {
  constructor(private readonly nhlService: NhlService) {}

  async load({ gameId }: LoadGameDto) {
    return this.nhlService.getGame(gameId);
  }
}
