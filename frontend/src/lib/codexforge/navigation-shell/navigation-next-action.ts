import type {
  CodexForgeNavigationRouteAvailability,
  CodexForgeNavigationRouteHref,
  CodexForgeShellNextAction,
  CodexForgeShellNextActionContext,
  CodexForgeShellNextActionPlan,
} from "./navigation-shell-types";

function isRouteAvailable(
  href: CodexForgeNavigationRouteHref,
  availability?: CodexForgeNavigationRouteAvailability
): boolean {
  return availability?.[href] !== false;
}

function routeAction(
  id: string,
  label: string,
  description: string,
  href: CodexForgeNavigationRouteHref,
  reason: CodexForgeShellNextAction["reason"]
): CodexForgeShellNextAction {
  return {
    id,
    label,
    description,
    href,
    reason,
    noMutation: true,
    requiresApproval: false,
  };
}

const CLEAN_CHECKPOINT_ACTION: CodexForgeShellNextAction = {
  id: "commit-clean-checkpoint",
  label: "Recommend commit clean checkpoint",
  description: "No urgent route is selected; preserve the clean checkpoint before the next phase.",
  reason: "clean-checkpoint",
  noMutation: true,
  requiresApproval: true,
};

const CONTINUE_NEXT_PHASE_ACTION: CodexForgeShellNextAction = {
  id: "continue-next-phase",
  label: "Continue next phase",
  description: "No blockers are visible; continue planning with the next reviewed CodexForge phase.",
  reason: "continue-next-phase",
  noMutation: true,
  requiresApproval: true,
};

export function selectCodexForgeShellNextAction(
  context: CodexForgeShellNextActionContext = {}
): CodexForgeShellNextAction {
  const availability = context.routeAvailability;

  if (context.hasStabilizationBlockers && isRouteAvailable("/stabilization", availability)) {
    return routeAction(
      "open-stabilization-blockers",
      "Open Stabilization Command Center",
      "Stabilization blockers route to /stabilization for build, smoke, and regression posture.",
      "/stabilization",
      "stabilization-blockers"
    );
  }

  if (context.wantsOperatorOverview && isRouteAvailable("/", availability)) {
    return routeAction(
      "open-operator-home",
      "Open Operator Home Dashboard",
      "Operator home overview routes to / for the unified command overview.",
      "/",
      "operator-home-overview"
    );
  }

  if (context.hasFileWork && isRouteAvailable("/files", availability)) {
    return routeAction(
      "open-files-command-center",
      "Open Files Command Center",
      "File work routes to /files for dependency, lineage, and preview-only planning.",
      "/files",
      "file-work"
    );
  }

  if (context.hasMemoryReview && isRouteAvailable("/memory", availability)) {
    return routeAction(
      "open-memory-review",
      "Open Memory Review",
      "Memory review routes to /memory when the route is available.",
      "/memory",
      "memory-review"
    );
  }

  if (context.hasRegressionOrFixWork) {
    const href = isRouteAvailable("/stabilization", availability) ? "/stabilization" : "/ai";
    return routeAction(
      "open-regression-fix-review",
      href === "/stabilization" ? "Review stabilization queue" : "Review in AI Workspace",
      "Regression or fix work routes to stabilization when present, otherwise AI Workspace.",
      href,
      "regression-or-fix"
    );
  }

  if (context.hasCreativeWork && isRouteAvailable("/creative", availability)) {
    return routeAction(
      "open-creative-production-studio",
      "Open Creative Production Studio",
      "Creative work routes to /creative when the route is available.",
      "/creative",
      "creative-work"
    );
  }

  if (context.cleanCheckpointRecommended) return CLEAN_CHECKPOINT_ACTION;

  return CONTINUE_NEXT_PHASE_ACTION;
}

export function buildCodexForgeShellNextActionPlan(
  context: CodexForgeShellNextActionContext = {}
): CodexForgeShellNextActionPlan {
  const candidates = [
    selectCodexForgeShellNextAction({ ...context, hasStabilizationBlockers: true }),
    selectCodexForgeShellNextAction({ ...context, wantsOperatorOverview: true }),
    selectCodexForgeShellNextAction({ ...context, hasFileWork: true }),
    selectCodexForgeShellNextAction({ ...context, hasMemoryReview: true }),
    selectCodexForgeShellNextAction({ ...context, hasRegressionOrFixWork: true }),
    selectCodexForgeShellNextAction({ ...context, hasCreativeWork: true }),
    CLEAN_CHECKPOINT_ACTION,
  ];
  const selected = selectCodexForgeShellNextAction(context);

  return {
    selected,
    candidates,
    summary: summarizeCodexForgeShellNextAction(selected),
  };
}

export function summarizeCodexForgeShellNextAction(
  action: CodexForgeShellNextAction
): string {
  return action.href ? `${action.label} -> ${action.href}` : action.label;
}

