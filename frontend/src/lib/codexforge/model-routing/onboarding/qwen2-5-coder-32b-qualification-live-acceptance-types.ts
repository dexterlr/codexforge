export const CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_STATES = [
  "not-started",
  "verifying-installed-identity",
  "qualified",
  "rejected",
  "canceled",
] as const;

export const CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_REJECTION_CODES = [
  "candidate-declaration-invalid",
  "candidate-evidence-digest-mismatch",
  "candidate-content-digest-mismatch",
  "qualification-canceled",
  "ollama-unavailable",
  "ollama-timeout",
  "ollama-http-failure",
  "metadata-response-too-large",
  "metadata-malformed-response",
  "model-missing",
  "duplicate-model-entry",
  "model-name-mismatch",
  "installed-digest-mismatch",
  "metadata-mismatch",
  "unsupported-capability-metadata",
  "qualification-evidence-construction-failed",
] as const;

export const CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_STATES = [
  "not-started",
  "validating-qualification",
  "awaiting-explicit-approval",
  "preflight-verification",
  "approval-consumed",
  "executing",
  "accepted",
  "rejected",
  "canceled",
] as const;

export const CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_REJECTION_CODES = [
  "qualification-required",
  "qualification-expired",
  "qualification-evidence-mismatch",
  "acceptance-approval-required",
  "acceptance-approval-malformed",
  "acceptance-approval-expired",
  "acceptance-approval-scope-mismatch",
  "acceptance-approval-already-consumed",
  "acceptance-prompt-mismatch",
  "acceptance-envelope-mismatch",
  "kill-switch-blocked-before-provider-resolution",
  "preflight-model-missing",
  "preflight-model-name-mismatch",
  "preflight-installed-digest-mismatch",
  "preflight-metadata-mismatch",
  "kill-switch-blocked-before-generation",
  "execution-attempt-budget-exhausted",
  "acceptance-canceled",
  "ollama-unavailable",
  "ollama-timeout",
  "ollama-http-failure",
  "generation-response-too-large",
  "malformed-generation-response",
  "tool-call-response-rejected",
  "image-response-rejected",
  "unexpected-model-substitution",
  "empty-output",
  "oversized-output",
  "output-token-count-invalid",
  "acceptance-output-mismatch",
  "acceptance-evidence-construction-failed",
] as const;

export const CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ADMISSION_REJECTION_CODES = [
  "live-acceptance-not-succeeded",
  "evidence-schema-mismatch",
  "evidence-digest-mismatch",
  "candidate-binding-mismatch",
  "qualification-binding-mismatch",
  "approval-binding-mismatch",
  "attempt-proof-mismatch",
  "redaction-boundary-violation",
  "execution-invariant-mismatch",
  "implementation-checkpoint-mismatch",
] as const;

export type CodexForgeQwen25Coder32BQualificationState =
  typeof CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_STATES[number];
export type CodexForgeQwen25Coder32BQualificationRejectionCode =
  typeof CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_REJECTION_CODES[number];
export type CodexForgeQwen25Coder32BAcceptanceState =
  typeof CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_STATES[number];
export type CodexForgeQwen25Coder32BAcceptanceRejectionCode =
  typeof CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_REJECTION_CODES[number];
export type CodexForgeQwen25Coder32BEvidenceAdmissionRejectionCode =
  typeof CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ADMISSION_REJECTION_CODES[number];

export type CodexForgeQwen25Coder32BSliceRDigest = Readonly<{
  algorithm: "sha256";
  canonicalizationVersion: "codexforge-onboarding-canonical-json-v1";
  sha256: string;
}>;

export type CodexForgeQwen25Coder32BExactIdentity = Readonly<{
  providerId: "ollama-local";
  modelId: "qwen2.5-coder:32b";
  modelKey: "ollama-local::qwen2.5-coder:32b";
  installedDigestSha256: "b92d6a0bd47ee79114298de0177bf920c05a706d12633950b3936778492bef41";
  declarationEvidenceSha256: "dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90";
  candidateContentSha256: "a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f";
  dataBoundary: "local-machine";
  maximumCandidateOutputTokens: 4096;
  automaticDownloadAllowed: false;
  paidExecutionAllowed: false;
}>;

export type CodexForgeQwen25Coder32BQualificationEvidence = Readonly<{
  schemaVersion: "codexforge-qwen2-5-coder-32b-qualification-evidence-v1";
  qualificationState: "qualified";
  identity: CodexForgeQwen25Coder32BExactIdentity;
  qualifiedCapabilities: readonly ["text-generation"];
  metadataRequestCount: 2;
  generationAttemptCount: 0;
  observedMetadataDigest: CodexForgeQwen25Coder32BSliceRDigest;
  observedAt: string;
  validUntil: string;
  rawMetadataStored: false;
  contentDigest: CodexForgeQwen25Coder32BSliceRDigest;
}>;

export type CodexForgeQwen25Coder32BQualificationRejection = Readonly<{
  schemaVersion: "codexforge-qwen2-5-coder-32b-qualification-rejection-v1";
  qualificationState: "rejected" | "canceled";
  codes: readonly CodexForgeQwen25Coder32BQualificationRejectionCode[];
}>;

export type CodexForgeQwen25Coder32BQualificationResult =
  | Readonly<{ ok: true; value: CodexForgeQwen25Coder32BQualificationEvidence }>
  | Readonly<{ ok: false; rejection: CodexForgeQwen25Coder32BQualificationRejection }>;

