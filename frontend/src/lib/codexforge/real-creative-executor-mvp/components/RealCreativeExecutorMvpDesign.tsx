"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import type { RealCreativeExecutorMvpDesignModel } from "../real-creative-mvp-types";
import { summarizeRealCreativeMvpSession } from "../real-creative-mvp-summary";
import { MvpAdapterSelectionPanel } from "./MvpAdapterSelectionPanel";
import { MvpApprovalRequirementsPanel } from "./MvpApprovalRequirementsPanel";
import { MvpArtifactReviewLoopPanel } from "./MvpArtifactReviewLoopPanel";
import { MvpCandidatePanel } from "./MvpCandidatePanel";
import { MvpExecutionPathPanel } from "./MvpExecutionPathPanel";
import { MvpKillSwitchRequirementsPanel } from "./MvpKillSwitchRequirementsPanel";
import { MvpOutputBoundaryPanel } from "./MvpOutputBoundaryPanel";
import { MvpReadinessDecisionPanel } from "./MvpReadinessDecisionPanel";
import { MvpSafetyRequirementsPanel } from "./MvpSafetyRequirementsPanel";
import { MvpUserFlowPanel } from "./MvpUserFlowPanel";
import { RealCreativeMvpEmptyState } from "./RealCreativeMvpEmptyState";
import { RealCreativeMvpSafetyNotice } from "./RealCreativeMvpSafetyNotice";
import { MvpMetric, copyButton, page } from "./shared";

export function RealCreativeExecutorMvpDesign({ model }: { model: RealCreativeExecutorMvpDesignModel }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  if (!model.candidates.length) {
    return <RealCreativeMvpEmptyState />;
  }

  const designPacket = [
    "Real Creative Executor MVP Design packet",
    ...summarizeRealCreativeMvpSession(model.summary),
    ...model.adapterSelection.summary,
    ...model.executionPath.summary,
    ...model.safetyRequirements.summary,
    ...model.outputBoundary.summary,
    ...model.killSwitchRequirements.summary,
    ...model.artifactReviewLoop.summary,
    ...model.readinessDecision.summary,
  ].join("\n");
  const implementationPrompt = [
    "Phase 73.5 Real Executor MVP Implementation Plan",
    "Implement artifact-capture-only first.",
    "Keep no real execution until output boundary, approval packet, artifact review, and future stop boundary are implemented.",
    "Do not launch Blender, ComfyUI, Unreal, ffmpeg, renderers, commands, endpoints, or file writes from UI.",
    "Preserve latest-message authority.",
  ].join("\n");
  const userFlowPrompt = [
    "User-friendly creative MVP flow",
    ...model.userFlow.steps.map((step) => `${step.label}: ${step.plainEnglish}`),
  ].join("\n");

  return (
    <main
      style={page}
      data-real-creative-executor-mvp-design="RealCreativeExecutorMvpDesign renders design-only no real execution no render execution no command execution no file writes execution allowed false preserve latest-message authority user-friendly flow Focus Mode UX calm workflow layout shell without duplicate route chip cloud copy MVP design packet allowed copy next implementation prompt allowed copy user-friendly flow allowed stable key helper"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Phase 72</span>
          <h1 style={headline}>Real Creative Executor MVP Design</h1>
          <p style={lede}>
            Choose the smallest safe first MVP candidate, define the minimal execution path, approval packet,
            output boundary, kill-switch posture, artifact review loop, and remaining blockers. Design-only:
            no real execution, no render execution, no command execution, no endpoint calls, and no file writes.
          </p>
          <div style={links}>
            <a href="/health-probe" style={link}>Health Probe</a>
            <a href="/creative-readiness" style={link}>Creative Readiness</a>
            <a href="/creative-sandbox" style={link}>Creative Sandbox</a>
            <a href="/creative-executor" style={link}>Creative Executor</a>
            <a href="/artifacts/review" style={link}>Artifact Review</a>
          </div>
        </div>
        <div style={statusGrid}>
          <MvpMetric label="Recommended" value={model.summary.recommendedCandidateId} />
          <MvpMetric label="Candidates" value={String(model.summary.candidateCount)} />
          <MvpMetric label="Execution" value={String(model.summary.executionAllowed)} />
          <MvpMetric label="Next" value={model.summary.nextSafeAction} />
        </div>
      </section>

      <RealCreativeMvpSafetyNotice />

      <section style={summaryStrip}>
        {summarizeRealCreativeMvpSession(model.summary).map((line) => (
          <span key={`real-creative-mvp-summary-${line.slice(0, 48)}`}>{line}</span>
        ))}
      </section>

      <section style={copyRow}>
        <button type="button" style={primaryButton} onClick={() => copyText("MVP design packet", designPacket)}>Review MVP candidate</button>
        <button type="button" style={copyButton} onClick={() => copyText("implementation prompt", implementationPrompt)}>Copy next implementation prompt</button>
        <button type="button" style={copyButton} onClick={() => copyText("user flow", userFlowPrompt)}>Copy user-friendly flow</button>
        <span style={copyState}>{copied ? `${copied} copied` : "copy-only controls"}</span>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <MvpCandidatePanel candidates={model.candidates} />
          <MvpAdapterSelectionPanel selection={model.adapterSelection} />
          <MvpExecutionPathPanel path={model.executionPath} />
          <MvpSafetyRequirementsPanel group={model.safetyRequirements} />
          <MvpApprovalRequirementsPanel group={model.approvalRequirements} />
        </div>
        <aside style={rail}>
          <MvpOutputBoundaryPanel boundary={model.outputBoundary} />
          <MvpKillSwitchRequirementsPanel group={model.killSwitchRequirements} />
          <MvpArtifactReviewLoopPanel loop={model.artifactReviewLoop} />
          <MvpReadinessDecisionPanel decision={model.readinessDecision} />
          <MvpUserFlowPanel flow={model.userFlow} />
        </aside>
      </div>
    </main>
  );
}

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
const primaryButton: CSSProperties = { ...copyButton, background: "#5eead4", color: "#021014" };
const copyState: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, fontWeight: 850, padding: "9px 11px", minWidth: 0, overflowWrap: "break-word" };
const layout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 460px)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
