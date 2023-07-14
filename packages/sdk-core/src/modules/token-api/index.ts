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
  timestamp: number;
  date: string;
  value: number;
}

export type StatsType = 'uniqueActiveUsers' | 'numberOfCalls';
export type Duration = '7 days' | '30 days' | '90 days' | '1 year';
export type Category = 'defi' | 'gamefi' | 'infra' | 'nft' | 'others';

export interface LooseObject {
  [key: string]: any;
}

export interface Developer {
  githubAccountUrl: string;
  twitterAccountUrl: string;
  linkedInAccountUrl: string;
  iconFile: string;
  name: string;
}

export enum CommunityType {
  Twitter = 'Twitter',
  Reddit = 'Reddit',
  Facebook = 'Facebook',
  TikTok = 'TikTok',
  YouTube = 'YouTube',
  Instagram = 'Instagram',
  Discord = 'Discord',
  GitHub = 'GitHub',
}

export interface Community {
  type: CommunityType;
  handle: string;
}

export interface DappItem extends LooseObject {
  name: string;
  iconUrl: string;
  description: string;
  descriptionMarkdown: string;
  url: string;
  address: string;
  license: string;
  videoUrl: string;
  tags: string[];
  forumUrl: string;
  authorContact: string;
  gitHubUrl: string;
  imagesUrl: string[];
  developers: Developer[];
  communities: Community[];
  contractType: string;
  mainCategory: Category;
}
