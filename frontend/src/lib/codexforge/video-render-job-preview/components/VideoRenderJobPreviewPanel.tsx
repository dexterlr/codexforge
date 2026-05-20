"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import type { VideoRenderJobPreviewModel } from "../video-render-job-types";
import { summarizeVideoRenderSession } from "../video-render-summary";
import { chip, grid, linkButton, Metric, safeText } from "./VideoRenderComponentStyles";
import { VideoRenderApprovalPanel } from "./VideoRenderApprovalPanel";
import { VideoRenderArtifactPlanPanel } from "./VideoRenderArtifactPlanPanel";
import { VideoRenderEmptyState } from "./VideoRenderEmptyState";
import { VideoRenderExecutionPacketPanel } from "./VideoRenderExecutionPacketPanel";
import { VideoRenderInputPanel } from "./VideoRenderInputPanel";
import { VideoRenderPolicyPanel } from "./VideoRenderPolicyPanel";
import { VideoRenderProviderPlanPanel } from "./VideoRenderProviderPlanPanel";
import { VideoRenderQueuePreviewPanel } from "./VideoRenderQueuePreviewPanel";
import { VideoRenderSafetyNotice } from "./VideoRenderSafetyNotice";
import { VideoRenderShotPlanPanel } from "./VideoRenderShotPlanPanel";
import { VideoRenderTimelinePanel } from "./VideoRenderTimelinePanel";

export function VideoRenderJobPreviewPanel({ model }: { model: VideoRenderJobPreviewModel }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  return (
    <main
      style={page}
      data-video-render-job-preview-panel="VideoRenderJobPreviewPanel renders"
      data-codexforge-focus-mode-layout="Focus Mode UX calm workflow layout"
      data-codexforge-shell-mode="shell without duplicate route chip cloud"
    >
      <section style={hero}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Video Render Job Preview v1</span>
          <h1 style={headline}>VideoRenderJobPreviewPanel renders</h1>
          <p style={lede}>
            Creative cinematic intent to typed render job model, timeline, shot plan, provider plan, queue preview,
            artifact expectations, approval packet, policy, and future executor packet. This route is preview-only: no
            render execution, no command execution, no ffmpeg execution, no file writes, and future executor boundary.
            Provider plan requires Local Bridge Health before any future local render handoff. Creative Execution Sandbox can simulate the execution packet lifecycle before review, and Creative Readiness can audit whether a future executor remains blocked or becomes a later health-probe candidate.
          </p>
          <div style={actions}>
            <button type="button" style={linkButton} onClick={() => copyText("render plan", model.input.summary.join("\n"))}>Copy render plan</button>
            <button type="button" style={linkButton} onClick={() => copyText("queue preview", model.queuePreview.summary.join("\n"))}>Copy queue preview</button>
            <button type="button" style={linkButton} onClick={() => copyText("future executor packet", model.executionPacket.summary.join("\n"))}>Copy future executor packet</button>
            <a href="/local-bridge-health" style={linkButton}>Open Local Bridge Health</a>
            <a href="/health-probe" style={linkButton}>Open Health Probe</a>
            <a href="/creative-executor" style={linkButton}>Open Guarded Creative Executor</a>
            <a href="/creative-sandbox" style={linkButton}>Open Creative Execution Sandbox</a>
            <a href="/creative-readiness" style={linkButton}>Open Creative Readiness</a>
            <span style={chip}>{copied ? `${copied} copied` : "copy-only controls"}</span>
          </div>
        </div>
        <div style={summaryGrid}>
          <Metric label="Shots" value={String(model.summary.shotCount)} />
          <Metric label="Providers" value={String(model.summary.providerCount)} />
          <Metric label="Queue" value={String(model.summary.queueItemCount)} />
          <Metric label="Blocked" value={String(model.summary.executionBlockedCount)} />
        </div>
      </section>

      <VideoRenderSafetyNotice />
      <VideoRenderEmptyState />
      <section style={summaryBand}>
        {summarizeVideoRenderSession(model.summary).map((line) => (
          <span key={`video-render-summary-${line.slice(0, 32)}`}>{line}</span>
        ))}
      </section>
      <VideoRenderInputPanel input={model.input} />
      <VideoRenderTimelinePanel timeline={model.timeline} />
      <VideoRenderShotPlanPanel plan={model.shotPlan} />
      <VideoRenderProviderPlanPanel plan={model.providerPlan} />
      <VideoRenderQueuePreviewPanel queue={model.queuePreview} />
      <VideoRenderArtifactPlanPanel plan={model.artifactPlan} />
      <section style={grid}>
        <VideoRenderApprovalPanel packet={model.approvalPacket} />
        <VideoRenderPolicyPanel policy={model.policy} />
      </section>
      <VideoRenderExecutionPacketPanel packet={model.executionPacket} />
    </main>
  );
}

const page: CSSProperties = { background: "transparent", color: "#f8fafc", display: "grid", gap: 16, minHeight: 0, minWidth: 0, width: "100%", overflowX: "clip" };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "linear-gradient(135deg, rgba(8,13,28,0.98), rgba(20,47,60,0.72))", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr)", minWidth: 0, padding: 20, width: "100%" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const headline: CSSProperties = { color: "#f8fafc", fontSize: "clamp(30px, 4vw, 52px)", letterSpacing: 0, lineHeight: 1.04, margin: "8px 0", maxWidth: 980, minWidth: 0, overflowWrap: "normal", wordBreak: "normal", whiteSpace: "nowrap" };
const lede: CSSProperties = { color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 920, ...safeText };
const actions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12, minWidth: 0 };
const summaryGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", minWidth: 0 };
const summaryBand: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 8, fontSize: 13, minWidth: 0, padding: 12, ...safeText };
