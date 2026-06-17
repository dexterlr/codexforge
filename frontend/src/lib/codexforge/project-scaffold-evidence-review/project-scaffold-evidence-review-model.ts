import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildProjectScaffoldEvidenceReviewStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildProjectScaffoldEvidenceReviewStableKey };

export const PROJECT_SCAFFOLD_EVIDENCE_REVIEW_LANGUAGE = [
  "Project scaffold evidence review",
  "Project scaffold evidence review does not capture or ingest evidence automatically",
  "Scaffold evidence requires operator review before use",
  "File-tree evidence",
  "Template evidence",
  "Redaction checklist",
] as const;

const PROJECT_SCAFFOLD_EVIDENCE_REVIEW_ADVANCED_DETAILS = [
  "Project scaffold evidence review identity",
  "File-tree evidence",
  "Template evidence",
  "Command/runtime evidence",
  "Redaction checklist",
  "Next recommended action",
  "advanced project scaffold evidence review details collapsed/secondary",
] as const;

export function buildProjectScaffoldEvidenceReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("project-scaffold-evidence-review", input);
}

export function buildProjectScaffoldEvidenceReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildProjectScaffoldEvidenceReview({
      idHint: "project-scaffold-evidence-review",
      status: "blocked",
      identity: "Project scaffold evidence review identity: project-scaffold-evidence-review prepares evidence review for future scaffolds without capturing, ingesting, storing, scanning, or reusing evidence automatically.",
      sections: buildControlledBuilderReviewSections(
        { label: "File-tree evidence", items: ["File-tree evidence: proposed folders, file names, ownership, generated-vs-template source, and path boundary notes must be reviewed before use."] },
        { label: "Template evidence", items: ["Template evidence: template source, license posture, provenance, copied text risk, dependency notes, and project-fit rationale require operator review."] },
        { label: "Command/runtime evidence", items: ["Command/runtime evidence: setup command previews, expected runtime ports, lifecycle notes, logs, and stop plans remain pasted or reviewed by the operator only."] },
        { label: "Redaction checklist", items: ["Redaction checklist: remove secrets, tokens, endpoint values, private paths, account data, prompt-sensitive data, copyrighted assets, and live outputs before evidence is reused."] },
      ),
      routes: ["/project-scaffold-dry-run-plan", "/evidence-capture-boundary", "/project-scaffold-result-review"],
      nextRecommendedAction: "Next recommended action: require operator review before scaffold evidence influences any future scaffold, result, recovery, or package decision.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("project scaffold evidence review", PROJECT_SCAFFOLD_EVIDENCE_REVIEW_LANGUAGE, PROJECT_SCAFFOLD_EVIDENCE_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProjectScaffoldEvidenceReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeProjectScaffoldEvidenceReview(model: { projectScaffoldEvidenceReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Project scaffold evidence review", model.projectScaffoldEvidenceReviews, "Scaffold evidence requires operator review before use.");
}

export function buildProjectScaffoldEvidenceReviewModel() {
  const projectScaffoldEvidenceReviews = buildProjectScaffoldEvidenceReviews();
  const summary = summarizeProjectScaffoldEvidenceReview({ projectScaffoldEvidenceReviews });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 635",
    title: "Project scaffold evidence review",
    summary,
    subtitle: "Review scaffold evidence before use without capturing or ingesting evidence automatically.",
    primaryLabel: "Review scaffold evidence",
    anchor: "project-scaffold-evidence-review",
    plainEnglishTitle: "Plain-English scaffold evidence review",
    plainEnglishCopy: "This page explains what evidence a future scaffold would need and what must be redacted before an operator can use it. It does not gather evidence on its own.",
    language: PROJECT_SCAFFOLD_EVIDENCE_REVIEW_LANGUAGE,
    markers: PROJECT_SCAFFOLD_EVIDENCE_REVIEW_LANGUAGE,
    links: [
      { href: "/project-scaffold-dry-run-plan", label: "Scaffold plan" },
      { href: "/evidence-capture-boundary", label: "Evidence boundary" },
      { href: "/project-scaffold-result-review", label: "Result review" },
    ],
    packets: projectScaffoldEvidenceReviews,
    advancedSummary: "Advanced project scaffold evidence review details",
    advancedDetails: [...PROJECT_SCAFFOLD_EVIDENCE_REVIEW_ADVANCED_DETAILS],
    advancedCopy: "advanced project scaffold evidence review details collapsed/secondary. This route does not capture evidence, ingest file trees, scan templates, run commands, start runtimes, store evidence, or reuse scaffold evidence automatically.",
    dataScope: "project-scaffold-evidence-review buildProjectScaffoldEvidenceReviewStableKey ProjectScaffoldEvidenceReviewPanel",
  });
  return { ...model, projectScaffoldEvidenceReviews };
}
