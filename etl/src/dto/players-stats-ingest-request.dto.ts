export class PlayersStatsIngestRequestDto {
  statusId: string;
  type: 'game' | 'season';
  typeId: number | string;
}
