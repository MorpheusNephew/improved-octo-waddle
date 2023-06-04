import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStats } from './entities/player-stats.entity';
import { LoadPlayersStatsInput } from './dto/load-players-stats.input';
import { QueryPlayerStatsInput } from './dto/query-player-stats.input';
import { LoadPlayersStatsEvent } from './entities/load-players-stats-event.entity';

@Resolver(() => PlayerStats)
export class PlayerStatsResolver {
  constructor(private readonly playerStatsService: PlayerStatsService) {}

  @Mutation(() => LoadPlayersStatsEvent)
  loadPlayersStats(
    @Args('loadPlayersStatsInput') loadPlayersStatsInput: LoadPlayersStatsInput,
  ): LoadPlayersStatsEvent {
    const statusId = this.playerStatsService.load(loadPlayersStatsInput);

    return { statusId };
  }

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
