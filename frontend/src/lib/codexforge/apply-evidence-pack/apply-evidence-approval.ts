import {
  buildApplyEvidencePackStableKey,
  type ApplyEvidenceApproval,
  type ApplyEvidenceInput,
  type ApplyEvidenceRisk,
  type ApplyEvidenceRollbackPlan,
  type ApplyEvidenceTestPlan,
} from "./apply-evidence-pack-types";

export function buildApplyEvidenceApproval(args: {
  input: ApplyEvidenceInput;
  risk: ApplyEvidenceRisk;
  testPlan: ApplyEvidenceTestPlan;
  rollbackPlan: ApplyEvidenceRollbackPlan;
}): ApplyEvidenceApproval {
  const missingItems = [
    args.input.operatorApprovalNote.length === 0 ? "Operator approval note required." : null,
    !args.input.futureGuardedApplyAcknowledged ? "Future guarded apply only acknowledgement required." : null,
    !args.input.noMutationAcknowledged ? "No mutation acknowledgement required." : null,
    args.testPlan.missingItems.length > 0 ? "Test plan required before approval." : null,
    args.rollbackPlan.missingItems.length > 0 ? "Rollback plan required before approval." : null,
    args.risk.blockers.length > 0 ? "Risk blockers must be cleared before approval." : null,
  ].filter((item): item is string => item !== null);
  const approvedForFutureGuardedApply = args.input.approvalState === "approved" && missingItems.length === 0;

  return {
    id: buildApplyEvidencePackStableKey("apply-evidence-approval", args.input.id),
    inputId: args.input.id,
    approvalState: args.input.approvalState,
    operatorApprovalNote: args.input.operatorApprovalNote,
    operatorApprovalNoteRequired: true,
    approvalPacketId: buildApplyEvidencePackStableKey("approval-packet", args.input.applyGateId, args.input.previewDiffPackageId),
    approvedForFutureGuardedApply,
    futureGuardedApplyOnly: true,
    missingItems,
    summary: [
      `Approval state ${args.input.approvalState}.`,
      approvedForFutureGuardedApply
        ? "Approved for future guarded apply consideration only; no apply is executed."
        : `${missingItems.length} approval item(s) missing or pending.`,
      "Operator approval note required.",
    ],
  };
}

export function summarizeApplyEvidenceApproval(approval: ApplyEvidenceApproval): string[] {
  return [
    ...approval.summary,
    "Even approved-for-future-guarded-apply does not execute apply.",
  ];
}
