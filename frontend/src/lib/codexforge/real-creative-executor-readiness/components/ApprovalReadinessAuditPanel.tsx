"use client";

import type { ApprovalReadinessAudit } from "../real-creative-readiness-types";
import { ReadinessAuditRows, ReadinessList, ReadinessMetric, ReadinessPanel } from "./shared";

export function ApprovalReadinessAuditPanel({ audit }: { audit: ApprovalReadinessAudit }) {
  return (
    <ReadinessPanel title="Approval Readiness" marker="ApprovalReadinessAuditPanel renders cancellation limits acknowledged rollback limits acknowledged approval does not execute anything">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Status" value={audit.status} />
        <ReadinessMetric label="Blockers" value={String(audit.blockerCount)} />
        <ReadinessMetric label="Warnings" value={String(audit.warningCount)} />
      </div>
      <ReadinessList title="Approval summary" items={audit.summary} />
      <ReadinessAuditRows items={audit.items} />
    </ReadinessPanel>
  );
}
