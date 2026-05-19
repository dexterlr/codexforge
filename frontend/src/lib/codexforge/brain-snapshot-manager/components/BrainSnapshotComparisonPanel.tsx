import type { BrainSnapshotComparison } from "../brain-snapshot-types";
import { BrainSnapshotPanel, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotComparisonPanel({ comparison }: { comparison: BrainSnapshotComparison }) {
  return (
    <BrainSnapshotPanel title="Snapshot Comparison" subtitle="Snapshot comparison is review-only and can recommend replay without applying rollback.">
      <div data-codexforge-brain-snapshot-comparison-panel="BrainSnapshotComparisonPanel renders" style={{ display: "grid", gap: 10 }}>
        {comparison.deltaMetrics.map((item) => (
          <div key={`brain-snapshot-comparison-${item.id}`} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12, borderBottom: "1px solid rgba(148,163,184,0.12)", paddingBottom: 8 }}>
            <span style={brainSnapshotWrapStyle}>{item.label}</span>
            <strong>{item.delta > 0 ? "+" : ""}{item.delta}</strong>
          </div>
        ))}
        <p style={{ margin: 0, opacity: 0.78, ...brainSnapshotWrapStyle }}>
          Risk: {comparison.riskLevel}. Replay recommended: {comparison.replayRecommended ? "yes" : "no"}.
        </p>
      </div>
    </BrainSnapshotPanel>
  );
}
