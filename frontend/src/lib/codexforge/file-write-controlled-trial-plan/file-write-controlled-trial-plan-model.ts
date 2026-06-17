import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFileWriteControlledTrialPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildFileWriteControlledTrialPlanStableKey };

export const FILE_WRITE_CONTROLLED_TRIAL_PLAN_LANGUAGE = [
  "File write controlled trial plan",
  "File write controlled trial plan does not write files",
  "File write controlled trials require explicit operator approval",
  "Path allowlist/denylist",
  "Diff preview",
  "Rollback checklist",
  "Audit checklist",
] as const;

const FILE_WRITE_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS = [
  "File write controlled trial plan identity",
  "Path allowlist/denylist",
  "Diff preview",
  "Rollback checklist",
  "Audit checklist",
  "Next recommended action",
  "advanced file write controlled trial plan details collapsed/secondary",
] as const;

export function buildFileWriteControlledTrialPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("file-write-controlled-trial-plan", input);
}

export function buildFileWriteControlledTrialPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildFileWriteControlledTrialPlan({
      idHint: "file-write-controlled-trial-plan",
      status: "blocked",
      identity: "File write controlled trial plan identity: file-write-controlled-trial-plan plans a future controlled file write without writing, deleting, moving, renaming, exporting, downloading, or applying patches.",
      sections: buildControlledBuilderReviewSections(
        { label: "Path allowlist/denylist", items: ["Path allowlist/denylist: exact workspace root, target path, denied paths, generated file scope, and no arbitrary path crawling must be reviewed."] },
        { label: "Diff preview", items: ["Diff preview: proposed additions, edits, deletes, generated content source, and human-readable impact summary must be visible before approval."] },
        { label: "Rollback checklist", items: ["Rollback checklist: backup posture, reverse diff, owner, stop condition, and manual recovery notes must be ready before any future write."] },
        { label: "Audit checklist", items: ["Audit checklist: request, operator approval, target path, diff, result review, evidence review, and recovery handoff must be recorded by an approved boundary, not this UI."] },
      ),
      routes: ["/file-write-approval-boundary", "/file-write-controlled-trial-review", "/project-scaffold-hardening-pass"],
      nextRecommendedAction: "Next recommended action: keep file writes blocked until path scope, diff preview, rollback, audit, and explicit operator approval are complete.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("file write controlled trial plan", FILE_WRITE_CONTROLLED_TRIAL_PLAN_LANGUAGE, FILE_WRITE_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFileWriteControlledTrialPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeFileWriteControlledTrialPlan(model: { fileWriteControlledTrialPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("File write controlled trial plan", model.fileWriteControlledTrialPlans, "File write controlled trials require explicit operator approval.");
}

export function buildFileWriteControlledTrialPlanModel() {
  const fileWriteControlledTrialPlans = buildFileWriteControlledTrialPlans();
  const summary = summarizeFileWriteControlledTrialPlan({ fileWriteControlledTrialPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 639",
    title: "File write controlled trial plan",
    summary,
    subtitle: "Plan a future controlled file write without writing files.",
    primaryLabel: "Review file write plan",
    anchor: "file-write-controlled-trial-plan",
    plainEnglishTitle: "Plain-English file write controlled trial plan",
    plainEnglishCopy: "This page shows what a future file write trial must prove before it can be approved. It does not write files or apply patches.",
    language: FILE_WRITE_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    markers: FILE_WRITE_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    links: [
      { href: "/file-write-approval-boundary", label: "File write boundary" },
      { href: "/file-write-controlled-trial-review", label: "File write review" },
      { href: "/project-scaffold-hardening-pass", label: "Scaffold hardening" },
    ],
    packets: fileWriteControlledTrialPlans,
    advancedSummary: "Advanced file write controlled trial plan details",
    advancedDetails: [...FILE_WRITE_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced file write controlled trial plan details collapsed/secondary. This route does not write files, delete files, move files, rename files, export files, download files, or apply patches.",
    dataScope: "file-write-controlled-trial-plan buildFileWriteControlledTrialPlanStableKey FileWriteControlledTrialPlanPanel",
  });
  return { ...model, fileWriteControlledTrialPlans };
}
