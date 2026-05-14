export type CodexForgeRouteGroup =
  | "Core"
  | "Intelligence"
  | "Engineering"
  | "Execution"
  | "Production"
  | "Memory"
  | "Utility";

export type CodexForgeRoute = {
  id:
    | "home"
    | "workspace"
    | "brain"
    | "files"
    | "runs"
    | "capabilities"
    | "creative"
    | "history"
    | "entry"
    | "operator";
  path: string;
  label: string;
  shortLabel: string;
  group: CodexForgeRouteGroup;
  description: string;
  status?: "available" | "planned";
};

export const CODEXFORGE_ROUTES: readonly CodexForgeRoute[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
    shortLabel: "Home",
    group: "Core",
    description: "Launchpad for every CodexForge product surface.",
  },
  {
    id: "workspace",
    path: "/ai",
    label: "Workspace",
    shortLabel: "Workspace",
    group: "Core",
    description: "Main AI workspace for chat, planning, memory, and execution context.",
  },
  {
    id: "brain",
    path: "/brain",
    label: "Brain",
    shortLabel: "Brain",
    group: "Intelligence",
    description: "Graph memory, predictive context, lineage, and workspace continuity.",
  },
  {
    id: "files",
    path: "/files",
    label: "Files",
    shortLabel: "Files",
    group: "Engineering",
    description: "File intelligence, dependency context, and safe patch preview handoffs.",
  },
  {
    id: "runs",
    path: "/runs",
    label: "Runs",
    shortLabel: "Runs",
    group: "Execution",
    description: "Operator run queues, replay packets, approval gates, and artifacts.",
  },
  {
    id: "capabilities",
    path: "/capabilities",
    label: "Capabilities",
    shortLabel: "Capabilities",
    group: "Execution",
    description: "Tool readiness, policy boundaries, adapter health, and production routing.",
  },
  {
    id: "creative",
    path: "/creative",
    label: "Creative",
    shortLabel: "Creative",
    group: "Production",
    description: "Creative briefs, production plans, render previews, and artifact flow.",
  },
  {
    id: "history",
    path: "/history",
    label: "History",
    shortLabel: "History",
    group: "Memory",
    description: "Activity intelligence, local timeline, notes, decisions, and exports.",
  },
  {
    id: "entry",
    path: "/entry",
    label: "Quick Launch",
    shortLabel: "Entry",
    group: "Utility",
    description: "Structured task launchpad that hands off directly into Workspace.",
  },
  {
    id: "operator",
    path: "/clawd",
    label: "Operator",
    shortLabel: "Operator",
    group: "Execution",
    description: "Approval-driven snapshot, plan, diff, apply, test, and checkpoint loop.",
  },
] as const;

export function getCodexForgeRoute(pathname: string): CodexForgeRoute | undefined {
  const normalized = pathname === "" ? "/" : pathname;

  return CODEXFORGE_ROUTES.find((route) => {
    if (route.path === "/") return normalized === "/";
    return normalized === route.path || normalized.startsWith(`${route.path}/`);
  });
}
