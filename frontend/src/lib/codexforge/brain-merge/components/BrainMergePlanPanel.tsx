"use client";

import type { CSSProperties } from "react";
import type { BrainMergePlan } from "../brain-merge-types";

export function BrainMergePlanPanel({ plan }: { plan: BrainMergePlan }) {
  return (
    <section style={panel} data-codexforge-brain-merge-plan-panel>
      <h3 style={title}>Merge Plan</h3>
      <p style={copy}>{plan.approvalBoundary}; next action: {plan.nextAction}.</p>
      <div style={grid}>
        <Metric label="Target graph version" value={String(plan.targetGraphVersion ?? "missing")} />
        <Metric label="Node changes" value={String(plan.expectedNodeChanges)} />
        <Metric label="Edge changes" value={String(plan.expectedEdgeChanges)} />
        <Metric label="Risk" value={plan.riskLevel} />
      </div>
      {plan.steps.map((step) => (
        <div key={step.id} style={stepStyle}>
          <strong>{step.label}</strong>
          <span>{step.state}: {step.detail}</span>
        </div>
      ))}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0, ...safe };
const stepStyle: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, fontSize: 12, ...safe };
