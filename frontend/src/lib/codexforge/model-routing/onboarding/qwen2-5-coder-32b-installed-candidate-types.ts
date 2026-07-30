import type {
  CodexForgeModelOnboardingPacket,
  CodexForgeOnboardingAdapterAuthority,
  CodexForgeOnboardingContentDigest,
} from "./onboarding-types";

export type CodexForgeQwen25Coder32BObservedContentDigest = Readonly<{
  sha256: string;
  utf8Bytes: number;
}>;

export type CodexForgeQwen25Coder32BInstallationEvidence = Readonly<{
  evidenceKind: "ollama-local-installation-observation";
  evidenceVersion: "codexforge-qwen2-5-coder-32b-installation-observation-v1";
  evidenceId: "codexforge-ollama-local-qwen2-5-coder-32b-installation-observation-20260730";
  asOfDate: "2026-07-30";
  observationStartedAt: "2026-07-30T17:10:30.7425135Z";
  observationCompletedAt: "2026-07-30T17:10:30.9034990Z";
  source: "ollama-localhost-metadata-api";
  providerKey: "ollama-local";
  modelId: "qwen2.5-coder:32b";
  modelKey: "ollama-local::qwen2.5-coder:32b";
  installedModelDigestSha256: string;
  observedDigestPrefix12: "b92d6a0bd47e";
  digestPrefixPurpose: "display-and-inventory-only";
  sizeBytes: 19_851_349_898;
  modifiedAt: "2026-03-04T19:06:19.4791617Z";
  format: "gguf";
  family: "qwen2";
  families: readonly ["qwen2"];
  parameterSize: "32.8B";
  parameterCount: 32_763_876_352;
  quantizationLevel: "Q4_K_M";
  contextLengthTokens: 32_768;
  embeddingLength: 5_120;
  baseModel: "Qwen2.5 Coder 32B";
  fineTune: "Instruct";
  licenseMetadata: "apache-2.0";
  ollamaDeclaredCapabilities: readonly ["completion", "tools", "insert"];
  content: Readonly<{
    template: CodexForgeQwen25Coder32BObservedContentDigest;
    parameters: null;
    license: CodexForgeQwen25Coder32BObservedContentDigest;
    system: CodexForgeQwen25Coder32BObservedContentDigest;
    modelfile: CodexForgeQwen25Coder32BObservedContentDigest;
  }>;
  trust: Readonly<{
    localInstallationObserved: true;
    runtimeAvailabilityEstablished: false;
    capabilityQualificationGranted: false;
    liveAcceptanceGranted: false;
    manualExecutionAdmissionGranted: false;
    automaticRoutingAdmissionGranted: false;
    registryOrCatalogActivationGranted: false;
  }>;
  artifactDigest: CodexForgeOnboardingContentDigest;
}>;

export type CodexForgeQwen25Coder32BCandidateAuthorityBinding =
  CodexForgeOnboardingAdapterAuthority &
    Readonly<{
      authorityVersion: "codexforge-qwen2-5-coder-32b-candidate-authority-v1";
      asOfDate: "2026-07-30";
      providerRelationship: "existing-production-provider-reference";
      permittedModelId: "qwen2.5-coder:32b";
      permittedModelKey: "ollama-local::qwen2.5-coder:32b";
      requiredInstalledDigestSha256: string;
      qualificationAuthority: "none";
      liveAcceptanceAuthority: "none";
      manualExecutionAdmissionAuthority: "none";
      automaticRoutingAdmissionAuthority: "none";
      registryActivationAuthority: "none";
      catalogActivationAuthority: "none";
    }>;

export type CodexForgeQwen25Coder32BInstalledCandidate = Readonly<{
  schemaVersion: "codexforge-exact-installed-local-model-candidate-v1";
  candidateVersion: "codexforge-qwen2-5-coder-32b-candidate-declaration-v1";
  candidateId: "codexforge-ollama-local-qwen2-5-coder-32b-candidate-20260730";
  candidateState: "candidate-declaration-only";
  validationPosture: "static-only";
  providerRelationship: "existing-production-provider-reference";
  authorityBinding: CodexForgeQwen25Coder32BCandidateAuthorityBinding;
  modelPacket: CodexForgeModelOnboardingPacket;
  installationEvidence: CodexForgeQwen25Coder32BInstallationEvidence;
  activation: Readonly<{
    registryMembership: "candidate-only";
    catalogMembership: "candidate-only";
    manualSelectionVisibility: "none";
    automaticRoutingVisibility: "none";
    privateAlphaVisibility: "none";
    runtimeVisibility: "none";
    uiVisibility: "none";
    apiVisibility: "none";
    registryActivation: "impossible";
    catalogActivation: "impossible";
  }>;
  requestApproval: "not-recorded";
  execution: "impossible";
  contentDigest: CodexForgeOnboardingContentDigest;
}>;

export const CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_REJECTION_CODES = [
  "input-not-plain-data",
  "unknown-field",
  "maximum-nesting-depth-exceeded",
  "maximum-visited-values-exceeded",
  "maximum-object-keys-exceeded",
  "maximum-array-items-exceeded",
  "maximum-string-length-exceeded",
  "maximum-canonical-payload-exceeded",
  "accessor-property-rejected",
  "function-value-rejected",
  "symbol-value-rejected",
  "symbol-key-rejected",
  "cycle-detected",
  "shared-reference-detected",
  "exotic-prototype-rejected",
  "sparse-array-rejected",
  "secret-material-detected",
  "full-digest-required",
  "installation-digest-mismatch",
  "mutable-model-id-rejected",
  "artifact-digest-mismatch",
  "content-digest-mismatch",
  "candidate-contract-mismatch",
  "rejection-limit-reached",
] as const;

export type CodexForgeQwen25Coder32BCandidateRejectionCode =
  typeof CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_REJECTION_CODES[number];

export type CodexForgeQwen25Coder32BCandidateRejection = Readonly<{
  rejectionVersion: "codexforge-qwen2-5-coder-32b-candidate-rejection-v1";
  codes: readonly CodexForgeQwen25Coder32BCandidateRejectionCode[];
  truncated: boolean;
}>;

export type CodexForgeQwen25Coder32BCandidateValidationResult =
  | Readonly<{
      ok: true;
      value: CodexForgeQwen25Coder32BInstalledCandidate;
    }>
  | Readonly<{
      ok: false;
      rejection: CodexForgeQwen25Coder32BCandidateRejection;
    }>;
