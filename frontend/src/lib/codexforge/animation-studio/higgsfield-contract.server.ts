import "server-only";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { JsonObject, ShotManifest, StudioId } from "./domain";
import { validateJsonObject, validateShotManifest } from "./validation";
import { assertStudioId } from "./workspace";

/** Official documentation, not account availability, credentials or execution authority. */
export const HIGGSFIELD_CONTRACT = Object.freeze({
  provider: "HIGGSFIELD" as const,
  documentation: "https://docs.higgsfield.ai/docs/openapi.json",
  documentationSha256: "374f308d7093cb2025b3df73ea857e0d432d993d7be96779584b2e8a6e343c55",
  integrationSurface: "OFFICIAL_API_FOUND" as const,
  sdk: "NOT_INSTALLED_IN_APPLICATION" as const,
  transport: "DOCUMENTED_REST_DISABLED" as const,
  apiOrigin: "https://api.higgsfield.ai",
  model: "bytedance/seedance/v1/lite" as const,
  endpoint: "/bytedance/seedance/v1/lite/text-to-video" as const,
  mode: "TEXT_TO_VIDEO" as const,
  credentialEnvironmentName: "HF_CREDENTIALS",
  minimumDuration: 2, maximumDuration: 12,
  maxAttempts: 1, automaticSubmissionRetries: 0,
  providerIdempotencySupported: false,
  outputConstraints: "FPS, exact pixel grid, file size and audio behavior are not guaranteed by this endpoint schema.",
});
const RESOLUTIONS = ["480", "720", "1080"] as const;
const ASPECTS = ["16:9", "9:16", "4:3", "3:4", "1:1", "21:9"] as const;
const STATES = ["queued", "in_progress", "completed", "failed", "nsfw", "canceled"] as const;
export type HiggsfieldProviderState = typeof STATES[number];
export type HiggsfieldInput = {
  prompt: string; duration: number; resolution: typeof RESOLUTIONS[number];
  aspect_ratio: typeof ASPECTS[number]; camera_fixed: boolean;
};
export interface HiggsfieldPreparedRequest {
  schemaVersion: 1; provider: "HIGGSFIELD"; model: "bytedance/seedance/v1/lite";
  endpoint: "/bytedance/seedance/v1/lite/text-to-video"; mode: "TEXT_TO_VIDEO";
  projectId: StudioId<"project">; sequenceId: StudioId<"sequence">; shotId: StudioId<"shot">; shotRevision: number;
  input: HiggsfieldInput; requestDigest: string;
}
export interface HiggsfieldEstimate { requestDigest: string; credits: string; usd: string }
export interface HiggsfieldStatus {
  requestId: string; status: HiggsfieldProviderState; statusUrl: string | null; cancelUrl: string | null;
  correlationId: string | null; videoUrl: string | null; errorCode: string | null;
}
export interface HiggsfieldUpload {
  publicUrl: string; uploadUrl: string; contentType: string; headers: Record<string, string>;
}
export class HiggsfieldContractError extends Error {
  readonly code: string;
  constructor(code = "HIGGSFIELD_CONTRACT_REJECTED") { super(code); this.name = "HiggsfieldContractError"; this.code = code; }
}
function reject(code?: string): never { throw new HiggsfieldContractError(code); }
function plain(value: unknown): JsonObject {
  try { return validateJsonObject(value); } catch { return reject(); }
}
function exact(value: JsonObject, fields: readonly string[]): void {
  if (Object.keys(value).sort().join("|") !== [...fields].sort().join("|")) reject();
}
function hash(value: unknown): string {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) reject();
  return value;
}
function text(value: unknown, maximum = 2000): string {
  if (typeof value !== "string" || value.length < 1 || value.length > maximum || !value.trim() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) reject();
  return value;
}
function uuid(value: unknown): string {
  if (typeof value !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u.test(value)) reject();
  return value;
}
/** Preserve an independently valid provider identity even if other response fields fail validation. */
export function extractHiggsfieldRequestId(value: unknown): string | null {
  try { return uuid(plain(value).request_id); } catch { return null; }
}
function input(value: unknown): HiggsfieldInput {
  const data = plain(value); exact(data, ["prompt", "duration", "resolution", "aspect_ratio", "camera_fixed"]);
  const prompt = text(data.prompt);
  if (!Number.isSafeInteger(data.duration) || Number(data.duration) < 2 || Number(data.duration) > 12 ||
      !RESOLUTIONS.includes(data.resolution as typeof RESOLUTIONS[number]) || !ASPECTS.includes(data.aspect_ratio as typeof ASPECTS[number]) || typeof data.camera_fixed !== "boolean") reject("INCOMPATIBLE_HIGGSFIELD_REQUEST");
  return { prompt, duration: data.duration as number, resolution: data.resolution as HiggsfieldInput["resolution"], aspect_ratio: data.aspect_ratio as HiggsfieldInput["aspect_ratio"], camera_fixed: data.camera_fixed };
}

