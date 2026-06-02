import type { GpuWorkerSafety } from "./dual-gpu-worker-types";

export function buildGpuWorkerSafety(input: Partial<GpuWorkerSafety> = {}): GpuWorkerSafety {
  return {
    id: input.id ?? "gpu-worker-safety",
    notes:
      input.notes ??
      [
        "Do not assume combined VRAM.",
        "Prefer explicit worker assignment.",
        "Monitor heavy jobs manually.",
        "Stop if thermal/power concerns appear.",
        "No auto-run guarantee.",
      ],
    blocked: input.blocked ?? "Automatic GPU selection and real job launch remain blocked until approved execution exists.",
  };
}
