"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import chat from "@/lib/codexforge/jarvis-chat/components/JarvisChatPanel.module.css";
import { assessPracticeBuy } from "@/lib/codexforge/trading-research/practice-strategy-client";
import styles from "./TradingPracticePanel.module.css";

type Intent = { requestId: string; ticker: string; quantity: number; limitPrice: number };
type PracticeOrder = Omit<Intent, "requestId"> & {
  id: string; reservedPence: number; status: string; createdAt: string; brokerOrderId?: string;
};
type PracticeStatus = {
  configured: boolean; currency: "GBP"; allocationPence: number; reservedPence: number;
  availableCashPence: number | null; accountIssue?: string;
  orders: PracticeOrder[]; instruments: { ticker: string; name: string }[];
};

const endpoint = "/api/codexforge/trading-research/practice";
const pendingKey = "jarvis-trading212-practice-pending-v1";
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
const pounds = (pence: number) => money.format(pence / 100);

function readPending(): Intent | null {
  const text = sessionStorage.getItem(pendingKey);
  if (!text) return null;
  const intent: Intent = JSON.parse(text);
  if (typeof intent.requestId !== "string" || typeof intent.ticker !== "string"
    || !Number.isFinite(intent.quantity) || !Number.isFinite(intent.limitPrice)) {
    throw new Error("The saved practice request could not be read.");
  }
  return intent;
}

