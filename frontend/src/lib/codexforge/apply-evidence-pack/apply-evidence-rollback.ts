import {
  buildApplyEvidencePackStableKey,
  type ApplyEvidenceInput,
  type ApplyEvidenceRollbackPlan,
} from "./apply-evidence-pack-types";

export function buildApplyEvidenceRollbackPlan(input: ApplyEvidenceInput): ApplyEvidenceRollbackPlan {
  const notes = input.rollbackPlan.length > 0
    ? [...input.rollbackPlan]
    : [];
  const missingItems = notes.length === 0 ? ["Rollback plan required."] : [];

  return {
    id: buildApplyEvidencePackStableKey("apply-evidence-rollback-plan", input.id),
    inputId: input.id,
    required: true,
    notes,
    missingItems,
    summary: [
      `${notes.length} rollback note(s).`,
      missingItems.length === 0 ? "Rollback plan requirement is satisfied." : "Rollback plan required.",
      "Rollback plan is evidence for future review; no rollback command is run here.",
    ],
  };
}

export function summarizeApplyEvidenceRollbackPlan(plan: ApplyEvidenceRollbackPlan): string[] {
  return [
    ...plan.summary,
    "Rollback must be reviewed before future guarded apply.",
  ];
}
