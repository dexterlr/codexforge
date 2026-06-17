import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildUniversalBuilderResultReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildUniversalBuilderResultReviewStableKey };

export const UNIVERSAL_BUILDER_RESULT_REVIEW_LANGUAGE = [
  "Universal builder result review",
  "Universal builder result review does not store or reuse outputs automatically",
  "Builder results require operator approval before reuse",
  "Acceptance checklist",
  "Rejection checklist",
  "Reuse checklist",
  "Privacy checklist",
  "Safety checklist",
  "Coding/project builder",
  "Creative/video",
  "Research/live research",
  "Chatbot/agent",
  "Monitoring/automation",
  "Video-call/meeting",
  "Connector workflows",
  "Game/server builder",
] as const;

const UNIVERSAL_BUILDER_RESULT_REVIEW_ADVANCED_DETAILS = [
  "Universal builder result review identity",
  "Acceptance checklist",
  "Rejection checklist",
  "Reuse checklist",
  "Privacy checklist",
  "Safety checklist",
  "Workflow profile checklist",
  "Next recommended action",
  "advanced universal builder result review details collapsed/secondary",
] as const;

export function buildUniversalBuilderResultReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("universal-builder-result-review", input);
}

export function buildUniversalBuilderResultReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildUniversalBuilderResultReview({
      idHint: "universal-builder-result-review",
      status: "blocked",
      identity: "Universal builder result review identity: Universal builder result review does not store or reuse outputs automatically. It reviews builder results across workflow profiles before any reuse.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Acceptance checklist", items: ["Acceptance checklist: operator confirms requested outcome, evidence fit, safety posture, validation need, privacy limits, and downstream reuse permission."] },
        { label: "Rejection checklist", items: ["Rejection checklist: reject unsafe paths, unreviewed connector data, unredacted logs, copied franchise assets, hidden execution, unclear provenance, or missing approval."] },
        { label: "Reuse checklist", items: ["Reuse checklist: no result can feed file writes, commands, provider prompts, connectors, automations, packages, memory, or future builders without approval."] },
        { label: "Privacy checklist", items: ["Privacy checklist: remove personal data, secrets, private paths, connector payloads, account identifiers, endpoint values, and excessive logs before reuse."] },
        { label: "Safety checklist", items: ["Safety checklist: review coding/project builder, creative/video, research/live research, chatbot/agent, monitoring/automation, video-call/meeting, connector workflows, and game/server builder outputs."] },
      ),
      routes: ["/universal-builder-evidence-review", "/universal-builder-recovery-review", "/universal-builder-mvp-candidate"],
      nextRecommendedAction: "Next recommended action: keep builder results unpersisted and unreused until acceptance, rejection, reuse, privacy, and safety decisions are approved.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("universal builder result review", UNIVERSAL_BUILDER_RESULT_REVIEW_LANGUAGE, UNIVERSAL_BUILDER_RESULT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildUniversalBuilderResultReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeUniversalBuilderResultReview(model: { universalBuilderResultReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("Universal builder result review", model.universalBuilderResultReviews, "Builder results require operator approval before reuse.");
}

export function buildUniversalBuilderResultReviewModel() {
  const universalBuilderResultReviews = buildUniversalBuilderResultReviews();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 663",
    title: "Universal builder result review",
    summarySubject: "Universal builder result review",
    approvalCopy: "Builder results require operator approval before reuse.",
    subtitle: "Review builder result decisions without storing or reusing outputs automatically.",
    primaryLabel: "Review builder results",
    anchor: "universal-builder-result-review",
    plainEnglishTitle: "Plain-English universal builder result review",
    plainEnglishCopy: "This page explains how universal builder outputs would be accepted, rejected, reused, redacted, and safety-checked across all workflow profiles. It cannot store or reuse outputs automatically.",
    language: UNIVERSAL_BUILDER_RESULT_REVIEW_LANGUAGE,
    advancedDetails: [...UNIVERSAL_BUILDER_RESULT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/universal-builder-evidence-review", label: "Builder evidence review" },
      { href: "/universal-builder-recovery-review", label: "Builder recovery review" },
      { href: "/universal-builder-mvp-candidate", label: "Builder MVP candidate" },
    ],
    packets: universalBuilderResultReviews,
    advancedCopy: "advanced universal builder result review details collapsed/secondary. This route does not store outputs, reuse outputs, promote memory, write files, call providers, fetch connector data, create automations, package exports, trigger recovery, or persist approval decisions.",
    dataScope: "universal-builder-result-review buildUniversalBuilderResultReviewStableKey UniversalBuilderResultReviewPanel",
  });
  return { ...model, universalBuilderResultReviews };
}
