export type DraftRenderRequest = { id: string; promptExists: boolean; storyboardExists: boolean; keyframePlanExists: boolean; workflowSelected: boolean; durationTarget: string; resolutionTarget: string; localProviderPlanned: boolean; artifactPlanExists: boolean; recoveryPathExists: boolean };
export type DraftRenderReadiness = { id: string; ready: boolean; blockers: string[]; nextStep: string };
export type DraftRenderResourcePlan = { id: string; gpuTimePosture: string; dualGpuNote: string; draftVsFinal: string; localFirstSavings: string; queueReadiness: string };
export type DraftRenderSafety = { id: string; noCloudSpend: true; approvalRequired: true; noAutoRun: true; comfyUiCallAllowed: false; providerCallsAllowed: false; plainEnglish: string };
export type DraftRenderReviewCheck = { id: string; label: string; passed: boolean; plainEnglish: string };
export type DraftRenderHandoff = { draftRequest: string; renderHandoff: string; nextStep: string };
export type LocalDraftRenderSummary = { request: DraftRenderRequest; readiness: DraftRenderReadiness; resourcePlan: DraftRenderResourcePlan; safety: DraftRenderSafety; checks: DraftRenderReviewCheck[]; handoff: DraftRenderHandoff; summary: string };
