import type {
  TaskActivationReducerAction,
  TaskActivationState,
  TaskActivationStateName,
} from "./task-activation-types";

function stateMessage(status: TaskActivationStateName): string {
  if (status === "idle") return "No activation request has been built.";
  if (status === "request-built") return "Activation request built for review.";
  if (status === "needs-review") return "Activation needs explicit review approval.";
  if (status === "approved") return "Activation request approved for plan preview.";
  if (status === "blocked") return "Activation blocked by policy or review.";
  if (status === "activated-preview") return "Active task plan preview is visible.";
  if (status === "handoff-ready") return "Activation handoff is ready to copy visibly into /jarvis.";
  return "Future active task is marked as explicitly set, but no execution has started.";
}

export function buildTaskActivationState(
  overrides: Partial<Omit<TaskActivationState, "id" | "summary">> = {}
): TaskActivationState {
  const status = overrides.status ?? "idle";
  const state: TaskActivationState = {
    id: "task-activation-state",
    status,
    request: overrides.request ?? null,
    policy: overrides.policy ?? null,
    plan: overrides.plan ?? null,
    handoff: overrides.handoff ?? null,
    message: overrides.message ?? stateMessage(status),
    summary: [],
  };

  return {
    ...state,
    summary: summarizeTaskActivationState(state),
  };
}

export function reduceTaskActivationState(
  state: TaskActivationState = buildTaskActivationState(),
  action: TaskActivationReducerAction
): TaskActivationState {
  if (action.type === "reset") {
    return buildTaskActivationState();
  }

  if (action.type === "build-request") {
    return buildTaskActivationState({
      status: action.request.approved ? "approved" : "request-built",
      request: action.request,
      policy: action.policy ?? state.policy,
      plan: null,
      handoff: null,
      message: action.request.approved
        ? "Activation request built with explicit approval."
        : "Activation request built and awaiting review.",
    });
  }

  if (action.type === "approve") {
    const request = action.request ?? state.request;
    return buildTaskActivationState({
      status: "approved",
      request,
      policy: action.policy ?? state.policy,
      plan: state.plan,
      handoff: state.handoff,
      message: action.approvalNote?.trim()
        ? `Activation approved: ${action.approvalNote.trim()}`
        : "Activation approved for plan preview.",
    });
  }

  if (action.type === "reject") {
    return buildTaskActivationState({
      status: "needs-review",
      request: state.request,
      policy: state.policy,
      plan: null,
      handoff: null,
      message: action.reason?.trim() || "Activation rejected; review remains required.",
    });
  }

  if (action.type === "block") {
    return buildTaskActivationState({
      status: "blocked",
      request: state.request,
      policy: action.policy ?? state.policy,
      plan: null,
      handoff: null,
      message: action.reason,
    });
  }

  if (action.type === "preview-plan") {
    return buildTaskActivationState({
      status: "activated-preview",
      request: state.request,
      policy: action.policy ?? state.policy,
      plan: action.plan,
      handoff: null,
      message: "Active task plan preview built; no execution has started.",
    });
  }

  if (action.type === "prepare-handoff") {
    const status: TaskActivationStateName = action.futureActiveTaskSet
      ? "future-active-task-set"
      : "handoff-ready";
    return buildTaskActivationState({
      status,
      request: state.request,
      policy: state.policy,
      plan: state.plan,
      handoff: action.handoff,
      message: action.futureActiveTaskSet
        ? "Future active task handoff marked explicitly; no activeTask was silently written."
        : "Handoff prompt is ready to copy visibly into /jarvis.",
    });
  }

  return state;
}

export function summarizeTaskActivationState(state: TaskActivationState): string[] {
  return [
    `Activation state is ${state.status}.`,
    state.request ? `Request ${state.request.id} is visible.` : "No request is active.",
    state.plan ? "Plan preview is visible." : "No active plan preview is set.",
    state.handoff ? "Handoff prompt is ready." : "No handoff prompt is ready.",
  ];
}
