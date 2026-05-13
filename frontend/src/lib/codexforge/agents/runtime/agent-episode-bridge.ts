import { createEpisode } from "@/lib/codexforge/brain/runtime/episode-manager";
import type {
  CodexForgeBrainCreateEpisodeInput,
  CodexForgeBrainEpisode,
  CodexForgeBrainRuntimeEvent,
} from "@/lib/codexforge/brain/runtime/runtime-types";
import type { CodexForgeAgentRuntimePlan } from "./agent-types";

export function mapAgentPlanToEpisodeInput(input: {
  readonly plan: CodexForgeAgentRuntimePlan;
  readonly events?: readonly CodexForgeBrainRuntimeEvent[];
  readonly createdAt?: number;
}): CodexForgeBrainCreateEpisodeInput {
  const plan = input.plan;
  return {
    id: `episode:${plan.id}`,
    goal: plan.task.goal,
    context: [
      plan.contextSummary,
      ...plan.task.contextHints,
      ...plan.decision.reasons,
    ].slice(0, 16),
    actions: [
      ...plan.readOnlySteps.map((step) => step.label),
      ...plan.approvalRequiredSteps.map((step) => `Approval required: ${step.label}`),
    ],
    failures: plan.blockedSteps.map((step) => step.label),
    recovery: plan.reviews.flatMap((review) => review.recommendations),
    outputs: [
      `Primary agent: ${plan.decision.primaryAgent}`,
      `Support agents: ${plan.decision.supportAgents.join(", ") || "none"}`,
      `Reviewer agents: ${plan.decision.reviewerAgents.join(", ") || "none"}`,
    ],
    learnedConcepts: [
      "Multi-agent runtime plans are event-driven and non-executing.",
      "High-risk mutation routes require VerificationAgent and RiskAnalysisAgent.",
    ],
    events: input.events ? [...input.events] : undefined,
    createdAt: input.createdAt ?? plan.task.createdAt,
    metadata: {
      source: "agent-runtime",
      planId: plan.id,
      runtimePhase: "5A",
      directGraphMutation: false,
    },
  };
}

export function createAgentRuntimeEpisode(input: {
  readonly plan: CodexForgeAgentRuntimePlan;
  readonly events?: readonly CodexForgeBrainRuntimeEvent[];
  readonly createdAt?: number;
}): CodexForgeBrainEpisode {
  return createEpisode(mapAgentPlanToEpisodeInput(input));
}

export function summarizeAgentEpisodeBridge(episode: CodexForgeBrainEpisode): string {
  return `Agent episode ${episode.id} captures ${episode.actions.length} actions, ${episode.failures.length} failures, and ${episode.learnedConcepts.length} learned concepts.`;
}
