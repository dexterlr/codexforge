"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  fetchPrivateAlphaStatus,
  listPrivateAlphaRuns,
} from "../../private-alpha/private-alpha-api-client";
import type {
  PrivateAlphaRunState,
  PrivateAlphaRunSummary,
  PrivateAlphaStatus,
} from "../../private-alpha";

type AsyncState<T> =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; value: T };

export function ProductStatePanel({
  title,
  children,
  tone = "neutral",
  role,
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
  role?: "status" | "alert";
}) {
  return (
    <section role={role} aria-live={role === "status" ? "polite" : undefined} style={{ ...statePanel, ...toneStyle(tone) }}>
      <h2 style={stateTitle}>{title}</h2>
      <div style={stateBody}>{children}</div>
    </section>
  );
}

export function ProviderReadinessPanel() {
  const { state, reload } = useStatus();

  if (state.kind === "loading") {
    return <LoadingState label="Loading server-owned provider readiness..." />;
  }
  if (state.kind === "error") {
    return <ErrorState title="Provider readiness could not be loaded" message={state.message} onRetry={reload} />;
  }

  const status = state.value;
  const localReady = status.providerAvailable && status.modelAvailable && !status.killSwitchEngaged;
  return (
    <div style={stack} data-codexforge-provider-readiness-state={localReady ? "ready" : "unavailable"}>
      <ProductStatePanel
        title={localReady ? "Local model is admitted and available" : "Local execution is not currently available"}
        tone={localReady ? "success" : "warning"}
        role="status"
      >
        <p style={copy}>
          {localReady
            ? "Jarvis may propose the admitted local model, but manual approval and the separate execution action remain required."
            : providerUnavailableReason(status)}
        </p>
      </ProductStatePanel>

      <section aria-labelledby="provider-boundary-title" style={card}>
        <h2 id="provider-boundary-title" style={cardTitle}>Admitted execution boundary</h2>
        <dl style={definitionGrid}>
          <Fact term="Default identity" detail="ollama-local::gpt-oss:20b" mono />
          <Fact term="Data boundary" detail="Local machine" />
          <Fact term="Output ceiling" detail="4,096 tokens" />
          <Fact term="Approval" detail="Manual, exact-scope approval" />
          <Fact term="Execution" detail="Separate action; one attempt only" />
          <Fact term="Fallback" detail="None - no retry, reroute, or substitution" />
        </dl>
      </section>

      <section aria-labelledby="provider-cloud-title" style={card}>
        <h2 id="provider-cloud-title" style={cardTitle}>Cloud and cost boundary</h2>
        <ul style={list}>
          <li>Local-first selection remains the default.</li>
          <li>Groq free-tier use is cloud transfer, capped at a 512-token envelope, and needs explicit cloud acknowledgements.</li>
          <li>Paid execution is disabled. CodexForge never silently converts a local or free plan into paid execution.</li>
          <li>Credentials remain server-side. There is no browser credential entry, storage, or direct provider call.</li>
          <li>Models are never downloaded automatically and the approved identity is never substituted after persistence.</li>
        </ul>
      </section>
    </div>
  );
}

