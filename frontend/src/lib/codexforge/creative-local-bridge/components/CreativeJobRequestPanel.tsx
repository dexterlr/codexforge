"use client";

import type { CSSProperties } from "react";
import type { CreativeJobRequest } from "../creative-local-bridge-types";

export function CreativeJobRequestPanel({ request }: { request: CreativeJobRequest }) {
  return (
    <section style={card} data-codexforge-creative-job-request-panel="CreativeJobRequestPanel renders deterministic request id">
      <span style={eyebrow}>Job Request</span>
      <strong>{request.goal}</strong>
      <div style={grid}>
        <Metric label="Request" value={request.requestId} />
        <Metric label="Profile" value={request.bridgeProfileId} />
        <Metric label="Adapter" value={request.adapterId} />
        <Metric label="Risk" value={request.riskLevel} />
      </div>
      <p style={copy}>{request.inputSummary}</p>
      <p style={muted}>{request.noExecutionGuarantee}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const card: CSSProperties = { border: "1px solid rgba(167,139,250,0.22)", background: "rgba(17,12,36,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 145px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.5)", borderRadius: 8, padding: 10, display: "grid", gap: 5, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#ddd6fe", lineHeight: 1.5 };
const muted: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5 };
