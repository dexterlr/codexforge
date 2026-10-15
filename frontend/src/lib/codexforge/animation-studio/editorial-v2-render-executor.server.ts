import "server-only";

import { createHash } from "node:crypto";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { constants, copyFileSync, existsSync, fsyncSync, lstatSync, mkdirSync, openSync, closeSync, readSync, realpathSync, rmSync, statfsSync, writeFileSync, writeSync } from "node:fs";
import path from "node:path";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { getExactWindowsProcessIdentity } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { CODEXFORGE_PROJECT_ROOT } from "@/lib/codexforge/server-safe-paths";
import type { StudioId } from "./domain";
import { editorialTimeToFrames, type EditorialRational } from "./editorial-time";
import { readStudioRenderConfiguration, type StudioRenderConfiguration } from "./editorial-v2-render-config.server";
import { STUDIO_RENDER_EXPORT_POLICY, STUDIO_RENDER_LIMITS, hasStudioAudioMix, studioEditorialRenderSpecTiming, type StudioEditorialRenderSpec, type StudioRenderJob, type StudioRenderPhase, type StudioRenderProcessIdentity, type StudioRenderSource } from "./editorial-v2-render-contract";
import { cancelStudioRenderJob, completeStudioRenderJob, inspectStudioRenderLedger, progressStudioRenderJob, readStudioRenderSpec, startStudioRenderJob, terminateStudioRenderJob, updateStudioRenderProcess } from "./editorial-v2-render-ledger.server";
import { publishStudioRenderOutput } from "./editorial-v2-render-output-storage.server";
import { STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, STUDIO_FOOTAGE_MAX_BYTES } from "./footage-contract";
import { buildStudioAudioMixGraph, createStudioAudioPcmInspector, studioAudioOccurrenceParticipates, StudioAudioMixError, type StudioAudioPcmReport } from "./editorial-v2-audio-mix";
import { pinStudioCompatibilityJobDirectory } from "./readonly-compatibility-binding.server";

const ACTIVE = new Map<string, ActiveProcess>();
// Spans the deliberate no-child gaps between probe, render, validation and
// publication. ACTIVE remains per-child so cancellation can target an exact PID.
const EXECUTIONS = new Set<string>();
// If Windows has not confirmed child closure after forced termination, never
// remove that child's owned staging tree underneath it.
const RETAINED_STAGING = new Set<string>();
const COMPATIBILITY_STAGING_GUARDS = new Map<string, { guard: CreatorNativeRoot; attempted: boolean }>();
type ActiveProcess = { child: ChildProcessWithoutNullStreams; identity: StudioRenderProcessIdentity; cancelRequested: boolean };
type Clock = () => string;

export type StudioRenderSourceByteReader = (source: StudioRenderSource) => Buffer;
export type StudioRenderSourceChunkReader = (source: StudioRenderSource, accept: (chunk: Buffer) => void) => void;
export class StudioRenderExecutionError extends Error {
  constructor(readonly code: "RENDER_EXECUTION_BUSY" | "RENDER_EXECUTION_INVALID" | "RENDER_EXECUTION_FAILED" | "RENDER_SOURCE_COLOUR_UNSUPPORTED" | "RENDER_INSUFFICIENT_STORAGE" | "RENDER_CLEANUP_FAILED") {
    super(code); this.name = "StudioRenderExecutionError";
  }
}
class RenderCancelled extends Error {}
const failure = (code: StudioRenderExecutionError["code"]): never => { throw new StudioRenderExecutionError(code); };
const activeKey = (projectId: string, jobId: string) => `${projectId}:${jobId}`;
const exactTime = (value: EditorialRational, rate: number) => editorialTimeToFrames(value, { numerator: rate, denominator: 1 }, "EXACT");
const number = (value: number): string => Object.is(value, -0) ? "0" : String(value);
const sourceKey = (source: Pick<StudioRenderSource, "assetId" | "version">) => `${source.assetId}@${source.version}`;

