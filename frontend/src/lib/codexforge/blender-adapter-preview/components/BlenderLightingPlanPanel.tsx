import type { CSSProperties } from "react";
import type { BlenderLightingPlan } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey } from "../index";

export function BlenderLightingPlanPanel({ plan }: { plan: BlenderLightingPlan }) {
  return (
    <section style={panel} data-blender-lighting-plan-panel="BlenderLightingPlanPanel renders">
      <h2 style={title}>BlenderLightingPlanPanel renders</h2>
      <p style={lede}>{plan.setup}</p>
      <div style={itemGrid}>
        {plan.items.map((item, index) => (
          <article key={buildBlenderAdapterReactKey("light", item.lightId, index)} style={card}>
            <strong>{item.label}</strong>
            <span>{item.intensityHint}</span>
            <small>{item.locationHint}</small>
            <small>{item.shadowNote}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#a7f3d0", fontWeight: 800 };
const itemGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 5, minWidth: 0, color: "#cbd5e1" };
