"use client";

import type { CSSProperties } from "react";
import type { BrainGraphDiffPreview } from "../brain-merge-types";

export function BrainGraphDiffPanel({ diff }: { diff: BrainGraphDiffPreview }) {
  return (
    <section style={panel} data-codexforge-brain-graph-diff-preview="graph diff preview exists">
      <h3 style={title}>Graph Diff Preview</h3>
      <p style={copy}>Nodes to add, nodes to update, edges to add, source refs linked, duplicate risks, stale event risks, and conflict warnings are previewed without persistence.</p>
      <div style={grid}>
        <Metric label="Nodes to add" value={diff.nodesToAdd.length} />
        <Metric label="Nodes to update" value={diff.nodesToUpdate.length} />
        <Metric label="Edges to add" value={diff.edgesToAdd.length} />
        <Metric label="Source refs" value={diff.sourceRefsLinked.length} />
      </div>
      {[...diff.nodesToAdd, ...diff.nodesToUpdate, ...diff.blockedNodes].map((item) => (
        <article key={item.id} style={itemStyle}>
          <strong>{item.state}: {item.node.id}</strong>
          <span>{item.node.data.label}</span>
          <span>{item.conflictWarnings.length ? item.conflictWarnings.join(", ") : "no conflict warning"}</span>
        </article>
      ))}
      {diff.conflictWarnings.length ? <p style={warning}>Conflict warnings: {diff.conflictWarnings.join(", ")}</p> : null}
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
const itemStyle: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 4, fontSize: 12, minWidth: 0, ...safe };
const warning: CSSProperties = { margin: 0, color: "#fed7aa", fontSize: 12, ...safe };
