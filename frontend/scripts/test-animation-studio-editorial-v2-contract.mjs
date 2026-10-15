// Actual pure v2 entity adapters. No repository, native execution, provider or browser use.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { validateCompositionV2: validate, migrateCompositionV1ToV2: migrate, compositionV2ToV1Exact: downgrade, trimLayerV2Time: trim, splitLayerV2Time: split } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-contract");
const { validateShotComposition, defaultLayerTransform } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { makeEditorialRational: rational, editorialAddTime: add, editorialTimeFromUs: fromUs, editorialTimeFromFrames: fromFrames, editorialFrameRate: fps } = loader.load("@/lib/codexforge/animation-studio/editorial-time");
const clone = value => JSON.parse(JSON.stringify(value)), stamp = "2026-09-15T19:00:00.000Z";
function layer(id = "layer_v2", changes = {}) { return { schemaVersion: 1, layerId: id, compositionId: "composition_v2", name: "Independent immutable source", type: "VIDEO", source: { kind: "ASSET", asset: { assetId: "asset_v2", version: 7 }, takeId: "take_v2" }, enabled: true, locked: false, solo: false, startUs: 123_457, durationUs: 1_456_789, sourceOffsetUs: 789_123, playbackRate: 1, reverse: false, transform: { ...defaultLayerTransform(), x: 25.5, y: -50, rotationDeg: 12 }, opacity: 0.625, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 3, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 }, ...changes }; }
function original() { return { schemaVersion: 1, compositionId: "composition_v2", projectId: "project_v2", kind: "SHOT", shotId: "shot_v2", name: "Versioned exact-time composition", durationUs: 5_000_001, width: 1920, height: 1080, layers: [layer(), layer("layer_image", { type: "IMAGE", source: { kind: "ASSET", asset: { assetId: "asset_image", version: 2 }, takeId: null }, sourceOffsetUs: 0, startUs: 500_000, durationUs: 4_000_000 })], revision: 9, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } }; }
function v2() { return migrate(original()); }
function splittable(changes = {}) { return { type: "VIDEO", source: { kind: "ASSET", asset: { assetId: "asset_split", version: 11 }, takeId: "take_split" }, start: rational(1, 3), duration: rational(5, 3), sourceOffset: rational(1, 3), playbackRate: 1, reverse: false, keyframes: [], ...changes }; }
const results = [];
function test(name, run) { try { run(); results.push({ name, status: "PASS" }); } catch (error) { results.push({ name, status: "FAIL", error: { code: error.code ?? null, message: error.message, stack: error.stack } }); } }
function invalid(name, change) { test(name, () => { const value = v2(); change(value); assert.throws(() => validate(value)); }); }

