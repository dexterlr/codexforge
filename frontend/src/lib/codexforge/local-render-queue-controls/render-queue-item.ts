import type { RenderQueueItem, RenderQueueStateId } from "./local-render-queue-types";

export function buildRenderQueueItem(input: Partial<RenderQueueItem> = {}): RenderQueueItem {
  return {
    id: input.id ?? "render-queue-item-draft-preview",
    label: input.label ?? "Reviewed local draft candidate",
    state: input.state ?? "needs-review",
    resourcePosture: input.resourcePosture ?? "heavy GPU work should wait for review",
    workerPreference: input.workerPreference ?? "explicit worker assignment later",
    reviewNote: input.reviewNote ?? "Review before run. Nothing renders from this preview.",
    executionAllowed: false,
  };
}

export function buildDefaultRenderQueueItems(): RenderQueueItem[] {
  const states: RenderQueueStateId[] = ["draft", "needs-review", "approved-preview-only", "held", "blocked", "failed-supplied"];
  return states.map((state) =>
    buildRenderQueueItem({
      id: `render-queue-item-${state}`,
      label: state === "approved-preview-only" ? "Approved preview-only candidate" : `Queue item ${state}`,
      state,
    })
  );
}
