import "server-only";
import { assertStudioId } from "./workspace";
import type { StudioId } from "./domain";
import { EditorialV2StoreError } from "./editorial-v2-store.server";
import { assertStudioEditorialV2Request, OperatorHttpError, studioOperatorFailureResponse } from "./operator-http.server";
import { parseStudioJson, type StudioRepository } from "./store.server";
import { validateEditorialRational } from "./editorial-time";

const LIMIT = 32768, ACTOR = "local-studio-editorial-v2-operator";
const HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; sandbox" };
const reply = (value: unknown, status = 200) => Response.json(value, { status, headers: HEADERS });
function invalid(): never { throw new OperatorHttpError(400, "invalid_editorial_v2_request", "Use the supported bounded working-copy request fields and values."); }
function object(value: unknown): Record<string, unknown> { if (!value || typeof value !== "object" || Array.isArray(value)) return invalid(); return value as Record<string, unknown>; }
function exact(value: Record<string, unknown>, keys: string): void { if (Object.keys(value).sort().join() !== keys.split(",").sort().join()) invalid(); }
function project(value: unknown): StudioId<"project"> { try { assertStudioId(value, "project"); } catch { return invalid(); } return value as StudioId<"project">; }
function editorialId(value: unknown, kind: "composition" | "layer" | "take"): string { if (typeof value !== "string" || value.length > 128 || !new RegExp(`^${kind}_[a-z0-9]+(?:_[a-z0-9]+)*$`, "u").test(value)) return invalid(); return value; }
function assetId(value: unknown): StudioId<"asset"> { try { assertStudioId(value, "asset"); } catch { return invalid(); } return value as StudioId<"asset">; }
function revision(value: unknown): void { if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < 1) invalid(); }
function headDigest(value: unknown): void { if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) invalid(); }
function bounded(value: unknown, min: number, max: number): void { if (typeof value !== "number" || !Number.isFinite(value) || Object.is(value, -0) || value < min || value > max) invalid(); }
function textProperties(value: unknown): void {
  const text = object(value); exact(text, "text,fontRef,fontSizePx,color");
  if (typeof text.text !== "string" || !text.text.trim() || text.text.length > 256 || /[\u0000-\u001f\u007f]/u.test(text.text)) invalid();
  if (text.fontRef !== "ARIAL_REGULAR" || typeof text.fontSizePx !== "number" || !Number.isSafeInteger(text.fontSizePx) || text.fontSizePx < 8 || text.fontSizePx > 256) invalid();
  if (typeof text.color !== "string" || !/^#[0-9A-F]{6}$/u.test(text.color)) invalid();
}
function audioProperties(value: unknown): void {
  const audio = object(value); exact(audio, "gainDb,fadeIn,fadeOut,muted"); bounded(audio.gainDb, -60, 12);
  if (typeof audio.muted !== "boolean") invalid();
  try { validateEditorialRational(audio.fadeIn); validateEditorialRational(audio.fadeOut); } catch { return invalid(); }
}
function transformProperties(value: unknown): void {
  const transform = object(value); exact(transform, "x,y,scaleX,scaleY,rotationDeg,anchorX,anchorY");
  bounded(transform.x, -16384, 16384); bounded(transform.y, -16384, 16384); bounded(transform.scaleX, 0.01, 100); bounded(transform.scaleY, 0.01, 100); bounded(transform.rotationDeg, -3600, 3600); bounded(transform.anchorX, 0, 1); bounded(transform.anchorY, 0, 1);
}
function rational(value: unknown, positive = false): void {
  try { if (positive && validateEditorialRational(value).numerator === 0) return invalid(); else validateEditorialRational(value); } catch { return invalid(); }
}
function action(value: unknown): Record<string, unknown> {
  const v = object(value); project(v.projectId);
  if (typeof v.requestedAt !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(v.requestedAt) || !Number.isFinite(Date.parse(v.requestedAt)) || new Date(v.requestedAt).toISOString() !== v.requestedAt) invalid();
  if (v.operation === "COPY_V1_TO_V2") {
    exact(v, "operation,projectId,expectedProjectRevision,expectedEditorialRevision,requestedAt"); revision(v.expectedProjectRevision); revision(v.expectedEditorialRevision);
  } else if (v.operation === "UNDO_EDITORIAL_EDIT" || v.operation === "REDO_EDITORIAL_EDIT") {
    exact(v, "operation,projectId,expectedRevision,expectedHeadDigest,compositionId,expectedCompositionRevision,requestedAt");
    revision(v.expectedRevision); headDigest(v.expectedHeadDigest); editorialId(v.compositionId, "composition"); revision(v.expectedCompositionRevision);
  } else if (v.operation === "SET_COMPOSITION_DURATION") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,duration");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition");
    try { if (validateEditorialRational(v.duration).numerator === 0) return invalid(); } catch { return invalid(); }
  } else if (v.operation === "INSERT_TAKE_LAYER") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,takeId,start,duration,sourceOffset");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); editorialId(v.takeId, "take"); rational(v.start); rational(v.duration, true); rational(v.sourceOffset);
  } else if (v.operation === "INSERT_TEXT_LAYER") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,start,duration,text,transform");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); rational(v.start); rational(v.duration, true); textProperties(v.text); transformProperties(v.transform);
  } else if (v.operation === "INSERT_AUDIO_LAYER") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,requestedAt,assetId,version,start,duration,sourceOffset,audio");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); assetId(v.assetId); revision(v.version); rational(v.start); rational(v.duration, true); rational(v.sourceOffset); audioProperties(v.audio);
  } else if (v.operation === "REPLACE_LAYER_TAKE") {
    exact(v, "operation,projectId,expectedRevision,expectedHeadDigest,expectedCompositionRevision,compositionId,layerId,requestedAt,takeId");
    revision(v.expectedRevision); headDigest(v.expectedHeadDigest); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); editorialId(v.layerId, "layer"); editorialId(v.takeId, "take");
  } else if (v.operation === "SET_LAYER_PROPERTIES") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,changes");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); editorialId(v.layerId, "layer");
    const changes = object(v.changes), keys = Object.keys(changes);
    if (!keys.length || keys.some(key => !["name", "opacity", "enabled", "transform", "text", "audio"].includes(key))) return invalid();
    if (Object.hasOwn(changes, "name") && (typeof changes.name !== "string" || !changes.name.trim() || changes.name.length > 160 || /[\u0000-\u001f\u007f]/u.test(changes.name))) invalid();
    if (Object.hasOwn(changes, "enabled") && typeof changes.enabled !== "boolean") invalid();
    if (Object.hasOwn(changes, "opacity")) bounded(changes.opacity, 0, 1);
    if (Object.hasOwn(changes, "transform")) transformProperties(changes.transform);
    if (Object.hasOwn(changes, "text")) textProperties(changes.text);
    if (Object.hasOwn(changes, "audio")) audioProperties(changes.audio);
  } else if (v.operation === "SET_AUDIO_LAYER_TIMING") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,start,duration,sourceOffset");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); editorialId(v.layerId, "layer");
    rational(v.start); rational(v.duration, true); rational(v.sourceOffset);
  } else if (v.operation === "MOVE_LAYER_TIME") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,start");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); editorialId(v.layerId, "layer");
    try { validateEditorialRational(v.start); } catch { return invalid(); }
  } else if (v.operation === "TRIM_LAYER_TIME") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,edge,trimPoint");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); editorialId(v.layerId, "layer");
    if (v.edge !== "IN" && v.edge !== "OUT") invalid();
    try { validateEditorialRational(v.trimPoint); } catch { return invalid(); }
  } else if (v.operation === "SPLIT_LAYER_TIME") {
    exact(v, "operation,projectId,expectedRevision,expectedCompositionRevision,compositionId,layerId,requestedAt,splitPoint");
    revision(v.expectedRevision); revision(v.expectedCompositionRevision); editorialId(v.compositionId, "composition"); editorialId(v.layerId, "layer");
    try { validateEditorialRational(v.splitPoint); } catch { return invalid(); }
  } else return invalid();
  return v;
}

