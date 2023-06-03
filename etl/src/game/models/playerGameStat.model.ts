import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class PlayerGameStat extends Model {
  @PrimaryKey
  @Column
  gameId: number;

  @PrimaryKey
  @Column
  playerId: number;

  @Column
  playerName: string;

  @Column
  teamId: number;

  @Column
  teamName: string;

  @Column
  playerAge: number;

  @Column
  playerNumber: string;

  @Column
  playerPosition: string;

  @Column
  assists: number;

  @Column
  goals: number;

  @Column({ defaultValue: 0 })
  hits: number;

  @Column
  points: number;

  @Column({ defaultValue: 0 })
  penaltyMinutes: number;

  @Column
  opponentTeamName: string;

  @Column
  opponentTeamId: number;
}
