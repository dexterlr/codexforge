import { listCodexForgeCapabilityBridgeDescriptors } from "@/lib/codexforge/tools/capability-bridge-manifest";
import type { CodexForgeCapabilityRoadmapItem } from "./capability-types";

export function buildCapabilityRoadmap(): CodexForgeCapabilityRoadmapItem[] {
  return listCodexForgeCapabilityBridgeDescriptors().map((capability, index) => ({
    id: `${capability.id}:roadmap:${index + 1}`,
    capabilityId: capability.id,
    label: capability.label,
    status: capability.status,
    nextMilestone: capability.nextMilestones[0] ?? "Define next adapter contract.",
    safetyGate: capability.safetyInvariants[0] ?? "Maintain operator-visible approval boundary.",
  }));
}
