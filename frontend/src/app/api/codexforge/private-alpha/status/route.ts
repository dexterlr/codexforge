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
} from "@/lib/codexforge/private-alpha/private-alpha-http.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function GET(request: Request) {
  try {
    assertPrivateAlphaLoopbackRequest(request);
    const status = await store.getStatus();
    return privateAlphaJsonResponse({ ok: true, ...status });
  } catch (error) {
    return toErrorResponse(error);
  }
}
