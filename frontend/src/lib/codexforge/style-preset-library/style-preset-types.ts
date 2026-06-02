export type StylePresetCategory =
  | "cinematic"
  | "product"
  | "character"
  | "environment"
  | "social"
  | "logo/motion"
  | "concept art"
  | "realistic"
  | "stylized"
  | "local draft";

export type StylePresetSuitability = "strong" | "good" | "needs-review" | "avoid";

export type StylePreset = {
  id: string;
  label: string;
  category: StylePresetCategory;
  visualLanguage: string;
  lighting: string;
  camera: string;
  colorPalette: string;
  textureMaterialNotes: string;
  negativeGuidance: string;
  bestUse: string;
  avoidUse: string;
  localGenerationSuitability: StylePresetSuitability;
};

export type StylePresetCategorySummary = {
  id: string;
  category: StylePresetCategory;
  explanation: string;
  presetIds: string[];
};

export type StylePresetToken = {
  id: string;
  label: string;
  promptToken: string;
  beginnerExplanation: string;
};

export type StylePresetSafety = {
  id: string;
  rules: string[];
  noProviderCalls: true;
  noGeneration: true;
};

export type StylePresetReuse = {
  id: string;
  allowedReuse: string[];
  reviewNeeded: string[];
};

export type StylePresetHandoff = {
  id: string;
  copyLabel: string;
  handoffText: string;
};

export type StylePresetLibrarySummary = {
  presets: StylePreset[];
  categories: StylePresetCategorySummary[];
  tokens: StylePresetToken[];
  safety: StylePresetSafety;
  reuse: StylePresetReuse;
  handoff: StylePresetHandoff;
  summary: string;
};
