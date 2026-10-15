// Real-tool, isolated SDR colour regression. No application workspace, provider or network access.
// Independent signal/pixel helpers are exported for fresh full-output acceptance; importing this file runs no tests.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const writeJson = (filename, value) => fs.writeFileSync(filename, JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
const WIDTH = 1280, HEIGHT = 720, FRAMES = 8, FRAME_BYTES = WIDTH * HEIGHT * 3;
const colourFields = { color_primaries: "bt709", color_transfer: "bt709", color_space: "bt709", color_range: "tv" };

function toolEnvironment(executable, temporary) {
  const systemRoot = process.env.SystemRoot ?? process.env.WINDIR;
  assert.ok(systemRoot && path.isAbsolute(systemRoot), "A Windows system directory is required.");
  return { SystemRoot: systemRoot, WINDIR: systemRoot, PATH: path.dirname(executable), TEMP: temporary, TMP: temporary, AV_LOG_FORCE_NOCOLOR: "1" };
}
function runTool(executable, args, options) {
  const result = spawnSync(executable, args, { cwd: options.cwd, env: options.environment, windowsHide: true, shell: false, timeout: 30_000, maxBuffer: options.maxBuffer ?? 8 * 1024 ** 2 });
  if (options.log) writeJson(options.log, { executable, arguments: args, status: result.status, signal: result.signal, error: result.error ? String(result.error) : null, stderr: result.stderr?.toString("utf8") ?? "" });
  assert.equal(result.error, undefined, `Tool error: ${String(result.error)}`);
  assert.equal(result.status, 0, `Tool exit ${result.status}: ${result.stderr?.toString("utf8").slice(-4000)}`);
  return result;
}

/** MP4 structure parser: examines the actual visual sample-entry colr box, not FFprobe's merged view. */
export function readStudioMp4ColourBoxes(filename) {
  const stat = fs.lstatSync(filename);
  assert.ok(stat.isFile() && !stat.isSymbolicLink() && stat.size > 0 && stat.size <= 128 * 1024 ** 2, "Colour inspection requires a bounded regular MP4.");
  const bytes = fs.readFileSync(filename), found = [];
  const containers = new Set(["moov", "trak", "mdia", "minf", "stbl"]);
  function walk(start, end, ancestors) {
    let offset = start;
    while (offset < end) {
      assert.ok(offset + 8 <= end, "Truncated MP4 atom header.");
      let size = bytes.readUInt32BE(offset), header = 8;
      const type = bytes.toString("ascii", offset + 4, offset + 8);
      if (size === 1) { assert.ok(offset + 16 <= end); const wide = bytes.readBigUInt64BE(offset + 8); assert.ok(wide <= BigInt(Number.MAX_SAFE_INTEGER)); size = Number(wide); header = 16; }
      else if (size === 0) size = end - offset;
      assert.ok(size >= header && offset + size <= end, "Invalid MP4 atom extent.");
      const body = offset + header, next = offset + size, tree = [...ancestors, type];
      if (type === "colr" && ancestors.some(name => name === "avc1" || name === "avc3")) {
        assert.ok(size >= header + 10);
        const method = bytes.toString("ascii", body, body + 4);
        found.push({ offset, size, body, path: tree.join("/"), method, primaries: bytes.readUInt16BE(body + 4), transfer: bytes.readUInt16BE(body + 6), matrix: bytes.readUInt16BE(body + 8), fullRange: method === "nclx" && size >= header + 11 ? (bytes[body + 10] >> 7) : null });
      }
      if (containers.has(type)) walk(body, next, tree);
      else if (type === "stsd") { assert.ok(body + 8 <= next); walk(body + 8, next, tree); }
      else if (type === "avc1" || type === "avc3") { assert.ok(body + 78 <= next); walk(body + 78, next, tree); }
      offset = next;
    }
    assert.equal(offset, end);
  }
  walk(0, bytes.length, []);
  return found;
}
function traceField(trace, name) {
  const expression = new RegExp(`\\b${name}\\s+[01]+\\s*=\\s*(\\d+)`, "gu");
  return [...new Set([...trace.matchAll(expression)].map(match => Number(match[1])))];
}

