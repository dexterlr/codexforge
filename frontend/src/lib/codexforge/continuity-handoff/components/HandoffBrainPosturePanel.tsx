import type { ContinuityHandoffBrainPosture } from "../index";
import { grid, item, muted, panel, pill, title } from "./ContinuityHandoffStyles";

export function HandoffBrainPosturePanel({ posture }: { posture: ContinuityHandoffBrainPosture }) {
  return (
    <section style={panel} data-codexforge-handoff-brain-posture-panel="HandoffBrainPosturePanel renders brain posture says canonical graph schema appendEvent from UI blocked">
      <h2 style={title}>Brain Continuity Posture</h2>
      <p style={muted}>canonical graph schema; direct UI mutation blocked; saveBrainGraph from UI blocked; appendEvent from UI blocked; preserve latest-message authority.</p>
      <div style={grid}>
        {posture.items.map((entry) => (
          <div key={entry.id} style={item}>
            <span style={pill}>{entry.posture}</span>
            <strong style={{ overflowWrap: "anywhere" }}>{entry.label}</strong>
            <p style={muted}>{entry.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
