export type JarvisVideoManualProviderTrialExecutionEnablementPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4457;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoManualProviderTrialExecutionEnablementPreview =
  Readonly<{
    title: "Manual execution enablement";
    statusBadge: string;
    summary: string;
    highlights: readonly string[];
    productStatements: readonly string[];
    manualExecutionGateChecklist: readonly string[];
    credentialIsolationChecklist: readonly string[];
    operatorApprovalChecklist: readonly string[];
    costAcknowledgementChecklist: readonly string[];
    manualRunChecklist: readonly string[];
    manualRunBlockers: readonly string[];
    dryRunBlockerReviewStates: readonly string[];
    nextManualRunCaptureRecoveryChecklist: readonly string[];
    evidenceInputCount: number;
    checkpoint: JarvisVideoManualProviderTrialExecutionEnablementPreviewCheckpoint;
  }>;
