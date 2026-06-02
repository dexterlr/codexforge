import type { StylePreset } from "./style-preset-types";

export function buildStylePreset(input: Partial<StylePreset> = {}): StylePreset {
  return {
    id: input.id ?? "style-preset-cinematic-001",
    label: input.label ?? "Clean cinematic product reveal",
    category: input.category ?? "cinematic",
    visualLanguage: input.visualLanguage ?? "Simple cinematic framing with a readable subject and no clutter.",
    lighting: input.lighting ?? "Soft directional light with gentle shadows.",
    camera: input.camera ?? "Eye-level push-in or locked-off hero framing.",
    colorPalette: input.colorPalette ?? "Deep charcoal, warm white, muted teal accent.",
    textureMaterialNotes: input.textureMaterialNotes ?? "Keep surfaces realistic, clean, and not overly glossy.",
    negativeGuidance: input.negativeGuidance ?? "Avoid busy backgrounds, unreadable logos, and extreme motion blur.",
    bestUse: input.bestUse ?? "Good for product introductions, keyframe anchors, and local draft planning.",
    avoidUse: input.avoidUse ?? "Avoid for chaotic action, heavy fantasy scenes, or abstract logo work.",
    localGenerationSuitability: input.localGenerationSuitability ?? "good",
  };
}

export function buildDefaultStylePresets(): StylePreset[] {
  return [
    buildStylePreset({
      id: "style-preset-cinematic-001",
      label: "Clean cinematic product reveal",
      category: "cinematic",
      visualLanguage: "Polished cinematic realism with simple staging and clear subject priority.",
      lighting: "Soft side light, controlled highlights, gentle shadow falloff.",
      camera: "Slow push-in, stable composition, subject centered or rule-of-thirds.",
      colorPalette: "Charcoal, warm white, muted teal, restrained amber highlights.",
      textureMaterialNotes: "Real materials, visible product finish, minimal clutter.",
      bestUse: "Product hero shots, local image requests, and short local video draft openings.",
      localGenerationSuitability: "strong",
    }),
    buildStylePreset({
      id: "style-preset-character-001",
      label: "Friendly stylized character card",
      category: "character",
      visualLanguage: "Readable stylized character design with consistent silhouette and simple props.",
      lighting: "Bright soft studio light with friendly contrast.",
      camera: "Medium shot, face and outfit visible, no extreme angle.",
      colorPalette: "Clear primary color, two supporting colors, neutral background.",
      textureMaterialNotes: "Clean illustrated materials and simple fabric cues.",
      negativeGuidance: "Avoid changing outfit, body shape, key colors, or mascot cues between shots.",
      bestUse: "Character prompts, mascot references as notes, and keyframe consistency review.",
      avoidUse: "Avoid for face identity claims or unreviewed likeness work.",
      localGenerationSuitability: "needs-review",
    }),
    buildStylePreset({
      id: "style-preset-social-001",
      label: "Fast social hook",
      category: "social",
      visualLanguage: "Bold readable subject, quick visual contrast, and clean negative space for captions.",
      lighting: "Bright punchy light with subject clearly separated from background.",
      camera: "Close or medium close framing that reads on a phone.",
      colorPalette: "High-contrast neutral base with one bright accent.",
      textureMaterialNotes: "Simple surfaces, readable edges, no tiny details.",
      negativeGuidance: "Avoid tiny text, clutter, and low-contrast subject edges.",
      bestUse: "Social hook shots, before/after cards, and quick local draft tests.",
      avoidUse: "Avoid for quiet cinematic scenes that need slow pacing.",
      localGenerationSuitability: "good",
    }),
  ];
}
