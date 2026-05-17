import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import type { CodexForgeCognitiveMemoryScore } from "../memory";
import type { CodexForgePredictiveContextResult } from "../context";
import type { CodexForgeKnowledgeTopology } from "./topology-types";
import { buildKnowledgeTopology } from "./knowledge-topology";

export const CODEXFORGE_SEMANTIC_TOPOLOGY_FIXTURE_TS = 1767225600000;

export function buildSemanticTopologyFixtureGraph(): CodexForgeBrainGraph {
  const ts = CODEXFORGE_SEMANTIC_TOPOLOGY_FIXTURE_TS;
  return {
    version: 2,
    meta: {
      createdAt: ts - 120000,
      updatedAt: ts,
      repoPath: "repos/codexforge/frontend",
    },
    nodes: [
      {
        id: "memory:command-center-readonly",
        kind: "memory",
        data: {
          label: "Command center panels are read-only",
          memoryType: "decision",
          content: "Brain command center panels should not mutate graph state.",
          tags: ["brain", "readonly", "runtime"],
        },
        meta: { createdAt: ts - 110000, updatedAt: ts - 90000, importance: "critical", status: "active", pinned: true },
      },
      {
        id: "concept:semantic-radar",
        kind: "decision",
        data: {
          label: "Semantic radar and topology map",
          summary: "Phase 6C exposes cognitive weight across memory, risk, files, agents, concepts, and predictions.",
          tags: ["concept", "topology", "brain"],
        },
        meta: { createdAt: ts - 100000, updatedAt: ts - 80000, importance: "high", status: "active" },
      },
      {
        id: "risk:direct-mutation",
        kind: "task",
        data: {
          label: "Direct graph mutation risk",
          goal: "Keep topology components read-only and preserve graph inspector behavior.",
          tags: ["risk", "graph", "inspector"],
        },
        meta: { createdAt: ts - 90000, updatedAt: ts - 70000, importance: "critical", status: "blocked" },
      },
      {
        id: "file:brain-command-center",
        kind: "diff",
        data: {
          label: "Brain command center integration",
          filePath: "src/lib/codexforge/brain/components/brain-command-center.tsx",
          patchPreview: "Add semantic heatmap and knowledge topology panels.",
          tags: ["architecture", "file", "brain"],
        },
        meta: { createdAt: ts - 80000, updatedAt: ts - 60000, importance: "high", status: "active" },
      },
      {
        id: "agent:risk-analysis",
        kind: "tool",
        data: {
          label: "RiskAnalysisAgent hotspot",
          toolName: "RiskAnalysisAgent",
          description: "Agent activity concentrates around validation gates and approval boundaries.",
          tags: ["agent", "risk", "validation"],
        },
        meta: { createdAt: ts - 70000, updatedAt: ts - 50000, importance: "high", status: "active" },
      },
      {
        id: "memory:contradiction",
        kind: "note",
        data: {
          label: "Contradictory memory candidate",
          text: "Topology panels can mutate graph state contradicts the current read-only rule.",
          tags: ["contradiction", "memory", "readonly"],
        },
        meta: { createdAt: ts - 60000, updatedAt: ts - 40000, importance: "medium", status: "error", archived: true },
      },
      {
        id: "memory:stale-context",
        kind: "memory",
        data: {
          label: "Stale memory hotspot",
          memoryType: "note",
          content: "Old graph-only command center assumption is archived and should not dominate context.",
          tags: ["stale", "memory", "graph"],
        },
        meta: { createdAt: ts - 50000, updatedAt: ts - 30000, importance: "medium", status: "archived", archived: true },
      },
      {
        id: "recovery:validation",
        kind: "run",
        data: {
          label: "Recovery validation path",
          resultSummary: "Build, semantic topology smoke, server smoke, and diff check validate the phase.",
          tags: ["recovery", "validation", "execution"],
        },
        meta: { createdAt: ts - 40000, updatedAt: ts - 20000, importance: "high", status: "done" },
      },
    ],
    edges: [
      {
        id: "edge:memory-concept",
        kind: "relates_to",
        from: "memory:command-center-readonly",
        to: "concept:semantic-radar",
        weight: 0.82,
        meta: { createdAt: ts - 30000, updatedAt: ts - 30000, importance: "high", status: "active" },
      },
      {
        id: "edge:risk-file",
        kind: "references",
        from: "risk:direct-mutation",
        to: "file:brain-command-center",
        weight: 0.86,
        meta: { createdAt: ts - 25000, updatedAt: ts - 25000, importance: "critical", status: "active" },
      },
      {
        id: "edge:agent-risk",
        kind: "depends_on",
        from: "agent:risk-analysis",
        to: "risk:direct-mutation",
        weight: 0.74,
        meta: { createdAt: ts - 20000, updatedAt: ts - 20000, importance: "high", status: "active" },
      },
      {
        id: "edge:contradiction-recovery",
        kind: "blocks",
        from: "memory:contradiction",
        to: "recovery:validation",
        weight: 0.7,
        meta: { createdAt: ts - 15000, updatedAt: ts - 15000, importance: "high", status: "active" },
      },
    ],
  };
}

