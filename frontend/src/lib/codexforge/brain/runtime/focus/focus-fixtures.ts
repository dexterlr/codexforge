import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeAgentRuntimeHandoff,
  CodexForgeAgentRuntimeTask,
} from "@/lib/codexforge/agents/runtime";
import { buildAgentRuntimeFixturePlan } from "@/lib/codexforge/agents/runtime";
import {
  buildPredictiveContext,
  type CodexForgePredictiveContextResult,
} from "../context";
import {
  buildKnowledgeTopology,
  type CodexForgeKnowledgeTopology,
} from "../topology";
import {
  buildRuntimeHealthFixtureDashboard,
  type CodexForgeRuntimeHealthDashboard,
} from "../health";
import {
  buildRuntimeRecommendations,
  type CodexForgeRuntimeRecommendation,
} from "../recommendations";
import type {
  CodexForgeBrainRuntimeEvent,
} from "../runtime-types";
import type {
  CodexForgeCognitiveMemoryScore,
} from "../memory";
import type { CodexForgeBrainFocusModel } from "./focus-types";
import { buildBrainFocusModel } from "./focus-engine";

export const CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS = 1767225600000;

export function buildBrainFocusFixtureGraph(): CodexForgeBrainGraph {
  const ts = CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS;
  return {
    version: 2,
    meta: { createdAt: ts - 240000, updatedAt: ts, repoPath: "repos/codexforge/frontend" },
    nodes: [
      {
        id: "task:phase-6f-focus-navigation",
        kind: "task",
        data: {
          label: "Phase 6F focus navigation",
          goal: "Add read-only focus mode and cognitive drilldown navigation for the brain command center.",
          nextAction: "Inspect focus neighborhood before any approved implementation action.",
          tags: ["task", "focus-mode", "drilldown"],
        },
        meta: { createdAt: ts - 230000, updatedAt: ts - 20000, status: "active", importance: "critical", pinned: true },
      },
      {
        id: "run:phase-6f-validation",
        kind: "run",
        data: {
          label: "Focus drilldown validation run",
          resultSummary: "Build, focus smoke, server smoke, and diff check validate read-only navigation.",
          phase: "validation",
          tags: ["execution", "validation", "recovery"],
        },
        meta: { createdAt: ts - 220000, updatedAt: ts - 18000, status: "done", importance: "high" },
      },
      {
        id: "diff:focus-package",
        kind: "diff",
        data: {
          label: "Brain focus runtime package",
          filePath: "src/lib/codexforge/brain/runtime/focus/focus-engine.ts",
          patchPreview: "Compose graph, memory, topology, recommendations, health, and agent signals into a read-only focus model.",
          tags: ["diff", "runtime", "file"],
        },
        meta: { createdAt: ts - 210000, updatedAt: ts - 17000, status: "active", importance: "high" },
      },
      {
        id: "failure:readonly-boundary",
        kind: "note",
        data: {
          label: "Read-only boundary failure branch",
          text: "Focus and drilldown components must not mutate graph state or execute actions.",
          tags: ["failure", "approval-boundary", "risk"],
        },
        meta: { createdAt: ts - 200000, updatedAt: ts - 16000, status: "blocked", importance: "critical" },
      },
      {
        id: "recovery:fixture-fallback",
        kind: "run",
        data: {
          label: "Fixture fallback recovery",
          resultSummary: "Deterministic fixture focus model keeps UI useful when live runtime data is unavailable.",
          tags: ["recovery", "fixture", "deterministic"],
        },
        meta: { createdAt: ts - 190000, updatedAt: ts - 15000, status: "done", importance: "high" },
      },
      {
        id: "memory:focus-readonly",
        kind: "memory",
        data: {
          label: "Focus drilldown stays read-only",
          memoryType: "decision",
          content: "Focus mode can select UI-local objects but must not write browser storage or mutate the graph.",
          tags: ["memory", "readonly", "focus"],
        },
        meta: { createdAt: ts - 180000, updatedAt: ts - 14000, status: "active", importance: "critical", pinned: true },
      },
      {
        id: "concept:cognitive-neighborhood",
        kind: "decision",
        data: {
          label: "Cognitive neighborhood navigation",
          summary: "A focus target should reveal related nodes, files, tasks, memories, concepts, risks, recommendations, agents, and executions.",
          tags: ["concept", "topology", "navigation"],
        },
        meta: { createdAt: ts - 170000, updatedAt: ts - 13000, status: "active", importance: "high" },
      },
      {
        id: "file:brain-command-center",
        kind: "diff",
        data: {
          label: "Brain command center hotspot",
          filePath: "src/lib/codexforge/brain/components/brain-command-center.tsx",
          patchPreview: "Render BrainFocusModePanel and BrainDrilldownPanel without replacing the graph view.",
          tags: ["file", "architecture", "brain-ui"],
        },
        meta: { createdAt: ts - 160000, updatedAt: ts - 12000, status: "active", importance: "high" },
      },
      {
        id: "tool:verification-agent",
        kind: "tool",
        data: {
          label: "VerificationAgent handoff",
          toolName: "VerificationAgent",
          description: "Review focus smoke coverage and approval-boundary evidence.",
          tags: ["agent", "handoff", "review"],
        },
        meta: { createdAt: ts - 150000, updatedAt: ts - 11000, status: "active", importance: "high" },
      },
      {
        id: "risk:approval-boundary",
        kind: "task",
        data: {
          label: "Approval boundary drilldown",
          goal: "Separate read-only drilldown suggestions from approval-required execution actions.",
          tags: ["risk", "approval-boundary", "recommendation"],
        },
        meta: { createdAt: ts - 140000, updatedAt: ts - 10000, status: "blocked", importance: "critical" },
      },
    ],
    edges: [
      { id: "edge:task-run", kind: "executed_in", from: "task:phase-6f-focus-navigation", to: "run:phase-6f-validation", weight: 0.9, meta: { createdAt: ts - 9000, updatedAt: ts - 9000, status: "active", importance: "high" } },
      { id: "edge:run-diff", kind: "produced", from: "run:phase-6f-validation", to: "diff:focus-package", weight: 0.86, meta: { createdAt: ts - 8500, updatedAt: ts - 8500, status: "active", importance: "high" } },
      { id: "edge:failure-recovery", kind: "blocks", from: "failure:readonly-boundary", to: "recovery:fixture-fallback", weight: 0.82, meta: { createdAt: ts - 8000, updatedAt: ts - 8000, status: "active", importance: "critical" } },
      { id: "edge:memory-concept", kind: "relates_to", from: "memory:focus-readonly", to: "concept:cognitive-neighborhood", weight: 0.88, meta: { createdAt: ts - 7500, updatedAt: ts - 7500, status: "active", importance: "high" } },
      { id: "edge:file-task", kind: "references", from: "file:brain-command-center", to: "task:phase-6f-focus-navigation", weight: 0.78, meta: { createdAt: ts - 7000, updatedAt: ts - 7000, status: "active", importance: "high" } },
      { id: "edge:agent-risk", kind: "depends_on", from: "tool:verification-agent", to: "risk:approval-boundary", weight: 0.76, meta: { createdAt: ts - 6500, updatedAt: ts - 6500, status: "active", importance: "high" } },
      { id: "edge:risk-recommendation-memory", kind: "references", from: "risk:approval-boundary", to: "memory:focus-readonly", weight: 0.84, meta: { createdAt: ts - 6000, updatedAt: ts - 6000, status: "active", importance: "critical" } },
    ],
  };
}

