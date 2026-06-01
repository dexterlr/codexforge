import type { AssistedMvpQualitySummary } from "./assisted-quality-types";
import { buildAssistedCopyQuality } from "./assisted-copy-quality";
import { buildAssistedEmptyStateQuality } from "./assisted-empty-state-quality";
import { buildAssistedQualityCheck } from "./assisted-quality-check";
import { buildAssistedQualityHandoff } from "./assisted-quality-handoff";
import { buildAssistedRouteQuality } from "./assisted-route-quality";
import { buildAssistedSafetyQuality } from "./assisted-safety-quality";
import { buildAssistedNavQuality } from "./assisted-nav-quality";

export function buildAssistedMvpQualitySummary(): AssistedMvpQualitySummary {
  return {
    title: "Assisted MVP quality",
    subtitle: "Readiness result first, with details kept secondary.",
    primaryAction: "Copy quality sweep",
    readiness: "Ready for assisted novice trial",
    checks: [
      buildAssistedQualityCheck({ id: "copy", title: "Novice wording", result: "ready", note: "Main copy is plain and calm." }),
      buildAssistedQualityCheck({ id: "safety", title: "Safety boundaries", result: "ready", note: "Apply and validation remain separate." }),
      buildAssistedQualityCheck({ id: "empty", title: "Empty states", result: "ready", note: "Blank states now explain the next safe step." }),
    ],
    routeQuality: buildAssistedRouteQuality(),
    copyQuality: buildAssistedCopyQuality(),
    safetyQuality: buildAssistedSafetyQuality(),
    emptyStateQuality: buildAssistedEmptyStateQuality(),
    navQuality: buildAssistedNavQuality(),
    handoff: buildAssistedQualityHandoff(),
  };
}
