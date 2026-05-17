import type { OperatorRunContext, OperatorRunInput } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";

export function buildRunContext(input: OperatorRunInput): OperatorRunContext {
  const capability = input.capabilityId ?? input.adapter?.capability ?? "rendering";
  const toolName = input.toolName ?? input.adapter?.toolName ?? "render-job";
  const lowRiskEvidenceContext =
    toolName === "read-file" ||
    toolName === "list-files" ||
    toolName === "search-project" ||
    toolName === "snapshot-project";
  return {
    id: buildOperatorRunReactKey("context", input.id ?? capability),
    capabilityReadiness: `${capability} is available for preview planning only.`,
    creativePlan: "Creative production plans may be summarized as storyboard, scene, workflow, or render manifest previews.",
    patchPreviewPlan: "Patch previews may be represented as ledger entries without applying diffs.",
    applyEvidencePackContext: lowRiskEvidenceContext
      ? "Apply Evidence Pack can be attached as low-risk run context for future guarded apply review; it does not apply changes."
      : "Apply Evidence Pack remains available as review context only when a run is low-risk; this run stays policy gated.",
    brainRuntimeContext: "Brain runtime context is read-only and not mutated from this UI.",
    notes: [
      "Local-first deterministic context.",
      "No network calls or AI calls are made in run logic.",
      "Future memory handoff is represented as replay text only.",
      "Apply Evidence Pack evidence can be reviewed before any future guarded apply executor.",
    ],
  };
}

export function summarizeRunContext(context: OperatorRunContext): string {
  return `${context.notes.length} read-only context notes; ${context.applyEvidencePackContext} Brain graph mutation is not performed.`;
}
