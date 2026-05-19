import type {
  BrainContinuityInput,
  BrainContinuitySeverity,
  BrainContinuitySignal,
  BrainContinuitySignalSummary,
  BrainContinuitySignalType,
  BrainContinuitySource,
  BrainContinuityRoute,
} from "./brain-continuity-types";
import { buildBrainContinuityStableKey, uniqueBrainContinuityStrings } from "./brain-continuity-types";

const SEVERITY_RANK: Record<BrainContinuitySeverity, number> = {
  healthy: 0,
  info: 1,
  unknown: 2,
  warning: 3,
  risk: 4,
  blocker: 5,
};

export function buildBrainContinuitySignal(args: {
  id?: string | null;
  type: BrainContinuitySignalType;
  title: string;
  detail: string;
  severity?: BrainContinuitySeverity | null;
  source: BrainContinuitySource;
  relatedRoute?: BrainContinuityRoute | null;
  relatedFiles?: readonly string[] | null;
  relatedIds?: readonly string[] | null;
  reviewRequired?: boolean | null;
  nextAction: string;
}): BrainContinuitySignal {
  const severity = args.severity ?? "info";
  return {
    id: args.id ?? buildBrainContinuityStableKey("brain-continuity-signal", args.type, args.source, args.title),
    type: args.type,
    title: args.title,
    detail: args.detail,
    severity,
    source: args.source,
    relatedRoute: args.relatedRoute ?? "/brain-continuity",
    relatedFiles: uniqueBrainContinuityStrings(args.relatedFiles),
    relatedIds: uniqueBrainContinuityStrings(args.relatedIds),
    reviewRequired: args.reviewRequired ?? !["healthy", "info"].includes(severity),
    nextAction: args.nextAction,
  };
}

