import type { CSSProperties } from "react";

export function RealPatchPreviewEmptyState({
  reason = "Select and read a file before preparing a patch preview.",
}: {
  reason?: string;
}) {
  return (
    <section
      style={panel}
      data-codexforge-real-patch-preview-empty-state="RealPatchPreviewEmptyState renders Select and read a file before preparing a patch preview."
    >
      <strong>Patch preview needs current file content</strong>
      <span>{reason}</span>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.24)",
  background: "rgba(120,53,15,0.18)",
  borderRadius: 8,
  color: "#fef3c7",
  display: "grid",
  fontSize: 12,
  gap: 5,
  lineHeight: 1.45,
  minWidth: 0,
  overflowWrap: "anywhere",
  padding: 12,
};
