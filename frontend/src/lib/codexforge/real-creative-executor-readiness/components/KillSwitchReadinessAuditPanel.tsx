"use client";

import type { KillSwitchReadinessAudit } from "../real-creative-readiness-types";
import { ReadinessAuditRows, ReadinessList, ReadinessMetric, ReadinessPanel } from "./shared";

export function KillSwitchReadinessAuditPanel({ audit }: { audit: KillSwitchReadinessAudit }) {
  return (
    <ReadinessPanel title="Kill-Switch Readiness" marker="KillSwitchReadinessAuditPanel renders future executor kill-switch required no current process termination operator stop action defined">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Status" value={audit.status} />
        <ReadinessMetric label="Blockers" value={String(audit.blockerCount)} />
        <ReadinessMetric label="Warnings" value={String(audit.warningCount)} />
      </div>
      <ReadinessList title="Kill-switch summary" items={audit.summary} />
      <ReadinessAuditRows items={audit.items} />
    </ReadinessPanel>
  );
}
