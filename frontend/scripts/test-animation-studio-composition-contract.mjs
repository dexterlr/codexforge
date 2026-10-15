// Pure canonical editorial regressions. Context is a trusted canonical-snapshot projection.
// No provider, filesystem repository, native library, media mutation, or external network is used.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { createStudioTestLoader, blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontendRoot);
const { validateEditorialContent, validateCompositionLayer, validateEditorialTake, validateShotComposition, makeEmptyEditorial, defaultLayerTransform, activeCompositionLayers, STUDIO_COMPOSITION_LIMITS } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const projectId = "project_composition_test", shotId = "shot_composition_test", at = "2026-09-15T18:00:00.000Z";
const clone = v => JSON.parse(JSON.stringify(v));
const context = { projectId, shots: [{ projectId, shotId }, { projectId, shotId: "shot_other" }], assets: [
  { projectId, assetId: "asset_video", version: 1, assetType: "VIDEO", approvalState: "DRAFT" },
  { projectId, assetId: "asset_video", version: 2, assetType: "VIDEO", approvalState: "DRAFT" },
  { projectId, assetId: "asset_image", version: 1, assetType: "IMAGE", approvalState: "DRAFT" },
  { projectId, assetId: "asset_audio", version: 1, assetType: "AUDIO", approvalState: "DRAFT" },
] };
const provenance = () => ({ kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 });
function take(id = "take_a", assetId = "asset_video", version = 1) { return { schemaVersion: 1, takeId: id, projectId, shotId, source: { assetId, version }, name: "Human-labelled source", createdAt: at, review: { state: "UNREVIEWED", note: "", reviewedAt: null } }; }
function layer(id = "layer_a", compositionId = "composition_shot", changes = {}) { return {
  schemaVersion: 1, layerId: id, compositionId, name: "Immutable original source", type: "VIDEO", source: { kind: "ASSET", asset: { assetId: "asset_video", version: 1 }, takeId: "take_a" },
  enabled: true, locked: false, solo: false, startUs: 0, durationUs: 2_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false,
  transform: defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: at, updatedAt: at, version: 1, approvalState: "DRAFT", provenance: provenance(), ...changes,
}; }
function composition(id = "composition_shot", layers = [layer()], kind = "SHOT") { return { schemaVersion: 1, compositionId: id, projectId, kind, shotId: kind === "SHOT" ? shotId : null, name: "Canonical ordered layers", durationUs: 5_000_000, width: 1920, height: 1080, layers, revision: 1, approvalState: "DRAFT", provenance: provenance() }; }
function editorial() { return { ...makeEmptyEditorial(projectId), takes: [take(), take("take_b", "asset_video", 2)], selectedTakes: [{ shotId, takeId: "take_b" }], compositions: [composition()] }; }
const results = [];
function test(label, run) { try { run(); results.push({ label, status: "PASS" }); console.log("PASS " + label); } catch (error) { results.push({ label, status: "FAIL", message: error.message, stack: error.stack }); console.log("FAIL " + label + ": " + error.message); } }
function invalid(label, change) { test(label, () => { const v = editorial(); change(v); assert.throws(() => validateEditorialContent(v, context)); }); }

