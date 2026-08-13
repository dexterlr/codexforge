import {
  assertJarvisChatRequest,
  jarvisChatErrorResponse,
  jarvisChatJsonResponse,
  readJarvisChatJsonBody,
  readJarvisChatListLimit,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import { getJarvisChatRuntimeService } from "@/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    assertJarvisChatRequest(request);
    const result = await getJarvisChatRuntimeService().listConversations(
      readJarvisChatListLimit(new URL(request.url))
    );
    return jarvisChatJsonResponse({ ok: true, result });
  } catch (error) {
    return jarvisChatErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    assertJarvisChatRequest(request, true);
    const body = await readJarvisChatJsonBody(request);
    const result = await getJarvisChatRuntimeService().createConversation(
      body,
      request.headers.get("Idempotency-Key")
    );
    return jarvisChatJsonResponse({ ok: true, result }, result.responseStatus);
  } catch (error) {
    return jarvisChatErrorResponse(error);
  }
}
