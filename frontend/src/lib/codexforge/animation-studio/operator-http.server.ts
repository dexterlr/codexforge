import "server-only";
import { Server as NetServer } from "node:net";
import type { ShotManifest, StudioId, StudioProject } from "./domain";
import { DEFAULT_EXTERNAL_EXECUTION_POLICY, routeShot } from "./policies";
import { parseStudioJson, StudioStoreError, type StudioRepository, type StudioSnapshot } from "./store.server";
import { StudioValidationError } from "./validation";
import { inspectGeneration, projectEstimateViews } from "./generation-preparation.server";
import { hashJarvisChatCanonicalJson as digest } from "../jarvis-chat/jarvis-chat-crypto";
import { isEstimateJob, readEstimateIntent } from "./higgsfield-estimate-intent";
import { executeHiggsfieldEstimateMock, executeHiggsfieldEstimateLive } from "./higgsfield-estimate.server";
import type { HiggsfieldTransport } from "./higgsfield-transport.server";
import { readHiggsfieldConfiguration } from "./higgsfield-contract.server";
import { EstimateExecutionTracker } from "./higgsfield-estimate-execution.server";
import { estimateExecutionOperatorMessage, type EstimateExecutionReport } from "./higgsfield-estimate-execution";

export const STUDIO_OPERATOR_HEADER = "X-CodexForge-Animation-Studio";
export const STUDIO_OPERATOR_HEADER_VALUE = "local-operator-v1";
export const STUDIO_OPERATOR_MAX_BODY_BYTES = 32_768;
const ENDPOINT = "/api/codexforge/animation-studio";
const ACTOR = "local-studio-operator";
const RESPONSE_HEADERS = { "Cache-Control": "no-store", "Content-Security-Policy": "default-src 'none'; sandbox", "X-Content-Type-Options": "nosniff" };
type ShotChanges = Pick<ShotManifest, "description" | "storyPurpose" | "action" | "duration" | "notes">;
type OperatorAction = { action: "create"; projectId: StudioId<"project">; title: string; description: string; durationSeconds: number; requestedAt: string }
  | { action: "revise-project"; projectId: StudioId<"project">; expectedRevision: number; title: string; description: string; requestedAt: string }
  | { action: "revise-shot"; projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedRevision: number; changes: ShotChanges; requestedAt: string }
  | { action: "dry-run"; projectId: StudioId<"project">; shotId: StudioId<"shot">; requestedAt: string }
  | { action: "inspect-generation" | "prepare-estimate" | "execute-estimate"; projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedProjectRevision: number; expectedShotRevision: number; requestedAt: string };
