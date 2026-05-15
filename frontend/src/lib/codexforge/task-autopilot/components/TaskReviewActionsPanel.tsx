import type { CSSProperties } from "react";
import type { TaskReviewActionType, TaskReviewItem } from "@/lib/codexforge/task-autopilot";

const ACTIONS: TaskReviewActionType[] = ["accept", "preview-plan", "copy-handoff", "defer", "reject", "block"];

export function TaskReviewActionsPanel({
  item,
  onAction,
}: {
  item: TaskReviewItem | null;
  onAction: (type: TaskReviewActionType) => void;
}) {
  return (
    <section style={panel} data-codexforge-task-review-actions-panel>
      <div style={eyebrow}>Review actions</div>
      <strong style={title}>{item ? item.reviewState : "No item selected"}</strong>
      <div style={buttons}>
        {ACTIONS.map((action) => (
          <button key={action} type="button" disabled={!item} onClick={() => onAction(action)} style={button}>
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const buttons: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const button: CSSProperties = { color: "#f8fafc", border: "1px solid rgba(45,212,191,0.26)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 850, cursor: "pointer" };
