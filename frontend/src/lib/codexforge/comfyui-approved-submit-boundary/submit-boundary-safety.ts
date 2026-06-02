import type { SubmitBoundarySafety } from "./comfyui-submit-boundary-types";

export function buildSubmitBoundarySafety(): SubmitBoundarySafety {
  return {
    id: "comfyui-submit-boundary-safety",
    guarantees: [
      "No submit button is enabled by default.",
      "No workflow is submitted to ComfyUI in this phase.",
      "No prompt payload is sent.",
      "No ComfyUI queue submit or job queue mutation is allowed.",
      "No image generation, video generation, upscale, or frame interpolation starts.",
      "Execution needs a later approved local bridge or tool boundary.",
    ],
    blocked: [
      "direct workflow submission",
      "queue mutation",
      "automatic render start",
      "cloud provider fallback",
      "secret exposure",
      "file write",
      "hardware command",
    ],
  };
}
