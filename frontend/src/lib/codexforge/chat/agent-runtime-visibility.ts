import { buildAgentReviewChecklist } from "@/lib/codexforge/agents";
import type {
  CodexForgeAgentRuntimeOrchestrationResult,
  CodexForgeAgentRuntimePlan,
  CodexForgeAgentRuntimePlanStep,
  CodexForgeAgentRuntimeReview,
  CodexForgeAgentRuntimeRole,
} from "@/lib/codexforge/agents";

export type CodexForgeVisibleAgentRuntimeStep = {
  id: string;
  agent: CodexForgeAgentRuntimeRole;
  label: string;
  status: "read-only" | "approval-required" | "blocked";
  reasons: string[];
};

export type CodexForgeVisibleAgentRuntimeReview = {
  id: string;
  reviewer: CodexForgeAgentRuntimeRole;
  status: "approved" | "changes-requested" | "blocked";
  severity: "info" | "warning" | "error" | "critical";
  summary: string;
  checklist: string[];
  recommendations: string[];
  requiredAgents: CodexForgeAgentRuntimeRole[];
  confidence: number;
};

export type CodexForgeVisibleAgentRuntimeSummary = {
  primaryAgent: CodexForgeAgentRuntimeRole;
  supportAgents: CodexForgeAgentRuntimeRole[];
  reviewerAgents: CodexForgeAgentRuntimeRole[];
  reasoningSummary: string;
  routeReason: string;
  readOnlySteps: CodexForgeVisibleAgentRuntimeStep[];
  approvalRequiredSteps: CodexForgeVisibleAgentRuntimeStep[];
  blockedSteps: CodexForgeVisibleAgentRuntimeStep[];
  risks: string[];
  confidence: number;
  handoffs: string[];
  reviews: CodexForgeVisibleAgentRuntimeReview[];
  reviewChecklist: string[];
  recommendedNextAction: string;
};

type VisibleRuntimeInput =
  | CodexForgeAgentRuntimeOrchestrationResult
  | CodexForgeAgentRuntimePlan
  | {
      plan: CodexForgeAgentRuntimePlan;
      summary?: string;
    };

function getPlan(input: VisibleRuntimeInput): CodexForgeAgentRuntimePlan {
  return "decision" in input ? input : input.plan;
}

function getSummary(input: VisibleRuntimeInput, plan: CodexForgeAgentRuntimePlan): string {
  if ("summary" in input && typeof input.summary === "string" && input.summary.trim()) {
    return input.summary.trim();
  }

  return `${plan.decision.primaryAgent} selected for ${plan.task.domain} ${plan.task.requestedAction}; permission is ${plan.decision.permission}.`;
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function uniqueSorted(values: readonly string[]): string[] {
  return Array.from(
    new Set(values.map(normalizeText).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));
}

function uniqueRoles(
  values: readonly CodexForgeAgentRuntimeRole[]
): CodexForgeAgentRuntimeRole[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function visibleSteps(
  steps: readonly CodexForgeAgentRuntimePlanStep[]
): CodexForgeVisibleAgentRuntimeStep[] {
  return [...steps]
    .map((step) => ({
      id: step.id,
      agent: step.agent,
      label: normalizeText(step.label),
      status: step.status,
      reasons: uniqueSorted(step.reasons),
    }))
    .sort(
      (a, b) =>
        a.agent.localeCompare(b.agent) ||
        a.status.localeCompare(b.status) ||
        a.label.localeCompare(b.label) ||
        a.id.localeCompare(b.id)
    );
}

function visibleReviews(
  reviews: readonly CodexForgeAgentRuntimeReview[],
  checklist: readonly string[]
): CodexForgeVisibleAgentRuntimeReview[] {
  return [...reviews]
    .map((review) => ({
      id: review.id,
      reviewer: review.reviewer,
      status: review.status,
      severity: review.severity,
      summary: normalizeText(review.summary),
      checklist: uniqueSorted(review.reasons.length > 0 ? review.reasons : checklist),
      recommendations: uniqueSorted(review.recommendations),
      requiredAgents: uniqueRoles(review.requiredAgents),
      confidence: Number(review.confidence.toFixed(4)),
    }))
    .sort(
      (a, b) =>
        a.severity.localeCompare(b.severity) ||
        a.reviewer.localeCompare(b.reviewer) ||
        a.id.localeCompare(b.id)
    );
}

function recommendedNextAction(plan: CodexForgeAgentRuntimePlan): string {
  if (plan.blockedSteps.length > 0) {
    return "Resolve blocked runtime gates before proposing any action.";
  }

  if (plan.approvalRequiredSteps.length > 0) {
    return "Review the approval-required plan lane before any mutation or command runs.";
  }

  return "Continue with read-only planning, explanation, or review.";
}

export function buildVisibleAgentRuntimeSummary(
  input: VisibleRuntimeInput
): CodexForgeVisibleAgentRuntimeSummary {
  const plan = getPlan(input);
  const checklist = buildAgentReviewChecklist(plan);

  return {
    primaryAgent: plan.decision.primaryAgent,
    supportAgents: uniqueRoles(plan.decision.supportAgents),
    reviewerAgents: uniqueRoles(plan.decision.reviewerAgents),
    reasoningSummary: getSummary(input, plan),
    routeReason: uniqueSorted(plan.decision.reasons).join(" | "),
    readOnlySteps: visibleSteps(plan.readOnlySteps),
    approvalRequiredSteps: visibleSteps(plan.approvalRequiredSteps),
    blockedSteps: visibleSteps(plan.blockedSteps),
    risks: uniqueSorted(plan.risks),
    confidence: Number(plan.confidence.toFixed(4)),
    handoffs: uniqueSorted(
      plan.handoffs.map(
        (handoff) =>
          `${handoff.from} -> ${handoff.to}: ${handoff.reason} (${handoff.permission})`
      )
    ),
    reviews: visibleReviews(plan.reviews, checklist),
    reviewChecklist: uniqueSorted(checklist),
    recommendedNextAction: recommendedNextAction(plan),
  };
}

export function summarizeVisibleAgentRuntime(
  summary: CodexForgeVisibleAgentRuntimeSummary
): string {
  return `${summary.primaryAgent} route with ${summary.supportAgents.length} support agents, ${summary.reviewerAgents.length} reviewers, ${summary.approvalRequiredSteps.length} approval-required steps, ${summary.blockedSteps.length} blocked steps, confidence ${summary.confidence}.`;
}

export function shouldShowAgentRuntimePanel(
  summary?: CodexForgeVisibleAgentRuntimeSummary | null
): boolean {
  return !!(
    summary &&
    summary.primaryAgent &&
    (summary.readOnlySteps.length > 0 ||
      summary.approvalRequiredSteps.length > 0 ||
      summary.blockedSteps.length > 0 ||
      summary.reviews.length > 0 ||
      summary.risks.length > 0)
  );
}
