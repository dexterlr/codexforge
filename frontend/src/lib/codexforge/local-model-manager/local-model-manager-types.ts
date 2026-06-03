export type LocalModelManagerFamily =
  | "local-llm"
  | "creative-checkpoint"
  | "LoRA"
  | "VAE"
  | "embedding"
  | "runtime-pack";

export type LocalModelManagerRuntimeTarget =
  | "Ollama"
  | "LM Studio"
  | "ComfyUI"
  | "local OpenAI-compatible"
  | "manual review";

export type LocalModelAvailabilityStatus =
  | "live-inventory-boundary-required"
  | "manual-report-ready"
  | "missing"
  | "unknown";

export type LocalModelManagerInventoryItem = {
  id: string;
  modelIdentity: string;
  modelFamily: LocalModelManagerFamily;
  runtimeTarget: LocalModelManagerRuntimeTarget;
  localAvailabilityStatus: LocalModelAvailabilityStatus;
  capabilitySummary: string;
  diskVramReadinessNote: string;
  routingFit: string;
  missingModelGuidance: string;
  manualResolutionNote: string;
  fullLocalPathDisclosure: "secondary only";
};

export type LocalModelManagerBoundary = {
  localOnly: true;
  liveInventoryBoundary: "approved local boundary required";
  automaticDownloadsAllowed: false;
  installAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  fullLocalPathsAboveFoldAllowed: false;
  providerRegistryMutationAllowed: false;
  noSecretStorage: true;
};

export type LocalModelManagerModel = {
  title: "Local model manager";
  summary: string;
  inventory: LocalModelManagerInventoryItem[];
  boundary: LocalModelManagerBoundary;
  advancedDetails: string[];
};

export function buildLocalModelManagerStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
