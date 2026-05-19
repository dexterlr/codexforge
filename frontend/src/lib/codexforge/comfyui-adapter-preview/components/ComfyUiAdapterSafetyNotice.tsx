import type { CSSProperties } from "react";

export function ComfyUiAdapterSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-comfyui-adapter-safety-notice="ComfyUiAdapterSafetyNotice renders preview-only approval required no ComfyUI execution no endpoint call no command execution no file writes preserve latest-message authority"
    >
      <strong>Preview-only ComfyUI adapter.</strong>
      <span>
        Workflow planning is copy/review only. No ComfyUI execution, endpoint call, command execution, or file write
        occurs from this UI; approval is required for any future executor boundary.
      </span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  color: "#ccfbf1",
  display: "grid",
  gap: 6,
  fontSize: 13,
  lineHeight: 1.45,
  minWidth: 0,
  padding: 12,
  overflowWrap: "anywhere",
};

