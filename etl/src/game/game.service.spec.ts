import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { NhlService } from '../nhl/nhl.service';
import { getModelToken } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';
import { HttpModule } from '@nestjs/axios';

describe('GameService', () => {
  let service: GameService;
  const mockedGetGame = jest.fn();
  const mockedBulkCreate = jest.fn();

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GameService,
        { provide: NhlService, useValue: { getGame: mockedGetGame } },
        {
          provide: getModelToken(PlayerGameStat),
          useValue: { bulkCreate: mockedBulkCreate },
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  describe('load', () => {
    it('maps current NHL box-score player data before saving it', async () => {
      mockedGetGame.mockResolvedValue({
        gameState: 'OFF',
        homeTeam: {
          id: 1,
          placeName: { default: 'Home' },
          commonName: { default: 'Team' },
        },
        awayTeam: {
          id: 2,
          placeName: { default: 'Away' },
          commonName: { default: 'Team' },
        },
        playerByGameStats: {
          homeTeam: {
            forwards: [{
              playerId: 10,
              name: { default: 'Home Skater' },
              sweaterNumber: 12,
              position: 'C',
              assists: 1,
              goals: 2,
              hits: 3,
              pim: 4,
            }],
            defense: [],
            goalies: [],
          },
          awayTeam: { forwards: [], defense: [], goalies: [] },
        },
      });
      mockedBulkCreate.mockResolvedValue([{}]);

      await service.load(2018020001);

      expect(mockedBulkCreate).toHaveBeenCalledWith(
        [expect.objectContaining({
          gameId: 2018020001,
          playerId: 10,
          playerName: 'Home Skater',
          teamName: 'Home Team',
          opponentTeamName: 'Away Team',
          assists: 1,
          goals: 2,
          points: 3,
          hits: 3,
          penaltyMinutes: 4,
        })],
        expect.objectContaining({ updateOnDuplicate: expect.any(Array) }),
      );
    });
  });
});
