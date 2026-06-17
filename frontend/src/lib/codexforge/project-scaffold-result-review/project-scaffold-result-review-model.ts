import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildProjectScaffoldResultReviewStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildProjectScaffoldResultReviewStableKey };

export const PROJECT_SCAFFOLD_RESULT_REVIEW_LANGUAGE = [
  "Project scaffold result review",
  "Project scaffold result review does not store or reuse scaffold outputs automatically",
  "Scaffold results require operator approval before reuse",
  "Acceptance checklist",
  "Rejection checklist",
  "Reuse checklist",
  "Safety checklist",
] as const;

const PROJECT_SCAFFOLD_RESULT_REVIEW_ADVANCED_DETAILS = [
  "Project scaffold result review identity",
  "Acceptance checklist",
  "Rejection checklist",
  "Reuse checklist",
  "Safety checklist",
  "Next recommended action",
  "advanced project scaffold result review details collapsed/secondary",
] as const;

export function buildProjectScaffoldResultReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("project-scaffold-result-review", input);
}

export function buildProjectScaffoldResultReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildProjectScaffoldResultReview({
      idHint: "project-scaffold-result-review",
      status: "blocked",
      identity: "Project scaffold result review identity: project-scaffold-result-review prepares result acceptance, rejection, reuse, and safety checks without storing or reusing scaffold outputs automatically.",
      sections: buildControlledBuilderReviewSections(
        { label: "Acceptance checklist", items: ["Acceptance checklist: target type matches request, file tree is bounded, template provenance is reviewed, safety gates are clear, and no execution claim is made."] },
        { label: "Rejection checklist", items: ["Rejection checklist: reject outputs with unsafe paths, missing approvals, copied protected material, unreviewed commands, live endpoint values, or unclear rollback posture."] },
        { label: "Reuse checklist", items: ["Reuse checklist: scaffold outputs require operator approval before reuse in future plans, templates, tests, packages, research, chatbots, automations, or game/server builds."] },
        { label: "Safety checklist", items: ["Safety checklist: no secrets, no token values, no provider output persistence, no connector data storage, no memory auto-promotion, and no Brain graph mutation."] },
      ),
      routes: ["/project-scaffold-evidence-review", "/result-review-boundary", "/project-scaffold-recovery-review"],
      nextRecommendedAction: "Next recommended action: keep scaffold outputs review-only until an operator accepts, rejects, or approves reuse with bounded evidence.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("project scaffold result review", PROJECT_SCAFFOLD_RESULT_REVIEW_LANGUAGE, PROJECT_SCAFFOLD_RESULT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProjectScaffoldResultReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeProjectScaffoldResultReview(model: { projectScaffoldResultReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Project scaffold result review", model.projectScaffoldResultReviews, "Scaffold results require operator approval before reuse.");
}

export function buildProjectScaffoldResultReviewModel() {
  const projectScaffoldResultReviews = buildProjectScaffoldResultReviews();
  const summary = summarizeProjectScaffoldResultReview({ projectScaffoldResultReviews });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 636",
    title: "Project scaffold result review",
    summary,
    subtitle: "Review scaffold outputs before acceptance or reuse without storing anything automatically.",
    primaryLabel: "Review scaffold result",
    anchor: "project-scaffold-result-review",
    plainEnglishTitle: "Plain-English scaffold result review",
    plainEnglishCopy: "This page prepares a human review step for future scaffold results. Nothing is accepted, stored, reused, or promoted until an operator approves it.",
    language: PROJECT_SCAFFOLD_RESULT_REVIEW_LANGUAGE,
    markers: PROJECT_SCAFFOLD_RESULT_REVIEW_LANGUAGE,
    links: [
      { href: "/project-scaffold-evidence-review", label: "Evidence review" },
      { href: "/result-review-boundary", label: "Result boundary" },
      { href: "/project-scaffold-recovery-review", label: "Recovery review" },
    ],
    packets: projectScaffoldResultReviews,
    advancedSummary: "Advanced project scaffold result review details",
    advancedDetails: [...PROJECT_SCAFFOLD_RESULT_REVIEW_ADVANCED_DETAILS],
    advancedCopy: "advanced project scaffold result review details collapsed/secondary. This route does not store scaffold outputs, reuse scaffold outputs, persist approvals, promote memory, export results, or apply file writes.",
    dataScope: "project-scaffold-result-review buildProjectScaffoldResultReviewStableKey ProjectScaffoldResultReviewPanel",
  });
  return { ...model, projectScaffoldResultReviews };
}
