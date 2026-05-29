import type { MvpPathDefinition, MvpPathRouteMap } from "./mvp-working-path-types";

export function buildMvpPathRouteMap(definition: MvpPathDefinition): MvpPathRouteMap {
  return { routes: definition.steps.map((step) => step.route), advancedRoutesSecondary: true, noDuplicateRouteClouds: true };
}
