"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import type { FutureHealthProbeModel } from "../future-health-probe-types";
import { buildFutureHealthProbeReactKey } from "../future-health-probe-types";
import { buildHealthProbeResult, buildHealthProbeResultItem, summarizeFutureHealthProbeSession } from "..";
import { FutureHealthProbeEmptyState } from "./FutureHealthProbeEmptyState";
import { FutureHealthProbeSafetyNotice } from "./FutureHealthProbeSafetyNotice";
import { HealthProbeAllowlistPanel } from "./HealthProbeAllowlistPanel";
import { HealthProbeApprovalPanel } from "./HealthProbeApprovalPanel";
import { HealthProbeExecutionBridgePanel } from "./HealthProbeExecutionBridgePanel";
import { HealthProbePolicyPanel } from "./HealthProbePolicyPanel";
import { HealthProbePreflightPanel } from "./HealthProbePreflightPanel";
import { HealthProbeReadinessUpdatePanel } from "./HealthProbeReadinessUpdatePanel";
import { HealthProbeRequestPanel } from "./HealthProbeRequestPanel";
import { HealthProbeResultPanel } from "./HealthProbeResultPanel";
import { HealthProbeTargetPanel } from "./HealthProbeTargetPanel";
import { copyButton, textarea } from "./shared";

export function FutureGuardedHealthProbePanel({ model }: { model: FutureHealthProbeModel }) {
  const [manualResult, setManualResult] = useState("");
  const suppliedPreview = useMemo(() => {
    if (!manualResult.trim()) return model.result;
    return buildHealthProbeResult(model.targets, [
      buildHealthProbeResultItem({
        targetId: model.request.targetId,
        status: "supplied-configured",
        resultSource: "operator-supplied",
        suppliedValueLabel: manualResult.trim(),
        warningReasons: ["Manual supplied result only; no probe executed."],
        confidence: "low",
      }),
    ]);
  }, [manualResult, model.request.targetId, model.result, model.targets]);

  const copyText = (text: string) => {
    void navigator.clipboard?.writeText(text);
  };

  if (!model.targets.length) {
    return <FutureHealthProbeEmptyState reason="Future Guarded Health Probe metadata is missing." />;
  }

  const probePacket = [
    "Future Guarded Health Probe packet",
    `Request: ${model.request.id}`,
    `Target: ${model.request.targetId}`,
    `Mode: ${model.request.requestedMode}`,
    model.request.noJobExecutionGuarantee,
    "metadata-only/manual-first/request-ready; no arbitrary command; no arbitrary endpoint; no file writes; preserve latest-message authority.",
  ].join("\n");
  const checklist = [
    "Local setup checklist",
    "Confirm configured path string presence manually.",
    "Supply version label only if known.",
    "Supply endpoint configured status without calling the endpoint.",
    "Review artifact output boundary without writing files.",
    "Keep probes blocked unless explicit, allowlisted, approved, metadata-only, and safe.",
  ].join("\n");

  return (
    <main style={page} data-future-health-probe-panel="FutureGuardedHealthProbePanel renders metadata-only manual-first no creative job execution no render execution no arbitrary command no arbitrary endpoint no file writes preserve latest-message authority Focus Mode UX calm workflow layout shell without duplicate route chip cloud route hero title does not vertically wrap stable key helper">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 71</span>
          <h1 style={headline}>Future Guarded Health Probe</h1>
          <p style={lede}>
            Bridge health profile to explicit approval, allowlisted safe probe packet, guarded probe boundary,
            metadata-only result capture, and readiness update. Manual-first by default; real probes are disabled.
          </p>
          <div style={links}>
            <a href="/local-bridge-health" style={link}>Local Bridge Health</a>
            <a href="/creative-readiness" style={link}>Creative Readiness</a>
            <a href="/creative-executor" style={link}>Creative Executor</a>
            <a href="/creative-sandbox" style={link}>Creative Sandbox</a>
            <a href="/video-render" style={link}>Video Render</a>
          </div>
        </div>
        <div style={statusGrid}>
          <Status label="Targets" value={String(model.summary.targetCount)} />
          <Status label="Policy" value={model.summary.policyPosture} />
          <Status label="Preflight" value={model.summary.preflightStatus} />
          <Status label="Bridge" value={model.summary.executionBridgeStatus} />
        </div>
      </section>

      <FutureHealthProbeSafetyNotice />

      <section style={summaryStrip}>
        {summarizeFutureHealthProbeSession(model.summary).map((line, index) => (
          <span key={buildFutureHealthProbeReactKey("summary", line, index)}>{line}</span>
        ))}
      </section>

      <section style={copyRow}>
        <button type="button" style={copyButton} onClick={() => copyText(probePacket)}>Copy probe packet</button>
        <button type="button" style={copyButton} onClick={() => copyText(checklist)}>Copy local setup checklist</button>
      </section>

      <section style={manualSupply}>
        <label style={{ display: "grid", gap: 8, color: "#dbeafe", fontSize: 13, fontWeight: 800 }}>
          Paste/supply manual result
          <textarea
            value={manualResult}
            onChange={(event) => setManualResult(event.target.value)}
            placeholder="Manual metadata only, for example: Blender path configured by operator. No command output unless supplied."
            style={textarea}
          />
        </label>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <HealthProbeTargetPanel targets={model.targets} />
          <HealthProbeRequestPanel request={model.request} />
          <HealthProbeAllowlistPanel allowlist={model.allowlist} />
          <HealthProbePreflightPanel preflight={model.preflight} />
          <HealthProbeResultPanel result={suppliedPreview} />
          <HealthProbeReadinessUpdatePanel update={model.readinessUpdate} />
        </div>
        <aside style={rail}>
          <HealthProbeApprovalPanel approval={model.approval} />
          <HealthProbePolicyPanel policy={model.policy} />
          <HealthProbeExecutionBridgePanel bridge={model.executionBridge} />
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
const headline: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.05, letterSpacing: 0, maxWidth: 1120, minWidth: 0, overflowWrap: "normal", wordBreak: "normal", whiteSpace: "nowrap" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 1040, minWidth: 0, overflowWrap: "break-word" };
const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.24)", background: "rgba(14,165,233,0.12)", borderRadius: 8, padding: "8px 10px", color: "#e0f2fe", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", maxWidth: "100%", overflowWrap: "break-word" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 145px), 1fr))", gap: 8, minWidth: 0 };
const statusCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, maxWidth: "100%", overflowWrap: "break-word" };
const summaryStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, color: "#cbd5e1", fontSize: 12, fontWeight: 800, minWidth: 0, overflowWrap: "break-word" };
const copyRow: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const manualSupply: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.48)", borderRadius: 8, padding: 12, minWidth: 0 };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 400px)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
