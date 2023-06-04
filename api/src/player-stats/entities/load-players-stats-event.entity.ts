import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoadPlayersStatsEvent {
  @Field(() => String, {
    description:
      "The ID used to determine the status of loading players' statistics",
  })
  statusId: string;
}
