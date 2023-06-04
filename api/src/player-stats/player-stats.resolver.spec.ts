import { Test, TestingModule } from '@nestjs/testing';
import { PlayerStatsResolver } from './player-stats.resolver';
import { PlayerStatsService } from './player-stats.service';
import { randomUUID } from 'crypto';

describe('PlayerStatsResolver', () => {
  let resolver: PlayerStatsResolver;
  let mockedLoadPlayersStats = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerStatsResolver,
        {
          provide: PlayerStatsService,
          useValue: { loadPlayersStats: mockedLoadPlayersStats },
        },
      ],
    }).compile();

    resolver = module.get<PlayerStatsResolver>(PlayerStatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('loadPlayersStats', () => {
    it.each([{ gameId: 200928333 }, { seasonId: '20082009' }])(
      'should receive a response with statusId',
      ({ gameId, seasonId }) => {
        // Arrange
        const statusId = randomUUID();
        const expectedResult = { statusId };

        mockedLoadPlayersStats.mockReturnValueOnce(statusId);

        // Act
        const result = resolver.loadPlayersStats({ gameId, seasonId });

        // Assert
        expect(result).toStrictEqual(expectedResult);
      },
    );
  });

  describe('queryPlayersStats', () => {});
});
