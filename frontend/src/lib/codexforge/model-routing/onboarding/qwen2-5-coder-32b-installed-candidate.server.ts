import "server-only";

import { createHash } from "node:crypto";
import { isProxy } from "node:util/types";
import {
  CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
  CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS,
  CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
  CODEXFORGE_ONBOARDING_KILL_SWITCH_CHECKPOINTS,
  CODEXFORGE_ONBOARDING_MAXIMUM_LOCAL_OUTPUT_TOKENS,
} from "./onboarding-constants";
import { freezeCodexForgeOnboardingValue } from "./onboarding-canonicalization.server";
import type {
  CodexForgeModelOnboardingPacket,
  CodexForgeOnboardingContentDigest,
} from "./onboarding-types";
import {
  CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_REJECTION_CODES,
  type CodexForgeQwen25Coder32BCandidateAuthorityBinding,
  type CodexForgeQwen25Coder32BCandidateRejectionCode,
  type CodexForgeQwen25Coder32BCandidateValidationResult,
  type CodexForgeQwen25Coder32BInstallationEvidence,
  type CodexForgeQwen25Coder32BInstalledCandidate,
} from "./qwen2-5-coder-32b-installed-candidate-types";

export const CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_SCHEMA_VERSION =
  "codexforge-exact-installed-local-model-candidate-v1" as const;
export const CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_VERSION =
  "codexforge-qwen2-5-coder-32b-candidate-declaration-v1" as const;
export const CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_ID =
  "codexforge-ollama-local-qwen2-5-coder-32b-candidate-20260730" as const;
export const CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_VERSION =
  "codexforge-qwen2-5-coder-32b-installation-observation-v1" as const;
export const CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ID =
  "codexforge-ollama-local-qwen2-5-coder-32b-installation-observation-20260730" as const;
export const CODEXFORGE_QWEN25_CODER_32B_AUTHORITY_VERSION =
  "codexforge-qwen2-5-coder-32b-candidate-authority-v1" as const;
export const CODEXFORGE_QWEN25_CODER_32B_PROVIDER_KEY = "ollama-local" as const;
export const CODEXFORGE_QWEN25_CODER_32B_MODEL_ID =
  "qwen2.5-coder:32b" as const;
export const CODEXFORGE_QWEN25_CODER_32B_MODEL_KEY =
  "ollama-local::qwen2.5-coder:32b" as const;
export const CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST =
  "b92d6a0bd47ee79114298de0177bf920c05a706d12633950b3936778492bef41" as const;
export const CODEXFORGE_QWEN25_CODER_32B_DIGEST_PREFIX_12 =
  "b92d6a0bd47e" as const;
export const CODEXFORGE_QWEN25_CODER_32B_MAXIMUM_OUTPUT_TOKENS =
  CODEXFORGE_ONBOARDING_MAXIMUM_LOCAL_OUTPUT_TOKENS;

// These pinned literals are checksums of the source-owned canonical projections,
// never authority grants.
export const CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ARTIFACT_SHA256 =
  "dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90" as const;
export const CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_CONTENT_SHA256 =
  "a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f" as const;

const LOWER_HEX_64_PATTERN = /^[a-f0-9]{64}$/;
const SECRET_KEY_PATTERN =
  /(?:api[-_]?key|password|private[-_]?key|client[-_]?secret|authorization|credential[-_]?(?:value|secret)|access[-_]?token|refresh[-_]?token|bearer)/i;
const SECRET_VALUE_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /^Bearer\s+\S+/i,
  /^(?:gsk_|sk-)[A-Za-z0-9_-]{12,}$/,
  /^AKIA[A-Z0-9]{16}$/,
  /^AIza[A-Za-z0-9_-]{20,}$/,
] as const;

type SafeRecord = Record<string, unknown>;

