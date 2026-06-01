import type { OnboardingRouteGuide } from "./mvp-onboarding-types";

export function buildOnboardingRouteGuide(): OnboardingRouteGuide {
  return { title: "Route guide", routes: ["/assist", "/files", "/code-flow/live-run", "/guarded-apply-mvp", "/apply-evidence", "/validation-results", "/review-inbox", "/recovery", "/run-history", "/demo"] };
}
