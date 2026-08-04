import {
  assertCreatorLoopbackRequest,
  creatorErrorResponse,
  creatorJsonResponse,
  readCreatorJsonBody,
  readCreatorRevisionPrecondition,
} from "@/lib/codexforge/creator/creator-http.server";
import { getCreatorRuntimeService } from "@/lib/codexforge/creator/creator-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ projectId: string }> };

export async function POST(request: Request, context: Context) {
  try {
    assertCreatorLoopbackRequest(request, true);
    const body = await readCreatorJsonBody(request);
    readCreatorRevisionPrecondition(request, body);
    const { projectId } = await context.params;
    const result = await getCreatorRuntimeService().actOnProject(
      projectId,
      body,
      request.headers.get("Idempotency-Key")
    );
    return creatorJsonResponse({ ok: true, replayed: result.replayed, project: result.project });
  } catch (error) {
    return creatorErrorResponse(error);
  }
}
