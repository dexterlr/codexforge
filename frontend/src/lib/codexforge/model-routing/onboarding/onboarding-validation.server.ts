import "server-only";

import { isProxy } from "node:util/types";
import {
  CODEXFORGE_ONBOARDING_CLOUD_EXECUTION_ACKNOWLEDGEMENT,
  CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_ACKNOWLEDGEMENT,
  CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_ACKNOWLEDGEMENT_REQUIRED,
  CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_NOT_REQUIRED,
  CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
  CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS,
  CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
  CODEXFORGE_ONBOARDING_FREE_TIER_EXECUTION_CONFIRMATION,
  CODEXFORGE_ONBOARDING_KILL_SWITCH_CHECKPOINTS,
  CODEXFORGE_ONBOARDING_MAXIMUM_CLOUD_OUTPUT_TOKENS,
  CODEXFORGE_ONBOARDING_MAXIMUM_LOCAL_OUTPUT_TOKENS,
  CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS,
  CODEXFORGE_ONBOARDING_REJECTION_CODES,
  CODEXFORGE_ONBOARDING_REJECTION_VERSION,
  CODEXFORGE_ONBOARDING_SCHEMA_VERSION,
  CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION,
} from "./onboarding-constants";
import {
  CodexForgeOnboardingCanonicalizationError,
  calculateCodexForgeOnboardingContentDigest,
  freezeCodexForgeOnboardingValue,
} from "./onboarding-canonicalization.server";
import type {
  CodexForgeModelOnboardingPacket,
  CodexForgeOnboardingBundle,
  CodexForgeOnboardingEvidenceKind,
  CodexForgeOnboardingEvidenceReference,
  CodexForgeOnboardingLocality,
  CodexForgeOnboardingModelKey,
  CodexForgeOnboardingPacket,
  CodexForgeOnboardingProviderProtocol,
  CodexForgeOnboardingRejection,
  CodexForgeOnboardingRejectionCode,
  CodexForgeOnboardingRejectionIssue,
  CodexForgeOnboardingValidationAuthority,
  CodexForgeOnboardingValidationResult,
  CodexForgeOnboardingVerifiedStage,
  CodexForgeProviderOnboardingPacket,
} from "./onboarding-types";

type PacketLocation = Readonly<{
  packetKind: "bundle" | "provider" | "model";
  packetIndex: number | null;
}>;

type MutableIssue = {
  code: CodexForgeOnboardingRejectionCode;
  packetKind: PacketLocation["packetKind"];
  packetIndex: number | null;
};

type SafeRecord = Record<string, unknown>;

const BUNDLE_LOCATION: PacketLocation = {
  packetKind: "bundle",
  packetIndex: null,
};

const PROVIDER_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MODEL_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/;
const LOWER_HEX_64_PATTERN = /^[a-f0-9]{64}$/;
const LOWER_HEX_40_PATTERN = /^[a-f0-9]{40}$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SECRET_KEY_PATTERN =
  /(?:api[-_]?key|password|private[-_]?key|client[-_]?secret|authorization|credential[-_]?(?:value|secret)|access[-_]?token|refresh[-_]?token|bearer)/i;
const SECRET_VALUE_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /^Bearer\s+\S+/i,
  /^(?:gsk_|sk-)[A-Za-z0-9_-]{12,}$/,
  /^AKIA[A-Z0-9]{16}$/,
  /^AIza[A-Za-z0-9_-]{20,}$/,
] as const;

const REJECTION_ORDER = new Map<CodexForgeOnboardingRejectionCode, number>(
  CODEXFORGE_ONBOARDING_REJECTION_CODES.map((code, index) => [code, index])
);

function compareCodeUnits(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function isExactIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }
  const instant = new Date(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(instant.getTime()) &&
    instant.toISOString().slice(0, 10) === value
  );
}

function addIssue(
  issues: MutableIssue[],
  code: CodexForgeOnboardingRejectionCode,
  location: PacketLocation
): void {
  issues.push({
    code,
    packetKind: location.packetKind,
    packetIndex: location.packetIndex,
  });
}

function buildRejection(issues: readonly MutableIssue[]): CodexForgeOnboardingRejection {
  const unique = new Map<string, MutableIssue>();
  for (const issue of issues) {
    const key = `${issue.code}|${issue.packetKind}|${issue.packetIndex ?? -1}`;
    if (!unique.has(key)) {
      unique.set(key, issue);
    }
  }

  const sorted = [...unique.values()].sort((left, right) => {
    const codeDelta =
      (REJECTION_ORDER.get(left.code) ?? Number.MAX_SAFE_INTEGER) -
      (REJECTION_ORDER.get(right.code) ?? Number.MAX_SAFE_INTEGER);
    if (codeDelta !== 0) {
      return codeDelta;
    }
    const kindDelta = compareCodeUnits(left.packetKind, right.packetKind);
    if (kindDelta !== 0) {
      return kindDelta;
    }
    return (left.packetIndex ?? -1) - (right.packetIndex ?? -1);
  });

  const maximum = CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumReturnedIssues;
  const truncated = sorted.length > maximum;
  const selected = truncated
    ? [
        ...sorted.slice(0, maximum - 1),
        {
          code: "rejection-limit-reached" as const,
          packetKind: "bundle" as const,
          packetIndex: null,
        },
      ]
    : sorted;
  const frozenIssues = Object.freeze(
    selected.map((issue) => Object.freeze({ ...issue }))
  ) as readonly CodexForgeOnboardingRejectionIssue[];
  const codes = Object.freeze(
    [...new Set(frozenIssues.map((issue) => issue.code))]
  );

  return freezeCodexForgeOnboardingValue({
    rejectionVersion: CODEXFORGE_ONBOARDING_REJECTION_VERSION,
    codes,
    issues: frozenIssues,
    truncated,
  });
}

function failure(issues: readonly MutableIssue[]): CodexForgeOnboardingValidationResult {
  return Object.freeze({ ok: false, rejection: buildRejection(issues) });
}

function isPlainRecord(value: unknown): value is SafeRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function looksLikeSecretValue(value: string): boolean {
  return SECRET_VALUE_PATTERNS.some((pattern) => pattern.test(value));
}

type AuditFrame =
  | Readonly<{ action: "enter"; value: unknown; depth: number }>
  | Readonly<{ action: "exit"; value: object; depth: number }>;

