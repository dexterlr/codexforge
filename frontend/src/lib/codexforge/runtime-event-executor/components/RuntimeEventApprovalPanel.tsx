"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventApproval } from "../runtime-event-executor-types";

export function RuntimeEventApprovalPanel({
  approval,
  approved,
  approvalNote,
  onApprovedChange,
  onApprovalNoteChange,
}: {
  approval: RuntimeEventApproval;
  approved: boolean;
  approvalNote: string;
  onApprovedChange: (value: boolean) => void;
  onApprovalNoteChange: (value: string) => void;
}) {
  return (
    <section style={panel} data-codexforge-runtime-event-approval-panel="RuntimeEventApprovalPanel renders explicit approval required">
      <strong>Runtime Event Approval</strong>
      <label style={label}>
        <input type="checkbox" checked={approved} onChange={(event) => onApprovedChange(event.target.checked)} />
        Explicit approval required
      </label>
      <textarea value={approvalNote} onChange={(event) => onApprovalNoteChange(event.target.value)} placeholder="Approval note" style={textarea} />
      <p style={text}>{approval.summary.join(" ")}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const label: CSSProperties = { display: "flex", alignItems: "center", gap: 8, color: "#e2e8f0", fontSize: 12, fontWeight: 850, overflowWrap: "anywhere" };
const textarea: CSSProperties = { width: "100%", minHeight: 60, border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.54)", color: "#e2e8f0", borderRadius: 8, padding: 10, resize: "vertical" };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
