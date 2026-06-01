import type { OnboardingHandoff } from "./mvp-onboarding-types";

export function buildOnboardingHandoff(): OnboardingHandoff {
  return { title: "Onboarding handoff", copyText: "First-run handoff: choose a safe task, preview before apply review, capture evidence, validate separately, review the result, and use recovery for failures." };
}
