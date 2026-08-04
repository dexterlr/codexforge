import "server-only";

import { createHash, randomBytes } from "node:crypto";

function sortJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonValue);
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right, "en"))
        .map(([key, child]) => [key, sortJsonValue(child)])
    );
  }
  return value;
}

export function serializeCreatorCanonicalJson(value: unknown): string {
  return JSON.stringify(sortJsonValue(value));
}

export function hashCreatorSha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

export function hashCreatorCanonicalJson(value: unknown): string {
  return hashCreatorSha256(serializeCreatorCanonicalJson(value));
}

export function makeCreatorHexId(byteLength: number): string {
  return randomBytes(byteLength).toString("hex");
}
