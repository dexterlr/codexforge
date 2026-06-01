import type { StoryboardShot } from "./storyboard-planner-types";

export function buildStoryboardShot(input: Partial<StoryboardShot> = {}): StoryboardShot {
  return {
    id: input.id ?? "storyboard-shot-1",
    order: input.order ?? 1,
    title: input.title ?? "opening shot",
    visualDescription: input.visualDescription ?? "Establish the subject and scene clearly.",
    cameraMovement: input.cameraMovement ?? "slow push-in",
    subjectMovement: input.subjectMovement ?? "one readable motion",
    durationTarget: input.durationTarget ?? "1 to 2 seconds",
    keyframeNeed: input.keyframeNeed ?? "first frame and final frame",
    localDraftSuitability: input.localDraftSuitability ?? "good for a short local draft later",
    riskNotes: input.riskNotes ?? "avoid fast cuts and unreadable motion",
    nextStep: input.nextStep ?? "choose keyframes for this shot",
  };
}

export function buildDefaultStoryboardShots(): StoryboardShot[] {
  return [
    buildStoryboardShot({ id: "storyboard-shot-opening", order: 1, title: "opening shot", visualDescription: "Show where the video starts and what the viewer should notice first." }),
    buildStoryboardShot({ id: "storyboard-shot-main-action", order: 2, title: "main action shot", visualDescription: "Show the main movement in the simplest possible way.", durationTarget: "2 seconds" }),
    buildStoryboardShot({ id: "storyboard-shot-detail", order: 3, title: "detail shot", visualDescription: "Show one close detail that explains the idea.", cameraMovement: "small tilt or locked close-up" }),
    buildStoryboardShot({ id: "storyboard-shot-closing", order: 4, title: "closing shot", visualDescription: "End with a stable frame that can be reviewed later." }),
  ];
}
