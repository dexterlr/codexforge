import "server-only";
import { createHash } from "node:crypto";
import type { PracticeAccount, PracticeInstrument, PracticeLimitBuy, PracticeOrder } from "./practice-types";

const demoApi = "https://demo.trading212.com/api/v0";
const accountPath = "/equity/account/summary";
const instrumentsPath = "/equity/metadata/instruments";
const limitPath = "/equity/orders/limit";
const tickerFormat = /^[A-Za-z0-9_]{1,40}$/;

// Physical, long-only UCITS equity index funds. The broker provides the exact
// tradable ticker for each ISIN. Only listings priced in pounds are eligible.
const reviewedFunds = new Map([
  ["IE00B3XXRP09", "Vanguard S&P 500 UCITS ETF (Dist)"],
  ["IE00B3RBWM25", "Vanguard FTSE All-World UCITS ETF (Dist)"],
  ["IE00BNG8L278", "Vanguard ESG Global All Cap UCITS ETF (Acc)"],
]);

export class PracticeBrokerError extends Error {
  constructor(message: string, readonly ambiguous = false) {
    super(message);
    this.name = "PracticeBrokerError";
  }
}

const uncertainResult = () => new PracticeBrokerError(
  "Trading 212 did not confirm the demo order. Check your practice order history before placing another order.", true,
);
const invalidRead = () => new PracticeBrokerError("Trading 212 returned unexpected practice account data.");

type Access = { authorization: string; key: string; send: typeof fetch; injected: boolean };
function digest(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

export function practiceConfigured() {
  return Boolean(process.env.TRADING212_DEMO_API_KEY?.trim() && process.env.TRADING212_DEMO_API_SECRET?.trim());
}

function access(fetcher?: typeof fetch): Access {
  const key = process.env.TRADING212_DEMO_API_KEY?.trim();
  const secret = process.env.TRADING212_DEMO_API_SECRET?.trim();
  if (!key || !secret) throw new PracticeBrokerError("Trading 212 practice credentials have not been configured.");
  const pair = Buffer.from(key + ":" + secret, "utf8").toString("base64");
  return { authorization: "Basic " + pair, key: digest(pair), send: fetcher ?? fetch, injected: fetcher !== undefined };
}

async function request(
  client: Access,
  path: typeof accountPath | typeof instrumentsPath | typeof limitPath,
  order?: PracticeLimitBuy,
): Promise<unknown> {
  const headers: Record<string, string> = { Authorization: client.authorization, Accept: "application/json" };
  let body: string | undefined;
  if (order) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({
      ticker: order.ticker, quantity: order.quantity,
      limitPrice: order.limitPricePence / 100, timeValidity: "DAY",
    });
  }
  let response: Response;
  try {
    response = await client.send(demoApi + path, {
      method: order ? "POST" : "GET", headers, body, redirect: "error", credentials: "omit",
      cache: "no-store", signal: AbortSignal.timeout(12_000),
    });
  } catch {
    if (order) throw uncertainResult();
    throw new PracticeBrokerError("The Trading 212 practice service could not be reached.");
  }
  if (response.status !== 200) {
    // Documented definitive rejections. A timeout, 5xx, or unrecognised
    // response to the non-idempotent buy can follow an accepted order.
    if (order && ![400, 401, 403, 429].includes(response.status)) throw uncertainResult();
    if (response.status === 401 || response.status === 403) {
      throw new PracticeBrokerError("Trading 212 denied this practice request. Check the demo key pair and its permissions.");
    }
    if (response.status === 429) throw new PracticeBrokerError("Trading 212's practice rate limit was reached. Wait before trying again.");
    throw new PracticeBrokerError(order ? "Trading 212 rejected the practice order." : "Trading 212 could not complete this practice lookup.");
  }
  try {
    return await response.json();
  } catch {
    if (order) throw uncertainResult();
    throw invalidRead();
  }
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function cashPence(amount: unknown) {
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0 || amount > Number.MAX_SAFE_INTEGER / 100) throw invalidRead();
  if (amount < 0.01) return 0;
  const [pounds, fractional = ""] = String(amount).split(".");
  const pence = Number(pounds) * 100 + Number(fractional.padEnd(2, "0").slice(0, 2));
  if (!Number.isSafeInteger(pence)) throw invalidRead();
  return pence;
}

async function getAccount(client: Access): Promise<PracticeAccount> {
  const data = await request(client, accountPath);
  if (!record(data) || !record(data.cash) || typeof data.id !== "number" || !Number.isSafeInteger(data.id) || data.id <= 0) throw invalidRead();
  if (data.currency !== "GBP") throw new PracticeBrokerError("The practice account must use GBP as its primary currency.");
  return {
    accountRef: digest("trading212-practice-account:" + data.id),
    currency: "GBP",
    freeCashPence: cashPence(data.cash.availableToTrade),
  };
}

