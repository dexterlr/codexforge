import type { ContinuityHandoffState } from "../index";
import { grid, item, muted, panel, pill, postureColor, title } from "./ContinuityHandoffStyles";

export function HandoffStatePanel({ state }: { state: ContinuityHandoffState }) {
  return (
    <section style={panel} data-codexforge-handoff-state-panel="HandoffStatePanel renders">
      <h2 style={title}>Current State</h2>
      <div style={grid}>
        {state.items.map((entry) => (
          <div key={entry.id} style={item}>
            <span style={pill}>{entry.sourceSurface}</span>
            <strong style={{ color: postureColor(entry.posture), overflowWrap: "anywhere" }}>{entry.label}: {entry.posture}</strong>
            <p style={muted}>{entry.detail}</p>
            <span style={muted}>{entry.relatedRoute}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
