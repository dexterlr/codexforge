import { muted, panel, title } from "./ContinuityHandoffStyles";

export function ContinuityHandoffSafetyNotice() {
  return (
    <section style={panel} data-codexforge-handoff-safety-notice="ContinuityHandoffSafetyNotice renders read-only no graph mutation no snapshot restore no appendEvent no saveBrainGraph from UI no command execution copy only preserve latest-message authority no direct apply-diff no direct write-file no direct run-command no broker-execution call except blocked-policy text">
      <h2 style={title}>Safety Notice</h2>
      <p style={muted}>
        Continuity Handoff is read-only and copy only: no graph mutation, no snapshot restore, no appendEvent, no saveBrainGraph from UI,
        no command execution, no file write buttons, no auto-promotion, no auto-persistence, and preserve latest-message authority.
      </p>
    </section>
  );
}
