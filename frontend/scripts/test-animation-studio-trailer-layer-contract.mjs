import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const networkAttempts = blockStudioTestNetwork();
const loader = createStudioTestLoader(frontend);
const compositionContract = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const v2Contract = loader.load("@/lib/codexforge/animation-studio/editorial-v2-contract");
const time = loader.load("@/lib/codexforge/animation-studio/editorial-time");
const at = "2026-09-27T18:00:00.000Z";
const provenance = { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 };
const transform = () => compositionContract.defaultLayerTransform();
const rational = time.makeEditorialRational;
const clone = value => JSON.parse(JSON.stringify(value));

function common(layerId, type, source, startUs, durationUs, sourceOffsetUs = 0) {
  return {
    schemaVersion: 1,
    layerId,
    compositionId: "composition_trailer_contract",
    name: layerId,
    type,
    source,
    enabled: true,
    locked: false,
    solo: false,
    startUs,
    durationUs,
    sourceOffsetUs,
    playbackRate: 1,
    reverse: false,
    transform: transform(),
    opacity: 1,
    keyframes: [],
    createdAt: at,
    updatedAt: at,
    version: 1,
    approvalState: "DRAFT",
    provenance,
  };
}

function composition() {
  return {
    schemaVersion: 1,
    compositionId: "composition_trailer_contract",
    projectId: "project_trailer_contract",
    kind: "SHOT",
    shotId: "shot_trailer_contract",
    name: "Thirty second trailer",
    durationUs: 30_000_000,
    width: 1280,
    height: 720,
    layers: [
      common("layer_video_contract", "VIDEO", { kind: "ASSET", asset: { assetId: "asset_video_contract", version: 1 }, takeId: null }, 0, 30_000_000),
      {
        ...common("layer_title_contract", "TEXT", { kind: "TEXT" }, 25_000_000, 5_000_000),
        text: { text: "A LOCAL STORY", fontRef: "ARIAL_REGULAR", fontSizePx: 72, color: "#FFF2CC" },
        transform: { ...transform(), x: 640, y: 360 },
        opacity: 0.9,
      },
      {
        ...common("layer_audio_contract", "AUDIO", { kind: "ASSET", asset: { assetId: "asset_audio_contract", version: 1 }, takeId: null }, 0, 30_000_000),
        audio: { gainDb: -6, fadeInUs: 1_000_000, fadeOutUs: 2_000_000, muted: false },
      },
    ],
    revision: 1,
    approvalState: "DRAFT",
    provenance,
  };
}

const results = [];
function test(name, run) {
  try {
    run();
    results.push({ name, status: "PASS" });
  } catch (error) {
    results.push({ name, status: "FAIL", error: { message: error.message, stack: error.stack } });
  }
}

test("TEXT and AUDIO extend v1 without changing existing visual layer serialization", () => {
  const input = composition(), clean = compositionContract.validateShotComposition(input);
  assert.deepEqual(clean, input);
  assert.deepEqual(Object.keys(clean.layers[0]).sort(), Object.keys(common("layer_video_contract", "VIDEO", { kind: "ASSET", asset: { assetId: "asset_video_contract", version: 1 }, takeId: null }, 0, 30_000_000)).sort());
  assert.deepEqual(clean.layers[1].source, { kind: "TEXT" });
  assert.equal(clean.layers[2].source.asset.assetId, "asset_audio_contract");
});

test("V1 migration stores exact rational audio fades and preserves title properties", () => {
  const original = composition(), migrated = v2Contract.migrateCompositionV1ToV2(original);
  assert.deepEqual(migrated.layers[1].text, original.layers[1].text);
  assert.deepEqual(migrated.layers[2].audio, { gainDb: -6, fadeIn: rational(1, 1), fadeOut: rational(2, 1), muted: false });
  assert.deepEqual(v2Contract.compositionV2ToV1Exact(migrated), original);
});

