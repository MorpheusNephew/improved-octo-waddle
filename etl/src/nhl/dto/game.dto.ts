export class TeamDto {
  id: number;
  commonName: { default: string };
  placeName: { default: string };
}

export class SkaterStatsDto {
  playerId: number;
  name: { default: string };
  sweaterNumber: number;
  position: string;
  assists: number;
  goals: number;
  hits: number;
  pim: number;
}

export class GoalieStatsDto {
  playerId: number;
  name: { default: string };
  sweaterNumber: number;
  position: string;
  pim: number;
}

export type GameState = 'FUT' | 'PRE' | 'LIVE' | 'CRIT' | 'FINAL' | 'OFF';

export class TeamPlayerStatsDto {
  forwards: SkaterStatsDto[];
  defense: SkaterStatsDto[];
  goalies: GoalieStatsDto[];
}

export class GameDto {
  id: number;
  gameState: GameState;
  homeTeam: TeamDto;
  awayTeam: TeamDto;
  playerByGameStats: {
    homeTeam: TeamPlayerStatsDto;
    awayTeam: TeamPlayerStatsDto;
  };
}
