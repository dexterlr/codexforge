import {
  PrivateAlphaStoreError,
  createPrivateAlphaStore,
} from "@/lib/codexforge/private-alpha/private-alpha-store.server";
import { PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE } from "@/lib/codexforge/private-alpha";
import {
  assertPrivateAlphaLoopbackRequest,
  privateAlphaFailureResponse,
  privateAlphaHttpErrorResponse,
  privateAlphaJsonResponse,
  readPrivateAlphaJsonBody,
} from "@/lib/codexforge/private-alpha/private-alpha-http.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PrivateAlphaRunRouteContext = {
  params: Promise<{
    runId: string;
  }>;
};

const store = createPrivateAlphaStore({
  runtimeProfile: PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
});

function toErrorResponse(error: unknown) {
  const httpResponse = privateAlphaHttpErrorResponse(error);
  if (httpResponse) return httpResponse;
  if (error instanceof PrivateAlphaStoreError) {
    return privateAlphaFailureResponse(error.status, error.message);
  }

  return privateAlphaFailureResponse(500, "Unexpected private-alpha server error.");
}

export async function POST(
  request: Request,
  context: PrivateAlphaRunRouteContext
) {
  try {
    assertPrivateAlphaLoopbackRequest(request, true);
    const body = await readPrivateAlphaJsonBody(request);
    const { runId } = await context.params;
    const run = await store.cancelRun(runId, body);
    return privateAlphaJsonResponse({ ok: true, run });
  } catch (error) {
    return toErrorResponse(error);
  }
}
