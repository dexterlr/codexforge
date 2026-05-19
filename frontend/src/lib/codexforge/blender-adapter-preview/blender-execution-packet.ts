import type {
  BlenderAdapterSafetyPolicy,
  BlenderExecutionPacket,
  BlenderExecutionPacketValidation,
  BlenderPythonPreview,
  BlenderSceneInput,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

export function buildBlenderExecutionPacket(args: {
  sceneInput: BlenderSceneInput;
  sceneModel: BlenderSceneModel;
  pythonPreview: BlenderPythonPreview;
  safetyPolicy: BlenderAdapterSafetyPolicy;
  bridgeProfileId?: string;
  adapterId?: string;
}): BlenderExecutionPacket {
  return {
    packetId: buildBlenderAdapterStableId("blender-execution-packet", [
      args.sceneInput.sceneInputId,
      args.pythonPreview.previewId,
    ]),
    sourceSceneInputId: args.sceneInput.sceneInputId,
    bridgeProfileId: args.bridgeProfileId ?? "blender-local",
    adapterId: args.adapterId ?? "blender-adapter-preview-v1",
    scriptPreviewId: args.pythonPreview.previewId,
    expectedArtifacts: args.sceneModel.expectedArtifacts,
    approvalRequirement: "Explicit operator approval required before any future executor can be considered.",
    safetyPolicy: args.safetyPolicy,
    futureExecutorBoundary:
      "Future executor boundary: packet is request-ready metadata only and cannot launch Blender, execute Python, render, or write files in Phase 62.",
    validationRecommendations: [
      "Review generated Python preview for unsafe calls.",
      "Confirm artifact capture plan before execution in a future phase.",
      "Preserve latest-message authority during review.",
    ],
    noExecutionGuarantee:
      "No execution guarantee: this packet is copyable review metadata only; it does not run Blender or write artifacts.",
  };
}

export function validateBlenderExecutionPacket(
  packet: BlenderExecutionPacket
): BlenderExecutionPacketValidation {
  const blockedReasons = [
    packet.safetyPolicy.executionAllowed ? "Safety policy unexpectedly allows execution." : null,
    packet.futureExecutorBoundary.includes("Future executor boundary")
      ? null
      : "Packet must say future executor boundary.",
  ].filter((item): item is string => !!item);

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings: packet.safetyPolicy.warnings,
  };
}

export function summarizeBlenderExecutionPacket(packet: BlenderExecutionPacket): string[] {
  return [
    `Packet ${packet.packetId} targets adapter ${packet.adapterId}.`,
    packet.futureExecutorBoundary,
    packet.noExecutionGuarantee,
  ];
}
