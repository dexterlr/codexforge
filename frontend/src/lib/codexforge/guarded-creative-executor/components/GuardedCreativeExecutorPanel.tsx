"use client";

import type { CSSProperties } from "react";
import type { GuardedCreativeExecutorModel } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorSession } from "../creative-executor-summary";
import { CreativeExecutorAdapterAllowlistPanel } from "./CreativeExecutorAdapterAllowlistPanel";
import { CreativeExecutorApprovalPanel } from "./CreativeExecutorApprovalPanel";
import { CreativeExecutorArtifactCapturePanel } from "./CreativeExecutorArtifactCapturePanel";
import { CreativeExecutorDryRunPanel } from "./CreativeExecutorDryRunPanel";
import { CreativeExecutorKillSwitchPanel } from "./CreativeExecutorKillSwitchPanel";
import { CreativeExecutorPolicyPanel } from "./CreativeExecutorPolicyPanel";
import { CreativeExecutorPreflightPanel } from "./CreativeExecutorPreflightPanel";
import { CreativeExecutorRequestPanel } from "./CreativeExecutorRequestPanel";
import { CreativeExecutorResultPanel } from "./CreativeExecutorResultPanel";
import { GuardedCreativeExecutorEmptyState } from "./GuardedCreativeExecutorEmptyState";
import { GuardedCreativeExecutorSafetyNotice } from "./GuardedCreativeExecutorSafetyNotice";

export function GuardedCreativeExecutorPanel({ model }: { model: GuardedCreativeExecutorModel }) {
  const copyText = (text: string) => {
    void navigator.clipboard?.writeText(text);
  };

  if (!model.request || !model.allowlist.items.length) {
    return <GuardedCreativeExecutorEmptyState reason="Guarded creative executor metadata is missing." />;
  }

  return (
    <main
      style={page}
      data-codexforge-guarded-creative-executor-panel="GuardedCreativeExecutorPanel renders dry-run-first execution disabled no render execution no command execution no file writes future guarded executor preserve latest-message authority Focus Mode UX calm workflow layout shell without duplicate route chip cloud copy dry-run plan allowed copy future executor packet allowed copy artifact capture plan allowed"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 67</span>
          <h1 style={headline}>Guarded Creative Executor</h1>
          <p style={lede}>
            One safe boundary for creative execution packets, adapter allowlists, Local Bridge Health readiness,
            approval packets, dry-run plans, cancellation policy, artifact capture, and future
            guarded executor handoff. Dry-run-first and request-ready; execution disabled.
          </p>
          <div style={links}>
            <a href="/creative-bridge" style={link}>Creative Bridge</a>
            <a href="/local-bridge-health" style={link}>Local Bridge Health</a>
            <a href="/video-render" style={link}>Video Render</a>
            <a href="/artifacts/review" style={link}>Artifact Review</a>
          </div>
        </div>
        <div style={statusGrid}>
          <Status label="Dry-run" value={model.summary.dryRunStatus} />
          <Status label="Execution" value="disabled" />
          <Status label="Request" value={model.summary.requestReady ? "ready" : "blocked"} />
          <Status label="Blockers" value={String(model.summary.blockedCount)} />
        </div>
      </section>

      <GuardedCreativeExecutorSafetyNotice />

      <section style={summaryStrip}>
        {summarizeCreativeExecutorSession(model.summary).map((line) => (
          <span key={`creative-executor-summary-${line.slice(0, 48)}`}>{line}</span>
        ))}
      </section>

      <section style={copyStrip}>
        <button type="button" style={copyButton} onClick={() => copyText(model.dryRun.summary.join("\n"))}>
          Copy dry-run plan
        </button>
        <button type="button" style={copyButton} onClick={() => copyText(model.result.summary.join("\n"))}>
          Copy future executor packet
        </button>
        <button type="button" style={copyButton} onClick={() => copyText(model.artifactCapture.summary.join("\n"))}>
          Copy artifact capture plan
        </button>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <CreativeExecutorRequestPanel request={model.request} validation={model.requestValidation} />
          <CreativeExecutorAdapterAllowlistPanel allowlist={model.allowlist} />
          <CreativeExecutorPreflightPanel preflight={model.preflight} />
          <CreativeExecutorDryRunPanel dryRun={model.dryRun} />
          <CreativeExecutorArtifactCapturePanel capture={model.artifactCapture} />
        </div>
        <aside style={rail}>
          <CreativeExecutorApprovalPanel approval={model.approvalPacket} validation={model.approvalValidation} />
          <CreativeExecutorPolicyPanel policy={model.policy} />
          <CreativeExecutorKillSwitchPanel plan={model.killSwitchPlan} />
          <CreativeExecutorResultPanel result={model.result} />
        </aside>
      </div>
    </main>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div style={statusCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page: CSSProperties = { minHeight: 0, color: "#f8fafc", background: "transparent", padding: 0, display: "grid", gap: 16, minWidth: 0, maxWidth: "100%", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(20,184,166,0.22)", background: "linear-gradient(135deg, rgba(7,18,20,0.98), rgba(15,23,42,0.86))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 18, alignItems: "end", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 44, lineHeight: 1.05, letterSpacing: 0, maxWidth: 1100, minWidth: 0, overflowWrap: "normal", wordBreak: "normal", whiteSpace: "nowrap" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 1040, minWidth: 0, overflowWrap: "break-word" };
const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", maxWidth: "100%", overflowWrap: "break-word" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
const statusCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" };
const summaryStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, color: "#cbd5e1", fontSize: 12, fontWeight: 800, minWidth: 0, overflowWrap: "break-word" };
const copyStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const copyButton: CSSProperties = { border: "1px solid rgba(94,234,212,0.32)", background: "rgba(20,184,166,0.14)", color: "#f8fafc", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 420px)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
