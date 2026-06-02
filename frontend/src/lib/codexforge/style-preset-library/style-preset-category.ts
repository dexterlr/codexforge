import type { StylePreset, StylePresetCategory, StylePresetCategorySummary } from "./style-preset-types";
import { buildDefaultStylePresets } from "./style-preset";

const CATEGORIES: StylePresetCategory[] = [
  "cinematic",
  "product",
  "character",
  "environment",
  "social",
  "logo/motion",
  "concept art",
  "realistic",
  "stylized",
  "local draft",
];

export function buildStylePresetCategory(
  presets: StylePreset[] = buildDefaultStylePresets()
): StylePresetCategorySummary[] {
  return CATEGORIES.map((category) => ({
    id: `style-preset-category-${category.replaceAll(" ", "-").replace("/", "-")}`,
    category,
    explanation: "A style preset category helps a beginner pick the right visual direction without rewriting every prompt.",
    presetIds: presets.filter((preset) => preset.category === category).map((preset) => preset.id),
  }));
}
