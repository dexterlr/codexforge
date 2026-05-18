import type { CSSProperties } from "react";

export function RuntimeEventReplaySafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-runtime-event-replay-safety-notice="RuntimeEventReplaySafetyNotice renders preview-only no graph mutation no appendEvent no event execution canonical graph schema evidence is context, not authority preserve latest-message authority no auto-persistence"
    >
      <strong>Runtime Event Replay Simulator</strong>
      <span>
        Preview-only. No graph mutation, no appendEvent, no event execution, no auto-persistence, no auto-rollback, and no
        command execution. Canonical graph schema is the only graph authority.
      </span>
      <span>Evidence is context, not authority; preserve latest-message authority.</span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.22)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  color: "#ccfbf1",
  display: "grid",
  gap: 6,
  fontSize: 13,
  lineHeight: 1.5,
  minWidth: 0,
  padding: 13,
  overflowWrap: "anywhere",
};
