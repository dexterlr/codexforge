"use strict";

/* eslint-disable @typescript-eslint/no-require-imports -- This independent CommonJS runner loads isolated TS modules. */
const assert = require("node:assert/strict");
const { fork } = require("node:child_process");
const { randomUUID } = require("node:crypto");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const load = Module._load;
Module._load = function (name, ...args) {
  if (name === "server-only") return {};
  return load.call(this, name.startsWith("@/") ? path.join(root, "src", name.slice(2)) : name, ...args);
};
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const result = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  module._compile(result.outputText, filename);
};
const loadLedger = () => require(path.join(root, "src/lib/codexforge/trading-research/practice-ledger.server.ts"));
const loadRoute = () => require(path.join(root, "src/app/api/codexforge/trading-research/practice/route.ts"));
/* eslint-enable @typescript-eslint/no-require-imports */

let ledger;
function instruction(quantity, limitPrice, requestId = randomUUID()) {
  return { requestId, ticker: "TESTl_EQ", quantity, limitPrice };
}

function startWorker(directory, order) {
  const child = fork(__filename, ["--reserve", directory, JSON.stringify(order)], { stdio: ["ignore", "ignore", "inherit", "ipc"] });
  let ready;
  const started = new Promise((resolve) => { ready = resolve; });
  const answer = new Promise((resolve, reject) => {
    let response;
    const timeout = setTimeout(() => { child.kill(); reject(new Error("Practice fixture child timed out")); }, 20_000);
    child.on("message", (message) => {
      if (message === "ready") ready();
      else response = message;
    });
    child.on("error", (error) => { clearTimeout(timeout); ready(); reject(error); });
    child.on("exit", (code) => {
      clearTimeout(timeout);
      ready();
      if (code === 0 && response) resolve(response);
      else reject(new Error("Practice fixture child failed, exit " + code));
    });
  });
  return { child, started, answer };
}

async function concurrentReservations(directory, orders) {
  const workers = orders.map((order) => startWorker(directory, order));
  const results = Promise.all(workers.map((worker) => worker.answer));
  await Promise.all(workers.map((worker) => worker.started));
  for (const { child } of workers) if (child.connected) child.send("reserve");
  return results;
}

function runWorker() {
  ledger = loadLedger();
  const [, , , directory, payload] = process.argv;
  process.once("message", () => {
    let result;
    try {
      const intent = ledger.readPracticeIntent(JSON.parse(payload));
      result = ledger.reservePracticeOrder(intent, "mock-account", directory);
    } catch (error) {
      result = { status: error.status ?? 500, message: error.message };
    }
    process.send(result, () => process.disconnect());
  });
  process.send("ready");
}

async function testLedger(sandbox) {
  const raceRoot = path.join(sandbox, "race");
  const orders = Array.from({ length: 5 }, () => instruction(1, 25));
  const results = await concurrentReservations(raceRoot, orders);
  const accepted = results.filter((result) => result.created === true);
  assert.equal(accepted.length, 4);
  assert.equal(results.filter((result) => result.status === 409).length, 1);
  const full = ledger.practiceLedgerSnapshot(raceRoot);
  assert.equal(full.reservedPence, 10_000);
  assert.equal(full.orders.length, 4);
  assert.ok(!JSON.stringify(full).includes("mock-account"));
  const first = orders.find((order) => order.requestId === accepted[0].order.id);
  // The owner process exits after reserving. Another process must recover the exact id.
  const [replay] = await concurrentReservations(raceRoot, [first]);
  assert.equal(replay.created, false);
  assert.equal(replay.order.status, "submitting");
  const mismatched = ledger.readPracticeIntent({ ...first, limitPrice: 24.99 });
  assert.throws(() => ledger.findPracticeOrder(mismatched, raceRoot), { status: 409 });
  assert.throws(() => ledger.reservePracticeOrder(mismatched, "mock-account", raceRoot), { status: 409 });

  ledger.finishPracticeOrder(first.requestId, "unconfirmed", null, raceRoot);
  assert.equal(ledger.reservePracticeOrder(ledger.readPracticeIntent(first), "mock-account", raceRoot).created, false);
  ledger.finishPracticeOrder(first.requestId, "rejected", null, raceRoot);
  assert.equal(ledger.findPracticeOrder(ledger.readPracticeIntent(first), raceRoot).status, "unconfirmed");
  assert.equal(ledger.practiceLedgerSnapshot(raceRoot).reservedPence, 10_000);

  const rejectedId = accepted[1].order.id;
  ledger.finishPracticeOrder(rejectedId, "rejected", null, raceRoot);
  assert.equal(ledger.practiceLedgerSnapshot(raceRoot).reservedPence, 7_500);
  const same = instruction(1, 25);
  const simultaneous = await concurrentReservations(raceRoot, [same, same]);
  assert.deepEqual(simultaneous.map((answer) => answer.created).sort(), [false, true]);
  ledger.finishPracticeOrder(same.requestId, "submitted", "fixture-order", raceRoot);
  const submitted = ledger.publicPracticeOrder(ledger.findPracticeOrder(ledger.readPracticeIntent(same), raceRoot));
  assert.equal(submitted.brokerOrderId, "fixture-order");
  assert.equal(ledger.practiceLedgerSnapshot(raceRoot).reservedPence, 10_000);

  assert.equal(ledger.readPracticeIntent(instruction(0.3333, 100.01)).reservedPence, 3334);
  assert.equal(ledger.readPracticeIntent(instruction(0.0001, 0.01)).reservedPence, 1);
  assert.throws(() => ledger.readPracticeIntent(instruction(1.0001, 100)), { status: 409 });
  for (const bad of [
    instruction(-1, 1), instruction(0, 1), instruction(1.00001, 1), instruction(1, 1.001),
    { ...first, brokerUrl: "https://invalid.example/" }, { ...first, apiSecret: "fixture" },
  ]) assert.throws(() => ledger.readPracticeIntent(bad), { status: 400 });
}

