import { createStudioEditorialV2MediaHandler } from "@/lib/codexforge/animation-studio/editorial-v2-media-http.server";
import { openStudioOperatorRepository } from "@/lib/codexforge/animation-studio/operator-repository.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET(request: Request): Promise<Response> {
  return createStudioEditorialV2MediaHandler({ enabled: process.env.CODEXFORGE_STUDIO_OPERATOR_ENABLED === "1", openRepository: openStudioOperatorRepository })(request);
}
export const HEAD = GET;
