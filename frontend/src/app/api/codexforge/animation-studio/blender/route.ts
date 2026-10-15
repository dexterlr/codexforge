import { createStudioBlenderHandler } from "@/lib/codexforge/animation-studio/blender-http.server";
import { executeStudioBlender, inspectStudioBlender } from "@/lib/codexforge/animation-studio/blender-service.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const handle = (request: Request) => createStudioBlenderHandler({enabled:process.env.CODEXFORGE_STUDIO_OPERATOR_ENABLED==="1",inspect:inspectStudioBlender,execute:executeStudioBlender})(request);
export const GET = handle;
export const POST = handle;
