import type {
  CodexForgeRuntimeHealthBuildInput,
  CodexForgeRuntimeHealthSeverity,
  CodexForgeRuntimeNextSafeAction,
  CodexForgeRuntimeSubsystemKind,
  CodexForgeRuntimeSubsystemReadiness,
  CodexForgeRuntimeSubsystemStatus,
} from "./health-types";

const SUBSYSTEMS: readonly {
  id: CodexForgeRuntimeSubsystemKind;
  label: string;
  source: string;
  next: string;
}[] = [
  { id: "graph-runtime", label: "Graph runtime", source: "runtime contract", next: "Inspect canonical graph contract and reducer boundaries." },
  { id: "event-store", label: "Event store", source: "runtime contract", next: "Review event descriptors before appending new runtime events." },
  { id: "graph-reducer", label: "Graph reducer", source: "runtime contract", next: "Verify reducer inputs remain typed and deterministic." },
  { id: "context-assembler", label: "Context assembler", source: "runtime contract", next: "Inspect assembled context before routing it into work." },
  { id: "cognitive-memory", label: "Cognitive memory", source: "memory readiness", next: "Review ranked memory evidence and contradiction candidates." },
  { id: "predictive-context", label: "Predictive context", source: "context readiness", next: "Inspect predictive signals and stale context warnings." },
  { id: "files-runtime", label: "Files runtime", source: "smoke coverage", next: "Confirm Files runtime smoke coverage before wiring write flows." },
  { id: "agent-runtime", label: "Agent runtime", source: "agent readiness", next: "Inspect agent plans, handoffs, and approval gates." },
  { id: "replay-lineage", label: "Replay and lineage", source: "replay summary", next: "Open replay frames and lineage lanes for the affected subsystem." },
  { id: "semantic-topology", label: "Semantic topology", source: "topology summary", next: "Review topology hotspots and stale or contradictory areas." },
  { id: "recommendations", label: "Recommendations", source: "recommendation summary", next: "Inspect read-only recommendation evidence before action." },
  { id: "health-dashboard", label: "Health dashboard", source: "health dashboard", next: "Use this read-only dashboard to choose the next safe inspection." },
  { id: "brain-ui", label: "Brain UI", source: "command center", next: "Keep graph inspector and existing panels preserved while inspecting status." },
  { id: "tool-policy", label: "Tool policy", source: "safety posture", next: "Review tool-policy boundaries before command or external actions." },
  { id: "approval-boundary", label: "Approval boundary", source: "safety posture", next: "Keep mutation and command actions behind explicit approval." },
];

