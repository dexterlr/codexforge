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
