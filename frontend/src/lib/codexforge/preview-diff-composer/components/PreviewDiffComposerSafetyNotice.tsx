"use client";

import type { CSSProperties } from "react";

export function PreviewDiffComposerSafetyNotice() {
  return (
    <div
      style={notice}
      data-codexforge-preview-diff-composer-safety="PreviewDiffComposerSafetyNotice renders preview-only not an applyable patch current file content is authority evidence is context, not proof no file writes without approval Safe Patch Preview preserve latest-message authority"
    >
      <strong>preview-only</strong>
      <span>
        This is not an applyable patch. Current file content is authority, evidence is context, not proof, no file
        writes without approval, and any real patch must go through Safe Patch Preview while preserving latest-message
        authority.
      </span>
    </div>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.26)",
  background: "rgba(251,191,36,0.1)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 4,
  color: "#fde68a",
  fontSize: 12,
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};
