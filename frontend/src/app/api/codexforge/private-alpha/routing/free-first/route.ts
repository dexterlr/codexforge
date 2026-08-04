import {
  PrivateAlphaFreeFirstRoutingError,
  routePrivateAlphaFreeFirst,
} from "@/lib/codexforge/private-alpha/private-alpha-free-first-routing.server";
import {
  assertPrivateAlphaLoopbackRequest,
  privateAlphaFailureResponse,
  privateAlphaHttpErrorResponse,
  privateAlphaJsonResponse,
  readPrivateAlphaJsonBody,
} from "@/lib/codexforge/private-alpha/private-alpha-http.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    assertPrivateAlphaLoopbackRequest(request, true);
    const body = await readPrivateAlphaJsonBody(request);
    const result = await routePrivateAlphaFreeFirst(body);
    return privateAlphaJsonResponse({ ok: true, result });
  } catch (error) {
    const httpResponse = privateAlphaHttpErrorResponse(error);
    if (httpResponse) return httpResponse;
    if (error instanceof PrivateAlphaFreeFirstRoutingError) {
      return privateAlphaFailureResponse(error.status, error.message);
    }

    return privateAlphaFailureResponse(
      500,
      "Unexpected private-alpha free-first routing server error."
    );
  }
}
