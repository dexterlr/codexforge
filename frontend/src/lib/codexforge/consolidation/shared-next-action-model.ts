import type { SharedNextAction, SharedNextActionModel, SharedReadinessModel } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";
import { buildSharedReadinessModel } from "./shared-readiness-model";

const ACTIONS: readonly Omit<SharedNextAction, "id">[] = [
  { label: "Stop and stabilize", reason: "Blockers first.", priority: 10, routeHref: "/stabilization", copyPrompt: "Stop feature work and stabilize blockers before consolidation or file workflow work." },
  { label: "Review validation failures", reason: "Validation failures before new features.", priority: 20, routeHref: "/stabilization", copyPrompt: "Review pasted validation failures and regression posture. Do not auto-run tests from UI." },
  { label: "Review Stabilization", reason: "Stabilization before execution.", priority: 30, routeHref: "/stabilization", copyPrompt: "Review stabilization readiness, queues, risk board, and copy-only validation commands." },
  { label: "Review Product Readiness", reason: "Readiness before consolidation.", priority: 40, routeHref: "/readiness", copyPrompt: "Review Product Readiness and confirm Consolidation Pass is complete before Phase 56." },
  { label: "Inspect Files", reason: "File Reader v1 functional/read-only is available before Patch Preview v1.", priority: 50, routeHref: "/files", copyPrompt: "Inspect project files in File Reader v1 functional/read-only. Keep file workflow read-only until approval boundaries exist." },
  { label: "Commit clean checkpoint", reason: "Clean state can recommend checkpoint.", priority: 60, routeHref: "/handoff", copyPrompt: "After validation passes, recommend a commit checkpoint. Do not commit without explicit approval." },
  { label: "Phase 59 Validation Runner v1", reason: "Approved Patch Apply v1 is approval-gated/request-ready and can recommend validation runner work.", priority: 70, routeHref: "/files", copyPrompt: "Review Approved Patch Apply v1 in /files, then proceed to Phase 59 Validation Runner v1 only with copy-only commands and no automatic command execution from UI." },
  { label: "Apply Validation Hardening", reason: "Real Apply and Validation Hardening is the reliability layer between preview, approved apply, validation output, and closed-loop routing.", priority: 71, routeHref: "/apply-validation", copyPrompt: "Review Apply Validation Hardening at /apply-validation; keep rollback visible, validation commands copy-only, no auto-apply, no auto-run, and preserve latest-message authority." },
];

function buildSharedNextAction(input: Omit<SharedNextAction, "id">): SharedNextAction {
  return { id: buildConsolidationStableKey("next-action", input.priority, input.label), ...input };
}

export function selectSharedNextAction(readiness: SharedReadinessModel = buildSharedReadinessModel()): SharedNextAction {
  const candidates = ACTIONS.map(buildSharedNextAction);
  if (readiness.blockerCount > 0) return candidates[0];
  if (readiness.items.some((item) => item.warningCount > 1)) return candidates[1];
  if (readiness.items.some((item) => item.sourceRoute === "/stabilization" && item.reviewRequired)) return candidates[2];
  if (readiness.items.some((item) => item.sourceRoute === "/readiness" && item.reviewRequired)) return candidates[3];
  if (readiness.items.some((item) => item.sourceRoute === "/files" && item.reviewRequired)) return candidates[4];
  return candidates[6];
}

export function buildSharedNextActionModel(readiness: SharedReadinessModel = buildSharedReadinessModel()): SharedNextActionModel {
  const candidates = ACTIONS.map(buildSharedNextAction).sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
  const selected = selectSharedNextAction(readiness);
  return {
    id: "shared-next-action-model",
    selected,
    candidates,
    summary: summarizeSharedNextActionModel({ selected, candidates }),
  };
}

export function summarizeSharedNextActionModel(model: Pick<SharedNextActionModel, "selected" | "candidates">): string[] {
  return [
    `Selected next action: ${model.selected.label}.`,
    `${model.candidates.length} actions are ordered by blockers first, validation failures before new features, stabilization before execution, readiness before consolidation, and file workflow before abstract dashboards.`,
    "If clean, recommend commit checkpoint or Phase 59 Validation Runner v1 after Approved Patch Apply review.",
  ];
}
