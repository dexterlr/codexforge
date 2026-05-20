"use client";

import { panel, titleStyle } from "./shared";

export function GuardedCreativeExecutorSafetyNotice() {
  return (
    <section style={panel} data-guarded-creative-executor-safety-notice="GuardedCreativeExecutorSafetyNotice renders dry-run-first execution disabled no render execution no command execution no file writes future guarded executor preserve latest-message authority no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI">
      <h2 style={titleStyle}>Safety Notice</h2>
      <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.55 }}>
        Guarded Creative Executor is dry-run-first. It performs no render execution, no command execution,
        no file writes, no Blender execution, no ComfyUI execution, no Unreal execution, no ffmpeg execution,
        no package/build execution, and no artifact mutation. Future guarded executor handoff stays
        request-ready until explicit policy and operator approval exist.
      </p>
    </section>
  );
}
