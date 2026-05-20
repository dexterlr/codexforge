"use client";

import type { BridgeHealthPolicy } from "../local-bridge-health-types";
import { HealthList, HealthMetric, HealthPanel, grid, titleStyle } from "./shared";

export function BridgeHealthPolicyPanel({ policy }: { policy: BridgeHealthPolicy }) {
  return (
    <HealthPanel marker="BridgeHealthPolicyPanel renders policy blocks executable launch by default policy blocks local HTTP call by default policy blocks ffmpeg version command by default policy blocks Blender launch policy blocks ComfyUI HTTP request policy blocks Unreal launch policy blocks artifact directory write">
      <h2 style={titleStyle}>Health Policy</h2>
      <div style={grid}>
        <HealthMetric label="Preview allowed" value={String(policy.previewAllowed)} />
        <HealthMetric label="Probe allowed" value={String(policy.probeAllowed)} />
        <HealthMetric label="Request ready" value={String(policy.requestReady)} />
      </div>
      <HealthList title="Blocked reasons" items={policy.blockedReasons} />
      <HealthList title="Warnings" items={policy.warnings} />
      <HealthList title="Rules" items={policy.rules} />
    </HealthPanel>
  );
}
