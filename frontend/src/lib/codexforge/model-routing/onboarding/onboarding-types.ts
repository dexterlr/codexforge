import type {
  CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
  CODEXFORGE_ONBOARDING_COST_CLASSIFICATIONS,
  CODEXFORGE_ONBOARDING_CREDENTIAL_MODES,
  CODEXFORGE_ONBOARDING_DATA_BOUNDARIES,
  CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
  CODEXFORGE_ONBOARDING_LOCALITIES,
  CODEXFORGE_ONBOARDING_MODALITIES,
  CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS,
  CODEXFORGE_ONBOARDING_REJECTION_CODES,
  CODEXFORGE_ONBOARDING_REJECTION_VERSION,
  CODEXFORGE_ONBOARDING_SCHEMA_VERSION,
  CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION,
} from "./onboarding-constants";

export type CodexForgeOnboardingProviderProtocol =
  typeof CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS[number];
export type CodexForgeOnboardingLocality =
  typeof CODEXFORGE_ONBOARDING_LOCALITIES[number];
export type CodexForgeOnboardingDataBoundary =
  typeof CODEXFORGE_ONBOARDING_DATA_BOUNDARIES[number];
export type CodexForgeOnboardingCredentialMode =
  typeof CODEXFORGE_ONBOARDING_CREDENTIAL_MODES[number];
export type CodexForgeOnboardingCostClassification =
  typeof CODEXFORGE_ONBOARDING_COST_CLASSIFICATIONS[number];
export type CodexForgeOnboardingModality =
  typeof CODEXFORGE_ONBOARDING_MODALITIES[number];
export type CodexForgeOnboardingRejectionCode =
  typeof CODEXFORGE_ONBOARDING_REJECTION_CODES[number];

export type CodexForgeOnboardingProviderKey = string;
export type CodexForgeOnboardingModelId = string;
export type CodexForgeOnboardingModelKey = `${string}::${string}`;

export type CodexForgeOnboardingContentDigest = Readonly<{
  algorithm: typeof CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM;
  canonicalizationVersion:
    typeof CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION;
  sha256: string;
}>;

export type CodexForgeOnboardingEvidenceKind =
  | "capability-verification"
  | "free-tier-verification"
  | "provider-qualification"
  | "model-qualification"
  | "exact-model-live-acceptance"
  | "manual-execution-admission";

export type CodexForgeOnboardingEvidenceScope =
  | Readonly<{
      level: "provider";
      providerKey: CodexForgeOnboardingProviderKey;
    }>
  | Readonly<{
      level: "model";
      providerKey: CodexForgeOnboardingProviderKey;
      modelKey: CodexForgeOnboardingModelKey;
    }>;

export type CodexForgeOnboardingEvidenceReference = Readonly<{
  evidenceId: string;
  evidenceVersion: string;
  kind: CodexForgeOnboardingEvidenceKind;
  scope: CodexForgeOnboardingEvidenceScope;
  provenance:
    | "repository-deterministic-smoke"
    | "repository-live-acceptance"
    | "operator-reviewed-official-provider-documentation";
  artifactSha256: string;
  checkpointCommit: string;
  observedOn: string;
  validThrough: string | null;
}>;

export type CodexForgeOnboardingEvidenceGate<TState extends string> = Readonly<{
  state: TState;
  evidence: CodexForgeOnboardingEvidenceReference | null;
}>;

export type CodexForgeProviderOnboardingPacket = Readonly<{
  packetKind: "provider";
  providerKey: CodexForgeOnboardingProviderKey;
  identity: Readonly<{
    providerId: string;
    displayName: string;
  }>;
  adapter: Readonly<{
    adapterId: string;
    protocol: CodexForgeOnboardingProviderProtocol;
  }>;
  locality: CodexForgeOnboardingLocality;
  dataBoundary: CodexForgeOnboardingDataBoundary;
  credentialMode: CodexForgeOnboardingCredentialMode;
  qualification: CodexForgeOnboardingEvidenceGate<
    "not-qualified" | "qualified"
  >;
}>;