/** Fresh stream, decoded-frame, H.264 VUI and MP4 colr checks. Does not force an assumed decode colour. */
export function inspectStudioColourSignals({ filename, ffmpegPath, ffprobePath, evidenceDirectory, environment, tag = "colour" }) {
  assert.match(tag, /^[a-z0-9_-]+$/u);
  const env = environment ?? toolEnvironment(ffmpegPath, evidenceDirectory), options = { cwd: evidenceDirectory, environment: env };
  const probeArgs = ["-v", "error", "-protocol_whitelist", "file,pipe", "-select_streams", "v:0", "-count_frames", "-show_streams", "-show_frames", "-show_entries", "stream=codec_name,width,height,pix_fmt,bits_per_raw_sample,color_range,color_space,color_transfer,color_primaries,chroma_location,r_frame_rate,avg_frame_rate,nb_read_frames:frame=pix_fmt,color_range,color_space,color_transfer,color_primaries,chroma_location", "-of", "json", filename];
  const probeRun = runTool(ffprobePath, probeArgs, { ...options, log: path.join(evidenceDirectory, `${tag}-probe-command.json`) });
  const probe = JSON.parse(probeRun.stdout.toString("utf8"));
  writeJson(path.join(evidenceDirectory, `${tag}-probe.json`), probe);
  const traceArgs = ["-hide_banner", "-nostdin", "-v", "info", "-protocol_whitelist", "file,pipe", "-i", filename, "-map", "0:v:0", "-c:v", "copy", "-bsf:v", "trace_headers", "-f", "null", "-"];
  const traceRun = runTool(ffmpegPath, traceArgs, { ...options, maxBuffer: 16 * 1024 ** 2, log: path.join(evidenceDirectory, `${tag}-vui-command.json`) });
  const trace = traceRun.stderr.toString("utf8");
  fs.writeFileSync(path.join(evidenceDirectory, `${tag}-vui.txt`), trace, { flag: "wx" });
  const vui = Object.fromEntries(["video_signal_type_present_flag", "video_full_range_flag", "colour_description_present_flag", "colour_primaries", "transfer_characteristics", "matrix_coefficients", "chroma_loc_info_present_flag", "chroma_sample_loc_type_top_field", "chroma_sample_loc_type_bottom_field"].map(name => [name, traceField(trace, name)]));
  const boxes = readStudioMp4ColourBoxes(filename), streams = probe.streams ?? [], frames = probe.frames ?? [];
  const checks = [];
  const check = (name, pass, details) => checks.push({ name, status: pass ? "PASS" : "FAIL", details });
  check("one H.264 8-bit 4:2:0 stream", streams.length === 1 && streams[0].codec_name === "h264" && streams[0].pix_fmt === "yuv420p" && [undefined, "8"].includes(streams[0].bits_per_raw_sample), streams);
  check("explicit stream BT709 limited-range and left chroma", streams.length === 1 && Object.entries(colourFields).every(([key, value]) => streams[0][key] === value) && streams[0].chroma_location === "left", streams[0]);
  check("every decoded frame retains BT709 limited-range 8-bit samples", frames.length > 0 && frames.every(frame => frame.pix_fmt === "yuv420p" && Object.entries(colourFields).every(([key, value]) => frame[key] === value) && (frame.chroma_location === undefined || frame.chroma_location === "left")), { decodedFrames: frames.length, distinctProperties: [...new Set(frames.map(frame => JSON.stringify(frame)))] });
  const expectedVui = { video_signal_type_present_flag: 1, video_full_range_flag: 0, colour_description_present_flag: 1, colour_primaries: 1, transfer_characteristics: 1, matrix_coefficients: 1 };
  check("H264 SPS VUI explicitly signals BT709 limited", Object.entries(expectedVui).every(([key, value]) => vui[key].length === 1 && vui[key][0] === value), vui);
  const chromaFlag = vui.chroma_loc_info_present_flag, topChroma = vui.chroma_sample_loc_type_top_field, bottomChroma = vui.chroma_sample_loc_type_bottom_field;
  const leftChroma = chromaFlag.length === 1 && (chromaFlag[0] === 0 && topChroma.length === 0 && bottomChroma.length === 0 || chromaFlag[0] === 1 && topChroma.length === 1 && topChroma[0] === 0 && bottomChroma.length === 1 && bottomChroma[0] === 0);
  check("H264 VUI left chroma is explicit location0 or standard inferred location0", leftChroma, { chromaFlag, topChroma, bottomChroma });
  check("MP4 nclx explicitly agrees with VUI", boxes.length === 1 && boxes[0].method === "nclx" && boxes[0].primaries === 1 && boxes[0].transfer === 1 && boxes[0].matrix === 1 && boxes[0].fullRange === 0, boxes);
  const result = { status: checks.every(item => item.status === "PASS") ? "PASS" : "FAIL", filename, byteLength: fs.statSync(filename).size, sha256: sha(fs.readFileSync(filename)), checks, probe, vui, boxes };
  writeJson(path.join(evidenceDirectory, `${tag}-signals.json`), result);
  return result;
}

