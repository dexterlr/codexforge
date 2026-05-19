import type { CSSProperties } from "react";
import type { BlenderSceneInput } from "../blender-adapter-types";
import { summarizeBlenderSceneInput, buildBlenderAdapterReactKey } from "../index";

export function BlenderSceneInputPanel({ input }: { input: BlenderSceneInput }) {
  return (
    <section style={panel} data-blender-scene-input-panel="BlenderSceneInputPanel renders">
      <Header title="Scene Input" marker="BlenderSceneInputPanel renders" />
      <p style={lede}>{input.sceneGoal}</p>
      <div style={metaGrid}>
        <Metric label="Kind" value={input.sceneKind} />
        <Metric label="Scale" value={input.scale} />
        <Metric label="Environment" value={input.environment} />
      </div>
      <List title="Summary" items={summarizeBlenderSceneInput(input)} />
      <List title="Object hints" items={input.objectHints} />
    </section>
  );
}

function Header({ title, marker }: { title: string; marker: string }) {
  return <div style={header}><span style={eyebrow}>{marker}</span><h2 style={titleStyle}>{title}</h2></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <strong style={smallTitle}>{title}</strong>
      <ul style={list}>
        {items.map((item, index) => <li key={buildBlenderAdapterReactKey(title, item, index)}>{item}</li>)}
      </ul>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "grid", gap: 4 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const titleStyle: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#dbeafe", lineHeight: 1.55, overflowWrap: "anywhere" };
const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const smallTitle: CSSProperties = { color: "#e2e8f0", fontSize: 12, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 };
