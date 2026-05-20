import type { ReactNode } from "react";

export type CodexForgeNavigationRouteId =
  | "home"
  | "ai"
  | "ai-router"
  | "brain"
  | "files"
  | "tasks"
  | "closed-loop"
  | "memory"
  | "memory-inbox"
  | "runtime-journal"
  | "runtime-replay"
  | "brain-snapshots"
  | "snapshot-restore"
  | "brain-continuity"
  | "handoff"
  | "brain-governance"
  | "creative"
  | "artifacts-review"
  | "video-render"
  | "creative-executor"
  | "creative-sandbox"
  | "creative-readiness"
  | "creative-mvp"
  | "health-probe"
  | "local-bridge-health"
  | "blender"
  | "unreal"
  | "comfyui"
  | "creative-bridge"
  | "capabilities"
  | "activity"
  | "readiness"
  | "consolidation"
  | "validation"
  | "stabilization"
  | "history";

export type CodexForgeNavigationRouteHref =
  | "/"
  | "/ai"
  | "/ai-router"
  | "/brain"
  | "/files"
  | "/tasks"
  | "/closed-loop"
  | "/memory"
  | "/memory-inbox"
  | "/runtime-journal"
  | "/runtime-replay"
  | "/brain-snapshots"
  | "/snapshot-restore"
  | "/brain-continuity"
  | "/handoff"
  | "/brain-governance"
  | "/creative"
  | "/artifacts/review"
  | "/video-render"
  | "/creative-executor"
  | "/creative-sandbox"
  | "/creative-readiness"
  | "/creative-mvp"
  | "/health-probe"
  | "/local-bridge-health"
  | "/blender"
  | "/unreal"
  | "/comfyui"
  | "/creative-bridge"
  | "/capabilities"
  | "/activity"
  | "/readiness"
  | "/consolidation"
  | "/validation"
  | "/stabilization"
  | "/history";

export type CodexForgeNavigationGroup =
  | "Start"
  | "Build"
  | "Fix"
  | "Brain"
  | "Memory"
  | "Creative"
  | "Audit"
  | "Advanced";

export type CodexForgeNavigationReadiness =
  | "available"
  | "review-required"
  | "preview-only"
  | "blocked";

export type CodexForgeNavigationSafetyPosture =
  | "local-first"
  | "operator-safe"
  | "review-gated"
  | "read-only"
  | "approval-gated";

export type CodexForgeCommandDeckRole =
  | "overview"
  | "workspace"
  | "ai-router"
  | "graph"
  | "file-work"
  | "task-flow"
  | "closed-loop"
  | "memory-review"
  | "memory-inbox"
  | "runtime-journal"
  | "runtime-replay"
  | "brain-snapshots"
  | "snapshot-restore"
  | "brain-continuity"
  | "handoff"
  | "brain-governance"
  | "production"
  | "video-render-preview"
  | "creative-executor"
  | "creative-sandbox"
  | "creative-readiness"
  | "creative-mvp"
  | "health-probe"
  | "local-bridge-health"
  | "blender-preview"
  | "unreal-preview"
  | "comfyui-preview"
  | "creative-bridge"
  | "artifact-review"
  | "capability"
  | "activity-feed"
  | "readiness-audit"
  | "consolidation-pass"
  | "validation-runner"
  | "stabilization"
  | "timeline";

export type CodexForgeNavigationRoute = {
  id: CodexForgeNavigationRouteId;
  href: CodexForgeNavigationRouteHref;
  label: string;
  shortLabel: string;
  description: string;
  group: CodexForgeNavigationGroup;
  readiness: CodexForgeNavigationReadiness;
  safetyPosture: CodexForgeNavigationSafetyPosture;
  badge: string;
  priority: number;
  requiresReview: boolean;
  noMutation: boolean;
  commandDeckRole: CodexForgeCommandDeckRole;
};

export type CodexForgeNavigationRouteAvailability = Partial<
  Record<CodexForgeNavigationRouteHref, boolean>
