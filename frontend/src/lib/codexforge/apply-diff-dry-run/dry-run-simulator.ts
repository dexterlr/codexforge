import {
  buildApplyDiffDryRunStableKey,
  type ApplyDiffDryRunFileOperation,
  type ApplyDiffDryRunInput,
  type ApplyDiffDryRunPolicy,
  type ApplyDiffDryRunSimulation,
  type ApplyDiffDryRunStatus,
  type ApplyDiffFileOperationIntent,
} from "./apply-dry-run-types";
import { buildApplyDiffDryRunPolicy } from "./dry-run-policy";

function inferOperationIntent(input: ApplyDiffDryRunInput, filePath: string): ApplyDiffFileOperationIntent {
  const searchable = `${filePath} ${input.goal} ${input.pseudoDiffSummary.join(" ")}`.toLowerCase();
  if (searchable.includes("test") || searchable.includes(".spec.") || searchable.includes(".test.")) return "test";
  if (searchable.includes("doc") || searchable.endsWith(".md")) return "docs";
  if (searchable.includes("remove") || searchable.includes("delete")) return "remove";
  if (searchable.includes("rename")) return "rename";
  if (searchable.includes("refactor")) return "refactor";
  if (searchable.includes("guard") || searchable.includes("policy") || searchable.includes("safety")) return "guard";
  if (searchable.includes("add") || searchable.includes("create")) return "add";
  if (searchable.includes("update") || searchable.includes("change") || searchable.includes("fix")) return "update";
  return "unknown";
}

function selectDryRunStatus(input: ApplyDiffDryRunInput, policy: ApplyDiffDryRunPolicy): ApplyDiffDryRunStatus {
  if (!input.applyGateId.trim() || !input.approvalPacketId.trim() || input.targetFiles.length < 1) return "invalid";
  if (!input.approvalPacketExplicit || input.approvalPosture === "missing") return "needs-approval";
  if (input.currentFileVerificationState !== "verified-current" || !input.currentFileVerificationAcknowledged) {
    return "needs-current-file-verification";
  }
  if (input.rollbackPlan.length < 1 || !input.rollbackPlanAcknowledged) return "needs-rollback-plan";
  if (input.verificationPlan.length < 1 || !input.verificationPlanAcknowledged) return "needs-verification-plan";
  if (input.policyPosture === "blocked" || input.policyPosture === "unchecked" || policy.blockedReasons.length > 0) {
    return "blocked";
  }
  if (input.realPatchAvailabilityState === "missing" || input.patchSourceState === "pseudo-diff-only") return "pseudo-only";
  if (input.realPatchAvailabilityState === "available-unreviewed") return "ready-for-real-patch-review";
  return "ready-for-real-patch-review";
}

export function simulateApplyDiffFileOperation(
  input: ApplyDiffDryRunInput,
  filePath: string,
  operationIntent: ApplyDiffFileOperationIntent = inferOperationIntent(input, filePath)
): ApplyDiffDryRunFileOperation {
  const pseudoOnly = input.realPatchAvailabilityState !== "reviewed";
  const staleFiles = input.currentFileVerificationState !== "verified-current";

  return {
    id: `apply-diff-dry-run-operation:${buildApplyDiffDryRunStableKey(input.id, filePath, operationIntent)}`,
    dryRunId: input.id,
    filePath,
    operationIntent,
    wouldTargetFile: true,
    wouldInspectPatchShape: true,
    wouldCheckApproval: true,
    wouldCheckRollbackPlan: true,
    wouldCheckVerificationPlan: true,
    wouldApplyPatch: false,
    refusedForRealApply: pseudoOnly || staleFiles,
    refusalReason: pseudoOnly
      ? "Pseudo-only or unreviewed patch is refused for real apply."
      : staleFiles
        ? "Stale or unchecked file verification is refused for real apply."
        : null,
    summary: [
      `Would inspect ${filePath} as ${operationIntent} intent.`,
      "Would check approval, rollback plan, verification plan, and patch shape.",
      "Would not apply a patch, write files, or run commands.",
    ],
  };
}

export function simulateApplyDiffDryRun(
  input: ApplyDiffDryRunInput,
  policy: ApplyDiffDryRunPolicy = buildApplyDiffDryRunPolicy(input)
): ApplyDiffDryRunSimulation {
  const operations = input.targetFiles.map((filePath) => simulateApplyDiffFileOperation(input, filePath));
  const status = selectDryRunStatus(input, policy);
  const wouldRefusePseudoOnlyPatch =
    input.patchSourceState === "pseudo-diff-only" || input.realPatchAvailabilityState !== "reviewed";
  const wouldRefuseStaleOrUncheckedFiles = input.currentFileVerificationState !== "verified-current";
  const blockedReasons = [...policy.blockedReasons];
  const warnings = [...policy.warnings];

  if (wouldRefusePseudoOnlyPatch) warnings.push("Simulator refuses pseudo-only patch for real apply.");
  if (wouldRefuseStaleOrUncheckedFiles) blockedReasons.push("Simulator refuses stale/unchecked files.");

  return {
    id: `apply-diff-dry-run-simulation:${buildApplyDiffDryRunStableKey(input.id, status)}`,
    dryRunId: input.id,
    status,
    wouldTargetFiles: [...input.targetFiles],
    wouldInspectPatchShape: true,
    wouldCheckApproval: true,
    wouldCheckRollbackPlan: true,
    wouldCheckVerificationPlan: true,
    wouldRefusePseudoOnlyPatch,
    wouldRefuseStaleOrUncheckedFiles,
    wouldCallApplyDiff: false,
    wouldWriteFiles: false,
    operations,
    blockedReasons,
    warnings,
    summary: summarizeApplyDiffDryRunSimulation(status, operations.length, wouldRefusePseudoOnlyPatch),
  };
}

export function summarizeApplyDiffDryRunSimulation(
  simulationOrStatus: ApplyDiffDryRunSimulation | ApplyDiffDryRunStatus,
  operationCount?: number,
  pseudoOnlyRefused?: boolean
): string[] {
  const status = typeof simulationOrStatus === "string" ? simulationOrStatus : simulationOrStatus.status;
  const count = operationCount ?? (typeof simulationOrStatus === "string" ? 0 : simulationOrStatus.operations.length);
  const pseudoRefused =
    pseudoOnlyRefused ?? (typeof simulationOrStatus === "string" ? false : simulationOrStatus.wouldRefusePseudoOnlyPatch);

  return [
    `Dry-run status is ${status}.`,
    `${count} simulated file operation(s) prepared.`,
    pseudoRefused
      ? "Simulator refuses pseudo-only patch for real apply."
      : "Simulator reports ready-for-real-patch-review when supplied guard data is complete.",
    "Simulation only: no apply-diff execution, no file writes, and no commands.",
  ];
}
