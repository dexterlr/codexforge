import "server-only";
import type { StudioId } from "./domain";
import type { StudioRepository } from "./store.server";
import { assertStudioId } from "./workspace";
import { EditorialV2StoreError } from "./editorial-v2-store.server";
import { assertStudioEditorialV2MediaRequest, assertStudioEditorialV2NativeMediaRequest, OperatorHttpError, STUDIO_OPERATOR_HEADER, STUDIO_OPERATOR_HEADER_VALUE, studioOperatorFailureResponse } from "./operator-http.server";
import { createStudioBoundedMediaResponse } from "./footage-stream-response.server";

const HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; sandbox" };
const reply = (code: string, message: string, status: number) => Response.json({ ok: false, error: { code, message } }, { status, headers: HEADERS });
function invalid(): never { throw new OperatorHttpError(400, "invalid_editorial_v2_media_request", "Select one exact saved composition, head and direct media version."); }
function identity<K extends "project" | "asset">(value: unknown, kind: K): StudioId<K> { try { assertStudioId(value, kind); } catch { return invalid(); } return value as StudioId<K>; }
function failure(error: unknown, admitted: boolean): Response {
  if (!admitted && error instanceof OperatorHttpError) return studioOperatorFailureResponse(error);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_INVALID") return reply("invalid_editorial_v2_media_request", "The media is not a direct source of this selected saved composition.", 400);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_CONFLICT") return reply("editorial_v2_revision_conflict", "The working copy changed. Reload the selected composition before requesting preview media.", 409);
  if ((error as { code?: unknown } | null)?.code === "UNSUPPORTED_EDITORIAL_MEDIA") return reply("unsupported_editorial_media", "Preview supports direct local MP4 and registered PNG/JPEG sources only. Nested compositions and conversion are not supported.", 415);
  return reply("editorial_v2_media_unavailable", "Preview media or its source binding could not be verified. No automatic retry occurs.", 503);
}

/** Explicit immutable range read. No mutation, generation, redirect or fallback. */
export function createStudioEditorialV2MediaHandler(options: { enabled: boolean; openRepository: () => StudioRepository; listenerAddresses?: () => readonly string[] | null }): (request: Request) => Promise<Response> {
  return async request => {
    let repository: StudioRepository | undefined, result: Response | undefined, admitted = false;
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "studio_disabled", "Enable the isolated local Studio before requesting media.");
      if (request.method !== "GET" && request.method !== "HEAD") throw new OperatorHttpError(405, "method_not_allowed", "Only explicit local preview reads are supported.");
      const nativeMedia = request.headers.get(STUDIO_OPERATOR_HEADER) !== STUDIO_OPERATOR_HEADER_VALUE;
      const url = nativeMedia ? assertStudioEditorialV2NativeMediaRequest(request, options.listenerAddresses?.()) : assertStudioEditorialV2MediaRequest(request, options.listenerAddresses?.());
      if (request.signal.aborted || request.body !== null || request.headers.has("Transfer-Encoding") || request.headers.has("Content-Encoding") || (request.headers.has("Content-Length") && request.headers.get("Content-Length") !== "0")) invalid();
      const keys = ["projectId", "compositionId", "headDigest", "assetId", "version"];
      if ([...url.searchParams.keys()].length !== keys.length || !keys.every(key => url.searchParams.getAll(key).length === 1)) invalid();
      const projectId = identity(url.searchParams.get("projectId"), "project"), assetId = identity(url.searchParams.get("assetId"), "asset");
      const compositionId = url.searchParams.get("compositionId")!, headDigest = url.searchParams.get("headDigest")!, version = url.searchParams.get("version")!;
      if (compositionId.length > 128 || !/^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(compositionId) || !/^[a-f0-9]{64}$/u.test(headDigest) || !/^[1-9]\d{0,15}$/u.test(version) || !Number.isSafeInteger(Number(version))) invalid();
      admitted = true; repository = options.openRepository();
      const media = repository.openEditorialV2Media(projectId, compositionId, headDigest, assetId, Number(version));
      if (request.signal.aborted) throw new Error("Preview request interrupted.");
      const owner = repository;
      result = createStudioBoundedMediaResponse({
        method: request.method,
        rangeHeader: request.headers.get("Range"),
        reader: media.reader,
        contentType: media.contentType,
        headers: {
          "X-CodexForge-Project-Id": media.projectId, "X-CodexForge-Composition-Id": media.compositionId,
          "X-CodexForge-Editorial-Head": media.headDigest, "X-CodexForge-Asset-Id": media.assetId,
          "X-CodexForge-Asset-Version": String(media.version),
        },
        close: () => owner.close(),
      });
      repository = undefined;
    } catch (error) { result = failure(error, admitted); }
    finally { if (repository) { try { repository.close(); } catch { if (!result || result.status < 400) result = failure(null, true); } } }
    return result ?? failure(null, true);
  };
}
