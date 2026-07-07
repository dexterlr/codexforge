import {
  JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS,
} from "./jarvis-task-planner-tool-router-plans";
import type {
  JarvisTaskPlannerToolRouterCapabilityId,
  JarvisTaskPlannerToolRouterPlanRecord,
  JarvisTaskPlannerToolRouterRouteFocus,
  JarvisTaskPlannerToolRouterRouteHref,
  JarvisTaskPlannerToolRouterRouteSlug,
  JarvisTaskPlannerToolRouterRouteTitle,
} from "./jarvis-task-planner-tool-router-model";
import {
  JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTE_SPECS,
} from "./jarvis-task-planner-tool-router-model";

type JarvisTaskPlannerToolRouterRouteRecord = Readonly<{
  phaseNumber: number;
  phase: `Phase ${number}`;
  slug: JarvisTaskPlannerToolRouterRouteSlug;
  href: JarvisTaskPlannerToolRouterRouteHref;
  title: JarvisTaskPlannerToolRouterRouteTitle;
  focus: JarvisTaskPlannerToolRouterRouteFocus;
  summary: string;
  markerPhrases: readonly string[];
}>;

export type JarvisTaskPlannerToolRouterRouteModel = Readonly<{
  route: JarvisTaskPlannerToolRouterRouteRecord;
  routes: readonly JarvisTaskPlannerToolRouterRouteRecord[];
  capabilityFocus: JarvisTaskPlannerToolRouterCapabilityId | null;
  examples: readonly JarvisTaskPlannerToolRouterPlanRecord[];
  reviewHighlights: readonly string[];
}>;

const CAPABILITY_ROUTE_FOCUS: Partial<
  Record<JarvisTaskPlannerToolRouterRouteSlug, JarvisTaskPlannerToolRouterCapabilityId>
> = {
  "jarvis-task-planner-video-route-wiring": "video.generate",
  "jarvis-task-planner-website-route-wiring": "website.create",
  "jarvis-task-planner-avatar-route-wiring": "avatar.prepare",
  "jarvis-task-planner-chatbot-brain-route-wiring": "chatbot.plan",
  "jarvis-task-planner-trading-route-wiring": "trading.paperReview",
  "jarvis-task-planner-workflow-route-wiring": "workflow.prepare",
  "jarvis-task-planner-render-publish-route-wiring": "render.publishReview",
};

function buildRouteRecord(
  [phaseNumber, slug, href, title, focus]:
    (typeof JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTE_SPECS)[number]
): JarvisTaskPlannerToolRouterRouteRecord {
  return {
    phaseNumber,
    phase: `Phase ${phaseNumber}`,
    slug,
    href,
    title,
    focus,
    summary:
      `${title} keeps Jarvis task planner and tool router only, ` +
      "user goal review only, request envelope review only, plan graph review only, " +
      "capability selection review only, dry-run routing required, backend-only route required, " +
      "and human review required before any execution in one reusable review layer above the permission engine and shared backend adapter contract.",
    markerPhrases: [title, href, focus],
  };
}

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTES =
  JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTE_SPECS.map(buildRouteRecord);

export function buildJarvisTaskPlannerToolRouterRouteModel(
  routeSlug: JarvisTaskPlannerToolRouterRouteSlug
): JarvisTaskPlannerToolRouterRouteModel {
  const route = JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTES.find(
    (entry) => entry.slug === routeSlug
  );
  if (!route) {
    throw new Error(`Unknown Jarvis task planner route slug: ${routeSlug}`);
  }

  const capabilityFocus = CAPABILITY_ROUTE_FOCUS[routeSlug] ?? null;
  const examples = capabilityFocus
    ? JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS.filter(
        (record) => record.capabilityId === capabilityFocus
      )
    : JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS;

  return {
    route,
    routes: JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTES,
    capabilityFocus,
    examples,
    reviewHighlights: [
      route.focus,
      "dry-run routing required",
      "backend-only route required",
      "approval packet request readiness only",
      "human review required before any execution",
    ],
  };
}
