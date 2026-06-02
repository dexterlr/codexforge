import type { StylePreset, StylePresetToken } from "./style-preset-types";
import { buildDefaultStylePresets } from "./style-preset";

export function buildStylePresetToken(
  presets: StylePreset[] = buildDefaultStylePresets()
): StylePresetToken[] {
  return presets.map((preset) => ({
    id: `style-preset-token-${preset.id}`,
    label: preset.label,
    promptToken: `${preset.visualLanguage} ${preset.lighting} ${preset.camera}`,
    beginnerExplanation: "A style token is copyable wording that keeps style, light, and camera direction consistent.",
  }));
}
