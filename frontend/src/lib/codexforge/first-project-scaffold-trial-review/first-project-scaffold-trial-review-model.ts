import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstProjectScaffoldTrialReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstProjectScaffoldTrialReviewStableKey };

export const FIRST_PROJECT_SCAFFOLD_TRIAL_REVIEW_LANGUAGE = [
  "First project scaffold trial review",
  "First project scaffold trial review does not store or reuse scaffold outputs automatically",
  "Scaffold trial results require operator approval before reuse",
  "Acceptance",
  "Rejection",
  "Recovery",
  "Hardening",
  "Packaging readiness",
] as const;

const FIRST_PROJECT_SCAFFOLD_TRIAL_REVIEW_ADVANCED_DETAILS = [
  "First project scaffold trial review identity",
  "Acceptance",
  "Rejection",
  "Recovery",
  "Hardening",
  "Packaging readiness",
  "Next recommended action",
  "advanced first project scaffold trial review details collapsed/secondary",
] as const;

export function buildFirstProjectScaffoldTrialReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-project-scaffold-trial-review", input);
}

export function buildFirstProjectScaffoldTrialReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstProjectScaffoldTrialReview({
      idHint: "first-project-scaffold-trial-review",
      status: "blocked",
      identity: "First project scaffold trial review identity: First project scaffold trial review does not store or reuse scaffold outputs automatically. It reviews a future scaffold result before any output can feed another workflow.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Acceptance", items: ["Acceptance: operator checks requested target, generated structure preview, denied action compliance, validation needs, copyright/trademark posture, and reuse limits before accepting a scaffold result."] },
        { label: "Rejection", items: ["Rejection: unsafe paths, unclear template provenance, copied franchise assets, missing approvals, hidden commands, missing rollback, or confusing output should reject the scaffold trial result."] },
        { label: "Recovery", items: ["Recovery: recovery notes must explain partial output handling, cleanup owner, retry conditions, escalation route, and why no retry or cleanup runs from this UI."] },
        { label: "Hardening", items: ["Hardening: hardening readiness covers path allowlists, file write review, command review, runtime review, evidence redaction, result reuse, and operator-facing copy."] },
        { label: "Packaging readiness", items: ["Packaging readiness: package/export is not ready until accepted scaffold output, redacted evidence, license review, rollback notes, and explicit handoff approval exist."] },
      ),
      routes: ["/first-project-scaffold-controlled-trial", "/first-file-write-controlled-trial", "/first-packaging-export-controlled-trial"],
      nextRecommendedAction: "Next recommended action: keep scaffold outputs blocked from storage or reuse until the operator explicitly accepts, rejects, recovers, hardens, or packages the reviewed result.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first project scaffold trial review", FIRST_PROJECT_SCAFFOLD_TRIAL_REVIEW_LANGUAGE, FIRST_PROJECT_SCAFFOLD_TRIAL_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstProjectScaffoldTrialReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstProjectScaffoldTrialReview(model: { firstProjectScaffoldTrialReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First project scaffold trial review", model.firstProjectScaffoldTrialReviews, "Scaffold trial results require operator approval before reuse.");
}

export function buildFirstProjectScaffoldTrialReviewModel() {
  const firstProjectScaffoldTrialReviews = buildFirstProjectScaffoldTrialReviews();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 651",
    title: "First project scaffold trial review",
    summarySubject: "First project scaffold trial review",
    approvalCopy: "Scaffold trial results require operator approval before reuse.",
    subtitle: "Review future scaffold output decisions without storing or reusing outputs automatically.",
    primaryLabel: "Review scaffold result",
    anchor: "first-project-scaffold-trial-review",
    plainEnglishTitle: "Plain-English first project scaffold trial review",
    plainEnglishCopy: "This page is where a future scaffold result would be accepted, rejected, recovered, hardened, or prepared for packaging. It cannot store or reuse scaffold output on its own.",
    language: FIRST_PROJECT_SCAFFOLD_TRIAL_REVIEW_LANGUAGE,
    advancedDetails: [...FIRST_PROJECT_SCAFFOLD_TRIAL_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/first-project-scaffold-controlled-trial", label: "Scaffold trial" },
      { href: "/first-file-write-controlled-trial", label: "File write trial" },
      { href: "/first-packaging-export-controlled-trial", label: "Packaging trial" },
    ],
    packets: firstProjectScaffoldTrialReviews,
    advancedCopy: "advanced first project scaffold trial review details collapsed/secondary. This route does not store scaffold outputs, reuse scaffold outputs automatically, approve reuse, write files, trigger recovery, package exports, mutate memory, or persist approval decisions.",
    dataScope: "first-project-scaffold-trial-review buildFirstProjectScaffoldTrialReviewStableKey FirstProjectScaffoldTrialReviewPanel",
  });
  return { ...model, firstProjectScaffoldTrialReviews };
}
