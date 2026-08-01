import type {
  CodexForgeNavigationRoute,
  CodexForgeRouteState,
  CodexForgeSafetyPostureItem,
} from "./navigation-shell-types";
import { CODEXFORGE_PRIMARY_PRODUCT_AREAS } from "./primary-product-area-model";

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
    group: "Start",
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
  const normalProductArea = CODEXFORGE_PRIMARY_PRODUCT_AREAS.find(
    (area) => area.href === activeRoute.href
  );
  const siblingRoutes = input.routes.filter(
    (route) => route.group === activeRoute.group && route.href !== activeRoute.href
  );
  const activeIndex = input.routes.findIndex((route) => route.href === activeRoute.href);
  const nextRouteSuggestion = input.routes[(activeIndex + 1) % input.routes.length];
  const breadcrumbs = activeRoute.href === "/"
    ? [{ label: "CodexForge", href: "/" as const }]
    : [
        { label: "CodexForge", href: "/" as const },
        { label: normalProductArea?.label ?? activeRoute.label, href: activeRoute.href },
      ];

  return {
    activeRoute,
    activeGroup: activeRoute.group,
    breadcrumbs,
    siblingRoutes,
    nextRouteSuggestion,
    currentSafetyPosture: [...input.safetyPosture],
    workspaceLabel: input.workspaceLabel ?? activeRoute.label,
  };
}

export function summarizeCodexForgeRouteState(state: CodexForgeRouteState): string {
  return `${state.workspaceLabel}: ${state.activeRoute.href} in ${state.activeGroup}`;
}
