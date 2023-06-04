export class TeamDto {
  id: number;
  name: string;
}

export class PositionDto {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
}

export class PlayerDto {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  primaryPosition: PositionDto;
}

export class StatsDto {
  assists: number;
  goals: number;
  hits?: number;
  penaltyMinutes?: number;
}

export class GoalieStatsDto extends StatsDto {}

export class SkaterStatsDto extends StatsDto {
  hits: number;
  penaltyMinutes: number;
}

export class PlayerStatsDto {
  goalieStats?: GoalieStatsDto;
  skaterStats?: SkaterStatsDto;
}

export class PlayerGameDto {
  person: Pick<PlayerDto, 'id' | 'fullName'>;
  jerseyNumber: string;
  position: PositionDto;
  stats: PlayerStatsDto;
}

export class GameDto {
  gamePk: number;
  gameData: {
    game: {
      pk: number;
      season: string;
      type: string;
    };
    datetime: {
      dateTime: string;
    };
    status: {
      abstractGameState: string;
    };
    teams: {
      home: TeamDto;
      away: TeamDto;
    };
    players: Record<string, PlayerDto>;
  };
  liveData: {
    boxscore: {
      teams: {
        home: {
          players: Record<string, PlayerGameDto>;
        };
        away: {
          players: Record<string, PlayerGameDto>;
        };
      };
    };
  };
}
