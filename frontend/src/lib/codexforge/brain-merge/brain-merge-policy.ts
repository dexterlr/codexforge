import { CODEXFORGE_BRAIN_GRAPH_VERSION } from "@/lib/codexforge/brain/graph/types";
import type { BrainEventQueue, BrainGraphDiffPreview, BrainMergePlan, BrainMergePolicy } from "./brain-merge-types";

export function buildBrainMergePolicy(args: {
  queue: BrainEventQueue;
  diff: BrainGraphDiffPreview;
  plan: BrainMergePlan;
  contradictionRiskAcknowledged?: boolean;
}): BrainMergePolicy {
  const unknownEventTypesBlocked = args.queue.unknownEventCount === 0;
  const approvedPersistedMemoryEventsRequired = args.queue.validEventCount > 0 && args.queue.events.every((event) => event.state === "eligible" || !event.approved);
  const highRisk = args.queue.events.some((event) => event.contradictionRisk >= 0.75);
  const highContradictionRiskAcknowledged = !highRisk || args.contradictionRiskAcknowledged === true;
  const graphSchemaMatches = args.plan.targetGraphVersion === CODEXFORGE_BRAIN_GRAPH_VERSION;
  const duplicateNodeConflictsResolved = args.diff.duplicateRisks.length === 0;
  const reasons = [
    unknownEventTypesBlocked ? "" : "blocked if unknown event types exist",
    approvedPersistedMemoryEventsRequired ? "" : "policy requires approved persisted memory events",
    highContradictionRiskAcknowledged ? "" : "blocked if high contradiction risk not acknowledged",
    graphSchemaMatches ? "" : "blocked if graph schema mismatch",
    duplicateNodeConflictsResolved ? "" : "blocked if duplicate node conflict unresolved",
  ].filter(Boolean);
  const policy: BrainMergePolicy = {
    id: "brain-merge-policy",
    explicitMergeApprovalRequired: true,
    approvedPersistedMemoryEventsRequired: true,
    unknownEventTypesBlocked,
    highContradictionRiskAcknowledged,
    graphSchemaMatches,
    duplicateNodeConflictsResolved,
    allowed: reasons.length === 0,
    reasons,
    summary: [],
  };

  return { ...policy, summary: summarizeBrainMergePolicy(policy) };
}

export function isBrainMergeAllowed(policy: BrainMergePolicy): boolean {
  return policy.allowed === true && policy.explicitMergeApprovalRequired === true;
}

export function summarizeBrainMergePolicy(policy: BrainMergePolicy): string[] {
  return [
    "UI cannot bypass policy; explicit merge approval required.",
    "Only approved persisted memory events are eligible.",
    policy.allowed ? "Policy is clear for future approval review." : `Policy blocks merge: ${policy.reasons.join(", ")}.`,
  ];
}
