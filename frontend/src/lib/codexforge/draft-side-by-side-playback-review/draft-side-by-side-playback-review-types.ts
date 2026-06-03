export type DraftPlaybackSide = "left" | "right";

export type DraftPlaybackDraftSummary = {
  id: string;
  side: DraftPlaybackSide;
  label: string;
  sourceTrial: string;
  localArtifactSummary: string;
  previewReadiness: "behind-approved-local-artifact-boundary";
  rejectedDraftRetained: true;
};

export type DraftPlaybackCriterion = {
  id: string;
  label: string;
  plainEnglish: string;
};

export type DraftPlaybackDecision = {
  id: "review-decision";
  label: "Review decision required";
  selectedDraft: "none";
  notesHandoffSummary: string;
  automaticPromotionAllowed: false;
  rejectedDraftDeletionAllowed: false;
};

export type DraftSideBySidePlaybackBoundary = {
  localOnly: true;
  automaticPromotionAllowed: false;
  rejectedDraftDeletionAllowed: false;
  brainGraphMutationAllowed: false;
  queueMutationAllowed: false;
  artifactDeletionAllowed: false;
  uploadAllowed: false;
};

export type DraftSideBySidePlaybackReviewModel = {
  title: "Draft side-by-side playback review";
  summary: string;
  leftDraft: DraftPlaybackDraftSummary;
  rightDraft: DraftPlaybackDraftSummary;
  criteria: DraftPlaybackCriterion[];
  decision: DraftPlaybackDecision;
  recoveryRoute: "/render-queue-recovery";
  exportRoute: "/export-package-builder";
  boundary: DraftSideBySidePlaybackBoundary;
  cleanComparisonLayout: true;
};

export function buildDraftSideBySidePlaybackStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
