"use client";

import type { CSSProperties } from "react";
import type { MemoryReviewActionType, MemoryReviewItem } from "../memory-review-types";

type MemoryReviewActionsPanelProps = {
  item: MemoryReviewItem;
  onAction: (type: MemoryReviewActionType) => void;
};

export function MemoryReviewActionsPanel({ item, onAction }: MemoryReviewActionsPanelProps) {
  const blocked = item.reviewState === "blocked";

  return (
    <section style={panel} data-codexforge-memory-review-actions-panel="MemoryReviewActionsPanel renders local UI state only no direct graph mutation">
      <span style={eyebrow}>Review actions</span>
      <h2 style={title}>Candidate decision</h2>
      <p style={copy}>Buttons update local review state only. They do not mutate source files, execute commands, append runtime events, or directly mutate graph memory.</p>
      <div style={buttonGrid}>
        <button type="button" disabled={blocked} onClick={() => onAction("approve")} style={blocked ? disabledButton : primaryButton}>Approve candidate</button>
        <button type="button" onClick={() => onAction("reject")} style={dangerButton}>Reject candidate</button>
        <button type="button" onClick={() => onAction("defer")} style={secondaryButton}>Defer candidate</button>
        <button type="button" disabled={blocked} onClick={() => onAction("preview-promotion-event")} style={blocked ? disabledButton : secondaryButton}>Preview promotion event</button>
      </div>
      <span style={status}>Current state: {item.reviewState} / next action: {item.nextAction}</span>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(15,23,42,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safeText };
const buttonGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8, minWidth: 0 };
const buttonBase: CSSProperties = { borderRadius: 8, padding: "10px 12px", color: "inherit", fontSize: 13, fontWeight: 850, cursor: "pointer", minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const primaryButton: CSSProperties = { ...buttonBase, border: "1px solid rgba(45,212,191,0.35)", background: "rgba(20,184,166,0.18)" };
const secondaryButton: CSSProperties = { ...buttonBase, border: "1px solid rgba(125,211,252,0.24)", background: "rgba(14,165,233,0.1)" };
const dangerButton: CSSProperties = { ...buttonBase, border: "1px solid rgba(248,113,113,0.34)", background: "rgba(127,29,29,0.2)" };
const disabledButton: CSSProperties = { ...buttonBase, border: "1px solid rgba(148,163,184,0.14)", background: "rgba(148,163,184,0.08)", color: "#64748b", cursor: "not-allowed" };
const status: CSSProperties = { color: "#94a3b8", fontSize: 12, ...safeText };
