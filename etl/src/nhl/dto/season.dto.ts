export class SeasonDto {
  copyright: string;
  totalItems: number;
  metaData: {
    timeStamp: string;
  };
  dates: {
    date: string;
    games: {
      gamePk: number;
    }[];
  }[];
}
