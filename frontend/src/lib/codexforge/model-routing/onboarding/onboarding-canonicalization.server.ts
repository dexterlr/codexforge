import "server-only";

import { createHash } from "node:crypto";
import {
  CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
  CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS,
  CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
} from "./onboarding-constants";
import type {
  CodexForgeOnboardingBundle,
  CodexForgeOnboardingContentDigest,
} from "./onboarding-types";

export class CodexForgeOnboardingCanonicalizationError extends Error {
  readonly code = "maximum-canonical-payload-exceeded" as const;

  constructor() {
    super("Canonical onboarding content exceeds the v1 payload limit.");
    this.name = "CodexForgeOnboardingCanonicalizationError";
  }
}

function serializeCanonicalValue(
  value: unknown,
  depth: number,
  state: { visitedValues: number }
): string {
  if (depth > CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumNestingDepth) {
    throw new CodexForgeOnboardingCanonicalizationError();
  }

  state.visitedValues += 1;
  if (
    state.visitedValues >
    CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumVisitedValues
  ) {
    throw new CodexForgeOnboardingCanonicalizationError();
  }

  if (value === null || typeof value === "boolean") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new CodexForgeOnboardingCanonicalizationError();
    }
    return JSON.stringify(value);
  }

  if (typeof value === "string") {
    if (
      value.length >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumStringLength
    ) {
      throw new CodexForgeOnboardingCanonicalizationError();
    }
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    if (
      value.length >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumArrayItems
    ) {
      throw new CodexForgeOnboardingCanonicalizationError();
    }
    return `[${value
      .map((item) => serializeCanonicalValue(item, depth + 1, state))
      .join(",")}]`;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    if (
      keys.length > CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumObjectKeys
    ) {
      throw new CodexForgeOnboardingCanonicalizationError();
    }
    return `{${keys
      .map(
        (key) =>
          `${JSON.stringify(key)}:${serializeCanonicalValue(
            record[key],
            depth + 1,
            state
          )}`
      )
      .join(",")}}`;
  }

  throw new CodexForgeOnboardingCanonicalizationError();
}

export function canonicalizeCodexForgeOnboardingBundleContent(
  bundle: CodexForgeOnboardingBundle
): string {
  const canonicalContent = {
    schemaVersion: bundle.schemaVersion,
    bundleId: bundle.bundleId,
    packets: bundle.packets,
    activation: bundle.activation,
  };
  const canonicalJson = serializeCanonicalValue(canonicalContent, 0, {
    visitedValues: 0,
  });
  if (
    Buffer.byteLength(canonicalJson, "utf8") >
    CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumCanonicalUtf8Bytes
  ) {
    throw new CodexForgeOnboardingCanonicalizationError();
  }
  return canonicalJson;
}

export function calculateCodexForgeOnboardingContentDigest(
  bundle: CodexForgeOnboardingBundle
): CodexForgeOnboardingContentDigest {
  const canonicalJson = canonicalizeCodexForgeOnboardingBundleContent(bundle);
  return Object.freeze({
    algorithm: CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
    canonicalizationVersion:
      CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
    sha256: createHash("sha256").update(canonicalJson, "utf8").digest("hex"),
  });
}

export function freezeCodexForgeOnboardingValue<TValue>(value: TValue): TValue {
  const pending: object[] = [];
  if (typeof value === "object" && value !== null) {
    pending.push(value);
  }

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || Object.isFrozen(current)) {
      continue;
    }
    for (const child of Object.values(current)) {
      if (typeof child === "object" && child !== null) {
        pending.push(child);
      }
    }
    Object.freeze(current);
  }
  return value;
}
