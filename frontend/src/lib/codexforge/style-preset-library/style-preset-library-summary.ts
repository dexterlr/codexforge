import type { StylePresetLibrarySummary } from "./style-preset-types";
import { buildDefaultStylePresets } from "./style-preset";
import { buildStylePresetCategory } from "./style-preset-category";
import { buildStylePresetHandoff } from "./style-preset-handoff";
import { buildStylePresetReuse } from "./style-preset-reuse";
import { buildStylePresetSafety } from "./style-preset-safety";
import { buildStylePresetToken } from "./style-preset-token";

export function buildStylePresetLibrarySummary(): StylePresetLibrarySummary {
  const presets = buildDefaultStylePresets();
  const categories = buildStylePresetCategory(presets);
  const tokens = buildStylePresetToken(presets);
  const safety = buildStylePresetSafety();
  const reuse = buildStylePresetReuse(presets);
  const handoff = buildStylePresetHandoff(presets);

  return {
    presets,
    categories,
    tokens,
    safety,
    reuse,
    handoff,
    summary: summarizeStylePresetLibrary({ presets, categories, tokens, safety, reuse, handoff, summary: "" }),
  };
}

export function summarizeStylePresetLibrary(summary: StylePresetLibrarySummary): string {
  return `${summary.presets.length} style presets are available as reusable, review-only local definitions.`;
}
