export type CreativePromptMemorySourceKind =
  | "video-prompt"
  | "storyboard"
  | "keyframe-plan"
  | "local-image-request"
  | "local-keyframe-request"
  | "local-video-draft-request"
  | "artifact-review-note"
  | "manual-note";

export type CreativePromptMemoryReviewStatus =
  | "candidate"
  | "useful"
  | "needs-edit"
  | "rejected"
  | "approved-for-future-memory"
  | "not-persisted";

export type CreativePromptMemoryPersistencePosture =
  | "review-candidate-only"
  | "copy-only-handoff"
  | "approved-review-needed"
  | "not-persisted";

export type CreativePromptMemoryCandidate = {
  id: string;
  sourceKind: CreativePromptMemorySourceKind;
  promptExcerpt: string;
  styleNotes: string;
  subjectNotes: string;
  cameraNotes: string;
  reuseTags: string[];
  qualityNotes: string;
  safetyNotes: string;
  reviewStatus: CreativePromptMemoryReviewStatus;
  persistencePosture: CreativePromptMemoryPersistencePosture;
};

export type CreativePromptMemorySource = {
  id: string;
  sourceKind: CreativePromptMemorySourceKind;
  label: string;
  sourceRoute: string;
  beginnerExplanation: string;
  reviewBoundary: string;
};

export type CreativePromptMemoryReview = {
  id: string;
  candidateCount: number;
  statuses: CreativePromptMemoryReviewStatus[];
  reviewSteps: string[];
  approvalReminder: string;
};

export type CreativePromptMemoryTag = {
  id: string;
  label: string;
  explanation: string;
  candidateIds: string[];
};

export type CreativePromptMemoryReuse = {
  id: string;
  allowedReuse: string[];
  suggestionsOnly: string[];
  blockedReuse: string[];
};

export type CreativePromptMemoryHandoff = {
  id: string;
  copyLabel: string;
  handoffText: string;
  reviewReminder: string;
};

export type CreativePromptMemorySummary = {
  candidates: CreativePromptMemoryCandidate[];
  sources: CreativePromptMemorySource[];
  review: CreativePromptMemoryReview;
  tags: CreativePromptMemoryTag[];
  reuse: CreativePromptMemoryReuse;
  handoff: CreativePromptMemoryHandoff;
  summary: string;
};
