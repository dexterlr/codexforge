import type { BrainSnapshotModel } from "../brain-snapshot-types";
import { brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotCard({ snapshot, selected, onSelect }: { snapshot: BrainSnapshotModel; selected: boolean; onSelect?: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-codexforge-brain-snapshot-card="BrainSnapshotCard renders"
      style={{
        textAlign: "left",
        border: selected ? "1px solid rgba(45,212,191,0.5)" : "1px solid rgba(125,211,252,0.16)",
        background: selected ? "rgba(20,184,166,0.13)" : "rgba(15,23,42,0.66)",
        color: "inherit",
        borderRadius: 8,
        padding: 16,
        display: "grid",
        gap: 10,
        cursor: "pointer",
        minWidth: 0,
      }}
    >
      <strong style={{ fontSize: 16, ...brainSnapshotWrapStyle }}>{snapshot.label}</strong>
      <span style={{ opacity: 0.72, fontSize: 12, ...brainSnapshotWrapStyle }}>{snapshot.id}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <span>{snapshot.nodeCount} nodes</span>
        <span>{snapshot.edgeCount} edges</span>
        <span>{snapshot.source}</span>
      </div>
      <span style={{ fontSize: 12, opacity: 0.76, ...brainSnapshotWrapStyle }}>
        {snapshot.noMutationGuarantee}
      </span>
    </button>
  );
}
