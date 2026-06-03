import type {
  LocalModelManagerBoundary,
  LocalModelManagerInventoryItem,
  LocalModelManagerModel,
} from "./local-model-manager-types";
import { buildLocalModelManagerStableKey } from "./local-model-manager-types";

export function buildLocalModelManagerInventoryItem(
  input: Omit<LocalModelManagerInventoryItem, "id" | "fullLocalPathDisclosure"> & { idHint: string }
): LocalModelManagerInventoryItem {
  const { idHint, ...item } = input;
  return {
    id: buildLocalModelManagerStableKey("local-model", idHint, input.modelIdentity, input.runtimeTarget),
    fullLocalPathDisclosure: "secondary only",
    ...item,
  };
}

export function buildLocalModelManagerInventory(): LocalModelManagerInventoryItem[] {
  return [
    buildLocalModelManagerInventoryItem({
      idHint: "ollama-coding-llm",
      modelIdentity: "Local coding or reasoning LLM",
      modelFamily: "local-llm",
      runtimeTarget: "Ollama",
      localAvailabilityStatus: "live-inventory-boundary-required",
      capabilitySummary: "Useful for private planning, summaries, and cheap draft reasoning when a suitable local model is already installed.",
      diskVramReadinessNote: "Disk and VRAM readiness are planning notes only until a reviewed local inventory boundary reports them.",
      routingFit: "Fits task router private prepass and token-saving draft routes before any cloud escalation.",
      missingModelGuidance: "If the model is missing, use manual install guidance outside CodexForge and return here to mark readiness later.",
      manualResolutionNote: "Manual resolution note: operators choose and install models themselves; CodexForge does not download or install them.",
    }),
    buildLocalModelManagerInventoryItem({
      idHint: "lm-studio-openai-compatible",
      modelIdentity: "Loaded LM Studio chat model",
      modelFamily: "local-llm",
      runtimeTarget: "LM Studio",
      localAvailabilityStatus: "unknown",
      capabilitySummary: "Good for local chat, prompt shaping, and OpenAI-compatible adapter trials when the local server is deliberately started.",
      diskVramReadinessNote: "Context and quantization determine VRAM fit; dual GPUs are parallel workers unless the runtime explicitly supports memory sharing.",
      routingFit: "Fits local OpenAI-compatible adapter planning and local-only test handoff.",
      missingModelGuidance: "Load a model manually in LM Studio, then use a future approved boundary for live status.",
      manualResolutionNote: "Manual resolution note: endpoint and model choice stay operator-controlled and are not stored as secrets.",
    }),
    buildLocalModelManagerInventoryItem({
      idHint: "comfyui-creative-checkpoint",
      modelIdentity: "Creative checkpoint for image, keyframe, or video workflow",
      modelFamily: "creative-checkpoint",
      runtimeTarget: "ComfyUI",
      localAvailabilityStatus: "live-inventory-boundary-required",
      capabilitySummary: "Supports local image, keyframe, and video workflow planning when workflow compatibility confirms the expected model family.",
      diskVramReadinessNote: "Keep full local paths secondary; above-the-fold readiness only reports model family, fit, and missing guidance.",
      routingFit: "Fits workflow compatibility checker and missing model resolver handoff before any approved ComfyUI submit trial.",
      missingModelGuidance: "Route missing checkpoints to the Missing Model and Node Resolver. Do not download models from this page.",
      manualResolutionNote: "Manual resolution note: local file placement remains a manual operator step outside this UI.",
    }),
  ];
}

export function buildLocalModelManagerBoundary(): LocalModelManagerBoundary {
  return {
    localOnly: true,
    liveInventoryBoundary: "approved local boundary required",
    automaticDownloadsAllowed: false,
    installAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    fullLocalPathsAboveFoldAllowed: false,
    providerRegistryMutationAllowed: false,
    noSecretStorage: true,
  };
}

export function summarizeLocalModelManager(model: Pick<LocalModelManagerModel, "inventory">): string {
  return `Local model manager is a planning/readiness surface for ${model.inventory.length} local model target(s). Live inventory remains behind approved local boundary. No automatic downloads. Full local paths stay secondary.`;
}

export function buildLocalModelManagerModel(): LocalModelManagerModel {
  const inventory = buildLocalModelManagerInventory();
  const model: LocalModelManagerModel = {
    title: "Local model manager",
    summary: "",
    inventory,
    boundary: buildLocalModelManagerBoundary(),
    advancedDetails: [
      "Live inventory remains behind approved local boundary",
      "No automatic downloads",
      "No model installs",
      "No provider registry mutation",
      "No arbitrary local file browsing",
      "Manual resolution note",
      "Local availability status",
      "Full local paths stay secondary",
    ],
  };
  return { ...model, summary: summarizeLocalModelManager(model) };
}