export function buildSemanticTopologyFixtureEvents(): CodexForgeBrainRuntimeEvent[] {
  const ts = CODEXFORGE_SEMANTIC_TOPOLOGY_FIXTURE_TS;
  return [
    {
      id: "event:semantic-topology-task",
      type: "task.created",
      ts: ts - 9000,
      actor: "runtime",
      payload: {
        taskId: "phase-6c",
        goal: "Add semantic heatmaps and knowledge topology.",
        tags: ["task", "topology"],
        nodeId: "risk:direct-mutation",
      },
    },
    {
      id: "event:semantic-topology-execution",
      type: "execution.completed",
      ts: ts - 7000,
      actor: "tool",
      payload: {
        executionId: "topology-smoke",
        status: "completed",
        resultSummary: "Semantic topology smoke validates exports, markers, determinism, and forbidden dependencies.",
        nodeId: "recovery:validation",
      },
    },
    {
      id: "event:semantic-topology-risk",
      type: "failure.detected",
      ts: ts - 5000,
      actor: "runtime",
      payload: {
        failureId: "read-only-boundary",
        message: "Topology must not directly mutate graph state.",
        severity: "high",
        recoverable: true,
        nodeId: "risk:direct-mutation",
      },
    },
    {
      id: "event:semantic-topology-recovery",
      type: "recovery.detected",
      ts: ts - 3000,
      actor: "runtime",
      payload: {
        recoveryId: "read-only-fixture-fallback",
        failureId: "read-only-boundary",
        message: "Use read-only fixture fallback when live runtime data is unavailable.",
        strategy: "fixture-fallback",
        nodeId: "recovery:validation",
      },
    },
  ];
}

export function buildSemanticTopologyFixtureMemory(): CodexForgeCognitiveMemoryScore[] {
  const graph = buildSemanticTopologyFixtureGraph();
  return graph.nodes
    .filter((node) => node.kind === "memory" || node.kind === "decision" || node.kind === "note")
    .map((node, index) => ({
      node,
      score: index === 0 ? 0.92 : index === 1 ? 0.72 : 0.48,
      confidence: index === 0 ? 0.9 : 0.62,
      importance: node.meta.importance === "critical" ? 1 : node.meta.importance === "high" ? 0.78 : 0.54,
      updatedAt: node.meta.updatedAt,
      reasons: ["fixture-memory", `node:${node.id}`],
      breakdown: {
        score: index === 0 ? 0.92 : index === 1 ? 0.72 : 0.48,
        confidence: index === 0 ? 0.9 : 0.62,
        importance: node.meta.importance === "critical" ? 1 : node.meta.importance === "high" ? 0.78 : 0.54,
        recency: 0.7,
        status: node.meta.status === "archived" ? 0.2 : 0.72,
        pinned: node.meta.pinned ? 1 : 0,
        archived: node.meta.archived ? 1 : 0,
        sourceRefs: 0.4,
        repeatedEventSignals: 0.5,
        sourceDiversity: 0.4,
        contradictionRisk: node.id.includes("contradiction") ? 0.76 : 0.1,
        baselineRankSignal: 0.6,
        reasons: ["fixture-memory"],
      },
    }));
}

