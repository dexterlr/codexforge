"use client";

import type { CSSProperties } from "react";

export function BrainRecallSafetyNotice() {
  return (
    <section
      data-codexforge-brain-recall-safety="deterministic local recall no graph mutation inspect before editing"
      style={panel}
    >
      <strong>Deterministic local recall</strong>
      <p style={body}>
        Search approved Brain memory with pure local matching. Recall performs no graph mutation,
        no file mutation, no command execution, no broker execution, and no network calls.
        Inspect before editing and prefer current file content over recalled memory.
      </p>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(34,197,94,0.25)",
  background: "rgba(34,197,94,0.08)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 6,
};
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.82, overflowWrap: "anywhere" };
