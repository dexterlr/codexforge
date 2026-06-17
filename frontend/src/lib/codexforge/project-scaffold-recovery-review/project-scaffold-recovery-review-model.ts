import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildProjectScaffoldRecoveryReviewStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildProjectScaffoldRecoveryReviewStableKey };

export const PROJECT_SCAFFOLD_RECOVERY_REVIEW_LANGUAGE = [
  "Project scaffold recovery review",
  "Project scaffold recovery review does not trigger recovery or retry",
  "Recovery actions require explicit operator approval",
  "Rollback checklist",
  "Partial scaffold cleanup",
  "Escalation checklist",
  "Retry checklist",
] as const;

const PROJECT_SCAFFOLD_RECOVERY_REVIEW_ADVANCED_DETAILS = [
  "Project scaffold recovery review identity",
  "Rollback checklist",
  "Partial scaffold cleanup",
  "Escalation checklist",
  "Retry checklist",
  "Next recommended action",
  "advanced project scaffold recovery review details collapsed/secondary",
] as const;

export function buildProjectScaffoldRecoveryReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("project-scaffold-recovery-review", input);
}

export function buildProjectScaffoldRecoveryReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildProjectScaffoldRecoveryReview({
      idHint: "project-scaffold-recovery-review",
      status: "blocked",
      identity: "Project scaffold recovery review identity: project-scaffold-recovery-review lists rollback, cleanup, escalation, and retry review steps without triggering recovery or retry.",
      sections: buildControlledBuilderReviewSections(
        { label: "Rollback checklist", items: ["Rollback checklist: identify affected paths, approved rollback owner, backup evidence, stop conditions, and operator-reviewed rollback steps before any future action."] },
        { label: "Partial scaffold cleanup", items: ["Partial scaffold cleanup: proposed cleanup must list generated folders, files, dependencies, logs, packages, and runtime leftovers without deleting anything from UI."] },
        { label: "Escalation checklist", items: ["Escalation checklist: escalate missing approvals, unsafe paths, command failures, runtime uncertainty, copied protected material, or unclear evidence before retry is considered."] },
        { label: "Retry checklist", items: ["Retry checklist: retry requires root-cause review, changed plan, tighter allowlist, bounded command/runtime approval, and explicit operator approval."] },
      ),
      routes: ["/project-scaffold-result-review", "/recovery-retry-boundary", "/project-scaffold-hardening-pass"],
      nextRecommendedAction: "Next recommended action: keep recovery and retry blocked until an operator approves a specific rollback, cleanup, escalation, or retry plan.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("project scaffold recovery review", PROJECT_SCAFFOLD_RECOVERY_REVIEW_LANGUAGE, PROJECT_SCAFFOLD_RECOVERY_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProjectScaffoldRecoveryReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeProjectScaffoldRecoveryReview(model: { projectScaffoldRecoveryReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Project scaffold recovery review", model.projectScaffoldRecoveryReviews, "Recovery actions require explicit operator approval.");
}

export function buildProjectScaffoldRecoveryReviewModel() {
  const projectScaffoldRecoveryReviews = buildProjectScaffoldRecoveryReviews();
  const summary = summarizeProjectScaffoldRecoveryReview({ projectScaffoldRecoveryReviews });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 637",
    title: "Project scaffold recovery review",
    summary,
    subtitle: "Review recovery and retry options for future scaffolds without triggering recovery.",
    primaryLabel: "Review scaffold recovery",
    anchor: "project-scaffold-recovery-review",
    plainEnglishTitle: "Plain-English scaffold recovery review",
    plainEnglishCopy: "This page explains how a future scaffold failure would be reviewed. It cannot retry, roll back, delete files, or clean up partial work from the UI.",
    language: PROJECT_SCAFFOLD_RECOVERY_REVIEW_LANGUAGE,
    markers: PROJECT_SCAFFOLD_RECOVERY_REVIEW_LANGUAGE,
    links: [
      { href: "/project-scaffold-result-review", label: "Result review" },
      { href: "/recovery-retry-boundary", label: "Recovery boundary" },
      { href: "/project-scaffold-hardening-pass", label: "Hardening pass" },
    ],
    packets: projectScaffoldRecoveryReviews,
    advancedSummary: "Advanced project scaffold recovery review details",
    advancedDetails: [...PROJECT_SCAFFOLD_RECOVERY_REVIEW_ADVANCED_DETAILS],
    advancedCopy: "advanced project scaffold recovery review details collapsed/secondary. This route does not trigger recovery, trigger retry, delete partial scaffolds, roll back files, restart runtimes, or persist recovery decisions.",
    dataScope: "project-scaffold-recovery-review buildProjectScaffoldRecoveryReviewStableKey ProjectScaffoldRecoveryReviewPanel",
  });
  return { ...model, projectScaffoldRecoveryReviews };
}
