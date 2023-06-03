import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStat } from './entities/player-stat.entity';
import { CreatePlayerStatInput } from './dto/create-player-stat.input';

@Resolver(() => PlayerStat)
export class PlayerStatsResolver {
  constructor(private readonly playerStatsService: PlayerStatsService) {}

  @Mutation(() => PlayerStat)
  createPlayerStat(
    @Args('createPlayerStatInput') createPlayerStatInput: CreatePlayerStatInput,
  ): PlayerStat {
    const message = this.playerStatsService.create(createPlayerStatInput);

    console.log(message);

    return { gameId: createPlayerStatInput.gameId };
  }

  @Query(() => [PlayerStat], { name: 'playerStats' })
  findAll() {
    return this.playerStatsService.findAll();
  }
}
