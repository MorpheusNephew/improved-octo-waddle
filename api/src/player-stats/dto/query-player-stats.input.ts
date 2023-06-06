import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';

@InputType()
export class QueryPlayerStatsQueryOptionsInput {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;
}

@InputType()
class QueryPlayerStatsStatisticsInput {
  @Field(() => String, {
    description: 'The operator to use in comparison to a value',
  })
  operator: 'eq' | 'lt' | 'lte' | 'gt' | 'gte';

  @Field(() => Int, { description: 'The value to be compared against' })
  value: number;
}

export enum PlayerPosition {
  GOALIE = 'Goalie',
  DEFENSEMAN = 'Defenseman',
  RIGHT_WING = 'Right Wing',
  LEFT_WING = 'Left Wing',
  CENTER = 'Center',
  UNKNOWN = 'Unknown',
}

registerEnumType(PlayerPosition, { name: 'PlayerPosition' });

@InputType()
export class QueryPlayerStatsInput {
  @Field(() => [Int], {
    description: 'An array of games to query',
    nullable: true,
  })
  gameIds?: number[];

  @Field(() => [Int], {
    description: 'An array of players to query',
    nullable: true,
  })
  playerIds?: number[];

  @Field(() => [String], {
    description: 'An array of player numbers to query',
    nullable: true,
  })
  playerNumbers?: string[];

  @Field(() => [PlayerPosition], { description: '', nullable: true })
  playerPositions?: PlayerPosition[];

  @Field(() => QueryPlayerStatsStatisticsInput, {
    description: 'Player age',
    nullable: true,
  })
  playerAge: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, {
    description: 'Player assists',
    nullable: true,
  })
  assists: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, {
    description: 'Player goals',
    nullable: true,
  })
  goals: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, {
    description: 'Player hits',
    nullable: true,
  })
  hits: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, {
    description: 'Player points',
    nullable: true,
  })
  points: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsQueryOptionsInput, {
    nullable: true,
  })
  options?: QueryPlayerStatsQueryOptionsInput;
}
