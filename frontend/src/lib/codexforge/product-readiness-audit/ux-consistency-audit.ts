import type { ProductUxConsistencyAudit, ProductUxConsistencyItem } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

const UX_CHECKS: readonly Omit<ProductUxConsistencyItem, "id">[] = [
  { label: "premium dark operator style", passed: true, risk: "low", evidence: "Readiness cockpit uses the established dark operator shell.", recommendedAction: "Keep surface utilitarian and dense." },
  { label: "responsive grid", passed: true, risk: "low", evidence: "Panels use auto-fit grids and min-width constraints.", recommendedAction: "Verify desktop and mobile overflow." },
  { label: "no cramped cards", passed: true, risk: "low", evidence: "Panels are split by audit domain with wrapping text.", recommendedAction: "Avoid nesting UI cards inside cards." },
  { label: "long text wrapping", passed: true, risk: "low", evidence: "Long paths and prompts use overflowWrap anywhere.", recommendedAction: "Keep path text wrap-safe." },
  { label: "stable keys", passed: true, risk: "low", evidence: "buildProductReadinessStableKey creates deterministic ids.", recommendedAction: "Use deterministic stable keys for layout ids." },
  { label: "no raw JSON in main UI", passed: true, risk: "low", evidence: "Panels render structured fields, not raw JSON.", recommendedAction: "Keep copy payloads plain text." },
  { label: "copy-only actions", passed: true, risk: "low", evidence: "Allowed controls copy readiness summary, consolidation prompt, and validation checklist.", recommendedAction: "Do not add mutation buttons." },
  { label: "clear empty states", passed: true, risk: "low", evidence: "ProductReadinessEmptyState renders when no items are supplied.", recommendedAction: "Keep empty state concise." },
  { label: "clear safety notice", passed: true, risk: "low", evidence: "Safety notice states read-only, no command execution, no file writes without approval, no graph mutation, no apply buttons, and preserve latest-message authority.", recommendedAction: "Keep safety boundary above audit details." },
  { label: "route links visible", passed: true, risk: "low", evidence: "Route panel links to audited surfaces.", recommendedAction: "Keep route entry points visible." },
  { label: "shell/command palette available", passed: true, risk: "low", evidence: "Readiness route uses CodexForgeAppShell and command palette integration.", recommendedAction: "Keep shell adoption consistent." },
  { label: "consistent terminology", passed: true, risk: "low", evidence: "Audit uses product readiness, smoke coverage, safety posture, UX consistency, module consolidation, and functional workflow terms.", recommendedAction: "Use the same names across Home, Stabilization, Handoff, Mission Control, and Palette." },
  { label: "route sprawl", passed: false, risk: "medium", evidence: "Many surfaces overlap as dashboards.", recommendedAction: "Consolidate dashboards before adding more surfaces." },
  { label: "card clutter", passed: false, risk: "medium", evidence: "Cockpit fatigue risk increases with every new audit panel.", recommendedAction: "Prioritize real workflow CTAs." },
  { label: "duplicated panels", passed: false, risk: "medium", evidence: "Safety, next-action, route registry, and copy-payload patterns repeat across modules.", recommendedAction: "Plan consolidation groups in Phase 55." },
  { label: "hidden next action", passed: false, risk: "medium", evidence: "Some workflows stop at posture instead of a single next functional action.", recommendedAction: "Make the next functional workflow visible." },
  { label: "unclear safety boundary", passed: true, risk: "low", evidence: "This route declares read-only boundaries directly.", recommendedAction: "Repeat boundaries on copy prompts." },
  { label: "cockpit fatigue", passed: false, risk: "medium", evidence: "Dashboard count is high.", recommendedAction: "Consolidation before more dashboards." },
  { label: "no real workflow CTA", passed: false, risk: "high", evidence: "Core value now depends on Files, Patch Preview, validation, and regression repair loops becoming real workflows.", recommendedAction: "Real workflow before abstract features." },
] as const;

export function buildUxConsistencyItem(input: Partial<ProductUxConsistencyItem> & Pick<ProductUxConsistencyItem, "label">): ProductUxConsistencyItem {
  const definition = UX_CHECKS.find((check) => check.label === input.label);
  return {
    id: input.id ?? buildProductReadinessStableKey("ux-consistency", input.label),
    passed: true,
    risk: "low",
    evidence: "",
    recommendedAction: "Review UX consistency.",
    ...definition,
    ...input,
  };
}

export function buildUxConsistencyAudit(items: readonly Partial<ProductUxConsistencyItem>[] = UX_CHECKS): ProductUxConsistencyAudit {
  const checks = items.map((item) => buildUxConsistencyItem(item as ProductUxConsistencyItem));
  const riskCount = checks.filter((item) => !item.passed || item.risk === "high" || item.risk === "medium").length;
  const passedCount = checks.filter((item) => item.passed).length;
  return {
    id: "product-ux-consistency-audit",
    items: checks,
    riskCount,
    passedCount,
    summary: summarizeUxConsistencyAudit({ items: checks, riskCount, passedCount }),
  };
}

export function summarizeUxConsistencyAudit(audit: Pick<ProductUxConsistencyAudit, "items" | "riskCount" | "passedCount">): string[] {
  return [
    `${audit.passedCount}/${audit.items.length} UX checks pass.`,
    `${audit.riskCount} UX risks remain, led by route sprawl, duplicated panels, cockpit fatigue, and no real workflow CTA.`,
    "UX overflow before more surfaces remains the rule.",
  ];
}
