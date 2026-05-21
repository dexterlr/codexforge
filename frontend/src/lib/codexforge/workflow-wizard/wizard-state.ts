import type { WizardFlow, WizardIntentId, WizardState } from "./workflow-wizard-types";
import { buildDefaultWizardIntents, selectWizardIntent } from "./wizard-intent";
import { buildDefaultWizardFlows, selectWizardFlowForIntent } from "./wizard-flow";

export function buildWizardState(input: Partial<WizardState> = {}): WizardState {
  const intents = buildDefaultWizardIntents();
  const intent = selectWizardIntent(input.selectedIntentId ?? "fix-code", intents);
  const flow = input.selectedFlowId
    ? buildDefaultWizardFlows().find((item) => item.id === input.selectedFlowId) ?? selectWizardFlowForIntent(intent)
    : selectWizardFlowForIntent(intent);
  const currentStepId = input.currentStepId ?? flow?.steps[0]?.id ?? null;
  return {
    selectedIntentId: intent?.id ?? null,
    selectedFlowId: flow?.id ?? null,
    currentStepId,
    completedStepIds: input.completedStepIds ?? [],
    blockedStepIds: input.blockedStepIds ?? [],
    activeRoute: input.activeRoute ?? flow?.steps[0]?.route ?? "/start",
    lastUserChoiceLabel: input.lastUserChoiceLabel ?? intent?.label ?? "Fix code",
    nextAction: input.nextAction ?? flow?.steps[0]?.userActionLabel ?? "Choose what you want to do",
  };
}

export function updateWizardState(state: WizardState, update: Partial<WizardState> & { selectedIntentId?: WizardIntentId | null; flow?: WizardFlow | null }): WizardState {
  const nextIntent = update.selectedIntentId === undefined ? state.selectedIntentId : update.selectedIntentId;
  const intent = selectWizardIntent(nextIntent);
  const flow = update.flow ?? selectWizardFlowForIntent(intent);
  return buildWizardState({
    ...state,
    ...update,
    selectedIntentId: nextIntent,
    selectedFlowId: update.selectedFlowId ?? flow?.id ?? state.selectedFlowId,
    currentStepId: update.currentStepId ?? flow?.steps[0]?.id ?? state.currentStepId,
    activeRoute: update.activeRoute ?? flow?.steps[0]?.route ?? state.activeRoute,
    lastUserChoiceLabel: update.lastUserChoiceLabel ?? intent?.label ?? state.lastUserChoiceLabel,
    nextAction: update.nextAction ?? flow?.steps[0]?.userActionLabel ?? state.nextAction,
  });
}

export function summarizeWizardState(state: WizardState): string {
  return `Intent ${state.selectedIntentId ?? "none"}, flow ${state.selectedFlowId ?? "none"}, next ${state.nextAction}.`;
}
