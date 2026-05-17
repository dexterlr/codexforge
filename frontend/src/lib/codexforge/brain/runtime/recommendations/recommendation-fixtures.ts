import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeAgentRuntimeHandoff, CodexForgeAgentRuntimeTask } from "@/lib/codexforge/agents/runtime/agent-types";
import {
  buildPredictiveContext,
  type CodexForgePredictiveContextResult,
} from "../context";
import {
  buildKnowledgeTopology,
  type CodexForgeKnowledgeTopology,
} from "../topology";
import type {
  CodexForgeBrainRuntimeEvent,
} from "../runtime-types";
import type {
  CodexForgeCognitiveMemoryScore,
} from "../memory";
import { buildInsightQueue } from "./insight-queue";
import { buildRuntimeRecommendations } from "./recommendation-engine";
import type { CodexForgeInsightQueue } from "./recommendation-types";

export const CODEXFORGE_RECOMMENDATION_FIXTURE_TS = 1767225600000;

export function buildRecommendationFixtureGraph(): CodexForgeBrainGraph {
  const ts = CODEXFORGE_RECOMMENDATION_FIXTURE_TS;
  return {
    version: 2,
    meta: { createdAt: ts - 220000, updatedAt: ts, repoPath: "repos/codexforge/frontend" },
    nodes: [
      {
        id: "risk:critical-approval-boundary",
        kind: "task",
        data: { label: "Critical approval boundary", goal: "Protect mutation and command boundaries before runtime execution.", tags: ["risk", "approval", "runtime"] },
        meta: { createdAt: ts - 210000, updatedAt: ts - 90000, importance: "critical", status: "blocked", pinned: true },
      },
      {
        id: "memory:readonly-required",
        kind: "memory",
        data: { label: "Recommendations are read-only", memoryType: "decision", content: "Brain recommendations should inspect state and must not mutate graph state.", tags: ["brain", "readonly", "recommendations"] },
        meta: { createdAt: ts - 200000, updatedAt: ts - 80000, importance: "critical", status: "active", pinned: true },
      },
      {
        id: "memory:readonly-contradiction",
        kind: "note",
        data: { label: "Contradictory mutation note", text: "Recommendations can mutate graph state directly, which is unsafe for this phase.", tags: ["contradiction", "brain"] },
        meta: { createdAt: ts - 190000, updatedAt: ts - 70000, importance: "medium", status: "error" },
      },
      {
        id: "memory:stale-context",
        kind: "memory",
        data: { label: "Stale command center context", memoryType: "note", content: "Old graph-only command center assumptions are archived and need refresh.", tags: ["stale", "context"] },
        meta: { createdAt: ts - 1800000000, updatedAt: ts - 1700000000, importance: "medium", status: "archived", archived: true },
      },
      {
        id: "file:brain-command-center",
        kind: "diff",
        data: { label: "Brain command center hotspot", filePath: "src/lib/codexforge/brain/components/brain-command-center.tsx", patchPreview: "Add recommendations and insight queue panels.", tags: ["architecture", "file", "brain"] },
        meta: { createdAt: ts - 170000, updatedAt: ts - 60000, importance: "high", status: "active" },
      },
      {
        id: "run:failed-validation",
        kind: "run",
        data: { label: "Failed recommendation smoke", resultSummary: "Initial runtime recommendation validation failed and requires review.", tags: ["execution", "failure"] },
        meta: { createdAt: ts - 160000, updatedAt: ts - 50000, importance: "high", status: "error" },
      },
      {
        id: "run:recovered-validation",
        kind: "run",
        data: { label: "Recovered validation path", resultSummary: "Recovery confirms read-only recommendation fixtures and smoke markers.", tags: ["execution", "recovery"] },
        meta: { createdAt: ts - 150000, updatedAt: ts - 40000, importance: "high", status: "done" },
      },
      {
        id: "tool:risk-analysis-agent",
        kind: "tool",
        data: { label: "RiskAnalysisAgent handoff", toolName: "RiskAnalysisAgent", description: "Agent review is required before approval-gated runtime changes.", tags: ["agent", "handoff", "review"] },
        meta: { createdAt: ts - 140000, updatedAt: ts - 30000, importance: "high", status: "blocked" },
      },
    ],
    edges: [
      { id: "edge:risk-memory", kind: "references", from: "risk:critical-approval-boundary", to: "memory:readonly-required", weight: 0.9, meta: { createdAt: ts - 60000, updatedAt: ts - 60000, importance: "critical", status: "active" } },
      { id: "edge:contradiction-risk", kind: "blocks", from: "memory:readonly-contradiction", to: "risk:critical-approval-boundary", weight: 0.84, meta: { createdAt: ts - 50000, updatedAt: ts - 50000, importance: "high", status: "active" } },
      { id: "edge:file-risk", kind: "depends_on", from: "file:brain-command-center", to: "risk:critical-approval-boundary", weight: 0.86, meta: { createdAt: ts - 40000, updatedAt: ts - 40000, importance: "high", status: "active" } },
      { id: "edge:agent-file", kind: "uses", from: "tool:risk-analysis-agent", to: "file:brain-command-center", weight: 0.72, meta: { createdAt: ts - 30000, updatedAt: ts - 30000, importance: "high", status: "active" } },
    ],
  };
}

