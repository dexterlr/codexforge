export * from "./navigation-shell-types";
export * from "./navigation-route-registry";
export * from "./navigation-section-model";
export * from "./navigation-safety-posture";
export * from "./navigation-next-action";
export * from "./navigation-route-state";
export * from "./navigation-shell-summary";
export * from "./primary-product-area-model";

export {
  buildCodexForgeNavigationRoute,
  buildCodexForgeNavigationRoutes,
  dedupeCodexForgeNavigationRouteInputs,
  dedupeCodexForgeNavigationRoutes,
  summarizeCodexForgeNavigationRoutes,
} from "./navigation-route-registry";
export {
  buildCodexForgeNavigationSection,
  buildCodexForgeNavigationSections,
  summarizeCodexForgeNavigationSections,
} from "./navigation-section-model";
export {
  buildCodexForgeNavigationSafetyPosture,
  buildCodexForgeSafetyPostureItem,
  summarizeCodexForgeNavigationSafetyPosture,
} from "./navigation-safety-posture";
export {
  buildCodexForgeShellNextActionPlan,
  selectCodexForgeShellNextAction,
  summarizeCodexForgeShellNextAction,
} from "./navigation-next-action";
export {
  buildCodexForgeRouteState,
  detectCodexForgeActiveRoute,
  summarizeCodexForgeRouteState,
} from "./navigation-route-state";
export {
  buildCodexForgeNavigationShellSummary,
  summarizeCodexForgeNavigationShellSession,
} from "./navigation-shell-summary";

export {
  CodexForgeAppShell,
  UnifiedCodexForgeShell,
  buildCodexForgeShellStableKey,
} from "./components/CodexForgeAppShell";
export { CodexForgeSidebar } from "./components/CodexForgeSidebar";
export { CodexForgeTopbar } from "./components/CodexForgeTopbar";
export { CodexForgeRouteSwitcher } from "./components/CodexForgeRouteSwitcher";
export { CodexForgeSafetyPostureStrip } from "./components/CodexForgeSafetyPostureStrip";
export { CodexForgeNextActionDock } from "./components/CodexForgeNextActionDock";
export { CodexForgeShellBreadcrumbs } from "./components/CodexForgeShellBreadcrumbs";
export { CodexForgeWorkspaceMap } from "./components/CodexForgeWorkspaceMap";
export { CodexForgeShellMobileNav } from "./components/CodexForgeShellMobileNav";
export { CodexForgeShellSafetyNotice } from "./components/CodexForgeShellSafetyNotice";
