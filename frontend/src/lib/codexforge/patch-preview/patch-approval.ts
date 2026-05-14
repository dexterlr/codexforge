import type { CodexForgePatchApprovalBoundary } from "./patch-preview-types";

export function buildPatchApprovalBoundary(): CodexForgePatchApprovalBoundary {
  return {
    phase: "Phase 6",
    previewAllowed: true,
    applyBlocked: true,
    fileMutationBlocked: true,
    commandExecutionBlocked: true,
    futureApprovalRequired: true,
    blockedCapabilities: ["broker", "pc-control", "camera", "live-execution"],
    summary:
      "Phase 6 allows preview planning only. Apply, file mutation, command execution, broker, PC, and camera paths remain blocked.",
  };
}

export function isPatchApplyBlocked(
  boundary: CodexForgePatchApprovalBoundary = buildPatchApprovalBoundary()
): boolean {
  return boundary.applyBlocked === true;
}

export function summarizePatchApprovalBoundary(
  boundary: CodexForgePatchApprovalBoundary
): string {
  return boundary.summary;
}
