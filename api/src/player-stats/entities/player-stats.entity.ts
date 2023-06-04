import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PlayerStats {
  @Field(() => Int, { description: 'Id of the game' })
  gameId: number;

  @Field(() => Int, { description: 'Id of the player' })
  playerId: number;

  @Field(() => String, { description: 'Player full name' })
  playerName: string;

  @Field(() => Int, { description: 'Id of the team' })
  teamId: number;

  @Field(() => String, { description: 'Team name' })
  teamName: string;

  @Field(() => Int, { description: 'Player age', nullable: true })
  playerAge?: number;

  @Field(() => String, { description: 'Player number', nullable: true })
  playerNumber?: string;

  @Field(() => String, { description: 'Player position' })
  playerPosition: string;

  @Field(() => Int, { description: 'Amount of assists' })
  assists: number;

  @Field(() => Int, { description: 'Amount of goals' })
  goals: number;

  @Field(() => Int, { description: 'Amount of hits' })
  hits: number;

  @Field(() => Int, { description: 'Amount of points' })
  points: number;

  @Field(() => Int, { description: 'Penalty minutes' })
  penaltyMinutes: number;

  @Field(() => String, { description: 'Opponent team name' })
  opponentTeamName: string;

  @Field(() => Int, { description: 'Id of opponent team' })
  opponentTeamId: number;
}
