"use client";

import type { HealthProbeApprovalPacket } from "../future-health-probe-types";
import { ProbeList, ProbeMetric, ProbePanel, grid } from "./shared";

export function HealthProbeApprovalPanel({ approval }: { approval: HealthProbeApprovalPacket }) {
  return (
    <ProbePanel title="Approval Packet" marker="HealthProbeApprovalPanel renders approval packet defaults approved false approval does not execute automatically">
      <div style={grid}>
        <ProbeMetric label="Approved" value={String(approval.approved)} />
        <ProbeMetric label="Valid" value={String(approval.valid)} />
        <ProbeMetric label="Blockers" value={String(approval.blockerReasons.length)} />
      </div>
      <ProbeList title="Acknowledgement blockers" items={approval.blockerReasons.length ? approval.blockerReasons : ["All acknowledgements supplied."]} />
    </ProbePanel>
  );
}
