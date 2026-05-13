import {
  BRAIN_NODE_KINDS,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNodeKind,
} from "@/lib/codexforge/brain/graph/types";
import {
  buildCodexForgeBrainSeedGraph,
  buildSeedEdgePlans,
  buildSeedNodePlans,
  summarizeCodexForgeBrainSeedGraph,
} from "./graph-seed-builder";
import type {
  CodexForgeBrainSeedBuildInput,
  CodexForgeBrainSeedGraphPlan,
  CodexForgeBrainSeedQualityGate,
  CodexForgeBrainSeedStatus,
} from "./seed-types";

const REQUIRED_LABELS = [
  "CodexForge runtime",
  "Cognitive memory",
  "Predictive context",
  "Files runtime",
  "Agent runtime",
  "Tool policy",
  "Approval boundary",
  "Starter health signal",
  "Live snapshot boundary",
  "Panel data integration",
  "Starter recommendation",
] as const;

function buildGateInput(
  id: string,
  label: string,
  passed: boolean,
  reason: string,
  evidence: string[],
  nextSafeAction: string
): CodexForgeBrainSeedQualityGate {
  return buildBrainSeedQualityGate({
    id,
    label,
    passed,
    reason,
    evidence,
    nextSafeAction,
  });
}

export function buildBrainSeedQualityGate(input: {
  id: string;
  label: string;
  passed: boolean;
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  status?: CodexForgeBrainSeedStatus;
}): CodexForgeBrainSeedQualityGate {
  return {
    id: input.id,
    label: input.label,
    status: input.status ?? (input.passed ? "ready" : "blocked"),
    passed: input.passed,
    reason: input.reason,
    evidence: [...input.evidence],
    nextSafeAction: input.nextSafeAction,
    readOnly: true,
    destructive: false,
  };
}

export function validateBrainSeedDoesNotOverwrite(
  existingGraph?: CodexForgeBrainGraph | null
): CodexForgeBrainSeedQualityGate {
  const nodeCount = existingGraph?.nodes.length ?? 0;
  const edgeCount = existingGraph?.edges.length ?? 0;
  const empty = nodeCount === 0 && edgeCount === 0;

  return buildGateInput(
    "seed-no-overwrite",
    "No overwrite guarantee",
    empty,
    empty
      ? "The current graph is empty, so starter creation can proceed after explicit confirmation."
      : "Starter graph creation is blocked because the current graph already has data.",
    [`current nodes: ${nodeCount}`, `current edges: ${edgeCount}`],
    empty
      ? "Use the explicit Create starter graph action if you want this preview."
      : "Keep the existing graph and inspect it instead of replacing it."
  );
}

