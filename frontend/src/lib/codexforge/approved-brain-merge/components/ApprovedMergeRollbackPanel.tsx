"use client";

import type { CSSProperties } from "react";
import type { ApprovedMergeRollbackPlan } from "../approved-brain-merge-types";

export function ApprovedMergeRollbackPanel({
  rollbackPlan,
}: {
  rollbackPlan: ApprovedMergeRollbackPlan | null;
}) {
  return (
    <section style={panel} data-codexforge-approved-merge-rollback="rollback plan before/after summary">
      <h3 style={title}>Rollback Plan</h3>
      {!rollbackPlan ? (
        <p style={copy}>Rollback plan appears after an approved merge result. Before/after summary remains visible in the request.</p>
      ) : (
        <>
          <div style={grid}>
            <Metric label="Changed nodes" value={rollbackPlan.changedNodeIds.length} />
            <Metric label="Changed edges" value={rollbackPlan.changedEdgeIds.length} />
            <Metric label="Before nodes" value={rollbackPlan.beforeSummary.nodeCount} />
            <Metric label="After nodes" value={rollbackPlan.afterSummary.nodeCount} />
          </div>
          <ul style={list}>
            {rollbackPlan.summary.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </>
      )}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0, ...safe };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.55, ...safe };
