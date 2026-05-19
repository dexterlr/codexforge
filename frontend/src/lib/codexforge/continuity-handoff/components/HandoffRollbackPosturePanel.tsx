import type { ContinuityHandoffRollbackPosture } from "../index";
import { grid, item, muted, panel, pill, title } from "./ContinuityHandoffStyles";

export function HandoffRollbackPosturePanel({ posture }: { posture: ContinuityHandoffRollbackPosture }) {
  return (
    <section style={panel} data-codexforge-handoff-rollback-posture-panel="HandoffRollbackPosturePanel renders rollback posture mentions git restore git revert">
      <h2 style={title}>Rollback Posture</h2>
      <p style={muted}>Working tree must be clean before checkpoint decisions. Snapshot restore remains blocked by default; Brain graph restore blocked by default; apply-diff rollback must be approval-gated.</p>
      <div style={grid}>
        {posture.options.map((option) => (
          <div key={option.id} style={item}>
            <span style={pill}>{option.readiness}</span>
            <strong style={{ overflowWrap: "anywhere" }}>{option.label}</strong>
            <p style={muted}>{option.detail}</p>
            <p style={muted}>{option.commandHint}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