export function validateBrainSeedGraphShape(
  graph: CodexForgeBrainGraph
): CodexForgeBrainSeedQualityGate[] {
  const nodeIds = graph.nodes.map((node) => node.id);
  const edgeIds = graph.edges.map((edge) => edge.id);
  const uniqueNodeIds = new Set(nodeIds);
  const uniqueEdgeIds = new Set(edgeIds);
  const canonicalKinds = new Set<CodexForgeBrainNodeKind>(BRAIN_NODE_KINDS);
  const nonCanonicalKinds = graph.nodes
    .map((node) => node.kind)
    .filter((kind) => !canonicalKinds.has(kind));
  const missingEndpointEdges = graph.edges.filter(
    (edge) => !uniqueNodeIds.has(edge.from) || !uniqueNodeIds.has(edge.to)
  );
  const serialized = JSON.stringify(graph);
  const legacySchemaAbsent =
    !serialized.includes("CodexForgeGraphNode") &&
    !serialized.includes("CodexForgeGraphEdge") &&
    !serialized.includes("brain-graph.ts");

  const labels = new Set(
    graph.nodes.map((node) =>
      typeof node.data.label === "string" ? node.data.label : ""
    )
  );

  const requiredConceptGates = REQUIRED_LABELS.map((label) =>
    buildGateInput(
      `seed-required-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      `Required concept: ${label}`,
      labels.has(label),
      labels.has(label)
        ? `${label} is present in the starter graph.`
        : `${label} is missing from the starter graph.`,
      labels.has(label) ? [`found label: ${label}`] : [`missing label: ${label}`],
      labels.has(label)
        ? "Review the concept in the seed preview."
        : "Update the seed builder before allowing creation."
    )
  );

  return [
    buildGateInput(
      "seed-has-nodes",
      "Graph has nodes",
      graph.nodes.length > 0,
      graph.nodes.length > 0
        ? "The starter graph contains nodes."
        : "The starter graph has no nodes.",
      [`nodes: ${graph.nodes.length}`],
      "Keep at least one node in the deterministic starter graph."
    ),
    buildGateInput(
      "seed-has-edges",
      "Graph has edges",
      graph.edges.length > 0,
      graph.edges.length > 0
        ? "The starter graph contains edges."
        : "The starter graph has no edges.",
      [`edges: ${graph.edges.length}`],
      "Keep meaningful edges in the deterministic starter graph."
    ),
    buildGateInput(
      "seed-unique-node-ids",
      "Unique node ids",
      uniqueNodeIds.size === nodeIds.length,
      uniqueNodeIds.size === nodeIds.length
        ? "Every seed node id is unique."
        : "Duplicate seed node ids were found.",
      [`unique node ids: ${uniqueNodeIds.size}`, `node ids: ${nodeIds.length}`],
      "Use deterministic unique ids for all seed nodes."
    ),
    buildGateInput(
      "seed-unique-edge-ids",
      "Unique edge ids",
      uniqueEdgeIds.size === edgeIds.length,
      uniqueEdgeIds.size === edgeIds.length
        ? "Every seed edge id is unique."
        : "Duplicate seed edge ids were found.",
      [`unique edge ids: ${uniqueEdgeIds.size}`, `edge ids: ${edgeIds.length}`],
      "Use deterministic unique ids for all seed edges."
    ),
    buildGateInput(
      "seed-edge-endpoints-exist",
      "Edge endpoints exist",
      missingEndpointEdges.length === 0,
      missingEndpointEdges.length === 0
        ? "Every seed edge points at existing nodes."
        : "One or more seed edges point at missing nodes.",
      missingEndpointEdges.length === 0
        ? [`checked edges: ${graph.edges.length}`]
        : missingEndpointEdges.map((edge) => `${edge.id}: ${edge.from} -> ${edge.to}`),
      "Fix missing edge endpoints before enabling creation."
    ),
    buildGateInput(
      "seed-canonical-node-kinds",
      "Canonical node kinds",
      nonCanonicalKinds.length === 0,
      nonCanonicalKinds.length === 0
        ? "All seed nodes use canonical graph node kinds."
        : "One or more seed nodes use unsupported node kinds.",
      nonCanonicalKinds.length === 0
        ? [`checked nodes: ${graph.nodes.length}`]
        : nonCanonicalKinds,
      "Map starter concepts onto existing graph node kinds."
    ),
    buildGateInput(
      "seed-no-legacy-schema-labels",
      "No legacy schema labels",
      legacySchemaAbsent,
      legacySchemaAbsent
        ? "The seed graph does not contain legacy schema labels."
        : "The seed graph contains legacy schema labels.",
      ["checked serialized seed graph"],
      "Use only the canonical graph schema."
    ),
    ...requiredConceptGates,
  ];
}

export function evaluateBrainSeedQuality(
  input: CodexForgeBrainSeedBuildInput = {}
): CodexForgeBrainSeedGraphPlan {
  const graph = buildCodexForgeBrainSeedGraph(input);
  const nodePlans = buildSeedNodePlans(input.now);
  const edgePlans = buildSeedEdgePlans(input.now);
  const qualityGates = [
    ...validateBrainSeedGraphShape(graph),
    validateBrainSeedDoesNotOverwrite(input.existingGraph),
  ];
  const blocked = qualityGates.some((gate) => !gate.passed);
  const summary = summarizeCodexForgeBrainSeedGraph(graph, nodePlans, edgePlans);

  return {
    id: input.seedId ?? "codexforge-brain-seed-plan:phase-6l",
    status: blocked ? "blocked" : "ready",
    graph,
    nodePlans,
    edgePlans,
    summary,
    qualityGates,
    reason: blocked
      ? "The starter graph preview is blocked by one or more quality gates."
      : "The starter graph preview is valid and can be created explicitly.",
    evidence: qualityGates.map((gate) => `${gate.label}: ${gate.status}`),
    nextSafeAction: blocked
      ? "Resolve blocked gates or keep the current graph unchanged."
      : "Create the starter graph only from the explicit first-run action.",
    sourceLabel: "Deterministic starter preview",
    readOnly: true,
    destructive: false,
    mayOverwriteExistingGraph: false,
  };
}