function compareCodeUnits(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function isPlainRecord(value: unknown): value is SafeRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function addCode(
  codes: CodexForgeQwen25Coder32BCandidateRejectionCode[],
  code: CodexForgeQwen25Coder32BCandidateRejectionCode
): void {
  if (!codes.includes(code)) {
    codes.push(code);
  }
}

function looksLikeSecretValue(value: string): boolean {
  return SECRET_VALUE_PATTERNS.some((pattern) => pattern.test(value));
}

function auditPlainData(
  value: unknown,
  codes: CodexForgeQwen25Coder32BCandidateRejectionCode[]
): void {
  const visited = new WeakSet<object>();
  const ancestors = new WeakSet<object>();
  let visitedValues = 0;

  function visit(current: unknown, depth: number): void {
    if (depth > CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumNestingDepth) {
      addCode(codes, "maximum-nesting-depth-exceeded");
      return;
    }
    visitedValues += 1;
    if (
      visitedValues >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumVisitedValues
    ) {
      addCode(codes, "maximum-visited-values-exceeded");
      return;
    }
    if (current === null || typeof current === "boolean") {
      return;
    }
    if (typeof current === "string") {
      if (
        current.length >
        CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumStringLength
      ) {
        addCode(codes, "maximum-string-length-exceeded");
      }
      if (looksLikeSecretValue(current)) {
        addCode(codes, "secret-material-detected");
      }
      return;
    }
    if (typeof current === "number") {
      if (!Number.isFinite(current)) {
        addCode(codes, "input-not-plain-data");
      }
      return;
    }
    if (typeof current === "function") {
      addCode(codes, "function-value-rejected");
      return;
    }
    if (typeof current === "symbol") {
      addCode(codes, "symbol-value-rejected");
      return;
    }
    if (typeof current !== "object") {
      addCode(codes, "input-not-plain-data");
      return;
    }
    if (isProxy(current)) {
      addCode(codes, "input-not-plain-data");
      return;
    }
    if (ancestors.has(current)) {
      addCode(codes, "cycle-detected");
      return;
    }
    if (visited.has(current)) {
      addCode(codes, "shared-reference-detected");
      return;
    }
    visited.add(current);
    ancestors.add(current);

    const array = Array.isArray(current);
    const prototype = Object.getPrototypeOf(current);
    if (
      (array && prototype !== Array.prototype) ||
      (!array && prototype !== Object.prototype && prototype !== null)
    ) {
      addCode(codes, "exotic-prototype-rejected");
      ancestors.delete(current);
      return;
    }
    if (
      array &&
      current.length > CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumArrayItems
    ) {
      addCode(codes, "maximum-array-items-exceeded");
    }

    const descriptors = Object.getOwnPropertyDescriptors(current);
    const keys = Reflect.ownKeys(descriptors);
    const dataKeys = keys.filter((key) => key !== "length");
    if (
      dataKeys.length >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumObjectKeys
    ) {
      addCode(codes, "maximum-object-keys-exceeded");
    }
    if (array) {
      for (let index = 0; index < current.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(current, index)) {
          addCode(codes, "sparse-array-rejected");
          break;
        }
      }
    }
    for (const key of dataKeys) {
      if (typeof key === "symbol") {
        addCode(codes, "symbol-key-rejected");
        continue;
      }
      const descriptor = descriptors[key];
      if (!descriptor || descriptor.get || descriptor.set) {
        addCode(codes, "accessor-property-rejected");
        continue;
      }
      if (!descriptor.enumerable) {
        addCode(codes, "input-not-plain-data");
      }
      if (SECRET_KEY_PATTERN.test(key)) {
        addCode(codes, "secret-material-detected");
      }
      visit(descriptor.value, depth + 1);
    }
    ancestors.delete(current);
  }

  visit(value, 0);
}

function normalizeCanonicalValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeCanonicalValue);
  }
  if (isPlainRecord(value)) {
    const normalized: SafeRecord = {};
    for (const key of Object.keys(value).sort(compareCodeUnits)) {
      normalized[key] = normalizeCanonicalValue(value[key]);
    }
    return normalized;
  }
  return value;
}

