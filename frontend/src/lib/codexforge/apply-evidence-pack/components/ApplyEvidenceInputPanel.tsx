"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidenceInput, type ApplyEvidenceInput } from "../index";

export function ApplyEvidenceInputPanel({ input }: { input: ApplyEvidenceInput }) {
  return (
    <section style={card} data-codexforge-apply-evidence-input="ApplyEvidenceInputPanel renders">
      <span style={eyebrow}>Evidence Input</span>
      <h3 style={title}>{input.goal || "Draft apply evidence input"}</h3>
      <dl style={facts}>
        <dt>Preview package</dt>
        <dd>{input.previewDiffPackageId}</dd>
        <dt>Apply gate</dt>
        <dd>{input.applyGateId}</dd>
        <dt>Primary file</dt>
        <dd>{input.primaryFile}</dd>
        <dt>Risk</dt>
        <dd>{input.riskLevel}</dd>
      </dl>
      <div style={chips}>{input.targetFiles.map((file) => <span key={file} style={chip}>{file}</span>)}</div>
      <ul style={list}>{summarizeApplyEvidenceInput(input).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const facts: CSSProperties = { display: "grid", gridTemplateColumns: "130px minmax(0, 1fr)", gap: "4px 8px", margin: 0, fontSize: 12, color: "#dbeafe" };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const chip: CSSProperties = { border: "1px solid rgba(148,163,184,0.24)", background: "rgba(148,163,184,0.08)", borderRadius: 8, padding: "4px 6px", fontSize: 11, color: "#e2e8f0", overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
