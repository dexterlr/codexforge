"use client";

import type { HealthProbeTarget } from "../future-health-probe-types";
import { buildFutureHealthProbeReactKey } from "../future-health-probe-types";
import { ProbeMetric, ProbePanel, grid, pill } from "./shared";

export function HealthProbeTargetPanel({ targets }: { targets: HealthProbeTarget[] }) {
  return (
    <ProbePanel title="Probe Targets" marker="HealthProbeTargetPanel renders targets include blender-version comfyui-health-endpoint unreal-editor-path-presence ffmpeg-version artifact-output-boundary">
      <div style={grid}>
        {targets.map((target) => (
          <div key={buildFutureHealthProbeReactKey("target", target.id)} style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <span style={pill}>{target.defaultStatus}</span>
            <ProbeMetric label={target.label} value={target.probeType} />
            <ProbeMetric label="Bridge target" value={target.bridgeTargetId} />
            <ProbeMetric label="Risk" value={target.riskLevel} />
            <p style={{ margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "break-word" }}>{target.sideEffectProfile}</p>
          </div>
        ))}
      </div>
    </ProbePanel>
  );
}
