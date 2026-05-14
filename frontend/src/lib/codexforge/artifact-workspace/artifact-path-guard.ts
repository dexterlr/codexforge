import {
  CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS,
  CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
  type ArtifactWorkspacePathValidation,
} from "./artifact-workspace-types";

const BLOCKED_SOURCE_SEGMENTS = [
  "src",
  "app",
  "scripts",
  "docs",
  "config",
  ".config",
];

const BLOCKED_PROJECT_FILES = [
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "next.config.js",
  "next.config.mjs",
  "next.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
];

export function normalizeArtifactRelativePath(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().replace(/\\/g, "/");
  if (!trimmed) return null;
  const collapsed = trimmed
    .split("/")
    .filter((part) => part.length > 0 && part !== ".")
    .join("/");
  return collapsed.length > 0 ? collapsed : null;
}

export function isArtifactPathTraversal(input: unknown): boolean {
  if (typeof input !== "string") return true;
  return input.replace(/\\/g, "/").split("/").some((part) => part === "..");
}

export function isArtifactExtensionAllowed(input: unknown): boolean {
  const normalized = normalizeArtifactRelativePath(input);
  if (!normalized) return false;
  const lower = normalized.toLowerCase();
  return CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS.some((extension) =>
    lower.endsWith(extension)
  );
}

export function isArtifactSourceMutationPath(input: unknown): boolean {
  const normalized = normalizeArtifactRelativePath(input);
  if (!normalized) return true;
  const lower = normalized.toLowerCase();
  const segments = lower.split("/");
  return (
    BLOCKED_SOURCE_SEGMENTS.includes(segments[0] ?? "") ||
    BLOCKED_PROJECT_FILES.includes(segments[0] ?? "") ||
    segments.some((segment) => BLOCKED_PROJECT_FILES.includes(segment))
  );
}

export function validateArtifactWorkspacePath(input: unknown): ArtifactWorkspacePathValidation {
  const raw = typeof input === "string" ? input : "";
  const normalizedPath = normalizeArtifactRelativePath(raw);
  const absolutePath = /^[a-zA-Z]:[\\/]/.test(raw) || raw.startsWith("/") || raw.startsWith("\\");
  const traversal = isArtifactPathTraversal(raw);
  const extensionAllowed = isArtifactExtensionAllowed(raw);
  const sourceMutationAttempt = isArtifactSourceMutationPath(raw);

  const allowed =
    !!normalizedPath &&
    !absolutePath &&
    !traversal &&
    extensionAllowed &&
    !sourceMutationAttempt;

  return {
    inputPath: raw,
    normalizedPath,
    workspaceRoot: CODEXFORGE_ARTIFACT_WORKSPACE_ROOT,
    allowed,
    extensionAllowed,
    traversal,
    absolutePath,
    sourceMutationAttempt,
    reason: allowed
      ? `Safe artifact path under ${CODEXFORGE_ARTIFACT_WORKSPACE_ROOT}.`
      : "Artifact path blocked by workspace guard.",
  };
}

export function buildSafeArtifactPath(input: unknown): string | null {
  const validation = validateArtifactWorkspacePath(input);
  if (!validation.allowed || !validation.normalizedPath) return null;
  return `${CODEXFORGE_ARTIFACT_WORKSPACE_ROOT}/${validation.normalizedPath}`;
}

export function listArtifactWorkspaceBlockedSegments(): string[] {
  return [...BLOCKED_SOURCE_SEGMENTS, ...BLOCKED_PROJECT_FILES];
}
