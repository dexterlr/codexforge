import type { OnboardingSafeTask } from "./mvp-onboarding-types";

export function buildOnboardingSafeTask(): OnboardingSafeTask {
  return { title: "Safe first task", detail: "Improve wording or fix a small UI issue in one file, then preview before apply review.", route: "/assist" };
}
