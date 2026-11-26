import "server-only";

import { homedir } from "node:os";
import path from "node:path";
import { openCreatorNativeRoot } from "../../creator/creator-native-filesystem.server";
import { resolveJarvisCreatorRuntimeIdentity } from "../../jarvis-chat/jarvis-creator-runtime-identity.server";
import { CODEXFORGE_PROJECT_ROOT } from "../../server-safe-paths";
import { readCodexHistory } from "./codex-history.server";
import { extractCodexChatMemory, type ProjectMemoryEntry } from "./project-learning";

export type DevelopmentChatStatus = "unconfigured" | "connected" | "unavailable";
export type ProjectMemoryFeed = { result: ProjectMemoryEntry[]; developmentChatStatus: DevelopmentChatStatus };

function boundThreadId(): string | null {
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

export async function readDevelopmentChatMemory(): Promise<ProjectMemoryFeed> {
  // Test workspaces must never pick up a user's desktop history.
  if (resolveJarvisCreatorRuntimeIdentity().testSuffix) return { result: [], developmentChatStatus: "unconfigured" };
  try {
    const threadId = boundThreadId();
    if (!threadId) return { result: [], developmentChatStatus: "unconfigured" };
    const home = process.env.CODEX_HOME || path.join(homedir(), ".codex");
    const messages = await readCodexHistory(home, threadId, CODEXFORGE_PROJECT_ROOT);
    return { result: extractCodexChatMemory(threadId, messages), developmentChatStatus: "connected" };
  } catch {
    // A locked or incompatible Codex installation leaves the other Brain sources available.
    return { result: [], developmentChatStatus: "unavailable" };
  }
}
