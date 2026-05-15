"use client";

import type { CSSProperties } from "react";
import type { BrainMergePolicy } from "../brain-merge-types";

export function BrainMergePolicyPanel({ policy }: { policy: BrainMergePolicy }) {
  return (
    <section style={panel} data-codexforge-brain-merge-policy-panel>
      <h3 style={title}>Merge Policy</h3>
      <p style={copy}>Policy blocks unknown event types, requires approved persisted memory events, and keeps explicit merge approval required.</p>
      <div style={grid}>
        <Metric label="Allowed" value={policy.allowed ? "reviewable" : "blocked"} />
        <Metric label="Unknown types" value={policy.unknownEventTypesBlocked ? "blocked" : "present"} />
        <Metric label="Approved events" value={policy.approvedPersistedMemoryEventsRequired ? "required" : "missing"} />
      </div>
      {policy.reasons.length ? <p style={blocked}>{policy.reasons.join(", ")}</p> : <p style={copy}>Policy clear for future merge approval review.</p>}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0, ...safe };
const blocked: CSSProperties = { margin: 0, color: "#fecaca", fontSize: 12, ...safe };
