import type { BrainGovernanceContinuity } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { grid, item, muted, panel, pill, postureColor, title } from "./BrainContinuityStyles";

export function GovernanceContinuityPanel({ continuity }: { continuity: BrainGovernanceContinuity }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-governance-panel="GovernanceContinuityPanel renders canonical schema legacy brain-graph import blocked direct UI graph mutation blocked">
      <h2 style={title}>Governance Continuity</h2>
      <span style={{ ...pill, color: postureColor(continuity.posture) }}>{continuity.posture}</span>
      <p style={muted}>{continuity.summary.join(" ")}</p>
      <div style={grid}>
        {continuity.checks.map((check, index) => (
          <article key={buildBrainContinuityStableKey("governance-continuity", check.id, index)} style={item}>
            <strong>{check.label}</strong>
            <span style={{ color: postureColor(check.status) }}>{check.status}</span>
            <span style={muted}>{check.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
