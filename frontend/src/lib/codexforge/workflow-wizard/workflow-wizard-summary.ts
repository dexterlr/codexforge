import type { WizardFlow, WizardIntent, WizardState, WorkflowWizardSummary } from "./workflow-wizard-types";
import { selectWizardNextAction } from "./wizard-next-action";

export function buildWorkflowWizardSummary(intent: WizardIntent | null, flow: WizardFlow | null, state: WizardState): WorkflowWizardSummary {
  const currentStep = flow?.steps.find((step) => step.id === state.currentStepId) ?? flow?.steps[0] ?? null;
  const action = selectWizardNextAction(flow, state);
  return {
    selectedIntent: intent?.label ?? "None",
    selectedFlow: flow?.title ?? "None",
    currentStep: currentStep?.title ?? "Choose a task",
    stepCount: flow?.steps.length ?? 0,
    blockerCount: state.blockedStepIds.length,
    primaryAction: action.label,
    nextSafeAction: action.description,
    advancedDetailsCount: flow?.advancedRoutesHidden.length ?? 0,
  };
}

export function summarizeWorkflowWizardSession(summary: WorkflowWizardSummary): string {
  return `${summary.selectedIntent} uses ${summary.selectedFlow}; current step ${summary.currentStep}; next ${summary.primaryAction}.`;
}
