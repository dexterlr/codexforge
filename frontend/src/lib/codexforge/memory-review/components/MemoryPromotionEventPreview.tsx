"use client";

import type { CSSProperties } from "react";
import type { MemoryPromotionEventPreview as MemoryPromotionEventPreviewModel } from "../memory-review-types";

type MemoryPromotionEventPreviewProps = {
  preview: MemoryPromotionEventPreviewModel;
  copied: boolean;
  onCopy: () => void;
};

export function MemoryPromotionEventPreview({ preview, copied, onCopy }: MemoryPromotionEventPreviewProps) {
  const event = preview.event;

  return (
    <section style={panel} data-codexforge-memory-promotion-event-preview="MemoryPromotionEventPreview renders promotion event preview memory.promoted">
      <div style={header}>
        <div style={titleBlock}>
          <span style={eyebrow}>Promotion event preview</span>
          <h2 style={title}>memory.promoted</h2>
        </div>
        <button type="button" disabled={!event} onClick={onCopy} style={event ? copyButton : disabledButton}>
          {copied ? "Copied" : "Copy promotion event"}
        </button>
      </div>
      <p style={copy}>{preview.safetyNote}</p>
      {event ? (
        <div style={previewGrid}>
          <PreviewFact label="Event type" value={event.type} />
          <PreviewFact label="Candidate" value={event.payload.candidateId} />
          <PreviewFact label="Confidence" value={`${Math.round(event.payload.confidence * 100)}%`} />
          <PreviewFact label="Review state" value={event.payload.reviewState} />
          <PreviewFact label="Safety note" value={event.payload.safetyNote} wide />
        </div>
      ) : (
        <div style={blockedPreview}>Preview is waiting for explicit approval and passing policy checks.</div>
      )}
    </section>
  );
}

function PreviewFact({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div style={wide ? wideFact : fact}>
      <span style={factLabel}>{label}</span>
      <strong style={factValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(56,189,248,0.2)", background: "linear-gradient(145deg, rgba(14,165,233,0.14), rgba(15,23,42,0.72))", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const titleBlock: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safeText };
const copyButton: CSSProperties = { border: "1px solid rgba(45,212,191,0.35)", background: "rgba(20,184,166,0.16)", color: "inherit", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 850, cursor: "pointer", ...safeText };
const disabledButton: CSSProperties = { ...copyButton, border: "1px solid rgba(148,163,184,0.14)", background: "rgba(148,163,184,0.08)", color: "#64748b", cursor: "not-allowed" };
const previewGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))", gap: 8, minWidth: 0 };
const fact: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const wideFact: CSSProperties = { ...fact, gridColumn: "1 / -1" };
const factLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, textTransform: "uppercase", fontWeight: 850, ...safeText };
const factValue: CSSProperties = { fontSize: 13, lineHeight: 1.45, ...safeText };
const blockedPreview: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(251,191,36,0.08)", borderRadius: 8, padding: 12, color: "#fde68a", fontSize: 13, ...safeText };
