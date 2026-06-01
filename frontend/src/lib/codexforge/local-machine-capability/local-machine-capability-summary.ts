import type { LocalMachineCapabilitySummary } from "./local-machine-capability-types";
import { buildLocalAiWorkloadFit } from "./local-ai-workload-fit";
import { buildLocalGpuProfile } from "./local-gpu-profile";
import { buildDefaultLocalHardwareProfile } from "./local-hardware-profile";
import { buildLocalRuntimeCapability } from "./local-runtime-capability";
import { buildLocalVideoReadiness } from "./local-video-readiness";

export function summarizeLocalMachineCapability(summary: LocalMachineCapabilitySummary): string {
  return `${summary.hardware.label} with ${summary.hardware.memoryGb}GB RAM and ${summary.gpu.label}: local-first recommended, dual GPUs treated as parallel workers, no hardware auto-detection.`;
}

export function buildLocalMachineCapabilitySummary(): LocalMachineCapabilitySummary {
  const hardware = buildDefaultLocalHardwareProfile();
  const gpu = buildLocalGpuProfile();
  const runtime = buildLocalRuntimeCapability(hardware, gpu);
  const video = buildLocalVideoReadiness();
  const summary: LocalMachineCapabilitySummary = {
    hardware,
    gpu,
    runtime,
    workloads: buildLocalAiWorkloadFit(runtime),
    video,
    summary: "",
    nextAction: "Review local capability, then preview local provider probes before any live local server check.",
  };
  return { ...summary, summary: summarizeLocalMachineCapability(summary) };
}
