import type { StylePreset, StylePresetHandoff } from "./style-preset-types";
import { buildDefaultStylePresets } from "./style-preset";

export function buildStylePresetHandoff(presets: StylePreset[] = buildDefaultStylePresets()): StylePresetHandoff {
  return {
    id: "style-preset-handoff-001",
    copyLabel: "Copy style handoff allowed",
    handoffText: presets
      .map(
        (preset) =>
          `${preset.label}: visual language ${preset.visualLanguage}; lighting ${preset.lighting}; camera ${preset.camera}; color palette ${preset.colorPalette}; negative guidance ${preset.negativeGuidance}.`
      )
      .join(" "),
  };
}
