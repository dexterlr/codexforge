import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFileWriteControlledTrialReviewStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildFileWriteControlledTrialReviewStableKey };

export const FILE_WRITE_CONTROLLED_TRIAL_REVIEW_LANGUAGE = [
  "File write controlled trial review",
  "File write controlled trial review does not apply file writes",
  "Controlled file writes require explicit operator approval",
  "Result checklist",
  "Evidence checklist",
  "Recovery checklist",
  "Reuse checklist",
] as const;

const FILE_WRITE_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS = [
  "File write controlled trial review identity",
  "Result checklist",
  "Evidence checklist",
  "Recovery checklist",
  "Reuse checklist",
  "Next recommended action",
  "advanced file write controlled trial review details collapsed/secondary",
] as const;

export function buildFileWriteControlledTrialReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("file-write-controlled-trial-review", input);
}

export function buildFileWriteControlledTrialReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildFileWriteControlledTrialReview({
      idHint: "file-write-controlled-trial-review",
      status: "blocked",
      identity: "File write controlled trial review identity: file-write-controlled-trial-review reviews planned file write outcomes without applying file writes, storing outputs, or approving reuse automatically.",
      sections: buildControlledBuilderReviewSections(
        { label: "Result checklist", items: ["Result checklist: expected changed paths, diff status, validation need, operator acceptance, and no automatic result storage."] },
        { label: "Evidence checklist", items: ["Evidence checklist: path evidence, diff evidence, template evidence, command evidence, and redacted logs require operator review before use."] },
        { label: "Recovery checklist", items: ["Recovery checklist: rollback notes, failed write handling, partial result review, retry gates, and escalation owner remain approval required."] },
        { label: "Reuse checklist", items: ["Reuse checklist: controlled file write outputs cannot feed future scaffold, package, memory, or automation work without operator approval."] },
      ),
      routes: ["/file-write-controlled-trial-plan", "/result-review-boundary", "/recovery-retry-boundary"],
      nextRecommendedAction: "Next recommended action: keep controlled file write results review-only until result, evidence, recovery, and reuse decisions are explicitly approved.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("file write controlled trial review", FILE_WRITE_CONTROLLED_TRIAL_REVIEW_LANGUAGE, FILE_WRITE_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFileWriteControlledTrialReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeFileWriteControlledTrialReview(model: { fileWriteControlledTrialReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("File write controlled trial review", model.fileWriteControlledTrialReviews, "Controlled file writes require explicit operator approval.");
}

export function buildFileWriteControlledTrialReviewModel() {
  const fileWriteControlledTrialReviews = buildFileWriteControlledTrialReviews();
  const summary = summarizeFileWriteControlledTrialReview({ fileWriteControlledTrialReviews });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 640",
    title: "File write controlled trial review",
    summary,
    subtitle: "Review controlled file write outcomes without applying file writes.",
    primaryLabel: "Review file write result",
    anchor: "file-write-controlled-trial-review",
    plainEnglishTitle: "Plain-English file write controlled trial review",
    plainEnglishCopy: "This page is the review step for a future controlled file write. It cannot apply the write or reuse the output on its own.",
    language: FILE_WRITE_CONTROLLED_TRIAL_REVIEW_LANGUAGE,
    markers: FILE_WRITE_CONTROLLED_TRIAL_REVIEW_LANGUAGE,
    links: [
      { href: "/file-write-controlled-trial-plan", label: "File write plan" },
      { href: "/result-review-boundary", label: "Result boundary" },
      { href: "/recovery-retry-boundary", label: "Recovery boundary" },
    ],
    packets: fileWriteControlledTrialReviews,
    advancedSummary: "Advanced file write controlled trial review details",
    advancedDetails: [...FILE_WRITE_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS],
    advancedCopy: "advanced file write controlled trial review details collapsed/secondary. This route does not apply file writes, persist outputs, approve reuse, trigger rollback, trigger retry, or mutate files.",
    dataScope: "file-write-controlled-trial-review buildFileWriteControlledTrialReviewStableKey FileWriteControlledTrialReviewPanel",
  });
  return { ...model, fileWriteControlledTrialReviews };
}
