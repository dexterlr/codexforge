import type { AssistedCodingNextAction, AssistedCodingRouteRecommendation } from "./assisted-coding-mode-types";

export function buildAssistedCodingRouteRecommendation(nextAction: AssistedCodingNextAction): AssistedCodingRouteRecommendation {
  return { href: nextAction.href, label: nextAction.label, reason: nextAction.reason };
}