export function SafetySettingsPanel() {
  const { state, reload } = useStatus();

  if (state.kind === "loading") {
    return <LoadingState label="Loading current safety posture..." />;
  }
  if (state.kind === "error") {
    return <ErrorState title="Safety posture could not be loaded" message={state.message} onRetry={reload} />;
  }

  const status = state.value;
  return (
    <div style={stack} data-codexforge-safety-state={status.killSwitchEngaged ? "kill-switch-engaged" : "guarded-ready"}>
      <ProductStatePanel
        title={status.killSwitchEngaged ? "Kill switch engaged - execution is blocked" : "Kill switch clear - approval gates remain active"}
        tone={status.killSwitchEngaged ? "danger" : "success"}
        role="status"
      >
        <p style={copy}>
          {status.killSwitchEngaged
            ? `The ${status.killSwitchSources.length ? status.killSwitchSources.join(" and ") : "server"} checkpoint is engaged. No execution can begin.`
            : "Both server-owned kill-switch checkpoints remain part of every execution path; a clear switch does not grant approval."}
        </p>
      </ProductStatePanel>

      <section aria-labelledby="safety-policy-title" style={card}>
        <h2 id="safety-policy-title" style={cardTitle}>Current policy</h2>
        <dl style={definitionGrid}>
          <Fact term="Selection" detail="Local first" />
          <Fact term="Approval record" detail={status.approvalRecording === "enabled" ? "Required and enabled" : "Unavailable"} />
          <Fact term="Provider" detail="Local Ollama" />
          <Fact term="Model" detail="gpt-oss:20b" mono />
          <Fact term="Paid execution" detail="Disabled" />
          <Fact term="Persistence" detail="Local file-backed audit" />
        </dl>
      </section>

      <section aria-labelledby="safety-boundaries-title" style={card}>
        <h2 id="safety-boundaries-title" style={cardTitle}>Boundaries that are not settings</h2>
        <ul style={list}>
          <li>Cloud transfer needs exact-scope acknowledgement and a separate execution confirmation.</li>
          <li>Approval does not apply a patch, run validation, download a model, or deploy anything.</li>
          <li>Browser secret entry and storage are intentionally absent; provider credentials remain server-only.</li>
          <li>No retry, fallback, paid reroute, provider substitution, or automatic download is enabled.</li>
          <li>This page is read-only. It does not present fake toggles or settings that are not persisted.</li>
        </ul>
      </section>
    </div>
  );
}

