import type { RuntimeEventJournalHealth } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { grid, item, muted, panel, pill, postureColor, title } from "./BrainContinuityStyles";

export function EventJournalHealthPanel({ health }: { health: RuntimeEventJournalHealth }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-journal-health-panel="EventJournalHealthPanel renders append-only semantics">
      <h2 style={title}>Runtime Event Journal Health</h2>
      <span style={{ ...pill, color: postureColor(health.posture) }}>{health.posture}</span>
      <p style={muted}>{health.summary.join(" ")}</p>
      <div style={grid}>
        {health.checks.map((check, index) => (
          <article key={buildBrainContinuityStableKey("journal-health", check.id, index)} style={item}>
            <span style={{ ...pill, color: postureColor(check.status) }}>{check.status}</span>
            <strong>{check.label}</strong>
            <span style={muted}>{check.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
