"use client";

import type { BridgeReadinessAudit } from "../real-creative-readiness-types";
import { ReadinessAuditRows, ReadinessList, ReadinessMetric, ReadinessPanel } from "./shared";

export function BridgeReadinessAuditPanel({ audit }: { audit: BridgeReadinessAudit }) {
  return (
    <ReadinessPanel title="Bridge Readiness" marker="BridgeReadinessAuditPanel renders artifact boundary visible real probe still blocked bridge health before real executor">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Status" value={audit.status} />
        <ReadinessMetric label="Blockers" value={String(audit.blockerCount)} />
        <ReadinessMetric label="Warnings" value={String(audit.warningCount)} />
      </div>
      <ReadinessList title="Bridge summary" items={audit.summary} />
      <ReadinessAuditRows items={audit.items} />
    </ReadinessPanel>
  );
}
