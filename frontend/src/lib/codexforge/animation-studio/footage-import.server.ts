import "server-only";

import { spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { closeSync, constants, fsyncSync, lstatSync, mkdirSync, openSync, readSync, realpathSync, rmSync, writeSync } from "node:fs";
import path from "node:path";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import {
  STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, STUDIO_FOOTAGE_MAX_BYTES, STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA,
  type StudioLocalMediaDuration, type StudioLocalMediaKind, type StudioLocalMediaTechnicalMetadata,
} from "./footage-contract";
import { readStudioRenderConfiguration, type StudioRenderConfiguration } from "./editorial-v2-render-config.server";
import type { StudioFootageByteSource } from "./footage-storage.server";

const BODY_DEADLINE_MS = 30_000;
const PROBE_MIN_DEADLINE_MS = 30_000;
const PROBE_SCALE_BYTES = 128 * 1024 * 1024;
const PROBE_SCALE_DEADLINE_MS = 15_000;
const PROBE_MAX_DEADLINE_MS = 270_000;
const PROBE_STDOUT_MAX_BYTES = 2 * 1024 * 1024;
const PROBE_STDERR_MAX_BYTES = 64 * 1024;
const INTEGER = /^(?:0|[1-9]\d*)$/u;

type ImportCode = "MEDIA_TOO_LARGE" | "MEDIA_UPLOAD_CANCELLED" | "MEDIA_UPLOAD_TIMEOUT" | "MEDIA_UPLOAD_INCOMPLETE" |
  "MEDIA_PROBE_UNAVAILABLE" | "MEDIA_STAGING_UNAVAILABLE" | "UNSUPPORTED_MEDIA";

export class StudioMediaImportError extends Error {
  constructor(readonly code: ImportCode, readonly status: 400 | 408 | 413 | 415 | 503, message: string) {
    super(message); this.name = "StudioMediaImportError";
  }
}

export interface StagedStudioMediaImport extends StudioFootageByteSource {
  readonly mediaType: StudioLocalMediaKind;
  readonly contentType: "video/mp4" | "audio/wav";
  readonly technical: StudioLocalMediaTechnicalMetadata;
  close(): void;
}

export type StudioMediaImportReceiver = (request: Request, mediaType: StudioLocalMediaKind) => Promise<StagedStudioMediaImport>;

const fail = (code: ImportCode, status: StudioMediaImportError["status"], message: string): never => { throw new StudioMediaImportError(code, status, message); };
function plain(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && Object.getPrototypeOf(value) === Object.prototype; }
function integer(value: unknown, minimum = 0, maximum = Number.MAX_SAFE_INTEGER): number {
  const parsed = typeof value === "number" ? value : typeof value === "string" && INTEGER.test(value) ? Number(value) : Number.NaN;
  if (!Number.isSafeInteger(parsed) || parsed < minimum || parsed > maximum) return fail("UNSUPPORTED_MEDIA", 415, "The selected media has ambiguous or unsupported timing metadata.");
  return parsed;
}
function divisor(a: number, b: number): number { while (b !== 0) [a, b] = [b, a % b]; return a; }
function rationalFromUnits(units: number, rate: number): StudioLocalMediaDuration {
  const common = divisor(units, rate); return { numerator: units / common, denominator: rate / common };
}
function rationalText(value: unknown): StudioLocalMediaDuration {
  if (typeof value !== "string" || !/^[1-9]\d*\/[1-9]\d*$/u.test(value)) return fail("UNSUPPORTED_MEDIA", 415, "The selected media has no exact supported time base.");
  const [left, right] = value.split("/"), numerator = integer(left, 1, 1_000_000_000), denominator = integer(right, 1, 1_000_000_000);
  if (divisor(numerator, denominator) !== 1) return fail("UNSUPPORTED_MEDIA", 415, "The selected media has a non-canonical time base.");
  return { numerator, denominator };
}
function exactDuration(units: number, rate: number): StudioLocalMediaDuration {
  if (units < 1 || units > rate * 300) return fail("UNSUPPORTED_MEDIA", 415, "The selected media must have a positive duration no longer than 300 seconds.");
  return rationalFromUnits(units, rate);
}
function secureDirectory(workRoot: string): string {
  for (let attempt = 0; attempt < 8; attempt++) {
    const directory = path.join(workRoot, `footage-import-${randomBytes(16).toString("hex")}`);
    let created = false;
    try {
      mkdirSync(directory, { recursive: false, mode: 0o700 });
      created = true;
      const relative = path.relative(workRoot, directory), stat = lstatSync(directory);
      if (!relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || !stat.isDirectory() || stat.isSymbolicLink() || realpathSync.native(directory).toLowerCase() !== directory.toLowerCase()) {
        throw new StudioMediaImportError("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging boundary is unavailable.");
      }
      return directory;
    } catch (error) {
      if (created) try { rmSync(directory, { recursive: true, force: false }); } catch { return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The invalid local media staging boundary could not be cleaned safely."); }
      if ((error as { code?: unknown } | null)?.code !== "EEXIST") return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging boundary is unavailable.");
    }
  }
  return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging boundary is unavailable.");
}
function within(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate); return !!relative && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
function removeStaging(workRoot: string, directory: string): void {
  if (!within(workRoot, directory)) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging boundary could not be cleaned safely.");
  const stat = lstatSync(directory);
  if (!stat.isDirectory() || stat.isSymbolicLink() || realpathSync.native(directory).toLowerCase() !== directory.toLowerCase()) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging boundary could not be cleaned safely.");
  rmSync(directory, { recursive: true, force: false, maxRetries: 2, retryDelay: 50 });
}
function fingerprint(file: string, expectedBytes: number): string {
  const stat = lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size !== expectedBytes || realpathSync.native(file).toLowerCase() !== file.toLowerCase()) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file changed unexpectedly.");
  return [stat.dev, stat.ino, stat.size, stat.mtimeMs, stat.ctimeMs, stat.birthtimeMs].join(":");
}
function assertFingerprint(file: string, expectedBytes: number, expected: string): void {
  if (fingerprint(file, expectedBytes) !== expected) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file changed unexpectedly.");
}
function hashFile(file: string, expectedBytes: number): string {
  const identity = fingerprint(file, expectedBytes), noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0;
  let handle: number | null = null;
  try {
    handle = openSync(file, constants.O_RDONLY | noFollow);
    const buffer = Buffer.allocUnsafe(1024 * 1024), hash = createHash("sha256");
    let total = 0;
    while (total < expectedBytes) {
      const count = readSync(handle, buffer, 0, Math.min(buffer.length, expectedBytes - total), total);
      if (count < 1) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file returned an incomplete bounded read.");
      hash.update(buffer.subarray(0, count)); total += count;
    }
    if (readSync(handle, buffer, 0, 1, total) !== 0) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file exceeded its recorded length.");
    assertFingerprint(file, expectedBytes, identity);
    return hash.digest("hex");
  } catch (error) {
    if (error instanceof StudioMediaImportError) throw error;
    return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file could not be verified safely.");
  } finally { if (handle !== null) try { closeSync(handle); } catch { /* verification failure remains authoritative */ } }
}

async function receiveBody(request: Request, file: string): Promise<{ byteLength: number; contentHash: string }> {
  if (request.headers.get("Content-Type")?.toLowerCase() !== "application/octet-stream") return fail("UNSUPPORTED_MEDIA", 415, "Media upload requires application/octet-stream.");
  if (request.headers.has("Content-Encoding")) return fail("UNSUPPORTED_MEDIA", 415, "Compressed request bodies are not accepted.");
  const declaredText = request.headers.get("Content-Length");
  if (declaredText !== null && (!/^[1-9]\d*$/u.test(declaredText) || Number(declaredText) > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES)) return fail("MEDIA_TOO_LARGE", 413, "The legacy single-request import is limited to 16 MiB. Use the bounded upload session for larger media.");
  const declared = declaredText === null ? null : Number(declaredText);
  if (!request.body || request.signal.aborted) return fail("MEDIA_UPLOAD_INCOMPLETE", 400, "A complete, non-cancelled media body is required.");
  const noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0;
  let handle: number | null = null;
  try { handle = openSync(file, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | noFollow, 0o600); }
  catch { return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging file could not be opened safely."); }
  const reader = request.body.getReader(), hash = createHash("sha256");
  let total = 0, timer: ReturnType<typeof setTimeout> | undefined, abortReject: ((reason: unknown) => void) | undefined;
  const abortPromise = new Promise<never>((_, reject) => { abortReject = reject; });
  const abort = () => { abortReject?.(new StudioMediaImportError("MEDIA_UPLOAD_CANCELLED", 408, "Upload stopped. Reload saved state before deciding whether to retry.")); void reader.cancel().catch(() => undefined); };
  const deadline = new Promise<never>((_, reject) => { timer = setTimeout(() => { reject(new StudioMediaImportError("MEDIA_UPLOAD_TIMEOUT", 408, "Upload did not finish within 30 seconds. Reload saved state before retrying.")); void reader.cancel().catch(() => undefined); }, BODY_DEADLINE_MS); });
  request.signal.addEventListener("abort", abort, { once: true });
  try {
    if (request.signal.aborted) abort();
    while (true) {
      const chunk = await Promise.race([reader.read(), deadline, abortPromise]);
      if (chunk.done) break;
      if (!(chunk.value instanceof Uint8Array)) return fail("MEDIA_UPLOAD_INCOMPLETE", 400, "The media request body was not a complete binary stream.");
      if (chunk.value.byteLength === 0) continue;
      if (total + chunk.value.byteLength > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) { void reader.cancel().catch(() => undefined); return fail("MEDIA_TOO_LARGE", 413, "The legacy single-request import is limited to 16 MiB. Use the bounded upload session for larger media."); }
      let written = 0;
      while (written < chunk.value.byteLength) {
        const count = writeSync(handle, chunk.value, written, chunk.value.byteLength - written);
        if (count < 1) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file could not be written completely.");
        written += count;
      }
      hash.update(chunk.value); total += chunk.value.byteLength;
    }
    if (request.signal.aborted || total < 1 || (declared !== null && declared !== total)) return fail("MEDIA_UPLOAD_INCOMPLETE", 400, "Received media does not match the declared complete file.");
    fsyncSync(handle); closeSync(handle); handle = null;
    return { byteLength: total, contentHash: hash.digest("hex") };
  } finally {
    if (handle !== null) try { closeSync(handle); } catch { /* cleanup below remains authoritative */ }
    if (timer) clearTimeout(timer);
    request.signal.removeEventListener("abort", abort);
    try { reader.releaseLock(); } catch { /* request owns cancellation */ }
  }
}

function sameTool(left: StudioRenderConfiguration, right: StudioRenderConfiguration): boolean {
  return left.workRoot.toLowerCase() === right.workRoot.toLowerCase() && left.ffprobe.path.toLowerCase() === right.ffprobe.path.toLowerCase() && left.ffprobe.sha256 === right.ffprobe.sha256;
}
export function studioFootageProbeDeadlineMs(byteLength: number): number {
  if (!Number.isSafeInteger(byteLength) || byteLength < 1 || byteLength > STUDIO_FOOTAGE_MAX_BYTES) return fail("MEDIA_TOO_LARGE", 413, "The local media source length is outside the configured import ceiling.");
  const scaledBytes = Math.max(0, byteLength - STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES);
  return Math.min(PROBE_MAX_DEADLINE_MS, PROBE_MIN_DEADLINE_MS + Math.ceil(scaledBytes / PROBE_SCALE_BYTES) * PROBE_SCALE_DEADLINE_MS);
}
function environment(configuration: StudioRenderConfiguration, temporary: string): NodeJS.ProcessEnv {
  const result: NodeJS.ProcessEnv = { NODE_ENV: "production", PATH: path.dirname(configuration.ffprobe.path), TEMP: temporary, TMP: temporary, AV_LOG_FORCE_NOCOLOR: "1" };
  for (const name of ["SystemRoot", "WINDIR"] as const) if (typeof process.env[name] === "string" && process.env[name]) result[name] = process.env[name];
  return result;
}
async function runProbe(configuration: StudioRenderConfiguration, temporary: string, args: readonly string[], deadlineMs: number): Promise<Buffer> {
  let observed: StudioRenderConfiguration;
  try { observed = readStudioRenderConfiguration(process.env, { forceHash: true }); }
  catch { return fail("MEDIA_PROBE_UNAVAILABLE", 503, "The configured local media probe is unavailable."); }
  if (!sameTool(configuration, observed)) return fail("MEDIA_PROBE_UNAVAILABLE", 503, "The configured local media probe identity changed.");
  return await new Promise<Buffer>((resolve, reject) => {
    let child;
    try { child = spawn(observed.ffprobe.path, [...args], { cwd: temporary, windowsHide: true, shell: false, env: environment(observed, temporary), stdio: ["ignore", "pipe", "pipe"] }); }
    catch { reject(new StudioMediaImportError("MEDIA_PROBE_UNAVAILABLE", 503, "The configured local media probe could not be started.")); return; }
    const stdout: Buffer[] = [], stderr: Buffer[] = [];
    let stdoutBytes = 0, stderrBytes = 0, forced: StudioMediaImportError | null = null, completed = false;
    let killTimer: ReturnType<typeof setTimeout> | undefined;
    const stop = (error: StudioMediaImportError) => {
      if (!forced) {
        forced = error; try { child.kill("SIGKILL"); } catch { /* bounded fallback settles */ }
        killTimer = setTimeout(() => { if (!completed) { completed = true; clearTimeout(timer); reject(error); } }, 5_000);
      }
    };
    const timer = setTimeout(() => stop(new StudioMediaImportError("MEDIA_PROBE_UNAVAILABLE", 503, "The configured local media probe timed out.")), deadlineMs);
    child.stdout.on("data", (value: Buffer) => {
      stdoutBytes += value.length;
      if (stdoutBytes > PROBE_STDOUT_MAX_BYTES) stop(new StudioMediaImportError("UNSUPPORTED_MEDIA", 415, "The selected media produced excessive probe metadata."));
      else stdout.push(Buffer.from(value));
    });
    child.stderr.on("data", (value: Buffer) => {
      stderrBytes += value.length;
      if (stderrBytes > PROBE_STDERR_MAX_BYTES) stop(new StudioMediaImportError("UNSUPPORTED_MEDIA", 415, "The selected media produced excessive probe diagnostics."));
      else stderr.push(Buffer.from(value));
    });
    child.once("error", () => { if (!completed) { completed = true; clearTimeout(timer); if (killTimer) clearTimeout(killTimer); reject(forced ?? new StudioMediaImportError("MEDIA_PROBE_UNAVAILABLE", 503, "The configured local media probe failed to start.")); } });
    child.once("close", code => {
      if (completed) return; completed = true; clearTimeout(timer); if (killTimer) clearTimeout(killTimer);
      if (forced) reject(forced);
      else if (code !== 0) reject(new StudioMediaImportError("UNSUPPORTED_MEDIA", 415, "The selected file is not supported decodable local media."));
      else resolve(Buffer.concat(stdout, stdoutBytes));
    });
  });
}

function parseProbeJson(bytes: Buffer): Record<string, unknown> {
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes), parsed = JSON.parse(text) as unknown;
    if (!plain(parsed)) return fail("UNSUPPORTED_MEDIA", 415, "The selected media returned ambiguous probe metadata.");
    return parsed;
  } catch (error) {
    if (error instanceof StudioMediaImportError) throw error;
    return fail("UNSUPPORTED_MEDIA", 415, "The selected media returned invalid probe metadata.");
  }
}
function streamAndFormat(probe: Record<string, unknown>, byteLength: number): { stream: Record<string, unknown>; format: Record<string, unknown> } {
  if (!Array.isArray(probe.streams) || probe.streams.length !== 1 || !plain(probe.streams[0]) || !plain(probe.format) || probe.format.size !== String(byteLength)) {
    return fail("UNSUPPORTED_MEDIA", 415, "Imported media must contain exactly one unambiguous supported stream.");
  }
  return { stream: probe.streams[0], format: probe.format };
}
function zeroRotation(stream: Record<string, unknown>): boolean {
  const tags = stream.tags;
  if (tags !== undefined && (!plain(tags) || Object.keys(tags).some(key => key !== "rotate") || (tags.rotate !== undefined && !["0", "0.0", "0.000000"].includes(String(tags.rotate))))) return false;
  const side = stream.side_data_list;
  if (side === undefined) return true;
  if (!Array.isArray(side)) return false;
  return side.every(item => plain(item) && Object.keys(item).every(key => key === "side_data_type" || key === "rotation") && item.side_data_type === "Display Matrix" && [0, "0", "0.0", "0.000000"].includes(item.rotation as never));
}
function frameTimestamps(bytes: Buffer, timeBase: StudioLocalMediaDuration): { count: number; digest: string } {
  const parsed = parseProbeJson(bytes), frames = parsed.frames;
  if (!Array.isArray(frames) || frames.length < 1 || frames.length > 7_500) return fail("UNSUPPORTED_MEDIA", 415, "Video duration is outside the supported one-frame to 300-second range.");
  for (let ordinal = 0; ordinal < frames.length; ordinal++) {
    const frame = frames[ordinal];
    if (!plain(frame) || Object.keys(frame).some(key => key !== "best_effort_timestamp" && key !== "pkt_duration" && key !== "side_data_list")) return fail("UNSUPPORTED_MEDIA", 415, "Video frame cadence is ambiguous.");
    if (frame.side_data_list !== undefined && (!Array.isArray(frame.side_data_list) || !frame.side_data_list.every(item => plain(item) && Object.keys(item).length === 1 && item.side_data_type === "H.26[45] User Data Unregistered SEI message"))) return fail("UNSUPPORTED_MEDIA", 415, "Video contains unsupported per-frame side data.");
    const timestamp = integer(frame.best_effort_timestamp, 0, Number.MAX_SAFE_INTEGER);
    if (BigInt(timestamp) * BigInt(timeBase.numerator) * BigInt(25) !== BigInt(ordinal) * BigInt(timeBase.denominator)) return fail("UNSUPPORTED_MEDIA", 415, "Video must use exact constant 25 fps frame timing starting at zero.");
    if (frame.pkt_duration !== undefined && frame.pkt_duration !== "N/A") {
      const packetDuration = integer(frame.pkt_duration, 1, Number.MAX_SAFE_INTEGER);
      if (BigInt(packetDuration) * BigInt(timeBase.numerator) * BigInt(25) !== BigInt(timeBase.denominator)) return fail("UNSUPPORTED_MEDIA", 415, "Video frames must each use the exact 25 fps duration.");
    }
  }
  return { count: frames.length, digest: createHash("sha256").update(bytes).digest("hex") };
}
function rotationFields(): string { return "stream_tags=rotate:stream_side_data=side_data_type,rotation"; }

