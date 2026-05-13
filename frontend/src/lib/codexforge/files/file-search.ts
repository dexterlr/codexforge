import { calculateFileRisk } from "./file-risk";
import type {
  CodexForgeFileKind,
  CodexForgeFileNode,
  CodexForgeFileSearchFilters,
} from "./types";

export function normalizeFileSearchQuery(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

export function buildCodexForgeFileReactKey(
  scope: string,
  parts: Array<string | number | undefined>,
  index: number
): string {
  const stableParts = parts
    .map((part) => String(part ?? "").trim().toLowerCase().replace(/[^a-z0-9_.:/-]+/g, "-"))
    .filter(Boolean);

  return [scope, ...stableParts, String(index)].join(":");
}

export function getCodexForgeFileCategory(file: Pick<CodexForgeFileNode, "path" | "kind">): string {
  const path = file.path.toLowerCase();

  if (path.includes("/app/api/") || path.endsWith("/route.ts")) return "API routes";
  if (path.includes("/app/")) return "App routes";
  if (file.kind === "component" || path.includes("/components/")) return "Components";
  if (path.includes("/brain/runtime/")) return "Runtime";
  if (path.includes("/tools/")) return "Tools";
  if (path.includes("/brain/")) return "Brain";
  if (file.kind === "docs") return "Docs";
  if (path.startsWith("scripts/")) return "Scripts";
  if (file.kind === "config") return "Config";
  if (file.kind === "smoke" || path.includes("smoke")) return "Tests/Smoke";
  return "Library";
}

export function scoreFileSearchMatch(file: CodexForgeFileNode, query: string): number {
  return scoreFile(file, query);
}

function matchesQuery(file: CodexForgeFileNode, query: string): boolean {
  if (!query) return true;

  const haystack = [
    file.path,
    file.name,
    file.summary,
    file.area,
    file.ownerArea,
    file.architectureRole,
    ...file.tags,
    ...file.concepts,
    ...file.relatedMemory,
  ]
    .join(" ")
    .toLowerCase();

  return query.split(/\s+/).filter(Boolean).every((token) => haystack.includes(token));
}

export function filterFiles(
  files: CodexForgeFileNode[],
  filters: CodexForgeFileSearchFilters = {}
): CodexForgeFileNode[] {
  const query = normalizeFileSearchQuery(filters.query);
  const kind = filters.kind ?? "all";
  const risk = filters.risk ?? "all";
  const tag = filters.tag ?? "all";
  const dependency = filters.dependency ?? "all";
  const recent = filters.recent === true;

  return files.filter((file) => {
    if (!matchesQuery(file, query)) return false;
    if (kind !== "all" && file.kind !== kind) return false;
    if (risk !== "all" && calculateFileRisk(file).level !== risk) return false;
    if (tag !== "all" && !file.tags.includes(tag)) return false;
    if (dependency !== "all" && !file.dependencyIds.includes(dependency)) return false;
    if (recent && !file.tags.includes("recent")) return false;
    return true;
  });
}

export function rankFiles(
  files: CodexForgeFileNode[],
  query = ""
): CodexForgeFileNode[] {
  const normalizedQuery = normalizeFileSearchQuery(query);

  return [...files].sort((a, b) => {
    const scoreA = scoreFile(a, normalizedQuery);
    const scoreB = scoreFile(b, normalizedQuery);
    if (scoreA !== scoreB) return scoreB - scoreA;
    if (a.lastTouchedAt !== b.lastTouchedAt) return b.lastTouchedAt.localeCompare(a.lastTouchedAt);
    return a.path.localeCompare(b.path);
  });
}

export function searchFiles(
  files: CodexForgeFileNode[],
  filters: CodexForgeFileSearchFilters = {}
): CodexForgeFileNode[] {
  return rankFiles(filterFiles(files, filters), filters.query);
}

function scoreFile(file: CodexForgeFileNode, query: string): number {
  let score = 0;
  const risk = calculateFileRisk(file);
  const extension = file.extension.toLowerCase();
  const kind: CodexForgeFileKind = file.kind;
  const category = getCodexForgeFileCategory(file).toLowerCase();

  if (file.tags.includes("recent")) score += 20;
  if (file.tags.includes("entrypoint")) score += 18;
  if (file.tags.includes("tested")) score += 12;
  if (risk.level === "critical") score += 8;
  if (risk.level === "high") score += 6;

  if (query) {
    if (file.name.toLowerCase().includes(query)) score += 60;
    if (file.path.toLowerCase().includes(query)) score += 40;
    if (extension && extension.includes(query)) score += 30;
    if (kind.includes(query)) score += 28;
    if (category.includes(query)) score += 26;
    if (file.ownerArea.toLowerCase().includes(query)) score += 24;
    if (file.summary.toLowerCase().includes(query)) score += 24;
    if (file.concepts.join(" ").toLowerCase().includes(query)) score += 18;
  }

  return score;
}