function failure(error: unknown, admitted = false): Response {
  if (!admitted && error instanceof OperatorHttpError) return studioOperatorFailureResponse(error);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_INVALID") return reply({ ok: false, error: { code: "invalid_editorial_v2_request", message: "The working-copy request did not pass validation. Check its fields and saved layer state." } }, 400);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_UNSUPPORTED") return reply({ ok: false, error: { code: "unsupported_editorial_v2_split", message: "This saved layer cannot be split exactly. Use a direct-asset video layer with forward unit-rate playback and no keyframes." } }, 422);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_HISTORY_BOUNDARY") return reply({ ok: false, error: { code: "editorial_v2_history_boundary", message: "No supported Undo or Redo action is available at the current saved history boundary. Reload the composition before continuing." } }, 409);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_DURATION_CONFLICT") return reply({ ok: false, error: { code: "composition_duration_conflict", message: "The saved duration cannot end before an enabled layer. No layer or source was changed." } }, 422);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_SOURCE_COVERAGE") return reply({ ok: false, error: { code: "editorial_v2_source_coverage", message: "The exact source offset plus duration is not covered by the qualified source. Choose a source that covers the interval or edit timing separately; no layer or source was changed." } }, 422);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_COMPOSITION_COVERAGE") return reply({ ok: false, error: { code: "editorial_v2_composition_coverage", message: "The exact layer start plus duration exceeds the saved composition. Shorten or move the layer, or explicitly extend the composition first; no layer or source was changed." } }, 422);
  if (error instanceof EditorialV2StoreError && error.code === "EDITORIAL_V2_CONFLICT") return reply({ ok: false, error: { code: "editorial_v2_revision_conflict", message: "The saved revision or exact request differs. Inspect saved state before making a new edit." } }, 409);
  return reply({ ok: false, error: { code: "editorial_v2_storage_unavailable", message: "The working-copy result could not be confirmed safely. Preserve the exact request for explicit retry; no automatic copy, rebase or retry occurs." } }, 503);
}

