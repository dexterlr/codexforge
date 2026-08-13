import type { ConsolidationPlan, ConsolidationPlanItem } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";

const ITEMS: readonly Omit<ConsolidationPlanItem, "id">[] = [
  { title: "Promote primary routes in nav", detail: "Keep /, /jarvis, /files, /stabilization, /readiness, and /handoff prominent.", priority: 10, routeHref: "/", status: "in-progress" },
  { title: "Demote deep governance routes to Advanced / Audit group", detail: "Keep deep Brain and runtime surfaces accessible without making them start points.", priority: 20, routeHref: "/brain-continuity", status: "planned" },
  { title: "Add clear Start here workflow cards", detail: "Operator Home should point to Jarvis Chat, Files, Stabilization, Product Readiness, Handoff, and the next functional workflow.", priority: 30, routeHref: "/", status: "in-progress" },
  { title: "Ensure /readiness and /handoff are operator checkpoints", detail: "Treat readiness and handoff as phase-transition checkpoints.", priority: 40, routeHref: "/readiness", status: "ready" },
  { title: "Use /stabilization as operations hub", detail: "Keep build, smoke, regression, queue, and apply-gate posture centralized.", priority: 50, routeHref: "/stabilization", status: "ready" },
  { title: "Use /files as File Reader v1 and Patch Preview v1", detail: "Phase 56 Real Local Project Reader made /files the Real Local Project Reader without writes; previous note was prepare /files for real read-only workflow next; Phase 57 Real Patch Preview v1 is now functional/preview-only; next recommend Phase 58 Approved Patch Apply v1.", priority: 60, routeHref: "/files", status: "ready" },
  { title: "Keep deep surfaces accessible via command palette", detail: "Runtime and Brain governance routes remain reachable without nav sprawl.", priority: 70, routeHref: "/runtime-journal", status: "in-progress" },
  { title: "Reduce duplicated next-action copy over time", detail: "Adopt shared next-action ordering gradually, cockpit by cockpit.", priority: 80, routeHref: "/consolidation", status: "planned" },
  { title: "Keep all smoke coverage intact", detail: "Consolidation adds smoke coverage and preserves existing smoke markers.", priority: 90, routeHref: "/consolidation", status: "ready" },
];

export function buildConsolidationPlanItem(input: Omit<ConsolidationPlanItem, "id">): ConsolidationPlanItem {
  return { id: buildConsolidationStableKey("plan", input.priority, input.title), ...input };
}

export function buildConsolidationPlan(): ConsolidationPlan {
  const items = ITEMS.map(buildConsolidationPlanItem);
  const topRecommendation = "File Reader v1 functional/read-only and Patch Preview v1 functional/preview-only are integrated; recommend Phase 58 Approved Patch Apply v1.";
  return {
    id: "consolidation-plan",
    items,
    topRecommendation,
    summary: summarizeConsolidationPlan({ items, topRecommendation }),
  };
}

export function summarizeConsolidationPlan(plan: Pick<ConsolidationPlan, "items" | "topRecommendation">): string[] {
  return [
    `${plan.items.length} consolidation plan items are ordered by operator impact.`,
    plan.topRecommendation,
    "Plan keeps routes intact, improves prominence, and keeps smoke coverage intact.",
  ];
}
