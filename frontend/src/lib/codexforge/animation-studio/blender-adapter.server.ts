import "server-only";

import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { constants, closeSync, copyFileSync, lstatSync, mkdirSync, openSync, readFileSync, readSync, readdirSync, realpathSync, statfsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getExactWindowsProcessIdentity } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertBlenderEditAdapterBinding, validateBlenderMaterialInspection, validateBlenderMaterialVerification, type BlenderEditPolicy, type BlenderEditProposal } from "./blender-edit-contract";

export const BLENDER_ADAPTER_VERSION = "STUDIO_BLENDER_DIRECT_PREVIEW_V1";
export const BLENDER_COLOUR_TRANSFORM = "SRGB_EOTF_BT709_OETF_LUT16_MATRIX_LIMITED_V2";
export type BlenderToolPin = { path: string; sha256: string };
export type BlenderProcessIdentity = { processId: number; identity: string; recordedAt: string; executable: string; phase: string };
export type BlenderProgress = { phase: "INSPECTING" | "RENDERING" | "ENCODING" | "VALIDATING"; completed: number; total: number; sourceFrame?: number };
export type BlenderSceneInspection = { name: string; cameras: string[]; activeCamera: string | null; frameStart: number; frameEnd: number; fps: number; fpsBase: number; width: number; height: number; percentage: number; engine: string; renderSamples: number; viewTransform: string; displayDevice: string; look: string; exposure: number; gamma: number; filmTransparent: boolean };
export type BlenderSourceInspection = { schemaVersion: 1; blenderVersion: string; sourceSha256: string; sourceBytes: number; scenes: BlenderSceneInspection[]; dependencies: { kind: string; path: string; packed: boolean }[]; embeddedScripts: { name: string; autoRun: boolean }[]; drivers: { owner: string; type: string; expression: string }[]; addons: string[]; unsupported: string[]; supported: boolean; trustBoundary: string };
export type BlenderAdapterCallbacks = { signal?: AbortSignal; onProcess?: (identity: BlenderProcessIdentity) => void; onProgress?: (progress: BlenderProgress) => void };
export type BlenderInspectionInput = BlenderAdapterCallbacks & { blender: BlenderToolPin; sourcePath: string; expectedSourceSha256: string; workDirectory: string; adapterScriptDigest: string };
export type BlenderRenderInput = BlenderInspectionInput & { ffmpeg: BlenderToolPin; ffprobe: BlenderToolPin; scene: string; camera: string; startFrame: number; endFrame: number; width: 1280; height: 720; fps: 25 };
export class BlenderAdapterError extends Error {
  constructor(readonly code: "BLENDER_PATH_INVALID" | "BLENDER_PIN_CHANGED" | "BLENDER_SOURCE_UNSUPPORTED" | "BLENDER_JOB_INVALID" | "BLENDER_STORAGE_LIMIT" | "BLENDER_CANCELLED" | "BLENDER_TIMED_OUT" | "BLENDER_PROCESS_FAILED" | "BLENDER_OUTPUT_INVALID" | "BLENDER_BUSY", readonly detail: string = code) { super(detail); this.name = "BlenderAdapterError"; }
}
const fail = (code: BlenderAdapterError["code"], detail?: string): never => { throw new BlenderAdapterError(code, detail); };
const SHA = /^[a-f0-9]{64}$/u;
const LIMIT = 1024 ** 3;
let executing = false;
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

export function hashBlenderFile(filename: string, maximum = LIMIT): { sha256: string; bytes: number } {
  const st = lstatSync(filename);
  if (!st.isFile() || st.isSymbolicLink() || st.size < 1 || st.size > maximum) return fail("BLENDER_PATH_INVALID");
  const fd = openSync(filename, constants.O_RDONLY), hash = createHash("sha256"), buffer = Buffer.allocUnsafe(262144); let bytes = 0;
  try { for (;;) { const count = readSync(fd, buffer, 0, buffer.length, null); if (!count) break; bytes += count; if (bytes > maximum) return fail("BLENDER_STORAGE_LIMIT"); hash.update(buffer.subarray(0, count)); } }
  finally { closeSync(fd); }
  return { sha256: hash.digest("hex"), bytes };
}

