import type { CreativePromptMemoryCandidate } from "./creative-prompt-memory-types";

export function buildCreativePromptMemoryCandidate(
  input: Partial<CreativePromptMemoryCandidate> = {}
): CreativePromptMemoryCandidate {
  return {
    id: input.id ?? "creative-memory-candidate-001",
    sourceKind: input.sourceKind ?? "video-prompt",
    promptExcerpt:
      input.promptExcerpt ??
      "A calm product reveal with soft side light, clear subject framing, and one simple camera move.",
    styleNotes: input.styleNotes ?? "Keep the visual language specific, reusable, and easy to copy into a later prompt.",
    subjectNotes: input.subjectNotes ?? "Name the subject and the details that should stay consistent.",
    cameraNotes: input.cameraNotes ?? "Describe lens feel, distance, movement, and framing in plain English.",
    reuseTags: input.reuseTags ?? ["product reveal", "soft side light", "simple camera move"],
    qualityNotes: input.qualityNotes ?? "Useful because it separates subject, style, camera, and quality cues.",
    safetyNotes: input.safetyNotes ?? "Review candidate only; no provider call, no auto-save, and no Brain mutation.",
    reviewStatus: input.reviewStatus ?? "candidate",
    persistencePosture: input.persistencePosture ?? "review-candidate-only",
  };
}

export function buildDefaultCreativePromptMemoryCandidates(): CreativePromptMemoryCandidate[] {
  return [
    buildCreativePromptMemoryCandidate({
      id: "creative-memory-video-prompt-001",
      sourceKind: "video-prompt",
      promptExcerpt: "Slow push-in on a desk product, soft window light, clean background, confident final hold.",
      styleNotes: "Cinematic but simple enough for a local draft prompt.",
      subjectNotes: "Product shape, logo placement, and main material stay visible.",
      cameraNotes: "Slow push-in, eye-level product angle, no busy movement.",
      reuseTags: ["product", "push-in", "soft light"],
      reviewStatus: "useful",
      persistencePosture: "not-persisted",
    }),
    buildCreativePromptMemoryCandidate({
      id: "creative-memory-storyboard-001",
      sourceKind: "storyboard",
      promptExcerpt: "Opening establishing shot, then close-up detail, then final reveal with matching color palette.",
      styleNotes: "Reusable structure for explaining a three-shot sequence.",
      subjectNotes: "Carry the same subject cues from shot to shot.",
      cameraNotes: "Wide shot to close-up to reveal; avoid abrupt angle changes.",
      reuseTags: ["storyboard", "three shots", "continuity"],
      reviewStatus: "needs-edit",
      persistencePosture: "review-candidate-only",
    }),
    buildCreativePromptMemoryCandidate({
      id: "creative-memory-artifact-review-001",
      sourceKind: "artifact-review-note",
      promptExcerpt: "The draft worked best when the background stayed simple and the subject silhouette stayed readable.",
      styleNotes: "Review note may become a reusable quality rule after approval.",
      subjectNotes: "Silhouette readability should be checked before reuse.",
      cameraNotes: "Keep enough distance that the whole subject shape remains visible.",
      reuseTags: ["review note", "readable silhouette", "simple background"],
      reviewStatus: "not-persisted",
      persistencePosture: "copy-only-handoff",
    }),
  ];
}
