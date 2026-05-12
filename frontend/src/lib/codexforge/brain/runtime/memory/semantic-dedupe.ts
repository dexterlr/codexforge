import type {
  CodexForgeBrainNode,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "and",
  "codexforge",
  "for",
  "from",
  "into",
  "the",
  "this",
  "that",
  "with",
]);

export type CodexForgeCognitiveMemoryDedupeCandidate = {
  id: string;
  text?: string;
  content?: string;
  label?: string;
  summary?: string;
  updatedAt?: CodexForgeBrainTimestamp;
  pinned?: boolean;
  confidence?: number;
  node?: CodexForgeBrainNode;
};

export type CodexForgeCognitiveMemoryDedupeGroup<
  T extends CodexForgeCognitiveMemoryDedupeCandidate =
    CodexForgeCognitiveMemoryDedupeCandidate,
> = {
  fingerprint: string;
  canonicalItem: T;
  duplicates: T[];
  items: T[];
  reasons: string[];
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function getCandidateText(
  item: CodexForgeCognitiveMemoryDedupeCandidate
): string {
  return (
    item.text ??
    item.content ??
    item.node?.data.summary ??
    item.node?.data.description ??
    item.node?.data.label ??
    item.summary ??
    item.label ??
    item.id
  );
}

function tokenizeFingerprint(fingerprint: string): string[] {
  return fingerprint
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length > 2 &&
        !STOP_WORDS.has(token) &&
        !/^\d+$/.test(token)
    );
}

function tokenOverlap(a: string, b: string): number {
  const left = new Set(tokenizeFingerprint(a));
  const right = new Set(tokenizeFingerprint(b));
  if (left.size === 0 || right.size === 0) return 0;

  let shared = 0;
  for (const token of left) {
    if (right.has(token)) shared += 1;
  }

  return clamp01(shared / Math.max(left.size, right.size));
}

function compareCanonical(
  a: CodexForgeCognitiveMemoryDedupeCandidate,
  b: CodexForgeCognitiveMemoryDedupeCandidate
): number {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

  const confidenceDelta = (b.confidence ?? 0) - (a.confidence ?? 0);
  if (confidenceDelta !== 0) return confidenceDelta;

  const updatedDelta = (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
  if (updatedDelta !== 0) return updatedDelta;

  return a.id.localeCompare(b.id);
}

export function normalizeMemoryFingerprint(text: string): string {
  return text
    .toLowerCase()
    .replace(/\bcannot\b/g, "can not")
    .replace(/\bcan['`]t\b/g, "can not")
    .replace(/\bdisabled\b/g, "not enabled")
    .replace(/\bblocked\b/g, "not allowed")
    .replace(/[^a-z0-9._/\\:#-]+/g, " ")
    .replace(/\s*([/\\])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function dedupeCognitiveMemory<
  T extends CodexForgeCognitiveMemoryDedupeCandidate,
>(items: readonly T[]): CodexForgeCognitiveMemoryDedupeGroup<T>[] {
  const sortedItems = [...items].sort((a, b) => a.id.localeCompare(b.id));
  const groups: Array<{
    fingerprint: string;
    items: T[];
    reasons: string[];
  }> = [];

  for (const item of sortedItems) {
    const fingerprint = normalizeMemoryFingerprint(getCandidateText(item));
    const existing = groups.find(
      (group) =>
        group.fingerprint === fingerprint ||
        tokenOverlap(group.fingerprint, fingerprint) >= 0.86
    );

    if (existing) {
      existing.items.push(item);
      existing.reasons.push(
        existing.fingerprint === fingerprint
          ? "exact-fingerprint-match"
          : "near-fingerprint-token-match"
      );
    } else {
      groups.push({
        fingerprint,
        items: [item],
        reasons: ["canonical-fingerprint"],
      });
    }
  }

  return groups
    .filter((group) => group.items.length > 1)
    .map((group) => {
      const canonicalItem = [...group.items].sort(compareCanonical)[0];
      const duplicates = group.items
        .filter((item) => item.id !== canonicalItem.id)
        .sort(compareCanonical);

      return {
        fingerprint: group.fingerprint,
        canonicalItem,
        duplicates,
        items: [canonicalItem, ...duplicates],
        reasons: Array.from(new Set(group.reasons)).sort((a, b) =>
          a.localeCompare(b)
        ),
      };
    })
    .sort((a, b) => {
      if (b.items.length !== a.items.length) return b.items.length - a.items.length;
      return a.fingerprint.localeCompare(b.fingerprint);
    });
}
