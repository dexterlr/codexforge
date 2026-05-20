"use client";

import type { CSSProperties } from "react";
import { CodexForgeLocalActionBar } from "@/lib/codexforge/navigation";
import { buildCapabilityContext, type CodexForgeCapabilityContext } from "../capability-context";
import { AdapterHealthPanel } from "./AdapterHealthPanel";
import { ApprovalBoundaryPanel } from "./ApprovalBoundaryPanel";
import { ArtifactLedgerPanel } from "./ArtifactLedgerPanel";
import { BlockedExecutionPanel } from "./BlockedExecutionPanel";
import { CapabilityCardGrid } from "./CapabilityCardGrid";
import { CapabilityReadinessBoard } from "./CapabilityReadinessBoard";
import { CreativeProductionCockpit } from "./CreativeProductionCockpit";
import { FeatureRoadmapLane } from "./FeatureRoadmapLane";
import { JarvisControlPreview } from "./JarvisControlPreview";
import { TradingResearchPanel } from "./TradingResearchPanel";

type CapabilityCommandCenterProps = {
  initialData?: CodexForgeCapabilityContext;
};

export function CapabilityCommandCenter({ initialData }: CapabilityCommandCenterProps) {
  const context = initialData ?? buildCapabilityContext();
  const blockedCount = context.readiness.filter((item) => item.executionBlocked).length;
  const approvalCount = context.readiness.filter((item) => item.approvalRequired).length;
  const availableCount = context.readiness.filter((item) => item.status === "available").length;

  return (
    <main
      data-codexforge-capability-command-center
      data-codexforge-capability-cockpit="CapabilityCommandCenter renders"
      data-codexforge-preview-only="true"
      style={page}
    >
      <CodexForgeLocalActionBar
        title="Capability Cockpit"
        subtitle="Readiness, policy, preview plans, consent boundaries, and future adapter handoff"
        status="preview-only"
      >
        <a href="/runs" style={runLink}>Open Operator Run Center</a>
        <a href="/bridge" style={runLink}>Open Jarvis Local Bridge</a>
        <a href="/creative-bridge" style={runLink}>Creative Local Bridge</a>
        <a href="/blender" style={runLink}>Blender Adapter Preview</a>
        <a href="/unreal" style={runLink}>Unreal Adapter Preview</a>
        <Stat label="Capabilities" value={String(context.summary.capabilityCount)} />
        <Stat label="Available" value={String(availableCount)} />
        <Stat label="Approval gates" value={String(approvalCount)} />
        <Stat label="Blocked" value={String(blockedCount)} />
      </CodexForgeLocalActionBar>

      <section style={statusStrip}>
        <div>
          <span style={statusDot} />
          <strong>{context.summary.operatorMode}</strong>
          <span style={statusText}>{context.summary.adapterHealth}</span>
        </div>
        <span style={previewPill}>preview-only</span>
        <span style={previewPill}>Blender Adapter Preview capability: execution blocked, preview-only in Phase 62</span>
        <span style={previewPill}>Unreal Adapter Preview capability: execution blocked, preview-only in Phase 65</span>
        <span style={previewPill}>Creative Local Bridge: Blender local bridge, ComfyUI local bridge, Unreal local bridge, Video render bridge, Artifact capture execution blocked in Phase 61</span>
      </section>

      <div style={layout}>
        <div style={mainColumn}>
          <CapabilityCardGrid capabilities={context.capabilities} readiness={context.readiness} />
          <CreativeProductionCockpit plans={context.creativePlans} />
          <AdapterHealthPanel adapters={context.adapters} />
          <ApprovalBoundaryPanel capabilities={context.capabilities} />
          <ArtifactLedgerPanel artifacts={context.artifacts} />
        </div>
        <aside style={rail}>
          <BlockedExecutionPanel />
          <JarvisControlPreview />
          <TradingResearchPanel />
          <CapabilityReadinessBoard readiness={context.readiness} />
          <FeatureRoadmapLane roadmap={context.roadmap} />
        </aside>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const page: CSSProperties = {
  minHeight: 0,
  color: "white",
  background: "transparent",
  padding: 0,
  display: "grid",
  gap: 14,
  minWidth: 0,
  maxWidth: "100%",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const hero: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 16, alignItems: "end", maxWidth: 1560, width: "100%", margin: "0 auto" };
const heroCopy: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 18 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", opacity: 0.64 };
const h1: CSSProperties = { margin: "6px 0 0", fontSize: 36, letterSpacing: 0 };
const lede: CSSProperties = { margin: "8px 0 0", maxWidth: 840, fontSize: 14, lineHeight: 1.55, opacity: 0.78 };
const linkRow: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 };
const runLink: CSSProperties = { display: "inline-block", width: "fit-content", maxWidth: "100%", border: "1px solid rgba(45,212,191,0.30)", background: "rgba(45,212,191,0.10)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", overflowWrap: "anywhere" };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 };
const stat: CSSProperties = { border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const statusStrip: CSSProperties = { maxWidth: 1560, width: "100%", margin: "0 auto", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.045)", borderRadius: 8, padding: "10px 12px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "center", fontSize: 12 };
const statusDot: CSSProperties = { width: 8, height: 8, borderRadius: 999, display: "inline-block", marginRight: 8, background: "#2dd4bf" };
const statusText: CSSProperties = { marginLeft: 8, opacity: 0.72 };
const previewPill: CSSProperties = { border: "1px solid rgba(45,212,191,0.34)", background: "rgba(45,212,191,0.12)", borderRadius: 7, padding: "5px 8px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere" };
const layout: CSSProperties = { maxWidth: 1560, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 14, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
