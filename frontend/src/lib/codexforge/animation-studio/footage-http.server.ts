import "server-only";
import { assertStudioId } from "./workspace";
import { FootageValidationError, STUDIO_FOOTAGE_ENDPOINT, STUDIO_FOOTAGE_METADATA_HEADER, footageImportMediaType, validateFootageImport } from "./footage-contract";
import { receiveStudioMediaImport, StudioMediaImportError, type StagedStudioMediaImport, type StudioMediaImportReceiver } from "./footage-import.server";
import { assertStudioFootageMediaRequest, assertStudioFootageRequest, OperatorHttpError, STUDIO_OPERATOR_HEADER, STUDIO_OPERATOR_HEADER_VALUE, studioOperatorFailureResponse } from "./operator-http.server";
import { parseStudioJson, StudioStoreError, type StudioRepository } from "./store.server";
import type { StudioId } from "./domain";
import { createStudioBoundedMediaResponse } from "./footage-stream-response.server";
import { assertStudioCompatibilityImportAllowed } from "./readonly-compatibility-binding.server";

const HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; sandbox" };
const METADATA_MAX_BYTES = 8192;
// Bounds simultaneous staging/probe work in this local server; native CAS remains the cross-process authority.
let importInProgress = false;
function reply(body: unknown, status = 200): Response { return Response.json(body, { status, headers: HEADERS }); }
function invalid(message: string): never { throw new OperatorHttpError(400, "invalid_footage_request", message); }
function safeFailure(error: unknown): Response {
  if (error instanceof StudioMediaImportError) return reply({ ok: false, error: { code: error.code, message: error.message } }, error.status);
  if (error instanceof FootageValidationError) return reply({ ok: false, error: { code: error.code, message: error.message } }, error.code === "FOOTAGE_PROJECT_LIMIT" ? 409 : 400);
  if (error instanceof StudioStoreError && error.code === "ACTIVE_SHOT_JOB") return reply({ ok: false, error: { code: error.code, message: "Finish or reconcile the active shot job before importing footage." } }, 409);
  if (error instanceof StudioStoreError && error.code === "IMPORT_METADATA_CONFLICT") return reply({ ok: false, error: { code: error.code, message: error.message } }, 409);
  return studioOperatorFailureResponse(error);
}
export function createStudioFootageHandler(options: {
  enabled: boolean; openRepository: () => StudioRepository; listenerAddresses?: () => readonly string[] | null; receiveImport?: StudioMediaImportReceiver;
}): (request: Request) => Promise<Response> {
  return async request => {
    let repository: StudioRepository | undefined, staged: StagedStudioMediaImport | undefined, ownsImport = false, result: Response | undefined;
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "studio_disabled", "Enable the isolated local Studio before importing footage.");
      if (!["GET", "HEAD", "POST"].includes(request.method)) throw new OperatorHttpError(405, "method_not_allowed", "Footage supports explicit import and read-only preview.");
      const nativeMedia = (request.method === "GET" || request.method === "HEAD") && request.headers.get(STUDIO_OPERATOR_HEADER) !== STUDIO_OPERATOR_HEADER_VALUE;
      const url = nativeMedia ? assertStudioFootageMediaRequest(request, options.listenerAddresses?.()) : assertStudioFootageRequest(request, options.listenerAddresses?.());
      if (url.pathname !== STUDIO_FOOTAGE_ENDPOINT) return invalid("Unexpected footage endpoint.");
      if (request.method === "GET" || request.method === "HEAD") {
        if (request.body !== null || request.headers.has("Transfer-Encoding") || (request.headers.has("Content-Length") && request.headers.get("Content-Length") !== "0")) return invalid("Preview accepts no body.");
        const names = [...url.searchParams.keys()];
        if (names.length !== 3 || !["projectId", "assetId", "version"].every(name => url.searchParams.getAll(name).length === 1)) return invalid("Preview requires one project, asset and version.");
        const projectId = url.searchParams.get("projectId"), assetId = url.searchParams.get("assetId"), versionText = url.searchParams.get("version")!;
        try { assertStudioId(projectId, "project"); assertStudioId(assetId, "asset"); } catch { return invalid("Use exact saved project and asset identities."); }
        if (!/^[1-9]\d{0,8}$/u.test(versionText)) return invalid("Use a positive saved asset version.");
        repository = options.openRepository();
        const media = repository.openFootage(projectId as StudioId<"project">, assetId as StudioId<"asset">, Number(versionText));
        const owner = repository;
        result = createStudioBoundedMediaResponse({
          method: request.method,
          rangeHeader: request.headers.get("Range"),
          reader: media.reader,
          contentType: media.contentType,
          disposition: `inline; filename="${media.filename}"`,
          headers: { "X-CodexForge-Project-Id": media.projectId, "X-CodexForge-Asset-Id": media.assetId, "X-CodexForge-Asset-Version": String(media.version) },
          close: () => owner.close(),
        });
        repository = undefined;
      } else {
        assertStudioCompatibilityImportAllowed();
        if (url.search) return invalid("Import query parameters are not supported.");
        const key = request.headers.get("Idempotency-Key");
        if (!key || !/^[A-Za-z0-9_-]{8,128}$/u.test(key)) return invalid("Use one stable request key for this exact import.");
        const encoded = request.headers.get(STUDIO_FOOTAGE_METADATA_HEADER);
        if (!encoded || encoded.length > METADATA_MAX_BYTES || /[^\x21-\x7e]/u.test(encoded)) return invalid("Bounded encoded import metadata is required.");
        let decoded: string; try { decoded = decodeURIComponent(encoded); if (encodeURIComponent(decoded) !== encoded) return invalid("Use canonical encoded import metadata."); } catch { return invalid("Import metadata encoding is invalid."); }
        let input; try { input = validateFootageImport(parseStudioJson(decoded)); } catch (error) { if (error instanceof FootageValidationError) throw error; return invalid("Import metadata must be exact, unambiguous JSON."); }
        if (importInProgress) throw new OperatorHttpError(409, "import_busy", "Another footage import is being read. Wait for it to finish before an explicit retry.");
        importInProgress = true; ownsImport = true;
        staged = await (options.receiveImport ?? receiveStudioMediaImport)(request, footageImportMediaType(input));
        if (request.signal.aborted) throw new StudioMediaImportError("MEDIA_UPLOAD_CANCELLED", 408, "Upload stopped before storage. Reload saved state before deciding whether to retry.");
        repository = options.openRepository();
        repository.importFootageFile(input, staged, key, "local-studio-footage-import");
        // Success metadata never reassembles all media into JS memory; explicit GET remains the bounded preview seam.
        result = reply({ ok: true, result: { snapshot: repository.loadManifest(input.projectId) } });
      }
    } catch (error) { result = safeFailure(error); }
    finally {
      if (repository) { try { repository.close(); } catch (error) { result = safeFailure(error); } }
      if (staged) { try { staged.close(); } catch (error) { result = safeFailure(error); } }
      if (ownsImport) importInProgress = false;
    }
    return result ?? safeFailure(null);
  };
}
