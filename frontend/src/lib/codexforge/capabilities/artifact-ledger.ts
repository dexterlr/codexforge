import { listCodexForgeCapabilityBridgeDescriptors } from "@/lib/codexforge/tools/capability-bridge-manifest";
import { buildCreativeProductionPlan } from "./creative-production";
import type {
  CodexForgeCapabilityArtifact,
  CodexForgeCapabilityId,
} from "./capability-types";

const creativeCapabilities: CodexForgeCapabilityId[] = [
  "blender-production",
  "comfyui-production",
  "unreal-production",
];

export function buildArtifactPreview(
  capabilityId: CodexForgeCapabilityId,
  label: string,
  type: CodexForgeCapabilityArtifact["type"],
  index: number
): CodexForgeCapabilityArtifact {
  return {
    artifactId: `${capabilityId}:artifact:${type}:${index}`,
    capabilityId,
    type,
    label,
    status: capabilityId === "broker-execution" ? "blocked" : "preview-only",
    outputPathPlaceholder: `artifacts/codexforge/${capabilityId}/${type}-${index}`,
    createdByStage: type === "research-note" ? "research-preview" : "planning-preview",
    safetyNote:
      capabilityId === "broker-execution"
        ? "Broker execution is visibly blocked; no broker artifact represents an order."
        : "Preview-only artifact ledger; no file writes occur from the cockpit.",
  };
}

export function buildArtifactLedger(): CodexForgeCapabilityArtifact[] {
  const capabilityArtifacts = listCodexForgeCapabilityBridgeDescriptors().map((capability, index) =>
    buildArtifactPreview(capability.id, `${capability.label} audit note`, "audit-note", index + 1)
  );

  const creativeArtifacts = creativeCapabilities.flatMap((capabilityId) => {
    const plan = buildCreativeProductionPlan(capabilityId);
    return plan.artifactOutputPreview.map((label, index) =>
      buildArtifactPreview(capabilityId, label, index === 0 ? "plan" : "render-preview", index + 1)
    );
  });
  const blenderPreviewArtifacts = [
    buildArtifactPreview(
      "blender-adapter-preview",
      "blender-python-preview placeholder",
      "scene",
      1
    ),
    buildArtifactPreview(
      "blender-adapter-preview",
      "blender-scene-plan placeholder",
      "plan",
      2
    ),
  ];

  return [...capabilityArtifacts, ...creativeArtifacts, ...blenderPreviewArtifacts];
}

export function summarizeArtifactLedger(artifacts = buildArtifactLedger()): string {
  const blocked = artifacts.filter((artifact) => artifact.status === "blocked").length;
  return `${artifacts.length} preview artifact(s), ${blocked} blocked broker artifact(s), zero file writes.`;
}
