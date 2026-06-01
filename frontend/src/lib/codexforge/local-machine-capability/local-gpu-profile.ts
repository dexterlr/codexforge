import type { LocalGpuProfile } from "./local-machine-capability-types";

export function buildLocalGpuProfile(input: Partial<LocalGpuProfile> = {}): LocalGpuProfile {
  return {
    id: input.id ?? "dual-rtx-5090-workstation",
    label: input.label ?? "2x RTX 5090 LC OC",
    gpuCount: input.gpuCount ?? 2,
    gpuClass: input.gpuClass ?? "RTX 5090 class",
    cooling: input.cooling ?? "liquid-cooled board partners",
    vramGuidance:
      input.vramGuidance ??
      "Treat the cards as two strong workers. Do not assume one combined VRAM pool unless a local runtime explicitly supports it.",
    safestParallelUse:
      input.safestParallelUse ??
      "Run parallel local workers, separate model jobs, render plus upscale queues, or one model server per card.",
  };
}
