import type {
  ApprovedBrainMergeRequest,
  ApprovedBrainMergeResult,
  ApprovedMergeRollbackPlan,
} from "./approved-brain-merge-types";
import { buildApprovedBrainMergeStableKey } from "./approved-brain-merge-types";

export function buildApprovedMergeRollbackPlan(args: {
  request: ApprovedBrainMergeRequest;
  result: ApprovedBrainMergeResult;
}): ApprovedMergeRollbackPlan {
  const changedNodeIds = Array.from(
    new Set([...args.result.addedNodeIds, ...args.result.updatedNodeIds])
  ).sort();
  const changedEdgeIds = Array.from(new Set(args.result.addedEdgeIds)).sort();
  const plan: ApprovedMergeRollbackPlan = {
    id: buildApprovedBrainMergeStableKey("approved-brain-merge-rollback", args.request.id),
    beforeSummary: args.result.beforeSummary,
    afterSummary: args.result.afterSummary,
    changedNodeIds,
    changedEdgeIds,
    recommendedManualRestoreStep:
      "Use the before summary to restore the previous local browser Brain graph snapshot if this approved merge needs manual reversal.",
    approvalWarning:
      "Graph merge happened only after approval; rollback is a manual local restore plan, not an automatic source-file mutation.",
    summary: [],
  };

  return { ...plan, summary: summarizeApprovedMergeRollbackPlan(plan) };
}

export function summarizeApprovedMergeRollbackPlan(
  plan: ApprovedMergeRollbackPlan
): string[] {
  return [
    `Rollback plan covers ${plan.changedNodeIds.length} changed node id(s) and ${plan.changedEdgeIds.length} changed edge id(s).`,
    `Before/after summary: ${plan.beforeSummary.nodeCount} -> ${plan.afterSummary.nodeCount} nodes, ${plan.beforeSummary.edgeCount} -> ${plan.afterSummary.edgeCount} edges.`,
    plan.recommendedManualRestoreStep,
    plan.approvalWarning,
  ];
}
