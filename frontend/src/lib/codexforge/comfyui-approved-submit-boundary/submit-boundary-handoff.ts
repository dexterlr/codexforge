import type { SubmitBoundaryHandoff } from "./comfyui-submit-boundary-types";

export function buildSubmitBoundaryHandoff(): SubmitBoundaryHandoff {
  return {
    id: "comfyui-submit-boundary-handoff",
    submitPacketLabel: "Copy submit packet allowed",
    safetyReportLabel: "Copy safety report allowed",
    nextImplementationHandoffLabel: "Copy next implementation handoff allowed",
    safetyNote:
      "The handoff is copy-only. It does not submit to ComfyUI, mutate queues, write files, run commands, expose secrets, or call cloud providers.",
  };
}
