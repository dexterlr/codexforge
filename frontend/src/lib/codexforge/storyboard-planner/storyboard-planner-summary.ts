import type { StoryboardPlannerSummary } from "./storyboard-planner-types";
import { buildDefaultStoryboardProject } from "./storyboard-project";
import { buildDefaultStoryboardShots } from "./storyboard-shot";
import { buildStoryboardShotTiming } from "./storyboard-shot-timing";
import { buildStoryboardCameraPlan } from "./storyboard-camera-plan";
import { buildStoryboardContinuity } from "./storyboard-continuity";
import { buildStoryboardSafety } from "./storyboard-safety";
import { buildStoryboardHandoff } from "./storyboard-handoff";

export function buildStoryboardPlannerSummary(): StoryboardPlannerSummary {
  const project = buildDefaultStoryboardProject();
  const shots = buildDefaultStoryboardShots();
  return { project, shots, timings: shots.map(buildStoryboardShotTiming), cameraPlans: shots.map(buildStoryboardCameraPlan), continuity: buildStoryboardContinuity(), safety: buildStoryboardSafety(), handoff: buildStoryboardHandoff(project, shots), summary: "The idea is split into opening, main action, detail, and closing shots before keyframes or video drafts." };
}

export function summarizeStoryboardPlanner(summary = buildStoryboardPlannerSummary()): string {
  return `${summary.shots.length} planned shots, keyframe handoff ready, no workflow run, no render, no provider calls.`;
}
