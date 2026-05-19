"use client";

import type { CSSProperties } from "react";
import type { CreativeJobPolicy } from "../creative-local-bridge-types";
import { buildCreativeLocalBridgeReactKey } from "../creative-local-bridge-summary";

export function CreativeJobPolicyPanel({ policy }: { policy: CreativeJobPolicy }) {
  return (
    <section style={card} data-codexforge-creative-job-policy-panel="CreativeJobPolicyPanel renders job policy blocks Blender execution in Phase 61 job policy blocks ComfyUI execution in Phase 61 job policy blocks Unreal execution in Phase 61 job policy blocks video render execution in Phase 61">
      <span style={eyebrow}>Policy</span>
      <strong>Creative Job Policy</strong>
      <div style={grid}>
        <Metric label="Preview" value={String(policy.previewAllowed)} />
        <Metric label="Request" value={String(policy.requestReady)} />
        <Metric label="Execution" value={String(policy.executionAllowed)} />
      </div>
      <div style={list}>
        {policy.blockedReasons.map((reason) => (
          <span key={buildCreativeLocalBridgeReactKey("block", reason)} style={block}>{reason}</span>
        ))}
      </div>
      <p style={copy}>{policy.nextSafeAction}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const card: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(30,8,13,0.74)", borderRadius: 8, padding: 16, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(248,113,113,0.18)", borderRadius: 8, padding: 9, display: "grid", gap: 4 };
const list: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const block: CSSProperties = { border: "1px solid rgba(248,113,113,0.18)", borderRadius: 8, padding: "5px 7px", color: "#fecaca", fontSize: 12, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#fecaca", lineHeight: 1.5 };
