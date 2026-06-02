import type { GpuJobPriority, GpuJobPriorityLevel, GpuJobProfile } from "./local-gpu-scheduler-types";

function priorityFor(profile: GpuJobProfile): GpuJobPriorityLevel {
  if (profile.kind === "urgent retry") return "now";
  if (profile.kind === "keyframe generation" || profile.kind === "short video draft") return "soon";
  if (profile.kind === "artifact review task") return "blocked";
  if (profile.kind === "background batch") return "background";
  return "later";
}

export function buildGpuJobPriority(profile: GpuJobProfile, input: Partial<GpuJobPriority> = {}): GpuJobPriority {
  const level = input.level ?? priorityFor(profile);
  return {
    id: input.id ?? `${profile.id}-priority`,
    jobId: profile.id,
    level,
    reason:
      input.reason ??
      (level === "blocked"
        ? "Review tasks do not need GPU execution."
        : "Priority is based on review value, resource posture, and avoiding overloaded local work."),
  };
}