function auditUntrustedGraph(input: unknown): readonly MutableIssue[] {
  const issues: MutableIssue[] = [];
  const seen = new WeakSet<object>();
  const active = new WeakSet<object>();
  const stack: AuditFrame[] = [{ action: "enter", value: input, depth: 0 }];
  let visitedValues = 0;

  while (stack.length > 0) {
    const frame = stack.pop();
    if (!frame) {
      break;
    }

    if (frame.action === "exit") {
      active.delete(frame.value);
      continue;
    }

    visitedValues += 1;
    if (
      visitedValues >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumVisitedValues
    ) {
      addIssue(issues, "maximum-visited-values-exceeded", BUNDLE_LOCATION);
      break;
    }

    if (
      frame.depth >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumNestingDepth
    ) {
      addIssue(issues, "maximum-nesting-depth-exceeded", BUNDLE_LOCATION);
      continue;
    }

    const value = frame.value;
    if (typeof value === "string") {
      if (
        value.length >
        CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumStringLength
      ) {
        addIssue(issues, "maximum-string-length-exceeded", BUNDLE_LOCATION);
      }
      if (looksLikeSecretValue(value)) {
        addIssue(issues, "secret-material-detected", BUNDLE_LOCATION);
      }
      continue;
    }

    if (typeof value === "function") {
      addIssue(issues, "function-value-rejected", BUNDLE_LOCATION);
      continue;
    }
    if (typeof value === "symbol") {
      addIssue(issues, "symbol-value-rejected", BUNDLE_LOCATION);
      continue;
    }
    if (typeof value !== "object" || value === null) {
      continue;
    }

    if (isProxy(value)) {
      addIssue(issues, "exotic-prototype-rejected", BUNDLE_LOCATION);
      continue;
    }

    if (seen.has(value)) {
      addIssue(
        issues,
        active.has(value) ? "cycle-detected" : "shared-reference-detected",
        BUNDLE_LOCATION
      );
      continue;
    }
    seen.add(value);
    active.add(value);
    stack.push({ action: "exit", value, depth: frame.depth });

    const isArray = Array.isArray(value);
    const prototype = Object.getPrototypeOf(value);
    if (
      (isArray && prototype !== Array.prototype) ||
      (!isArray && prototype !== Object.prototype && prototype !== null)
    ) {
      addIssue(issues, "exotic-prototype-rejected", BUNDLE_LOCATION);
      continue;
    }

    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key === "symbol")) {
      addIssue(issues, "symbol-key-rejected", BUNDLE_LOCATION);
    }
    const stringKeys = ownKeys.filter(
      (key): key is string => typeof key === "string"
    );
    if (
      !isArray &&
      stringKeys.length >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumObjectKeys
    ) {
      addIssue(issues, "maximum-object-keys-exceeded", BUNDLE_LOCATION);
    }

    if (isArray) {
      if (
        value.length >
        CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumArrayItems
      ) {
        addIssue(issues, "maximum-array-items-exceeded", BUNDLE_LOCATION);
      }
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) {
          addIssue(issues, "sparse-array-rejected", BUNDLE_LOCATION);
          break;
        }
      }
      if (
        stringKeys.some(
          (key) => key !== "length" && !/^(?:0|[1-9]\d*)$/.test(key)
        )
      ) {
        addIssue(issues, "unknown-field", BUNDLE_LOCATION);
      }
    }

    const descriptors = Object.getOwnPropertyDescriptors(value);
    for (let index = stringKeys.length - 1; index >= 0; index -= 1) {
      const key = stringKeys[index];
      if (isArray && key === "length") {
        continue;
      }
      if (SECRET_KEY_PATTERN.test(key)) {
        addIssue(issues, "secret-material-detected", BUNDLE_LOCATION);
      }
      const descriptor = descriptors[key];
      if (!descriptor || descriptor.get !== undefined || descriptor.set !== undefined) {
        addIssue(issues, "accessor-property-rejected", BUNDLE_LOCATION);
        continue;
      }
      if (!descriptor.enumerable) {
        addIssue(issues, "input-not-plain-data", BUNDLE_LOCATION);
        continue;
      }
      stack.push({
        action: "enter",
        value: descriptor.value,
        depth: frame.depth + 1,
      });
    }
  }

  return issues;
}

function rejectUnknownFields(
  record: SafeRecord,
  allowedFields: readonly string[],
  issues: MutableIssue[],
  location: PacketLocation
): void {
  const allowed = new Set(allowedFields);
  for (const key of Object.keys(record)) {
    if (!allowed.has(key)) {
      addIssue(
        issues,
        SECRET_KEY_PATTERN.test(key)
          ? "secret-material-detected"
          : "unknown-field",
        location
      );
    }
  }
}

function requiredString(
  value: unknown,
  issues: MutableIssue[],
  location: PacketLocation
): string | null {
  if (typeof value !== "string" || value.length === 0) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  return value;
}

function exactBoolean(
  value: unknown,
  expected: boolean,
  code: CodexForgeOnboardingRejectionCode,
  issues: MutableIssue[],
  location: PacketLocation
): boolean {
  if (value !== expected) {
    addIssue(issues, code, location);
    return false;
  }
  return true;
}