// The broker allows one summary request per five seconds per account. Share
// in-flight requests and pace new reads, including the pre-order cash check.
let lastAccountRead: { key: string; send: typeof fetch; nextAt: number; pending?: Promise<PracticeAccount> } | undefined;
function accountFor(client: Access) {
  if (!lastAccountRead || lastAccountRead.key !== client.key || lastAccountRead.send !== client.send) {
    lastAccountRead = { key: client.key, send: client.send, nextAt: 0 };
  }
  const entry = lastAccountRead;
  if (entry.pending) return entry.pending;
  const delay = client.injected ? 0 : Math.max(0, entry.nextAt - Date.now());
  entry.pending = (async () => {
    if (delay) await new Promise<void>((resolve) => setTimeout(resolve, delay));
    entry.nextAt = Date.now() + 5_100;
    return getAccount(client);
  })().finally(() => { entry.pending = undefined; });
  return entry.pending;
}

export function readPracticeAccount(fetcher?: typeof fetch) {
  return accountFor(access(fetcher));
}

async function getInstruments(client: Access): Promise<PracticeInstrument[]> {
  const items = await request(client, instrumentsPath);
  if (!Array.isArray(items)) throw invalidRead();
  const seen = new Set<string>();
  const result: PracticeInstrument[] = [];
  for (const item of items) {
    if (!record(item) || typeof item.ticker !== "string" || !tickerFormat.test(item.ticker)) continue;
    if (seen.has(item.ticker)) throw invalidRead();
    seen.add(item.ticker);
    if (item.currencyCode !== "GBP" || item.type !== "ETF" || typeof item.isin !== "string") continue;
    const name = reviewedFunds.get(item.isin);
    if (name) result.push({ ticker: item.ticker, name, isin: item.isin, currency: "GBP", type: "ETF" });
  }
  return result.sort((left, right) => left.name.localeCompare(right.name));
}

// Instrument metadata refreshes every ten minutes. Cache it only for the
// credential pair and transport that retrieved it, including an in-flight read.
let catalog: { key: string; send: typeof fetch; expires: number; result: Promise<PracticeInstrument[]> } | undefined;
function instrumentsFor(client: Access) {
  if (catalog && catalog.key === client.key && catalog.send === client.send && catalog.expires > Date.now()) return catalog.result;
  const result = getInstruments(client).catch((error: unknown) => {
    if (catalog?.result === result) catalog = undefined;
    throw error;
  });
  catalog = { key: client.key, send: client.send, expires: Date.now() + 600_000, result };
  return result;
}

export function listPracticeInstruments(fetcher?: typeof fetch) {
  return instrumentsFor(access(fetcher));
}

function requiredPence(order: PracticeLimitBuy) {
  const units = Math.round(order.quantity * 10_000);
  const amount = units * order.limitPricePence;
  if (typeof order.ticker !== "string" || !tickerFormat.test(order.ticker) || !Number.isSafeInteger(units) || units <= 0 || units / 10_000 !== order.quantity ||
      !Number.isSafeInteger(order.limitPricePence) || order.limitPricePence <= 0 || !Number.isSafeInteger(amount)) {
    throw new PracticeBrokerError("Enter a positive limit price in pence and a share quantity with up to four decimal places.");
  }
  const remainder = amount % 10_000;
  return (amount - remainder) / 10_000 + (remainder ? 1 : 0);
}

const orderStatuses = new Set([
  "LOCAL", "UNCONFIRMED", "CONFIRMED", "NEW", "CANCELLING", "CANCELLED", "PARTIALLY_FILLED", "FILLED", "REJECTED", "REPLACING", "REPLACED",
]);

export async function placePracticeLimitBuy(input: PracticeLimitBuy, expectedAccountRef: string, fetcher?: typeof fetch): Promise<PracticeOrder> {
  const order = { ticker: input.ticker, quantity: input.quantity, limitPricePence: input.limitPricePence };
  const cost = requiredPence(order);
  const client = access(fetcher);
  const [account, instruments] = await Promise.all([accountFor(client), instrumentsFor(client)]);
  if (account.accountRef !== expectedAccountRef) throw new PracticeBrokerError("The connected practice account changed. Refresh the account and review the order.");
  if (cost > account.freeCashPence) throw new PracticeBrokerError("The practice order exceeds the account's available GBP cash.");
  const instrument = instruments.find((candidate) => candidate.ticker === order.ticker);
  if (!instrument) throw new PracticeBrokerError("Choose an eligible GBP fund from this practice account's instrument list.");

  const receipt = await request(client, limitPath, order);
  if (!record(receipt) || !Number.isSafeInteger(receipt.id) || Number(receipt.id) <= 0 ||
      receipt.side !== "BUY" || receipt.type !== "LIMIT" || receipt.timeInForce !== "DAY" || receipt.currency !== "GBP" ||
      receipt.ticker !== order.ticker || receipt.quantity !== order.quantity || receipt.limitPrice !== order.limitPricePence / 100 ||
      typeof receipt.status !== "string" || !orderStatuses.has(receipt.status)) throw uncertainResult();
  if (receipt.instrument !== undefined && (!record(receipt.instrument) || receipt.instrument.ticker !== order.ticker ||
      receipt.instrument.currency !== "GBP" || receipt.instrument.isin !== instrument.isin)) throw uncertainResult();
  if (receipt.status === "REJECTED") {
    if ((receipt.filledQuantity ?? 0) !== 0 || (receipt.filledValue ?? 0) !== 0) throw uncertainResult();
    throw new PracticeBrokerError("Trading 212 rejected the practice order.");
  }
  return { id: String(receipt.id), ticker: order.ticker, quantity: order.quantity, limitPricePence: order.limitPricePence, status: receipt.status };
}
