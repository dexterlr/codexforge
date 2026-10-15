import { RealHiggsfieldEstimateTransport } from "@/lib/codexforge/animation-studio/higgsfield-estimate-transport.server";
import { createStudioOperatorHandler } from "@/lib/codexforge/animation-studio/operator-http.server";
import { openStudioOperatorRepository } from "@/lib/codexforge/animation-studio/operator-repository.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function handle(request: Request): Promise<Response> {
  return createStudioOperatorHandler({
    enabled: process.env.CODEXFORGE_STUDIO_OPERATOR_ENABLED === "1",
    // Construction does not inspect credentials. Only previously persisted exact authority can dispatch.
    liveEstimate: { transport: new RealHiggsfieldEstimateTransport(), now: () => new Date().toISOString() },
    openRepository: openStudioOperatorRepository,
  })(request);
}

export const GET = handle;
export const POST = handle;