test("TEXT trims retain zero source time while AUDIO trims advance source time exactly", () => {
  assert.deepEqual(
    v2Contract.trimLayerV2Time({ type: "TEXT", start: rational(0, 1), duration: rational(5, 1), sourceOffset: rational(0, 1) }, "IN", rational(1, 1)),
    { start: rational(1, 1), duration: rational(4, 1), sourceOffset: rational(0, 1) },
  );
  assert.deepEqual(
    v2Contract.trimLayerV2Time({ type: "AUDIO", start: rational(2, 1), duration: rational(5, 1), sourceOffset: rational(1, 2) }, "IN", rational(3, 1)),
    { start: rational(3, 1), duration: rational(4, 1), sourceOffset: rational(3, 2) },
  );
});

test("TEXT rejects paths, unknown fonts, noncanonical colours, controls and blank titles", () => {
  const edits = [
    value => { value.layers[1].source = { kind: "TEXT", path: "C:\\escape.ttf" }; },
    value => { value.layers[1].text.fontRef = "CLIENT_PATH"; },
    value => { value.layers[1].text.color = "#fff2cc"; },
    value => { value.layers[1].text.text = "line one\nline two"; },
    value => { value.layers[1].text.text = "   "; },
    value => { value.layers[1].text.fontSizePx = 7; },
  ];
  for (const edit of edits) { const value = composition(); edit(value); assert.throws(() => compositionContract.validateShotComposition(value)); }
});

test("AUDIO rejects takes, visual properties, invalid gain and an individually overlong legacy fade", () => {
  const edits = [
    value => { value.layers[2].source.takeId = "take_not_audio"; },
    value => { value.layers[2].opacity = 0.5; },
    value => { value.layers[2].transform.x = 1; },
    value => { value.layers[2].audio.gainDb = 13; },
    value => { value.layers[2].audio.fadeInUs = 30_000_001; },
  ];
  for (const edit of edits) { const value = composition(); edit(value); assert.throws(() => compositionContract.validateShotComposition(value)); }
});

test("V2 AUDIO accepts independently overlapping fades but rejects malformed and individually overlong fades", () => {
  const base = v2Contract.migrateCompositionV1ToV2(composition());
  const overlapping = clone(base); overlapping.layers[2].audio.fadeIn = rational(20, 1); overlapping.layers[2].audio.fadeOut = rational(20, 1);
  assert.deepEqual(v2Contract.validateCompositionV2(overlapping).layers[2].audio, { gainDb: -6, fadeIn: rational(20, 1), fadeOut: rational(20, 1), muted: false });
  const edits = [
    value => { value.layers[2].audio.fadeIn = rational(31, 1); },
    value => { value.layers[2].audio.fadeIn = { numerator: 2, denominator: 4 }; },
    value => { value.layers[2].audio.fadeOut = { numerator: -1, denominator: 1 }; },
    value => { value.layers[2].audio.extra = true; },
  ];
  for (const edit of edits) { const value = clone(base); edit(value); assert.throws(() => v2Contract.validateCompositionV2(value)); }
});

test("Half-open activity includes visual, title and audio instructions without reordering", () => {
  const value = compositionContract.validateShotComposition(composition());
  assert.deepEqual(compositionContract.activeCompositionLayers(value, 25_000_000).map(layer => layer.type), ["VIDEO", "TEXT", "AUDIO"]);
  assert.deepEqual(compositionContract.activeCompositionLayers(value, 30_000_000).map(layer => layer.type), []);
});

test("Pure contract validation performs no native, provider or network activity", () => {
  assert.deepEqual(networkAttempts, []);
});

const failed = results.filter(result => result.status === "FAIL");
process.stdout.write(`${JSON.stringify({ status: failed.length ? "FAIL" : "PASS", total: results.length, passed: results.length - failed.length, failed: failed.length, results, networkAttempts, providerRequests: 0, nativeExecution: false }, null, 2)}\n`);
if (failed.length) process.exitCode = 1;
