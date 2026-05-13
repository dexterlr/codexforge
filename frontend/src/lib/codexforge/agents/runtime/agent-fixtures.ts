import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeContext } from "@/lib/codexforge/brain/runtime/runtime-types";
import { buildAgentRuntimeContext } from "./agent-context";
import { buildAgentRuntimePlan } from "./agent-orchestrator";
import type {
  CodexForgeAgentRuntimeContext,
  CodexForgeAgentRuntimePlan,
  CodexForgeAgentRuntimeTask,
} from "./agent-types";

export const CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS = 1_735_689_600_000;

export function buildAgentRuntimeFixtureTask(
  scenario: "high-risk-mutation" | "research" | "memory-curation" | "graph-optimization" =
    "high-risk-mutation"
): CodexForgeAgentRuntimeTask {
  const shared = {
    status: "proposed" as const,
    confidence: 0.82,
    createdAt: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
  };
  if (scenario === "research") {
    return {
      ...shared,
      id: "agent-task:fixture:research",
      goal: "Summarize local runtime research signals without external access.",
      domain: "research",
      requestedAction: "research",
      risk: "low",
      filePaths: [],
      contextHints: ["local-only", "no-network"],
      reasons: ["research-scenario", "read-only"],
    };
  }
  if (scenario === "memory-curation") {
    return {
      ...shared,
      id: "agent-task:fixture:memory",
      goal: "Review memory candidates and propose curation actions.",
      domain: "memory",
      requestedAction: "curate-memory",
      risk: "medium",
      filePaths: [],
      contextHints: ["cognitive-memory", "contradiction-check"],
      reasons: ["memory-curation-scenario"],
    };
  }
  if (scenario === "graph-optimization") {
    return {
      ...shared,
      id: "agent-task:fixture:graph",
      goal: "Inspect graph summary and suggest optimizer handoffs.",
      domain: "graph",
      requestedAction: "optimize-graph",
      risk: "medium",
      filePaths: ["src/lib/codexforge/brain/graph/types.ts"],
      contextHints: ["canonical-graph-types", "no-new-schema"],
      reasons: ["graph-optimization-scenario", "schema-drift-check"],
    };
  }
  return {
    ...shared,
    id: "agent-task:fixture:high-risk",
    goal: "Plan a high-risk runtime mutation without executing it.",
    domain: "implementation",
    requestedAction: "mutate",
    risk: "high",
    filePaths: ["src/lib/codexforge/brain/runtime/runtime-types.ts"],
    contextHints: ["approval-required", "VerificationAgent", "RiskAnalysisAgent"],
    reasons: ["high-risk-mutation-scenario", "requires-review-gates"],
  };
}

function fixtureGraph(): CodexForgeBrainGraph {
  return {
    version: 2,
    nodes: [
      {
        id: "task:fixture",
        kind: "task",
        data: {
          label: "Fixture task",
          goal: "Create deterministic multi-agent runtime foundation.",
          tags: ["agent-runtime"],
        },
        meta: {
          createdAt: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
          updatedAt: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
          status: "active",
          importance: "high",
        },
      },
    ],
    edges: [],
    meta: {
      createdAt: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
      updatedAt: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
    },
  };
}

function fixtureRuntimeContext(): CodexForgeBrainRuntimeContext {
  return {
    generatedAt: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
    focusNodeIds: ["task:fixture"],
    summary: {
      nodeCount: 1,
      edgeCount: 0,
      eventCount: 1,
      selectedNodeCount: 1,
      selectedEventCount: 1,
    },
    nodes: [
      {
        id: "task:fixture",
        kind: "task",
        label: "Fixture task",
        status: "active",
        importance: "high",
        score: 0.88,
      },
    ],
    edges: [],
    events: [
      {
        id: "event:fixture:task",
        type: "task.updated",
        ts: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
        summary: "Fixture task updated for agent runtime.",
        nodeIds: ["task:fixture"],
      },
    ],
    memory: [],
    goals: ["Create deterministic agent runtime."],
    failures: [],
    outputs: ["Runtime plan only."],
  };
}

export function buildAgentRuntimeFixtureContext(
  scenario: Parameters<typeof buildAgentRuntimeFixtureTask>[0] = "high-risk-mutation"
): CodexForgeAgentRuntimeContext {
  return buildAgentRuntimeContext({
    task: buildAgentRuntimeFixtureTask(scenario),
    runtimeContext: fixtureRuntimeContext(),
    graph: fixtureGraph(),
    now: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
  });
}

export function buildAgentRuntimeFixturePlan(
  scenario: Parameters<typeof buildAgentRuntimeFixtureTask>[0] = "high-risk-mutation"
): CodexForgeAgentRuntimePlan {
  return buildAgentRuntimePlan({
    task: buildAgentRuntimeFixtureTask(scenario),
    runtimeContext: fixtureRuntimeContext(),
    graph: fixtureGraph(),
    now: CODEXFORGE_AGENT_RUNTIME_FIXTURE_TS,
  });
}
