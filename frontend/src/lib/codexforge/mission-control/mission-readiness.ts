import type { MissionReadinessLevel, MissionReadinessReport } from "./mission-control-types";
import { buildMissionHealthReport } from "./mission-health";

const READINESS_SCORE: Record<MissionReadinessLevel, number> = {
  ready: 100,
  "needs-review": 74,
  "preview-only": 62,
  "future-gated": 44,
  blocked: 0,
};

export function scoreMissionReadiness(levels: MissionReadinessLevel[]): number {
  if (levels.length === 0) return 0;
  const total = levels.reduce((sum, level) => sum + READINESS_SCORE[level], 0);
  return Math.round(total / levels.length);
}

function levelFromScore(score: number): MissionReadinessLevel {
  if (score >= 84) return "ready";
  if (score >= 68) return "needs-review";
  if (score >= 52) return "preview-only";
  if (score > 0) return "future-gated";
  return "blocked";
}

export function buildMissionReadiness(): MissionReadinessReport {
  const health = buildMissionHealthReport();
  const checks: MissionReadinessReport["checks"] = health.dimensions.map((dimension) => ({
    id: dimension.id,
    label: dimension.label,
    level: dimension.readiness,
    detail: dimension.detail,
  }));
  checks.push({
    id: "global-activity-feed-readiness",
    label: "Global Activity Feed readiness",
    level: "ready",
    detail:
      "Review activity feed for verification events, regression triage, fix queue, patch preview, apply gates, memory review, creative planning, stabilization, and next safe action; read-only, no auto-persistence, no command execution, no file writes, no Brain graph mutation, evidence is context not proof, and preserve latest-message authority.",
  });
  checks.push({
    id: "operator-memory-inbox-readiness",
    label: "Personal Operator Memory Inbox readiness",
    level: "needs-review",
    detail:
      "Review Memory Inbox candidates for confidence, importance, risk, dedupe, contradiction, and promotion preview; review required before promotion, no auto-promotion, no Brain graph mutation, no auto-merge, no auto-persistence, evidence is context not authority, and preserve latest-message authority.",
  });
  checks.push({
    id: "memory-promotion-gate-readiness",
    label: "Memory Promotion Gate readiness",
    level: "needs-review",
    detail:
      "Review Memory Promotion Gate approval packet, policy confirmation, memory.promoted event preview, request packet, and execution bridge; explicit approval required, appendEvent is not called from UI, execution remains blocked until a guarded runtime event executor exists, and no graph mutation occurs.",
  });
  checks.push({
    id: "guarded-runtime-event-executor-readiness",
    label: "Guarded Runtime Event Executor readiness",
    level: "needs-review",
    detail:
      "Review Runtime Event Executor request, policy, validation, explicit approval, reducer preview, audit ledger, and result; memory.promoted is the first allowed event type, direct UI graph mutation is blocked, appendEvent is only allowed inside executor boundary, no auto-promotion, evidence is context not authority, and preserve latest-message authority.",
  });
  checks.push({
    id: "regression-triage-readiness",
    label: "Self-Healing Regression Triage readiness",
    level: "needs-review",
    detail:
      "Review regression triage cards for failed or warning verification signals; suspected causes, impacted files, rollback advice, fix recommendations, and Safe Patch Preview handoff are visible with no auto-fix, no auto-rollback, and no mutation.",
  });
  checks.push({
    id: "regression-fix-queue-readiness",
    label: "Regression Fix Queue readiness",
    level: "needs-review",
    detail:
      "Review regression fix queue items before Safe Patch Preview and Preview Diff Composer handoff; queue is deterministic, local-first, review-gated, no auto-fix, no auto-rollback, no file writes, no command execution, and no Brain graph mutation.",
  });
  checks.push({
    id: "stabilization-command-center-readiness",
    label: "Stabilization Command Center readiness",
    level: "needs-review",
    detail:
      "Review Stabilization Command Center for build and smoke posture, verification signals, regression triage, fix queue, patch queue, apply gates, post-apply verification, next safest action, and copy-only handoff; no auto-fix, no auto-rollback, no command execution, no file writes, and no Brain graph mutation.",
  });
  checks.push({
    id: "patch-preview-queue-readiness",
    label: "Patch Preview Queue readiness",
    level: "needs-review",
    detail:
      "Queue reviewed patch previews for Safe Patch Preview handoff only; evidence is context, not proof, and current files must be verified.",
  });
  checks.push({
    id: "preview-diff-composer-readiness",
    label: "Preview Diff Composer readiness",
    level: "needs-review",
    detail:
      "Compose preview diff packages from queued patch preview items; pseudo diff only, not an applyable patch, current file content is authority, and no file writes without approval.",
  });
  checks.push({
    id: "patch-application-gate-readiness",
    label: "Patch Application Gate readiness",
    level: "needs-review",
    detail:
      "Prepare human-approved apply gate packets from preview diff packages; explicit human approval required, actual mutation remains blocked, apply-diff requires tool-policy approval, current files must be verified, rollback plan required, and preserve latest-message authority.",
  });
  checks.push({
    id: "apply-evidence-pack-readiness",
    label: "Apply Evidence Pack readiness",
    level: "needs-review",
    detail:
      "Bundle preview diff package, current file verification, target files, risk, rollback plan, test plan, approval packet, operator approval note, evidence refs, smoke placeholders, mutation firewall, and final readiness; evidence pack does not apply changes and is future guarded apply only.",
  });
  checks.push({
    id: "apply-diff-dry-run-readiness",
    label: "Apply-Diff Dry Run readiness",
    level: "needs-review",
    detail:
      "Review dry-run result from a human-approved apply packet; simulation only, no mutation, actual apply-diff remains blocked, pseudo diff alone is not applyable, current file verification required, rollback plan required, and preserve latest-message authority.",
  });
  checks.push({
    id: "apply-diff-execution-gate-readiness",
    label: "Apply-Diff Execution Gate readiness",
    level: "needs-review",
    detail:
      "Review approved apply request after a clean dry run; explicit operator approval required, apply-diff is approval-required, execute route is the guarded boundary, rollback plan required, verification required after dispatch, no silent execution, and preserve latest-message authority.",
  });
  const score = scoreMissionReadiness(checks.map((check) => check.level));

  return {
    id: "mission-readiness",
    score,
    level: levelFromScore(score),
    checks,
    summary: summarizeMissionReadiness(score, checks.map((check) => check.level)),
  };
}

export function summarizeMissionReadiness(
  reportOrScore: MissionReadinessReport | number,
  maybeLevels?: MissionReadinessLevel[]
): string[] {
  const score =
    typeof reportOrScore === "number" ? reportOrScore : reportOrScore.score;
  const levels =
    maybeLevels ?? (typeof reportOrScore === "number" ? [] : reportOrScore.checks.map((check) => check.level));
  const blockers = levels.filter((level) => level === "blocked").length;

  return [
    `Mission readiness score is ${score}.`,
    blockers === 0 ? "No blocked deterministic checks." : `${blockers} checks are blocked.`,
    "Preview-only and future-gated checks require explicit operator review before execution elsewhere.",
  ];
}
