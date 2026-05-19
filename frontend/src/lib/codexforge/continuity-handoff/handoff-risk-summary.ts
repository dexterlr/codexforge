import type { ContinuityHandoffInput, ContinuityHandoffRiskCategory, ContinuityHandoffRiskItem, ContinuityHandoffRiskSummary, ContinuityHandoffRoute, ContinuityHandoffSeverity } from "./continuity-handoff-types";
import { buildContinuityHandoffStableKey } from "./continuity-handoff-types";

export function buildContinuityHandoffRiskItem(input: {
  category: ContinuityHandoffRiskCategory;
  title: string;
  severity: ContinuityHandoffSeverity;
  source: string;
  detail: string;
  mitigation: string;
  relatedRoute: ContinuityHandoffRoute;
  reviewRequired?: boolean;
  blocker?: boolean;
}): ContinuityHandoffRiskItem {
  return {
    id: buildContinuityHandoffStableKey("handoff-risk", input.category, input.title, input.source),
    category: input.category,
    title: input.title,
    severity: input.severity,
    source: input.source,
    detail: input.detail,
    mitigation: input.mitigation,
    relatedRoute: input.relatedRoute,
    reviewRequired: input.reviewRequired ?? input.severity !== "info",
    blocker: input.blocker ?? input.severity === "blocker",
  };
}

