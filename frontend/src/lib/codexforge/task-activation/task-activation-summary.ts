import type { TaskSuggestion } from "@/lib/codexforge/task-autopilot";
import { buildActivatedTaskPlan } from "./task-activation-plan";
import { buildTaskActivationHandoff } from "./task-activation-handoff";
import { buildTaskActivationLedger } from "./task-activation-ledger";
import { buildTaskActivationPolicy } from "./task-activation-policy";
import { buildTaskActivationRequest, validateTaskActivationRequest } from "./task-activation-request";
import { buildTaskActivationState } from "./task-activation-reducer";
import type { TaskActivationSummary } from "./task-activation-types";

export function buildTaskActivationSummary(input: {
  suggestion?: TaskSuggestion | null;
  approved?: boolean;
  approvalNote?: string;
} = {}): TaskActivationSummary {
  if (!input.suggestion) {
    const policy = buildTaskActivationPolicy();
    const state = buildTaskActivationState({ policy });
    const ledger = buildTaskActivationLedger({ policy, state });

    return {
      id: "task-activation-summary",
      request: null,
      validation: null,
      policy,
      plan: null,
      handoff: null,
      ledger,
      state,
      summary: [
        "Reviewed Task Activation is ready for a selected suggestion.",
        "No activation request exists yet.",
      ],
    };
  }

  const request = buildTaskActivationRequest({
    suggestion: input.suggestion,
    approved: input.approved,
    approvalNote: input.approvalNote,
  });
  const validation = validateTaskActivationRequest(request);
  const policy = buildTaskActivationPolicy({ request });
  const plan = policy.allowed ? buildActivatedTaskPlan({ request, policy }) : null;
  const handoff = plan ? buildTaskActivationHandoff({ request, policy, plan }) : null;
  const state = buildTaskActivationState({
    status: handoff ? "handoff-ready" : policy.allowed ? "activated-preview" : "needs-review",
    request,
    policy,
    plan,
    handoff,
  });
  const ledger = buildTaskActivationLedger({ request, policy, plan, handoff, state });

  return {
    id: "task-activation-summary",
    request,
    validation,
    policy,
    plan,
    handoff,
    ledger,
    state,
    summary: [
      "Reviewed Task Activation builds requests, policy checks, plan previews, ledgers, and handoff prompts.",
      policy.allowed ? "Activation can proceed to handoff preview." : "Activation remains blocked or review gated.",
      "No autonomous execution or source mutation occurs.",
    ],
  };
}
