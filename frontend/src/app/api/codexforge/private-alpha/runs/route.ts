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
    const url = new URL(request.url);
    const runs = await store.listRuns(url.searchParams.get("limit"));
    return privateAlphaJsonResponse({ ok: true, runs });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    assertPrivateAlphaLoopbackRequest(request, true);
    const body = await readPrivateAlphaJsonBody(request);
    const result = await store.createRun(
      body,
      request.headers.get("Idempotency-Key")
    );

    return privateAlphaJsonResponse(
      {
        ok: true,
        created: result.created,
        run: result.run,
      },
      { status: result.created ? 201 : 200 }
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
