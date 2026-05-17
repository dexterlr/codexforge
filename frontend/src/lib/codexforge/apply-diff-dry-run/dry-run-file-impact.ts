import {
  buildApplyDiffDryRunStableKey,
  type ApplyDiffDryRunFileOperation,
  type ApplyDiffDryRunInput,
  type ApplyDryRunFileImpact,
  type ApplyDryRunFileImpactItem,
} from "./apply-dry-run-types";
import { simulateApplyDiffFileOperation } from "./dry-run-simulator";

function selectExpectedSummary(input: ApplyDiffDryRunInput, filePath: string): string {
  const direct = input.pseudoDiffSummary.find((line) => line.toLowerCase().includes(filePath.toLowerCase()));
  return direct ?? input.pseudoDiffSummary[0] ?? `Would evaluate intended change for ${filePath}.`;
}

export function buildApplyDryRunFileImpactItem(
  input: ApplyDiffDryRunInput,
  filePath: string,
  operation: ApplyDiffDryRunFileOperation = simulateApplyDiffFileOperation(input, filePath)
): ApplyDryRunFileImpactItem {
  const missingApprovalCoverage = !input.approvedTargetFiles.includes(filePath);
  const smokeChecks = input.smokeChecks.length > 0 ? input.smokeChecks : input.verificationPlan;

  return {
    id: `apply-diff-dry-run-impact:${buildApplyDiffDryRunStableKey(input.id, filePath, operation.operationIntent)}`,
    dryRunId: input.id,
    filePath,
    operationIntent: operation.operationIntent,
    riskLevel: input.riskLevel,
    expectedChangeSummary: selectExpectedSummary(input, filePath),
    verificationRequirement:
      input.verificationPlan[0] ?? "Current file verification required before any future apply.",
    rollbackRequirement: input.rollbackPlan[0] ?? "Rollback plan required before any future apply.",
    conflictWarning: missingApprovalCoverage
      ? "Target file missing from approved packet."
      : operation.refusedForRealApply
        ? operation.refusalReason
        : null,
    smokeChecks,
  };
}

export function buildApplyDryRunFileImpact(
  input: ApplyDiffDryRunInput,
  operations: readonly ApplyDiffDryRunFileOperation[] = []
): ApplyDryRunFileImpact {
  const items = input.targetFiles.map((filePath) => {
    const operation = operations.find((candidate) => candidate.filePath === filePath);
    return buildApplyDryRunFileImpactItem(input, filePath, operation);
  });

  return {
    id: `apply-diff-dry-run-file-impact:${buildApplyDiffDryRunStableKey(input.id)}`,
    dryRunId: input.id,
    items,
    summary: summarizeApplyDryRunFileImpact(items),
  };
}

export function summarizeApplyDryRunFileImpact(
  impactOrItems: ApplyDryRunFileImpact | readonly ApplyDryRunFileImpactItem[]
): string[] {
  const items = "items" in impactOrItems ? impactOrItems.items : impactOrItems;
  const warned = items.filter((item) => !!item.conflictWarning).length;

  return [
    `${items.length} file impact item(s) prepared from supplied target files only.`,
    `${warned} impact item(s) include conflict warning(s).`,
    "Impact is simulation only and does not read or mutate files.",
  ];
}
