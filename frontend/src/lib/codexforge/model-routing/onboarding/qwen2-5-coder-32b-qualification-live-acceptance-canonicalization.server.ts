import "server-only";

import { createHash } from "node:crypto";
import { isProxy } from "node:util/types";
import {
  CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
  CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS,
  CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
} from "./onboarding-constants";
import type { CodexForgeQwen25Coder32BSliceRDigest } from "./qwen2-5-coder-32b-qualification-live-acceptance-types";

export const CODEXFORGE_QWEN25_CODER_32B_SLICE_R_PLAIN_DATA_REJECTION_CODES = [
  "input-not-plain-data",
  "accessor-property-rejected",
  "proxy-rejected",
  "function-value-rejected",
  "symbol-value-rejected",
  "symbol-key-rejected",
  "cycle-detected",
  "shared-reference-detected",
  "exotic-prototype-rejected",
  "sparse-array-rejected",
  "complexity-limit-exceeded",
] as const;

export type CodexForgeQwen25Coder32BSliceRPlainDataRejectionCode =
  typeof CODEXFORGE_QWEN25_CODER_32B_SLICE_R_PLAIN_DATA_REJECTION_CODES[number];

export class CodexForgeQwen25Coder32BSliceRCanonicalizationError extends Error {
  readonly code: CodexForgeQwen25Coder32BSliceRPlainDataRejectionCode;

  constructor(code: CodexForgeQwen25Coder32BSliceRPlainDataRejectionCode) {
    super(`Slice R canonicalization rejected non-plain or over-complex data: ${code}`);
    this.name = "CodexForgeQwen25Coder32BSliceRCanonicalizationError";
    this.code = code;
  }
}

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

function auditPlainData(value: unknown): void {
  const visited = new WeakSet<object>();
  const ancestors = new WeakSet<object>();
  let visitedValues = 0;

  function visit(current: unknown, depth: number): void {
    if (depth > CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumNestingDepth) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "complexity-limit-exceeded"
      );
    }
    visitedValues += 1;
    if (
      visitedValues >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumVisitedValues
    ) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "complexity-limit-exceeded"
      );
    }
    if (current === null || typeof current === "boolean") return;
    if (typeof current === "string") {
      if (
        current.length >
        CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumStringLength
      ) {
        throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
          "complexity-limit-exceeded"
        );
      }
      return;
    }
    if (typeof current === "number") {
      if (!Number.isFinite(current)) {
        throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
          "input-not-plain-data"
        );
      }
      return;
    }
    if (typeof current === "function") {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "function-value-rejected"
      );
    }
    if (typeof current === "symbol") {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "symbol-value-rejected"
      );
    }
    if (typeof current !== "object" || current === undefined) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "input-not-plain-data"
      );
    }
    if (isProxy(current)) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "proxy-rejected"
      );
    }
    if (ancestors.has(current)) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "cycle-detected"
      );
    }
    if (visited.has(current)) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "shared-reference-detected"
      );
    }
    visited.add(current);
    ancestors.add(current);

    const array = Array.isArray(current);
    const prototype = Object.getPrototypeOf(current);
    if (
      (array && prototype !== Array.prototype) ||
      (!array && prototype !== Object.prototype && prototype !== null)
    ) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "exotic-prototype-rejected"
      );
    }
    if (
      array &&
      current.length > CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumArrayItems
    ) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "complexity-limit-exceeded"
      );
    }

    const descriptors = Object.getOwnPropertyDescriptors(current);
    const ownKeys = Reflect.ownKeys(descriptors);
    const dataKeys = ownKeys.filter((key) => key !== "length");
    if (
      dataKeys.length >
      CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumObjectKeys
    ) {
      throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
        "complexity-limit-exceeded"
      );
    }
    if (array) {
      for (let index = 0; index < current.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(current, index)) {
          throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
            "sparse-array-rejected"
          );
        }
      }
    }
    for (const key of dataKeys) {
      if (typeof key === "symbol") {
        throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
          "symbol-key-rejected"
        );
      }
      const descriptor = descriptors[key];
      if (!descriptor || descriptor.get || descriptor.set) {
        throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
          "accessor-property-rejected"
        );
      }
      if (!descriptor.enumerable) {
        throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
          "input-not-plain-data"
        );
      }
      visit(descriptor.value, depth + 1);
    }
    ancestors.delete(current);
  }

  visit(value, 0);
}

function serialize(value: unknown): string {
  if (value === null || typeof value === "boolean" || typeof value === "number") {
    return JSON.stringify(value);
  }
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(serialize).join(",")}]`;
  if (isPlainRecord(value)) {
    return `{${Object.keys(value)
      .sort(compareCodeUnits)
      .map((key) => `${JSON.stringify(key)}:${serialize(value[key])}`)
      .join(",")}}`;
  }
  throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
    "input-not-plain-data"
  );
}

export function canonicalizeCodexForgeQwen25Coder32BSliceRValue(
  value: unknown
): string {
  auditPlainData(value);
  const canonical = serialize(value);
  if (
    Buffer.byteLength(canonical, "utf8") >
    CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumCanonicalUtf8Bytes
  ) {
    throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
      "complexity-limit-exceeded"
    );
  }
  return canonical;
}

export function calculateCodexForgeQwen25Coder32BSliceRDigest(
  value: unknown
): CodexForgeQwen25Coder32BSliceRDigest {
  const canonical = canonicalizeCodexForgeQwen25Coder32BSliceRValue(value);
  return Object.freeze({
    algorithm: CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM,
    canonicalizationVersion: CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION,
    sha256: createHash("sha256").update(canonical, "utf8").digest("hex"),
  });
}

export function calculateCodexForgeQwen25Coder32BContentDigest(
  value: unknown
): CodexForgeQwen25Coder32BSliceRDigest {
  if (!isPlainRecord(value)) {
    throw new CodexForgeQwen25Coder32BSliceRCanonicalizationError(
      "input-not-plain-data"
    );
  }
  const projection: SafeRecord = {};
  for (const key of Object.keys(value)) {
    if (key !== "contentDigest") projection[key] = value[key];
  }
  return calculateCodexForgeQwen25Coder32BSliceRDigest(projection);
}

export function sha256CodexForgeQwen25Coder32BUtf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function freezeCodexForgeQwen25Coder32BSliceRValue<TValue>(
  value: TValue
): TValue {
  const pending: object[] = [];
  if (typeof value === "object" && value !== null) pending.push(value);
  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || Object.isFrozen(current)) continue;
    for (const descriptor of Object.values(
      Object.getOwnPropertyDescriptors(current)
    )) {
      if (
        descriptor &&
        "value" in descriptor &&
        typeof descriptor.value === "object" &&
        descriptor.value !== null
      ) {
        pending.push(descriptor.value);
      }
    }
    Object.freeze(current);
  }
  return value;
}

export function cloneAndFreezeCodexForgeQwen25Coder32BSliceRValue<TValue>(
  value: TValue
): TValue {
  const canonical = canonicalizeCodexForgeQwen25Coder32BSliceRValue(value);
  return freezeCodexForgeQwen25Coder32BSliceRValue(
    JSON.parse(canonical) as TValue
  );
}
