import {
  assertCreatorLoopbackRequest,
  creatorErrorResponse,
} from "@/lib/codexforge/creator/creator-http.server";
import { buildCreatorResponseContentType } from "@/lib/codexforge/creator/creator-materialization.server";
import { assertCreatorRouteFilePath } from "@/lib/codexforge/creator/creator-path-policy";
import {
  CREATOR_PREVIEW_ID_PATTERN,
  CREATOR_PROJECT_ID_PATTERN,
} from "@/lib/codexforge/creator/creator-policy";
import { getCreatorRuntimeService } from "@/lib/codexforge/creator/creator-runtime.server";
import { CreatorServiceError } from "@/lib/codexforge/creator/creator-service.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{
    projectId: string;
    previewId: string;
    revision: string;
    filePath: string[];
  }>;
};

function parseRevision(value: string): number {
  if (!/^[1-9]\d{0,5}$/.test(value)) {
    throw new CreatorServiceError(404, "not_found", "Creator preview revision was not found.");
  }
  return Number(value);
}

function previewCsp(resourcePrefix: string, html: boolean): string {
  const localSources = html
    ? `img-src ${resourcePrefix}; style-src ${resourcePrefix}; script-src ${resourcePrefix};`
    : "img-src 'none'; style-src 'none'; script-src 'none';";
  return [
    "default-src 'none'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-src 'none'",
    "child-src 'none'",
    "connect-src 'none'",
    "font-src 'none'",
    "media-src 'none'",
    "manifest-src 'none'",
    "worker-src 'none'",
    "form-action 'none'",
    "frame-ancestors 'self'",
    localSources,
    "sandbox allow-scripts",
  ].join("; ");
}

export async function GET(request: Request, context: Context) {
  try {
    const externalAuthority = assertCreatorLoopbackRequest(request);
    const { projectId, previewId, revision, filePath } = await context.params;
    if (
      !CREATOR_PROJECT_ID_PATTERN.test(projectId) ||
      !CREATOR_PREVIEW_ID_PATTERN.test(previewId) ||
      !Array.isArray(filePath) ||
      filePath.length < 1
    ) {
      throw new CreatorServiceError(404, "not_found", "Creator preview target was not found.");
    }
    const joinedPath = filePath.join("/");
    try {
      assertCreatorRouteFilePath(joinedPath);
    } catch {
      throw new CreatorServiceError(404, "not_found", "Creator preview file was not found.");
    }
    const artifactRevision = parseRevision(revision);
    const result = await getCreatorRuntimeService().readActivePreviewFile({
      projectId,
      previewId,
      artifactRevision,
      filePath: joinedPath,
    });
    const resourcePrefix = new URL(
      `/api/codexforge/creator/preview/${projectId}/${previewId}/${artifactRevision}/`,
      externalAuthority
    ).href;
    const isHtml = result.mediaType === "text/html";
    return new Response(new Uint8Array(result.bytes), {
      status: 200,
      headers: {
        "Content-Type": buildCreatorResponseContentType(result.mediaType),
        "Content-Security-Policy": previewCsp(resourcePrefix, isHtml),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, max-age=0",
        "Referrer-Policy": "no-referrer",
        "X-DNS-Prefetch-Control": "off",
        "X-Frame-Options": "SAMEORIGIN",
        "Permissions-Policy": "accelerometer=(), ambient-light-sensor=(), autoplay=(), bluetooth=(), browsing-topics=(), camera=(), clipboard-read=(), clipboard-write=(), display-capture=(), encrypted-media=(), fullscreen=(), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), local-fonts=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), serial=(), speaker-selection=(), storage-access=(), usb=(), web-share=(), window-management=()",
      },
    });
  } catch (error) {
    return creatorErrorResponse(error);
  }
}
