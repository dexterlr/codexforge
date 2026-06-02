import type { LocalVsCloudSummary } from "./local-vs-cloud-types";
import { buildLocalVsCloudDecision } from "./local-vs-cloud-decision";
import { buildDefaultLocalVsCloudFactors } from "./local-vs-cloud-factor";
import { buildLocalVsCloudHandoff } from "./local-vs-cloud-handoff";
import { buildLocalVsCloudNextAction } from "./local-vs-cloud-next-action";
import { buildDefaultLocalVsCloudTasks } from "./local-vs-cloud-task";
import { buildLocalVsCloudTradeoff } from "./local-vs-cloud-tradeoff";

export function buildLocalVsCloudSummary(): LocalVsCloudSummary {
  const tasks = buildDefaultLocalVsCloudTasks();
  const decision = buildLocalVsCloudDecision(tasks[0]);
  const nextAction = buildLocalVsCloudNextAction(decision);
  const summary: LocalVsCloudSummary = {
    tasks,
    factors: buildDefaultLocalVsCloudFactors(),
    decision,
    tradeoff: buildLocalVsCloudTradeoff(decision),
    nextAction,
    handoff: buildLocalVsCloudHandoff(decision, nextAction),
    summary: "",
  };
  return { ...summary, summary: summarizeLocalVsCloudDecision(summary) };
}

export function summarizeLocalVsCloudDecision(summary: LocalVsCloudSummary): string {
  return `${summary.decision.decision} recommended: ${summary.decision.plainEnglish}`;
}
