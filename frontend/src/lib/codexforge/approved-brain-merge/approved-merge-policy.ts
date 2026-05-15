import { CODEXFORGE_BRAIN_GRAPH_VERSION } from "@/lib/codexforge/brain/graph/types";
import type {
  ApprovedBrainMergePolicy,
  ApprovedBrainMergeRequest,
  ApprovedBrainMergeValidation,
} from "./approved-brain-merge-types";

export function buildApprovedBrainMergePolicy(args: {
  request: ApprovedBrainMergeRequest;
  validation: ApprovedBrainMergeValidation;
  unknownEventCount?: number;
  highContradictionRisk?: boolean;
}): ApprovedBrainMergePolicy {
  const allNodeDiffs = [...args.request.nodeDiffs, ...args.request.nodeUpdateDiffs];
  const graphDiffPreviewRequired = allNodeDiffs.length + args.request.edgeDiffs.length > 0;
  const unknownEventTypesBlocked = (args.unknownEventCount ?? 0) === 0;
  const unresolvedBlockersBlocked = !args.validation.findings.some((finding) => finding.severity === "blocker");
  const schemaMatches = args.request.graphVersion === CODEXFORGE_BRAIN_GRAPH_VERSION;
  const duplicateNodeConflictsResolved = !args.validation.findings.some((finding) => finding.issue === "duplicate-node-conflict" && finding.severity === "blocker");
  const duplicateEdgeConflictsResolved = !args.validation.findings.some((finding) => finding.issue === "duplicate-edge-conflict" && finding.severity === "blocker");
  const sourceRefsExist =
    allNodeDiffs.every((diff) => diff.sourceRefs.length > 0) &&
    args.request.edgeDiffs.every((diff) => diff.sourceRefs.length > 0);
  const highContradictionRiskAcknowledged =
    !args.highContradictionRisk || args.request.conflictAcknowledgements.includes("high-contradiction-risk");
  const validPromotedMemoryEventsOnly =
    args.request.eventIds.length > 0 && unknownEventTypesBlocked;
  const reasons = [
    args.request.approved ? "" : "explicit merge approval required",
    graphDiffPreviewRequired ? "" : "policy requires graph diff preview",
    validPromotedMemoryEventsOnly ? "" : "valid memory.promoted events only",
    unknownEventTypesBlocked ? "" : "policy blocks unknown event types",
    unresolvedBlockersBlocked ? "" : "no unresolved blocker validation findings",
    schemaMatches ? "" : "canonical graph schema mismatch",
    highContradictionRiskAcknowledged ? "" : "high contradiction risk acknowledgement required",
    duplicateNodeConflictsResolved ? "" : "duplicate node conflicts must be resolved or safely deduped",
    duplicateEdgeConflictsResolved ? "" : "duplicate edge conflicts must be resolved or safely deduped",
    sourceRefsExist ? "" : "source refs must exist",
  ].filter(Boolean);
  const policy: ApprovedBrainMergePolicy = {
    id: "approved-brain-merge-policy",
    explicitMergeApprovalRequired: true,
    graphDiffPreviewRequired: true,
    validPromotedMemoryEventsOnly,
    unknownEventTypesBlocked,
    unresolvedBlockersBlocked,
    schemaMatches,
    highContradictionRiskAcknowledged,
    duplicateNodeConflictsResolved,
    duplicateEdgeConflictsResolved,
    sourceRefsExist,
    canonicalGraphTypesRequired: true,
    allowed: reasons.length === 0,
    reasons,
    summary: [],
  };

  return { ...policy, summary: summarizeApprovedBrainMergePolicy(policy) };
}

export function isApprovedBrainMergeAllowed(
  policy: ApprovedBrainMergePolicy
): boolean {
  return (
    policy.allowed === true &&
    policy.explicitMergeApprovalRequired === true &&
    policy.graphDiffPreviewRequired === true &&
    policy.canonicalGraphTypesRequired === true
  );
}

export function summarizeApprovedBrainMergePolicy(
  policy: ApprovedBrainMergePolicy
): string[] {
  return [
    "Approved Brain merge policy requires explicit merge approval, graph diff preview, and canonical graph schema.",
    "Policy blocks unknown event types, missing source refs, unresolved blockers, schema mismatch, and unsafe duplicate conflicts.",
    policy.allowed
      ? "Policy allows guarded local merge apply."
      : `Policy blocks apply: ${policy.reasons.join(", ")}.`,
  ];
}
