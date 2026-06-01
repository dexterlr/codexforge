import type { AssistedNavQuality } from "./assisted-quality-types";

export function buildAssistedNavQuality(): AssistedNavQuality {
  return { title: "Navigation quality", routes: ["/onboarding", "/first-task", "/assist", "/files", "/guarded-apply-mvp", "/apply-evidence", "/validation-results", "/review-inbox", "/recovery", "/runbook", "/demo"] };
}