function parseEvidenceReference(
  value: unknown,
  issues: MutableIssue[],
  location: PacketLocation
): CodexForgeOnboardingEvidenceReference | null {
  if (!isPlainRecord(value)) {
    addIssue(issues, "missing-evidence-reference", location);
    return null;
  }
  rejectUnknownFields(
    value,
    [
      "evidenceId",
      "evidenceVersion",
      "kind",
      "scope",
      "provenance",
      "artifactSha256",
      "checkpointCommit",
      "observedOn",
      "validThrough",
    ],
    issues,
    location
  );
  const evidenceId = requiredString(value.evidenceId, issues, location);
  const evidenceVersion = requiredString(value.evidenceVersion, issues, location);
  const kind = value.kind;
  const allowedKinds: readonly CodexForgeOnboardingEvidenceKind[] = [
    "capability-verification",
    "free-tier-verification",
    "provider-qualification",
    "model-qualification",
    "exact-model-live-acceptance",
    "manual-execution-admission",
  ];
  if (!allowedKinds.includes(kind as CodexForgeOnboardingEvidenceKind)) {
    addIssue(issues, "evidence-reference-mismatch", location);
  }
  const provenance = value.provenance;
  const allowedProvenance = [
    "repository-deterministic-smoke",
    "repository-live-acceptance",
    "operator-reviewed-official-provider-documentation",
  ] as const;
  if (!allowedProvenance.includes(provenance as typeof allowedProvenance[number])) {
    addIssue(issues, "evidence-reference-mismatch", location);
  }
  const artifactSha256 = requiredString(value.artifactSha256, issues, location);
  const checkpointCommit = requiredString(value.checkpointCommit, issues, location);
  const observedOn = requiredString(value.observedOn, issues, location);
  const validThrough =
    value.validThrough === null
      ? null
      : requiredString(value.validThrough, issues, location);
  if (artifactSha256 !== null && !LOWER_HEX_64_PATTERN.test(artifactSha256)) {
    addIssue(issues, "evidence-reference-mismatch", location);
  }
  if (checkpointCommit !== null && !LOWER_HEX_40_PATTERN.test(checkpointCommit)) {
    addIssue(issues, "evidence-reference-mismatch", location);
  }
  if (observedOn !== null && !isExactIsoDate(observedOn)) {
    addIssue(issues, "evidence-reference-mismatch", location);
  }
  if (validThrough !== null && !isExactIsoDate(validThrough)) {
    addIssue(issues, "evidence-reference-mismatch", location);
  }

  if (!isPlainRecord(value.scope)) {
    addIssue(issues, "evidence-scope-mismatch", location);
    return null;
  }
  const scopeLevel = value.scope.level;
  let scope: CodexForgeOnboardingEvidenceReference["scope"] | null = null;
  if (scopeLevel === "provider") {
    rejectUnknownFields(value.scope, ["level", "providerKey"], issues, location);
    const providerKey = requiredString(value.scope.providerKey, issues, location);
    if (providerKey !== null) {
      scope = { level: "provider", providerKey };
    }
  } else if (scopeLevel === "model") {
    rejectUnknownFields(
      value.scope,
      ["level", "providerKey", "modelKey"],
      issues,
      location
    );
    const providerKey = requiredString(value.scope.providerKey, issues, location);
    const modelKey = requiredString(value.scope.modelKey, issues, location);
    if (providerKey !== null && modelKey !== null) {
      scope = {
        level: "model",
        providerKey,
        modelKey: modelKey as CodexForgeOnboardingModelKey,
      };
    }
  } else {
    addIssue(issues, "evidence-scope-mismatch", location);
  }

  if (
    evidenceId === null ||
    evidenceVersion === null ||
    !allowedKinds.includes(kind as CodexForgeOnboardingEvidenceKind) ||
    !allowedProvenance.includes(provenance as typeof allowedProvenance[number]) ||
    artifactSha256 === null ||
    checkpointCommit === null ||
    observedOn === null ||
    scope === null
  ) {
    return null;
  }
  return {
    evidenceId,
    evidenceVersion,
    kind: kind as CodexForgeOnboardingEvidenceKind,
    scope,
    provenance: provenance as CodexForgeOnboardingEvidenceReference["provenance"],
    artifactSha256,
    checkpointCommit,
    observedOn,
    validThrough,
  };
}

function evidenceMatchesAuthority(
  evidence: CodexForgeOnboardingEvidenceReference,
  expectedKind: CodexForgeOnboardingEvidenceKind,
  expectedProviderKey: string,
  expectedModelKey: CodexForgeOnboardingModelKey | null,
  authority: CodexForgeOnboardingValidationAuthority,
  issues: MutableIssue[],
  location: PacketLocation
): boolean {
  let valid = true;
  if (evidence.kind !== expectedKind) {
    addIssue(issues, "evidence-reference-mismatch", location);
    valid = false;
  }
  if (
    expectedModelKey === null
      ? evidence.scope.level !== "provider" ||
        evidence.scope.providerKey !== expectedProviderKey
      : evidence.scope.level !== "model" ||
        evidence.scope.providerKey !== expectedProviderKey ||
        evidence.scope.modelKey !== expectedModelKey
  ) {
    addIssue(issues, "evidence-scope-mismatch", location);
    valid = false;
  }
  const sourceOwned = authority.evidenceCatalog.find(
    (candidate) => candidate.evidenceId === evidence.evidenceId
  );
  if (!sourceOwned) {
    addIssue(issues, "evidence-reference-mismatch", location);
    return false;
  }
  if (sourceOwned.evidenceVersion !== evidence.evidenceVersion) {
    addIssue(issues, "evidence-version-mismatch", location);
    valid = false;
  }
  if (
    sourceOwned.kind !== evidence.kind ||
    sourceOwned.provenance !== evidence.provenance ||
    sourceOwned.artifactSha256 !== evidence.artifactSha256 ||
    sourceOwned.checkpointCommit !== evidence.checkpointCommit ||
    sourceOwned.observedOn !== evidence.observedOn ||
    sourceOwned.validThrough !== evidence.validThrough ||
    JSON.stringify(sourceOwned.scope) !== JSON.stringify(evidence.scope)
  ) {
    addIssue(issues, "evidence-reference-mismatch", location);
    valid = false;
  }
  if (
    evidence.validThrough !== null &&
    (compareCodeUnits(evidence.validThrough, authority.asOfDate) < 0 ||
      compareCodeUnits(evidence.validThrough, evidence.observedOn) < 0)
  ) {
    addIssue(issues, "stale-evidence-reference", location);
    valid = false;
  }
  if (compareCodeUnits(evidence.observedOn, authority.asOfDate) > 0) {
    addIssue(issues, "stale-evidence-reference", location);
    valid = false;
  }
  return valid;
}

