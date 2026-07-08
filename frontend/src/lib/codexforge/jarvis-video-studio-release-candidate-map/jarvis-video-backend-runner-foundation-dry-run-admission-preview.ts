export type JarvisVideoBackendRunnerFoundationDryRunAdmissionPreviewDecision =
  Readonly<{
    outcome: "admitted-for-synthetic-review" | "blocked";
    label: string;
    summary: string;
    blockers: readonly string[];
  }>;

export type JarvisVideoBackendRunnerFoundationDryRunAdmissionPreviewCheckpoint =
  Readonly<{
    highestDetectedPhase: 4201;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoBackendRunnerFoundationDryRunAdmissionPreview =
  Readonly<{
    title: "Backend dry-run admission";
    statusBadge: string;
    summary: string;
    highlights: readonly string[];
    decision: JarvisVideoBackendRunnerFoundationDryRunAdmissionPreviewDecision;
    checkpoint: JarvisVideoBackendRunnerFoundationDryRunAdmissionPreviewCheckpoint;
    completenessLabel: string;
    requiredGateCount: number;
    blockerCount: number;
  }>;
