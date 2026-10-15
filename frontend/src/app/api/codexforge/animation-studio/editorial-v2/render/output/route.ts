import { createStudioEditorialV2RenderOutputHandler } from "@/lib/codexforge/animation-studio/editorial-v2-render-output-http.server";
import { type StudioRenderHttpRepository } from "@/lib/codexforge/animation-studio/editorial-v2-render-http.server";
import { openStudioOperatorRepository } from "@/lib/codexforge/animation-studio/operator-repository.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function handle(request: Request): Promise<Response> {
  return createStudioEditorialV2RenderOutputHandler({ enabled: process.env.CODEXFORGE_STUDIO_OPERATOR_ENABLED === "1", openRepository: openStudioOperatorRepository as () => StudioRenderHttpRepository })(request);
}

export const GET = handle;
export const HEAD = handle;
