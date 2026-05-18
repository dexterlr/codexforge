import type {
  RegressionFixQueueItem,
  RegressionFixQueuePriorityClass,
} from "./regression-fix-queue-types";

const SEVERITY_WEIGHT: Record<RegressionFixQueueItem["severity"], number> = {
  info: 0.04,
  warning: 0.12,
  error: 0.22,
  blocker: 0.32,
};

const RISK_WEIGHT: Record<RegressionFixQueueItem["riskLevel"], number> = {
  low: 0.04,
  medium: 0.1,
  high: 0.18,
  critical: 0.24,
};

const RISK_SORT: Record<RegressionFixQueueItem["riskLevel"], number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const ROLLBACK_URGENCY_WEIGHT: Record<RegressionFixQueueItem["rollbackUrgency"], number> = {
  none: 0,
  low: 0.03,
  medium: 0.06,
  high: 0.1,
  "stop-and-stabilize": 0.16,
};

export function scoreRegressionFixQueuePriority(item: RegressionFixQueueItem): number {
  if (item.queueState === "blocked" || item.queueState === "rejected") return 0;

  const affectedSurface = Math.min(0.12, item.affectedSurfaces.length * 0.03);
  const smokeFailures = Math.min(0.12, item.smokeFailureCount * 0.04);
  const buildFailure = item.buildFailurePresent ? 0.12 : 0;
  const browserWarning = item.browserWarningPresent ? 0.04 : 0;
  const targetSpecificity = item.targetFiles.length === 1 ? 0.08 : item.targetFiles.length > 1 ? 0.05 : -0.12;
  const selected = item.userSelected ? 0.08 : 0;
  const staleEvidence = item.staleEvidenceWarnings.length > 0 ? -Math.min(0.16, item.staleEvidenceWarnings.length * 0.04) : 0;
  const blockedWarnings = item.blockedWarnings.length > 0 ? -Math.min(0.18, item.blockedWarnings.length * 0.05) : 0;
  const investigation = item.investigationNeeded ? -0.08 : 0;
  const score =
    item.confidence * 0.24 +
    SEVERITY_WEIGHT[item.severity] +
    RISK_WEIGHT[item.riskLevel] +
    affectedSurface +
    smokeFailures +
    buildFailure +
    browserWarning +
    targetSpecificity +
    ROLLBACK_URGENCY_WEIGHT[item.rollbackUrgency] +
    selected +
    staleEvidence +
    blockedWarnings +
    investigation;

  return Math.round(Math.max(0, Math.min(1, score)) * 100) / 100;
}

export function classifyRegressionFixQueuePriority(
  score: number,
  blocked = false
): RegressionFixQueuePriorityClass {
  if (blocked) return "blocked";
  if (score >= 0.82) return "urgent";
  if (score >= 0.64) return "high";
  if (score >= 0.38) return "normal";
  return "low";
}

export function rankRegressionFixQueueItems(
  items: readonly RegressionFixQueueItem[],
  includeBlocked = false
): RegressionFixQueueItem[] {
  return [...items].sort((left, right) => {
    const leftBlocked = left.priority === "blocked" || left.queueState === "blocked";
    const rightBlocked = right.priority === "blocked" || right.queueState === "blocked";
    if (!includeBlocked && leftBlocked !== rightBlocked) return leftBlocked ? 1 : -1;

    const priorityRank: Record<RegressionFixQueuePriorityClass, number> = {
      urgent: 5,
      high: 4,
      normal: 3,
      low: 2,
      blocked: 1,
    };
    if (priorityRank[right.priority] !== priorityRank[left.priority]) {
      return priorityRank[right.priority] - priorityRank[left.priority];
    }
    if (right.priorityScore !== left.priorityScore) return right.priorityScore - left.priorityScore;
    if (right.confidence !== left.confidence) return right.confidence - left.confidence;
    if (RISK_SORT[right.riskLevel] !== RISK_SORT[left.riskLevel]) {
      return RISK_SORT[right.riskLevel] - RISK_SORT[left.riskLevel];
    }
    return left.id.localeCompare(right.id);
  });
}
