import type {
  PatchPreviewQueueItem,
  PatchPreviewQueueReadiness,
  PatchPreviewQueueReadinessCheck,
  PatchPreviewQueueReadinessItem,
  PatchPreviewQueueReadinessStatus,
} from "./patch-preview-queue-types";
import { buildPatchPreviewQueuePolicy } from "./queue-policy";

function check(id: string, label: string, ok: boolean, failStatus: PatchPreviewQueueReadinessStatus, detail: string): PatchPreviewQueueReadinessCheck {
  return { id, label, status: ok ? "ready" : failStatus, detail };
}

function summarizeStatus(checks: readonly PatchPreviewQueueReadinessCheck[]): PatchPreviewQueueReadinessStatus {
  const statuses = checks.map((item) => item.status);
  if (statuses.includes("blocked")) return "blocked";
  if (statuses.includes("needs-file")) return "needs-file";
  if (statuses.includes("needs-evidence")) return "needs-evidence";
  if (statuses.includes("needs-tests")) return "needs-tests";
  if (statuses.includes("needs-review")) return "needs-review";
  return "ready";
}

export function buildPatchPreviewQueueReadinessItem(item: PatchPreviewQueueItem): PatchPreviewQueueReadinessItem {
  const policy = buildPatchPreviewQueuePolicy(item);
  const checks = [
    check("target-file-selected", "Target file selected", item.targetFiles.length > 0, "needs-file", "Safe Patch Preview requires a selected target file."),
    check("evidence-attached", "Evidence attached", item.evidenceIds.length > 0, "needs-evidence", "Evidence is context, not proof, but evidence ids must be visible."),
    check("confidence-reviewed", "Confidence reviewed", item.confidence >= 0.45, "needs-review", "Low confidence requires investigation-needed or blocked handling."),
    check("risk-reviewed", "Risk reviewed", Boolean(item.riskLevel), "needs-review", "Risk must be visible before preview handoff."),
    check("safe-patch-preview-available", "Safe Patch Preview available", policy.patchPreviewAllowed, "blocked", "Route all edits through Safe Patch Preview."),
    check("suggested-tests-available", "Suggested tests available", item.suggestedTests.length > 0, "needs-tests", "Suggested tests should be visible before handoff."),
    check("rollback-note-available", "Rollback note available", item.rollbackNotes.length > 0, "needs-review", "Rollback note is required before future approval."),
    check("approval-boundary-visible", "Approval boundary visible", policy.applyBlocked, "blocked", "Apply remains blocked."),
    check("current-file-verification-required", "Current file verification required", policy.currentFilesMustBeVerified, "blocked", "Verify current files before edits."),
    check("mutation-blocked", "Mutation blocked", policy.mutationBlocked && policy.commandExecutionBlocked, "blocked", "No file writes without approval and no command execution without approval."),
  ];
  const status = item.queueState === "blocked" ? "blocked" : summarizeStatus(checks);

  return {
    itemId: item.id,
    status,
    checks,
    summary: summarizePatchPreviewQueueReadinessItem(status, checks),
  };
}

export function buildPatchPreviewQueueReadiness(items: readonly PatchPreviewQueueItem[]): PatchPreviewQueueReadiness {
  const readinessItems = items.map((item) => buildPatchPreviewQueueReadinessItem(item));
  const readyCount = readinessItems.filter((item) => item.status === "ready").length;
  const blockedCount = readinessItems.filter((item) => item.status === "blocked").length;

  return {
    id: "patch-preview-queue-readiness",
    items: readinessItems,
    readyCount,
    blockedCount,
    summary: summarizePatchPreviewQueueReadiness(readinessItems),
  };
}

export function summarizePatchPreviewQueueReadinessItem(
  status: PatchPreviewQueueReadinessStatus,
  checks: readonly PatchPreviewQueueReadinessCheck[]
): string[] {
  return [
    `Readiness status is ${status}.`,
    `${checks.filter((item) => item.status === "ready").length}/${checks.length} checks are ready.`,
    "Readiness includes current file verification, suggested tests, rollback note, approval boundary, and mutation blocked.",
  ];
}

export function summarizePatchPreviewQueueReadiness(items: readonly PatchPreviewQueueReadinessItem[]): string[] {
  return [
    `${items.length} queued preview items checked.`,
    `${items.filter((item) => item.status === "ready").length} items are ready.`,
    `${items.filter((item) => item.status === "blocked").length} items are blocked.`,
  ];
}
