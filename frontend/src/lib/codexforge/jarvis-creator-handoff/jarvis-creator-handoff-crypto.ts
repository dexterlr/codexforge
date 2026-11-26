import "server-only";

import { createHash, randomBytes } from "node:crypto";

function canonicalize(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("Jarvis creator handoff canonical JSON rejects non-finite numbers.");
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalize(entry)).join(",")}]`;
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`)
      .join(",")}}`;
  }
  throw new Error("Jarvis creator handoff canonical JSON rejects unsupported values.");
}

export function serializeJarvisCreatorHandoffCanonicalJson(value: unknown): string {
  return canonicalize(value);
}

export function hashJarvisCreatorHandoffSha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

export function hashJarvisCreatorHandoffCanonicalJson(value: unknown): string {
  return hashJarvisCreatorHandoffSha256(
    serializeJarvisCreatorHandoffCanonicalJson(value)
  );
}

export function makeJarvisCreatorHandoffHexId(byteLength: number): string {
  if (!Number.isSafeInteger(byteLength) || byteLength < 12 || byteLength > 32) {
    throw new Error("Jarvis creator handoff ID byte length is invalid.");
  }
  return randomBytes(byteLength).toString("hex");
}

const HANDOFF_DOMAIN = "codexforge.jarvis-creator-handoff.v1";

function domainHash(label: string, value: string): string {
  return hashJarvisCreatorHandoffSha256(`${HANDOFF_DOMAIN}:${label}\u0000${value}`);
}

export function hashJarvisCreatorHandoffExternalKey(key: string): string {
  return domainHash("external-idempotency-key", key);
}

export function buildJarvisCreatorHandoffSemanticDigest(value: unknown): string {
  return domainHash("semantic-request", serializeJarvisCreatorHandoffCanonicalJson(value));
}

export function buildJarvisCreatorHandoffMutationDigest(value: unknown): string {
  return domainHash("exact-mutation", serializeJarvisCreatorHandoffCanonicalJson(value));
}

export function buildJarvisCreatorHandoffId(semanticDigest: string): string {
  if (!/^[a-f0-9]{64}$/u.test(semanticDigest)) {
    throw new Error("Jarvis creator handoff semantic digest is invalid.");
  }
  return domainHash("handoff-id", semanticDigest).slice(0, 24);
}

export function buildJarvisCreatorHandoffFinalizationLockId(
  handoffId: string
): string {
  if (!/^[a-f0-9]{24}$/u.test(handoffId)) {
    throw new Error("Jarvis creator handoff finalization identity is invalid.");
  }
  return domainHash("finalization-lock", handoffId).slice(0, 24);
}

export function buildJarvisCreatorHandoffCreatorKey(semanticDigest: string): string {
  if (!/^[a-f0-9]{64}$/u.test(semanticDigest)) {
    throw new Error("Jarvis creator handoff semantic digest is invalid.");
  }
  return `jarvis-creator-${domainHash("creator-idempotency-key", semanticDigest)}`;
}
