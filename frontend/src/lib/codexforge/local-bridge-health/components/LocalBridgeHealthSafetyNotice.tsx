"use client";

import { HealthPanel, titleStyle } from "./shared";

export function LocalBridgeHealthSafetyNotice() {
  return (
    <HealthPanel marker="LocalBridgeHealthSafetyNotice renders">
      <h2 style={titleStyle}>Safety Notice</h2>
      <p style={{ margin: 0, color: "#dbeafe", lineHeight: 1.55, overflowWrap: "break-word" }}>
        Local Bridge Health Check v1 is preview-only and dry-run only. It performs no actual probe, no command execution,
        no local HTTP calls by default, no file writes, no render execution, no Blender execution, no ComfyUI execution,
        no Unreal execution, no ffmpeg execution, and no package/build execution. Future guarded health probe requires
        approval, explicit allowlist, operator review, and preserve latest-message authority.
      </p>
    </HealthPanel>
  );
}
