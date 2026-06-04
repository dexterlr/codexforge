import "server-only";
import { promises as fs } from "node:fs";
import type { Dirent } from "node:fs";
import path from "node:path";
import {
  appendCodexForgePathSegment,
  CODEXFORGE_PROJECT_ROOT,
  isAbsolutePathInsideBase,
  resolveCodexForgeProjectPath,
  toPortableProjectRelativePath,
} from "@/lib/codexforge/server-safe-paths";
import {
  inferArchitectureRole,
  inferFileKind,
  inferOwnerArea,
  inferRelatedConcepts,
  summarizeFilePurpose,
} from "../file-intelligence";
import type {
  CodexForgeFileExecutionHistoryItem,
  CodexForgeFileNode,
  CodexForgeFileRiskLevel,
  CodexForgeFileTimelineItem,
} from "../types";

export const CODEXFORGE_FILES_MAX_FILE_COUNT = 160;
export const CODEXFORGE_FILES_MAX_SCAN_ENTRIES = 1200;
export const CODEXFORGE_FILES_MAX_DEPTH = 8;
export const CODEXFORGE_FILES_GENERATED_AT = "2026-05-12T12:30:00.000Z";

export const CODEXFORGE_FILES_SKIPPED_DIRS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
  ".codexforge",
] as const;

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".css",
  ".scss",
  ".yml",
  ".yaml",
  ".ps1",
]);

export type CodexForgeProjectFileFilters = {
  q?: string;
  path?: string;
  risk?: CodexForgeFileRiskLevel | "all";
  kind?: CodexForgeFileNode["kind"] | "all";
  limit?: number;
};

export type CodexForgeProjectFilesResult = {
  files: CodexForgeFileNode[];
  scannedFiles: number;
  truncated: boolean;
  root: string;
  maxFileCount: number;
};

type Candidate = {
  absolutePath: string;
  relativePath: string;
  name: string;
  extension: string;
  size: number;
  lineCount: number;
  updatedAt: string;
};

function clampLimit(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 80;
  return Math.max(1, Math.min(Math.floor(value), CODEXFORGE_FILES_MAX_FILE_COUNT));
}

