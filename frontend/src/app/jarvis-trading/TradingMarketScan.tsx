"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MarketQuote, MarketScan } from "@/lib/codexforge/trading-research/market-scan-types";
import chatStyles from "@/lib/codexforge/jarvis-chat/components/JarvisChatPanel.module.css";
import styles from "./TradingMarketScan.module.css";

const feedLabels = { stocks: "Stocks", fx: "Currencies", crypto: "Crypto", news: "News" };
const refreshInterval = 5 * 60 * 1000;
const valueFormat = new Intl.NumberFormat("en-GB", { maximumSignificantDigits: 9 });
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  timeZone: "UTC", timeZoneName: "short",
});

function observation(quote: MarketQuote) {
  if (quote.precision === "day") return quote.observedAt;
  return timeFormat.format(new Date(quote.observedAt));
}

function snapshotEvidence(scan: MarketScan) {
  const lines = [`Market scan retrieved ${timeFormat.format(new Date(scan.scannedAt))}.`];
  for (const quote of scan.quotes) {
    lines.push(`${quote.label} (${quote.symbol}): ${valueFormat.format(quote.value)} ${quote.unit}, ${observation(quote)}, ${quote.source}${quote.stale ? " [stale]" : ""}.`);
  }
  if (scan.issues.length) {
    const feeds = [...new Set(scan.issues.map((issue) => feedLabels[issue.feed]))];
    lines.push(`Incomplete coverage: ${feeds.join(", ")}.`);
  }
  for (const headline of scan.headlines) {
    lines.push(`${headline.source} (${headline.publishedAt.slice(0, 10)}): ${JSON.stringify(headline.title)}`);
  }
  let evidence = "";
  for (const line of lines) {
    const next = evidence ? evidence + "\n" + line : line;
    if (next.length <= 900) evidence = next;
  }
  return evidence;
}

type Props = {
  onUseEvidence: (evidence: string) => void;
  canUseEvidence: boolean;
};

export function TradingMarketScan({ onUseEvidence, canUseEvidence }: Props) {
  const [snapshot, setSnapshot] = useState<MarketScan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const pending = useRef<AbortController | null>(null);

  const scan = useCallback(async () => {
    if (pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/codexforge/trading-research/scan", {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error();
      const result: MarketScan = await response.json();
      if (!controller.signal.aborted) setSnapshot(result);
    } catch {
      if (!controller.signal.aborted) setError("The scan could not be retrieved. Try scanning again.");
    } finally {
      if (pending.current === controller) {
        pending.current = null;
        if (!controller.signal.aborted) setLoading(false);
      }
    }
  }, []);

  useEffect(() => () => pending.current?.abort(), []);
  useEffect(() => {
    if (!autoRefresh) return;
    const timer = window.setInterval(() => { void scan(); }, refreshInterval);
    return () => window.clearInterval(timer);
  }, [autoRefresh, scan]);

  const hasEvidence = snapshot && (snapshot.quotes.length > 0 || snapshot.headlines.length > 0);

  return (
    <section className={chatStyles.panel} aria-labelledby="market-scan-title">
      <header className={chatStyles.panelHeader}>
        <div>
          <h2 id="market-scan-title" className={chatStyles.panelTitle}>Markets and news</h2>
          <p className={chatStyles.panelSummary}>Check the U.S. stock market ETF (VTI), GBP/USD, Bitcoin and releases from the Bank of England and Federal Reserve.</p>
        </div>
        <button type="button" className={chatStyles.primaryButton} disabled={loading} onClick={() => void scan()}>
          {loading ? "Scanning…" : "Scan markets and news"}
        </button>
      </header>
      <label className={styles.refresh}>
        <input type="checkbox" checked={autoRefresh} onChange={(event) => {
          setAutoRefresh(event.target.checked);
          if (event.target.checked) void scan();
        }} />
        Refresh every 5 minutes while this page is open
      </label>
      <div role="status" className={chatStyles.fieldHelp}>
        {loading ? "Checking sources…" : snapshot ? (
          <>Scan retrieved <time dateTime={snapshot.scannedAt}>{timeFormat.format(new Date(snapshot.scannedAt))}</time>.</>
        ) : "No scan yet."}
      </div>
      {error && <p role="alert" className={chatStyles.errorNotice}>{error} {snapshot && "The previous scan is still shown."}</p>}
      {snapshot && (
        <>
          {snapshot.quotes.length > 0 && (
            <ul className={styles.quotes} aria-label="Market observations">
              {snapshot.quotes.map((quote) => (
                <li className={styles.quote} key={quote.symbol}>
                  <h3 className={chatStyles.sectionTitle}>{quote.label}</h3>
                  <p>{feedLabels[quote.group]} · {quote.symbol}</p>
                  <p className={styles.price}><strong>{valueFormat.format(quote.value)}</strong> {quote.unit}</p>
                  <p>{quote.group === "crypto" && quote.precision === "time" ? "Last trade" : "As of"}{" "}
                    <time dateTime={quote.observedAt}>{observation(quote)}</time>
                    {quote.stale && <strong className={styles.stale}> · Stale observation</strong>}
                  </p>
                  <a className={styles.source} href={quote.sourceUrl} target="_blank" rel="noreferrer">{quote.source}</a>
                </li>
              ))}
            </ul>
          )}
          {snapshot.headlines.length > 0 && (
            <section aria-labelledby="market-news-title">
              <h3 id="market-news-title" className={chatStyles.sectionTitle}>Headlines</h3>
              <ul className={styles.headlines}>
                {snapshot.headlines.map((item) => (
                  <li key={item.url}>
                    <a className={styles.source} href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                    <p className={chatStyles.fieldHelp}>{item.source} · <time dateTime={item.publishedAt}>{timeFormat.format(new Date(item.publishedAt))}</time></p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {snapshot.issues.length > 0 && (
            <div className={styles.issues}>
              <h3 className={chatStyles.sectionTitle}>Coverage gaps</h3>
              <ul>
                {snapshot.issues.map((issue) => (
                  <li key={issue.feed + issue.message}><strong>{feedLabels[issue.feed]}</strong> · {issue.message}</li>
                ))}
              </ul>
            </div>
          )}
          {!hasEvidence && <p className={chatStyles.fieldHelp}>No observations or headlines were available. Scan again to retry the sources.</p>}
          {hasEvidence && (
            <div className={chatStyles.buttonRow}>
              <button type="button" className={chatStyles.secondaryButton} disabled={!canUseEvidence || loading}
                onClick={() => onUseEvidence(snapshotEvidence(snapshot))}>
                Use scan in Trader Builder
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
