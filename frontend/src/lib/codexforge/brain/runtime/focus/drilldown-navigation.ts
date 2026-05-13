import type {
  CodexForgeBrainDrilldownPath,
  CodexForgeBrainDrilldownStep,
  CodexForgeBrainFocusNeighborhood,
  CodexForgeBrainFocusSignal,
  CodexForgeBrainFocusSignalKind,
  CodexForgeBrainFocusTarget,
} from "./focus-types";

export function buildBrainDrilldownStep(input: {
  id: string;
  label: string;
  kind: CodexForgeBrainDrilldownStep["kind"];
  targetId: string;
  depth: number;
  summary: string;
  whyItMatters: string;
  relatedSurface: string;
  evidence?: readonly string[];
  readOnly?: boolean;
  approvalRequired?: boolean;
  nextSafeDrilldown?: string;
}): CodexForgeBrainDrilldownStep {
  return {
    id: input.id,
    label: input.label,
    kind: input.kind,
    targetId: input.targetId,
    depth: input.depth,
    summary: input.summary,
    whyItMatters: input.whyItMatters,
    relatedSurface: input.relatedSurface,
    evidence: [...(input.evidence ?? [])].sort(),
    readOnly: input.readOnly ?? true,
    approvalRequired: input.approvalRequired ?? false,
    nextSafeDrilldown: input.nextSafeDrilldown ?? "Inspect related evidence without executing actions.",
  };
}

export function buildBrainDrilldownPaths(input: {
  focusTarget: CodexForgeBrainFocusTarget;
  neighborhood: CodexForgeBrainFocusNeighborhood;
}): CodexForgeBrainDrilldownPath[] {
  const signals = input.neighborhood.signals;
  const pathSpecs: Array<{
    id: string;
    label: string;
    kinds: CodexForgeBrainFocusSignalKind[];
    surfaces: string[];
    summary: string;
    reasons: string[];
  }> = [
    {
      id: "memory-concept-source",
      label: "Memory to concept to source nodes",
      kinds: ["memory", "concept", "lineage"],
      surfaces: ["memory", "concept", "graph"],
      summary: "Trace promoted memory into synthesized concepts and canonical graph sources.",
      reasons: ["memory->concept", "source-node-drilldown"],
    },
    {
      id: "task-execution-diff-recovery",
      label: "Task to execution to diff to failure recovery",
      kinds: ["task", "execution", "replay", "lineage"],
      surfaces: ["task", "execution", "diff", "failure/recovery"],
      summary: "Follow task intent into execution evidence, diffs, failures, and recovery branch.",
      reasons: ["task->execution", "execution->diff", "failure-recovery"],
    },
    {
      id: "risk-recommendation-safe-action",
      label: "Risk to recommendation to next safe action",
      kinds: ["risk", "recommendation", "approval-boundary"],
      surfaces: ["risk", "recommendation", "approval boundary"],
      summary: "Connect risk pressure to advisory recommendations and safe read-only action.",
      reasons: ["risk->recommendation", "next-safe-action"],
    },
    {
      id: "file-architecture-related-tasks",
      label: "File to architecture hotspot to related tasks",
      kinds: ["file", "architecture", "task"],
      surfaces: ["file", "architecture hotspot", "tasks"],
      summary: "Review file hotspots through architecture context and related task intent.",
      reasons: ["file->architecture", "architecture->task"],
    },
    {
      id: "agent-handoff-review-risk",
      label: "Agent to handoff to review to risk",
      kinds: ["agent", "context", "risk"],
      surfaces: ["agent", "handoff", "review", "risk"],
      summary: "Inspect agent handoffs, review boundaries, and risk posture.",
      reasons: ["agent->handoff", "review->risk"],
    },
    {
      id: "subsystem-health-repair-recommendation",
      label: "Subsystem to health diagnostic to repair recommendation",
      kinds: ["health", "recommendation", "approval-boundary"],
      surfaces: ["subsystem", "health diagnostic", "repair recommendation"],
      summary: "Move from subsystem readiness to diagnostic evidence and advisory repair.",
      reasons: ["subsystem->health", "health->recommendation"],
    },
    {
      id: "heatmap-topology-related-memories",
      label: "Heatmap cell to topology cluster to related memories",
      kinds: ["topology", "concept", "memory"],
      surfaces: ["heatmap cell", "topology cluster", "related memories"],
      summary: "Use semantic heatmap pressure to open topology clusters and memory evidence.",
      reasons: ["heatmap->topology", "topology->memory"],
    },
  ];

  return pathSpecs
    .map((spec) => buildPath(spec, input.focusTarget, signals))
    .sort((a, b) => {
      const approvalDiff = Number(b.approvalRequired) - Number(a.approvalRequired);
      if (approvalDiff !== 0) return approvalDiff;
      return a.id.localeCompare(b.id);
    });
}

export function selectNextDrilldownSteps(
  paths: readonly CodexForgeBrainDrilldownPath[],
  limit = 6
): CodexForgeBrainDrilldownStep[] {
  return [...paths]
    .flatMap((path) => path.steps)
    .sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return a.id.localeCompare(b.id);
    })
    .slice(0, Math.max(0, limit));
}

export function summarizeBrainDrilldownPath(path: CodexForgeBrainDrilldownPath): string {
  const chain = path.steps.map((step) => step.label).join(" -> ");
  return `${path.label}: ${chain || path.summary}`;
}

function buildPath(
  spec: {
    id: string;
    label: string;
    kinds: CodexForgeBrainFocusSignalKind[];
    surfaces: string[];
    summary: string;
    reasons: string[];
  },
  target: CodexForgeBrainFocusTarget,
  signals: readonly CodexForgeBrainFocusSignal[]
): CodexForgeBrainDrilldownPath {
  const matching = spec.kinds
    .map((kind) => signals.find((signal) => signal.kind === kind))
    .filter((signal): signal is CodexForgeBrainFocusSignal => Boolean(signal));
  const fallbackSignals = matching.length > 0 ? matching : signals.slice(0, 1);
  const steps = spec.surfaces.map((surface, index) => {
    const signal = fallbackSignals[index % Math.max(1, fallbackSignals.length)];
    return buildBrainDrilldownStep({
      id: `${spec.id}:step:${index + 1}`,
      label: surface,
      kind: signal?.kind ?? target.kind,
      targetId: signal?.targetId ?? target.id,
      depth: index,
      summary: signal?.summary ?? target.summary,
      whyItMatters: signal?.reasons[0] ?? spec.summary,
      relatedSurface: surface,
      evidence: signal?.evidence ?? target.evidence,
      approvalRequired: signal?.approvalRequired ?? false,
      nextSafeDrilldown: signal?.nextSafeDrilldown ?? target.nextSafeDrilldown,
    });
  });

  return {
    id: spec.id,
    label: spec.label,
    summary: spec.summary,
    focusTargetId: target.id,
    steps,
    relatedSurfaces: spec.surfaces,
    reasons: spec.reasons,
    readOnly: true,
    approvalRequired: steps.some((step) => step.approvalRequired),
    nextSafeDrilldown: steps.find((step) => step.approvalRequired)?.nextSafeDrilldown ?? steps[0]?.nextSafeDrilldown ?? target.nextSafeDrilldown,
  };
}
