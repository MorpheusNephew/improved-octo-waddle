import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PlayerStats {
  @Field(() => Int, { description: 'Id of the game' })
  gameId: number;

  @Field(() => Int, { description: '' })
  playerId: number;

  @Field(() => String, { description: '' })
  playerName: string;

  @Field(() => Int, { description: '' })
  teamId: number;

  @Field(() => String, { description: '' })
  teamName: string;

  @Field(() => Int, { description: '', nullable: true })
  playerAge: number;

  @Field(() => String, { description: '' })
  playerNumber: string;

  @Field(() => String, { description: '' })
  playerPosition: string;

  @Field(() => Int, { description: '' })
  assists: number;

  @Field(() => Int, { description: '' })
  goals: number;

  @Field(() => Int, { description: '' })
  hits: number;

  @Field(() => Int, { description: '' })
  points: number;

  @Field(() => Int, { description: '' })
  penaltyMinutes: number;

  @Field(() => String, { description: '' })
  opponentTeamName: string;

  @Field(() => Int, { description: '' })
  opponentTeamId: number;
}
