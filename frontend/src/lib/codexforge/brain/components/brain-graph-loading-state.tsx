"use client";

import type { CSSProperties } from "react";
import type { CodexForgeBrainGraphLoadGateResult } from "@/lib/codexforge/brain/runtime";

type BrainGraphLoadingStateProps = {
  loadState?: CodexForgeBrainGraphLoadGateResult;
};

export function BrainGraphLoadingState({ loadState }: BrainGraphLoadingStateProps) {
  return (
    <section data-codexforge-brain-graph-loading-state style={panelStyle}>
      <div>
        <span style={eyebrowStyle}>Brain graph</span>
        <h2 style={titleStyle}>Loading brain graph</h2>
      </div>
      <p data-codexforge-brain-loading-diagnostic style={copyStyle}>
        Loading should be short-lived. If this state persists, retry graph load
        and inspect the graph load diagnostics.
      </p>
      <div style={metricRowStyle}>
        <Metric label="Phase" value={loadState?.phase ?? "loading"} />
        <Metric label="Mounted" value={loadState?.mounted ? "yes" : "pending"} />
        <Metric label="Loaded" value={loadState?.loaded ? "yes" : "no"} />
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

const panelStyle: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(15,23,42,0.82)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 20,
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: "rgba(226,232,240,0.76)",
  fontSize: 13,
  lineHeight: 1.55,
};

const metricRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
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
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.82)",
};