async function qualify(configuration: StudioRenderConfiguration, directory: string, source: string, mediaType: StudioLocalMediaKind, byteLength: number): Promise<StudioLocalMediaTechnicalMetadata> {
  const temporary = path.join(directory, "temp");
  try { mkdirSync(temporary, { recursive: false, mode: 0o700 }); }
  catch { return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local probe workspace could not be created safely."); }
  const entries = "format=format_name,duration,size,start_time:stream=index,codec_type,codec_name,pix_fmt,width,height,r_frame_rate,avg_frame_rate,time_base,start_pts,duration_ts,nb_read_frames,color_range,color_space,color_transfer,color_primaries,sample_aspect_ratio,sample_fmt,sample_rate,channels,channel_layout,bits_per_sample";
  const probeDeadlineMs = studioFootageProbeDeadlineMs(byteLength);
  const metadataBytes = await runProbe(configuration, temporary, ["-v", "error", "-hide_banner", "-protocol_whitelist", "file,pipe", "-count_frames", "-show_entries", `${entries}:${rotationFields()}`, "-of", "json", source], probeDeadlineMs);
  const probe = parseProbeJson(metadataBytes), { stream, format } = streamAndFormat(probe, byteLength);
  const streamStartsAtZero = mediaType === "VIDEO" ? stream.start_pts === 0 || stream.start_pts === "0" : stream.start_pts === undefined || stream.start_pts === 0 || stream.start_pts === "0";
  if ((stream.index !== 0 && stream.index !== "0") || !streamStartsAtZero || ![undefined, "0", "0.000000"].includes(format.start_time as never)) {
    return fail("UNSUPPORTED_MEDIA", 415, "Imported media must have one stream beginning exactly at zero.");
  }
  if (mediaType === "VIDEO") {
    if (format.format_name !== "mov,mp4,m4a,3gp,3g2,mj2" || stream.codec_type !== "video" || stream.codec_name !== "h264" || stream.pix_fmt !== "yuv420p" || stream.r_frame_rate !== "25/1" || stream.avg_frame_rate !== "25/1" || stream.sample_aspect_ratio !== "1:1" ||
        stream.color_primaries !== "bt709" || stream.color_transfer !== "bt709" || stream.color_space !== "bt709" || stream.color_range !== "tv" || !zeroRotation(stream)) {
      return fail("UNSUPPORTED_MEDIA", 415, "Video must be a single zero-rotation SDR MP4 using H.264, yuv420p, square pixels and exact 25 fps CFR.");
    }
    const width = typeof stream.width === "number" ? stream.width : Number(stream.width), height = typeof stream.height === "number" ? stream.height : Number(stream.height);
    if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 2 || height < 2 || width > 8192 || height > 8192 || width % 2 !== 0 || height % 2 !== 0 || width * height > 33_554_432) {
      return fail("UNSUPPORTED_MEDIA", 415, "Video dimensions must be even and within the qualified SDR frame bounds.");
    }
    const base = rationalText(stream.time_base);
    const cadenceBytes = await runProbe(configuration, temporary, ["-v", "error", "-hide_banner", "-protocol_whitelist", "file,pipe", "-select_streams", "v:0", "-show_frames", "-show_entries", "frame=best_effort_timestamp,pkt_duration", "-of", "json", source], probeDeadlineMs);
    const cadence = frameTimestamps(cadenceBytes, base), durationTs = integer(String(stream.duration_ts), 1, Number.MAX_SAFE_INTEGER), readFrames = integer(String(stream.nb_read_frames), 1, 7_500);
    if (cadence.count !== readFrames || BigInt(durationTs) * BigInt(base.numerator) * BigInt(25) !== BigInt(cadence.count) * BigInt(base.denominator)) return fail("UNSUPPORTED_MEDIA", 415, "Video duration and decoded frame coverage must agree exactly at 25 fps.");
    const technical: StudioLocalMediaTechnicalMetadata = {
      schema: STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA, mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width, height,
      frameRate: { numerator: 25, denominator: 1 }, frameCadence: "CFR_25_EXACT", duration: exactDuration(cadence.count, 25), sourceUnits: cadence.count, sourceUnit: "FRAME", timeBase: base,
      colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1,
      probeDigest: digest({ format: "studio-local-media-probe-v1", ffprobeSha256: configuration.ffprobe.sha256, metadata: probe, frameCadenceSha256: cadence.digest }),
    };
    return technical;
  }
  const base = rationalText(stream.time_base), durationTs = integer(String(stream.duration_ts), 1, 14_400_000), channels = typeof stream.channels === "number" ? stream.channels : Number(stream.channels);
  const expectedLayout = channels === 1 ? "mono" : channels === 2 ? "stereo" : null;
  if (format.format_name !== "wav" || stream.codec_type !== "audio" || stream.codec_name !== "pcm_s16le" || stream.sample_fmt !== "s16" || stream.sample_rate !== "48000" ||
      expectedLayout === null || stream.channel_layout !== undefined && stream.channel_layout !== "" && stream.channel_layout !== expectedLayout || stream.bits_per_sample !== 16 && stream.bits_per_sample !== "16" ||
      base.numerator !== 1 || base.denominator !== 48_000) return fail("UNSUPPORTED_MEDIA", 415, "Audio must be one unambiguous PCM s16le WAV stream at 48 kHz with mono or stereo layout.");
  const audioChannels = channels as 1 | 2, layout = expectedLayout as "mono" | "stereo";
  return {
    schema: STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA, mediaType: "AUDIO", contentType: "audio/wav", container: "wav", codec: "pcm_s16le", sampleFormat: "s16", sampleRate: 48_000,
    channels: audioChannels, channelLayout: layout, duration: exactDuration(durationTs, 48_000), sourceUnits: durationTs, sourceUnit: "SAMPLE", timeBase: { numerator: 1, denominator: 48_000 }, streamCount: 1,
    probeDigest: digest({ format: "studio-local-media-probe-v1", ffprobeSha256: configuration.ffprobe.sha256, metadata: probe }),
  };
}

