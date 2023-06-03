import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class QueryPlayerStatsInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  gameId: number;
}
