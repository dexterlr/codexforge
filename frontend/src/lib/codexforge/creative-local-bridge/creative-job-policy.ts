import type {
  CreativeAdapterCatalogItem,
  CreativeBridgeProfile,
  CreativeJobApprovalPacket,
  CreativeJobPolicy,
  CreativeJobRequest,
} from "./creative-local-bridge-types";
import { buildCreativeAdapterCatalog } from "./creative-adapter-catalog";
import { buildDefaultCreativeBridgeProfiles } from "./creative-bridge-profile";
import { buildCreativeJobApprovalPacket, validateCreativeJobApprovalPacket } from "./creative-job-approval";
import { buildCreativeJobRequest, validateCreativeJobRequest } from "./creative-job-request";

export function buildCreativeJobPolicy(input: {
  request?: CreativeJobRequest;
  adapter?: CreativeAdapterCatalogItem;
  profile?: CreativeBridgeProfile;
  approval?: CreativeJobApprovalPacket;
} = {}): CreativeJobPolicy {
  const request = input.request ?? buildCreativeJobRequest();
  const adapter =
    input.adapter ?? buildCreativeAdapterCatalog().find((item) => item.id === request.adapterId);
  const profile =
    input.profile ?? buildDefaultCreativeBridgeProfiles().find((item) => item.id === request.bridgeProfileId);
  const approval = input.approval ?? buildCreativeJobApprovalPacket(request);
  const requestValidation = validateCreativeJobRequest(request);
  const approvalValidation = validateCreativeJobApprovalPacket(approval);
  const blockedReasons = [
    ...requestValidation.blockedReasons,
    !adapter ? "adapter required" : "",
    !profile ? "bridge profile required" : "",
    "execution blocked in Phase 61",
    "Blender execution blocked in Phase 61",
    "ComfyUI execution blocked in Phase 61",
    "Unreal execution blocked in Phase 61",
    "video render execution blocked in Phase 61",
    "artifact file writes blocked from UI",
    "command execution blocked from UI",
    "broker execution blocked",
    "external provider calls blocked",
    "local bridge execution requires future guarded executor",
  ].filter(Boolean);
  const previewAllowed = requestValidation.valid && Boolean(adapter) && Boolean(profile);

  return {
    previewAllowed,
    requestReady: previewAllowed && approvalValidation.valid,
    executionAllowed: false,
    blockedReasons,
    warnings: [
      ...requestValidation.warnings,
      "Explicit approval required for future execution.",
      "Preview mode allowed when structurally valid.",
    ],
    nextSafeAction: previewAllowed
      ? "Review approval packet, artifact capture plan, and copy handoff for a future guarded executor."
      : "Complete bridge profile, adapter, and job request metadata.",
  };
}

export function isCreativeJobAllowed(policy: CreativeJobPolicy = buildCreativeJobPolicy()): boolean {
  return policy.executionAllowed === true;
}

export function summarizeCreativeJobPolicy(policy: CreativeJobPolicy = buildCreativeJobPolicy()): string[] {
  return [
    `Preview allowed: ${String(policy.previewAllowed)}.`,
    `Execution allowed: ${String(policy.executionAllowed)}.`,
    `${policy.blockedReasons.length} blocked reasons visible.`,
    policy.nextSafeAction,
  ];
}
