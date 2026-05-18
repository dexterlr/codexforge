import type {
  StabilizationCommandCenterInput,
  StabilizationCommandCenterSessionSummary,
  StabilizationCommandCenterSummary,
} from "./stabilization-types";
import { buildStabilizationSignals, summarizeStabilizationSignals } from "./stabilization-signal-model";
import { buildStabilizationHealthReport } from "./stabilization-health";
import { buildStabilizationQueueRollup } from "./stabilization-queue-rollup";
import { buildStabilizationRiskBoard } from "./stabilization-risk-board";
import { buildStabilizationReadiness } from "./stabilization-readiness";
import { buildStabilizationTimeline } from "./stabilization-timeline";
import { buildStabilizationNextActionPlan } from "./stabilization-next-action";
import { buildStabilizationHandoff } from "./stabilization-handoff";

export function buildStabilizationCommandCenterSummary(input: StabilizationCommandCenterInput = {}): StabilizationCommandCenterSummary {
  const signals = buildStabilizationSignals(input);
  const signalSummary = summarizeStabilizationSignals(signals);
  const health = buildStabilizationHealthReport(input);
  const queueRollup = buildStabilizationQueueRollup(input);
  const riskBoard = buildStabilizationRiskBoard(input);
  const readiness = buildStabilizationReadiness(input);
  const timeline = buildStabilizationTimeline(input);
  const nextActionPlan = buildStabilizationNextActionPlan(input);
  const handoff = buildStabilizationHandoff(input);
  const sessionSummary = summarizeStabilizationCommandCenterSession({
    overallHealth: health.overallLevel,
    blockerCount: signalSummary.blockerCount + riskBoard.blockerCount + readiness.blockedCount,
    warningCount: signalSummary.warningCount + signalSummary.riskCount + riskBoard.warningCount + readiness.warningCount,
    queueCount: queueRollup.totalCount,
    readyQueueCount: queueRollup.readyCount,
    blockedQueueCount: queueRollup.blockedCount,
    topRisk: riskBoard.topRisk?.title ?? "No top risk yet",
    nextSafeAction: nextActionPlan.selected.action,
    validationRecommendation: handoff.validationCommands[0] ?? "Copy validation checklist manually.",
  });

  return {
    id: "stabilization-command-center-summary",
    signals,
    signalSummary,
    health,
    queueRollup,
    riskBoard,
    readiness,
    timeline,
    nextActionPlan,
    handoff,
    sessionSummary,
  };
}

export function summarizeStabilizationCommandCenterSession(
  summary: Omit<StabilizationCommandCenterSessionSummary, "id" | "summary">
): StabilizationCommandCenterSessionSummary {
  return {
    id: "stabilization-command-center-session-summary",
    ...summary,
    summary: [
      `Overall health: ${summary.overallHealth}.`,
      `${summary.blockerCount} blockers and ${summary.warningCount} warnings are visible.`,
      `${summary.queueCount} queue items, ${summary.readyQueueCount} ready, and ${summary.blockedQueueCount} blocked.`,
      `Top risk: ${summary.topRisk}.`,
      `Next safe action: ${summary.nextSafeAction}.`,
      `Validation recommendation: ${summary.validationRecommendation}.`,
    ],
  };
}
