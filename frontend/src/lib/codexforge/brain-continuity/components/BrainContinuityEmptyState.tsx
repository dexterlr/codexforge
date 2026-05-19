import { muted, panel, title } from "./BrainContinuityStyles";

export function BrainContinuityEmptyState() {
  return (
    <section style={panel} data-codexforge-brain-continuity-empty-state="BrainContinuityEmptyState renders">
      <h2 style={title}>No continuity evidence supplied</h2>
      <p style={muted}>Fallback continuity posture is deterministic and review-only. Supply graph or summaries to refine the dashboard.</p>
    </section>
  );
}
