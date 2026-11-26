import { readProjectMemory } from "@/lib/codexforge/brain/learning/project-learning.server";
import { readDevelopmentChatMemory } from "@/lib/codexforge/brain/learning/development-chat.server";
import {
  assertJarvisChatRequest,
  jarvisChatErrorResponse,
  jarvisChatJsonResponse,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    assertJarvisChatRequest(request);
    const query = new URL(request.url).searchParams;
    if (query.size === 1 && query.get("source") === "codex-chat") {
      return jarvisChatJsonResponse({ ok: true, ...await readDevelopmentChatMemory() });
    }
    if (query.size !== 0) {
      return jarvisChatJsonResponse({
        ok: false,
        error: { code: "invalid_request", message: "Unknown Brain memory source." },
      }, 400);
    }
    return jarvisChatJsonResponse({ ok: true, ...await readProjectMemory() });
  } catch (error) {
    return jarvisChatErrorResponse(error);
  }
}