export function buildContinuityHandoffRiskSummary(input: ContinuityHandoffInput = {}): ContinuityHandoffRiskSummary {
  const buildSeverity: ContinuityHandoffSeverity = input.buildPassed === false ? "blocker" : input.buildPassed === true ? "info" : "warning";
  const smokeSeverity: ContinuityHandoffSeverity = input.smokePassed === false ? "blocker" : input.smokePassed === true ? "info" : "warning";
  const items = [
    buildContinuityHandoffRiskItem({ category: "build-risk", title: "Build posture requires manual confirmation", severity: buildSeverity, source: "Validation Plan", detail: "npm run build must be run by the operator; handoff UI only copies commands.", mitigation: "Run build manually and paste or record result before continuing.", relatedRoute: "smoke suite" }),
    buildContinuityHandoffRiskItem({ category: "smoke-risk", title: "Smoke posture requires manual confirmation", severity: smokeSeverity, source: "Validation Plan", detail: "Targeted and upstream smoke scripts must pass before next phase.", mitigation: "Run targeted handoff smoke, upstream continuity, stabilization, activity, palette, and managed server smoke.", relatedRoute: "smoke suite" }),
    buildContinuityHandoffRiskItem({ category: "regression-risk", title: "Regression risk remains review-first", severity: input.regressionRiskVisible ? "risk" : "info", source: "Stabilization Command Center", detail: "Known regression signals must be fixed before next phase work.", mitigation: "Review stabilization and fix failed smoke before continuing.", relatedRoute: "/stabilization" }),
    buildContinuityHandoffRiskItem({ category: "memory-risk", title: "Memory candidates require review", severity: input.pendingMemoryCandidates && input.pendingMemoryCandidates > 0 ? "warning" : "info", source: "Operator Memory Inbox", detail: "Pending memory candidates can duplicate or contradict existing context.", mitigation: "Review memory inbox; do not auto-promote memory.", relatedRoute: "/memory-inbox" }),
    buildContinuityHandoffRiskItem({ category: "graph-mutation-risk", title: "Graph mutation remains blocked from handoff", severity: input.mutationRiskVisible ? "blocker" : "info", source: "Brain Mutation Governance", detail: "Handoff packet must not mutate Brain graph, saveBrainGraph from UI, or auto-merge events.", mitigation: "Route mutation concerns to governance and guarded executor review only.", relatedRoute: "/brain-governance" }),
    buildContinuityHandoffRiskItem({ category: "runtime-event-risk", title: "Runtime events are audit-only here", severity: input.runtimeEventRiskVisible ? "risk" : "info", source: "Runtime Event Journal", detail: "Handoff UI must not appendEvent or execute runtime tools.", mitigation: "Review journal and executor readiness; keep packet copy-only.", relatedRoute: "/runtime-journal" }),
    buildContinuityHandoffRiskItem({ category: "snapshot-risk", title: "Snapshot evidence must remain inspect-only", severity: input.snapshotRiskVisible ? "warning" : "info", source: "Brain Snapshot Manager", detail: "Snapshot selection and comparison are context for handoff, not restore execution.", mitigation: "Use snapshot manager for review and replay-source selection only.", relatedRoute: "/brain-snapshots" }),
    buildContinuityHandoffRiskItem({ category: "restore-risk", title: "Restore remains blocked by default", severity: input.restoreRiskVisible ? "blocker" : "warning", source: "Snapshot Restore Approval Gate", detail: "Snapshot restore and Brain graph restore are blocked unless a future guarded executor exists.", mitigation: "Use restore gate preview only; do not restore snapshots from handoff.", relatedRoute: "/snapshot-restore" }),
    buildContinuityHandoffRiskItem({ category: "replay-risk", title: "Replay output is preview-only", severity: "warning", source: "Runtime Event Replay Simulator", detail: "Replay is evidence for review; it does not execute events or persist results.", mitigation: "Review replay risks before restore or runtime event work.", relatedRoute: "/runtime-replay" }),
    buildContinuityHandoffRiskItem({ category: "governance-risk", title: "Governance boundary must be preserved", severity: "warning", source: "Brain Mutation Governance Console", detail: "Direct UI mutation is blocked and must stay blocked.", mitigation: "Review governance before memory or runtime event work.", relatedRoute: "/brain-governance" }),
    buildContinuityHandoffRiskItem({ category: "validation-risk", title: "Validation evidence is not embedded automatically", severity: input.validationRiskVisible ? "risk" : "warning", source: "Validation Plan", detail: "Handoff packet is deterministic and does not auto-run tests.", mitigation: "Copy commands, run manually, and update the next session context.", relatedRoute: "smoke suite" }),
    buildContinuityHandoffRiskItem({ category: "latest-message-authority-risk", title: "Latest-message authority must be preserved", severity: input.latestMessageAuthorityPreserved === false ? "blocker" : "info", source: "Command Palette and handoff prompt", detail: "Newest user instruction steers the current turn and must override stale packet context.", mitigation: "State latest-message authority in packet and next-session prompt.", relatedRoute: "/handoff" }),
    buildContinuityHandoffRiskItem({ category: "unknown-risk", title: "Unknowns require inspect-first handling", severity: "warning", source: "Continuity Handoff", detail: "Any missing state should be treated as review-required, not as success.", mitigation: "Inspect current files, status, and smoke output before edits.", relatedRoute: "/handoff" }),
  ];
  return summarizeContinuityHandoffRisks(items);
}

export function summarizeContinuityHandoffRisks(items: readonly ContinuityHandoffRiskItem[]): ContinuityHandoffRiskSummary {
  const sorted = [...items].sort((a, b) => Number(b.blocker) - Number(a.blocker) || a.id.localeCompare(b.id));
  const blockerCount = items.filter((item) => item.blocker).length;
  const reviewRequiredCount = items.filter((item) => item.reviewRequired).length;
  return {
    id: "continuity-handoff-risk-summary",
    items: [...items],
    riskCount: items.filter((item) => item.severity === "risk" || item.severity === "warning" || item.severity === "blocker").length,
    blockerCount,
    reviewRequiredCount,
    topRisk: sorted.find((item) => item.severity !== "info") ?? null,
    summary: [
      `${items.length} handoff risk categories are visible.`,
      `${blockerCount} blocker(s) and ${reviewRequiredCount} review-required item(s) are present.`,
      "Blockers and failed build or smoke validation must be handled before next phase work.",
    ],
  };
}
