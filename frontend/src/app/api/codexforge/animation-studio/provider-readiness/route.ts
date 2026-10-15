import { createStudioProviderReadinessHandler } from "@/lib/codexforge/animation-studio/operator-http.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function handle(request: Request): Promise<Response> {
  return createStudioProviderReadinessHandler({
    enabled: process.env.CODEXFORGE_STUDIO_OPERATOR_ENABLED === "1",
    // Only the server reads configuration, after the existing local request boundary passes.
    // No credential is read on import, startup, disabled/hostile requests, or build.
    lookup: name => process.env[name],
  })(request);
}

// Override Next's automatic HEAD/OPTIONS handling: every non-GET remains a denial.
export { handle as GET, handle as HEAD, handle as OPTIONS, handle as POST, handle as PUT, handle as PATCH, handle as DELETE };
