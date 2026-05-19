import type { BrainSnapshotGovernanceReport } from "../brain-snapshot-types";
import { BrainSnapshotPanel, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotGovernancePanel({ report }: { report: BrainSnapshotGovernanceReport }) {
  return (
    <BrainSnapshotPanel title="Snapshot Governance" subtitle="Memory governance review and mutation boundary visibility for Phase 50.">
      <div data-codexforge-brain-snapshot-governance-panel="BrainSnapshotGovernancePanel renders" style={{ display: "grid", gap: 8 }}>
        {report.items.map((item) => (
          <div key={`brain-snapshot-governance-${item.id}`} style={{ display: "grid", gap: 4, borderBottom: "1px solid rgba(148,163,184,0.12)", paddingBottom: 8 }}>
            <strong style={brainSnapshotWrapStyle}>{item.label}: {item.status}</strong>
            <span style={{ opacity: 0.74, fontSize: 13, ...brainSnapshotWrapStyle }}>{item.detail}</span>
          </div>
        ))}
      </div>
    </BrainSnapshotPanel>
  );
}
