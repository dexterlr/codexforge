"use client";

import type { CSSProperties } from "react";
import type { OperatorRun } from "../run-types";
import { buildOperatorRunReactKey } from "../run-types";

export function RunContextPanel({ run }: { run: OperatorRun }) {
  return (
    <section style={panel} data-codexforge-run-context-panel="RunContextPanel renders">
      <p style={eyebrow}>Context</p>
      <h2 style={title}>Read-Only Run Context</h2>
      <div style={stack}>
        <p>{run.context.capabilityReadiness}</p>
        <p>{run.context.creativePlan}</p>
        <p>{run.context.patchPreviewPlan}</p>
        <p>{run.context.applyEvidencePackContext}</p>
        <p>{run.context.brainRuntimeContext}</p>
      </div>
      <div style={notes}>
        {run.context.notes.map((note) => (
          <span key={buildOperatorRunReactKey(run.id, "context", note)}>{note}</span>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { margin: 0, color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const stack: CSSProperties = { display: "grid", gap: 7, color: "#bae6fd", fontSize: 13, lineHeight: 1.45 };
const notes: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#e0f2fe", fontSize: 12 };
