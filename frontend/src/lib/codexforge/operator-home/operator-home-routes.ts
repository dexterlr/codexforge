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
  "/start": true,
  "/onboarding": true,
  "/first-task": true,
  "/safety-coach": true,
  "/help-empty-states": true,
  "/assisted-quality": true,
  "/assist": true,
  "/code-flow": true,
  "/ai": true,
  "/ai-router": true,
  "/brain": true,
  "/files": true,
  "/closed-loop": true,
  "/readiness": true,
  "/quality-audit": true,
  "/consolidation": true,
  "/handoff": true,
  "/stabilization": true,
  "/product-trial": true,
  "/runbook": true,
  "/mvp-experience": true,
};

const ROUTE_ORDER: OperatorHomeRoutePath[] = [
  "/",
  "/start",
  "/onboarding",
  "/first-task",
  "/safety-coach",
  "/help-empty-states",
  "/assisted-quality",
  "/assist",
  "/code-flow",
  "/ai",
  "/ai-router",
  "/brain",
  "/files",
  "/tasks",
  "/closed-loop",
  "/memory",
  "/creative",
  "/comfyui",
  "/capabilities",
  "/activity",
  "/readiness",
  "/quality-audit",
  "/consolidation",
  "/handoff",
  "/stabilization",
  "/history",
  "/product-trial",
  "/runbook",
  "/mvp-experience",
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
  "/start": {
    href: "/start",
    label: "Start",
    description:
      "Plain-English guided entrypoint for normal operators choosing the next safe workflow.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Use Start for guided choices before advanced operator surfaces.",
    badge: "Guide",
    requiredReview: false,
  },
  "/onboarding": {
    href: "/onboarding",
    label: "Start with CodexForge",
    description: "First-run guide for what CodexForge does, what remains manual, and how the safe coding flow works.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Use onboarding when the user is new or unsure where to begin.",
    badge: "Guide",
    requiredReview: false,
  },
  "/first-task": {
    href: "/first-task",
    label: "First Safe Task",
    description: "Guided first tiny wording change with preview, approval, evidence, validation, and recovery.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "approval-required",
    nextAction: "Start here when a novice needs one safe coding task.",
    badge: "First",
    requiredReview: true,
  },
  "/safety-coach": {
    href: "/safety-coach",
    label: "Safety Coach",
    description: "Plain-English safety explanations for the assisted coding path.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Use this when a term like preview, apply, validation, or rollback is unclear.",
    badge: "Coach",
    requiredReview: false,
  },
  "/help-empty-states": {
    href: "/help-empty-states",
    label: "Helpful Empty States",
    description: "Checklist for useful empty states across the novice assisted path.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Use this to keep quiet panels helpful and safe.",
    badge: "Help",
    requiredReview: false,
  },
  "/assisted-quality": {
    href: "/assisted-quality",
    label: "Assisted MVP Quality",
    description: "Read-only quality sweep for the novice assisted MVP path.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Use this after the novice path is wired to check copy, safety, and handoffs.",
    badge: "Sweep",
    requiredReview: false,
  },
  "/assist": {
    href: "/assist",
    label: "Assisted Coding",
    description: "Goal-based guide that recommends the next safe route without applying, running, or mutating.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "preview-only",
    nextAction: "Choose a coding goal and follow the recommended safe step.",
    badge: "Assist",
    requiredReview: true,
  },
  "/code-flow": {
    href: "/code-flow",
    label: "Fix code safely",
    description:
      "One real code-fix flow from file selection through preview, apply review, validation, and result routing.",
    domain: "engineering",
    readiness: "needs-review",
    riskPosture: "approval-required",
    nextAction: "Run a real code-fix flow manually without bypassing approval gates.",
    badge: "Code Flow",
    requiredReview: true,
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
  "/ai-router": {
    href: "/ai-router",
    label: "AI Router",
    description:
      "Preview-only model routing cockpit for provider metadata, task classification, and fallback route review.",
    domain: "ai-router",
    readiness: "needs-review",
    riskPosture: "preview-only",
    nextAction: "Review model route recommendations without storing API keys or calling providers.",
    badge: "Router",
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
  "/closed-loop": {
    href: "/closed-loop",
    label: "Closed Loop Fix",
    description:
      "Preview-only regression-to-fix workflow map for triage, patch preview, approval, validation output, and handoff.",
    domain: "fix",
    readiness: "needs-review",
    riskPosture: "approval-required",
    nextAction: "Review the closed-loop path before patch application or validation execution.",
    badge: "Fix",
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
  "/comfyui": {
    href: "/comfyui",
    label: "ComfyUI Adapter Preview",
    description:
      "Preview-only ComfyUI workflow manifest, prompt nodes, approval packet, and future executor handoff.",
    domain: "creative",
    readiness: "needs-review",
    riskPosture: "preview-only",
    nextAction: "Review workflow manifest and approval packet before any future ComfyUI executor boundary.",
    badge: "ComfyUI",
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
  "/readiness": {
    href: "/readiness",
    label: "Product Readiness Audit",
    description:
      "Read-only Product Readiness Audit for route, smoke, safety, UX, consolidation, and functional workflow posture.",
    domain: "readiness",
    readiness: "needs-review",
    riskPosture: "readonly",
    nextAction: "Review Product Readiness Audit before adding new feature surfaces.",
    badge: "Readiness",
    requiredReview: true,
  },
  "/quality-audit": {
    href: "/quality-audit",
    label: "System Quality Audit",
    description:
      "Read-only full system quality audit for bugs, route handoffs, smoke coverage, safety boundaries, and the coding MVP path.",
    domain: "quality-audit",
    readiness: "needs-review",
    riskPosture: "readonly",
    nextAction: "Review System Quality Audit before shipping broad UX or reliability changes.",
    badge: "Audit",
    requiredReview: true,
  },
  "/consolidation": {
    href: "/consolidation",
    label: "Consolidation Pass",
    description:
      "Read-only Phase 55 cockpit for surface map, route consolidation, shared readiness, safety copy, workflow entrypoints, and Phase 56 file reader planning.",
    domain: "consolidation",
    readiness: "needs-review",
    riskPosture: "readonly",
    nextAction: "Review Consolidation Pass before moving to Phase 56 Real Local Project Reader.",
    badge: "Phase 55",
    requiredReview: true,
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
  "/product-trial": {
    href: "/product-trial",
    label: "Manual Product Trial",
    description: "Manual MVP path trial for route checks, friction capture, validation, result, and demo handoff.",
    domain: "operator-home",
    readiness: "needs-review",
    riskPosture: "preview-only",
    nextAction: "Run the product trial manually and record real friction before demo review.",
    badge: "Trial",
    requiredReview: true,
  },
  "/runbook": {
    href: "/runbook",
    label: "Operator Runbook",
    description: "Recovery and rollback playbook for running, validating, and demoing the coding MVP.",
    domain: "operator-home",
    readiness: "ready",
    riskPosture: "readonly",
    nextAction: "Use the runbook before retrying blocked, failed, or unclear runs.",
    badge: "Runbook",
    requiredReview: false,
  },
  "/mvp-experience": {
    href: "/mvp-experience",
    label: "MVP Experience Lock",
    description: "Final route, copy, navigation, safety, and release demo readiness review.",
    domain: "operator-home",
    readiness: "needs-review",
    riskPosture: "preview-only",
    nextAction: "Copy the release demo handoff after manual trial evidence is reviewed.",
    badge: "Lock",
    requiredReview: true,
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
