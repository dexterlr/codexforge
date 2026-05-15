import type { ApplyApprovalPacket, ApplyGateInput, ApplyRollbackGate } from "./patch-application-gate-types";

export function buildApplyRollbackGate(input?: ApplyGateInput | null, approvalPacket?: ApplyApprovalPacket | null): ApplyRollbackGate {
  const notes = [
    "Review git diff before apply.",
    "Use git restore path before commit when backing out local file changes.",
    "Use git revert after commit when backing out committed changes.",
    "Create a checkpoint/tag reminder before high-risk patches.",
    "Small patch rule: keep apply requests narrow and reviewable.",
    ...(input?.rollbackNotes ?? []),
  ];

  return {
    id: "apply-rollback-gate",
    notes,
    acknowledgementRequired: true,
    acknowledged: approvalPacket?.rollbackAcknowledged === true,
    summary: summarizeApplyRollbackGate(notes, approvalPacket?.rollbackAcknowledged === true),
  };
}

export function summarizeApplyRollbackGate(gateOrNotes: ApplyRollbackGate | readonly string[], acknowledged?: boolean): string[] {
  const notes = "notes" in gateOrNotes ? gateOrNotes.notes : gateOrNotes;
  const isAcknowledged = "notes" in gateOrNotes ? gateOrNotes.acknowledged : acknowledged === true;
  return [
    `${notes.length} rollback note(s) are visible.`,
    isAcknowledged ? "Rollback acknowledgement present." : "Rollback acknowledgement required.",
    "Rollback gate mentions git restore and git revert.",
  ];
}
