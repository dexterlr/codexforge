import "server-only";
import {
  appendCodexForgePathSegment,
  resolveCodexForgeServerBasePath,
  resolveCodexForgeServerPath,
  type CodexForgeResolvedServerPath,
} from "@/lib/codexforge/server-safe-paths";
import type { CodexForgeToolExecutionContext } from "./contracts";
import { asOptionalString, normalizeWindowsPath } from "./shared";

type ResolveToolPathOptions = {
  requestedPath?: string;
  context: CodexForgeToolExecutionContext;
  allowBasePath?: boolean;
  outsideBaseError?: string;
  unsafeRelativeError?: string;
};

function pickToolBasePath(context: CodexForgeToolExecutionContext): string | undefined {
  const repoPath = asOptionalString(context.repoPath);
  const cwd = asOptionalString(context.cwd);
  const workspaceRoot = asOptionalString(context.workspaceRoot);

  return repoPath ?? cwd ?? workspaceRoot;
}

export function resolveCodexForgeToolBasePath(
  context: CodexForgeToolExecutionContext
): string {
  return resolveCodexForgeServerBasePath(pickToolBasePath(context));
}

export function resolveCodexForgeToolPath(
  options: ResolveToolPathOptions
): CodexForgeResolvedServerPath {
  const resolved = resolveCodexForgeServerPath({
    requestedPath: options.requestedPath,
    basePath: resolveCodexForgeToolBasePath(options.context),
    allowBasePath: options.allowBasePath,
    outsideBaseError: options.outsideBaseError,
    unsafeRelativeError: options.unsafeRelativeError,
  });

  return {
    ...resolved,
    relativePath: normalizeWindowsPath(resolved.relativePath),
  };
}

export function appendCodexForgeToolPathSegment(parent: string, segment: string): string {
  return appendCodexForgePathSegment(parent, segment);
}

export function appendCodexForgeToolRelativeSegment(
  parentRelativePath: string,
  segment: string
): string {
  return parentRelativePath
    ? normalizeWindowsPath(`${parentRelativePath}\\${segment}`)
    : normalizeWindowsPath(segment);
}
