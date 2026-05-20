import type { CSSProperties } from "react";
import type { UnrealExecutionPacket } from "../unreal-adapter-types";
import { buildUnrealAdapterReactKey, summarizeUnrealExecutionPacket } from "../index";
import { button, metaGrid, panel, titleStyle, UnrealMetric } from "./UnrealPanelShared";

export function UnrealExecutionPacketPanel({ packet }: { packet: UnrealExecutionPacket }) {
  const packetText = JSON.stringify(
    {
      packetId: packet.packetId,
      sourceProjectInputId: packet.sourceProjectInputId,
      bridgeProfileId: packet.bridgeProfileId,
      adapterId: packet.adapterId,
      commandPreviewId: packet.commandPreviewId,
      expectedArtifacts: packet.expectedArtifacts,
      futureExecutorBoundary: packet.futureExecutorBoundary,
      noExecutionGuarantee: packet.noExecutionGuarantee,
    },
    null,
    2
  );
  const reviewPrompt = [
    "Review Unreal Adapter Preview v1.",
    "Keep preview-only. Do not launch Unreal, execute editor commands, run automation, render, package/build, write files, or call a provider.",
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
    <section style={panel} data-unreal-execution-packet-panel="UnrealExecutionPacketPanel renders">
      <div style={header}>
        <h2 style={titleStyle}>UnrealExecutionPacketPanel renders</h2>
        <div style={actions}>
          <button type="button" style={button} onClick={copyPacket}>Copy execution packet</button>
          <button type="button" style={button} onClick={copyPrompt}>Copy Unreal review prompt</button>
          <a href="/creative-sandbox" style={button}>Open Creative Execution Sandbox</a>
        </div>
      </div>
      <div style={metaGrid}>
        <UnrealMetric label="Adapter" value={packet.adapterId} />
        <UnrealMetric label="Bridge" value={packet.bridgeProfileId} />
        <UnrealMetric label="Artifacts" value={String(packet.expectedArtifacts.length)} />
      </div>
      <ul style={list}>{summarizeUnrealExecutionPacket(packet).map((item, index) => <li key={buildUnrealAdapterReactKey("packet", item, index)}>{item}</li>)}</ul>
      <p style={copyOnly}>copy execution packet allowed; copy Unreal review prompt allowed; no execution command is exposed.</p>
    </section>
  );
}

const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const actions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 };
const copyOnly: CSSProperties = { margin: 0, color: "#a7f3d0", fontWeight: 800, fontSize: 12, textTransform: "uppercase" };
