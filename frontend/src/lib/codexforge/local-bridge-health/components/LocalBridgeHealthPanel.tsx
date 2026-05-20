"use client";

import type { CSSProperties } from "react";
import type { LocalBridgeHealthModel } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { summarizeLocalBridgeHealthSession } from "../bridge-health-summary";
import { BridgeHealthCheckPlanPanel } from "./BridgeHealthCheckPlanPanel";
import { BridgeHealthNextActionPanel } from "./BridgeHealthNextActionPanel";
import { BridgeHealthPolicyPanel } from "./BridgeHealthPolicyPanel";
import { BridgeHealthProbePreviewPanel } from "./BridgeHealthProbePreviewPanel";
import { BridgeHealthProfilePanel } from "./BridgeHealthProfilePanel";
import { BridgeHealthResultPanel } from "./BridgeHealthResultPanel";
import { BridgeHealthSetupGuidePanel } from "./BridgeHealthSetupGuidePanel";
import { BridgeHealthTargetPanel } from "./BridgeHealthTargetPanel";
import { LocalBridgeHealthEmptyState } from "./LocalBridgeHealthEmptyState";
import { LocalBridgeHealthSafetyNotice } from "./LocalBridgeHealthSafetyNotice";
import { copyButton } from "./shared";

export function LocalBridgeHealthPanel({ model }: { model: LocalBridgeHealthModel }) {
  const copyText = (label: string, text: string) => {
    void navigator.clipboard?.writeText(text);
    void label;
  };

  if (!model.targets.length || !model.profiles.length) {
    return <LocalBridgeHealthEmptyState reason="Local Bridge Health metadata is missing." />;
  }

  const report = [
    "Local Bridge Health Check v1",
    ...summarizeLocalBridgeHealthSession(model.summary),
    ...model.policy.blockedReasons.map((reason) => `Blocked: ${reason}`),
  ].join("\n");
  const setupGuide = model.setupGuide.steps.map((step) => `${step.label}: ${step.detail}`).join("\n");
  const futureProbePacket = model.probePreview.items.map((item) => `${item.label}: ${item.requiredApproval}; ${item.noExecutionGuarantee}`).join("\n");

  return (
    <main style={page} data-local-bridge-health-panel="LocalBridgeHealthPanel renders preview-only dry-run only no command execution no local HTTP calls by default no file writes no render execution future guarded health probe preserve latest-message authority Focus Mode UX calm workflow layout shell without duplicate route chip cloud stable key helper">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 68</span>
          <h1 style={headline}>Local Bridge Health</h1>
          <p style={lede}>
            Local bridge profile to safe health check plan, readiness status, missing configuration,
            blocked execution reasons, and next setup action. Preview-only/manual-only/future-guarded.
          </p>
          <div style={links}>
            <a href="/creative-bridge" style={link}>Creative Bridge</a>
            <a href="/creative-executor" style={link}>Creative Executor</a>
            <a href="/video-render" style={link}>Video Render</a>
            <a href="/capabilities" style={link}>Capabilities</a>
          </div>
        </div>
        <div style={statusGrid}>
          <Status label="Targets" value={String(model.summary.targetCount)} />
          <Status label="Configured" value={String(model.summary.configuredCount)} />
          <Status label="Missing config" value={String(model.summary.missingConfigCount)} />
          <Status label="Probes" value="blocked" />
        </div>
      </section>

      <LocalBridgeHealthSafetyNotice />

      <section style={summaryStrip}>
        {summarizeLocalBridgeHealthSession(model.summary).map((line, index) => (
          <span key={buildLocalBridgeHealthReactKey("summary", line, index)}>{line}</span>
        ))}
      </section>

      <section style={copyRow}>
        <button type="button" style={copyButton} onClick={() => copyText("Copy health report", report)}>Copy health report</button>
        <button type="button" style={copyButton} onClick={() => copyText("Copy setup guide", setupGuide)}>Copy setup guide</button>
        <button type="button" style={copyButton} onClick={() => copyText("Copy future probe packet", futureProbePacket)}>Copy future probe packet</button>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <BridgeHealthTargetPanel targets={model.targets} />
          <BridgeHealthProfilePanel profiles={model.profiles} />
          <BridgeHealthCheckPlanPanel plan={model.checkPlan} />
          <BridgeHealthProbePreviewPanel preview={model.probePreview} />
          <BridgeHealthResultPanel result={model.result} />
          <BridgeHealthSetupGuidePanel guide={model.setupGuide} />
        </div>
        <aside style={rail}>
          <BridgeHealthPolicyPanel policy={model.policy} />
          <BridgeHealthNextActionPanel plan={model.nextActionPlan} onCopy={copyText} />
        </aside>
      </div>
    </main>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return <div style={statusCard}><span>{label}</span><strong>{value}</strong></div>;
}

const page: CSSProperties = { minHeight: 0, color: "#f8fafc", background: "transparent", padding: 0, display: "grid", gap: 16, minWidth: 0, maxWidth: "100%", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(56,189,248,0.2)", background: "linear-gradient(135deg, rgba(8,13,28,0.98), rgba(15,23,42,0.86))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 18, alignItems: "end", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 44, lineHeight: 1.05, letterSpacing: 0, maxWidth: 980, minWidth: 0, overflowWrap: "normal", wordBreak: "normal", whiteSpace: "nowrap" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980, minWidth: 0, overflowWrap: "break-word" };
const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.24)", background: "rgba(14,165,233,0.12)", borderRadius: 8, padding: "8px 10px", color: "#e0f2fe", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", maxWidth: "100%", overflowWrap: "break-word" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 145px), 1fr))", gap: 8, minWidth: 0 };
const statusCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" };
const summaryStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, color: "#cbd5e1", fontSize: 12, fontWeight: 800, minWidth: 0, overflowWrap: "break-word" };
const copyRow: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 400px)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
