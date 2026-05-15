import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import { buildBrainEventQueue } from "./brain-event-loader";
import { buildBrainGraphDiffPreview } from "./brain-graph-diff";
import { buildBrainMergeLedger } from "./brain-merge-ledger";
import { buildBrainMergePlan } from "./brain-merge-plan";
import { buildBrainMergePolicy } from "./brain-merge-policy";
import { validateBrainGraphDiff, validateBrainMergePlan } from "./brain-merge-validation";
import type { BrainMergePersistedEventInput, BrainMergeReviewModel } from "./brain-merge-types";

export function buildBrainMergeReviewModel(args: {
  graph: CodexForgeBrainGraph;
  events: BrainMergePersistedEventInput[];
  contradictionRiskAcknowledged?: boolean;
}): BrainMergeReviewModel {
  const queue = buildBrainEventQueue(args.events);
  const diff = buildBrainGraphDiffPreview(args.graph, queue);
  const plan = buildBrainMergePlan(args.graph, queue, diff);
  const policy = buildBrainMergePolicy({
    queue,
    diff,
    plan,
    contradictionRiskAcknowledged: args.contradictionRiskAcknowledged,
  });
  const planValidation = validateBrainMergePlan(queue, plan);
  const diffValidation = validateBrainGraphDiff(diff);
  const validation = {
    ...planValidation,
    state: planValidation.state === "blocked" || diffValidation.state === "blocked" ? "blocked" : "review",
    issues: Array.from(new Set([...planValidation.issues, ...diffValidation.issues])),
    warnings: Array.from(new Set([...planValidation.warnings, ...diffValidation.warnings])),
  } as const;
  const mergedValidation = {
    ...validation,
    summary: [
      ...planValidation.summary,
      ...diffValidation.summary,
    ],
  };
  const ledger = buildBrainMergeLedger(queue, policy);

  return {
    queue,
    plan,
    diff,
    policy,
    validation: mergedValidation,
    ledger,
    sourceGraph: args.graph,
  };
}

export function summarizeBrainMergeReview(model: BrainMergeReviewModel): string[] {
  return [
    ...model.queue.summary,
    ...model.plan.summary,
    ...model.diff.summary,
    ...model.policy.summary,
    ...model.validation.summary,
    ...model.ledger.summary,
  ];
}
