import type { BrainSnapshotIntegrityReport, BrainSnapshotReplaySelector, BrainSnapshotReplaySelectorInput, BrainSnapshotReadiness } from "./brain-snapshot-types";

function reportFor(snapshotId: string, reports: readonly BrainSnapshotIntegrityReport[] = []): BrainSnapshotIntegrityReport | undefined {
  return reports.find((report) => report.snapshotId === snapshotId);
}

function readinessFor(report?: BrainSnapshotIntegrityReport): BrainSnapshotReadiness {
  if (!report) return "review-required";
  if (report.status === "blocker") return "blocked";
  if (report.status === "risk" || report.status === "warning" || report.status === "unknown") return "review-required";
  return "ready";
}

export function buildBrainSnapshotReplaySelector(input: BrainSnapshotReplaySelectorInput): BrainSnapshotReplaySelector {
  return selectBrainSnapshotForReplay(input);
}

export function selectBrainSnapshotForReplay(input: BrainSnapshotReplaySelectorInput): BrainSnapshotReplaySelector {
  const warnings: string[] = [];
  const blockedReasons: string[] = [];
  const whySelected: string[] = [];
  const selected =
    input.snapshots.find((snapshot) => snapshot.id === input.operatorSelectedSnapshotId) ??
    input.snapshots.find((snapshot) => readinessFor(reportFor(snapshot.id, input.integrityReports)) !== "blocked") ??
    null;

  if (!selected) {
    blockedReasons.push("No replay-compatible snapshot available.");
  } else {
    whySelected.push(input.operatorSelectedSnapshotId === selected.id ? "Operator-selected flag matched this snapshot." : "First replay-compatible snapshot selected deterministically.");
    whySelected.push(`Replay mode: ${input.mode}.`);
    if (input.eventTypes?.length) whySelected.push(`Event types: ${input.eventTypes.slice().sort().join(", ")}.`);
    if (input.sourceFreshnessLabel) whySelected.push(`Source freshness: ${input.sourceFreshnessLabel}.`);
    if (selected.memoryNodeCount > 0) warnings.push("Memory promotion risk should be reviewed before replay handoff.");
    if (selected.executionNodeCount > 0) warnings.push("Reducer preview need detected from execution lineage coverage.");
  }

  const readiness = selected ? readinessFor(reportFor(selected.id, input.integrityReports)) : "blocked";
  if (readiness === "blocked") blockedReasons.push("Selected snapshot integrity has blocker status.");

  const runtimeReplayHandoff = selected
    ? [
        "Runtime replay handoff:",
        `Selected snapshot id: ${selected.id}`,
        `Mode: ${input.mode}`,
        `Graph version: ${selected.graphVersion}`,
        `Canonical graph schema: ${selected.canonicalSchemaPath}`,
        "Use this as replay source selection only; no persistence, no appendEvent, no event execution, no graph mutation.",
      ].join("\n")
    : "Runtime replay handoff blocked: no selected snapshot.";

  const selector: BrainSnapshotReplaySelector = {
    selectedSnapshotId: selected?.id ?? null,
    whySelected,
    readiness,
    warnings,
    blockedReasons,
    runtimeReplayHandoff,
    summary: [],
  };
  selector.summary = summarizeBrainSnapshotReplaySelector(selector);
  return selector;
}

export function summarizeBrainSnapshotReplaySelector(selector: BrainSnapshotReplaySelector): string[] {
  return [
    selector.selectedSnapshotId ? `Replay source selected: ${selector.selectedSnapshotId}.` : "Replay source selection blocked.",
    `Readiness: ${selector.readiness}.`,
    "Selector emits runtime replay handoff and does not persist replay state.",
  ];
}
