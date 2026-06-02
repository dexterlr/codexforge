import type { GpuWorkerHandoff } from "./dual-gpu-worker-types";

export function buildGpuWorkerHandoff(input: Partial<GpuWorkerHandoff> = {}): GpuWorkerHandoff {
  return {
    id: input.id ?? "gpu-worker-handoff",
    copyLabel: input.copyLabel ?? "Copy dual-GPU strategy allowed",
    nextStep: input.nextStep ?? "Preview the render queue controls before any future local worker starts.",
    safetyNote: input.safetyNote ?? "This is a reviewed strategy only. It does not probe hardware, select GPUs automatically, or launch jobs.",
  };
}
