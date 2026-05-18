import type {
  BrainMutationBoundaryType,
  DirectMutationDetectorInput,
  DirectMutationDetectorReport,
  DirectMutationSignal,
  DirectMutationSignalSeverity,
} from "./brain-mutation-governance-types";
import {
  buildBrainMutationGovernanceStableKey,
  uniqueBrainMutationGovernanceStrings,
} from "./brain-mutation-governance-types";

type DirectMutationPattern = {
  id: string;
  title: string;
  severity: DirectMutationSignalSeverity;
  reason: string;
  recommendedSafeBoundary: BrainMutationBoundaryType;
  matches: (label: string) => boolean;
};

const PATTERNS: readonly DirectMutationPattern[] = [
  {
    id: "append-event-ui",
    title: "appendEvent in UI component label",
    severity: "blocker",
    reason: "Direct appendEvent from UI is blocked; appendEvent is executor-domain-only.",
    recommendedSafeBoundary: "runtime-event-executor",
    matches: (label) => label.includes("appendevent") && (label.includes("ui") || label.includes("component")),
  },
  {
    id: "graph-nodes-push",
    title: "graph.nodes.push or graph.edges.push hint",
    severity: "blocker",
    reason: "Direct graph array mutation bypasses reducer preview and audit journal.",
    recommendedSafeBoundary: "graph-reducer-preview",
    matches: (label) => label.includes("graph.nodes.push") || label.includes("graph.edges.push"),
  },
  {
    id: "save-brain-graph-ui",
    title: "saveBrainGraph from UI without gate",
    severity: "blocker",
    reason: "saveBrainGraph from UI without gate is blocked by mutation governance.",
    recommendedSafeBoundary: "approved-brain-merge",
    matches: (label) => label.includes("savebraingraph") && label.includes("ui") && !label.includes("gate"),
  },
  {
    id: "local-storage-graph-write",
    title: "localStorage graph write from UI",
    severity: "blocker",
    reason: "Local graph write from UI bypasses approval, reducer preview, and audit journal.",
    recommendedSafeBoundary: "approved-brain-merge",
    matches: (label) => label.includes("localstorage") && label.includes("graph") && (label.includes("write") || label.includes("setitem") || label.includes("ui")),
  },
  {
    id: "brain-graph-import",
    title: "brain-graph import",
    severity: "blocker",
    reason: "Legacy brain-graph import is blocked; canonical graph schema path is required.",
    recommendedSafeBoundary: "direct-ui-mutation-block",
    matches: (label) => label.includes("brain-graph"),
  },
  {
    id: "memory-promotion-without-gate",
    title: "memory promotion without gate",
    severity: "blocker",
    reason: "memory.promoted requires Memory Promotion Gate plus Runtime Event Executor.",
    recommendedSafeBoundary: "memory-promotion-gate",
    matches: (label) => (label.includes("memory.promoted") || label.includes("memory promotion")) && !label.includes("gate"),
  },
  {
    id: "reducer-without-preview",
    title: "reducer call without preview boundary",
    severity: "risk",
    reason: "Reducer calls require preview boundary visibility before mutation readiness.",
    recommendedSafeBoundary: "graph-reducer-preview",
    matches: (label) => (label.includes("reducegraph") || label.includes("graph-reducer")) && !label.includes("preview"),
  },
  {
    id: "execution-tool-in-ui",
    title: "apply-diff/write-file/run-command in governance or Brain UI",
    severity: "blocker",
    reason: "Execution-capable labels in governance or Brain UI must stay blocked-policy text only.",
    recommendedSafeBoundary: "direct-ui-mutation-block",
    matches: (label) =>
      (label.includes("apply-diff") || label.includes("write-file") || label.includes("run-command")) &&
      (label.includes("governance") || label.includes("brain ui") || label.includes("/brain")),
  },
];

export function buildDirectMutationSignal(input: {
  id?: string;
  title: string;
  severity: DirectMutationSignalSeverity;
  source: string;
  reason: string;
  blocked?: boolean;
  recommendedSafeBoundary: BrainMutationBoundaryType;
}): DirectMutationSignal {
  return {
    id: input.id ?? buildBrainMutationGovernanceStableKey("direct-mutation-signal", input.title, input.source),
    title: input.title,
    severity: input.severity,
    source: input.source,
    reason: input.reason,
    blocked: input.blocked ?? (input.severity === "blocker" || input.severity === "risk"),
    recommendedSafeBoundary: input.recommendedSafeBoundary,
  };
}

function collectLabels(input: DirectMutationDetectorInput): Array<{ source: string; label: string }> {
  return [
    ...uniqueBrainMutationGovernanceStrings(input.moduleLabels ?? []).map((label) => ({ source: "module label", label })),
    ...uniqueBrainMutationGovernanceStrings(input.importLabels ?? []).map((label) => ({ source: "import label", label })),
    ...uniqueBrainMutationGovernanceStrings(input.uiActionLabels ?? []).map((label) => ({ source: "UI action label", label })),
    ...uniqueBrainMutationGovernanceStrings(input.mutationHints ?? []).map((label) => ({ source: "mutation hint", label })),
    ...uniqueBrainMutationGovernanceStrings(input.routeLabels ?? []).map((label) => ({ source: "route label", label })),
  ];
}

export function buildDirectMutationDetectorReport(
  input: DirectMutationDetectorInput = {}
): DirectMutationDetectorReport {
  const labels = collectLabels(input);
  const signals: DirectMutationSignal[] = [];

  for (const entry of labels) {
    const normalized = entry.label.trim().toLowerCase();
    for (const pattern of PATTERNS) {
      if (pattern.matches(normalized)) {
        signals.push(
          buildDirectMutationSignal({
            id: buildBrainMutationGovernanceStableKey("direct-mutation", pattern.id, entry.source, entry.label),
            title: pattern.title,
            severity: pattern.severity,
            source: `${entry.source}: ${entry.label}`,
            reason: pattern.reason,
            recommendedSafeBoundary: pattern.recommendedSafeBoundary,
          })
        );
      }
    }
  }

  const deduped = Array.from(new Map(signals.map((signal) => [signal.id, signal])).values()).sort((a, b) => {
    if (a.blocked !== b.blocked) return a.blocked ? -1 : 1;
    return a.id.localeCompare(b.id);
  });

  const report: DirectMutationDetectorReport = {
    id: "direct-mutation-detector-report",
    signals: deduped,
    suppliedLabelCount: labels.length,
    blockedSignalCount: deduped.filter((signal) => signal.blocked).length,
    blockerCount: deduped.filter((signal) => signal.severity === "blocker").length,
    riskCount: deduped.filter((signal) => signal.severity === "risk").length,
    summary: [],
  };

  return { ...report, summary: summarizeDirectMutationDetectorReport(report) };
}

export function summarizeDirectMutationDetectorReport(
  report: Pick<DirectMutationDetectorReport, "suppliedLabelCount" | "blockedSignalCount" | "blockerCount" | "riskCount">
): string[] {
  return [
    `${report.suppliedLabelCount} supplied labels reviewed with no filesystem reads.`,
    `${report.blockedSignalCount} direct mutation signal(s) blocked: ${report.blockerCount} blockers and ${report.riskCount} risks.`,
    "Detector recognizes appendEvent in UI, brain-graph import, saveBrainGraph from UI, graph array mutation, localStorage graph writes, memory promotion without gate, reducer without preview, and execution tool labels in governance or Brain UI.",
  ];
}