const STATUS_WEIGHT: Record<CodexForgeRuntimeSubsystemStatus, number> = {
  blocked: 5,
  degraded: 4,
  partial: 3,
  unknown: 2,
  ready: 1,
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function severityForStatus(
  status: CodexForgeRuntimeSubsystemStatus
): CodexForgeRuntimeHealthSeverity {
  switch (status) {
    case "blocked":
      return "critical";
    case "degraded":
      return "high";
    case "partial":
      return "medium";
    case "unknown":
      return "low";
    default:
      return "info";
  }
}

function action(id: string, label: string): CodexForgeRuntimeNextSafeAction {
  return {
    id: `${id}:inspect`,
    label: "Inspect evidence",
    detail: label,
    readOnly: true,
    approvalRequired: false,
  };
}

function baseReadiness(
  id: CodexForgeRuntimeSubsystemKind,
  input: CodexForgeRuntimeHealthBuildInput
): Pick<CodexForgeRuntimeSubsystemReadiness, "status" | "readinessScore" | "reasons" | "evidence"> {
  const contractApis = input.runtimeContract?.requiredApis ?? [];
  const health = input.runtimeHealth;

  switch (id) {
    case "graph-runtime":
      return {
        status: health?.canonicalSchemaPath ? "ready" : "partial",
        readinessScore: health?.canonicalSchemaPath ? 1 : 0.68,
        reasons: ["Canonical graph runtime contract is the source of truth."],
        evidence: [health?.canonicalSchemaPath ?? "canonical schema evidence unavailable"],
      };
    case "event-store":
      return {
        status: contractApis.includes("appendEvent") ? "ready" : "blocked",
        readinessScore: contractApis.includes("appendEvent") ? 1 : 0,
        reasons: ["Event append API controls runtime mutation boundaries."],
        evidence: [`appendEvent:${contractApis.includes("appendEvent") ? "present" : "missing"}`],
      };
    case "graph-reducer":
      return {
        status: contractApis.includes("reduceGraph") ? "ready" : "blocked",
        readinessScore: contractApis.includes("reduceGraph") ? 1 : 0,
        reasons: ["Reducer availability protects canonical graph state."],
        evidence: [`reduceGraph:${contractApis.includes("reduceGraph") ? "present" : "missing"}`],
      };
    case "context-assembler":
      return {
        status: contractApis.includes("assembleContext") ? "ready" : "partial",
        readinessScore: contractApis.includes("assembleContext") ? 0.96 : 0.55,
        reasons: ["Context assembler is required before predictive or agent routing."],
        evidence: [`assembleContext:${contractApis.includes("assembleContext") ? "present" : "missing"}`],
      };
    case "cognitive-memory":
      return {
        status: input.memoryReadiness?.status ?? (health?.cognitiveMemoryReady ? "ready" : "partial"),
        readinessScore: clamp01(input.memoryReadiness?.score ?? (health?.cognitiveMemoryReady ? 0.92 : 0.62)),
        reasons: ["Cognitive memory readiness depends on deterministic ranking, dedupe, and clusters."],
        evidence: input.memoryReadiness?.evidence ?? [`clusters:${input.memoryReadiness?.clusters?.length ?? 0}`],
      };
    case "predictive-context":
      return {
        status: input.contextReadiness?.status ?? (input.contextReadiness?.predictiveContext ? "ready" : "partial"),
        readinessScore: clamp01(input.contextReadiness?.score ?? (input.contextReadiness?.predictiveContext ? 0.9 : 0.6)),
        reasons: ["Predictive context needs ranked files, risks, concepts, task focus, and architecture context."],
        evidence: input.contextReadiness?.evidence ?? ["predictive context summary available when supplied"],
      };
    case "agent-runtime":
      return {
        status: input.agentRuntimeReadiness?.status ?? (input.agentRuntimeReadiness?.state ? "ready" : "partial"),
        readinessScore: clamp01(input.agentRuntimeReadiness?.score ?? (input.agentRuntimeReadiness?.state ? 0.88 : 0.58)),
        reasons: ["Agent runtime readiness is bounded by plans, handoffs, reviews, and approval status."],
        evidence: input.agentRuntimeReadiness?.evidence ?? [`agents:${input.agentRuntimeReadiness?.state?.registry.length ?? 0}`],
      };
    case "replay-lineage":
      return {
        status: input.replaySummary?.status === "ready" ? "ready" : "partial",
        readinessScore: input.replaySummary?.status === "ready" ? 0.9 : 0.58,
        reasons: ["Replay and lineage health depends on available deterministic frames and lanes."],
        evidence: [`frames:${input.replaySummary?.frameCount ?? 0}`, `lanes:${input.replaySummary?.laneCount ?? 0}`],
      };
    case "semantic-topology":
      return {
        status: input.topologySummary?.status === "ready" ? "ready" : input.topologySummary?.status === "fixture" ? "partial" : "unknown",
        readinessScore: input.topologySummary?.status === "ready" ? 0.9 : input.topologySummary?.status === "fixture" ? 0.7 : 0.42,
        reasons: ["Topology readiness tracks hotspots, clusters, and stale or contradictory areas."],
        evidence: [`hotspots:${input.topologySummary?.hotspotCount ?? 0}`],
      };
    case "recommendations":
      return {
        status: (input.recommendationSummary?.total ?? input.recommendations?.length ?? 0) > 0 ? "ready" : "partial",
        readinessScore: (input.recommendationSummary?.total ?? input.recommendations?.length ?? 0) > 0 ? 0.88 : 0.55,
        reasons: ["Recommendations are read-only and evidence-backed."],
        evidence: [`recommendations:${input.recommendationSummary?.total ?? input.recommendations?.length ?? 0}`],
      };
    case "approval-boundary":
      return {
        status: "ready",
        readinessScore: 0.86,
        reasons: ["Approval boundary is explicit for mutation, command, render, and external actions."],
        evidence: ["approval-required actions remain advisory"],
      };
    default:
      return {
        status: "ready",
        readinessScore: 0.82,
        reasons: ["Subsystem has deterministic read-only status coverage."],
        evidence: ["dashboard fixture or descriptor coverage available"],
      };
  }
}

export function scoreSubsystemReadiness(
  subsystem: Pick<CodexForgeRuntimeSubsystemReadiness, "readinessScore" | "status">
): number {
  if (subsystem.status === "blocked") return 0;
  return clamp01(subsystem.readinessScore);
}

export function sortSubsystemReadiness(
  subsystems: readonly CodexForgeRuntimeSubsystemReadiness[]
): CodexForgeRuntimeSubsystemReadiness[] {
  return [...subsystems].sort((a, b) => {
    const statusDelta = STATUS_WEIGHT[b.status] - STATUS_WEIGHT[a.status];
    if (statusDelta !== 0) return statusDelta;
    const scoreDelta = scoreSubsystemReadiness(a) - scoreSubsystemReadiness(b);
    if (scoreDelta !== 0) return scoreDelta;
    return a.id.localeCompare(b.id);
  });
}

export function buildSubsystemReadiness(
  input: CodexForgeRuntimeHealthBuildInput = {}
): CodexForgeRuntimeSubsystemReadiness[] {
  const overrides = new Map(
    (input.subsystemOverrides ?? [])
      .filter((item): item is Partial<CodexForgeRuntimeSubsystemReadiness> & { id: CodexForgeRuntimeSubsystemKind } => Boolean(item.id))
      .map((item) => [item.id, item])
  );

  const subsystems = SUBSYSTEMS.map((definition) => {
    const base = baseReadiness(definition.id, input);
    const override = overrides.get(definition.id);
    const status = override?.status ?? base.status;
    const readinessScore = scoreSubsystemReadiness({
      status,
      readinessScore: override?.readinessScore ?? base.readinessScore,
    });

    return {
      id: definition.id,
      label: override?.label ?? definition.label,
      status,
      readinessScore,
      severity: override?.severity ?? severityForStatus(status),
      reasons: override?.reasons ?? base.reasons,
      evidence: override?.evidence ?? base.evidence,
      source: override?.source ?? definition.source,
      nextSafeAction: override?.nextSafeAction ?? action(definition.id, definition.next),
      stale: override?.stale ?? false,
    };
  });

  return sortSubsystemReadiness(subsystems);
}

export function summarizeSubsystemReadiness(
  subsystems: readonly CodexForgeRuntimeSubsystemReadiness[]
): string {
  const ready = subsystems.filter((item) => item.status === "ready").length;
  const blocked = subsystems.filter((item) => item.status === "blocked").length;
  const degraded = subsystems.filter((item) => item.status === "degraded").length;
  const partial = subsystems.filter((item) => item.status === "partial").length;
  return `Subsystem readiness: ${ready} ready, ${partial} partial, ${degraded} degraded, ${blocked} blocked.`;
}
