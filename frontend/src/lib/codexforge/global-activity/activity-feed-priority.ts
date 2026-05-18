import type { GlobalActivityEvent, GlobalActivityEventType, GlobalActivitySeverity } from "./global-activity-types";

const SEVERITY_SCORE: Record<GlobalActivitySeverity, number> = {
  blocker: 1000,
  warning: 700,
  info: 420,
  success: 180,
  unknown: 80,
};

const TYPE_SCORE: Record<GlobalActivityEventType, number> = {
  "safety.blocked": 980,
  "verification.failed": 940,
  "regression.detected": 900,
  "regression.triaged": 860,
  "regression.fixQueued": 820,
  "patch.previewQueued": 760,
  "patch.previewComposed": 730,
  "apply.dryRunSimulated": 700,
  "apply.gatePrepared": 660,
  "apply.executionReviewed": 640,
  "postApply.verificationPrepared": 600,
  "memory.candidateCreated": 540,
  "brain.mergePreviewed": 520,
  "brain.governanceReviewed": 510,
  "stabilization.reviewed": 500,
  "verification.ingested": 460,
  "verification.passed": 300,
  "creative.planCreated": 260,
  "command.copied": 160,
  "route.opened": 140,
  unknown: 40,
};

export function scoreGlobalActivityEventPriority(event: GlobalActivityEvent): number {
  const reviewBoost = event.reviewRequired ? 80 : 0;
  const statusBoost = event.status === "blocked" || event.status === "needs-attention" ? 70 : 0;
  return SEVERITY_SCORE[event.severity] + TYPE_SCORE[event.type] + reviewBoost + statusBoost + event.priority;
}

export function classifyGlobalActivityPriority(event: GlobalActivityEvent): "critical" | "high" | "medium" | "low" {
  const score = scoreGlobalActivityEventPriority(event);
  if (score >= 1850) return "critical";
  if (score >= 1450) return "high";
  if (score >= 800) return "medium";
  return "low";
}

export function rankGlobalActivityEvents(events: readonly GlobalActivityEvent[]): GlobalActivityEvent[] {
  return [...events].sort((a, b) => {
    const priority = scoreGlobalActivityEventPriority(b) - scoreGlobalActivityEventPriority(a);
    if (priority !== 0) return priority;
    return a.id.localeCompare(b.id);
  });
}
