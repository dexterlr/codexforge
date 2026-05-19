import type {
  CreativeAdapterCatalogItem,
  CreativeArtifactCapturePlan,
  CreativeBridgeHandoff,
  CreativeBridgeProfile,
  CreativeJobPolicy,
  CreativeJobRequest,
} from "./creative-local-bridge-types";

export function buildCreativeBridgeExecutionPrompt(input: {
  profile: CreativeBridgeProfile;
  adapter: CreativeAdapterCatalogItem;
  request: CreativeJobRequest;
  artifactPlan: CreativeArtifactCapturePlan;
  policy: CreativeJobPolicy;
}): string {
  return [
    "Inspect first.",
    "Phase 61 is preview-only.",
    "No render execution without future guarded executor.",
    "No file writes from UI.",
    "No command execution without approval.",
    "Preserve latest-message authority.",
    `Bridge profile: ${input.profile.id} (${input.profile.status}).`,
    `Adapter: ${input.adapter.id} (${input.adapter.executionMode}).`,
    `Job request: ${input.request.requestId}.`,
    `Artifact plan: ${input.artifactPlan.planId}.`,
    `Safety policy: executionAllowed=${String(input.policy.executionAllowed)}; ${input.policy.blockedReasons.join("; ")}.`,
  ].join("\n");
}

export function buildCreativeBridgeReviewPrompt(input: {
  profile: CreativeBridgeProfile;
  adapter: CreativeAdapterCatalogItem;
  request: CreativeJobRequest;
  artifactPlan: CreativeArtifactCapturePlan;
  policy: CreativeJobPolicy;
}): string {
  return [
    "Review Creative Local Bridge v1 handoff.",
    `Confirm profile ${input.profile.id}, adapter ${input.adapter.id}, and request ${input.request.requestId}.`,
    `Confirm artifact placeholders: ${input.artifactPlan.items.map((item) => item.type).join(", ")}.`,
    `Confirm blocked execution policy: ${input.policy.blockedReasons.join("; ")}.`,
    "Do not execute Blender, ComfyUI, Unreal, video render jobs, commands, provider calls, or file writes.",
  ].join("\n");
}

export function buildCreativeBridgeHandoff(input: {
  profile: CreativeBridgeProfile;
  adapter: CreativeAdapterCatalogItem;
  request: CreativeJobRequest;
  artifactPlan: CreativeArtifactCapturePlan;
  policy: CreativeJobPolicy;
}): CreativeBridgeHandoff {
  const executionPrompt = buildCreativeBridgeExecutionPrompt(input);
  const reviewPrompt = buildCreativeBridgeReviewPrompt(input);
  const handoff: CreativeBridgeHandoff = {
    handoffId: `handoff-${input.request.requestId}`,
    bridgeProfile: input.profile,
    adapter: input.adapter,
    jobRequest: input.request,
    artifactPlan: input.artifactPlan,
    policy: input.policy,
    executionPrompt,
    reviewPrompt,
    summary: [],
  };
  return { ...handoff, summary: summarizeCreativeBridgeHandoff(handoff) };
}

export function summarizeCreativeBridgeHandoff(handoff: CreativeBridgeHandoff): string[] {
  return [
    `${handoff.handoffId} is request-ready for review only.`,
    "Inspect first; preview-only in Phase 61.",
    "No render execution without future guarded executor.",
    "Preserve latest-message authority.",
  ];
}