test("Explicit v1 migration preserves source identity, every non-time field, order and exact legacy values", () => { const before = original(), sourceText = JSON.stringify(before), result = migrate(before); assert.equal(JSON.stringify(before), sourceText); assert.equal(result.schemaVersion, 2); assert.deepEqual(result.duration, { numerator: 5_000_001, denominator: 1_000_000 }); assert.deepEqual(result.layers.map(item => item.layerId), ["layer_v2", "layer_image"]); assert.deepEqual(result.layers[0].start, { numerator: 123_457, denominator: 1_000_000 }); assert.deepEqual(result.layers[0].sourceOffset, { numerator: 789_123, denominator: 1_000_000 }); assert.equal(result.layers[0].source.asset.version, 7); assert.equal(result.layers[0].version, 3); assert.equal(result.revision, 9); assert.deepEqual(downgrade(result), before); });
test("Migrated entities contain v2 rational fields only, never competing legacy time fields", () => { const result = v2(); assert.equal(Object.hasOwn(result, "durationUs"), false); for (const item of result.layers) { assert.equal(item.schemaVersion, 2); for (const key of ["startUs", "durationUs", "sourceOffsetUs"]) assert.equal(Object.hasOwn(item, key), false); } });
test("Validation clones and detaches metadata from input, including nested transforms and AssetRef", () => { const value = v2(), result = validate(value); result.layers[0].transform.x = 100; result.layers[0].source.asset.version = 10; assert.equal(value.layers[0].transform.x, 25.5); assert.equal(value.layers[0].source.asset.version, 7); assert.deepEqual(validate(JSON.parse(JSON.stringify(value))), value); });
test("Canonical fractional frame times survive without a microsecond roundtrip", () => { for (const rate of ["23.976", "24", "25", "29.97", "30", "50", "59.94", "60"]) { const value = v2(), frame = fromFrames(1, fps(rate)); value.duration = rational(2, 1); value.layers = [value.layers[0]]; value.layers[0].start = frame; value.layers[0].duration = fromFrames(3, fps(rate)); value.layers[0].sourceOffset = frame; const result = validate(value); assert.deepEqual(result.layers[0].start, frame); assert.deepEqual(result, value); } });
test("No five-minute or one-hour cap is imposed on v2 composition or layer/source times", () => { for (const seconds of [301, 3601, 86_400, Number.MAX_SAFE_INTEGER]) { const value = v2(); value.duration = rational(seconds, 1); value.layers = [value.layers[0]]; Object.assign(value.layers[0], { start: rational(0, 1), duration: rational(seconds, 1), sourceOffset: rational(0, 1) }); assert.deepEqual(validate(value), value); } const value = v2(); value.layers[0].sourceOffset = rational(86_400, 1); assert.deepEqual(validate(value), value); });
test("Exact fractional interval equality passes instead of using rounded surrogate times", () => { const value = v2(); value.duration = rational(1, 1); value.layers = [value.layers[0]]; Object.assign(value.layers[0], { start: rational(2, 3), duration: rational(1, 3), sourceOffset: rational(1, 7) }); assert.deepEqual(validate(value), value); });
test("IN trim derives one exact retained interval without mutating temporal source instructions", () => { for (const type of ["VIDEO", "NESTED_COMPOSITION"]) { const layer = { type, start: rational(1, 3), duration: rational(5, 3), sourceOffset: rational(2, 7) }, before = clone(layer), result = trim(layer, "IN", rational(5, 6)); assert.deepEqual(result, { start: rational(5, 6), duration: rational(7, 6), sourceOffset: rational(11, 14) }); assert.deepEqual(layer, before); assert.deepEqual(Object.keys(result).sort(), ["duration", "sourceOffset", "start"]); } });
test("OUT trim preserves exact start/source offset and IMAGE IN trim retains zero source offset", () => { const temporal = { type: "VIDEO", start: rational(1, 3), duration: rational(5, 3), sourceOffset: rational(2, 7) }; assert.deepEqual(trim(temporal, "OUT", rational(7, 6)), { start: rational(1, 3), duration: rational(5, 6), sourceOffset: rational(2, 7) }); const image = { type: "IMAGE", start: rational(1, 4), duration: rational(3, 2), sourceOffset: rational(0, 1) }; assert.deepEqual(trim(image, "IN", rational(3, 4)), { start: rational(3, 4), duration: rational(1, 1), sourceOffset: rational(0, 1) }); });
test("Trim accepts only a strict internal canonical point and already-valid saved timing", () => { const layer = { type: "VIDEO", start: rational(1, 3), duration: rational(5, 3), sourceOffset: rational(2, 7) }, before = clone(layer); for (const [edge, point] of [["LEFT", rational(5, 6)], ["IN", rational(1, 3)], ["OUT", rational(2, 1)], ["IN", rational(1, 4)], ["OUT", rational(7, 3)], ["IN", { numerator: 2, denominator: 4 }], ["OUT", { numerator: 1, denominator: 0 }]]) assert.throws(() => trim(layer, edge, point)); assert.throws(() => trim({ ...layer, duration: rational(0, 1) }, "IN", rational(5, 6))); assert.throws(() => trim({ ...layer, type: "IMAGE", sourceOffset: rational(1, 7) }, "OUT", rational(5, 6))); assert.deepEqual(layer, before); });
test("Split examples A and B derive exact half-open replacement intervals in composition time", () => {
  const a = split(splittable(), rational(1, 1));
  assert.deepEqual(a, { left: { start: rational(1, 3), duration: rational(2, 3), sourceOffset: rational(1, 3) }, right: { start: rational(1, 1), duration: rational(1, 1), sourceOffset: rational(1, 1) } });
  const b = split(splittable({ start: rational(1, 1), duration: rational(3, 2), sourceOffset: rational(1, 2) }), rational(7, 4));
  assert.deepEqual(b, { left: { start: rational(1, 1), duration: rational(3, 4), sourceOffset: rational(1, 2) }, right: { start: rational(7, 4), duration: rational(3, 4), sourceOffset: rational(5, 4) } });
  assert.deepEqual(a.right.start, rational(1, 1));
  assert.deepEqual(a.right.sourceOffset, rational(1, 1));
  assert.deepEqual(add(a.left.start, a.left.duration), a.right.start);
  assert.deepEqual(add(a.left.duration, a.right.duration), rational(5, 3));
  assert.deepEqual(add(a.left.sourceOffset, add(a.left.duration, a.right.duration)), rational(2, 1));
});
test("Split preserves total timeline and source intervals exactly near a 60-minute position", () => {
  const layer = splittable({ start: rational(3599, 1), duration: rational(2, 1), sourceOffset: rational(17, 3) }), before = clone(layer);
  const result = split(layer, rational(7199, 2));
  assert.deepEqual(result, { left: { start: rational(3599, 1), duration: rational(1, 2), sourceOffset: rational(17, 3) }, right: { start: rational(7199, 2), duration: rational(3, 2), sourceOffset: rational(37, 6) } });
  assert.deepEqual(layer, before);
  assert.deepEqual(result.left.start, layer.start);
  assert.deepEqual(result.right.start, rational(7199, 2));
  assert.deepEqual(result.right.sourceOffset, rational(37, 6));
  assert.deepEqual(add(result.left.duration, result.right.duration), layer.duration);
  assert.deepEqual(add(result.right.start, result.right.duration), add(layer.start, layer.duration));
  assert.deepEqual(add(result.right.sourceOffset, result.right.duration), add(layer.sourceOffset, layer.duration));
});
test("Split rejects boundaries out-of-range malformed unsafe and zero-duration inputs without mutation", () => {
  const layer = splittable(), before = clone(layer);
  for (const point of [rational(1, 3), rational(2, 1), rational(1, 4), rational(7, 3), null, {}, { numerator: 2, denominator: 4 }, { numerator: 1, denominator: 0 }, { numerator: Number.MAX_SAFE_INTEGER + 1, denominator: 1 }]) assert.throws(() => split(layer, point));
  assert.throws(() => split(splittable({ duration: rational(0, 1) }), rational(1, 1)));
  assert.throws(() => split(splittable({ start: rational(0, 1), duration: rational(2, 1), sourceOffset: rational(Number.MAX_SAFE_INTEGER, 1) }), rational(1, 1)));
  assert.throws(() => split(splittable({ start: rational(Number.MAX_SAFE_INTEGER, 1), duration: rational(2, 1), sourceOffset: rational(0, 1) }), rational(Number.MAX_SAFE_INTEGER - 1, 1)));
  assert.deepEqual(layer, before);
});
test("Split fails closed for non-video nested non-asset retimed reversed and animated layers", () => {
  const unsupported = [
    splittable({ type: "IMAGE" }),
    splittable({ type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: "composition_nested" } }),
    splittable({ source: { kind: "COMPOSITION", compositionId: "composition_nested" } }),
    splittable({ playbackRate: 2 }),
    splittable({ reverse: true }),
    splittable({ keyframes: [{ property: "opacity", value: 1 }] }),
  ];
  for (const layer of unsupported) { const before = clone(layer); assert.throws(() => split(layer, rational(1, 1)), error => error.code === "UNSUPPORTED_LAYER_SPLIT"); assert.deepEqual(layer, before); }
});
test("Sub-microsecond positive duration is valid and remains exact in v2", () => { const value = v2(); value.duration = rational(1, 10_000_000); value.layers = [value.layers[0]]; Object.assign(value.layers[0], { start: rational(0, 1), duration: rational(1, 10_000_000), sourceOffset: rational(0, 1) }); assert.deepEqual(validate(value), value); assert.throws(() => downgrade(value), error => error.code === "EDITORIAL_TIME_INEXACT"); });
test("Downgrade rejects any inexact time independently and never silently rounds", () => { for (const target of ["composition", "start", "duration", "sourceOffset"]) { const value = v2(); if (target === "composition") value.duration = rational(16, 3); else value.layers[0][target] = rational(1, 3); assert.throws(() => downgrade(value), error => error.code === "EDITORIAL_TIME_INEXACT", target); } });
test("Downgrade retains all v1 range checks even when microseconds are exactly representable", () => { for (const target of ["composition", "sourceOffset"]) { const value = v2(); if (target === "composition") value.duration = rational(3601, 1); else value.layers[0].sourceOffset = rational(3601, 1); assert.deepEqual(validate(value), value); assert.throws(() => downgrade(value)); } });
test("Maximum legacy boundary migrates and downgrades exactly", () => { const value = original(); value.durationUs = 3_600_000_000; value.layers = [layer("layer_v2", { startUs: 0, durationUs: 3_600_000_000, sourceOffsetUs: 0 })]; assert.deepEqual(downgrade(migrate(value)), value); });
test("One hundred exact legacy timing samples roundtrip without metadata changes", () => { for (let index = 0; index < 100; index++) { const value = original(); value.layers = [layer("layer_v2", { startUs: index * 37, durationUs: 1 + index * 71, sourceOffsetUs: index * 101 })]; assert.deepEqual(downgrade(migrate(value)), value); } });
invalid("Legacy composition durationUs cannot be hidden by structural substitution", value => value.durationUs = 1);
invalid("Legacy layer startUs cannot be hidden by structural substitution", value => value.layers[0].startUs = 0);
invalid("Legacy layer durationUs cannot be hidden by structural substitution", value => value.layers[0].durationUs = 1);
invalid("Legacy layer sourceOffsetUs cannot be hidden by structural substitution", value => value.layers[0].sourceOffsetUs = 0);
invalid("Unsupported composition schema version fails closed", value => value.schemaVersion = 1);
invalid("Mixed v1 layer in v2 composition fails closed", value => value.layers[0].schemaVersion = 1);
invalid("Noncanonical rational representations reject rather than normalize persisted values", value => value.duration = { numerator: 12, denominator: 2 });
invalid("Noncanonical zero rational rejects", value => value.layers[0].start = { numerator: 0, denominator: 2 });
invalid("Zero composition duration rejects", value => value.duration = rational(0, 1));
invalid("Zero layer duration rejects", value => value.layers[0].duration = rational(0, 1));
invalid("Negative time rejects", value => value.layers[0].start = { numerator: -1, denominator: 1 });
invalid("Negative zero time rejects", value => value.layers[0].start = { numerator: -0, denominator: 1 });
invalid("Decimal numerator rejects", value => value.layers[0].start = { numerator: 0.5, denominator: 1 });
invalid("Zero denominator rejects", value => value.duration = { numerator: 1, denominator: 0 });
invalid("Unsafe integer time rejects", value => value.duration = { numerator: Number.MAX_SAFE_INTEGER + 1, denominator: 1 });
invalid("Infinite time rejects", value => value.duration = { numerator: Infinity, denominator: 1 });
invalid("Unrecognized time fields reject", value => value.layers[0].start = { numerator: 1, denominator: 3, unit: "seconds" });
invalid("One fraction beyond the exact interval boundary rejects despite identical floored microseconds", value => { value.duration = rational(1, 1); value.layers = [value.layers[0]]; value.layers[0].start = rational(999_999, 1_000_000); value.layers[0].duration = rational(11, 10_000_000); });
invalid("Layer starts after composition end reject", value => value.layers[0].start = rational(6, 1));
invalid("Image sourceOffset remains zero under v2 exact-time semantics", value => value.layers[1].sourceOffset = rational(1, 3));
invalid("Computed source end overflow rejects rather than truncates", value => value.layers[0].sourceOffset = rational(Number.MAX_SAFE_INTEGER, 1));
invalid("Computed timeline end overflow rejects rather than truncates", value => { value.duration = rational(Number.MAX_SAFE_INTEGER, 1); value.layers = [value.layers[0]]; value.layers[0].start = rational(Number.MAX_SAFE_INTEGER, 1); });
test("Every v1 non-time rule remains authoritative through the structural delegate", () => { const mutations = [
  value => value.width = 0, value => value.height = 16_385, value => value.revision = 0, value => value.approvalState = "APPROVED", value => value.provenance.providerRequests = 1,
  value => value.projectId = "project_../escape", value => value.kind = "SEQUENCE", value => value.kind = "PRECOMP", value => value.shotId = null, value => value.name = "",
  value => value.layers[0].type = "AUDIO", value => value.layers[0].effects = [], value => value.layers[0].transform.x = Infinity, value => value.layers[0].transform.positionZ = 0,
  value => value.layers[0].transform.scaleX = 0, value => value.layers[0].transform.rotationDeg = 3601, value => value.layers[0].opacity = 1.01, value => value.layers[0].enabled = "true",
  value => value.layers[0].locked = 0, value => value.layers[0].solo = null, value => value.layers[0].playbackRate = 2, value => value.layers[0].reverse = true,
  value => value.layers[0].keyframes = [{ property: "opacity", value: 1 }], value => value.layers[0].source.asset.version = 0, value => value.layers[0].source.path = "D:/source.mp4",
  value => value.layers[0].source.kind = "FILE", value => value.layers[0].approvalState = "APPROVED", value => value.layers[0].provenance.kind = "GENERATION",
  value => value.layers[0].compositionId = "composition_other", value => value.layers[1].layerId = value.layers[0].layerId, value => value.layers[0].version = 0,
  value => value.layers[0].createdAt = "yesterday", value => value.layers[0].updatedAt = "2026-09-14T00:00:00.000Z", value => value.layers[0].name = "",
 ]; for (const mutate of mutations) { const one = original(); mutate(one); assert.throws(() => validateShotComposition(one)); const two = v2(); mutate(two); assert.throws(() => validate(two)); } });
