import type { ComfyUiHealthTarget } from "./comfyui-health-types";

export function buildComfyUiHealthTarget(input: ComfyUiHealthTarget): ComfyUiHealthTarget {
  return { ...input };
}

export function buildDefaultComfyUiHealthTarget(): ComfyUiHealthTarget {
  return buildComfyUiHealthTarget({
    id: "comfyui-local-default",
    name: "ComfyUI local server",
    expectedBaseUrl: "http://127.0.0.1:8188",
    hostRule: "Localhost or 127.0.0.1 only before any future live check.",
    localOnlyRecommended: true,
  });
}
