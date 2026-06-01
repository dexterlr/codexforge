import type { StoryboardSafety } from "./storyboard-planner-types";

export function buildStoryboardSafety(): StoryboardSafety {
  return { nothingGeneratedYet: true, workflowRunAllowed: false, providerCallsAllowed: false, approvalRequiredLater: true, plainEnglish: "This storyboard is planning only. No render button, no workflow run, no provider call." };
}
