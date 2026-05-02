import type {
  CodexForgeChatContext,
  CodexForgePlanDomain,
} from "@/lib/codexforge/types";

/* ================= CONFIG ================= */

const DEFAULT_PROJECT_NAME = "CodexForge";
const DEFAULT_WORKSPACE_ROOT = "C:\\ai-lab\\projects\\openclaw-workspace";

/**
 * Default repo path for CodexForge context.
 *
 * Intentionally blank by default so we do not silently reintroduce
 * an outdated repo identity. Prefer NEXT_PUBLIC_CODEXFORGE_REPO_PATH.
 */
const DEFAULT_REPO_PATH = "";

const DEFAULT_MODE: CodexForgeChatContext["mode"] = "local";

const CODEXFORGE_CAPABILITY_DOMAINS: CodexForgePlanDomain[] = [
  "web",
  "research",
  "debug",
  "game-server",
  "movie",
  "video",
  "comfyui",
  "unreal",
  "automation",
];

/* ================= HELPERS ================= */

function readEnvString(value: string | undefined): string | undefined {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeWindowsPath(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  return trimmed
    .replaceAll("/", "\\")
    .replace(/\\+/g, "\\")
    .replace(/\\$/, "");
}

function resolveNormalizedPath(
  envValue: string | undefined,
  fallback: string
): string {
  const candidate = readEnvString(envValue);
  const normalized = normalizeWindowsPath(candidate ?? fallback);

  return normalized || normalizeWindowsPath(fallback);
}

function resolveWorkspaceRoot(): string {
  return resolveNormalizedPath(
    process.env.NEXT_PUBLIC_CODEXFORGE_WORKSPACE_ROOT,
    DEFAULT_WORKSPACE_ROOT
  );
}

function resolveRepoPath(): string | undefined {
  const envRepo =
    readEnvString(process.env.NEXT_PUBLIC_CODEXFORGE_REPO_PATH) ??
    readEnvString(DEFAULT_REPO_PATH);

  if (!envRepo) return undefined;

  const normalized = normalizeWindowsPath(envRepo);
  return normalized || undefined;
}

function resolveProjectName(): string {
  return (
    readEnvString(process.env.NEXT_PUBLIC_CODEXFORGE_PROJECT_NAME) ??
    DEFAULT_PROJECT_NAME
  );
}

function buildSystemGuide(
  systemGuide: string,
  workspaceRoot: string,
  repoPath?: string
): string {
  const trimmedGuide = systemGuide.trim();

  const contextLines = [
    "Product identity: CodexForge is the real product.",
    `Workspace root: ${workspaceRoot}`,
    repoPath
      ? `Grounded repo path: ${repoPath}`
      : "Grounded repo path: not explicitly configured.",
    "Use the current repository context and workspace state as the source of implementation truth.",
    "Do not refer to legacy product names or old harness identities.",
    "When discussing implementation, stay grounded in the active repository context.",
    "When discussing direction, treat CodexForge as the single product identity.",
  ];

  if (!trimmedGuide) {
    return contextLines.join("\n");
  }

  return [trimmedGuide, "", ...contextLines].join("\n");
}

/* ================= PUBLIC ================= */

/**
 * Default client-side context for CodexForge.
 *
 * Rules:
 * - CodexForge is the only product identity
 * - workspaceRoot should remain stable across repos in the workspace
 * - repoPath should point at the repo currently being worked in when configured
 * - environment overrides should be enough to retarget without code edits
 * - context should stay grounded without reintroducing legacy naming
 */
export function getDefaultCodexForgeClientContext(
  systemGuide: string
): CodexForgeChatContext {
  const workspaceRoot = resolveWorkspaceRoot();
  const repoPath = resolveRepoPath();
  const projectName = resolveProjectName();

  return {
    projectName,
    workspaceRoot,
    ...(repoPath ? { repoPath } : {}),
    mode: DEFAULT_MODE,
    systemGuide: buildSystemGuide(systemGuide, workspaceRoot, repoPath),
    codexforgeCapabilities: {
      domains: [...CODEXFORGE_CAPABILITY_DOMAINS],
    },
  };
}