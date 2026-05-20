"use client";

import type { ArtifactOutputAudit } from "../real-creative-readiness-types";
import { ReadinessAuditRows, ReadinessList, ReadinessMetric, ReadinessPanel } from "./shared";

export function ArtifactOutputAuditPanel({ audit }: { audit: ArtifactOutputAudit }) {
  return (
    <ReadinessPanel title="Artifact Output" marker="ArtifactOutputAuditPanel renders generated-vs-placeholder distinction partial output failed output no file writes">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Status" value={audit.status} />
        <ReadinessMetric label="Blockers" value={String(audit.blockerCount)} />
        <ReadinessMetric label="Warnings" value={String(audit.warningCount)} />
      </div>
      <ReadinessList title="Artifact output summary" items={audit.summary} />
      <ReadinessAuditRows items={audit.items} />
    </ReadinessPanel>
  );
}
