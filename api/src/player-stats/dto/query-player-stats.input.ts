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
class QueryPlayerStatsStatisticsInput {
  @Field(() => String, { description: '' })
  operator: 'eq' | 'lt' | 'lte' | 'gt' | 'gte';

  @Field(() => Int, {description: ''})
  value: number;
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

  @Field(() => QueryPlayerStatsStatisticsInput, { description: '', nullable: true })
  playerAge: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, {
    description: '',
    nullable: true,
  })
  assists: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, { description: '', nullable: true })
  goals: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, { description: '', nullable: true })
  hits: QueryPlayerStatsStatisticsInput;

  @Field(() => QueryPlayerStatsStatisticsInput, { description: '', nullable: true })
  points: QueryPlayerStatsStatisticsInput;
}
