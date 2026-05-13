import type {
  CodexForgeBrainCommand,
  CodexForgeBrainCommandCategory,
  CodexForgeBrainCommandSearchResult,
} from "./brain-command-types";

const CATEGORY_ORDER: readonly CodexForgeBrainCommandCategory[] = [
  "navigation",
  "focus",
  "graph",
  "replay",
  "lineage",
  "topology",
  "recommendations",
  "health",
  "agents",
  "files",
  "memory",
  "safety",
  "help",
] as const;

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function categoryRank(category: CodexForgeBrainCommandCategory): number {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

function compareText(left: string, right: string): number {
  return left.localeCompare(right, "en", { sensitivity: "base" });
}

function commandText(command: CodexForgeBrainCommand): string {
  return [
    command.label,
    command.description,
    command.category,
    command.kind,
    command.safety,
    command.shortcut ?? "",
    command.targetMode ?? "",
    command.targetId ?? "",
    ...(command.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function fuzzySequenceScore(query: string, text: string): number {
  if (!query || !text) return 0;

  let queryIndex = 0;
  let streak = 0;
  let bestStreak = 0;

  for (const char of text) {
    if (char === query[queryIndex]) {
      queryIndex += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      if (queryIndex === query.length) break;
    } else {
      streak = 0;
    }
  }

  if (queryIndex !== query.length) return 0;

  const coverage = query.length / text.length;
  const streakBonus = bestStreak / query.length;
  return clampScore(0.32 + coverage * 0.38 + streakBonus * 0.18);
}

export function normalizeBrainCommandQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

export function scoreBrainCommandMatch(
  command: CodexForgeBrainCommand,
  query: string
): number {
  const normalizedQuery = normalizeBrainCommandQuery(query);
  if (!normalizedQuery) return 1;

  const normalizedLabel = normalizeBrainCommandQuery(command.label);
  const normalizedDescription = normalizeBrainCommandQuery(command.description);
  const normalizedShortcut = normalizeBrainCommandQuery(command.shortcut ?? "");
  const normalizedCategory = normalizeBrainCommandQuery(command.category);
  const normalizedKind = normalizeBrainCommandQuery(command.kind);
  const normalizedKeywords = normalizeBrainCommandQuery((command.keywords ?? []).join(" "));
  const normalizedFullText = normalizeBrainCommandQuery(commandText(command));

  if (normalizedLabel === normalizedQuery) return 1;
  if (normalizedShortcut === normalizedQuery) return 0.97;
  if (normalizedLabel.startsWith(normalizedQuery)) return 0.93;
  if (normalizedLabel.includes(normalizedQuery)) return 0.84;
  if (normalizedKeywords.includes(normalizedQuery)) return 0.78;
  if (normalizedDescription.includes(normalizedQuery)) return 0.68;
  if (normalizedCategory.includes(normalizedQuery)) return 0.64;
  if (normalizedKind.includes(normalizedQuery)) return 0.6;

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  if (tokens.length > 1) {
    const matchedTokens = tokens.filter((token) => normalizedFullText.includes(token)).length;
    if (matchedTokens > 0) {
      return clampScore(0.34 + (matchedTokens / tokens.length) * 0.42);
    }
  }

  return fuzzySequenceScore(normalizedQuery, normalizedFullText);
}

export function sortBrainCommandResults(
  results: readonly CodexForgeBrainCommandSearchResult[]
): CodexForgeBrainCommandSearchResult[] {
  return [...results].sort((left, right) => {
    const scoreDelta = right.score - left.score;
    if (scoreDelta !== 0) return scoreDelta;

    return (
      categoryRank(left.command.category) - categoryRank(right.command.category) ||
      compareText(left.command.label, right.command.label) ||
      compareText(left.command.id, right.command.id)
    );
  });
}

export function searchBrainCommands(
  commands: readonly CodexForgeBrainCommand[],
  query: string
): CodexForgeBrainCommandSearchResult[] {
  const normalizedQuery = normalizeBrainCommandQuery(query);
  const results = commands
    .map((command) => ({
      command,
      score: scoreBrainCommandMatch(command, normalizedQuery),
      matchedText: commandText(command),
    }))
    .filter((result) => normalizedQuery.length === 0 || result.score > 0);

  return sortBrainCommandResults(results);
}

