import type {
  CodexForgeNavigationRoute,
  CodexForgeRouteState,
  CodexForgeSafetyPostureItem,
} from "./navigation-shell-types";

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "") return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function detectCodexForgeActiveRoute(
  pathname: string,
  routes: readonly CodexForgeNavigationRoute[]
): CodexForgeNavigationRoute {
  const normalized = normalizePath(pathname);
  const active = routes.find((route) => {
    if (route.href === "/") return normalized === "/";
    return normalized === route.href || normalized.startsWith(`${route.href}/`);
  });

  return active ?? routes[0] ?? {
    id: "home",
    href: "/",
    label: "Operator Home Dashboard",
    shortLabel: "Home",
    description: "Command overview.",
    group: "Command",
    readiness: "available",
    safetyPosture: "local-first",
    badge: "Command",
    priority: 10,
    requiresReview: false,
    noMutation: true,
    commandDeckRole: "overview",
  };
}

export function buildCodexForgeRouteState(input: {
  pathname: string;
  routes: readonly CodexForgeNavigationRoute[];
  safetyPosture: readonly CodexForgeSafetyPostureItem[];
  workspaceLabel?: string;
}): CodexForgeRouteState {
  const activeRoute = detectCodexForgeActiveRoute(input.pathname, input.routes);
  const siblingRoutes = input.routes.filter(
    (route) => route.group === activeRoute.group && route.href !== activeRoute.href
  );
  const activeIndex = input.routes.findIndex((route) => route.href === activeRoute.href);
  const nextRouteSuggestion = input.routes[(activeIndex + 1) % input.routes.length];

  return {
    activeRoute,
    activeGroup: activeRoute.group,
    breadcrumbs: [
      { label: "CodexForge", href: "/" },
      { label: activeRoute.group, href: activeRoute.href },
      { label: activeRoute.label, href: activeRoute.href },
    ],
    siblingRoutes,
    nextRouteSuggestion,
    currentSafetyPosture: [...input.safetyPosture],
    workspaceLabel: input.workspaceLabel ?? activeRoute.label,
  };
}

export function summarizeCodexForgeRouteState(state: CodexForgeRouteState): string {
  return `${state.workspaceLabel}: ${state.activeRoute.href} in ${state.activeGroup}`;
}

