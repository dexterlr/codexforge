import { muted, panel, title } from "./BrainContinuityStyles";

export function BrainContinuitySafetyNotice() {
  return (
    <section style={panel} data-codexforge-brain-continuity-safety-notice="BrainContinuitySafetyNotice renders read-only no graph mutation no snapshot restore no appendEvent no saveBrainGraph from UI preserve latest-message authority no auto-persistence">
      <h2 style={title}>Safety Boundary</h2>
      <p style={muted}>
        This dashboard is read-only: no graph mutation, no snapshot restore, no appendEvent, no saveBrainGraph from UI,
        no command execution, no auto-persistence, no auto-promotion, and preserve latest-message authority.
      </p>
    </section>
  );
}
