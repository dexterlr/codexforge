"use client";

import type { BridgeHealthProbePreview } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { HealthList, HealthPanel, pill, titleStyle } from "./shared";

export function BridgeHealthProbePreviewPanel({ preview }: { preview: BridgeHealthProbePreview }) {
  return (
    <HealthPanel marker="BridgeHealthProbePreviewPanel renders probe preview says no actual probe probe preview says no command execution probe preview says no HTTP calls">
      <h2 style={titleStyle}>Probe Preview</h2>
      <HealthList title="Preview boundary" items={preview.summary} />
      {preview.items.map((item, index) => (
        <article key={buildLocalBridgeHealthReactKey("probe", item.id, index)} style={{ display: "grid", gap: 6, minWidth: 0 }}>
          <span style={pill}>{item.probeType}</span>
          <strong>{item.order}. {item.label}</strong>
          <span style={{ color: "#cbd5e1", overflowWrap: "break-word" }}>{item.wouldCheck}</span>
          <span style={{ color: "#fecaca", overflowWrap: "break-word" }}>{item.sideEffectSummary}</span>
          <span style={{ color: "#bfdbfe", overflowWrap: "break-word" }}>{item.noExecutionGuarantee}</span>
        </article>
      ))}
    </HealthPanel>
  );
}
