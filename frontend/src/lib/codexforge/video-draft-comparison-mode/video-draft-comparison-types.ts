export type VideoDraftComparisonCategory =
  | "prompt"
  | "workflow"
  | "keyframes"
  | "duration"
  | "motion quality"
  | "visual quality"
  | "consistency"
  | "artifacts"
  | "render cost/time posture"
  | "next action";

export type VideoDraftRecord = {
  id: string;
  label: string;
  source: string;
  playbackAllowed: false;
};

export type VideoDraftComparison = {
  id: string;
  leftDraftId: string;
  rightDraftId: string;
  categories: VideoDraftComparisonCategory[];
};

export type VideoDraftScorecard = {
  id: string;
  draftId: string;
  strengths: string[];
  concerns: string[];
};

export type VideoDraftDifference = {
  id: string;
  category: VideoDraftComparisonCategory;
  plainEnglish: string;
};

export type VideoDraftSelection = {
  id: string;
  selectedDraftId: string;
  decision: "keep" | "retry" | "upscale" | "finish" | "unknown";
  plainEnglish: string;
};

export type VideoDraftComparisonHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type VideoDraftComparisonSummary = {
  drafts: VideoDraftRecord[];
  comparison: VideoDraftComparison;
  scorecards: VideoDraftScorecard[];
  differences: VideoDraftDifference[];
  selection: VideoDraftSelection;
  handoff: VideoDraftComparisonHandoff;
  summary: string;
};
