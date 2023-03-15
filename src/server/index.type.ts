/* eslint-disable no-shadow */

// 榜单类型
export enum HomeRankType {
  CP = "1",
  GODDESS = "2",
  STEAL = "3",
}

export interface IndexResData {
  rankList: {
    page: number;
    count: number;
    remain: number;
  };
  balance: number;
  cancellationOpen: boolean;
}
