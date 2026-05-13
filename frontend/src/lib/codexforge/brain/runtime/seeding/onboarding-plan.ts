import type {
  CodexForgeBrainOnboardingPlan,
  CodexForgeBrainOnboardingStep,
  CodexForgeBrainSeedStatus,
} from "./seed-types";

type OnboardingState = {
  hasGraph?: boolean;
  previewAvailable?: boolean;
  seedCreated?: boolean;
  keptEmpty?: boolean;
  workspaceOpened?: boolean;
  firstMessageSent?: boolean;
  memoryReviewed?: boolean;
  healthReviewed?: boolean;
  recommendationsReviewed?: boolean;
  approvalBoundaryReviewed?: boolean;
  commandPaletteUsed?: boolean;
};

function statusFrom(done?: boolean, blocked?: boolean): CodexForgeBrainSeedStatus {
  if (done) return "created";
  if (blocked) return "blocked";
  return "ready";
}

export function buildBrainOnboardingStep(
  input: Omit<CodexForgeBrainOnboardingStep, "readOnly" | "destructive">
): CodexForgeBrainOnboardingStep {
  return {
    ...input,
    readOnly: input.id !== "create-starter-graph",
    destructive: false,
  };
}

export function selectNextOnboardingStep(
  steps: CodexForgeBrainOnboardingStep[]
): CodexForgeBrainOnboardingStep | null {
  return steps.find((step) => step.status === "ready") ?? null;
}

export function summarizeBrainOnboardingPlan(
  plan: CodexForgeBrainOnboardingPlan
) {
  const ready = plan.steps.filter((step) => step.status === "ready").length;
  const created = plan.steps.filter((step) => step.status === "created").length;
  const blocked = plan.steps.filter((step) => step.status === "blocked").length;

  return {
    total: plan.steps.length,
    ready,
    created,
    blocked,
    nextSafeAction: plan.nextSafeAction,
    readOnly: true as const,
    destructive: false as const,
  };
}

export function buildBrainFirstRunOnboardingPlan(
  state: OnboardingState = {}
): CodexForgeBrainOnboardingPlan {
  const graphReady = state.hasGraph || state.seedCreated;
  const keptEmpty = state.keptEmpty === true;
  const createBlocked = graphReady || keptEmpty;
  const steps: CodexForgeBrainOnboardingStep[] = [
    buildBrainOnboardingStep({
      id: "inspect-graph",
      title: "Inspect graph",
      status: statusFrom(graphReady || keptEmpty),
      reason: graphReady
        ? "A graph is available for inspection."
        : "The graph is empty and ready for first-run review.",
      evidence: [graphReady ? "graph has data" : "graph is empty"],
      nextSafeAction: "Review the empty state and starter preview.",
    }),
    buildBrainOnboardingStep({
      id: "preview-starter-graph",
      title: "Preview starter graph",
      status: statusFrom(state.previewAvailable ?? true),
      reason: "The starter graph is deterministic and read-only until you create it.",
      evidence: ["preview nodes", "preview edges", "quality gates"],
      nextSafeAction: "Review the seed summary and quality diagnostics.",
    }),
    buildBrainOnboardingStep({
      id: "create-starter-graph",
      title: "Create starter graph",
      status: state.seedCreated ? "created" : createBlocked ? "blocked" : "ready",
      reason: createBlocked
        ? "Creation is available only while the current graph is empty."
        : "Creation requires an explicit user action.",
      evidence: [graphReady ? "existing graph detected" : "empty graph detected"],
      nextSafeAction: createBlocked
        ? "Keep the current graph unchanged."
        : "Use Create starter graph if you want the preview persisted.",
    }),
    buildBrainOnboardingStep({
      id: "open-workspace",
      title: "Open workspace",
      status: statusFrom(state.workspaceOpened, !graphReady),
      reason: "Workspace activity can connect the starter graph to real project context.",
      evidence: [graphReady ? "graph available" : "waiting for graph"],
      nextSafeAction: "Open the workspace after the starter graph exists.",
    }),
    buildBrainOnboardingStep({
      id: "send-first-message",
      title: "Send first message",
      status: statusFrom(state.firstMessageSent, !graphReady),
      reason: "The first message gives the runtime real context to sync into Brain.",
      evidence: [graphReady ? "ready for chat context" : "waiting for graph"],
      nextSafeAction: "Send a project-specific message from the workspace.",
    }),
    buildBrainOnboardingStep({
      id: "review-memory-clusters",
      title: "Review memory clusters",
      status: statusFrom(state.memoryReviewed, !graphReady),
      reason: "Memory clusters become useful after graph creation and workspace context.",
      evidence: [graphReady ? "memory surface available" : "waiting for graph"],
      nextSafeAction: "Inspect the memory panel in the command center.",
    }),
    buildBrainOnboardingStep({
      id: "inspect-runtime-health",
      title: "Inspect runtime health",
      status: statusFrom(state.healthReviewed, !graphReady),
      reason: "Runtime health shows whether graph, panels, and snapshot data are coherent.",
      evidence: [graphReady ? "health surface available" : "waiting for graph"],
      nextSafeAction: "Open runtime health in the command center.",
    }),
    buildBrainOnboardingStep({
      id: "explore-recommendations",
      title: "Explore recommendations",
      status: statusFrom(state.recommendationsReviewed, !graphReady),
      reason: "Recommendations point to safe next attention without executing actions.",
      evidence: [graphReady ? "recommendation surface available" : "waiting for graph"],
      nextSafeAction: "Open recommendations and inspect next attention.",
    }),
    buildBrainOnboardingStep({
      id: "review-approval-boundary",
      title: "Review approval boundary",
      status: statusFrom(state.approvalBoundaryReviewed, !graphReady),
      reason: "Approval boundaries explain which actions require explicit control.",
      evidence: [graphReady ? "safety concepts available" : "waiting for graph"],
      nextSafeAction: "Inspect safety and approval boundary nodes.",
    }),
    buildBrainOnboardingStep({
      id: "use-command-palette",
      title: "Use command palette",
      status: statusFrom(state.commandPaletteUsed, !graphReady),
      reason: "The command palette is a read-only navigation layer for Brain panels.",
      evidence: [graphReady ? "command center available" : "waiting for graph"],
      nextSafeAction: "Use Ctrl+K or Cmd+K once a graph exists.",
    }),
  ];

  const nextStep = selectNextOnboardingStep(steps);

  return {
    id: "codexforge-brain-first-run-onboarding:phase-6l",
    status: graphReady ? "created" : keptEmpty ? "skipped" : "preview",
    steps,
    nextStep,
    reason: "First-run onboarding keeps the empty Brain useful without changing graph data until requested.",
    evidence: [
      graphReady ? "graph available" : "empty graph",
      keptEmpty ? "operator kept graph empty" : "starter preview available",
    ],
    nextSafeAction: nextStep?.nextSafeAction ?? "Continue with the existing graph.",
    readOnly: true,
    destructive: false,
  };
}
