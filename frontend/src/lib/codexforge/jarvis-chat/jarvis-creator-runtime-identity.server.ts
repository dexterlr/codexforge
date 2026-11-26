import "server-only";

import { sanitizeCreatorTestSuffix } from "@/lib/codexforge/creator/creator-policy";
import { sanitizeJarvisChatTestSuffix } from "./jarvis-chat-policy";

export function resolveJarvisCreatorRuntimeIdentity(): Readonly<{ key: string; testSuffix: string | null }> {
  const chatMode = process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_MODE === "1";
  const creatorMode = process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_MODE === "1";
  const chatRequested = process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_SUFFIX?.trim() ?? "";
  const creatorRequested = process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX?.trim() ?? "";
  if (!chatMode && !creatorMode && !chatRequested && !creatorRequested) {
    return { key: "production", testSuffix: null };
  }
  if (
    process.env.NODE_ENV === "production" || !chatMode || !creatorMode || !chatRequested || !creatorRequested
  ) {
    throw new Error("Joint Jarvis and Creator reads require both exact test runtimes.");
  }
  const chatSuffix = sanitizeJarvisChatTestSuffix(chatRequested);
  const creatorSuffix = sanitizeCreatorTestSuffix(creatorRequested);
  if (chatSuffix !== creatorSuffix) {
    throw new Error("Jarvis and Creator deterministic test roots do not share one exact suffix.");
  }
  return { key: `test:${chatSuffix}`, testSuffix: chatSuffix };
}
