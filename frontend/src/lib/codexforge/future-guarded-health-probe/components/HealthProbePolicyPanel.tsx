"use client";

import type { HealthProbePolicy } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, grid } from "./shared";

export function HealthProbePolicyPanel({ policy }: { policy: HealthProbePolicy }) {
  return (
    <ProbePanel title="Policy Boundary" marker="HealthProbePolicyPanel renders policy blocks command probes by default policy blocks local HTTP probes by default policy blocks executable launches policy blocks render/job execution policy blocks artifact writes policy blocks broker execution">
      <div style={grid}>
        <ProbeMetric label="Preview" value={String(policy.previewAllowed)} />
        <ProbeMetric label="Manual" value={String(policy.manualAllowed)} />
        <ProbeMetric label="Probe" value={String(policy.probeAllowed)} />
        <ProbeMetric label="Request ready" value={String(policy.requestReady)} />
      </div>
      <ProbeList title="Blocked reasons" items={policy.blockedReasons} />
      <ProbeList title="Warnings" items={policy.warnings} />
    </ProbePanel>
  );
}
