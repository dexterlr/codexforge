import type {
  DraftPlaybackCriterion,
  DraftPlaybackDecision,
  DraftPlaybackDraftSummary,
  DraftPlaybackSide,
  DraftSideBySidePlaybackReviewModel,
} from "./draft-side-by-side-playback-review-types";

export function buildDraftPlaybackDraftSummary(side: DraftPlaybackSide): DraftPlaybackDraftSummary {
  const label = side === "left" ? "Left draft" : "Right draft";
  const trial = side === "left" ? "source trial: local video draft trial A" : "source trial: local video draft trial B";

  return {
    id: `draft-playback-${side}`,
    side,
    label,
    sourceTrial: trial,
    localArtifactSummary: `${label} local artifact summary: reviewed local draft reference, no full path above the fold.`,
    previewReadiness: "behind-approved-local-artifact-boundary",
    rejectedDraftRetained: true,
  };
}

export function buildDraftPlaybackCriteria(): DraftPlaybackCriterion[] {
  return [
    {
      id: "motion",
      label: "motion quality",
      plainEnglish: "Compare motion quality, stability, and continuity without auto-selecting a winner.",
    },
    {
      id: "prompt",
      label: "prompt match",
      plainEnglish: "Compare how well each local draft matches the reviewed prompt and source trial.",
    },
    {
      id: "artifacts",
      label: "visible artifacts",
      plainEnglish: "Compare visible artifacts, missing details, flicker, or composition issues.",
    },
    {
      id: "export-readiness",
      label: "export readiness",
      plainEnglish: "Compare whether a draft is ready for a reviewed local export handoff.",
    },
  ];
}

export function buildDraftPlaybackDecision(): DraftPlaybackDecision {
  return {
    id: "review-decision",
    label: "Review decision required",
    selectedDraft: "none",
    notesHandoffSummary:
      "notes/handoff summary: operator writes the comparison note, then chooses keep reviewing, retry, recovery, or export package handoff.",
    automaticPromotionAllowed: false,
    rejectedDraftDeletionAllowed: false,
  };
}

export function buildDraftSideBySidePlaybackReviewModel(): DraftSideBySidePlaybackReviewModel {
  const model: DraftSideBySidePlaybackReviewModel = {
    title: "Draft side-by-side playback review",
    summary: "",
    leftDraft: buildDraftPlaybackDraftSummary("left"),
    rightDraft: buildDraftPlaybackDraftSummary("right"),
    criteria: buildDraftPlaybackCriteria(),
    decision: buildDraftPlaybackDecision(),
    recoveryRoute: "/render-queue-recovery",
    exportRoute: "/export-package-builder",
    boundary: {
      localOnly: true,
      automaticPromotionAllowed: false,
      rejectedDraftDeletionAllowed: false,
      brainGraphMutationAllowed: false,
      queueMutationAllowed: false,
      artifactDeletionAllowed: false,
      uploadAllowed: false,
    },
    cleanComparisonLayout: true,
  };

  return { ...model, summary: summarizeDraftSideBySidePlaybackReview(model) };
}

export function summarizeDraftSideBySidePlaybackReview(
  model: DraftSideBySidePlaybackReviewModel
): string {
  return `${model.title}: Compare local draft renders with ${model.decision.label}. No automatic promotion. Rejected drafts are retained. Clean comparison layout.`;
}
