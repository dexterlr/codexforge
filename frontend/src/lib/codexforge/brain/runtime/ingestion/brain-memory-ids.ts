import type {
  CodexForgeBrainEdgeKind,
  CodexForgeBrainNodeId,
} from "@/lib/codexforge/brain/graph/types";

export const CODEXFORGE_BRAIN_MEMORY_INGESTION_FIXED_TS = 1770854400000;

function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16);
}

function normalizeIdPart(value: string): string {
  const normalized = value
    .trim()
    .replaceAll("\\", "/")
    .replace(/\s+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/[^A-Za-z0-9/_:.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || stableHash(value);
}

export function createStableBrainMemoryId(
  category: string,
  ...parts: Array<string | number | null | undefined>
): string {
  const prefix = normalizeIdPart(category).toLowerCase();
  const normalizedParts = parts
    .filter((part): part is string | number => part !== null && part !== undefined)
    .map((part) => normalizeIdPart(String(part)))
    .filter(Boolean);

  return normalizedParts.length > 0
    ? `${prefix}:${normalizedParts.join(":")}`
    : `${prefix}:${stableHash(prefix)}`;
}

export function createStableBrainMemoryEdgeId(
  from: CodexForgeBrainNodeId,
  to: CodexForgeBrainNodeId,
  kind: CodexForgeBrainEdgeKind,
  label?: string
): string {
  const relation = label ? `${kind}:${normalizeIdPart(label)}` : kind;
  return `edge:${from}->${to}:${relation}`;
}
