import {
  assertCreatorLoopbackRequest,
  creatorErrorResponse,
  creatorJsonResponse,
  readCreatorJsonBody,
} from "@/lib/codexforge/creator/creator-http.server";
import { getCreatorRuntimeService } from "@/lib/codexforge/creator/creator-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    assertCreatorLoopbackRequest(request);
    const url = new URL(request.url);
    const limitSource = url.searchParams.get("limit");
    const limit = limitSource && /^\d+$/.test(limitSource) ? Number(limitSource) : 20;
    const projects = await getCreatorRuntimeService().listProjects(limit);
    return creatorJsonResponse({ ok: true, projects });
  } catch (error) {
    return creatorErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    assertCreatorLoopbackRequest(request, true);
    const body = await readCreatorJsonBody(request);
    const result = await getCreatorRuntimeService().createProject(
      body,
      request.headers.get("Idempotency-Key")
    );
    return creatorJsonResponse(
      { ok: true, created: result.created, project: result.project },
      { status: result.created ? 201 : 200 }
    );
  } catch (error) {
    return creatorErrorResponse(error);
  }
}
