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
    | "mission"
    | "stabilization"
    | "workspace"
    | "tasks"
    | "brain"
    | "memory"
    | "memory-inbox"
    | "runtime-journal"
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
  priority: "primary" | "secondary";
  showInGlobalNav: boolean;
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
    priority: "secondary",
    showInGlobalNav: true,
    group: "Core",
    description: "Launchpad for every CodexForge product surface.",
  },
  {
    id: "mission",
    path: "/mission",
    label: "Mission Control",
    shortLabel: "Mission",
    priority: "primary",
    showInGlobalNav: true,
    group: "Core",
    description: "Unified readonly cockpit for health, surfaces, readiness, and safe next actions.",
  },
  {
    id: "stabilization",
    path: "/stabilization",
    label: "Stabilization",
    shortLabel: "Stabilize",
    priority: "primary",
    showInGlobalNav: true,
    group: "Core",
    description: "Read-only stabilization command center for build, smoke, verification, regression, queues, gates, and next safe action.",
  },
  {
    id: "workspace",
    path: "/ai",
    label: "Workspace",
    shortLabel: "Workspace",
    priority: "primary",
    showInGlobalNav: true,
    group: "Core",
    description: "Main AI workspace for chat, planning, memory, and execution context.",
  },
  {
    id: "tasks",
    path: "/tasks",
    label: "Tasks",
    shortLabel: "Tasks",
    priority: "primary",
    showInGlobalNav: true,
    group: "Core",
    description: "Task Memory Autopilot for review-gated suggestions, safe plan previews, and handoff prompts.",
  },
  {
    id: "brain",
    path: "/brain",
    label: "Brain",
    shortLabel: "Brain",
    priority: "primary",
    showInGlobalNav: true,
    group: "Intelligence",
    description: "Graph memory, predictive context, lineage, and workspace continuity.",
  },
  {
    id: "memory",
    path: "/memory",
    label: "Memory Review",
    shortLabel: "Memory",
    priority: "primary",
    showInGlobalNav: true,
    group: "Memory",
    description: "Deterministic memory candidate review, approval, and promotion event preview queue.",
  },
  {
    id: "memory-inbox",
    path: "/memory-inbox",
    label: "Memory Inbox",
    shortLabel: "Inbox",
    priority: "primary",
    showInGlobalNav: true,
    group: "Memory",
    description: "Personal Operator Memory Inbox for review-first memory capture and promotion preview.",
  },
  {
    id: "runtime-journal",
    path: "/runtime-journal",
    label: "Runtime Journal",
    shortLabel: "Journal",
    priority: "primary",
    showInGlobalNav: true,
    group: "Memory",
    description: "Read-only runtime event lifecycle journal for audit, policy, validation, reducer preview, and result visibility.",
  },
  {
    id: "files",
    path: "/files",
    label: "Files",
    shortLabel: "Files",
    priority: "primary",
    showInGlobalNav: true,
    group: "Engineering",
    description: "File intelligence, dependency context, and safe patch preview handoffs.",
  },
  {
    id: "runs",
    path: "/runs",
    label: "Runs",
    shortLabel: "Runs",
    priority: "primary",
    showInGlobalNav: true,
    group: "Execution",
    description: "Operator run queues, replay packets, approval gates, and artifacts.",
  },
  {
    id: "capabilities",
    path: "/capabilities",
    label: "Capabilities",
    shortLabel: "Capabilities",
    priority: "secondary",
    showInGlobalNav: true,
    group: "Execution",
    description: "Tool readiness, policy boundaries, adapter health, and production routing.",
  },
  {
    id: "creative",
    path: "/creative",
    label: "Creative",
    shortLabel: "Creative",
    priority: "secondary",
    showInGlobalNav: true,
    group: "Production",
    description: "Creative briefs, production plans, render previews, and artifact flow.",
  },
  {
    id: "history",
    path: "/history",
    label: "History",
    shortLabel: "History",
    priority: "secondary",
    showInGlobalNav: true,
    group: "Memory",
    description: "Activity intelligence, local timeline, notes, decisions, and exports.",
  },
  {
    id: "entry",
    path: "/entry",
    label: "Quick Launch",
    shortLabel: "Entry",
    priority: "secondary",
    showInGlobalNav: true,
    group: "Utility",
    description: "Structured task launchpad that hands off directly into Workspace.",
  },
  {
    id: "operator",
    path: "/clawd",
    label: "Operator",
    shortLabel: "Operator",
    priority: "secondary",
    showInGlobalNav: true,
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
