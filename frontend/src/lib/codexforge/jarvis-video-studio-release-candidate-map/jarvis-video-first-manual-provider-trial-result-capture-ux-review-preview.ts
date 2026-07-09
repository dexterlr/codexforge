export type JarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4425;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview =
  Readonly<{
    title: "Manual provider trial capture";
    statusBadge: string;
    summary: string;
    highlights: readonly string[];
    productStatements: readonly string[];
    manualCaptureLanes: readonly string[];
    uxReviewLanes: readonly string[];
    outputPreviewStates: readonly string[];
    reviewStates: readonly string[];
    manualCaptureBlockers: readonly string[];
    uxReviewBlockers: readonly string[];
    operatorAcceptanceChecklist: readonly string[];
    artifactHandoffChecklist: readonly string[];
    exportPublishBlockers: readonly string[];
    nextManualExecutionEnablementChecklist: readonly string[];
    evidenceInputCount: number;
    checkpoint: JarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreviewCheckpoint;
  }>;
