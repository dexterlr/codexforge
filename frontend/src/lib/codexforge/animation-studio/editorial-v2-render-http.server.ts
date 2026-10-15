import "server-only";

import type { StudioId } from "./domain";
import { STUDIO_RENDER_PRESET, STUDIO_RENDER_PRESET_ID, type StudioRenderJob, type StudioRenderOutputRef, type StudioRenderReadiness } from "./editorial-v2-render-contract";
import type { StudioRenderLedger } from "./editorial-v2-render-ledger.server";
import type { StudioRenderOutputReader } from "./editorial-v2-render-output-storage.server";
import { assertStudioEditorialV2RenderRequest, OperatorHttpError, studioOperatorFailureResponse } from "./operator-http.server";
import { parseStudioJson } from "./store.server";

const LIMIT = 32_768;
const ACTOR = "local-studio-editorial-v2-render-operator";
const HEADERS = { "Cache-Control": "no-store", "Content-Security-Policy": "default-src 'none'; sandbox", "X-Content-Type-Options": "nosniff" };
const HASH = /^[a-f0-9]{64}$/u;
const reply = (value: unknown, status = 200) => Response.json(value, { status, headers: HEADERS });

export interface StudioRenderRepositoryInspection {
  projectId: StudioId<"project">;
  compositionId: string;
  headDigest: string;
  revision: number;
  compositionRevision: number;
  readiness: StudioRenderReadiness;
  ledger: StudioRenderLedger | null;
}
export interface StudioRenderHttpRepository {
  inspectEditorialV2Render(projectId: StudioId<"project">, compositionId: string, expectedHeadDigest: string): StudioRenderRepositoryInspection;
  startEditorialV2Render(input: StudioRenderStartRequest, key: string, actor: string): { inspection: StudioRenderRepositoryInspection; jobId: StudioId<"job">; replayed: boolean };
  cancelEditorialV2Render(input: StudioRenderCancelRequest, key: string, actor: string): Promise<{ inspection: StudioRenderRepositoryInspection; replayed: boolean }>;
  executeEditorialV2Render(projectId: StudioId<"project">, jobId: StudioId<"job">): Promise<void>;
  openEditorialV2RenderOutput(input: { projectId: StudioId<"project">; assetId: StudioId<"asset">; version: number; contentHash: string }): { output: StudioRenderOutputRef; reader: StudioRenderOutputReader };
  close(): void;
}
export interface StudioRenderStartRequest { operation: "START_RENDER"; projectId: StudioId<"project">; compositionId: string; expectedHeadDigest: string; expectedRevision: number; expectedCompositionRevision: number; presetId: typeof STUDIO_RENDER_PRESET_ID; requestedAt: string }
export interface StudioRenderCancelRequest { operation: "CANCEL_RENDER"; projectId: StudioId<"project">; compositionId: string; jobId: StudioId<"job">; expectedLedgerRevision: number; requestedAt: string }

