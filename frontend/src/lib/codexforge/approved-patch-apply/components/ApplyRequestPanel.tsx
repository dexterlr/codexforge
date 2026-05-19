"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyRequest } from "../index";

export function ApplyRequestPanel({ request }: { request: ApprovedPatchApplyRequest }) {
  return (
    <section style={panel} data-codexforge-apply-request-panel="ApplyRequestPanel renders approval required no command execution">
      <h3 style={title}>Apply request</h3>
      <div style={grid}>
        <Stat label="Mode" value={request.requestedApplyMode} />
        <Stat label="Risk" value={request.riskLevel} />
        <Stat label="Touched" value={String(request.expectedTouchedFiles.length)} />
        <Stat label="Valid" value={String(request.validation.valid)} />
      </div>
      <code style={code}>{request.requestId}</code>
      <ul style={list}>{request.summary.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span style={stat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gap: 6, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" };
const stat: CSSProperties = { border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, display: "grid", fontSize: 11, gap: 2, minWidth: 0, padding: 7, overflowWrap: "anywhere" };
const code: CSSProperties = { color: "#bfdbfe", fontSize: 11, whiteSpace: "pre-wrap", overflowWrap: "anywhere" };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
