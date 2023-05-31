import { Controller, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { LoadGameDto } from './dto/load-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async load(@Body() loadGameDto: LoadGameDto) {
    return this.gameService.load(loadGameDto);
  }
}
