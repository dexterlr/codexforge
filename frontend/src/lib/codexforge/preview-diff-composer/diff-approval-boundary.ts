import type { DiffApprovalBoundary } from "./preview-diff-composer-types";

export function buildDiffApprovalBoundary(): DiffApprovalBoundary {
  const blockedActions = [
    "apply",
    "write",
    "command execution",
    "real patch without Safe Patch Preview review",
    "apply-diff without future explicit approval",
    "run-command without future explicit approval",
    "Brain graph mutation",
    "memory auto-promotion",
  ];

  return {
    id: "preview-diff-approval-boundary",
    previewCompositionAllowed: true,
    applyBlocked: true,
    writeBlocked: true,
    commandExecutionBlocked: true,
    safePatchPreviewReviewRequired: true,
    futureApplyApprovalRequired: true,
    futureCommandApprovalRequired: true,
    evidenceIsContextNotProof: true,
    currentFileContentIsAuthority: true,
    blockedActions,
    summary: summarizeDiffApprovalBoundary({
      id: "preview-diff-approval-boundary",
      previewCompositionAllowed: true,
      applyBlocked: true,
      writeBlocked: true,
      commandExecutionBlocked: true,
      safePatchPreviewReviewRequired: true,
      futureApplyApprovalRequired: true,
      futureCommandApprovalRequired: true,
      evidenceIsContextNotProof: true,
      currentFileContentIsAuthority: true,
      blockedActions,
      summary: [],
    }),
  };
}

export function isPreviewDiffApplyBlocked(boundary: DiffApprovalBoundary = buildDiffApprovalBoundary()): boolean {
  return boundary.applyBlocked || boundary.writeBlocked || boundary.commandExecutionBlocked;
}

export function summarizeDiffApprovalBoundary(boundary: DiffApprovalBoundary): string[] {
  return [
    "Preview composition allowed; apply, write, and command execution are blocked.",
    "Real patch requires Safe Patch Preview review and future explicit approval.",
    "Evidence is context, not proof; current file content is authority.",
    `${boundary.blockedActions.length} blocked action(s) visible to the reviewer.`,
  ];
}
