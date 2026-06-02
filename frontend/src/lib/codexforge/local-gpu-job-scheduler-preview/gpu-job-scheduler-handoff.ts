import type { GpuJobSchedulerHandoff } from "./local-gpu-scheduler-types";

export function buildGpuJobSchedulerHandoff(input: Partial<GpuJobSchedulerHandoff> = {}): GpuJobSchedulerHandoff {
  return {
    id: input.id ?? "gpu-job-scheduler-handoff",
    copyLabel: input.copyLabel ?? "Copy schedule preview allowed",
    nextStep: input.nextStep ?? "Review the dual-GPU strategy, then preview the render queue controls.",
    safetyNote: input.safetyNote ?? "This handoff is copy-only and does not start, pause, resume, retry, or cancel any job.",
  };
}
