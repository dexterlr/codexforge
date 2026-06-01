import type { ProviderSetupWizardStep } from "./provider-setup-wizard-types";

export function buildProviderSetupStep(input: ProviderSetupWizardStep): ProviderSetupWizardStep {
  return { ...input };
}

export function buildDefaultProviderSetupSteps(): ProviderSetupWizardStep[] {
  return [
    buildProviderSetupStep({
      id: "choose-provider",
      title: "Choose provider profile",
      status: "ready",
      route: "/ai-providers",
      plainEnglish: "Pick a provider profile such as manual ChatGPT, manual Claude, planned API, or local runtime.",
      safetyBoundary: "No login form and no real credential entry.",
    }),
    buildProviderSetupStep({
      id: "review-credential-strategy",
      title: "Review credential strategy",
      status: "ready",
      route: "/credentials",
      plainEnglish: "Confirm what metadata is allowed and what secret values are blocked.",
      safetyBoundary: "No raw passwords, no browser secret storage, and no provider calls.",
    }),
    buildProviderSetupStep({
      id: "select-routing-role",
      title: "Select routing role",
      status: "review",
      route: "/token-router",
      plainEnglish: "Choose whether this provider is best for private drafts, cheap summaries, or premium review.",
      safetyBoundary: "Routing is a deterministic recommendation only.",
    }),
    buildProviderSetupStep({
      id: "future-connector-review",
      title: "Future connector review",
      status: "blocked",
      route: "/ai-router",
      plainEnglish: "Automation waits until a separate reviewed connector and secure reference flow exists.",
      safetyBoundary: "No network calls in this phase.",
    }),
  ];
}

