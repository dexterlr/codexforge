import {
  assertJarvisChatRequest,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import {
  jarvisCreatorHandoffErrorResponse,
  jarvisCreatorHandoffJsonResponse,
  readJarvisCreatorHandoffJsonBody,
} from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-http.server";
import { getJarvisCreatorHandoffRuntimeService } from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-runtime.server";
import { JarvisCreatorHandoffError } from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-policy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ conversationId: string }> };

export async function GET(request: Request, context: Context) {
  try {
    assertJarvisChatRequest(request);
    const url = new URL(request.url);
    const keys = [...url.searchParams.keys()];
    if (keys.some((key) => key !== "limit") || url.searchParams.getAll("limit").length > 1) {
      throw new Error("invalid_query");
    }
    const source = url.searchParams.get("limit");
    const limit = source === null ? 64 : /^\d{1,2}$/u.test(source) ? Number(source) : 0;
    if (limit < 1 || limit > 64) throw new Error("invalid_query");
    const { conversationId } = await context.params;
    const handoffs = await getJarvisCreatorHandoffRuntimeService().listConversation(conversationId, limit);
    return jarvisCreatorHandoffJsonResponse({ ok: true, handoffs });
  } catch (error) {
    if (error instanceof Error && error.message === "invalid_query") {
      return jarvisCreatorHandoffErrorResponse(
        new JarvisCreatorHandoffError(
          400,
          "invalid_request",
          "Creator handoff list query is invalid."
        )
      );
    }
    return jarvisCreatorHandoffErrorResponse(error);
  }
}

export async function POST(request: Request, context: Context) {
  try {
    assertJarvisChatRequest(request, true);
    if ([...new URL(request.url).searchParams.keys()].length !== 0) {
      throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff mutation query is invalid.");
    }
    const body = await readJarvisCreatorHandoffJsonBody(request);
    const expected = typeof body === "object" && body !== null && "expectedConversationRevision" in body
      ? (body as { expectedConversationRevision?: unknown }).expectedConversationRevision
      : null;
    if (!Number.isSafeInteger(expected) || request.headers.get("If-Match")?.trim() !== `"${expected}"`) {
      throw new JarvisCreatorHandoffError(
        409,
        "revision_conflict",
        "Creator handoff requires If-Match for the exact source conversation revision."
      );
    }
    const { conversationId } = await context.params;
    const result = await getJarvisCreatorHandoffRuntimeService().prepare(
      conversationId,
      body,
      request.headers.get("Idempotency-Key")
    );
    return jarvisCreatorHandoffJsonResponse({ ok: true, result }, result.replayed ? 200 : 201);
  } catch (error) {
    return jarvisCreatorHandoffErrorResponse(error);
  }
}
