"use client";

import type { CSSProperties } from "react";
import { buildArtifactReactKey, type ArtifactPlan } from "@/lib/codexforge/artifact-executor";

export function ArtifactPlanPanel({ plan }: { plan: ArtifactPlan }) {
  return (
    <section style={panel} data-codexforge-artifact-plan-panel="ArtifactPlanPanel renders">
      <div style={header}>
        <span style={eyebrow}>Artifact plan</span>
        <strong style={badge}>{plan.mode}</strong>
      </div>
      <h2 style={title}>{plan.title}</h2>
      <p style={body}>{plan.nextAction}</p>
      <div style={grid}>
        {plan.items.map((item, index) => (
          <article key={buildArtifactReactKey("plan", item.id, index)} style={card}>
            <span style={type}>{item.type}</span>
            <strong>{item.title}</strong>
            <span style={path}>{item.targetPlaceholderPath}</span>
            <p style={copy}>{item.intent}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(94,234,212,0.18)", background: "rgba(7,12,24,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", color: "#ccfbf1", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 24, letterSpacing: 0 };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 7, minWidth: 0, overflowWrap: "anywhere" };
const type: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const path: CSSProperties = { color: "#bfdbfe", fontSize: 11, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
