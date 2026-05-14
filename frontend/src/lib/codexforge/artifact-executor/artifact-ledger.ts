import type {
  ArtifactLedger,
  ArtifactLedgerItem,
  ArtifactPreview,
  ArtifactPreviewSet,
} from "./artifact-types";

export function buildArtifactLedgerItem(
  preview: ArtifactPreview,
  index = 0
): ArtifactLedgerItem {
  const needsReview = preview.validationNotes.some((note) =>
    note.toLowerCase().includes("review")
  );

  return {
    artifactId: preview.artifactId,
    sourceSurface: preview.sourceSurface,
    sourceRunId: `preview-run-${index + 1}`,
    type: preview.type,
    status: needsReview ? "waiting-review" : "preview-generated",
    approvalState: preview.type.includes("preview")
      ? "preview-only"
      : "approval-required-before-future-write",
    validationState: needsReview ? "needs-review" : "valid-preview",
    reviewAction:
      "Inspect preview, preserve audit notes, and request guarded approval before any future write or execution.",
  };
}

export function buildArtifactLedger(set: ArtifactPreviewSet): ArtifactLedger {
  const ledger: ArtifactLedger = {
    id: "artifact-ledger-phase-10",
    items: set.previews.map((preview, index) =>
      buildArtifactLedgerItem(preview, index)
    ),
    summary: [],
  };

  return {
    ...ledger,
    summary: summarizeArtifactLedger(ledger),
  };
}

export function summarizeArtifactLedger(ledger: ArtifactLedger): string[] {
  return [
    `${ledger.items.length} ledger items recorded in memory only.`,
    "No persistence writes are performed by the ledger.",
    `${ledger.items.filter((item) => item.validationState === "needs-review").length} items need operator review before any future approval path.`,
  ];
}
