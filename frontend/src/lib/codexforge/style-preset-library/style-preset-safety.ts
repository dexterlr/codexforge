import type { StylePresetSafety } from "./style-preset-types";

export function buildStylePresetSafety(): StylePresetSafety {
  return {
    id: "style-preset-safety-001",
    rules: [
      "Style presets are deterministic local definitions.",
      "No provider calls happen here.",
      "No image/video generation starts here.",
      "A preset is a suggestion and still needs review inside a real prompt.",
    ],
    noProviderCalls: true,
    noGeneration: true,
  };
}
