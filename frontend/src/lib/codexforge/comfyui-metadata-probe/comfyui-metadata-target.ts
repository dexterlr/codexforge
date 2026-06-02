import { isLocalComfyUiBaseUrl } from "../comfyui-live-health-probe-gate";
import type { ComfyUiMetadataTarget } from "./comfyui-metadata-probe-types";

export function buildComfyUiMetadataTarget(input: Partial<ComfyUiMetadataTarget> = {}): ComfyUiMetadataTarget {
  const baseUrl = input.baseUrl ?? "http://127.0.0.1:8188";
  return {
    id: input.id ?? "comfyui-metadata-target",
    name: input.name ?? "ComfyUI local metadata target",
    baseUrl,
    localOnly: input.localOnly ?? isLocalComfyUiBaseUrl(baseUrl),
    metadataOnly: true,
  };
}

export function buildDefaultComfyUiMetadataTarget(): ComfyUiMetadataTarget {
  return buildComfyUiMetadataTarget();
}
