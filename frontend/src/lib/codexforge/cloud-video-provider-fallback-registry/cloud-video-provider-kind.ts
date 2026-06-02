import type { CloudVideoProviderKind, CloudVideoProviderKindId } from "./cloud-video-provider-types";

const KIND_LABELS: Record<CloudVideoProviderKindId, string> = {
  runway: "Runway",
  pika: "Pika",
  replicate: "Replicate",
  luma: "Luma",
  kling: "Kling",
  veo: "Veo",
  "sora-manual": "Sora manual",
  "custom-http-video": "Custom HTTP video",
  "manual-cloud-provider": "Manual cloud provider",
  unknown: "Unknown provider",
};

export function buildCloudVideoProviderKind(
  id: CloudVideoProviderKindId = "manual-cloud-provider",
  input: Partial<CloudVideoProviderKind> = {}
): CloudVideoProviderKind {
  const label = input.label ?? KIND_LABELS[id];
  return {
    id: input.id ?? id,
    label,
    plainEnglish:
      input.plainEnglish ??
      `${label} is listed as an optional fallback profile only. CodexForge does not connect to it or send prompts.`,
    activeIntegration: false,
    manualFallbackOnly: true,
  };
}
