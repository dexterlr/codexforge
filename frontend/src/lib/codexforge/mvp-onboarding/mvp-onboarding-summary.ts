import { buildOnboardingCompletion } from "./onboarding-completion";
import { buildOnboardingFirstRun } from "./onboarding-first-run";
import { buildOnboardingHandoff } from "./onboarding-handoff";
import { buildOnboardingRouteGuide } from "./onboarding-route-guide";
import { buildOnboardingSafeTask } from "./onboarding-safe-task";
import { buildOnboardingSafetyPromise } from "./onboarding-safety-promise";
import { buildDefaultOnboardingSteps } from "./onboarding-step";
import type { MvpOnboardingSummary } from "./mvp-onboarding-types";

export function buildMvpOnboardingSummary(): MvpOnboardingSummary {
  return { title: "Start with CodexForge", subtitle: "Learn the safe coding flow in a few minutes.", primaryAction: "Start onboarding", steps: buildDefaultOnboardingSteps(), safeTask: buildOnboardingSafeTask(), safetyPromise: buildOnboardingSafetyPromise(), routeGuide: buildOnboardingRouteGuide(), firstRun: buildOnboardingFirstRun(), completion: buildOnboardingCompletion(), handoff: buildOnboardingHandoff() };
}
