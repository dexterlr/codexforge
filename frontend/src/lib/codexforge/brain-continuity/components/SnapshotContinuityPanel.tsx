import type { BrainSnapshotContinuity } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { grid, item, muted, panel, pill, postureColor, title } from "./BrainContinuityStyles";

export function SnapshotContinuityPanel({ continuity }: { continuity: BrainSnapshotContinuity }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-snapshot-panel="SnapshotContinuityPanel renders snapshot restore blocked by default">
      <h2 style={title}>Snapshot Continuity</h2>
      <span style={{ ...pill, color: postureColor(continuity.posture) }}>{continuity.posture}</span>
      <p style={muted}>{continuity.summary.join(" ")}</p>
      <div style={grid}>
        {continuity.items.map((check, index) => (
          <article key={buildBrainContinuityStableKey("snapshot-continuity", check.id, index)} style={item}>
            <strong>{check.label}</strong>
            <span style={{ color: postureColor(check.status) }}>{check.status}</span>
            <span style={muted}>{check.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
