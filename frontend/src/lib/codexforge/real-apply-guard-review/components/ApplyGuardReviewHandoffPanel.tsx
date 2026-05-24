"use client";

import type { CSSProperties } from "react";
import type { ApplyGuardReviewHandoff } from "../real-apply-guard-review-types";

type Props = {
  handoff: ApplyGuardReviewHandoff;
  onCopyGuardReport: () => void;
  onCopyRequiredFixes: () => void;
  onCopyCandidateBrief: () => void;
};

export function ApplyGuardReviewHandoffPanel({ handoff, onCopyGuardReport, onCopyRequiredFixes, onCopyCandidateBrief }: Props) {
  return (
    <section style={panel} data-codexforge-apply-guard-review-handoff-panel="ApplyGuardReviewHandoffPanel renders guarded apply candidate brief Copy guard review copy required fixes copy guarded apply candidate brief copyable only">
      <h2 style={heading}>Handoff</h2>
      <div style={actions}>
        <button type="button" style={primaryButton} onClick={onCopyGuardReport}>Copy guard review</button>
        <button type="button" style={button} onClick={onCopyRequiredFixes}>Copy required fixes</button>
        <button type="button" style={button} onClick={onCopyCandidateBrief}>Copy guarded apply candidate brief</button>
      </div>
      <details style={details}>
        <summary style={summary}>Advanced handoff sections</summary>
        <ul style={list}>{handoff.sections.map((section) => <li key={`handoff-${section.id}`} style={item}>{section.title}</li>)}</ul>
      </details>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const actions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const primaryButton: CSSProperties = { background: "#5eead4", border: 0, borderRadius: 8, color: "#042f2e", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px" };
const button: CSSProperties = { background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px" };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, margin: "8px 0 0", paddingLeft: 18 };
const item: CSSProperties = { lineHeight: 1.35 };
