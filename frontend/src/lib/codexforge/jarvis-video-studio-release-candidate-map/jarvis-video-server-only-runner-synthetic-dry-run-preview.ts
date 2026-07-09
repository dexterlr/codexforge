export type JarvisVideoServerOnlyRunnerSyntheticDryRunPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4233;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoServerOnlyRunnerSyntheticDryRunPreview = Readonly<{
  title: "Server-only synthetic dry run";
  statusBadge: string;
  summary: string;
  highlights: readonly string[];
  requestId: string;
  resultId: string;
  blockedExecutionSummary: string;
  nextCaptureRequirements: readonly string[];
  evidenceInputCount: number;
  disabledSurfaceCount: number;
  checkpoint: JarvisVideoServerOnlyRunnerSyntheticDryRunPreviewCheckpoint;
}>;
