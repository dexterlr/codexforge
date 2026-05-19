import type { RuntimeReplayContinuity } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { grid, item, muted, panel, pill, postureColor, title } from "./BrainContinuityStyles";

export function ReplayContinuityPanel({ continuity }: { continuity: RuntimeReplayContinuity }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-replay-panel="ReplayContinuityPanel renders preview-only">
      <h2 style={title}>Replay Continuity</h2>
      <span style={{ ...pill, color: postureColor(continuity.posture) }}>{continuity.posture}</span>
      <p style={muted}>{continuity.summary.join(" ")}</p>
      <div style={grid}>
        {continuity.checks.map((check, index) => (
          <article key={buildBrainContinuityStableKey("replay-continuity", check.id, index)} style={item}>
            <strong>{check.label}</strong>
            <span style={{ color: postureColor(check.status) }}>{check.status}</span>
            <span style={muted}>{check.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