function runtimeEnvironment(jobDirectory: string, executable: string): NodeJS.ProcessEnv {
  const systemRoot = process.env.SystemRoot ?? process.env.WINDIR;
  if (!systemRoot || !path.isAbsolute(systemRoot)) return failure("RENDER_EXECUTION_INVALID");
  const temporary = path.join(jobDirectory, "temp"); mkdirSync(temporary, { recursive: false });
  return { NODE_ENV: "production", SystemRoot: systemRoot, WINDIR: systemRoot, TEMP: temporary, TMP: temporary, PATH: path.dirname(executable), AV_LOG_FORCE_NOCOLOR: "1" };
}
function assertConfiguration(expected: StudioRenderConfiguration, spec: StudioEditorialRenderSpec, forceHash = false): StudioRenderConfiguration {
  const current = readStudioRenderConfiguration(process.env, { forceHash });
  if (digest(current) !== digest(expected) || current.rendererVersion !== spec.renderer.version || current.ffmpeg.path !== spec.renderer.ffmpegPath || current.ffmpeg.sha256 !== spec.renderer.ffmpegSha256 || current.ffprobe.path !== spec.renderer.ffprobePath || current.ffprobe.sha256 !== spec.renderer.ffprobeSha256 || current.font.path !== spec.renderer.fontPath || current.font.sha256 !== spec.renderer.fontSha256 || current.font.ref !== spec.renderer.fontRef) return failure("RENDER_EXECUTION_INVALID");
  return current;
}
function hashFile(filename: string, maximum: number): { hash: string; bytes: number } {
  const descriptor = openSync(filename, constants.O_RDONLY), hasher = createHash("sha256"), buffer = Buffer.allocUnsafe(262_144); let bytes = 0;
  try { while (true) { const count = readSync(descriptor, buffer, 0, buffer.length, null); if (count === 0) break; bytes += count; if (bytes > maximum) return failure("RENDER_EXECUTION_INVALID"); hasher.update(buffer.subarray(0, count)); } }
  finally { closeSync(descriptor); }
  return { hash: hasher.digest("hex"), bytes };
}
const STORAGE_RESERVE_BYTES = 256 * 1024 * 1024;
function freeBytes(directory: string): number {
  try {
    const value = statfsSync(directory), available = value.bavail * value.bsize;
    if (!Number.isSafeInteger(available) || available < 0) return failure("RENDER_EXECUTION_INVALID");
    return available;
  } catch (error) { if (error instanceof StudioRenderExecutionError) throw error; return failure("RENDER_EXECUTION_INVALID"); }
}
export function validateStudioRenderStorageAvailability(requiredBytes: number, availableBytes: number): void {
  if (!Number.isSafeInteger(requiredBytes) || requiredBytes < 1 || !Number.isSafeInteger(availableBytes) || availableBytes < 0) return failure("RENDER_EXECUTION_INVALID");
  if (availableBytes < requiredBytes) return failure("RENDER_INSUFFICIENT_STORAGE");
}
/** Conservative same-volume gate: source/font copies, staged master, published chunks, and a fixed safety reserve must coexist. */
export function assertStudioRenderStoragePreflight(configuration: StudioRenderConfiguration, spec: StudioEditorialRenderSpec): { requiredBytes: number; availableBytes: number } {
  let workRoot: string, outputRoot: string, fontBytes: number;
  try {
    workRoot = realpathSync.native(configuration.workRoot);
    outputRoot = realpathSync.native(CODEXFORGE_PROJECT_ROOT);
    fontBytes = lstatSync(configuration.font.path).size;
  } catch { return failure("RENDER_EXECUTION_INVALID"); }
  if (path.parse(workRoot).root.toLowerCase() !== "c:\\" || path.parse(outputRoot).root.toLowerCase() !== "c:\\" || !Number.isSafeInteger(fontBytes) || fontBytes < 1 || fontBytes > 32 * 1024 * 1024) return failure("RENDER_EXECUTION_INVALID");
  const sourceBytes = spec.sources.reduce((sum, source) => sum + source.byteLength, 0);
  const pcmBytes = hasStudioAudioMix(spec) ? studioEditorialRenderSpecTiming(spec).expectedAudioSamples * 2 * 4 : 0;
  const requiredBytes = sourceBytes + fontBytes + pcmBytes + 2 * STUDIO_RENDER_LIMITS.outputBytes + STORAGE_RESERVE_BYTES;
  if (!Number.isSafeInteger(sourceBytes) || sourceBytes < 0 || !Number.isSafeInteger(requiredBytes)) return failure("RENDER_EXECUTION_INVALID");
  const availableBytes = Math.min(freeBytes(workRoot), freeBytes(outputRoot));
  validateStudioRenderStorageAvailability(requiredBytes, availableBytes);
  return { requiredBytes, availableBytes };
}
export function studioRenderExecutionTimeouts(expectedFrames: number): { sourceProbeMs: number; renderMs: number; outputProbeMs: number; fullDecodeMs: number } {
  if (!Number.isSafeInteger(expectedFrames) || expectedFrames < 1 || expectedFrames > STUDIO_RENDER_EXPORT_POLICY.maximumFrames) return failure("RENDER_EXECUTION_INVALID");
  return {
    sourceProbeMs: 120_000,
    renderMs: Math.min(3_600_000, Math.max(600_000, 300_000 + expectedFrames * 400)),
    outputProbeMs: 120_000,
    fullDecodeMs: Math.min(1_200_000, Math.max(600_000, 300_000 + expectedFrames * 80)),
  };
}
function safeJobDirectory(configuration: StudioRenderConfiguration, job: StudioRenderJob): string {
  const name = `${job.projectId}-${job.jobId}-${job.specDigest.slice(0, 16)}`;
  if (!/^[a-z0-9_-]+$/u.test(name)) return failure("RENDER_EXECUTION_INVALID");
  const work = realpathSync.native(configuration.workRoot), target = path.resolve(work, name);
  if (!target.toLowerCase().startsWith(work.toLowerCase() + path.sep)) return failure("RENDER_EXECUTION_INVALID");
  mkdirSync(target, { recursive: false });
  const stat = lstatSync(target), real = realpathSync.native(target);
  if (!stat.isDirectory() || stat.isSymbolicLink() || real.toLowerCase() !== target.toLowerCase()) return failure("RENDER_EXECUTION_INVALID");
  return target;
}
function removeJobDirectory(configuration: StudioRenderConfiguration, jobDirectory: string): void {
  const work = realpathSync.native(configuration.workRoot), target = path.resolve(jobDirectory);
  if (!target.toLowerCase().startsWith(work.toLowerCase() + path.sep) || path.dirname(target).toLowerCase() !== work.toLowerCase() || path.basename(target).length < 24) return failure("RENDER_CLEANUP_FAILED");
  if (!existsSync(target)) return;
  const stat = lstatSync(target);
  if (!stat.isDirectory() || stat.isSymbolicLink() || realpathSync.native(target).toLowerCase() !== target.toLowerCase()) return failure("RENDER_CLEANUP_FAILED");
  rmSync(target, { recursive: true, force: false, maxRetries: 0 });
  if (existsSync(target)) return failure("RENDER_CLEANUP_FAILED");
}
function cleanupJobStaging(configuration: StudioRenderConfiguration, jobDirectory: string, key: string): void {
  const pinned = COMPATIBILITY_STAGING_GUARDS.get(key);
  if (!pinned) {
    // Missing or already-consumed compatibility authority never enables a
    // pathname fallback, including a delayed child-closure/finally overlap.
    if (process.env.CODEXFORGE_STUDIO_COMPATIBILITY_BINDING_SHA256 !== undefined) return failure("RENDER_CLEANUP_FAILED");
    return removeJobDirectory(configuration, jobDirectory);
  }
  if (pinned.attempted) return failure("RENDER_CLEANUP_FAILED");
  pinned.attempted = true;
  pinned.guard.removeRoot();
  COMPATIBILITY_STAGING_GUARDS.delete(key);
}
function materialize(rootSpec: StudioEditorialRenderSpec, configuration: StudioRenderConfiguration, jobDirectory: string, streamSourceBytes: StudioRenderSourceChunkReader, readSourceBytes?: StudioRenderSourceByteReader): Map<string, string> {
  const result = new Map<string, string>();
  for (let index = 0; index < rootSpec.sources.length; index++) {
    const source = rootSpec.sources[index];
    if (!Number.isSafeInteger(source.byteLength) || source.byteLength < 1 || source.byteLength > STUDIO_FOOTAGE_MAX_BYTES) return failure("RENDER_EXECUTION_INVALID");
    const filename = path.join(jobDirectory, `source-${String(index).padStart(2, "0")}.${source.assetType === "VIDEO" ? "mp4" : "wav"}`);
    const handle = openSync(filename, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL, 0o600), hasher = createHash("sha256");
    let written = 0;
    try {
      const accept = (chunk: Buffer) => {
        if (!Buffer.isBuffer(chunk) || chunk.length < 1 || chunk.length > 524_288 || written + chunk.length > source.byteLength) return failure("RENDER_EXECUTION_INVALID");
        let offset = 0;
        while (offset < chunk.length) {
          const count = writeSync(handle, chunk, offset, chunk.length - offset);
          if (count < 1) return failure("RENDER_EXECUTION_FAILED");
          offset += count;
        }
        hasher.update(chunk); written += chunk.length;
      };
      if (readSourceBytes) {
        const bytes = readSourceBytes(source);
        if (!Buffer.isBuffer(bytes) || bytes.length > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) return failure("RENDER_EXECUTION_INVALID");
        for (let offset = 0; offset < bytes.length; offset += 524_288) accept(bytes.subarray(offset, Math.min(bytes.length, offset + 524_288)));
      } else streamSourceBytes(source, accept);
      if (written !== source.byteLength || hasher.digest("hex") !== source.contentHash) return failure("RENDER_EXECUTION_INVALID");
      fsyncSync(handle);
    } finally { closeSync(handle); }
    const stat = lstatSync(filename);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size !== source.byteLength || hashFile(filename, STUDIO_FOOTAGE_MAX_BYTES).hash !== source.contentHash) return failure("RENDER_EXECUTION_INVALID");
    result.set(sourceKey(source), filename);
  }
  const font = path.join(jobDirectory, "font.ttf");
  copyFileSync(configuration.font.path, font, constants.COPYFILE_EXCL);
  const fontStat = lstatSync(font), fontHash = hashFile(font, 32 * 1024 * 1024);
  if (!fontStat.isFile() || fontStat.isSymbolicLink() || fontHash.hash !== configuration.font.sha256) return failure("RENDER_EXECUTION_INVALID");
  return result;
}

