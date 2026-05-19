import { muted, panel, title } from "./ContinuityHandoffStyles";

export function ContinuityHandoffEmptyState() {
  return (
    <section style={panel} data-codexforge-handoff-empty-state="ContinuityHandoffEmptyState renders">
      <h2 style={title}>No handoff state supplied</h2>
      <p style={muted}>The default deterministic continuity handoff packet can still be reviewed and copied safely.</p>
    </section>
  );
}
