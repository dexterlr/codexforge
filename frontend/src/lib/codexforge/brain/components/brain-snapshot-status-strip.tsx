"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainPanelIntegrationSummary,
  CodexForgeBrainRuntimeSnapshot,
} from "@/lib/codexforge/brain/runtime";
import { BrainLiveDataBoundary } from "./brain-live-data-boundary";

type BrainSnapshotStatusStripProps = {
  snapshot?: CodexForgeBrainRuntimeSnapshot | null;
  summary?: CodexForgeBrainPanelIntegrationSummary | null;
};

export function BrainSnapshotStatusStrip({
  snapshot,
  summary,
}: BrainSnapshotStatusStripProps) {
  return (
    <section
      data-codexforge-brain-snapshot-status-strip
      data-codexforge-brain-panel-readiness-summary
      style={stripStyle}
    >
      <div style={copyStyle}>
        <strong>Panel readiness</strong>
        <span>
          {summary?.text ??
            "No panel readiness summary supplied; deterministic fallback is available."}
        </span>
      </div>
      <div style={metricRowStyle}>
        <Metric label="Snapshot" value={snapshot ? snapshot.status : "fixture"} />
        <Metric label="Nodes" value={String(snapshot?.stats.nodeCount ?? 0)} />
        <Metric label="Score" value={summary ? summary.score.toFixed(2) : "0.00"} />
        <BrainLiveDataBoundary
          panelId="live-snapshot"
          source={snapshot ? "live" : "fixture"}
          status={snapshot ? "ready" : "partial"}
        />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <span style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

const stripStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(2,6,23,0.34)",
};

const copyStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  color: "rgba(226,232,240,0.78)",
  fontSize: 12,
  lineHeight: 1.45,
};

const metricRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 9,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.78)",
};