/** This control reader retains the existing 32 KiB / five-second boundary. */
async function readBody(request: Request): Promise<Record<string, unknown>> {
  if (!["application/json", "application/json; charset=utf-8"].includes(request.headers.get("Content-Type")?.toLowerCase() ?? "") || request.headers.has("Content-Encoding")) throw new OperatorHttpError(415, "editorial_v2_content_type_required", "Send uncompressed UTF-8 JSON.");
  const declared = request.headers.get("Content-Length");
  if (declared !== null && (!/^(?:0|[1-9]\d*)$/u.test(declared) || Number(declared) > LIMIT)) throw new OperatorHttpError(413, "editorial_v2_body_too_large", "Working-copy requests are limited to 32768 UTF-8 bytes.");
  if (!request.body || request.signal.aborted) return invalid();
  const reader = request.body.getReader(), chunks: Uint8Array[] = []; let bytes = 0, timer: ReturnType<typeof setTimeout> | undefined, rejectAbort: ((reason: unknown) => void) | undefined;
  const interrupted = new Promise<never>((_, reject) => { rejectAbort = reject; });
  const cancel = () => { void reader.cancel().catch(() => undefined); };
  const abort = () => { rejectAbort?.(new OperatorHttpError(408, "editorial_v2_request_interrupted", "Stopped reading the request. Preserve its exact retry request.")); cancel(); };
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => { reject(new OperatorHttpError(408, "editorial_v2_body_timeout", "The request did not finish in time. No automatic retry occurs.")); cancel(); }, 5000); });
  request.signal.addEventListener("abort", abort, { once: true });
  try {
    if (request.signal.aborted) abort();
    while (true) {
      const part = await Promise.race([reader.read(), timeout, interrupted]); if (part.done) break;
      if (!(part.value instanceof Uint8Array)) { cancel(); return invalid(); }
      bytes += part.value.byteLength;
      if (bytes > LIMIT) { cancel(); throw new OperatorHttpError(413, "editorial_v2_body_too_large", "Working-copy requests are limited to 32768 UTF-8 bytes."); }
      chunks.push(part.value);
    }
    if (request.signal.aborted || (declared !== null && Number(declared) !== bytes)) return invalid();
    const all = new Uint8Array(bytes); let offset = 0; for (const chunk of chunks) { all.set(chunk, offset); offset += chunk.byteLength; }
    let value: unknown;
    try { value = parseStudioJson(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(all)); } catch { return invalid(); }
    return action(value);
  } catch (error) { if (error instanceof OperatorHttpError) throw error; return invalid(); }
  finally { if (timer) clearTimeout(timer); request.signal.removeEventListener("abort", abort); reader.releaseLock(); }
}

