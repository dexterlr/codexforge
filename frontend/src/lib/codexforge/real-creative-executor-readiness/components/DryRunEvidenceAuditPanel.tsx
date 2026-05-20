"use client";

import type { DryRunEvidenceAudit } from "../real-creative-readiness-types";
import { ReadinessAuditRows, ReadinessList, ReadinessMetric, ReadinessPanel } from "./shared";

export function DryRunEvidenceAuditPanel({ audit }: { audit: DryRunEvidenceAudit }) {
  return (
    <ReadinessPanel title="Dry-Run Evidence" marker="DryRunEvidenceAuditPanel renders no real execution occurred fake artifacts labeled fake logs labeled evidence is context not authority">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Status" value={audit.status} />
        <ReadinessMetric label="Blockers" value={String(audit.blockerCount)} />
        <ReadinessMetric label="Warnings" value={String(audit.warningCount)} />
      </div>
      <ReadinessList title="Dry-run evidence summary" items={audit.summary} />
      <ReadinessAuditRows items={audit.items} />
    </ReadinessPanel>
  );
}
