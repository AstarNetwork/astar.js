export * from './utils';

export const TOKEN_API_URL = 'https://api.astar.network/api';

export type ChartData = [number, number][];

export interface TransferDetail {
  from: string;
  to: string;
  symbol: string;
  amount: string;
  isSuccess: boolean;
  timestamp: number;
}

export interface XvmAssetsTransferHistory {
  timestamp: number;
  extrinsicHash: string;
  destination: string;
  amount: string;
  erc20Address: string;
}

export interface StatsDetail {
  era: string;
  timestamp: string;
  numberOfCalls: string;
  uniqueActiveUsers: string;
}

export type StatsType = 'uniqueActiveUsers' | 'numberOfCalls';
export type Duration = '7 days' | '30 days' | '90 days' | '1 year';
