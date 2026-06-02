"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { StylePresetCategorySummary } from "../style-preset-types";

export function StylePresetCategoryPanel({ categories }: { categories: StylePresetCategorySummary[] }) {
  return (
    <PreviewFoundationCard title="Categories">
      <PreviewFoundationCopy>
        Categories include cinematic, product, character, environment, social, logo/motion, concept art, realistic, stylized, and local draft.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={categories.map((category) => `${category.category}: ${category.presetIds.length} presets`)}
      />
    </PreviewFoundationCard>
  );
}
