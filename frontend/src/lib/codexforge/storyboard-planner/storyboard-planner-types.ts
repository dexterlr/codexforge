export type StoryboardProject = { id: string; title: string; idea: string; audience: string; nextStep: string };
export type StoryboardShot = { id: string; order: number; title: string; visualDescription: string; cameraMovement: string; subjectMovement: string; durationTarget: string; keyframeNeed: string; localDraftSuitability: string; riskNotes: string; nextStep: string };
export type StoryboardShotTiming = { id: string; shotId: string; order: number; durationTarget: string; timingNote: string };
export type StoryboardCameraPlan = { id: string; shotId: string; cameraMovement: string; framing: string; reviewNote: string };
export type StoryboardContinuity = { id: string; continuityNotes: string[]; plainEnglish: string };
export type StoryboardSafety = { nothingGeneratedYet: true; workflowRunAllowed: false; providerCallsAllowed: false; approvalRequiredLater: true; plainEnglish: string };
export type StoryboardHandoff = { storyboardText: string; keyframeHandoff: string; nextStep: string };
export type StoryboardPlannerSummary = { project: StoryboardProject; shots: StoryboardShot[]; timings: StoryboardShotTiming[]; cameraPlans: StoryboardCameraPlan[]; continuity: StoryboardContinuity; safety: StoryboardSafety; handoff: StoryboardHandoff; summary: string };