/** Decode RGB using the stream's emitted matrix/range; forcing BT709 is reserved for retained defect diagnosis. */
export function decodeStudioColourFrame({ filename, frame, ffmpegPath, environment, cwd, forceBt709 = false }) {
  assert.ok(Number.isSafeInteger(frame) && frame >= 0 && frame <= 7500);
  const filters = [`select=eq(n\\,${frame})`, ...(forceBt709 ? ["scale=in_color_matrix=bt709:in_range=tv:out_range=pc"] : []), "format=rgb24"];
  const result = runTool(ffmpegPath, ["-hide_banner", "-nostdin", "-v", "error", "-xerror", "-protocol_whitelist", "file,pipe", "-i", filename, "-map", "0:v:0", "-vf", filters.join(","), "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"], { cwd, environment: environment ?? toolEnvironment(ffmpegPath, cwd), maxBuffer: 32 * 1024 ** 2 });
  assert.equal(result.stdout.length, FRAME_BYTES, "A complete 1280×720 RGB frame is required.");
  return result.stdout;
}
export function compareStudioColourFrames(actual, expected, excluded = null) {
  assert.equal(actual.length, FRAME_BYTES); assert.equal(expected.length, FRAME_BYTES);
  let pixels = 0, squares = 0, strong = 0, maximum = 0;
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
    if (excluded && x >= excluded.x0 && x < excluded.x1 && y >= excluded.y0 && y < excluded.y1) continue;
    pixels++; const offset = (y * WIDTH + x) * 3; let strongest = 0;
    for (let channel = 0; channel < 3; channel++) { const difference = Math.abs(actual[offset + channel] - expected[offset + channel]); squares += difference ** 2; strongest = Math.max(strongest, difference); maximum = Math.max(maximum, difference); }
    if (strongest > 40) strong++;
  }
  const rms = Math.sqrt(squares / (pixels * 3)), strongPixelFraction = strong / pixels;
  return { pass: rms < 10 && strongPixelFraction <= 0.005, rms, strongPixelFraction, maximum, pixels, thresholds: { rmsMaximumExclusive: 10, strongDifferenceThreshold: 40, strongPixelFractionMaximum: 0.005 } };
}

// ITU-R BT.709 luma coefficients, independently applied to studio-range 8-bit YCbCr code values.
// This oracle is arithmetic, not a second copy of the production FFmpeg filter graph.
export function limited709ToRgb(y, cb, cr) {
  const luma = (y - 16) / 219, blue = (cb - 128) / 224, red = (cr - 128) / 224, kr = 0.2126, kb = 0.0722, kg = 1 - kr - kb;
  return [luma + 2 * (1 - kr) * red, luma - 2 * kb * (1 - kb) / kg * blue - 2 * kr * (1 - kr) / kg * red, luma + 2 * (1 - kb) * blue].map(value => Math.max(0, Math.min(255, value * 255)));
}
const PATCHES = [[16, 128, 128], [235, 128, 128], [63, 102, 240], [126, 128, 128], [126, 128, 128], [150, 165, 100], [110, 100, 180], [170, 60, 145]];
function patchMeasurements(rgb, opacity = 1, transformed = false) {
  const boxes = PATCHES.map((yuv, index) => {
    const centerX = transformed ? 448 + index * 80 + 40 : index * 160 + 80, centerY = transformed ? 432 : 200;
    const expected = limited709ToRgb(...yuv).map(value => value * opacity), mean = [0, 0, 0]; let maximum = 0, pixels = 0;
    for (let y = centerY - 8; y < centerY + 8; y++) for (let x = centerX - 8; x < centerX + 8; x++) { pixels++; for (let channel = 0; channel < 3; channel++) { const actual = rgb[(y * WIDTH + x) * 3 + channel]; mean[channel] += actual; maximum = Math.max(maximum, Math.abs(actual - expected[channel])); } }
    return { index, yuv, expected, actualMean: mean.map(value => value / pixels), maximumAbsoluteChannelError: maximum, pass: maximum <= 4 };
  });
  return { pass: boxes.every(box => box.pass), boxes, tolerance: 4, justification: "Flat interiors exclude resampling/chroma edges. A 4/255 channel bound covers 8-bit conversion rounding and the existing lossy H264 CRF18 setting; no historical picture threshold is relaxed." };
}
function makeRawFixture(filename) {
  const plane = WIDTH * HEIGHT, buffer = Buffer.alloc(plane * 3 / 2);
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) buffer[y * WIDTH + x] = PATCHES[Math.floor(x / 160)][0];
  for (let y = 0; y < HEIGHT / 2; y++) for (let x = 0; x < WIDTH / 2; x++) { const sample = PATCHES[Math.floor(x / 80)]; buffer[plane + y * WIDTH / 2 + x] = sample[1]; buffer[plane * 5 / 4 + y * WIDTH / 2 + x] = sample[2]; }
  const descriptor = fs.openSync(filename, "wx");
  try { for (let index = 0; index < FRAMES; index++) fs.writeSync(descriptor, buffer); } finally { fs.closeSync(descriptor); }
}

