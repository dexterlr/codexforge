import type { ShotTemplate } from "./shot-library-types";

export function buildShotTemplate(input: Partial<ShotTemplate> = {}): ShotTemplate {
  return {
    id: input.id ?? "shot-template-opening-001",
    label: input.label ?? "Calm opening push-in",
    category: input.category ?? "opening shot",
    visualDescription: input.visualDescription ?? "Start wide enough to understand the scene, then move gently toward the subject.",
    cameraMovement: input.cameraMovement ?? "Slow push-in.",
    subjectMovement: input.subjectMovement ?? "Subject stays mostly still with a small natural motion.",
    durationHint: input.durationHint ?? "3 to 5 seconds.",
    keyframeNeed: input.keyframeNeed ?? "One opening keyframe and one final framing keyframe.",
    bestUse: input.bestUse ?? "Use when a storyboard needs a clear first shot before a draft.",
    avoidUse: input.avoidUse ?? "Avoid when the first shot needs fast action or a sudden reveal.",
    continuityNotes: input.continuityNotes ?? ["Keep subject size and lighting consistent with the next shot."],
    localDraftSuitability: input.localDraftSuitability ?? "good",
  };
}

export function buildDefaultShotTemplates(): ShotTemplate[] {
  return [
    buildShotTemplate(),
    buildShotTemplate({
      id: "shot-template-product-hero-001",
      label: "Product hero hold",
      category: "product hero",
      visualDescription: "Frame the product cleanly, keep label readable, and hold long enough for inspection.",
      cameraMovement: "Locked-off or tiny push-in.",
      subjectMovement: "Product remains still; background may have very subtle motion.",
      durationHint: "2 to 4 seconds.",
      keyframeNeed: "One clean hero keyframe is usually enough.",
      bestUse: "Product introductions, review thumbnails, and local image request alignment.",
      avoidUse: "Avoid when the product is too small or the label is unreadable.",
      continuityNotes: ["Keep logo placement, color, material, and silhouette stable."],
      localDraftSuitability: "strong",
    }),
    buildShotTemplate({
      id: "shot-template-close-up-001",
      label: "Close-up detail",
      category: "close-up detail",
      visualDescription: "Move close enough to show texture, feature, or interaction without losing subject identity.",
      cameraMovement: "Small dolly or locked macro-like frame.",
      subjectMovement: "Small hand, light, or material movement only if reviewed.",
      durationHint: "2 to 3 seconds.",
      keyframeNeed: "Detail keyframe plus previous-shot continuity note.",
      bestUse: "Material details, feature reveals, and before/after evidence.",
      avoidUse: "Avoid if the detail hides the main subject for too long.",
      continuityNotes: ["Match color palette and material from the hero shot."],
      localDraftSuitability: "needs-keyframes",
    }),
    buildShotTemplate({
      id: "shot-template-social-hook-001",
      label: "Social hook comparison",
      category: "social hook",
      visualDescription: "Show the contrast quickly with a readable subject and simple composition.",
      cameraMovement: "Fast but stable cut or short pull-back.",
      subjectMovement: "Subject shifts from before state to after state as a planned comparison.",
      durationHint: "1 to 2 seconds.",
      keyframeNeed: "Before keyframe and after keyframe.",
      bestUse: "Short social openings and comparison storyboards.",
      avoidUse: "Avoid if the comparison needs long explanation or tiny text.",
      continuityNotes: ["Keep framing comparable so the change is easy to understand."],
      localDraftSuitability: "good",
    }),
  ];
}
