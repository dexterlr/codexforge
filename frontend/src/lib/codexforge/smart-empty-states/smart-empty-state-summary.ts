import type { SmartEmptyStateSummary } from "./smart-empty-state-types";
import { buildDefaultEmptyStateDefinitions } from "./empty-state-definition";
import { buildEmptyStateHelpCopy } from "./empty-state-help-copy";
import { buildEmptyStateNextAction } from "./empty-state-next-action";
import { buildEmptyStateRouteMap } from "./empty-state-route-map";
import { buildEmptyStateSafetyNote } from "./empty-state-safety-note";

export function buildSmartEmptyStateSummary(): SmartEmptyStateSummary {
  return { title: "Helpful empty states", subtitle: "Every quiet panel should explain what is missing and the next safe route.", primaryAction: "Copy empty-state checklist", definitions: buildDefaultEmptyStateDefinitions(), nextAction: buildEmptyStateNextAction(), helpCopy: buildEmptyStateHelpCopy(), routeMap: buildEmptyStateRouteMap(), safetyNote: buildEmptyStateSafetyNote() };
}