test("Existing 32-layer resource bound remains, independently of timeline duration", () => { const value = v2(); value.duration = rational(86_400, 1); value.layers = Array.from({ length: 32 }, (_, index) => ({ ...clone(value.layers[0]), layerId: "layer_" + index })); assert.equal(validate(value).layers.length, 32); value.layers.push({ ...clone(value.layers[0]), layerId: "layer_32" }); assert.throws(() => validate(value)); });
test("Precomposition metadata and immutable nested references remain distinct from shot identity", () => { const value = v2(); value.kind = "PRECOMP"; value.shotId = null; value.layers = [{ ...value.layers[0], type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: "composition_referenced" } }]; assert.deepEqual(validate(value), value); value.layers[0].source.compositionId = value.compositionId; assert.throws(() => validate(value)); });
test("Getters, prototypes, hidden fields, symbols, sparse arrays and object cycles are rejected without invocation", () => { let getterCalls = 0; const value = clone(v2()); Object.defineProperty(value.layers[0].start, "numerator", { enumerable: true, configurable: true, get() { getterCalls++; return 0; } }); assert.throws(() => validate(value)); assert.equal(getterCalls, 0); for (const mutate of [v => Object.setPrototypeOf(v, { inherited: true }), v => v[Symbol("hidden")] = 1, v => Object.defineProperty(v, "hidden", { value: true }), v => delete v.layers[0], v => v.layers[0].transform = v]) { const bad = v2(); mutate(bad); assert.throws(() => validate(bad)); } });
test("Migration refuses invalid v1 input, and downgrade refuses v1 input instead of guessing its version", () => { const value = original(); value.layers[0].opacity = 2; assert.throws(() => migrate(value)); assert.throws(() => migrate(v2())); assert.throws(() => downgrade(original())); });
test("No one-hour cap is reintroduced by validation of composition with no layers", () => { const value = v2(); value.layers = []; value.duration = rational(Number.MAX_SAFE_INTEGER, 1); assert.deepEqual(validate(value), value); assert.throws(() => downgrade(value), error => error.code === "EDITORIAL_TIME_OVERFLOW"); });
test("Existing rational helpers determine exact legacy microseconds without adapter-local arithmetic", () => { const value = original(), result = migrate(value); assert.deepEqual(result.duration, fromUs(value.durationUs)); for (let i = 0; i < value.layers.length; i++) { assert.deepEqual(result.layers[i].start, fromUs(value.layers[i].startUs)); assert.deepEqual(result.layers[i].duration, fromUs(value.layers[i].durationUs)); assert.deepEqual(result.layers[i].sourceOffset, fromUs(value.layers[i].sourceOffsetUs)); } });
test("Pure adapters never load a store, filesystem native module or provider transport", () => { assert.deepEqual(networkAttempts, []); assert.equal(loader.loaded.some(file => /(?:store\.server|native-filesystem|transport\.server|editorial-v2-store)/u.test(file)), false); });

const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const sourceBindings = [...new Set([...loader.loaded, "scripts/test-animation-studio-editorial-v2-contract.mjs", "scripts/animation-studio-test-loader.mjs"])].map(file => ({ path: file, sha256: hash(fs.readFileSync(path.join(frontend, file))) }));
const failed = results.filter(item => item.status !== "PASS"), status = failed.length ? "FAIL" : "PASS";
console.log(JSON.stringify({ status, planned: results.length, passed: results.length - failed.length, failed: failed.length, tests: results, sourceBindings, networkAttempts, providerRequests: 0, nativeExecution: false, persistenceMigrated: false, browserAcceptance: false }));
if (failed.length) process.exitCode = 1;
