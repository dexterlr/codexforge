import type {
  RuntimeEventReplayInput,
  RuntimeReplayEventSequence,
  RuntimeReplayEventSequenceItem,
  RuntimeReplayImpactAnalysis,
  RuntimeReplayRiskId,
  RuntimeReplayRiskItem,
  RuntimeReplayRiskLevel,
  RuntimeReplayRiskReport,
  RuntimeReplaySimulation,
  RuntimeReplaySnapshot,
} from "./runtime-event-replay-types";
import {
  buildRuntimeEventReplayStableKey,
  isRuntimeEventReplayKnownEventType,
  stableRuntimeEventReplayStringify,
} from "./runtime-event-replay-types";

const RISK_SCORE: Record<RuntimeReplayRiskLevel, number> = {
  blocker: 1000,
  risk: 700,
  warning: 420,
  info: 120,
};

const RISK_DEFAULTS: Record<RuntimeReplayRiskId, Omit<RuntimeReplayRiskItem, "id">> = {
  "unknown-event-type": {
    title: "Unknown event type",
    detail: "Unknown runtime event types are blocked before reducer preview.",
    riskLevel: "blocker",
    blocker: true,
    reviewRequired: true,
    mitigation: "Do not replay the event until policy and reducer behavior are defined.",
  },
  "reducer-missing": {
    title: "Reducer preview missing",
    detail: "Missing reducer preview is a blocker for replay confidence.",
    riskLevel: "blocker",
    blocker: true,
    reviewRequired: true,
    mitigation: "Inspect Runtime Event Replay Simulator reducer preview before any guarded event decision.",
  },
  "replay-order-risk": {
    title: "Replay order risk",
    detail: "Event order may affect graph impact.",
    riskLevel: "warning",
    blocker: false,
    reviewRequired: true,
    mitigation: "Review supplied order and journal chronology before trusting a preview.",
  },
  "duplicate-memory-risk": {
    title: "Duplicate memory risk",
    detail: "memory.promoted appears to duplicate supplied graph or sequence memory.",
    riskLevel: "risk",
    blocker: false,
    reviewRequired: true,
    mitigation: "Reject memory promotion or run dedupe review before any approval.",
  },
  "contradiction-risk": {
    title: "Contradiction risk",
    detail: "memory.promoted includes contradiction or conflict hints.",
    riskLevel: "blocker",
    blocker: true,
    reviewRequired: true,
    mitigation: "Reject memory promotion until contradiction review is complete.",
  },
  "stale-snapshot-risk": {
    title: "Stale snapshot risk",
    detail: "Selected graph snapshot may be stale.",
    riskLevel: "warning",
    blocker: false,
    reviewRequired: true,
    mitigation: "Refresh or select a newer graph snapshot before relying on preview.",
  },
  "schema-version-risk": {
    title: "Schema version risk",
    detail: "Snapshot schema differs from canonical graph schema.",
    riskLevel: "risk",
    blocker: false,
    reviewRequired: true,
    mitigation: "Normalize through the canonical graph schema before replay.",
  },
  "legacy-schema-risk": {
    title: "Legacy schema risk",
    detail: "Legacy graph schema hints were detected.",
    riskLevel: "blocker",
    blocker: true,
    reviewRequired: true,
    mitigation: "Remove legacy schema usage and keep canonical graph schema as authority.",
  },
  "unexpected-node-delta": {
    title: "Unexpected node delta",
    detail: "Replay produced more node changes than expected.",
    riskLevel: "risk",
    blocker: false,
    reviewRequired: true,
    mitigation: "Inspect reducer preview and graph impact before any future persistence path.",
  },
  "unexpected-edge-delta": {
    title: "Unexpected edge delta",
    detail: "Replay produced more edge changes than expected.",
    riskLevel: "risk",
    blocker: false,
    reviewRequired: true,
    mitigation: "Inspect edge impact and rollback guidance before any future persistence path.",
  },
  "memory-authority-risk": {
    title: "Memory authority risk",
    detail: "Memory evidence is context, not authority.",
    riskLevel: "warning",
    blocker: false,
    reviewRequired: true,
    mitigation: "Review memory promotion gate and latest operator instruction before promotion.",
  },
  "direct-mutation-risk": {
    title: "Direct mutation risk",
    detail: "Direct mutation hints are blockers for replay trust.",
    riskLevel: "blocker",
    blocker: true,
    reviewRequired: true,
    mitigation: "Do not mutate graph, write files, or append events from replay UI.",
  },
  "latest-message-authority-risk": {
    title: "Latest-message authority risk",
    detail: "Replay handoff must preserve latest-message authority.",
    riskLevel: "blocker",
    blocker: true,
    reviewRequired: true,
    mitigation: "Resolve instruction conflicts before using replay output as guidance.",
  },
};

