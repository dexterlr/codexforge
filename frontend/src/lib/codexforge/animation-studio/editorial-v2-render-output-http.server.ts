import "server-only";

import type { StudioId } from "./domain";
import type { StudioRenderHttpRepository } from "./editorial-v2-render-http.server";
import { assertStudioEditorialV2RenderOutputRequest, OperatorHttpError, studioOperatorFailureResponse } from "./operator-http.server";

const HASH = /^[a-f0-9]{64}$/u;
const BASE_HEADERS = { "Accept-Ranges": "bytes", "Cache-Control": "private, no-store", "Content-Security-Policy": "default-src 'none'; sandbox", "Cross-Origin-Resource-Policy": "same-origin", "X-Content-Type-Options": "nosniff" };
const invalid = (): never => { throw new OperatorHttpError(400, "render_invalid_request", "Use one exact immutable saved render output identity."); };
function id<K extends "project" | "asset">(value: string | null, kind: K): StudioId<K> { if (!value || value.length > 128 || !new RegExp(`^${kind}_[a-z0-9]+(?:_[a-z0-9]+)*$`, "u").test(value)) return invalid(); return value as StudioId<K>; }
function version(value: string | null): number { if (!value || !/^[1-9]\d*$/u.test(value) || !Number.isSafeInteger(Number(value))) return invalid(); return Number(value); }
function hash(value: string | null): string { if (!value || !HASH.test(value)) return invalid(); return value; }
type ByteRange = { start: number; end: number };
function range(value: string | null, length: number): ByteRange | null {
  if (value === null) return null;
  if (!/^bytes=(?:\d+-\d*|-\d+)$/u.test(value) || value.includes(",")) throw new OperatorHttpError(416, "render_range_not_satisfiable", "Use one satisfiable byte range.");
  const body = value.slice(6), [left, right] = body.split("-");
  let start: number, end: number;
  if (left === "") { const suffix = Number(right); if (!Number.isSafeInteger(suffix) || suffix < 1) throw new OperatorHttpError(416, "render_range_not_satisfiable", "Use one satisfiable byte range."); start = Math.max(0, length - suffix); end = length - 1; }
  else { start = Number(left); end = right === "" ? length - 1 : Number(right); }
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= length || end < start) throw new OperatorHttpError(416, "render_range_not_satisfiable", "Use one satisfiable byte range.");
  return { start, end: Math.min(end, length - 1) };
}
function failure(error: unknown, admitted: boolean, length?: number): Response {
  if (!admitted && error instanceof OperatorHttpError) return studioOperatorFailureResponse(error);
  if (error instanceof OperatorHttpError && error.status === 416) return Response.json({ ok: false, error: { code: error.code, message: error.message } }, { status: 416, headers: { ...BASE_HEADERS, ...(length === undefined ? {} : { "Content-Range": `bytes */${length}` }) } });
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (["RENDER_NOT_FOUND", "RENDER_OUTPUT_INVALID"].includes(code)) return Response.json({ ok: false, error: { code: "render_output_not_found", message: "That exact immutable local render output is unavailable." } }, { status: 404, headers: BASE_HEADERS });
  return Response.json({ ok: false, error: { code: "render_storage_unavailable", message: "The immutable local render output failed its integrity boundary." } }, { status: 503, headers: BASE_HEADERS });
}

export function createStudioEditorialV2RenderOutputHandler(options: { enabled: boolean; openRepository: () => StudioRenderHttpRepository; listenerAddresses?: () => readonly string[] | null }): (request: Request) => Promise<Response> {
  return async request => {
    let repository: StudioRenderHttpRepository | undefined, transferred = false, admitted = false, outputLength: number | undefined;
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "renderer_disabled", "Enable the isolated exact local Studio renderer before reading a render output.");
      if (request.method !== "GET" && request.method !== "HEAD") throw new OperatorHttpError(405, "method_not_allowed", "Only GET and HEAD are supported for immutable render outputs.");
      const url = assertStudioEditorialV2RenderOutputRequest(request, options.listenerAddresses?.());
      if (request.body !== null || request.headers.has("Transfer-Encoding") || (request.headers.has("Content-Length") && request.headers.get("Content-Length") !== "0") || [...url.searchParams.keys()].sort().join() !== "assetId,contentHash,disposition,projectId,version") return invalid();
      const disposition = url.searchParams.get("disposition"); if (disposition !== "inline" && disposition !== "attachment") return invalid();
      const binding = { projectId: id(url.searchParams.get("projectId"), "project"), assetId: id(url.searchParams.get("assetId"), "asset"), version: version(url.searchParams.get("version")), contentHash: hash(url.searchParams.get("contentHash")) };
      admitted = true; repository = options.openRepository();
      const opened = repository.openEditorialV2RenderOutput(binding); outputLength = opened.reader.byteLength;
      if (opened.output.assetId !== binding.assetId || opened.output.version !== binding.version || opened.output.contentHash !== binding.contentHash || opened.output.byteLength !== outputLength) throw new Error("output binding mismatch");
      const requested = range(request.headers.get("Range"), outputLength), selected = requested ?? { start: 0, end: outputLength - 1 }, selectedLength = selected.end - selected.start + 1;
      const headers: Record<string, string> = { ...BASE_HEADERS, "Content-Type": "video/mp4", "Content-Length": String(selectedLength), ETag: `"sha256-${binding.contentHash}"`, "Content-Disposition": `${disposition}; filename="codexforge-trailer-${binding.version}.mp4"` };
      if (requested) headers["Content-Range"] = `bytes ${selected.start}-${selected.end}/${outputLength}`;
      if (request.method === "HEAD") return new Response(null, { status: requested ? 206 : 200, headers });
      let position = selected.start, closed = false;
      const close = () => { if (closed) return; closed = true; try { repository?.close(); } catch { /* Stream is already ending fail closed. */ } repository = undefined; request.signal.removeEventListener("abort", abort); };
      let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
      const abort = () => { try { controller?.error(new Error("render output request aborted")); } finally { close(); } };
      const stream = new ReadableStream<Uint8Array>({
        start(value) { controller = value; request.signal.addEventListener("abort", abort, { once: true }); if (request.signal.aborted) abort(); },
        pull(value) { try { if (position > selected.end) { value.close(); close(); return; } const bytes = opened.reader.read(position, Math.min(524_288, selected.end - position + 1)); if (!bytes.length || position + bytes.length - 1 > selected.end) throw new Error("invalid render output chunk"); position += bytes.length; value.enqueue(bytes); } catch (error) { value.error(error); close(); } },
        cancel() { close(); },
      });
      transferred = true;
      return new Response(stream, { status: requested ? 206 : 200, headers });
    } catch (error) { return failure(error, admitted, outputLength); }
    finally { if (repository && !transferred) try { repository.close(); } catch { /* The response remains fail closed. */ } }
  };
}
