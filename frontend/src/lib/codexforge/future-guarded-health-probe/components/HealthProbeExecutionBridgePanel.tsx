"use client";

import type { HealthProbeExecutionBridge } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, grid } from "./shared";

export function HealthProbeExecutionBridgePanel({ bridge }: { bridge: HealthProbeExecutionBridge }) {
  return (
    <ProbePanel title="Execution Bridge" marker="HealthProbeExecutionBridgePanel renders execution bridge returns manual-only/request-ready/blocked by default execution bridge does not fabricate completed success no execution on render no execution on module load">
      <div style={grid}>
        <ProbeMetric label="Status" value={bridge.status} />
        <ProbeMetric label="Guarded API allowed" value={String(bridge.allowedToCallGuardedProbeApi)} />
        <ProbeMetric label="No creative jobs" value={String(bridge.noCreativeJobs)} />
        <ProbeMetric label="No file writes" value={String(bridge.noFileWrites)} />
      </div>
      <ProbeList title="Bridge summary" items={bridge.summary} />
    </ProbePanel>
  );
}
