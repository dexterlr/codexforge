import "server-only";

import type { MarketHeadline, MarketQuote, MarketScan } from "./market-scan-types";

const DAY = 86_400_000;
const MAX_FEED_BYTES = 256 * 1024;
const ECB_FEED = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
const COINBASE_TICKER = "https://api.exchange.coinbase.com/products/BTC-USD/ticker";
const NEWS_FEEDS = [
  {
    source: "Bank of England",
    url: "https://www.bankofengland.co.uk/rss/news",
    articleUrl: /^https:\/\/www\.bankofengland\.co\.uk\/[a-z\d-]+\/\d{4}\/[a-z\d/-]+$/,
  },
  {
    source: "Federal Reserve Board",
    url: "https://www.federalreserve.gov/feeds/press_all.xml",
    articleUrl: /^https:\/\/www\.federalreserve\.gov\/newsevents\/pressreleases\/[a-z\d-]+\.htm$/,
  },
];

type Fetcher = typeof fetch;

class FeedError extends Error {}

async function readFeed(url: string | URL, fetcher: Fetcher): Promise<string> {
  const response = await fetcher(url, {
    signal: AbortSignal.timeout(8_000),
    cache: "no-store",
    redirect: "error",
    credentials: "omit",
  });
  if (!response.ok || !response.body) {
    await response.body?.cancel();
    throw new FeedError("Provider unavailable (HTTP " + response.status + ").");
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let text = "";
  let size = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_FEED_BYTES) throw new FeedError("Provider response exceeded the scan limit.");
      text += decoder.decode(chunk.value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    await reader.cancel();
    reader.releaseLock();
  }
}

function positiveValue(raw: unknown): number {
  const value = typeof raw === "number" || (typeof raw === "string" && /^\d+(?:\.\d+)?$/.test(raw))
    ? Number(raw) : NaN;
  if (!Number.isFinite(value) || value <= 0) throw new FeedError("Provider returned an invalid price.");
  return value;
}

function calendarDay(raw: unknown, now: number): string {
  if (typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const time = Date.parse(raw);
    if (Number.isFinite(time) && time <= now && new Date(time).toISOString().startsWith(raw)) return raw;
  }
  throw new FeedError("Provider returned an invalid observation date.");
}

async function stockQuote(fetcher: Fetcher, now: number): Promise<MarketQuote> {
  const url = new URL("https://eodhd.com/api/eod/VTI.US");
  // The provider publishes this demonstration symbol without a customer account.
  url.search = new URLSearchParams({
    api_token: "demo", fmt: "json", period: "d", order: "d",
    from: new Date(now - 30 * DAY).toISOString().slice(0, 10),
    to: new Date(now).toISOString().slice(0, 10),
  }).toString();
  const rows: unknown = JSON.parse(await readFeed(url, fetcher));
  if (!Array.isArray(rows) || !rows.length) throw new FeedError("No recent daily close was available.");
  const observedAt = calendarDay(rows[0]?.date, now);
  return {
    group: "stocks", symbol: "VTI", label: "Vanguard Total Stock Market ETF daily close",
    value: positiveValue(rows[0]?.close), unit: "USD per share", observedAt, precision: "day",
    source: "EODHD public demo", sourceUrl: "https://eodhd.com/financial-apis/api-for-historical-data-and-volumes",
    stale: now - Date.parse(observedAt) > 5 * DAY,
  };
}

async function forexQuote(fetcher: Fetcher, now: number): Promise<MarketQuote> {
  const xml = await readFeed(ECB_FEED, fetcher);
  const datedCube = /<Cube\s+time=['"]([^'"]+)['"]\s*>([\s\S]*?)<\/Cube>/.exec(xml);
  const observedAt = calendarDay(datedCube?.[1], now);
  const rates = new Map<string, string>();
  for (const match of (datedCube?.[2] ?? "").matchAll(/<Cube\s+currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]\s*\/>/g)) {
    rates.set(match[1], match[2]);
  }
  const value = positiveValue(rates.get("USD")) / positiveValue(rates.get("GBP"));
  return {
    group: "fx", symbol: "GBP/USD", label: "Sterling to US dollar reference rate",
    value: positiveValue(value), unit: "USD per GBP", observedAt, precision: "day",
    source: "European Central Bank · EUR cross rate", sourceUrl: ECB_FEED,
    stale: now - Date.parse(observedAt) > 5 * DAY,
  };
}

