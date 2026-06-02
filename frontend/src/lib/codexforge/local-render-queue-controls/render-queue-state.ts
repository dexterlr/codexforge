import type { RenderQueueState, RenderQueueStateId } from "./local-render-queue-types";

const STATE_COPY: Record<RenderQueueStateId, string> = {
  empty: "No local render jobs are in the preview.",
  draft: "A job idea exists, but it has not been reviewed.",
  "needs-review": "The operator must review before any future run is possible.",
  "approved-preview-only": "Approved as a preview label only; it still does not run.",
  held: "The item should wait.",
  blocked: "The item cannot move forward safely yet.",
  "future-running": "A future executor could report running later, but this preview cannot start it.",
  "complete-supplied": "A completed result could be supplied later for review.",
  "failed-supplied": "A failed result could be supplied later for recovery planning.",
};

export function buildRenderQueueState(state: RenderQueueStateId, input: Partial<RenderQueueState> = {}): RenderQueueState {
  return {
    id: state,
    label: input.label ?? state,
    plainEnglish: input.plainEnglish ?? STATE_COPY[state],
    executionAllowed: false,
  };
}
