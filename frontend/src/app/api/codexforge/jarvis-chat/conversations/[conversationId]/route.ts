import {
  assertJarvisChatRequest,
  jarvisChatErrorResponse,
  jarvisChatJsonResponse,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import { getJarvisChatRuntimeService } from "@/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ conversationId: string }> };

export async function GET(request: Request, context: Context) {
  try {
    assertJarvisChatRequest(request);
    const { conversationId } = await context.params;
    const result = await getJarvisChatRuntimeService().getConversation(conversationId);
    return jarvisChatJsonResponse({ ok: true, result });
  } catch (error) {
    return jarvisChatErrorResponse(error);
  }
}
