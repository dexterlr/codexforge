import type { SharedReadinessItem, SharedReadinessModel } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";

const ITEMS: readonly Omit<SharedReadinessItem, "id">[] = [
  { label: "Operator Home", sourceRoute: "/", readinessLevel: "ready", blockerCount: 0, warningCount: 0, nextAction: "Use as start here cockpit.", validationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-operator-home-dashboard.ps1", reviewRequired: false, routeHref: "/" },
  { label: "AI Workspace", sourceRoute: "/ai", readinessLevel: "needs-review", blockerCount: 0, warningCount: 1, nextAction: "Use after stabilization and file context review.", validationCommand: "npm run smoke:codexforge:server", reviewRequired: true, routeHref: "/ai" },
  { label: "Files", sourceRoute: "/files", readinessLevel: "needs-review", blockerCount: 0, warningCount: 1, nextAction: "Review Approved Patch Apply v1 request-ready flow and prepare Phase 59 Validation Runner v1 next.", validationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-approved-patch-apply.ps1", reviewRequired: true, routeHref: "/files" },
  { label: "Real Apply Guard Review", sourceRoute: "/apply-guard-review", readinessLevel: "needs-review", blockerCount: 0, warningCount: 1, nextAction: "Review apply guard before any apply automation increase; Guarded Apply Candidate Implementation only if go/no-go permits.", validationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-real-apply-guard-review.ps1", reviewRequired: true, routeHref: "/apply-guard-review" },
  { label: "Stabilization", sourceRoute: "/stabilization", readinessLevel: "needs-review", blockerCount: 0, warningCount: 1, nextAction: "Review consolidation readiness and validation posture.", validationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-stabilization-command-center.ps1", reviewRequired: true, routeHref: "/stabilization" },
  { label: "Product Readiness", sourceRoute: "/readiness", readinessLevel: "ready", blockerCount: 0, warningCount: 0, nextAction: "Use as operator checkpoint after Consolidation Pass.", validationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-product-readiness-audit.ps1", reviewRequired: true, routeHref: "/readiness" },
  { label: "Continuity Handoff", sourceRoute: "/handoff", readinessLevel: "needs-review", blockerCount: 0, warningCount: 1, nextAction: "Include consolidation posture and Phase 56 next step.", validationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-continuity-handoff.ps1", reviewRequired: true, routeHref: "/handoff" },
  { label: "Brain Governance", sourceRoute: "/brain-governance", readinessLevel: "needs-review", blockerCount: 0, warningCount: 1, nextAction: "Keep deep governance accessible via Advanced / Audit.", validationCommand: "npm run smoke:codexforge:server", reviewRequired: true, routeHref: "/brain-governance" },
];

export function buildSharedReadinessItem(input: Omit<SharedReadinessItem, "id">): SharedReadinessItem {
  return { id: buildConsolidationStableKey("readiness", input.sourceRoute, input.label), ...input };
}

export function buildSharedReadinessModel(): SharedReadinessModel {
  const items = ITEMS.map(buildSharedReadinessItem);
  const readyCount = items.filter((item) => item.readinessLevel === "ready").length;
  const reviewCount = items.filter((item) => item.reviewRequired).length;
  const blockerCount = items.reduce((sum, item) => sum + item.blockerCount, 0);
  return {
    id: "shared-readiness-model",
    items,
    readyCount,
    reviewCount,
    blockerCount,
    summary: summarizeSharedReadinessModel({ items, readyCount, reviewCount, blockerCount }),
  };
}

export function summarizeSharedReadinessModel(model: Pick<SharedReadinessModel, "items" | "readyCount" | "reviewCount" | "blockerCount">): string[] {
  return [
    `${model.items.length} readiness items use the shared model.`,
    `${model.readyCount} ready items and ${model.reviewCount} review-required items are visible.`,
    `${model.blockerCount} blockers are present in the consolidation model.`,
  ];
}
