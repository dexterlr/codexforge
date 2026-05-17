"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidenceRollbackPlan, type ApplyEvidenceRollbackPlan } from "../index";

export function ApplyEvidenceRollbackPanel({ plan }: { plan: ApplyEvidenceRollbackPlan }) {
  return (
    <section
      style={card}
      data-codexforge-apply-evidence-rollback="ApplyEvidenceRollbackPanel renders rollback plan required"
    >
      <span style={eyebrow}>Rollback Plan</span>
      <h3 style={title}>Rollback plan required</h3>
      <ul style={list}>{summarizeApplyEvidenceRollbackPlan(plan).map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={notes}>{plan.notes.map((note) => <span key={note} style={chip}>{note}</span>)}</div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.11)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45 };
const notes: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const chip: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.14)", borderRadius: 8, padding: "4px 6px", fontSize: 11, color: "#ccfbf1", overflowWrap: "anywhere" };
