import type {
  ProjectFileSearchResult,
  ProjectFileSearchSummary,
  ProjectSearchQuery,
  ProjectSearchableFile,
} from "./local-project-reader-types";
import {
  classifyProjectFileCategory,
  getProjectFileExtension,
  getProjectFileName,
  normalizeProjectReaderPath,
} from "./project-file-metadata";
import { inferProjectFilePurpose } from "./project-file-purpose";
import { classifyProjectFileRisk } from "./project-file-risk";

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeProjectFileSearchQuery(query: string): ProjectSearchQuery {
  const raw = query.trim();
  const tokens = unique(raw.split(/\s+/).map(normalizeToken));
  const readPrefixed = (prefix: string) =>
    tokens
      .filter((token) => token.startsWith(`${prefix}:`))
      .map((token) => token.slice(prefix.length + 1))
      .filter(Boolean);
  const unprefixed = tokens.filter((token) => !token.includes(":"));

  return {
    raw,
    tokens,
    pathTokens: [...readPrefixed("path"), ...unprefixed.filter((token) => token.includes("/"))],
    nameTokens: readPrefixed("name"),
    extensionTokens: [
      ...readPrefixed("ext").map((token) => (token.startsWith(".") ? token : `.${token}`)),
      ...unprefixed.filter((token) => token.startsWith(".")),
    ],
    categoryTokens: readPrefixed("category"),
    purposeTokens: readPrefixed("purpose"),
    riskTokens: readPrefixed("risk"),
    keywordTokens: unprefixed,
  };
}

function searchableDefaults(file: ProjectSearchableFile): Required<ProjectSearchableFile> {
  const path = normalizeProjectReaderPath(file.path);
  return {
    path,
    name: file.name ?? getProjectFileName(path),
    extension: file.extension ?? getProjectFileExtension(path),
    category: file.category ?? classifyProjectFileCategory(path),
    purpose: file.purpose ?? inferProjectFilePurpose(path).summary,
    risk: file.risk ?? classifyProjectFileRisk(path),
    keywords: file.keywords ?? [],
    summary: file.summary ?? "",
  };
}

function addScore(args: {
  score: number;
  matchedFields: string[];
  field: string;
  points: number;
  matched: boolean;
}): number {
  if (!args.matched) return args.score;
  args.matchedFields.push(args.field);
  return args.score + args.points;
}

export function scoreProjectFileSearchMatch(
  file: ProjectSearchableFile,
  queryInput: ProjectSearchQuery | string
): ProjectFileSearchResult {
  const query = typeof queryInput === "string" ? normalizeProjectFileSearchQuery(queryInput) : queryInput;
  const normalized = searchableDefaults(file);
  const haystack = [
    normalized.path,
    normalized.name,
    normalized.extension,
    normalized.category,
    normalized.purpose,
    normalized.risk,
    normalized.summary,
    ...normalized.keywords,
  ]
    .join(" ")
    .toLowerCase();
  const matchedFields: string[] = [];
  let score = 0;

  for (const token of query.pathTokens) {
    score = addScore({ score, matchedFields, field: "path", points: 60, matched: normalized.path.toLowerCase().includes(token) });
  }

  for (const token of query.nameTokens) {
    score = addScore({ score, matchedFields, field: "name", points: 70, matched: normalized.name.toLowerCase().includes(token) });
  }

  for (const token of query.extensionTokens) {
    score = addScore({ score, matchedFields, field: "extension", points: 45, matched: normalized.extension.toLowerCase() === token });
  }

  for (const token of query.categoryTokens) {
    score = addScore({ score, matchedFields, field: "category", points: 50, matched: normalized.category === token });
  }

  for (const token of query.purposeTokens) {
    score = addScore({ score, matchedFields, field: "purpose", points: 40, matched: normalized.purpose.toLowerCase().includes(token) });
  }

  for (const token of query.riskTokens) {
    score = addScore({ score, matchedFields, field: "risk", points: 50, matched: normalized.risk === token });
  }

  for (const token of query.keywordTokens) {
    if (!token) continue;
    const pathMatch = normalized.path.toLowerCase().includes(token);
    const nameMatch = normalized.name.toLowerCase().includes(token);
    const categoryMatch = normalized.category === token;
    const purposeMatch = normalized.purpose.toLowerCase().includes(token);
    const riskMatch = normalized.risk === token;
    const keywordMatch = normalized.keywords.some((keyword) => keyword.toLowerCase().includes(token));
    const matched = pathMatch || nameMatch || categoryMatch || purposeMatch || riskMatch || keywordMatch || haystack.includes(token);
    score = addScore({
      score,
      matchedFields,
      field: pathMatch ? "path" : nameMatch ? "name" : categoryMatch ? "category" : riskMatch ? "risk" : "keyword",
      points: pathMatch ? 35 : nameMatch ? 45 : categoryMatch ? 30 : purposeMatch ? 22 : riskMatch ? 30 : 12,
      matched,
    });
  }

  if (query.raw && normalized.path.toLowerCase() === query.raw.toLowerCase()) score += 100;
  if (query.raw && normalized.name.toLowerCase() === query.raw.toLowerCase()) score += 90;

  return {
    file: normalized,
    score,
    matchedFields: unique(matchedFields),
  };
}

export function searchProjectFiles(
  files: ProjectSearchableFile[],
  queryInput: string,
  maxResults = 80
): ProjectFileSearchResult[] {
  const query = normalizeProjectFileSearchQuery(queryInput);
  const limit = Math.max(1, Math.min(Math.floor(maxResults), 200));
  if (query.tokens.length === 0) {
    return files
      .map((file) => scoreProjectFileSearchMatch(file, query))
      .sort((a, b) => a.file.path.localeCompare(b.file.path))
      .slice(0, limit);
  }

  return files
    .map((file) => scoreProjectFileSearchMatch(file, query))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.file.path.localeCompare(b.file.path))
    .slice(0, limit);
}

export function summarizeProjectFileSearchResults(
  results: ProjectFileSearchResult[],
  queryInput = ""
): ProjectFileSearchSummary {
  const topPath = results[0]?.file.path ?? "";
  return {
    query: queryInput,
    resultCount: results.length,
    topPath,
    text:
      results.length > 0
        ? `${results.length} deterministic file search results. Top match: ${topPath}.`
        : `No deterministic file search results for ${queryInput || "empty query"}.`,
  };
}

