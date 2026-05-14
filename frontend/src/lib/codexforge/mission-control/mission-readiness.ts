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
  const checks = health.dimensions.map((dimension) => ({
    id: dimension.id,
    label: dimension.label,
    level: dimension.readiness,
    detail: dimension.detail,
  }));
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
