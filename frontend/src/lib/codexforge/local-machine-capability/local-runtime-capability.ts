import type { LocalHardwareProfile, LocalGpuProfile, LocalRuntimeCapability } from "./local-machine-capability-types";
import { buildDefaultLocalHardwareProfile } from "./local-hardware-profile";
import { buildLocalGpuProfile } from "./local-gpu-profile";

export function buildLocalRuntimeCapability(
  hardware: LocalHardwareProfile = buildDefaultLocalHardwareProfile(),
  gpu: LocalGpuProfile = buildLocalGpuProfile()
): LocalRuntimeCapability {
  return {
    id: "local-runtime-capability",
    localFirstRecommended: hardware.tags.includes("local-first-recommended"),
    strengths: [
      `${hardware.memoryGb}GB RAM supports large local contexts, multiple services, and creative tools at the same time.`,
      `${gpu.gpuCount} high-end GPUs make local-first AI and creative drafts realistic.`,
      "Local runs can reduce cloud spend and keep sensitive drafts on the workstation.",
    ],
    cautions: [
      "Browser UI does not inspect hardware automatically.",
      "Real GPU assignment stays a runtime setup task.",
      "Cloud fallback should be used only when a task needs a provider that local models cannot cover.",
    ],
    blocked: "No system commands, live probes, provider calls, or prompt payloads run from this profile.",
  };
}
