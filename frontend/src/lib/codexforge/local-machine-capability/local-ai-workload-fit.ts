import type { LocalAiWorkloadFit, LocalRuntimeCapability } from "./local-machine-capability-types";
import { buildLocalRuntimeCapability } from "./local-runtime-capability";

export function buildLocalAiWorkloadFit(runtime: LocalRuntimeCapability = buildLocalRuntimeCapability()): LocalAiWorkloadFit[] {
  const local = runtime.localFirstRecommended;
  return [
    {
      id: "local-code-drafts",
      workload: "Local code drafts and review prep",
      fit: local ? "excellent" : "strong",
      guidance: "Use local models for private drafts, summaries, and first-pass edits before escalating.",
    },
    {
      id: "local-creative-generation",
      workload: "Local creative generation",
      fit: "strong",
      guidance: "The workstation is suitable for image, upscale, and workflow previews when local tools are installed.",
    },
    {
      id: "local-parallel-workers",
      workload: "Parallel local workers",
      fit: "excellent",
      guidance: "Dual GPUs are safest to plan as parallel workers rather than automatically combined memory.",
    },
    {
      id: "cloud-fallback",
      workload: "Cloud fallback",
      fit: "manual",
      guidance: "Use cloud only for approved tasks that need a specific hosted model or unavailable local capability.",
    },
  ];
}
