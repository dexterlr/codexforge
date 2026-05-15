"use client";

import type { CSSProperties } from "react";
import type { ApprovedBrainMergePolicy } from "../approved-brain-merge-types";

export function ApprovedMergePolicyPanel({ policy }: { policy: ApprovedBrainMergePolicy }) {
  return (
    <section style={panel} data-codexforge-approved-merge-policy="policy blocks unknown event types policy requires graph diff preview canonical graph schema">
      <h3 style={title}>Approved Merge Policy</h3>
      <p style={copy}>Policy requires graph diff preview, valid memory.promoted events only, source refs, and canonical graph schema.</p>
      <div style={grid}>
        <Metric label="Allowed" value={policy.allowed ? "yes" : "no"} />
        <Metric label="Unknown events" value={policy.unknownEventTypesBlocked ? "blocked" : "present"} />
        <Metric label="Schema" value={policy.schemaMatches ? "matched" : "mismatch"} />
        <Metric label="Source refs" value={policy.sourceRefsExist ? "present" : "missing"} />
      </div>
      <ul style={list}>
        {policy.summary.map((line) => <li key={line}>{line}</li>)}
      </ul>
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
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.55, ...safe };