/** No environment is inspected here. Call only with an explicitly supplied synthetic/local value. */
export function parseHiggsfieldConfiguration(value: unknown) {
  let configuration: "NOT_CONFIGURED" | "LOCALLY_CONFIGURED" | "INVALID_LOCAL_FORMAT" = "INVALID_LOCAL_FORMAT";
  if (value === undefined || value === null || value === "") configuration = "NOT_CONFIGURED";
  else if (typeof value === "string" && /^[^\s:\u0000-\u001f\u007f]{1,512}:[^\s:\u0000-\u001f\u007f]{1,512}$/u.test(value)) configuration = "LOCALLY_CONFIGURED";
  // No values, lengths, prefixes, fragments, headers or credential objects are returned.
  return { configuration, remoteAuthentication: "NOT_VERIFIED" as const, execution: "EXECUTION_DISABLED" as const };
}
/** Explicit server lookup seam. No default environment reader exists and nothing invokes this on import. */
export function readHiggsfieldConfiguration(lookup: (name: "HF_CREDENTIALS") => unknown) {
  try { return parseHiggsfieldConfiguration(lookup("HF_CREDENTIALS")); }
  catch { return parseHiggsfieldConfiguration({}); }
}

/** Same non-secret representation is inspected, estimated and eventually dispatched. */
export function validateHiggsfieldRequest(value: unknown): HiggsfieldPreparedRequest {
  const data = plain(value);
  exact(data, ["schemaVersion", "provider", "model", "endpoint", "mode", "projectId", "sequenceId", "shotId", "shotRevision", "input", "requestDigest"]);
  if (data.schemaVersion !== 1 || data.provider !== HIGGSFIELD_CONTRACT.provider || data.model !== HIGGSFIELD_CONTRACT.model || data.endpoint !== HIGGSFIELD_CONTRACT.endpoint || data.mode !== HIGGSFIELD_CONTRACT.mode || !Number.isSafeInteger(data.shotRevision) || Number(data.shotRevision) < 1) reject();
  try { assertStudioId(data.projectId, "project"); assertStudioId(data.sequenceId, "sequence"); assertStudioId(data.shotId, "shot"); } catch { reject(); }
  const clean = {
    schemaVersion: 1 as const, provider: HIGGSFIELD_CONTRACT.provider, model: HIGGSFIELD_CONTRACT.model,
    endpoint: HIGGSFIELD_CONTRACT.endpoint, mode: HIGGSFIELD_CONTRACT.mode,
    projectId: data.projectId as StudioId<"project">, sequenceId: data.sequenceId as StudioId<"sequence">,
    shotId: data.shotId as StudioId<"shot">, shotRevision: data.shotRevision as number, input: input(data.input),
  };
  if (hash(data.requestDigest) !== digest(clean)) reject("HIGGSFIELD_REQUEST_DIGEST_MISMATCH");
  return { ...clean, requestDigest: data.requestDigest as string };
}
export function buildHiggsfieldRequest(shotInput: ShotManifest, references: unknown = []): HiggsfieldPreparedRequest {
  let shot: ShotManifest;
  try { shot = validateShotManifest(shotInput); } catch { return reject("INCOMPATIBLE_HIGGSFIELD_SHOT"); }
  const refs = plain({ references }).references;
  if (!Array.isArray(refs) || refs.length || shot.sourceReferences.length || shot.inputAssets.length || shot.props.length || shot.audio.length || shot.dialogue.length || shot.characters.length || shot.environment !== null || shot.identityStrictness !== "FLEXIBLE" || shot.generationMethod !== "GENERATIVE") reject("HIGGSFIELD_TEXT_ONLY_INPUT_REQUIRED");
  const aspect = ASPECTS.find(value => {
    const [width, height] = value.split(":").map(Number);
    return shot.aspectRatio.width * height === shot.aspectRatio.height * width && shot.resolution.width * height === shot.resolution.height * width;
  });
  const resolution = String(Math.min(shot.resolution.width, shot.resolution.height));
  if (!aspect || !RESOLUTIONS.includes(resolution as HiggsfieldInput["resolution"]) || !/^(?:static|fixed|locked|none)$/iu.test(shot.camera.movement)) reject("INCOMPATIBLE_HIGGSFIELD_SHOT");
  const clean = {
    schemaVersion: 1 as const, provider: HIGGSFIELD_CONTRACT.provider, model: HIGGSFIELD_CONTRACT.model,
    endpoint: HIGGSFIELD_CONTRACT.endpoint, mode: HIGGSFIELD_CONTRACT.mode,
    projectId: shot.projectId, sequenceId: shot.sequenceId, shotId: shot.shotId, shotRevision: shot.revision,
    input: input({ prompt: shot.description, duration: shot.duration, resolution, aspect_ratio: aspect, camera_fixed: true }),
  };
  return validateHiggsfieldRequest({ ...clean, requestDigest: digest(clean) });
}

