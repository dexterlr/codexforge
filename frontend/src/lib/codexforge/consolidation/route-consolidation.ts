import type { RouteConsolidationClass, RouteConsolidationItem, RouteConsolidationPlan } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";

const ROUTES: readonly Omit<RouteConsolidationItem, "id">[] = [
  { route: "/", label: "Operator Home", classification: "primary route", prominence: "primary", keepRoute: true, targetSurface: "Command Deck", rationale: "Primary start point for operator status and launch." },
  { route: "/ai", label: "AI Workspace", classification: "primary route", prominence: "primary", keepRoute: true, targetSurface: "Command Deck", rationale: "Primary planning and handoff workspace." },
  { route: "/files", label: "Project Reader", classification: "primary route", prominence: "primary", keepRoute: true, targetSurface: "Engineering Workflow", rationale: "Primary route for File Reader v1 functional/read-only and Phase 57 Real Patch Preview v1 handoff." },
  { route: "/stabilization", label: "Stabilization", classification: "primary route", prominence: "primary", keepRoute: true, targetSurface: "Operations hub", rationale: "Primary operations, validation, and risk review hub." },
  { route: "/readiness", label: "Product Readiness", classification: "primary route", prominence: "primary", keepRoute: true, targetSurface: "Operator checkpoint", rationale: "Primary product checkpoint before phase transitions." },
  { route: "/handoff", label: "Continuity Handoff", classification: "primary route", prominence: "primary", keepRoute: true, targetSurface: "Operator checkpoint", rationale: "Primary next-session handoff route." },
  { route: "/activity", label: "Global Activity", classification: "secondary audit route", prominence: "secondary", keepRoute: true, targetSurface: "History/Audit", rationale: "Useful evidence surface but not a start point." },
  { route: "/brain", label: "Brain", classification: "secondary audit route", prominence: "secondary", keepRoute: true, targetSurface: "Brain Continuity", rationale: "Important inspection surface with current behavior preserved." },
  { route: "/brain-continuity", label: "Brain Continuity", classification: "secondary audit route", prominence: "secondary", keepRoute: true, targetSurface: "Brain Continuity", rationale: "Consolidates several Brain runtime postures." },
  { route: "/memory-inbox", label: "Memory Inbox", classification: "secondary audit route", prominence: "secondary", keepRoute: true, targetSurface: "Memory", rationale: "Review surface before promotion, not a primary start point." },
  { route: "/creative", label: "Creative", classification: "secondary audit route", prominence: "secondary", keepRoute: true, targetSurface: "Creative", rationale: "Keep visible for creative workflows." },
  { route: "/capabilities", label: "Capabilities", classification: "secondary audit route", prominence: "secondary", keepRoute: true, targetSurface: "Capability review", rationale: "Policy and capability review remain accessible." },
  { route: "/runtime-journal", label: "Runtime Journal", classification: "deep governance route", prominence: "advanced/audit", keepRoute: true, targetSurface: "Advanced / Audit", rationale: "Deep audit route should stay accessible via links and command palette." },
  { route: "/runtime-replay", label: "Runtime Replay", classification: "deep governance route", prominence: "advanced/audit", keepRoute: true, targetSurface: "Advanced / Audit", rationale: "Deep replay route should be grouped under audit." },
  { route: "/brain-governance", label: "Brain Governance", classification: "deep governance route", prominence: "advanced/audit", keepRoute: true, targetSurface: "Advanced / Audit", rationale: "Deep governance route remains linkable and smoke-backed." },
  { route: "/brain-snapshots", label: "Brain Snapshots", classification: "deep governance route", prominence: "advanced/audit", keepRoute: true, targetSurface: "Advanced / Audit", rationale: "Snapshot manager is useful but not primary." },
  { route: "/snapshot-restore", label: "Snapshot Restore", classification: "deep governance route", prominence: "advanced/audit", keepRoute: true, targetSurface: "Advanced / Audit", rationale: "Restore gate is deep audit, restore blocked by default." },
  { route: "/tasks", label: "Tasks", classification: "workflow route", prominence: "secondary", keepRoute: true, targetSurface: "Engineering Workflow", rationale: "Workflow route after files and readiness." },
  { route: "/memory", label: "Memory", classification: "workflow route", prominence: "link-only", keepRoute: true, targetSurface: "Memory", rationale: "Candidate for link-only access behind Memory Inbox and promotion gate." },
  { route: "/history", label: "History", classification: "legacy/compat route", prominence: "link-only", keepRoute: true, targetSurface: "History/Audit", rationale: "Keep for compatibility and local timeline access." },
];

export function buildRouteConsolidationItem(input: Omit<RouteConsolidationItem, "id">): RouteConsolidationItem {
  return { id: buildConsolidationStableKey("route-consolidation", input.route), ...input };
}

export function buildRouteConsolidationPlan(): RouteConsolidationPlan {
  const items = ROUTES.map(buildRouteConsolidationItem);
  const primaryRouteCount = items.filter((item) => item.prominence === "primary").length;
  const secondaryRouteCount = items.filter((item) => item.prominence === "secondary").length;
  const deepRouteCount = items.filter((item) => item.classification === "deep governance route").length;
  const linkOnlyCandidateCount = items.filter((item) => item.prominence === "link-only").length;
  return {
    id: "route-consolidation-plan",
    items,
    primaryRouteCount,
    secondaryRouteCount,
    deepRouteCount,
    linkOnlyCandidateCount,
    summary: summarizeRouteConsolidationPlan({ items, primaryRouteCount, secondaryRouteCount, deepRouteCount, linkOnlyCandidateCount }),
  };
}

export function summarizeRouteConsolidationPlan(plan: Pick<RouteConsolidationPlan, "items" | "primaryRouteCount" | "secondaryRouteCount" | "deepRouteCount" | "linkOnlyCandidateCount">): string[] {
  const primaryRoutes = plan.items.filter((item) => item.classification === "primary route").map((item) => item.route).join(", ");
  return [
    `${plan.primaryRouteCount} primary route(s): ${primaryRoutes}.`,
    `${plan.secondaryRouteCount} secondary routes and ${plan.deepRouteCount} deep governance routes remain accessible.`,
    `${plan.linkOnlyCandidateCount} routes are candidates for link-only access; no route removal is recommended.`,
  ];
}
