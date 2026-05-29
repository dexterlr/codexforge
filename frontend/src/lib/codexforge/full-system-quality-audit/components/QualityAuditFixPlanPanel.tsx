import type { CSSProperties } from "react";
import type { QualityAuditFixPlan } from "../full-system-quality-audit-types";

type Props = { plan: QualityAuditFixPlan };

export function QualityAuditFixPlanPanel({ plan }: Props) {
  return (
    <section style={panel} data-codexforge-quality-audit-fix-plan-panel="QualityAuditFixPlanPanel renders Copy audit summary one obvious primary action no unsafe execution buttons">
      <h2 style={title}>Fix plan</h2>
      <strong style={primary}>{plan.primaryAction}</strong>
      <div style={list}>
        {plan.steps.map((step) => <span key={step} style={line}>{step}</span>)}
      </div>
      <div style={blocked}>{plan.blockedActions.join(" | ")}</div>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(20,184,166,0.08)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0 };
const primary: CSSProperties = { color: "#ccfbf1", fontSize: 13 };
const list: CSSProperties = { display: "grid", gap: 6 };
const line: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.45 };
const blocked: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, overflowWrap: "break-word" };
