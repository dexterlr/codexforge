import type { GroundedFixRiskLevel } from "../grounded-fix";
import type { PatchPreviewQueueItem, PatchPreviewQueuePriorityClass } from "./patch-preview-queue-types";

const RISK_WEIGHT: Record<GroundedFixRiskLevel, number> = {
  low: 0.18,
  medium: 0.1,
  high: -0.08,
  critical: -0.18,
};

const RISK_SORT: Record<GroundedFixRiskLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const IMPORTANCE_WEIGHT: Record<PatchPreviewQueueItem["sourceImportance"], number> = {
  low: 0.03,
  medium: 0.08,
  high: 0.14,
  critical: 0.2,
};

export function scorePatchPreviewQueuePriority(item: PatchPreviewQueueItem): number {
  const smokeAvailable = item.suggestedTests.length > 0 ? 0.08 : 0;
  const targetSpecificity = item.targetFiles.length === 1 ? 0.08 : item.targetFiles.length > 1 ? 0.05 : -0.2;
  const evidenceSignals = Math.min(0.16, item.evidenceIds.length * 0.04);
  const blockedWarnings = item.warnings.length > 0 ? -Math.min(0.18, item.warnings.length * 0.04) : 0;
  const selected = item.userSelected ? 0.08 : 0;
  const risk = RISK_WEIGHT[item.riskLevel];
  const sourceImportance = IMPORTANCE_WEIGHT[item.sourceImportance];
  const score =
    item.queueState === "blocked"
      ? 0
      : item.confidence * 0.42 + risk + sourceImportance + selected + smokeAvailable + targetSpecificity + evidenceSignals + blockedWarnings;

  return Math.round(Math.max(0, Math.min(1, score)) * 100) / 100;
}

export function classifyPatchPreviewQueuePriority(score: number, blocked = false): PatchPreviewQueuePriorityClass {
  if (blocked) return "blocked";
  if (score >= 0.82) return "urgent";
  if (score >= 0.64) return "high";
  if (score >= 0.38) return "normal";
  return "low";
}

export function rankPatchPreviewQueueItems(items: readonly PatchPreviewQueueItem[], includeBlocked = false): PatchPreviewQueueItem[] {
  return [...items].sort((left, right) => {
    const leftBlocked = left.priority === "blocked" || left.queueState === "blocked";
    const rightBlocked = right.priority === "blocked" || right.queueState === "blocked";
    if (!includeBlocked && leftBlocked !== rightBlocked) return leftBlocked ? 1 : -1;
    if (right.priorityScore !== left.priorityScore) return right.priorityScore - left.priorityScore;
    if (right.confidence !== left.confidence) return right.confidence - left.confidence;
    if (RISK_SORT[left.riskLevel] !== RISK_SORT[right.riskLevel]) return RISK_SORT[left.riskLevel] - RISK_SORT[right.riskLevel];
    return left.id.localeCompare(right.id);
  });
}
