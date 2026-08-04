import path from "node:path";
import {
  assertCreatorLoopbackRequest,
  creatorErrorResponse,
} from "@/lib/codexforge/creator/creator-http.server";
import { buildCreatorResponseContentType } from "@/lib/codexforge/creator/creator-materialization.server";
import { assertCreatorRouteFilePath } from "@/lib/codexforge/creator/creator-path-policy";
import { CREATOR_PROJECT_ID_PATTERN } from "@/lib/codexforge/creator/creator-policy";
import { getCreatorRuntimeService } from "@/lib/codexforge/creator/creator-runtime.server";
import { CreatorServiceError } from "@/lib/codexforge/creator/creator-service.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ projectId: string; revision: string; filePath: string[] }>;
};

export async function GET(request: Request, context: Context) {
  try {
    assertCreatorLoopbackRequest(request);
    const { projectId, revision, filePath } = await context.params;
    if (
      !CREATOR_PROJECT_ID_PATTERN.test(projectId) ||
      !/^[1-9]\d{0,5}$/.test(revision) ||
      !Array.isArray(filePath) ||
      filePath.length < 1
    ) {
      throw new CreatorServiceError(404, "not_found", "Creator export file was not found.");
    }
    const joinedPath = filePath.join("/");
    try {
      assertCreatorRouteFilePath(joinedPath);
    } catch {
      throw new CreatorServiceError(404, "not_found", "Creator export file was not found.");
    }
    const result = await getCreatorRuntimeService().readExportFile({
      projectId,
      artifactRevision: Number(revision),
      filePath: joinedPath,
    });
    const fileName = path.posix.basename(joinedPath);
    return new Response(new Uint8Array(result.bytes), {
      status: 200,
      headers: {
        "Content-Type": buildCreatorResponseContentType(result.mediaType),
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, max-age=0",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    return creatorErrorResponse(error);
  }
}
