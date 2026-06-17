import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstLocalRuntimeTrialReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstLocalRuntimeTrialReviewStableKey };

export const FIRST_LOCAL_RUNTIME_TRIAL_REVIEW_LANGUAGE = [
  "First local runtime trial review",
  "First local runtime trial review does not start or stop runtimes",
  "Runtime results require operator review",
  "Runtime evidence",
  "Runtime result",
  "Runtime recovery",
  "Runtime packaging",
  "Runtime handoff readiness",
] as const;

const FIRST_LOCAL_RUNTIME_TRIAL_REVIEW_ADVANCED_DETAILS = [
  "First local runtime trial review identity",
  "Runtime evidence",
  "Runtime result",
  "Runtime recovery",
  "Runtime packaging",
  "Runtime handoff readiness",
  "Next recommended action",
  "advanced first local runtime trial review details collapsed/secondary",
] as const;

export function buildFirstLocalRuntimeTrialReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-local-runtime-trial-review", input);
}

export function buildFirstLocalRuntimeTrialReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstLocalRuntimeTrialReview({
      idHint: "first-local-runtime-trial-review",
      status: "blocked",
      identity: "First local runtime trial review identity: First local runtime trial review does not start or stop runtimes. It reviews future runtime evidence and results before handoff.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Runtime evidence", items: ["Runtime evidence: approved startup packet, port note, process lifecycle note, stop note, redacted logs, and validation signal require operator review."] },
        { label: "Runtime result", items: ["Runtime result: accepted, rejected, failed, timed out, or needs recovery must be selected by the operator before reuse."] },
        { label: "Runtime recovery", items: ["Runtime recovery: stale process handling, port conflict handling, cleanup, retry, rollback, and escalation remain reviewed instructions only."] },
        { label: "Runtime packaging", items: ["Runtime packaging: package readiness needs accepted runtime evidence, reproducible command notes, redacted logs, license review, and explicit handoff approval."] },
        { label: "Runtime handoff readiness", items: ["Runtime handoff readiness: operator-facing summary, known limits, stop instructions, validation status, and next safe route must be reviewed."] },
      ),
      routes: ["/first-local-runtime-controlled-trial", "/first-provider-model-controlled-trial", "/first-packaging-export-controlled-trial"],
      nextRecommendedAction: "Next recommended action: keep runtime results review-only until evidence, result, recovery, packaging, and handoff readiness are approved.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first local runtime trial review", FIRST_LOCAL_RUNTIME_TRIAL_REVIEW_LANGUAGE, FIRST_LOCAL_RUNTIME_TRIAL_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstLocalRuntimeTrialReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstLocalRuntimeTrialReview(model: { firstLocalRuntimeTrialReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First local runtime trial review", model.firstLocalRuntimeTrialReviews, "Runtime results require operator review.");
}

export function buildFirstLocalRuntimeTrialReviewModel() {
  const firstLocalRuntimeTrialReviews = buildFirstLocalRuntimeTrialReviews();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 657",
    title: "First local runtime trial review",
    summarySubject: "First local runtime trial review",
    approvalCopy: "Runtime results require operator review.",
    subtitle: "Review future runtime outcomes without starting or stopping runtimes.",
    primaryLabel: "Review runtime result",
    anchor: "first-local-runtime-trial-review",
    plainEnglishTitle: "Plain-English first local runtime trial review",
    plainEnglishCopy: "This page reviews runtime evidence, results, recovery, packaging, and handoff readiness. It cannot start, stop, probe, or monitor runtimes.",
    language: FIRST_LOCAL_RUNTIME_TRIAL_REVIEW_LANGUAGE,
    advancedDetails: [...FIRST_LOCAL_RUNTIME_TRIAL_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/first-local-runtime-controlled-trial", label: "Runtime trial" },
      { href: "/first-provider-model-controlled-trial", label: "Provider/model trial" },
      { href: "/first-packaging-export-controlled-trial", label: "Packaging trial" },
    ],
    packets: firstLocalRuntimeTrialReviews,
    advancedCopy: "advanced first local runtime trial review details collapsed/secondary. This route does not start runtimes, stop runtimes, store runtime results, reuse runtime results, monitor processes, trigger retry, trigger recovery, package exports, or persist approval decisions.",
    dataScope: "first-local-runtime-trial-review buildFirstLocalRuntimeTrialReviewStableKey FirstLocalRuntimeTrialReviewPanel",
  });
  return { ...model, firstLocalRuntimeTrialReviews };
}
