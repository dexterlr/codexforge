import type { VideoPromptIntent, VideoPromptStructure } from "./video-prompt-builder-types";

export function buildVideoPromptStructure(intent: VideoPromptIntent): VideoPromptStructure {
  return {
    subject: intent.subject,
    scene: intent.scene,
    durationTarget: "4 to 6 seconds for a safe local draft later",
    motionNotes: "Use one simple action, steady motion, and a clear beginning and ending.",
    nextStep: "Turn this prompt into a storyboard before any image or video generation.",
  };
}
