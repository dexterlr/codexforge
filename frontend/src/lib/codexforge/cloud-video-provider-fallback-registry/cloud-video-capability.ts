import type { CloudVideoCapability, CloudVideoCapabilityId } from "./cloud-video-provider-types";

const CAPABILITY_LABELS: Record<CloudVideoCapabilityId, string> = {
  "text-to-video": "Text to video",
  "image-to-video": "Image to video",
  "keyframe-to-video": "Keyframe to video",
  upscale: "Upscale",
  "extend video": "Extend video",
  "lip sync": "Lip sync",
  "final render": "Final render",
  "cloud-only feature": "Cloud-only feature",
  "manual browser workflow": "Manual browser workflow",
};

export function buildCloudVideoCapability(
  capability: CloudVideoCapabilityId,
  input: Partial<CloudVideoCapability> = {}
): CloudVideoCapability {
  const label = input.label ?? CAPABILITY_LABELS[capability];
  return {
    id: input.id ?? `cloud-video-capability-${capability.replace(/[^a-z0-9]+/g, "-")}`,
    capability: input.capability ?? capability,
    label,
    plainEnglish:
      input.plainEnglish ??
      `${label} may be useful later if the local draft cannot reach the needed final quality.`,
    localFirstCheck:
      input.localFirstCheck ??
      "Review local planning, local draft, and local finishing options before considering cloud.",
  };
}