function lowerText(...parts: readonly unknown[]): string {
  return parts.map((part) => stableRuntimeEventReplayStringify(part)).join(" ").toLowerCase();
}

function memoryContent(item: RuntimeReplayEventSequenceItem): string | null {
  if (item.eventType !== "memory.promoted") return null;
  const content = item.event?.payload?.content;
  return typeof content === "string" && content.trim() ? content.trim().toLowerCase() : null;
}

function hasDuplicateMemoryRisk(snapshot: RuntimeReplaySnapshot, sequence: RuntimeReplayEventSequence): boolean {
  const existing = new Set(
    snapshot.graph.nodes
      .filter((node) => node.kind === "memory")
      .map((node) => ("content" in node.data ? String(node.data.content).trim().toLowerCase() : ""))
      .filter(Boolean)
  );
  const seen = new Set<string>();
  for (const item of sequence.items) {
    const content = memoryContent(item);
    if (!content) continue;
    if (existing.has(content) || seen.has(content)) return true;
    seen.add(content);
  }
  return false;
}

function hasContradictionRisk(sequence: RuntimeReplayEventSequence): boolean {
  return sequence.items.some((item) => {
    if (item.eventType !== "memory.promoted") return false;
    const text = lowerText(item.event?.payload, item.payloadSummary, item.warnings);
    return text.includes("contradiction") || text.includes("conflict");
  });
}

function hasDirectMutationRisk(input: RuntimeEventReplayInput, sequence: RuntimeReplayEventSequence): boolean {
  const text = lowerText(input.operatorNote, sequence.items.map((item) => [item.payloadSummary, item.warnings]));
  return [
    "savebraingraph",
    "loadbraingraph",
    "graph.nodes.push",
    "graph.edges.push",
    "apply-diff",
    "write-file",
    "run-command",
    "appendEvent",
  ].some((hint) => text.includes(hint.toLowerCase()));
}

function hasLatestMessageAuthorityRisk(input: RuntimeEventReplayInput): boolean {
  const note = lowerText(input.operatorNote);
  return note.includes("ignore latest") || note.includes("override newest") || note.includes("ignore newest");
}

export function buildRuntimeReplayRiskItem(
  input: Partial<RuntimeReplayRiskItem> & { id: RuntimeReplayRiskId }
): RuntimeReplayRiskItem {
  const defaults = RISK_DEFAULTS[input.id];
  return {
    id: input.id,
    title: input.title ?? defaults.title,
    detail: input.detail ?? defaults.detail,
    riskLevel: input.riskLevel ?? defaults.riskLevel,
    eventId: input.eventId,
    blocker: input.blocker ?? defaults.blocker,
    reviewRequired: input.reviewRequired ?? defaults.reviewRequired,
    mitigation: input.mitigation ?? defaults.mitigation,
  };
}

