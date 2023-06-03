import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayerStatInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  gameId: string;
}
