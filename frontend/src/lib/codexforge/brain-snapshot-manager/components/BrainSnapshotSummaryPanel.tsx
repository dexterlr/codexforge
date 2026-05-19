import type { BrainSnapshotSummary } from "../brain-snapshot-types";
import { BrainSnapshotPanel, brainSnapshotGridStyle, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotSummaryPanel({ summary }: { summary: BrainSnapshotSummary }) {
  return (
    <BrainSnapshotPanel title="Snapshot Summary" subtitle="Deterministic metrics for graph size, density, activity, coverage, stale nodes, blocked/error status, and governance risk.">
      <div data-codexforge-brain-snapshot-summary-panel="BrainSnapshotSummaryPanel renders" style={brainSnapshotGridStyle}>
        {summary.metrics.map((metric) => (
          <article key={`brain-snapshot-metric-${metric.id}`} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 12, minWidth: 0 }}>
            <div style={{ fontSize: 12, opacity: 0.68 }}>{metric.label}</div>
            <strong style={{ fontSize: 22, ...brainSnapshotWrapStyle }}>{metric.value}</strong>
            <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.45, opacity: 0.76, ...brainSnapshotWrapStyle }}>{metric.detail}</p>
          </article>
        ))}
      </div>
    </BrainSnapshotPanel>
  );
}
