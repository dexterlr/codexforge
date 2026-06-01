import type { AssistedRouteQuality } from "./assisted-quality-types";

export function buildAssistedRouteQuality(): AssistedRouteQuality[] {
  return [
    { route: "/", primaryAction: "Start", nextStep: "/onboarding" },
    { route: "/onboarding", primaryAction: "First safe task", nextStep: "/first-task" },
    { route: "/first-task", primaryAction: "Start first task", nextStep: "/assist" },
    { route: "/assist", primaryAction: "Choose a goal", nextStep: "/files" },
    { route: "/files", primaryAction: "Pick a file", nextStep: "/guarded-apply-mvp" },
    { route: "/guarded-apply-mvp", primaryAction: "Review apply request", nextStep: "/apply-evidence" },
    { route: "/apply-evidence", primaryAction: "Capture evidence", nextStep: "/validation-results" },
    { route: "/validation-results", primaryAction: "Paste results", nextStep: "/review-inbox" },
    { route: "/review-inbox", primaryAction: "Review outcome", nextStep: "/run-history" },
    { route: "/recovery", primaryAction: "Recover safely", nextStep: "/runbook" },
    { route: "/run-history", primaryAction: "Review history", nextStep: "/demo" },
    { route: "/demo", primaryAction: "Run demo", nextStep: "/assisted-quality" },
  ];
}
