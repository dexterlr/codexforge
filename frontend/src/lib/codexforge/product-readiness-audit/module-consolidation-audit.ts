import type { ProductModuleConsolidationAudit, ProductModuleConsolidationItem } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

const DEFAULT_MODULE_LABELS = [
  "Operator Home",
  "Navigation Shell",
  "Command Palette",
  "Global Activity Feed",
  "Stabilization Command Center",
  "Continuity Handoff Packet",
  "Brain Continuity Dashboard",
  "Snapshot Restore Gate",
  "Brain Snapshot Manager",
  "Runtime Event Replay",
  "Brain Mutation Governance",
  "Runtime Event Journal",
  "Memory Promotion Gate",
  "Operator Memory Inbox",
  "Files",
  "Creative",
  "Capabilities",
] as const;

const CONSOLIDATION_ITEMS: readonly Omit<ProductModuleConsolidationItem, "id" | "suppliedModuleLabels">[] = [
  { label: "overlapping dashboards", risk: "high", consolidationGroup: "Operator Command surfaces", evidence: "Home, Mission Control, Stabilization, Activity, Handoff, and Readiness all summarize operator state.", recommendedAction: "Consolidate dashboards into Home, Stabilization, Handoff, and Brain Continuity lanes." },
  { label: "duplicate safety panels", risk: "medium", consolidationGroup: "Operator Command surfaces", evidence: "Safety copy appears in several cockpit surfaces.", recommendedAction: "Extract shared safety posture language after Phase 54." },
  { label: "duplicate next-action panels", risk: "medium", consolidationGroup: "Stabilization and regression surfaces", evidence: "Next action selectors repeat across Home, Stabilization, Handoff, Brain Continuity, and Command Palette.", recommendedAction: "Unify next action semantics before more surfaces." },
  { label: "duplicate route registry logic", risk: "medium", consolidationGroup: "Operator Command surfaces", evidence: "Home, Navigation Shell, Command Palette, Mission Control, and Readiness each model routes.", recommendedAction: "Create one route registry source in a consolidation pass." },
  { label: "duplicate copy-payload logic", risk: "medium", consolidationGroup: "Patch/apply workflow surfaces", evidence: "Copy prompts and validation checklist strings repeat.", recommendedAction: "Centralize copy payload builders." },
  { label: "duplicate smoke assertions", risk: "medium", consolidationGroup: "Stabilization and regression surfaces", evidence: "Smoke scripts repeat source-safety and forbidden dependency assertions.", recommendedAction: "Create shared smoke assertion helpers later." },
  { label: "stale legacy modules", risk: "medium", consolidationGroup: "Operator Command surfaces", evidence: "Legacy navigation and product-surface modules coexist with newer shell modules.", recommendedAction: "Audit legacy modules before deleting anything." },
  { label: "abstract dashboard sprawl", risk: "high", consolidationGroup: "Operator Command surfaces", evidence: "Many surfaces explain readiness without completing real workflows.", recommendedAction: "Real workflow before abstract features." },
  { label: "dashboard sprawl", risk: "high", consolidationGroup: "Operator Command surfaces", evidence: "Dashboard sprawl is the main product readiness risk.", recommendedAction: "Phase 55 Consolidation Pass should merge overlapping review surfaces." },
  { label: "Memory review/promotion surfaces", risk: "medium", consolidationGroup: "Memory review/promotion surfaces", evidence: "Memory Review, Memory Promotion Gate, and Operator Memory Inbox overlap.", recommendedAction: "Merge inbox-to-promotion gate into a single review workflow." },
  { label: "Brain continuity and governance surfaces", risk: "medium", consolidationGroup: "Brain continuity and governance surfaces", evidence: "Journal, Replay, Snapshots, Restore, Governance, and Continuity form one lane.", recommendedAction: "Use Brain Continuity as the lane and keep special gates focused." },
  { label: "Creative production surfaces", risk: "low", consolidationGroup: "Creative production surfaces", evidence: "Creative surfaces are more distinct but still preview-heavy.", recommendedAction: "Connect creative-plan-to-render-queue." },
] as const;

export function buildModuleConsolidationItem(input: Partial<ProductModuleConsolidationItem> & Pick<ProductModuleConsolidationItem, "label">): ProductModuleConsolidationItem {
  const definition = CONSOLIDATION_ITEMS.find((item) => item.label === input.label);
  return {
    id: input.id ?? buildProductReadinessStableKey("module-consolidation", input.label),
    risk: "medium",
    suppliedModuleLabels: [...DEFAULT_MODULE_LABELS],
    consolidationGroup: "Operator Command surfaces",
    evidence: "",
    recommendedAction: "Review consolidation candidate.",
    ...definition,
    ...input,
  };
}

export function buildModuleConsolidationAudit(moduleLabels: readonly string[] = DEFAULT_MODULE_LABELS): ProductModuleConsolidationAudit {
  const items = CONSOLIDATION_ITEMS.map((item) => buildModuleConsolidationItem({ ...item, suppliedModuleLabels: [...moduleLabels] }));
  const candidateCount = items.filter((item) => item.risk === "high" || item.risk === "medium").length;
  return {
    id: "product-module-consolidation-audit",
    items,
    candidateCount,
    summary: summarizeModuleConsolidationAudit({ items, candidateCount }),
  };
}

export function summarizeModuleConsolidationAudit(audit: Pick<ProductModuleConsolidationAudit, "items" | "candidateCount">): string[] {
  return [
    `${audit.candidateCount}/${audit.items.length} module patterns are consolidation candidates.`,
    "Recommended consolidation groups: Operator Command surfaces, Stabilization and regression surfaces, Brain continuity and governance surfaces, Memory review/promotion surfaces, Patch/apply workflow surfaces, Creative production surfaces.",
    "Consolidation before more dashboards is the next readiness rule.",
  ];
}
