import type { StoryboardProject } from "./storyboard-planner-types";

export function buildStoryboardProject(input: Partial<StoryboardProject> = {}): StoryboardProject {
  return {
    id: input.id ?? "storyboard-project-local-draft",
    title: input.title ?? "Local draft storyboard",
    idea: input.idea ?? "A simple video draft planned before keyframes or rendering.",
    audience: input.audience ?? "A beginner who needs clear shots and safe next steps.",
    nextStep: input.nextStep ?? "Review the shots, then plan keyframes.",
  };
}

export function buildDefaultStoryboardProject(): StoryboardProject {
  return buildStoryboardProject();
}
