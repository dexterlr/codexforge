import type {
  CreativeArtifactCaptureType,
  CreativeJobKind,
  CreativeJobRequest,
  CreativeJobValidation,
  CreativeRiskLevel,
} from "./creative-local-bridge-types";

function slugifyStable(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72) || "request";
}

export function buildCreativeJobRequest(input: {
  sourceCreativePlanId?: string;
  goal?: string;
  medium?: string;
  bridgeProfileId?: string;
  adapterId?: string;
  inputSummary?: string;
  expectedArtifacts?: CreativeArtifactCaptureType[];
  jobKind?: CreativeJobKind;
  riskLevel?: CreativeRiskLevel;
  operatorIntent?: string;
} = {}): CreativeJobRequest {
  const goal = input.goal ?? "Preview a creative local bridge handoff without execution";
  const adapterId = input.adapterId ?? "blender-python-preview";
  const sourceCreativePlanId = input.sourceCreativePlanId ?? "creative-plan-preview";
  const requestId = `creative-job-${slugifyStable(`${sourceCreativePlanId}-${adapterId}-${goal}`)}`;

  return {
    requestId,
    jobKind: input.jobKind ?? "blender-scene-preview",
    sourceCreativePlanId,
    goal,
    medium: input.medium ?? "3D scene",
    bridgeProfileId: input.bridgeProfileId ?? "blender-local",
    adapterId,
    inputSummary:
      input.inputSummary ?? "Storyboard, scene, workflow, and artifact expectations summarized for preview.",
    expectedArtifacts: input.expectedArtifacts ?? ["image", "video", "blender-file", "render-log"],
    outputPathPlaceholder: "{operator-selected-artifact-output-path}",
    riskLevel: input.riskLevel ?? "high",
    operatorIntent: input.operatorIntent ?? "Prepare a request-ready preview for future guarded executor handoff.",
    approvalRequired: true,
    noExecutionGuarantee:
      "Phase 61 builds a preview-only job request; it does not execute Blender, ComfyUI, Unreal, video renders, commands, provider calls, or file writes.",
  };
}

export function validateCreativeJobRequest(request: CreativeJobRequest): CreativeJobValidation {
  const blockedReasons = [
    !request.requestId ? "request id required" : "",
    !request.sourceCreativePlanId ? "source creative plan id required" : "",
    !request.bridgeProfileId ? "bridge profile required" : "",
    !request.adapterId ? "adapter required" : "",
  ].filter(Boolean);
  const warnings = request.approvalRequired
    ? ["Approval packet required before any future executor handoff."]
    : ["Manual export still cannot execute from UI."];

  return { valid: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeCreativeJobRequest(request: CreativeJobRequest): string[] {
  return [
    `${request.requestId} targets ${request.adapterId}.`,
    `Risk level: ${request.riskLevel}.`,
    request.noExecutionGuarantee,
  ];
}
