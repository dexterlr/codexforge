import "server-only";

import { homedir } from "node:os";
import path from "node:path";
import { openCreatorNativeRoot } from "../../creator/creator-native-filesystem.server";
import { resolveJarvisCreatorRuntimeIdentity } from "../../jarvis-chat/jarvis-creator-runtime-identity.server";
import { CODEXFORGE_PROJECT_ROOT } from "../../server-safe-paths";
import { readCodexHistory } from "./codex-history.server";
import { extractCodexChatMemory, type ProjectMemoryEntry } from "./project-learning";
import { mergeRetainedChatMemory, readAllRetainedChatMemory } from "./retained-chat-memory.server";

export type DevelopmentChatStatus = "unconfigured" | "connected" | "unavailable" | "retained" | "storage-error";
export type ProjectMemoryFeed = { result: ProjectMemoryEntry[]; developmentChatStatus: DevelopmentChatStatus };

export function boundThreadId(): string | null {
  try {
    const root = openCreatorNativeRoot([".codexforge", "brain"], "existing");
    try {
      const binding = JSON.parse(root.readFile(["development-chat.json"], 1024).toString("utf8"));
      if (binding?.version !== 1 || typeof binding.threadId !== "string" ||
          !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/u.test(binding.threadId)) {
        throw new Error("Invalid development chat binding");
      }
      return binding.threadId;
    } finally {
      root.close();
    }
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "not_found") return null;
    throw error;
  }
}

function savedFeed(fallback: "unavailable" | "unconfigured" | "storage-error"): ProjectMemoryFeed {
  try {
    const result = readAllRetainedChatMemory();
    return {
      result,
      developmentChatStatus: result.length && fallback !== "storage-error" ? "retained" : fallback,
    };
  } catch {
    return { result: [], developmentChatStatus: "storage-error" };
  }
}

export async function readDevelopmentChatMemory(): Promise<ProjectMemoryFeed> {
  // Test workspaces must never pick up a user's desktop history.
  if (resolveJarvisCreatorRuntimeIdentity().testSuffix) return { result: [], developmentChatStatus: "unconfigured" };
  let threadId: string | null;
  let entries: ProjectMemoryEntry[];
  try {
    threadId = boundThreadId();
    if (!threadId) return savedFeed("unconfigured");
    const home = process.env.CODEX_HOME || path.join(homedir(), ".codex");
    const messages = readCodexHistory(home, threadId, CODEXFORGE_PROJECT_ROOT);
    if (!messages) return savedFeed("unavailable");
    entries = extractCodexChatMemory(threadId, messages);
  } catch {
    return savedFeed("unavailable");
  }
  try {
    // Publish observations before reporting that they have been learned.
    const current = mergeRetainedChatMemory(threadId, entries);
    const previous = readAllRetainedChatMemory(undefined, threadId);
    return { result: [...current, ...previous], developmentChatStatus: "connected" };
  } catch {
    return savedFeed("storage-error");
  }
}
