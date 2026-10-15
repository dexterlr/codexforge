import "server-only";
import {
  HiggsfieldContractError, normalizeHiggsfieldUpload, validateHiggsfieldLifecycleUrl, validateHiggsfieldMediaUrl,
  type HiggsfieldPreparedRequest, type HiggsfieldUpload,
} from "./higgsfield-contract.server";

export interface HiggsfieldTransportResponse { status: number; headers: Record<string, string>; body: unknown }
export interface HiggsfieldDownloadedMedia { bytes: Uint8Array; contentType: string }
/** Injection seam, not execution authority. Production never receives a network-capable implementation in this phase. */
export interface HiggsfieldTransport {
  readonly kind: "MOCK" | "BLOCKED_REAL" | "LIVE_ESTIMATE";
  submit(request: HiggsfieldPreparedRequest, options?: { signal: AbortSignal }): Promise<HiggsfieldTransportResponse>;
  status(statusUrl: string, options?: { signal: AbortSignal }): Promise<HiggsfieldTransportResponse>;
  cancel(cancelUrl: string): Promise<HiggsfieldTransportResponse>;
  estimate(request: HiggsfieldPreparedRequest, options?: { signal: AbortSignal; authority?: object; onTransportEntered?: () => void }): Promise<HiggsfieldTransportResponse>;
  createUpload(contentType: string): Promise<HiggsfieldTransportResponse>;
  upload(descriptor: HiggsfieldUpload, bytes: Uint8Array): Promise<void>;
  download(mediaUrl: string): Promise<HiggsfieldDownloadedMedia>;
}
export class HiggsfieldTransportError extends Error {
  readonly httpStatus: number | null;
  readonly transmitted: boolean;
  constructor(httpStatus: number | null = null, transmitted = true) {
    super("HIGGSFIELD_TRANSPORT_FAILED"); this.name = "HiggsfieldTransportError";
    this.httpStatus = httpStatus; this.transmitted = transmitted;
  }
}
function disabled(): never { throw new Error("LIVE_HIGGSFIELD_OPERATION_DISABLED"); }
/** No SDK, fetch, network modules or environment reads are reachable. Caller policy cannot unlock it. */
export class DisabledHiggsfieldTransport implements HiggsfieldTransport {
  readonly kind = "BLOCKED_REAL" as const;
  async submit(): Promise<HiggsfieldTransportResponse> { return disabled(); }
  async status(): Promise<HiggsfieldTransportResponse> { return disabled(); }
  async cancel(): Promise<HiggsfieldTransportResponse> { return disabled(); }
  async estimate(): Promise<HiggsfieldTransportResponse> { return disabled(); }
  async createUpload(): Promise<HiggsfieldTransportResponse> { return disabled(); }
  async upload(): Promise<void> { return disabled(); }
  async download(): Promise<HiggsfieldDownloadedMedia> { return disabled(); }
}
export interface HiggsfieldRetryPolicy { maxAttempts: number; totalDeadlineMs: number; baseDelayMs: number; maxDelayMs: number }
export interface HiggsfieldRetryClock { now(): number; sleep(ms: number): Promise<void>; random(): number }
async function statusBeforeDeadline(transport: HiggsfieldTransport, url: string, remainingMs: number): Promise<HiggsfieldTransportResponse> {
  const controller = new AbortController(); let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      Promise.resolve().then(() => transport.status(url, { signal: controller.signal })),
      new Promise<never>((_, reject) => { timeout = setTimeout(() => { controller.abort(); reject(new Error("HIGGSFIELD_STATUS_DEADLINE_EXCEEDED")); }, remainingMs); }),
    ]);
  } finally { if (timeout !== undefined) clearTimeout(timeout); }
}
/** Retries apply only to status GET. An independent aborting timer also bounds each in-flight request. */
export async function retryHiggsfieldStatus(transport: HiggsfieldTransport, statusUrl: string, policy: HiggsfieldRetryPolicy, clock: HiggsfieldRetryClock): Promise<HiggsfieldTransportResponse> {
  if (transport.kind !== "MOCK") return disabled();
  if (!Number.isSafeInteger(policy.maxAttempts) || policy.maxAttempts < 1 || policy.maxAttempts > 10 || !Number.isSafeInteger(policy.totalDeadlineMs) || policy.totalDeadlineMs < 1 || policy.totalDeadlineMs > 120000 || !Number.isSafeInteger(policy.baseDelayMs) || policy.baseDelayMs < 1 || !Number.isSafeInteger(policy.maxDelayMs) || policy.maxDelayMs < policy.baseDelayMs || policy.maxDelayMs > 10000) throw new HiggsfieldContractError("HIGGSFIELD_RETRY_POLICY_REJECTED");
  const requestId = new URL(statusUrl).pathname.split("/")[2];
  validateHiggsfieldLifecycleUrl(statusUrl, requestId, "status");
  const start = clock.now(), realStart = performance.now(); if (!Number.isFinite(start)) throw new HiggsfieldContractError("HIGGSFIELD_RETRY_CLOCK_REJECTED");
  let previous = start;
  for (let attempt = 0; attempt < policy.maxAttempts; attempt++) {
    const now = clock.now();
    if (!Number.isFinite(now) || now < previous || now - start >= policy.totalDeadlineMs || performance.now() - realStart >= policy.totalDeadlineMs) throw new Error("HIGGSFIELD_STATUS_DEADLINE_EXCEEDED");
    previous = now;
    let failure: HiggsfieldTransportError;
    try {
      const remaining = Math.min(policy.totalDeadlineMs - (now - start), policy.totalDeadlineMs - (performance.now() - realStart));
      const response = await statusBeforeDeadline(transport, statusUrl, Math.max(1, remaining));
      if (!Number.isInteger(response.status) || (response.status !== 200 && (response.status < 400 || response.status > 599))) throw new Error("HIGGSFIELD_HTTP_RESPONSE_REJECTED");
      if (response.status < 500 || response.status > 599) return response;
      failure = new HiggsfieldTransportError(response.status, false);
    } catch (error) {
      if (!(error instanceof HiggsfieldTransportError) || (error.httpStatus !== null && (error.httpStatus < 500 || error.httpStatus > 599))) throw error;
      failure = error;
    }
    if (attempt + 1 === policy.maxAttempts) throw failure;
    const jitter = clock.random();
    if (!Number.isFinite(jitter) || jitter < 0 || jitter >= 1) throw new HiggsfieldContractError("HIGGSFIELD_RETRY_JITTER_REJECTED");
    const delay = Math.min(policy.maxDelayMs, policy.baseDelayMs * (2 ** attempt)) * (0.75 + jitter * 0.25);
    const after = clock.now();
    if (!Number.isFinite(after) || after < previous || after + delay - start >= policy.totalDeadlineMs || performance.now() - realStart + delay >= policy.totalDeadlineMs) throw failure;
    previous = after;
    await clock.sleep(delay);
  }
  throw new HiggsfieldTransportError(null, false);
}

