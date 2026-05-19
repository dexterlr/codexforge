import type {
  OperatorHomeHealthLevel,
  OperatorHomeRiskPosture,
  OperatorHomeRouteAvailability,
  OperatorHomeRouteDomain,
  OperatorHomeRouteItem,
  OperatorHomeRoutePath,
  OperatorHomeRouteRegistry,
} from "./operator-home-types";
import { buildOperatorHomeStableKey } from "./operator-home-types";

const DEFAULT_ROUTE_AVAILABILITY: OperatorHomeRouteAvailability = {
  "/": true,
  "/ai": true,
  "/brain": true,
  "/files": true,
  "/handoff": true,
  "/stabilization": true,
};

const ROUTE_ORDER: OperatorHomeRoutePath[] = [
  "/",
  "/ai",
  "/brain",
  "/files",
  "/tasks",
  "/memory",
  "/creative",
  "/capabilities",
  "/activity",
  "/handoff",
  "/stabilization",
  "/history",
];

type RouteDefinition = {
  href: OperatorHomeRoutePath;
  label: string;
  description: string;
  domain: OperatorHomeRouteDomain;
  readiness: OperatorHomeHealthLevel;
  riskPosture: OperatorHomeRiskPosture;
  nextAction: string;
  badge: string;
  requiredReview: boolean;
};

const ROUTE_DEFINITIONS: Record<OperatorHomeRoutePath, RouteDefinition> = {
  "/": {
    href: "/",
    label: "Operator Home",
    description:
      "Read-only command deck for launch, status, safety posture, and the next safe operator action.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Use Home as the launch dashboard before entering mutation-capable workflows.",
    badge: "Home",
    requiredReview: false,
  },
  "/ai": {
    href: "/ai",
    label: "AI Workspace",
    description:
      "Planning, chat, evidence-grounded prompts, patch queues, and apply-gate review handoffs.",
    domain: "engineering",
    readiness: "ready",
    riskPosture: "preview-only",
    nextAction: "Open when verification, regression, or patch handoff needs review.",
    badge: "Workspace",
    requiredReview: true,
  },
  "/brain": {
    href: "/brain",
    label: "Brain",
    description:
      "Brain runtime inspection, recall, graph context, lineage, health, and cognitive continuity.",
    domain: "cognition",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Inspect runtime memory and recall signals without mutating the graph.",
    badge: "Cognition",
    requiredReview: false,
  },
  "/files": {
    href: "/files",
    label: "Files",
    description:
      "Files Command Center for file context, workflow risk, safe plan review, and patch preview handoff.",
    domain: "engineering",
    readiness: "needs-review",
    riskPosture: "preview-only",
    nextAction: "Review file workflow before any edit path.",
    badge: "Files",
    requiredReview: true,
  },
  "/tasks": {
    href: "/tasks",
    label: "Tasks",
    description:
      "Task Autopilot, reviewed activation, execution readiness, step preview, and read-only evidence capture.",
    domain: "tasks",
    readiness: "needs-review",
    riskPosture: "preview-only",
    nextAction: "Review task suggestions and execution readiness before any run.",
    badge: "Tasks",
    requiredReview: true,
  },
  "/memory": {
    href: "/memory",
    label: "Memory",
    description:
      "Memory review queue, evidence candidates, promotion previews, persistence ledger, and Brain merge review.",
    domain: "memory",
    readiness: "needs-review",
    riskPosture: "preview-only",
    nextAction: "Review memory candidates; do not auto-promote.",
    badge: "Memory",
    requiredReview: true,
  },
  "/creative": {
    href: "/creative",
    label: "Creative",
    description:
      "Creative Production Studio for briefs, storyboard planning, render queue previews, and artifact handoffs.",
    domain: "creative",
    readiness: "ready",
    riskPosture: "preview-only",
    nextAction: "Review active creative production planning.",
    badge: "Studio",
    requiredReview: true,
  },
  "/capabilities": {
    href: "/capabilities",
    label: "Capabilities",
    description:
      "Capability Cockpit for tool readiness, policy boundaries, adapter health, and production routing.",
    domain: "capabilities",
    readiness: "needs-review",
    riskPosture: "approval-required",
    nextAction: "Review capability policy before guarded handoff.",
    badge: "Policy",
    requiredReview: true,
  },
  "/activity": {
    href: "/activity",
    label: "Activity Feed",
    description:
      "Global Activity Feed for read-only verification, regression, patch workflow, apply gates, memory review, creative planning, stabilization, and next safe action.",
    domain: "activity",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Review Activity Feed before moving from evidence to mutation-capable gates.",
    badge: "Activity",
    requiredReview: false,
  },
  "/handoff": {
    href: "/handoff",
    label: "Continuity Handoff",
    description:
      "Continuity Handoff Packet for current state, risks, validation, rollback posture, memory posture, Brain continuity posture, and next safe actions.",
    domain: "handoff",
    readiness: "needs-review",
    riskPosture: "readonly",
    nextAction: "Create continuity handoff before continuing the next phase.",
    badge: "Handoff",
    requiredReview: true,
  },
  "/stabilization": {
    href: "/stabilization",
    label: "Stabilization",
    description:
      "Stabilization Command Center for build, smoke, verification, regression, queue, and apply-gate posture.",
    domain: "stabilization",
    readiness: "needs-review",
    riskPosture: "readonly",
    nextAction: "Review blockers, warnings, and the next safest action.",
    badge: "Safety",
    requiredReview: true,
  },
  "/history": {
    href: "/history",
    label: "History",
    description:
      "Operator history and activity intelligence for launches, notes, decisions, and local workflow continuity.",
    domain: "history",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Review recent operator workflow context.",
    badge: "History",
    requiredReview: false,
  },
};

