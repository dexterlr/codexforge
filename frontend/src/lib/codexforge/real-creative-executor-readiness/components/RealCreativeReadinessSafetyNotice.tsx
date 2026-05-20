"use client";

import { ReadinessPanel, body } from "./shared";

export function RealCreativeReadinessSafetyNotice() {
  return (
    <ReadinessPanel title="Safety Notice" marker="RealCreativeReadinessSafetyNotice renders audit-only no real execution no render execution no command execution no file writes no local HTTP calls no provider calls execution allowed false preserve latest-message authority">
      <p style={body}>
        This readiness audit is audit-only. It does not launch Blender, ComfyUI, Unreal, ffmpeg, or any renderer; it does
        not call local endpoints; it does not execute commands; it does not write artifact files; and execution allowed false
        remains enforced for Phase 70.
      </p>
      <p style={body}>
        Approval, dry-run evidence, bridge health, adapter allowlist, path boundaries, artifact capture, kill-switch posture,
        and latest-message authority are review inputs only.
      </p>
    </ReadinessPanel>
  );
}