export function buildRecommendationFixtureEvents(): CodexForgeBrainRuntimeEvent[] {
  const ts = CODEXFORGE_RECOMMENDATION_FIXTURE_TS;
  return [
    { id: "event:recommendation-task", type: "task.created", ts: ts - 9000, actor: "runtime", payload: { taskId: "phase-6d", goal: "Add deterministic recommendations and autonomous insight queue.", tags: ["recommendations", "insights"], nodeId: "risk:critical-approval-boundary" } },
    { id: "event:failed-execution", type: "execution.completed", ts: ts - 7000, actor: "tool", payload: { executionId: "recommendation-smoke", status: "failed", resultSummary: "Recommendation smoke failed before fixture markers were complete.", nodeId: "run:failed-validation" } },
    { id: "event:recovered-execution", type: "recovery.detected", ts: ts - 5000, actor: "runtime", payload: { recoveryId: "recommendation-fixture-recovery", failureId: "recommendation-smoke", message: "Read-only fallback fixture restored deterministic insight queue.", strategy: "fixture-fallback", nodeId: "run:recovered-validation" } },
    { id: "event:memory-repeat", type: "memory.promoted", ts: ts - 3000, actor: "runtime", payload: { memoryId: "memory:readonly-required", content: "Recommendation panels must stay read-only.", memoryType: "decision", importance: "critical", pinned: true, sourceNodeIds: ["memory:readonly-required"], nodeId: "memory:readonly-required" } },
  ];
}

export function buildRecommendationFixtureMemory(): CodexForgeCognitiveMemoryScore[] {
  const graph = buildRecommendationFixtureGraph();
  return graph.nodes
    .filter((node) => ["memory", "decision", "note"].includes(node.kind))
    .map((node, index) => ({
      node,
      score: index === 0 ? 0.94 : index === 1 ? 0.72 : 0.48,
      confidence: index === 0 ? 0.92 : 0.68,
      importance: node.meta.importance === "critical" ? 1 : 0.58,
      updatedAt: node.meta.updatedAt,
      reasons: ["fixture-memory", node.meta.pinned ? "pinned-memory" : "review-memory"],
      breakdown: {
        score: index === 0 ? 0.94 : 0.72,
        confidence: index === 0 ? 0.92 : 0.68,
        importance: node.meta.importance === "critical" ? 1 : 0.58,
        recency: node.meta.archived ? 0.12 : 0.76,
        status: node.meta.archived ? 0.2 : 0.78,
        pinned: node.meta.pinned ? 1 : 0,
        archived: node.meta.archived ? 1 : 0,
        sourceRefs: 0.55,
        repeatedEventSignals: 0.72,
        sourceDiversity: 0.42,
        contradictionRisk: node.id.includes("contradiction") ? 0.82 : 0.08,
        baselineRankSignal: 0.64,
        reasons: ["fixture-memory"],
      },
    }));
}

export function buildRecommendationFixtureContext(): CodexForgePredictiveContextResult {
  return buildPredictiveContext({
    graph: buildRecommendationFixtureGraph(),
    events: buildRecommendationFixtureEvents(),
    now: CODEXFORGE_RECOMMENDATION_FIXTURE_TS,
  });
}

export function buildRecommendationFixtureTopology(): CodexForgeKnowledgeTopology {
  return buildKnowledgeTopology({
    graph: buildRecommendationFixtureGraph(),
    events: buildRecommendationFixtureEvents(),
    cognitiveMemory: buildRecommendationFixtureMemory(),
    predictiveContext: buildRecommendationFixtureContext(),
    now: CODEXFORGE_RECOMMENDATION_FIXTURE_TS,
  });
}

export function buildRecommendationFixtureAgents(): {
  tasks: CodexForgeAgentRuntimeTask[];
  handoffs: CodexForgeAgentRuntimeHandoff[];
} {
  const ts = CODEXFORGE_RECOMMENDATION_FIXTURE_TS;
  return {
    tasks: [
      {
        id: "agent-task:approval-review",
        goal: "Review approval boundary before runtime mutation.",
        domain: "risk",
        requestedAction: "verify",
        status: "review-required",
        risk: "high",
        confidence: 0.82,
        filePaths: ["src/lib/codexforge/brain/runtime/recommendations/action-safety.ts"],
        contextHints: ["approval-boundary", "read-only-phase"],
        reasons: ["fixture-agent-review", "approval-required-action"],
        createdAt: ts - 2000,
      },
    ],
    handoffs: [
      {
        id: "handoff:risk-to-verification",
        from: "RiskAnalysisAgent",
        to: "VerificationAgent",
        taskId: "agent-task:approval-review",
        reason: "Approval-required action needs verification review before execution.",
        eventType: "task.updated",
        permission: "approval-required",
        risk: "high",
      },
    ],
  };
}

export function buildRecommendationFixtureQueue(): CodexForgeInsightQueue {
  const recommendations = buildRuntimeRecommendations({
    graph: buildRecommendationFixtureGraph(),
    events: buildRecommendationFixtureEvents(),
    cognitiveMemory: buildRecommendationFixtureMemory(),
    predictiveContext: buildRecommendationFixtureContext(),
    semanticTopology: buildRecommendationFixtureTopology(),
    agents: buildRecommendationFixtureAgents(),
    now: CODEXFORGE_RECOMMENDATION_FIXTURE_TS,
  });
  return buildInsightQueue({
    recommendations,
    generatedAt: CODEXFORGE_RECOMMENDATION_FIXTURE_TS,
  });
}
