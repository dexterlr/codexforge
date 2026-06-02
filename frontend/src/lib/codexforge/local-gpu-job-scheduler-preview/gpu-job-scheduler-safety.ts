import type { GpuJobSchedulerSafety } from "./local-gpu-scheduler-types";

export function buildGpuJobSchedulerSafety(input: Partial<GpuJobSchedulerSafety> = {}): GpuJobSchedulerSafety {
  return {
    id: input.id ?? "gpu-job-scheduler-safety",
    notes:
      input.notes ??
      [
        "Heavy jobs should be queued, not stacked blindly.",
        "Nothing starts until explicitly approved execution exists.",
        "No hardware/system command is run from this preview.",
        "No ComfyUI workflow run or provider call is made.",
      ],
    blocked: input.blocked ?? "Real scheduling remains blocked until an approved local executor and queue controls exist.",
  };
}
