"use client";

import type { CSSProperties } from "react";
import type { CodexForgeBrainFocusLens } from "@/lib/codexforge/brain/runtime";
import { buildStableReactKey } from "./brain-react-key";

type BrainFocusLensCardProps = {
  lens: CodexForgeBrainFocusLens;
  active?: boolean;
  onInspect?: (lensId: string) => void;
};

export function BrainFocusLensCard({ lens, active = false, onInspect }: BrainFocusLensCardProps) {
  return (
    <button
      type="button"
      data-codexforge-brain-focus-lens-card
      data-codexforge-brain-focus-lens-kind={lens.kind}
      data-codexforge-brain-focus-lens-relevance={lens.relevance.toFixed(2)}
      data-codexforge-brain-focus-lens-next-drilldown={lens.nextSafeDrilldown}
      onClick={() => onInspect?.(lens.id)}
      style={{
        ...cardStyle,
        borderColor: active ? "rgba(125,211,252,0.58)" : "rgba(255,255,255,0.10)",
      }}
    >
      <div style={headerStyle}>
        <strong>{lens.title}</strong>
        <span style={severityStyle}>{lens.severity}</span>
      </div>
      <p style={summaryStyle}>{lens.summary}</p>
      <div style={metricGridStyle}>
        <span>relevance {lens.relevance.toFixed(2)}</span>
        <span>{lens.signals.length} signals</span>
      </div>
      <div style={evidenceStyle}>
        {lens.evidence.slice(0, 3).map((item, index) => (
          <span key={buildStableReactKey("focus-lens-evidence", [lens.id, item], index)}>
            {item}
          </span>
        ))}
      </div>
      <div style={nextStyle}>{lens.nextSafeDrilldown}</div>
    </button>
  );
}

const cardStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
  color: "inherit",
  textAlign: "left",
  cursor: "pointer",
  minWidth: 0,
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  alignItems: "start",
  fontSize: 12,
};

const severityStyle: CSSProperties = {
  borderRadius: 999,
  padding: "2px 7px",
  background: "rgba(14,165,233,0.14)",
  color: "rgba(186,230,253,0.92)",
  fontSize: 10,
  fontWeight: 900,
};

const summaryStyle: CSSProperties = {
  margin: 0,
  color: "rgba(226,232,240,0.74)",
  fontSize: 12,
  lineHeight: 1.45,
};

const metricGridStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  color: "rgba(226,232,240,0.64)",
  fontSize: 10,
};

const evidenceStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  color: "rgba(226,232,240,0.72)",
  fontSize: 11,
  lineHeight: 1.35,
};

const nextStyle: CSSProperties = {
  padding: 8,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.16)",
  background: "rgba(34,197,94,0.07)",
  color: "rgba(220,252,231,0.9)",
  fontSize: 11,
  lineHeight: 1.4,
};