export function buildBrainContinuitySignals(input: BrainContinuityInput = {}): BrainContinuitySignal[] {
  const files = input.relatedFiles ?? [];
  const ids = input.relatedIds ?? [];
  const signals: BrainContinuitySignal[] = [
    buildBrainContinuitySignal({
      type: "memory-growth",
      severity: (input.duplicateRiskCount ?? 0) > 0 || (input.contradictionRiskCount ?? 0) > 0 ? "warning" : "healthy",
      title: "Memory growth controlled",
      detail: "Memory growth posture includes pending inbox, blocked promotion, duplicate risk, contradiction risk, high-importance memory, stale memory, and density signals.",
      source: "operator-memory-inbox",
      relatedRoute: "/memory-inbox",
      relatedFiles: files,
      relatedIds: ids,
      nextAction: "Review Memory Inbox and Memory Promotion Gate before promotion.",
    }),
    buildBrainContinuitySignal({
      type: "runtime-event-journal",
      severity: input.journalPresent === false ? "blocker" : input.appendOnlySemanticsVisible === false ? "risk" : "healthy",
      title: "Runtime events auditable",
      detail: "Runtime Event Journal health checks lifecycle, request ids, approval, policy, validation, reducer preview, append-only semantics, blocked events, and integrity risks.",
      source: "runtime-event-journal",
      relatedRoute: "/runtime-journal",
      nextAction: "Review runtime event journal before memory promotion or restore planning.",
    }),
    buildBrainContinuitySignal({
      type: "runtime-event-executor",
      severity: input.runtimeEventExecutorExists === false ? "blocker" : "info",
      title: "Guarded executor boundary visible",
      detail: "Runtime Event Executor remains a guarded boundary; continuity UI does not execute runtime events.",
      source: "runtime-event-executor",
      relatedRoute: "/runtime-journal",
      nextAction: "Review runtime event executor readiness only after journal health is visible.",
    }),
    buildBrainContinuitySignal({
      type: "runtime-replay",
      severity: input.replaySimulatorAvailable === false ? "warning" : "healthy",
      title: "Replay readiness visible",
      detail: "Replay continuity confirms simulator availability, reducer simulation, cloned data, risk detector, rollback advisor, snapshot selection, memory.promoted replay support, and preview-only posture.",
      source: "runtime-event-replay",
      relatedRoute: "/runtime-replay",
      nextAction: "Review Runtime Event Replay before restore planning.",
    }),
    buildBrainContinuitySignal({
      type: "brain-snapshot",
      severity: input.latestSnapshotAvailable === false ? "warning" : input.snapshotIntegrityChecked === false ? "risk" : "healthy",
      title: "Snapshots usable",
      detail: "Brain Snapshot Manager continuity checks latest snapshot, integrity, comparison, replay selector, rollback plan, blocked restore default, canonical schema, and saveBrainGraph from UI block.",
      source: "brain-snapshot-manager",
      relatedRoute: "/brain-snapshots",
      nextAction: "Review Brain snapshots and integrity before replay or restore.",
    }),
    buildBrainContinuitySignal({
      type: "snapshot-restore",
      severity: input.replayEvidenceAvailable === false || input.comparisonEvidenceAvailable === false ? "risk" : "warning",
      title: "Restore remains blocked and governed",
      detail: "Snapshot restore continuity risk is review-only; restore execution is blocked by default and requires comparison, replay, governance, journal, schema, and data-loss review.",
      source: "snapshot-restore-gate",
      relatedRoute: "/snapshot-restore",
      nextAction: "Review Snapshot Restore Gate; do not restore snapshots from continuity UI.",
    }),
    buildBrainContinuitySignal({
      type: "mutation-governance",
      severity: input.directUiGraphMutationBlocked === false || input.appendEventUiCallsBlocked === false ? "blocker" : "healthy",
      title: "Governance boundary intact",
      detail: "Brain Mutation Governance posture checks canonical schema, legacy import block, direct UI graph mutation block, appendEvent UI call block, reducer preview, and latest-message authority.",
      source: "brain-mutation-governance",
      relatedRoute: "/brain-governance",
      nextAction: "Review Brain mutation governance before feature work if any mutation boundary is unclear.",
    }),
    buildBrainContinuitySignal({
      type: "latest-message-authority",
      severity: input.latestMessageAuthorityPreserved === false ? "blocker" : "healthy",
      title: "Latest-message authority preserved",
      detail: "Continuity recommendations are context only; the newest operator instruction remains authoritative.",
      source: "brain-continuity",
      relatedRoute: "/brain-continuity",
      nextAction: "Stop and stabilize if newest operator authority is unclear.",
    }),
  ];

  if (input.operatorWarning?.trim()) {
    signals.push(buildBrainContinuitySignal({
      type: "operator-warning",
      severity: "warning",
      title: "Operator warning",
      detail: input.operatorWarning.trim(),
      source: "operator-note",
      relatedRoute: "/brain-continuity",
      nextAction: "Review operator warning before continuity action.",
    }));
  }

  return signals.sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity] || a.id.localeCompare(b.id));
}

export function summarizeBrainContinuitySignals(signals: readonly BrainContinuitySignal[]): BrainContinuitySignalSummary {
  const count = (severity: BrainContinuitySeverity) => signals.filter((signal) => signal.severity === severity).length;
  const blockerCount = count("blocker");
  const riskCount = count("risk");
  const warningCount = count("warning");
  return {
    id: "brain-continuity-signal-summary",
    signalCount: signals.length,
    healthyCount: count("healthy"),
    infoCount: count("info"),
    warningCount,
    riskCount,
    blockerCount,
    unknownCount: count("unknown"),
    reviewRequiredCount: signals.filter((signal) => signal.reviewRequired).length,
    topSignal: signals[0] ?? null,
    summary: [
      `${signals.length} Brain continuity signals are visible.`,
      `${blockerCount} blockers, ${riskCount} risks, and ${warningCount} warnings require review.`,
      "Continuity signals are deterministic, read-only, local-first, and do not read files unless data is supplied by caller.",
    ],
  };
}
