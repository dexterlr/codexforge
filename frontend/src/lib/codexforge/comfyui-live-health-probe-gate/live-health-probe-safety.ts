import type { LiveHealthProbeSafety } from "./comfyui-live-health-gate-types";

export function buildLiveHealthProbeSafety(): LiveHealthProbeSafety {
  return {
    id: "comfyui-live-health-probe-safety",
    guarantees: [
      "Nothing contacts ComfyUI from this page.",
      "A health check is not a render job.",
      "health checks are not render jobs.",
      "No video is generated and no image is generated.",
      "No prompt or workflow payload is sent.",
      "No ComfyUI queue submit or job queue mutation is allowed.",
      "Local-first saves cost but still needs explicit safety review.",
    ],
    blocked: [
      "live probe without approval",
      "remote or cloud ComfyUI URL",
      "workflow submit",
      "queue mutation",
      "file write",
      "secret collection",
      "automatic creative job",
    ],
  };
}
