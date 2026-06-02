import type { DualGpuWorkerSummary } from "./dual-gpu-worker-types";
import { buildDefaultDualGpuProfile } from "./dual-gpu-profile";
import { buildDefaultGpuWorkerAssignments } from "./gpu-worker-assignment";
import { buildGpuWorkerHandoff } from "./gpu-worker-handoff";
import { buildDefaultGpuWorkerRoles } from "./gpu-worker-role";
import { buildGpuWorkerRoutingStrategy } from "./gpu-worker-routing-strategy";
import { buildGpuWorkerSafety } from "./gpu-worker-safety";

export function buildDualGpuWorkerSummary(): DualGpuWorkerSummary {
  const summary: DualGpuWorkerSummary = {
    profile: buildDefaultDualGpuProfile(),
    roles: buildDefaultGpuWorkerRoles(),
    assignments: buildDefaultGpuWorkerAssignments(),
    safety: buildGpuWorkerSafety(),
    routingStrategy: buildGpuWorkerRoutingStrategy(),
    handoff: buildGpuWorkerHandoff(),
    summary: "",
  };
  return { ...summary, summary: summarizeDualGpuStrategy(summary) };
}

export function summarizeDualGpuStrategy(summary: DualGpuWorkerSummary): string {
  return `${summary.profile.gpuLabel}: ${summary.roles.length} reviewed worker roles, parallel-worker default, combined VRAM not assumed.`;
}
