import { buildApplyValidationStableId, hasApplyValidationPathTraversal, type HardenedApplyPolicy, type HardenedApplyPolicySource } from "./apply-validation-hardening-types";

export function buildHardenedApplyPolicy(source: HardenedApplyPolicySource = {}): HardenedApplyPolicy {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  const input = source.input ?? null;
  const touchedFiles = [...(source.touchedFiles ?? []), ...(source.diffSafety?.touchedFiles ?? [])];
  if (!input?.selectedFilePath) blockedReasons.push("Policy blocks missing selected file path.");
  if (!input?.previewDiffText) blockedReasons.push("Policy blocks missing preview diff.");
  if (source.explicitApproval !== true) blockedReasons.push("Policy blocks missing approval.");
  if (touchedFiles.length < 1) blockedReasons.push("Policy requires touched file list.");
  if (!source.rollbackPlan?.ready) blockedReasons.push("Policy requires rollback plan.");
  if (!source.validationPlan?.commands.length) blockedReasons.push("Policy requires validation plan.");
  if ([input?.selectedFilePath ?? "", ...touchedFiles].some(hasApplyValidationPathTraversal)) blockedReasons.push("Policy blocks path traversal.");
  if (source.diffSafety?.checks.some((check) => check.id === "binary-patch-check" && check.status === "blocker")) blockedReasons.push("Policy blocks binary file patch.");
  if (source.diffSafety?.checks.some((check) => check.id === "generated-huge-patch-check" && check.status === "risk")) warnings.push("Patch size is high; review before apply.");
  if (source.diffSafety?.blockerCount) blockedReasons.push("Policy blocks diff safety blockers.");
  if ((source.diffSafety?.riskCount ?? 0) > 0 && source.highRiskAcknowledged !== true) blockedReasons.push("High risk requires extra acknowledgement.");
  if (source.cleanWorkingTree === false) warnings.push("Clean working tree recommended before apply.");
  if (source.directUiApplyDiffAttempted === true) blockedReasons.push("Policy blocks direct UI apply-diff.");
  if (source.directUiWriteFileAttempted === true) blockedReasons.push("Policy blocks direct UI write-file.");
  const uniqueBlocked = Array.from(new Set(blockedReasons)).sort();
  const uniqueWarnings = Array.from(new Set(warnings)).sort();
  const allowed = uniqueBlocked.length === 0;
  const policy: HardenedApplyPolicy = {
    id: buildApplyValidationStableId("hardened-apply-policy", input?.hardeningId ?? "missing", String(allowed)),
    allowed,
    requestReady: allowed,
    blockedReasons: uniqueBlocked,
    warnings: uniqueWarnings,
    nextSafeAction: allowed ? "Request guarded apply only through the approved boundary, then run validation manually." : "Resolve policy blockers before any apply request.",
    selectedFilePathRequired: true,
    previewDiffRequired: true,
    explicitApprovalRequired: true,
    touchedFileListRequired: true,
    rollbackPlanRequired: true,
    validationPlanRequired: true,
    pathTraversalCheckRequired: true,
    binaryFileCheckRequired: true,
    patchSizeCheckRequired: true,
    sourceTreeBoundaryCheckRequired: true,
    cleanWorkingTreeRecommended: true,
    noDirectUiApplyDiff: true,
    noDirectUiWriteFile: true,
    latestMessageAuthorityPreserved: true,
    summary: [],
  };
  return { ...policy, summary: summarizeHardenedApplyPolicy(policy) };
}

export function isHardenedApplyAllowed(policy: HardenedApplyPolicy): boolean {
  return policy.allowed && policy.requestReady && policy.blockedReasons.length === 0;
}

export function summarizeHardenedApplyPolicy(policy: HardenedApplyPolicy): string[] {
  return [
    `Policy allowed=${policy.allowed}; requestReady=${policy.requestReady}.`,
    `${policy.blockedReasons.length} blocked reason(s), ${policy.warnings.length} warning(s).`,
    "Approval required, rollback required, validation required, no direct UI apply-diff, and no direct UI write-file.",
    `Next safe action: ${policy.nextSafeAction}`,
  ];
}
