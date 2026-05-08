import type { CodexForgeStructuredReply } from "@/lib/codexforge/types";

export function applyRouteVisibleStructuredDefaults(
  structured: CodexForgeStructuredReply,
  mode: CodexForgeStructuredReply["mode"] = "local",
  options?: {
    includeExecution?: boolean;
    includeSnapshot?: boolean;
  }
): CodexForgeStructuredReply {
  const includeExecution = options?.includeExecution !== false;
  const includeSnapshot = options?.includeSnapshot !== false;

  return {
    ...structured,
    mode: structured.mode ?? mode,
    ...(includeExecution
      ? {
          execution: {
            phase: "idle",
            diffCount: 0,
            snapshotFileCount: 0,
            ...(structured.execution ?? {}),
          },
        }
      : {}),
    ...(includeSnapshot
      ? {
          snapshot: structured.snapshot ?? {
            fileCount: 0,
            sampledPaths: [],
          },
        }
      : {}),
  };
}
