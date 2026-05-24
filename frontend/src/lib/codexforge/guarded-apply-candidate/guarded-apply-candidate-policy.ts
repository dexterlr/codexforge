import {
  buildGuardedApplyCandidateStableId,
  type GuardedApplyCandidatePolicy,
  type GuardedApplyCandidatePolicySource,
} from "./guarded-apply-candidate-types";

export function buildGuardedApplyCandidatePolicy(
  source: GuardedApplyCandidatePolicySource = {}
): GuardedApplyCandidatePolicy {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (source.previewDiffPresent !== true) blockedReasons.push("Policy requires preview diff.");
  if (source.scope?.overallStatus === "blocker" || !source.scope) blockedReasons.push("Policy requires one file only with passing scope.");
  if (source.explicitApprovalPresent !== true) blockedReasons.push("Policy requires explicit approval.");
  if (source.approvalTiedToExactDiff !== true) blockedReasons.push("Policy requires approval tied to exact diff hash/label.");
  if (source.approvalTiedToLatestRequest !== true) blockedReasons.push("Policy requires approval tied to latest message/request.");
  if (source.rollbackContractReady !== true) blockedReasons.push("Policy requires rollback contract.");
  if (source.validationContractReady !== true) blockedReasons.push("Policy requires validation contract.");
  if (source.resultContractReady !== true) blockedReasons.push("Policy requires result contract.");
  if (source.directUiWriteFile === true) blockedReasons.push("Policy blocks direct UI write-file.");
  if (source.directUiApplyDiff === true) blockedReasons.push("Policy blocks direct UI apply-diff.");
  if (source.directUiRunCommand === true) blockedReasons.push("Policy blocks direct UI run-command.");
  if (source.combinedApplyValidateButton === true) blockedReasons.push("Policy blocks combined apply+validate button.");
  if (source.automaticCommit === true) blockedReasons.push("Policy blocks automatic commit.");
  if (source.autoRunValidation === true) blockedReasons.push("Policy blocks auto-run validation.");
  if (source.cleanWorkingTree === false) warnings.push("Clean working tree recommended before guarded apply candidate.");
  if (source.input?.targetMode === "blocked") blockedReasons.push("Target mode is blocked.");
  const designAllowed = source.input?.targetMode !== "blocked";
  const dryRunCandidateAllowed = designAllowed && !!source.scope && source.scope.blockerCount === 0 && source.previewDiffPresent === true;
  const guardedApplyCandidateAllowed = dryRunCandidateAllowed && blockedReasons.length === 0;
  const policy: GuardedApplyCandidatePolicy = {
    id: buildGuardedApplyCandidateStableId("guarded-apply-candidate-policy", source.input?.candidateId ?? "missing", String(guardedApplyCandidateAllowed)),
    designAllowed,
    dryRunCandidateAllowed,
    guardedApplyCandidateAllowed,
    executionAllowed: false,
    blockedReasons: Array.from(new Set(blockedReasons)).sort(),
    warnings: Array.from(new Set(warnings)).sort(),
    nextSafeAction: guardedApplyCandidateAllowed
      ? "Copy candidate plan, then clear implementation gaps before any MVP."
      : "Clear blocker gaps before implementation.",
    previewDiffRequired: true,
    oneFileOnlyRequired: true,
    explicitApprovalRequired: true,
    approvalTiedToExactDiffRequired: true,
    approvalTiedToLatestMessageRequired: true,
    rollbackContractRequired: true,
    validationContractRequired: true,
    resultContractRequired: true,
    noDirectUiWriteFile: true,
    noDirectUiApplyDiff: true,
    noDirectUiRunCommand: true,
    noCombinedApplyValidateButton: true,
    noAutomaticCommit: true,
    noAutoRunValidation: true,
    cleanWorkingTreeRecommended: true,
    highRiskFileCategoriesBlocked: true,
    summary: [],
  };
  return { ...policy, summary: summarizeGuardedApplyCandidatePolicy(policy) };
}

export function isGuardedApplyCandidateAllowed(policy: GuardedApplyCandidatePolicy): boolean {
  return policy.guardedApplyCandidateAllowed && policy.executionAllowed === false && policy.blockedReasons.length === 0;
}

export function summarizeGuardedApplyCandidatePolicy(policy: GuardedApplyCandidatePolicy): string[] {
  return [
    `Design allowed=${policy.designAllowed}; dry-run candidate allowed=${policy.dryRunCandidateAllowed}; guarded apply candidate allowed=${policy.guardedApplyCandidateAllowed}.`,
    "Execution allowed false in Phase 83.",
    "Policy blocks direct UI write-file, direct UI apply-diff, direct UI run-command, combined apply+validate button, auto-run validation, and automatic commit.",
    `Next safe action: ${policy.nextSafeAction}`,
  ];
}