function publicUrl(value: unknown, allowQuery: boolean): string {
  const original = text(value, 4096); let url: URL;
  try { url = new URL(original); } catch { return reject("HIGGSFIELD_URL_REJECTED"); }
  if (url.protocol !== "https:" || url.username || url.password || url.hash || url.port || (!allowQuery && url.search) || url.href !== original ||
      !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/u.test(url.hostname) ||
      /(?:^|\.)(?:localhost|local|internal|invalid|test|onion)$/u.test(url.hostname)) reject("HIGGSFIELD_URL_REJECTED");
  return url.href;
}
/** URL syntax is not an origin allowlist or DNS authorization for media retrieval. */
export function validateHiggsfieldMediaUrl(value: unknown): string { return publicUrl(value, false); }
export function validateHiggsfieldLifecycleUrl(value: unknown, requestId: string, operation: "status" | "cancel"): string {
  const actualId = uuid(requestId), original = publicUrl(value, false), url = new URL(original);
  if (url.origin !== HIGGSFIELD_CONTRACT.apiOrigin || url.pathname !== `/requests/${actualId}/${operation}`) reject("HIGGSFIELD_LIFECYCLE_URL_REJECTED");
  return original;
}
function correlation(headers: unknown): string | null {
  const source = plain(headers), keys = Object.keys(source).filter(key => key.toLowerCase() === "x-correlation-id");
  if (!keys.length) return null;
  if (keys.length !== 1 || typeof source[keys[0]] !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u.test(source[keys[0]] as string)) reject("HIGGSFIELD_CORRELATION_REJECTED");
  return source[keys[0]] as string;
}
export function normalizeHiggsfieldStatus(value: unknown, headers: unknown = {}, expectedRequestId?: string): HiggsfieldStatus {
  const data = plain(value), requestId = uuid(data.request_id);
  if (expectedRequestId !== undefined && requestId !== uuid(expectedRequestId)) reject("HIGGSFIELD_REQUEST_ID_MISMATCH");
  if (!STATES.includes(data.status as HiggsfieldProviderState)) reject("HIGGSFIELD_STATUS_REJECTED");
  let videoUrl: string | null = null;
  if (data.video !== undefined) { const video = plain(data.video); exact(video, ["url"]); videoUrl = validateHiggsfieldMediaUrl(video.url); }
  return {
    requestId, status: data.status as HiggsfieldProviderState,
    statusUrl: data.status_url === undefined ? null : validateHiggsfieldLifecycleUrl(data.status_url, requestId, "status"),
    cancelUrl: data.cancel_url === undefined ? null : validateHiggsfieldLifecycleUrl(data.cancel_url, requestId, "cancel"),
    correlationId: correlation(headers), videoUrl,
    errorCode: data.status === "failed" ? "PROVIDER_FAILED" : data.status === "nsfw" ? "CONTENT_MODERATED" : null,
  };
}
export function validateHiggsfieldStatus(value: unknown): HiggsfieldStatus {
  const data = plain(value); exact(data, ["requestId", "status", "statusUrl", "cancelUrl", "correlationId", "videoUrl", "errorCode"]);
  const normalized = normalizeHiggsfieldStatus({ status: data.status, request_id: data.requestId,
    ...(data.statusUrl === null ? {} : { status_url: data.statusUrl }), ...(data.cancelUrl === null ? {} : { cancel_url: data.cancelUrl }),
    ...(data.videoUrl === null ? {} : { video: { url: data.videoUrl } }),
  }, data.correlationId === null ? {} : { "X-Correlation-ID": data.correlationId });
  if (data.errorCode !== normalized.errorCode) reject("HIGGSFIELD_STATUS_REJECTED");
  return normalized;
}
export function normalizeHiggsfieldEstimate(value: unknown, requestDigest: string): HiggsfieldEstimate {
  const data = plain(value); exact(data, ["credits", "usd"]);
  for (const field of ["credits", "usd"]) if (typeof data[field] !== "string" || !/^(?:0|[1-9][0-9]{0,8})(?:\.[0-9]{1,6})?$/u.test(data[field] as string)) reject("HIGGSFIELD_ESTIMATE_REJECTED");
  return { requestDigest: hash(requestDigest), credits: data.credits as string, usd: data.usd as string };
}
export type HiggsfieldOperation = "SUBMIT" | "STATUS" | "CANCEL" | "ESTIMATE" | "UPLOAD" | "DOWNLOAD";
export function normalizeHiggsfieldError(httpStatus: number | null, operation: HiggsfieldOperation, networkFailure = false) {
  if (httpStatus !== null && (!Number.isInteger(httpStatus) || httpStatus < 400 || httpStatus > 599)) reject();
  const permanent = httpStatus !== null && [400, 401, 403, 404, 422].includes(httpStatus);
  return {
    code: operation === "SUBMIT" && !permanent ? "SUBMISSION_STATE_UNKNOWN" : httpStatus === 401 ? "PROVIDER_AUTHENTICATION_REJECTED" : httpStatus === 403 ? "PROVIDER_CREDITS_UNAVAILABLE" : httpStatus === 422 ? "PROVIDER_VALIDATION_REJECTED" : httpStatus === 404 ? "PROVIDER_REQUEST_OR_MODEL_UNAVAILABLE" : operation === "CANCEL" && httpStatus === 400 ? "PROVIDER_CANCELLATION_REJECTED" : "PROVIDER_OPERATION_FAILED",
    httpStatus, retryable: operation === "STATUS" && (httpStatus === null ? networkFailure : httpStatus >= 500),
    submissionUnknown: operation === "SUBMIT" && !permanent,
  };
}

const UPLOAD_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "audio/wav", "audio/x-wav", "video/mp4"];
export function normalizeHiggsfieldUpload(value: unknown): HiggsfieldUpload {
  const data = plain(value); exact(data, ["public_url", "upload_url", "content_type", "upload_headers"]);
  if (typeof data.content_type !== "string" || !UPLOAD_TYPES.includes(data.content_type)) reject("HIGGSFIELD_UPLOAD_REJECTED");
  const rawHeaders = plain(data.upload_headers), headers: Record<string, string> = {}, names = new Set<string>();
  for (const [name, value] of Object.entries(rawHeaders)) {
    const key = name.toLowerCase();
    if (names.has(key) || !["content-type", "x-amz-tagging"].includes(key) || typeof value !== "string" || value.length > 1024 || /[\r\n\u0000]/u.test(value)) reject("HIGGSFIELD_UPLOAD_HEADERS_REJECTED");
    names.add(key); headers[key] = value;
  }
  if (headers["content-type"] !== data.content_type) reject("HIGGSFIELD_UPLOAD_CONTENT_TYPE_MISMATCH");
  return { publicUrl: validateHiggsfieldMediaUrl(data.public_url), uploadUrl: publicUrl(data.upload_url, true), contentType: data.content_type, headers };
}
