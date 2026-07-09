export type JarvisVideoFirstProviderTrialResultReviewRecoveryPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4361;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoFirstProviderTrialResultReviewRecoveryPreview =
  Readonly<{
    title: "Provider trial result review and recovery";
    statusBadge: string;
    summary: string;
    highlights: readonly string[];
    productStatements: readonly string[];
    reviewLanes: readonly string[];
    recoveryLanes: readonly string[];
    operatorAcceptanceChecklist: readonly string[];
    artifactHandoffChecklist: readonly string[];
    exportPublishBlockers: readonly string[];
    nextManualGatedTrialChecklist: readonly string[];
    evidenceInputCount: number;
    checkpoint: JarvisVideoFirstProviderTrialResultReviewRecoveryPreviewCheckpoint;
  }>;