export class OperatorHttpError extends Error { constructor(readonly status: number, readonly code: string, message: string) { super(message); } }
const invalid = (message = "Use the supported fields and bounded values for this studio action."): never => { throw new OperatorHttpError(400, "invalid_request", message); };
const forbidden = (reason = "noncanonical local authority"): never => { throw new OperatorHttpError(403, "request_boundary_rejected", `Open the studio on its direct local address. Request check failed: ${reason}.`); };
function response(body: unknown, status = 200): Response { return Response.json(body, { status, headers: RESPONSE_HEADERS }); }
export function studioOperatorFailureResponse(error: unknown): Response {
  if (error instanceof OperatorHttpError) return response({ ok: false, error: { code: error.code, message: error.message } }, error.status);
  if (error instanceof StudioValidationError) {
    if (error.issues.some(issue => ["TEXT_LIMIT", "NODE_LIMIT", "ARRAY_LIMIT"].includes(issue.code))) return response({ ok: false, error: { code: "project_capacity_exhausted", message: "The project record has insufficient capacity to save this operation safely. Reload its saved state; do not retry a render automatically. Retained jobs and evidence need explicit capacity/recovery review, not unrelated text or timing edits." } }, 409);
    return response({ ok: false, error: { code: "invalid_manifest", message: "The edited manifest did not pass validation. Check its text, timing and linked references." } }, 400);
  }
  const code = error instanceof StudioStoreError ? error.code : error && typeof error === "object" && "code" in error ? error.code : null;
  if (code === "BLENDER_RECORD_CAPACITY") return response({ ok: false, error: { code: "project_capacity_exhausted", message: "The project record cannot reserve enough capacity for this native job and its terminal outcome. No new Blender execution was admitted. Reload saved state and review record capacity; do not retry automatically." } }, 409);
  if (code === "FOOTAGE_COMPATIBILITY_READ_ONLY") return response({ ok: false, error: { code, message: "Source imports are unavailable in this read-only compatibility workspace." } }, 403);
  if (["STALE_ESTIMATE", "ESTIMATE_ROUTE_BLOCKED", "ESTIMATE_INTENT_EXISTS", "ESTIMATE_NOT_AVAILABLE", "ESTIMATE_ATTEMPT_CONSUMED"].includes(String(code))) return response({ ok: false, error: { code: "estimate_unavailable", message: "The saved estimate is stale, blocked or already consumed. Reload its saved state. No retry or attempt reset is available." } }, 409);
  if (code === "ESTIMATE_EXECUTION_NOT_AUTHORIZED") return response({ ok: false, error: { code: "ESTIMATE_EXECUTION_NOT_AUTHORIZED", message: "Exact server-side estimate authorization has not been granted or is no longer valid. No provider request was made." } }, 403);
  if (code === "MISSING_ESTIMATE_INTENT") return response({ ok: false, error: { code: "estimate_not_prepared", message: "Prepare the exact saved request first. No estimate was executed." } }, 409);
  if (code === "PROJECT_LIMIT") return response({ ok: false, error: { code: "project_limit", message: "This local workspace has reached its 100-project limit. Existing projects can still be opened and edited; no new project was created." } }, 409);
  if (code === "PROJECT_FULL") return response({ ok: false, error: { code: "project_full", message: "The project manifest is full. This import or edit was not published; choose another project." } }, 409);
  if (["REVISION_CONFLICT", "STALE_REVISION", "IDEMPOTENCY_CONFLICT", "PROJECT_EXISTS", "compare_mismatch", "already_exists", "STALE_TIME"].includes(String(code))) return response({ ok: false, error: { code: "revision_conflict", message: "This draft changed or this request key was already used. Refresh the saved project before trying a new edit." } }, 409);
  if (["NOT_FOUND", "MISSING_SHOT"].includes(String(code))) return response({ ok: false, error: { code: "not_found", message: "The saved project or shot was not found. Refresh the project list." } }, 404);
  if (["INVALID_KEY", "INVALID_TIME", "INVALID_PROJECT", "INVALID_SHOT_EDIT"].includes(String(code))) return response({ ok: false, error: { code: "invalid_request", message: "The draft request did not pass validation." } }, 400);
  return response({ ok: false, error: { code: "local_storage_unavailable", message: "The local studio store could not complete this request safely. Reload saved state; no automatic retry is allowed." } }, 503);
}
async function failure(error: unknown, executionOutcome?: EstimateExecutionReport): Promise<Response> {
  const base = studioOperatorFailureResponse(error);
  if (!executionOutcome) return base;
  const payload = await base.json() as { ok: false; error: { code: string; message: string } };
  // Codes still describe the local failure, but external-execution statements come only from
  // the invocation's structured observation, including failures during response assembly/close.
  payload.error.message = estimateExecutionOperatorMessage(executionOutcome).message;
  return response({ ...payload, executionOutcome }, base.status);
}
function localHostname(hostname: string): boolean { return ["localhost", "127.0.0.1", "[::1]", "::1"].includes(hostname.toLowerCase()); }
function activeListenerAddresses(): readonly string[] | null {
  const getHandles = (process as NodeJS.Process & { _getActiveHandles?: () => unknown[] })._getActiveHandles;
  if (!getHandles) return null;
  try { return getHandles.call(process).filter(handle => handle instanceof NetServer).flatMap(handle => { const address = (handle as NetServer).address(); return address && typeof address === "object" ? [address.address] : []; }); } catch { return null; }
}
function authority(value: string, protocol: string): URL {
  if (!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::[1-9]\d{0,4})?$/iu.test(value)) return forbidden();
  let parsed: URL;
  try { parsed = new URL(`${protocol}//${value}`); } catch { return forbidden(); }
  if (!localHostname(parsed.hostname)) return forbidden();
  return parsed;
}
function assertRequest(request: Request, listeners: readonly string[] | null, endpoint = ENDPOINT, operatorMarkerRequired = true, sameOriginFetchMetadataRequired = false, originForEveryMutation = false): URL {
  if (!listeners?.length || listeners.some(address => !localHostname(address))) throw new OperatorHttpError(503, "loopback_listener_required", "The studio must run on a server bound only to the local computer.");
  // NextRequest.url rewrites numeric loopback hosts to localhost. Its native
  // Request superclass retains the original URL; compare that exact authority
  // instead of widening the set of accepted Host/Origin aliases.
  const originalUrl: unknown = Object.getOwnPropertyDescriptor(Request.prototype, "url")?.get?.call(request);
  if (typeof originalUrl !== "string") return forbidden("original request URL unavailable");
  const url = new URL(originalUrl);
  // Phase 1 has an explicit direct loopback HTTP transport contract. Next can derive even
  // the native URL scheme from x-forwarded-proto, so that URL cannot establish TLS authority.
  // HTTPS/proxies remain unsupported until an independently observed transport contract exists.
  if (url.protocol !== "http:") return forbidden("only direct local HTTP is supported");
  if (!localHostname(url.hostname) || url.username || url.password || url.hash || url.pathname !== endpoint) return forbidden();
  const host = authority(request.headers.get("Host") ?? "", url.protocol);
  if (host.host !== url.host) return forbidden("Host and local URL differ");
  const operatorMarker = request.headers.get(STUDIO_OPERATOR_HEADER);
  if ((operatorMarkerRequired && operatorMarker !== STUDIO_OPERATOR_HEADER_VALUE) || (!operatorMarkerRequired && operatorMarker !== null && operatorMarker !== STUDIO_OPERATOR_HEADER_VALUE)) return forbidden(operatorMarkerRequired ? "studio client marker missing" : "invalid studio client marker");
  // Next synthesizes these four headers even for direct requests. They grant no authority:
  // accept only values independently bound to the direct loopback URL/Host, never proxy chains.
  const nextForwarded: Record<string, string[]> = {
    "x-forwarded-host": [request.headers.get("Host")!],
    "x-forwarded-port": [url.port || "80"],
    "x-forwarded-proto": ["http"],
    "x-forwarded-for": ["127.0.0.1", "::1"],
  };
  for (const header of request.headers.keys()) {
    if (header === "forwarded" || ["x-real-ip", "via", "x-original-url", "x-rewrite-url"].includes(header)) return forbidden("proxy metadata not supported");
    if (header.startsWith("x-forwarded-") && !nextForwarded[header]?.includes(request.headers.get(header)!)) return forbidden("forwarded metadata differs from direct request");
  }
  const site = request.headers.get("Sec-Fetch-Site");
  if ((sameOriginFetchMetadataRequired && site !== "same-origin") || (!sameOriginFetchMetadataRequired && site !== null && site !== "same-origin")) return forbidden("browser fetch is not same-origin");
  const origin = request.headers.get("Origin");
  // Same-origin browser GET normally has no Origin; its marker still blocks simple cross-origin reads.
  if ((request.method === "POST" || originForEveryMutation && !["GET", "HEAD"].includes(request.method)) && origin === null) return forbidden("mutation Origin is missing");
  if (origin !== null) {
    if (!origin.startsWith(`${url.protocol}//`)) return forbidden();
    const approved = authority(origin.slice(url.protocol.length + 2), url.protocol);
    if (approved.origin !== host.origin) return forbidden("Origin differs from direct Host");
  }
  return url;
}
/** Same accepted local authority checks; media has a separate byte contract, not a weaker authority boundary. */
export function assertStudioFootageRequest(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/footage`);
}
/** Native media elements cannot attach the operator marker. This omits only
 * that marker while retaining direct-loopback and same-origin fetch checks. */
export function assertStudioFootageMediaRequest(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/footage`, false, true);
}
export function assertStudioFootageUploadRequest(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/footage/upload`, true, false, true);
}
export function assertStudioEditorialRequest(request: Request, media: boolean, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/editorial${media ? "/media" : ""}`);
}
export function assertStudioEditorialV2Request(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/editorial-v2`);
}
export function assertStudioEditorialV2MediaRequest(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/editorial-v2/media`);
}
/** Same native-media exception as render output: marker optional, exact
 * same-origin fetch metadata mandatory, all direct-loopback checks retained. */
