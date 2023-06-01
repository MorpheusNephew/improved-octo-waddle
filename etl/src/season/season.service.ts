import { Injectable } from '@nestjs/common';
import { LoadSeasonDto } from './dto/load-season.dto';
import { NhlService } from 'src/nhl/nhl.service';

@Injectable()
export class SeasonService {
  constructor(private readonly nhlService: NhlService) {}

  async load({ seasonId }: LoadSeasonDto) {
    return this.nhlService.getSeason(seasonId);
  }
}
