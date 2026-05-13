import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainBaseMeta,
  type CodexForgeBrainEdge,
  type CodexForgeBrainEdgeKind,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
  type CodexForgeBrainNodeKind,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainSeedBuildInput,
  CodexForgeBrainSeedEdgePlan,
  CodexForgeBrainSeedKind,
  CodexForgeBrainSeedNodePlan,
  CodexForgeBrainSeedSummary,
} from "./seed-types";

export const CODEXFORGE_BRAIN_SEED_FIXED_TS = 1767225600000;

type SeedNodeInput = {
  id: string;
  seedKind: CodexForgeBrainSeedKind;
  nodeKind: CodexForgeBrainNodeKind;
  label: string;
  description: string;
  summary: string;
  nextSafeAction: string;
  importance?: CodexForgeBrainBaseMeta["importance"];
  status?: CodexForgeBrainBaseMeta["status"];
  tags?: string[];
  graph?: CodexForgeBrainNode["graph"];
};

type SeedEdgeInput = {
  id: string;
  seedKind: CodexForgeBrainSeedKind;
  edgeKind: CodexForgeBrainEdgeKind;
  from: string;
  to: string;
  label: string;
  reason: string;
  weight?: number;
};

function resolveSeedTimestamp(input?: CodexForgeBrainSeedBuildInput): number {
  return typeof input?.now === "number" && Number.isFinite(input.now)
    ? input.now
    : CODEXFORGE_BRAIN_SEED_FIXED_TS;
}

function sourceRef(seedKind: CodexForgeBrainSeedKind, id: string) {
  return [{ type: "derived" as const, id: `phase-6l:${seedKind}:${id}` }];
}

export function buildCodexForgeBrainSeedNode(
  input: SeedNodeInput,
  now = CODEXFORGE_BRAIN_SEED_FIXED_TS
): CodexForgeBrainSeedNodePlan {
  const graphNode: CodexForgeBrainNode = {
    id: input.id,
    kind: input.nodeKind,
    data: {
      label: input.label,
      description: input.description,
      summary: input.summary,
      whyItMatters: input.description,
      source: "phase-6l-starter-graph",
      sourceId: input.id,
      sourceLabel: "Deterministic starter preview",
      tags: ["phase-6l", input.seedKind, ...(input.tags ?? [])],
      nextAction: input.nextSafeAction,
    } as CodexForgeBrainNode["data"],
    meta: {
      createdAt: now,
      updatedAt: now,
      status: input.status ?? "active",
      importance: input.importance ?? "medium",
      sourceRefs: sourceRef(input.seedKind, input.id),
      version: 1,
    },
    ...(input.graph ? { graph: input.graph } : {}),
  };

  return {
    id: `seed-node:${input.id}`,
    kind: input.seedKind,
    graphNode,
    reason: input.description,
    evidence: [input.summary, `Canonical graph kind: ${input.nodeKind}`],
    nextSafeAction: input.nextSafeAction,
    sourceLabel: "Deterministic starter preview",
    readOnly: true,
  };
}

export function buildCodexForgeBrainSeedEdge(
  input: SeedEdgeInput,
  now = CODEXFORGE_BRAIN_SEED_FIXED_TS
): CodexForgeBrainSeedEdgePlan {
  const graphEdge: CodexForgeBrainEdge = {
    id: input.id,
    kind: input.edgeKind,
    from: input.from,
    to: input.to,
    label: input.label,
    weight: input.weight ?? 0.72,
    meta: {
      createdAt: now,
      updatedAt: now,
      status: "active",
      importance: "medium",
      sourceRefs: sourceRef(input.seedKind, input.id),
      version: 1,
    },
  };

  return {
    id: `seed-edge:${input.id}`,
    kind: input.seedKind,
    graphEdge,
    reason: input.reason,
    evidence: [
      `${input.from} -> ${input.to}`,
      `Canonical edge kind: ${input.edgeKind}`,
    ],
    nextSafeAction: "Review this relationship in the read-only preview before creating the starter graph.",
    sourceLabel: "Deterministic starter preview",
    readOnly: true,
  };
}

