"use client";

import type { CSSProperties } from "react";
import { summarizeApplyDiffDryRunSimulation, type ApplyDiffDryRunSimulation } from "../index";

type Props = {
  simulation: ApplyDiffDryRunSimulation;
};

export function DryRunSimulatorPanel({ simulation }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-dry-run-simulator="DryRunSimulatorPanel renders simulator refuses pseudo-only patch for real apply simulator reports ready-for-real-patch-review"
    >
      <div style={row}>
        <span style={eyebrow}>Dry Run Simulator</span>
        <span style={badge}>{simulation.status}</span>
      </div>
      <h3 style={title}>Simulated executor checks</h3>
      <ul style={list}>{summarizeApplyDiffDryRunSimulation(simulation).map((item) => <li key={item}>{item}</li>)}</ul>
      <dl style={facts}>
        <dt>Would target files</dt>
        <dd>{simulation.wouldTargetFiles.length}</dd>
        <dt>Would inspect patch shape</dt>
        <dd>{String(simulation.wouldInspectPatchShape)}</dd>
        <dt>Would call apply-diff</dt>
        <dd>{String(simulation.wouldCallApplyDiff)}</dd>
        <dt>Would write files</dt>
        <dd>{String(simulation.wouldWriteFiles)}</dd>
      </dl>
      <ul style={list}>{simulation.operations.map((operation) => <li key={operation.id}>{operation.filePath}: {operation.operationIntent}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(96,165,250,0.18)", background: "rgba(30,64,175,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(147,197,253,0.28)", background: "rgba(59,130,246,0.14)", borderRadius: 8, padding: "4px 7px", color: "#dbeafe", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const facts: CSSProperties = { display: "grid", gridTemplateColumns: "150px minmax(0, 1fr)", gap: "4px 8px", margin: 0, fontSize: 12, color: "#dbeafe" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dbeafe", fontSize: 12, lineHeight: 1.45 };
