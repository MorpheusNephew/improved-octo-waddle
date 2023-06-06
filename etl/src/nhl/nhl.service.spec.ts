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
      const seasonId = faker.number.int().toString();

      mockedHttpServiceGet.mockReturnValue(of({ status: 200, data: seasonId }));

      // Act
      const result = await service.getSeason(seasonId);

      // Assert
      expect(mockedHttpServiceGet).toHaveBeenCalledWith(
        `/schedule?season=${seasonId}`,
      );
      expect(result).toBe(seasonId);
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
        `/game/${gameId}/feed/live`,
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