const invalid = (message = "Use the exact saved render request fields and values."): never => { throw new OperatorHttpError(400, "render_invalid_request", message); };
const object = (value: unknown): Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : invalid();
function exact(value: Record<string, unknown>, keys: readonly string[]): void { if (Object.keys(value).sort().join() !== [...keys].sort().join()) invalid("Unknown or missing render fields are not accepted."); }
function id<K extends "project" | "job">(value: unknown, kind: K): StudioId<K> { if (typeof value !== "string" || value.length > 128 || !new RegExp(`^${kind}_[a-z0-9]+(?:_[a-z0-9]+)*$`, "u").test(value)) return invalid(); return value as StudioId<K>; }
function composition(value: unknown): string { if (typeof value !== "string" || value.length > 128 || !/^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(value)) return invalid(); return value; }
function hash(value: unknown): string { if (typeof value !== "string" || !HASH.test(value)) return invalid(); return value; }
function revision(value: unknown, allowZero = false): number { if (!Number.isSafeInteger(value) || Number(value) < (allowZero ? 0 : 1)) return invalid(); return Number(value); }
function timestamp(value: unknown): string { if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) return invalid(); return value; }
function parseAction(value: unknown): StudioRenderStartRequest | StudioRenderCancelRequest {
  const body = object(value);
  if (body.operation === "START_RENDER") {
    exact(body, ["operation", "projectId", "compositionId", "expectedHeadDigest", "expectedRevision", "expectedCompositionRevision", "presetId", "requestedAt"]);
    if (body.presetId !== STUDIO_RENDER_PRESET_ID) invalid("Only the fixed 720p25 local trailer preset is accepted.");
    return { operation: "START_RENDER", projectId: id(body.projectId, "project"), compositionId: composition(body.compositionId), expectedHeadDigest: hash(body.expectedHeadDigest), expectedRevision: revision(body.expectedRevision), expectedCompositionRevision: revision(body.expectedCompositionRevision), presetId: STUDIO_RENDER_PRESET_ID, requestedAt: timestamp(body.requestedAt) };
  }
  if (body.operation === "CANCEL_RENDER") {
    exact(body, ["operation", "projectId", "compositionId", "jobId", "expectedLedgerRevision", "requestedAt"]);
    return { operation: "CANCEL_RENDER", projectId: id(body.projectId, "project"), compositionId: composition(body.compositionId), jobId: id(body.jobId, "job"), expectedLedgerRevision: revision(body.expectedLedgerRevision), requestedAt: timestamp(body.requestedAt) };
  }
  return invalid("Only explicit start and cancel render operations are accepted.");
}
async function readBody(request: Request): Promise<StudioRenderStartRequest | StudioRenderCancelRequest> {
  if (!['application/json', 'application/json; charset=utf-8'].includes(request.headers.get("Content-Type")?.toLowerCase() ?? "") || request.headers.has("Content-Encoding")) throw new OperatorHttpError(415, "render_content_type_required", "Send uncompressed UTF-8 JSON.");
  const declared = request.headers.get("Content-Length");
  if (declared !== null && (!/^(?:0|[1-9]\d*)$/u.test(declared) || Number(declared) > LIMIT)) throw new OperatorHttpError(413, "render_body_too_large", "Render control requests are limited to 32768 UTF-8 bytes.");
  if (!request.body || request.signal.aborted) return invalid();
  const reader = request.body.getReader(), chunks: Uint8Array[] = []; let total = 0, timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => { void reader.cancel().catch(() => undefined); reject(new OperatorHttpError(408, "render_body_timeout", "The render request body did not finish within five seconds.")); }, 5_000); });
  try {
    while (true) { const part = await Promise.race([reader.read(), timeout]); if (part.done) break; total += part.value.byteLength; if (total > LIMIT) { void reader.cancel().catch(() => undefined); throw new OperatorHttpError(413, "render_body_too_large", "Render control requests are limited to 32768 UTF-8 bytes."); } chunks.push(part.value); }
    if (request.signal.aborted || (declared !== null && Number(declared) !== total)) return invalid();
    const bytes = new Uint8Array(total); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    try { return parseAction(parseStudioJson(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes))); } catch (error) { if (error instanceof OperatorHttpError) throw error; return invalid(); }
  } finally { if (timer) clearTimeout(timer); reader.releaseLock(); }
}
function view(inspection: StudioRenderRepositoryInspection) {
  const output = (value: StudioRenderOutputRef) => {
    const query = `projectId=${encodeURIComponent(inspection.projectId)}&assetId=${encodeURIComponent(value.assetId)}&version=${value.version}&contentHash=${value.contentHash}`;
    const base = "/api/codexforge/animation-studio/editorial-v2/render/output?" + query;
    return { assetId: value.assetId, version: value.version, jobId: value.jobId, headDigest: value.headDigest, contentHash: value.contentHash, byteLength: value.byteLength, createdAt: value.createdAt, video: value.video, audio: value.audio, ...(value.audioMixValidation ? { audioMixValidation: value.audioMixValidation } : {}), playbackUrl: `${base}&disposition=inline`, downloadUrl: `${base}&disposition=attachment` };
  };
  const job = (value: StudioRenderJob) => ({ jobId: value.jobId, state: value.state, specDigest: value.specDigest, sourceHeadDigest: value.sourceHeadDigest, sourceRevision: value.sourceRevision, compositionRevision: value.compositionRevision, targetVersion: value.targetVersion, progress: value.progress, createdAt: value.createdAt, startedAt: value.startedAt, finishedAt: value.finishedAt, error: value.error, output: value.output ? output(value.output) : null });
  const timing = inspection.readiness.timing ?? { duration: STUDIO_RENDER_PRESET.duration, expectedFrames: STUDIO_RENDER_PRESET.expectedFrames, expectedAudioSamples: 1_440_000, qualifiedMinimumDuration: { numerator: 1, denominator: 25 }, qualifiedMaximumDuration: { numerator: 300, denominator: 1 } };
  const preset = { presetId: STUDIO_RENDER_PRESET.presetId, width: STUDIO_RENDER_PRESET.width, height: STUDIO_RENDER_PRESET.height, frameRate: STUDIO_RENDER_PRESET.frameRate, duration: timing.duration, expectedFrames: timing.expectedFrames, videoCodec: STUDIO_RENDER_PRESET.videoCodec, audioCodec: STUDIO_RENDER_PRESET.audioCodec, sampleRate: STUDIO_RENDER_PRESET.sampleRate, expectedAudioSamples: timing.expectedAudioSamples, channels: STUDIO_RENDER_PRESET.channels, qualifiedDurationRange: { minimum: timing.qualifiedMinimumDuration, maximum: timing.qualifiedMaximumDuration } };
  const selectedJobs = (inspection.ledger?.jobs ?? []).filter(value => value.compositionId === inspection.compositionId), selectedJobIds = new Set(selectedJobs.map(value => value.jobId));
  return { projectId: inspection.projectId, compositionId: inspection.compositionId, current: { headDigest: inspection.headDigest, revision: inspection.revision, compositionRevision: inspection.compositionRevision }, preset, readiness: inspection.readiness, ledgerRevision: inspection.ledger?.revision ?? 0, jobs: selectedJobs.map(job), outputs: (inspection.ledger?.outputs ?? []).filter(value => selectedJobIds.has(value.jobId)).map(output), providerRequests: 0 as const, generationRequests: 0 as const };
}
function renderFailure(error: unknown, admitted: boolean): Response {
  if (!admitted && error instanceof OperatorHttpError) return studioOperatorFailureResponse(error);
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (["RENDER_INVALID", "RENDER_EXECUTION_INVALID", "EDITORIAL_V2_INVALID"].includes(code)) return reply({ ok: false, error: { code: "render_invalid_request", message: "The render request did not match the exact saved composition and qualified duration-aware local preset." } }, 400);
  if (["RENDER_CONFLICT", "EDITORIAL_V2_CONFLICT"].includes(code)) return reply({ ok: false, error: { code: "render_revision_conflict", message: "The saved head, revision or idempotency request changed. Reload the exact saved render state." } }, 409);
  if (code === "RENDER_NOT_CANCELABLE") return reply({ ok: false, error: { code: "render_job_not_cancelable", message: "This render job is already terminal and cannot be cancelled." } }, 409);
  if (code === "RENDER_EXECUTION_BUSY") return reply({ ok: false, error: { code: "render_busy", message: "This exact local render already has a process owner." } }, 409);
  if (code === "RENDER_NOT_READY") return reply({ ok: false, error: { code: "render_not_ready", message: "The selected saved composition is outside the qualified local-render subset." } }, 422);
  if (code === "RENDERER_DISABLED") return reply({ ok: false, error: { code: "renderer_disabled", message: "The exact local renderer is disabled." } }, 503);
  return reply({ ok: false, error: { code: "render_storage_unavailable", message: "The local render ledger, toolchain or output store could not complete this request safely. No provider or generation request was made." } }, 503);
}

