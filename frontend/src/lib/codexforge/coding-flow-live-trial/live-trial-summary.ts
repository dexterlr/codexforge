import type { LiveTrialSummary } from "./coding-flow-live-trial-types";
import { buildLiveTrialChecklist } from "./live-trial-checklist";
import { buildDefaultLiveTrialExampleChanges } from "./live-trial-example-change";
import { buildLiveTrialHandoff } from "./live-trial-handoff";
import { buildDefaultLiveTrialPlan } from "./live-trial-plan";
import { buildDefaultLiveTrialSafeFileChoices } from "./live-trial-safe-file-choice";
import { buildLiveTrialTroubleshooting } from "./live-trial-troubleshooting";
import { buildLiveTrialValidationGuide } from "./live-trial-validation-guide";

export function buildLiveTrialSummary(): LiveTrialSummary {
  const plan = buildDefaultLiveTrialPlan();
  const checklist = buildLiveTrialChecklist();
  const safeChoices = buildDefaultLiveTrialSafeFileChoices();
  const examples = buildDefaultLiveTrialExampleChanges();
  const validation = buildLiveTrialValidationGuide();
  const troubleshooting = buildLiveTrialTroubleshooting();
  const handoff = buildLiveTrialHandoff();
  return {
    summaryId: "coding-flow-live-trial-summary",
    planStatus: "ready",
    checklistCount: checklist.items.length,
    safeFileGuidanceReady: safeChoices.some((choice) => choice.posture === "safe"),
    exampleCount: examples.length,
    validationCommandCount: validation.commands.length,
    troubleshootingCount: troubleshooting.items.length,
    handoffReadiness: handoff.markdownTrialReport ? "ready" : "missing",
    nextSafeAction: plan.nextAction,
  };
}

export function summarizeLiveTrialSession(summary = buildLiveTrialSummary()): string {
  return `${summary.planStatus}: ${summary.checklistCount} checklist items, ${summary.exampleCount} examples, ${summary.validationCommandCount} validation commands. Next safe action: ${summary.nextSafeAction}.`;
}
