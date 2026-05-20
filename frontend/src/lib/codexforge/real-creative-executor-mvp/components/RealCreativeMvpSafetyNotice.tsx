"use client";

import { MvpPanel, body } from "./shared";

export function RealCreativeMvpSafetyNotice() {
  return (
    <MvpPanel title="Safety Notice" marker="RealCreativeMvpSafetyNotice renders design-only no real execution no render execution no command execution no file writes preserve latest-message authority">
      <p style={body}>
        Phase 72 is design-only. It does not execute creative jobs, launch local apps, call endpoints,
        run commands, write artifact files, mutate project files, or persist graph changes. Execution allowed false.
      </p>
    </MvpPanel>
  );
}
