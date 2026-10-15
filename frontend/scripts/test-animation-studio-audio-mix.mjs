// Pure bounded mix contracts; real tool execution is a separate qualified acceptance gate.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), loader = createStudioTestLoader(frontend), networkAttempts = blockStudioTestNetwork();
const mixApi = loader.load("@/lib/codexforge/animation-studio/editorial-v2-audio-mix"), cryptoApi = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto"), renderContract = loader.load("@/lib/codexforge/animation-studio/editorial-v2-render-contract");
const time = samples => { let a = samples, b = 48_000; while (b) [a, b] = [b, a % b]; return { numerator: samples / a, denominator: 48_000 / a }; };
const source = { assetId: "asset_audio_test", version: 1, contentHash: "1".repeat(64), assetManifestDigest: "2".repeat(64), assetType: "AUDIO", byteLength: 1_000, contentType: "audio/wav" };
const audio = (id, start = 0, offset = 0) => ({ layerId: id, name: id, type: "AUDIO", enabled: true, solo: false, start: time(start), duration: time(48), sourceOffset: time(offset), source: { kind: "ASSET", asset: { assetId: source.assetId, version: 1 }, takeId: null }, audio: { gainDb: -6, muted: false, fadeIn: time(4), fadeOut: time(8) }, provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } });
const composition = layers => ({ compositionId: "composition_test", duration: { numerator: 1, denominator: 1 }, layers });
const pcm = values => { const bytes = Buffer.alloc(values.length * 4); values.forEach((value, index) => bytes.writeFloatLE(value, index * 4)); return bytes; };
const tests = [], results = [], test = (name, run) => tests.push({ name, run });
test("four occurrences reuse one source identity in stable composition order with exact sample offsets", () => {
  const value = mixApi.buildStudioAudioMix(composition([audio("layer_music"), audio("layer_voice", 9, 2), audio("layer_sfx_a", 20, 6), audio("layer_sfx_b", 101, 14)]), [source]);
  assert.deepEqual(value.occurrences.map(item => [item.layerId, item.startSample, item.sourceOffsetSamples]), [["layer_music", 0, 0], ["layer_voice", 9, 2], ["layer_sfx_a", 20, 6], ["layer_sfx_b", 101, 14]]);
  assert.equal(new Set(value.occurrences.map(item => `${item.source.assetId}:${item.source.version}:${item.source.contentHash}`)).size, 1);
  assert.equal(value.policy.normalization, "NONE");
});
test("fifth saved occurrence blocks renderer even if muted without changing input composition", () => {
  const value = composition(Array.from({ length: 5 }, (_, index) => audio(`layer_${index}`))); value.layers[4].audio.muted = true;
  const before = structuredClone(value); assert.throws(() => mixApi.buildStudioAudioMix(value, [source]), error => error.code === "AUDIO_MIX_CAPACITY"); assert.deepEqual(value, before);
});
test("audio and fades admit one-sample timing but reject fractional samples", () => {
  const item = audio("layer_exact", 1, 3); item.audio.fadeIn = time(1); const value = mixApi.buildStudioAudioMix(composition([item]), [source]); assert.equal(value.occurrences[0].fadeInSamples, 1);
  item.audio.fadeIn = { numerator: 1, denominator: 96_000 }; assert.throws(() => mixApi.buildStudioAudioMix(composition([item]), [source]), error => error.code === "AUDIO_SAMPLE_ALIGNMENT_REQUIRED");
});
test("saved gain fades mute and enabled selection alter the immutable mix binding", () => {
  const current = composition([audio("layer_bound")]), original = mixApi.buildStudioAudioMix(current, [source]);
  for (const change of [layer => layer.audio.gainDb -= 6, layer => layer.audio.muted = true, layer => layer.enabled = false, layer => layer.audio.fadeOut = time(9), layer => layer.sourceOffset = time(2)]) {
    const next = structuredClone(current); change(next.layers[0]); assert.notEqual(cryptoApi.hashJarvisChatCanonicalJson(mixApi.buildStudioAudioMix(next, [source])), cryptoApi.hashJarvisChatCanonicalJson(original));
  }
});
test("v3 and v4 validation reject detached mix instructions without rewriting the composition", () => {
  for (const format of ["studio-editorial-render-spec-v3", "studio-editorial-render-spec-v4"]) {
    const current = composition([audio("layer_bound")]), before = structuredClone(current);
    const spec = { format, composition: current, sources: [source], audioMix: mixApi.buildStudioAudioMix(current, [source]), ...(format.endsWith("v4") ? { colourPolicy: structuredClone(renderContract.STUDIO_RENDER_COLOUR_POLICY) } : {}) };
    assert.equal(renderContract.hasStudioAudioMix(spec), true); mixApi.validateStudioAudioMix(spec);
    spec.audioMix.occurrences[0].gainDb = 0; assert.throws(() => mixApi.validateStudioAudioMix(spec), error => error.code === "AUDIO_MIX_INVALID"); assert.deepEqual(current, before);
  }
});
test("colour-policy revision retains the exact ordered mix and sample graph without changing legacy format selection", () => {
  const current = composition([audio("layer_music"), audio("layer_voice", 9, 2), audio("layer_sfx_a", 20, 6), audio("layer_sfx_b", 101, 14)]);
  const old = { format: "studio-editorial-render-spec-v3", composition: current, sources: [source], audioMix: mixApi.buildStudioAudioMix(current, [source]) };
  const corrected = { ...structuredClone(old), format: "studio-editorial-render-spec-v4", colourPolicy: structuredClone(renderContract.STUDIO_RENDER_COLOUR_POLICY) };
  mixApi.validateStudioAudioMix(old); mixApi.validateStudioAudioMix(corrected);
  assert.deepEqual(corrected.audioMix, old.audioMix); assert.deepEqual(corrected.composition, old.composition); assert.deepEqual(corrected.sources, old.sources);
  assert.equal(mixApi.buildStudioAudioMixGraph(corrected.audioMix, 48_000, occurrence => current.layers.findIndex(layer => layer.layerId === occurrence.layerId)), mixApi.buildStudioAudioMixGraph(old.audioMix, 48_000, occurrence => current.layers.findIndex(layer => layer.layerId === occurrence.layerId)));
  assert.equal(renderContract.hasStudioAudioMix({ format: "studio-editorial-render-spec-v1" }), false); assert.equal(renderContract.hasStudioAudioMix({ format: "studio-editorial-render-spec-v2" }), false);
});
test("solo selection remains the existing visual/editor rule and mute independently removes contribution", () => {
  const first = audio("layer_a"), second = audio("layer_b"); first.solo = true; second.audio.muted = true;
  const value = mixApi.buildStudioAudioMix(composition([first, second]), [source]); assert.deepEqual(value.occurrences.map(mixApi.studioAudioOccurrenceParticipates), [true, false]);
});
test("production graph trims and fades locally before sample delay and explicit non-normalizing sum", () => {
  const mix = mixApi.buildStudioAudioMix(composition([audio("layer_a", 17, 31)]), [source]), graph = mixApi.buildStudioAudioMixGraph(mix, 48_000, () => 0);
  assert.ok(graph.indexOf("atrim=start_sample=31:end_sample=79") < graph.indexOf("afade=t=in:ss=0:ns=4:curve=tri"));
  assert.ok(graph.indexOf("afade=t=out:ss=40:ns=8:curve=tri") < graph.indexOf("adelay=delays=17S:all=1"));
  assert.ok(graph.includes("amix=inputs=2:duration=longest:dropout_transition=0:normalize=0"));
});
test("zero and all-muted tracks produce full-duration stereo silence without source input mapping", () => {
  for (const layers of [[], [{ ...audio("layer_muted"), audio: { ...audio("layer_muted").audio, muted: true } }]]) {
    const graph = mixApi.buildStudioAudioMixGraph(mixApi.buildStudioAudioMix(composition(layers), [source]), 48_000, () => { throw Error("muted source mapping"); });
    assert.ok(graph.includes("atrim=end_sample=48000")); assert.equal(graph.includes("amix="), false);
  }
});
test("unclamped PCM scanner preserves exact stereo count across arbitrary chunk boundaries", () => {
  const bytes = pcm([0.25, -0.5, 0, 1, -1, 0]), inspector = mixApi.createStudioAudioPcmInspector(3);
  for (let index = 0; index < bytes.length; index += 3) inspector.accept(bytes.subarray(index, index + 3));
  const report = inspector.finish(); assert.equal(report.frames, 3); assert.equal(report.bytes, 24); assert.equal(report.peakAbsolute, 1); assert.equal(report.nonzeroSamples, 4); mixApi.validateStudioAudioPcmReport(report, 3);
});
test("over-full-scale PCM is rejected and not normalized", () => {
  const inspector = mixApi.createStudioAudioPcmInspector(1); inspector.accept(pcm([1.0001, 0])); assert.throws(() => inspector.finish(), error => error.code === "AUDIO_MIX_CLIPPING");
});
test("nonfinite PCM fails immediately", () => {
  for (const value of [NaN, Infinity, -Infinity]) { const inspector = mixApi.createStudioAudioPcmInspector(1); assert.throws(() => inspector.accept(pcm([value, 0])), error => error.code === "AUDIO_MIX_NONFINITE"); }
});
test("PCM scanner rejects missing samples overflow and unbounded chunks", () => {
  const short = mixApi.createStudioAudioPcmInspector(2); short.accept(pcm([0, 0])); assert.throws(() => short.finish(), error => error.code === "AUDIO_MIX_INVALID");
  assert.throws(() => mixApi.createStudioAudioPcmInspector(1).accept(pcm([0, 0, 0])), error => error.code === "AUDIO_MIX_INVALID");
  assert.throws(() => mixApi.createStudioAudioPcmInspector(100_000).accept(Buffer.alloc(524_289)), error => error.code === "AUDIO_MIX_INVALID");
});
test("quality reports reject clipping nonfinite peak or incorrect sample counts", () => {
  const inspector = mixApi.createStudioAudioPcmInspector(1); inspector.accept(pcm([0, 0])); const report = inspector.finish();
  for (const change of [{ peakAbsolute: 1.1 }, { rms: NaN }, { bytes: 16 }, { frames: 2 }, { nonzeroSamples: 3 }]) assert.throws(() => mixApi.validateStudioAudioPcmReport({ ...report, ...change }, 1), error => error.code === "AUDIO_MIX_INVALID");
});
for (const item of tests) { try { await item.run(); results.push({ name: item.name, status: "PASS" }); } catch (error) { results.push({ name: item.name, status: "FAIL", error: String(error?.stack ?? error) }); } }
const sourceBindings = [...new Set([...loader.loaded, "scripts/test-animation-studio-audio-mix.mjs", "scripts/animation-studio-test-loader.mjs"])].sort().map(name => ({ path: name, sha256: createHash("sha256").update(fs.readFileSync(path.join(frontend, name))).digest("hex") }));
const result = { status: results.every(item => item.status === "PASS") && networkAttempts.length === 0 ? "PASS" : "FAIL", planned: tests.length, passed: results.filter(item => item.status === "PASS").length, results, sourceBindings, networkAttempts, providerRequests: 0, generationRequests: 0, nativeExecution: false };
console.log(JSON.stringify(result)); if (result.status !== "PASS") process.exitCode = 1;
