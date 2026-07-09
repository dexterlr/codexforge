export type JarvisVideoFirstRealProviderAdapterWiringPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4393;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoFirstRealProviderAdapterWiringPreview = Readonly<{
  title: "Real provider adapter wiring";
  statusBadge: string;
  summary: string;
  highlights: readonly string[];
  productStatements: readonly string[];
  wiringChecklist: readonly string[];
  credentialIsolationChecklist: readonly string[];
  operatorApprovalChecklist: readonly string[];
  runtimeCaptureReviewHandoffChecklist: readonly string[];
  manualTrialBlockers: readonly string[];
  nextCaptureUxReviewChecklist: readonly string[];
  evidenceInputCount: number;
  checkpoint: JarvisVideoFirstRealProviderAdapterWiringPreviewCheckpoint;
}>;
