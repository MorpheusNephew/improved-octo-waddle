import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class QueryPlayerStatsQueryInput {}

@InputType()
export class QueryPlayerStatsQueryOptionsInput {
  @Field(() => Int, { description: '', nullable: true })
  limit?: number;

  @Field(() => Int, { description: '', nullable: true })
  offset?: number;
}

@InputType()
class QueryPlayerStatsInputBase {
  @Field(() => String, { description: '' })
  operator: 'eq' | 'lt' | 'lte' | 'gt' | 'gte';
}

@InputType()
export class QueryPlayerStatsAgeInput extends QueryPlayerStatsInputBase {
  @Field(() => Int, { description: '' })
  age: number;
}

@InputType()
export class QueryPlayerStatsAssistsInput extends QueryPlayerStatsInputBase {
  @Field(() => Int, { description: '' })
  assists: number;
}

@InputType()
export class QueryPlayerStatsGoalsInput extends QueryPlayerStatsInputBase {
  @Field(() => Int, { description: '' })
  goals: number;
}

@InputType()
export class QueryPlayerStatsHitsInput extends QueryPlayerStatsInputBase {
  @Field(() => Int, { description: '' })
  hits: number;
}

@InputType()
export class QueryPlayerStatsPointsInput extends QueryPlayerStatsInputBase {
  @Field(() => Int, { description: '' })
  points: number;
}

@InputType()
export class QueryPlayerStatsInput {
  @Field(() => [Int], {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  gameIds?: number[];

  @Field(() => [Int], { description: '', nullable: true })
  playerIds?: number[];

  @Field(() => [String], { description: '', nullable: true })
  playerNumbers?: string[];

  @Field(() => QueryPlayerStatsQueryOptionsInput, {
    description: '',
    nullable: true,
  })
  options?: QueryPlayerStatsQueryOptionsInput;

  @Field(() => QueryPlayerStatsAgeInput, { description: '', nullable: true })
  playerAge: QueryPlayerStatsAgeInput;

  @Field(() => QueryPlayerStatsAssistsInput, {
    description: '',
    nullable: true,
  })
  playerAssists: QueryPlayerStatsAssistsInput;

  @Field(() => QueryPlayerStatsGoalsInput, { description: '', nullable: true })
  playerGoals: QueryPlayerStatsGoalsInput;

  @Field(() => QueryPlayerStatsHitsInput, { description: '', nullable: true })
  playerHits: QueryPlayerStatsHitsInput;

  @Field(() => QueryPlayerStatsPointsInput, { description: '', nullable: true })
  playerPoints: QueryPlayerStatsPointsInput;
}
