import type { CSSProperties } from "react";
import type { BlenderSceneModel } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey, summarizeBlenderSceneModel } from "../index";

export function BlenderSceneModelPanel({ model }: { model: BlenderSceneModel }) {
  return (
    <section style={panel} data-blender-scene-model-panel="BlenderSceneModelPanel renders">
      <h2 style={title}>BlenderSceneModelPanel renders</h2>
      <div style={grid}>
        <Metric label="Layers" value={String(model.layers.length)} />
        <Metric label="Lighting" value={model.lightingSetup} />
        <Metric label="Risk" value={model.riskLevel} />
      </div>
      <ul style={list}>{summarizeBlenderSceneModel(model).map((item, index) => <li key={buildBlenderAdapterReactKey("scene-model", item, index)}>{item}</li>)}</ul>
      <div style={layerGrid}>
        {model.layers.map((layer, index) => (
          <div key={buildBlenderAdapterReactKey("layer", layer.layerId, index)} style={layerCard}>
            <strong>{layer.layer}</strong>
            <span>{layer.purpose}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 };
const layerGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 };
const layerCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 10, display: "grid", gap: 4, background: "rgba(2,6,23,0.38)", color: "#cbd5e1" };
