export type JarvisVideoFirstGatedProviderExecutionTrialRuntimePreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4329;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialRuntimePreview =
  Readonly<{
    title: "First gated provider trial runtime";
    statusBadge: string;
    summary: string;
    highlights: readonly string[];
    blockedResultSummary: string;
    missingGateSummary: string;
    acceptanceChecklist: readonly string[];
    disabledExecutionSurfaces: readonly string[];
    resultReviewRecoverySummary: string;
    evidenceInputCount: number;
    blockerCount: number;
    missingGateCount: number;
    checkpoint: JarvisVideoFirstGatedProviderExecutionTrialRuntimePreviewCheckpoint;
  }>;
