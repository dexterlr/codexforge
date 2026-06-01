import type { EmptyStateRouteMap } from "./smart-empty-state-types";

export function buildEmptyStateRouteMap(): EmptyStateRouteMap {
  return { title: "Routes covered", routes: ["/assist", "/first-task", "/files", "/guarded-apply-mvp", "/apply-evidence", "/validation-results", "/review-inbox", "/recovery", "/run-history", "/demo"] };
}
