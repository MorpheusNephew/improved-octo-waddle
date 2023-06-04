import { InputType, Field, Int } from '@nestjs/graphql';

@InputType({
  description:
    'Provide either the seasonId or the gameId to load player statistics into Postgres',
})
export class LoadPlayersStatsInput {
  @Field(() => Int, {
    description: 'Id of the game to load into Postgres',
    nullable: true,
  })
  gameId?: number;

  @Field(() => String, {
    description: 'Id of the season to load into Postgres',
    nullable: true,
  })
  seasonId?: string;
}
