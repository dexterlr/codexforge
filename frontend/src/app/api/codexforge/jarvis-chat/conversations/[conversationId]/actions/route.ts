import {
  assertJarvisChatRequest,
  assertJarvisChatRevisionPrecondition,
  jarvisChatErrorResponse,
  jarvisChatJsonResponse,
  readJarvisChatJsonBody,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import { getJarvisChatRuntimeService } from "@/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ conversationId: string }> };

export async function POST(request: Request, context: Context) {
  try {
    assertJarvisChatRequest(request, true);
    const body = await readJarvisChatJsonBody(request);
    assertJarvisChatRevisionPrecondition(request, body);
    const { conversationId } = await context.params;
    const result = await getJarvisChatRuntimeService().actOnConversation(
      conversationId,
      body,
      request.headers.get("Idempotency-Key")
    );
    return jarvisChatJsonResponse({ ok: true, result }, result.responseStatus);
  } catch (error) {
    return jarvisChatErrorResponse(error);
  }
}
