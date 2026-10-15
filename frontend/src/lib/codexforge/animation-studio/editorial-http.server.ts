import "server-only";
import { assertStudioId } from "./workspace";
import { CompositionValidationError } from "./composition-contract";
import { EditorialStoreError } from "./editorial-store.server";
import { assertStudioEditorialRequest, OperatorHttpError, studioOperatorFailureResponse } from "./operator-http.server";
import { parseStudioJson, type StudioRepository } from "./store.server";
import type { StudioId } from "./domain";

const HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; sandbox" };
const LIMIT = 32768;
const reply = (value: unknown, status = 200) => Response.json(value, { status, headers: HEADERS });
function invalid(message = "Use the supported bounded editorial request."): never { throw new OperatorHttpError(400, "invalid_editorial_request", message); }
function identity<K extends "project" | "asset">(value: unknown, kind: K): StudioId<K> { try { assertStudioId(value, kind); } catch { return invalid(); } return value as StudioId<K>; }
function failure(error: unknown): Response {
  if (error instanceof CompositionValidationError) return reply({ ok: false, error: { code: "invalid_composition", message: error.message } }, 400);
  if (error instanceof EditorialStoreError) return reply({ ok: false, error: { code: error.code === "EDITORIAL_CONFLICT" ? "editorial_revision_conflict" : error.code === "EDITORIAL_INVALID" ? "invalid_editorial_request" : "editorial_storage_unavailable", message: error.message } }, error.code === "EDITORIAL_CONFLICT" ? 409 : error.code === "EDITORIAL_INVALID" ? 400 : 503);
  if ((error as { code?: string } | null)?.code === "UNSUPPORTED_EDITORIAL_MEDIA") return reply({ ok: false, error: { code: "unsupported_editorial_media", message: "This preview supports locally imported MP4 and registered PNG/JPEG only. No conversion or generation is performed." } }, 415);
  return studioOperatorFailureResponse(error);
}
async function readBody(request: Request): Promise<Record<string, unknown>> {
  if (!["application/json", "application/json; charset=utf-8"].includes(request.headers.get("Content-Type")?.toLowerCase() ?? "") || request.headers.has("Content-Encoding")) throw new OperatorHttpError(415, "editorial_content_type_required", "Send uncompressed UTF-8 JSON.");
  const declared = request.headers.get("Content-Length");
  if (declared !== null && (!/^(?:0|[1-9]\d*)$/u.test(declared) || Number(declared) > LIMIT)) throw new OperatorHttpError(413, "editorial_body_too_large", "Editorial saves are limited to 32768 UTF-8 bytes.");
  if (!request.body || request.signal.aborted) return invalid();
  const reader = request.body.getReader(), chunks: Uint8Array[] = []; let bytes = 0, timer: ReturnType<typeof setTimeout> | undefined, rejectAbort: ((reason: unknown) => void) | undefined;
  const interrupted = new Promise<never>((_, reject) => { rejectAbort = reject; });
  const abort = () => { rejectAbort?.(new OperatorHttpError(408, "editorial_save_interrupted", "Stopped reading the save. Keep its exact retry request.")); void reader.cancel().catch(() => undefined); };
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => { reject(new OperatorHttpError(408, "editorial_body_timeout", "Editorial request timed out. No automatic retry occurs.")); void reader.cancel().catch(() => undefined); }, 5000); });
  request.signal.addEventListener("abort", abort, { once: true });
  try {
    if (request.signal.aborted) abort();
    while (true) {
      const part = await Promise.race([reader.read(), timeout, interrupted]); if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > LIMIT) { void reader.cancel().catch(() => undefined); throw new OperatorHttpError(413, "editorial_body_too_large", "Editorial saves are limited to 32768 UTF-8 bytes."); }
      chunks.push(part.value);
    }
    if (request.signal.aborted || (declared !== null && Number(declared) !== bytes)) return invalid();
    const all = new Uint8Array(bytes); let offset = 0; for (const chunk of chunks) { all.set(chunk, offset); offset += chunk.byteLength; }
    let value: unknown;
    try { value = parseStudioJson(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(all)); } catch { return invalid("Editorial JSON must be valid UTF-8 without BOM or duplicate keys."); }
    if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== "content,expectedProjectRevision,expectedRevision,projectId,requestedAt") return invalid();
    const record = value as Record<string, unknown>; identity(record.projectId, "project"); return record;
  } finally { if (timer) clearTimeout(timer); request.signal.removeEventListener("abort", abort); reader.releaseLock(); }
}
export function createStudioEditorialHandler(options: { enabled: boolean; openRepository: () => StudioRepository; listenerAddresses?: () => readonly string[] | null; media?: boolean }): (request: Request) => Promise<Response> {
  return async request => {
    let repository: StudioRepository | undefined, result: Response | undefined;
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "studio_disabled", "Enable the isolated local Studio before editing.");
      if (options.media ? request.method !== "GET" : !["GET", "POST"].includes(request.method)) throw new OperatorHttpError(405, "method_not_allowed", "Only explicit local editorial reads and saves are supported.");
      const url = assertStudioEditorialRequest(request, options.media === true, options.listenerAddresses?.());
      if (request.method === "GET") {
        if (request.body !== null || request.headers.has("Transfer-Encoding") || (request.headers.has("Content-Length") && request.headers.get("Content-Length") !== "0")) return invalid();
        const keys = options.media ? ["projectId", "assetId", "version"] : ["projectId"];
        if ([...url.searchParams.keys()].length !== keys.length || !keys.every(key => url.searchParams.getAll(key).length === 1)) return invalid();
        const projectId = identity(url.searchParams.get("projectId"), "project");
        if (options.media) {
          const assetId = identity(url.searchParams.get("assetId"), "asset"), version = url.searchParams.get("version")!;
          if (!/^[1-9]\d{0,8}$/u.test(version) || request.headers.has("Range")) throw new OperatorHttpError(416, "editorial_range_not_supported", "Preview requires one complete bounded asset version.");
          repository = options.openRepository();
          const media = repository.readEditorialMedia(projectId, assetId, Number(version));
          result = new Response(new Uint8Array(media.bytes), { headers: { ...HEADERS, "Content-Type": media.contentType, "Content-Length": String(media.bytes.length), "Content-Disposition": "inline" } });
        } else { repository = options.openRepository(); result = reply({ ok: true, result: repository.reviewEditorial(projectId), generation: "LOCKED", providerRequests: 0 }); }
      } else {
        if (url.search) return invalid();
        const key = request.headers.get("Idempotency-Key"); if (!key || !/^[a-zA-Z0-9_-]{8,128}$/u.test(key)) return invalid("Use one stable exact editorial request key.");
        const body = await readBody(request); repository = options.openRepository();
        result = reply({ ok: true, result: repository.saveEditorial(body, key, "local-studio-editorial-operator"), generation: "LOCKED", providerRequests: 0 });
      }
    } catch (error) { result = failure(error); }
    finally { if (repository) { try { repository.close(); } catch { if (!result || result.status < 400) result = failure(new EditorialStoreError("EDITORIAL_UNAVAILABLE", "Editorial result could not be confirmed after closing storage. Keep the exact request for explicit recovery.")); } } }
    return result ?? failure(null);
  };
}
