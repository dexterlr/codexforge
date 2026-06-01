export type VideoReviewDecisionKind =
  | "keep"
  | "retry prompt"
  | "retry parameters"
  | "compare"
  | "upscale later"
  | "interpolate later"
  | "send to recovery"
  | "mark final candidate"
  | "unknown";

export type VideoReviewItem = {
  id: string;
  title: string;
  artifactKind: string;
  status: "no result yet" | "needs review" | "reviewed" | "unknown";
  fakeResult: false;
};

export type VideoReviewFilter = {
  id: string;
  label: string;
  status: VideoReviewItem["status"] | "all";
};

export type VideoReviewDecision = {
  id: string;
  itemId: string;
  decision: VideoReviewDecisionKind;
  plainEnglish: string;
};

export type VideoReviewNextAction = {
  id: string;
  label: string;
  href: string;
  plainEnglish: string;
};

export type VideoReviewHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type VideoReviewInboxSummary = {
  items: VideoReviewItem[];
  filter: VideoReviewFilter;
  decisions: VideoReviewDecision[];
  nextActions: VideoReviewNextAction[];
  handoff: VideoReviewHandoff;
  summary: string;
};
