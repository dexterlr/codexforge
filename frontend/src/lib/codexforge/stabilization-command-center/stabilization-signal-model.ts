import type {
  StabilizationCommandCenterInput,
  StabilizationRelatedSurface,
  StabilizationSeverity,
  StabilizationSignal,
  StabilizationSignalSummary,
  StabilizationSignalType,
  StabilizationSource,
  StabilizationSummaryLike,
} from "./stabilization-types";
import {
  buildStabilizationStableKey,
  readStabilizationCount,
  uniqueStabilizationStrings,
} from "./stabilization-types";

const SEVERITY_RANK: Record<StabilizationSeverity, number> = {
  ready: 0,
  info: 1,
  warning: 2,
  risk: 3,
  blocker: 4,
};

function firstSummaryLine(summary?: StabilizationSummaryLike | null, fallback = "No supplied evidence yet."): string {
  const line = summary?.summary?.find((item) => item.trim());
  return line ?? fallback;
}

function severityFromSummary(
  summary: StabilizationSummaryLike | null | undefined,
  fallback: StabilizationSeverity
): StabilizationSeverity {
  if (!summary) return fallback;
  if (summary.blocked === true) return "blocker";
  if (summary.requestReady === false && summary.id?.includes("execution")) return "risk";
  if (readStabilizationCount(summary.blockerCount) > 0) return "blocker";
  if (readStabilizationCount(summary.blockedCount) > 0) return "risk";
  if (readStabilizationCount(summary.warningCount) > 0) return "warning";
  if (String(summary.level ?? summary.posture ?? summary.status ?? "").includes("blocked")) return "blocker";
  if (String(summary.level ?? summary.posture ?? summary.status ?? "").includes("warning")) return "warning";
  if (String(summary.level ?? summary.posture ?? summary.status ?? "").includes("ready")) return "ready";
  return fallback;
}

export function buildStabilizationSignal(args: {
  id?: string | null;
  type: StabilizationSignalType;
  severity?: StabilizationSeverity | null;
  title: string;
  detail: string;
  source: StabilizationSource;
  relatedSurface?: StabilizationRelatedSurface | null;
  relatedFiles?: readonly string[] | null;
  recommendedAction: string;
  reviewRequired?: boolean | null;
}): StabilizationSignal {
  const severity = args.severity ?? "info";
  return {
    id:
      args.id ??
      buildStabilizationStableKey("stabilization-signal", args.type, args.source, args.title),
    type: args.type,
    severity,
    title: args.title,
    detail: args.detail,
    source: args.source,
    relatedSurface: args.relatedSurface ?? "/stabilization",
    relatedFiles: uniqueStabilizationStrings(args.relatedFiles ?? []),
    recommendedAction: args.recommendedAction,
    reviewRequired: args.reviewRequired ?? severity !== "ready",
  };
}