export function buildBrainFocusFixtureEvents(): CodexForgeBrainRuntimeEvent[] {
  const ts = CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS;
  return [
    { id: "event:focus-task", type: "task.created", ts: ts - 9000, actor: "runtime", payload: { taskId: "phase-6f", goal: "Add focus mode and cognitive drilldown navigation.", tags: ["focus", "drilldown"], nodeId: "task:phase-6f-focus-navigation" } },
    { id: "event:focus-execution", type: "execution.completed", ts: ts - 7000, actor: "tool", payload: { executionId: "focus-smoke", status: "completed", resultSummary: "Focus drilldown smoke validates markers, exports, determinism, and forbidden dependency rules.", diffIds: ["diff:focus-package"], nodeId: "run:phase-6f-validation" } },
    { id: "event:focus-diff", type: "diff.generated", ts: ts - 6500, actor: "tool", payload: { diffId: "diff:focus-package", executionId: "focus-smoke", filePath: "src/lib/codexforge/brain/runtime/focus/focus-engine.ts", patchPreview: "Add deterministic focus scoring and drilldown paths.", status: "active", nodeId: "diff:focus-package" } },
    { id: "event:focus-failure", type: "failure.detected", ts: ts - 5000, actor: "runtime", payload: { failureId: "readonly-boundary", executionId: "focus-smoke", taskId: "phase-6f", message: "Focus components must not execute actions.", severity: "critical", recoverable: true, nodeId: "failure:readonly-boundary" } },
    { id: "event:focus-recovery", type: "recovery.detected", ts: ts - 4000, actor: "runtime", payload: { recoveryId: "fixture-fallback", failureId: "readonly-boundary", executionId: "focus-smoke", taskId: "phase-6f", message: "Use deterministic read-only fixture fallback.", strategy: "fixture-fallback", nodeId: "recovery:fixture-fallback" } },
    { id: "event:focus-memory", type: "memory.promoted", ts: ts - 3000, actor: "runtime", payload: { memoryId: "memory:focus-readonly", content: "Focus navigation is advisory and read-only.", memoryType: "decision", importance: "critical", pinned: true, taskId: "phase-6f", sourceNodeIds: ["memory:focus-readonly"], nodeId: "memory:focus-readonly" } },
    { id: "event:focus-concept", type: "concept.synthesized", ts: ts - 2000, actor: "runtime", payload: { conceptId: "concept:cognitive-neighborhood", label: "Cognitive neighborhood navigation", summary: "Focus mode links memories, concepts, files, agents, risks, and health.", confidence: 0.88, sourceNodeIds: ["memory:focus-readonly", "file:brain-command-center"], sourceEventIds: ["event:focus-memory"], nodeId: "concept:cognitive-neighborhood" } },
  ];
}

