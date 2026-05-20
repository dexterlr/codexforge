"use client";

import type { CreativeExecutorApprovalPacket, CreativeExecutorValidation } from "../guarded-creative-executor-types";
import { summarizeCreativeExecutorApprovalPacket } from "../creative-executor-approval";
import { ExecutorList, ExecutorMetric, panel, titleStyle } from "./shared";

export function CreativeExecutorApprovalPanel({
  approval,
  validation,
}: {
  approval: CreativeExecutorApprovalPacket;
  validation: CreativeExecutorValidation;
}) {
  return (
    <section style={panel} data-creative-executor-approval-panel="CreativeExecutorApprovalPanel renders approval packet defaults approved false missing acknowledgements block readiness">
      <h2 style={titleStyle}>Approval Packet</h2>
      <ExecutorMetric label="Approved" value={String(approval.approved)} />
      <ExecutorList title="Summary" items={summarizeCreativeExecutorApprovalPacket(approval)} />
      <ExecutorList title="Acknowledgement blockers" items={validation.blockedReasons.length ? validation.blockedReasons : ["all acknowledgements present"]} />
    </section>
  );
}
