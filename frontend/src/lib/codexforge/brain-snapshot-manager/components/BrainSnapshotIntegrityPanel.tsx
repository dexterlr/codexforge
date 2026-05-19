import type { BrainSnapshotIntegrityReport } from "../brain-snapshot-types";
import { BrainSnapshotPanel, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotIntegrityPanel({ report }: { report: BrainSnapshotIntegrityReport }) {
  return (
    <BrainSnapshotPanel title="Snapshot Integrity" subtitle="Checks canonical schema path, graph version, unique node ids, edge endpoints exist, known status/importance, and thresholds.">
      <div data-codexforge-brain-snapshot-integrity-panel="BrainSnapshotIntegrityPanel renders" style={{ display: "grid", gap: 8 }}>
        {report.checks.map((check) => (
          <div key={`brain-snapshot-integrity-${check.id}`} style={{ display: "grid", gap: 4, borderBottom: "1px solid rgba(148,163,184,0.12)", paddingBottom: 8 }}>
            <strong style={brainSnapshotWrapStyle}>{check.label}: {check.status}</strong>
            <span style={{ opacity: 0.74, fontSize: 13, ...brainSnapshotWrapStyle }}>{check.detail}</span>
          </div>
        ))}
      </div>
    </BrainSnapshotPanel>
  );
}
