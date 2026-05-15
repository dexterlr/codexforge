import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import {
  BRAIN_MERGE_APPROVAL_BOUNDARY,
  buildBrainMergeStableKey,
  type BrainEventQueue,
  type BrainGraphDiffPreview,
  type BrainMergeNextAction,
  type BrainMergePlan,
  type BrainMergePlanStep,
  type BrainMergeRiskLevel,
} from "./brain-merge-types";

export function buildBrainMergePlanStep(
  id: string,
  label: string,
  state: BrainMergePlanStep["state"],
  detail: string
): BrainMergePlanStep {
  return { id: buildBrainMergeStableKey("brain-merge-step", id), label, state, detail };
}

function selectRiskLevel(queue: BrainEventQueue, diff: BrainGraphDiffPreview): BrainMergeRiskLevel {
  if (queue.unknownEventCount > 0 || diff.duplicateRisks.length > 0 || diff.conflictWarnings.length > 0) return "high";
  if (queue.blockedEventCount > 0 || diff.staleEventRisks.length > 0) return "medium";
  return "low";
}

export function selectBrainMergeNextAction(
  queue: BrainEventQueue,
  diff: BrainGraphDiffPreview
): BrainMergeNextAction {
  if (queue.eventCount === 0) return "review-event-queue";
  if (queue.blockedEventCount > 0 || queue.unknownEventCount > 0 || diff.duplicateRisks.length > 0) return "resolve-blockers";
  if (diff.conflictWarnings.some((warning) => warning.includes("contradiction"))) return "acknowledge-contradiction-risk";
  if (diff.nodesToAdd.length + diff.nodesToUpdate.length + diff.edgesToAdd.length > 0) return "review-graph-diff";
  return "approve-future-merge";
}

export function buildBrainMergePlan(
  graph: CodexForgeBrainGraph,
  queue: BrainEventQueue,
  diff: BrainGraphDiffPreview
): BrainMergePlan {
  const expectedNodeChanges = diff.nodesToAdd.length + diff.nodesToUpdate.length;
  const expectedEdgeChanges = diff.edgesToAdd.length;
  const riskLevel = selectRiskLevel(queue, diff);
  const nextAction = selectBrainMergeNextAction(queue, diff);
  const steps = [
    buildBrainMergePlanStep("event-queue", "Event queue", queue.blockedEventCount ? "blocked" : "ready", `${queue.validEventCount} approved memory.promoted event(s).`),
    buildBrainMergePlanStep("graph-diff-preview", "Graph diff preview", expectedNodeChanges + expectedEdgeChanges > 0 ? "review" : "blocked", `${expectedNodeChanges} node change(s), ${expectedEdgeChanges} edge change(s).`),
    buildBrainMergePlanStep("approval-boundary", "Approval boundary", "review", BRAIN_MERGE_APPROVAL_BOUNDARY),
  ];
  const plan: BrainMergePlan = {
    id: "brain-merge-plan",
    eventCount: queue.eventCount,
    validEventCount: queue.validEventCount,
    blockedEventCount: queue.blockedEventCount,
    targetGraphVersion: graph.version ?? null,
    expectedNodeChanges,
    expectedEdgeChanges,
    riskLevel,
    approvalBoundary: BRAIN_MERGE_APPROVAL_BOUNDARY,
    nextAction,
    steps,
    summary: [],
  };

  return { ...plan, summary: summarizeBrainMergePlan(plan) };
}

export function summarizeBrainMergePlan(plan: BrainMergePlan): string[] {
  return [
    `${plan.validEventCount}/${plan.eventCount} event(s) can enter merge preview.`,
    `Target graph version: ${plan.targetGraphVersion ?? "missing"}.`,
    `Expected changes: ${plan.expectedNodeChanges} node(s), ${plan.expectedEdgeChanges} edge(s).`,
    `Risk level ${plan.riskLevel}; ${plan.approvalBoundary}.`,
    `Next action: ${plan.nextAction}.`,
  ];
}
