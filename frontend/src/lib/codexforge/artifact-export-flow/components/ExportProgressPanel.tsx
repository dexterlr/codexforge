"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactExportFlowReactKey,
  summarizeExportFlowState,
  type ExportFlowReducerState,
} from "@/lib/codexforge/artifact-export-flow";

export function ExportProgressPanel({
  state,
  exporting,
  onPrepareReview,
  onExport,
}: {
  state: ExportFlowReducerState;
  exporting: boolean;
  onPrepareReview: () => void;
  onExport: () => void;
}) {
  const disabled = exporting || state.flow.progressState !== "ready-to-export" || state.preparedPayloads.length === 0;

  return (
    <section style={panel} data-codexforge-export-progress-panel="ExportProgressPanel renders guarded artifacts export API only">
      <div style={header}>
        <span style={eyebrow}>Flow progress</span>
        <strong style={badge}>{state.flow.progressState}</strong>
      </div>
      <div style={steps}>
        {state.flow.steps.map((step) => (
          <div key={buildArtifactExportFlowReactKey("step", step.id)} style={stepBox}>
            <strong>{step.label}</strong>
            <span>{step.state}</span>
          </div>
        ))}
      </div>
      <div style={actions}>
        <button type="button" style={button} onClick={onPrepareReview}>Prepare review</button>
        <button type="button" style={button} onClick={onExport} disabled={disabled}>
          Export approved artifacts
        </button>
      </div>
      <ul style={summaryList}>
        {summarizeExportFlowState(state).map((line, index) => (
          <li key={buildArtifactExportFlowReactKey("state-summary", line, index)}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(129,140,248,0.22)", background: "rgba(30,27,75,0.34)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(129,140,248,0.28)", color: "#ddd6fe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const steps: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 145px), 1fr))", gap: 8 };
const stepBox: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 9, display: "grid", gap: 5, color: "#e2e8f0", fontSize: 12 };
const actions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const button: CSSProperties = { border: "1px solid rgba(129,140,248,0.34)", background: "rgba(79,70,229,0.18)", color: "#ede9fe", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const summaryList: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 5, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
