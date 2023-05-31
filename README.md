# NHL Data Pipeline (Work In Progress)

Having fun with pipelines

- [NHL Data Pipeline (Work In Progress)](#nhl-data-pipeline-work-in-progress)
  - [Components](#components)
    - [Backfilling Season/Game Data](#backfilling-seasongame-data)
    - [Querying Data](#querying-data)
  - [Data Modeling](#data-modeling)
    - [Players table](#players-table)
    - [Teams table](#teams-table)
    - [Player game stats table](#player-game-stats-table)

## Components

### Backfilling Season/Game Data

- endpoints that take in season/game id respectively
- validate season/game id by trying to get that season/game
- ensure to handle errors if the season/game id doesn't exist

For season

- get the schedule for that season
- get all games for that season

For game

- use live game endpoint to get all data
- push data to database
  - if game no longer live continue on
  - if game is live continue to make requests to get updated data until game no longer live

### Querying Data

## Data Modeling

- Game ID
- Player ID
- Player Name
- Team ID
- Team Name
- Player Age
- Player Number
- Player Position
- Assists
- Goals
- Hits
- Points
- Penalty Minutes
- Opponent Team

### Players table

- ID: Globally unique ID for a player
- Name: Player name

### Teams table

- TeamID: Globally unique for a team
- TeamName

-

### Player game stats table

-
