export type JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4265;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreview =
  Readonly<{
    title: "Result capture and audit join";
    statusBadge: string;
    summary: string;
    highlights: readonly string[];
    resultCaptureEnvelopeSummary: string;
    auditEnvelopeSummary: string;
    approvalJoinSummary: string;
    captureBlockers: readonly string[];
    auditBlockers: readonly string[];
    approvalJoinBlockers: readonly string[];
    nextGatedProviderTrialPreparationChecklist: readonly string[];
    evidenceInputCount: number;
    checkpoint: JarvisVideoResultCaptureAuditEnvelopeApprovalJoinPreviewCheckpoint;
  }>;
