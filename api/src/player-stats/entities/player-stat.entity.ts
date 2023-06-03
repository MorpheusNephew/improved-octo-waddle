import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PlayerStat {
  @Field(() => String, { description: 'Id of the game' })
  gameId: string;
}
