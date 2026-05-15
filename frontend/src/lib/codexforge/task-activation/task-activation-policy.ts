import { validateTaskActivationRequest } from "./task-activation-request";
import type {
  TaskActivationPolicy,
  TaskActivationPolicyRoute,
  TaskActivationPolicyRule,
  TaskActivationRequest,
} from "./task-activation-types";

function isAcceptedReviewState(request: TaskActivationRequest): boolean {
  return request.suggestionReviewState === "accepted-for-planning" || request.suggestionReviewState === "handoff-ready";
}

function routeForRequest(request: TaskActivationRequest | null): TaskActivationPolicyRoute {
  if (!request) return "blocked";
  if (request.suggestionReviewState === "blocked" || request.suggestionSafeNextAction === "blocked") return "blocked";
  if (request.steps.length === 0) return "blocked";
  if (request.suggestionKind === "prepare-patch" || request.suggestionKind === "fix" || request.suggestionKind === "refactor") {
    return "safe-patch-preview";
  }
  if (request.suggestionKind === "promote-memory") return "memory-review";
  if (
    request.suggestedTaskTitle.toLowerCase().includes("graph") ||
    request.suggestedTaskTitle.toLowerCase().includes("merge") ||
    request.goal.toLowerCase().includes("graph") ||
    request.goal.toLowerCase().includes("merge")
  ) {
    return "brain-merge-review";
  }
  if (request.suggestionKind === "plan-creative") return "creative-preview";
  return "active-plan-preview";
}

function buildRule(id: string, label: string, passed: boolean, detail: string): TaskActivationPolicyRule {
  return {
    id,
    label,
    state: passed ? "passed" : "blocked",
    detail,
  };
}

function routeRule(route: TaskActivationPolicyRoute): TaskActivationPolicyRule {
  if (route === "safe-patch-preview") {
    return {
      id: "route-safe-patch-preview",
      label: "Patch tasks route to Safe Patch Preview",
      state: "route-review",
      detail: "Patch/fix tasks must route through Safe Patch Preview before file mutation.",
    };
  }
  if (route === "memory-review") {
    return {
      id: "route-memory-review",
      label: "Memory tasks route to Memory Review",
      state: "route-review",
      detail: "Memory tasks must route through Memory Review before persistence or promotion.",
    };
  }
  if (route === "brain-merge-review") {
    return {
      id: "route-brain-merge-review",
      label: "Graph tasks route to Brain Merge Review",
      state: "route-review",
      detail: "Graph tasks must route through Brain Merge Review before any graph mutation.",
    };
  }
  if (route === "creative-preview") {
    return {
      id: "route-creative-preview",
      label: "Creative execution stays preview-only",
      state: "route-review",
      detail: "Creative execution stays preview-only; activation creates a plan preview, not execution.",
    };
  }
  return {
    id: "route-active-plan-preview",
    label: "Activation creates an active plan only",
    state: route === "blocked" ? "blocked" : "passed",
    detail: "Activation creates an active plan only, not execution.",
  };
}

export function buildTaskActivationPolicy(input: { request?: TaskActivationRequest | null } = {}): TaskActivationPolicy {
  const request = input.request ?? null;
  const validation = request ? validateTaskActivationRequest(request) : null;
  const route = routeForRequest(request);
  const blockedReasons = [
    request ? "" : "Activation request is required.",
    request?.approved ? "" : "Explicit review approval required.",
    request && isAcceptedReviewState(request)
      ? ""
      : "Suggestion must be accepted-for-planning or handoff-ready.",
    request?.suggestionReviewState === "blocked" || request?.suggestionSafeNextAction === "blocked"
      ? "Blocked suggestions cannot activate."
      : "",
    request && request.steps.length > 0 ? "" : "Empty task steps block activation.",
    validation && !validation.valid ? validation.reasons.join(" ") : "",
  ].filter(Boolean);

  const allowed = blockedReasons.length === 0 && route !== "blocked";
  const rules: TaskActivationPolicyRule[] = [
    buildRule(
      "explicit-review-approval-required",
      "Explicit review approval required",
      request?.approved === true,
      "Activation cannot proceed without an operator-approved request."
    ),
    buildRule(
      "accepted-suggestion-required",
      "Accepted suggestion required",
      !!request && isAcceptedReviewState(request),
      "Suggestion must be accepted-for-planning or handoff-ready."
    ),
    buildRule(
      "blocked-suggestions-cannot-activate",
      "Blocked suggestions cannot activate",
      !(request?.suggestionReviewState === "blocked" || request?.suggestionSafeNextAction === "blocked"),
      "Blocked suggestions cannot activate."
    ),
    buildRule(
      "empty-task-steps-block-activation",
      "Task steps required",
      !!request && request.steps.length > 0,
      "Empty task steps block activation."
    ),
    routeRule(route),
    {
      id: "no-auto-run",
      label: "No auto-run",
      state: "passed",
      detail: "No auto-run is allowed from Reviewed Task Activation.",
    },
    {
      id: "no-auto-write",
      label: "No auto-write",
      state: "passed",
      detail: "No auto-write or direct file mutation is allowed from task activation.",
    },
    {
      id: "no-direct-graph-mutation",
      label: "No direct graph mutation",
      state: "passed",
      detail: "No direct graph mutation is allowed; Brain changes stay behind review surfaces.",
    },
  ];

  return {
    id: "task-activation-policy",
    requestId: request?.id ?? "no-request",
    explicitReviewApprovalRequired: true,
    activationCreatesPlanOnly: true,
    autoRunAllowed: false,
    autoWriteAllowed: false,
    directGraphMutationAllowed: false,
    allowed,
    route,
    rules,
    blockedReasons,
    requiredReviews: [
      "Explicit review approval required.",
      "Safe Patch Preview required before file mutation.",
      "Memory Review required before memory promotion.",
      "Brain Merge Review required before graph mutation.",
    ],
    summary: summarizeTaskActivationPolicy({
      id: "task-activation-policy",
      requestId: request?.id ?? "no-request",
      explicitReviewApprovalRequired: true,
      activationCreatesPlanOnly: true,
      autoRunAllowed: false,
      autoWriteAllowed: false,
      directGraphMutationAllowed: false,
      allowed,
      route,
      rules,
      blockedReasons,
      requiredReviews: [],
      summary: [],
    }),
  };
}

export function isTaskActivationAllowed(policy: TaskActivationPolicy): boolean {
  return policy.allowed;
}

export function summarizeTaskActivationPolicy(policy: TaskActivationPolicy): string[] {
  return [
    policy.allowed ? "Activation policy allows a reviewed active plan preview." : "Activation policy blocks activation.",
    "Explicit review approval required; suggestion must be accepted-for-planning or handoff-ready.",
    "Blocked suggestions cannot activate and empty task steps block activation.",
    "Activation creates an active plan only, not execution; no auto-run, no auto-write, and no direct graph mutation.",
    "Patch/fix tasks must route through Safe Patch Preview before file mutation; memory tasks route through Memory Review; graph tasks route through Brain Merge Review.",
  ];
}
