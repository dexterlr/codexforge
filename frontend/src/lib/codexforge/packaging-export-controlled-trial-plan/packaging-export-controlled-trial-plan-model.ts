import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildPackagingExportControlledTrialPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildPackagingExportControlledTrialPlanStableKey };

export const PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_LANGUAGE = [
  "Packaging/export controlled trial plan",
  "Packaging/export controlled trial plan does not create packages or exports",
  "Packaging/export requires explicit operator approval",
  "Bundle checklist",
  "Destination checklist",
  "Redaction/license checklist",
  "Rollback checklist",
] as const;

const PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS = [
  "Packaging/export controlled trial plan identity",
  "Bundle checklist",
  "Destination checklist",
  "Redaction/license checklist",
  "Rollback checklist",
  "Next recommended action",
  "advanced packaging/export controlled trial plan details collapsed/secondary",
] as const;

export function buildPackagingExportControlledTrialPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("packaging-export-controlled-trial-plan", input);
}

export function buildPackagingExportControlledTrialPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildPackagingExportControlledTrialPlan({
      idHint: "packaging-export-controlled-trial-plan",
      status: "blocked",
      identity: "Packaging/export controlled trial plan identity: packaging-export-controlled-trial-plan plans future packaging and export without creating bundles, writing archives, uploading files, downloading files, or storing artifacts.",
      sections: buildControlledBuilderReviewSections(
        { label: "Bundle checklist", items: ["Bundle checklist: included files, generated assets, dependency list, license notes, evidence packet, and excluded secrets must be reviewed."] },
        { label: "Destination checklist", items: ["Destination checklist: local destination, upload destination, account scope, path boundary, overwrite risk, and no arbitrary export path."] },
        { label: "Redaction/license checklist", items: ["Redaction/license checklist: remove credentials, tokens, endpoint values, private content, connector data, copyrighted assets, and incompatible licenses."] },
        { label: "Rollback checklist", items: ["Rollback checklist: cleanup, reverse package, failed export handling, audit record, and recovery owner require approval before future package/export."] },
      ),
      routes: ["/packaging-export-boundary", "/local-runtime-controlled-trial-review", "/universal-builder-controlled-trial-candidate"],
      nextRecommendedAction: "Next recommended action: keep packages and exports blocked until bundle, destination, redaction/license, rollback, and explicit operator approval are complete.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("packaging/export controlled trial plan", PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_LANGUAGE, PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildPackagingExportControlledTrialPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizePackagingExportControlledTrialPlan(model: { packagingExportControlledTrialPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Packaging/export controlled trial plan", model.packagingExportControlledTrialPlans, "Packaging/export requires explicit operator approval.");
}

export function buildPackagingExportControlledTrialPlanModel() {
  const packagingExportControlledTrialPlans = buildPackagingExportControlledTrialPlans();
  const summary = summarizePackagingExportControlledTrialPlan({ packagingExportControlledTrialPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 648",
    title: "Packaging/export controlled trial plan",
    summary,
    subtitle: "Plan future package/export work without creating packages or exports.",
    primaryLabel: "Review package/export plan",
    anchor: "packaging-export-controlled-trial-plan",
    plainEnglishTitle: "Plain-English packaging/export controlled trial plan",
    plainEnglishCopy: "This page explains what a future package or export must prove before approval. It cannot create archives, exports, uploads, downloads, or artifacts.",
    language: PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    markers: PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    links: [
      { href: "/packaging-export-boundary", label: "Packaging boundary" },
      { href: "/local-runtime-controlled-trial-review", label: "Runtime review" },
      { href: "/universal-builder-controlled-trial-candidate", label: "Builder candidate" },
    ],
    packets: packagingExportControlledTrialPlans,
    advancedSummary: "Advanced packaging/export controlled trial plan details",
    advancedDetails: [...PACKAGING_EXPORT_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced packaging/export controlled trial plan details collapsed/secondary. This route does not create packages, create exports, write archives, upload artifacts, download files, store artifacts, or persist destinations.",
    dataScope: "packaging-export-controlled-trial-plan buildPackagingExportControlledTrialPlanStableKey PackagingExportControlledTrialPlanPanel",
  });
  return { ...model, packagingExportControlledTrialPlans };
}
