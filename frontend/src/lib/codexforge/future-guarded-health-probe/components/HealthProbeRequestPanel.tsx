"use client";

import type { HealthProbeRequest } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, codeBox, grid } from "./shared";

export function HealthProbeRequestPanel({ request }: { request: HealthProbeRequest }) {
  return (
    <ProbePanel title="Probe Request" marker="HealthProbeRequestPanel renders metadata-only request-ready manual-first no creative job execution preserve latest-message authority">
      <div style={grid}>
        <ProbeMetric label="Request" value={request.id} />
        <ProbeMetric label="Mode" value={request.requestedMode} />
        <ProbeMetric label="Probe type" value={request.probeType} />
        <ProbeMetric label="Approval required" value={String(request.approvalRequired)} />
      </div>
      <div style={codeBox}>{request.expectedResultShape}</div>
      <ProbeList title="Request guarantees" items={[request.noJobExecutionGuarantee, request.latestMessageAuthorityReminder, ...request.suppliedConfigHints]} />
    </ProbePanel>
  );
}
