// Pure AUDIO timing and bounded HTTP admission. No media execution or persistence
// claim; native saved-head/replay/history coverage lives in trailer-03 integration.
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createStudioTestLoader, blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(root);
const { setAudioLayerV2Timing, trimLayerV2Time, splitLayerV2Time } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-contract");
const { createStudioEditorialV2Handler } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-http.server");
const rational = (numerator, denominator = 1) => ({ numerator, denominator });
const layer = () => ({ type: "AUDIO", source: { kind: "ASSET", asset: { assetId: "asset_audio", version: 1 }, takeId: null }, playbackRate: 1, reverse: false, keyframes: [], start: rational(2), duration: rational(5), sourceOffset: rational(1), audio: { gainDb: -9, fadeIn: rational(1, 2), fadeOut: rational(1), muted: false } });
const results = [];
async function test(name, action) { try { await action(); results.push({ name, status: "PASS" }); } catch (error) { results.push({ name, status: "FAIL", message: error.message, stack: error.stack }); } }

await test("Exact non-video-grid sample times survive unchanged and do not mutate the input", () => {
  const saved = layer(), before = JSON.stringify(saved), target = { start: rational(96001, 48000), duration: rational(96001, 48000), sourceOffset: rational(1, 48000) };
  assert.deepEqual(setAudioLayerV2Timing(saved, target), target); assert.equal(JSON.stringify(saved), before);
});
await test("AUDIO timing rejects VIDEO, retiming, reversal, keyframes and Take references", () => {
  const target = { start: rational(0), duration: rational(2), sourceOffset: rational(0) };
  for (const change of [{ type: "VIDEO" }, { playbackRate: 2 }, { reverse: true }, { keyframes: [{}] }, { source: { ...layer().source, takeId: "take_visual" } }]) assert.throws(() => setAudioLayerV2Timing({ ...layer(), ...change }, target));
});
await test("Each timing and fade must be sample-aligned; no rounding or fade repair occurs", () => {
  const target = { start: rational(0), duration: rational(2), sourceOffset: rational(0) };
  for (const field of ["start", "duration", "sourceOffset"]) assert.throws(() => setAudioLayerV2Timing(layer(), { ...target, [field]: rational(1, 7) }));
  for (const field of ["fadeIn", "fadeOut"]) assert.throws(() => setAudioLayerV2Timing({ ...layer(), audio: { ...layer().audio, [field]: rational(1, 7) } }, target));
  assert.throws(() => setAudioLayerV2Timing(layer(), { ...target, duration: rational(1, 2) }));
  assert.throws(() => setAudioLayerV2Timing(layer(), { ...target, duration: rational(0) }));
  assert.throws(() => setAudioLayerV2Timing(layer(), { ...target, start: rational(Number.MAX_SAFE_INTEGER) }));
});
await test("Overlapping saved fades remain independent when both fit the occurrence", () => {
  const saved = { ...layer(), audio: { ...layer().audio, fadeIn: rational(2), fadeOut: rational(2) } }, target = { start: rational(4), duration: rational(2), sourceOffset: rational(1) };
  assert.deepEqual(setAudioLayerV2Timing(saved, target), target);
});
await test("Existing AUDIO inward trim semantics remain exact while VIDEO-only split stays rejected", () => {
  assert.deepEqual(trimLayerV2Time(layer(), "IN", rational(3)), { start: rational(3), duration: rational(4), sourceOffset: rational(2) });
  assert.throws(() => splitLayerV2Time(layer(), rational(3)), error => error.code === "UNSUPPORTED_LAYER_SPLIT");
});

const calls = [], handler = createStudioEditorialV2Handler({ enabled: true, listenerAddresses: () => ["127.0.0.1"], openRepository: () => ({ editEditorialV2Layer(body, key, actor) { calls.push({ body, key, actor }); return { revision: 2 }; }, close() {} }) });
const base = { projectId: "project_audio", expectedRevision: 1, expectedCompositionRevision: 1, compositionId: "composition_audio", layerId: "layer_audio", requestedAt: "2026-09-30T13:30:00.000Z" };
const timing = { operation: "SET_AUDIO_LAYER_TIMING", ...base, start: rational(96001, 48000), duration: rational(2), sourceOffset: rational(1) };
async function request(body) { const response = await handler(new Request("http://127.0.0.1:3381/api/codexforge/animation-studio/editorial-v2", { method: "POST", headers: { Host: "127.0.0.1:3381", Origin: "http://127.0.0.1:3381", "Sec-Fetch-Site": "same-origin", "X-CodexForge-Animation-Studio": "local-operator-v1", "Content-Type": "application/json", "Idempotency-Key": "audio-contract-check" }, body: JSON.stringify(body) })); return { status: response.status, body: await response.json() }; }
await test("HTTP admits exactly the AUDIO timing command with unchanged request and idempotency key", async () => {
  const result = await request(timing); assert.equal(result.status, 200); assert.deepEqual(calls.at(-1).body, timing); assert.equal(calls.at(-1).key, "audio-contract-check"); assert.equal(result.body.providerRequests, 0);
});
await test("HTTP rejects unknown timing fields and noncanonical/zero durations before repository access", async () => {
  const before = calls.length;
  for (const change of [{ extra: true }, { duration: rational(0) }, { duration: rational(2, 2) }, { sourceOffset: { numerator: -1, denominator: 1 } }]) assert.equal((await request({ ...timing, ...change })).status, 400);
  assert.equal(calls.length, before);
});
await test("HTTP accepts bounded names with the existing property operation and rejects unsafe names", async () => {
  const body = { operation: "SET_LAYER_PROPERTIES", ...base, changes: { name: "Music / Voiceover / SFX A" } };
  assert.equal((await request(body)).status, 200); assert.deepEqual(calls.at(-1).body.changes, body.changes);
  const before = calls.length;
  for (const name of ["", " ", "x".repeat(161), "bad\nname", 123]) assert.equal((await request({ ...body, changes: { name } })).status, 400);
  assert.equal(calls.length, before);
});
assert.deepEqual(networkAttempts, []);
const failed = results.filter(result => result.status === "FAIL").length;
process.stdout.write(JSON.stringify({ suite: "animation-studio-trailer-06-audio-editor", passed: results.length - failed, failed, total: results.length, results, networkAttempts, persistedMedia: false }) + "\n");
if (failed) process.exitCode = 1;
