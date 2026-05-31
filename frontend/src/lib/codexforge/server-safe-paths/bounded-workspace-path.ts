import path from "node:path";
import type { BoundedPathCheck, BoundedWorkspacePathInput } from "./server-safe-paths-types";

function splitPortablePath(value: string): string[] {
  return value.replace(/\\/g, "/").split("/").filter((segment) => segment && segment !== ".");
}

function isAbsoluteInput(value: string): boolean {
  return value.startsWith("/") || value.startsWith("\\") || /^[a-zA-Z]:[\\/]/.test(value);
}

function blocked(reason: string, summary: string[], extra: Partial<BoundedPathCheck> = {}): BoundedPathCheck {
  return {
    safe: false,
    blockedReason: reason,
    summary,
    ...extra,
  };
}

export function toPortableRelativePath(input: string): string {
  return input.replace(/\\/g, "/");
}

export function normalizeSafeRelativePath(input: unknown): BoundedPathCheck {
  if (typeof input !== "string") {
    return blocked("relative-path-not-string", ["Relative path must be a string."]);
  }

  const raw = input.trim();
  if (!raw) {
    return blocked("relative-path-empty", ["Relative path is required."]);
  }

  if (isAbsoluteInput(raw)) {
    return blocked("relative-path-absolute", ["Absolute paths are blocked."]);
  }

  const segments = splitPortablePath(raw);
  if (segments.length === 0) {
    return blocked("relative-path-empty", ["Relative path is required."]);
  }

  if (segments.some((segment) => segment === "..")) {
    return blocked("relative-path-traversal", ["Path traversal is blocked."]);
  }

  const normalizedRelativePath = segments.join("/");
  return {
    safe: true,
    normalizedRelativePath,
    relativeFromRoot: normalizedRelativePath,
    summary: ["Relative path is normalized and bounded."],
  };
}

export function isPathInsideWorkspace(workspaceRoot: string, absolutePath: string): BoundedPathCheck {
  const relativeFromRoot = toPortableRelativePath(path.relative(workspaceRoot, absolutePath));
  if (!relativeFromRoot || relativeFromRoot.startsWith("..") || path.isAbsolute(relativeFromRoot)) {
    return blocked(
      "path-outside-workspace",
      ["Resolved path escaped the bounded workspace."],
      { absolutePath, relativeFromRoot }
    );
  }

  return {
    safe: true,
    absolutePath,
    relativeFromRoot,
    summary: ["Resolved path remains inside the bounded workspace."],
  };
}

export function joinWorkspacePathFromSafeRelative(
  workspaceRoot: string,
  normalizedRelativePath: string
): BoundedPathCheck {
  const normalized = normalizeSafeRelativePath(normalizedRelativePath);
  if (!normalized.safe || !normalized.normalizedRelativePath) {
    return {
      ...normalized,
      summary: ["Bounded path validation failed.", ...normalized.summary],
    };
  }

  const absolutePath = path.join(workspaceRoot, ...normalized.normalizedRelativePath.split("/"));
  const inside = isPathInsideWorkspace(workspaceRoot, absolutePath);
  if (!inside.safe) {
    return {
      ...inside,
      normalizedRelativePath: normalized.normalizedRelativePath,
      summary: ["Bounded target path is outside the safe workspace.", ...inside.summary],
    };
  }

  return {
    safe: true,
    absolutePath,
    normalizedRelativePath: normalized.normalizedRelativePath,
    relativeFromRoot: inside.relativeFromRoot,
    summary: [
      "Bounded workspace path resolved inside the approved workspace.",
      ...normalized.summary,
      ...inside.summary,
    ],
  };
}

export function resolveBoundedWorkspacePath(input: BoundedWorkspacePathInput): BoundedPathCheck {
  const workspaceRootCheck = normalizeSafeRelativePath(input.workspaceRoot);
  if (!workspaceRootCheck.safe || !workspaceRootCheck.normalizedRelativePath) {
    return blocked("workspace-root-invalid", [
      "Workspace root is not a safe relative project path.",
      ...workspaceRootCheck.summary,
    ]);
  }

  const workspaceRoot = path.join(process.cwd(), ...workspaceRootCheck.normalizedRelativePath.split("/"));
  return joinWorkspacePathFromSafeRelative(workspaceRoot, String(input.relativePath ?? ""));
}

export function summarizeBoundedPathCheck(check: BoundedPathCheck): string[] {
  return [
    check.safe ? "Bounded path validation passed." : "Bounded path validation failed.",
    ...(check.blockedReason ? [`Blocked reason: ${check.blockedReason}.`] : []),
    ...check.summary,
  ];
}
