import type { ComfyUiMetadataSafety } from "./comfyui-metadata-probe-types";

export function buildComfyUiMetadataSafety(): ComfyUiMetadataSafety {
  return {
    id: "comfyui-metadata-safety",
    guarantees: [
      "Metadata probes do not send prompts.",
      "Metadata probes do not submit workflows.",
      "Metadata probes do not mutate the ComfyUI queue.",
      "Metadata probes do not generate images or video.",
      "Metadata is supplied, previewed, or gathered later by a future approved local probe.",
    ],
    blocked: [
      "prompt payload",
      "workflow payload",
      "queue submit",
      "queue mutation",
      "cloud provider API call",
      "secret display",
      "file write",
    ],
  };
}
