import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStats } from './entities/player-stat.entity';
import { CreatePlayerStatInput } from './dto/create-player-stat.input';
import { QueryPlayerStatsInput } from './dto/query-player-stats.input';

@Resolver(() => PlayerStats)
export class PlayerStatsResolver {
  constructor(private readonly playerStatsService: PlayerStatsService) {}

  // @Mutation(() => PlayerStats)
  // loadPlayerStats(
  //   @Args('createPlayerStatInput') createPlayerStatInput: CreatePlayerStatInput,
  // ): PlayerStats {
  //   const message = this.playerStatsService.load(createPlayerStatInput);

  //   console.log(message);

  //   return { gameId: createPlayerStatInput.gameId };
  // }

  @Query(() => [PlayerStats], { name: 'playerStats' })
  async queryPlayersStats(
    @Args('queryPlayerStatsInput') queryPlayerStatsInput: QueryPlayerStatsInput,
  ): Promise<PlayerStats[]> {
    const playerStats = await this.playerStatsService.queryPlayerStats(
      queryPlayerStatsInput,
    );

    return playerStats;
  }
}
