import type { ComfyUiMetadataHandoff } from "./comfyui-metadata-probe-types";

export function buildComfyUiMetadataHandoff(): ComfyUiMetadataHandoff {
  return {
    id: "comfyui-metadata-handoff",
    copyLabel: "Copy metadata readiness report allowed",
    nextStep: "Use this metadata readiness review before workflow dry run. Unknown fields stay unknown until a future approved local probe exists.",
    safetyNote: "This handoff is copy-only. It does not contact ComfyUI, send prompts, submit workflows, mutate queues, or write files.",
  };
}
