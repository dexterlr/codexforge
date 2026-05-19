import type { ContinuityHandoffRollbackOption, ContinuityHandoffRollbackPosture } from "./continuity-handoff-types";
import { buildContinuityHandoffStableKey } from "./continuity-handoff-types";

export function buildContinuityHandoffRollbackOption(input: {
  label: string;
  detail: string;
  commandHint: string;
  readiness?: ContinuityHandoffRollbackOption["readiness"];
  approvalRequired?: boolean;
  preservesSmokeOutput?: boolean;
}): ContinuityHandoffRollbackOption {
  return {
    id: buildContinuityHandoffStableKey("handoff-rollback-option", input.label),
    label: input.label,
    readiness: input.readiness ?? "review",
    detail: input.detail,
    commandHint: input.commandHint,
    approvalRequired: input.approvalRequired ?? true,
    preservesSmokeOutput: input.preservesSmokeOutput ?? true,
  };
}

export function buildContinuityHandoffRollbackPosture(): ContinuityHandoffRollbackPosture {
  const options = [
    buildContinuityHandoffRollbackOption({ label: "No rollback; inspect first", detail: "Default posture is to inspect state, smoke output, and risk before rollback.", commandHint: "git status --short" }),
    buildContinuityHandoffRollbackOption({ label: "git restore target files before commit", detail: "Safer before commit when the working tree contains only reviewed target files.", commandHint: "git restore -- <target-files>" }),
    buildContinuityHandoffRollbackOption({ label: "git revert last commit after commit", detail: "Use after a committed checkpoint when reverting a clean commit is safer.", commandHint: "git revert HEAD" }),
    buildContinuityHandoffRollbackOption({ label: "Reject pending runtime event", detail: "Runtime events should be rejected through review posture, not appended from handoff.", commandHint: "review Runtime Event Journal" }),
    buildContinuityHandoffRollbackOption({ label: "Reject memory promotion", detail: "Memory candidates stay in review if duplicate, contradictory, or stale.", commandHint: "review Memory Inbox" }),
    buildContinuityHandoffRollbackOption({ label: "Use snapshot restore gate preview only", detail: "Snapshot restore remains blocked unless a future guarded executor exists.", commandHint: "open /snapshot-restore" }),
    buildContinuityHandoffRollbackOption({ label: "Stop and stabilize", detail: "When build or smoke fails, stop feature work and stabilize first.", commandHint: "open /stabilization" }),
  ];
  return {
    id: "continuity-handoff-rollback-posture",
    rollbackReadiness: "review",
    workingTreeMustBeClean: true,
    lastCommitCanBeReverted: true,
    gitRestoreSaferBeforeCommit: true,
    snapshotRestoreBlocked: true,
    brainGraphRestoreBlocked: true,
    applyDiffRollbackApprovalGated: true,
    preserveSmokeOutput: true,
    stopAndStabilizeAvailable: true,
    options,
    summary: summarizeContinuityHandoffRollbackPosture(options),
  };
}

export function summarizeContinuityHandoffRollbackPosture(optionsOrPosture: readonly ContinuityHandoffRollbackOption[] | ContinuityHandoffRollbackPosture): string[] {
  const options = "options" in optionsOrPosture ? optionsOrPosture.options : optionsOrPosture;
  return [
    `${options.length} rollback options are visible and review-gated.`,
    "Rollback posture mentions git restore before commit and git revert after commit.",
    "Snapshot restore, Brain graph restore, and apply-diff rollback remain blocked or approval-gated; preserve smoke output.",
  ];
}
