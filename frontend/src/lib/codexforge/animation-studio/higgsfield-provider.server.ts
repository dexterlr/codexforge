import "server-only";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { AdapterResult, Job, StudioId } from "./domain";
import { StudioStoreError, type StudioRepository } from "./store.server";
import { readProviderIntent } from "./higgsfield-intent";
import {
  normalizeHiggsfieldEstimate, normalizeHiggsfieldError, normalizeHiggsfieldStatus, normalizeHiggsfieldUpload,
  validateHiggsfieldRequest, extractHiggsfieldRequestId, type HiggsfieldPreparedRequest,
} from "./higgsfield-contract.server";
import {
  HiggsfieldTransportError, prepareHiggsfieldMediaGet, prepareHiggsfieldUploadPut, retryHiggsfieldStatus,
  type HiggsfieldTransport, type HiggsfieldTransportResponse, type HiggsfieldRetryClock, type HiggsfieldRetryPolicy,
} from "./higgsfield-transport.server";

export interface HiggsfieldManagedDependencies {
  repository: StudioRepository; transport: HiggsfieldTransport; actor: string; now(): string; submissionTimeoutMs?: number;
}
function assertMock(transport: HiggsfieldTransport): void {
  if (transport.kind !== "MOCK") throw new Error("LIVE_HIGGSFIELD_OPERATION_DISABLED");
}
function job(deps: HiggsfieldManagedDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">): Job {
  const found = deps.repository.load(projectId).jobs.find(item => item.jobId === jobId);
  if (!found) throw new StudioStoreError("MISSING_JOB", "Saved managed job was not found.");
  readProviderIntent(found); return found;
}
function result(current: Job, reason: string): AdapterResult {
  return {
    status: current.state === "SUCCEEDED" ? "SUCCEEDED" : ["FAILED", "CANCELLED"].includes(current.state) ? "FAILED" : "WAITING_EXTERNAL",
    outputs: current.outputs, adapterMetadata: current.adapterMetadata, reasons: ["MOCK_ONLY_NO_PROVIDER_REQUEST", reason],
  };
}
function derivedKey(key: string, outcome: string): string { return `higgsfield-${digest({ key, outcome })}`; }
export class HiggsfieldPublicationError extends Error {
  readonly primaryCode: string;
  readonly observedRequestId: string | null;
  constructor(primaryCode: string, observedRequestId: string | null) {
    super(`${primaryCode}; PROVIDER_STATE_PUBLICATION_FAILED; RECONCILIATION_REQUIRED`);
    this.name = "HiggsfieldPublicationError"; this.primaryCode = primaryCode; this.observedRequestId = observedRequestId;
  }
}
function publishUnknown(deps: HiggsfieldManagedDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, token: string, key: string, primaryCode: string, observedRequestId: string | null = null): AdapterResult {
  try { deps.repository.recordProviderUnknown(projectId, jobId, token, derivedKey(key, "unknown"), deps.actor, deps.now(), observedRequestId); }
  catch {
    try { const current = job(deps, projectId, jobId); if (readProviderIntent(current).phase === "SUBMISSION_STATE_UNKNOWN") return result(current, primaryCode); } catch { /* Durable start still forbids a second POST; never expose raw publication failures. */ }
    throw new HiggsfieldPublicationError(primaryCode, observedRequestId);
  }
  return result(job(deps, projectId, jobId), primaryCode);
}
async function submitOnce(deps: HiggsfieldManagedDependencies, request: HiggsfieldPreparedRequest, timeoutMs: number): Promise<HiggsfieldTransportResponse> {
  const controller = new AbortController(); let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      Promise.resolve().then(() => deps.transport.submit(request, { signal: controller.signal })),
      new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new HiggsfieldTransportError(null, true)); }, timeoutMs); }),
    ]);
  } finally { if (timer !== undefined) clearTimeout(timer); }
}
function expected(response: HiggsfieldTransportResponse, status = 200): void {
  if (response.status !== status) {
    if (Number.isInteger(response.status) && response.status >= 400 && response.status <= 599) throw new HiggsfieldTransportError(response.status);
    throw new Error("HIGGSFIELD_RESPONSE_STATUS_REJECTED");
  }
}
/** No approval, authorization or job is created by an estimate; callers must persist the exact result separately. */
export async function estimateHiggsfieldMock(deps: HiggsfieldManagedDependencies, request: HiggsfieldPreparedRequest) {
  assertMock(deps.transport);
  const clean = validateHiggsfieldRequest(request), response = await deps.transport.estimate(clean);
  expected(response); return normalizeHiggsfieldEstimate(response.body, clean.requestDigest);
}
/** The only mock submission path: authoritative store claim first, one POST, durable acceptance or unknown outcome. */
export async function submitHiggsfieldMock(deps: HiggsfieldManagedDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string): Promise<AdapterResult> {
  assertMock(deps.transport);
  const timeoutMs = deps.submissionTimeoutMs ?? 30000;
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 120000) throw new Error("HIGGSFIELD_SUBMISSION_DEADLINE_REJECTED");
  const acquired = deps.repository.acquireProviderSubmission(projectId, jobId, key, deps.actor, deps.now());
  if (!acquired.acquired || !acquired.token) return { status: "BLOCKED", outputs: [], adapterMetadata: null, reasons: ["MOCK_ONLY_NO_PROVIDER_REQUEST", acquired.reason] };
  const intent = readProviderIntent(acquired.job);
  let response: HiggsfieldTransportResponse;
  try {
    response = await submitOnce(deps, intent.request, timeoutMs); // One POST; no retry, subscribe, polling or hidden fallback.
    expected(response);
  } catch (error) {
    const normalized = normalizeHiggsfieldError(error instanceof HiggsfieldTransportError ? error.httpStatus : null, "SUBMIT", true);
    if (normalized.submissionUnknown) return publishUnknown(deps, projectId, jobId, acquired.token, key, normalized.code);
    try { deps.repository.recordProviderFailure(projectId, jobId, acquired.token, "EXPLICIT_SUBMISSION_REJECTED", derivedKey(key, "rejected"), deps.actor, deps.now()); }
    catch {
      try { const current = job(deps, projectId, jobId); if (readProviderIntent(current).phase === "FAILED") return result(current, normalized.code); } catch { /* Preserve normalized primary error, not a raw secret-bearing transport error. */ }
      throw new HiggsfieldPublicationError(normalized.code, null);
    }
    return result(job(deps, projectId, jobId), normalized.code);
  }
  let status;
  try { status = normalizeHiggsfieldStatus(response.body, response.headers); }
  catch {
    return publishUnknown(deps, projectId, jobId, acquired.token, key, "SUBMISSION_STATE_UNKNOWN", extractHiggsfieldRequestId(response.body));
  }
  // Publication failure is NOT a failed provider POST and must never call submit again.
  try { deps.repository.recordProviderAcceptance(projectId, jobId, acquired.token, status, derivedKey(key, "accepted"), deps.actor, deps.now()); }
  catch {
    try { const current = job(deps, projectId, jobId); if (readProviderIntent(current).providerStatus?.requestId === status.requestId) return result(current, "MOCK_ACCEPTANCE_ALREADY_PERSISTED"); } catch { /* Reconciliation remains mandatory when publication cannot be read. */ }
    return publishUnknown(deps, projectId, jobId, acquired.token, key, "ACCEPTANCE_PUBLICATION_FAILED", status.requestId);
  }
  return result(job(deps, projectId, jobId), "MOCK_ACCEPTANCE_PERSISTED");
}
export async function pollHiggsfieldMock(
  deps: HiggsfieldManagedDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string,
  policy: HiggsfieldRetryPolicy, clock: HiggsfieldRetryClock,
): Promise<AdapterResult> {
  assertMock(deps.transport);
  const current = job(deps, projectId, jobId), intent = readProviderIntent(current);
  if (!intent.submissionToken || !intent.providerStatus?.statusUrl || !["queued", "in_progress"].includes(intent.providerStatus.status)) throw new Error("NO_POLLABLE_PROVIDER_REQUEST");
  const response = await retryHiggsfieldStatus(deps.transport, intent.providerStatus.statusUrl, policy, clock);
  expected(response);
  const normalized = normalizeHiggsfieldStatus(response.body, response.headers, intent.providerStatus.requestId);
  // Optional omitted fields do not erase already trusted acceptance metadata.
  const status = { ...normalized, statusUrl: normalized.statusUrl ?? intent.providerStatus.statusUrl, cancelUrl: normalized.cancelUrl ?? intent.providerStatus.cancelUrl, correlationId: normalized.correlationId ?? intent.providerStatus.correlationId };
  deps.repository.recordProviderStatus(projectId, jobId, intent.submissionToken, status, key, deps.actor, deps.now());
  return result(job(deps, projectId, jobId), "MOCK_STATUS_PERSISTED");
}
export async function cancelHiggsfieldMock(deps: HiggsfieldManagedDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string) {
  assertMock(deps.transport);
  const current = job(deps, projectId, jobId), intent = readProviderIntent(current);
  if (!intent.submissionToken || !intent.providerStatus?.cancelUrl || !["queued", "in_progress"].includes(intent.providerStatus.status)) throw new Error("NO_CANCELABLE_PROVIDER_REQUEST");
  let response: HiggsfieldTransportResponse;
  try { response = await deps.transport.cancel(intent.providerStatus.cancelUrl); }
  catch (error) { if (error instanceof HiggsfieldTransportError && error.httpStatus === 400) return { canceled: false, reason: "PROVIDER_CANCELLATION_REJECTED" }; throw error; }
  if (response.status === 400) return { canceled: false, reason: "PROVIDER_CANCELLATION_REJECTED" };
  expected(response, 202);
  if (response.body !== null && response.body !== "") throw new Error("HIGGSFIELD_CANCEL_BODY_REJECTED");
  const normalized = normalizeHiggsfieldStatus({
    request_id: intent.providerStatus.requestId, status: "canceled",
    ...(intent.providerStatus.statusUrl ? { status_url: intent.providerStatus.statusUrl } : {}), cancel_url: intent.providerStatus.cancelUrl,
  }, response.headers);
  const canceled = { ...normalized, correlationId: normalized.correlationId ?? intent.providerStatus.correlationId };
  deps.repository.recordProviderCancel(projectId, jobId, intent.submissionToken, canceled, key, deps.actor, deps.now());
  return { canceled: true, reason: "MOCK_QUEUED_CANCELLATION_PERSISTED" };
}
export async function ingestHiggsfieldMock(deps: HiggsfieldManagedDependencies, projectId: StudioId<"project">, jobId: StudioId<"job">, key: string, approvedMediaOrigins: readonly string[]) {
  assertMock(deps.transport);
  const current = job(deps, projectId, jobId), intent = readProviderIntent(current);
  if (!intent.submissionToken || intent.providerStatus?.status !== "completed" || !intent.providerStatus.videoUrl) throw new Error("NO_COMPLETED_PROVIDER_MEDIA");
  const transfer = prepareHiggsfieldMediaGet(intent.providerStatus.videoUrl, approvedMediaOrigins);
  const media = await deps.transport.download(transfer.url);
  return deps.repository.ingestProviderOutput(projectId, jobId, intent.submissionToken, { ...media, temporaryUrl: transfer.url }, key, deps.actor, deps.now());
}
export async function uploadHiggsfieldMock(transport: HiggsfieldTransport, contentType: string, bytes: Uint8Array, approvedStorageOrigins: readonly string[]) {
  assertMock(transport);
  const response = await transport.createUpload(contentType); expected(response);
  const descriptor = normalizeHiggsfieldUpload(response.body);
  if (descriptor.contentType !== contentType) throw new Error("HIGGSFIELD_UPLOAD_CONTENT_TYPE_MISMATCH");
  const put = prepareHiggsfieldUploadPut(descriptor, bytes, approvedStorageOrigins);
  await transport.upload({ ...descriptor, headers: put.headers }, put.bytes);
  return { publicUrl: descriptor.publicUrl, contentType: descriptor.contentType }; // Presigned upload token never returned to the operator.
}
