import { Injectable } from '@nestjs/common';
import { LoadSeasonDto } from './dto/load-season';

@Injectable()
export class SeasonService {
  load({ seasonId }: LoadSeasonDto) {
    return `This action loads a new season from seasonId: ${seasonId}`;
  }
}
