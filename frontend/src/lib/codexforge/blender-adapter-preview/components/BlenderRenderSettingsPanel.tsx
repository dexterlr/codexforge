import type { CSSProperties } from "react";
import type { BlenderRenderSettings } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey, summarizeBlenderRenderSettings } from "../index";

export function BlenderRenderSettingsPanel({ settings }: { settings: BlenderRenderSettings }) {
  return (
    <section style={panel} data-blender-render-settings-panel="BlenderRenderSettingsPanel renders">
      <h2 style={title}>BlenderRenderSettingsPanel renders</h2>
      <div style={grid}>
        <Metric label="Engine" value={settings.enginePreference} />
        <Metric label="Resolution" value={settings.resolutionLabel} />
        <Metric label="Frame range" value={settings.frameRange} />
        <Metric label="FPS" value={String(settings.fps)} />
      </div>
      <ul style={list}>{summarizeBlenderRenderSettings(settings).map((item, index) => <li key={buildBlenderAdapterReactKey("render", item, index)}>{item}</li>)}</ul>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 };
