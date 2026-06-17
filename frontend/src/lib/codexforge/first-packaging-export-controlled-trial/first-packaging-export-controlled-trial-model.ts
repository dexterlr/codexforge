import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstPackagingExportControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstPackagingExportControlledTrialStableKey };

export const FIRST_PACKAGING_EXPORT_CONTROLLED_TRIAL_LANGUAGE = [
  "First packaging/export controlled trial",
  "First packaging/export controlled trial does not create packages or exports",
  "Packaging/export requires explicit operator approval",
  "Bundle",
  "Destination",
  "Redaction/license",
  "Rollback",
  "Handoff checklist",
] as const;

const FIRST_PACKAGING_EXPORT_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "First packaging/export controlled trial identity",
  "Bundle",
  "Destination",
  "Redaction/license",
  "Rollback",
  "Handoff checklist",
  "Next recommended action",
  "advanced first packaging/export controlled trial details collapsed/secondary",
] as const;

export function buildFirstPackagingExportControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-packaging-export-controlled-trial", input);
}

export function buildFirstPackagingExportControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstPackagingExportControlledTrial({
      idHint: "first-packaging-export-controlled-trial",
      status: "blocked",
      identity: "First packaging/export controlled trial identity: First packaging/export controlled trial does not create packages or exports. It previews bundle, destination, redaction/license, rollback, and handoff review without writing artifacts.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Bundle", items: ["Bundle: included files, excluded files, evidence references, result summaries, manifest, reproducibility notes, and no automatic bundle creation."] },
        { label: "Destination", items: ["Destination: local path, external target, connector handoff, sharing boundary, retention, and no package/export/write behavior without approval."] },
        { label: "Redaction/license", items: ["Redaction/license: remove secrets, private data, connector payloads, endpoint values, copyrighted material, incompatible assets, and unclear provenance before export."] },
        { label: "Rollback", items: ["Rollback: rollback plan covers failed export, incorrect bundle, leaked content, stale result, cleanup owner, retry gate, and no automatic recovery trigger."] },
        { label: "Handoff checklist", items: ["Handoff checklist: operator acceptance, reviewed evidence, result status, safety limits, license notes, next route, and explicit approval before delivery."] },
      ),
      routes: ["/universal-builder-evidence-review", "/universal-builder-result-review", "/universal-builder-mvp-candidate"],
      nextRecommendedAction: "Next recommended action: keep packaging/export blocked until bundle, destination, redaction/license, rollback, handoff checklist, and explicit operator approval are complete.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first packaging/export controlled trial", FIRST_PACKAGING_EXPORT_CONTROLLED_TRIAL_LANGUAGE, FIRST_PACKAGING_EXPORT_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstPackagingExportControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstPackagingExportControlledTrial(model: { firstPackagingExportControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First packaging/export controlled trial", model.firstPackagingExportControlledTrials, "Packaging/export requires explicit operator approval.");
}

export function buildFirstPackagingExportControlledTrialModel() {
  const firstPackagingExportControlledTrials = buildFirstPackagingExportControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 661",
    title: "First packaging/export controlled trial",
    summarySubject: "First packaging/export controlled trial",
    approvalCopy: "Packaging/export requires explicit operator approval.",
    subtitle: "Preview package/export controls without creating packages or exports.",
    primaryLabel: "Review packaging/export trial",
    anchor: "first-packaging-export-controlled-trial",
    plainEnglishTitle: "Plain-English first packaging/export controlled trial",
    plainEnglishCopy: "This page shows what a package or export would need before approval: bundle, destination, redaction/license, rollback, and handoff checklist. It cannot create packages or exports.",
    language: FIRST_PACKAGING_EXPORT_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_PACKAGING_EXPORT_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/universal-builder-evidence-review", label: "Builder evidence review" },
      { href: "/universal-builder-result-review", label: "Builder result review" },
      { href: "/universal-builder-mvp-candidate", label: "Builder MVP candidate" },
    ],
    packets: firstPackagingExportControlledTrials,
    advancedCopy: "advanced first packaging/export controlled trial details collapsed/secondary. This route does not create packages, create exports, write files, download files, call connectors, store outputs, trigger rollback, trigger recovery, send handoffs, or persist approval decisions.",
    dataScope: "first-packaging-export-controlled-trial buildFirstPackagingExportControlledTrialStableKey FirstPackagingExportControlledTrialPanel",
  });
  return { ...model, firstPackagingExportControlledTrials };
}
