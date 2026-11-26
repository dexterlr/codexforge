export type MarketGroup = "stocks" | "fx" | "crypto";

export type MarketQuote = {
  group: MarketGroup;
  symbol: string;
  label: string;
  value: number;
  unit: string;
  observedAt: string;
  precision: "day" | "time";
  source: string;
  sourceUrl: string;
  stale: boolean;
};

export type MarketHeadline = {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
};

export type MarketScan = {
  scannedAt: string;
  quotes: MarketQuote[];
  headlines: MarketHeadline[];
  issues: { feed: MarketGroup | "news"; message: string }[];
};
