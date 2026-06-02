import type { GpuJobProfile, GpuJobResourcePlan } from "./local-gpu-scheduler-types";

export function buildGpuJobResourcePlan(profile: GpuJobProfile, input: Partial<GpuJobResourcePlan> = {}): GpuJobResourcePlan {
  return {
    id: input.id ?? `${profile.id}-resource-plan`,
    jobId: profile.id,
    resourcePosture: input.resourcePosture ?? profile.resourcePosture,
    queueReason:
      input.queueReason ??
      "Queues prevent overload by making the operator review heavy GPU work before anything starts.",
    workerHint:
      input.workerHint ??
      (profile.resourcePosture === "very-heavy"
        ? "Treat as one heavy job unless the workflow explicitly supports more."
        : "Can be previewed as a worker assignment later."),
    safetyNote: input.safetyNote ?? "This is a plan, not execution. No system command, hardware probe, or ComfyUI call is made.",
  };
}
