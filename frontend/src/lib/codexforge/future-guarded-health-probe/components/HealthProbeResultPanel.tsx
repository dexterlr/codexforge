"use client";

import type { HealthProbeResult } from "../future-health-probe-types";
import { buildFutureHealthProbeReactKey } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, grid, pill } from "./shared";

export function HealthProbeResultPanel({ result }: { result: HealthProbeResult }) {
  return (
    <ProbePanel title="Result Capture" marker="HealthProbeResultPanel renders result does not fabricate readiness no exact version unless supplied no real command output claims unless supplied">
      <ProbeList title="Result summary" items={result.summary} />
      <div style={grid}>
        {result.items.map((item) => (
          <div key={buildFutureHealthProbeReactKey("result", item.targetId)} style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <span style={pill}>{item.status}</span>
            <ProbeMetric label={item.targetId} value={item.resultSource} />
            <ProbeMetric label="Confidence" value={item.confidence} />
            <ProbeMetric label="No job executed" value={String(item.noJobExecutedConfirmation)} />
          </div>
        ))}
      </div>
    </ProbePanel>
  );
}
