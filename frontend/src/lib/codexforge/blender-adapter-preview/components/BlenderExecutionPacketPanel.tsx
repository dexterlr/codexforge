import type { CSSProperties } from "react";
import type { BlenderExecutionPacket } from "../blender-adapter-types";
import { buildBlenderAdapterReactKey, summarizeBlenderExecutionPacket } from "../index";

export function BlenderExecutionPacketPanel({ packet }: { packet: BlenderExecutionPacket }) {
  const packetText = JSON.stringify(
    {
      packetId: packet.packetId,
      sourceSceneInputId: packet.sourceSceneInputId,
      bridgeProfileId: packet.bridgeProfileId,
      adapterId: packet.adapterId,
      scriptPreviewId: packet.scriptPreviewId,
      expectedArtifacts: packet.expectedArtifacts,
      futureExecutorBoundary: packet.futureExecutorBoundary,
      noExecutionGuarantee: packet.noExecutionGuarantee,
    },
    null,
    2
  );
  const reviewPrompt = [
    "Review Blender Adapter Preview v1.",
    "Keep preview-only. Do not launch Blender, execute Python, render, write files, or call a provider.",
    packet.futureExecutorBoundary,
    "Preserve latest-message authority.",
  ].join("\n");
  const copyPacket = () => {
    void navigator.clipboard?.writeText(packetText);
  };
  const copyPrompt = () => {
    void navigator.clipboard?.writeText(reviewPrompt);
  };

  return (
    <section style={panel} data-blender-execution-packet-panel="BlenderExecutionPacketPanel renders">
      <div style={header}>
        <h2 style={title}>BlenderExecutionPacketPanel renders</h2>
        <div style={actions}>
          <button type="button" style={button} onClick={copyPacket}>Copy execution packet</button>
          <button type="button" style={button} onClick={copyPrompt}>Copy Blender review prompt</button>
        </div>
      </div>
      <div style={grid}>
        <Metric label="Adapter" value={packet.adapterId} />
        <Metric label="Bridge" value={packet.bridgeProfileId} />
        <Metric label="Artifacts" value={String(packet.expectedArtifacts.length)} />
      </div>
      <ul style={list}>{summarizeBlenderExecutionPacket(packet).map((item, index) => <li key={buildBlenderAdapterReactKey("packet", item, index)}>{item}</li>)}</ul>
      <p style={copyOnly}>copy execution packet allowed; copy Blender review prompt allowed; no execution command is exposed.</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const actions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const button: CSSProperties = { border: "1px solid rgba(94,234,212,0.32)", background: "rgba(20,184,166,0.16)", color: "#ccfbf1", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 };
const copyOnly: CSSProperties = { margin: 0, color: "#a7f3d0", fontWeight: 800, fontSize: 12, textTransform: "uppercase" };