type ActiveLayer = StudioEditorialRenderSpec["composition"]["layers"][number];
function activeLayers(spec: StudioEditorialRenderSpec): ActiveLayer[] {
  const solo = spec.composition.layers.some(layer => layer.enabled && layer.solo);
  return spec.composition.layers.filter(layer => layer.enabled && (!solo || layer.solo));
}
/** Server-owned plan; exported for real-tool regression at the production filter boundary. */
export function buildStudioRenderFilterPlan(spec: StudioEditorialRenderSpec, jobDirectory: string, sourceFiles: Map<string, string>, validatedPcmPath?: string): { arguments: string[]; filterPath: string; colourArguments: string[] } {
  const explicitColour = spec.format === "studio-editorial-render-spec-v4";
  const renderTiming = studioEditorialRenderSpecTiming(spec), seconds = Math.floor(renderTiming.expectedFrames / 25), hundredths = renderTiming.expectedFrames % 25 * 4;
  const duration = hundredths === 0 ? String(seconds) : `${seconds}.${String(hundredths).padStart(2, "0")}`;
  const layers = activeLayers(spec), argumentsList = ["-f", "lavfi", "-i", `color=c=black:s=1280x720:r=25:d=${duration}${explicitColour ? ",format=rgba" : ""}`], input = new Map<string, number>(); let nextInput = 1;
  for (const layer of layers) {
    if (layer.type !== "VIDEO" && layer.type !== "AUDIO") continue;
    if (hasStudioAudioMix(spec) && layer.type === "AUDIO") continue;
    if (layer.source.kind !== "ASSET") return failure("RENDER_EXECUTION_INVALID");
    const filename = sourceFiles.get(`${layer.source.asset.assetId}@${layer.source.asset.version}`); if (!filename) return failure("RENDER_EXECUTION_INVALID");
    input.set(layer.layerId, nextInput++); argumentsList.push("-protocol_whitelist", "file,pipe", "-i", filename);
  }
  let validatedPcmInput: number | null = null;
  if (hasStudioAudioMix(spec)) {
    if (!validatedPcmPath || path.dirname(validatedPcmPath) !== jobDirectory) return failure("RENDER_EXECUTION_INVALID");
    validatedPcmInput = nextInput++;
    argumentsList.push("-protocol_whitelist", "file,pipe", "-f", "f32le", "-ar", "48000", "-ac", "2", "-i", validatedPcmPath);
  }
  // Composite in encoded BT.709 RGB, not linear light. Never allow overlay's
  // default yuv420 negotiation to insert an unbound RGB -> YCbCr conversion.
  const rgbProperties = "setparams=range=full:color_primaries=bt709:color_trc=bt709:colorspace=gbr";
  const filters: string[] = [`[0:v]format=rgba,${explicitColour ? rgbProperties + "," : ""}setpts=PTS-STARTPTS[v0]`]; let video = "v0", visualIndex = 0, textIndex = 0;
  for (const layer of layers) {
    if (layer.type === "VIDEO") {
      const sourceInput = input.get(layer.layerId); if (!sourceInput) return failure("RENDER_EXECUTION_INVALID");
      const start = exactTime(layer.start, 25), duration = exactTime(layer.duration, 25), offset = exactTime(layer.sourceOffset, 25), end = start + duration;
      const rendered = `visual${visualIndex}`, composed = `v${visualIndex + 1}`, t = layer.transform;
      filters.push(`[${sourceInput}:v:0]setpts=PTS-STARTPTS,fps=fps=25:round=near,trim=start_frame=${offset}:end_frame=${offset + duration},setpts=PTS-STARTPTS+${start}/(25*TB),scale=w='max(2\\,trunc(iw*${number(t.scaleX)}/2)*2)':h='max(2\\,trunc(ih*${number(t.scaleY)}/2)*2)'${explicitColour ? ":in_color_matrix=bt709:in_range=tv:out_range=pc:scaler_sub=neighbor" : ""},format=rgba,${explicitColour ? rgbProperties + "," : ""}colorchannelmixer=aa=${number(layer.opacity)}[${rendered}]`);
      filters.push(`[${video}][${rendered}]overlay=x='(main_w-overlay_w)/2+${number(t.x)}':y='(main_h-overlay_h)/2+${number(t.y)}':enable='between(n\\,${start}\\,${end - 1})':eof_action=pass:repeatlast=0:shortest=0${explicitColour ? ":format=rgb:alpha=straight" : ""}[${composed}]`);
      video = composed; visualIndex++;
    } else if (layer.type === "TEXT") {
      const start = exactTime(layer.start, 25), duration = exactTime(layer.duration, 25), end = start + duration, filename = `text-${String(textIndex).padStart(2, "0")}.txt`;
      writeFileSync(path.join(jobDirectory, filename), Buffer.from(layer.text.text, "utf8"), { flag: "wx", mode: 0o600 });
      const composed = `v${visualIndex + 1}`, colour = `0x${layer.text.color.slice(1).toUpperCase()}@${number(layer.opacity)}`;
      filters.push(`[${video}]drawtext=fontfile=font.ttf:textfile=${filename}:reload=0:expansion=none:fontsize=${layer.text.fontSizePx}:fontcolor=${colour}:x='(w-text_w)/2+${number(layer.transform.x)}':y='(h-text_h)/2+${number(layer.transform.y)}':enable='between(n\\,${start}\\,${end - 1})'[${composed}]`);
      video = composed; visualIndex++; textIndex++;
    }
  }
  filters.push(explicitColour
    ? `[${video}]${rgbProperties},scale=in_range=pc:out_range=tv:out_color_matrix=bt709:out_chroma_loc=left:scaler_sub=neighbor,format=yuv420p,setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709[vout]`
    : `[${video}]format=yuv420p[vout]`);
  if (validatedPcmInput !== null) {
    filters.push(`[${validatedPcmInput}:a:0]atrim=end_sample=${renderTiming.expectedAudioSamples},asetpts=PTS-STARTPTS[aout]`);
  } else {
  filters.push(`anullsrc=r=48000:cl=stereo,atrim=end_sample=${renderTiming.expectedAudioSamples},asetpts=PTS-STARTPTS[asilence]`);
  const audioLabels: string[] = [];
  let audioIndex = 0;
  for (const layer of layers) {
    if (layer.type !== "AUDIO" || layer.audio.muted) continue;
    const sourceInput = input.get(layer.layerId); if (!sourceInput) return failure("RENDER_EXECUTION_INVALID");
    const start = exactTime(layer.start, 48_000), duration = exactTime(layer.duration, 48_000), offset = exactTime(layer.sourceOffset, 48_000), fadeIn = exactTime(layer.audio.fadeIn, 48_000), fadeOut = exactTime(layer.audio.fadeOut, 48_000), label = `audio${audioIndex++}`;
    const chain = [`[${sourceInput}:a:0]aresample=48000`, "aformat=sample_fmts=fltp:channel_layouts=stereo", `atrim=start_sample=${offset}:end_sample=${offset + duration}`, `asetpts=PTS-STARTPTS+${start}/(48000*TB)`, `volume='${number(layer.audio.gainDb)}dB':precision=double`];
    if (fadeIn > 0) chain.push(`afade=t=in:ss=0:ns=${fadeIn}`);
    if (fadeOut > 0) chain.push(`afade=t=out:ss=${duration - fadeOut}:ns=${fadeOut}`);
    filters.push(`${chain.join(",")}[${label}]`); audioLabels.push(`[${label}]`);
  }
  if (audioLabels.length) filters.push(`[asilence]${audioLabels.join("")}amix=inputs=${audioLabels.length + 1}:duration=longest:dropout_transition=0:normalize=0,atrim=end_sample=${renderTiming.expectedAudioSamples},asetpts=PTS-STARTPTS[aout]`);
  else filters.push("[asilence]anull[aout]");
  }
  const filterPath = path.join(jobDirectory, "filter.ffscript"); writeFileSync(filterPath, filters.join(";\n"), { flag: "wx", mode: 0o600 });
  return { arguments: argumentsList, filterPath, colourArguments: explicitColour ? ["-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv", "-chroma_sample_location", "left"] : [] };
}