export function summarizeCodexForgeBrainSeedGraph(
  graph: CodexForgeBrainGraph,
  nodePlans: CodexForgeBrainSeedNodePlan[] = [],
  edgePlans: CodexForgeBrainSeedEdgePlan[] = []
): CodexForgeBrainSeedSummary {
  const seedKinds = Array.from(
    new Set([...nodePlans, ...edgePlans].map((item) => item.kind))
  ).sort();
  const sourceLabels = Array.from(
    new Set([...nodePlans, ...edgePlans].map((item) => item.sourceLabel))
  ).sort();

  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    seedKinds,
    sourceLabels,
    reason: "A deterministic starter graph gives the empty Brain enough runtime structure to inspect safely.",
    evidence: [
      `${graph.nodes.length} planned nodes`,
      `${graph.edges.length} planned edges`,
      `${seedKinds.length} seed domains`,
    ],
    nextSafeAction: "Create the starter graph only if the current graph is still empty.",
    readOnly: true,
    destructive: false,
  };
}

export function buildCodexForgeBrainSeedGraph(
  input: CodexForgeBrainSeedBuildInput = {}
): CodexForgeBrainGraph {
  const now = resolveSeedTimestamp(input);
  const nodePlans = buildSeedNodePlans(now);
  const edgePlans = buildSeedEdgePlans(now);

  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: nodePlans.map((plan) => plan.graphNode),
    edges: edgePlans.map((plan) => plan.graphEdge),
    meta: {
      createdAt: now,
      updatedAt: now,
      workspaceId: input.seedId ?? "codexforge-first-run",
      projectId: "codexforge-brain-seed",
      repoPath: "CodexForge starter runtime",
    },
  };
}

