"use client";

import type { PathBoundaryAudit } from "../real-creative-readiness-types";
import { ReadinessAuditRows, ReadinessList, ReadinessMetric, ReadinessPanel } from "./shared";

export function PathBoundaryAuditPanel({ audit }: { audit: PathBoundaryAudit }) {
  return (
    <ReadinessPanel title="Path Boundaries" marker="PathBoundaryAuditPanel renders parent directory traversal output root boundary no absolute unreviewed output path">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Status" value={audit.status} />
        <ReadinessMetric label="Blockers" value={String(audit.blockerCount)} />
        <ReadinessMetric label="Warnings" value={String(audit.warningCount)} />
      </div>
      <ReadinessList title="Path summary" items={audit.summary} />
      <ReadinessAuditRows items={audit.items} />
    </ReadinessPanel>
  );
}
