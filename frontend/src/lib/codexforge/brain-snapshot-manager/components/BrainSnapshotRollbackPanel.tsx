import type { BrainSnapshotRollbackPlan } from "../brain-snapshot-types";
import { BrainSnapshotPanel, brainSnapshotWrapStyle } from "./BrainSnapshotPanel";

export function BrainSnapshotRollbackPanel({ plan }: { plan: BrainSnapshotRollbackPlan }) {
  return (
    <BrainSnapshotPanel title="Rollback Planning" subtitle="Conceptual rollback plan only; no snapshot restore in Phase 50 and never restore automatically.">
      <div data-codexforge-brain-snapshot-rollback-panel="BrainSnapshotRollbackPanel renders" style={{ display: "grid", gap: 10 }}>
        {plan.options.map((option) => (
          <article key={`brain-snapshot-rollback-${option.id}`} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 12, minWidth: 0 }}>
            <strong style={brainSnapshotWrapStyle}>{option.label}</strong>
            <p style={{ margin: "6px 0 0", opacity: 0.76, lineHeight: 1.5, ...brainSnapshotWrapStyle }}>{option.detail}</p>
          </article>
        ))}
      </div>
    </BrainSnapshotPanel>
  );
}
