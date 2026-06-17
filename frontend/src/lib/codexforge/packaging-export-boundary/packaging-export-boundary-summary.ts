import type { PackagingExportBoundary, PackagingExportBoundaryBoundary, PackagingExportBoundaryModel } from "./packaging-export-boundary-types";
import { buildPackagingExportBoundaryStableKey } from "./packaging-export-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const PACKAGING_EXPORT_BOUNDARY_LANGUAGE = [
  "Packaging export boundary",
  "Packaging/export boundary does not create packages or exports",
  "Packaging/export requires explicit operator approval",
  "Unsafe export destinations stay blocked",
  "Packaging groups",
  "Redaction license checklist",
] as const;

export function buildPackagingExportBoundary(input: Omit<PackagingExportBoundary, "id"> & { idHint: string }): PackagingExportBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildPackagingExportBoundaryStableKey("packaging-export-boundary", idHint, input.status), ...boundary };
}

export function buildPackagingExportBoundaries(): PackagingExportBoundary[] {
  return [
    buildPackagingExportBoundary({
      idHint: "packaging-export-boundary",
      status: "blocked",
      identity: "Packaging/export boundary identity: packaging-export-boundary reviews bundle, artifact, destination, redaction, and license plans without creating packages, exports, files, or artifacts.",
      sections: [
        { label: "Packaging groups", items: ["Packaging groups: project bundles, game server packages, creative exports, research reports, chatbot configs, meeting packets, automation handoffs, and connector packages stay review-only."] },
        { label: "File bundle checklist", items: ["File bundle checklist: included files, excluded files, generated artifacts, dependency summary, path boundary, diff summary, and rollback reference must be reviewed before any future export."] },
        { label: "Artifact checklist", items: ["Artifact checklist: artifact type, source evidence, result review, version label, checksum plan, and no automatic write behavior are required before packaging."] },
        { label: "Destination checklist", items: ["Destination checklist: destination owner, local path boundary, remote destination approval, connector boundary, and unsafe export destinations stay blocked."] },
        { label: "Redaction license checklist", items: ["Redaction license checklist: secrets, credentials, connector data, private evidence, provider outputs, copyright/trademark risk, license terms, and attribution must be reviewed."] },
        { label: "Denied export actions", items: ["Denied export actions: export files, create packages, write artifacts, upload destinations, send handoffs, store outputs, persist credentials, or call connectors from UI."] },
        { label: "Unresolved export blockers", items: ["Unresolved export blockers: missing destination approval, missing redaction, missing license review, missing file boundary, missing result review, and missing release readiness route keep unsafe export destinations blocked."] },
      ],
      routes: ["/workflow-profile-registry", "/release-readiness-dashboard", "/universal-execution-boundary-inventory"],
      nextRecommendedAction: "Next recommended action: keep exports blocked, review bundle and destination risk, then connect release readiness before explicit operator approval.",
      advancedDetails: `Advanced packaging/export boundary details: Packaging/export boundary does not create packages or exports. Packaging/export requires explicit operator approval. Unsafe export destinations stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildPackagingExportBoundaryBoundary(): PackagingExportBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizePackagingExportBoundary(model: Pick<PackagingExportBoundaryModel, "packagingExportBoundaries">): string {
  return "Packaging/export boundary reviews " + model.packagingExportBoundaries.length + " packaging boundary packet without creating packages or exports. Packaging/export requires explicit operator approval, and unsafe export destinations stay blocked.";
}

export function buildPackagingExportBoundaryModel(): PackagingExportBoundaryModel {
  const packagingExportBoundaries = buildPackagingExportBoundaries();
  const model: PackagingExportBoundaryModel = {
    title: "Packaging export boundary",
    summary: "",
    reviewPackets: packagingExportBoundaries,
    packagingExportBoundaries,
    boundary: buildPackagingExportBoundaryBoundary(),
    language: [...PACKAGING_EXPORT_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Packaging/export boundary identity",
      "Packaging groups",
      "File bundle checklist",
      "Artifact checklist",
      "Destination checklist",
      "Redaction license checklist",
      "Denied export actions",
      "Unresolved export blockers",
      "Workflow profile registry route",
      "Release readiness route",
      "Next recommended action",
      "advanced packaging/export boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePackagingExportBoundary(model) };
}
