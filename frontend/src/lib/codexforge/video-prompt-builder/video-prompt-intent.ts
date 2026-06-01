import type { VideoPromptIntent, VideoPromptType } from "./video-prompt-builder-types";

export function buildVideoPromptIntent(input: Partial<VideoPromptIntent> = {}): VideoPromptIntent {
  return {
    id: input.id ?? "video-prompt-intent-local-draft",
    promptType: input.promptType ?? "local draft experiment",
    subject: input.subject ?? "a compact desk robot assembling a tiny glowing sign",
    scene: input.scene ?? "a tidy workshop table with visible tools and a safe clear background",
    goal: input.goal ?? "explain the main idea before any render, image, workflow, or provider call happens",
  };
}

export function buildDefaultVideoPromptIntents(): VideoPromptIntent[] {
  const promptTypes: VideoPromptType[] = [
    "cinematic product shot",
    "character moment",
    "environment flythrough",
    "logo/motion intro",
    "social clip",
    "concept art motion",
    "storyboard test",
    "local draft experiment",
  ];
  return promptTypes.map((promptType, index) =>
    buildVideoPromptIntent({
      id: `video-prompt-intent-${index + 1}`,
      promptType,
      subject: promptType === "environment flythrough" ? "a calm creative studio" : "the main subject",
      scene: "one clear scene with simple motion and no hidden render step",
    })
  );
}
