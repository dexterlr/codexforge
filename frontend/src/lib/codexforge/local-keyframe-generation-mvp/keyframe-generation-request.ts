import type { KeyframeGenerationRequest } from "./local-keyframe-generation-types";

export function buildKeyframeGenerationRequest(
  input: Partial<KeyframeGenerationRequest> = {}
): KeyframeGenerationRequest {
  return {
    id: input.id ?? "local-keyframe-request-001",
    keyframePlanId: input.keyframePlanId ?? "keyframe-plan-draft-001",
    selectedShots: input.selectedShots ?? ["shot-001 opening still", "shot-002 action still", "shot-003 closing still"],
    promptSet: input.promptSet ?? [
      "Opening still frame with clear subject and lighting.",
      "Middle still frame showing the key action.",
      "Closing still frame with final composition.",
    ],
    consistencyNotes: input.consistencyNotes ?? [
      "Keep the same subject identity across still frames.",
      "Use matching color and lighting so a future video draft feels coherent.",
    ],
    localImageWorkflowPackage: input.localImageWorkflowPackage ?? "reviewed-keyframe-image-workflow-package",
    artifactDestination: input.artifactDestination ?? "safe local keyframe artifact workspace, supplied later",
    approvalStatus: input.approvalStatus ?? "request-reviewed",
    executionPosture: input.executionPosture ?? "blocked-until-approved-executor",
    noAutoRunGuarantee: true,
  };
}

export function buildDefaultKeyframeGenerationRequest(): KeyframeGenerationRequest {
  return buildKeyframeGenerationRequest();
}
