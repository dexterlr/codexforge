import type { WizardFlow, WizardProgress, WizardState } from "./workflow-wizard-types";

export function buildWizardProgress(flow: WizardFlow | null, state: WizardState): WizardProgress {
  const steps = flow?.steps ?? [];
  const currentIndex = Math.max(0, steps.findIndex((step) => step.id === state.currentStepId));
  const blockedCount = state.blockedStepIds.length;
  const optionalCount = steps.filter((step) => step.status === "optional" || step.status === "advanced").length;
  return {
    totalSteps: steps.length,
    completedSteps: state.completedStepIds.length,
    currentStep: steps.length ? currentIndex + 1 : 0,
    blockedCount,
    optionalCount,
    progressLabel: steps.length ? `${state.completedStepIds.length}/${steps.length} done` : "Choose a workflow",
    nextStepLabel: steps[currentIndex]?.title ?? "Choose what you want to do",
  };
}

export function summarizeWizardProgress(progress: WizardProgress): string {
  return `${progress.progressLabel}; next: ${progress.nextStepLabel}.`;
}
