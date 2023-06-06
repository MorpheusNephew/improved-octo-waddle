import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStats } from './entities/player-stats.entity';
import { LoadPlayersStatsInput } from './dto/load-players-stats.input';
import { QueryPlayerStatsInput } from './dto/query-player-stats.input';
import { LoadPlayersStatsStarted } from './entities/load-players-stats-event.entity';

@Resolver(() => PlayerStats)
export class PlayerStatsResolver {
  constructor(private readonly playerStatsService: PlayerStatsService) {}

  @Mutation(() => LoadPlayersStatsStarted)
  loadPlayersStats(
    @Args('loadPlayersStatsInput') loadPlayersStatsInput: LoadPlayersStatsInput,
  ): LoadPlayersStatsStarted {
    this.playerStatsService.loadPlayersStats(loadPlayersStatsInput);

    return {
      message: `Loading player stats for ${
        loadPlayersStatsInput.gameId ? 'game' : 'season'
      } ${
        loadPlayersStatsInput.gameId ?? loadPlayersStatsInput.seasonId
      } has begun`,
    };
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
