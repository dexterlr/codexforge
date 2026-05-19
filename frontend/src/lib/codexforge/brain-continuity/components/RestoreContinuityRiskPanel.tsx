import type { SnapshotRestoreContinuityRisk } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { grid, item, muted, panel, pill, postureColor, title } from "./BrainContinuityStyles";

export function RestoreContinuityRiskPanel({ risk }: { risk: SnapshotRestoreContinuityRisk }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-restore-risk-panel="RestoreContinuityRiskPanel renders data-loss-risk direct-saveBrainGraph-risk">
      <h2 style={title}>Restore Continuity Risk</h2>
      <span style={{ ...pill, color: postureColor(risk.posture) }}>{risk.posture}</span>
      <p style={muted}>{risk.summary.join(" ")}</p>
      <div style={grid}>
        {risk.items.map((itemModel, index) => (
          <article key={buildBrainContinuityStableKey("restore-risk", itemModel.id, index)} style={item}>
            <span style={{ ...pill, color: postureColor(itemModel.severity) }}>{itemModel.severity}</span>
            <strong>{itemModel.title}</strong>
            <span style={muted}>{itemModel.detail}</span>
            <span style={muted}>Mitigation: {itemModel.mitigation}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
