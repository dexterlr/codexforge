import type {
  CodexForgeAgentRuntimePlan,
  CodexForgeAgentRuntimeReview,
  CodexForgeAgentRuntimeRole,
} from "./agent-types";

function includesRole(
  values: readonly CodexForgeAgentRuntimeRole[],
  role: CodexForgeAgentRuntimeRole
): boolean {
  return values.includes(role);
}

export function buildAgentReviewChecklist(plan: CodexForgeAgentRuntimePlan): readonly string[] {
  return [
    plan.approvalRequiredSteps.length > 0 ? "approval-boundary-present" : "read-only-plan",
    includesRole(plan.decision.reviewerAgents, "VerificationAgent")
      ? "verification-reviewer-present"
      : "verification-reviewer-missing",
    plan.task.risk === "high" || plan.task.risk === "critical"
      ? includesRole(plan.decision.reviewerAgents, "RiskAnalysisAgent")
        ? "risk-reviewer-present"
        : "risk-reviewer-missing"
      : "standard-risk-route",
    plan.blockedSteps.length > 0 ? "blocked-steps-present" : "no-blocked-steps",
    plan.task.filePaths.some((path) => path.includes("/brain/graph/"))
      ? "schema-drift-risk"
      : "no-schema-drift-signal",
    plan.reasons.some((reason) => reason.toLowerCase().includes("external"))
      ? "external-access-risk"
      : "no-external-access",
  ].sort();
}

export function summarizeAgentRuntimeReview(review: CodexForgeAgentRuntimeReview): string {
  return `${review.reviewer} ${review.status}: ${review.summary}`;
}

export function reviewAgentRuntimePlan(
  plan: CodexForgeAgentRuntimePlan
): CodexForgeAgentRuntimeReview {
  const checklist = buildAgentReviewChecklist(plan);
  const recommendations: string[] = [];
  let status: CodexForgeAgentRuntimeReview["status"] = "approved";
  let severity: CodexForgeAgentRuntimeReview["severity"] = "info";

  if (checklist.includes("verification-reviewer-missing")) {
    status = "changes-requested";
    severity = "warning";
    recommendations.push("Add VerificationAgent before handoff.");
  }
  if (
    (plan.task.risk === "high" || plan.task.risk === "critical") &&
    checklist.includes("risk-reviewer-missing")
  ) {
    status = "blocked";
    severity = "critical";
    recommendations.push("Add RiskAnalysisAgent for high-risk mutation routing.");
  }
  if (checklist.includes("external-access-risk")) {
    status = "blocked";
    severity = "critical";
    recommendations.push("Remove external access from Phase 5A runtime plans.");
  }
  if (checklist.includes("schema-drift-risk")) {
    recommendations.push("Use canonical graph types only and avoid schema changes.");
  }
  if (plan.approvalRequiredSteps.length > 0) {
    recommendations.push("Keep mutation steps approval-required and non-executing.");
  }

  const review: CodexForgeAgentRuntimeReview = {
    id: `agent-review:${plan.id}`,
    reviewer:
      plan.task.risk === "high" || plan.task.risk === "critical"
        ? "RiskAnalysisAgent"
        : "VerificationAgent",
    status,
    severity,
    summary:
      status === "approved"
        ? "Plan stays inside deterministic read-only runtime boundaries."
        : "Plan needs additional safety gates before it can proceed.",
    recommendations: recommendations.sort(),
    requiredAgents: plan.decision.reviewerAgents,
    risk: plan.task.risk,
    confidence: status === "approved" ? 0.82 : 0.9,
    reasons: checklist,
  };
  return { ...review, summary: summarizeAgentRuntimeReview(review) };
}
