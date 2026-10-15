import { createStudioFootageHandler } from "@/lib/codexforge/animation-studio/footage-http.server";
import { openStudioOperatorRepository } from "@/lib/codexforge/animation-studio/operator-repository.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function handle(request: Request): Promise<Response> {
  return createStudioFootageHandler({
    enabled: process.env.CODEXFORGE_STUDIO_OPERATOR_ENABLED === "1",
    openRepository: openStudioOperatorRepository,
  })(request);
}
export const GET = handle;
export const HEAD = handle;
export const POST = handle;
