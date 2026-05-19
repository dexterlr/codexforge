"use client";

import type { CSSProperties } from "react";

export function CreativeLocalBridgeSafetyNotice() {
  return (
    <section style={notice} data-codexforge-creative-local-bridge-safety-notice="CreativeLocalBridgeSafetyNotice renders preview-only no render execution no command execution no file writes future guarded executor preserve latest-message authority">
      <strong>Preview-only bridge boundary</strong>
      <span>No render execution.</span>
      <span>No command execution.</span>
      <span>No file writes.</span>
      <span>Future guarded executor required.</span>
      <span>Preserve latest-message authority.</span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(251,113,133,0.28)",
  background: "rgba(63,12,28,0.72)",
  borderRadius: 8,
  padding: "10px 12px",
  color: "#ffe4e6",
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
};
