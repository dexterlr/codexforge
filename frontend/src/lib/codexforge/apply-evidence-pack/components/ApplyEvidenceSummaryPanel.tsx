"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidencePack, type ApplyEvidencePack } from "../index";

export function ApplyEvidenceSummaryPanel({ pack }: { pack: ApplyEvidencePack }) {
  return (
    <section
      style={card}
      data-codexforge-apply-evidence-summary="ApplyEvidenceSummaryPanel renders final readiness decision evidence pack does not apply changes"
    >
      <div style={row}>
        <span style={eyebrow}>Final Readiness</span>
        <span style={badge}>{pack.summary.finalReadinessDecision}</span>
      </div>
      <h3 style={title}>Evidence pack does not apply changes</h3>
      <ul style={list}>{summarizeApplyEvidencePack(pack).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.14)", borderRadius: 8, padding: "4px 7px", color: "#ccfbf1", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45 };
