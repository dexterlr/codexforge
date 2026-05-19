import type { CSSProperties } from "react";
import type { BlenderCameraPlan } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey } from "../index";

export function BlenderCameraPlanPanel({ plan }: { plan: BlenderCameraPlan }) {
  return (
    <section style={panel} data-blender-camera-plan-panel="BlenderCameraPlanPanel renders">
      <h2 style={title}>BlenderCameraPlanPanel renders</h2>
      <div style={itemGrid}>
        {plan.shots.map((shot, index) => (
          <article key={buildBlenderAdapterReactKey("shot", shot.shotId, index)} style={card}>
            <strong>{shot.label}</strong>
            <span>shot</span>
            <small>{shot.framing}</small>
            <small>{shot.cameraLocationHint}</small>
            <small>{shot.purpose}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const itemGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(96,165,250,0.18)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 5, minWidth: 0, color: "#cbd5e1" };
