import type { SubmitBoundarySummary } from "./comfyui-submit-boundary-types";
import { buildSubmitBoundaryApproval } from "./submit-boundary-approval";
import { buildSubmitBoundaryExecutionPosture } from "./submit-boundary-execution-posture";
import { buildSubmitBoundaryHandoff } from "./submit-boundary-handoff";
import { buildSubmitBoundaryPolicy } from "./submit-boundary-policy";
import { buildDefaultSubmitBoundaryRequest } from "./submit-boundary-request";
import { buildSubmitBoundaryResult } from "./submit-boundary-result";
import { buildSubmitBoundarySafety } from "./submit-boundary-safety";

export function summarizeComfyUiSubmitBoundary(summary: SubmitBoundarySummary): string {
  return `ComfyUI submit boundary is ${summary.executionPosture.status}: the approval boundary is prepared, but execution remains blocked and no workflow is submitted.`;
}

export function buildSubmitBoundarySummary(): SubmitBoundarySummary {
  const request = buildDefaultSubmitBoundaryRequest();
  const approval = buildSubmitBoundaryApproval();
  const policy = buildSubmitBoundaryPolicy(request, approval);
  const executionPosture = buildSubmitBoundaryExecutionPosture(request, approval, policy);
  const summary: SubmitBoundarySummary = {
    request,
    approval,
    policy,
    safety: buildSubmitBoundarySafety(),
    executionPosture,
    result: buildSubmitBoundaryResult(executionPosture),
    handoff: buildSubmitBoundaryHandoff(),
    summary: "",
  };
  return { ...summary, summary: summarizeComfyUiSubmitBoundary(summary) };
}
