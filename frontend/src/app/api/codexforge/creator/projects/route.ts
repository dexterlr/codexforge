import {
  assertCreatorLoopbackRequest,
  creatorErrorResponse,
  creatorJsonResponse,
  readCreatorJsonBody,
} from "@/lib/codexforge/creator/creator-http.server";
import { getCreatorRuntimeService } from "@/lib/codexforge/creator/creator-runtime.server";
import { CreatorServiceError } from "@/lib/codexforge/creator/creator-service.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    assertCreatorLoopbackRequest(request);
    const url = new URL(request.url);
    const queryKeys = [...url.searchParams.keys()];
    const limitValues = url.searchParams.getAll("limit");
    const viewValues = url.searchParams.getAll("view");
    if (
      queryKeys.some((key) => key !== "limit" && key !== "view") ||
      limitValues.length > 1 ||
      viewValues.length > 1 ||
      (viewValues.length === 1 && viewValues[0] !== "summaries") ||
      (limitValues.length === 1 &&
        (!/^[1-9]\d{0,2}$/.test(limitValues[0]) ||
          Number(limitValues[0]) > 256))
    ) {
      throw new CreatorServiceError(
        400,
        "invalid_request",
        "Creator collection accepts one limit from 1 through 256 and the optional summaries view."
      );
    }
    const summaries = viewValues[0] === "summaries";
    const limit = limitValues.length === 1
      ? Number(limitValues[0])
      : summaries
        ? 256
        : 20;
    const service = getCreatorRuntimeService();
    const projects = summaries
      ? await service.listProjectSummaries(limit)
      : await service.listProjects(limit);
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