function exactCPath(filename: string, directory: boolean): string {
  const full = path.resolve(filename);
  if (process.platform !== "win32" || !/^C:\\/iu.test(full) || full.includes("\0") || full.includes(":", 2)) return fail("BLENDER_PATH_INVALID");
  let cursor = path.parse(full).root;
  for (const part of full.slice(cursor.length).split(path.sep)) {
    if (!part || part === "." || part === "..") return fail("BLENDER_PATH_INVALID");
    cursor = path.join(cursor, part);
    const stat = lstatSync(cursor);
    if (stat.isSymbolicLink() || realpathSync.native(cursor).toLowerCase() !== cursor.toLowerCase()) return fail("BLENDER_PATH_INVALID");
  }
  const stat = lstatSync(full);
  if (directory ? !stat.isDirectory() : !stat.isFile()) return fail("BLENDER_PATH_INVALID");
  return full;
}
function pin(tool: BlenderToolPin): string {
  const filename = exactCPath(tool.path, false);
  if (!SHA.test(tool.sha256) || hashBlenderFile(filename, 512 * 1024 ** 2).sha256 !== tool.sha256) return fail("BLENDER_PIN_CHANGED");
  return filename;
}
export function getBlenderAdapterScripts() {
  // Deployment configuration only; this is never accepted from an HTTP body.
  // A packaged runtime may have a different workspace and application root.
  const root = exactCPath(process.env.CODEXFORGE_STUDIO_BLENDER_SCRIPT_ROOT ?? path.join(process.cwd(), "scripts", "blender-studio"), true);
  const inspect = { path: path.join(root, "inspect.py"), sha256: hashBlenderFile(path.join(root, "inspect.py"), 131072).sha256 };
  const render = { path: path.join(root, "render.py"), sha256: hashBlenderFile(path.join(root, "render.py"), 131072).sha256 };
  return { inspect, render, digest: digest(JSON.stringify({ version: BLENDER_ADAPTER_VERSION, inspect: inspect.sha256, render: render.sha256, colourTransform: BLENDER_COLOUR_TRANSFORM, encoderFilterSha256: digest(BLENDER_ENCODING_FILTER) })) };
}
function freezeScripts(directory: string, expectedDigest: string) {
  const scripts = getBlenderAdapterScripts();
  if (scripts.digest !== expectedDigest) return fail("BLENDER_PIN_CHANGED");
  const target = path.join(directory, "adapter-scripts"); mkdirSync(target);
  for (const [name, source] of [["inspect.py", scripts.inspect], ["render.py", scripts.render]] as const) {
    const copy = path.join(target, name); copyFileSync(exactCPath(source.path, false), copy, constants.COPYFILE_EXCL);
    if (hashBlenderFile(copy, 131072).sha256 !== source.sha256) return fail("BLENDER_PIN_CHANGED");
  }
  return { ...scripts, inspectPath: path.join(target, "inspect.py"), renderPath: path.join(target, "render.py") };
}
function checkSpace(directory: string) {
  const fs = statfsSync(directory);
  if (fs.bavail * fs.bsize < 2 * LIMIT) return fail("BLENDER_STORAGE_LIMIT");
}
function environment(directory: string, executable: string): NodeJS.ProcessEnv {
  const systemRoot = process.env.SystemRoot ?? process.env.WINDIR;
  if (!systemRoot || !path.isAbsolute(systemRoot)) return fail("BLENDER_PATH_INVALID");
  const root = path.join(directory, "isolated-environment"); mkdirSync(root);
  const env: NodeJS.ProcessEnv = { NODE_ENV: "production", SystemRoot: systemRoot, WINDIR: systemRoot, PATH: path.dirname(executable), PYTHONNOUSERSITE: "1", PYTHONDONTWRITEBYTECODE: "1", OMP_NUM_THREADS: "2", OPENBLAS_NUM_THREADS: "2", AV_LOG_FORCE_NOCOLOR: "1" };
  for (const key of ["TEMP", "TMP", "APPDATA", "LOCALAPPDATA", "USERPROFILE", "BLENDER_USER_CONFIG", "BLENDER_USER_SCRIPTS", "BLENDER_USER_DATAFILES", "CUDA_CACHE_PATH"]) { env[key] = path.join(root, key.toLowerCase()); mkdirSync(env[key]!); }
  return env;
}
function totalBytes(directory: string, depth = 0): number {
  if (depth > 6) return fail("BLENDER_STORAGE_LIMIT");
  let bytes = 0;
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, item.name), stat = lstatSync(filename);
    if (stat.isSymbolicLink()) return fail("BLENDER_PATH_INVALID");
    bytes += stat.isDirectory() ? totalBytes(filename, depth + 1) : stat.size;
    if (bytes > 2 * LIMIT) return fail("BLENDER_STORAGE_LIMIT");
  }
  return bytes;
}
const baseArgs = ["--background", "--factory-startup", "--disable-autoexec", "--threads", "2", "--python-exit-code", "7"];

