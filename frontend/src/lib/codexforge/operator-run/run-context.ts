import type { OperatorRunContext, OperatorRunInput } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";

export function buildRunContext(input: OperatorRunInput): OperatorRunContext {
  const capability = input.capabilityId ?? input.adapter?.capability ?? "rendering";
  return {
    id: buildOperatorRunReactKey("context", input.id ?? capability),
    capabilityReadiness: `${capability} is available for preview planning only.`,
    creativePlan: "Creative production plans may be summarized as storyboard, scene, workflow, or render manifest previews.",
    patchPreviewPlan: "Patch previews may be represented as ledger entries without applying diffs.",
    brainRuntimeContext: "Brain runtime context is read-only and not mutated from this UI.",
    notes: [
      "Local-first deterministic context.",
      "No network calls or AI calls are made in run logic.",
      "Future memory handoff is represented as replay text only.",
    ],
  };
}

export function summarizeRunContext(context: OperatorRunContext): string {
  return `${context.notes.length} read-only context notes; brain graph mutation is not performed.`;
}