export function TradingPracticePanel() {
  const [status, setStatus] = useState<PracticeStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [assessing, setAssessing] = useState(false);
  const [rule, setRule] = useState("");
  const [decision, setDecision] = useState<Awaited<ReturnType<typeof assessPracticeBuy>> | null>(null);
  const [pending, setPending] = useState<Intent | null>(null);
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [issue, setIssue] = useState("");
  const [notice, setNotice] = useState("");
  const inFlight = useRef(false);
  const assessment = useRef<string | null>(null);
  const statusRequest = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    statusRequest.current?.abort();
    const controller = new AbortController();
    statusRequest.current = controller;
    setLoading(true);
    try {
      const response = await fetch(endpoint, { cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error("Practice account status is unavailable. Refresh to try again.");
      const next: PracticeStatus = await response.json();
      if (controller.signal.aborted) return;
      const saved = readPending();
      const recorded = saved && next.orders.find((order) => order.id === saved.requestId);
      if (recorded) {
        sessionStorage.removeItem(pendingKey);
        setPending(null);
        setQuantity("");
        setPrice("");
        if (recorded.status === "unconfirmed" || recorded.status === "submitting") {
          setNotice("Check this order in Trading 212 practice. Its budget remains reserved.");
        }
      } else {
        setPending(saved);
        if (saved) {
          setTicker(saved.ticker);
          setQuantity(String(saved.quantity));
          setPrice(String(saved.limitPrice));
        }
      }
      setStatus(next);
      setIssue("");
    } catch {
      if (!controller.signal.aborted) {
        setStatus(null);
        setIssue("Couldn’t load the practice account or its saved request. Refresh the account to try again.");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    function leavePage() { assessment.current = null; }
    window.addEventListener("pagehide", leavePage);
    return () => {
      leavePage();
      window.removeEventListener("pagehide", leavePage);
      statusRequest.current?.abort();
    };
  }, [refresh]);

  const remaining = status ? Math.max(0, status.allocationPence - status.reservedPence) : 0;
  const instrument = status?.instruments.find((item) => item.ticker === ticker);
  const busy = sending || assessing;
  const validQuantity = /^\d+(\.\d{1,4})?$/.test(quantity) && Number(quantity) > 0 && Number(quantity) <= 10_000;
  const validPrice = /^\d+(\.\d{1,2})?$/.test(price) && Number(price) > 0 && Number(price) <= 1_000_000;
  const cost = Math.ceil(Math.round(Number(quantity) * 10_000) * Math.round(Number(price) * 100) / 10_000);
  const canSubmit = Boolean(status?.configured && !status.accountIssue && instrument && validQuantity && validPrice
    && Number.isSafeInteger(cost) && cost > 0 && cost <= remaining
    && status.availableCashPence !== null && cost <= status.availableCashPence && !loading && !busy);

  async function placeOrder(intent: Intent) {
    setSending(true);
    let sent = false;
    try {
      sessionStorage.setItem(pendingKey, JSON.stringify(intent));
      setPending(intent);
      sent = true;
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(intent),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        if (body?.safeToEdit === true || body?.error?.safeToEdit === true) {
          sessionStorage.removeItem(pendingKey);
          setPending(null);
          await refresh();
        }
        throw new Error(typeof body?.error === "string" ? body.error : body?.error?.message || "Order status is uncertain. Refresh before retrying this request.");
      }
      setQuantity("");
      setPrice("");
      setNotice("Practice request recorded. Check its status below.");
      await refresh();
    } catch (caught) {
      setIssue(sent && caught instanceof Error && !(caught instanceof TypeError)
        ? caught.message : sent ? "Order status is uncertain. Refresh before retrying this request."
          : "Jarvis could not save the request reference in this browser. The order was not sent.");
    } finally {
      setSending(false);
    }
  }

  async function submit(askJarvis: boolean) {
    if (!canSubmit || inFlight.current || !instrument || (askJarvis && (pending || !rule.trim()))) return;
    inFlight.current = true;
    const intent = pending ?? { requestId: crypto.randomUUID(), ticker, quantity: Number(quantity), limitPrice: Number(price) };
    setIssue("");
    setNotice("");
    if (!pending) setDecision(null);
    try {
      if (askJarvis) {
        setAssessing(true);
        assessment.current = intent.requestId;
        const result = await assessPracticeBuy({
          ticker: intent.ticker, name: instrument.name, quantity: intent.quantity, limitPrice: intent.limitPrice, rule: rule.trim(),
        });
        if (assessment.current !== intent.requestId) return;
        setDecision(result);
        if (result.decision !== "place_limit") return;
      }
      assessment.current = null;
      setAssessing(false);
      await placeOrder(intent);
    } catch (caught) {
      if (assessment.current === intent.requestId) {
        setIssue(caught instanceof Error ? caught.message : "Jarvis could not assess this practice rule. No order was sent.");
      }
    } finally {
      assessment.current = null;
      inFlight.current = false;
      setAssessing(false);
    }
  }

  return (
    <section className={chat.panel} aria-labelledby="practice-title">
      <header className={chat.panelHeader}>
        <div>
          <h2 id="practice-title" className={chat.panelTitle}>Trading 212 practice orders</h2>
          <p className={chat.panelSummary}>Set a GBP buy limit using virtual funds. Trading 212 can fill the order at your limit or lower until its DAY expiry, including after you close Jarvis.</p>
        </div>
        <button type="button" className={chat.secondaryButton} disabled={loading || busy} onClick={() => void refresh()}>Refresh account</button>
      </header>
      {loading && <p role="status" className={chat.fieldHelp}>Loading practice account…</p>}
      {status && <>
        <p className={chat.fieldHelp}>Of the {pounds(status.allocationPence)} practice budget before fees, {pounds(status.reservedPence)} is used or reserved and {pounds(remaining)} remains. Submitted orders continue to count after expiry or sale. Profits do not replenish the budget.</p>
        {!status.configured ? (
          <div className={styles.setup}>
            <h3 className={chat.sectionTitle}>Connect a practice account</h3>
            <p>Open Settings → API (Beta) in your Trading 212 practice Invest account and generate a key with account, instrument metadata and order execution permissions.</p>
            <p>Save the key as <code>TRADING212_DEMO_API_KEY</code> and the secret as <code>TRADING212_DEMO_API_SECRET</code> in the Jarvis server’s <code>.env.local</code>, then restart Jarvis. Practice uses virtual funds.</p>
            <a href="https://helpcentre.trading212.com/hc/en-us/articles/14584770928157-Trading-212-API-key" target="_blank" rel="noreferrer">Trading 212 API key instructions</a>
          </div>
        ) : <>
          {status.accountIssue && <p role="alert" className={chat.errorNotice}>{status.accountIssue}</p>}
          {status.availableCashPence !== null && <p className={chat.fieldHelp}>Available Trading 212 practice cash: {pounds(status.availableCashPence)}.</p>}
          {!status.instruments.length && <p className={chat.fieldHelp}>No eligible GBP instruments are available.</p>}
          <form className={chat.composer} onSubmit={(event) => event.preventDefault()}>
            <div className={styles.fields}>
              <label>Instrument
                <select value={ticker} onChange={(e) => setTicker(e.target.value)} disabled={busy || !!pending} className={chat.select}>
                  <option value="">Select an instrument</option>
                  {status.instruments.map((item) => <option value={item.ticker} key={item.ticker}>{item.name} ({item.ticker})</option>)}
                </select>
              </label>
              <label>Shares
                <input type="number" min="0.0001" max="10000" step="0.0001" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={busy || !!pending} className={chat.input} />
              </label>
              <label>Buy limit per share (£)
                <input type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} disabled={busy || !!pending} className={chat.input} />
              </label>
            </div>
            {validPrice && validQuantity && Number.isSafeInteger(cost) && <p className={chat.fieldHelp}>Maximum order value {pounds(cost)}.</p>}
            {pending && !sending && <p className={chat.fieldHelp}>This request has a saved reference. Refresh to check its status. A retry uses the same reference.</p>}
            <div className={chat.buttonRow}>
              <button type="button" className={chat.secondaryButton} onClick={() => void submit(false)} disabled={!canSubmit}>{sending ? "Submitting…" : pending ? "Retry same practice request" : "Place practice limit order"}</button>
            </div>
            <label className={chat.composerLabel} htmlFor="practice-ai-rule">Your rule for Jarvis</label>
            <textarea id="practice-ai-rule" rows={2} maxLength={240} value={rule} className={chat.textarea}
              disabled={busy || !!pending} onChange={(event) => setRule(event.target.value)}
              placeholder="Describe the evidence that would justify this practice buy." />
            <p className={chat.fieldHelp}>{instrument && validQuantity && validPrice
              ? `One local AI assessment may hold or submit a single practice buy of ${quantity} shares of ${instrument.ticker} at ${money.format(Number(price))} per share or lower.`
              : "Choose the instrument, shares and limit above for a single local AI assessment."} Closing this page before the decision cancels permission to submit.</p>
            <div className={chat.buttonRow}>
              <button type="button" className={chat.primaryButton} disabled={!canSubmit || !!pending || !rule.trim()}
                onClick={() => void submit(true)}>{assessing ? "Assessing your rule…" : "Let Jarvis decide once (practice)"}</button>
              {assessing && <button type="button" className={chat.secondaryButton} disabled={Boolean(notice)}
                onClick={() => { assessment.current = null; setNotice("Permission withdrawn. This assessment cannot place an order."); }}>Cancel this permission</button>}
            </div>
          </form>
        </>}
        {decision && <div className={styles.setup} role="status">
          <strong>{decision.decision === "hold" ? "Jarvis chose to hold" : "Jarvis chose the practice limit buy"}</strong>
          <p>{decision.reason}</p>
          <a href={`/jarvis-trading?conversation=${encodeURIComponent(decision.conversationId)}#trader-builder`}>Read the decision conversation</a>
        </div>}
        {status.orders.length > 0 && <div className={styles.setup}>
          <h3 className={chat.sectionTitle}>Practice requests</h3>
          <ul className={styles.orders}>{status.orders.map((order) => (
            <li key={order.id}><strong>{order.ticker}</strong> · {order.quantity} shares at {money.format(order.limitPrice)} · {order.status}
              <small>{new Date(order.createdAt).toLocaleString("en-GB")}{order.brokerOrderId && ` · Broker reference ${order.brokerOrderId}`}</small>
              {(order.status === "unconfirmed" || order.status === "submitting") && <small>Check the order in Trading 212 practice. Its budget remains reserved.</small>}
            </li>
          ))}</ul>
        </div>}
      </>}
      {issue && <p role="alert" className={chat.errorNotice}>{issue}</p>}
      {notice && <p role="status" className={chat.fieldHelp}>{notice}</p>}
    </section>
  );
}
