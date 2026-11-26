import { assertJarvisChatRequest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-http.server";
import {
  jarvisCreatorHandoffErrorResponse,
  jarvisCreatorHandoffJsonResponse,
  readJarvisCreatorHandoffJsonBody,
} from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-http.server";
import { JarvisCreatorHandoffError } from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-policy";
import { getJarvisCreatorHandoffRuntimeService } from "@/lib/codexforge/jarvis-creator-handoff/jarvis-creator-handoff-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ conversationId: string; handoffId: string }>;
};

export async function GET(request: Request, context: Context) {
  try {
    assertJarvisChatRequest(request);
    const url = new URL(request.url);
    if ([...url.searchParams.keys()].length !== 0) {
      throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff lookup query is invalid.");
    }
    const { conversationId, handoffId } = await context.params;
    const handoff = await getJarvisCreatorHandoffRuntimeService().getSummary(
      conversationId,
      handoffId
    );
    return jarvisCreatorHandoffJsonResponse({ ok: true, handoff });
  } catch (error) {
    return jarvisCreatorHandoffErrorResponse(error);
  }
}

export async function POST(request: Request, context: Context) {
  try {
    assertJarvisChatRequest(request, true);
    if ([...new URL(request.url).searchParams.keys()].length !== 0) {
      throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff recovery query is invalid.");
    }
    const body = await readJarvisCreatorHandoffJsonBody(request);
    const record = typeof body === "object" && body !== null
      ? body as Record<string, unknown>
      : null;
    const expected = record?.expectedHandoffRecordDigest;
    if (
      typeof expected !== "string" ||
      !/^[a-f0-9]{64}$/u.test(expected) ||
      request.headers.get("If-Match")?.trim() !== `"${expected}"`
    ) {
      throw new JarvisCreatorHandoffError(
        409,
        "handoff_revision_conflict",
        "Creator handoff recovery requires If-Match for the exact handoff record digest."
      );
    }
    const { conversationId, handoffId } = await context.params;
    const service = getJarvisCreatorHandoffRuntimeService();
    if (record?.action === "review") {
      if (request.headers.has("Idempotency-Key")) {
        throw new JarvisCreatorHandoffError(400, "invalid_request", "Reviewed-request disclosure does not accept an idempotency key.");
      }
      const review = await service.review(conversationId, handoffId, body);
      return jarvisCreatorHandoffJsonResponse({ ok: true, review });
    }
    if (record?.action !== "resume") {
      throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff recovery action is invalid.");
    }
    const result = await service.resume(
      conversationId,
      handoffId,
      body,
      request.headers.get("Idempotency-Key")
    );
    return jarvisCreatorHandoffJsonResponse({ ok: true, result }, result.replayed ? 200 : 201);
  } catch (error) {
    return jarvisCreatorHandoffErrorResponse(error);
  }
}
