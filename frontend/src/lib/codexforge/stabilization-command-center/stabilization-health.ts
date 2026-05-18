import type {
  StabilizationCommandCenterInput,
  StabilizationHealthDimension,
  StabilizationHealthDimensionId,
  StabilizationHealthLevel,
  StabilizationHealthReport,
  StabilizationSignal,
  StabilizationSignalType,
} from "./stabilization-types";
import { buildStabilizationSignals } from "./stabilization-signal-model";

const LEVEL_SCORE: Record<StabilizationHealthLevel, number> = {
  ready: 100,
  "needs-review": 74,
  warning: 48,
  blocked: 0,
  unknown: 32,
};

const DIMENSION_SIGNAL_TYPES: Record<StabilizationHealthDimensionId, StabilizationSignalType[]> = {
  "build-health": ["build-posture"],
  "smoke-health": ["smoke-posture"],
  "regression-health": ["regression-posture"],
  "fix-queue-health": ["fix-queue-posture"],
  "patch-queue-health": ["patch-queue-posture"],
  "apply-gate-health": ["apply-gate-posture"],
  "verification-health": ["verification-posture", "unknown"],
  "rollback-readiness": ["rollback-posture"],
  "memory-review-posture": ["memory-review-posture"],
  "mission-control-posture": ["mission-readiness-posture"],
  "latest-message-authority-posture": [],
  "safety-posture": [],
};

function levelFromSignals(signals: readonly StabilizationSignal[], fallback: StabilizationHealthLevel): StabilizationHealthLevel {
  if (signals.some((signal) => signal.severity === "blocker")) return "blocked";
  if (signals.some((signal) => signal.severity === "risk")) return "warning";
  if (signals.some((signal) => signal.severity === "warning")) return "warning";
  if (signals.some((signal) => signal.severity === "info")) return "needs-review";
  if (signals.some((signal) => signal.severity === "ready")) return "ready";
  return fallback;
}

function overallLevelFromDimensions(dimensions: readonly StabilizationHealthDimension[]): StabilizationHealthLevel {
  if (dimensions.some((dimension) => dimension.level === "blocked")) return "blocked";
  if (dimensions.some((dimension) => dimension.level === "warning")) return "warning";
  if (dimensions.some((dimension) => dimension.level === "needs-review" || dimension.level === "unknown")) {
    return "needs-review";
  }
  return "ready";
}

export function buildStabilizationHealthDimension(args: {
  id: StabilizationHealthDimensionId;
  label: string;
  level: StabilizationHealthLevel;
  detail: string;
  nextAction: string;
  relatedSignals?: readonly string[] | null;
}): StabilizationHealthDimension {
  return {
    id: args.id,
    label: args.label,
    level: args.level,
    score: LEVEL_SCORE[args.level],
    detail: args.detail,
    nextAction: args.nextAction,
    relatedSignals: [...(args.relatedSignals ?? [])].sort(),
  };
}

export function buildStabilizationHealthReport(input: StabilizationCommandCenterInput = {}): StabilizationHealthReport {
  const signals = buildStabilizationSignals(input);

  function dimensionFromSignals(
    id: StabilizationHealthDimensionId,
    label: string,
    fallback: StabilizationHealthLevel,
    detail: string,
    nextAction: string
  ): StabilizationHealthDimension {
    const related = signals.filter((signal) => DIMENSION_SIGNAL_TYPES[id].includes(signal.type));
    return buildStabilizationHealthDimension({
      id,
      label,
      level: levelFromSignals(related, fallback),
      detail,
      nextAction,
      relatedSignals: related.map((signal) => signal.id),
    });
  }

  const latestAuthorityReady = input.latestMessageAuthorityPreserved === false ? "blocked" : "ready";
  const dimensions: StabilizationHealthDimension[] = [
    dimensionFromSignals("build-health", "build health", "unknown", "Build output is operator-supplied evidence and must be reviewed manually.", "Review build output before feature work."),
    dimensionFromSignals("smoke-health", "smoke health", "unknown", "Smoke posture is copied in from manual validation; this UI never runs smoke.", "Run targeted smoke manually and paste results."),
    dimensionFromSignals("regression-health", "regression health", "needs-review", "Regression triage remains the first reviewed repair surface after verification failure.", "Review regression triage."),
    dimensionFromSignals("fix-queue-health", "fix queue health", "needs-review", "Regression Fix Queue is a review-gated handoff queue only.", "Review regression fix queue."),
    dimensionFromSignals("patch-queue-health", "patch queue health", "needs-review", "Patch Preview Queue waits for Safe Patch Preview review.", "Prepare Safe Patch Preview only after review."),
    dimensionFromSignals("apply-gate-health", "apply gate health", "needs-review", "Apply gates are visible but not executable from stabilization.", "Review apply gate and keep mutation blocked."),
    dimensionFromSignals("verification-health", "verification health", "unknown", "Verification signals are context, not proof.", "Paste verification output."),
    dimensionFromSignals("rollback-readiness", "rollback readiness", "needs-review", "Rollback plan must be visible before future guarded apply.", "Prepare rollback."),
    dimensionFromSignals("memory-review-posture", "memory review posture", "needs-review", "Memory candidates stay review-required and are not auto-promoted.", "Review memory candidates in /memory."),
    dimensionFromSignals("mission-control-posture", "mission control posture", "needs-review", "Mission Control remains a read-only source of readiness context.", "Review Mission Control readiness."),
    buildStabilizationHealthDimension({
      id: "latest-message-authority-posture",
      label: "latest-message authority posture",
      level: latestAuthorityReady,
      detail: "Latest-message authority must be preserved before any handoff prompt is used.",
      nextAction: latestAuthorityReady === "ready" ? "Keep latest-message authority visible." : "Stop and restore latest-message authority.",
    }),
    buildStabilizationHealthDimension({
      id: "safety-posture",
      label: "safety posture",
      level: "ready",
      detail: "Stabilization is read-only: no auto-fix, no auto-rollback, no command execution, and no file writes.",
      nextAction: "Use copy-only review handoffs.",
    }),
  ];

  const score = Math.round(dimensions.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length);
  const overallLevel = overallLevelFromDimensions(dimensions);
  const blockers = dimensions
    .filter((dimension) => dimension.level === "blocked")
    .map((dimension) => `${dimension.label}: ${dimension.nextAction}`);
  const warnings = dimensions
    .filter((dimension) => dimension.level === "warning" || dimension.level === "unknown")
    .map((dimension) => `${dimension.label}: ${dimension.nextAction}`);
  const nextSafeAction =
    blockers.length > 0
      ? "stop and stabilize"
      : warnings.length > 0
        ? "paste verification output"
        : "commit clean checkpoint";

  return {
    id: "stabilization-health-report",
    overallLevel,
    score,
    dimensions,
    blockers,
    warnings,
    nextSafeAction,
    summary: summarizeStabilizationHealth({ overallLevel, score, dimensions, blockers, warnings, nextSafeAction }),
  };
}

export function summarizeStabilizationHealth(report: Pick<StabilizationHealthReport, "overallLevel" | "score" | "dimensions" | "blockers" | "warnings" | "nextSafeAction">): string[] {
  return [
    `Overall stabilization health is ${report.overallLevel} with score ${report.score}.`,
    `${report.blockers.length} health blocker(s) and ${report.warnings.length} warning or unknown dimension(s).`,
    `${report.dimensions.length} health dimensions include build health, smoke health, regression health, and safety posture.`,
    `Next safe action: ${report.nextSafeAction}.`,
  ];
}
