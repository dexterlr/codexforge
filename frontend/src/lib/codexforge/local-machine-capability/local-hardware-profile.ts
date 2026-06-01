import type { LocalHardwareProfile } from "./local-machine-capability-types";

export function buildLocalHardwareProfile(input: Partial<LocalHardwareProfile> = {}): LocalHardwareProfile {
  return {
    id: input.id ?? "operator-high-memory-workstation",
    label: input.label ?? "High-memory Threadripper Pro workstation",
    memoryGb: input.memoryGb ?? 256,
    cpuClass: input.cpuClass ?? "Threadripper Pro",
    motherboard: input.motherboard ?? "ASUS Pro WS Sage SE",
    powerSupply: input.powerSupply ?? "Seasonic 2200W PSU",
    tags: input.tags ?? [
      "high-memory-workstation",
      "dual-gpu-workstation",
      "local-ai-capable",
      "local-video-draft-capable",
      "local-upscale-capable",
      "local-first-recommended",
    ],
    manualProfileOnly: input.manualProfileOnly ?? true,
  };
}

export function buildDefaultLocalHardwareProfile(): LocalHardwareProfile {
  return buildLocalHardwareProfile();
}
