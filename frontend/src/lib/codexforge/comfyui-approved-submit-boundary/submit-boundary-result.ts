import type { SubmitBoundaryExecutionPosture, SubmitBoundaryResult } from "./comfyui-submit-boundary-types";

export function buildSubmitBoundaryResult(posture: SubmitBoundaryExecutionPosture): SubmitBoundaryResult {
  return {
    id: "comfyui-submit-boundary-result",
    status: posture.executionAllowed ? "result-supplied" : "execution-blocked",
    source: posture.executionAllowed ? "supplied" : "preview",
    plainEnglish: posture.executionAllowed
      ? "A supplied future executor result can be reviewed here."
      : "Execution is still blocked. No workflow has been submitted and no render has started.",
  };
}
