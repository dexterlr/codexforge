"use client";

import type { HealthProbeReadinessUpdate } from "../future-health-probe-types";
import { buildFutureHealthProbeReactKey } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, grid } from "./shared";

export function HealthProbeReadinessUpdatePanel({ update }: { update: HealthProbeReadinessUpdate }) {
  return (
    <ProbePanel title="Readiness Update" marker="HealthProbeReadinessUpdatePanel renders readiness update does not persist automatically no Brain mutation no file writes">
      <ProbeList title="Update summary" items={update.summary} />
      <div style={grid}>
        {update.items.map((item) => (
          <div key={buildFutureHealthProbeReactKey("readiness", item.targetId)} style={{ display: "grid", gap: 8, minWidth: 0 }}>
            <ProbeMetric label={item.targetId} value={item.localBridgeHealth} />
            <ProbeMetric label="Next setup action" value={item.nextSetupAction} />
            <ProbeMetric label="Auto persistence" value={String(item.persistedAutomatically)} />
          </div>
        ))}
      </div>
    </ProbePanel>
  );
}
