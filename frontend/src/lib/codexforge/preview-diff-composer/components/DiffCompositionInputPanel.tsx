"use client";

import type { CSSProperties } from "react";
import type { DiffCompositionInput, DiffCompositionValidation } from "../preview-diff-composer-types";
import { summarizeDiffCompositionInput } from "../diff-composition-input";

type Props = {
  input: DiffCompositionInput;
  validation: DiffCompositionValidation;
};

export function DiffCompositionInputPanel({ input, validation }: Props) {
  return (
    <section style={card} data-codexforge-preview-diff-composer-input="DiffCompositionInputPanel renders">
      <div style={row}>
        <span style={eyebrow}>Diff Composition Input</span>
        <span style={validation.valid ? badgeOk : badgeWarn}>{validation.valid ? "ready" : "blocked"}</span>
      </div>
      <h3 style={title}>{input.goal}</h3>
      <dl style={facts}>
        <dt>Queue item</dt>
        <dd>{input.queueItemId}</dd>
        <dt>Source grounded fix</dt>
        <dd>{input.sourceGroundedFixId}</dd>
        <dt>Primary file</dt>
        <dd>{input.primaryFile}</dd>
        <dt>Risk / confidence</dt>
        <dd>
          {input.riskLevel} / {input.confidence}
        </dd>
      </dl>
      <div style={chips}>{input.targetFiles.map((file) => <span key={file} style={chip}>{file}</span>)}</div>
      <ul style={list}>{summarizeDiffCompositionInput(input).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badgeOk: CSSProperties = { border: "1px solid rgba(74,222,128,0.28)", background: "rgba(34,197,94,0.12)", borderRadius: 8, padding: "4px 7px", color: "#bbf7d0", fontSize: 11, fontWeight: 900 };
const badgeWarn: CSSProperties = { border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900 };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const facts: CSSProperties = { display: "grid", gridTemplateColumns: "120px minmax(0, 1fr)", gap: "4px 8px", margin: 0, fontSize: 12, color: "#dbeafe" };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const chip: CSSProperties = { border: "1px solid rgba(148,163,184,0.24)", background: "rgba(148,163,184,0.08)", borderRadius: 8, padding: "4px 6px", fontSize: 11, color: "#e2e8f0", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