export function createStudioEditorialV2Handler(options: { enabled: boolean; openRepository: () => StudioRepository; listenerAddresses?: () => readonly string[] | null }): (request: Request) => Promise<Response> {
  return async request => {
    let repository: StudioRepository | undefined, result: Response | undefined, admitted = false;
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "studio_disabled", "Enable the isolated local Studio before editing.");
      if (!["GET", "POST"].includes(request.method)) throw new OperatorHttpError(405, "method_not_allowed", "Only explicit local working-copy reads and saves are supported.");
      const url = assertStudioEditorialV2Request(request, options.listenerAddresses?.());
      let value: unknown;
      if (request.method === "GET") {
        if (request.body !== null || request.headers.has("Transfer-Encoding") || (request.headers.has("Content-Length") && request.headers.get("Content-Length") !== "0")) return invalid();
        const keys = [...url.searchParams.keys()].sort().join();
        if (!["projectId", "compositionId,projectId", "auditLimit,projectId"].includes(keys)) return invalid();
        const projectId = project(url.searchParams.get("projectId"));
        const compositionId = url.searchParams.has("compositionId") ? editorialId(url.searchParams.get("compositionId"), "composition") : null;
        const limit = url.searchParams.get("auditLimit"); if (limit !== null && (!/^[1-9]\d?$/u.test(limit) || Number(limit) > 64)) return invalid();
        admitted = true; repository = options.openRepository();
        value = compositionId !== null ? repository.reviewEditorialV2Composition(projectId, compositionId) : limit !== null ? repository.auditEditorialV2History(projectId, Number(limit)) : repository.inspectEditorialV2WorkingCopy(projectId);
      } else {
        if (url.search) return invalid();
        const key = request.headers.get("Idempotency-Key"); if (!key || !/^[a-zA-Z0-9_-]{8,128}$/u.test(key)) return invalid();
        const body = await readBody(request); if (request.signal.aborted) return invalid();
        admitted = true; repository = options.openRepository();
        value = body.operation === "COPY_V1_TO_V2"
          ? repository.migrateEditorialV2(body, key, ACTOR)
          : body.operation === "UNDO_EDITORIAL_EDIT" || body.operation === "REDO_EDITORIAL_EDIT"
            ? repository.navigateEditorialV2History(body, key, ACTOR)
            : body.operation === "SET_COMPOSITION_DURATION"
              ? repository.editEditorialV2CompositionDuration(body, key, ACTOR)
              : repository.editEditorialV2Layer(body, key, ACTOR);
      }
      result = reply({ ok: true, result: value, generation: "LOCKED", providerRequests: 0 });
    } catch (error) { result = failure(error, admitted); }
    finally { if (repository) { try { repository.close(); } catch { if (!result || result.status < 400) result = failure(null, true); } } }
    return result ?? failure(null, true);
  };
}
