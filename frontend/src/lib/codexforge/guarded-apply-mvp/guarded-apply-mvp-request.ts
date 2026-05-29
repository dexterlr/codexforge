import type { GuardedApplyMvpRequest, GuardedApplyMvpRequestSource, GuardedApplyMvpValidation } from "./guarded-apply-mvp-types";

export function buildGuardedApplyMvpStableKey(...parts: Array<string | null | undefined>): string {
  const raw = parts.filter(Boolean).join(":").toLowerCase();
  const clean = raw.replace(/[^a-z0-9/_:.-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return clean.slice(0, 96) || "guarded-apply-mvp";
}

export function buildGuardedApplyMvpRequest(source: GuardedApplyMvpRequestSource = {}): GuardedApplyMvpRequest {
  const selectedFile = source.selectedFile?.trim() || null;
  const diffLabel = source.diffLabel?.trim() || "preview-diff";
  return {
    requestId: source.requestId?.trim() || `guarded-apply-mvp:${buildGuardedApplyMvpStableKey(selectedFile, diffLabel)}`,
    selectedFile,
    diffLabel,
    diffSummary: source.diffSummary?.trim() || "One preview diff for one selected file.",
    previewDiffSupplied: source.previewDiffSupplied === true,
    fileCount: source.fileCount ?? (selectedFile ? 1 : 0),
    diffCount: source.diffCount ?? 1,
    includesBinaryPatch: source.includesBinaryPatch === true,
    touchesBlockedPath: source.touchesBlockedPath === true,
    rollbackGuidance: source.rollbackGuidance?.trim() || "Use git restore for an uncommitted file or git revert after a committed change.",
    noDirectUiApplyDiff: true,
    noDirectUiWriteFile: true,
    noDirectUiRunCommand: true,
    noCombinedApplyValidateButton: true,
    validationRemainsSeparate: true,
    latestMessageAuthorityPreserved: source.latestMessageAuthorityPreserved !== false,
  };
}

export function validateGuardedApplyMvpRequest(request: GuardedApplyMvpRequest): GuardedApplyMvpValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!request.selectedFile) blockedReasons.push("One file only requires a selected file.");
  if (request.fileCount !== 1) blockedReasons.push("Policy enforces one file only.");
  if (request.diffCount !== 1) blockedReasons.push("Policy enforces one diff only.");
  if (!request.previewDiffSupplied) blockedReasons.push("Preview diff required before approval.");
  if (request.includesBinaryPatch) blockedReasons.push("No binary patch is allowed in the MVP boundary.");
  if (request.touchesBlockedPath) blockedReasons.push("No package, lock, config, tool-policy, or brain-runtime edits for first MVP.");
  if (!request.rollbackGuidance) blockedReasons.push("Rollback guidance required.");
  if (!request.latestMessageAuthorityPreserved) blockedReasons.push("Latest-message authority must be preserved.");
  if (request.validationRemainsSeparate) warnings.push("Validation remains separate; no combined apply+validate button.");
  return { ok: blockedReasons.length === 0, blockedReasons, warnings };
}
