import "server-only";
import path from "node:path";
import {
  CODEXFORGE_PROJECT_ROOT,
  normalizeSafeRelativePath,
  toPortableRelativePath,
} from "./bounded-workspace-path";

export { CODEXFORGE_PROJECT_ROOT };

export type CodexForgeResolvedServerPath = {
  requestedPath: string;
  basePath: string;
  absolutePath: string;
  relativePath: string;
};

type ResolveServerPathOptions = {
  requestedPath?: string;
  basePath?: string;
  allowBasePath?: boolean;
  outsideBaseError?: string;
  unsafeRelativeError?: string;
};

function normalizeAbsolutePath(value: string): string {
  const normalized = path.normalize(value.trim().replaceAll("/", path.sep));
  const parsed = path.parse(normalized);
  if (normalized === parsed.root) return normalized;
  return normalized.replace(/[\\/]+$/, "");
}

function appendSafePathSegment(parent: string, segment: string): string {
  return parent.endsWith(path.sep) ? `${parent}${segment}` : `${parent}${path.sep}${segment}`;
}

export function appendCodexForgePathSegment(parent: string, segment: string): string {
  return appendSafePathSegment(parent, segment);
}

export function joinCodexForgeSafeRelativePath(
  root: string,
  normalizedRelativePath: string
): string {
  const safe = normalizeSafeRelativePath(normalizedRelativePath);
  if (!safe.safe || !safe.normalizedRelativePath) {
    throw new Error("Requested path contains unsafe traversal.");
  }

  return safe.normalizedRelativePath
    .split("/")
    .filter(Boolean)
    .reduce((current, segment) => appendSafePathSegment(current, segment), normalizeAbsolutePath(root));
}

export function isAbsolutePathInsideBase(
  absolutePath: string,
  basePath: string,
  allowBasePath = true
): boolean {
  const normalizedAbsolute = normalizeAbsolutePath(absolutePath);
  const normalizedBase = normalizeAbsolutePath(basePath);
  const relative = toPortableRelativePath(path.relative(normalizedBase, normalizedAbsolute));

  if (!relative) return allowBasePath;
  return relative !== ".." && !relative.startsWith("../") && !path.isAbsolute(relative);
}

export function toPortableProjectRelativePath(
  absolutePath: string,
  basePath = CODEXFORGE_PROJECT_ROOT
): string {
  return toPortableRelativePath(path.relative(basePath, absolutePath));
}

export function resolveCodexForgeServerBasePath(candidate?: string): string {
  const raw = candidate?.trim();
  if (!raw || raw === ".") return CODEXFORGE_PROJECT_ROOT;

  const cleaned = raw.replaceAll("/", path.sep);
  let absolutePath: string;
  try {
    absolutePath = path.isAbsolute(cleaned)
      ? normalizeAbsolutePath(cleaned)
      : joinCodexForgeSafeRelativePath(CODEXFORGE_PROJECT_ROOT, raw);
  } catch {
    return CODEXFORGE_PROJECT_ROOT;
  }

  return isAbsolutePathInsideBase(absolutePath, CODEXFORGE_PROJECT_ROOT, true)
    ? absolutePath
    : CODEXFORGE_PROJECT_ROOT;
}

export function resolveCodexForgeServerPath(
  options: ResolveServerPathOptions
): CodexForgeResolvedServerPath {
  const basePath = resolveCodexForgeServerBasePath(options.basePath);
  const requestedPath = options.requestedPath?.trim() ?? "";
  const allowBasePath = options.allowBasePath !== false;

  let absolutePath = basePath;
  if (requestedPath && requestedPath !== ".") {
    const cleaned = requestedPath.replaceAll("/", path.sep);
    if (path.isAbsolute(cleaned)) {
      absolutePath = normalizeAbsolutePath(cleaned);
    } else {
      try {
        absolutePath = joinCodexForgeSafeRelativePath(basePath, requestedPath);
      } catch {
        throw new Error(options.unsafeRelativeError ?? "Requested path contains unsafe traversal.");
      }
    }
  }

  if (!isAbsolutePathInsideBase(absolutePath, basePath, allowBasePath)) {
    throw new Error(options.outsideBaseError ?? "Requested path is outside the allowed workspace scope.");
  }

  return {
    requestedPath,
    basePath,
    absolutePath,
    relativePath: toPortableProjectRelativePath(absolutePath, basePath),
  };
}

export function resolveCodexForgeProjectPath(
  requestedPath?: string,
  options: Omit<ResolveServerPathOptions, "requestedPath" | "basePath"> = {}
): CodexForgeResolvedServerPath {
  return resolveCodexForgeServerPath({
    requestedPath,
    basePath: CODEXFORGE_PROJECT_ROOT,
    ...options,
  });
}
