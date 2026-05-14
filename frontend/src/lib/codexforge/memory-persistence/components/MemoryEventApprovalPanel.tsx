"use client";

import type { CSSProperties } from "react";
import type { MemoryEventPersistencePolicy, MemoryEventPersistenceRequest } from "../memory-persistence-types";

type Props = {
  policy: MemoryEventPersistencePolicy;
  request: MemoryEventPersistenceRequest;
  approvalNote: string;
  onApprovalNoteChange: (value: string) => void;
  contradictionAcknowledged: boolean;
  onContradictionAcknowledgedChange: (value: boolean) => void;
};

export function MemoryEventApprovalPanel({
  policy,
  request,
  approvalNote,
  onApprovalNoteChange,
  contradictionAcknowledged,
  onContradictionAcknowledgedChange,
}: Props) {
  const highRisk = request.contradictionRisk >= 0.75;

  return (
    <section style={panel} data-codexforge-memory-event-approval-panel="MemoryEventApprovalPanel renders explicit approval required reviewed candidates only source traceability required">
      <span style={eyebrow}>Approval checklist</span>
      <h2 style={title}>Explicit approval required</h2>
      <div style={checklist}>
        <ChecklistItem label="Candidate reviewed" value={request.reviewState === "approved-for-promotion"} />
        <ChecklistItem label="Source traceability" value={request.sourceRefs.length > 0} />
        <ChecklistItem label="Graph mutation automatic" value={policy.automaticGraphMutationAllowed === false} inverted />
        <ChecklistItem label="Approval note present" value={approvalNote.trim().length > 0} />
      </div>
      <label style={fieldLabel}>
        Approval note
        <textarea
          value={approvalNote}
          onChange={(event) => onApprovalNoteChange(event.target.value)}
          placeholder="Record why this reviewed memory event is approved for local persistence."
          style={textarea}
        />
      </label>
      {highRisk ? (
        <label style={checkboxRow}>
          <input
            type="checkbox"
            checked={contradictionAcknowledged}
            onChange={(event) => onContradictionAcknowledgedChange(event.target.checked)}
          />
          <span>High contradiction risk acknowledged</span>
        </label>
      ) : null}
    </section>
  );
}

function ChecklistItem({ label, value, inverted = false }: { label: string; value: boolean; inverted?: boolean }) {
  const ok = inverted ? !value : value;
  return (
    <div style={row}>
      <span style={ok ? okDot : blockedDot} />
      <span style={safeText}>{label}</span>
      <strong style={ok ? okText : blockedText}>{ok ? "pass" : "blocked"}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 19, ...safeText };
const checklist: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "grid", gridTemplateColumns: "10px minmax(0, 1fr) auto", gap: 8, alignItems: "center", fontSize: 13, color: "#cbd5e1", minWidth: 0 };
const okDot: CSSProperties = { width: 8, height: 8, borderRadius: 99, background: "#34d399" };
const blockedDot: CSSProperties = { width: 8, height: 8, borderRadius: 99, background: "#f87171" };
const okText: CSSProperties = { color: "#86efac", fontSize: 11, textTransform: "uppercase" };
const blockedText: CSSProperties = { color: "#fca5a5", fontSize: 11, textTransform: "uppercase" };
const fieldLabel: CSSProperties = { display: "grid", gap: 6, color: "#cbd5e1", fontSize: 12, fontWeight: 850, textTransform: "uppercase", minWidth: 0 };
const textarea: CSSProperties = { minHeight: 82, resize: "vertical", border: "1px solid rgba(125,211,252,0.22)", background: "rgba(2,6,23,0.5)", color: "inherit", borderRadius: 8, padding: 10, fontSize: 13, lineHeight: 1.45, textTransform: "none", fontFamily: "inherit" };
const checkboxRow: CSSProperties = { display: "flex", gap: 8, alignItems: "center", color: "#fed7aa", fontSize: 13, ...safeText };
