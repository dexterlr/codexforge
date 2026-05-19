import type { BrainSnapshotReplaySelector } from "../brain-snapshot-types";
import { BrainSnapshotPanel, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotReplaySelectorPanel({ selector, onCopy }: { selector: BrainSnapshotReplaySelector; onCopy?: () => void }) {
  return (
    <BrainSnapshotPanel title="Replay Source Selection" subtitle="Replay selector emits runtime replay handoff only; no persistence and no event execution.">
      <div data-codexforge-brain-snapshot-replay-selector-panel="BrainSnapshotReplaySelectorPanel renders" style={{ display: "grid", gap: 10 }}>
        <p style={{ margin: 0, ...brainSnapshotWrapStyle }}>Selected snapshot id: {selector.selectedSnapshotId ?? "none"}</p>
        <p style={{ margin: 0, ...brainSnapshotWrapStyle }}>Readiness: {selector.readiness}</p>
        {selector.whySelected.map((why, index) => <span key={`brain-snapshot-replay-why-${index}-${why.slice(0, 16)}`} style={brainSnapshotWrapStyle}>{why}</span>)}
        <button type="button" onClick={onCopy} style={{ border: "1px solid rgba(45,212,191,0.35)", background: "rgba(20,184,166,0.12)", color: "inherit", borderRadius: 8, padding: "10px 12px", cursor: "pointer" }}>
          Copy replay handoff
        </button>
      </div>
    </BrainSnapshotPanel>
  );
}
