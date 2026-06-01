import type { OnboardingFirstRun } from "./mvp-onboarding-types";

export function buildOnboardingFirstRun(): OnboardingFirstRun {
  return { title: "First run", steps: ["Choose one safe task.", "Pick one file.", "Preview the patch.", "Review apply separately.", "Capture evidence and validation output."] };
}
