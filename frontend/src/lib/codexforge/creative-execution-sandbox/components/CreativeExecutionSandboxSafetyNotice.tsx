"use client";

import { SandboxPanel, pill, safeText, titleStyle } from "./shared";

export function CreativeExecutionSandboxSafetyNotice() {
  return (
    <SandboxPanel marker="CreativeExecutionSandboxSafetyNotice renders">
      <h2 style={titleStyle}>Safety Notice</h2>
      <span style={pill}>simulation-only</span>
      <p style={{ margin: 0, color: "#cbd5e1", ...safeText }}>
        Creative Execution Sandbox is simulation-only and no real execution occurs. It does not launch Blender,
        ComfyUI, Unreal, ffmpeg, renderers, commands, local HTTP probes, provider calls, or file writes.
      </p>
      <p style={{ margin: 0, color: "#99f6e4", ...safeText }}>
        Preserve latest-message authority and treat every artifact, log, and output as fake/supplied sandbox evidence.
      </p>
    </SandboxPanel>
  );
}
