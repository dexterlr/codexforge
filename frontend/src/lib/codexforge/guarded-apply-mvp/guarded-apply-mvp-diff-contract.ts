import type { GuardedApplyMvpDiffContract, GuardedApplyMvpRequest } from "./guarded-apply-mvp-types";

export function buildGuardedApplyMvpDiffContract(request: GuardedApplyMvpRequest): GuardedApplyMvpDiffContract {
  return {
    selectedFile: request.selectedFile,
    diffLabel: request.diffLabel,
    previewDiffRequired: true,
    oneFileOnly: request.fileCount === 1,
    oneDiffOnly: request.diffCount === 1,
    binaryPatchBlocked: !request.includesBinaryPatch,
    blockedPathEditsRejected: !request.touchesBlockedPath,
    contractSummary: "One file, one diff, preview diff required, no binary patch, no blocked path edits.",
  };
}
