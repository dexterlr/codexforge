import type { MissionNextAction } from "./mission-control-types";

export function buildMissionNextActions(): MissionNextAction[] {
  return [
    {
      id: "review-read-only-evidence-memory",
      label: "Review read-only evidence memory",
      href: "/memory",
      priority: "primary",
      readiness: "needs-review",
      safetyNote: "Evidence Memory converts read-only execution evidence into reviewable candidates only; Review required before memory promotion, Brain merge review required, and no graph mutation.",
    },
    {
      id: "execute-approved-read-only-step",
      label: "Execute approved read-only step",
      href: "/tasks",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Read-Only Step Execution runs only approved local read-only tools, captures visible evidence, and keeps mutation tools blocked.",
    },
    {
      id: "preview-task-step-run",
      label: "Preview a task step run",
      href: "/tasks",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Step Runner Preview prepares policy posture, approval packet, dry run plan, and result preview only; No step execution in Phase 25 and Future run requires approval.",
    },
    {
      id: "review-execution-readiness",
      label: "Review execution readiness",
      href: "/tasks",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Execution Readiness reviews step preflight, tool posture, risk, tests, and approval gates; execution blocked until approval.",
    },
    {
      id: "activate-reviewed-task",
      label: "Activate reviewed task",
      href: "/tasks",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Reviewed Task Activation creates a plan preview and /ai handoff only; no auto-run and no file mutation.",
    },
    {
      id: "review-task-suggestions",
      label: "Review task suggestions",
      href: "/tasks",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Task Autopilot is review required, preview-only, and never auto-runs tasks.",
    },
    {
      id: "review-system-health",
      label: "Review system health",
      href: "/mission",
      priority: "secondary",
      readiness: "ready",
      safetyNote: "Readonly review inside Mission Control.",
    },
    {
      id: "open-files-command-center",
      label: "Open Files Command Center",
      href: "/files",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Preview file context before any external action.",
    },
    {
      id: "search-brain-memory",
      label: "Search Brain memory",
      href: "/brain",
      priority: "secondary",
      readiness: "ready",
      safetyNote: "Deterministic local recall only; no graph mutation and inspect before editing.",
    },
    {
      id: "use-recalled-memory-in-chat",
      label: "Use recalled memory in chat",
      href: "/ai",
      priority: "secondary",
      readiness: "ready",
      safetyNote: "Chat recall context is opt-in, visible, and no hidden context injection is allowed.",
    },
    {
      id: "prepare-patch-preview",
      label: "Prepare patch preview",
      href: "/files",
      priority: "secondary",
      readiness: "preview-only",
      safetyNote: "Patch preparation remains preview-only here.",
    },
    {
      id: "build-production-pack",
      label: "Build production pack",
      href: "/production",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Pack export remains approval gated.",
    },
    {
      id: "review-artifact-workspace",
      label: "Review artifact workspace",
      href: "/artifacts",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Artifact workspace export requires explicit approval.",
    },
    {
      id: "review-artifact-ingestion-candidates",
      label: "Review artifact ingestion candidates",
      href: "/memory",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Read-only memory candidates and brain signals require review before promotion.",
    },
    {
      id: "review-memory-candidates",
      label: "Review memory candidates",
      href: "/memory",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Memory promotion requires explicit review state and produces preview events only.",
    },
    {
      id: "review-approved-memory-events",
      label: "Review approved memory events",
      href: "/memory",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Approved memory persistence writes only local event JSON and does not merge graph memory.",
    },
    {
      id: "review-brain-event-merge",
      label: "Review Brain event merge",
      href: "/memory",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Brain merge review is preview-only; explicit merge approval required before any future graph mutation.",
    },
    {
      id: "apply-approved-brain-merge",
      label: "Apply approved Brain merge",
      href: "/memory",
      priority: "secondary",
      readiness: "needs-review",
      safetyNote: "Approved Brain merge updates the local graph only after explicit approval, policy validation, and graph diff review.",
    },
    {
      id: "inspect-bridge-readiness",
      label: "Inspect bridge readiness",
      href: "/bridge",
      priority: "secondary",
      readiness: "future-gated",
      safetyNote: "Bridge consent remains guarded.",
    },
    {
      id: "open-operator-run-center",
      label: "Open Operator Run Center",
      href: "/runs",
      priority: "secondary",
      readiness: "preview-only",
      safetyNote: "No execution action is launched from Mission Control.",
    },
  ];
}

export function selectPrimaryMissionAction(
  actions: MissionNextAction[] = buildMissionNextActions()
): MissionNextAction {
  return actions.find((action) => action.priority === "primary") ?? actions[0];
}

export function summarizeMissionNextActions(
  actions: MissionNextAction[] = buildMissionNextActions()
): string[] {
  return [
    `${actions.length} safe next actions are available.`,
    "Every action navigates to a review surface instead of executing work.",
  ];
}
