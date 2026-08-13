import type {
  StabilizationCommandCenterInput,
  StabilizationSeverity,
  StabilizationSource,
  StabilizationTimeline,
  StabilizationTimelineItem,
  StabilizationTimelineKind,
  StabilizationRelatedSurface,
} from "./stabilization-types";
import { buildStabilizationSignals } from "./stabilization-signal-model";
import { buildStabilizationStableKey } from "./stabilization-types";

const SEVERITY_RANK: Record<StabilizationSeverity, number> = {
  blocker: 0,
  risk: 1,
  warning: 2,
  info: 3,
  ready: 4,
};

const SOURCE_ORDER: StabilizationSource[] = [
  "verification-ingestion",
  "regression-triage",
  "regression-fix-queue",
  "patch-preview-queue",
  "preview-diff-composer",
  "patch-application-gate",
  "apply-diff-dry-run",
  "apply-diff-execution-gate",
  "post-apply-verification",
  "stabilization-command-center",
  "unknown",
];

function sourceRank(source: StabilizationSource): number {
  const index = SOURCE_ORDER.indexOf(source);
  return index === -1 ? SOURCE_ORDER.length : index;
}

export function buildStabilizationTimelineItem(args: {
  id?: string | null;
  kind: StabilizationTimelineKind;
  label: string;
  detail: string;
  severity: StabilizationSeverity;
  source: StabilizationSource;
  relatedSurface: StabilizationRelatedSurface;
  suppliedAt?: string | null;
}): StabilizationTimelineItem {
  return {
    id: args.id ?? buildStabilizationStableKey("stabilization-timeline", args.kind, args.label),
    kind: args.kind,
    label: args.label,
    detail: args.detail,
    severity: args.severity,
    source: args.source,
    relatedSurface: args.relatedSurface,
    suppliedAt: args.suppliedAt ?? null,
  };
}

export function buildStabilizationTimeline(input: StabilizationCommandCenterInput = {}): StabilizationTimeline {
  const signals = buildStabilizationSignals(input);
  const severityFor = (type: string): StabilizationSeverity =>
    signals.find((signal) => signal.type === type)?.severity ?? "info";

  const items: StabilizationTimelineItem[] = [
    buildStabilizationTimelineItem({
      kind: "verification-pasted",
      label: "verification pasted",
      detail: input.verificationIngestionSummary ? "Verification ingestion summary is present." : "Verification output still needs to be pasted manually.",
      severity: severityFor("verification-posture"),
      source: "verification-ingestion",
      relatedSurface: "/jarvis",
    }),
    buildStabilizationTimelineItem({
      kind: "regression-detected",
      label: "regression detected",
      detail: "Failed or warning evidence should enter regression triage first.",
      severity: severityFor("regression-posture"),
      source: "regression-triage",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "triage-created",
      label: "triage created",
      detail: "Triage cards summarize suspected cause, impact, rollback, and handoff.",
      severity: severityFor("regression-posture"),
      source: "regression-triage",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "fix-queued",
      label: "fix queued",
      detail: "Regression Fix Queue prepares reviewed repair handoff only.",
      severity: severityFor("fix-queue-posture"),
      source: "regression-fix-queue",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "patch-preview-queued",
      label: "patch preview queued",
      detail: "Patch Preview Queue waits for Safe Patch Preview review.",
      severity: severityFor("patch-queue-posture"),
      source: "patch-preview-queue",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "preview-diff-composed",
      label: "preview diff composed",
      detail: "Preview Diff Composer creates pseudo diffs only.",
      severity: "info",
      source: "preview-diff-composer",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "apply-gate-prepared",
      label: "apply gate prepared",
      detail: "Patch Application Gate is review-only from stabilization.",
      severity: severityFor("apply-gate-posture"),
      source: "patch-application-gate",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "dry-run-simulated",
      label: "dry run simulated",
      detail: "Apply-Diff Dry Run is simulation only and does not mutate files.",
      severity: "info",
      source: "apply-diff-dry-run",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "execution-gate-reviewed",
      label: "execution gate reviewed",
      detail: "Execution Gate review remains explicit and guarded elsewhere.",
      severity: "info",
      source: "apply-diff-execution-gate",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "post-apply-verification-prepared",
      label: "post-apply verification prepared",
      detail: "Post-apply verification checklist is visible for manual use.",
      severity: severityFor("rollback-posture"),
      source: "post-apply-verification",
      relatedSurface: "/files",
    }),
    buildStabilizationTimelineItem({
      kind: "stabilization-reviewed",
      label: "stabilization reviewed",
      detail: "Operator reviews health, signals, queues, risk, readiness, and next action.",
      severity: "info",
      source: "stabilization-command-center",
      relatedSurface: "/stabilization",
    }),
  ].sort((a, b) => {
    const severityDelta = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    if (severityDelta !== 0) return severityDelta;
    const sourceDelta = sourceRank(a.source) - sourceRank(b.source);
    if (sourceDelta !== 0) return sourceDelta;
    return a.id.localeCompare(b.id);
  });

  return {
    id: "stabilization-timeline",
    items,
    summary: summarizeStabilizationTimeline(items),
  };
}

export function summarizeStabilizationTimeline(timelineOrItems: StabilizationTimeline | StabilizationTimelineItem[]): string[] {
  const items = Array.isArray(timelineOrItems) ? timelineOrItems : timelineOrItems.items;
  return [
    `${items.length} stabilization timeline items are visible.`,
    "Timeline sorting is deterministic by severity rank, source order, and id.",
    "No timestamp is generated unless supplied as data.",
  ];
}
