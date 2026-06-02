export type ShotTemplateCategory =
  | "opening shot"
  | "establishing shot"
  | "product hero"
  | "close-up detail"
  | "reveal"
  | "orbit"
  | "dolly"
  | "push-in"
  | "pull-back"
  | "transition"
  | "ending shot"
  | "social hook"
  | "before/after"
  | "comparison";

export type ShotLocalDraftSuitability = "strong" | "good" | "needs-keyframes" | "avoid";

export type ShotTemplate = {
  id: string;
  label: string;
  category: ShotTemplateCategory;
  visualDescription: string;
  cameraMovement: string;
  subjectMovement: string;
  durationHint: string;
  keyframeNeed: string;
  bestUse: string;
  avoidUse: string;
  continuityNotes: string[];
  localDraftSuitability: ShotLocalDraftSuitability;
};

export type ShotTemplateCategorySummary = {
  id: string;
  category: ShotTemplateCategory;
  explanation: string;
  templateIds: string[];
};

export type ShotReusePlan = {
  id: string;
  reusablePlanSteps: string[];
  reviewSteps: string[];
};

export type ShotContinuityNote = {
  id: string;
  shotId: string;
  note: string;
};

export type ShotLibrarySafety = {
  id: string;
  rules: string[];
  noGeneration: true;
  noProviderCalls: true;
};

export type ShotLibraryHandoff = {
  id: string;
  copyLabel: string;
  handoffText: string;
};

export type ShotLibrarySummary = {
  templates: ShotTemplate[];
  categories: ShotTemplateCategorySummary[];
  reusePlan: ShotReusePlan;
  continuityNotes: ShotContinuityNote[];
  safety: ShotLibrarySafety;
  handoff: ShotLibraryHandoff;
  summary: string;
};
