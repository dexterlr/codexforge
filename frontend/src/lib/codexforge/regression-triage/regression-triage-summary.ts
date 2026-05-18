import type {
  RegressionClassification,
  RegressionFixRecommendation,
  RegressionImpactMap,
  RegressionRollbackAdvice,
  RegressionSignal,
  RegressionSuspectedCause,
  RegressionTriageSummary,
} from "./regression-triage-types";

export function buildRegressionTriageSummary(args: {
  signals?: readonly RegressionSignal[] | null;
  classifications?: readonly RegressionClassification[] | null;
  suspectedCause?: RegressionSuspectedCause | null;
  impactMap?: RegressionImpactMap | null;
  rollbackAdvice?: RegressionRollbackAdvice | null;
  fixRecommendation?: RegressionFixRecommendation | null;
} = {}): RegressionTriageSummary {
  const signals = args.signals ?? [];
  const classifications = args.classifications ?? [];
  const impactedFileCount = args.impactMap?.items.length ?? 0;
  const fixRecommendationCount = args.fixRecommendation?.candidates.length ?? 0;
  const blockerCount = signals.filter((signal) => signal.severity === "blocker").length;
  const warningCount = signals.filter((signal) => signal.severity === "warning").length;
  const topSuspectedCause = args.suspectedCause?.topCandidate?.title ?? "No suspected cause yet";
  const rollbackUrgency = args.rollbackAdvice?.urgency ?? "low";
  const nextSafeAction =
    args.fixRecommendation?.candidates[0]?.kind === "investigation-needed"
      ? "Inspect failed output and impacted files before fix preview."
      : "Review regression triage, then copy Safe Patch Preview handoff.";

  return {
    id: "regression-triage-summary",
    signalCount: signals.length,
    blockerCount,
    warningCount,
    classificationCount: classifications.length,
    topSuspectedCause,
    impactedFileCount,
    rollbackUrgency,
    fixRecommendationCount,
    nextSafeAction,
    summary: summarizeRegressionTriageSession({
      signalCount: signals.length,
      blockerCount,
      warningCount,
      classificationCount: classifications.length,
      topSuspectedCause,
      impactedFileCount,
      rollbackUrgency,
      fixRecommendationCount,
      nextSafeAction,
    }),
  };
}

export function summarizeRegressionTriageSession(summary: Omit<RegressionTriageSummary, "id" | "summary"> | RegressionTriageSummary): string[] {
  return [
    `${summary.signalCount} signals, ${summary.blockerCount} blockers, and ${summary.warningCount} warnings are in triage.`,
    `${summary.classificationCount} classifications and ${summary.fixRecommendationCount} fix recommendations are visible.`,
    `Top suspected cause: ${summary.topSuspectedCause}.`,
    `${summary.impactedFileCount} impacted files mapped; rollback urgency is ${summary.rollbackUrgency}.`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
