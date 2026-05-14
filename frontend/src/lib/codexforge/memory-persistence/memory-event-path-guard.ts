import type { MemoryEventPathValidation } from "./memory-persistence-types";

export const CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT = ".codexforge/memory-events" as const;
export const CODEXFORGE_MEMORY_EVENT_ALLOWED_EXTENSIONS = [".json", ".event.json"] as const;

const BLOCKED_SOURCE_PREFIXES = [
  "src/",
  "app/",
  "scripts/",
  "docs/",
  "public/",
  "package.json",
  "package-lock.json",
  "next.config",
  "tsconfig",
  ".env",
];

export function normalizeMemoryEventRelativePath(inputPath: string): string | null {
  const raw = String(inputPath ?? "").trim();
  if (!raw || isAbsolutePath(raw) || isMemoryEventPathTraversal(raw)) return null;

  const normalized = raw
    .replace(/\\/g, "/")
    .split("/")
    .filter((segment) => segment && segment !== ".")
    .join("/");

  if (!normalized || isMemoryEventPathTraversal(normalized) || isAbsolutePath(normalized)) return null;
  return normalized;
}

export function validateMemoryEventWorkspacePath(inputPath: string): MemoryEventPathValidation {
  const normalizedPath = normalizeMemoryEventRelativePath(inputPath);
  const normalizedForChecks = String(inputPath ?? "").trim().replace(/\\/g, "/").toLowerCase();
  const traversal = isMemoryEventPathTraversal(inputPath);
  const absolutePath = isAbsolutePath(inputPath);
  const extensionAllowed = normalizedPath
    ? CODEXFORGE_MEMORY_EVENT_ALLOWED_EXTENSIONS.some((extension) => normalizedPath.endsWith(extension))
    : false;
  const sourceMutationAttempt = isSourceMutationAttempt(normalizedForChecks);
  const safe = !!normalizedPath && !traversal && !absolutePath && extensionAllowed && !sourceMutationAttempt;

  return {
    inputPath: String(inputPath ?? ""),
    normalizedPath,
    traversal,
    absolutePath,
    extensionAllowed,
    sourceMutationAttempt,
    safe,
    summary: [
      safe
        ? "Target path is inside .codexforge/memory-events."
        : "Target path is blocked before persistence.",
      extensionAllowed
        ? "Extension is allowed for memory event JSON."
        : "Only .json and .event.json memory event files are allowed.",
      "Path guard blocks absolute paths, traversal, and source mutation attempts.",
    ],
  };
}

export function isMemoryEventPathTraversal(inputPath: string): boolean {
  return String(inputPath ?? "")
    .replace(/\\/g, "/")
    .split("/")
    .some((segment) => segment === "..");
}

export function buildSafeMemoryEventPath(inputPath: string): string | null {
  const validation = validateMemoryEventWorkspacePath(inputPath);
  if (!validation.safe || !validation.normalizedPath) return null;
  return `${CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT}/${validation.normalizedPath}`;
}

function isAbsolutePath(inputPath: string): boolean {
  const raw = String(inputPath ?? "").trim();
  return raw.startsWith("/") || raw.startsWith("\\") || /^[a-zA-Z]:[\\/]/.test(raw);
}

function isSourceMutationAttempt(normalizedPath: string): boolean {
  const withoutWorkspace = normalizedPath.startsWith(`${CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT}/`)
    ? normalizedPath.slice(CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT.length + 1)
    : normalizedPath;

  return BLOCKED_SOURCE_PREFIXES.some((prefix) => withoutWorkspace === prefix || withoutWorkspace.startsWith(prefix));
}
