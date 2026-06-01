export type ProviderSetupStepStatus = "ready" | "review" | "blocked";

export type ProviderSetupWizardStep = {
  id: string;
  title: string;
  status: ProviderSetupStepStatus;
  route: string;
  plainEnglish: string;
  safetyBoundary: string;
};

export type ProviderSetupWizardState = {
  id: "provider-setup-wizard";
  steps: ProviderSetupWizardStep[];
  currentStepId: string;
  nextAction: string;
  summary: string[];
};

