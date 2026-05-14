"use client";

import type { CSSProperties } from "react";
import type { CreativeProductionPlan } from "../creative-types";
import { buildCreativeReactKey } from "../creative-types";

export function ProductionPlanBoard({ plan }: { plan: CreativeProductionPlan }) {
  return (
    <section data-codexforge-production-plan-board style={panel}>
      <div style={header}>
        <div>
          <span style={eyebrow}>Production plan</span>
          <h2 style={title}>Preview-only production board</h2>
        </div>
        <span style={pill}>approval required before execution</span>
      </div>
      <div style={stageGrid}>
        {plan.stages.map((stage, index) => (
          <article key={buildCreativeReactKey("production-stage", [stage.id], index)} style={stageCard}>
            <span style={status}>{stage.status}</span>
            <strong>{stage.label}</strong>
            <p style={body}>{stage.summary}</p>
            <div style={outputs}>
              {stage.outputs.map((item, itemIndex) => (
                <span key={buildCreativeReactKey("stage-output", [stage.id, item], itemIndex)}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div style={footerGrid}>
        <div style={footerBox}><b>Safe next action</b><span>{plan.safeNextAction}</span></div>
        <div style={footerBox}><b>Adapters</b><span>{plan.adapters.join(", ")}</span></div>
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(59,130,246,0.22)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 14 };
const header: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", alignItems: "start" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0 };
const pill: CSSProperties = { border: "1px solid rgba(250,204,21,0.32)", background: "rgba(250,204,21,0.1)", color: "#fef08a", borderRadius: 7, padding: "7px 9px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const stageGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 10 };
const stageCard: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const status: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const outputs: CSSProperties = { display: "grid", gap: 4, color: "#bfdbfe", fontSize: 11, overflowWrap: "anywhere" };
const footerGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 10 };
const footerBox: CSSProperties = { borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10, display: "grid", gap: 4, color: "#cbd5e1", fontSize: 12, overflowWrap: "anywhere" };
