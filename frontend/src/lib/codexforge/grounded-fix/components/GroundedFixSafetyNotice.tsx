"use client";

import type { CSSProperties } from "react";

export function GroundedFixSafetyNotice() {
  return (
    <div
      data-codexforge-grounded-fix-safety="evidence is context, not proof verify current files preview diff only Safe Patch Preview no file writes without approval preserve latest-message authority"
      style={notice}
    >
      Evidence is context, not proof. Verify current files, inspect first, produce preview diff only, use Safe Patch Preview,
      no file writes without approval, no command execution without approval, and preserve latest-message authority.
    </div>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.28)",
  background: "rgba(251,191,36,0.09)",
  borderRadius: 8,
  color: "#fef3c7",
  fontSize: 12,
  fontWeight: 750,
  lineHeight: 1.5,
  padding: 10,
  overflowWrap: "anywhere",
};