async function cryptoQuote(fetcher: Fetcher, now: number): Promise<MarketQuote> {
  const ticker = JSON.parse(await readFeed(COINBASE_TICKER, fetcher));
  if (typeof ticker?.time !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(ticker.time)) {
    throw new FeedError("The exchange omitted a valid trade timestamp.");
  }
  const tradedAt = Date.parse(ticker.time);
  if (!Number.isFinite(tradedAt) || tradedAt > now + 60_000) throw new FeedError("The trade timestamp was invalid.");
  return {
    group: "crypto", symbol: "BTC/USD", label: "Bitcoin spot last trade",
    value: positiveValue(ticker.price), unit: "USD per BTC", observedAt: new Date(tradedAt).toISOString(), precision: "time",
    source: "Coinbase Exchange", sourceUrl: COINBASE_TICKER, stale: now - tradedAt > 15 * 60_000,
  };
}

const xmlEntities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

function rssValue(item: string, field: RegExp): string {
  const value = field.exec(item)?.[1]?.trim() ?? "";
  if (value.startsWith("<![CDATA[") && value.endsWith("]]>")) return value.slice(9, -3).trim();
  return value.replace(/&(amp|lt|gt|quot|apos|#\d{1,7}|#x[\da-f]{1,6});/gi, (entity: string, key: string) => {
    if (key[0] !== "#") return xmlEntities[key] ?? entity;
    const code = key[1] === "x" ? Number.parseInt(key.slice(2), 16) : Number(key.slice(1));
    return code >= 32 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
  });
}

async function readHeadlines(feed: (typeof NEWS_FEEDS)[number], fetcher: Fetcher, now: number): Promise<MarketHeadline[]> {
  const rss = await readFeed(feed.url, fetcher);
  const items: MarketHeadline[] = [];
  const seen = new Set<string>();
  for (const match of rss.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const item = match[1];
    const url = rssValue(item, /<link>([\s\S]*?)<\/link>/);
    // Return only direct publication links from this source. Never fetch the articles.
    if (!feed.articleUrl.test(url) || seen.has(url)) continue;
    const title = rssValue(item, /<title>([\s\S]*?)<\/title>/).replace(/\s+/g, " ").trim();
    const date = rssValue(item, /<pubDate>([\s\S]*?)<\/pubDate>/);
    const time = Date.parse(date);
    if (!title || title.length > 512 || !/ (GMT|Z)$/.test(date) || !Number.isFinite(time) || time > now || now - time > 30 * DAY) continue;
    seen.add(url);
    items.push({ title, url, publishedAt: new Date(time).toISOString(), source: feed.source });
  }
  if (!items.length) throw new FeedError("No dated releases were available in the past 30 days.");
  return items.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt)).slice(0, 3);
}

function issueMessage(error: unknown): string {
  return error instanceof FeedError ? error.message : "The source could not be reached or its response could not be read.";
}

export async function readMarketScan(fetcher: Fetcher = fetch, now = Date.now()): Promise<MarketScan> {
  const [[stocks, fx, crypto], news] = await Promise.all([
    Promise.allSettled([stockQuote(fetcher, now), forexQuote(fetcher, now), cryptoQuote(fetcher, now)]),
    Promise.allSettled(NEWS_FEEDS.map((feed) => readHeadlines(feed, fetcher, now))),
  ]);
  const scan: MarketScan = { scannedAt: new Date(now).toISOString(), quotes: [], headlines: [], issues: [] };
  for (const [feed, result] of [["stocks", stocks], ["fx", fx], ["crypto", crypto]] as const) {
    if (result.status === "fulfilled") scan.quotes.push(result.value);
    else scan.issues.push({ feed, message: issueMessage(result.reason) });
  }
  const newsIssues: string[] = [];
  news.forEach((result, index) => {
    if (result.status === "fulfilled") scan.headlines.push(...result.value);
    else newsIssues.push(NEWS_FEEDS[index].source + ". " + issueMessage(result.reason));
  });
  scan.headlines.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
  if (newsIssues.length) scan.issues.push({ feed: "news", message: newsIssues.join(" ") });
  return scan;
}
