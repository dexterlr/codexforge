"use client";

import type { CSSProperties } from "react";
import type { CodexForgeCreativeProductionPlan } from "../capability-types";
import { buildCodexForgeCapabilityReactKey } from "../capability-types";

export function CreativeProductionCockpit({ plans }: { plans: CodexForgeCreativeProductionPlan[] }) {
  return (
    <section
      data-codexforge-creative-production-cockpit
      data-codexforge-creative-approval-required="approval required before execution"
      data-codexforge-render-job-simulated="render job is local-safe/simulated"
      style={panel}
    >
      <div style={header}>
        <div>
          <div style={eyebrow}>Creative production runtime</div>
          <h2 style={title}>Preview-only production cockpit</h2>
        </div>
        <span style={approvalPill}>approval required before execution</span>
      </div>
      <div style={grid}>
        {plans.map((plan, index) => (
          <article
            key={buildCodexForgeCapabilityReactKey("creative-plan", [plan.id], index)}
            style={card}
            data-codexforge-creative-plan={plan.capabilityId}
          >
            <h3 style={cardTitle}>{plan.label}</h3>
            <p style={text}>{plan.productionGoalPlaceholder}</p>
            <div style={miniSection}>
              <strong>Asset plan</strong>
              {plan.assetPlan.map((item, itemIndex) => (
                <span key={buildCodexForgeCapabilityReactKey("asset", [plan.id, item], itemIndex)}>{item}</span>
              ))}
            </div>
            <div style={stageGrid}>
              {plan.stages.map((stage, stageIndex) => (
                <div key={buildCodexForgeCapabilityReactKey("stage", [plan.id, stage.id], stageIndex)} style={stageBox}>
                  <span style={stageStatus}>{stage.status}</span>
                  <strong>{stage.label}</strong>
                  <span>{stage.summary}</span>
                </div>
              ))}
            </div>
            <div style={queue}>
              <strong>Render queue preview</strong>
              {plan.renderQueuePreview.map((item, itemIndex) => (
                <div key={buildCodexForgeCapabilityReactKey("render-queue", [item.id], itemIndex)} style={queueItem}>
                  <span>{item.label}</span>
                  <span>{item.executionMode}</span>
                  <span>{item.safetyNote}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(15,23,42,0.68)", borderRadius: 8, padding: 14, display: "grid", gap: 12 };
const header: CSSProperties = { display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, alignItems: "start" };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#99f6e4" };
const title: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0 };
const approvalPill: CSSProperties = { border: "1px solid rgba(251,191,36,0.35)", background: "rgba(251,191,36,0.12)", color: "#fde68a", borderRadius: 7, padding: "6px 8px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(255,255,255,0.11)", background: "rgba(0,0,0,0.18)", borderRadius: 8, padding: 12, display: "grid", gap: 10, minWidth: 0 };
const cardTitle: CSSProperties = { margin: 0, fontSize: 16 };
const text: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, opacity: 0.78 };
const miniSection: CSSProperties = { display: "grid", gap: 4, fontSize: 12, lineHeight: 1.4, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 9 };
const stageGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 145px), 1fr))", gap: 8 };
const stageBox: CSSProperties = { display: "grid", gap: 5, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 9, fontSize: 11, lineHeight: 1.35 };
const stageStatus: CSSProperties = { color: "#bfdbfe", fontWeight: 800, textTransform: "uppercase" };
const queue: CSSProperties = { display: "grid", gap: 7, fontSize: 12 };
const queueItem: CSSProperties = { display: "grid", gap: 3, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 7, overflowWrap: "anywhere" };
