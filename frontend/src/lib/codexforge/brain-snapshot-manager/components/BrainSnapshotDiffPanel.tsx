import type { BrainSnapshotDiff } from "../brain-snapshot-types";
import { BrainSnapshotPanel, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotDiffPanel({ diff }: { diff: BrainSnapshotDiff }) {
  return (
    <BrainSnapshotPanel title="Snapshot Diff" subtitle="Compact deterministic diff by stable id; no raw JSON in main UI.">
      <div data-codexforge-brain-snapshot-diff-panel="BrainSnapshotDiffPanel renders" style={{ display: "grid", gap: 10 }}>
        {diff.items.map((item) => (
          <article key={`brain-snapshot-diff-${item.id}`} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 12, minWidth: 0 }}>
            <strong style={brainSnapshotWrapStyle}>{item.label}</strong>
            <p style={{ margin: "6px 0 0", opacity: 0.76, lineHeight: 1.5, ...brainSnapshotWrapStyle }}>{item.summary}</p>
          </article>
        ))}
      </div>
    </BrainSnapshotPanel>
  );
}