export type CodexForgeModelOnboardingPacket = Readonly<{
  packetKind: "model";
  providerKey: CodexForgeOnboardingProviderKey;
  modelKey: CodexForgeOnboardingModelKey;
  identity: Readonly<{
    providerId: string;
    modelId: CodexForgeOnboardingModelId;
    displayName: string;
  }>;
  adapter: Readonly<{
    adapterId: string;
    protocol: CodexForgeOnboardingProviderProtocol;
  }>;
  locality: CodexForgeOnboardingLocality;
  dataBoundary: CodexForgeOnboardingDataBoundary;
  credentialMode: CodexForgeOnboardingCredentialMode;
  capabilities: readonly string[];
  inputModalities: readonly CodexForgeOnboardingModality[];
  outputModalities: readonly CodexForgeOnboardingModality[];
  limits: Readonly<{
    providerReportedContextWindowTokens: number | null;
    providerReportedMaximumOutputTokens: number | null;
    requestedAdmissionMaximumOutputTokens: number;
  }>;
  cost: Readonly<{
    classification: CodexForgeOnboardingCostClassification;
    billingEnabled: boolean;
    trialCreditOnly: boolean;
    freeTierVerificationState:
      | "not-applicable-local"
      | "unverified"
      | "verified-current";
    evidence: CodexForgeOnboardingEvidenceReference | null;
  }>;
  capabilityVerification: CodexForgeOnboardingEvidenceGate<
    "unverified" | "verified"
  >;
  modelQualification: CodexForgeOnboardingEvidenceGate<
    "not-qualified" | "qualified"
  >;
  liveAcceptance: CodexForgeOnboardingEvidenceGate<
    "not-accepted" | "accepted"
  >;
  manualExecutionAdmission: CodexForgeOnboardingEvidenceGate<
    "not-admitted" | "admitted"
  >;
  automaticRoutingAdmission: Readonly<{
    state: "not-admitted";
    evidence: null;
    modes: readonly [];
  }>;
  approvalRequirements: Readonly<{
    manualApprovalBeforeEveryExecution: true;
    exactModelApprovalBinding: true;
    cloudDataTransferRequirement:
      | "not-required"
      | "explicit-operator-acknowledgement-required";
    requiredCloudDataTransferAcknowledgement:
      | null
      | "granted-for-approved-scope";
    requiredCloudExecutionAcknowledgement:
      | null
      | "granted-for-approved-scope-execution";
    requiredFreeTierExecutionConfirmation:
      | null
      | "operator-confirmed-current-free-tier";
  }>;
  executionPosture: Readonly<{
    killSwitchCheckpoints: readonly [
      "before-provider-adapter-resolution-or-credential-work",
      "immediately-before-provider-generation",
    ];
    maximumProviderAttempts: 1;
    retryAllowed: false;
    fallbackAllowed: false;
    reroutingAfterPersistenceAllowed: false;
    providerSubstitutionAllowed: false;
    modelSubstitutionAllowed: false;
    automaticModelSizeSwitchingAllowed: false;
    paidExecutionAllowed: false;
  }>;
  installationPosture: Readonly<{
    state: "operator-managed-local-install" | "not-applicable";
    automaticModelDownloadAllowed: false;
  }>;
}>;

export type CodexForgeOnboardingPacket =
  | CodexForgeProviderOnboardingPacket
  | CodexForgeModelOnboardingPacket;

export type CodexForgeOnboardingBundle = Readonly<{
  schemaVersion: typeof CODEXFORGE_ONBOARDING_SCHEMA_VERSION;
  bundleId: string;
  contentDigest: CodexForgeOnboardingContentDigest | null;
  packets: readonly CodexForgeOnboardingPacket[];
  activation: Readonly<{
    registryMembership: "candidate-only";
    catalogMembership: "candidate-only";
    routingVisibility: "none";
    uiVisibility: "none";
    runtimeVisibility: "none";
  }>;
}>;

export type CodexForgeOnboardingAdapterAuthority = Readonly<{
  adapterId: string;
  providerKey: string;
  protocol: CodexForgeOnboardingProviderProtocol;
  locality: CodexForgeOnboardingLocality;
  dataBoundary: CodexForgeOnboardingDataBoundary;
  credentialMode: CodexForgeOnboardingCredentialMode;
}>;

export type CodexForgeOnboardingValidationAuthority = Readonly<{
  policyVersion: typeof CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION;
  asOfDate: string;
  reservedProviderKeys: readonly string[];
  reservedModelKeys: readonly string[];
  adapterBindings: readonly CodexForgeOnboardingAdapterAuthority[];
  evidenceCatalog: readonly CodexForgeOnboardingEvidenceReference[];
}>;

export type CodexForgeOnboardingVerifiedStage =
  | "candidate-declared"
  | "capability-verified"
  | "cost-verified"
  | "provider-qualified"
  | "model-qualified"
  | "live-accepted"
  | "manual-execution-admitted";

export type CodexForgeValidatedOnboardingBundle = Readonly<{
  schemaVersion: typeof CODEXFORGE_ONBOARDING_SCHEMA_VERSION;
  bundleId: string;
  contentDigest: CodexForgeOnboardingContentDigest;
  packets: readonly CodexForgeOnboardingPacket[];
  activation: CodexForgeOnboardingBundle["activation"];
  derivedModelStages: readonly Readonly<{
    modelKey: CodexForgeOnboardingModelKey;
    highestVerifiedStage: CodexForgeOnboardingVerifiedStage;
  }>[];
  validation: Readonly<{
    policyVersion:
      typeof CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION;
    asOfDate: string;
  }>;
}>;

export type CodexForgeOnboardingRejectionIssue = Readonly<{
  code: CodexForgeOnboardingRejectionCode;
  packetKind: "bundle" | "provider" | "model";
  packetIndex: number | null;
}>;

export type CodexForgeOnboardingRejection = Readonly<{
  rejectionVersion: typeof CODEXFORGE_ONBOARDING_REJECTION_VERSION;
  codes: readonly CodexForgeOnboardingRejectionCode[];
  issues: readonly CodexForgeOnboardingRejectionIssue[];
  truncated: boolean;
}>;

export type CodexForgeOnboardingValidationResult =
  | Readonly<{
      ok: true;
      value: CodexForgeValidatedOnboardingBundle;
    }>
  | Readonly<{
      ok: false;
      rejection: CodexForgeOnboardingRejection;
    }>;