async function run(input: BlenderAdapterCallbacks & { tool: BlenderToolPin; args: string[]; cwd: string; phase: string; timeoutMs: number; environment: NodeJS.ProcessEnv; tag: string }): Promise<{ stdout: string; identity: BlenderProcessIdentity }> {
  if (input.signal?.aborted) return fail("BLENDER_CANCELLED");
  const executable = pin(input.tool);
  const child = spawn(executable, input.args, { cwd: input.cwd, env: input.environment, shell: false, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  const closed = new Promise<{ code: number | null; error?: string }>(resolve => { child.once("error", () => resolve({ code: null, error: "SPAWN_FAILED" })); child.once("close", code => resolve({ code })); });
  let identity: BlenderProcessIdentity | undefined, failure: BlenderAdapterError | undefined, stdout = "", stderr = "", pending = "", logsBytes = 0;
  const stop = (error: BlenderAdapterError) => { failure ??= error; if (child.pid && (!identity || isExactBlenderProcessAlive(identity))) child.kill("SIGKILL"); };
  const abort = () => stop(new BlenderAdapterError("BLENDER_CANCELLED"));
  child.stdout.on("data", (chunk: Buffer) => {
    logsBytes += chunk.length; stdout = (stdout + chunk.toString("utf8")).slice(-524288); pending += chunk.toString("utf8");
    const lines = pending.split(/\r?\n/u); pending = (lines.pop() ?? "").slice(-8192);
    try { for (const line of lines) if (line.startsWith("STUDIO_FRAME ")) { const p = JSON.parse(line.slice(13)) as { completed: number; total: number; sourceFrame: number }; input.onProgress?.({ phase: "RENDERING", ...p }); } }
    catch { stop(new BlenderAdapterError("BLENDER_PROCESS_FAILED", "Progress could not be persisted.")); }
    if (logsBytes > 8 * 1024 ** 2) stop(new BlenderAdapterError("BLENDER_PROCESS_FAILED", "Diagnostic limit exceeded."));
  });
  child.stderr.on("data", (chunk: Buffer) => { logsBytes += chunk.length; stderr = (stderr + chunk.toString("utf8")).slice(-524288); if (logsBytes > 8 * 1024 ** 2) stop(new BlenderAdapterError("BLENDER_PROCESS_FAILED", "Diagnostic limit exceeded.")); });
  try {
    if (!child.pid) return fail("BLENDER_PROCESS_FAILED");
    identity = { processId: child.pid, identity: getExactWindowsProcessIdentity(child.pid), recordedAt: new Date().toISOString(), executable, phase: input.phase };
    writeFileSync(path.join(input.cwd, `${input.tag}-process.json`), JSON.stringify({ ...identity, arguments: input.args }), { flag: "wx" });
    input.onProcess?.(identity);
  } catch { stop(new BlenderAdapterError("BLENDER_PROCESS_FAILED", "Exact process identity could not be recorded.")); }
  input.signal?.addEventListener("abort", abort, { once: true });
  if (input.signal?.aborted) abort();
  const timer = setTimeout(() => stop(new BlenderAdapterError("BLENDER_TIMED_OUT")), input.timeoutMs);
  const guard = setInterval(() => { try { totalBytes(input.cwd); checkSpace(input.cwd); } catch { stop(new BlenderAdapterError("BLENDER_STORAGE_LIMIT")); } }, 2000);
  try {
    const result = await closed;
    writeFileSync(path.join(input.cwd, `${input.tag}-result.json`), JSON.stringify({ code: result.code, error: failure?.code ?? result.error ?? null, endedAt: new Date().toISOString(), stdout, stderr }), { flag: "wx" });
    if (failure) throw failure;
    if (result.code !== 0 || result.error || !identity) return fail("BLENDER_PROCESS_FAILED", `The ${input.phase.toLowerCase()} subprocess failed. Local bounded diagnostics were retained.`);
    return { stdout, identity };
  } finally { clearTimeout(timer); clearInterval(guard); input.signal?.removeEventListener("abort", abort); }
}
export function isExactBlenderProcessAlive(identity: Pick<BlenderProcessIdentity, "processId" | "identity">): boolean { try { return getExactWindowsProcessIdentity(identity.processId) === identity.identity; } catch { return false; } }

function setup(input: BlenderInspectionInput) {
  const work = exactCPath(input.workDirectory, true), source = exactCPath(input.sourcePath, false);
  if (!source.toLowerCase().startsWith(work.toLowerCase() + path.sep) || path.extname(source).toLowerCase() !== ".blend") return fail("BLENDER_PATH_INVALID");
  if (!SHA.test(input.expectedSourceSha256) || hashBlenderFile(source).sha256 !== input.expectedSourceSha256) return fail("BLENDER_PIN_CHANGED");
  checkSpace(work); pin(input.blender);
  const scripts = freezeScripts(work, input.adapterScriptDigest), env = environment(work, input.blender.path);
  return { work, source, scripts, env };
}
async function inspect(input: BlenderInspectionInput, state: ReturnType<typeof setup>): Promise<{ inspection: BlenderSourceInspection; process: BlenderProcessIdentity }> {
  const reportPath = path.join(state.work, "inspection.json");
  input.onProgress?.({ phase: "INSPECTING", completed: 0, total: 1 });
  const result = await run({ ...input, tool: input.blender, args: [...baseArgs, "--python", state.scripts.inspectPath, "--", state.source, reportPath], cwd: state.work, phase: "INSPECTING", timeoutMs: 120000, environment: state.env, tag: "inspect" });
  if (lstatSync(reportPath).size > 1024 * 1024) return fail("BLENDER_OUTPUT_INVALID");
  const report = JSON.parse(readFileSync(reportPath, "utf8")) as BlenderSourceInspection;
  if (report.schemaVersion !== 1 || report.blenderVersion !== "5.0.1" || report.sourceSha256 !== input.expectedSourceSha256 || !Array.isArray(report.scenes) || !report.scenes.length || report.scenes.length > 16 || !Array.isArray(report.unsupported) || !Array.isArray(report.dependencies)) return fail("BLENDER_OUTPUT_INVALID");
  if (hashBlenderFile(state.source).sha256 !== input.expectedSourceSha256) return fail("BLENDER_PIN_CHANGED");
  input.onProgress?.({ phase: "INSPECTING", completed: 1, total: 1 });
  return { inspection: report, process: result.identity };
}

export async function inspectBlenderSource(input: BlenderInspectionInput): Promise<BlenderSourceInspection> {
  if (executing) return fail("BLENDER_BUSY"); executing = true;
  try { return (await inspect(input, setup(input))).inspection; }
  finally { executing = false; }
}
export function getBlenderEditScripts() {
  if (process.env.CODEXFORGE_STUDIO_BLENDER_EDIT_ENABLED !== "1") return fail("BLENDER_JOB_INVALID", "Typed material editing is not enabled by this deployment.");
  const root = path.dirname(getBlenderAdapterScripts().inspect.path);
  const materialEdit = { path: exactCPath(path.join(root, "material_edit.py"), false), sha256: process.env.CODEXFORGE_STUDIO_BLENDER_EDIT_SHA256 ?? "" };
  const semanticSnapshot = { path: exactCPath(path.join(root, "semantic_snapshot.py"), false), sha256: process.env.CODEXFORGE_STUDIO_BLENDER_SEMANTIC_SHA256 ?? "" };
  for (const script of [materialEdit, semanticSnapshot]) if (!SHA.test(script.sha256) || hashBlenderFile(script.path, 1024 ** 2).sha256 !== script.sha256) fail("BLENDER_PIN_CHANGED");
  return { materialEdit, semanticSnapshot };
}
function freezeEditScripts(directory: string, expected: { materialEdit: string; semanticSnapshot: string }) {
  const scripts = getBlenderEditScripts(), target = path.join(directory, "native-edit-scripts"); mkdirSync(target);
  for (const [name, file] of [["materialEdit", "material_edit.py"], ["semanticSnapshot", "semantic_snapshot.py"]] as const) { const script = scripts[name]; if (script.sha256 !== expected[name]) fail("BLENDER_PIN_CHANGED"); const destination = path.join(target, file); copyFileSync(script.path, destination, constants.COPYFILE_EXCL); if (hashBlenderFile(destination, 1024 ** 2).sha256 !== expected[name]) fail("BLENDER_PIN_CHANGED"); }
  return { materialEdit: path.join(target, "material_edit.py"), semanticSnapshot: path.join(target, "semantic_snapshot.py") };
}
export async function inspectBlenderMaterials(input: BlenderInspectionInput & { policy: BlenderEditPolicy; scriptHashes: { materialEdit: string; semanticSnapshot: string } }) {
  if (executing) return fail("BLENDER_BUSY"); executing = true;
  try {
    const state = setup(input), scripts = freezeEditScripts(state.work, input.scriptHashes), requestPath = path.join(state.work, "material-inspection-request.json"), reportPath = path.join(state.work, "material-inspection.json");
    writeFileSync(requestPath, JSON.stringify({ format: "studio-blender-material-edit-request-v1", action: "inspect", sourcePath: state.source, sourceSha256: input.expectedSourceSha256, reportPath, policy: input.policy }), { flag: "wx" });
    await run({ ...input, tool: input.blender, args: [...baseArgs, "--python", scripts.materialEdit, "--", requestPath], cwd: state.work, phase: "INSPECTING_MATERIAL", timeoutMs: 120000, environment: state.env, tag: "material-inspect" });
    if (hashBlenderFile(state.source).sha256 !== input.expectedSourceSha256 || lstatSync(reportPath).size > 1024 ** 2) fail("BLENDER_PIN_CHANGED");
    const report = validateBlenderMaterialInspection(JSON.parse(readFileSync(reportPath, "utf8"))); if (report.sourceSha256 !== input.expectedSourceSha256) fail("BLENDER_OUTPUT_INVALID"); return report;
  } finally { executing = false; }
}
export async function applyBlenderMaterialEdit(input: BlenderInspectionInput & { proposal: BlenderEditProposal }) {
  if (executing) return fail("BLENDER_BUSY"); executing = true;
  try {
    assertBlenderEditAdapterBinding(input.proposal, input.adapterScriptDigest);
    assertBlenderEditAdapterBinding(input.proposal, getBlenderAdapterScripts().digest);
    const state = setup(input), proposal = input.proposal, scripts = freezeEditScripts(state.work, proposal.scriptHashes), outputPath = path.join(state.work, "edited.blend"), reportPath = path.join(state.work, "material-save.json"), requestPath = path.join(state.work, "material-edit-request.json");
    writeFileSync(requestPath, JSON.stringify({ format: "studio-blender-material-edit-request-v1", action: "apply", sourcePath: state.source, sourceSha256: input.expectedSourceSha256, reportPath, policy: proposal.policy, targetId: proposal.target.targetId, originalLinear: proposal.originalLinear, requestedLinear: proposal.requestedLinear, outputPath }), { flag: "wx" });
    await run({ ...input, tool: input.blender, args: [...baseArgs, "--python", scripts.materialEdit, "--", requestPath], cwd: state.work, phase: "SAVING_NATIVE_VERSION", timeoutMs: 120000, environment: state.env, tag: "material-save" });
    const output = hashBlenderFile(outputPath, 128 * 1024 ** 2); if (output.sha256 === input.expectedSourceSha256 || hashBlenderFile(state.source).sha256 !== input.expectedSourceSha256) fail("BLENDER_OUTPUT_INVALID");
    const verifyPath = path.join(state.work, "semantic-verification-request.json"), verificationPath = path.join(state.work, "semantic-verification.json");
    writeFileSync(verifyPath, JSON.stringify({ format: "studio-blender-semantic-verify-request-v1", sourcePath: state.source, sourceSha256: input.expectedSourceSha256, outputPath, outputSha256: output.sha256, reportPath: verificationPath, policy: proposal.policy, targetId: proposal.target.targetId, originalLinear: proposal.originalLinear, requestedLinear: proposal.requestedLinear }), { flag: "wx" });
    await run({ ...input, tool: input.blender, args: [...baseArgs, "--python", scripts.semanticSnapshot, "--", verifyPath], cwd: state.work, phase: "REOPENING_NATIVE_VERSION", timeoutMs: 120000, environment: state.env, tag: "material-reopen" });
    if (lstatSync(verificationPath).size > 32768) fail("BLENDER_OUTPUT_INVALID");
    const verification = validateBlenderMaterialVerification(JSON.parse(readFileSync(verificationPath, "utf8")), proposal);
    if (verification.outputSha256 !== output.sha256 || verification.outputBytes !== output.bytes || hashBlenderFile(state.source).sha256 !== input.expectedSourceSha256 || hashBlenderFile(outputPath).sha256 !== output.sha256) fail("BLENDER_OUTPUT_INVALID");
    assertBlenderEditAdapterBinding(proposal, getBlenderAdapterScripts().digest);
    if (hashBlenderFile(state.scripts.inspectPath, 131072).sha256 !== state.scripts.inspect.sha256 || hashBlenderFile(state.scripts.renderPath, 131072).sha256 !== state.scripts.render.sha256) fail("BLENDER_PIN_CHANGED");
    const reopened = await inspect({ ...input, expectedSourceSha256: output.sha256 }, { ...state, source: outputPath });
    if (!reopened.inspection.supported) fail("BLENDER_SOURCE_UNSUPPORTED");
    return { outputPath, ...output, verification, inspection: reopened.inspection };
  } finally { executing = false; }
}
export function validateBlenderRenderSelection(input: Pick<BlenderRenderInput, "scene" | "camera" | "startFrame" | "endFrame" | "fps" | "width" | "height">, inspection: BlenderSourceInspection): void {
  const scene = inspection.scenes.find(row => row.name === input.scene);
  if (!inspection.supported || inspection.dependencies.some(dep => !dep.packed) || inspection.drivers.length || inspection.embeddedScripts.some(script => script.autoRun)) return fail("BLENDER_SOURCE_UNSUPPORTED");
  if (!scene || !scene.cameras.includes(input.camera) || !Number.isSafeInteger(input.startFrame) || !Number.isSafeInteger(input.endFrame) || input.startFrame < scene.frameStart || input.endFrame > scene.frameEnd || input.startFrame > input.endFrame || input.endFrame - input.startFrame + 1 > 75 || input.width !== 1280 || input.height !== 720 || input.fps !== 25 || scene.fps !== 25 || scene.fpsBase !== 1) return fail("BLENDER_JOB_INVALID");
}
// Explicit IEC61966-2-1 EOTF then BT.709 OETF, in a 16-bit RGB LUT. The
// qualified zimg build's 709 transfer conversion gave a display-gamma result
// (linear0.18 -> Y123), not this signal-encoding OETF (linear0.18 -> Y106).
// Therefore zscale below changes ONLY matrix/range/subsampling, not transfer.
const SRGB_TO_BT709 = "st(0,if(lte(val/maxval,0.04045),val/maxval/12.92,pow((val/maxval+0.055)/1.055,2.4)));maxval*if(lt(ld(0),0.018),4.5*ld(0),1.099*pow(ld(0),0.45)-0.099)";
export const BLENDER_ENCODING_FILTER = `format=gbrp16le,lutrgb=r='${SRGB_TO_BT709}':g='${SRGB_TO_BT709}':b='${SRGB_TO_BT709}',zscale=primariesin=709:transferin=709:matrixin=gbr:rangein=full:primaries=709:transfer=709:matrix=709:range=limited:chromal=left:filter=point:dither=none,format=yuv420p`;

export async function renderBlenderPreview(input: BlenderRenderInput) {
  if (executing) return fail("BLENDER_BUSY"); executing = true;
  try {
    const state = setup(input), inspected = await inspect(input, state), processes = [inspected.process];
    validateBlenderRenderSelection(input, inspected.inspection); pin(input.ffmpeg); pin(input.ffprobe);
    const frames = input.endFrame - input.startFrame + 1, outputDirectory = path.join(state.work, "frames"); mkdirSync(outputDirectory);
    const requestPath = path.join(state.work, "render-request.json");
    writeFileSync(requestPath, JSON.stringify({ sourcePath: state.source, sourceSha256: input.expectedSourceSha256, outputDirectory, scene: input.scene, camera: input.camera, startFrame: input.startFrame, endFrame: input.endFrame, width: input.width, height: input.height }), { flag: "wx" });
    if (getBlenderAdapterScripts().digest !== input.adapterScriptDigest || hashBlenderFile(state.scripts.renderPath, 131072).sha256 !== state.scripts.render.sha256 || hashBlenderFile(state.scripts.inspectPath, 131072).sha256 !== state.scripts.inspect.sha256) return fail("BLENDER_PIN_CHANGED");
    const rendered = await run({ ...input, tool: input.blender, args: [...baseArgs, "--python", state.scripts.renderPath, "--", requestPath], cwd: state.work, phase: "RENDERING", timeoutMs: 960000, environment: state.env, tag: "render" }); processes.push(rendered.identity);
    if (readdirSync(outputDirectory).length !== frames) return fail("BLENDER_OUTPUT_INVALID");
    for (let i = 1; i <= frames; i++) hashBlenderFile(path.join(outputDirectory, `frame_${String(i).padStart(4, "0")}.png`), 32 * 1024 ** 2);
    const outputPath = path.join(state.work, "source.mp4");
    input.onProgress?.({ phase: "ENCODING", completed: 0, total: frames });
    const encoded = await run({ ...input, tool: input.ffmpeg, args: ["-nostdin", "-hide_banner", "-v", "error", "-n", "-threads", "2", "-filter_threads", "1", "-protocol_whitelist", "file,pipe", "-framerate", "25", "-start_number", "1", "-i", path.join(outputDirectory, "frame_%04d.png"), "-frames:v", String(frames), "-an", "-vf", BLENDER_ENCODING_FILTER, "-c:v", "libx264", "-threads", "2", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv", "-chroma_sample_location", "left", "-movflags", "+faststart", outputPath], cwd: state.work, phase: "ENCODING", timeoutMs: 120000, environment: state.env, tag: "encode" }); processes.push(encoded.identity);
    input.onProgress?.({ phase: "VALIDATING", completed: 0, total: 1 });
    const probed = await run({ ...input, tool: input.ffprobe, args: ["-v", "error", "-protocol_whitelist", "file,pipe", "-count_frames", "-show_streams", "-show_format", "-of", "json", outputPath], cwd: state.work, phase: "VALIDATING", timeoutMs: 60000, environment: state.env, tag: "probe" }); processes.push(probed.identity);
    const metadata = JSON.parse(probed.stdout), streams = metadata.streams as Record<string, unknown>[];
    if (!Array.isArray(streams) || streams.length !== 1) return fail("BLENDER_OUTPUT_INVALID");
    const v = streams[0];
    if (v.codec_type !== "video" || v.codec_name !== "h264" || v.width !== 1280 || v.height !== 720 || v.pix_fmt !== "yuv420p" || v.r_frame_rate !== "25/1" || v.avg_frame_rate !== "25/1" || Number(v.nb_read_frames) !== frames || Math.abs(Number(v.duration) - frames / 25) > 0.000001 || v.color_primaries !== "bt709" || v.color_transfer !== "bt709" || v.color_space !== "bt709" || v.color_range !== "tv") return fail("BLENDER_OUTPUT_INVALID");
    const decoded = await run({ ...input, tool: input.ffmpeg, args: ["-nostdin", "-hide_banner", "-v", "error", "-xerror", "-threads", "2", "-protocol_whitelist", "file,pipe", "-i", outputPath, "-map", "0:v:0", "-f", "null", "-"], cwd: state.work, phase: "VALIDATING", timeoutMs: 60000, environment: state.env, tag: "decode" }); processes.push(decoded.identity);
    const identity = hashBlenderFile(outputPath, 128 * 1024 ** 2);
    if (hashBlenderFile(state.source).sha256 !== input.expectedSourceSha256) return fail("BLENDER_PIN_CHANGED");
    input.onProgress?.({ phase: "VALIDATING", completed: 1, total: 1 });
    const result = { outputPath, ...identity, frames, fps: 25 as const, width: 1280 as const, height: 720 as const, inspection: inspected.inspection, processes, adapterVersion: BLENDER_ADAPTER_VERSION, adapterScriptDigest: state.scripts.digest, colourTransform: BLENDER_COLOUR_TRANSFORM, previewMode: "DIRECT_SCENE_NO_EXTERNAL_COMPOSITED_SHADOW" as const };
    writeFileSync(path.join(state.work, "adapter-result.json"), JSON.stringify(result, null, 2), { flag: "wx" });
    return result;
  } finally { executing = false; }
}

/** Test-only preparation of a two-frame synthetic native. Not exposed by any API. */
export async function qualifyBlenderFixture(input: BlenderAdapterCallbacks & { blender: BlenderToolPin; workDirectory: string; testCase?: "SAFE" | "DRIVER" }) {
  if (executing) return fail("BLENDER_BUSY"); executing = true;
  try {
    const work = exactCPath(input.workDirectory, true); checkSpace(work);
    if (input.testCase !== undefined && input.testCase !== "SAFE" && input.testCase !== "DRIVER") return fail("BLENDER_JOB_INVALID");
    const source = path.join(path.dirname(getBlenderAdapterScripts().inspect.path), "fixture.py"), expected = hashBlenderFile(source, 65536);
    const script = path.join(work, "fixture.py"); copyFileSync(exactCPath(source, false), script, constants.COPYFILE_EXCL);
    if (hashBlenderFile(script).sha256 !== expected.sha256) return fail("BLENDER_PIN_CHANGED");
    const outputPath = path.join(work, "fixture.blend");
    const result = await run({ ...input, tool: input.blender, args: [...baseArgs, "--python", script, "--", outputPath, input.testCase ?? "SAFE"], cwd: work, phase: "FIXTURE", timeoutMs: 120000, environment: environment(work, input.blender.path), tag: "fixture" });
    return { outputPath, ...hashBlenderFile(outputPath), process: result.identity };
  } finally { executing = false; }
}
