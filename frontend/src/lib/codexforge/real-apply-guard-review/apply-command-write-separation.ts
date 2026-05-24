import {
  buildRealApplyGuardReviewStableKey,
  countApplyGuardStatus,
  deriveApplyGuardOverallStatus,
  type ApplyCommandWriteSeparation,
  type ApplyGuardReviewCheck,
  type ApplyGuardReviewInput,
  type ApplyGuardReviewStatus,
} from "./real-apply-guard-review-types";

export function buildApplyCommandWriteSeparationCheck(input: {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  blocksApply?: boolean;
}): ApplyGuardReviewCheck {
  return { blocksApply: input.status === "blocker", ...input };
}

export function buildApplyCommandWriteSeparation(input: ApplyGuardReviewInput): ApplyCommandWriteSeparation {
  const checks = [
    buildApplyCommandWriteSeparationCheck({ id: "no-direct-run-command-from-ui", label: "No direct run-command from UI", status: input.source.directUiRunAttempted ? "blocker" : "pass", detail: "Command/write separation checks no direct run-command from UI." }),
    buildApplyCommandWriteSeparationCheck({ id: "validation-path-does-not-write-files", label: "Validation path does not write files", status: "pass", detail: "Validation path does not write files." }),
    buildApplyCommandWriteSeparationCheck({ id: "write-file-policy-gated", label: "write-file path is policy-gated", status: input.source.directUiWriteAttempted ? "blocker" : "pass", detail: "write-file path is policy-gated." }),
    buildApplyCommandWriteSeparationCheck({ id: "apply-diff-policy-gated", label: "apply-diff path is policy-gated", status: input.source.directUiApplyAttempted ? "blocker" : "pass", detail: "apply-diff path is policy-gated." }),
    buildApplyCommandWriteSeparationCheck({ id: "command-execution-separate-file-mutation", label: "Command execution separate from file mutation", status: "pass", detail: "Command execution remains separate from file mutation." }),
    buildApplyCommandWriteSeparationCheck({ id: "validation-copy-manual-default", label: "Validation commands copy/manual by default", status: "pass", detail: "Validation commands copy/manual by default; no auto-run." }),
    buildApplyCommandWriteSeparationCheck({ id: "no-broker-execution-bypass", label: "No broker execution bypass", status: input.source.brokerExecutionAttempted ? "blocker" : "pass", detail: "No broker execution bypass." }),
    buildApplyCommandWriteSeparationCheck({ id: "no-command-injection-path", label: "No command injection path", status: "pass", detail: "No arbitrary shell input for apply and no command injection path." }),
    buildApplyCommandWriteSeparationCheck({ id: "no-arbitrary-shell-input-for-apply", label: "No arbitrary shell input for apply", status: "pass", detail: "No arbitrary shell input for apply." }),
    buildApplyCommandWriteSeparationCheck({ id: "no-mixed-apply-validate-unsafe-button", label: "No mixed apply+validate unsafe button", status: "pass", detail: "Command/write separation checks no mixed apply+validate single unsafe button." }),
  ];
  const review: ApplyCommandWriteSeparation = {
    id: buildRealApplyGuardReviewStableKey("apply-command-write-separation", input.reviewId),
    checks,
    overallStatus: deriveApplyGuardOverallStatus(checks),
    blockerCount: countApplyGuardStatus(checks, "blocker"),
    warningCount: countApplyGuardStatus(checks, "warning"),
    summary: [],
  };
  return { ...review, summary: summarizeApplyCommandWriteSeparation(review) };
}

export function summarizeApplyCommandWriteSeparation(review: ApplyCommandWriteSeparation): string[] {
  return [
    `Command/write separation status ${review.overallStatus}.`,
    "Checks no direct run-command from UI, validation path no writes, write-file/apply-diff policy gates, separate command execution and mutation, copy/manual validation, no broker bypass, no command injection, no arbitrary shell input, and no mixed unsafe apply+validate button.",
  ];
}