export function buildOperatorHomeRouteItem(args: {
  href: OperatorHomeRoutePath;
  label?: string;
  description?: string;
  domain?: OperatorHomeRouteDomain;
  readiness?: OperatorHomeHealthLevel;
  riskPosture?: OperatorHomeRiskPosture;
  nextAction?: string;
  badge?: string;
  requiredReview?: boolean;
}): OperatorHomeRouteItem {
  const definition = ROUTE_DEFINITIONS[args.href];

  return {
    id: buildOperatorHomeStableKey("operator-home-route", args.href),
    href: args.href,
    label: args.label ?? definition.label,
    description: args.description ?? definition.description,
    domain: args.domain ?? definition.domain,
    readiness: args.readiness ?? definition.readiness,
    riskPosture: args.riskPosture ?? definition.riskPosture,
    nextAction: args.nextAction ?? definition.nextAction,
    badge: args.badge ?? definition.badge,
    requiredReview: args.requiredReview ?? definition.requiredReview,
  };
}

export function buildOperatorHomeRoutes(
  availability: OperatorHomeRouteAvailability = DEFAULT_ROUTE_AVAILABILITY
): OperatorHomeRouteRegistry {
  const routeAvailability = {
    ...DEFAULT_ROUTE_AVAILABILITY,
    ...availability,
  };
  const routes = ROUTE_ORDER.filter((href) => routeAvailability[href]).map((href) =>
    buildOperatorHomeRouteItem({ href })
  );

  return {
    id: "operator-home-route-registry",
    routes,
    summary: summarizeOperatorHomeRoutes(routes),
  };
}

export function summarizeOperatorHomeRoutes(routes: readonly OperatorHomeRouteItem[]): string[] {
  const reviewCount = routes.filter((route) => route.requiredReview).length;
  const readyCount = routes.filter((route) => route.readiness === "ready").length;
  const approvalCount = routes.filter((route) => route.riskPosture === "approval-required").length;

  return [
    `${routes.length} existing operator routes are registered.`,
    `${readyCount} routes are ready and ${reviewCount} routes require review.`,
    `${approvalCount} route(s) expose approval-required posture through links only.`,
  ];
}
