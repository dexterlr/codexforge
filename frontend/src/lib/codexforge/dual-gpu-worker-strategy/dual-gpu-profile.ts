import type { DualGpuProfile } from "./dual-gpu-worker-types";

export function buildDualGpuProfile(input: Partial<DualGpuProfile> = {}): DualGpuProfile {
  return {
    id: input.id ?? "dual-rtx-5090-worker-profile",
    workstation: input.workstation ?? "Threadripper Pro workstation, 256GB RAM, ASUS Pro WS Sage SE, Seasonic 2200W PSU",
    gpuLabel: input.gpuLabel ?? "2x RTX 5090 LC OC",
    gpuCount: input.gpuCount ?? 2,
    memoryGuidance:
      input.memoryGuidance ??
      "Two GPUs usually mean two parallel workers, not automatic combined VRAM. Combined memory only applies when a workflow explicitly supports it.",
    manualProfileOnly: input.manualProfileOnly ?? true,
  };
}

export function buildDefaultDualGpuProfile(): DualGpuProfile {
  return buildDualGpuProfile();
}