function canonicalizeChecked(value: unknown): string {
  const codes: CodexForgeQwen25Coder32BCandidateRejectionCode[] = [];
  auditPlainData(value, codes);
  if (codes.length > 0) {
    throw new Error("Cannot canonicalize rejected Slice Q plain data.");
  }
  const canonicalJson = JSON.stringify(normalizeCanonicalValue(value));
  if (
    Buffer.byteLength(canonicalJson, "utf8") >
    CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumCanonicalUtf8Bytes
  ) {
    throw new Error("Slice Q canonical payload exceeds the Slice P limit.");
  }
  return canonicalJson;
}

function calculateDigest(canonicalJson: string): CodexForgeOnboardingContentDigest {
  return Object.freeze({
    algorithm: CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
    canonicalizationVersion: CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
    sha256: createHash("sha256").update(canonicalJson, "utf8").digest("hex"),
  });
}

function omitOwnField(record: SafeRecord, excludedKey: string): SafeRecord {
  const projection: SafeRecord = {};
  for (const key of Object.keys(record)) {
    if (key !== excludedKey) {
      projection[key] = record[key];
    }
  }
  return projection;
}

export function canonicalizeCodexForgeQwen25Coder32BInstallationEvidence(
  evidence: unknown
): string {
  if (!isPlainRecord(evidence)) {
    throw new Error("Slice Q installation evidence must be a plain object.");
  }
  return canonicalizeChecked(omitOwnField(evidence, "artifactDigest"));
}

export function canonicalizeCodexForgeQwen25Coder32BCandidate(
  candidate: unknown
): string {
  if (!isPlainRecord(candidate)) {
    throw new Error("Slice Q candidate must be a plain object.");
  }
  return canonicalizeChecked(omitOwnField(candidate, "contentDigest"));
}

export const CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_AUTHORITY =
  freezeCodexForgeOnboardingValue({
    authorityVersion: CODEXFORGE_QWEN25_CODER_32B_AUTHORITY_VERSION,
    asOfDate: "2026-07-30",
    providerRelationship: "existing-production-provider-reference",
    adapterId: "private-alpha-ollama-adapter",
    providerKey: CODEXFORGE_QWEN25_CODER_32B_PROVIDER_KEY,
    protocol: "ollama-native-http-v1",
    locality: "local",
    dataBoundary: "local-machine",
    credentialMode: "none",
    permittedModelId: CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
    permittedModelKey: CODEXFORGE_QWEN25_CODER_32B_MODEL_KEY,
    requiredInstalledDigestSha256: CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST,
    qualificationAuthority: "none",
    liveAcceptanceAuthority: "none",
    manualExecutionAdmissionAuthority: "none",
    automaticRoutingAdmissionAuthority: "none",
    registryActivationAuthority: "none",
    catalogActivationAuthority: "none",
  } satisfies CodexForgeQwen25Coder32BCandidateAuthorityBinding);

