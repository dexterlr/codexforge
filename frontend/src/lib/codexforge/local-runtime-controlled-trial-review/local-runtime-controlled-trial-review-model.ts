import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildLocalRuntimeControlledTrialReviewStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildLocalRuntimeControlledTrialReviewStableKey };

export const LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_LANGUAGE = [
  "Local runtime controlled trial review",
  "Local runtime controlled trial review does not start or stop runtimes",
  "Runtime results require operator review",
  "Log checklist",
  "Process checklist",
  "Port checklist",
  "Recovery checklist",
  "Packaging checklist",
] as const;

const LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS = [
  "Local runtime controlled trial review identity",
  "Log checklist",
  "Process checklist",
  "Port checklist",
  "Recovery checklist",
  "Packaging checklist",
  "Next recommended action",
  "advanced local runtime controlled trial review details collapsed/secondary",
] as const;

export function buildLocalRuntimeControlledTrialReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("local-runtime-controlled-trial-review", input);
}

export function buildLocalRuntimeControlledTrialReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildLocalRuntimeControlledTrialReview({
      idHint: "local-runtime-controlled-trial-review",
      status: "blocked",
      identity: "Local runtime controlled trial review identity: local-runtime-controlled-trial-review reviews runtime results without starting, stopping, restarting, probing, packaging, or monitoring runtimes.",
      sections: buildControlledBuilderReviewSections(
        { label: "Log checklist", items: ["Log checklist: startup logs, error logs, redaction, truncation, and evidence reuse require operator review."] },
        { label: "Process checklist", items: ["Process checklist: expected process, lifecycle state, manual stop status, and no automatic process control."] },
        { label: "Port checklist", items: ["Port checklist: expected port, conflict notes, exposure posture, and no local bridge endpoint calls from UI."] },
        { label: "Recovery checklist", items: ["Recovery checklist: failed startup, stuck process, cleanup, rollback, and retry require explicit operator approval."] },
        { label: "Packaging checklist", items: ["Packaging checklist: runtime output cannot feed package/export decisions until result review and explicit approval are complete."] },
      ),
      routes: ["/local-runtime-controlled-trial-plan", "/result-review-boundary", "/packaging-export-controlled-trial-plan"],
      nextRecommendedAction: "Next recommended action: keep runtime results review-only until logs, process, port, recovery, packaging, and reuse decisions are approved.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("local runtime controlled trial review", LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_LANGUAGE, LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildLocalRuntimeControlledTrialReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeLocalRuntimeControlledTrialReview(model: { localRuntimeControlledTrialReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Local runtime controlled trial review", model.localRuntimeControlledTrialReviews, "Runtime results require operator review.");
}

export function buildLocalRuntimeControlledTrialReviewModel() {
  const localRuntimeControlledTrialReviews = buildLocalRuntimeControlledTrialReviews();
  const summary = summarizeLocalRuntimeControlledTrialReview({ localRuntimeControlledTrialReviews });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 644",
    title: "Local runtime controlled trial review",
    summary,
    subtitle: "Review runtime results without starting or stopping runtimes.",
    primaryLabel: "Review runtime result",
    anchor: "local-runtime-controlled-trial-review",
    plainEnglishTitle: "Plain-English local runtime controlled trial review",
    plainEnglishCopy: "This page reviews what a future approved runtime trial produced. It cannot start, stop, restart, probe, package, or monitor a runtime.",
    language: LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_LANGUAGE,
    markers: LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_LANGUAGE,
    links: [
      { href: "/local-runtime-controlled-trial-plan", label: "Runtime plan" },
      { href: "/result-review-boundary", label: "Result boundary" },
      { href: "/packaging-export-controlled-trial-plan", label: "Packaging plan" },
    ],
    packets: localRuntimeControlledTrialReviews,
    advancedSummary: "Advanced local runtime controlled trial review details",
    advancedDetails: [...LOCAL_RUNTIME_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS],
    advancedCopy: "advanced local runtime controlled trial review details collapsed/secondary. This route does not start runtimes, stop runtimes, restart runtimes, probe ports, package outputs, trigger recovery, or store runtime results.",
    dataScope: "local-runtime-controlled-trial-review buildLocalRuntimeControlledTrialReviewStableKey LocalRuntimeControlledTrialReviewPanel",
  });
  return { ...model, localRuntimeControlledTrialReviews };
}
