"use client";

import type { CSSProperties } from "react";
import type { ApprovedPatchApplyRollbackPlan } from "../index";

export function ApplyRollbackPlanPanel({ plan, onCopy }: { plan: ApprovedPatchApplyRollbackPlan; onCopy?: (label: string, value: string) => void }) {
  return (
    <section style={panel} data-codexforge-apply-rollback-plan-panel="ApplyRollbackPlanPanel renders rollback plan mentions git restore git revert no Brain graph mutation no memory mutation">
      <div style={header}>
        <h3 style={title}>Rollback plan</h3>
        <button type="button" style={button} onClick={() => onCopy?.("rollback plan", plan.guidance.join("\n"))}>Copy rollback</button>
      </div>
      <ul style={list}>{plan.summary.map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={options}>
        {plan.options.map((option) => (
          <article key={option.id} style={optionStyle}>
            <strong>{option.label}</strong>
            {option.command ? <code>{option.command}</code> : null}
            <span>{option.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { fontSize: 13, margin: 0, overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(125,211,252,0.25)", background: "rgba(14,165,233,0.12)", borderRadius: 8, color: "#dbeafe", cursor: "pointer", fontSize: 11, fontWeight: 900, padding: "7px 8px" };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
const options: CSSProperties = { display: "grid", gap: 6 };
const optionStyle: CSSProperties = { border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#cbd5e1", display: "grid", fontSize: 11, gap: 3, lineHeight: 1.35, minWidth: 0, overflowWrap: "anywhere", padding: 7 };
