import type { GpuWorkerAssignment } from "./dual-gpu-worker-types";

export function buildGpuWorkerAssignment(input: Partial<GpuWorkerAssignment> = {}): GpuWorkerAssignment {
  return {
    id: input.id ?? "gpu-worker-assignment-preview",
    jobLabel: input.jobLabel ?? "Local draft plus local upscale preview",
    recommendedWorker: input.recommendedWorker ?? "GPU 1",
    reason:
      input.reason ??
      "One GPU can draft while another upscales because they are treated as separate reviewed workers.",
    reviewRequired: input.reviewRequired ?? true,
  };
}

export function buildDefaultGpuWorkerAssignments(): GpuWorkerAssignment[] {
  return [
    buildGpuWorkerAssignment({
      id: "draft-on-gpu-1",
      jobLabel: "Draft job",
      recommendedWorker: "GPU 1",
      reason: "GPU 1 is the primary draft worker for fast local iteration.",
    }),
    buildGpuWorkerAssignment({
      id: "upscale-on-gpu-2",
      jobLabel: "Upscale or interpolation job",
      recommendedWorker: "GPU 2",
      reason: "GPU 2 can handle a separate reviewed upscale or interpolation worker.",
    }),
    buildGpuWorkerAssignment({
      id: "heavy-final-manual",
      jobLabel: "Final render candidate",
      recommendedWorker: "manual override",
      reason: "Heavy final candidates should be reviewed and queued explicitly before assignment.",
    }),
  ];
}