function isTextCandidate(filePath: string): boolean {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function blockedDir(name: string): boolean {
  return CODEXFORGE_FILES_SKIPPED_DIRS.includes(
    name as (typeof CODEXFORGE_FILES_SKIPPED_DIRS)[number]
  );
}

function buildTimeline(file: Candidate): CodexForgeFileTimelineItem[] {
  return [
    {
      id: `${file.relativePath}:indexed`,
      timestamp: CODEXFORGE_FILES_GENERATED_AT,
      label: "Live read-only index",
      detail: "Discovered by bounded local project scan.",
      kind: "reviewed",
    },
    {
      id: `${file.relativePath}:modified`,
      timestamp: file.updatedAt,
      label: "Filesystem metadata",
      detail: "Last modified timestamp from read-only stat metadata.",
      kind: "changed",
    },
  ];
}

function buildExecutionHistory(file: Candidate): CodexForgeFileExecutionHistoryItem[] {
  const isSmoke = file.relativePath.includes("scripts/smoke-");
  return [
    {
      id: `${file.relativePath}:runtime-history`,
      timestamp: CODEXFORGE_FILES_GENERATED_AT,
      command: isSmoke
        ? `powershell -ExecutionPolicy Bypass -File ./${file.relativePath.replaceAll("/", "\\")}`
        : "read-only runtime context scan",
      status: isSmoke ? "passed" : "skipped",
      summary: isSmoke
        ? "Smoke script is part of the deterministic validation surface."
        : "No command was executed by Files runtime intelligence.",
    },
  ];
}

function tagsForPath(relativePath: string): string[] {
  const lowerPath = relativePath.toLowerCase();
  const tags = new Set<string>(["live", "read-only"]);
  if (lowerPath.includes("/app/")) tags.add("entrypoint");
  if (lowerPath.includes("runtime")) tags.add("runtime");
  if (lowerPath.includes("memory")) tags.add("memory");
  if (lowerPath.includes("/tools/")) tags.add("tool");
  if (lowerPath.includes("scripts/smoke-")) tags.add("tested");
  if (lowerPath.includes("/files/")) tags.add("files");
  return Array.from(tags).sort();
}

function toNode(file: Candidate): CodexForgeFileNode {
  const concepts = inferRelatedConcepts(file.relativePath);
  return {
    id: file.relativePath,
    path: file.relativePath,
    name: file.name,
    kind: inferFileKind(file.relativePath),
    area: inferOwnerArea(file.relativePath),
    ownerArea: inferOwnerArea(file.relativePath),
    architectureRole: inferArchitectureRole(file.relativePath),
    summary: summarizeFilePurpose(file.relativePath),
    extension: file.extension,
    tags: tagsForPath(file.relativePath),
    concepts,
    relatedMemory: concepts.map((concept) => `Runtime context: ${concept}`),
    lastTouchedAt: file.updatedAt,
    lineCount: file.lineCount,
    dependencyIds: [],
    timeline: buildTimeline(file),
    executionHistory: buildExecutionHistory(file),
    insights: [
      {
        id: `${file.relativePath}:bounded-scan`,
        label: "Live source",
        value: "Read-only API",
        detail: "Derived from a bounded server-side project scan.",
      },
    ],
    safeEditPreview: {
      id: `${file.relativePath}:safe-preview`,
      filePath: file.relativePath,
      title: "Read-only file intelligence",
      previewOnly: true,
      summary: "Live Files intelligence is inspection-only and does not apply changes.",
      proposedSteps: ["Inspect preview.", "Trace imports.", "Run validation outside this read-only surface."],
      riskHints: ["Server routes, runtime, memory, and tools carry broader integration risk."],
      rollbackHints: ["No runtime mutation is performed from this panel."],
      testHints: ["Use existing build and smoke commands after intentional edits."],
    },
  };
}

function matchesFilters(file: CodexForgeFileNode, filters: CodexForgeProjectFileFilters): boolean {
  if (filters.kind && filters.kind !== "all" && file.kind !== filters.kind) return false;
  if (filters.q) {
    const q = filters.q.toLowerCase();
    const haystack = [file.path, file.summary, file.ownerArea, ...file.tags, ...file.concepts]
      .join(" ")
      .toLowerCase();
    if (!q.split(/\s+/).filter(Boolean).every((token) => haystack.includes(token))) return false;
  }
  return true;
}

export function resolveCodexForgeFilesRoot(requestedPath?: string): string {
  try {
    return resolveCodexForgeProjectPath(requestedPath || ".", {
      outsideBaseError: "Requested Files root escaped the project root.",
      unsafeRelativeError: "Requested Files root contains unsafe traversal.",
    }).absolutePath;
  } catch {
    return CODEXFORGE_PROJECT_ROOT;
  }
}

export async function collectCodexForgeProjectFiles(
  filters: CodexForgeProjectFileFilters = {}
): Promise<CodexForgeProjectFilesResult> {
  const root = resolveCodexForgeFilesRoot(filters.path);
  const limit = clampLimit(filters.limit);
  const candidates: Candidate[] = [];
  let scannedEntries = 0;
  let scannedFiles = 0;
  let truncated = false;
  const queue: Array<{ absolutePath: string; depth: number }> = [{ absolutePath: root, depth: 0 }];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    let entries: Dirent[];
    try {
      entries = await fs.readdir(current.absolutePath, { withFileTypes: true });
    } catch {
      continue;
    }

    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      scannedEntries += 1;
      if (scannedEntries > CODEXFORGE_FILES_MAX_SCAN_ENTRIES) {
        truncated = true;
        break;
      }

      if (entry.name.startsWith(".") && entry.name !== ".env") continue;
      const absolutePath = appendCodexForgePathSegment(current.absolutePath, entry.name);
      if (!isAbsolutePathInsideBase(absolutePath, CODEXFORGE_PROJECT_ROOT, true)) continue;

      if (entry.isDirectory()) {
        if (!blockedDir(entry.name) && current.depth < CODEXFORGE_FILES_MAX_DEPTH) {
          queue.push({ absolutePath, depth: current.depth + 1 });
        }
        continue;
      }

      if (!entry.isFile() || !isTextCandidate(entry.name)) continue;
      scannedFiles += 1;

      const stat = await fs.stat(absolutePath).catch(() => null);
      if (!stat || stat.size > 512 * 1024) continue;

      const text = await fs.readFile(absolutePath, "utf8").catch(() => "");
      candidates.push({
        absolutePath,
        relativePath: toPortableProjectRelativePath(absolutePath, CODEXFORGE_PROJECT_ROOT),
        name: entry.name,
        extension: path.extname(entry.name).toLowerCase(),
        size: stat.size,
        lineCount: text ? text.split(/\r?\n/).length : 0,
        updatedAt: new Date(Math.floor(stat.mtimeMs)).toISOString(),
      });
    }

    if (truncated) break;
  }

  const files = candidates
    .map(toNode)
    .filter((file) => matchesFilters(file, filters))
    .sort((a, b) => a.path.localeCompare(b.path))
    .slice(0, limit);

  return {
    files,
    scannedFiles,
    truncated: truncated || candidates.length > limit,
    root: toPortableProjectRelativePath(root, CODEXFORGE_PROJECT_ROOT) || ".",
    maxFileCount: CODEXFORGE_FILES_MAX_FILE_COUNT,
  };
}
