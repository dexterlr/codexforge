import type { DraftToFinalDecision, DraftToFinalReadiness } from "./draft-to-final-types";

export function buildDraftToFinalDecision(input: Partial<DraftToFinalDecision> = {}, readiness?: DraftToFinalReadiness): DraftToFinalDecision {
  const checks = readiness?.checks ?? [];
  const missing = checks.filter((check) => !check.ready);
  const defaultState = missing.length === 0 ? "ready-for-future-approved-final-render" : "needs-review";

  return {
    id: input.id ?? "draft-to-final-decision",
    state: input.state ?? defaultState,
    plainEnglish:
      input.plainEnglish ??
      (defaultState === "ready-for-future-approved-final-render"
        ? "The plan is ready to hand to a future approved final render executor."
        : "A final render is not ready yet. Review the draft and complete the missing plans first."),
  };
}