const SCHEDULED = new Map<string, Promise<void>>();
function schedule(options: { openRepository: () => StudioRenderHttpRepository }, projectId: StudioId<"project">, jobId: StudioId<"job">): boolean {
  const key = `${projectId}:${jobId}`; if (SCHEDULED.has(key)) return false;
  const promise = Promise.resolve().then(async () => { const repository = options.openRepository(); try { await repository.executeEditorialV2Render(projectId, jobId); } finally { repository.close(); } }).catch(() => undefined).finally(() => { SCHEDULED.delete(key); });
  SCHEDULED.set(key, promise); return true;
}

export function createStudioEditorialV2RenderHandler(options: { enabled: boolean; openRepository: () => StudioRenderHttpRepository; listenerAddresses?: () => readonly string[] | null }): (request: Request) => Promise<Response> {
  return async request => {
    let repository: StudioRenderHttpRepository | undefined, admitted = false;
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "renderer_disabled", "Enable the isolated exact local Studio renderer before using this endpoint.");
      if (!['GET', 'POST'].includes(request.method)) throw new OperatorHttpError(405, "method_not_allowed", "Only explicit local render reads, starts and cancels are supported.");
      const url = assertStudioEditorialV2RenderRequest(request, options.listenerAddresses?.());
      if (request.method === "GET") {
        if (request.body !== null || request.headers.has("Transfer-Encoding") || (request.headers.has("Content-Length") && request.headers.get("Content-Length") !== "0") || [...url.searchParams.keys()].sort().join() !== "compositionId,headDigest,projectId") return invalid();
        admitted = true; repository = options.openRepository();
        const inspection = repository.inspectEditorialV2Render(id(url.searchParams.get("projectId"), "project"), composition(url.searchParams.get("compositionId")), hash(url.searchParams.get("headDigest")));
        return reply({ ok: true, result: view(inspection) });
      }
      if (url.search) return invalid();
      const key = request.headers.get("Idempotency-Key"); if (!key || !/^[a-zA-Z0-9_-]{8,128}$/u.test(key)) return invalid("A safe 8–128 character Idempotency-Key is required.");
      const action = await readBody(request); admitted = true; repository = options.openRepository();
      if (action.operation === "START_RENDER") {
        const started = repository.startEditorialV2Render(action, key, ACTOR), scheduled = !started.replayed && schedule(options, action.projectId, started.jobId);
        return reply({ ok: true, result: view(started.inspection), replayed: started.replayed, scheduled }, started.replayed ? 200 : 202);
      }
      const cancelled = await repository.cancelEditorialV2Render(action, key, ACTOR);
      return reply({ ok: true, result: view(cancelled.inspection), replayed: cancelled.replayed });
    } catch (error) { return renderFailure(error, admitted); }
    finally { if (repository) try { repository.close(); } catch { /* Response already fails closed at the repository boundary. */ } }
  };
}