export const CODEXFORGE_QWEN25_CODER_32B_MODEL_CANDIDATE =
  freezeCodexForgeOnboardingValue({
    packetKind: "model",
    providerKey: CODEXFORGE_QWEN25_CODER_32B_PROVIDER_KEY,
    modelKey: CODEXFORGE_QWEN25_CODER_32B_MODEL_KEY,
    identity: {
      providerId: CODEXFORGE_QWEN25_CODER_32B_PROVIDER_KEY,
      modelId: CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
      displayName: "Qwen2.5 Coder 32B",
    },
    adapter: {
      adapterId: "private-alpha-ollama-adapter",
      protocol: "ollama-native-http-v1",
    },
    locality: "local",
    dataBoundary: "local-machine",
    credentialMode: "none",
    capabilities: ["text-generation"],
    inputModalities: ["text"],
    outputModalities: ["text"],
    limits: {
      providerReportedContextWindowTokens: 32_768,
      providerReportedMaximumOutputTokens: null,
      requestedAdmissionMaximumOutputTokens:
        CODEXFORGE_QWEN25_CODER_32B_MAXIMUM_OUTPUT_TOKENS,
    },
    cost: {
      classification: "local-no-provider-token-charge",
      billingEnabled: false,
      trialCreditOnly: false,
      freeTierVerificationState: "not-applicable-local",
      evidence: null,
    },
    capabilityVerification: { state: "unverified", evidence: null },
    modelQualification: { state: "not-qualified", evidence: null },
    liveAcceptance: { state: "not-accepted", evidence: null },
    manualExecutionAdmission: { state: "not-admitted", evidence: null },
    automaticRoutingAdmission: {
      state: "not-admitted",
      evidence: null,
      modes: [],
    },
    approvalRequirements: {
      manualApprovalBeforeEveryExecution: true,
      exactModelApprovalBinding: true,
      cloudDataTransferRequirement: "not-required",
      requiredCloudDataTransferAcknowledgement: null,
      requiredCloudExecutionAcknowledgement: null,
      requiredFreeTierExecutionConfirmation: null,
    },
    executionPosture: {
      killSwitchCheckpoints: [...CODEXFORGE_ONBOARDING_KILL_SWITCH_CHECKPOINTS],
      maximumProviderAttempts: 1,
      retryAllowed: false,
      fallbackAllowed: false,
      reroutingAfterPersistenceAllowed: false,
      providerSubstitutionAllowed: false,
      modelSubstitutionAllowed: false,
      automaticModelSizeSwitchingAllowed: false,
      paidExecutionAllowed: false,
    },
    installationPosture: {
      state: "operator-managed-local-install",
      automaticModelDownloadAllowed: false,
    },
  } satisfies CodexForgeModelOnboardingPacket);

const installationEvidenceDraft = {
  evidenceKind: "ollama-local-installation-observation",
  evidenceVersion: CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_VERSION,
  evidenceId: CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ID,
  asOfDate: "2026-07-30",
  observationStartedAt: "2026-07-30T17:10:30.7425135Z",
  observationCompletedAt: "2026-07-30T17:10:30.9034990Z",
  source: "ollama-localhost-metadata-api",
  providerKey: CODEXFORGE_QWEN25_CODER_32B_PROVIDER_KEY,
  modelId: CODEXFORGE_QWEN25_CODER_32B_MODEL_ID,
  modelKey: CODEXFORGE_QWEN25_CODER_32B_MODEL_KEY,
  installedModelDigestSha256: CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST,
  observedDigestPrefix12: CODEXFORGE_QWEN25_CODER_32B_DIGEST_PREFIX_12,
  digestPrefixPurpose: "display-and-inventory-only",
  sizeBytes: 19_851_349_898,
  modifiedAt: "2026-03-04T19:06:19.4791617Z",
  format: "gguf",
  family: "qwen2",
  families: ["qwen2"],
  parameterSize: "32.8B",
  parameterCount: 32_763_876_352,
  quantizationLevel: "Q4_K_M",
  contextLengthTokens: 32_768,
  embeddingLength: 5_120,
  baseModel: "Qwen2.5 Coder 32B",
  fineTune: "Instruct",
  licenseMetadata: "apache-2.0",
  ollamaDeclaredCapabilities: ["completion", "tools", "insert"],
  content: {
    template: {
      sha256: "1e65450c30670713aa47fe23e8b9662bdf4065e81cc8e3cbfaa98924fcc0d320",
      utf8Bytes: 1_615,
    },
    parameters: null,
    license: {
      sha256: "832dd9e00a68dd83b3c3fb9f5588dad7dcf337a0db50f7d9483f310cd292e92e",
      utf8Bytes: 11_343,
    },
    system: {
      sha256: "66b9ea09bd5b7099cbb4fc820f31b575c0366fa439b08245566692c6784e281e",
      utf8Bytes: 68,
    },
    modelfile: {
      sha256: "a6965de38f838ed1483c856796f955ccfbe040939c4ea8802601987f979a65e7",
      utf8Bytes: 13_303,
    },
  },
  trust: {
    localInstallationObserved: true,
    runtimeAvailabilityEstablished: false,
    capabilityQualificationGranted: false,
    liveAcceptanceGranted: false,
    manualExecutionAdmissionGranted: false,
    automaticRoutingAdmissionGranted: false,
    registryOrCatalogActivationGranted: false,
  },
} as const;