/** Bounded file scan of the unclamped float result, before any output publication. */
export function inspectStudioAudioPcmFile(filename: string, expectedSamples: number): StudioAudioPcmReport {
  const stat = lstatSync(filename), expectedBytes = expectedSamples * 2 * 4;
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size !== expectedBytes) throw new StudioAudioMixError("AUDIO_MIX_INVALID");
  const inspector = createStudioAudioPcmInspector(expectedSamples), descriptor = openSync(filename, constants.O_RDONLY), buffer = Buffer.allocUnsafe(262_144);
  try {
    while (true) { const count = readSync(descriptor, buffer, 0, buffer.length, null); if (!count) break; inspector.accept(buffer.subarray(0, count)); }
  } finally { closeSync(descriptor); }
  return inspector.finish();
}

type ProcessResult = { stdout: Buffer; stderr: Buffer };
const delay = (milliseconds: number) => new Promise<void>(resolve => setTimeout(resolve, milliseconds));
async function awaitClosure(closed: Promise<unknown>, timeoutMs = 5_000): Promise<boolean> {
  return Promise.race([closed.then(() => true), delay(timeoutMs).then(() => false)]);
}
async function runTrackedProcess(input: { root: CreatorNativeRoot; job: StudioRenderJob; configuration: StudioRenderConfiguration; executable: string; arguments: string[]; cwd: string; environment: NodeJS.ProcessEnv; phase: Exclude<StudioRenderPhase, "QUEUED" | "DONE">; first: boolean; timeoutMs: number; clock: Clock; onProgress?: (frame: number) => void }): Promise<ProcessResult> {
  assertConfiguration(input.configuration, readStudioRenderSpec(input.root, input.job.projectId, input.job.specDigest));
  const key = activeKey(input.job.projectId, input.job.jobId); if (ACTIVE.has(key)) return failure("RENDER_EXECUTION_BUSY");
  const child = spawn(input.executable, input.arguments, { cwd: input.cwd, env: input.environment, windowsHide: true, shell: false, stdio: ["pipe", "pipe", "pipe"] }); child.stdin.end();
  const spawned = new Promise<void>((resolve, reject) => { child.once("spawn", resolve); child.once("error", reject); });
  let closedConfirmed = false;
  const closed = new Promise<{ code: number | null; signal: NodeJS.Signals | null }>(resolve => { child.once("close", (code, signal) => { closedConfirmed = true; resolve({ code, signal }); }); });
  const retainUntilClosed = (): void => {
    RETAINED_STAGING.add(key);
    void closed.then(() => {
      if (ACTIVE.get(key)?.child === child) ACTIVE.delete(key);
      try { cleanupJobStaging(input.configuration, input.cwd, key); RETAINED_STAGING.delete(key); } catch { /* Retention remains fail closed if later cleanup is unavailable. */ }
    });
  };
  const stdout: Buffer[] = [], stderr: Buffer[] = []; let stdoutBytes = 0, stderrBytes = 0, progressText = "", settled = false, callbackFailure: unknown;
  const append = (target: Buffer[], chunk: Buffer, current: number): number => { const next = current + chunk.length; if (next > STUDIO_RENDER_LIMITS.diagnosticsBytes) { while (target.length && target.reduce((sum, part) => sum + part.length, 0) + chunk.length > STUDIO_RENDER_LIMITS.diagnosticsBytes) target.shift(); } target.push(Buffer.from(chunk.subarray(Math.max(0, chunk.length - STUDIO_RENDER_LIMITS.diagnosticsBytes)))); return next; };
  child.stdout.on("data", (part: Buffer) => { stdoutBytes = append(stdout, part, stdoutBytes); if (stdoutBytes > 1_048_576) child.kill("SIGKILL"); if (input.onProgress && callbackFailure === undefined) { try { progressText = (progressText + part.toString("utf8")).slice(-8192); const lines = progressText.split(/\r?\n/u); progressText = lines.pop() ?? ""; for (const line of lines) if (/^frame=\d+$/u.test(line)) input.onProgress(Number(line.slice(6))); } catch (error) { callbackFailure = error; child.kill("SIGKILL"); } } });
  child.stderr.on("data", (part: Buffer) => { stderrBytes = append(stderr, part, stderrBytes); if (stderrBytes > 1_048_576) child.kill("SIGKILL"); });
  try { await spawned; }
  catch { child.kill("SIGKILL"); if (!await awaitClosure(closed)) retainUntilClosed(); return failure("RENDER_EXECUTION_FAILED"); }
  if (!child.pid) { child.kill("SIGKILL"); if (!await awaitClosure(closed)) retainUntilClosed(); return failure("RENDER_EXECUTION_FAILED"); }
  let identity: StudioRenderProcessIdentity;
  try { identity = { processId: child.pid, identity: getExactWindowsProcessIdentity(child.pid), recordedAt: input.clock() }; }
  catch { child.kill("SIGKILL"); if (!await awaitClosure(closed)) retainUntilClosed(); return failure("RENDER_EXECUTION_FAILED"); }
  const active: ActiveProcess = { child, identity, cancelRequested: false }; ACTIVE.set(key, active);
  try { if (input.first) { startStudioRenderJob(input.root, input.job.projectId, input.job.jobId, identity, identity.recordedAt); if (input.phase !== "MATERIALIZING") progressStudioRenderJob(input.root, input.job.projectId, input.job.jobId, { phase: input.phase, completed: 0, total: input.job.progress.total, percent: 0 }, identity.recordedAt); } else updateStudioRenderProcess(input.root, input.job.projectId, input.job.jobId, identity, input.phase, identity.recordedAt); }
  catch (error) {
    child.kill("SIGKILL");
    if (await awaitClosure(closed)) { if (ACTIVE.get(key)?.child === child) ACTIVE.delete(key); }
    else retainUntilClosed();
    throw error;
  }
  const timer = setTimeout(() => { child.kill("SIGKILL"); }, input.timeoutMs);
  try {
    const result = await closed; settled = true;
    const current = inspectStudioRenderLedger(input.root, input.job.projectId)?.jobs.find(item => item.jobId === input.job.jobId);
    if (active.cancelRequested || current?.state === "CANCELLED") throw new RenderCancelled();
    if (callbackFailure !== undefined) throw callbackFailure;
    if (result.code !== 0 || result.signal !== null || stdoutBytes > 1_048_576 || stderrBytes > 1_048_576) return failure("RENDER_EXECUTION_FAILED");
    return { stdout: Buffer.concat(stdout).subarray(-STUDIO_RENDER_LIMITS.diagnosticsBytes), stderr: Buffer.concat(stderr).subarray(-STUDIO_RENDER_LIMITS.diagnosticsBytes) };
  } finally {
    if (timer) clearTimeout(timer);
    if (!settled && child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
    if (!closedConfirmed && !await awaitClosure(closed)) { retainUntilClosed(); return failure("RENDER_EXECUTION_FAILED"); }
    if (ACTIVE.get(key)?.child === child) ACTIVE.delete(key);
  }
}

function parseProbe(bytes: Buffer): Record<string, unknown> {
  if (!bytes.length || bytes.length > STUDIO_RENDER_LIMITS.diagnosticsBytes) return failure("RENDER_EXECUTION_FAILED");
  try { const value = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes)); if (!value || typeof value !== "object" || Array.isArray(value)) return failure("RENDER_EXECUTION_FAILED"); return value as Record<string, unknown>; }
  catch { return failure("RENDER_EXECUTION_FAILED"); }
}
function exactInteger(value: unknown, allowZero: boolean): bigint | null {
  if (typeof value === "number") return Number.isSafeInteger(value) && value >= (allowZero ? 0 : 1) ? BigInt(value) : null;
  if (typeof value !== "string" || value.length > 32 || !(allowZero ? /^(?:0|[1-9]\d*)$/u : /^[1-9]\d*$/u).test(value)) return null;
  try { return BigInt(value); } catch { return null; }
}
function exactPositiveRational(value: unknown): { numerator: bigint; denominator: bigint } | null {
  if (typeof value !== "string" || value.length > 65) return null;
  const match = /^([1-9]\d*)\/([1-9]\d*)$/u.exec(value); if (!match || match[1].length > 32 || match[2].length > 32) return null;
  try { return { numerator: BigInt(match[1]), denominator: BigInt(match[2]) }; } catch { return null; }
}
function requiredSourceUnits(spec: StudioEditorialRenderSpec, source: StudioRenderSource): number {
  const rate = source.assetType === "VIDEO" ? 25 : 48_000; let required = 0;
  try {
    for (const layer of hasStudioAudioMix(spec) && source.assetType === "AUDIO" ? spec.composition.layers : activeLayers(spec)) {
      if (layer.type !== source.assetType || layer.source.kind !== "ASSET" || layer.source.asset.assetId !== source.assetId || layer.source.asset.version !== source.version) continue;
      required = Math.max(required, exactTime(layer.sourceOffset, rate) + exactTime(layer.duration, rate));
    }
  } catch { return failure("RENDER_EXECUTION_INVALID"); }
  if (!Number.isSafeInteger(required) || required < 1) return failure("RENDER_EXECUTION_INVALID");
  return required;
}
/** Fail-closed proof that the exact selected source stream covers every saved use. */
export function validateStudioRenderInputProbe(probe: Record<string, unknown>, type: "VIDEO" | "AUDIO", requiredUnits: number, requireColour = false): void {
  const streams = probe.streams;
  if (!Number.isSafeInteger(requiredUnits) || requiredUnits < 1 || !Array.isArray(streams) || streams.length !== 1 || !streams[0] || typeof streams[0] !== "object" || Array.isArray(streams[0])) return failure("RENDER_EXECUTION_INVALID");
  const stream = streams[0] as Record<string, unknown>;
  if (stream.codec_type !== type.toLowerCase()) return failure("RENDER_EXECUTION_INVALID");
  if (type === "VIDEO") {
    if (requireColour && (stream.codec_name !== "h264" || stream.pix_fmt !== "yuv420p" || stream.color_primaries !== "bt709" || stream.color_transfer !== "bt709" || stream.color_space !== "bt709" || stream.color_range !== "tv")) return failure("RENDER_SOURCE_COLOUR_UNSUPPORTED");
    const width = exactInteger(stream.width, false), height = exactInteger(stream.height, false), frames = exactInteger(stream.nb_read_frames, false);
    if (width === null || height === null || frames === null || width > BigInt(8192) || height > BigInt(8192) || width * height > BigInt(33_554_432) || stream.r_frame_rate !== "25/1" || stream.avg_frame_rate !== "25/1" || frames < BigInt(requiredUnits)) return failure("RENDER_EXECUTION_INVALID");
    return;
  }
  const duration = exactInteger(stream.duration_ts, false), timeBase = exactPositiveRational(stream.time_base), sampleRate = exactInteger(stream.sample_rate, false);
  if (duration === null || timeBase === null || sampleRate === null || sampleRate < BigInt(8_000) || sampleRate > BigInt(384_000)) return failure("RENDER_EXECUTION_INVALID");
  const durationNumerator = duration * timeBase.numerator;
  // Both the decoded source-sample count and the 48 kHz resampled count must be
  // exact. Ambiguous container duration rounding cannot authorize a render.
  if ((durationNumerator * sampleRate) % timeBase.denominator !== BigInt(0) || (durationNumerator * BigInt(48_000)) % timeBase.denominator !== BigInt(0) || (durationNumerator * BigInt(48_000)) / timeBase.denominator < BigInt(requiredUnits)) return failure("RENDER_EXECUTION_INVALID");
}
const AAC_DELAY_PADDING_SAMPLES = 2_048;
function exactStreamSamples(stream: Record<string, unknown>): bigint | null {
  const duration = exactInteger(stream.duration_ts, false), timeBase = exactPositiveRational(stream.time_base);
  if (duration === null || timeBase === null) return null;
  const numerator = duration * timeBase.numerator * BigInt(48_000);
  return numerator % timeBase.denominator === BigInt(0) ? numerator / timeBase.denominator : null;
}
/** Validates exact video coverage plus codec-aware AAC presentation duration; container duration is only a corroborating bound. */
export function validateStudioRenderOutputProbe(probe: Record<string, unknown>, expectedFrames: number, expectedAudioSamples: number, requireColour = false): { probeDigest: string } {
  const streams = probe.streams, format = probe.format;
  if (!Number.isSafeInteger(expectedFrames) || expectedFrames < 1 || expectedFrames > STUDIO_RENDER_EXPORT_POLICY.maximumFrames || !Number.isSafeInteger(expectedAudioSamples) || expectedAudioSamples < 1 || expectedAudioSamples > STUDIO_RENDER_EXPORT_POLICY.maximumAudioSamples || !Array.isArray(streams) || !format || typeof format !== "object" || Array.isArray(format)) return failure("RENDER_EXECUTION_FAILED");
  const video = streams.filter(item => !!item && typeof item === "object" && (item as Record<string, unknown>).codec_type === "video") as Record<string, unknown>[];
  const audio = streams.filter(item => !!item && typeof item === "object" && (item as Record<string, unknown>).codec_type === "audio") as Record<string, unknown>[];
  const decodedFrames = video.length === 1 ? exactInteger(video[0].nb_read_frames, false) : null;
  const audioSamples = audio.length === 1 ? exactStreamSamples(audio[0]) : null, audioStart = audio.length === 1 ? exactInteger(audio[0].start_pts, true) : null;
  const containerDuration = Number((format as Record<string, unknown>).duration);
  if (requireColour && (video.length !== 1 || video[0].color_primaries !== "bt709" || video[0].color_transfer !== "bt709" || video[0].color_space !== "bt709" || video[0].color_range !== "tv" || video[0].chroma_location !== "left")) return failure("RENDER_EXECUTION_FAILED");
  const expectedSeconds = expectedFrames / 25, maximumCodecDeltaSeconds = AAC_DELAY_PADDING_SAMPLES / 48_000 + 0.001;
  if (video.length !== 1 || audio.length !== 1 || video[0].codec_name !== "h264" || video[0].width !== 1280 || video[0].height !== 720 || video[0].pix_fmt !== "yuv420p" || video[0].r_frame_rate !== "25/1" || video[0].avg_frame_rate !== "25/1" || decodedFrames !== BigInt(expectedFrames) || audio[0].codec_name !== "aac" || audio[0].sample_rate !== "48000" || audio[0].channels !== 2 || audioStart !== BigInt(0) || audioSamples === null || audioSamples < BigInt(expectedAudioSamples) || audioSamples > BigInt(expectedAudioSamples + AAC_DELAY_PADDING_SAMPLES) || !Number.isFinite(containerDuration) || Math.abs(containerDuration - expectedSeconds) > maximumCodecDeltaSeconds) return failure("RENDER_EXECUTION_FAILED");
  return { probeDigest: digest(probe) };
}

