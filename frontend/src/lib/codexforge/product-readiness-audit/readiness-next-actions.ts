import type { ProductReadinessNextAction, ProductReadinessNextActionPlan, ProductReadinessScorecard, ProductReadinessSummary } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

const ACTIONS: readonly ProductReadinessNextAction[] = [
  { id: "stop-and-stabilize", label: "stop and stabilize", reason: "Blockers must be resolved before feature work.", priority: 10, route: "/stabilization", copyPrompt: "Stop and stabilize. Resolve blockers before adding features. Keep Product Readiness Audit read-only." },
  { id: "run-full-smoke-suite-manually", label: "run full smoke suite manually", reason: "Missing smoke before new features.", priority: 20, route: "/stabilization", copyPrompt: "Run full smoke suite manually: npm run smoke:codexforge:server. Do not auto-run tests from UI." },
  { id: "polish-ux-overflow-layout", label: "polish UX overflow/layout", reason: "UX overflow before more surfaces.", priority: 30, route: "/readiness", copyPrompt: "Audit mobile and desktop overflow, long text wrapping, stable keys, and card density before adding surfaces." },
  { id: "consolidate-dashboards", label: "consolidate dashboards", reason: "Consolidation before more dashboards.", priority: 40, route: "/readiness", copyPrompt: "Plan dashboard consolidation across Operator Home, Stabilization, Handoff, Brain Continuity, Activity, Mission Control, and Product Readiness Audit." },
  { id: "reduce-duplicate-panels", label: "reduce duplicate panels", reason: "Duplicate safety, next-action, route registry, copy-payload, and smoke assertion patterns are visible.", priority: 50, route: "/readiness", copyPrompt: "Identify duplicate panels and shared copy payloads. Recommend consolidation without mutating files from UI." },
  { id: "make-files-real-read-only-workflow", label: "make Files real read-only workflow", reason: "Real workflow before abstract features.", priority: 60, route: "/files", copyPrompt: "Make Files a real read-only project-file workflow. Do not write files, run commands, or mutate Brain graph." },
  { id: "make-patch-preview-real", label: "make Patch Preview real", reason: "Task-to-patch-preview and patch-preview-to-apply-gate need a visible path.", priority: 70, route: "/ai", copyPrompt: "Make Patch Preview real with preview-only packets and no direct apply-diff, write-file, or run-command from UI." },
  { id: "implement-approved-patch-apply", label: "implement approved patch apply", reason: "Execution must remain approval-gated.", priority: 80, route: "/stabilization", copyPrompt: "Implement approved patch apply only behind explicit approval and validation boundaries. Product Readiness Audit remains read-only." },
  { id: "implement-validation-runner", label: "implement validation runner", reason: "Validation-to-regression loop needs a guarded runner.", priority: 90, route: "/stabilization", copyPrompt: "Design an approved validation runner with no automatic command execution from audit UI." },
  { id: "close-loop-regression-repair", label: "close loop regression repair", reason: "Validation-to-regression-triage and regression-to-fix-queue remain preview-only.", priority: 100, route: "/stabilization", copyPrompt: "Close the regression repair loop with evidence review, fix queue, and patch preview handoff." },
  { id: "commit-clean-checkpoint", label: "commit clean checkpoint", reason: "Only after validation passes and user approval.", priority: 110, route: "/readiness", copyPrompt: "After validation passes, recommend a commit clean checkpoint. Do not commit without explicit approval." },
  { id: "phase-55-consolidation-complete", label: "Consolidation Pass complete", reason: "If clean, recommend Phase 56 Real Local Project Reader.", priority: 120, route: "/consolidation", copyPrompt: "Consolidation Pass complete. Proceed to Phase 56 Real Local Project Reader with read-only local file discovery, file preview, and safe context handoff." },
] as const;

export function selectProductReadinessNextAction(input: {
  summary?: Pick<ProductReadinessSummary, "safetyBlockerCount" | "smokeCoverageCount" | "uxRiskCount" | "duplicateConsolidationCount" | "functionalWorkflowCount">;
  scorecard?: ProductReadinessScorecard;
} = {}): ProductReadinessNextAction {
  if (input.summary?.safetyBlockerCount && input.summary.safetyBlockerCount > 0) return ACTIONS[0];
  if (input.summary?.smokeCoverageCount === 0) return ACTIONS[1];
  if (input.summary?.uxRiskCount && input.summary.uxRiskCount > 4) return ACTIONS[2];
  if (input.summary?.duplicateConsolidationCount && input.summary.duplicateConsolidationCount > 0) return ACTIONS[3];
  if (input.summary?.functionalWorkflowCount === 0) return ACTIONS[5];
  if (input.scorecard?.overallReadiness === "good" || input.scorecard?.overallReadiness === "excellent") return ACTIONS[11];
  return ACTIONS[5];
}

export function buildProductReadinessNextActionPlan(input: Parameters<typeof selectProductReadinessNextAction>[0] = {}): ProductReadinessNextActionPlan {
  const selected = selectProductReadinessNextAction(input);
  const candidates = [...ACTIONS].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
  return {
    id: buildProductReadinessStableKey("product-readiness-next-actions"),
    selected,
    candidates,
    summary: summarizeProductReadinessNextActions({ selected, candidates }),
  };
}

export function summarizeProductReadinessNextActions(plan: Pick<ProductReadinessNextActionPlan, "selected" | "candidates">): string[] {
  return [
    `Selected next action: ${plan.selected.label}.`,
    `${plan.candidates.length} candidate actions are ordered by blockers first, missing smoke, safety gap, UX overflow, consolidation, and real workflow priority.`,
  ];
}
