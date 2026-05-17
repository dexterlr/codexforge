"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidenceRisk, type ApplyEvidenceRisk } from "../index";

export function ApplyEvidenceRiskPanel({ risk }: { risk: ApplyEvidenceRisk }) {
  return (
    <section style={card} data-codexforge-apply-evidence-risk="ApplyEvidenceRiskPanel renders risk summary">
      <div style={row}>
        <span style={eyebrow}>Risk Summary</span>
        <span style={badge}>{risk.score}/100</span>
      </div>
      <h3 style={title}>{risk.level} risk</h3>
      <ul style={list}>{summarizeApplyEvidenceRisk(risk).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(127,29,29,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(248,113,113,0.28)", background: "rgba(248,113,113,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fee2e2", fontSize: 11, fontWeight: 900 };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fee2e2", fontSize: 12, lineHeight: 1.45 };
