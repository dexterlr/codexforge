import type {
  RuntimeEventReplaySession,
  RuntimeEventReplaySummary,
  RuntimeReplayImpactAnalysis,
  RuntimeReplayRiskReport,
  RuntimeReplaySimulation,
} from "./runtime-event-replay-types";

function nextActionFor(args: {
  simulation: RuntimeReplaySimulation;
  riskReport: RuntimeReplayRiskReport;
}): string {
  if (args.riskReport.blockerCount > 0) return "stop and stabilize";
  if (args.riskReport.reviewRequiredCount > 0) return "review runtime event replay";
  if (args.simulation.status === "simulation-complete") return "copy replay handoff for operator review";
  if (args.simulation.status === "no-events") return "select runtime journal events";
  if (args.simulation.status === "no-snapshot") return "select graph snapshot";
  return "inspect reducer preview";
}

export function buildRuntimeEventReplaySummary(args: {
  simulation: RuntimeReplaySimulation;
  impact: RuntimeReplayImpactAnalysis;
  riskReport: RuntimeReplayRiskReport;
}): RuntimeEventReplaySummary {
  const simulatedEventCount = args.simulation.steps.filter((step) => step.status === "simulated").length;
  const warningCount =
    args.simulation.warnings.length +
    args.impact.items.filter((item) => item.riskLevel === "warning").length +
    args.riskReport.warningCount;
  const summary: RuntimeEventReplaySummary = {
    id: "runtime-event-replay-summary",
    replayStatus: args.simulation.status,
    eventCount: args.simulation.steps.length,
    simulatedEventCount,
    blockedEventCount: args.simulation.blockedEventIds.length,
    warningCount,
    riskCount: args.riskReport.items.length,
    nodeDelta: args.impact.nodeDelta,
    edgeDelta: args.impact.edgeDelta,
    memoryPromotionCount: args.impact.memoryPromotionCount,
    topRisk: args.riskReport.topRisk?.title ?? "No replay risk detected",
    nextSafeAction: nextActionFor(args),
    summary: [],
  };

  return { ...summary, summary: summarizeRuntimeEventReplaySession(summary) };
}

export function summarizeRuntimeEventReplaySession(
  summaryOrSession: RuntimeEventReplaySummary | RuntimeEventReplaySession
): string[] {
  const summary =
    "replayStatus" in summaryOrSession
      ? summaryOrSession
      : summaryOrSession.summary;

  return [
    `Replay status: ${summary.replayStatus}.`,
    `${summary.simulatedEventCount}/${summary.eventCount} event(s) simulated; ${summary.blockedEventCount} blocked.`,
    `Node delta ${summary.nodeDelta}; edge delta ${summary.edgeDelta}; memory promotions ${summary.memoryPromotionCount}.`,
    `${summary.warningCount} warning(s), ${summary.riskCount} risk item(s).`,
    `Top risk: ${summary.topRisk}.`,
    `Next safe action: ${summary.nextSafeAction}.`,
  ];
}
