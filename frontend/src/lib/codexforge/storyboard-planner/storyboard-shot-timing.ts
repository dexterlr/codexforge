import type { StoryboardShot, StoryboardShotTiming } from "./storyboard-planner-types";

export function buildStoryboardShotTiming(shot: StoryboardShot): StoryboardShotTiming {
  return { id: `timing-${shot.id}`, shotId: shot.id, order: shot.order, durationTarget: shot.durationTarget, timingNote: "Keep timing short enough for a cheap local draft later." };
}
