import type {
  CodexForgeNavigationRoute,
  CodexForgeNavigationSection,
  CodexForgeNavigationShellSummary,
  CodexForgeRouteState,
  CodexForgeSafetyPostureItem,
  CodexForgeShellNextAction,
} from "./navigation-shell-types";

export function buildCodexForgeNavigationShellSummary(input: {
  routes: readonly CodexForgeNavigationRoute[];
  sections: readonly CodexForgeNavigationSection[];
  routeState: CodexForgeRouteState;
  safetyPosture: readonly CodexForgeSafetyPostureItem[];
  nextAction: CodexForgeShellNextAction;
}): CodexForgeNavigationShellSummary {
  return {
    routeCount: input.routes.length,
    groupCount: input.sections.length,
    activeRoute: input.routeState.activeRoute.label,
    activeGroup: input.routeState.activeGroup,
    safetyPostureCount: input.safetyPosture.length,
    nextAction: input.nextAction.label,
    noMutationStatus: input.routes.every((route) => route.noMutation)
      ? "all-routes-no-mutation"
      : "review-required",
  };
}

export function summarizeCodexForgeNavigationShellSession(
  summary: CodexForgeNavigationShellSummary
): string {
  return `${summary.routeCount} routes across ${summary.groupCount} groups; active ${summary.activeRoute}; ${summary.noMutationStatus}; next ${summary.nextAction}`;
}

