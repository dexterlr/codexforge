import type {
  OperatorHomeHealthDimension,
  OperatorHomeHealthDimensionId,
  OperatorHomeHealthLevel,
  OperatorHomeHealthReport,
  OperatorHomeRoutePath,
  OperatorHomeStatusInput,
} from "./operator-home-types";

function routeOrFallback(
  input: OperatorHomeStatusInput,
  preferred: OperatorHomeRoutePath,
  fallback: OperatorHomeRoutePath
): OperatorHomeRoutePath {
  return input.routeAvailability?.[preferred] ? preferred : fallback;
}

function overallLevelFromDimensions(
  dimensions: readonly OperatorHomeHealthDimension[]
): OperatorHomeHealthLevel {
  if (dimensions.some((dimension) => dimension.level === "blocked")) return "blocked";
  if (dimensions.some((dimension) => dimension.level === "warning")) return "warning";
  if (dimensions.some((dimension) => dimension.level === "needs-review")) return "needs-review";
  if (dimensions.some((dimension) => dimension.level === "unknown")) return "unknown";
  return "ready";
}

export function buildOperatorHomeHealthDimension(args: {
  id: OperatorHomeHealthDimensionId;
  label: string;
  level: OperatorHomeHealthLevel;
  detail: string;
  nextAction: string;
  route: OperatorHomeRoutePath;
}): OperatorHomeHealthDimension {
  return { ...args };
}

export function buildOperatorHomeHealth(
  input: OperatorHomeStatusInput = {}
): OperatorHomeHealthReport {
  const latestMessageAuthorityLevel =
    input.latestMessageAuthorityPreserved === false ? "blocked" : "ready";

  const dimensions: OperatorHomeHealthDimension[] = [
    buildOperatorHomeHealthDimension({
      id: "brain-runtime",
      label: "Brain runtime",
      level: "ready",
      detail: "Brain runtime and recall surfaces are available for read-only inspection.",
      nextAction: "Open Brain for graph context without mutation.",
      route: "/brain",
    }),
    buildOperatorHomeHealthDimension({
      id: "jarvis-workspace",
      label: "Jarvis workspace",
      level: "ready",
      detail: "Jarvis is the canonical server-owned conversation, planning, and handoff surface.",
      nextAction: "Open Jarvis for reviewed conversation and task handoffs.",
      route: "/jarvis",
    }),
    buildOperatorHomeHealthDimension({
      id: "files-workflow",
      label: "Files workflow",
      level: input.fileWorkflowNeedsAttention ? "warning" : "needs-review",
      detail: "Files Command Center is preview-first and does not write source from Home.",
      nextAction: "Review file workflow before edits.",
      route: "/files",
    }),
    buildOperatorHomeHealthDimension({
      id: "tasks-workflow",
      label: "Tasks workflow",
      level: input.routeAvailability?.["/tasks"] === false ? "unknown" : "needs-review",
      detail: "Task Autopilot and execution readiness stay review-gated.",
      nextAction: "Review task suggestions and step readiness.",
      route: routeOrFallback(input, "/tasks", "/jarvis"),
    }),
    buildOperatorHomeHealthDimension({
      id: "memory-workflow",
      label: "Memory workflow",
      level: input.memoryReviewNeeded || input.brainReviewNeeded ? "needs-review" : "ready",
      detail: "Memory review and Brain merge remain explicit review paths; Home never mutates the graph.",
      nextAction: "Review memory candidates or Brain context.",
      route: routeOrFallback(input, "/memory", "/brain"),
    }),
    buildOperatorHomeHealthDimension({
      id: "creative-studio",
      label: "Creative studio",
      level: input.creativeWorkflowActive ? "needs-review" : "ready",
      detail: "Creative Production Studio is available for preview-only planning and artifact handoff.",
      nextAction: "Review active creative work if present.",
      route: routeOrFallback(input, "/creative", "/jarvis"),
    }),
    buildOperatorHomeHealthDimension({
      id: "capabilities",
      label: "Capabilities",
      level: input.routeAvailability?.["/capabilities"] === false ? "unknown" : "needs-review",
      detail: "Capability Cockpit exposes tool readiness and policy boundaries.",
      nextAction: "Review capability policy before guarded handoff.",
      route: routeOrFallback(input, "/capabilities", "/jarvis"),
    }),
    buildOperatorHomeHealthDimension({
      id: "stabilization",
      label: "Stabilization",
      level: input.stabilizationHasBlockers ? "blocked" : "needs-review",
      detail: "Stabilization Command Center is the first stop for blockers, warnings, and regression posture.",
      nextAction: "Review Stabilization before more feature work.",
      route: "/stabilization",
    }),
    buildOperatorHomeHealthDimension({
      id: "patch-apply-safety",
      label: "Patch/apply safety",
      level: "needs-review",
      detail:
        "Patch preview, apply gate, dry run, and execution gate remain review-only from Home.",
      nextAction: "Use Safe Patch Preview and apply gates; do not apply from Home.",
      route: "/jarvis",
    }),
    buildOperatorHomeHealthDimension({
      id: "verification-readiness",
      label: "Verification readiness",
      level: input.verificationOutputNeedsIngestion ? "warning" : "needs-review",
      detail: "Verification output is evidence to ingest and review; Home never runs tests.",
      nextAction: "Open Jarvis to ingest verification output.",
      route: "/jarvis",
    }),
    buildOperatorHomeHealthDimension({
      id: "latest-message-authority",
      label: "Latest-message authority",
      level: latestMessageAuthorityLevel,
      detail: "Handoff prompts must preserve latest-message authority before downstream planning.",
      nextAction:
        latestMessageAuthorityLevel === "ready"
          ? "Keep latest-message authority visible."
          : "Stop and restore latest-message authority.",
      route: "/jarvis",
    }),
    buildOperatorHomeHealthDimension({
      id: "local-first-safety",
      label: "Local-first safety",
      level: "ready",
      detail:
        "Operator Home is deterministic, local-first, operator-safe, link-driven, and has no network calls.",
      nextAction: "Use links and copy-only handoffs.",
      route: "/",
    }),
  ];

  const readyCount = dimensions.filter((dimension) => dimension.level === "ready").length;
  const warningCount = dimensions.filter((dimension) => dimension.level === "warning").length;
  const blockedCount = dimensions.filter((dimension) => dimension.level === "blocked").length;
  const overallLevel = overallLevelFromDimensions(dimensions);

  return {
    id: "operator-home-health",
    overallLevel,
    dimensions,
    readyCount,
    warningCount,
    blockedCount,
    summary: summarizeOperatorHomeHealth({
      overallLevel,
      dimensions,
      readyCount,
      warningCount,
      blockedCount,
    }),
  };
}

export function summarizeOperatorHomeHealth(
  report: Pick<
    OperatorHomeHealthReport,
    "overallLevel" | "dimensions" | "readyCount" | "warningCount" | "blockedCount"
  >
): string[] {
  return [
    `Operator Home health is ${report.overallLevel}.`,
    `${report.dimensions.length} health dimensions include Brain runtime, Stabilization, Patch/apply safety, Latest-message authority, and Local-first safety.`,
    `${report.readyCount} ready, ${report.warningCount} warning, and ${report.blockedCount} blocked dimension(s).`,
  ];
}
