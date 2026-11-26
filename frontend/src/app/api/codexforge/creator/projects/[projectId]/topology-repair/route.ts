import {
  assertCreatorLoopbackRequest,
  creatorErrorResponse,
  creatorJsonResponse,
} from "@/lib/codexforge/creator/creator-http.server";
import { getCreatorRuntimeService } from "@/lib/codexforge/creator/creator-runtime.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ projectId: string }> };

export async function GET(request: Request, context: Context) {
  try {
    assertCreatorLoopbackRequest(request);
    const { projectId } = await context.params;
    const eligibility =
      await getCreatorRuntimeService().getTopologyRepairEligibility(projectId);
    return creatorJsonResponse({ ok: true, eligibility });
  } catch (error) {
    return creatorErrorResponse(error);
  }
}
