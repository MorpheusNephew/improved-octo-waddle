import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoadPlayersStatsStarted {
  @Field(() => String, {
    description:
      "Message stating statistics for players are being loaded",
  })
  message: string;
}
