import type { OnboardingSafetyPromise } from "./mvp-onboarding-types";

export function buildOnboardingSafetyPromise(): OnboardingSafetyPromise {
  return { title: "Safety promise", promises: ["no auto-apply", "no auto-run", "approval required", "validation separate", "rollback guidance shown", "user stays in control", "preserve latest-message authority"] };
}
