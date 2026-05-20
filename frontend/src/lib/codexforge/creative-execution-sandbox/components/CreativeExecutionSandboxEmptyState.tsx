"use client";

import { SandboxPanel, pill, safeText, titleStyle } from "./shared";

export function CreativeExecutionSandboxEmptyState({ reason = "Creative Execution Sandbox metadata is missing." }: { reason?: string }) {
  return (
    <SandboxPanel marker="CreativeExecutionSandboxEmptyState renders">
      <h2 style={titleStyle}>Sandbox Empty State</h2>
      <span style={pill}>review required</span>
      <p style={{ margin: 0, color: "#cbd5e1", ...safeText }}>{reason}</p>
      <p style={{ margin: 0, color: "#99f6e4", ...safeText }}>
        No fallback execution is available from this UI.
      </p>
    </SandboxPanel>
  );
}