/** Finalization seam for a server-owned upload-session file. The path must
 * already be an ordinary canonical file under the configured C: work root;
 * its complete hash is independently recomputed before FFprobe admission. */
export async function qualifyStudioMediaImportFile(input: Readonly<{
  sourcePath: string;
  mediaType: StudioLocalMediaKind;
  expectedBytes: number;
  expectedHash: string;
}>): Promise<StagedStudioMediaImport> {
  let configuration: StudioRenderConfiguration;
  try { configuration = readStudioRenderConfiguration(process.env, { forceHash: true }); }
  catch { return fail("MEDIA_PROBE_UNAVAILABLE", 503, "The configured local media probe is unavailable."); }
  if (!input || !path.isAbsolute(input.sourcePath) || !["VIDEO", "AUDIO"].includes(input.mediaType) || !Number.isSafeInteger(input.expectedBytes) || input.expectedBytes < 1 || input.expectedBytes > STUDIO_FOOTAGE_MAX_BYTES || !/^[a-f0-9]{64}$/u.test(input.expectedHash)) {
    return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The finalized upload-session media identity is invalid.");
  }
  let workRoot: string, source: string;
  try { workRoot = realpathSync.native(configuration.workRoot); source = realpathSync.native(path.resolve(input.sourcePath)); }
  catch { return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The finalized upload-session media file is unavailable."); }
  if (!within(workRoot, source) || source.toLowerCase() !== path.resolve(input.sourcePath).toLowerCase() || path.parse(source).root.toLowerCase() !== "c:\\") {
    return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The finalized upload-session media path is outside its local staging boundary.");
  }
  const expectedName = input.mediaType === "VIDEO" ? "source.mp4" : "source.wav";
  if (path.basename(source).toLowerCase() !== expectedName) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The finalized upload-session media path is invalid.");
  const identity = fingerprint(source, input.expectedBytes);
  if (hashFile(source, input.expectedBytes) !== input.expectedHash) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The finalized upload-session media hash differs from its acknowledged bytes.");
  const technical = await qualify(configuration, path.dirname(source), source, input.mediaType, input.expectedBytes);
  assertFingerprint(source, input.expectedBytes, identity);
  let closed = false;
  return Object.freeze({
    mediaType: input.mediaType, contentType: technical.contentType, byteLength: input.expectedBytes, contentHash: input.expectedHash, technical,
    read(offset: number, length: number): Buffer {
      if (closed || !Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 1 || offset + length > input.expectedBytes) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media read was invalid or no longer available.");
      assertFingerprint(source, input.expectedBytes, identity);
      const noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0, handle = openSync(source, constants.O_RDONLY | noFollow), result = Buffer.allocUnsafe(length);
      try {
        let read = 0;
        while (read < length) { const count = readSync(handle, result, read, length - read, offset + read); if (count < 1) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file returned an incomplete chunk."); read += count; }
      } finally { closeSync(handle); }
      assertFingerprint(source, input.expectedBytes, identity); return result;
    },
    close(): void { closed = true; },
  });
}

/** Production receiver: request bytes are streamed once to a random server-owned C: staging file,
 * then qualified only by the exact configured and hash-verified ffprobe executable. */
export const receiveStudioMediaImport: StudioMediaImportReceiver = async (request, mediaType) => {
  let configuration: StudioRenderConfiguration;
  try { configuration = readStudioRenderConfiguration(process.env, { forceHash: true }); }
  catch { return fail("MEDIA_PROBE_UNAVAILABLE", 503, "The configured local media probe is unavailable."); }
  const directory = secureDirectory(configuration.workRoot), source = path.join(directory, mediaType === "VIDEO" ? "source.mp4" : "source.wav");
  let retained = false;
  try {
    const received = await receiveBody(request, source), identity = fingerprint(source, received.byteLength);
    const technical = await qualify(configuration, directory, source, mediaType, received.byteLength);
    assertFingerprint(source, received.byteLength, identity);
    let closed = false;
    const staged: StagedStudioMediaImport = Object.freeze({
      mediaType, contentType: technical.contentType, byteLength: received.byteLength, contentHash: received.contentHash, technical,
      read(offset: number, length: number): Buffer {
        if (closed || !Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 1 || offset + length > received.byteLength) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media read was invalid or no longer available.");
        assertFingerprint(source, received.byteLength, identity);
        const noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0, handle = openSync(source, constants.O_RDONLY | noFollow), result = Buffer.allocUnsafe(length);
        try {
          let read = 0;
          while (read < length) { const count = readSync(handle, result, read, length - read, offset + read); if (count < 1) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The staged media file returned an incomplete chunk."); read += count; }
        } finally { closeSync(handle); }
        assertFingerprint(source, received.byteLength, identity); return result;
      },
      close(): void {
        if (closed) return;
        try { removeStaging(configuration.workRoot, directory); closed = true; }
        catch (error) { if (error instanceof StudioMediaImportError) throw error; return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging boundary could not be cleaned safely."); }
      },
    });
    retained = true; return staged;
  } finally {
    if (!retained) {
      try { removeStaging(configuration.workRoot, directory); }
      catch (cleanup) { if (!(cleanup instanceof StudioMediaImportError)) return fail("MEDIA_STAGING_UNAVAILABLE", 503, "The local media staging boundary could not be cleaned safely."); throw cleanup; }
    }
  }
};
