import type {
  SubmitBoundaryApproval,
  SubmitBoundaryExecutionPosture,
  SubmitBoundaryPolicy,
  SubmitBoundaryRequest,
} from "./comfyui-submit-boundary-types";

export function buildSubmitBoundaryExecutionPosture(
  request: SubmitBoundaryRequest,
  approval: SubmitBoundaryApproval,
  policy: SubmitBoundaryPolicy
): SubmitBoundaryExecutionPosture {
  if (!policy.allRequirementsMet) {
    return {
      id: "comfyui-submit-boundary-execution-posture",
      status: "blocked-policy",
      label: "Blocked by policy",
      explanation: "The submit boundary cannot move forward until every readiness requirement is reviewed.",
      executionAllowed: false,
    };
  }

  if (!approval.boundaryReviewApproved) {
    return {
      id: "comfyui-submit-boundary-execution-posture",
      status: "blocked-missing-approval",
      label: "Blocked: missing approval",
      explanation: "The boundary cannot be prepared until review approval is present.",
      executionAllowed: false,
    };
  }

  if (!request.guardedExecutorAvailable) {
    return {
      id: "comfyui-submit-boundary-execution-posture",
      status: "approved-submit-boundary-prepared",
      label: "Boundary prepared, execution blocked",
      explanation: "The approved submit boundary is prepared, but actual submit is blocked until a later approved local executor exists.",
      executionAllowed: false,
    };
  }

  if (!approval.futureExecutionApprovalGranted) {
    return {
      id: "comfyui-submit-boundary-execution-posture",
      status: "future-approved-executor-required",
      label: "Future executor approval required",
      explanation: "A guarded executor would still need explicit future execution approval before any submit.",
      executionAllowed: false,
    };
  }

  return {
    id: "comfyui-submit-boundary-execution-posture",
    status: policy.executionAllowed ? "result-supplied" : "blocked-no-executor",
    label: policy.executionAllowed ? "Result supplied" : "Blocked: no executor",
    explanation: policy.executionAllowed ? "A future approved executor result was supplied." : "Execution remains blocked.",
    executionAllowed: policy.executionAllowed,
  };
}
