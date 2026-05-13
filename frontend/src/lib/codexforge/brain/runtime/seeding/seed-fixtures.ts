import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainGraph,
} from "@/lib/codexforge/brain/graph/types";
import { CODEXFORGE_BRAIN_SEED_FIXED_TS, buildCodexForgeBrainSeedGraph } from "./graph-seed-builder";
import { buildBrainFirstRunOnboardingPlan } from "./onboarding-plan";
import { evaluateBrainSeedQuality, validateBrainSeedDoesNotOverwrite } from "./seed-quality";

export const CODEXFORGE_BRAIN_SEED_FIXTURE_TS = 1767225600000;

export function buildBrainSeedFixtureEmptyGraph(): CodexForgeBrainGraph {
  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: [],
    edges: [],
    meta: {
      createdAt: CODEXFORGE_BRAIN_SEED_FIXTURE_TS,
      updatedAt: CODEXFORGE_BRAIN_SEED_FIXTURE_TS,
      workspaceId: "fixture-empty-brain",
    },
  };
}

export function buildBrainSeedFixtureSeedGraph(): CodexForgeBrainGraph {
  return buildCodexForgeBrainSeedGraph({
    now: CODEXFORGE_BRAIN_SEED_FIXED_TS,
    seedId: "fixture-starter-brain",
  });
}

export function buildBrainSeedFixtureExistingGraph(): CodexForgeBrainGraph {
  const graph = buildBrainSeedFixtureSeedGraph();
  return {
    ...graph,
    meta: {
      ...graph.meta,
      workspaceId: "fixture-existing-brain",
    },
  };
}

export function buildBrainSeedFixtureOnboardingPlan() {
  return buildBrainFirstRunOnboardingPlan({
    hasGraph: false,
    previewAvailable: true,
  });
}

export function buildBrainSeedFixtureQualityGates() {
  const emptyGraph = buildBrainSeedFixtureEmptyGraph();
  const existingGraph = buildBrainSeedFixtureExistingGraph();
  const passingPlan = evaluateBrainSeedQuality({
    now: CODEXFORGE_BRAIN_SEED_FIXTURE_TS,
    existingGraph: emptyGraph,
  });
  const blockedOverwriteGate = validateBrainSeedDoesNotOverwrite(existingGraph);

  return {
    passingSeedQualityGates: passingPlan.qualityGates,
    blockedOverwriteQualityGate: blockedOverwriteGate,
    explicitCreateAction: {
      id: "create-starter-graph" as const,
      label: "Create starter graph",
      status: "ready" as const,
      reason: "The action persists the deterministic preview only after a user click.",
      evidence: ["empty graph", "quality gates passed"],
      nextSafeAction: "Click only if you want to create the starter graph.",
      readOnly: false,
      destructive: false,
    },
    keepEmptyAction: {
      id: "keep-empty-graph" as const,
      label: "Keep empty graph",
      status: "ready" as const,
      reason: "The empty graph remains a valid state.",
      evidence: ["no graph data required"],
      nextSafeAction: "Continue inspecting fixture-backed panels.",
      readOnly: true,
      destructive: false,
    },
    onboardingChecklist: buildBrainSeedFixtureOnboardingPlan().steps,
  };
}
