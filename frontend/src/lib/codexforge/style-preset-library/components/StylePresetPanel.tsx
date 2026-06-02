"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { StylePreset } from "../style-preset-types";

export function StylePresetPanel({ presets }: { presets: StylePreset[] }) {
  return (
    <PreviewFoundationCard title="Preset cards">
      <PreviewFoundationCopy>
        Preset fields include preset id, label, category, visual language, lighting, camera, color palette, texture/material notes, negative guidance, best use, avoid use, and local generation suitability.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={presets.map(
          (preset) =>
            `${preset.id}: ${preset.label}; category ${preset.category}; local generation suitability ${preset.localGenerationSuitability}`
        )}
      />
    </PreviewFoundationCard>
  );
}
