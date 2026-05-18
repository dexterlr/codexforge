import type { CodexForgeCommand, CodexForgeCommandSearchResult } from "./command-palette-types";

export function normalizeCommandSearchQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

function tokensFor(query: string): string[] {
  return normalizeCommandSearchQuery(query).split(" ").filter(Boolean);
}

function addFieldScore(
  matchedFields: string[],
  fieldName: string,
  value: string,
  tokens: readonly string[],
  query: string,
  exactBoost: number
): number {
  const normalized = normalizeCommandSearchQuery(value);
  if (!normalized) return 0;
  let score = 0;
  if (normalized.startsWith(query)) score += exactBoost;
  if (normalized.includes(query)) score += Math.max(2, Math.floor(exactBoost / 2));
  for (const token of tokens) {
    if (normalized.startsWith(token)) score += 8;
    else if (normalized.includes(token)) score += 4;
  }
  if (score > 0) matchedFields.push(fieldName);
  return score;
}

export function scoreCodexForgeCommandMatch(
  command: CodexForgeCommand,
  query: string
): CodexForgeCommandSearchResult {
  const normalizedQuery = normalizeCommandSearchQuery(query);
  const matchedFields: string[] = [];
  if (!normalizedQuery) {
    const safetyScore = command.disabledReason ? 0 : command.safetyLevel === "safe" ? 8 : 5;
    return {
      command,
      score: safetyScore + Math.max(0, 1000 - command.priority) / 1000,
      matchedFields: ["safety-first"],
    };
  }

  const tokens = tokensFor(normalizedQuery);
  let score = 0;
  score += addFieldScore(matchedFields, "label", command.label, tokens, normalizedQuery, 35);
  score += addFieldScore(matchedFields, "description", command.description, tokens, normalizedQuery, 18);
  score += addFieldScore(matchedFields, "group", command.group, tokens, normalizedQuery, 16);
  score += addFieldScore(matchedFields, "href", command.href ?? "", tokens, normalizedQuery, 12);
  score += addFieldScore(
    matchedFields,
    "keywords",
    command.keywords.join(" "),
    tokens,
    normalizedQuery,
    24
  );
  if (command.disabledReason) score -= 4;

  return { command, score, matchedFields: [...new Set(matchedFields)] };
}

export function searchCodexForgeCommands(
  commands: readonly CodexForgeCommand[],
  query: string,
  limit = 60
): CodexForgeCommandSearchResult[] {
  const normalizedQuery = normalizeCommandSearchQuery(query);
  return commands
    .map((command) => scoreCodexForgeCommandMatch(command, normalizedQuery))
    .filter((result) => !normalizedQuery || result.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(Boolean(a.command.disabledReason)) - Number(Boolean(b.command.disabledReason)) ||
        a.command.priority - b.command.priority ||
        a.command.id.localeCompare(b.command.id)
    )
    .slice(0, limit);
}

export function summarizeCommandSearchResults(
  results: readonly CodexForgeCommandSearchResult[]
): string {
  return `${results.length} command search results: ${results
    .map((result) => result.command.label)
    .join(", ")}`;
}
