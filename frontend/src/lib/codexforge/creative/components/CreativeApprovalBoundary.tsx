"use client";

import type { CSSProperties } from "react";
import type { CreativeApprovalBoundary as CreativeApprovalBoundaryData } from "../creative-types";
import { buildCreativeReactKey } from "../creative-types";

export function CreativeApprovalBoundary({ boundary }: { boundary: CreativeApprovalBoundaryData }) {
  return (
    <section data-codexforge-creative-approval-boundary style={panel}>
      <div style={header}>
        <span style={eyebrow}>Creative approval boundary</span>
        <span style={pill}>approval required before execution</span>
      </div>
      <p style={body}>{boundary.summary}</p>
      <div style={grid}>
        <div style={box}>
          <strong>Allowed now</strong>
          {boundary.allowedNow.map((item, index) => (
            <span key={buildCreativeReactKey("allowed-now", [item], index)}>{item}</span>
          ))}
        </div>
        <div style={box}>
          <strong>Blocked until approval</strong>
          {boundary.blockedUntilApproval.map((item, index) => (
            <span key={buildCreativeReactKey("blocked-until-approval", [item], index)}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(28,7,7,0.36)", borderRadius: 8, padding: 16, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, alignItems: "center" };
const eyebrow: CSSProperties = { color: "#fecaca", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const pill: CSSProperties = { border: "1px solid rgba(248,113,113,0.3)", borderRadius: 7, padding: "6px 8px", color: "#fecaca", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#fee2e2", fontSize: 12, lineHeight: 1.45 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 10 };
const box: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 12, display: "grid", gap: 6, color: "#e2e8f0", fontSize: 12 };
