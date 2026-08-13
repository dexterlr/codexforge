import {
  assertJarvisChatRequest,
  jarvisChatErrorResponse,
  jarvisChatJsonResponse,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import { getJarvisChatRuntimeService } from "@/lib/codexforge/jarvis-chat/jarvis-chat-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    assertJarvisChatRequest(request);
    const result = await getJarvisChatRuntimeService().getRuntimeStatus();
    return jarvisChatJsonResponse({ ok: true, result });
  } catch (error) {
    return jarvisChatErrorResponse(error);
  }
}