const calculatedEvidenceDigest = calculateDigest(
  canonicalizeChecked(installationEvidenceDraft)
);

export const CODEXFORGE_QWEN25_CODER_32B_INSTALLATION_EVIDENCE =
  freezeCodexForgeOnboardingValue({
    ...installationEvidenceDraft,
    artifactDigest: calculatedEvidenceDigest,
  } satisfies CodexForgeQwen25Coder32BInstallationEvidence);

const candidateDraft = {
  schemaVersion: CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_SCHEMA_VERSION,
  candidateVersion: CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_VERSION,
  candidateId: CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_ID,
  candidateState: "candidate-declaration-only",
  validationPosture: "static-only",
  providerRelationship: "existing-production-provider-reference",
  authorityBinding: CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_AUTHORITY,
  modelPacket: CODEXFORGE_QWEN25_CODER_32B_MODEL_CANDIDATE,
  installationEvidence: CODEXFORGE_QWEN25_CODER_32B_INSTALLATION_EVIDENCE,
  activation: {
    registryMembership: "candidate-only",
    catalogMembership: "candidate-only",
    manualSelectionVisibility: "none",
    automaticRoutingVisibility: "none",
    privateAlphaVisibility: "none",
    runtimeVisibility: "none",
    uiVisibility: "none",
    apiVisibility: "none",
    registryActivation: "impossible",
    catalogActivation: "impossible",
  },
  requestApproval: "not-recorded",
  execution: "impossible",
} as const;

const calculatedCandidateDigest = calculateDigest(
  canonicalizeChecked(candidateDraft)
);

export const CODEXFORGE_QWEN25_CODER_32B_INSTALLED_CANDIDATE =
  freezeCodexForgeOnboardingValue({
    ...candidateDraft,
    contentDigest: calculatedCandidateDigest,
  } satisfies CodexForgeQwen25Coder32BInstalledCandidate);

function collectUnknownFields(
  input: unknown,
  expected: unknown,
  codes: CodexForgeQwen25Coder32BCandidateRejectionCode[]
): void {
  if (Array.isArray(expected)) {
    if (!Array.isArray(input)) {
      return;
    }
    for (let index = 0; index < Math.min(input.length, expected.length); index += 1) {
      collectUnknownFields(input[index], expected[index], codes);
    }
    return;
  }
  if (!isPlainRecord(expected) || !isPlainRecord(input)) {
    return;
  }
  const expectedKeys = new Set(Object.keys(expected));
  for (const key of Object.keys(input)) {
    if (!expectedKeys.has(key)) {
      addCode(codes, SECRET_KEY_PATTERN.test(key) ? "secret-material-detected" : "unknown-field");
      continue;
    }
    collectUnknownFields(input[key], expected[key], codes);
  }
}

function readNestedRecord(record: SafeRecord, key: string): SafeRecord | null {
  return isPlainRecord(record[key]) ? record[key] : null;
}

function readDigestSha256(value: unknown): string | null {
  if (!isPlainRecord(value) || typeof value.sha256 !== "string") {
    return null;
  }
  return value.sha256;
}

function buildFailure(
  incomingCodes: CodexForgeQwen25Coder32BCandidateRejectionCode[]
): CodexForgeQwen25Coder32BCandidateValidationResult {
  const order = new Map(
    CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_REJECTION_CODES.map((code, index) => [
      code,
      index,
    ])
  );
  const sorted = [...new Set(incomingCodes)].sort(
    (left, right) =>
      (order.get(left) ?? Number.MAX_SAFE_INTEGER) -
      (order.get(right) ?? Number.MAX_SAFE_INTEGER)
  );
  const maximum = CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumReturnedIssues;
  const truncated = sorted.length > maximum;
  const selected = truncated
    ? [
        ...sorted.slice(0, maximum - 1),
        "rejection-limit-reached" as const,
      ]
    : sorted;
  return freezeCodexForgeOnboardingValue({
    ok: false,
    rejection: {
      rejectionVersion:
        "codexforge-qwen2-5-coder-32b-candidate-rejection-v1" as const,
      codes: selected,
      truncated,
    },
  });
}

