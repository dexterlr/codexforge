import type { BrainMergeReviewModel } from "@/lib/codexforge/brain-merge";
import type {
  ApprovedBrainMergeBuildArgs,
  ApprovedBrainMergeRequest,
  ApprovedBrainMergeValidationFinding,
} from "./approved-brain-merge-types";
import { buildApprovedBrainMergeStableKey } from "./approved-brain-merge-types";
import {
  summarizeApprovedBrainGraph,
  summarizeApprovedBrainMergeRequest,
  summarizeExpectedApprovedBrainGraph,
} from "./approved-merge-summary";
import { validateApprovedBrainMerge } from "./approved-merge-validation";

function mapMergeValidationFindings(
  validation: BrainMergeReviewModel["validation"] | undefined
): ApprovedBrainMergeValidationFinding[] {
  if (!validation) return [];
  return validation.issues.map((issue) => ({
    id: buildApprovedBrainMergeStableKey("brain-merge-validation", issue),
    issue:
      issue === "unknown-event-type"
        ? "unknown-event-types"
        : issue === "missing-source-refs"
          ? "missing-source-refs"
          : issue === "duplicate-graph-node-target"
            ? "duplicate-node-conflict"
            : issue === "missing-graph-version"
              ? "schema-version-mismatch"
              : "unresolved-blocker-validation-finding",
    severity: "blocker",
    message: `Prior Brain merge validation issue: ${issue}.`,
  }));
}

export function buildApprovedBrainMergeRequest(
  args: ApprovedBrainMergeBuildArgs
): ApprovedBrainMergeRequest {
  const eventIds = args.events
    .filter((event) => event.state === "eligible" && event.type === "memory.promoted")
    .map((event) => event.eventId)
    .sort();
  const beforeSummary = summarizeApprovedBrainGraph(args.graph);
  const addedNodeIds = args.diff.nodesToAdd.map((diff) => diff.node.id);
  const addedEdgeIds = args.diff.edgesToAdd.map((diff) => diff.edge.id);
  const expectedAfterSummary = summarizeExpectedApprovedBrainGraph({
    before: beforeSummary,
    addedNodeIds,
    addedEdgeIds,
  });
  const id = buildApprovedBrainMergeStableKey(
    "approved-brain-merge-request",
    args.graph.version,
    ...eventIds
  );

  return {
    id,
    approved: args.approved,
    approvalNote: args.approvalNote.trim(),
    graphVersion: args.graph.version ?? null,
    eventIds,
    nodeDiffs: args.diff.nodesToAdd,
    nodeUpdateDiffs: args.diff.nodesToUpdate,
    edgeDiffs: args.diff.edgesToAdd,
    validationFindings: mapMergeValidationFindings(args.mergeValidation),
    conflictAcknowledgements: Array.from(
      new Set((args.conflictAcknowledgements ?? []).map((item) => item.trim()).filter(Boolean))
    ).sort(),
    beforeSummary,
    expectedAfterSummary,
    rollbackNote:
      "Rollback plan records before/after summary; manual restore can replace the local browser Brain graph with the prior snapshot.",
  };
}

export function validateApprovedBrainMergeRequest(
  request: ApprovedBrainMergeRequest
) {
  return validateApprovedBrainMerge(request);
}

export { summarizeApprovedBrainMergeRequest };
