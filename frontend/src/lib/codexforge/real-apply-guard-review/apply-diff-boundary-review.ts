import {
  buildRealApplyGuardReviewStableKey,
  deriveApplyGuardOverallStatus,
  countApplyGuardStatus,
  normalizeApplyGuardPath,
  type ApplyDiffBoundaryReview,
  type ApplyGuardReviewCheck,
  type ApplyGuardReviewInput,
  type ApplyGuardReviewStatus,
} from "./real-apply-guard-review-types";

function text(input: ApplyGuardReviewInput): string {
  return [input.source.diffText ?? "", ...input.diffSummary, ...input.touchedFiles].join("\n");
}

function hasUnifiedDiff(value: string): boolean {
  return value.includes("--- ") && value.includes("+++ ") && value.includes("@@");
}

function status(condition: boolean, fail: ApplyGuardReviewStatus = "blocker"): ApplyGuardReviewStatus {
  return condition ? "pass" : fail;
}

function hasMojibake(value: string): boolean {
  return value.includes(String.fromCharCode(0x00c3)) || value.includes(String.fromCharCode(0x00c2)) || value.includes(String.fromCharCode(0xfffd));
}

function hasSecretMarker(value: string): boolean {
  const providerKey = ["OPENAI", "API", "KEY"].join("_");
  return new RegExp(`(${providerKey}|api[_-]?key|secret|password|token\\s*=)`, "i").test(value);
}

export function buildApplyDiffBoundaryReviewCheck(input: {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  blocksApply?: boolean;
}): ApplyGuardReviewCheck {
  return { blocksApply: input.status === "blocker", ...input };
}

export function buildApplyDiffBoundaryReview(input: ApplyGuardReviewInput): ApplyDiffBoundaryReview {
  const sourceText = text(input);
  const touched = input.touchedFiles.map(normalizeApplyGuardPath);
  const selected = input.selectedFilePath ? normalizeApplyGuardPath(input.selectedFilePath) : "";
  const riskyConfig = touched.some((file) => /(package(-lock)?\.json|pnpm-lock|yarn.lock|tsconfig|next.config|eslint|prettier|\.env)/i.test(file));
  const toolPolicyEdit = touched.some((file) => /(tool-policy|run-command|write-file|apply-diff|broker-execution)/i.test(file));
  const brainRuntimeEdit = touched.some((file) => /(brain|runtime-event|saveBrainGraph|appendEvent)/i.test(file));
  const smokeAllEdit = touched.some((file) => /smoke-codexforge-all\.ps1$/i.test(file));
  const checks = [
    buildApplyDiffBoundaryReviewCheck({ id: "unified-diff-parseable", label: "Unified diff parseable", status: status(hasUnifiedDiff(sourceText) || input.diffSummary.length > 0, "warning"), detail: "Unified diff parseable or supplied diff summary is present." }),
    buildApplyDiffBoundaryReviewCheck({ id: "touched-files-bounded", label: "Touched files bounded", status: status(touched.length > 0), detail: "Touched files bounded by supplied review input." }),
    buildApplyDiffBoundaryReviewCheck({ id: "selected-file-matches-diff-target", label: "Selected file matches diff target", status: selected && touched.length > 0 ? (touched.includes(selected) ? "pass" : "warning") : "unknown", detail: "Selected file matches diff target when both are supplied." }),
    buildApplyDiffBoundaryReviewCheck({ id: "diff-size-safe-threshold", label: "Diff size within safe threshold", status: sourceText.length > 60000 || touched.length > 12 ? "warning" : "pass", detail: "Diff size within safe threshold unless very large or multi-surface." }),
    buildApplyDiffBoundaryReviewCheck({ id: "binary-patch-check", label: "No binary patch", status: /GIT binary patch|Binary files/i.test(sourceText) ? "blocker" : "pass", detail: "Diff boundary checks binary patch." }),
    buildApplyDiffBoundaryReviewCheck({ id: "generated-huge-file-check", label: "No generated huge file", status: /generated|\.min\.|dist\/|build\//i.test(sourceText) && sourceText.length > 20000 ? "warning" : "pass", detail: "Generated huge file changes require review." }),
    buildApplyDiffBoundaryReviewCheck({ id: "lockfile-package-config-warning", label: "Lockfile/package/config edit warning", status: riskyConfig ? "warning" : "pass", detail: "Lockfile, package, or config edits require warning." }),
    buildApplyDiffBoundaryReviewCheck({ id: "tool-execution-policy-edit", label: "Tool execution policy edit", status: toolPolicyEdit ? "blocker" : "pass", detail: "Tool execution policy edit requires blocker/warning review." }),
    buildApplyDiffBoundaryReviewCheck({ id: "brain-runtime-persistence-edit", label: "Brain/runtime persistence edit", status: brainRuntimeEdit ? "blocker" : "pass", detail: "Brain/runtime persistence edit requires blocker/warning review." }),
    buildApplyDiffBoundaryReviewCheck({ id: "smoke-all-targeted-warning", label: "Smoke-all edit targeted smoke warning", status: smokeAllEdit ? "warning" : "pass", detail: "smoke-all edits require targeted smoke warning." }),
    buildApplyDiffBoundaryReviewCheck({ id: "secrets-included-check", label: "No secrets included", status: hasSecretMarker(sourceText) ? "blocker" : "pass", detail: "Diff boundary checks secrets." }),
    buildApplyDiffBoundaryReviewCheck({ id: "mojibake-check", label: "No mojibake", status: hasMojibake(sourceText) ? "blocker" : "pass", detail: "Diff boundary checks no mojibake." }),
  ];
  const review: ApplyDiffBoundaryReview = {
    id: buildRealApplyGuardReviewStableKey("apply-diff-boundary-review", input.reviewId),
    checks,
    overallStatus: deriveApplyGuardOverallStatus(checks),
    blockerCount: countApplyGuardStatus(checks, "blocker"),
    warningCount: countApplyGuardStatus(checks, "warning"),
    summary: [],
  };
  return { ...review, summary: summarizeApplyDiffBoundaryReview(review) };
}

export function summarizeApplyDiffBoundaryReview(review: ApplyDiffBoundaryReview): string[] {
  return [
    `Diff boundary review status ${review.overallStatus}.`,
    "Checks parseability, bounded touched files, selected target, size, binary patch, generated huge files, lockfile/package/config edits, tool execution policy edits, Brain/runtime persistence edits, smoke-all edits, secrets, and mojibake.",
  ];
}