export function AuditRunsPanel() {
  const [state, setState] = useState<AsyncState<readonly PrivateAlphaRunSummary[]>>({ kind: "loading" });
  const reload = useCallback(() => {
    setState({ kind: "loading" });
    void listPrivateAlphaRuns(12)
      .then((runs) => setState({ kind: "ready", value: runs }))
      .catch((error: unknown) =>
        setState({ kind: "error", message: safeError(error, "Run history is temporarily unavailable.") })
      );
  }, []);

  useEffect(() => reload(), [reload]);

  if (state.kind === "loading") {
    return <LoadingState label="Loading local run history..." />;
  }
  if (state.kind === "error") {
    return <ErrorState title="Run history could not be loaded" message={state.message} onRetry={reload} />;
  }
  if (state.value.length === 0) {
    return (
      <ProductStatePanel title="No runs yet" tone="neutral" role="status">
        <p style={copy}>Start in Jarvis, review the proposed boundary, and approve only the exact action you intend. Its state will appear here.</p>
      </ProductStatePanel>
    );
  }

  return (
    <section aria-labelledby="audit-history-title" style={card} data-codexforge-audit-state="success">
      <div style={cardHeading}>
        <div>
          <span style={eyebrow}>Local audit history</span>
          <h2 id="audit-history-title" style={cardTitle}>Recent guarded runs</h2>
        </div>
        <button type="button" onClick={reload} style={button}>Refresh history</button>
      </div>
      <p style={copy}>Readable summaries omit raw run identifiers, approval hashes, credentials, and secret material.</p>
      <ol style={runList}>
        {state.value.map((run, index) => (
          <li key={`${run.createdAt}-${index}`} style={runCard}>
            <div style={cardHeadingRow}>
              <strong style={runTitle}>{run.capability === "code" ? "Code task" : "Text task"}</strong>
              <span style={runStatePill(run.state)}>{runStateLabel(run.state)}</span>
            </div>
            <dl style={definitionGrid}>
              <Fact term="Provider" detail={providerLabel(run)} />
              <Fact term="Model" detail={modelLabel(run)} mono />
              <Fact term="Data boundary" detail={dataBoundaryLabel(run)} />
              <Fact term="Output ceiling" detail={`${run.maximumOutputTokens.toLocaleString()} tokens`} />
              <Fact term="Approval" detail={approvalLabel(run.state)} />
              <Fact term="Updated" detail={formatTimestamp(run.updatedAt)} />
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function TradingResearchPanel() {
  return (
    <div style={stack} data-codexforge-trading-boundary="research-only no-broker no-orders no-advice no-automation no-live-money">
      <ProductStatePanel title="No research brief is active" tone="neutral" role="status">
        <p style={copy}>Ask Jarvis to organize a research question, assumptions, evidence, and risks. No market data is fetched automatically.</p>
      </ProductStatePanel>
      <section aria-labelledby="trading-boundary-title" style={card}>
        <h2 id="trading-boundary-title" style={cardTitle}>Research boundary</h2>
        <ul style={list}>
          <li>This is research and planning material, not financial advice or a recommendation to buy or sell.</li>
          <li>There is no broker connection, order placement, portfolio mutation, live-money action, or automated trading.</li>
          <li>Paper and live execution are unavailable. Nothing on this page represents current market data.</li>
          <li>Any future consequential action must remain separately permissioned, approved, stoppable, and auditable.</li>
        </ul>
      </section>
    </div>
  );
}

function useStatus() {
  const [state, setState] = useState<AsyncState<PrivateAlphaStatus>>({ kind: "loading" });
  const reload = useCallback(() => {
    setState({ kind: "loading" });
    void fetchPrivateAlphaStatus()
      .then((status) => setState({ kind: "ready", value: status }))
      .catch((error: unknown) =>
        setState({ kind: "error", message: safeError(error, "Current server status is temporarily unavailable.") })
      );
  }, []);
  useEffect(() => reload(), [reload]);
  return { state, reload } as const;
}

function LoadingState({ label }: { label: string }) {
  return (
    <ProductStatePanel title="Loading" role="status">
      <p style={copy}>{label}</p>
    </ProductStatePanel>
  );
}

function ErrorState({ title, message, onRetry }: { title: string; message: string; onRetry: () => void }) {
  return (
    <ProductStatePanel title={title} tone="danger" role="alert">
      <p style={copy}>{message}</p>
      <button type="button" onClick={onRetry} style={button}>Try again</button>
    </ProductStatePanel>
  );
}

function Fact({ term, detail, mono = false }: { term: string; detail: string; mono?: boolean }) {
  return (
    <div style={fact}>
      <dt style={factTerm}>{term}</dt>
      <dd style={{ ...factDetail, ...(mono ? monoText : null) }}>{detail}</dd>
    </div>
  );
}

function safeError(error: unknown, fallback: string): string {
  return error instanceof Error && error.message.trim() ? error.message : fallback;
}

function providerUnavailableReason(status: PrivateAlphaStatus): string {
  if (status.killSwitchEngaged) return "The kill switch is engaged, so execution is blocked before any provider call.";
  if (!status.providerAvailable) return "The admitted local provider is unavailable. No cloud fallback or automatic download will occur.";
  if (!status.modelAvailable) return "The admitted local model is unavailable. CodexForge will not substitute or download another model.";
  return "The server-owned execution boundary is currently unavailable.";
}

function runStateLabel(state: PrivateAlphaRunState): string {
  return {
    awaiting_approval: "Awaiting approval",
    approved: "Approved",
    executing: "Running",
    succeeded: "Succeeded",
    failed: "Failed",
    canceled: "Cancelled",
    blocked: "Blocked",
  }[state];
}

function approvalLabel(state: PrivateAlphaRunState): string {
  if (state === "awaiting_approval") return "Required; not yet granted";
  if (state === "canceled") return "Cancelled; no further action";
  if (state === "blocked") return "Recorded; execution blocked";
  return "Exact scope recorded";
}

function providerLabel(run: PrivateAlphaRunSummary): string {
  if (run.providerPreference === "ollama-local") return "Local Ollama";
  if (run.providerPreference === "groq-cloud") return "Groq cloud (free tier only)";
  return "Bound at run creation; open Jarvis for details";
}

function modelLabel(run: PrivateAlphaRunSummary): string {
  if (run.providerPreference === "ollama-local") return "ollama-local::gpt-oss:20b";
  if (run.providerPreference === "auto") return "Bound model shown in Jarvis run details";
  const candidate = run.modelPreferenceLabel?.trim() ?? "";
  return candidate && candidate.length <= 80 && /^[a-zA-Z0-9:._/-]+$/.test(candidate)
    ? candidate
    : "Approved cloud model bound at creation";
}

function dataBoundaryLabel(run: PrivateAlphaRunSummary): string {
  if (run.providerPreference === "ollama-local") return "Local machine";
  if (run.providerPreference === "groq-cloud") return "Cloud provider";
  return "Bound at run creation; open Jarvis for details";
}

function formatTimestamp(value: string): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Recorded locally" : parsed.toLocaleString();
}

function runStatePill(state: PrivateAlphaRunState): CSSProperties {
  const color = state === "succeeded" ? "#5eead4" : state === "failed" || state === "blocked" ? "#fca5a5" : state === "canceled" ? "#cbd5e1" : "#7dd3fc";
  return { ...pill, color, borderColor: `${color}55`, background: `${color}12` };
}

function toneStyle(tone: "neutral" | "success" | "warning" | "danger"): CSSProperties {
  if (tone === "success") return { borderColor: "rgba(94,234,212,.28)", background: "rgba(20,184,166,.09)" };
  if (tone === "warning") return { borderColor: "rgba(253,230,138,.26)", background: "rgba(245,158,11,.08)" };
  if (tone === "danger") return { borderColor: "rgba(252,165,165,.3)", background: "rgba(127,29,29,.16)" };
  return {};
}

const stack: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const statePanel: CSSProperties = { background: "rgba(15,23,42,.62)", border: "1px solid rgba(148,163,184,.15)", borderRadius: 10, display: "grid", gap: 7, minWidth: 0, padding: 14 };
const stateTitle: CSSProperties = { fontSize: 17, lineHeight: 1.25, margin: 0, overflowWrap: "anywhere" };
const stateBody: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const card: CSSProperties = { background: "rgba(8,13,28,.7)", border: "1px solid rgba(148,163,184,.14)", borderRadius: 10, display: "grid", gap: 12, minWidth: 0, padding: 15 };
const cardHeading: CSSProperties = { alignItems: "start", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between" };
const cardHeadingRow: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between" };
const cardTitle: CSSProperties = { fontSize: 19, lineHeight: 1.25, margin: 0, overflowWrap: "anywhere" };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 10, fontWeight: 950, letterSpacing: ".06em", textTransform: "uppercase" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, margin: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { color: "#cbd5e1", display: "grid", fontSize: 13, gap: 7, lineHeight: 1.5, margin: 0, paddingLeft: 20 };
const definitionGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", margin: 0, minWidth: 0 };
const fact: CSSProperties = { background: "rgba(15,23,42,.58)", border: "1px solid rgba(148,163,184,.12)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const factTerm: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const factDetail: CSSProperties = { color: "#f8fafc", fontSize: 12, fontWeight: 800, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
const monoText: CSSProperties = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" };
const button: CSSProperties = { background: "rgba(14,165,233,.12)", border: "1px solid rgba(125,211,252,.25)", borderRadius: 8, color: "#dbeafe", cursor: "pointer", fontSize: 12, fontWeight: 900, justifySelf: "start", minHeight: 38, padding: "8px 11px" };
const runList: CSSProperties = { display: "grid", gap: 10, listStyle: "none", margin: 0, padding: 0 };
const runCard: CSSProperties = { background: "rgba(15,23,42,.58)", border: "1px solid rgba(148,163,184,.13)", borderRadius: 9, display: "grid", gap: 10, minWidth: 0, padding: 12 };
const runTitle: CSSProperties = { fontSize: 14, lineHeight: 1.3 };
const pill: CSSProperties = { border: "1px solid", borderRadius: 999, fontSize: 10, fontWeight: 900, lineHeight: 1.2, padding: "4px 7px" };
