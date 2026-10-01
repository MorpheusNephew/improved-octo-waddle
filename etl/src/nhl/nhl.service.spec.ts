import { Test, TestingModule } from '@nestjs/testing';
import { NhlService } from './nhl.service';
import { HttpException } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

jest.mock('axios-retry');

describe('NhlService', () => {
  let service: NhlService;
  let mockedHttpServiceGet = jest.fn();

  beforeEach(async () => {
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        NhlService,
        { provide: HttpService, useValue: { get: mockedHttpServiceGet } },
      ],
    }).compile();

    service = module.get<NhlService>(NhlService);
  });

  describe('getSeason', () => {
    it('should retrieve season', async () => {
      // Arrange
      const seasonId = '20182019';

      mockedHttpServiceGet.mockReturnValue(of({ status: 200, data: { games: [] } }));

      // Act
      const result = await service.getSeason(seasonId);

      // Assert
      expect(mockedHttpServiceGet).toHaveBeenCalledWith(
        `/club-schedule-season/ARI/${seasonId}`,
      );
      expect(result).toStrictEqual({ games: [] });
    });

    it('should fail to get season', async () => {
      // Arrange
      const expectedError = {
        status: 400,
        statusText: 'Bad request',
      };

      mockedHttpServiceGet.mockReturnValue(of(expectedError as any));

      // Act / Assert
      expect(
        async () => await service.getSeason('20092010'),
      ).rejects.toThrowError(
        new HttpException(expectedError.statusText, expectedError.status),
      );
    });
  });

  describe('getGame', () => {
    it('should retrieve game', async () => {
      // Arrange
      const gameId = faker.number.int();

      mockedHttpServiceGet.mockReturnValue(of({ status: 200, data: gameId }));

      // Act
      const result = await service.getGame(gameId);

      // Assert
      expect(mockedHttpServiceGet).toHaveBeenCalledWith(
        `/gamecenter/${gameId}/boxscore`,
      );
      expect(result).toBe(gameId);
    });

    it('should fail to retrieve game', async () => {
      // Arrange
      const expectedError = {
        status: 400,
        statusText: 'Bad request',
      };

      mockedHttpServiceGet.mockReturnValue(of(expectedError));

      // Act / Assert
      expect(
        async () => await service.getGame(2009201001),
      ).rejects.toThrowError(
        new HttpException(expectedError.statusText, expectedError.status),
      );
    });
  });
});
