"use client";

import type { HealthProbePreflight } from "../future-health-probe-types";
import { buildFutureHealthProbeReactKey } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, grid, pill } from "./shared";

export function HealthProbePreflightPanel({ preflight }: { preflight: HealthProbePreflight }) {
  return (
    <ProbePanel title="Preflight" marker="HealthProbePreflightPanel renders preflight checks no arbitrary command preflight checks no arbitrary endpoint no secrets no render/job execution">
      <ProbeList title="Preflight summary" items={preflight.summary} />
      <div style={grid}>
        {preflight.checks.map((check) => (
          <div key={buildFutureHealthProbeReactKey("preflight", check.id)} style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <span style={pill}>{check.status}</span>
            <ProbeMetric label={check.label} value={check.detail} />
          </div>
        ))}
      </div>
    </ProbePanel>
  );
}
