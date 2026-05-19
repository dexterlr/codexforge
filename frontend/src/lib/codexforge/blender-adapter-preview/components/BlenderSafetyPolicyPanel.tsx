import type { CSSProperties } from "react";
import type { BlenderAdapterSafetyPolicy } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey, summarizeBlenderAdapterSafetyPolicy } from "../index";

export function BlenderSafetyPolicyPanel({ policy }: { policy: BlenderAdapterSafetyPolicy }) {
  return (
    <section style={panel} data-blender-safety-policy-panel="BlenderSafetyPolicyPanel renders">
      <h2 style={title}>BlenderSafetyPolicyPanel renders</h2>
      <div style={grid}>
        <Metric label="Preview" value={policy.previewAllowed ? "allowed" : "blocked"} />
        <Metric label="Execution" value={policy.executionAllowed ? "allowed" : "blocked"} />
        <Metric label="Request" value={policy.requestReady ? "request-ready" : "not ready"} />
      </div>
      <ul style={list}>{summarizeBlenderAdapterSafetyPolicy(policy).map((item, index) => <li key={buildBlenderAdapterReactKey("policy-summary", item, index)}>{item}</li>)}</ul>
      <ul style={list}>{policy.blockedReasons.map((item, index) => <li key={buildBlenderAdapterReactKey("blocked", item, index)}>{item}</li>)}</ul>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.24)", background: "rgba(69,10,10,0.18)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(248,113,113,0.2)", background: "rgba(2,6,23,0.44)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fecaca", lineHeight: 1.5 };
