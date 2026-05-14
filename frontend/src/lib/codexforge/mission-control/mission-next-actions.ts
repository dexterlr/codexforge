import type { MissionNextAction } from "./mission-control-types";

export function buildMissionNextActions(): MissionNextAction[] {
  return [
    {
      id: "review-system-health",
      label: "Review system health",
      href: "/mission",
      priority: "primary",
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