export function buildRuntimeReplayRiskReport(args: {
  replayInput: RuntimeEventReplayInput;
  snapshot: RuntimeReplaySnapshot;
  sequence: RuntimeReplayEventSequence;
  simulation: RuntimeReplaySimulation;
  impact: RuntimeReplayImpactAnalysis;
}): RuntimeReplayRiskReport {
  const risks: RuntimeReplayRiskItem[] = [];

  for (const item of args.sequence.items) {
    if (!isRuntimeEventReplayKnownEventType(item.eventType)) {
      risks.push(buildRuntimeReplayRiskItem({ id: "unknown-event-type", eventId: item.eventId }));
      risks.push(buildRuntimeReplayRiskItem({ id: "reducer-missing", eventId: item.eventId }));
    }
    if (item.expectedReducerArea === "unknown reducer area") {
      risks.push(buildRuntimeReplayRiskItem({ id: "reducer-missing", eventId: item.eventId }));
    }
  }

  if (args.sequence.items.length > 1 && args.replayInput.replayScope !== "single-event") {
    risks.push(buildRuntimeReplayRiskItem({ id: "replay-order-risk", riskLevel: "warning", blocker: false }));
  }
  if (hasDuplicateMemoryRisk(args.snapshot, args.sequence)) {
    risks.push(buildRuntimeReplayRiskItem({ id: "duplicate-memory-risk", riskLevel: "risk" }));
  }
  if (hasContradictionRisk(args.sequence)) {
    risks.push(buildRuntimeReplayRiskItem({ id: "contradiction-risk", riskLevel: "blocker", blocker: true }));
  }
  if (args.snapshot.updatedAtLabel?.toLowerCase().includes("stale") || args.snapshot.integrityNotes.some((note) => note.toLowerCase().includes("stale"))) {
    risks.push(buildRuntimeReplayRiskItem({ id: "stale-snapshot-risk" }));
  }
  if (args.snapshot.graphVersion !== 2) {
    risks.push(buildRuntimeReplayRiskItem({ id: "schema-version-risk" }));
  }
  if (args.snapshot.integrityNotes.some((note) => note.toLowerCase().includes("legacy"))) {
    risks.push(buildRuntimeReplayRiskItem({ id: "legacy-schema-risk" }));
  }
  if (Math.abs(args.impact.nodeDelta) > Math.max(3, args.sequence.eventCount * 3)) {
    risks.push(buildRuntimeReplayRiskItem({ id: "unexpected-node-delta" }));
  }
  if (Math.abs(args.impact.edgeDelta) > Math.max(3, args.sequence.eventCount * 3)) {
    risks.push(buildRuntimeReplayRiskItem({ id: "unexpected-edge-delta" }));
  }
  if (args.sequence.items.some((item) => item.eventType === "memory.promoted")) {
    risks.push(buildRuntimeReplayRiskItem({ id: "memory-authority-risk" }));
  }
  if (hasDirectMutationRisk(args.replayInput, args.sequence)) {
    risks.push(buildRuntimeReplayRiskItem({ id: "direct-mutation-risk" }));
  }
  if (hasLatestMessageAuthorityRisk(args.replayInput)) {
    risks.push(buildRuntimeReplayRiskItem({ id: "latest-message-authority-risk" }));
  }
  if (args.simulation.status === "no-snapshot") {
    risks.push(buildRuntimeReplayRiskItem({ id: "stale-snapshot-risk", detail: "No snapshot was supplied for reducer preview." }));
  }

  const byId = new Map<string, RuntimeReplayRiskItem>();
  for (const risk of risks) {
    const key = buildRuntimeEventReplayStableKey("risk", risk.id, risk.eventId);
    const existing = byId.get(key);
    if (!existing || RISK_SCORE[risk.riskLevel] > RISK_SCORE[existing.riskLevel]) {
      byId.set(key, risk);
    }
  }
  const items = [...byId.values()].sort(
    (left, right) => RISK_SCORE[right.riskLevel] - RISK_SCORE[left.riskLevel] || left.id.localeCompare(right.id)
  );
  const report: RuntimeReplayRiskReport = {
    id: "runtime-replay-risk-report",
    items,
    blockerCount: items.filter((item) => item.blocker || item.riskLevel === "blocker").length,
    riskCount: items.filter((item) => item.riskLevel === "risk").length,
    warningCount: items.filter((item) => item.riskLevel === "warning").length,
    reviewRequiredCount: items.filter((item) => item.reviewRequired).length,
    topRisk: items[0] ?? null,
    summary: [],
  };

  return { ...report, summary: summarizeRuntimeReplayRiskReport(report) };
}

export function summarizeRuntimeReplayRiskReport(report: RuntimeReplayRiskReport): string[] {
  return [
    `${report.items.length} replay risk item(s) detected.`,
    `${report.blockerCount} blocker(s), ${report.riskCount} risk(s), and ${report.warningCount} warning(s).`,
    `Top risk: ${report.topRisk?.title ?? "No replay risk detected"}.`,
    "Risk detector covers unknown-event-type, reducer-missing, replay-order-risk, duplicate-memory-risk, contradiction-risk, stale-snapshot-risk, schema-version-risk, legacy-schema-risk, unexpected-node-delta, unexpected-edge-delta, memory-authority-risk, direct-mutation-risk, and latest-message-authority-risk.",
  ];
}
