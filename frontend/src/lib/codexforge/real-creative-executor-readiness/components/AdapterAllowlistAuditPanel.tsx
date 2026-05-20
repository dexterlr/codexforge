"use client";

import type { AdapterAllowlistAudit } from "../real-creative-readiness-types";
import { ReadinessAuditRows, ReadinessList, ReadinessMetric, ReadinessPanel } from "./shared";

export function AdapterAllowlistAuditPanel({ audit }: { audit: AdapterAllowlistAudit }) {
  return (
    <ReadinessPanel title="Adapter Allowlist" marker="AdapterAllowlistAuditPanel renders no broad wildcard adapters no arbitrary command adapter dry-run future-guarded">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Status" value={audit.status} />
        <ReadinessMetric label="Blockers" value={String(audit.blockerCount)} />
        <ReadinessMetric label="Warnings" value={String(audit.warningCount)} />
      </div>
      <ReadinessList title="Allowlist summary" items={audit.summary} />
      <ReadinessAuditRows items={audit.items} />
    </ReadinessPanel>
  );
}
