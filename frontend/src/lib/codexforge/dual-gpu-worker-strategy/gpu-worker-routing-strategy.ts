import type { GpuWorkerRoutingStrategy } from "./dual-gpu-worker-types";

export function buildGpuWorkerRoutingStrategy(input: Partial<GpuWorkerRoutingStrategy> = {}): GpuWorkerRoutingStrategy {
  return {
    id: input.id ?? "gpu-worker-routing-strategy",
    plainEnglish:
      input.plainEnglish ??
      "Treat the two cards as reviewed workers. Send separate jobs to separate workers unless a workflow clearly supports multi-GPU.",
    rules:
      input.rules ??
      [
        "GPU 1 drafts first.",
        "GPU 2 upscales or interpolates when a separate reviewed job is ready.",
        "GPU 2 can draft when idle.",
        "Run one heavy job at a time if memory risk is unknown.",
        "Manual override stays reviewed.",
      ],
    combinedVramWarning:
      input.combinedVramWarning ??
      "Two GPUs do not automatically create one bigger memory pool. Only use multi-GPU when the workflow says it supports it.",
  };
}
