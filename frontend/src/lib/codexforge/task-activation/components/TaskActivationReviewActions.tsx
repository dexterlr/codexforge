import type { CSSProperties } from "react";
import type { TaskActivationStateName } from "@/lib/codexforge/task-activation";

export function TaskActivationReviewActions({
  status,
  approvalNote,
  canPreview,
  canHandoff,
  canMarkFutureActive,
  onApprovalNoteChange,
  onBuildRequest,
  onApprove,
  onReject,
  onBlock,
  onPreviewPlan,
  onPrepareHandoff,
  onMarkFutureActive,
  onReset,
}: {
  status: TaskActivationStateName;
  approvalNote: string;
  canPreview: boolean;
  canHandoff: boolean;
  canMarkFutureActive: boolean;
  onApprovalNoteChange: (value: string) => void;
  onBuildRequest: () => void;
  onApprove: () => void;
  onReject: () => void;
  onBlock: () => void;
  onPreviewPlan: () => void;
  onPrepareHandoff: () => void;
  onMarkFutureActive: () => void;
  onReset: () => void;
}) {
  return (
    <section style={panel} data-codexforge-task-activation-review-actions>
      <div style={eyebrow}>Review actions</div>
      <strong style={title}>{status}</strong>
      <label style={label}>
        Approval note
        <textarea
          value={approvalNote}
          onChange={(event) => onApprovalNoteChange(event.target.value)}
          style={textarea}
          rows={3}
          placeholder="Visible local review note"
        />
      </label>
      <div style={buttons}>
        <button type="button" onClick={onBuildRequest} style={button}>
          Build request
        </button>
        <button type="button" onClick={onApprove} style={primaryButton}>
          Approve
        </button>
        <button type="button" onClick={onPreviewPlan} disabled={!canPreview} style={button}>
          Preview plan
        </button>
        <button type="button" onClick={onPrepareHandoff} disabled={!canHandoff} style={button}>
          Prepare handoff
        </button>
        <button type="button" onClick={onMarkFutureActive} disabled={!canMarkFutureActive} style={button}>
          Mark future active
        </button>
        <button type="button" onClick={onReject} style={secondaryButton}>
          Reject
        </button>
        <button type="button" onClick={onBlock} style={secondaryButton}>
          Block
        </button>
        <button type="button" onClick={onReset} style={secondaryButton}>
          Reset
        </button>
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const label: CSSProperties = { display: "grid", gap: 6, color: "#cbd5e1", fontSize: 12, fontWeight: 800 };
const textarea: CSSProperties = { width: "100%", minHeight: 76, resize: "vertical", border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.58)", color: "#f8fafc", borderRadius: 8, padding: 10, font: "inherit", fontSize: 12, lineHeight: 1.45 };
const buttons: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const button: CSSProperties = { color: "#f8fafc", border: "1px solid rgba(45,212,191,0.26)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 850, cursor: "pointer" };
const primaryButton: CSSProperties = { ...button, color: "#021014", background: "#5eead4" };
const secondaryButton: CSSProperties = { ...button, border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.58)" };
