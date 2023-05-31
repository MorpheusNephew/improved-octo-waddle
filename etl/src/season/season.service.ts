import { Injectable } from '@nestjs/common';
import { LoadSeasonDto } from './dto/load-season';
import { NhlService } from 'src/nhl/nhl.service';

@Injectable()
export class SeasonService {
  constructor(private readonly nhlService: NhlService) {}

  async load({ seasonId }: LoadSeasonDto) {
    const seasonResponse = await this.nhlService.getSeason(seasonId);
    return `This action loads a new season from seasonId: ${JSON.stringify(
      seasonResponse,
    )}`;
  }
}