export function buildBrainFocusFixtureMemory(): CodexForgeCognitiveMemoryScore[] {
  const graph = buildBrainFocusFixtureGraph();
  return graph.nodes
    .filter((node) => ["memory", "decision", "note"].includes(node.kind))
    .map((node, index) => ({
      node,
      score: index === 0 ? 0.96 : index === 1 ? 0.86 : 0.72,
      confidence: index === 0 ? 0.94 : 0.82,
      importance: node.meta.importance === "critical" ? 1 : 0.76,
      updatedAt: node.meta.updatedAt,
      reasons: ["focus-fixture-memory", node.id],
      breakdown: {
        score: index === 0 ? 0.96 : index === 1 ? 0.86 : 0.72,
        confidence: index === 0 ? 0.94 : 0.82,
        importance: node.meta.importance === "critical" ? 1 : 0.76,
        recency: 0.9,
        status: node.meta.status === "blocked" ? 0.4 : 0.82,
        pinned: node.meta.pinned ? 1 : 0,
        archived: node.meta.archived ? 1 : 0,
        sourceRefs: 0.68,
        repeatedEventSignals: 0.74,
        sourceDiversity: 0.66,
        contradictionRisk: node.id.includes("failure") ? 0.72 : 0.1,
        legacyRankSignal: 0.64,
        reasons: ["focus-fixture-memory", "deterministic"],
      },
    }));
}

export function buildBrainFocusFixtureContext(): CodexForgePredictiveContextResult {
  return buildPredictiveContext({
    graph: buildBrainFocusFixtureGraph(),
    events: buildBrainFocusFixtureEvents(),
    now: CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS,
  });
}

export function buildBrainFocusFixtureTopology(): CodexForgeKnowledgeTopology {
  return buildKnowledgeTopology({
    graph: buildBrainFocusFixtureGraph(),
    events: buildBrainFocusFixtureEvents(),
    cognitiveMemory: buildBrainFocusFixtureMemory(),
    predictiveContext: buildBrainFocusFixtureContext(),
    now: CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS,
  });
}

export function buildBrainFocusFixtureRecommendations(): CodexForgeRuntimeRecommendation[] {
  return buildRuntimeRecommendations({
    graph: buildBrainFocusFixtureGraph(),
    events: buildBrainFocusFixtureEvents(),
    cognitiveMemory: buildBrainFocusFixtureMemory(),
    predictiveContext: buildBrainFocusFixtureContext(),
    semanticTopology: buildBrainFocusFixtureTopology(),
    agents: buildBrainFocusFixtureAgents(),
    runtimeHealth: { status: "degraded", diagnostics: [{ id: "focus-readonly", severity: "high", message: "Focus drilldown must remain read-only." }] },
    now: CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS,
    limit: 10,
  });
}

export function buildBrainFocusFixtureHealth(): CodexForgeRuntimeHealthDashboard {
  return buildRuntimeHealthFixtureDashboard();
}

export function buildBrainFocusFixtureAgents(): {
  tasks: CodexForgeAgentRuntimeTask[];
  handoffs: CodexForgeAgentRuntimeHandoff[];
} {
  const plan = buildAgentRuntimeFixturePlan("high-risk-mutation");
  const ts = CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS;
  return {
    tasks: [
      {
        id: "agent-task:focus-review",
        goal: "Review focus drilldown read-only boundaries.",
        domain: "verification",
        requestedAction: "verify",
        status: "review-required",
        risk: "high",
        confidence: 0.86,
        filePaths: ["src/lib/codexforge/brain/components/brain-focus-mode-panel.tsx"],
        contextHints: ["focus-mode", "approval-boundary", "read-only"],
        reasons: ["fixture-agent-review", "focus-drilldown"],
        createdAt: ts - 2500,
      },
      plan.task,
    ],
    handoffs: [
      {
        id: "handoff:focus-verification-risk",
        from: "VerificationAgent",
        to: "RiskAnalysisAgent",
        taskId: "agent-task:focus-review",
        reason: "Approval-boundary drilldown should be inspected before any execution.",
        eventType: "task.updated",
        permission: "approval-required",
        risk: "high",
      },
      ...plan.handoffs,
    ],
  };
}

export function buildBrainFocusFixtureModel(): CodexForgeBrainFocusModel {
  const graph = buildBrainFocusFixtureGraph();
  const events = buildBrainFocusFixtureEvents();
  const cognitiveMemory = buildBrainFocusFixtureMemory();
  const predictiveContext = buildBrainFocusFixtureContext();
  const semanticTopology = buildBrainFocusFixtureTopology();
  const recommendations = buildBrainFocusFixtureRecommendations();
  const agents = buildBrainFocusFixtureAgents();
  return buildBrainFocusModel({
    graph,
    selectedNodeId: "task:phase-6f-focus-navigation",
    events,
    cognitiveMemory,
    predictiveContext,
    semanticTopology,
    recommendations,
    runtimeHealth: buildBrainFocusFixtureHealth(),
    agents,
    now: CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS,
    limit: 36,
  });
}
