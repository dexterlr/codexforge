"use strict";

/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS smoke runner. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");
/* eslint-enable @typescript-eslint/no-require-imports */

const filename = path.resolve(__dirname, "../src/lib/codexforge/trading-research/market-scan.server.ts");
const adapter = new Module(filename);
adapter.require = (name) => {
  assert.equal(name, "server-only");
  return {};
};
adapter._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText, filename);
const { readMarketScan } = adapter.exports;

const now = Date.parse("2026-11-26T11:30:00Z");
const responses = {
  "eodhd.com": '[{"date":"2026-11-25","close":350,"adjusted_close":349.8}]',
  "api.exchange.coinbase.com": '{"time":"2026-11-26T11:29:00.100009Z","price":"100.5"}',
  "www.ecb.europa.eu": '<Cube time="2026-11-25"><Cube currency="GBP" rate="0.80"/><Cube currency="USD" rate="1.04"/></Cube>',
  "www.bankofengland.co.uk": "<rss><item><title>UK announcement</title><link>https://www.bankofengland.co.uk/news/2026/november/test</link><pubDate>Thu, 26 Nov 2026 10:30:00 Z</pubDate></item></rss>",
  "www.federalreserve.gov": "<rss><item><title>Wrong origin</title><link>https://evil.example/news</link><pubDate>Wed, 25 Nov 2026 19:00:00 GMT</pubDate></item><item><title>Board&#39;s announcement</title><link><![CDATA[https://www.federalreserve.gov/newsevents/pressreleases/test.htm]]></link><pubDate><![CDATA[Wed, 25 Nov 2026 18:00:00 GMT]]></pubDate></item></rss>",
};

function fromFixtures(overrides = {}) {
  return async (url, init) => {
    const host = new URL(url).hostname;
    assert.ok(Object.hasOwn(responses, host));
    assert.equal(init.redirect, "error");
    assert.equal(init.credentials, "omit");
    assert.ok(init.signal instanceof AbortSignal);
    const body = overrides[host] ?? responses[host];
    return typeof body === "number" ? new Response("", { status: body }) : new Response(body);
  };
}

async function main() {
  const result = await readMarketScan(fromFixtures(), now);
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.quotes.map((quote) => [quote.symbol, quote.value, quote.observedAt, quote.stale]), [
    ["VTI", 350, "2026-11-25", false], ["GBP/USD", 1.3, "2026-11-25", false],
    ["BTC/USD", 100.5, "2026-11-26T11:29:00.100Z", false],
  ]);
  assert.deepEqual(result.headlines.map((item) => item.title), ["UK announcement", "Board's announcement"]);

  const degraded = await readMarketScan(fromFixtures({
    "api.exchange.coinbase.com": '{"price":"0","time":"2026-11-26T11:29:01Z"}',
    "www.ecb.europa.eu": '<Cube time="2026-11-12"><Cube currency="GBP" rate="0.5"/><Cube currency="USD" rate="0.8"/></Cube>',
    "www.bankofengland.co.uk": 503,
    "eodhd.com": '[{"date":"2026-11-27","close":800}]',
  }), now);
  assert.deepEqual(degraded.issues.map((issue) => issue.feed), ["stocks", "crypto", "news"]);
  assert.ok(degraded.issues.at(-1).message.includes("Bank of England"));
  assert.equal(degraded.quotes.length, 1);
  assert.equal(degraded.quotes[0].stale, true);
  assert.equal(degraded.headlines[0].source, "Federal Reserve Board");
  const oversized = await readMarketScan(fromFixtures({ "www.federalreserve.gov": " ".repeat(300 * 1024) }), now);
  assert.match(oversized.issues[0].message, /exceeded the scan limit/);
  const offline = await readMarketScan(async () => { throw new TypeError("offline"); }, now);
  assert.equal(offline.issues.length, 4);
  assert.deepEqual(offline.quotes, []);
  assert.deepEqual(offline.headlines, []);
  console.log("Market scan tests passed: source dates, GBP/USD cross-rate, news links, stale data, partial and total outages, response limits.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
