import "server-only";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

// This ledger accounts for demo buy limits only. Accepted orders retain their
// full reservation even after expiry or sale, so gains do not increase the cap.
export const PRACTICE_ALLOCATION_PENCE = 10_000;
const defaultDirectory = path.join(process.cwd(), ".codexforge", "trading212-practice");
type Intent = { id: string; ticker: string; quantityUnits: number; pricePence: number; reservedPence: number };
type Order = Intent & { status: "submitting" | "submitted" | "unconfirmed" | "rejected"; createdAt: string; brokerOrderId: string | null };
type SqlValue = string | number | null;
type Database = {
  exec(sql: string): void;
  prepare(sql: string): {
    get(...params: SqlValue[]): unknown;
    all(...params: SqlValue[]): unknown[];
    run(...params: SqlValue[]): unknown;
  };
  close(): void;
};

export class PracticeRequestError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

export function readPracticeIntent(value: unknown): Intent {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new PracticeRequestError(400, "Invalid practice order.");
  const { requestId, ticker, quantity, limitPrice } = value as Record<string, unknown>;
  if (Object.keys(value).length !== 4 || typeof requestId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId) ||
      typeof ticker !== "string" || !/^[a-z0-9_]{1,40}$/i.test(ticker) ||
      typeof quantity !== "number" || !Number.isFinite(quantity) || quantity <= 0 || quantity > 10_000 ||
      Number(quantity.toFixed(4)) !== quantity ||
      typeof limitPrice !== "number" || !Number.isFinite(limitPrice) || limitPrice <= 0 || limitPrice > 1_000_000 ||
      Number(limitPrice.toFixed(2)) !== limitPrice) {
    throw new PracticeRequestError(400, "Choose an eligible ticker, positive share quantity (up to four decimal places) and GBP limit price in pennies.");
  }
  const quantityUnits = Math.round(quantity * 10_000);
  const pricePence = Math.round(limitPrice * 100);
  const reservedPence = Math.ceil(quantityUnits * pricePence / 10_000);
  if (reservedPence > PRACTICE_ALLOCATION_PENCE) throw new PracticeRequestError(409, "This order exceeds the £100 practice budget.");
  return { id: requestId.toLowerCase(), ticker, quantityUnits, pricePence, reservedPence };
}

function withLedger<T>(directory: string, action: (db: Database) => T): T {
  const sqlite = process.getBuiltinModule?.("node:sqlite") as { DatabaseSync: new (file: string) => Database } | undefined;
  if (!sqlite) throw new PracticeRequestError(503, "The practice ledger requires the desktop Node runtime with SQLite.");
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const db = new sqlite.DatabaseSync(path.join(directory, "orders.sqlite"));
  try {
    db.exec(`PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY, ticker TEXT NOT NULL, quantityUnits INTEGER NOT NULL CHECK(quantityUnits>0),
        pricePence INTEGER NOT NULL CHECK(pricePence>0), reservedPence INTEGER NOT NULL CHECK(reservedPence BETWEEN 1 AND 10000),
        createdAt TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('submitting','submitted','unconfirmed','rejected')),
        brokerOrderId TEXT, accountRef TEXT NOT NULL
      );`);
    return action(db);
  } finally { db.close(); }
}

function existingOrder(db: Database, intent: Intent) {
  const order = db.prepare("SELECT * FROM orders WHERE id=?").get(intent.id) as Order | undefined;
  if (order && (order.ticker !== intent.ticker || order.quantityUnits !== intent.quantityUnits || order.pricePence !== intent.pricePence)) {
    throw new PracticeRequestError(409, "This order reference already belongs to a different instruction.");
  }
  return order;
}

export function findPracticeOrder(intent: Intent, directory = defaultDirectory) {
  if (!existsSync(path.join(directory, "orders.sqlite"))) return undefined;
  return withLedger(directory, (db) => existingOrder(db, intent));
}

export function reservePracticeOrder(intent: Intent, accountRef: string, directory = defaultDirectory) {
  return withLedger(directory, (db) => {
    db.exec("BEGIN IMMEDIATE");
    try {
      const existing = existingOrder(db, intent);
      if (existing) {
        db.exec("COMMIT");
        return { created: false, order: existing };
      }
      const { used } = db.prepare("SELECT COALESCE(SUM(reservedPence),0) AS used FROM orders WHERE status!='rejected'").get() as { used: number };
      if (used + intent.reservedPence > PRACTICE_ALLOCATION_PENCE) throw new PracticeRequestError(409, "This buy would exceed the remaining practice budget.");
      const createdAt = new Date().toISOString();
      db.prepare("INSERT INTO orders (id,ticker,quantityUnits,pricePence,reservedPence,createdAt,status,accountRef) VALUES (?,?,?,?,?,?,'submitting',?)")
        .run(intent.id, intent.ticker, intent.quantityUnits, intent.pricePence, intent.reservedPence, createdAt, accountRef);
      db.exec("COMMIT");
      return { created: true, order: { ...intent, createdAt, status: "submitting", brokerOrderId: null } as Order };
    } catch (error) { db.exec("ROLLBACK"); throw error; }
  });
}

export function finishPracticeOrder(id: string, status: "submitted" | "unconfirmed" | "rejected", brokerId: string | null, directory = defaultDirectory) {
  withLedger(directory, (db) => {
    db.prepare("UPDATE orders SET status=?,brokerOrderId=? WHERE id=? AND status='submitting'").run(status, brokerId, id);
  });
}

export function publicPracticeOrder(order: Order) {
  return {
    id: order.id, createdAt: order.createdAt, ticker: order.ticker, quantity: order.quantityUnits / 10_000,
    limitPrice: order.pricePence / 100, reservedPence: order.reservedPence, status: order.status,
    ...(order.brokerOrderId ? { brokerOrderId: order.brokerOrderId } : {}),
  };
}

export function practiceLedgerSnapshot(directory = defaultDirectory) {
  if (!existsSync(path.join(directory, "orders.sqlite"))) return { reservedPence: 0, orders: [] };
  return withLedger(directory, (db) => {
    const { used } = db.prepare("SELECT COALESCE(SUM(reservedPence),0) AS used FROM orders WHERE status!='rejected'").get() as { used: number };
    const orders = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC, id DESC LIMIT 30").all() as Order[];
    return { reservedPence: used, orders: orders.map(publicPracticeOrder) };
  });
}
