import type { CSSProperties } from "react";

export function RealPatchPreviewSafetyNotice() {
  return (
    <section
      style={panel}
      data-codexforge-real-patch-preview-safety-notice="RealPatchPreviewSafetyNotice renders preview-only no file writes no apply no command execution Patch Application Gate preserve latest-message authority"
    >
      <strong style={title}>Real Patch Preview v1 safety boundary</strong>
      <p style={copy}>
        This surface is preview-only: no file writes, no apply, no command execution, no Brain graph mutation, and no
        auto-persistence. Use Patch Application Gate before any future apply and preserve latest-message authority.
      </p>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.22)",
  background: "rgba(8,47,73,0.28)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 6,
  minWidth: 0,
};

const title: CSSProperties = {
  color: "#ccfbf1",
  fontSize: 13,
  overflowWrap: "anywhere",
};

const copy: CSSProperties = {
  color: "#dbeafe",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};
