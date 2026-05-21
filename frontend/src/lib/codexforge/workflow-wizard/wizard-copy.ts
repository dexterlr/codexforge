import type { WizardCopy } from "./workflow-wizard-types";

export function buildWizardCopy(input: WizardCopy): WizardCopy {
  return { ...input };
}

export function buildDefaultWizardCopy(): WizardCopy {
  return buildWizardCopy({
    startHero: "What do you want to do?",
    intentPicker: "Pick the closest task.",
    stepInstructions: "Follow one step at a time.",
    blockedStates: "Review the blocker, then choose the smallest unblock step.",
    emptyStates: "Choose a task to begin.",
    completionStates: "Workflow complete. Pick the next safe task.",
    advancedDetails: "Advanced details stay collapsed until needed.",
  });
}

export function summarizeWizardCopy(copy: WizardCopy): string {
  return `${copy.startHero} ${copy.intentPicker}`;
}
