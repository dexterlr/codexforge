export type VideoPromptType =
  | "cinematic product shot"
  | "character moment"
  | "environment flythrough"
  | "logo/motion intro"
  | "social clip"
  | "concept art motion"
  | "storyboard test"
  | "local draft experiment";

export type VideoPromptIntent = {
  id: string;
  promptType: VideoPromptType;
  subject: string;
  scene: string;
  goal: string;
};

export type VideoPromptStructure = {
  subject: string;
  scene: string;
  durationTarget: string;
  motionNotes: string;
  nextStep: string;
};

export type VideoPromptStyle = {
  style: string;
  lighting: string;
  mood: string;
};

export type VideoPromptShotLanguage = {
  cameraMovement: string;
  framing: string;
  subjectMovement: string;
};

export type VideoPromptNegativeGuidance = {
  thingsToAvoid: string[];
  plainEnglish: string;
};

export type VideoPromptSafety = {
  localDraftSuitability: string;
  nothingGeneratedYet: true;
  providerCallsAllowed: false;
  comfyUiCallsAllowed: false;
  cloudSpendAllowed: false;
};

export type VideoPromptHandoff = {
  prompt: string;
  storyboardHandoff: string;
  nextStep: string;
};

export type VideoPromptBuilderSummary = {
  intents: VideoPromptIntent[];
  structure: VideoPromptStructure;
  style: VideoPromptStyle;
  shotLanguage: VideoPromptShotLanguage;
  negativeGuidance: VideoPromptNegativeGuidance;
  safety: VideoPromptSafety;
  handoff: VideoPromptHandoff;
  summary: string;
};
