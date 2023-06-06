import { Test, TestingModule } from '@nestjs/testing';
import { SeasonService } from './season.service';
import { GameService } from '../game/game.service';
import { NhlService } from '../nhl/nhl.service';
import { faker } from '@faker-js/faker';
import { SeasonDto } from 'src/nhl/dto';
import { range } from 'lodash';

describe('SeasonService', () => {
  let service: SeasonService;
  const mockedGameServiceLoad = jest.fn();
  const mockedNhlServiceGetSeason = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeasonService,
        {
          provide: GameService,
          useValue: { load: mockedGameServiceLoad },
        },
        {
          provide: NhlService,
          useValue: { getSeason: mockedNhlServiceGetSeason },
        },
      ],
    }).compile();

    service = module.get<SeasonService>(SeasonService);
  });

  describe('load', () => {
    it.each([undefined, { dates: [] }])(
      'should not not continue if season is undefined or no dates',
      async (response) => {
        // Arrange
        const seasonId = faker.number.int().toString();

        mockedNhlServiceGetSeason.mockResolvedValue(response);

        // Act
        await service.load(seasonId);

        // Assert
        expect(mockedNhlServiceGetSeason).toHaveBeenCalledWith(seasonId);
        expect(mockedGameServiceLoad).not.toHaveBeenCalled();
      },
    );

    it('should attempt to load games if there are games for season', async () => {
      // Arrange
      const seasonId = faker.number.int().toString();

      const gameIds = range(1, 6).map(() => faker.number.int());

      const seasonGamesResponse = gameIds.map((gameId) => ({ gamePk: gameId }));

      mockedNhlServiceGetSeason.mockResolvedValue({
        dates: [{ games: seasonGamesResponse }],
      } as SeasonDto);

      // Act
      await service.load(seasonId);

      // Assert
      expect(mockedNhlServiceGetSeason).toHaveBeenCalledWith(seasonId);
      gameIds.forEach((gameId, index) => {
        expect(mockedGameServiceLoad).toHaveBeenNthCalledWith(
          index + 1,
          gameId,
        );
      });
    });
  });
});
