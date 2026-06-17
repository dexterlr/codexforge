"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildPackagingExportBoundaryModel } from "@/lib/codexforge/packaging-export-boundary";

const PACKAGING_EXPORT_BOUNDARY_MARKERS = [
  "Packaging export boundary",
  "Packaging/export boundary does not create packages or exports",
  "Packaging/export requires explicit operator approval",
  "Unsafe export destinations stay blocked",
  "Packaging groups",
  "Redaction license checklist",
] as const;

export function PackagingExportBoundaryPanel() {
  const model = buildPackagingExportBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 628"
      title="Packaging export boundary"
      subtitle="Packaging/export boundary reviews export and package operations without creating packages or exports. Packaging/export requires explicit operator approval, and unsafe export destinations stay blocked."
      primaryLabel="Review packaging boundary"
      anchor="packaging-export-boundary"
      plainEnglishTitle="Plain-English packaging export boundary"
      plainEnglishCopy="This page enables future project bundles, creative outputs, research reports, chatbot packages, game server packages, meeting packets, and handoff exports only after approved packaging/export boundaries exist. It does not export files, create packages, write artifacts, upload destinations, or send handoffs from UI."
      language={model.language}
      markers={[...PACKAGING_EXPORT_BOUNDARY_MARKERS]}
      links={[
        { href: "/workflow-profile-registry", label: "Workflow profiles" },
        { href: "/release-readiness-dashboard", label: "Release readiness" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
      ]}
      packets={model.packagingExportBoundaries}
      advancedSummary="Advanced packaging/export boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced packaging/export boundary details collapsed/secondary. This route does not create packages, exports, files, artifacts, uploads, connector mutations, or handoff sends."
      dataScope="packaging-export-boundary buildPackagingExportBoundaryStableKey PackagingExportBoundaryPanel"
    />
  );
}
