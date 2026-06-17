import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildUniversalBuilderRecoveryReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildUniversalBuilderRecoveryReviewStableKey };

export const UNIVERSAL_BUILDER_RECOVERY_REVIEW_LANGUAGE = [
  "Universal builder recovery review",
  "Universal builder recovery review does not trigger recovery or retry",
  "Builder recovery actions require explicit operator approval",
  "Recovery checklist",
  "Rollback checklist",
  "Retry checklist",
  "Escalation checklist",
  "Coding/project builder recovery",
  "Creative/video recovery",
  "Research/live research recovery",
  "Chatbot/agent recovery",
  "Monitoring/automation recovery",
  "Video-call/meeting recovery",
  "Connector workflow recovery",
  "Game/server builder recovery",
] as const;

const UNIVERSAL_BUILDER_RECOVERY_REVIEW_ADVANCED_DETAILS = [
  "Universal builder recovery review identity",
  "Recovery checklist",
  "Rollback checklist",
  "Retry checklist",
  "Escalation checklist",
  "Workflow profile recovery checklist",
  "Next recommended action",
  "advanced universal builder recovery review details collapsed/secondary",
] as const;

export function buildUniversalBuilderRecoveryReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("universal-builder-recovery-review", input);
}

export function buildUniversalBuilderRecoveryReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildUniversalBuilderRecoveryReview({
      idHint: "universal-builder-recovery-review",
      status: "blocked",
      identity: "Universal builder recovery review identity: Universal builder recovery review does not trigger recovery or retry. It reviews rollback, retry, and escalation actions before approval.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Recovery checklist", items: ["Recovery checklist: identify failure class, affected workflow, operator impact, evidence needed, safe next route, and why no recovery runs from UI."] },
        { label: "Rollback checklist", items: ["Rollback checklist: rollback target, cleanup owner, data retention, artifact removal, connector reversal, package recall, and no automatic rollback."] },
        { label: "Retry checklist", items: ["Retry checklist: changed inputs, changed timeout, changed provider/connector/runtime scope, rate limits, approval packet, and no automatic retry."] },
        { label: "Escalation checklist", items: ["Escalation checklist: human owner, blocked reason, missing boundary, privacy risk, safety risk, copyright/trademark risk, and handoff note."] },
        { label: "Workflow profile recovery checklist", items: ["Workflow profile recovery checklist: coding/project builder, creative/video, research/live research, chatbot/agent, monitoring/automation, video-call/meeting, connector workflow, and game/server builder recovery each require explicit operator approval."] },
      ),
      routes: ["/universal-builder-evidence-review", "/universal-builder-result-review", "/universal-builder-mvp-candidate"],
      nextRecommendedAction: "Next recommended action: keep recovery actions blocked until recovery, rollback, retry, escalation, and workflow profile decisions are explicitly approved.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("universal builder recovery review", UNIVERSAL_BUILDER_RECOVERY_REVIEW_LANGUAGE, UNIVERSAL_BUILDER_RECOVERY_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildUniversalBuilderRecoveryReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeUniversalBuilderRecoveryReview(model: { universalBuilderRecoveryReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("Universal builder recovery review", model.universalBuilderRecoveryReviews, "Builder recovery actions require explicit operator approval.");
}

export function buildUniversalBuilderRecoveryReviewModel() {
  const universalBuilderRecoveryReviews = buildUniversalBuilderRecoveryReviews();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 664",
    title: "Universal builder recovery review",
    summarySubject: "Universal builder recovery review",
    approvalCopy: "Builder recovery actions require explicit operator approval.",
    subtitle: "Review builder recovery decisions without triggering recovery or retry.",
    primaryLabel: "Review builder recovery",
    anchor: "universal-builder-recovery-review",
    plainEnglishTitle: "Plain-English universal builder recovery review",
    plainEnglishCopy: "This page reviews recovery, rollback, retry, and escalation across builder workflow profiles. It cannot trigger recovery or retry.",
    language: UNIVERSAL_BUILDER_RECOVERY_REVIEW_LANGUAGE,
    advancedDetails: [...UNIVERSAL_BUILDER_RECOVERY_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/universal-builder-evidence-review", label: "Builder evidence review" },
      { href: "/universal-builder-result-review", label: "Builder result review" },
      { href: "/universal-builder-mvp-candidate", label: "Builder MVP candidate" },
    ],
    packets: universalBuilderRecoveryReviews,
    advancedCopy: "advanced universal builder recovery review details collapsed/secondary. This route does not trigger recovery, trigger retry, roll back files, stop runtimes, call providers, mutate connectors, create automations, package exports, store outputs, or persist approval decisions.",
    dataScope: "universal-builder-recovery-review buildUniversalBuilderRecoveryReviewStableKey UniversalBuilderRecoveryReviewPanel",
  });
  return { ...model, universalBuilderRecoveryReviews };
}
