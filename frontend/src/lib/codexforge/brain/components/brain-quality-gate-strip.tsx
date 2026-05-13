"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainGraphLoadGateResult,
  CodexForgeBrainQualitySummary,
  CodexForgeBrainSnapshotPanelGateResult,
} from "@/lib/codexforge/brain/runtime";

type BrainQualityGateStripProps = {
  loadState?: CodexForgeBrainGraphLoadGateResult;
  snapshotPanelGates?: CodexForgeBrainSnapshotPanelGateResult;
  summary?: CodexForgeBrainQualitySummary;
};

export function BrainQualityGateStrip({
  loadState,
  snapshotPanelGates,
  summary,
}: BrainQualityGateStripProps) {
  const loadPhase = summary?.loadPhase ?? loadState?.phase ?? "initializing";
  const snapshotStatus =
    summary?.snapshotStatus ?? snapshotPanelGates?.snapshotStatus ?? "partial";
  const panelStatus =
    summary?.panelStatus ?? snapshotPanelGates?.panelStatus ?? "partial";
  const sourceStatus =
    summary?.sourceStatus ??
    (snapshotPanelGates
      ? `${snapshotPanelGates.livePanels.length} live / ${snapshotPanelGates.fixturePanels.length} fixture`
      : loadState?.gate.status ?? "partial");

  return (
    <section data-codexforge-brain-quality-gate-strip style={stripStyle}>
      <Metric
        label="Graph load"
        value={loadPhase}
        marker="data-codexforge-brain-load-phase"
      />
      <Metric
        label="Snapshot"
        value={snapshotStatus}
        marker="data-codexforge-brain-snapshot-gate-status"
      />
      <Metric
        label="Panels"
        value={panelStatus}
        marker="data-codexforge-brain-panel-gate-status"
      />
      <Metric label="Source" value={sourceStatus} />
    </section>
  );
}

function Metric({
  label,
  value,
  marker,
}: {
  label: string;
  value: string;
  marker?: string;
}) {
  const markerProps = marker ? { [marker]: value } : {};

  return (
    <span {...markerProps} style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

const stripStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
  gap: 8,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(2,6,23,0.34)",
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  padding: "7px 9px",
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
