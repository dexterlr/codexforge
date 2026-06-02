import type { StylePreset, StylePresetReuse } from "./style-preset-types";
import { buildDefaultStylePresets } from "./style-preset";

export function buildStylePresetReuse(presets: StylePreset[] = buildDefaultStylePresets()): StylePresetReuse {
  return {
    id: "style-preset-reuse-001",
    allowedReuse: presets.map((preset) => `Reuse ${preset.label} across prompts, keyframes, and drafts.`),
    reviewNeeded: [
      "Check whether the preset fits the subject before copying it.",
      "Keep negative guidance with the preset so the style does not drift.",
      "Use local generation suitability as planning data, not a launch command.",
    ],
  };
}
