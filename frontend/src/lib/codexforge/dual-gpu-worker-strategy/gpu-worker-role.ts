import type { GpuWorkerRole } from "./dual-gpu-worker-types";

export function buildGpuWorkerRole(input: GpuWorkerRole): GpuWorkerRole {
  return { ...input, explicitReviewRequired: true };
}

export function buildDefaultGpuWorkerRoles(): GpuWorkerRole[] {
  return [
    buildGpuWorkerRole({
      id: "gpu-1-primary-draft-worker",
      workerId: "GPU 1",
      label: "GPU 1 primary draft worker",
      role: "Run reviewed local draft jobs when future execution is approved.",
      whenUseful: "Best when quick draft iteration is the next safe step.",
      explicitReviewRequired: true,
    }),
    buildGpuWorkerRole({
      id: "gpu-2-upscale-interpolation-worker",
      workerId: "GPU 2",
      label: "GPU 2 upscale/interpolation worker",
      role: "Handle reviewed upscale or interpolation plans after a draft is worth keeping.",
      whenUseful: "Best when GPU 1 is drafting and the second card can process a separate reviewed job.",
      explicitReviewRequired: true,
    }),
    buildGpuWorkerRole({
      id: "gpu-2-parallel-draft-worker-when-idle",
      workerId: "GPU 2",
      label: "GPU 2 parallel draft worker when idle",
      role: "Run a separate draft worker only when idle and explicitly assigned.",
      whenUseful: "Best for independent draft jobs, not one job pretending to use combined VRAM.",
      explicitReviewRequired: true,
    }),
    buildGpuWorkerRole({
      id: "one-heavy-job-at-a-time-if-memory-risk",
      workerId: "manual override",
      label: "one heavy job at a time if memory risk",
      role: "Hold other heavy work when a job may be memory, thermal, or power intensive.",
      whenUseful: "Best for final candidates or unknown resource posture.",
      explicitReviewRequired: true,
    }),
    buildGpuWorkerRole({
      id: "manual-override-later",
      workerId: "manual override",
      label: "manual override later",
      role: "Let the operator override a future assignment after reviewing risk.",
      whenUseful: "Best when a workflow has explicit multi-GPU support or special constraints.",
      explicitReviewRequired: true,
    }),
  ];
}
