import type { CSSProperties } from "react";
import type { BlenderMaterialPlan } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey } from "../index";

export function BlenderMaterialPlanPanel({ plan }: { plan: BlenderMaterialPlan }) {
  return (
    <section style={panel} data-blender-material-plan-panel="BlenderMaterialPlanPanel renders">
      <h2 style={title}>BlenderMaterialPlanPanel renders</h2>
      <div style={itemGrid}>
        {plan.items.map((item, index) => (
          <article key={buildBlenderAdapterReactKey("material", item.materialId, index)} style={card}>
            <strong>{item.label}</strong>
            <span style={swatch}>{item.baseColorLabel}</span>
            <small>{item.roughnessHint}</small>
            <small>{item.usageNotes}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const itemGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, color: "#cbd5e1" };
const swatch: CSSProperties = { borderLeft: "4px solid #5eead4", paddingLeft: 8, color: "#e0f2fe", fontSize: 13 };
