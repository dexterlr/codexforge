"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainPanelDataAdapterResult,
  CodexForgeBrainRuntimeSnapshot,
} from "@/lib/codexforge/brain/runtime";
import { BrainLiveDataBoundary } from "./brain-live-data-boundary";
import { BrainReadOnlyBadge, BrainSectionHeader } from "./ui";

type BrainLiveSnapshotPanelProps = {
  snapshot?: CodexForgeBrainRuntimeSnapshot | null;
  panelData?: CodexForgeBrainPanelDataAdapterResult;
};

export function BrainLiveSnapshotPanel({
  snapshot,
  panelData,
}: BrainLiveSnapshotPanelProps) {
  const signals = panelData?.signals ?? [];

  return (
    <section data-codexforge-brain-live-snapshot-panel style={panelStyle}>
      <BrainSectionHeader
        eyebrow="Live snapshot"
        title="Runtime snapshot boundary"
        description="Read-only graph, context, health, topology, and recommendation evidence passed into panels."
        status={
          <div style={statusStyle}>
            <BrainLiveDataBoundary
              panelId="live-snapshot"
              panelData={panelData}
              source={snapshot ? "live" : panelData?.source}
              status={snapshot ? "ready" : panelData?.status}
            />
            <BrainReadOnlyBadge />
          </div>
        }
      />

      <div style={metricGridStyle}>
        <Metric label="Nodes" value={String(snapshot?.stats.nodeCount ?? 0)} />
        <Metric label="Edges" value={String(snapshot?.stats.edgeCount ?? 0)} />
        <Metric label="Memory" value={String(snapshot?.stats.memoryNodeCount ?? 0)} />
        <Metric label="Signals" value={String(signals.length)} />
      </div>

      <div style={summaryStyle}>
        <strong>{panelData?.reason ?? "Snapshot data is not currently supplied."}</strong>
        <span>
          {panelData?.nextSafeAction ??
            "Use deterministic panel fallbacks until snapshot data is available."}
        </span>
      </div>

      <div style={signalGridStyle}>
        {signals.slice(0, 4).map((signal) => (
          <div key={signal.id} style={signalStyle}>
            <strong>{signal.label}</strong>
            <span>{signal.detail}</span>
            <span>{signal.source} / {signal.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(15,23,42,0.82)",
};

const statusStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
};

const metricGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 110px), 1fr))",
  gap: 8,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 12,
};

const summaryStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
};

const signalGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
  gap: 8,
};

const signalStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.76)",
  fontSize: 11,
  lineHeight: 1.4,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};
