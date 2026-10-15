import { createStudioEditorialHandler } from "@/lib/codexforge/animation-studio/editorial-http.server";
import { openStudioOperatorRepository } from "@/lib/codexforge/animation-studio/operator-repository.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET(request: Request): Promise<Response> {
  return createStudioEditorialHandler({ enabled: process.env.CODEXFORGE_STUDIO_OPERATOR_ENABLED === "1", openRepository: openStudioOperatorRepository, media: true })(request);
}
