import type { RenderQueuePolicy } from "./local-render-queue-types";

export function buildRenderQueuePolicy(input: Partial<RenderQueuePolicy> = {}): RenderQueuePolicy {
  return {
    id: input.id ?? "local-render-queue-policy",
    rules:
      input.rules ??
      [
        "Controls are preview-only.",
        "No real queue mutation.",
        "No job execution.",
        "No ComfyUI call.",
        "No file deletion.",
        "No process control.",
        "Review before run.",
      ],
    plainEnglish:
      input.plainEnglish ??
      "A render queue prevents overload by making local jobs visible and reviewed before anything can run.",
  };
}
