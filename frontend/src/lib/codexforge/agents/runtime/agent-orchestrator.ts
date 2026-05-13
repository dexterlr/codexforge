import { buildAgentRuntimeContext, summarizeAgentRuntimeContext } from "./agent-context";
import { createAgentRuntimeHandoff, createAgentRuntimeMessage, mapAgentRuntimeMessageToBrainEvent } from "./agent-events";
import { mapAgentPlanToEpisodeInput } from "./agent-episode-bridge";
import { reviewAgentRuntimePlan } from "./agent-review";
import { routeCodexForgeAgentTask } from "./agent-router";
import type {
  CodexForgeAgentRuntimeOrchestrationInput,
  CodexForgeAgentRuntimeOrchestrationResult,
  CodexForgeAgentRuntimePlan,
  CodexForgeAgentRuntimePlanStep,
} from "./agent-types";

function step(args: CodexForgeAgentRuntimePlanStep): CodexForgeAgentRuntimePlanStep {
  return args;
}

export function buildAgentRuntimePlan(
  input: CodexForgeAgentRuntimeOrchestrationInput
): CodexForgeAgentRuntimePlan {
  const context = buildAgentRuntimeContext(input);
  const decision = routeCodexForgeAgentTask({ task: input.task, context });
  const readOnlySteps: CodexForgeAgentRuntimePlanStep[] = [
    step({
      id: `${input.task.id}:context`,
      agent: decision.primaryAgent,
      label: "Read compact runtime context and route constraints.",
      status: "read-only",
      eventType: "message.created",
      reasons: context.reasons,
    }),
    step({
      id: `${input.task.id}:plan`,
      agent: decision.primaryAgent,
      label: "Produce deterministic task plan without executing tools.",
      status: "read-only",
      eventType: "task.updated",
      reasons: decision.reasons,
    }),
  ];
  const approvalRequiredSteps =
    decision.permission === "approval-required"
      ? [
          step({
            id: `${input.task.id}:approval`,
            agent: decision.primaryAgent,
            label: "Hold mutation proposal behind explicit approval.",
            status: "approval-required",
            eventType: "task.updated",
            reasons: ["approval-safe-runtime", "no-direct-mutation"],
          }),
        ]
      : [];
  const blockedSteps =
    decision.permission === "blocked"
      ? [
          step({
            id: `${input.task.id}:blocked`,
            agent: "RiskAnalysisAgent",
            label: "Block critical-risk route before runtime action.",
            status: "blocked",
            eventType: "failure.detected",
            reasons: ["critical-risk", "destructive-automation-blocked"],
          }),
        ]
      : [];
  const handoffs = decision.supportAgents
    .concat(decision.reviewerAgents)
    .map((to) =>
      createAgentRuntimeHandoff({
        from: decision.primaryAgent,
        to,
        taskId: input.task.id,
        reason: `Route ${input.task.domain} ${input.task.requestedAction} support to ${to}.`,
        risk: input.task.risk,
      })
    );
  const partialPlan: CodexForgeAgentRuntimePlan = {
    id: `agent-plan:${input.task.id}`,
    task: input.task,
    decision,
    contextSummary: summarizeAgentRuntimeContext(context),
    readOnlySteps,
    approvalRequiredSteps,
    blockedSteps,
    handoffs,
    reviews: [],
    risks: context.topRisks,
    confidence: Number(((decision.confidence + input.task.confidence) / 2).toFixed(4)),
    reasons: [
      "registry-router-context-plan",
      "non-executing-runtime",
      ...decision.reasons,
      ...context.reasons,
    ].sort(),
  };
  const review = reviewAgentRuntimePlan(partialPlan);
  return {
    ...partialPlan,
    reviews: [review],
    risks: [...new Set([...partialPlan.risks, ...review.recommendations])].sort(),
  };
}

export function summarizeAgentRuntimePlan(plan: CodexForgeAgentRuntimePlan): string {
  return `${plan.decision.primaryAgent} plan for ${plan.task.domain} has ${plan.readOnlySteps.length} read-only steps, ${plan.approvalRequiredSteps.length} approval steps, ${plan.blockedSteps.length} blocked steps.`;
}

export function orchestrateCodexForgeAgentRuntime(
  input: CodexForgeAgentRuntimeOrchestrationInput
): CodexForgeAgentRuntimeOrchestrationResult {
  const context = buildAgentRuntimeContext(input);
  const plan = buildAgentRuntimePlan(input);
  const messages = [
    createAgentRuntimeMessage({
      role: plan.decision.primaryAgent,
      type: "plan",
      content: summarizeAgentRuntimePlan(plan),
      createdAt: input.now ?? input.task.createdAt,
      taskId: input.task.id,
      eventType: "task.updated",
      confidence: plan.confidence,
      risk: plan.task.risk,
      reasons: plan.reasons,
    }),
    ...plan.reviews.map((review) =>
      createAgentRuntimeMessage({
        role: review.reviewer,
        type: "review",
        content: review.summary,
        createdAt: input.now ?? input.task.createdAt,
        taskId: input.task.id,
        eventType: review.status === "blocked" ? "failure.detected" : "task.updated",
        confidence: review.confidence,
        risk: review.risk,
        reasons: review.reasons,
      })
    ),
  ];
  const events = messages.map(mapAgentRuntimeMessageToBrainEvent);
  const episodeInput = mapAgentPlanToEpisodeInput({
    plan,
    events,
    createdAt: input.now ?? input.task.createdAt,
  });
  return {
    plan,
    context,
    episodeInput,
    messages,
    events,
    summary: summarizeAgentRuntimePlan(plan),
  };
}
