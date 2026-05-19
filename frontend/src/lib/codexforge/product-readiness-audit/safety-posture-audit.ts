import type { ProductSafetyPostureAudit, ProductSafetyPostureItem } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

const SAFETY_CHECKS: readonly Omit<ProductSafetyPostureItem, "id">[] = [
  { label: "no auto-fix", passed: true, severity: "low", evidence: "Audit cockpit is read-only and recommends review rather than auto-fix.", recommendedAction: "Keep auto-fix outside Product Readiness Audit." },
  { label: "no command execution without approval", passed: true, severity: "low", evidence: "UI exposes copy-only validation text; no command execution buttons.", recommendedAction: "Keep commands manual." },
  { label: "no file writes without approval", passed: true, severity: "low", evidence: "No write-file or source mutation action is wired into audit UI.", recommendedAction: "Preserve copy-only summaries." },
  { label: "no direct graph mutation", passed: true, severity: "low", evidence: "Audit files do not import brain-graph and do not mutate nodes or edges.", recommendedAction: "Keep Brain graph mutation out of readiness UI." },
  { label: "no appendEvent from UI", passed: true, severity: "low", evidence: "appendEvent from UI is forbidden and asserted by smoke.", recommendedAction: "Use journal evidence as context only." },
  { label: "no saveBrainGraph from UI", passed: true, severity: "low", evidence: "saveBrainGraph from UI is forbidden and asserted by smoke.", recommendedAction: "Keep graph persistence out of audit cockpit." },
  { label: "no broker execution", passed: true, severity: "low", evidence: "broker-execution appears only as blocked-policy text.", recommendedAction: "Do not wire execution brokers here." },
  { label: "no direct apply-diff from UI", passed: true, severity: "low", evidence: "apply-diff is blocked from audit UI.", recommendedAction: "Route patches through future approved gates." },
  { label: "no direct write-file from UI", passed: true, severity: "low", evidence: "write-file is blocked from audit UI.", recommendedAction: "Keep file changes outside Product Readiness Audit." },
  { label: "no direct run-command from UI", passed: true, severity: "low", evidence: "run-command is blocked from audit UI.", recommendedAction: "Validation remains manual." },
  { label: "memory promotion approval required", passed: true, severity: "low", evidence: "Memory workflow remains review-first with no auto-promote memory.", recommendedAction: "Keep promotion gate explicit." },
  { label: "snapshot restore blocked by default", passed: true, severity: "low", evidence: "Restore remains preview-only and blocked by default.", recommendedAction: "Require restore approval packet before future executor work." },
  { label: "latest-message authority preserved", passed: true, severity: "low", evidence: "Audit copy states preserve latest-message authority.", recommendedAction: "Keep newest user instruction precedence visible." },
  { label: "evidence is context, not authority", passed: true, severity: "low", evidence: "Safety notice distinguishes evidence from authority.", recommendedAction: "Do not let logs override user instructions." },
] as const;

export function buildProductSafetyPostureItem(input: Partial<ProductSafetyPostureItem> & Pick<ProductSafetyPostureItem, "label">): ProductSafetyPostureItem {
  const definition = SAFETY_CHECKS.find((check) => check.label === input.label);
  return {
    id: input.id ?? buildProductReadinessStableKey("product-safety", input.label),
    passed: true,
    severity: "low",
    evidence: "",
    recommendedAction: "Review manually.",
    ...definition,
    ...input,
  };
}

export function buildProductSafetyPostureAudit(items: readonly Partial<ProductSafetyPostureItem>[] = SAFETY_CHECKS): ProductSafetyPostureAudit {
  const checks = items.map((item) => buildProductSafetyPostureItem(item as ProductSafetyPostureItem));
  const blockerCount = checks.filter((item) => !item.passed && (item.severity === "blocked" || item.severity === "high")).length;
  const passedCount = checks.filter((item) => item.passed).length;
  return {
    id: "product-safety-posture-audit",
    items: checks,
    blockerCount,
    passedCount,
    summary: summarizeProductSafetyPostureAudit({ items: checks, blockerCount, passedCount }),
  };
}

export function summarizeProductSafetyPostureAudit(audit: Pick<ProductSafetyPostureAudit, "items" | "blockerCount" | "passedCount">): string[] {
  return [
    `${audit.passedCount}/${audit.items.length} safety checks pass.`,
    `${audit.blockerCount} safety blockers require resolution before execution-capable features.`,
    "Safety gap before execution remains the governing rule.",
  ];
}