export function buildStabilizationSignals(input: StabilizationCommandCenterInput = {}): StabilizationSignal[] {
  const relatedFiles = input.relatedFiles ?? [];
  const signals: StabilizationSignal[] = [
    buildStabilizationSignal({
      type: "build-posture",
      severity: severityFromSummary(input.buildSummary, "warning"),
      title: "Build posture",
      detail: firstSummaryLine(input.buildSummary, "Build result needs manual review before stabilization can be called clean."),
      source: "build",
      relatedSurface: "smoke suite",
      relatedFiles,
      recommendedAction: "Review latest build output manually; do not auto-run build from the UI.",
    }),
    buildStabilizationSignal({
      type: "smoke-posture",
      severity: severityFromSummary(input.smokeSummary, "warning"),
      title: "Smoke posture",
      detail: firstSummaryLine(input.smokeSummary, "Smoke result needs manual review before queue or patch work continues."),
      source: "smoke",
      relatedSurface: "smoke suite",
      relatedFiles,
      recommendedAction: "Run targeted smoke manually outside the UI and paste verification output.",
    }),
    buildStabilizationSignal({
      type: "regression-posture",
      severity: severityFromSummary(input.regressionTriageSummary, "info"),
      title: "Regression triage posture",
      detail: firstSummaryLine(input.regressionTriageSummary, "Regression triage is available for failed or warning verification signals."),
      source: "regression-triage",
      relatedSurface: "/files",
      relatedFiles,
      recommendedAction: "Review regression triage before any fix queue handoff.",
    }),
    buildStabilizationSignal({
      type: "fix-queue-posture",
      severity: severityFromSummary(input.regressionFixQueueSummary, "info"),
      title: "Regression fix queue posture",
      detail: firstSummaryLine(input.regressionFixQueueSummary, "Regression Fix Queue is ready for reviewed handoff only."),
      source: "regression-fix-queue",
      relatedSurface: "/files",
      relatedFiles,
      recommendedAction: "Review regression fix queue before Safe Patch Preview.",
    }),
    buildStabilizationSignal({
      type: "patch-queue-posture",
      severity: severityFromSummary(input.patchQueueSummary, "info"),
      title: "Patch queue posture",
      detail: firstSummaryLine(input.patchQueueSummary, "Patch Preview Queue waits for reviewed recommendations."),
      source: "patch-preview-queue",
      relatedSurface: "/files",
      relatedFiles,
      recommendedAction: "Prepare Safe Patch Preview only after queue review.",
    }),
    buildStabilizationSignal({
      type: "apply-gate-posture",
      severity: severityFromSummary(input.applyGateSummary, "info"),
      title: "Apply gate posture",
      detail: firstSummaryLine(input.applyGateSummary, "Patch Application Gate is display-only from stabilization."),
      source: "patch-application-gate",
      relatedSurface: "/files",
      relatedFiles,
      recommendedAction: "Review apply gate; actual mutation remains outside this dashboard.",
    }),
    buildStabilizationSignal({
      type: "verification-posture",
      severity: severityFromSummary(input.verificationIngestionSummary, "warning"),
      title: "Verification ingestion posture",
      detail: firstSummaryLine(input.verificationIngestionSummary, "Verification output should be pasted as evidence, not treated as proof."),
      source: "verification-ingestion",
      relatedSurface: "/jarvis",
      relatedFiles,
      recommendedAction: "Paste verification output and review normalized signals.",
    }),
    buildStabilizationSignal({
      type: "rollback-posture",
      severity: severityFromSummary(input.rollbackSummary ?? input.postApplyVerificationSummary, "info"),
      title: "Rollback posture",
      detail: firstSummaryLine(input.rollbackSummary ?? input.postApplyVerificationSummary, "Rollback plan must remain visible before any future guarded apply."),
      source: "post-apply-verification",
      relatedSurface: "/files",
      relatedFiles,
      recommendedAction: "Prepare rollback notes before execution gate review.",
    }),
    buildStabilizationSignal({
      type: "memory-review-posture",
      severity: severityFromSummary(input.memoryReviewSummary ?? input.brainMergeReviewSummary, "info"),
      title: "Memory review posture",
      detail: firstSummaryLine(input.memoryReviewSummary ?? input.brainMergeReviewSummary, "Memory candidates and Brain merge events remain review-required."),
      source: "memory-review",
      relatedSurface: "/memory",
      relatedFiles: [],
      recommendedAction: "Do not promote memory or mutate Brain graph from stabilization.",
    }),
    buildStabilizationSignal({
      type: "mission-readiness-posture",
      severity: severityFromSummary(input.missionReadinessSummary, "info"),
      title: "Mission readiness posture",
      detail: firstSummaryLine(input.missionReadinessSummary, "Mission Control readiness is context for review only."),
      source: "mission-control",
      relatedSurface: "/mission",
      relatedFiles: [],
      recommendedAction: "Use Mission Control as context, then decide the next safe stabilization action.",
    }),
  ];

  if (input.manualOperatorNote?.trim()) {
    signals.push(
      buildStabilizationSignal({
        type: "operator-warning",
        severity: "warning",
        title: "Manual operator note",
        detail: input.manualOperatorNote.trim(),
        source: "operator-note",
        relatedSurface: "/stabilization",
        relatedFiles,
        recommendedAction: "Review the operator note before changing stabilization state.",
      })
    );
  }

  if (!input.buildSummary && !input.smokeSummary && !input.verificationIngestionSummary) {
    signals.push(
      buildStabilizationSignal({
        type: "unknown",
        severity: "warning",
        title: "No live verification evidence supplied",
        detail: "The dashboard is using deterministic fallback posture. Evidence is context, not proof.",
        source: "unknown",
        relatedSurface: "/stabilization",
        relatedFiles,
        recommendedAction: "Paste verification output before continuing feature work.",
      })
    );
  }

  return signals.sort((a, b) => {
    const severityDelta = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
    if (severityDelta !== 0) return severityDelta;
    return a.id.localeCompare(b.id);
  });
}

export function summarizeStabilizationSignals(signals: readonly StabilizationSignal[]): StabilizationSignalSummary {
  const readyCount = signals.filter((signal) => signal.severity === "ready").length;
  const infoCount = signals.filter((signal) => signal.severity === "info").length;
  const warningCount = signals.filter((signal) => signal.severity === "warning").length;
  const riskCount = signals.filter((signal) => signal.severity === "risk").length;
  const blockerCount = signals.filter((signal) => signal.severity === "blocker").length;
  const reviewRequiredCount = signals.filter((signal) => signal.reviewRequired).length;
  const topSignal = signals[0] ?? null;

  return {
    id: "stabilization-signal-summary",
    totalSignals: signals.length,
    readyCount,
    infoCount,
    warningCount,
    riskCount,
    blockerCount,
    reviewRequiredCount,
    topSignal,
    summary: [
      `${signals.length} stabilization signals are visible.`,
      `${blockerCount} blockers, ${riskCount} risks, and ${warningCount} warnings require review.`,
      topSignal ? `Top signal: ${topSignal.title}.` : "No stabilization signals yet.",
      "Signals are deterministic and do not execute commands or read files.",
    ],
  };
}
