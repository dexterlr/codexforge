import type { ProductReadinessNextAction, ProductReadinessNextActionPlan, ProductReadinessScorecard, ProductReadinessSummary } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

const ACTIONS: readonly ProductReadinessNextAction[] = [
  { id: "stop-and-stabilize", label: "stop and stabilize", reason: "Blockers must be resolved before feature work.", priority: 10, route: "/stabilization", copyPrompt: "Stop and stabilize. Resolve blockers before adding features. Keep Product Readiness Audit read-only." },
  { id: "run-full-smoke-suite-manually", label: "run full smoke suite manually", reason: "Missing smoke before new features.", priority: 20, route: "/stabilization", copyPrompt: "Run full smoke suite manually: npm run smoke:codexforge:server. Do not auto-run tests from UI." },
  { id: "polish-ux-overflow-layout", label: "polish UX overflow/layout", reason: "UX overflow before more surfaces.", priority: 30, route: "/readiness", copyPrompt: "Audit mobile and desktop overflow, long text wrapping, stable keys, and card density before adding surfaces." },
  { id: "consolidate-dashboards", label: "consolidate dashboards", reason: "Consolidation before more dashboards.", priority: 40, route: "/readiness", copyPrompt: "Plan dashboard consolidation across Operator Home, Stabilization, Handoff, Brain Continuity, Activity, Mission Control, and Product Readiness Audit." },
  { id: "reduce-duplicate-panels", label: "reduce duplicate panels", reason: "Duplicate safety, next-action, route registry, copy-payload, and smoke assertion patterns are visible.", priority: 50, route: "/readiness", copyPrompt: "Identify duplicate panels and shared copy payloads. Recommend consolidation without mutating files from UI." },
  { id: "make-files-real-read-only-workflow", label: "make Files real read-only workflow", reason: "File Reader v1 functional/read-only is integrated.", priority: 60, route: "/files", copyPrompt: "Review File Reader v1 functional/read-only in /files. Do not write files, run commands, or mutate Brain graph." },
  { id: "make-patch-preview-real", label: "review Real Patch Preview v1", reason: "Patch Preview v1 functional/preview-only is integrated in /files.", priority: 70, route: "/files", copyPrompt: "Review Phase 57 Real Patch Preview v1 in /files. Prepare preview-only diffs from selected read file context; no direct apply-diff, write-file, or run-command from UI." },
  { id: "review-approved-patch-apply", label: "review approved patch apply", reason: "Approved Patch Apply v1 request-ready is integrated behind approval, policy, preflight, dry-run, rollback, validation, and guarded bridge state.", priority: 80, route: "/files", copyPrompt: "Review Approved Patch Apply v1 request-ready posture in /files. Confirm explicit approval, preview diff, policy, preflight, dry-run, rollback plan, validation commands, and request-ready/blocked bridge state. Do not run commands or write files from UI." },
  { id: "implement-validation-runner", label: "implement validation runner", reason: "Approved Patch Apply v1 can recommend Validation Runner v1 next.", priority: 90, route: "/stabilization", copyPrompt: "Design Phase 59 Validation Runner v1 with no automatic command execution from audit UI." },
  { id: "close-loop-regression-repair", label: "close loop regression repair", reason: "Validation-to-regression-triage and regression-to-fix-queue remain preview-only.", priority: 100, route: "/stabilization", copyPrompt: "Close the regression repair loop with evidence review, fix queue, and patch preview handoff." },
  { id: "commit-clean-checkpoint", label: "commit clean checkpoint", reason: "Only after validation passes and user approval.", priority: 110, route: "/readiness", copyPrompt: "After validation passes, recommend a commit clean checkpoint. Do not commit without explicit approval." },
  { id: "phase-55-consolidation-complete", label: "Consolidation Pass complete", reason: "If clean, Approved Patch Apply v1 request-ready can recommend Phase 59 Validation Runner v1.", priority: 120, route: "/consolidation", copyPrompt: "Consolidation Pass complete. File Reader, Real Patch Preview, and Approved Patch Apply v1 request-ready are available; proceed to Phase 59 Validation Runner v1." },
  { id: "review-blender-adapter-preview", label: "review Blender Adapter Preview", reason: "Blender Adapter Preview v1 is preview-only and request-ready for script and future executor packet review.", priority: 130, route: "/blender", copyPrompt: "Review Blender Adapter Preview v1. Keep it preview-only: no Blender execution, no render execution, no file writes. Next action can recommend ComfyUI Adapter Preview v1 or a future guarded creative executor." },
  { id: "review-unreal-adapter-preview", label: "review Unreal Adapter Preview", reason: "Unreal Adapter Preview v1 is preview-only and request-ready for level model, command preview, and future executor packet review.", priority: 135, route: "/unreal", copyPrompt: "Review Unreal Adapter Preview v1. Keep it preview-only: no Unreal execution, no Unreal Editor launch, no render execution, no package/build, no file writes. Next action can recommend Future Guarded Creative Executor or Video Render Job Preview." },
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
