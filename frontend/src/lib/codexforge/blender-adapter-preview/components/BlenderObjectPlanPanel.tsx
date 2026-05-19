import type { CSSProperties } from "react";
import type { BlenderObjectPlan } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey } from "../index";

export function BlenderObjectPlanPanel({ plan }: { plan: BlenderObjectPlan }) {
  return (
    <section style={panel} data-blender-object-plan-panel="BlenderObjectPlanPanel renders">
      <h2 style={title}>BlenderObjectPlanPanel renders</h2>
      <div style={itemGrid}>
        {plan.items.map((item, index) => (
          <article key={buildBlenderAdapterReactKey("object", item.objectId, index)} style={card}>
            <strong>{item.label}</strong>
            <span>{item.objectType}</span>
            <small>{item.role}</small>
            <small>Location: {item.locationHint}</small>
            <small>{item.riskNote}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const itemGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 5, minWidth: 0, color: "#cbd5e1", overflowWrap: "anywhere" };
