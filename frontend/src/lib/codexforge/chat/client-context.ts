import type { CodexForgeChatContext } from "@/lib/codexforge/types";

/* ================= CONFIG ================= */

const DEFAULT_PROJECT_NAME = "CodexForge";
const DEFAULT_WORKSPACE_ROOT = "C:\\ai-lab\\projects\\openclaw-workspace";

/**
 * Current active frontend repo for this project flow.
 *
 * CodexForge is the product direction, but Health Tracker is currently the
 * active working frontend/test harness. This default must reflect the repo
 * that is actually being run so chat context and brain graph state stay honest.
 */
const DEFAULT_REPO_PATH =
  "C:\\ai-lab\\projects\\openclaw-workspace\\repos\\health-tracker\\frontend";

const DEFAULT_MODE = "local" as const;

const CODEXFORGE_CAPABILITY_DOMAINS = [
  "web",
  "research",
  "debug",
  "game-server",
  "movie",
  "video",
  "comfyui",
  "unreal",
  "automation",
] as const;

/* ================= HELPERS ================= */

function normalizeWindowsPath(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  return trimmed
    .replaceAll("/", "\\")
    .replace(/\\+/g, "\\")
    .replace(/\\$/, "");
}

function readEnvString(value: string | undefined): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function resolveWorkspaceRoot(): string {
  return normalizeWindowsPath(
    readEnvString(process.env.NEXT_PUBLIC_CODEXFORGE_WORKSPACE_ROOT) ??
      DEFAULT_WORKSPACE_ROOT
  );
}

function resolveRepoPath(): string {
  return normalizeWindowsPath(
    readEnvString(process.env.NEXT_PUBLIC_CODEXFORGE_REPO_PATH) ??
      DEFAULT_REPO_PATH
  );
}

function resolveProjectName(): string {
  return (
    readEnvString(process.env.NEXT_PUBLIC_CODEXFORGE_PROJECT_NAME) ??
    DEFAULT_PROJECT_NAME
  );
}

/* ================= PUBLIC ================= */

/**
 * Default client-side context for CodexForge.
 *
 * Rules:
 * - CodexForge is the real product
 * - workspaceRoot should stay stable across projects
 * - repoPath must point at the currently active frontend repo
 * - env overrides are supported so paths can switch without code edits
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
    repoPath,
    mode: DEFAULT_MODE,
    systemGuide,
    codexforgeCapabilities: {
      domains: [...CODEXFORGE_CAPABILITY_DOMAINS],
    },
  };
}