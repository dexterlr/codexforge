import type { BrainContinuitySignal, BrainContinuitySignalSummary } from "../brain-continuity-types";
import { buildBrainContinuityStableKey } from "../brain-continuity-types";
import { grid, item, muted, panel, pill, postureColor, title } from "./BrainContinuityStyles";

export function ContinuitySignalPanel({ signals, summary }: { signals: readonly BrainContinuitySignal[]; summary: BrainContinuitySignalSummary }) {
  return (
    <section style={panel} data-codexforge-brain-continuity-signal-panel="ContinuitySignalPanel renders">
      <h2 style={title}>Continuity Signals</h2>
      <p style={muted}>{summary.summary.join(" ")}</p>
      <div style={grid}>
        {signals.map((signal, index) => (
          <article key={buildBrainContinuityStableKey("signal", signal.id, index)} style={item}>
            <span style={{ ...pill, color: postureColor(signal.severity) }}>{signal.severity}</span>
            <strong>{signal.title}</strong>
            <span style={muted}>{signal.detail}</span>
            <span style={muted}>Route: {signal.relatedRoute}</span>
            <span style={muted}>Next: {signal.nextAction}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
