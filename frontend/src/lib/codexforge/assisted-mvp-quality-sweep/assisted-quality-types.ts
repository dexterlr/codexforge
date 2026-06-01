export type AssistedQualityCheck = { id: string; title: string; result: "ready" | "watch"; note: string };
export type AssistedRouteQuality = { route: string; primaryAction: string; nextStep: string };
export type AssistedCopyQuality = { title: string; rule: string };
export type AssistedSafetyQuality = { title: string; preserved: string[] };
export type AssistedEmptyStateQuality = { title: string; covered: string[] };
export type AssistedNavQuality = { title: string; routes: string[] };
export type AssistedQualityHandoff = { title: string; copyText: string };
export type AssistedMvpQualitySummary = { title: string; subtitle: string; primaryAction: string; readiness: string; checks: AssistedQualityCheck[]; routeQuality: AssistedRouteQuality[]; copyQuality: AssistedCopyQuality; safetyQuality: AssistedSafetyQuality; emptyStateQuality: AssistedEmptyStateQuality; navQuality: AssistedNavQuality; handoff: AssistedQualityHandoff };