test("01 Empty editorial starts without modifying a shot or creating an asset", () => { assert.deepEqual(validateEditorialContent(makeEmptyEditorial(projectId), context), makeEmptyEditorial(projectId)); });
test("02 Immutable Asset versions become independent Takes; preference retains every Take", () => { const before = JSON.stringify(context), result = validateEditorialContent(editorial(), context); assert.equal(result.takes.length, 2); assert.equal(result.selectedTakes[0].takeId, "take_b"); assert.deepEqual(result.takes.map(t => t.source.version), [1, 2]); assert.equal(JSON.stringify(context), before); });
test("03 Multiple video and image layers retain exact painter order and independent asset references", () => { const v = editorial(); v.compositions[0].layers.push(layer("layer_b", "composition_shot", { source: { kind: "ASSET", asset: { assetId: "asset_video", version: 2 }, takeId: "take_b" } }), layer("layer_c", "composition_shot", { type: "IMAGE", source: { kind: "ASSET", asset: { assetId: "asset_image", version: 1 }, takeId: null } })); const clean = validateEditorialContent(v, context); assert.deepEqual(clean.compositions[0].layers.map(l => l.layerId), ["layer_a", "layer_b", "layer_c"]); assert.deepEqual(clean, v); });
test("04 Timing, transform, opacity, enable, lock and solo survive JSON roundtrip exactly", () => { const v = editorial(), l = v.compositions[0].layers[0]; Object.assign(l, { startUs: 1_000_001, durationUs: 1_234_567, sourceOffsetUs: 876_543, opacity: 0.42, enabled: false, locked: true, solo: true, transform: { x: -150, y: 35.25, scaleX: 1.5, scaleY: 0.75, rotationDeg: -90, anchorX: 0.2, anchorY: 0.8 } }); assert.deepEqual(validateEditorialContent(JSON.parse(JSON.stringify(v)), context), v); });
test("05 Take acceptance is editorial only and cannot alter asset approval", () => { const v = editorial(), original = JSON.stringify(context.assets); v.takes[0].review = { state: "ACCEPTED", note: "Composition source preference; not technical or rights approval.", reviewedAt: at }; assert.equal(validateEditorialContent(v, context).takes[0].review.state, "ACCEPTED"); assert.equal(JSON.stringify(context.assets), original); });
test("06 Pure validation clones inputs rather than retaining caller-owned references", () => { const v = editorial(), clean = validateEditorialContent(v, context); clean.takes[0].name = "Changed output"; clean.compositions[0].layers[0].transform.x = 99; assert.equal(v.takes[0].name, "Human-labelled source"); assert.equal(v.compositions[0].layers[0].transform.x, 0); });
test("07 Default transforms are independent objects", () => { const a = defaultLayerTransform(), b = defaultLayerTransform(); a.x = 1; assert.equal(b.x, 0); });
test("08 Enabled/solo and half-open timing select layers without reordering", () => { const c = composition(); c.layers = [layer("layer_bottom"), layer("layer_middle", c.compositionId, { startUs: 500_000, durationUs: 1_000_000 }), layer("layer_top", c.compositionId, { enabled: false, solo: true })]; assert.deepEqual(activeCompositionLayers(c, 500_000).map(l => l.layerId), ["layer_bottom", "layer_middle"]); assert.deepEqual(activeCompositionLayers(c, 1_500_000).map(l => l.layerId), ["layer_bottom"]); c.layers[1].solo = true; assert.deepEqual(activeCompositionLayers(c, 500_000).map(l => l.layerId), ["layer_middle"]); assert.deepEqual(activeCompositionLayers(c, 2_000_000), []); assert.throws(() => activeCompositionLayers(c, 0.5)); });
invalid("09 Unknown document fields are rejected", v => v.renderPath = "D:/untrusted.mp4");
invalid("10 Unknown layer/effect fields are rejected rather than ignored", v => v.compositions[0].layers[0].effects = []);
invalid("11 Unsupported schema version is rejected", v => v.schemaVersion = 2);
invalid("12 Unsupported future layer type is rejected", v => v.compositions[0].layers[0].type = "CAMERA");
invalid("13 Unimplemented keyframes are rejected, even valid-looking tracks", v => v.compositions[0].layers[0].keyframes = [{ property: "opacity", keys: [{ timeUs: 0, value: 0, interpolation: "HOLD" }] }]);
invalid("14 Unsupported speed and reverse playback cannot be stored", v => v.compositions[0].layers[0].playbackRate = 2);
invalid("15 Reverse playback is explicitly rejected", v => v.compositions[0].layers[0].reverse = true);
invalid("16 Asset path cannot replace immutable AssetRef", v => v.compositions[0].layers[0].source.asset = { path: "D:/source.mp4", version: 1 });
invalid("17 Layer type must match the bound asset", v => v.compositions[0].layers[0].type = "IMAGE");
invalid("18 Missing source version is rejected", v => v.takes[0].source.version = 9);
invalid("19 Unsupported media source is rejected", v => v.takes[0].source = { assetId: "asset_audio", version: 1 });
invalid("20 Project binding cannot escape its canonical snapshot", v => v.projectId = "project_elsewhere");
invalid("21 Take project binding is enforced", v => v.takes[0].projectId = "project_elsewhere");
invalid("22 Missing shot binding is rejected", v => v.takes[0].shotId = "shot_missing");
invalid("23 Duplicate Take identity is rejected", v => v.takes[1].takeId = "take_a");
invalid("24 Duplicate preferred Take for a shot is rejected", v => v.selectedTakes.push({ shotId, takeId: "take_a" }));
invalid("25 Preference must reference a retained Take", v => v.selectedTakes[0].takeId = "take_missing");
invalid("26 Preference cannot select another shot's Take", v => v.selectedTakes[0].shotId = "shot_other");
invalid("27 Layer Take must match the layer AssetRef", v => v.compositions[0].layers[0].source.takeId = "take_b");
invalid("28 Layer Take must belong to its shot composition", v => v.takes[0].shotId = "shot_other");
invalid("29 Layer parent identity is exact", v => v.compositions[0].layers[0].compositionId = "composition_wrong");
invalid("30 Layer identity cannot repeat", v => v.compositions[0].layers.push(clone(v.compositions[0].layers[0])));
invalid("31 Shot has one canonical ShotComposition", v => v.compositions.push(composition("composition_duplicate", [])));
invalid("32 Composition identity cannot repeat", v => v.compositions.push(clone(v.compositions[0])));
invalid("33 Layer end must fit composition duration", v => v.compositions[0].layers[0].startUs = 4_000_000);
invalid("34 Source interval cannot exceed one-hour bound", v => v.compositions[0].layers[0].sourceOffsetUs = STUDIO_COMPOSITION_LIMITS.durationUs);
invalid("35 Timing is integer microseconds, not fractional or nonfinite", v => v.compositions[0].layers[0].startUs = 0.1);
invalid("36 Nonfinite transform is rejected", v => v.compositions[0].layers[0].transform.x = Infinity);
invalid("37 Negative zero is rejected for stable numeric representation", v => v.compositions[0].layers[0].transform.x = -0);
invalid("38 Opacity must remain within zero and one", v => v.compositions[0].layers[0].opacity = 1.01);
invalid("39 Boolean flags cannot be coerced from strings", v => v.compositions[0].layers[0].enabled = "false");
invalid("40 Editing cannot grant layer approval", v => v.compositions[0].layers[0].approvalState = "APPROVED");
invalid("41 Editing cannot grant composition approval", v => v.compositions[0].approvalState = "APPROVED");
invalid("42 Editing cannot claim provider requests", v => v.compositions[0].layers[0].provenance.providerRequests = 1);
invalid("43 Review requires human note and exact timestamp", v => v.takes[0].review = { state: "ACCEPTED", note: "", reviewedAt: at });
invalid("44 Unreviewed Take cannot carry fabricated reviewed time", v => v.takes[0].review.reviewedAt = at);
invalid("45 Updated time cannot precede creation", v => v.compositions[0].layers[0].updatedAt = "2026-09-14T18:00:00.000Z");
invalid("46 BOM-prefixed timestamp is rejected ordinally", v => v.takes[0].createdAt = "\uFEFF" + at);
test("47 Accessors are rejected without invocation", () => { const v = editorial(); let calls = 0; Object.defineProperty(v.compositions[0].layers[0], "name", { enumerable: true, get() { calls++; throw Error("Executed accessor"); } }); assert.throws(() => validateEditorialContent(v, context)); assert.equal(calls, 0); });
test("48 Sparse arrays, prototypes, cycles and symbols are rejected", () => { for (const mutate of [v => delete v.takes[0], v => Object.setPrototypeOf(v.takes[0], { unsafe: true }), v => v.compositions[0].layers[0].source = v, v => v[Symbol("hidden")] = 1]) { const v = editorial(); mutate(v); assert.throws(() => validateEditorialContent(v, context)); } });
test("49 Legal nested precomp references preserve independent sources", () => { const v = editorial(), pre = composition("composition_pre", [layer("layer_pre", "composition_pre")], "PRECOMP"); v.compositions.push(pre); v.compositions[0].layers.push(layer("layer_nested", "composition_shot", { type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: pre.compositionId }, sourceOffsetUs: 500_000 })); assert.deepEqual(validateEditorialContent(v, context), v); });
test("50 Nested precomp missing, self-cycle, mutual-cycle and interval overruns reject", () => { for (const mode of ["missing", "self", "mutual", "overrun", "shot_target"]) { const v = editorial(), a = composition("composition_pre_a", [], "PRECOMP"), b = composition("composition_pre_b", [], "PRECOMP"); v.compositions.push(a, b); const target = mode === "missing" ? "composition_missing" : mode === "self" ? a.compositionId : mode === "shot_target" ? v.compositions[0].compositionId : b.compositionId; a.layers.push(layer("layer_nested_a", a.compositionId, { type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: target }, ...(mode === "overrun" ? { sourceOffsetUs: 4_000_000 } : {}) })); if (mode === "mutual") b.layers.push(layer("layer_nested_b", b.compositionId, { type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: a.compositionId } })); assert.throws(() => validateEditorialContent(v, context), mode); } });
test("51 Eight nesting levels pass; nine fail", () => { function chain(count) { const v = editorial(); v.compositions = []; for (let i = 0; i < count; i++) { const id = "composition_depth_" + i; v.compositions.push(composition(id, i === count - 1 ? [] : [layer("layer_depth_" + i, id, { type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: "composition_depth_" + (i + 1) } })], "PRECOMP")); } return v; } assert.equal(validateEditorialContent(chain(8), context).compositions.length, 8); assert.throws(() => validateEditorialContent(chain(9), context)); });
test("52 Heavily shared eight-level DAG validates without expanding every reference path", () => { const v = editorial(); v.compositions = []; for (let depth = 0; depth < 8; depth++) { const id = "composition_shared_" + depth; const layers = depth === 7 ? [] : Array.from({ length: 20 }, (_, n) => layer("layer_shared_" + depth + "_" + n, id, { type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: "composition_shared_" + (depth + 1) } })); v.compositions.push(composition(id, layers, "PRECOMP")); } const clean = validateEditorialContent(v, context); assert.equal(clean.compositions.length, 8); assert.equal(clean.compositions.reduce((sum, c) => sum + c.layers.length, 0), 140); });
test("53 Collection and composition bounds fail closed", () => { assert.throws(() => validateShotComposition(composition("composition_shot", Array.from({ length: 33 }, (_, i) => layer("layer_" + i))))); const v = editorial(); v.takes = Array.from({ length: 129 }, (_, i) => take("take_" + i)); assert.throws(() => validateEditorialContent(v, context)); });
test("54 Individual validators apply the same strict contracts", () => { assert.deepEqual(validateCompositionLayer(layer()), layer()); assert.deepEqual(validateEditorialTake(take()), take()); assert.deepEqual(validateShotComposition(composition()), composition()); });
test("55 Original objects remain identical after a rejected edit", () => { const v = editorial(), before = JSON.stringify(v); const changed = clone(v); changed.compositions[0].layers[0].opacity = 2; assert.throws(() => validateEditorialContent(changed, context)); assert.equal(JSON.stringify(v), before); });
test("56 No native storage, provider transport, or network path was loaded", () => { assert.deepEqual(networkAttempts, []); assert.equal(loader.loaded.some(name => /(?:store\.server|native-filesystem|transport|provider\.server)/u.test(name)), false); });

const sourceBindings = loader.loaded.map(file => ({ path: file, sha256: createHash("sha256").update(fs.readFileSync(path.join(frontendRoot, file))).digest("hex") }));
const failed = results.filter(result => result.status === "FAIL");
console.log(JSON.stringify({ status: failed.length ? "FAIL" : "PASS", total: results.length, passed: results.length - failed.length, failed: failed.length, providerRequests: 0, networkAttempts, sourceBindings, results }, null, 2));
if (failed.length) process.exitCode = 1;
