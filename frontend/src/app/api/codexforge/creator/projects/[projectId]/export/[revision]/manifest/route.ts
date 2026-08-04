import {
  assertCreatorLoopbackRequest,
  creatorErrorResponse,
} from "@/lib/codexforge/creator/creator-http.server";
import { serializeCreatorCanonicalJson } from "@/lib/codexforge/creator/creator-crypto";
import { CREATOR_PROJECT_ID_PATTERN } from "@/lib/codexforge/creator/creator-policy";
import { getCreatorRuntimeService } from "@/lib/codexforge/creator/creator-runtime.server";
import { CreatorServiceError } from "@/lib/codexforge/creator/creator-service.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ projectId: string; revision: string }> };

function parseTarget(projectId: string, revision: string): number {
  if (!CREATOR_PROJECT_ID_PATTERN.test(projectId) || !/^[1-9]\d{0,5}$/.test(revision)) {
    throw new CreatorServiceError(404, "not_found", "Creator export manifest was not found.");
  }
  return Number(revision);
}

export async function GET(request: Request, context: Context) {
  try {
    assertCreatorLoopbackRequest(request);
    const { projectId, revision } = await context.params;
    const artifactRevision = parseTarget(projectId, revision);
    const manifest = await getCreatorRuntimeService().readExportManifest(projectId, artifactRevision);
    return new Response(`${serializeCreatorCanonicalJson(manifest)}\n`, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="creator-manifest-r${String(artifactRevision).padStart(6, "0")}.json"`,
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
