import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePlayerStatInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  gameId: number;
}
