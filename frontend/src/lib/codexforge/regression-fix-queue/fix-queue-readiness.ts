import type {
  RegressionFixQueueItem,
  RegressionFixQueueReadiness,
  RegressionFixQueueReadinessCheck,
  RegressionFixQueueReadinessItem,
  RegressionFixQueueReadinessStatus,
} from "./regression-fix-queue-types";
import { buildRegressionFixQueuePolicy } from "./fix-queue-policy";

function check(
  id: string,
  label: string,
  ok: boolean,
  failStatus: RegressionFixQueueReadinessStatus,
  detail: string
): RegressionFixQueueReadinessCheck {
  return { id, label, status: ok ? "ready" : failStatus, detail };
}

function summarizeStatus(checks: readonly RegressionFixQueueReadinessCheck[]): RegressionFixQueueReadinessStatus {
  const statuses = checks.map((item) => item.status);
  if (statuses.includes("blocked")) return "blocked";
  if (statuses.includes("needs-signal")) return "needs-signal";
  if (statuses.includes("needs-cause")) return "needs-cause";
  if (statuses.includes("needs-file")) return "needs-file";
  if (statuses.includes("needs-rollback")) return "needs-rollback";
  if (statuses.includes("needs-tests")) return "needs-tests";
  if (statuses.includes("needs-review")) return "needs-review";
  return "ready";
}

export function buildRegressionFixQueueReadinessItem(item: RegressionFixQueueItem): RegressionFixQueueReadinessItem {
  const policy = buildRegressionFixQueuePolicy(item);
  const hasSignal = item.sourceSignalIds.length > 0 || Boolean(item.manualOperatorNote);
  const hasCause = item.sourceCauseIds.length > 0 || item.investigationNeeded || item.suspectedCause.trim().length > 0;
  const checks = [
    check("regression-signal-attached", "Regression signal attached", hasSignal, "needs-signal", "A regression signal or manual operator note is required."),
    check("suspected-cause-attached", "Suspected cause attached", hasCause, "needs-cause", "Attach suspected cause or mark investigation-needed."),
    check("target-file-selected", "Target file selected", item.targetFiles.length > 0 || item.investigationNeeded, "needs-file", "Target file required unless investigation-needed."),
    check("rollback-advice-attached", "Rollback advice attached", item.rollbackAdviceAttached, "needs-rollback", "Rollback advice is required before handoff."),
    check("suggested-smoke-scripts-attached", "Suggested smoke scripts attached", item.suggestedSmokeScripts.length > 0, "needs-tests", "Suggested smoke scripts or verification commands must be visible."),
    check("safe-patch-preview-available", "Safe Patch Preview available", item.safePatchPreviewAvailable, "blocked", "Route all edits through Safe Patch Preview."),
    check("preview-diff-composer-available", "Preview Diff Composer available", item.previewDiffComposerAvailable, "blocked", "Use Preview Diff Composer before patch package."),
    check("verification-ingestion-available", "Verification ingestion available", item.verificationIngestionAvailable, "blocked", "Verification ingestion keeps failed output attached."),
    check("operator-review-required", "Operator review required", item.operatorReviewed || item.reviewedTriage, "needs-review", "Operator review is required before handoff-ready state."),
    check("mutation-blocked", "Mutation blocked", policy.writeFileBlocked && policy.runCommandBlocked && policy.applyDiffBlocked, "blocked", "No auto-fix, no auto-rollback, no file writes, and no command execution."),
  ];
  const status = item.queueState === "blocked" || item.queueState === "rejected" ? "blocked" : summarizeStatus(checks);

  return {
    itemId: item.id,
    status,
    checks,
    summary: summarizeRegressionFixQueueReadinessItem(status, checks),
  };
}

export function buildRegressionFixQueueReadiness(items: readonly RegressionFixQueueItem[]): RegressionFixQueueReadiness {
  const readinessItems = items.map((item) => buildRegressionFixQueueReadinessItem(item));
  return {
    id: "regression-fix-queue-readiness",
    items: readinessItems,
    readyCount: readinessItems.filter((item) => item.status === "ready").length,
    blockedCount: readinessItems.filter((item) => item.status === "blocked").length,
    summary: summarizeRegressionFixQueueReadiness(readinessItems),
  };
}

export function summarizeRegressionFixQueueReadinessItem(
  status: RegressionFixQueueReadinessStatus,
  checks: readonly RegressionFixQueueReadinessCheck[]
): string[] {
  return [
    `Readiness status is ${status}.`,
    `${checks.filter((item) => item.status === "ready").length}/${checks.length} checks are ready.`,
    "Readiness includes rollback advice, suggested smoke scripts, Safe Patch Preview, Preview Diff Composer, verification ingestion, operator review, and mutation blocked.",
  ];
}

export function summarizeRegressionFixQueueReadiness(
  items: readonly RegressionFixQueueReadinessItem[]
): string[] {
  return [
    `${items.length} regression fix queue items checked.`,
    `${items.filter((item) => item.status === "ready").length} items are ready.`,
    `${items.filter((item) => item.status === "blocked").length} items are blocked.`,
  ];
}