export type CodexForgeQwen25Coder32BAcceptanceContract = Readonly<{
  promptId: "codexforge-qwen2-5-coder-32b-typescript-marker-v1";
  prompt: "Return exactly this single line of ASCII TypeScript and nothing else: export const codexForgeSliceR = 32;";
  promptUtf8Bytes: 105;
  promptSha256: "25c5194982f30559a885a007c3bff63c3a8d2f32aec19dbec9c410882443cd30";
  expectedOutput: "export const codexForgeSliceR = 32;";
  expectedOutputUtf8Bytes: 35;
  expectedOutputSha256: "e8bbd494ebcb4bb38f634493cc98b09a379f31a2a7b970592495a09e483c95e1";
  maximumPromptUtf8Bytes: 128;
  maximumOutputTokens: 64;
  maximumOutputUtf8Bytes: 256;
  maximumResponseBytes: 65_536;
  timeoutMs: 300_000;
}>;

export type CodexForgeQwen25Coder32BAcceptanceApproval = Readonly<{
  schemaVersion: "codexforge-qwen2-5-coder-32b-acceptance-approval-v1";
  approvalId: string;
  approvalNonce: string;
  approvedAt: string;
  expiresAt: string;
  candidateContentSha256: CodexForgeQwen25Coder32BExactIdentity["candidateContentSha256"];
  qualificationEvidenceSha256: string;
  promptId: CodexForgeQwen25Coder32BAcceptanceContract["promptId"];
  maximumOutputTokens: 64;
  timeoutMs: 300_000;
  maximumProviderAttempts: 1;
  localOnlyAcknowledgement: "approved-local-machine-only";
  singleAttemptAcknowledgement: "approved-one-generation-attempt-with-no-retry-or-fallback";
  redactedEvidenceAcknowledgement: "approved-redacted-evidence-only";
  contentDigest: CodexForgeQwen25Coder32BSliceRDigest;
}>;

export type CodexForgeQwen25Coder32BExecutionProof = Readonly<{
  approvalConsumed: true;
  attemptBudget: 1;
  generationAttemptCount: 1;
  retryCount: 0;
  fallbackCount: 0;
  rerouteCount: 0;
  providerSubstitutionCount: 0;
  modelSubstitutionCount: 0;
  automaticDownloadCount: 0;
  cloudRequestCount: 0;
}>;

export type CodexForgeQwen25Coder32BLiveAcceptanceEvidence = Readonly<{
  schemaVersion: "codexforge-qwen2-5-coder-32b-live-acceptance-evidence-v1";
  acceptanceState: "accepted";
  identity: CodexForgeQwen25Coder32BExactIdentity;
  implementationCheckpointCommit: string;
  qualificationEvidenceSha256: string;
  approvalDigestSha256: string;
  normalizedMetadataSha256: string;
  promptId: CodexForgeQwen25Coder32BAcceptanceContract["promptId"];
  promptSha256: CodexForgeQwen25Coder32BAcceptanceContract["promptSha256"];
  promptUtf8Bytes: 105;
  expectedOutputSha256: CodexForgeQwen25Coder32BAcceptanceContract["expectedOutputSha256"];
  outputSha256: string;
  requestUtf8Bytes: number;
  responseUtf8Bytes: number;
  outputUtf8Bytes: number;
  evalCount: number;
  doneReason: string;
  totalDurationNanoseconds: number | null;
  loadDurationNanoseconds: number | null;
  promptEvalCount: number | null;
  toolCallCount: 0;
  imageCount: 0;
  executionProof: CodexForgeQwen25Coder32BExecutionProof;
  rawMetadataStored: false;
  rawPromptStored: false;
  rawOutputStored: false;
  rawProviderResponseStored: false;
  operatorIdentityStored: false;
  machinePathStored: false;
  privateAlphaRunDataStored: false;
  evidenceAdmissionState: "pending-manual-review";
  acceptedAt: string;
  contentDigest: CodexForgeQwen25Coder32BSliceRDigest;
}>;

export type CodexForgeQwen25Coder32BAcceptanceRejection = Readonly<{
  schemaVersion: "codexforge-qwen2-5-coder-32b-acceptance-rejection-v1";
  acceptanceState: "rejected" | "canceled";
  codes: readonly CodexForgeQwen25Coder32BAcceptanceRejectionCode[];
  generationAttemptCount: 0 | 1;
  approvalConsumed: boolean;
}>;

export type CodexForgeQwen25Coder32BAcceptanceResult =
  | Readonly<{ ok: true; value: CodexForgeQwen25Coder32BLiveAcceptanceEvidence }>
  | Readonly<{ ok: false; rejection: CodexForgeQwen25Coder32BAcceptanceRejection }>;

export type CodexForgeQwen25Coder32BEvidenceAdmission = Readonly<{
  schemaVersion: "codexforge-qwen2-5-coder-32b-evidence-admission-v1";
  admissionState: "admitted";
  acceptanceEvidenceSha256: string;
  implementationCheckpointCommit: string;
  reviewedAt: string;
  productionRegistryAdmission: "not-granted";
  routingAdmission: "not-granted";
  executionAdmission: "not-granted";
  contentDigest: CodexForgeQwen25Coder32BSliceRDigest;
}>;

export type CodexForgeQwen25Coder32BEvidenceAdmissionResult =
  | Readonly<{ ok: true; value: CodexForgeQwen25Coder32BEvidenceAdmission }>
  | Readonly<{
      ok: false;
      rejection: Readonly<{
        schemaVersion: "codexforge-qwen2-5-coder-32b-evidence-admission-rejection-v1";
        admissionState: "rejected";
        codes: readonly CodexForgeQwen25Coder32BEvidenceAdmissionRejectionCode[];
      }>;
    }>;
