import type { ProductReadinessRouteAvailability, ProductRoutePath, ProductRouteReadinessAudit, ProductRouteReadinessItem } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

type RouteDefinition = Omit<ProductRouteReadinessItem, "id">;

const ROUTES: readonly RouteDefinition[] = [
  { route: "/", label: "Operator Home", surfaceGroup: "Operator Command surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "low", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Keep as the operator checkpoint and link Product Readiness Audit from the launch grid." },
  { route: "/ai", label: "AI Workspace", surfaceGroup: "Patch/apply workflow surfaces", readiness: "needs-work", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "high", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Make Patch Preview and apply gates a real reviewed workflow before adding more dashboards." },
  { route: "/brain", label: "Brain", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Preserve current /brain graph behavior and keep mutation governance separate." },
  { route: "/files", label: "Files", surfaceGroup: "Patch/apply workflow surfaces", readiness: "needs-work", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: false, recommendedAction: "Make Files a real read-only project-file workflow with clear file-to-brain context." },
  { route: "/tasks", label: "Tasks", surfaceGroup: "Patch/apply workflow surfaces", readiness: "needs-work", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Connect chat-to-task and task-to-patch-preview as one visible workflow." },
  { route: "/memory", label: "Memory", surfaceGroup: "Memory review/promotion surfaces", readiness: "needs-work", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "high", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Keep promotion approval explicit and consolidate duplicate memory review panels." },
  { route: "/memory-inbox", label: "Memory Inbox", surfaceGroup: "Memory review/promotion surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Merge inbox-to-promotion posture into a single memory review path." },
  { route: "/creative", label: "Creative", surfaceGroup: "Creative production surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "low", uxRisk: "medium", consolidationCandidate: false, recommendedAction: "Keep creative preview-only and connect plan-to-render-queue validation." },
  { route: "/capabilities", label: "Capabilities", surfaceGroup: "Operator Command surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: false, recommendedAction: "Keep capability policy visible before any bridge or executor handoff." },
  { route: "/activity", label: "Global Activity Feed", surfaceGroup: "Stabilization and regression surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "low", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Use activity as evidence context, not authority, and connect it to regression triage." },
  { route: "/stabilization", label: "Stabilization", surfaceGroup: "Stabilization and regression surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: false, recommendedAction: "Make Product Readiness a review checkpoint inside stabilization." },
  { route: "/handoff", label: "Continuity Handoff", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "low", uxRisk: "medium", consolidationCandidate: false, recommendedAction: "Mention Product Readiness posture in next-session packets." },
  { route: "/brain-continuity", label: "Brain Continuity", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Fold related snapshot, replay, journal, and governance posture into this continuity lane." },
  { route: "/brain-snapshots", label: "Brain Snapshots", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Keep snapshot manager inspect-only and route restore through the restore gate." },
  { route: "/snapshot-restore", label: "Snapshot Restore Gate", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "high", uxRisk: "medium", consolidationCandidate: false, recommendedAction: "Keep restore blocked by default until explicit approval and validation runner exist." },
  { route: "/runtime-replay", label: "Runtime Replay", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Connect replay-to-restore-gate with clearer validation requirements." },
  { route: "/runtime-journal", label: "Runtime Journal", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "medium", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Keep append-only evidence visible and no appendEvent from UI." },
  { route: "/brain-governance", label: "Brain Governance", surfaceGroup: "Brain continuity and governance surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "high", uxRisk: "medium", consolidationCandidate: true, recommendedAction: "Make governance the canonical review lane for direct graph mutation risk." },
  { route: "/history", label: "History", surfaceGroup: "Operator Command surfaces", readiness: "good", smokeCovered: true, shellNavigationCovered: true, commandPaletteCovered: true, safetyCopyPresent: true, mutationRisk: "low", uxRisk: "low", consolidationCandidate: false, recommendedAction: "Keep as read-only history context and avoid duplicate activity semantics." },
] as const;

export function buildRouteReadinessItem(input: Partial<RouteDefinition> & Pick<RouteDefinition, "route">): ProductRouteReadinessItem {
  const definition = ROUTES.find((route) => route.route === input.route);
  if (!definition) throw new Error(`Unknown product readiness route: ${input.route}`);
  return {
    ...definition,
    ...input,
    id: buildProductReadinessStableKey("route-readiness", input.route),
  };
}

export function buildRouteReadinessAudit(availability: ProductReadinessRouteAvailability = {}): ProductRouteReadinessAudit {
  const items = ROUTES
    .filter((route) => availability[route.route] !== false)
    .map((route) => buildRouteReadinessItem(route));
  const readyCount = items.filter((item) => item.readiness === "excellent" || item.readiness === "good").length;
  const smokeCoveredCount = items.filter((item) => item.smokeCovered).length;
  const consolidationCandidateCount = items.filter((item) => item.consolidationCandidate).length;
  return {
    id: "product-route-readiness-audit",
    items,
    readyCount,
    smokeCoveredCount,
    consolidationCandidateCount,
    summary: summarizeRouteReadinessAudit({ items, readyCount, smokeCoveredCount, consolidationCandidateCount }),
  };
}

export function summarizeRouteReadinessAudit(audit: Pick<ProductRouteReadinessAudit, "items" | "readyCount" | "smokeCoveredCount" | "consolidationCandidateCount">): string[] {
  return [
    `${audit.items.length} audited routes in deterministic order.`,
    `${audit.readyCount} routes are good or excellent; ${audit.smokeCoveredCount} routes have smoke posture.`,
    `${audit.consolidationCandidateCount} routes are consolidation candidates before more dashboard growth.`,
  ];
}
