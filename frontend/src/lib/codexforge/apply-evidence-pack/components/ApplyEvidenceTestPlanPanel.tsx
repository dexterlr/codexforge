"use client";

import type { CSSProperties } from "react";
import { summarizeApplyEvidenceTestPlan, type ApplyEvidenceTestPlan } from "../index";

export function ApplyEvidenceTestPlanPanel({ plan }: { plan: ApplyEvidenceTestPlan }) {
  return (
    <section
      style={card}
      data-codexforge-apply-evidence-test-plan="ApplyEvidenceTestPlanPanel renders test plan required smoke check placeholders no command execution"
    >
      <span style={eyebrow}>Test Plan</span>
      <h3 style={title}>Test plan required</h3>
      <ul style={list}>{summarizeApplyEvidenceTestPlan(plan).map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={checks}>
        {plan.checks.map((check) => (
          <span key={check.id} style={chip}>{check.label}</span>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(96,165,250,0.22)", background: "rgba(30,64,175,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#dbeafe", fontSize: 12, lineHeight: 1.45 };
const checks: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const chip: CSSProperties = { border: "1px solid rgba(147,197,253,0.24)", background: "rgba(30,64,175,0.16)", borderRadius: 8, padding: "4px 6px", fontSize: 11, color: "#dbeafe", overflowWrap: "anywhere" };