export async function executeStudioRenderJob(input: { root: CreatorNativeRoot; projectId: StudioId<"project">; jobId: StudioId<"job">; configuration: StudioRenderConfiguration; streamSourceBytes?: StudioRenderSourceChunkReader; /** Legacy bounded test seam only. Production uses streamSourceBytes. */ readSourceBytes?: StudioRenderSourceByteReader; now?: Clock; /** Internal deterministic lifecycle observation only; never derived from a request. */ afterOwnershipAcquired?: () => Promise<void> }): Promise<void> {
  const clock = input.now ?? (() => new Date().toISOString()), key = activeKey(input.projectId, input.jobId); if (ACTIVE.has(key) || EXECUTIONS.has(key)) return failure("RENDER_EXECUTION_BUSY");
  const ledger = inspectStudioRenderLedger(input.root, input.projectId), job = ledger?.jobs.find(item => item.jobId === input.jobId);
  if (!job || job.state !== "QUEUED") return failure("RENDER_EXECUTION_INVALID");
  EXECUTIONS.add(key);
  let jobDirectory: string | null = null, firstProcess = true, cleaned = false, cleanupAdmitted = false;
  function cleanupStaging(): void {
    if (!jobDirectory || !cleanupAdmitted || cleaned) return;
    // A native removable guard cleans the exact pinned C: job handle. Never
    // release it and then fall back to a pathname after a cleanup failure.
    cleaned = true;
    cleanupJobStaging(input.configuration, jobDirectory, key);
  }
  try {
    await input.afterOwnershipAcquired?.();
    const spec = readStudioRenderSpec(input.root, input.projectId, job.specDigest), renderTiming = studioEditorialRenderSpecTiming(spec), timeouts = studioRenderExecutionTimeouts(renderTiming.expectedFrames);
    if (job.progress.total !== renderTiming.expectedFrames) return failure("RENDER_EXECUTION_INVALID");
    assertConfiguration(input.configuration, spec, true);
    assertStudioRenderStoragePreflight(input.configuration, spec);
    jobDirectory = safeJobDirectory(input.configuration, job);
    const jobGuard = pinStudioCompatibilityJobDirectory(input.configuration.workRoot, jobDirectory);
    if (jobGuard) COMPATIBILITY_STAGING_GUARDS.set(key, { guard: jobGuard, attempted: false });
    cleanupAdmitted = true;
    if (!input.streamSourceBytes && !input.readSourceBytes) return failure("RENDER_EXECUTION_INVALID");
    const stream = input.streamSourceBytes ?? ((source: StudioRenderSource, accept: (chunk: Buffer) => void) => {
      const bytes = input.readSourceBytes!(source);
      if (!Buffer.isBuffer(bytes) || bytes.length > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) return failure("RENDER_EXECUTION_INVALID");
      for (let offset = 0; offset < bytes.length; offset += 524_288) accept(bytes.subarray(offset, Math.min(bytes.length, offset + 524_288)));
    });
    const environment = runtimeEnvironment(jobDirectory, input.configuration.ffmpeg.path), sources = materialize(spec, input.configuration, jobDirectory, stream);
    for (const source of spec.sources) {
      const filename = sources.get(sourceKey(source)); if (!filename) return failure("RENDER_EXECUTION_INVALID");
      const entries = source.assetType === "VIDEO" ? "stream=codec_type,codec_name,width,height,pix_fmt,color_primaries,color_transfer,color_space,color_range,chroma_location,r_frame_rate,avg_frame_rate,nb_read_frames" : "stream=codec_type,sample_rate,duration_ts,time_base";
      const argumentsList = ["-v", "error", "-protocol_whitelist", "file,pipe", "-select_streams", source.assetType === "VIDEO" ? "v:0" : "a:0", ...(source.assetType === "VIDEO" ? ["-count_frames"] : []), "-show_entries", entries, "-of", "json", filename];
      const probe = await runTrackedProcess({ root: input.root, job, configuration: input.configuration, executable: input.configuration.ffprobe.path, arguments: argumentsList, cwd: jobDirectory, environment, phase: "PROBING_INPUTS", first: firstProcess, timeoutMs: timeouts.sourceProbeMs, clock }); firstProcess = false;
      validateStudioRenderInputProbe(parseProbe(probe.stdout), source.assetType, requiredSourceUnits(spec, source), spec.format === "studio-editorial-render-spec-v4");
    }
    let audioMixValidation: StudioAudioPcmReport | undefined, validatedPcmPath: string | undefined;
    if (hasStudioAudioMix(spec)) {
      const audioArguments: string[] = [], indexes = new Map<string, number>();
      for (const occurrence of spec.audioMix.occurrences) {
        if (!studioAudioOccurrenceParticipates(occurrence)) continue;
        const filename = sources.get(sourceKey(occurrence.source)); if (!filename) return failure("RENDER_EXECUTION_INVALID");
        indexes.set(occurrence.layerId, indexes.size);
        audioArguments.push("-protocol_whitelist", "file,pipe", "-i", filename);
      }
      const audioFilter = path.join(jobDirectory, "audio-mix.ffscript");
      writeFileSync(audioFilter, buildStudioAudioMixGraph(spec.audioMix, renderTiming.expectedAudioSamples, occurrence => indexes.get(occurrence.layerId) ?? -1), { flag: "wx", mode: 0o600 });
      validatedPcmPath = path.join(jobDirectory, "validated-mix.f32le");
      await runTrackedProcess({ root: input.root, job, configuration: input.configuration, executable: input.configuration.ffmpeg.path, arguments: ["-hide_banner", "-nostdin", "-n", "-v", "error", "-xerror", ...audioArguments, "-/filter_complex", audioFilter, "-map", "[aout]", "-c:a", "pcm_f32le", "-f", "f32le", "-ar", "48000", "-ac", "2", "-fs", String(renderTiming.expectedAudioSamples * 8 + 1), validatedPcmPath], cwd: jobDirectory, environment, phase: "VALIDATING", first: firstProcess, timeoutMs: timeouts.fullDecodeMs, clock }); firstProcess = false;
      audioMixValidation = inspectStudioAudioPcmFile(validatedPcmPath, renderTiming.expectedAudioSamples);
    }
    const plan = buildStudioRenderFilterPlan(spec, jobDirectory, sources, validatedPcmPath);
    let lastProgress = 0;
    const outputPath = path.join(jobDirectory, "master.mp4");
    const renderArguments = ["-hide_banner", "-nostdin", "-y", "-loglevel", "error", "-progress", "pipe:1", "-stats_period", "0.25", ...plan.arguments, "-/filter_complex", plan.filterPath, "-map", "[vout]", "-map", "[aout]", "-frames:v", String(renderTiming.expectedFrames), "-r", "25", "-fps_mode", "cfr", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level:v", "3.1", ...plan.colourArguments, "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", "-movflags", spec.format === "studio-editorial-render-spec-v4" ? "+faststart+write_colr" : "+faststart", "-map_metadata", "-1", "-map_chapters", "-1", outputPath];
    await runTrackedProcess({ root: input.root, job, configuration: input.configuration, executable: input.configuration.ffmpeg.path, arguments: renderArguments, cwd: jobDirectory, environment, phase: "RENDERING", first: firstProcess, timeoutMs: timeouts.renderMs, clock, onProgress: frame => { const bounded = Math.max(0, Math.min(renderTiming.expectedFrames - 1, frame)); if (bounded - lastProgress >= 25) { lastProgress = bounded; progressStudioRenderJob(input.root, input.projectId, input.jobId, { phase: "RENDERING", completed: bounded, total: renderTiming.expectedFrames, percent: Math.floor(bounded * 100 / renderTiming.expectedFrames) }, clock()); } } }); firstProcess = false;
    const outputStat = lstatSync(outputPath); if (!outputStat.isFile() || outputStat.isSymbolicLink() || outputStat.size < 1 || outputStat.size > STUDIO_RENDER_LIMITS.outputBytes) return failure("RENDER_EXECUTION_FAILED");
    const probeResult = await runTrackedProcess({ root: input.root, job, configuration: input.configuration, executable: input.configuration.ffprobe.path, arguments: ["-v", "error", "-protocol_whitelist", "file,pipe", "-count_frames", "-show_entries", "format=duration:stream=codec_type,codec_name,width,height,pix_fmt,color_primaries,color_transfer,color_space,color_range,chroma_location,r_frame_rate,avg_frame_rate,sample_rate,channels,nb_read_frames,duration_ts,time_base,start_pts", "-of", "json", outputPath], cwd: jobDirectory, environment, phase: "VALIDATING", first: false, timeoutMs: timeouts.outputProbeMs, clock });
    const validated = validateStudioRenderOutputProbe(parseProbe(probeResult.stdout), renderTiming.expectedFrames, renderTiming.expectedAudioSamples, spec.format === "studio-editorial-render-spec-v4");
    await runTrackedProcess({ root: input.root, job, configuration: input.configuration, executable: input.configuration.ffmpeg.path, arguments: ["-hide_banner", "-nostdin", "-v", "error", "-xerror", "-protocol_whitelist", "file,pipe", "-i", outputPath, "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"], cwd: jobDirectory, environment, phase: "VALIDATING", first: false, timeoutMs: timeouts.fullDecodeMs, clock });
    const beforePublish = inspectStudioRenderLedger(input.root, input.projectId)?.jobs.find(item => item.jobId === input.jobId); if (!beforePublish || beforePublish.state !== "RUNNING" || beforePublish.specDigest !== job.specDigest) throw new RenderCancelled();
    progressStudioRenderJob(input.root, input.projectId, input.jobId, { phase: "PUBLISHING", completed: renderTiming.expectedFrames - 1, total: renderTiming.expectedFrames, percent: 99 }, clock());
    const output = publishStudioRenderOutput(input.root, { projectId: input.projectId, stagedPath: outputPath, workRoot: input.configuration.workRoot, output: { assetId: job.targetAssetId, version: job.targetVersion, jobId: job.jobId, headDigest: job.sourceHeadDigest, createdAt: clock(), video: { codec: "h264", width: 1280, height: 720, frameRate: "25/1", decodedFrames: renderTiming.expectedFrames }, audio: { codec: "aac", sampleRate: 48_000, channels: 2 }, ...(audioMixValidation ? { audioMixValidation } : {}), probeDigest: audioMixValidation ? digest({ probeDigest: validated.probeDigest, audioMixValidation }) : validated.probeDigest } });
    cleanupStaging();
    completeStudioRenderJob(input.root, input.projectId, input.jobId, output, clock());
  } catch (error) {
    if (error instanceof RenderCancelled) return;
    const current = inspectStudioRenderLedger(input.root, input.projectId)?.jobs.find(item => item.jobId === input.jobId);
    if (!RETAINED_STAGING.has(key) && current && !["COMPLETED", "FAILED", "CANCELLED", "INTERRUPTED"].includes(current.state)) {
      try { terminateStudioRenderJob(input.root, input.projectId, input.jobId, "FAILED", clock(), { code: error instanceof StudioRenderExecutionError || error instanceof StudioAudioMixError ? error.code : "RENDER_EXECUTION_FAILED", message: error instanceof StudioRenderExecutionError && error.code === "RENDER_SOURCE_COLOUR_UNSUPPORTED" ? "The source bytes do not declare the qualified BT.709 limited-range 8-bit video contract. No colour interpretation was assumed and no output was published." : error instanceof StudioAudioMixError && error.code === "AUDIO_MIX_CLIPPING" ? `The saved audio mix has sample peak ${error.peakAbsolute} above full scale (1). Lower one or more track gains, save, and explicitly request a new render. No output was published and no levels were changed.` : error instanceof StudioAudioMixError && error.code === "AUDIO_MIX_NONFINITE" ? "The saved audio mix contains non-finite samples. Review the source audio and saved track levels. No output was published." : "The local render did not pass its fixed execution and validation contract." }); } catch { /* Preserve the first failure; reconciliation remains fail closed. */ }
    }
    throw error;
  } finally {
    if (!ACTIVE.has(key) && !RETAINED_STAGING.has(key)) try { cleanupStaging(); } catch { /* A retained owned staging directory is safer than unsafe cleanup. */ }
    EXECUTIONS.delete(key);
  }
}

function exactProcessAlive(process: StudioRenderProcessIdentity): boolean {
  try { return getExactWindowsProcessIdentity(process.processId) === process.identity; } catch { return false; }
}
async function stopExactProcess(processIdentity: StudioRenderProcessIdentity, child?: ChildProcessWithoutNullStreams): Promise<void> {
  if (!exactProcessAlive(processIdentity)) return;
  try { if (child) child.kill("SIGTERM"); else process.kill(processIdentity.processId, "SIGTERM"); } catch { /* Confirm exact closure below. */ }
  const gracefulUntil = Date.now() + 2_000;
  while (Date.now() < gracefulUntil && exactProcessAlive(processIdentity)) await delay(50);
  if (exactProcessAlive(processIdentity)) {
    try { if (child) child.kill("SIGKILL"); else process.kill(processIdentity.processId, "SIGKILL"); } catch { /* Confirm exact closure below. */ }
    const forcedUntil = Date.now() + 3_000;
    while (Date.now() < forcedUntil && exactProcessAlive(processIdentity)) await delay(50);
  }
  if (exactProcessAlive(processIdentity)) return failure("RENDER_EXECUTION_FAILED");
}
export function reconcileStudioRenderLedger(input: { root: CreatorNativeRoot; projectId: StudioId<"project">; requestedAt: string }): { ledger: ReturnType<typeof inspectStudioRenderLedger>; orphanedLiveJobIds: StudioId<"job">[] } {
  let ledger = inspectStudioRenderLedger(input.root, input.projectId); const orphanedLiveJobIds: StudioId<"job">[] = [];
  for (const job of ledger?.jobs ?? []) {
    if (["COMPLETED", "FAILED", "CANCELLED", "INTERRUPTED"].includes(job.state) || EXECUTIONS.has(activeKey(input.projectId, job.jobId)) || ACTIVE.has(activeKey(input.projectId, job.jobId))) continue;
    if (job.state === "RUNNING" && job.process && exactProcessAlive(job.process)) { orphanedLiveJobIds.push(job.jobId); continue; }
    ledger = terminateStudioRenderJob(input.root, input.projectId, job.jobId, "INTERRUPTED", input.requestedAt, { code: "RENDER_PROCESS_INTERRUPTED", message: "The saved local render has no exact live process owner and was not restarted automatically." });
  }
  return { ledger, orphanedLiveJobIds };
}

export async function cancelStudioRenderExecution(input: { root: CreatorNativeRoot; projectId: StudioId<"project">; jobId: StudioId<"job">; expectedLedgerRevision: number; requestedAt: string; request: object; key: string; actor: string }): Promise<{ ledger: NonNullable<ReturnType<typeof inspectStudioRenderLedger>>; replayed: boolean }> {
  const before = inspectStudioRenderLedger(input.root, input.projectId), job = before?.jobs.find(item => item.jobId === input.jobId);
  if (!before || !job) return failure("RENDER_EXECUTION_INVALID");
  const key = activeKey(input.projectId, input.jobId), active = ACTIVE.get(key);
  const next = cancelStudioRenderJob(input.root, { projectId: input.projectId, jobId: input.jobId, expectedLedgerRevision: input.expectedLedgerRevision, request: input.request, key: input.key, actor: input.actor, at: input.requestedAt });
  if (next.replayed) return next;
  if (active) { active.cancelRequested = true; await stopExactProcess(active.identity, active.child); }
  else if (job.process) await stopExactProcess(job.process);
  return next;
}

export function studioRenderExecutionIsActive(projectId: StudioId<"project">, jobId: StudioId<"job">): boolean { const key = activeKey(projectId, jobId); return EXECUTIONS.has(key) || ACTIVE.has(key); }
