import type { SubmitBoundaryApproval } from "./comfyui-submit-boundary-types";

export function buildSubmitBoundaryApproval(input: Partial<SubmitBoundaryApproval> = {}): SubmitBoundaryApproval {
  return {
    id: input.id ?? "comfyui-submit-boundary-approval",
    boundaryReviewApproved: input.boundaryReviewApproved ?? true,
    futureExecutionApprovalRequired: true,
    futureExecutionApprovalGranted: false,
    approvalNote:
      input.approvalNote ??
      "The submit boundary can be reviewed, but actual execution still needs a later explicit approval and guarded local executor.",
  };
}
