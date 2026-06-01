import type { OnboardingCompletion } from "./mvp-onboarding-types";

export function buildOnboardingCompletion(): OnboardingCompletion {
  return { title: "Done when", doneWhen: ["The user knows the next safe route.", "Evidence is reviewed.", "Validation is captured separately.", "Failures route to recovery.", "Manual boundaries are clear."] };
}
