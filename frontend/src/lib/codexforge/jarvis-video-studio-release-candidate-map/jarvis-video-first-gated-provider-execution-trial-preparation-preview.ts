export type JarvisVideoFirstGatedProviderExecutionTrialPreparationPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4297;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoFirstGatedProviderExecutionTrialPreparationPreview =
  Readonly<{
    title: "First gated provider trial preparation";
    statusBadge: string;
    summary: string;
    highlights: readonly string[];
    providerPreflightGateSummary: string;
    approvalReadinessChecklist: readonly string[];
    credentialIsolationChecklist: readonly string[];
    resultAuditApprovalHandoffChecklist: readonly string[];
    runtimeBlockers: readonly string[];
    nextRuntimeAcceptanceChecklist: readonly string[];
    nextRuntimeReadinessSummary: string;
    evidenceInputCount: number;
    checkpoint: JarvisVideoFirstGatedProviderExecutionTrialPreparationPreviewCheckpoint;
  }>;
