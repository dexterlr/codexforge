import type { ValidationResultRecord, WorkflowResultCapture, WorkflowResultExport, WorkflowResultHandoff, WorkflowResultMemoryCandidate, WorkflowResultRecord, WorkflowResultReview, WorkflowResultStoragePolicy, WorkflowResultSummary } from "./workflow-result-types";

export function buildWorkflowResultSummary(args: {
  record: WorkflowResultRecord;
  capture: WorkflowResultCapture;
  validation: ValidationResultRecord;
  review: WorkflowResultReview;
  policy: WorkflowResultStoragePolicy;
  handoff: WorkflowResultHandoff;
  memoryCandidate: WorkflowResultMemoryCandidate;
  resultExport: WorkflowResultExport;
}): WorkflowResultSummary {
  return {
    resultStatus: args.record.finalStatus,
    captureItemCount: args.capture.items.length,
    validationStatus: args.validation.overallStatus,
    reviewStatus: args.review.reviewStatus,
    storagePolicyStatus: args.policy.blockedReasons.length > 0 ? "blocked" : args.policy.warnings.length > 0 ? "review-required" : "ready",
    handoffReadiness: args.handoff.reviewedByOperator ? "reviewed" : "review-required",
    memoryCandidateReadiness: args.memoryCandidate.promotionReadiness,
    exportReadiness: args.resultExport.reviewStatus,
    nextSafeAction: args.policy.nextSafeAction,
  };
}

export function summarizeWorkflowResultSession(summary: WorkflowResultSummary): string[] {
  return [
    `Result ${summary.resultStatus}; validation ${summary.validationStatus}; review ${summary.reviewStatus}.`,
    `${summary.captureItemCount} capture item(s); storage ${summary.storagePolicyStatus}; handoff ${summary.handoffReadiness}.`,
    `Memory candidate ${summary.memoryCandidateReadiness}; export ${summary.exportReadiness}. Next safe action: ${summary.nextSafeAction}`,
  ];
}
