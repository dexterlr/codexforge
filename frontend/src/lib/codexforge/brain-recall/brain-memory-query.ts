import type { CodexForgeBrainImportance, CodexForgeBrainNodeKind, CodexForgeBrainStatus } from "@/lib/codexforge/brain/graph/types";
import type { BrainRecallQuery } from "./brain-recall-types";

const FILTER_PREFIXES = ["kind", "tag", "status", "importance", "file", "path", "artifact", "run"] as const;

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

export function buildBrainRecallStableKey(
  prefix: string,
  parts: readonly unknown[]
): string {
  const key = parts
    .map((part) => (typeof part === "string" || typeof part === "number" || typeof part === "boolean" ? String(part) : ""))
    .map((part) => normalizeText(part).replace(/[^a-z0-9._:-]+/g, "-").replace(/^-+|-+$/g, ""))
    .filter(Boolean)
    .join(":");

  return `${prefix}:${key || "empty"}`;
}

function stableQueryId(query: string): string {
  return buildBrainRecallStableKey("brain-recall-query", [query]);
}

function extractExactPhrases(raw: string): string[] {
  const matches = raw.match(/"([^"]+)"/g) ?? [];
  return Array.from(new Set(matches.map((match) => normalizeText(match.slice(1, -1))).filter(Boolean))).sort();
}

function stripPhrases(raw: string): string {
  return raw.replace(/"([^"]+)"/g, " ");
}

export function normalizeBrainRecallQuery(raw: string): string {
  return normalizeText(raw);
}

export function parseBrainRecallQuery(raw: string): BrainRecallQuery {
  const exactPhrases = extractExactPhrases(raw);
  const tokens = stripPhrases(raw).split(/\s+/).map((token) => token.trim()).filter(Boolean);
  const terms: string[] = [];
  const kindFilters: CodexForgeBrainNodeKind[] = [];
  const tagFilters: string[] = [];
  const statusFilters: Array<CodexForgeBrainStatus | "unknown"> = [];
  const importanceFilters: Array<CodexForgeBrainImportance | "unknown"> = [];
  const fileHints: string[] = [];
  const artifactHints: string[] = [];
  const runHints: string[] = [];

  for (const token of tokens) {
    const separator = token.indexOf(":");
    const prefix = separator > 0 ? normalizeToken(token.slice(0, separator)) : "";
    const value = separator > 0 ? normalizeToken(token.slice(separator + 1)) : "";

    if (FILTER_PREFIXES.includes(prefix as (typeof FILTER_PREFIXES)[number]) && value) {
      if (prefix === "kind") kindFilters.push(value as CodexForgeBrainNodeKind);
      else if (prefix === "tag") tagFilters.push(value);
      else if (prefix === "status") statusFilters.push(value as CodexForgeBrainStatus);
      else if (prefix === "importance") importanceFilters.push(value as CodexForgeBrainImportance);
      else if (prefix === "file" || prefix === "path") fileHints.push(value);
      else if (prefix === "artifact") artifactHints.push(value);
      else if (prefix === "run") runHints.push(value);
      continue;
    }

    terms.push(normalizeToken(token));
  }

  const query: BrainRecallQuery = {
    id: stableQueryId(raw),
    raw,
    normalizedText: normalizeBrainRecallQuery(raw),
    terms: Array.from(new Set(terms)).sort(),
    exactPhrases,
    kindFilters: Array.from(new Set(kindFilters)).sort(),
    tagFilters: Array.from(new Set(tagFilters)).sort(),
    statusFilters: Array.from(new Set(statusFilters)).sort(),
    importanceFilters: Array.from(new Set(importanceFilters)).sort(),
    fileHints: Array.from(new Set(fileHints)).sort(),
    artifactHints: Array.from(new Set(artifactHints)).sort(),
    runHints: Array.from(new Set(runHints)).sort(),
    summary: [],
  };

  return { ...query, summary: summarizeBrainRecallQuery(query) };
}

export function summarizeBrainRecallQuery(query: BrainRecallQuery): string[] {
  return [
    query.terms.length ? `${query.terms.length} text terms parsed.` : "No plain text terms parsed.",
    `${query.kindFilters.length} kind:, ${query.tagFilters.length} tag:, ${query.statusFilters.length} status:, and ${query.fileHints.length} file: filters parsed.`,
    query.exactPhrases.length ? `${query.exactPhrases.length} exact phrase hints parsed.` : "No exact phrase hints parsed.",
  ];
}