export function buildSeedNodePlans(
  now = CODEXFORGE_BRAIN_SEED_FIXED_TS
): CodexForgeBrainSeedNodePlan[] {
  return [
    buildCodexForgeBrainSeedNode({
      id: "seed:runtime:codexforge-runtime",
      seedKind: "starter-runtime",
      nodeKind: "workflow",
      label: "CodexForge runtime",
      description: "The runtime coordinates graph memory, files, agents, and safety boundaries.",
      summary: "Core cognitive engineering runtime.",
      nextSafeAction: "Inspect the runtime node and its contained graph services.",
      importance: "critical",
      graph: { coordinates: { x: 0, y: 0 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:runtime:brain-graph",
      seedKind: "starter-runtime",
      nodeKind: "project",
      label: "Brain graph",
      description: "The canonical graph workspace for local cognitive memory.",
      summary: "Canonical graph view and inspector.",
      nextSafeAction: "Use the graph inspector to review starter nodes.",
      importance: "critical",
      graph: { coordinates: { x: 220, y: 0 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:runtime:event-store",
      seedKind: "starter-runtime",
      nodeKind: "artifact",
      label: "Event store",
      description: "A runtime concept for ordered cognitive events.",
      summary: "Event source for replay and reduction.",
      nextSafeAction: "Review replay panels after creation.",
      graph: { coordinates: { x: -220, y: 120 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:runtime:graph-reducer",
      seedKind: "starter-runtime",
      nodeKind: "tool",
      label: "Graph reducer",
      description: "A deterministic reducer concept that turns events into graph state.",
      summary: "Reduction boundary for graph updates.",
      nextSafeAction: "Keep graph changes explicit and reviewable.",
      graph: { coordinates: { x: 0, y: 150 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:memory:cognitive-memory",
      seedKind: "starter-memory",
      nodeKind: "memory",
      label: "Cognitive memory",
      description: "Stores durable facts, decisions, notes, and task context.",
      summary: "Starter memory cluster anchor.",
      nextSafeAction: "Review memory clusters after creating the starter graph.",
      importance: "high",
      graph: { coordinates: { x: -240, y: -120 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:context:predictive-context",
      seedKind: "starter-context",
      nodeKind: "research",
      label: "Predictive context",
      description: "Ranks likely next context across files, memory, agents, and risk.",
      summary: "Context routing concept for next-step planning.",
      nextSafeAction: "Inspect prediction panels without changing workspace state.",
      importance: "high",
      graph: { coordinates: { x: -40, y: -180 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:files:files-runtime",
      seedKind: "starter-files",
      nodeKind: "repo",
      label: "Files runtime",
      description: "Represents workspace file context without rewriting the Files UX.",
      summary: "File signal source for runtime reasoning.",
      nextSafeAction: "Open workspace files only when ready to inspect real project context.",
      graph: { coordinates: { x: 250, y: -145 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:agent:agent-runtime",
      seedKind: "starter-agent-team",
      nodeKind: "person",
      label: "Agent runtime",
      description: "Represents agent lanes, review handoffs, and execution awareness.",
      summary: "Agent team concept for cognitive work routing.",
      nextSafeAction: "Inspect agent activity as read-only runtime context.",
      graph: { coordinates: { x: -310, y: -260 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:safety:tool-policy",
      seedKind: "starter-safety",
      nodeKind: "tool",
      label: "Tool policy",
      description: "Describes the policy boundary for tool use and approval checks.",
      summary: "Safety policy concept.",
      nextSafeAction: "Review approval boundaries before executing actions.",
      importance: "critical",
      graph: { coordinates: { x: 310, y: 120 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:safety:approval-boundary",
      seedKind: "starter-safety",
      nodeKind: "decision",
      label: "Approval boundary",
      description: "Makes user-controlled graph creation and tool approval explicit.",
      summary: "No overwrite and approval checkpoint.",
      nextSafeAction: "Create only after confirming the graph is empty.",
      importance: "critical",
      status: "blocked",
      graph: { coordinates: { x: 470, y: 125 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:workspace:first-goal",
      seedKind: "starter-workspace",
      nodeKind: "task",
      label: "First workspace goal",
      description: "A starter goal for turning the empty Brain into useful project context.",
      summary: "Bootstrap a meaningful local memory graph.",
      nextSafeAction: "Open the workspace and send the first message after creation.",
      importance: "high",
      graph: { coordinates: { x: 10, y: 310 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:workspace:first-onboarding-task",
      seedKind: "starter-workspace",
      nodeKind: "step",
      label: "First onboarding task",
      description: "Review the starter graph, then connect it to real workspace activity.",
      summary: "Guided first-run task.",
      nextSafeAction: "Complete the onboarding checklist deliberately.",
      graph: { coordinates: { x: 220, y: 310 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:recommendations:starter-recommendation",
      seedKind: "starter-recommendations",
      nodeKind: "note",
      label: "Starter recommendation",
      description: "A first recommendation that points toward safe, inspectable next steps.",
      summary: "Review runtime health, memory clusters, and approval boundary.",
      nextSafeAction: "Inspect recommendations before acting on them.",
      importance: "high",
      graph: { coordinates: { x: 440, y: 310 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:health:starter-health-signal",
      seedKind: "starter-health",
      nodeKind: "run",
      label: "Starter health signal",
      description: "A deterministic health signal showing the starter graph was explicitly created.",
      summary: "First-run health checkpoint.",
      nextSafeAction: "Inspect runtime health after graph creation.",
      graph: { coordinates: { x: -220, y: 310 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:runtime:live-snapshot-boundary",
      seedKind: "starter-health",
      nodeKind: "snapshot",
      label: "Live snapshot boundary",
      description: "Separates live runtime snapshots from fixture and preview data.",
      summary: "Snapshot source boundary.",
      nextSafeAction: "Check snapshot source labels before trusting panel data.",
      graph: { coordinates: { x: -450, y: 120 } },
    }, now),
    buildCodexForgeBrainSeedNode({
      id: "seed:runtime:panel-data-integration",
      seedKind: "starter-health",
      nodeKind: "artifact",
      label: "Panel data integration",
      description: "Tracks how live, mixed, and fixture panel data inform the Brain UI.",
      summary: "Panel readiness integration point.",
      nextSafeAction: "Use source labels to distinguish preview from live data.",
      graph: { coordinates: { x: -520, y: -60 } },
    }, now),
  ];
}

export function buildSeedEdgePlans(
  now = CODEXFORGE_BRAIN_SEED_FIXED_TS
): CodexForgeBrainSeedEdgePlan[] {
  const edge = (input: SeedEdgeInput) => buildCodexForgeBrainSeedEdge(input, now);

  return [
    edge({
      id: "seed:edge:runtime-contains-event-store",
      seedKind: "starter-runtime",
      edgeKind: "contains",
      from: "seed:runtime:codexforge-runtime",
      to: "seed:runtime:event-store",
      label: "contains event store",
      reason: "The runtime owns the ordered event source concept.",
    }),
    edge({
      id: "seed:edge:runtime-contains-graph-reducer",
      seedKind: "starter-runtime",
      edgeKind: "contains",
      from: "seed:runtime:codexforge-runtime",
      to: "seed:runtime:graph-reducer",
      label: "contains graph reducer",
      reason: "The runtime owns the deterministic graph reducer concept.",
    }),
    edge({
      id: "seed:edge:runtime-powers-brain-graph",
      seedKind: "starter-runtime",
      edgeKind: "feeds",
      from: "seed:runtime:codexforge-runtime",
      to: "seed:runtime:brain-graph",
      label: "powers brain graph",
      reason: "The Brain graph is powered by runtime concepts.",
      weight: 0.88,
    }),
    edge({
      id: "seed:edge:memory-informs-context",
      seedKind: "starter-context",
      edgeKind: "feeds",
      from: "seed:memory:cognitive-memory",
      to: "seed:context:predictive-context",
      label: "informs context",
      reason: "Memory should inform predictive context.",
    }),
    edge({
      id: "seed:edge:context-informs-agents",
      seedKind: "starter-agent-team",
      edgeKind: "feeds",
      from: "seed:context:predictive-context",
      to: "seed:agent:agent-runtime",
      label: "informs agents",
      reason: "Agent lanes consume context signals.",
    }),
    edge({
      id: "seed:edge:files-inform-runtime",
      seedKind: "starter-files",
      edgeKind: "feeds",
      from: "seed:files:files-runtime",
      to: "seed:runtime:codexforge-runtime",
      label: "files inform runtime",
      reason: "Workspace files are a runtime signal source.",
    }),
    edge({
      id: "seed:edge:tool-policy-protects-approval-boundary",
      seedKind: "starter-safety",
      edgeKind: "depends_on",
      from: "seed:safety:approval-boundary",
      to: "seed:safety:tool-policy",
      label: "protected by tool policy",
      reason: "The approval boundary depends on explicit tool policy.",
      weight: 0.9,
    }),
    edge({
      id: "seed:edge:live-snapshot-informs-panels",
      seedKind: "starter-health",
      edgeKind: "feeds",
      from: "seed:runtime:live-snapshot-boundary",
      to: "seed:runtime:panel-data-integration",
      label: "informs panels",
      reason: "Live snapshot boundaries inform panel readiness.",
    }),
    edge({
      id: "seed:edge:panel-data-integration-informs-brain-ui",
      seedKind: "starter-health",
      edgeKind: "outputs_to",
      from: "seed:runtime:panel-data-integration",
      to: "seed:runtime:brain-graph",
      label: "informs brain UI",
      reason: "Panel integration informs the Brain command surface.",
    }),
    edge({
      id: "seed:edge:onboarding-task-references-recommendation",
      seedKind: "starter-recommendations",
      edgeKind: "references",
      from: "seed:workspace:first-onboarding-task",
      to: "seed:recommendations:starter-recommendation",
      label: "references starter recommendation",
      reason: "The first onboarding task points to the starter recommendation.",
    }),
    edge({
      id: "seed:edge:goal-contains-onboarding-task",
      seedKind: "starter-workspace",
      edgeKind: "contains",
      from: "seed:workspace:first-goal",
      to: "seed:workspace:first-onboarding-task",
      label: "contains onboarding task",
      reason: "The first goal contains the guided first-run task.",
    }),
    edge({
      id: "seed:edge:health-references-runtime",
      seedKind: "starter-health",
      edgeKind: "references",
      from: "seed:health:starter-health-signal",
      to: "seed:runtime:codexforge-runtime",
      label: "references runtime",
      reason: "The first health signal points at the runtime it describes.",
    }),
  ];
}
