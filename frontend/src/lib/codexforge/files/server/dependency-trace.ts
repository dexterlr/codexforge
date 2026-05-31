import { promises as fs } from "node:fs";
import path from "node:path";
import {
  normalizeSafeRelativePath,
  resolveImportSpecifierPath,
} from "@/lib/codexforge/server-safe-paths";
import type {
  CodexForgeFileDependency,
  CodexForgeFileDependencyTrace,
  CodexForgeFileNode,
} from "../types";

const IMPORT_PATTERN =
  /\b(?:import|export)\s+(?:type\s+)?(?:[^"'`]*?\s+from\s+)?["']([^"']+)["']/g;
const EXPORT_PATTERN = /\bexport\s+(?:type\s+)?(?:const|function|class|type|interface)\s+([A-Za-z0-9_]+)/g;

function normalizePath(value: string): string {
  return value.replaceAll("\\", "/");
}

function resolveInsideProject(relativePath: string): string | null {
  const normalized = normalizeSafeRelativePath(relativePath);
  if (!normalized.safe || !normalized.normalizedRelativePath) return null;

  const root = process.cwd();
  const absolutePath = path.join(root, ...normalized.normalizedRelativePath.split("/"));
  const relative = normalizePath(path.relative(root, absolutePath));
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return absolutePath;
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function resolveImportTarget(
  fromPath: string,
  specifier: string,
  files: CodexForgeFileNode[]
): string | null {
  const normalizedBase = resolveImportSpecifierPath(fromPath, specifier);
  if (!normalizedBase) return null;

  const matches = files
    .map((file) => file.path)
    .filter(
      (candidate) =>
        candidate === normalizedBase ||
        candidate.startsWith(`${normalizedBase}.`) ||
        candidate === `${normalizedBase}/index.ts` ||
        candidate === `${normalizedBase}/index.tsx`
    )
    .sort();
  return matches[0] ?? null;
}

export async function buildDependencyTrace(
  selectedFile: CodexForgeFileNode,
  files: CodexForgeFileNode[]
): Promise<CodexForgeFileDependencyTrace> {
  const absolutePath = resolveInsideProject(selectedFile.path);
  const text = absolutePath ? await fs.readFile(absolutePath, "utf8").catch(() => "") : "";
  const imports: string[] = [];
  const exports: string[] = [];

  for (const match of text.matchAll(IMPORT_PATTERN)) imports.push(match[1]);
  for (const match of text.matchAll(EXPORT_PATTERN)) exports.push(match[1]);

  const internalTargets = uniqueSorted(
    imports
      .map((specifier) => resolveImportTarget(selectedFile.path, specifier, files))
      .filter((value): value is string => Boolean(value))
  );
  const dependencies: CodexForgeFileDependency[] = internalTargets.map((target) => ({
    id: `live:${selectedFile.path}->${target}`,
    fromPath: selectedFile.path,
    toPath: target,
    kind: "imports",
    strength: "strong",
    summary: `${selectedFile.name} imports ${target}.`,
  }));

  return {
    filePath: selectedFile.path,
    imports: uniqueSorted(imports),
    exports: uniqueSorted(exports),
    internalTargets,
    dependencies,
    summary:
      dependencies.length > 0
        ? `Resolved ${dependencies.length} deterministic internal import trace(s).`
        : "No internal import trace resolved within the bounded file set.",
  };
}

export function relateFilesDeterministically(
  selectedFile: CodexForgeFileNode,
  files: CodexForgeFileNode[],
  dependencies: CodexForgeFileDependency[]
): CodexForgeFileNode[] {
  const dependencyPaths = new Set(
    dependencies
      .filter((dependency) => dependency.fromPath === selectedFile.path || dependency.toPath === selectedFile.path)
      .flatMap((dependency) => [dependency.fromPath, dependency.toPath])
      .filter((candidate) => candidate !== selectedFile.path)
  );
  const folder = selectedFile.path.split("/").slice(0, -1).join("/");
  const concepts = new Set(selectedFile.concepts);

  return files
    .filter((candidate) => candidate.path !== selectedFile.path)
    .map((candidate) => {
      let score = 0;
      if (dependencyPaths.has(candidate.path)) score += 80;
      if (candidate.path.startsWith(folder)) score += 28;
      if (candidate.ownerArea === selectedFile.ownerArea) score += 20;
      if (candidate.concepts.some((concept) => concepts.has(concept))) score += 16;
      if (candidate.path.includes("/brain/runtime/") && selectedFile.path.includes("/files/")) score += 10;
      if (candidate.path.includes("scripts/smoke-") && selectedFile.path.includes("/files/")) score += 8;
      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.path.localeCompare(b.candidate.path))
    .slice(0, 8)
    .map((item) => item.candidate);
}
