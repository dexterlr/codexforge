"use client";

import type { CSSProperties } from "react";
import type { HardenedApplyInput } from "../index";

export function HardenedApplyInputPanel({ input }: { input: HardenedApplyInput }) {
  return (
    <section style={panel} data-codexforge-hardened-apply-input-panel="HardenedApplyInputPanel renders deterministic id no Date.now no Math.random no execution no file writes">
      <div style={header}><span style={eyebrow}>Input</span><strong>{input.validation.valid ? "Ready to review" : "Needs preview"}</strong></div>
      <h2 style={title}>Hardened apply input</h2>
      <dl style={metrics}>
        <Metric label="File" value={input.selectedFilePath} />
        <Metric label="Preview" value={input.previewDiffId} />
        <Metric label="Apply request" value={input.applyRequestId} />
      </dl>
      <p style={copy}>{input.latestMessageAuthorityReminder}</p>
      <details style={details}>
        <summary>Advanced input details</summary>
        <ul style={list}>{input.summary.map((item) => <li key={`hardened-input-${item}`}>{item}</li>)}</ul>
      </details>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><dt>{label}</dt><dd>{value}</dd></div>;
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const metrics: CSSProperties = { display: "grid", gap: 8, margin: 0 };
const metric: CSSProperties = { display: "grid", gap: 3, minWidth: 0 };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const list: CSSProperties = { margin: "8px 0 0", paddingLeft: 18 };
