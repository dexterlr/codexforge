import {
  buildTaskActivationStableKey,
  uniqueTaskActivationStrings,
  type ActivatedTaskPlan,
  type ActivatedTaskStep,
  type ActivatedTaskStepGate,
  type TaskActivationPolicy,
  type TaskActivationRequest,
} from "./task-activation-types";

export function buildActivatedTaskStep(args: {
  requestId: string;
  index: number;
  text: string;
  label?: string;
  gate: ActivatedTaskStepGate;
  detail: string;
}): ActivatedTaskStep {
  return {
    id: buildTaskActivationStableKey("activated-task-step", args.requestId, args.index, args.text),
    text: args.text,
    label: args.label ?? args.text,
    status: "pending",
    gate: args.gate,
    detail: args.detail,
  };
}

function routeGate(policy: TaskActivationPolicy): ActivatedTaskStepGate {
  if (policy.route === "safe-patch-preview") return "safe-patch-preview";
  if (policy.route === "memory-review") return "memory-review";
  if (policy.route === "brain-merge-review") return "brain-merge-review";
  return "operator-approval";
}

function routeDetail(policy: TaskActivationPolicy): string {
  if (policy.route === "safe-patch-preview") {
    return "Route file-changing work through Safe Patch Preview before mutation.";
  }
  if (policy.route === "memory-review") {
    return "Route memory-changing work through Memory Review before promotion.";
  }
  if (policy.route === "brain-merge-review") {
    return "Route graph-changing work through Brain Merge Review before mutation.";
  }
  if (policy.route === "creative-preview") {
    return "Keep creative execution preview-only until a separate explicit execution review exists.";
  }
  return "Keep this as a reviewed active plan preview until the operator chooses a separate action.";
}

function buildAcceptanceChecks(request: TaskActivationRequest): string[] {
  return uniqueTaskActivationStrings([
    "Inspect current files before implementation.",
    "Use recalled memory as context, not proof.",
    "No file mutation without Safe Patch Preview.",
    "No command execution without approval.",
    ...request.steps.map((step) => `Plan step visible: ${step}`),
  ]);
}

export function selectActivatedTaskNextAction(plan: ActivatedTaskPlan): string {
  if (plan.approvalGates.some((gate) => gate.includes("Safe Patch Preview"))) {
    return "Open Safe Patch Preview before any file mutation.";
  }
  if (plan.approvalGates.some((gate) => gate.includes("Memory Review"))) {
    return "Open Memory Review before any memory promotion.";
  }
  if (plan.approvalGates.some((gate) => gate.includes("Brain Merge Review"))) {
    return "Open Brain Merge Review before any graph mutation.";
  }
  return "Copy the reviewed activation prompt visibly into /jarvis and inspect it before sending.";
}

export function buildActivatedTaskPlan(args: {
  request: TaskActivationRequest;
  policy: TaskActivationPolicy;
}): ActivatedTaskPlan {
  const { request, policy } = args;
  const routeGateValue = routeGate(policy);
  const routeText = routeDetail(policy);
  const steps = [
    buildActivatedTaskStep({
      requestId: request.id,
      index: 0,
      text: "Inspect current files and source signals.",
      label: "Inspect first",
      gate: "inspect",
      detail: "Verify current files, source signals, and operator intent before relying on recalled context.",
    }),
    buildActivatedTaskStep({
      requestId: request.id,
      index: 1,
      text: "Use recalled memory as context, not proof.",
      label: "Verify recalled memory",
      gate: "memory-review",
      detail: "Treat recalled memory as context, not proof, and check for stale or contradictory signals.",
    }),
    buildActivatedTaskStep({
      requestId: request.id,
      index: 2,
      text: routeText,
      label: policy.route,
      gate: routeGateValue,
      detail: routeText,
    }),
    ...request.steps.map((step, index) =>
      buildActivatedTaskStep({
        requestId: request.id,
        index: index + 3,
        text: step,
        gate: "operator-approval",
        detail: "Task step is visible in the active plan preview and remains pending until a future explicit action.",
      })
    ),
    buildActivatedTaskStep({
      requestId: request.id,
      index: request.steps.length + 3,
      text: "Prepare visible copy-only handoff to /jarvis without starting execution.",
      label: "Prepare Jarvis handoff",
      gate: "handoff",
      detail: "The handoff is copy-only and does not silently set an active task.",
    }),
  ];

  const approvalGates = uniqueTaskActivationStrings([
    "Explicit activation approval is required.",
    "Safe Patch Preview is required before file mutation.",
    "Memory Review is required before memory promotion.",
    "Brain Merge Review is required before graph mutation.",
    "Command execution requires approval.",
    "Latest-message authority must be preserved in /jarvis with no hidden context injection.",
  ]);

  const draftPlan: ActivatedTaskPlan = {
    id: buildTaskActivationStableKey("activated-task-plan", request.id, request.goal, request.steps.join(".")),
    goal: request.goal,
    steps,
    currentStepIndex: 0,
    domain: request.domain,
    tags: request.tags,
    sourceSuggestionId: request.taskSuggestionId,
    sourceMemoryIds: request.relatedMemoryIds,
    impactedFiles: request.impactedFiles,
    riskNotes: request.risks,
    acceptanceChecks: buildAcceptanceChecks(request),
    approvalGates,
    recommendedFirstAction: "",
    noRunGuarantee: request.noRunGuarantee,
    summary: [],
  };

  const recommendedFirstAction = selectActivatedTaskNextAction(draftPlan);

  return {
    ...draftPlan,
    recommendedFirstAction,
    summary: summarizeActivatedTaskPlan({ ...draftPlan, recommendedFirstAction }),
  };
}

export function summarizeActivatedTaskPlan(plan: ActivatedTaskPlan): string[] {
  return [
    `Reviewed active plan preview has ${plan.steps.length} pending steps.`,
    `${plan.impactedFiles.length} impacted files and ${plan.sourceMemoryIds.length} source memories are visible.`,
    plan.recommendedFirstAction,
    plan.noRunGuarantee,
  ];
}