export function assertStudioEditorialV2NativeMediaRequest(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/editorial-v2/media`, false, true);
}
export function assertStudioEditorialV2RenderRequest(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/editorial-v2/render`);
}
/** Native source operations retain the established direct-loopback operator boundary. */
export function assertStudioBlenderRequest(request: Request, listeners?: readonly string[] | null): URL {
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/blender`);
}
export function assertStudioEditorialV2RenderOutputRequest(request: Request, listeners?: readonly string[] | null): URL {
  // Native <video>/<a> requests cannot attach the operator marker. This omits
  // only that marker: direct HTTP loopback authority, exact Host/original URL,
  // proxy rejection and same-origin Fetch Metadata remain mandatory.
  return assertRequest(request, listeners === undefined ? activeListenerAddresses() : listeners, `${ENDPOINT}/editorial-v2/render/output`, false, true);
}
function object(value: unknown): Record<string, unknown> { return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : invalid(); }
function exact(value: Record<string, unknown>, keys: string[]): void { if (Object.keys(value).sort().join() !== [...keys].sort().join()) invalid("Unknown or missing fields are not accepted by the studio boundary."); }
function text(value: unknown, maximum: number, required = true): string { if (typeof value !== "string" || value.length > maximum || (required && !value.trim()) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) return invalid(); return value; }
function id<K extends "project" | "shot">(value: unknown, kind: K): StudioId<K> { if (typeof value !== "string" || value.length > 128 || !new RegExp(`^${kind}_[a-z0-9]+(?:_[a-z0-9]+)*$`, "u").test(value)) return invalid("Project and shot identifiers must use the canonical local ID format."); return value as StudioId<K>; }
function revision(value: unknown): number { return Number.isSafeInteger(value) && Number(value) >= 1 ? value as number : invalid(); }
function timestamp(value: unknown): string { if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) return invalid("Use an exact UTC timestamp with milliseconds for the saved request."); return value; }
function action(input: unknown): OperatorAction {
  const body = object(input), common = ["action", "projectId", "requestedAt"];
  const projectId = id(body.projectId, "project"), requestedAt = timestamp(body.requestedAt);
  if (body.action === "create" || body.action === "revise-project") {
    exact(body, [...common, "title", "description", ...(body.action === "create" ? ["durationSeconds"] : ["expectedRevision"])]);
    const fields = { projectId, requestedAt, title: text(body.title, 256), description: text(body.description, 16_384, false) };
    if (body.action === "create") {
      if (!Number.isSafeInteger(body.durationSeconds) || Number(body.durationSeconds) < 45 || Number(body.durationSeconds) > 60) return invalid("Choose a whole-second timeline duration from 45 through 60 seconds.");
      return { action: "create", ...fields, durationSeconds: Number(body.durationSeconds) };
    }
    return { action: "revise-project", ...fields, expectedRevision: revision(body.expectedRevision) };
  }
  if (body.action === "dry-run") { exact(body, [...common, "shotId"]); return { action: "dry-run", projectId, requestedAt, shotId: id(body.shotId, "shot") }; }
  if (body.action === "inspect-generation" || body.action === "prepare-estimate" || body.action === "execute-estimate") {
    exact(body, [...common, "shotId", "expectedProjectRevision", "expectedShotRevision"]);
    return { action: body.action, projectId, requestedAt, shotId: id(body.shotId, "shot"), expectedProjectRevision: revision(body.expectedProjectRevision), expectedShotRevision: revision(body.expectedShotRevision) };
  }
  if (body.action === "revise-shot") {
    exact(body, [...common, "shotId", "expectedRevision", "changes"]);
    const changes = object(body.changes); exact(changes, ["description", "storyPurpose", "action", "duration", "notes"]);
    if (typeof changes.duration !== "number" || !Number.isFinite(changes.duration) || changes.duration < 0.001 || changes.duration > 3_600 || !Array.isArray(changes.notes) || changes.notes.length > 32) return invalid();
    return { action: "revise-shot", projectId, requestedAt, shotId: id(body.shotId, "shot"), expectedRevision: revision(body.expectedRevision), changes: { description: text(changes.description, 16_384), storyPurpose: text(changes.storyPurpose, 4_096), action: text(changes.action, 16_384), duration: changes.duration, notes: changes.notes.map(note => text(note, 4_096)) } };
  }
  return invalid("Only supported local draft, inspection and estimate actions are accepted. Live provider execution and generation are disabled.");
}
async function body(request: Request): Promise<OperatorAction> {
  const type = request.headers.get("Content-Type")?.toLowerCase();
  if (type !== "application/json" && type !== "application/json; charset=utf-8") throw new OperatorHttpError(415, "content_type_required", "Studio requests require application/json encoded as UTF-8.");
  const declared = request.headers.get("Content-Length");
  if (declared !== null && (!/^(?:0|[1-9]\d*)$/u.test(declared) || Number(declared) > STUDIO_OPERATOR_MAX_BODY_BYTES)) throw new OperatorHttpError(413, "body_too_large", "Studio requests are limited to 32768 UTF-8 bytes.");
  if (!request.body) return invalid("A JSON request body is required.");
  const reader = request.body.getReader(), chunks: Uint8Array[] = [];
  let total = 0, timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => { reject(new OperatorHttpError(408, "body_timeout", "The studio request body did not finish in time.")); void reader.cancel().catch(() => undefined); }, 5_000); });
  try {
    while (true) {
      const result = await Promise.race([reader.read(), timeout]);
      if (result.done) break;
      total += result.value.byteLength;
      if (total > STUDIO_OPERATOR_MAX_BODY_BYTES) { void reader.cancel().catch(() => undefined); throw new OperatorHttpError(413, "body_too_large", "Studio requests are limited to 32768 UTF-8 bytes."); }
      chunks.push(result.value);
    }
    if (declared !== null && Number(declared) !== total) return invalid("The declared body length does not match the received UTF-8 bytes.");
    const bytes = new Uint8Array(total); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    let parsed: unknown;
    try { parsed = parseStudioJson(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes)); } catch { return invalid("The request must contain unambiguous valid UTF-8 JSON without a BOM."); }
    return action(parsed);
  } catch (error) { if (error instanceof OperatorHttpError) throw error; return invalid("The request body could not be read safely."); }
  finally { if (timer) clearTimeout(timer); reader.releaseLock(); }
}

/** Observational configuration only. No repository, transport or estimate-authority capability is supplied.
 * READY_LOCALLY means only locally valid credential structure, never an authorized or remote-ready operation.
 */
export function createStudioProviderReadinessHandler(options: {
  enabled: boolean; lookup: (name: "HF_CREDENTIALS") => unknown; listenerAddresses?: () => readonly string[] | null;
}): (request: Request) => Promise<Response> {
  return async request => {
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "studio_disabled", "The local development studio is disabled. Enable its isolated development server before editing drafts.");
      if (request.method !== "GET") throw new OperatorHttpError(405, "method_not_allowed", "Provider readiness supports only a read-only GET request.");
      const url = assertRequest(request, (options.listenerAddresses ?? activeListenerAddresses)(), `${ENDPOINT}/provider-readiness`);
      if (url.search || request.body !== null || request.headers.has("Transfer-Encoding") ||
          (request.headers.has("Content-Length") && request.headers.get("Content-Length") !== "0")) {
        return invalid("Provider readiness accepts no query parameters or request body.");
      }
      const { configuration, remoteAuthentication, execution } = readHiggsfieldConfiguration(options.lookup);
      return response({ ok: true, result: {
        provider: "HIGGSFIELD", configuration, remoteAuthentication, execution,
        estimateCapability: configuration === "LOCALLY_CONFIGURED" ? "READY_LOCALLY" : "BLOCKED",
        generation: "LOCKED",
      } });
    } catch (error) { return failure(error); }
  };
}

/** Explicit constructor-only mock seam. The production API route never supplies it; no body, query or environment value can enable it. */
export function createStudioOperatorHandler(options: {
  enabled: boolean; openRepository: () => StudioRepository; listenerAddresses?: () => readonly string[] | null;
  liveEstimate?: { transport: HiggsfieldTransport; now: () => string; timeoutMs?: number };
  testOnlyEstimate?: { transport: HiggsfieldTransport; now: () => string; timeoutMs?: number };
}): (request: Request) => Promise<Response> {
  return async request => {
    let repository: StudioRepository | undefined, result: Response | undefined;
    // Only a parsed execute-estimate operation has provider-execution semantics.
    // Local project failures retain their own error and recovery instructions.
    let estimateExecutionRequested = false;
    const executionTracker = new EstimateExecutionTracker();
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "studio_disabled", "The local development studio is disabled. Enable its isolated development server before editing drafts.");
      if (!["GET", "POST"].includes(request.method)) throw new OperatorHttpError(405, "method_not_allowed", "Only reading, draft editing and dry-run planning are supported.");
      const url = assertRequest(request, (options.listenerAddresses ?? activeListenerAddresses)());
      let projectId: StudioId<"project"> | null = null, input: OperatorAction | null = null, key: string | null = null;
      if (request.method === "GET") {
        if ([...url.searchParams.keys()].some(name => name !== "projectId") || url.searchParams.getAll("projectId").length > 1) return invalid("Only one optional projectId query is supported.");
        if (url.searchParams.has("projectId")) projectId = id(url.searchParams.get("projectId"), "project");
      } else {
        if (url.search) return invalid("Mutation query parameters are not supported.");
        key = request.headers.get("Idempotency-Key");
        if (!key || !/^[a-zA-Z0-9_-]{8,128}$/u.test(key)) return invalid("Use one stable request key containing 8–128 safe characters.");
        input = await body(request); projectId = input.projectId;
        estimateExecutionRequested = input.action === "execute-estimate";
      }
      repository = options.openRepository();
      if (input?.action === "create") {
        const project: StudioProject = { schemaVersion: 1, projectId: input.projectId, revision: 1, title: input.title, description: input.description, createdAt: input.requestedAt, currency: "GBP" };
        repository.createDraftProject(project, key!, ACTOR, { duration: input.durationSeconds, fps: 25, width: 1280, height: 720, emptyOperatorTimeline: true });
      } else if (input?.action === "revise-project") repository.reviseProject(input.projectId, input.expectedRevision, input.title, input.description, key!, ACTOR, input.requestedAt);
      else if (input?.action === "revise-shot") repository.reviseShot(input.projectId, input.shotId, input.expectedRevision, input.changes, key!, ACTOR, input.requestedAt);
      else if (input?.action === "prepare-estimate") {
        const prepared = repository.prepareEstimateIntent(input.projectId, input.shotId, input.expectedProjectRevision, input.expectedShotRevision, key!, ACTOR, input.requestedAt);
        if (prepared.status === "BLOCKED") throw new OperatorHttpError(409, "estimate_unavailable", "The current saved request cannot prepare another estimate. Reload its saved state; no estimate was executed.");
      } else if (input?.action === "execute-estimate") {
        const mock = options.testOnlyEstimate;
        if ((!mock || mock.transport.kind !== "MOCK") && !options.liveEstimate) throw new OperatorHttpError(503, "estimate_execution_disabled", "Estimate execution is unavailable on this server. No credentials were inspected and no provider request was made.");
        const saved = repository.load(input.projectId), shot = saved.shots.find(item => item.shotId === input.shotId);
        if (!shot) throw new StudioStoreError("MISSING_SHOT", "Saved shot not found.");
        if (saved.project.revision !== input.expectedProjectRevision || shot.revision !== input.expectedShotRevision) throw new StudioStoreError("REVISION_CONFLICT", "Reload saved estimate state.");
        const job = saved.jobs.filter(item => item.shotId === input.shotId && isEstimateJob(item)).at(-1);
        if (!job) throw new OperatorHttpError(409, "estimate_not_prepared", "Prepare the exact saved request first. No estimate was executed.");
        executionTracker.replay(job);
        const live = options.liveEstimate;
        if (live && (readEstimateIntent(job).executionMode !== "LIVE_ESTIMATE" || !readEstimateIntent(job).authorization)) throw new StudioStoreError("ESTIMATE_EXECUTION_NOT_AUTHORIZED", "Exact estimate authorization required.");
        if (!live && mock && readEstimateIntent(job).phase === "PREPARED") {
          const authorization = repository.authorizeEstimateIntent(input.projectId, job.jobId, `estimate_authorize_${digest({ key, projectId: input.projectId, shotId: input.shotId })}`, ACTOR, mock.now());
          if (authorization.status === "BLOCKED") throw new OperatorHttpError(409, "estimate_unavailable", "The saved estimate is stale or its single attempt is unavailable. Reload its state; no new estimate was executed.");
        }
        const execution = live ?? mock!;
        const completed = await (live ? executeHiggsfieldEstimateLive : executeHiggsfieldEstimateMock)({ repository, transport: execution.transport, actor: ACTOR, now: execution.now, timeoutMs: execution.timeoutMs, executionTracker }, input.projectId, job.jobId, key!);
        if (["PREPARED", "READY"].includes(readEstimateIntent(completed).phase)) throw new OperatorHttpError(409, "estimate_unavailable", "The one-test estimate claim is unavailable. No new estimate was executed and no claim or attempt was reset.");
      }
      const review = projectId && !input ? repository.reviewSnapshot(projectId) : null;
      const snapshot: StudioSnapshot | null = projectId ? review?.snapshot ?? repository.load(projectId) : null;
      let dryRun;
      if (input?.action === "dry-run") {
        const shot = snapshot!.shots.find(item => item.shotId === input.shotId);
        if (!shot) throw new StudioStoreError("MISSING_SHOT", "Shot not found.");
        dryRun = { shotId: shot.shotId, shotRevision: shot.revision, projectRevision: snapshot!.project.revision, route: routeShot(shot, [], input.requestedAt), executionAllowed: false, capabilityObservations: [], providerRequests: 0, jobsCreated: 0 };
      }
      const generationPlan = input?.action === "inspect-generation" ? inspectGeneration(repository, input.projectId, input.shotId, input.expectedProjectRevision, input.expectedShotRevision, input.requestedAt) : undefined;
      if (generationPlan && generationPlan.sourceRecordDigest !== snapshot!.recordDigest) throw new StudioStoreError("REVISION_CONFLICT", "The saved snapshot changed during inspection. Reload before inspecting again.");
      result = response({ ok: true, result: {
        projects: input ? repository.listProjects() : repository.listProjectsForReview(), snapshot, executionPolicy: DEFAULT_EXTERNAL_EXECUTION_POLICY,
        ...(review ? { mediaAvailability: review.mediaAvailability } : {}),
        estimateViews: snapshot ? projectEstimateViews(snapshot, repository) : [],
        estimateExecution: { mode: options.testOnlyEstimate?.transport.kind === "MOCK" ? "TEST_ONLY_MOCK" : "UNAVAILABLE", liveExecutionAllowed: false },
        ...(dryRun ? { dryRun } : {}), ...(generationPlan ? { generationPlan } : {}),
        ...(input?.action === "execute-estimate" ? { executionOutcome: executionTracker.snapshot() } : {}),
      } });
    } catch (error) { executionTracker.localFailure(); result = await failure(error, estimateExecutionRequested ? executionTracker.snapshot() : undefined); }
    finally { if (repository) { try { repository.close(); } catch (error) { if (!result || result.status < 400) { executionTracker.localFailure(); result = await failure(error, estimateExecutionRequested ? executionTracker.snapshot() : undefined); } } } }
    return result ?? failure(null, estimateExecutionRequested ? executionTracker.snapshot() : undefined);
  };
}
