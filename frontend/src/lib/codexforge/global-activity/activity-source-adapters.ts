import { buildGlobalActivityEvent } from "./activity-event-model";
import type { GlobalActivityEvent, GlobalActivitySource, GlobalActivitySourceSummary, GlobalActivitySourceSummaryInput } from "./global-activity-types";

function buildEvents(
  inputs: readonly GlobalActivitySourceSummaryInput[] | undefined,
  defaults: Pick<GlobalActivityEvent, "type" | "source" | "surface" | "title" | "detail" | "severity" | "status" | "reviewRequired" | "nextActionLabel"> & {
    route: GlobalActivityEvent["relatedRoutes"][number];
  }
): GlobalActivityEvent[] {
  const supplied = inputs && inputs.length > 0 ? inputs : [{ title: defaults.title, detail: defaults.detail }];
  return supplied.map((input, index) =>
    buildGlobalActivityEvent({
      type: defaults.type,
      title: input.title ?? defaults.title,
      detail: input.detail ?? defaults.detail,
      source: defaults.source,
      surface: defaults.surface,
      severity: input.severity ?? defaults.severity,
      status: defaults.status,
      relatedRoutes: [...(input.routes ?? [defaults.route])],
      relatedFiles: [...(input.files ?? [])],
      relatedIds: [...(input.relatedIds ?? [input.id ?? String(index + 1)])],
      reviewRequired: input.reviewRequired ?? defaults.reviewRequired,
      nextActionLabel: input.nextActionLabel ?? defaults.nextActionLabel,
      timestampLabel: input.timestampLabel,
      sortKey: input.sortKey,
    })
  );
}

export function buildActivityEventsFromVerification(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "verification.failed",
    source: "verification",
    surface: "Verification Ingestion",
    title: "Verification output needs review",
    detail: "Paste or inspect verification output; evidence is context, not proof.",
    severity: "warning",
    status: "review-required",
    reviewRequired: true,
    nextActionLabel: "paste verification output",
    route: "/activity",
  });
}

export function buildActivityEventsFromRegressionTriage(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "regression.triaged",
    source: "regression-triage",
    surface: "Regression Triage",
    title: "Regression triage ready",
    detail: "Review suspected cause, impact, rollback advice, and grounded fix recommendation.",
    severity: "warning",
    status: "review-required",
    reviewRequired: true,
    nextActionLabel: "review regression triage",
    route: "/stabilization",
  });
}

export function buildActivityEventsFromRegressionFixQueue(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "regression.fixQueued",
    source: "regression-fix-queue",
    surface: "Regression Fix Queue",
    title: "Fix queue requires review",
    detail: "Queued fix candidates are visible for Safe Patch Preview handoff only.",
    severity: "warning",
    status: "queued",
    reviewRequired: true,
    nextActionLabel: "review regression fix queue",
    route: "/stabilization",
  });
}

export function buildActivityEventsFromPatchQueue(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "patch.previewQueued",
    source: "patch-preview",
    surface: "Patch Preview Queue",
    title: "Patch preview queued",
    detail: "Prepare Safe Patch Preview before any file mutation path.",
    severity: "info",
    status: "queued",
    reviewRequired: true,
    nextActionLabel: "prepare Safe Patch Preview",
    route: "/ai",
  });
}

export function buildActivityEventsFromApplyGate(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "apply.dryRunSimulated",
    source: "apply-gate",
    surface: "Apply-Diff Dry Run",
    title: "Apply gate review required",
    detail: "Dry-run and execution gate evidence stay review-only; no direct apply-diff call from UI.",
    severity: "warning",
    status: "review-required",
    reviewRequired: true,
    nextActionLabel: "review apply gate",
    route: "/stabilization",
  });
}

export function buildActivityEventsFromMemoryReview(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "memory.candidateCreated",
    source: "memory-review",
    surface: "Memory Review",
    title: "Memory candidate awaiting review",
    detail: "Review candidate evidence without auto-promote or Brain graph mutation.",
    severity: "info",
    status: "review-required",
    reviewRequired: true,
    nextActionLabel: "review memory candidate",
    route: "/memory-inbox",
  });
}

export function buildActivityEventsFromBrainGovernance(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "brain.governanceReviewed",
    source: "brain-governance",
    surface: "Brain Mutation Governance",
    title: "Brain Mutation Governance review ready",
    detail: "Review mutation boundaries, direct mutation signals, reducer impact, integrity posture, and risk board; read-only and no auto-persistence.",
    severity: "info",
    status: "review-required",
    reviewRequired: true,
    nextActionLabel: "review brain mutation governance",
    route: "/brain-governance",
  });
}

export function buildActivityEventsFromRuntimeReplay(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "runtime.replayPreviewed",
    source: "runtime-replay",
    surface: "Runtime Event Replay Simulator",
    title: "Runtime Event Replay preview ready",
    detail: "Review selected runtime journal events against a graph snapshot; preview-only, no graph mutation, no appendEvent, no event execution, and no auto-persistence.",
    severity: "info",
    status: "review-required",
    reviewRequired: true,
    nextActionLabel: "review runtime event replay",
    route: "/runtime-replay",
  });
}

export function buildActivityEventsFromSnapshotRestore(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "snapshot.restoreReviewed",
    source: "snapshot-restore",
    surface: "Snapshot Restore Approval Gate",
    title: "Snapshot Restore Approval Gate review ready",
    detail: "Review restore candidate, comparison evidence, replay evidence, policy, approval packet, and request preview; preview-only, restore blocked by default, no graph mutation, no appendEvent, no saveBrainGraph from UI, and no auto-persistence.",
    severity: "warning",
    status: "review-required",
    reviewRequired: true,
    nextActionLabel: "review snapshot restore gate",
    route: "/snapshot-restore",
  });
}

export function buildActivityEventsFromCreative(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "creative.planCreated",
    source: "creative",
    surface: "Creative Production Studio",
    title: "Creative plan created",
    detail: "Creative planning is visible as context for next safe action sequencing.",
    severity: "info",
    status: "prepared",
    reviewRequired: false,
    nextActionLabel: "continue creative workflow",
    route: "/creative",
  });
}

export function buildActivityEventsFromStabilization(inputs?: readonly GlobalActivitySourceSummaryInput[]): GlobalActivityEvent[] {
  return buildEvents(inputs, {
    type: "stabilization.reviewed",
    source: "stabilization",
    surface: "Stabilization Command Center",
    title: "Stabilization reviewed",
    detail: "Build, smoke, regression, patch, apply, and memory posture are visible for review.",
    severity: "info",
    status: "prepared",
    reviewRequired: false,
    nextActionLabel: "review stabilization",
    route: "/stabilization",
  });
}

export function summarizeActivitySources(events: readonly GlobalActivityEvent[]): GlobalActivitySourceSummary[] {
  const sources = [...new Set(events.map((event) => event.source))].sort();
  return sources.map((source: GlobalActivitySource) => {
    const sourceEvents = events.filter((event) => event.source === source);
    return {
      source,
      eventCount: sourceEvents.length,
      blockerCount: sourceEvents.filter((event) => event.severity === "blocker").length,
      warningCount: sourceEvents.filter((event) => event.severity === "warning").length,
      reviewRequiredCount: sourceEvents.filter((event) => event.reviewRequired).length,
      summary: [`${sourceEvents.length} events from ${source}.`],
    };
  });
}
