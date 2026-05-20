"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import type { CreativeExecutionSandboxModel } from "../creative-execution-sandbox-types";
import { summarizeCreativeExecutionSandboxSession } from "../creative-execution-sandbox-summary";
import { CreativeExecutionSandboxEmptyState } from "./CreativeExecutionSandboxEmptyState";
import { CreativeExecutionSandboxSafetyNotice } from "./CreativeExecutionSandboxSafetyNotice";
import { SandboxArtifactSimulationPanel } from "./SandboxArtifactSimulationPanel";
import { SandboxCancellationPanel } from "./SandboxCancellationPanel";
import { SandboxExecutionRequestPanel } from "./SandboxExecutionRequestPanel";
import { SandboxLifecyclePanel } from "./SandboxLifecyclePanel";
import { SandboxLogSimulationPanel } from "./SandboxLogSimulationPanel";
import { SandboxNextActionPanel } from "./SandboxNextActionPanel";
import { SandboxReviewHandoffPanel } from "./SandboxReviewHandoffPanel";
import { SandboxRunModelPanel } from "./SandboxRunModelPanel";
import { SandboxVerificationPanel } from "./SandboxVerificationPanel";
import { SandboxMetric, copyButton, pill } from "./shared";

export function CreativeExecutionSandboxPanel({ model }: { model: CreativeExecutionSandboxModel }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  if (!model.request || !model.runModel.lifecycleSteps.length) {
    return <CreativeExecutionSandboxEmptyState />;
  }

  const sandboxReport = [
    "Creative Execution Sandbox report",
    ...summarizeCreativeExecutionSandboxSession(model.summary),
    ...model.verificationReport.summary,
    ...model.artifactSimulation.summary,
    ...model.cancellationPlan.summary,
  ].join("\n");
  const reviewHandoff = [
    "Creative Execution Sandbox to Creative Artifact Review handoff",
    ...model.reviewHandoff.summary,
  ].join("\n");

  return (
    <main
      style={page}
      data-creative-execution-sandbox-panel="CreativeExecutionSandboxPanel renders simulation-only no real execution no render execution no command execution no file writes preserve latest-message authority Focus Mode UX calm workflow layout shell without duplicate route chip cloud copy sandbox report allowed copy review handoff allowed copy future executor prompt allowed stable key helper"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 69</span>
          <h1 style={headline}>Creative Execution Sandbox</h1>
          <p style={lede}>
            Creative executor request to deterministic sandbox run simulation, fake output lifecycle,
            cancellation simulation, artifact capture simulation, verification summary, and review board handoff.
            Simulation-only: no real execution, no render execution, no command execution, and no file writes.
            Verification can recommend Creative Readiness Audit before any future guarded health probe.
          </p>
          <div style={links}>
            <a href="/creative-executor" style={link}>Creative Executor</a>
            <a href="/creative-readiness" style={link}>Creative Readiness</a>
            <a href="/creative-mvp" style={link}>Creative MVP</a>
            <a href="/local-bridge-health" style={link}>Local Bridge Health</a>
            <a href="/health-probe" style={link}>Health Probe</a>
            <a href="/artifacts/review" style={link}>Artifact Review</a>
            <a href="/video-render" style={link}>Video Render</a>
          </div>
        </div>
        <div style={statusGrid}>
          <SandboxMetric label="Mode" value={model.request.sandboxMode} />
          <SandboxMetric label="Verification" value={model.summary.verificationPosture} />
          <SandboxMetric label="Artifacts" value={String(model.summary.fakeArtifactCount)} />
          <SandboxMetric label="Logs" value={String(model.summary.fakeLogCount)} />
        </div>
      </section>

      <CreativeExecutionSandboxSafetyNotice />

      <section style={summaryStrip}>
        {summarizeCreativeExecutionSandboxSession(model.summary).map((line) => (
          <span key={`creative-execution-sandbox-summary-${line.slice(0, 48)}`}>{line}</span>
        ))}
      </section>

      <section style={copyRow}>
        <button type="button" style={copyButton} onClick={() => copyText("sandbox report", sandboxReport)}>Copy sandbox report</button>
        <button type="button" style={copyButton} onClick={() => copyText("review handoff", reviewHandoff)}>Copy review handoff</button>
        <button type="button" style={copyButton} onClick={() => copyText("future executor prompt", model.reviewHandoff.executorReviewPrompt)}>Copy future executor prompt</button>
        <span style={pill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <SandboxExecutionRequestPanel request={model.request} validation={model.requestValidation} />
          <SandboxRunModelPanel runModel={model.runModel} />
          <SandboxLifecyclePanel lifecycle={model.lifecycle} />
          <SandboxArtifactSimulationPanel simulation={model.artifactSimulation} />
          <SandboxLogSimulationPanel simulation={model.logSimulation} />
        </div>
        <aside style={rail}>
          <SandboxCancellationPanel plan={model.cancellationPlan} />
          <SandboxVerificationPanel report={model.verificationReport} />
          <SandboxReviewHandoffPanel handoff={model.reviewHandoff} />
          <SandboxNextActionPanel plan={model.nextActionPlan} />
        </aside>
      </div>
    </main>
  );
}

const page: CSSProperties = { minHeight: 0, color: "#f8fafc", background: "transparent", padding: 0, display: "grid", gap: 16, minWidth: 0, maxWidth: "100%", fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const hero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(20,184,166,0.22)", background: "linear-gradient(135deg, rgba(7,18,20,0.98), rgba(15,23,42,0.86))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 18, alignItems: "end", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 32, lineHeight: 1.05, letterSpacing: 0, maxWidth: "100%", minWidth: 0, overflowWrap: "normal", wordBreak: "normal", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 1040, minWidth: 0, overflowWrap: "break-word" };
const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const link: CSSProperties = { border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", maxWidth: "100%", overflowWrap: "break-word" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
const summaryStrip: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, padding: 12, display: "flex", flexWrap: "wrap", gap: 10, color: "#cbd5e1", fontSize: 12, fontWeight: 800, minWidth: 0, overflowWrap: "break-word" };
const copyRow: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 430px)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
