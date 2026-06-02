import type { RenderQueueSafety } from "./local-render-queue-types";

export function buildRenderQueueSafety(input: Partial<RenderQueueSafety> = {}): RenderQueueSafety {
  return {
    id: input.id ?? "local-render-queue-safety",
    notes:
      input.notes ??
      [
        "No start/render button exists here.",
        "Pause, resume, cancel, retry, hold, and prioritize are preview labels only.",
        "No destructive buttons and no file deletion.",
        "No ComfyUI workflow run or cloud provider call.",
        "No job queue execution.",
      ],
    blocked: input.blocked ?? "Real controls remain blocked until approved execution and queue mutation policies exist.",
  };
}
