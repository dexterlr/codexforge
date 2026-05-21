import type { WizardSafetyBadge } from "./workflow-wizard-types";

export function buildWizardSafetyBadge(badge: WizardSafetyBadge): WizardSafetyBadge {
  return badge;
}

export function buildWizardSafetySummary(badges: readonly WizardSafetyBadge[] = ["Review first", "Approval required", "No auto-run", "No file writes"]): string {
  return badges.map(buildWizardSafetyBadge).join(", ");
}

export function summarizeWizardSafety(badges: readonly WizardSafetyBadge[]): string {
  return `Safety: ${buildWizardSafetySummary(badges)}.`;
}
