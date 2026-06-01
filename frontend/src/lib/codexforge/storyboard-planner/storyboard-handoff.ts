import type { StoryboardHandoff, StoryboardProject, StoryboardShot } from "./storyboard-planner-types";

export function buildStoryboardHandoff(project: StoryboardProject, shots: StoryboardShot[]): StoryboardHandoff {
  const storyboardText = `${project.title}: ${shots.map((shot) => `${shot.order}. ${shot.title} - ${shot.visualDescription}`).join(" ")}`;
  return { storyboardText, keyframeHandoff: "Plan first, middle, and ending keyframes for shots that need visual anchors.", nextStep: "Copy this into the keyframe plan. Nothing is generated yet." };
}
