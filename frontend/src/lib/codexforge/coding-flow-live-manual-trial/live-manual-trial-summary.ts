import type { LiveManualTrialSummary, ManualTrialResultRecord, ManualTrialScenario, ManualTrialStepRunner } from "./live-manual-trial-types";

export function buildLiveManualTrialSummary(scenarios: ManualTrialScenario[], runner: ManualTrialStepRunner, record: ManualTrialResultRecord): LiveManualTrialSummary {
  return { title: "Run a manual coding trial", scenarioCount: scenarios.length, stepCount: runner.steps.length, status: record.status, nextAction: record.status === "pass" ? "Review release audit" : "Copy friction fix plan" };
}
