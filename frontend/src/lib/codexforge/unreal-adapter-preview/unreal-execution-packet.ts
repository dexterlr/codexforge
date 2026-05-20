import type {
  UnrealAdapterSafetyPolicy,
  UnrealAssetPlan,
  UnrealBuildSettings,
  UnrealCommandPreview,
  UnrealExecutionPacket,
  UnrealExecutionPacketValidation,
  UnrealLevelModel,
  UnrealProjectInput,
  UnrealSequencerPlan,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

export function buildUnrealExecutionPacket(args: {
  projectInput: UnrealProjectInput;
  levelModel: UnrealLevelModel;
  commandPreview: UnrealCommandPreview;
  assetPlan: UnrealAssetPlan;
  sequencerPlan: UnrealSequencerPlan;
  buildSettings: UnrealBuildSettings;
  safetyPolicy: UnrealAdapterSafetyPolicy;
  bridgeProfileId?: string;
  adapterId?: string;
}): UnrealExecutionPacket {
  return {
    packetId: buildUnrealAdapterStableId("unreal-execution-packet", [
      args.projectInput.projectInputId,
      args.commandPreview.previewId,
    ]),
    sourceProjectInputId: args.projectInput.projectInputId,
    bridgeProfileId: args.bridgeProfileId ?? "unreal-local",
    adapterId: args.adapterId ?? "unreal-adapter-preview-v1",
    commandPreviewId: args.commandPreview.previewId,
    expectedArtifacts: args.levelModel.expectedArtifacts,
    assetPlan: args.assetPlan,
    sequencerPlan: args.sequencerPlan,
    buildSettings: args.buildSettings,
    approvalRequirement: "Explicit operator approval required before any future executor can be considered.",
    safetyPolicy: args.safetyPolicy,
    futureExecutorBoundary:
      "Future executor boundary: packet is request-ready metadata only and cannot launch Unreal, execute editor commands, run automation, render, package/build, or write files in Phase 65.",
    validationRecommendations: [
      "Review generated command preview for unsafe executable syntax.",
      "Confirm asset license and placeholder path responsibility.",
      "Confirm artifact capture plan before any future executor.",
      "Preserve latest-message authority during review.",
    ],
    noExecutionGuarantee:
      "No execution guarantee: this packet is copyable review metadata only; it does not run Unreal or write artifacts.",
  };
}

export function validateUnrealExecutionPacket(
  packet: UnrealExecutionPacket
): UnrealExecutionPacketValidation {
  const blockedReasons = [
    packet.safetyPolicy.executionAllowed ? "Safety policy unexpectedly allows execution." : null,
    packet.futureExecutorBoundary.includes("Future executor boundary")
      ? null
      : "Packet must say future executor boundary.",
    packet.noExecutionGuarantee.toLowerCase().includes("does not run unreal")
      ? null
      : "Packet must guarantee no Unreal execution.",
  ].filter((item): item is string => !!item);

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings: packet.safetyPolicy.warnings,
  };
}

export function summarizeUnrealExecutionPacket(packet: UnrealExecutionPacket): string[] {
  return [
    `Packet ${packet.packetId} targets adapter ${packet.adapterId}.`,
    packet.futureExecutorBoundary,
    packet.noExecutionGuarantee,
  ];
}