async function testRoute() {
  const calls = [];
  const posted = [];
  const fakeAccount = { id: 170125, currency: "GBP", cash: { availableToTrade: 500 } };
  const validFund = { ticker: "TESTl_EQ", isin: "IE00B3XXRP09", type: "ETF", currencyCode: "GBP" };
  let loseResponse = false;
  // All outbound traffic is intercepted before the route or its broker module loads.
  globalThis.fetch = async (input, init) => {
    const url = new URL(input);
    calls.push([url.origin, init.method, url.pathname]);
    assert.equal(url.origin, "https://demo.trading212.com");
    assert.equal(url.search, "");
    assert.equal(init.redirect, "error");
    assert.equal(new Headers(init.headers).get("Authorization"), "Basic " + Buffer.from("test-key:test-secret").toString("base64"));
    if (init.method === "GET" && url.pathname === "/api/v0/equity/account/summary") return Response.json(fakeAccount);
    if (init.method === "GET" && url.pathname === "/api/v0/equity/metadata/instruments") {
      return Response.json([validFund, { ...validFund, ticker: "NOT_ELIGIBLE", type: "CFD" }]);
    }
    assert.equal(init.method, "POST");
    assert.equal(url.pathname, "/api/v0/equity/orders/limit");
    const order = JSON.parse(init.body);
    assert.deepEqual(Object.keys(order).sort(), ["limitPrice", "quantity", "ticker", "timeValidity"]);
    assert.equal(order.ticker, validFund.ticker);
    assert.ok(order.quantity > 0);
    assert.equal(order.timeValidity, "DAY");
    posted.push(order);
    if (loseResponse) throw new TypeError("connection lost after simulated broker acceptance");
    return Response.json({ id: 8123, side: "BUY", type: "LIMIT", timeInForce: "DAY", currency: "GBP", ...order, status: "NEW" });
  };
  delete process.env.TRADING212_DEMO_API_KEY;
  delete process.env.TRADING212_DEMO_API_SECRET;
  const { GET, POST } = loadRoute();
  const listener = net.createServer((socket) => socket.end());
  try {
    await new Promise((resolve, reject) => listener.once("error", reject).listen(0, "127.0.0.1", resolve));
    const host = "127.0.0.1:" + listener.address().port;
    const origin = "http://" + host;
    const url = origin + "/api/codexforge/trading-research/practice";
    const state = async () => {
      const result = await GET(new Request(url, { headers: { Host: host } }));
      assert.equal(result.status, 200);
      const text = await result.text();
      assert.doesNotMatch(text, /test-key|test-secret|170125|"accountRef"/);
      assert.ok(!text.includes(Buffer.from("test-key:test-secret").toString("base64")));
      return JSON.parse(text);
    };
    const post = (order) => POST(new Request(url, {
      method: "POST", headers: { Host: host, Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(order),
    }));
    assert.equal((await state()).configured, false);
    assert.equal(calls.length, 0);
    process.env.TRADING212_DEMO_API_KEY = "test-key";
    process.env.TRADING212_DEMO_API_SECRET = "test-secret";
    const configured = await state();
    assert.equal(configured.configured, true);
    assert.equal(configured.availableCashPence, 50000);
    assert.deepEqual(configured.instruments.map((fund) => fund.ticker), [validFund.ticker]);
    const accepted = instruction(1, 65.5);
    const success = await post(accepted);
    assert.equal(success.status, 200);
    assert.equal((await success.json()).order.brokerOrderId, "8123");
    assert.deepEqual(posted, [{ ticker: "TESTl_EQ", quantity: 1, limitPrice: 65.5, timeValidity: "DAY" }]);
    const callCount = calls.length;
    assert.equal((await post(accepted)).status, 200);
    assert.equal((await post({ ...accepted, quantity: 2 })).status, 409);
    assert.equal(calls.length, callCount);
    assert.equal((await post(instruction(1, 40))).status, 409);
    assert.equal(posted.length, 1);
    loseResponse = true;
    const uncertain = instruction(1, 34.5);
    const lost = await post(uncertain);
    assert.equal(lost.status, 409);
    assert.equal((await lost.json()).safeToEdit, false);
    const afterLoss = calls.length;
    assert.equal((await post(uncertain)).status, 409);
    assert.equal(calls.length, afterLoss);
    assert.equal(posted.length, 2);
    const finalState = await state();
    assert.equal(finalState.reservedPence, 10_000);
    assert.deepEqual(finalState.orders.map((order) => order.status).sort(), ["submitted", "unconfirmed"]);
    const external = calls.filter(([host]) => host !== "https://demo.trading212.com");
    assert.deepEqual(external, []);
  } finally {
    if (listener.listening) await new Promise((resolve) => listener.close(resolve));
  }
}

async function main() {
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "codexforge-practice-test-"));
  const previousDirectory = process.cwd();
  try {
    process.chdir(sandbox);
    ledger = loadLedger();
    await testLedger(sandbox);
    await testRoute();
    console.log("Practice ledger and API passed concurrency, GBP ceiling, fractional rounding, idempotent replay, rejection and lost broker response checks. All Trading 212 calls were intercepted.");
  } finally {
    process.chdir(previousDirectory);
    fs.rmSync(sandbox, { recursive: true, force: true });
  }
}

if (process.argv[2] === "--reserve") runWorker();
else main().catch((error) => { console.error(error); process.exitCode = 1; });
