import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstFileWriteTrialReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstFileWriteTrialReviewStableKey };

export const FIRST_FILE_WRITE_TRIAL_REVIEW_LANGUAGE = [
  "First file write trial review",
  "First file write trial review does not apply or persist file writes",
  "File write trial outputs require operator review",
  "File-write evidence",
  "File-write result",
  "File-write recovery",
  "Packaging readiness",
] as const;

const FIRST_FILE_WRITE_TRIAL_REVIEW_ADVANCED_DETAILS = [
  "First file write trial review identity",
  "File-write evidence",
  "File-write result",
  "File-write recovery",
  "Packaging readiness",
  "Next recommended action",
  "advanced first file write trial review details collapsed/secondary",
] as const;

export function buildFirstFileWriteTrialReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-file-write-trial-review", input);
}

export function buildFirstFileWriteTrialReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstFileWriteTrialReview({
      idHint: "first-file-write-trial-review",
      status: "blocked",
      identity: "First file write trial review identity: First file write trial review does not apply or persist file writes. It reviews future write outputs before any result can be reused.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "File-write evidence", items: ["File-write evidence: path decision, diff preview, operator approval note, validation plan, rollback note, and redacted logs remain review-only and manually supplied."] },
        { label: "File-write result", items: ["File-write result: accepted, rejected, needs recovery, or blocked status must be chosen by the operator before the output can inform another workflow."] },
        { label: "File-write recovery", items: ["File-write recovery: rollback, retry, cleanup, partial output, and escalation are reviewed as instructions only; no recovery action is triggered."] },
        { label: "Packaging readiness", items: ["Packaging readiness: package/export requires accepted result evidence, redaction/license review, reproducibility notes, and explicit handoff approval."] },
      ),
      routes: ["/first-file-write-controlled-trial", "/first-packaging-export-controlled-trial", "/universal-builder-recovery-review"],
      nextRecommendedAction: "Next recommended action: keep file write outputs unpersisted and unreused until the operator completes evidence, result, recovery, and packaging readiness review.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first file write trial review", FIRST_FILE_WRITE_TRIAL_REVIEW_LANGUAGE, FIRST_FILE_WRITE_TRIAL_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstFileWriteTrialReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstFileWriteTrialReview(model: { firstFileWriteTrialReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First file write trial review", model.firstFileWriteTrialReviews, "File write trial outputs require operator review.");
}

export function buildFirstFileWriteTrialReviewModel() {
  const firstFileWriteTrialReviews = buildFirstFileWriteTrialReviews();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 653",
    title: "First file write trial review",
    summarySubject: "First file write trial review",
    approvalCopy: "File write trial outputs require operator review.",
    subtitle: "Review future file write evidence and results without applying or persisting writes.",
    primaryLabel: "Review file write output",
    anchor: "first-file-write-trial-review",
    plainEnglishTitle: "Plain-English first file write trial review",
    plainEnglishCopy: "This page explains how a future file write output would be checked before reuse. It cannot apply, persist, package, or reuse file writes automatically.",
    language: FIRST_FILE_WRITE_TRIAL_REVIEW_LANGUAGE,
    advancedDetails: [...FIRST_FILE_WRITE_TRIAL_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/first-file-write-controlled-trial", label: "File write trial" },
      { href: "/first-packaging-export-controlled-trial", label: "Packaging trial" },
      { href: "/universal-builder-recovery-review", label: "Builder recovery review" },
    ],
    packets: firstFileWriteTrialReviews,
    advancedCopy: "advanced first file write trial review details collapsed/secondary. This route does not apply file writes, persist file writes, store outputs, reuse outputs, trigger rollback, trigger retry, package exports, mutate memory, or persist approval decisions.",
    dataScope: "first-file-write-trial-review buildFirstFileWriteTrialReviewStableKey FirstFileWriteTrialReviewPanel",
  });
  return { ...model, firstFileWriteTrialReviews };
}
