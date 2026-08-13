import "server-only";

import { createHash, randomBytes } from "node:crypto";

function canonicalize(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Jarvis chat canonical JSON rejects non-finite numbers.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalize(entry)).join(",")}]`;
  }
  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`)
      .join(",")}}`;
  }
  throw new Error("Jarvis chat canonical JSON rejects unsupported values.");
}

export function serializeJarvisChatCanonicalJson(value: unknown): string {
  return canonicalize(value);
}

export function hashJarvisChatSha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

export function hashJarvisChatCanonicalJson(value: unknown): string {
  return hashJarvisChatSha256(serializeJarvisChatCanonicalJson(value));
}

export function makeJarvisChatHexId(bytes: 12 | 16): string {
  return randomBytes(bytes).toString("hex");
}

export function buildJarvisChatIdempotencyKeyHash(
  key: string,
  conversationId: string | null
): string {
  return hashJarvisChatSha256(
    `codexforge.jarvis-chat.idempotency.v1\u0000${conversationId ?? "create"}\u0000${key}`
  );
}
