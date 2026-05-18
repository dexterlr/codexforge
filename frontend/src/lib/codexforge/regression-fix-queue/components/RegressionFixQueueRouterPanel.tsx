"use client";

import type { CSSProperties } from "react";
import type { RegressionFixQueueRoute } from "../regression-fix-queue-types";

export function RegressionFixQueueRouterPanel({ route }: { route: RegressionFixQueueRoute }) {
  return (
    <section
      style={panel}
      data-codexforge-regression-fix-queue-router-panel="RegressionFixQueueRouterPanel renders router can route to Safe Patch Preview router can route to Preview Diff Composer router can route to Manual Investigation"
    >
      <div style={header}>
        <h3 style={title}>Route</h3>
        <span style={badge}>{route.primaryTarget}</span>
      </div>
      <div style={targets}>
        {route.targets.map((target) => (
          <span key={target} style={targetPill}>{target}</span>
        ))}
      </div>
      <p style={body}>{route.reason}</p>
      <ul style={list}>
        {route.summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: 0 };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.24)", borderRadius: 8, color: "#fef3c7", fontSize: 11, fontWeight: 900, maxWidth: "100%", overflowWrap: "anywhere", padding: "5px 7px" };
const targets: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, minWidth: 0 };
const targetPill: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", borderRadius: 8, color: "#fde68a", fontSize: 11, fontWeight: 850, overflowWrap: "anywhere", padding: "5px 7px" };
const body: CSSProperties = { color: "#fef3c7", fontSize: 12, lineHeight: 1.5, margin: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { color: "#fde68a", fontSize: 12, lineHeight: 1.5, margin: 0, overflowWrap: "anywhere", paddingLeft: 18 };