function cloneFrozenCandidate(): CodexForgeQwen25Coder32BInstalledCandidate {
  return freezeCodexForgeOnboardingValue(
    JSON.parse(
      JSON.stringify(CODEXFORGE_QWEN25_CODER_32B_INSTALLED_CANDIDATE)
    ) as CodexForgeQwen25Coder32BInstalledCandidate
  );
}

export function validateCodexForgeQwen25Coder32BInstalledCandidate(
  input: unknown
): CodexForgeQwen25Coder32BCandidateValidationResult {
  const codes: CodexForgeQwen25Coder32BCandidateRejectionCode[] = [];
  auditPlainData(input, codes);
  if (!isPlainRecord(input)) {
    addCode(codes, "input-not-plain-data");
    return buildFailure(codes);
  }
  if (codes.length > 0) {
    return buildFailure(codes);
  }
  collectUnknownFields(
    input,
    CODEXFORGE_QWEN25_CODER_32B_INSTALLED_CANDIDATE,
    codes
  );

  const modelPacket = readNestedRecord(input, "modelPacket");
  const identity = modelPacket ? readNestedRecord(modelPacket, "identity") : null;
  const modelId = identity?.modelId;
  if (typeof modelId === "string" && /:latest$/i.test(modelId)) {
    addCode(codes, "mutable-model-id-rejected");
  }

  const evidence = readNestedRecord(input, "installationEvidence");
  const installedDigest = evidence?.installedModelDigestSha256;
  if (
    typeof installedDigest !== "string" ||
    !LOWER_HEX_64_PATTERN.test(installedDigest)
  ) {
    addCode(codes, "full-digest-required");
  } else if (installedDigest !== CODEXFORGE_QWEN25_CODER_32B_FULL_DIGEST) {
    addCode(codes, "installation-digest-mismatch");
  }

  if (evidence) {
    try {
      const calculated = calculateDigest(
        canonicalizeCodexForgeQwen25Coder32BInstallationEvidence(evidence)
      ).sha256;
      const incoming = readDigestSha256(evidence.artifactDigest);
      if (
        incoming !== calculated ||
        incoming !== CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ARTIFACT_SHA256
      ) {
        addCode(codes, "artifact-digest-mismatch");
      }
    } catch {
      addCode(codes, "artifact-digest-mismatch");
    }
  } else {
    addCode(codes, "candidate-contract-mismatch");
  }

  try {
    const calculated = calculateDigest(
      canonicalizeCodexForgeQwen25Coder32BCandidate(input)
    ).sha256;
    const incoming = readDigestSha256(input.contentDigest);
    if (
      incoming !== calculated ||
      incoming !== CODEXFORGE_QWEN25_CODER_32B_CANDIDATE_CONTENT_SHA256
    ) {
      addCode(codes, "content-digest-mismatch");
    }
  } catch {
    addCode(codes, "content-digest-mismatch");
  }

  try {
    if (
      canonicalizeChecked(input) !==
      canonicalizeChecked(CODEXFORGE_QWEN25_CODER_32B_INSTALLED_CANDIDATE)
    ) {
      addCode(codes, "candidate-contract-mismatch");
    }
  } catch {
    addCode(codes, "candidate-contract-mismatch");
  }

  if (codes.length > 0) {
    return buildFailure(codes);
  }
  return freezeCodexForgeOnboardingValue({
    ok: true,
    value: cloneFrozenCandidate(),
  });
}

export function getCodexForgeQwen25Coder32BInstalledCandidate(): CodexForgeQwen25Coder32BInstalledCandidate {
  return cloneFrozenCandidate();
}

export function getCodexForgeQwen25Coder32BCalculatedDigests(): Readonly<{
  evidenceArtifactSha256: string;
  candidateContentSha256: string;
}> {
  return Object.freeze({
    evidenceArtifactSha256: calculatedEvidenceDigest.sha256,
    candidateContentSha256: calculatedCandidateDigest.sha256,
  });
}
