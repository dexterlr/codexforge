import type { CockpitConsolidationAudit, CockpitConsolidationItem } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";

const ITEMS: readonly Omit<CockpitConsolidationItem, "id">[] = [
  { pattern: "readiness panel", surfaces: ["/readiness", "/stabilization", "/handoff", "/mission"], overlapRisk: "high", sharedModel: "shared-readiness-model", recommendation: "Use one typed readiness item shape before replacing panels." },
  { pattern: "safety notice", surfaces: ["/readiness", "/handoff", "/stabilization", "/brain-continuity"], overlapRisk: "high", sharedModel: "shared-safety-copy", recommendation: "Centralize repeated safety copy while keeping each cockpit local." },
  { pattern: "next action panel", surfaces: ["/", "/readiness", "/stabilization", "/handoff", "/activity"], overlapRisk: "high", sharedModel: "shared-next-action-model", recommendation: "Use deterministic next action ordering across cockpits." },
  { pattern: "validation panel", surfaces: ["/", "/readiness", "/stabilization", "/handoff"], overlapRisk: "medium", sharedModel: "validation-command-list", recommendation: "Keep commands copy-only and dedupe validation list copy." },
  { pattern: "risk board", surfaces: ["/stabilization", "/handoff", "/brain-continuity", "/readiness"], overlapRisk: "medium", sharedModel: "risk-posture-summary", recommendation: "Normalize blocker and warning counts without rewriting boards." },
  { pattern: "route link panel", surfaces: ["/", "/readiness", "/mission", "/consolidation"], overlapRisk: "medium", sharedModel: "surface-map", recommendation: "Use the route consolidation model as route prominence guidance." },
  { pattern: "copy prompt panel", surfaces: ["/readiness", "/handoff", "/stabilization", "/command-palette"], overlapRisk: "medium", sharedModel: "copy-payload-registry", recommendation: "Keep copy buttons, avoid mutation commands, and dedupe phase prompts over time." },
  { pattern: "empty state", surfaces: ["/readiness", "/handoff", "/activity", "/consolidation"], overlapRisk: "low", sharedModel: "empty-state-copy", recommendation: "Use concise read-only empty states with route backstops." },
  { pattern: "hero/status header", surfaces: ["/", "/readiness", "/stabilization", "/handoff", "/mission"], overlapRisk: "medium", sharedModel: "status-header-summary", recommendation: "Keep visual consistency and avoid adding another dashboard shell." },
];

export function buildCockpitConsolidationItem(input: Omit<CockpitConsolidationItem, "id">): CockpitConsolidationItem {
  return { id: buildConsolidationStableKey("cockpit", input.pattern), ...input };
}

export function buildCockpitConsolidationAudit(): CockpitConsolidationAudit {
  const items = ITEMS.map(buildCockpitConsolidationItem);
  const highOverlapCount = items.filter((item) => item.overlapRisk === "high").length;
  return {
    id: "cockpit-consolidation-audit",
    items,
    highOverlapCount,
    summary: summarizeCockpitConsolidationAudit({ items, highOverlapCount }),
  };
}

export function summarizeCockpitConsolidationAudit(audit: Pick<CockpitConsolidationAudit, "items" | "highOverlapCount">): string[] {
  return [
    `${audit.items.length} cockpit patterns are tracked including next action panel and safety notice.`,
    `${audit.highOverlapCount} high-overlap patterns should move toward shared typed models over time.`,
    "Recommendation is narrow consolidation, not a full cockpit rewrite.",
  ];
}