async function main() {
  const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), startedAt = new Date().toISOString();
  assert.equal(path.resolve(process.cwd()), frontend);
  const evidenceRoot = process.env.STUDIO_COLOUR_EVIDENCE_ROOT ? path.resolve(process.env.STUDIO_COLOUR_EVIDENCE_ROOT) : path.join(frontend, ".codexforge", "acceptance");
  assert.equal(path.parse(evidenceRoot).root.toLowerCase(), "c:\\", "Colour evidence must remain on C:.");
  const evidence = path.join(evidenceRoot, `studio-render-colour-tests-${randomUUID()}`); fs.mkdirSync(evidence, { recursive: true });
  const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
  const configuration = loader.load("@/lib/codexforge/animation-studio/editorial-v2-render-config.server").readStudioRenderConfiguration(process.env, { forceHash: true });
  const contract = loader.load("@/lib/codexforge/animation-studio/editorial-v2-render-contract"), executor = loader.load("@/lib/codexforge/animation-studio/editorial-v2-render-executor.server"), canonical = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");
  const environment = toolEnvironment(configuration.ffmpeg.path, evidence), results = [], commands = [], outputs = [];
  const options = { cwd: evidence, environment };
  const check = (name, pass, details) => { results.push({ name, status: pass ? "PASS" : "FAIL", details }); };
  const ffmpeg = (label, args, cwd = evidence) => { commands.push({ label, arguments: args }); return runTool(configuration.ffmpeg.path, args, { ...options, cwd, log: path.join(evidence, `${label}-command.json`), maxBuffer: 32 * 1024 ** 2 }); };
  const prefix = ["-hide_banner", "-nostdin", "-n", "-v", "error", "-xerror"];
  const colourArgs = ["-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv", "-chroma_sample_location", "left"];
  const rawPath = path.join(evidence, "limited-patches.yuv"), sourcePath = path.join(evidence, "limited-patches.mp4");
  const inspect = (filename, tag) => inspectStudioColourSignals({ filename, ffmpegPath: configuration.ffmpeg.path, ffprobePath: configuration.ffprobe.path, evidenceDirectory: evidence, environment, tag });
  const frame = (filename, number, forceBt709 = false) => decodeStudioColourFrame({ filename, frame: number, ffmpegPath: configuration.ffmpeg.path, environment, cwd: evidence, forceBt709 });
  const at = "2026-10-01T00:00:00.000Z", projectId = "project_colour_test", compositionId = "composition_colour_test";
  const time = (numerator, denominator = 25) => { let a = numerator, b = denominator; while (b) [a, b] = [b, a % b]; return { numerator: numerator / a, denominator: denominator / a }; };
  function sourceAsset(filename, sourceFrames) {
    const bytes = fs.readFileSync(filename), contentHash = sha(bytes), duration = time(sourceFrames);
    return { schemaVersion: 1, assetId: "asset_colour_video", projectId, version: 1, sourcePath: "synthetic/colour-video", contentHash, assetType: "VIDEO", approvalState: "DRAFT", dependencies: [], rights: { status: "OWNED", license: null, evidence: "Locally generated colour patches or explicitly designated read-only acceptance source." }, createdAt: at, supersededBy: null, lineage: [], provenance: { adapterMetadata: { adapterId: "studio-local-footage-v1", provider: null, model: null, providerJobId: null, externalGenerationId: null, settings: { sourceLabel: "Qualified local colour regression", originalName: "colour.mp4", byteLength: bytes.length, contentType: "video/mp4", storage: "studio-footage-chunks-v1", originalAcquisitionCost: "UNKNOWN", costBasis: "LOCAL_IMPORT_NO_PROVIDER_REQUEST", technical: { schema: "studio-qualified-local-media-v1", mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width: WIDTH, height: HEIGHT, frameRate: { numerator: 25, denominator: 1 }, frameCadence: "CFR_25_EXACT", duration, sourceUnits: sourceFrames, sourceUnit: "FRAME", timeBase: { numerator: 1, denominator: 12800 }, colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1, probeDigest: contentHash } } }, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: at, cost: { currency: "GBP", minorUnits: 0 }, contentHash, parentAssets: [], jobId: null, approvalState: "DRAFT", rejectionReason: null } };
  }
  function buildSpec(asset, { transformed = false, title = false, frames = FRAMES, offset = 0, legacy = false } = {}) {
    const transform = { x: transformed ? 128 : 0, y: transformed ? 72 : 0, scaleX: transformed ? 0.5 : 1, scaleY: transformed ? 0.5 : 1, rotationDeg: 0, anchorX: 0.5, anchorY: 0.5 };
    const base = { schemaVersion: 2, compositionId, enabled: true, locked: false, solo: false, start: time(0), duration: time(frames), sourceOffset: time(offset), playbackRate: 1, reverse: false, transform, opacity: transformed ? 0.5 : 1, keyframes: [], createdAt: at, updatedAt: at, version: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } };
    const layers = [{ ...base, layerId: "layer_colour_video", name: "Colour patches", type: "VIDEO", source: { kind: "ASSET", asset: { assetId: asset.assetId, version: 1 }, takeId: null } }];
    if (title) layers.push({ ...base, layerId: "layer_colour_text", name: "Half opacity green title", type: "TEXT", source: { kind: "TEXT" }, start: time(2), duration: time(4), sourceOffset: time(0), transform: { ...transform, x: 0, y: 0, scaleX: 1, scaleY: 1 }, opacity: 0.5, text: { text: "H", fontRef: "ARIAL_REGULAR", fontSizePx: 256, color: "#00FF00" } });
    const composition = { schemaVersion: 2, compositionId, projectId, kind: "MASTER", shotId: null, name: "Independent colour regression", duration: time(frames), width: WIDTH, height: HEIGHT, layers, revision: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } };
    const planned = contract.buildStudioEditorialRenderSpec({ projectId, editorialHeadDigest: "a".repeat(64), editorialRevision: 1, composition, configuration, resolveSource: ref => ref.assetId === asset.assetId ? { asset, byteLength: asset.provenance.adapterMetadata.settings.byteLength, contentType: "video/mp4" } : null });
    assert.equal(planned.readiness.state, "READY", JSON.stringify(planned.readiness.blockers));
    if (!legacy) return planned.spec;
    const { colourPolicy, ...prior } = planned.spec; assert.ok(colourPolicy);
    return { ...prior, format: "studio-editorial-render-spec-v3" };
  }
  function render(label, spec, inputPath) {
    const directory = path.join(evidence, label); fs.mkdirSync(directory);
    fs.copyFileSync(configuration.font.path, path.join(directory, "font.ttf"), fs.constants.COPYFILE_EXCL);
    const pcm = path.join(directory, "silence.f32le"), samples = contract.studioEditorialRenderSpecTiming(spec).expectedAudioSamples;
    fs.writeFileSync(pcm, Buffer.alloc(samples * 8), { flag: "wx" });
    const plan = executor.buildStudioRenderFilterPlan(spec, directory, new Map([["asset_colour_video@1", inputPath]]), pcm), output = path.join(directory, "output.mp4");
    writeJson(path.join(directory, "spec.json"), spec); writeJson(path.join(directory, "plan.json"), plan);
    const args = [...prefix, ...plan.arguments, "-/filter_complex", plan.filterPath, "-map", "[vout]", "-map", "[aout]", "-frames:v", String(spec.preset.expectedFrames), "-r", "25", "-fps_mode", "cfr", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level:v", "3.1", ...plan.colourArguments, "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", "-movflags", spec.format === "studio-editorial-render-spec-v4" ? "+faststart+write_colr" : "+faststart", "-map_metadata", "-1", "-map_chapters", "-1", output];
    ffmpeg(label, args, directory); outputs.push({ label, path: output, bytes: fs.statSync(output).size, sha256: sha(fs.readFileSync(output)), specDigest: canonical.hashJarvisChatCanonicalJson(spec) });
    ffmpeg(`${label}-strict-decode`, ["-hide_banner", "-nostdin", "-v", "error", "-xerror", "-protocol_whitelist", "file,pipe", "-i", output, "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"]);
    return output;
  }
  try {
    makeRawFixture(rawPath);
    // These raw code values were constructed in BT709 limited range. Establish input frame
    // properties before encoding so FFmpeg cannot convert an unspecified rawvideo matrix.
    ffmpeg("source-fixture", [...prefix, "-f", "rawvideo", "-pixel_format", "yuv420p", "-video_size", "1280x720", "-framerate", "25", "-protocol_whitelist", "file,pipe", "-i", rawPath, "-vf", "setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709", "-frames:v", String(FRAMES), "-an", "-c:v", "libx264", "-crf", "0", "-preset", "ultrafast", "-pix_fmt", "yuv420p", ...colourArgs, "-movflags", "+faststart+write_colr", sourcePath]);
    const sourceSignal = inspect(sourcePath, "source"); check("independently constructed limited YCbCr source is explicitly qualified", sourceSignal.status === "PASS", sourceSignal.checks);
    const sourceRgb = frame(sourcePath, 0), sourcePixels = patchMeasurements(sourceRgb); check("source decoder agrees with arithmetic BT709 limited-range oracle", sourcePixels.pass, sourcePixels);
    const asset = sourceAsset(sourcePath, FRAMES), plain = render("v4-patches-title", buildSpec(asset, { title: true }), sourcePath), plainSignal = inspect(plain, "v4-patches-title");
    check("production v4 graph stream-frame-container-bitstream signalling", plainSignal.status === "PASS", plainSignal.checks);
    const start = frame(plain, 0), beforeTitle = frame(plain, 1), firstTitle = frame(plain, 2), lastTitle = frame(plain, 5), afterTitle = frame(plain, 6), patchResult = patchMeasurements(start);
    check("production decoded patch colours preserve black white neutral and chromatic interiors", patchResult.pass, patchResult);
    const expectedGrey = limited709ToRgb(...PATCHES[3]), expectedTitle = expectedGrey.map((value, channel) => (value + (channel === 1 ? 255 : 0)) / 2);
    // The white, opaque glyph mask only identifies font interiors. Colour and alpha expectations
    // still come from independent arithmetic, never from the production colour conversion graph.
    // The retained 96px HHHH failure sampled thin strokes within codec/chroma edge support:
    // radius5 erosion left no pixels. A supported 256px H supplies genuine flat interiors,
    // eroded by a full 8px border. The <=4 colour tolerance and actual 36px acceptance title
    // remain unchanged; this fixture tests flat colour/alpha, not lossy edge reconstruction.
    const mask = ffmpeg("independent-title-mask", ["-hide_banner", "-nostdin", "-v", "error", "-f", "lavfi", "-i", "color=c=black:s=1280x720:r=25:d=0.04,format=rgba", "-vf", "drawtext=fontfile=font.ttf:text=H:fontsize=256:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2,format=rgb24", "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"], path.dirname(plain)).stdout;
    assert.equal(mask.length, FRAME_BYTES); fs.writeFileSync(path.join(evidence, "independent-title-mask.rgb"), mask, { flag: "wx" });
    const titleCoreOffsets = []; let unexpectedOutsideTitle = 0;
    for (let y = 200; y < 520; y++) for (let x = 490; x < 790; x++) {
      let core = true;
      for (let dy = -8; dy <= 8 && core; dy++) for (let dx = -8; dx <= 8; dx++) if (mask[((y + dy) * WIDTH + x + dx) * 3] < 254) { core = false; break; }
      if (core) titleCoreOffsets.push((y * WIDTH + x) * 3);
    }
    for (const rendered of [firstTitle, lastTitle]) for (const [x, y] of [[80, 200], [1200, 200], [640, 100], [640, 600]]) { const offset = (y * WIDTH + x) * 3; if ([0, 1, 2].some(channel => Math.abs(rendered[offset + channel] - start[offset + channel]) > 4)) unexpectedOutsideTitle++; }
    const coreComparison = (rendered, frameNumber, expected) => {
      let maximumAbsoluteChannelError = 0;
      for (const offset of titleCoreOffsets) for (let channel = 0; channel < 3; channel++) maximumAbsoluteChannelError = Math.max(maximumAbsoluteChannelError, Math.abs(rendered[offset + channel] - expected[channel]));
      return { frame: frameNumber, expected, pixels: titleCoreOffsets.length, maximumAbsoluteChannelError, tolerance: 4, pass: titleCoreOffsets.length >= 500 && maximumAbsoluteChannelError <= 4 };
    };
    const titleBoundaryChecks = [coreComparison(firstTitle, 2, expectedTitle), coreComparison(lastTitle, 5, expectedTitle)];
    const absentBoundaryChecks = [coreComparison(beforeTitle, 1, expectedGrey), coreComparison(afterTitle, 6, expectedGrey)];
    check("green title has intended half-opacity encoded-RGB core at both exact active boundaries", titleBoundaryChecks.every(item => item.pass) && unexpectedOutsideTitle === 0, { titleBoundaryChecks, unexpectedOutsideTitle, halfOpenFrameInterval: "[2,6)", fixture: { text: "H", fontSizePx: 256, maskErosionRadius: 8, minimumCorePixels: 500, note: "Thick admitted glyph provides flat interiors beyond codec/chroma edge support; earlier thin-glyph failure retained, tolerance unchanged." } });
    check("title core independently matches neutral source immediately before and after its interval", absentBoundaryChecks.every(item => item.pass), { absentBoundaryChecks, halfOpenFrameInterval: "[2,6)", note: "Both absent frames are compared to independently computed source RGB, not merely to one another; an always-on title must fail." });
    const transformed = render("v4-transformed-half-alpha", buildSpec(asset, { transformed: true }), sourcePath), transformedSignal = inspect(transformed, "v4-transformed-half-alpha"), transformedRgb = frame(transformed, 0), alphaResult = patchMeasurements(transformedRgb, 0.5, true);
    check("scaled translated straight-alpha video retains half-opacity colours", transformedSignal.status === "PASS" && alphaResult.pass, { signals: transformedSignal.checks, pixels: alphaResult });
    const blackSamples = [[400, 432], [1100, 432], [640, 240], [640, 624]].map(([x, y]) => ({ x, y, rgb: [...transformedRgb.subarray((y * WIDTH + x) * 3, (y * WIDTH + x) * 3 + 3)] }));
    check("transformed geometry exposes a black canvas without range lift", blackSamples.every(item => item.rgb.every(value => value <= 4)), blackSamples);
    const prior = render("v3-retained-defect", buildSpec(asset, { legacy: true }), sourcePath), priorSignal = inspect(prior, "v3-retained-defect"), priorForced = patchMeasurements(frame(prior, 0, true));
    check("historical v3 reproduces missing-signalling and wrong-matrix failure under common BT709 diagnosis", priorSignal.status === "FAIL" && !priorForced.pass, { signalChecks: priorSignal.checks, forcedBt709DiagnosticOnly: priorForced, note: "Forced interpretation reproduces the retained old failure only; corrected acceptance always decodes actual emitted signalling." });
    for (const [label, filter] of [
      ["negative-wrong-matrix", "scale=in_color_matrix=bt709:in_range=tv:out_range=pc,format=rgb24,scale=in_range=pc:out_range=tv:out_color_matrix=bt601,format=yuv420p"],
      ["negative-wrong-range", "scale=in_color_matrix=bt709:in_range=pc:out_range=pc,format=rgb24,scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p"],
    ]) {
      const output = path.join(evidence, label + ".mp4");
      // Deliberately preserve the wrong samples while claiming the required tags. This control
      // must pass signal inspection and fail the independent arithmetic pixel oracle.
      ffmpeg(label, [...prefix, "-protocol_whitelist", "file,pipe", "-i", sourcePath, "-vf", `${filter},setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709`, "-frames:v", "1", "-an", "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", ...colourArgs, "-movflags", "+write_colr", output]);
      const signals = inspect(output, label), pixels = patchMeasurements(frame(output, 0));
      check(`${label} passes tags but independent pixels reject actual bad processing`, signals.status === "PASS" && !pixels.pass, { signalChecks: signals.checks, pixels });
    }
    const conflict = path.join(evidence, "negative-conflicting-container.mp4"), conflictBytes = fs.readFileSync(plain), correctBox = readStudioMp4ColourBoxes(plain)[0];
    assert.ok(correctBox); conflictBytes.writeUInt16BE(6, correctBox.body + 8); fs.writeFileSync(conflict, conflictBytes, { flag: "wx" });
    const conflictSignals = inspect(conflict, "negative-conflicting-container");
    check("independent MP4 versus SPS check rejects contradictory matrix signalling", conflictSignals.status === "FAIL" && conflictSignals.boxes[0]?.matrix === 6 && conflictSignals.vui.matrix_coefficients.join() === "1", conflictSignals.checks);
    if (process.env.STUDIO_COLOUR_COBALT_PATH) {
      const cobalt = path.resolve(process.env.STUDIO_COLOUR_COBALT_PATH), cobaltStat = fs.lstatSync(cobalt); assert.ok(cobaltStat.isFile() && !cobaltStat.isSymbolicLink() && cobaltStat.size <= 16 * 1024 ** 2);
      const beforeHash = sha(fs.readFileSync(cobalt)), cobaltSignals = inspect(cobalt, "cobalt-source");
      const sourceChecks = cobaltSignals.checks.filter(item => item.name !== "MP4 nclx explicitly agrees with VUI");
      assert.ok(sourceChecks.every(item => item.status === "PASS"), "The designated source must have explicit supported stream/frame/VUI properties; an absent source colr box is not contradictory signalling."); assert.equal(cobaltSignals.probe.streams[0].nb_read_frames, "450");
      check("designated cobalt source retains explicit admitted colour without inventing absent container metadata", sourceChecks.every(item => item.status === "PASS") && (cobaltSignals.boxes.length === 0 || cobaltSignals.boxes.every(box => box.primaries === 1 && box.transfer === 1 && box.matrix === 1 && box.fullRange === 0)), { sourceChecks, containerColourBoxes: cobaltSignals.boxes, note: "Source admission historically requires explicit stream colour; new output agreement is stricter and independently required." });
      const cobaltAsset = sourceAsset(cobalt, 450), corrected = render("cobalt-corrected-frame24", buildSpec(cobaltAsset, { frames: 1, offset: 24 }), cobalt), correctedSignals = inspect(corrected, "cobalt-corrected-frame24");
      const expected = frame(cobalt, 24), comparison = compareStudioColourFrames(frame(corrected, 0), expected);
      check("designated cobalt source frame24 passes unchanged source-agreement thresholds after production repair", correctedSignals.status === "PASS" && comparison.pass, { comparison, signals: correctedSignals.checks, referenceFrame: 24, outputFrame: 0, sourceHash: beforeHash });
      const legacy = render("cobalt-legacy-frame24", buildSpec(cobaltAsset, { frames: 1, offset: 24, legacy: true }), cobalt), oldComparison = compareStudioColourFrames(frame(legacy, 0, true), expected);
      check("same cobalt frame reproduces historical failure through retained v3 production graph", !oldComparison.pass, { forcedBt709DiagnosticOnly: oldComparison });
      check("designated cobalt source bytes remain unchanged", sha(fs.readFileSync(cobalt)) === beforeHash, { path: cobalt, bytes: cobaltStat.size, sha256: beforeHash });
    }
  } catch (error) { check("real-tool regression execution", false, { error: String(error?.stack ?? error) }); }
  const sourceBindings = [...new Set([...loader.loaded, "scripts/test-animation-studio-render-colour.mjs", "scripts/animation-studio-test-loader.mjs"])].sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
  const result = { status: results.length > 0 && results.every(item => item.status === "PASS") && networkAttempts.length === 0 ? "PASS" : "FAIL", startedAt, finishedAt: new Date().toISOString(), evidence, passed: results.filter(item => item.status === "PASS").length, failed: results.filter(item => item.status === "FAIL").length, results, commands, outputs, sourceBindings, qualifiedTools: configuration, networkAttempts, providerRequests: 0, generationRequests: 0, nativeAddonBuilds: 0, applicationWorkspaceAccess: false, importedSources: false };
  writeJson(path.join(evidence, "result.json"), result); console.log(JSON.stringify(result)); if (result.status !== "PASS") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
