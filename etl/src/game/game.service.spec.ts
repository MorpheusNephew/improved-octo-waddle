import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { NhlService } from '../nhl/nhl.service';
import { getModelToken } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { HttpModule } from '@nestjs/axios';

describe('GameService', () => {
  let service: GameService;
  let mockedPlayerGameStat = jest.mocked(PlayerGameStat);

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GameService,
        NhlService,
        {
          provide: getModelToken(PlayerGameStat),
          useValue: mockedPlayerGameStat,
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  describe('load', () => {});
});
