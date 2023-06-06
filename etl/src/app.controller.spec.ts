import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { GameService } from './game/game.service';
import { SeasonService } from './season/season.service';

describe('AppController', () => {
  let appController: AppController;
  let mockedGameServiceLoad = jest.fn();
  let mockedSeasonServiceLoad = jest.fn();

  beforeEach(async () => {
    jest.restoreAllMocks();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: GameService, useValue: { load: mockedGameServiceLoad } },
        { provide: SeasonService, useValue: { load: mockedSeasonServiceLoad } },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('loadPlayersStats', () => {
    it.each([
      {
        type: 'season',
        typeId: '20092010',
        expectedCalledService: mockedSeasonServiceLoad,
        expectedUncalledService: mockedGameServiceLoad,
      },
      {
        type: 'game',
        typeId: 200928217,
        expectedCalledService: mockedGameServiceLoad,
        expectedUncalledService: mockedSeasonServiceLoad,
      },
    ])(
      'should call appropriate service when type is $type and typeId is $typeId',
      async ({
        type,
        typeId,
        expectedCalledService,
        expectedUncalledService,
      }) => {
        // Act
        await appController.loadPlayersStats({ type: type as any, typeId });

        // Assert
        expect(expectedCalledService).toHaveBeenCalledWith(typeId);
        expect(expectedUncalledService).not.toHaveBeenCalled();
      },
    );
  });
});
