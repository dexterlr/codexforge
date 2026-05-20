"use client";

import type { BridgeHealthTarget } from "../local-bridge-health-types";
import { buildLocalBridgeHealthReactKey } from "../local-bridge-health-types";
import { HealthPanel, grid, pill, titleStyle } from "./shared";

export function BridgeHealthTargetPanel({ targets }: { targets: BridgeHealthTarget[] }) {
  return (
    <HealthPanel marker="BridgeHealthTargetPanel renders">
      <h2 style={titleStyle}>Health Targets</h2>
      <div style={grid}>
        {targets.map((target, index) => (
          <article key={buildLocalBridgeHealthReactKey("target", target.id, index)} style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <span style={pill}>{target.id}</span>
            <strong>{target.label}</strong>
            <span>{target.targetKind} | {target.probeMode}</span>
            <span style={{ color: "#cbd5e1", overflowWrap: "break-word" }}>{target.expectedLocalRequirement}</span>
            <span style={{ color: "#fef3c7", overflowWrap: "break-word" }}>{target.nextSetupAction}</span>
          </article>
        ))}
      </div>
    </HealthPanel>
  );
}
