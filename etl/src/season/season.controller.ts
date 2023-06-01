import { Controller, Post, Body } from '@nestjs/common';
import { SeasonService } from './season.service';
import { LoadSeasonDto } from './dto/load-season.dto';

@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Post()
  async load(@Body() loadSeasonDto: LoadSeasonDto) {
    return this.seasonService.load(loadSeasonDto);
  }
}
