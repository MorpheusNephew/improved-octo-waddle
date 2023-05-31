import { Injectable } from '@nestjs/common';
import { LoadGameDto } from './dto/load-game.dto';

@Injectable()
export class GameService {
  load({ gameId }: LoadGameDto) {
    return `This action loads a new game from gameId: ${gameId}`;
  }
}
