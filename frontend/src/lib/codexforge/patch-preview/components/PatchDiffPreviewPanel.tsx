"use client";

import type { CSSProperties } from "react";

export function PatchDiffPreviewPanel({ diffPreview }: { diffPreview: string }) {
  return (
    <section data-codexforge-patch-diff-preview-panel style={panel}>
      <div style={eyebrow}>Diff Preview</div>
      <pre style={diffBox}>{diffPreview}</pre>
    </section>
  );
}

const textGuard: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  ...textGuard,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.66,
};

const diffBox: CSSProperties = {
  margin: 0,
  maxHeight: 280,
  overflow: "auto",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.32)",
  borderRadius: 8,
  padding: 11,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: 11,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  ...textGuard,
};