function approvedOrigin(url: string, allowedOrigins: readonly string[]): string {
  const parsed = new URL(url);
  if (!Array.isArray(allowedOrigins) || allowedOrigins.length > 16 || !allowedOrigins.some(origin => origin === parsed.origin && new URL(origin).href === `${origin}/`)) throw new HiggsfieldContractError("HIGGSFIELD_STORAGE_ORIGIN_NOT_APPROVED");
  return url;
}
/** Storage transfer envelope has no API credential argument, Authorization or cookie header. Never log presigned URLs. */
export function prepareHiggsfieldUploadPut(descriptor: HiggsfieldUpload, bytes: Uint8Array, approvedStorageOrigins: readonly string[]) {
  const normalized = normalizeHiggsfieldUpload({ public_url: descriptor.publicUrl, upload_url: descriptor.uploadUrl, content_type: descriptor.contentType, upload_headers: descriptor.headers });
  if (!(bytes instanceof Uint8Array) || bytes.byteLength < 1 || bytes.byteLength > 16 * 1024 * 1024) throw new HiggsfieldContractError("HIGGSFIELD_UPLOAD_BYTES_REJECTED");
  return { method: "PUT" as const, url: approvedOrigin(normalized.uploadUrl, approvedStorageOrigins), headers: { ...normalized.headers }, bytes: Uint8Array.from(bytes), credentials: "omit" as const, redirect: "error" as const };
}
/** A provider-returned URI is not sufficient authority to contact arbitrary storage. No downloader is enabled here. */
export function prepareHiggsfieldMediaGet(url: string, approvedMediaOrigins: readonly string[]) {
  return { method: "GET" as const, url: approvedOrigin(validateHiggsfieldMediaUrl(url), approvedMediaOrigins), headers: {} as Record<string, string>, credentials: "omit" as const, redirect: "error" as const };
}
