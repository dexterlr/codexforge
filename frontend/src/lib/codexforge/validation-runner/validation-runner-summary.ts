import type {
  ValidationExecutionBridge,
  ValidationOutputCapture,
  ValidationResultRouter,
  ValidationRunApproval,
  ValidationRunPolicy,
  ValidationRunPreflight,
  ValidationRunRequest,
  ValidationRunnerSummary,
} from "./validation-runner-types";

export function buildValidationRunnerSummary(args: {
  request: ValidationRunRequest;
  approval: ValidationRunApproval;
  policy: ValidationRunPolicy;
  preflight: ValidationRunPreflight;
  executionBridge: ValidationExecutionBridge;
  outputCapture: ValidationOutputCapture;
  resultRouter: ValidationResultRouter;
}): ValidationRunnerSummary {
  const summary: ValidationRunnerSummary = {
    id: "validation-runner-summary",
    commandCount: args.request.selectedCommands.length,
    approvalReady: args.approval.readyForPolicy,
    policyReady: args.policy.allowed,
    preflightStatus: args.preflight.overallStatus,
    executionStatus: args.executionBridge.status,
    outputCaptured: args.outputCapture.outputCaptured,
    failureCount: args.outputCapture.failureCount,
    resultRouteRecommendation: args.resultRouter.recommendation,
    nextSafeAction: args.policy.allowed ? args.executionBridge.summary[1] : args.policy.nextSafeAction,
    summary: [],
  };
  return { ...summary, summary: summarizeValidationRunnerSession(summary) };
}

export function summarizeValidationRunnerSession(summary: Omit<ValidationRunnerSummary, "summary">): string[] {
  return [
    `${summary.commandCount} command(s); approvalReady=${summary.approvalReady}; policyReady=${summary.policyReady}.`,
    `Preflight ${summary.preflightStatus}; execution ${summary.executionStatus}; outputCaptured=${summary.outputCaptured}.`,
    `${summary.failureCount} failure(s). ${summary.resultRouteRecommendation}`,
    `Next safe action: ${summary.nextSafeAction}`,
  ];
}
