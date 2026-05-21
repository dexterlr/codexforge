import { buildCodingFlowRouteHandoff } from "./coding-flow-route-handoff";
import type { CodingFlowInput, CodingFlowResultStep } from "./real-coding-flow-types";

export function buildCodingFlowResultStep(input: CodingFlowInput): CodingFlowResultStep {
  if (input.resultStatus === "pass") {
    return { validationResultStatus: "pass", failureSummary: null, recommendedRoute: "/code-flow", closedLoopHandoff: null, nextSafeAction: "Validation passed. Suggest commit/tag/push handoff after operator review.", completionStatus: "complete" };
  }
  if (input.resultStatus === "fail") {
    return { validationResultStatus: "fail", failureSummary: input.resultSummary ?? "Validation failed.", recommendedRoute: "/closed-loop", closedLoopHandoff: buildCodingFlowRouteHandoff("Open Closed Loop Fix"), nextSafeAction: "Open closed-loop and review the smallest repair.", completionStatus: "needs-review" };
  }
  if (input.resultStatus === "patch-issue") {
    return { validationResultStatus: "patch-issue", failureSummary: input.resultSummary ?? "Patch needs inspection.", recommendedRoute: "/files", closedLoopHandoff: null, nextSafeAction: "Return to Files and inspect the patch issue.", completionStatus: "needs-review" };
  }
  if (input.resultStatus === "apply-issue") {
    return { validationResultStatus: "apply-issue", failureSummary: input.resultSummary ?? "Apply issue needs review.", recommendedRoute: "/closed-loop", closedLoopHandoff: buildCodingFlowRouteHandoff("Open Closed Loop Fix"), nextSafeAction: "Review apply issue in Files or Closed Loop.", completionStatus: "blocked" };
  }
  return { validationResultStatus: "unknown", failureSummary: null, recommendedRoute: "/validation", closedLoopHandoff: null, nextSafeAction: "Open Validation Runner and review or paste results.", completionStatus: "needs-review" };
}

export function summarizeCodingFlowResultStep(step: CodingFlowResultStep): string {
  return `${step.validationResultStatus}: ${step.nextSafeAction}`;
}
