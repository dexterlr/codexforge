import type {
  OperatorHomeLaunchCard,
  OperatorHomeLauncher,
  OperatorHomeLauncherGroup,
  OperatorHomeLauncherGroupId,
  OperatorHomeRouteItem,
  OperatorHomeRouteRegistry,
} from "./operator-home-types";
import { buildOperatorHomeStableKey } from "./operator-home-types";
import { buildOperatorHomeRoutes } from "./operator-home-routes";

const GROUP_ORDER: Array<{
  id: OperatorHomeLauncherGroupId;
  label: string;
  description: string;
  routeHrefs: OperatorHomeRouteItem["href"][];
}> = [
  {
    id: "core-cognition",
    label: "Core cognition",
    description: "AI Workspace and Brain runtime inspection.",
    routeHrefs: ["/ai", "/brain"],
  },
  {
    id: "engineering-workflow",
    label: "Engineering workflow",
    description: "Files, tasks, and preview-first engineering handoffs.",
    routeHrefs: ["/files", "/tasks"],
  },
  {
    id: "stabilization-and-safety",
    label: "Stabilization and safety",
    description: "Stabilization, verification, regression, global activity, and apply-gate posture.",
    routeHrefs: ["/stabilization", "/activity"],
  },
  {
    id: "activity-and-handoff",
    label: "Activity and handoff",
    description: "Activity Feed, Continuity Handoff, and operator history for local workflow continuity.",
    routeHrefs: ["/activity", "/handoff", "/history"],
  },
  {
    id: "creative-production",
    label: "Creative production",
    description: "Creative Studio and Capability Cockpit planning routes.",
    routeHrefs: ["/creative", "/capabilities"],
  },
  {
    id: "memory-and-evidence",
    label: "Memory and evidence",
    description: "Memory review, evidence, and Brain continuity.",
    routeHrefs: ["/memory", "/brain"],
  },
  {
    id: "operator-history",
    label: "Operator history",
    description: "Home and History routes for local workflow continuity.",
    routeHrefs: ["/history", "/"],
  },
];

function cardFromRoute(route: OperatorHomeRouteItem): OperatorHomeLaunchCard {
  return {
    id: buildOperatorHomeStableKey("operator-home-launch-card", route.id),
    href: route.href,
    label: route.label,
    description: route.description,
    badge: route.badge,
    readiness: route.readiness,
    riskPosture: route.riskPosture,
  };
}

function findRouteByHref(
  routes: readonly OperatorHomeRouteItem[],
  href: OperatorHomeRouteItem["href"]
) {
  return routes.find((route) => route.href === href);
}

export function buildOperatorHomeLauncherGroup(args: {
  id: OperatorHomeLauncherGroupId;
  label: string;
  description: string;
  cards: OperatorHomeLaunchCard[];
}): OperatorHomeLauncherGroup {
  return {
    id: args.id,
    label: args.label,
    description: args.description,
    cards: [...args.cards],
  };
}

export function buildOperatorHomeLauncher(
  registry: OperatorHomeRouteRegistry = buildOperatorHomeRoutes()
): OperatorHomeLauncher {
  const groups = GROUP_ORDER.map((group) =>
    buildOperatorHomeLauncherGroup({
      id: group.id,
      label: group.label,
      description: group.description,
      cards: group.routeHrefs
        .map((href) => findRouteByHref(registry.routes, href))
        .filter((route): route is OperatorHomeRouteItem => Boolean(route))
        .map(cardFromRoute),
    })
  ).filter((group) => group.cards.length > 0);

  return {
    id: "operator-home-launcher",
    groups,
    summary: summarizeOperatorHomeLauncher(groups),
  };
}

export function summarizeOperatorHomeLauncher(
  launcherOrGroups: OperatorHomeLauncher | readonly OperatorHomeLauncherGroup[]
): string[] {
  const groups = Array.isArray(launcherOrGroups)
    ? launcherOrGroups
    : (launcherOrGroups as OperatorHomeLauncher).groups;
  const cardCount = groups.reduce((sum, group) => sum + group.cards.length, 0);

  return [
    `${groups.length} launcher groups are visible.`,
    `${cardCount} ordered launch cards are link-only.`,
    "Launcher includes Core cognition, Engineering workflow, Stabilization and safety, Creative production, Memory and evidence, and Operator history when routes exist.",
  ];
}
