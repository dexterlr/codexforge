export type PracticeAccount = {
  accountRef: string;
  currency: "GBP";
  freeCashPence: number;
};

export type PracticeInstrument = {
  ticker: string;
  name: string;
  isin: string;
  currency: "GBP";
  type: "ETF";
};

export type PracticeLimitBuy = {
  ticker: string;
  quantity: number;
  limitPricePence: number;
};

export type PracticeOrder = PracticeLimitBuy & {
  id: string;
  status: string;
};
