import type { ManualTrialScenario } from "./live-manual-trial-types";

export function buildManualTrialScenario(input: Partial<ManualTrialScenario> = {}): ManualTrialScenario {
  return {
    id: input.id ?? "safe-empty-state-copy",
    title: input.title ?? "Harmless empty-state wording trial",
    route: input.route ?? "/code-flow/live-run",
    safeFileCategory: input.safeFileCategory ?? "UI copy or empty-state wording only",
    blockedCategories: input.blockedCategories ?? ["package files", "config files", "tool-policy files", "runtime files", "Brain graph files", "secrets", "generated files", "broad diffs"],
    plainEnglishChange: input.plainEnglishChange ?? "Improve one short empty-state sentence without changing behavior.",
    safetyNotes: input.safetyNotes ?? ["safe file category only", "no secrets", "no generated file", "no broad diff", "approval required"],
  };
}

export function buildDefaultManualTrialScenarios(): ManualTrialScenario[] {
  return [buildManualTrialScenario()];
}
