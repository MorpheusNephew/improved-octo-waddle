import { Test, TestingModule } from '@nestjs/testing';
import { PlayerStatsService } from './player-stats.service';
import { getModelToken } from '@nestjs/sequelize';
import { PlayerGameStat } from './models/playerGameStat.model';

describe('PlayerStatsService', () => {
  let service: PlayerStatsService;
  let mockedPlayerGameStat = jest.mocked(PlayerGameStat);
  let mockedEmit = jest.fn();

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerStatsService,
        {
          provide: 'INGEST_SERVICE',
          useValue: { emit: mockedEmit },
        },
        {
          provide: getModelToken(PlayerGameStat),
          useValue: mockedPlayerGameStat,
        },
      ],
    }).compile();

    service = module.get<PlayerStatsService>(PlayerStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loadPlayersStats', () => {
    it.each([
      { gameId: 2009, seasonId: '20092010' },
      { gameId: undefined, seasonId: undefined },
    ])(
      'should error when either both gameId/seasonId are provided or neither',
      ({ gameId, seasonId }) => {
        // Act / Assert
        expect(() =>
          service.loadPlayersStats({ gameId, seasonId }),
        ).toThrowError('Invalid argument: must use either gameId or seasonId');
      },
    );

    it.each([
      {
        seasonId: '20092010',
        expectedResult: { type: 'season', typeId: '20092010' },
      },
      {
        gameId: 2009124214,
        expectedResult: { type: 'game', typeId: 2009124214 },
      },
    ])('should ', ({ seasonId, gameId, expectedResult }) => {
      // Act
      service.loadPlayersStats({ seasonId, gameId });

      // Assert
      expect(mockedEmit).toHaveBeenCalledWith(
        'load_players_stats',
        expectedResult,
      );
    });
  });

  describe('queryPlayerStats', () => {});
});