>;

export type CodexForgeNavigationRouteInput =
  Partial<Omit<CodexForgeNavigationRoute, "href">> & {
    href: CodexForgeNavigationRouteHref;
  };

export type CodexForgeNavigationSection = {
  id: string;
  group: CodexForgeNavigationGroup;
  label: string;
  description: string;
  priority: number;
  routes: CodexForgeNavigationRoute[];
};

export type CodexForgeNavigationSectionInput = {
  group: CodexForgeNavigationGroup;
  routes: CodexForgeNavigationRoute[];
  label?: string;
  description?: string;
  priority?: number;
};

export type CodexForgeSafetyPostureItem = {
  id: string;
  label: string;
  summary: string;
  state: "enforced" | "review-required" | "visible";
  priority: number;
};

export type CodexForgeSafetyPostureInput = Partial<CodexForgeSafetyPostureItem> & {
  id: string;
};

export type CodexForgeShellNextActionReason =
  | "stabilization-blockers"
  | "operator-home-overview"
  | "file-work"
  | "memory-review"
  | "regression-or-fix"
  | "creative-work"
  | "clean-checkpoint"
  | "continue-next-phase";

export type CodexForgeShellNextAction = {
  id: string;
  label: string;
  description: string;
  href?: CodexForgeNavigationRouteHref;
  reason: CodexForgeShellNextActionReason;
  noMutation: boolean;
  requiresApproval: boolean;
};

export type CodexForgeShellNextActionContext = {
  activeHref?: string;
  hasStabilizationBlockers?: boolean;
  wantsOperatorOverview?: boolean;
  hasFileWork?: boolean;
  hasMemoryReview?: boolean;
  hasRegressionOrFixWork?: boolean;
  hasCreativeWork?: boolean;
  cleanCheckpointRecommended?: boolean;
  routeAvailability?: CodexForgeNavigationRouteAvailability;
};

export type CodexForgeShellNextActionPlan = {
  selected: CodexForgeShellNextAction;
  candidates: CodexForgeShellNextAction[];
  summary: string;
};

export type CodexForgeRouteBreadcrumb = {
  label: string;
  href: CodexForgeNavigationRouteHref;
};

export type CodexForgeRouteState = {
  activeRoute: CodexForgeNavigationRoute;
  activeGroup: CodexForgeNavigationGroup;
  breadcrumbs: CodexForgeRouteBreadcrumb[];
  siblingRoutes: CodexForgeNavigationRoute[];
  nextRouteSuggestion?: CodexForgeNavigationRoute;
  currentSafetyPosture: CodexForgeSafetyPostureItem[];
  workspaceLabel: string;
};

export type CodexForgeNavigationShellSummary = {
  routeCount: number;
  groupCount: number;
  activeRoute: string;
  activeGroup: CodexForgeNavigationGroup;
  safetyPostureCount: number;
  nextAction: string;
  noMutationStatus: "all-routes-no-mutation" | "review-required";
};

export type CodexForgeAppShellProps = {
  children: ReactNode;
  activePath?: string;
  workspaceLabel?: string;
  routeAvailability?: CodexForgeNavigationRouteAvailability;
  nextActionContext?: CodexForgeShellNextActionContext;
  sidebarMode?: "full" | "compact" | "collapsed";
  defaultSidebarCollapsed?: boolean;
  focusMode?: boolean;
  showSidebarBadges?: boolean;
  showSidebarSafetyNotice?: boolean;
  showRightRail?: boolean;
  contentMaxWidth?: number | "standard" | "wide" | "full";
  pageChrome?: "minimal" | "standard" | "dashboard";
  showRouteTray?: boolean;
  routeTrayDefaultOpen?: boolean;
  showHeroRouteChips?: boolean;
  showRightRailRouteGroups?: boolean;
  showSafetyStrip?: boolean;
  pageDensity?: "compact" | "standard" | "focus";
};
