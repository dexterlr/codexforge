"use client";

import type { CSSProperties } from "react";
import { buildRunQueue } from "../run-queue";
import type { OperatorRunQueue } from "../run-types";
import { BlockedRunNotice } from "./BlockedRunNotice";
import { RunArtifactLedger } from "./RunArtifactLedger";
import { RunCommandPreview } from "./RunCommandPreview";
import { RunContextPanel } from "./RunContextPanel";
import { RunPolicyBoundary } from "./RunPolicyBoundary";
import { RunQueuePanel } from "./RunQueuePanel";
import { RunReadinessBoard } from "./RunReadinessBoard";
import { RunReplayPanel } from "./RunReplayPanel";
import { RunTimelinePanel } from "./RunTimelinePanel";

export function OperatorRunCenter({ queue = buildRunQueue() }: { queue?: OperatorRunQueue }) {
  const activeRun = queue.runs[0];

  return (
    <main
      style={page}
      data-codexforge-operator-run-center="OperatorRunCenter renders"
      data-codexforge-operator-run-preview-only="preview-only"
      data-codexforge-operator-run-approval="approval required before execution"
    >
      <section style={hero}>
        <div style={heroText}>
          <span style={eyebrow}>CodexForge Phase 8</span>
          <h1 style={headline}>Operator Run Center</h1>
          <p style={subhead}>
            preview-only run control for plan review, approval boundaries, queued run previews, timelines, artifact ledgers, replay packets, and future brain memory handoff.
          </p>
          <a href="/bridge" style={bridgeLink}>Open Jarvis Local Bridge</a>
        </div>
        <div style={statusGrid}>
          <span style={statusPill}>preview-only</span>
          <span style={statusPill}>approval required before execution</span>
          <span style={statusPill}>broker execution blocked</span>
          <span style={statusPill}>no desktop control/camera/trading execution</span>
        </div>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <RunQueuePanel queue={queue} />
          <RunReadinessBoard runs={queue.runs} />
          <RunTimelinePanel run={activeRun} />
          <RunArtifactLedger run={activeRun} />
          <RunReplayPanel run={activeRun} />
        </div>
        <aside style={rail}>
          <BlockedRunNotice />
          <RunPolicyBoundary run={activeRun} />
          <RunCommandPreview run={activeRun} />
          <RunContextPanel run={activeRun} />
        </aside>
      </div>
    </main>
  );
}

const page: CSSProperties = { minHeight: "100vh", background: "linear-gradient(180deg, #050814 0%, #02040A 100%)", color: "#f8fafc", padding: "28px min(4vw, 44px)", display: "grid", gap: 16, fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" };
const hero: CSSProperties = { border: "1px solid rgba(94,234,212,0.18)", background: "linear-gradient(135deg, rgba(7,13,28,0.98), rgba(15,23,42,0.86))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(min(100%, 340px), 0.65fr)", gap: 16, alignItems: "end" };
const heroText: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.05, letterSpacing: 0 };
const subhead: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 860 };
const bridgeLink: CSSProperties = { width: "fit-content", border: "1px solid rgba(45,212,191,0.30)", background: "rgba(45,212,191,0.10)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 };
const statusPill: CSSProperties = { border: "1px solid rgba(148,163,184,0.2)", background: "rgba(2,6,23,0.58)", borderRadius: 8, padding: "9px 10px", color: "#dbeafe", fontSize: 12, fontWeight: 800, textTransform: "uppercase", textAlign: "center" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(min(100%, 360px), 0.65fr)", gap: 16, alignItems: "start" };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
