import type { StoryboardCameraPlan, StoryboardShot } from "./storyboard-planner-types";

export function buildStoryboardCameraPlan(shot: StoryboardShot): StoryboardCameraPlan {
  return { id: `camera-${shot.id}`, shotId: shot.id, cameraMovement: shot.cameraMovement, framing: "clear subject framing with no confusing crop", reviewNote: "Confirm the camera plan before keyframes." };
}