export function buildSemanticTopologyFixtureContext(): CodexForgePredictiveContextResult {
  const ts = CODEXFORGE_SEMANTIC_TOPOLOGY_FIXTURE_TS;
  return {
    generatedAt: ts,
    predictedIntent: {
      route: "architecture",
      label: "Prepare semantic topology context",
      confidence: 0.82,
      reasons: ["fixture-prediction", "topology-context"],
    },
    signals: [
      {
        id: "fixture:file:brain-command-center",
        kind: "file",
        label: "src/lib/codexforge/brain/components/brain-command-center.tsx",
        score: 0.86,
        confidence: 0.78,
        timestamp: ts - 6000,
        reasons: ["command-center-integration"],
        source: "file",
        ref: { path: "src/lib/codexforge/brain/components/brain-command-center.tsx" },
      },
      {
        id: "fixture:architecture:runtime-topology",
        kind: "architecture",
        label: "brain runtime topology subsystem",
        score: 0.84,
        confidence: 0.8,
        timestamp: ts - 5000,
        reasons: ["runtime-package", "deterministic-layout"],
        source: "architecture",
      },
      {
        id: "fixture:prediction:next-safe-action",
        kind: "next-action",
        label: "Inspect topology hotspots before routing context.",
        score: 0.74,
        confidence: 0.74,
        timestamp: ts - 4000,
        reasons: ["read-only-next-action"],
        source: "task-focus",
      },
    ],
    relevantFiles: [],
    relevantMemories: [],
    relevantTasks: [],
    relatedPriorExecutions: [],
    architecturalConcepts: {
      subsystem: "runtime",
      confidence: 0.84,
      reasons: ["fixture-architecture"],
      relatedFiles: ["src/lib/codexforge/brain/runtime/topology/index.ts"],
      relatedConcepts: ["semantic heatmap", "knowledge topology"],
      constraints: ["Keep topology read-only.", "Keep layout deterministic."],
      likelyEditBoundaries: ["src/lib/codexforge/brain/runtime/topology", "src/lib/codexforge/brain/components"],
      risks: ["Topology must not mutate graph state."],
    },
    risks: [
      {
        id: "fixture:risk:mutation",
        label: "Direct graph mutation through topology panel",
        severity: "high",
        score: 0.82,
        confidence: 0.78,
        timestamp: ts - 3000,
        reasons: ["read-only-boundary"],
        mitigation: "Do not expose mutation handlers from topology panels.",
        nextSafeAction: "Use existing graph inspector for graph actions.",
      },
    ],
    unresolvedBlockers: [],
    likelyNextSafeActions: [],
    taskFocus: {
      activeGoal: "Add semantic topology",
      likelyNextTask: "Validate build and smoke before handoff.",
      blockers: [],
      pendingValidations: ["Run semantic topology smoke.", "Run build before handoff."],
      confidence: 0.8,
      reasons: ["fixture-task-focus"],
      nextSafeAction: "Validate build and smoke before handoff.",
    },
    contextConfidence: 0.82,
    explanation: ["fixture-context", "semantic-topology"],
  };
}

export function buildSemanticTopologyFixtureTopology(): CodexForgeKnowledgeTopology {
  return buildKnowledgeTopology({
    graph: buildSemanticTopologyFixtureGraph(),
    events: buildSemanticTopologyFixtureEvents(),
    cognitiveMemory: buildSemanticTopologyFixtureMemory(),
    predictiveContext: buildSemanticTopologyFixtureContext(),
    now: CODEXFORGE_SEMANTIC_TOPOLOGY_FIXTURE_TS,
  });
}
