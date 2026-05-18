"use client";

import type { CSSProperties } from "react";
import type { MemoryInboxPromotionPreview } from "../operator-memory-inbox-types";

export function MemoryInboxPromotionPreviewPanel({ preview, onCopyPreview }: { preview: MemoryInboxPromotionPreview; onCopyPreview?: () => void }) {
  return (
    <section style={panel} data-codexforge-memory-inbox-promotion-preview-panel="MemoryInboxPromotionPreviewPanel renders promotion preview references memory.promoted future merge boundary copy promotion preview allowed">
      <strong>Promotion preview</strong>
      <p style={text}>{preview.proposedRuntimeEventType} / {preview.allowed ? "ready after review" : "blocked"}</p>
      <p style={text}>{preview.proposedMemoryItem.text}</p>
      <p style={text}>{preview.futureMergeBoundary}</p>
      <button type="button" onClick={onCopyPreview} style={button}>Copy promotion preview</button>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 9, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.11)", color: "#ccfbf1", borderRadius: 8, padding: "9px 11px", cursor: "pointer", fontWeight: 850 };
