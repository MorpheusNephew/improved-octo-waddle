export class TeamDto {
  id: number;
  name: string;
}

export class PositionDto {
  name: string;
}

export class PlayerInfoDto {
  id: number;
  fullName: string;
  primaryNumber: string;
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
  person: Pick<PlayerInfoDto, 'id' | 'fullName'>;
  jerseyNumber: string;
  position: PositionDto;
  stats: PlayerStatsDto;
}

export type AbstractGameState = 'Preview' | 'Live' | 'Final';
export type GamePlayers = Record<string, PlayerInfoDto>;
export type PlayersBoxscore = Record<string, PlayerGameDto>;

export class GameDto {
  gamePk: number;
  gameData: {
    game: {
      pk: number;
      season: string;
      type: string;
    };
    status: {
      abstractGameState: AbstractGameState;
    };
    teams: {
      home: TeamDto;
      away: TeamDto;
    };
    players: GamePlayers;
  };
  liveData: {
    boxscore: {
      teams: {
        home: {
          players: PlayersBoxscore;
        };
        away: {
          players: PlayersBoxscore;
        };
      };
    };
  };
}
