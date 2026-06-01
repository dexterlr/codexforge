import type { ProviderSetupWizardState, ProviderSetupWizardStep } from "./provider-setup-wizard-types";

export function buildProviderSetupWizardState(
  steps: ProviderSetupWizardStep[],
  currentStepId = "choose-provider"
): ProviderSetupWizardState {
  const current = steps.find((step) => step.id === currentStepId) ?? steps[0];

  return {
    id: "provider-setup-wizard",
    steps: steps.map((step) => ({ ...step })),
    currentStepId: current.id,
    nextAction: current.plainEnglish,
    summary: [
      "This wizard sets up safe provider profiles, not live provider access.",
      "Manual subscriptions remain manual handoff.",
      "API and local providers are profile planning only until reviewed later.",
    ],
  };
}

