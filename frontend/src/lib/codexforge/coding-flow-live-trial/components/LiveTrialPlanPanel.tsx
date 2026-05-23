"use client";

import type { CSSProperties } from "react";
import type { LiveTrialPlan } from "../coding-flow-live-trial-types";

export function LiveTrialPlanPanel({ plan }: { plan: LiveTrialPlan }) {
  return (
    <section style={panel} data-codexforge-live-trial-plan-panel="LiveTrialPlanPanel renders trial plan success criteria blocked criteria">
      <h2 style={title}>{plan.title}</h2>
      <p style={copy}>{plan.audience}</p>
      <div style={metaGrid}>
        <span style={meta}>Start: {plan.startingRoute}</span>
        <span style={meta}>Duration: {plan.expectedDurationLabel}</span>
        <span style={meta}>Next: {plan.nextAction}</span>
      </div>
      <ol style={list}>
        {plan.trialSteps.slice(0, 4).map((step) => <li key={`live-trial-plan-${step.id}`}><strong>{step.label}</strong>: {step.instruction}</li>)}
      </ol>
      <details style={details}>
        <summary style={summary}>Advanced details</summary>
        <div style={columns}>
          <List title="Purpose" items={plan.purpose} />
          <List title="Success criteria" items={plan.successCriteria} />
          <List title="Blocked criteria" items={plan.blockedCriteria} />
        </div>
      </details>
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return <div style={smallBlock}><h3 style={smallTitle}>{title}</h3><ul style={list}>{items.map((item) => <li key={`live-trial-${title}-${item}`}>{item}</li>)}</ul></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 16 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, margin: 0 };
const metaGrid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const meta: CSSProperties = { background: "rgba(15,23,42,0.7)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 800, padding: "7px 9px" };
const list: CSSProperties = { color: "#dbeafe", display: "grid", fontSize: 13, gap: 8, lineHeight: 1.45, margin: 0, paddingLeft: 18 };
const details: CSSProperties = { color: "#dbeafe", fontSize: 13 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
const columns: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", marginTop: 10 };
const smallBlock: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const smallTitle: CSSProperties = { color: "#5eead4", fontSize: 12, letterSpacing: 0, margin: 0, textTransform: "uppercase" };
