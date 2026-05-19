import type { ContinuityHandoffMemoryPosture } from "../index";
import { grid, item, muted, panel, pill, title } from "./ContinuityHandoffStyles";

export function HandoffMemoryPosturePanel({ posture }: { posture: ContinuityHandoffMemoryPosture }) {
  return (
    <section style={panel} data-codexforge-handoff-memory-posture-panel="HandoffMemoryPosturePanel renders memory posture says no auto-promotion">
      <h2 style={title}>Memory Posture</h2>
      <p style={muted}>{posture.noAutoPromotionGuarantee}. Pending memory candidates: {posture.pendingMemoryCandidates}. Approved memory events: {posture.approvedMemoryEvents}.</p>
      <div style={grid}>
        {posture.items.map((entry) => (
          <div key={entry.id} style={item}>
            <span style={pill}>{entry.posture}</span>
            <strong style={{ overflowWrap: "anywhere" }}>{entry.label}</strong>
            <p style={muted}>{entry.detail}</p>
            <p style={muted}>{entry.reviewBoundary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