function parseProviderPacket(
  value: unknown,
  packetIndex: number,
  authority: CodexForgeOnboardingValidationAuthority,
  issues: MutableIssue[]
): CodexForgeProviderOnboardingPacket | null {
  const location: PacketLocation = { packetKind: "provider", packetIndex };
  if (!isPlainRecord(value)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value,
    [
      "packetKind",
      "providerKey",
      "identity",
      "adapter",
      "locality",
      "dataBoundary",
      "credentialMode",
      "qualification",
    ],
    issues,
    location
  );
  const providerKey = requiredString(value.providerKey, issues, location);
  if (
    providerKey === null ||
    providerKey.length > 64 ||
    !PROVIDER_KEY_PATTERN.test(providerKey)
  ) {
    addIssue(issues, "invalid-provider-key", location);
  }
  if (!isPlainRecord(value.identity)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(value.identity, ["providerId", "displayName"], issues, location);
  const providerId = requiredString(value.identity.providerId, issues, location);
  const displayName = requiredString(value.identity.displayName, issues, location);
  if (providerKey !== null && providerId !== providerKey) {
    addIssue(issues, "provider-key-mismatch", location);
  }
  if (!isPlainRecord(value.adapter)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(value.adapter, ["adapterId", "protocol"], issues, location);
  const adapterId = requiredString(value.adapter.adapterId, issues, location);
  const protocol = value.adapter.protocol;
  if (!CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS.includes(protocol as CodexForgeOnboardingProviderProtocol)) {
    addIssue(issues, "unsupported-provider-protocol", location);
  }
  const locality = value.locality;
  const dataBoundary = value.dataBoundary;
  const credentialMode = value.credentialMode;
  if (
    (locality === "local" && dataBoundary !== "local-machine") ||
    (locality === "cloud" && dataBoundary !== "cloud-provider") ||
    (locality !== "local" && locality !== "cloud")
  ) {
    addIssue(issues, "locality-boundary-mismatch", location);
  }
  if (
    (locality === "local" && credentialMode !== "none") ||
    (locality === "cloud" && credentialMode !== "server-environment-only")
  ) {
    addIssue(issues, "credential-mode-mismatch", location);
  }
  const binding = authority.adapterBindings.find(
    (candidate) =>
      candidate.providerKey === providerKey && candidate.adapterId === adapterId
  );
  if (!binding) {
    addIssue(issues, "unknown-adapter-identity", location);
  } else if (
    binding.protocol !== protocol ||
    binding.locality !== locality ||
    binding.dataBoundary !== dataBoundary ||
    binding.credentialMode !== credentialMode
  ) {
    addIssue(issues, "authority-boundary-mismatch", location);
  }

  if (!isPlainRecord(value.qualification)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(value.qualification, ["state", "evidence"], issues, location);
  const qualificationState = value.qualification.state;
  let qualificationEvidence: CodexForgeOnboardingEvidenceReference | null = null;
  if (qualificationState === "not-qualified") {
    if (value.qualification.evidence !== null) {
      addIssue(issues, "admission-inheritance-forbidden", location);
    }
  } else if (qualificationState === "qualified") {
    qualificationEvidence = parseEvidenceReference(
      value.qualification.evidence,
      issues,
      location
    );
    if (
      qualificationEvidence !== null &&
      providerKey !== null
    ) {
      evidenceMatchesAuthority(
        qualificationEvidence,
        "provider-qualification",
        providerKey,
        null,
        authority,
        issues,
        location
      );
    }
  } else {
    addIssue(issues, "provider-qualification-prerequisite-missing", location);
  }

  if (
    value.packetKind !== "provider" ||
    providerKey === null ||
    providerId === null ||
    displayName === null ||
    adapterId === null ||
    !CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS.includes(protocol as CodexForgeOnboardingProviderProtocol) ||
    (locality !== "local" && locality !== "cloud") ||
    (dataBoundary !== "local-machine" && dataBoundary !== "cloud-provider") ||
    (credentialMode !== "none" && credentialMode !== "server-environment-only") ||
    (qualificationState !== "not-qualified" && qualificationState !== "qualified")
  ) {
    return null;
  }
  return {
    packetKind: "provider",
    providerKey,
    identity: { providerId, displayName },
    adapter: {
      adapterId,
      protocol: protocol as CodexForgeOnboardingProviderProtocol,
    },
    locality,
    dataBoundary,
    credentialMode,
    qualification: {
      state: qualificationState,
      evidence: qualificationEvidence,
    },
  };
}

function parseGate(
  value: unknown,
  absentState: string,
  grantedState: string,
  expectedKind: CodexForgeOnboardingEvidenceKind,
  providerKey: string,
  modelKey: CodexForgeOnboardingModelKey,
  authority: CodexForgeOnboardingValidationAuthority,
  issues: MutableIssue[],
  location: PacketLocation
): Readonly<{ state: string; evidence: CodexForgeOnboardingEvidenceReference | null }> | null {
  if (!isPlainRecord(value)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(value, ["state", "evidence"], issues, location);
  if (value.state === absentState) {
    if (value.evidence !== null) {
      addIssue(issues, "admission-inheritance-forbidden", location);
    }
    return { state: absentState, evidence: null };
  }
  if (value.state !== grantedState) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  const evidence = parseEvidenceReference(value.evidence, issues, location);
  if (evidence !== null) {
    evidenceMatchesAuthority(
      evidence,
      expectedKind,
      providerKey,
      modelKey,
      authority,
      issues,
      location
    );
  }
  return { state: grantedState, evidence };
}

function parseStringArray(
  value: unknown,
  allowed: readonly string[],
  unsupportedCode: CodexForgeOnboardingRejectionCode,
  issues: MutableIssue[],
  location: PacketLocation
): readonly string[] | null {
  if (!Array.isArray(value)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  const normalized: string[] = [];
  for (const item of value) {
    if (typeof item !== "string" || !allowed.includes(item)) {
      addIssue(issues, unsupportedCode, location);
      continue;
    }
    if (!normalized.includes(item)) {
      normalized.push(item);
    }
  }
  normalized.sort(
    (left, right) => allowed.indexOf(left) - allowed.indexOf(right)
  );
  return normalized;
}

function parseModelPacket(
  value: unknown,
  packetIndex: number,
  providers: ReadonlyMap<string, CodexForgeProviderOnboardingPacket>,
  authority: CodexForgeOnboardingValidationAuthority,
  issues: MutableIssue[]
): CodexForgeModelOnboardingPacket | null {
  const location: PacketLocation = { packetKind: "model", packetIndex };
  if (!isPlainRecord(value)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value,
    [
      "packetKind",
      "providerKey",
      "modelKey",
      "identity",
      "adapter",
      "locality",
      "dataBoundary",
      "credentialMode",
      "capabilities",
      "inputModalities",
      "outputModalities",
      "limits",
      "cost",
      "capabilityVerification",
      "modelQualification",
      "liveAcceptance",
      "manualExecutionAdmission",
      "automaticRoutingAdmission",
      "approvalRequirements",
      "executionPosture",
      "installationPosture",
    ],
    issues,
    location
  );
  const providerKey = requiredString(value.providerKey, issues, location);
  const modelKeyValue = requiredString(value.modelKey, issues, location);
  if (!isPlainRecord(value.identity)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value.identity,
    ["providerId", "modelId", "displayName"],
    issues,
    location
  );
  const providerId = requiredString(value.identity.providerId, issues, location);
  const modelId = requiredString(value.identity.modelId, issues, location);
  const displayName = requiredString(value.identity.displayName, issues, location);
  if (
    modelId === null ||
    modelId.length > 120 ||
    !MODEL_ID_PATTERN.test(modelId)
  ) {
    addIssue(issues, "invalid-model-id", location);
  }
  if (providerKey !== null && providerId !== providerKey) {
    addIssue(issues, "provider-key-mismatch", location);
  }
  const expectedModelKey =
    providerKey !== null && modelId !== null
      ? (`${providerKey}::${modelId}` as CodexForgeOnboardingModelKey)
      : null;
  if (expectedModelKey === null || modelKeyValue !== expectedModelKey) {
    addIssue(issues, "model-key-mismatch", location);
  }
  const modelKey = (modelKeyValue ?? "invalid::invalid") as CodexForgeOnboardingModelKey;
  const provider = providerKey === null ? undefined : providers.get(providerKey);
  if (!provider) {
    addIssue(issues, "model-provider-mismatch", location);
  }

  if (!isPlainRecord(value.adapter)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(value.adapter, ["adapterId", "protocol"], issues, location);
  const adapterId = requiredString(value.adapter.adapterId, issues, location);
  const protocol = value.adapter.protocol;
  if (!CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS.includes(protocol as CodexForgeOnboardingProviderProtocol)) {
    addIssue(issues, "unsupported-provider-protocol", location);
  }
  if (
    provider &&
    (provider.adapter.adapterId !== adapterId ||
      provider.adapter.protocol !== protocol)
  ) {
    addIssue(issues, "adapter-identity-mismatch", location);
  }
  const locality = value.locality;
  const dataBoundary = value.dataBoundary;
  const credentialMode = value.credentialMode;
  if (
    (locality === "local" && dataBoundary !== "local-machine") ||
    (locality === "cloud" && dataBoundary !== "cloud-provider") ||
    (locality !== "local" && locality !== "cloud")
  ) {
    addIssue(issues, "locality-boundary-mismatch", location);
  }
  if (
    (locality === "local" && credentialMode !== "none") ||
    (locality === "cloud" && credentialMode !== "server-environment-only")
  ) {
    addIssue(issues, "credential-mode-mismatch", location);
  }
  if (
    provider &&
    (provider.locality !== locality ||
      provider.dataBoundary !== dataBoundary ||
      provider.credentialMode !== credentialMode)
  ) {
    addIssue(issues, "authority-boundary-mismatch", location);
  }

  const capabilities = parseStringArray(
    value.capabilities,
    ["text-generation"],
    "unsupported-capability",
    issues,
    location
  );
  const inputModalities = parseStringArray(
    value.inputModalities,
    ["text"],
    "unsupported-input-modality",
    issues,
    location
  );
  const outputModalities = parseStringArray(
    value.outputModalities,
    ["text"],
    "unsupported-output-modality",
    issues,
    location
  );

  if (!isPlainRecord(value.limits)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value.limits,
    [
      "providerReportedContextWindowTokens",
      "providerReportedMaximumOutputTokens",
      "requestedAdmissionMaximumOutputTokens",
    ],
    issues,
    location
  );
  const contextWindow = value.limits.providerReportedContextWindowTokens;
  const providerMaximum = value.limits.providerReportedMaximumOutputTokens;
  const requestedMaximum = value.limits.requestedAdmissionMaximumOutputTokens;
  const validNullableInteger = (candidate: unknown): candidate is number | null =>
    candidate === null ||
    (typeof candidate === "number" &&
      Number.isSafeInteger(candidate) &&
      candidate > 0);
  if (
    !validNullableInteger(contextWindow) ||
    (contextWindow !== null &&
      (typeof requestedMaximum !== "number" || contextWindow < requestedMaximum))
  ) {
    addIssue(issues, "invalid-context-window", location);
  }
  if (!validNullableInteger(providerMaximum)) {
    addIssue(issues, "output-envelope-escalation", location);
  }
  const candidateCeiling =
    locality === "local"
      ? CODEXFORGE_ONBOARDING_MAXIMUM_LOCAL_OUTPUT_TOKENS
      : CODEXFORGE_ONBOARDING_MAXIMUM_CLOUD_OUTPUT_TOKENS;
  if (
    typeof requestedMaximum !== "number" ||
    !Number.isSafeInteger(requestedMaximum) ||
    requestedMaximum < 1 ||
    requestedMaximum > candidateCeiling ||
    (providerMaximum !== null &&
      typeof providerMaximum === "number" &&
      requestedMaximum > providerMaximum)
  ) {
    addIssue(issues, "output-envelope-escalation", location);
  }

  if (!isPlainRecord(value.cost)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value.cost,
    [
      "classification",
      "billingEnabled",
      "trialCreditOnly",
      "freeTierVerificationState",
      "evidence",
    ],
    issues,
    location
  );
  const classification = value.cost.classification;
  if (
    classification === "paid" ||
    classification === "unknown" ||
    classification === "unverifiable" ||
    classification === "billing-enabled" ||
    classification === "trial-credit"
  ) {
    addIssue(issues, "unsupported-cost-class", location);
  }
  if (value.cost.billingEnabled !== false) {
    addIssue(issues, "billing-enabled", location);
  }
  if (value.cost.trialCreditOnly !== false) {
    addIssue(issues, "trial-credit-only", location);
  }
  const freeTierState = value.cost.freeTierVerificationState;
  let costEvidence: CodexForgeOnboardingEvidenceReference | null = null;
  let costVerified = locality === "local";
  if (locality === "local") {
    if (
      classification !== "local-no-provider-token-charge" ||
      freeTierState !== "not-applicable-local" ||
      value.cost.evidence !== null
    ) {
      addIssue(issues, "unsupported-cost-class", location);
    }
  } else {
    if (classification !== "free-tier") {
      addIssue(issues, "unsupported-cost-class", location);
    }
    if (freeTierState === "verified-current") {
      costEvidence = parseEvidenceReference(value.cost.evidence, issues, location);
      if (costEvidence !== null && providerKey !== null) {
        costVerified = evidenceMatchesAuthority(
          costEvidence,
          "free-tier-verification",
          providerKey,
          modelKey,
          authority,
          issues,
          location
        );
        if (costEvidence.validThrough === null) {
          addIssue(issues, "stale-evidence-reference", location);
          costVerified = false;
        }
      }
    } else if (freeTierState === "unverified") {
      if (value.cost.evidence !== null) {
        addIssue(issues, "evidence-reference-mismatch", location);
      }
    } else {
      addIssue(issues, "free-tier-not-verified", location);
    }
  }

  const capabilityGate = parseGate(
    value.capabilityVerification,
    "unverified",
    "verified",
    "capability-verification",
    providerKey ?? "",
    modelKey,
    authority,
    issues,
    location
  );
  const modelQualificationGate = parseGate(
    value.modelQualification,
    "not-qualified",
    "qualified",
    "model-qualification",
    providerKey ?? "",
    modelKey,
    authority,
    issues,
    location
  );
  const liveAcceptanceGate = parseGate(
    value.liveAcceptance,
    "not-accepted",
    "accepted",
    "exact-model-live-acceptance",
    providerKey ?? "",
    modelKey,
    authority,
    issues,
    location
  );
  const manualAdmissionGate = parseGate(
    value.manualExecutionAdmission,
    "not-admitted",
    "admitted",
    "manual-execution-admission",
    providerKey ?? "",
    modelKey,
    authority,
    issues,
    location
  );
  const capabilityVerified = capabilityGate?.state === "verified";
  const providerQualified = provider?.qualification.state === "qualified";
  const modelQualified = modelQualificationGate?.state === "qualified";
  const liveAccepted = liveAcceptanceGate?.state === "accepted";
  const manuallyAdmitted = manualAdmissionGate?.state === "admitted";
  if (modelQualified && (!capabilityVerified || !costVerified || !providerQualified)) {
    addIssue(issues, "provider-qualification-prerequisite-missing", location);
  }
  if (liveAccepted && !modelQualified) {
    addIssue(issues, "model-qualification-prerequisite-missing", location);
  }
  if (manuallyAdmitted && !liveAccepted) {
    addIssue(issues, "live-acceptance-prerequisite-missing", location);
  }
  if (locality === "cloud" && !costVerified && (modelQualified || liveAccepted || manuallyAdmitted)) {
    addIssue(issues, "free-tier-not-verified", location);
  }

  if (!isPlainRecord(value.automaticRoutingAdmission)) {
    addIssue(issues, "automatic-admission-rejected", location);
    return null;
  }
  rejectUnknownFields(
    value.automaticRoutingAdmission,
    ["state", "evidence", "modes"],
    issues,
    location
  );
  if (
    value.automaticRoutingAdmission.state !== "not-admitted" ||
    value.automaticRoutingAdmission.evidence !== null ||
    !Array.isArray(value.automaticRoutingAdmission.modes) ||
    value.automaticRoutingAdmission.modes.length !== 0
  ) {
    addIssue(issues, "automatic-admission-rejected", location);
  }

  if (!isPlainRecord(value.approvalRequirements)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value.approvalRequirements,
    [
      "manualApprovalBeforeEveryExecution",
      "exactModelApprovalBinding",
      "cloudDataTransferRequirement",
      "requiredCloudDataTransferAcknowledgement",
      "requiredCloudExecutionAcknowledgement",
      "requiredFreeTierExecutionConfirmation",
    ],
    issues,
    location
  );
  exactBoolean(
    value.approvalRequirements.manualApprovalBeforeEveryExecution,
    true,
    "manual-approval-requirement-missing",
    issues,
    location
  );
  exactBoolean(
    value.approvalRequirements.exactModelApprovalBinding,
    true,
    "exact-model-approval-binding-missing",
    issues,
    location
  );
  const cloudRequired = locality === "cloud";
  const expectedCloudTransferRequirement = cloudRequired
    ? CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_ACKNOWLEDGEMENT_REQUIRED
    : CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_NOT_REQUIRED;
  if (
    value.approvalRequirements.cloudDataTransferRequirement !==
    expectedCloudTransferRequirement
  ) {
    addIssue(issues, "cloud-transfer-acknowledgement-missing", location);
  }
  if (
    value.approvalRequirements.requiredCloudDataTransferAcknowledgement !==
    (cloudRequired
      ? CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_ACKNOWLEDGEMENT
      : null)
  ) {
    addIssue(issues, "cloud-transfer-acknowledgement-missing", location);
  }
  if (
    value.approvalRequirements.requiredCloudExecutionAcknowledgement !==
    (cloudRequired
      ? CODEXFORGE_ONBOARDING_CLOUD_EXECUTION_ACKNOWLEDGEMENT
      : null)
  ) {
    addIssue(issues, "cloud-execution-acknowledgement-missing", location);
  }
  if (
    value.approvalRequirements.requiredFreeTierExecutionConfirmation !==
    (cloudRequired
      ? CODEXFORGE_ONBOARDING_FREE_TIER_EXECUTION_CONFIRMATION
      : null)
  ) {
    addIssue(issues, "free-tier-execution-confirmation-missing", location);
  }

  if (!isPlainRecord(value.executionPosture)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value.executionPosture,
    [
      "killSwitchCheckpoints",
      "maximumProviderAttempts",
      "retryAllowed",
      "fallbackAllowed",
      "reroutingAfterPersistenceAllowed",
      "providerSubstitutionAllowed",
      "modelSubstitutionAllowed",
      "automaticModelSizeSwitchingAllowed",
      "paidExecutionAllowed",
    ],
    issues,
    location
  );
  if (
    !Array.isArray(value.executionPosture.killSwitchCheckpoints) ||
    value.executionPosture.killSwitchCheckpoints.length !== 2 ||
    value.executionPosture.killSwitchCheckpoints[0] !==
      CODEXFORGE_ONBOARDING_KILL_SWITCH_CHECKPOINTS[0] ||
    value.executionPosture.killSwitchCheckpoints[1] !==
      CODEXFORGE_ONBOARDING_KILL_SWITCH_CHECKPOINTS[1]
  ) {
    addIssue(issues, "kill-switch-posture-invalid", location);
  }
  if (value.executionPosture.maximumProviderAttempts !== 1) {
    addIssue(issues, "attempt-posture-invalid", location);
  }
  const falsePostures: readonly Readonly<{
    field: string;
    code: CodexForgeOnboardingRejectionCode;
  }>[] = [
    { field: "retryAllowed", code: "retry-enabled" },
    { field: "fallbackAllowed", code: "fallback-enabled" },
    { field: "reroutingAfterPersistenceAllowed", code: "rerouting-enabled" },
    { field: "providerSubstitutionAllowed", code: "provider-substitution-enabled" },
    { field: "modelSubstitutionAllowed", code: "model-substitution-enabled" },
    {
      field: "automaticModelSizeSwitchingAllowed",
      code: "automatic-model-size-switching-enabled",
    },
    { field: "paidExecutionAllowed", code: "paid-execution-enabled" },
  ];
  for (const posture of falsePostures) {
    if (value.executionPosture[posture.field] !== false) {
      addIssue(issues, posture.code, location);
    }
  }

  if (!isPlainRecord(value.installationPosture)) {
    addIssue(issues, "input-not-plain-data", location);
    return null;
  }
  rejectUnknownFields(
    value.installationPosture,
    ["state", "automaticModelDownloadAllowed"],
    issues,
    location
  );
  const expectedInstallationState =
    locality === "local" ? "operator-managed-local-install" : "not-applicable";
  if (value.installationPosture.state !== expectedInstallationState) {
    addIssue(issues, "automatic-model-download-enabled", location);
  }
  if (value.installationPosture.automaticModelDownloadAllowed !== false) {
    addIssue(issues, "automatic-model-download-enabled", location);
  }

  if (
    value.packetKind !== "model" ||
    providerKey === null ||
    modelKeyValue === null ||
    providerId === null ||
    modelId === null ||
    displayName === null ||
    adapterId === null ||
    !CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS.includes(protocol as CodexForgeOnboardingProviderProtocol) ||
    (locality !== "local" && locality !== "cloud") ||
    (dataBoundary !== "local-machine" && dataBoundary !== "cloud-provider") ||
    (credentialMode !== "none" && credentialMode !== "server-environment-only") ||
    capabilities === null ||
    inputModalities === null ||
    outputModalities === null ||
    !validNullableInteger(contextWindow) ||
    !validNullableInteger(providerMaximum) ||
    typeof requestedMaximum !== "number" ||
    !Number.isSafeInteger(requestedMaximum) ||
    capabilityGate === null ||
    modelQualificationGate === null ||
    liveAcceptanceGate === null ||
    manualAdmissionGate === null
  ) {
    return null;
  }

  return {
    packetKind: "model",
    providerKey,
    modelKey,
    identity: { providerId, modelId, displayName },
    adapter: {
      adapterId,
      protocol: protocol as CodexForgeOnboardingProviderProtocol,
    },
    locality,
    dataBoundary,
    credentialMode,
    capabilities,
    inputModalities: inputModalities as readonly "text"[],
    outputModalities: outputModalities as readonly "text"[],
    limits: {
      providerReportedContextWindowTokens: contextWindow,
      providerReportedMaximumOutputTokens: providerMaximum,
      requestedAdmissionMaximumOutputTokens: requestedMaximum,
    },
    cost: {
      classification: classification as CodexForgeModelOnboardingPacket["cost"]["classification"],
      billingEnabled: value.cost.billingEnabled as boolean,
      trialCreditOnly: value.cost.trialCreditOnly as boolean,
      freeTierVerificationState:
        freeTierState as CodexForgeModelOnboardingPacket["cost"]["freeTierVerificationState"],
      evidence: costEvidence,
    },
    capabilityVerification: capabilityGate as CodexForgeModelOnboardingPacket["capabilityVerification"],
    modelQualification: modelQualificationGate as CodexForgeModelOnboardingPacket["modelQualification"],
    liveAcceptance: liveAcceptanceGate as CodexForgeModelOnboardingPacket["liveAcceptance"],
    manualExecutionAdmission: manualAdmissionGate as CodexForgeModelOnboardingPacket["manualExecutionAdmission"],
    automaticRoutingAdmission: {
      state: "not-admitted",
      evidence: null,
      modes: [],
    },
    approvalRequirements: {
      manualApprovalBeforeEveryExecution: true,
      exactModelApprovalBinding: true,
      cloudDataTransferRequirement: expectedCloudTransferRequirement,
      requiredCloudDataTransferAcknowledgement: cloudRequired
        ? CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_ACKNOWLEDGEMENT
        : null,
      requiredCloudExecutionAcknowledgement: cloudRequired
        ? CODEXFORGE_ONBOARDING_CLOUD_EXECUTION_ACKNOWLEDGEMENT
        : null,
      requiredFreeTierExecutionConfirmation: cloudRequired
        ? CODEXFORGE_ONBOARDING_FREE_TIER_EXECUTION_CONFIRMATION
        : null,
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
      state: expectedInstallationState,
      automaticModelDownloadAllowed: false,
    },
  };
}

function deriveModelStage(
  model: CodexForgeModelOnboardingPacket,
  provider: CodexForgeProviderOnboardingPacket
): CodexForgeOnboardingVerifiedStage {
  const costVerified =
    model.locality === "local" ||
    model.cost.freeTierVerificationState === "verified-current";
  if (model.capabilityVerification.state !== "verified") {
    return "candidate-declared";
  }
  if (!costVerified) {
    return "capability-verified";
  }
  if (provider.qualification.state !== "qualified") {
    return "cost-verified";
  }
  if (model.modelQualification.state !== "qualified") {
    return "provider-qualified";
  }
  if (model.liveAcceptance.state !== "accepted") {
    return "model-qualified";
  }
  if (model.manualExecutionAdmission.state !== "admitted") {
    return "live-accepted";
  }
  return "manual-execution-admitted";
}

export function validateCodexForgeOnboardingBundle(
  input: unknown,
  authority: CodexForgeOnboardingValidationAuthority
): CodexForgeOnboardingValidationResult {
  const auditIssues = auditUntrustedGraph(input);
  if (auditIssues.length > 0) {
    return failure(auditIssues);
  }
  const issues: MutableIssue[] = [];
  if (!isPlainRecord(input)) {
    addIssue(issues, "input-not-plain-data", BUNDLE_LOCATION);
    return failure(issues);
  }
  rejectUnknownFields(
    input,
    ["schemaVersion", "bundleId", "contentDigest", "packets", "activation"],
    issues,
    BUNDLE_LOCATION
  );
  if (input.schemaVersion !== CODEXFORGE_ONBOARDING_SCHEMA_VERSION) {
    addIssue(issues, "unsupported-schema-version", BUNDLE_LOCATION);
  }
  if (
    authority.policyVersion !==
      CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION ||
    !isExactIsoDate(authority.asOfDate)
  ) {
    addIssue(issues, "evidence-reference-mismatch", BUNDLE_LOCATION);
  }
  const bundleId = requiredString(input.bundleId, issues, BUNDLE_LOCATION);
  if (!Array.isArray(input.packets)) {
    addIssue(issues, "input-not-plain-data", BUNDLE_LOCATION);
    return failure(issues);
  }

  let incomingDigest: string | null = null;
  if (input.contentDigest !== null) {
    if (!isPlainRecord(input.contentDigest)) {
      addIssue(issues, "content-digest-mismatch", BUNDLE_LOCATION);
    } else {
      rejectUnknownFields(
        input.contentDigest,
        ["algorithm", "canonicalizationVersion", "sha256"],
        issues,
        BUNDLE_LOCATION
      );
      if (
        input.contentDigest.algorithm !== CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM ||
        input.contentDigest.canonicalizationVersion !==
          CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION ||
        typeof input.contentDigest.sha256 !== "string" ||
        !LOWER_HEX_64_PATTERN.test(input.contentDigest.sha256)
      ) {
        addIssue(issues, "content-digest-mismatch", BUNDLE_LOCATION);
      } else {
        incomingDigest = input.contentDigest.sha256;
      }
    }
  }

  if (!isPlainRecord(input.activation)) {
    addIssue(issues, "activation-state-invalid", BUNDLE_LOCATION);
    return failure(issues);
  }
  rejectUnknownFields(
    input.activation,
    [
      "registryMembership",
      "catalogMembership",
      "routingVisibility",
      "uiVisibility",
      "runtimeVisibility",
    ],
    issues,
    BUNDLE_LOCATION
  );
  if (
    input.activation.registryMembership !== "candidate-only" ||
    input.activation.catalogMembership !== "candidate-only" ||
    input.activation.routingVisibility !== "none" ||
    input.activation.uiVisibility !== "none" ||
    input.activation.runtimeVisibility !== "none"
  ) {
    addIssue(issues, "activation-state-invalid", BUNDLE_LOCATION);
  }

  const providerPackets: CodexForgeProviderOnboardingPacket[] = [];
  const providerMap = new Map<string, CodexForgeProviderOnboardingPacket>();
  const seenProviderKeys = new Set<string>();
  for (let index = 0; index < input.packets.length; index += 1) {
    const packet = input.packets[index];
    if (!isPlainRecord(packet) || packet.packetKind !== "provider") {
      continue;
    }
    const parsed = parseProviderPacket(packet, index, authority, issues);
    if (!parsed) {
      continue;
    }
    if (seenProviderKeys.has(parsed.providerKey)) {
      addIssue(issues, "duplicate-provider-key", {
        packetKind: "provider",
        packetIndex: index,
      });
    } else {
      seenProviderKeys.add(parsed.providerKey);
      providerPackets.push(parsed);
      providerMap.set(parsed.providerKey, parsed);
    }
    if (authority.reservedProviderKeys.includes(parsed.providerKey)) {
      addIssue(issues, "reserved-provider-key", {
        packetKind: "provider",
        packetIndex: index,
      });
    }
  }

  const modelPackets: CodexForgeModelOnboardingPacket[] = [];
  const seenModelKeys = new Set<string>();
  for (let index = 0; index < input.packets.length; index += 1) {
    const packet = input.packets[index];
    if (!isPlainRecord(packet)) {
      addIssue(issues, "input-not-plain-data", BUNDLE_LOCATION);
      continue;
    }
    if (packet.packetKind !== "provider" && packet.packetKind !== "model") {
      addIssue(issues, "input-not-plain-data", BUNDLE_LOCATION);
      continue;
    }
    if (packet.packetKind !== "model") {
      continue;
    }
    const parsed = parseModelPacket(packet, index, providerMap, authority, issues);
    if (!parsed) {
      continue;
    }
    if (seenModelKeys.has(parsed.modelKey)) {
      addIssue(issues, "duplicate-model-key", {
        packetKind: "model",
        packetIndex: index,
      });
    } else {
      seenModelKeys.add(parsed.modelKey);
      modelPackets.push(parsed);
    }
    if (authority.reservedModelKeys.includes(parsed.modelKey)) {
      addIssue(issues, "reserved-model-key", {
        packetKind: "model",
        packetIndex: index,
      });
    }
  }

  if (issues.length > 0 || bundleId === null) {
    return failure(issues);
  }

  providerPackets.sort((left, right) =>
    compareCodeUnits(left.providerKey, right.providerKey)
  );
  modelPackets.sort((left, right) =>
    compareCodeUnits(left.modelKey, right.modelKey)
  );
  const packets: CodexForgeOnboardingPacket[] = [
    ...providerPackets,
    ...modelPackets,
  ];
  const normalizedBundle: CodexForgeOnboardingBundle = {
    schemaVersion: CODEXFORGE_ONBOARDING_SCHEMA_VERSION,
    bundleId,
    contentDigest: null,
    packets,
    activation: {
      registryMembership: "candidate-only",
      catalogMembership: "candidate-only",
      routingVisibility: "none",
      uiVisibility: "none",
      runtimeVisibility: "none",
    },
  };

  let contentDigest;
  try {
    contentDigest = calculateCodexForgeOnboardingContentDigest(normalizedBundle);
  } catch (error) {
    if (error instanceof CodexForgeOnboardingCanonicalizationError) {
      addIssue(issues, "maximum-canonical-payload-exceeded", BUNDLE_LOCATION);
      return failure(issues);
    }
    throw error;
  }
  if (incomingDigest !== null && incomingDigest !== contentDigest.sha256) {
    addIssue(issues, "content-digest-mismatch", BUNDLE_LOCATION);
    return failure(issues);
  }

  const derivedModelStages = modelPackets.map((model) => {
    const provider = providerMap.get(model.providerKey);
    if (!provider) {
      throw new Error("Validated model is missing its provider packet.");
    }
    return {
      modelKey: model.modelKey,
      highestVerifiedStage: deriveModelStage(model, provider),
    };
  });

  return Object.freeze({
    ok: true,
    value: freezeCodexForgeOnboardingValue({
      schemaVersion: CODEXFORGE_ONBOARDING_SCHEMA_VERSION,
      bundleId,
      contentDigest,
      packets,
      activation: normalizedBundle.activation,
      derivedModelStages,
      validation: {
        policyVersion: CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION,
        asOfDate: authority.asOfDate,
      },
    }),
  });
}
