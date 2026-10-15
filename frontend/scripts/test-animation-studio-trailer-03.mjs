// Focused TRAILER-03 integration evidence. All projects and media are synthetic,
// isolated test data. No provider, renderer, FFmpeg, subprocess, or network is used.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { createStudioTestLoader, blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontendRoot);
const networkAttempts = blockStudioTestNetwork();
const loader = createStudioTestLoader(frontendRoot);
const { createStudioOperatorHandler } = loader.load("@/lib/codexforge/animation-studio/operator-http.server");
const { createStudioFootageHandler } = loader.load("@/lib/codexforge/animation-studio/footage-http.server");
const { openStudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const {
  STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA,
  isQualifiedLocalMediaAsset,
  localMediaTechnicalMetadata,
} = loader.load("@/lib/codexforge/animation-studio/footage-contract");
const { defaultLayerTransform } = loader.load("@/lib/codexforge/animation-studio/composition-contract");

const sha = value => createHash("sha256").update(value).digest("hex");
const clone = value => JSON.parse(JSON.stringify(value));
const runId = randomUUID();
const namespace = `trailer03-${runId}`;
const projectId = `project_trailer03_${runId.replaceAll("-", "").slice(0, 16)}`;
const evidenceRoot = path.join(frontendRoot, ".codexforge", "acceptance", `studio-trailer-03-tests-${runId}`);
fs.mkdirSync(evidenceRoot, { recursive: true });
const log = fs.openSync(path.join(evidenceRoot, "test.log"), "wx");
const results = [];
let serial = 0;
const now = () => new Date(Date.UTC(2026, 8, 28, 12, 0, serial++)).toISOString();
const key = label => `${label}-${String(serial++).padStart(8, "0")}`;
const actor = "synthetic-trailer-03-verification";
const rational = (numerator, denominator = 1) => ({ numerator, denominator });
const opener = () => openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" });
const usingRepository = run => {
  const repository = opener();
  try { return run(repository); }
  finally { repository.close(); }
};
const writeEvidence = (name, value) => fs.writeFileSync(path.join(evidenceRoot, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
async function test(label, run) {
  try {
    await run();
    results.push({ label, status: "PASS" });
    fs.writeSync(log, `PASS ${label}\n`);
    process.stderr.write(`PASS ${label}\n`);
  } catch (error) {
    results.push({ label, status: "FAIL", error: { name: error.name, code: error.code ?? null, message: error.message, stack: error.stack } });
    fs.writeSync(log, `FAIL ${label}: ${error.message}\n`);
    process.stderr.write(`FAIL ${label}: ${error.message}\n`);
  }
}

const operatorUrl = "http://127.0.0.1:3379/api/codexforge/animation-studio";
const operatorHandler = createStudioOperatorHandler({ enabled: true, openRepository: opener, listenerAddresses: () => ["127.0.0.1"] });
function operatorRequest(body, operationKey) {
  return new Request(operatorUrl, {
    method: "POST",
    headers: {
      Host: "127.0.0.1:3379",
      Origin: "http://127.0.0.1:3379",
      "Sec-Fetch-Site": "same-origin",
      "X-CodexForge-Animation-Studio": "local-operator-v1",
      "Content-Type": "application/json",
      "Idempotency-Key": operationKey,
    },
    body: JSON.stringify(body),
  });
}
async function callOperator(body, operationKey) {
  const response = await operatorHandler(operatorRequest(body, operationKey));
  return { status: response.status, body: await response.json() };
}

function videoTechnical(label, seconds) {
  return {
    schema: STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA,
    mediaType: "VIDEO",
    contentType: "video/mp4",
    container: "mp4",
    codec: "h264",
    pixelFormat: "yuv420p",
    width: 1280,
    height: 720,
    frameRate: rational(25),
    frameCadence: "CFR_25_EXACT",
    duration: rational(seconds),
    sourceUnits: seconds * 25,
    sourceUnit: "FRAME",
    timeBase: rational(1, 12_800),
    colorPrimaries: "bt709",
    colorTransfer: "bt709",
    colorSpace: "bt709",
    colorRange: "tv",
    dynamicRange: "SDR_BT709",
    rotationDegrees: 0,
    streamCount: 1,
    probeDigest: sha(Buffer.from(`synthetic-probe:${label}`)),
  };
}
function audioTechnical(label, seconds) {
  return {
    schema: STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA,
    mediaType: "AUDIO",
    contentType: "audio/wav",
    container: "wav",
    codec: "pcm_s16le",
    sampleFormat: "s16",
    sampleRate: 48_000,
    channels: 2,
    channelLayout: "stereo",
    duration: rational(seconds),
    sourceUnits: seconds * 48_000,
    sourceUnit: "SAMPLE",
    timeBase: rational(1, 48_000),
    streamCount: 1,
    probeDigest: sha(Buffer.from(`synthetic-probe:${label}`)),
  };
}
function videoBytes(label, size = 4096) {
  assert.ok(size >= 32);
  const value = Buffer.alloc(size, label.charCodeAt(0));
  value.writeUInt32BE(24, 0);
  value.write("ftyp", 4, "ascii");
  value.write("isom", 8, "ascii");
  value.write(label.slice(0, Math.min(label.length, size - 16)), 16, "utf8");
  return value;
}
function audioBytes(label, size = 4096) {
  assert.ok(size >= 44);
  const value = Buffer.alloc(size, label.charCodeAt(0));
  value.write("RIFF", 0, "ascii");
  value.writeUInt32LE(size - 8, 4);
  value.write("WAVE", 8, "ascii");
  value.write(label.slice(0, Math.min(label.length, size - 16)), 16, "utf8");
  return value;
}
function stage(bytes, mediaType, technical) {
  const reads = [];
  let closed = false;
  return {
    mediaType,
    contentType: mediaType === "VIDEO" ? "video/mp4" : "audio/wav",
    byteLength: bytes.length,
    contentHash: sha(bytes),
    technical,
    read(offset, length) {
      assert.equal(closed, false, "A staged source cannot be read after close.");
      assert.ok(Number.isSafeInteger(offset) && offset >= 0 && offset <= bytes.length);
      assert.ok(Number.isSafeInteger(length) && length >= 0 && offset + length <= bytes.length);
      reads.push({ offset, length });
      return bytes.subarray(offset, offset + length);
    },
    close() {
      assert.equal(closed, false, "The HTTP owner closes each staged source exactly once.");
      closed = true;
    },
    evidence: { reads, get closed() { return closed; } },
  };
}

const stagedQueue = [];
const footageHandler = createStudioFootageHandler({
  enabled: true,
  openRepository: opener,
  listenerAddresses: () => ["127.0.0.1"],
  receiveImport: async (request, mediaType) => {
    assert.equal(request.headers.get("content-type"), "application/octet-stream");
    const next = stagedQueue.shift();
    assert.ok(next, "Every focused HTTP request must have one explicit synthetic staged source.");
    assert.equal(next.mediaType, mediaType);
    return next;
  },
});
const footageUrl = "http://127.0.0.1:3379/api/codexforge/animation-studio/footage";
function footageMetadata(mediaType, originalName, sourceLabel) {
  return usingRepository(repository => {
    const snapshot = repository.load(projectId);
    return {
      projectId,
      shotId: snapshot.shots[0].shotId,
      expectedProjectRevision: snapshot.project.revision,
      expectedShotRevision: snapshot.shots[0].revision,
      requestedAt: now(),
      originalName,
      sourceLabel,
      rights: { status: "OWNED", license: null, evidence: "Synthetic local verification fixture" },
      mediaType,
    };
  });
}
async function importMedia(metadata, staged, operationKey) {
  stagedQueue.push(staged);
  const request = new Request(footageUrl, {
    method: "POST",
    headers: {
      Host: "127.0.0.1:3379",
      Origin: "http://127.0.0.1:3379",
      "Sec-Fetch-Site": "same-origin",
      "X-CodexForge-Animation-Studio": "local-operator-v1",
      "Content-Type": "application/octet-stream",
      "Idempotency-Key": operationKey,
      "X-CodexForge-Footage": encodeURIComponent(JSON.stringify(metadata)),
    },
    body: Buffer.from("synthetic receiver fixture; no real decoder invoked"),
  });
  const response = await footageHandler(request);
  const body = await response.json();
  assert.equal(stagedQueue.length, 0, "The injected receiver must consume exactly one staged source.");
  return { status: response.status, body };
}

const create = {
  action: "create",
  projectId,
  title: "Synthetic TRAILER-03 project",
  description: "Empty professional editor timeline integration fixture",
  durationSeconds: 50,
  requestedAt: now(),
};
const media = {
  a: { bytes: videoBytes("video-a", 1024 * 1024 + 333), technical: videoTechnical("video-a", 30), name: "camera-a.mp4", label: "Camera A" },
  b: { bytes: videoBytes("video-b", 65_537), technical: videoTechnical("video-b", 30), name: "camera-b.mp4", label: "Camera B" },
  alternate: { bytes: videoBytes("alternate", 8193), technical: videoTechnical("alternate", 15), name: "alternate.mp4", label: "Unused alternate" },
  audio: { bytes: audioBytes("soundtrack", 12_345), technical: audioTechnical("soundtrack", 50), name: "soundtrack.wav", label: "Local soundtrack" },
};
const imported = {};
let shotId;
let compositionId;
let savedTakeIds;

try {
  await test("01 Exact HTTP create accepts a 50-second empty 720p/25fps project and rejects omitted or out-of-range duration", async () => {
    for (const invalid of [
      Object.fromEntries(Object.entries(create).filter(([name]) => name !== "durationSeconds")),
      { ...create, durationSeconds: 44 },
      { ...create, durationSeconds: 61 },
      { ...create, durationSeconds: 45.5 },
      { ...create, durationSeconds: "50" },
    ]) assert.equal((await callOperator(invalid, key("invalid-create"))).status, 400);
    const answer = await callOperator(create, "trailer03-create-0001");
    assert.equal(answer.status, 200, JSON.stringify(answer.body));
    const snapshot = answer.body.result.snapshot;
    assert.equal(snapshot.project.projectId, projectId);
    assert.equal(snapshot.shots.length, 1);
    const shot = snapshot.shots[0];
    shotId = shot.shotId;
    assert.equal(shot.duration, 50);
    assert.equal(shot.fps, 25);
    assert.deepEqual(shot.resolution, { width: 1280, height: 720 });
    for (const field of ["props", "audio", "sourceReferences", "inputAssets", "outputAssets"]) assert.deepEqual(shot[field], [], `${field} must start empty`);
    assert.equal(shot.selectedVersion, null);
    assert.equal(shot.action, "No media is placed yet.");
    assert.deepEqual(snapshot.jobs, []);
    assert.deepEqual(snapshot.costs, []);
    assert.deepEqual(snapshot.approvals, []);
  });

  await test("02 Qualified HTTP imports create three distinct stable VIDEO Assets and one AUDIO Asset with exact shot semantics", async () => {
    for (const [name, fixture] of Object.entries(media)) {
      const mediaType = name === "audio" ? "AUDIO" : "VIDEO";
      const metadata = footageMetadata(mediaType, fixture.name, fixture.label);
      const staged = stage(fixture.bytes, mediaType, fixture.technical);
      const answer = await importMedia(metadata, staged, `trailer03-import-${name}-0001`);
      assert.equal(answer.status, 200, JSON.stringify(answer.body));
      assert.equal(staged.evidence.closed, true);
      const asset = answer.body.result.snapshot.assets.find(candidate => candidate.contentHash === sha(fixture.bytes));
      assert.ok(asset, `Imported ${name} Asset must be returned.`);
      assert.equal(asset.assetType, mediaType);
      assert.equal(asset.version, 1);
      assert.equal(isQualifiedLocalMediaAsset(asset), true);
      assert.deepEqual(localMediaTechnicalMetadata(asset), { assetType: mediaType, byteLength: fixture.bytes.length, contentHash: sha(fixture.bytes), ...fixture.technical });
      imported[name] = asset;
    }
    assert.equal(new Set(Object.values(imported).map(asset => asset.assetId)).size, 4);
    const snapshot = usingRepository(repository => repository.load(projectId));
    assert.equal(snapshot.assets.length, 4);
    assert.deepEqual(new Set(snapshot.shots[0].inputAssets.map(ref => ref.assetId)), new Set([imported.a.assetId, imported.b.assetId, imported.alternate.assetId]));
    assert.deepEqual(snapshot.shots[0].audio, [{ assetId: imported.audio.assetId, version: 1 }]);
  });

  await test("03 Staged bytes cross the one-MiB chunk boundary, exact replay is stable, and separately keyed reuse creates no Asset or Take", async () => {
    const metadata = footageMetadata("VIDEO", media.a.name, media.a.label);
    const largeStage = stage(media.a.bytes, "VIDEO", media.a.technical);
    const before = usingRepository(repository => repository.load(projectId));
    const reuse = await importMedia(metadata, largeStage, "trailer03-import-a-reuse-0001");
    assert.equal(reuse.status, 200, JSON.stringify(reuse.body));
    assert.equal(largeStage.evidence.closed, true);
    assert.deepEqual(largeStage.evidence.reads, [], "An exact immutable Asset reuse does not rewrite its chunks.");
    const after = usingRepository(repository => repository.load(projectId));
    assert.equal(after.assets.length, before.assets.length);
    assert.equal(after.qcResults.length, before.qcResults.length);
    assert.equal(after.assets.filter(asset => asset.contentHash === sha(media.a.bytes)).length, 1);
    assert.equal(usingRepository(repository => repository.reviewEditorial(projectId).editorial.content.takes.length), 0, "Import never fabricates a Take.");

    const replayStage = stage(media.a.bytes, "VIDEO", media.a.technical);
    const replay = await importMedia(metadata, replayStage, "trailer03-import-a-reuse-0001");
    assert.equal(replay.status, 200);
    assert.equal(replayStage.evidence.closed, true);
    assert.deepEqual(replayStage.evidence.reads, []);
    assert.equal(usingRepository(repository => repository.load(projectId).recordDigest), after.recordDigest);

    const originalMetadata = footageMetadata("VIDEO", "large-reader.mp4", "Chunk-reader verification");
    const uniqueBytes = videoBytes("chunk-reader", 1024 * 1024 + 777);
    const uniqueTechnical = videoTechnical("chunk-reader", 20);
    const chunkedStage = stage(uniqueBytes, "VIDEO", uniqueTechnical);
    const importedChunked = await importMedia(originalMetadata, chunkedStage, "trailer03-import-chunked-0001");
    assert.equal(importedChunked.status, 200, JSON.stringify(importedChunked.body));
    assert.ok(chunkedStage.evidence.reads.length >= 2, JSON.stringify(chunkedStage.evidence.reads));
    assert.equal(chunkedStage.evidence.reads.reduce((sum, read) => sum + read.length, 0), uniqueBytes.length);
    assert.deepEqual(chunkedStage.evidence.reads.map(read => read.offset), chunkedStage.evidence.reads.map((_, index, reads) => reads.slice(0, index).reduce((sum, read) => sum + read.length, 0)));
    imported.chunked = importedChunked.body.result.snapshot.assets.find(asset => asset.contentHash === sha(uniqueBytes));
    assert.ok(imported.chunked);
  });

  await test("04 Invalid technical source coverage is rejected before publication and legacy metadata cannot be treated as qualified", async () => {
    const metadata = footageMetadata("VIDEO", "invalid-coverage.mp4", "Invalid coverage fixture");
    const bytes = videoBytes("bad-coverage", 4097);
    const invalidTechnical = { ...videoTechnical("bad-coverage", 30), sourceUnits: 749 };
    const invalidStage = stage(bytes, "VIDEO", invalidTechnical);
    const before = usingRepository(repository => repository.load(projectId));
    const answer = await importMedia(metadata, invalidStage, "trailer03-import-invalid-coverage-0001");
    assert.equal(answer.status, 400, JSON.stringify(answer.body));
    assert.equal(answer.body.error.code, "invalid_manifest");
    assert.equal(invalidStage.evidence.closed, true);
    assert.deepEqual(invalidStage.evidence.reads, []);
    const after = usingRepository(repository => repository.load(projectId));
    assert.equal(after.recordDigest, before.recordDigest);
    assert.equal(after.assets.length, 5);

    const legacy = clone(imported.a);
    delete legacy.provenance.adapterMetadata.settings.technical;
    assert.equal(isQualifiedLocalMediaAsset(legacy), false);
    assert.throws(() => localMediaTechnicalMetadata(legacy), error => error.code === "INVALID_FOOTAGE");
  });

  await test("05 Explicit v1 editorial save creates stable VIDEO Takes only; AUDIO import remains Take-free", async () => {
    const review = usingRepository(repository => repository.reviewEditorial(projectId));
    assert.equal(review.editorial.persisted, false);
    assert.equal(review.editorial.revision, 0);
    assert.equal(review.editorial.content.compositions.length, 1);
    assert.equal(review.editorial.content.compositions[0].durationUs, 50_000_000);
    assert.equal(review.editorial.content.compositions[0].width, 1280);
    assert.equal(review.editorial.content.compositions[0].height, 720);
    assert.deepEqual(review.editorial.content.compositions[0].layers, []);
    compositionId = review.editorial.content.compositions[0].compositionId;
    const takeAssets = [imported.a, imported.b, imported.alternate];
    savedTakeIds = ["take_trailer03_a", "take_trailer03_b", "take_trailer03_alternate"];
    const requestedAt = now();
    const content = {
      ...review.editorial.content,
      takes: takeAssets.map((asset, index) => ({
        schemaVersion: 1,
        takeId: savedTakeIds[index],
        projectId,
        shotId,
        source: { assetId: asset.assetId, version: asset.version },
        name: ["Camera A Take", "Camera B Take", "Unused Alternate Take"][index],
        createdAt: requestedAt,
        review: { state: "UNREVIEWED", note: "", reviewedAt: null },
      })),
      selectedTakes: [],
    };
    const saved = usingRepository(repository => repository.saveEditorial({ projectId, expectedRevision: 0, expectedProjectRevision: review.snapshot.project.revision, requestedAt, content }, "trailer03-save-takes-0001", actor));
    assert.equal(saved.editorial.revision, 1);
    assert.deepEqual(saved.editorial.content.takes.map(take => take.takeId), savedTakeIds);
    assert.ok(saved.editorial.content.takes.every(take => take.source.assetId !== imported.audio.assetId));
    assert.deepEqual(saved.editorial.content.compositions[0].layers, []);
    assert.equal(usingRepository(repository => repository.load(projectId).assets.length), 5);
  });

  await test("06 Explicit v2 copy retains all Takes, exposes qualified audio, and starts as an empty exact 50-second 25fps composition", async () => {
    const legacy = usingRepository(repository => repository.reviewEditorial(projectId));
    const migrated = usingRepository(repository => repository.migrateEditorialV2({
      operation: "COPY_V1_TO_V2",
      projectId,
      expectedProjectRevision: legacy.snapshot.project.revision,
      expectedEditorialRevision: legacy.editorial.revision,
      requestedAt: now(),
    }, "trailer03-copy-v1-v2-0001", actor));
    assert.equal(migrated.revision, 1);
    assert.equal(migrated.providerRequests, 0);
    assert.equal(migrated.generationAllowed, false);
    const entry = usingRepository(repository => repository.inspectEditorialV2WorkingCopy(projectId));
    assert.equal(entry.workingCopy.state, "READY");
    assert.deepEqual(entry.takeCatalogue.map(take => take.takeId), savedTakeIds);
    assert.ok(entry.takeCatalogue.every(take => take.mediaType === "VIDEO" && take.eligibility === "READY"));
    assert.deepEqual(entry.audioCatalogue.map(asset => ({ assetId: asset.assetId, version: asset.version })), [{ assetId: imported.audio.assetId, version: 1 }]);
    const selected = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.deepEqual(selected.timelineFrameRate, rational(25));
    assert.deepEqual(selected.composition.duration, rational(50));
    assert.equal(selected.composition.width, 1280);
    assert.equal(selected.composition.height, 720);
    assert.deepEqual(selected.composition.layers, []);
  });

  await test("07 Qualified source and composition coverage failures publish nothing", async () => {
    const before = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.throws(() => usingRepository(repository => repository.editEditorialV2Layer({
      operation: "INSERT_TAKE_LAYER",
      projectId,
      expectedRevision: before.revision,
      expectedCompositionRevision: before.composition.revision,
      compositionId,
      requestedAt: now(),
      takeId: savedTakeIds[0],
      start: rational(0),
      duration: rational(20),
      sourceOffset: rational(20),
    }, "trailer03-source-overflow-0001", actor)), error => error.code === "EDITORIAL_V2_SOURCE_COVERAGE");
    const unchanged = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(unchanged.headDigest, before.headDigest);
    assert.deepEqual(unchanged.composition, before.composition);
    assert.throws(() => usingRepository(repository => repository.editEditorialV2Layer({
      operation: "INSERT_TAKE_LAYER",
      projectId,
      expectedRevision: unchanged.revision,
      expectedCompositionRevision: unchanged.composition.revision,
      compositionId,
      requestedAt: now(),
      takeId: savedTakeIds[0],
      start: rational(45),
      duration: rational(10),
      sourceOffset: rational(0),
    }, "trailer03-composition-overflow-0001", actor)), error => error.code === "EDITORIAL_V2_COMPOSITION_COVERAGE");
    const final = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(final.headDigest, before.headDigest);
    assert.deepEqual(final.composition, before.composition);
  });

  await test("08 VIDEO insertion is idempotent and Undo/Redo restores identical layer/source identity with monotonic revisions", async () => {
    const before = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    const input = {
      operation: "INSERT_TAKE_LAYER",
      projectId,
      expectedRevision: before.revision,
      expectedCompositionRevision: before.composition.revision,
      compositionId,
      requestedAt: now(),
      takeId: savedTakeIds[0],
      start: rational(0),
      duration: rational(18),
      sourceOffset: rational(0),
    };
    const inserted = usingRepository(repository => repository.editEditorialV2Layer(input, "trailer03-insert-a-0001", actor));
    assert.equal(inserted.revision, before.revision + 1);
    const afterInsert = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(afterInsert.composition.layers.length, 1);
    const exactLayer = clone(afterInsert.composition.layers[0]);
    assert.equal(exactLayer.type, "VIDEO");
    assert.deepEqual(exactLayer.source, { kind: "ASSET", asset: { assetId: imported.a.assetId, version: 1 }, takeId: savedTakeIds[0] });
    assert.equal(exactLayer.provenance.providerRequests, 0);
    assert.equal(usingRepository(repository => repository.editEditorialV2Layer(input, "trailer03-insert-a-0001", actor)).headDigest, afterInsert.headDigest);
    assert.equal(usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId).composition.layers.length), 1);

    const undoView = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(undoView.history.undo.available, true);
    assert.equal(undoView.history.undo.targetOperation, "INSERT_TAKE_LAYER");
    usingRepository(repository => repository.navigateEditorialV2History({
      operation: "UNDO_EDITORIAL_EDIT",
      projectId,
      expectedRevision: undoView.revision,
      expectedHeadDigest: undoView.headDigest,
      compositionId,
      expectedCompositionRevision: undoView.composition.revision,
      requestedAt: now(),
    }, "trailer03-undo-a-0001", actor));
    const undone = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.deepEqual(undone.composition.layers, []);
    assert.ok(undone.composition.revision > afterInsert.composition.revision);
    assert.equal(undone.history.redo.available, true);
    usingRepository(repository => repository.navigateEditorialV2History({
      operation: "REDO_EDITORIAL_EDIT",
      projectId,
      expectedRevision: undone.revision,
      expectedHeadDigest: undone.headDigest,
      compositionId,
      expectedCompositionRevision: undone.composition.revision,
      requestedAt: now(),
    }, "trailer03-redo-a-0001", actor));
    const redone = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.deepEqual(redone.composition.layers, [exactLayer]);
    assert.ok(redone.composition.revision > undone.composition.revision);
    const retained = usingRepository(repository => ({ snapshot: repository.load(projectId), legacy: repository.reviewEditorial(projectId), entry: repository.inspectEditorialV2WorkingCopy(projectId) }));
    assert.equal(retained.snapshot.assets.length, 5);
    assert.equal(retained.legacy.editorial.content.takes.length, 3);
    assert.equal(retained.entry.takeCatalogue.length, 3);
  });

  await test("09 Overlapping second VIDEO, title, and AUDIO insertions preserve exact canonical source semantics", async () => {
    const insert = (specific, operationKey) => usingRepository(repository => {
      const view = repository.reviewEditorialV2Composition(projectId, compositionId);
      return repository.editEditorialV2Layer({
        projectId,
        expectedRevision: view.revision,
        expectedCompositionRevision: view.composition.revision,
        compositionId,
        requestedAt: now(),
        ...specific,
      }, operationKey, actor);
    });
    insert({ operation: "INSERT_TAKE_LAYER", takeId: savedTakeIds[1], start: rational(10), duration: rational(15), sourceOffset: rational(0) }, "trailer03-insert-b-0001");
    insert({
      operation: "INSERT_TEXT_LAYER",
      start: rational(1),
      duration: rational(5),
      text: { text: "TRAILER-03", fontRef: "ARIAL_REGULAR", fontSizePx: 64, color: "#FFFFFF" },
      transform: { ...defaultLayerTransform(), x: 24, y: 36 },
    }, "trailer03-insert-title-0001");
    insert({
      operation: "INSERT_AUDIO_LAYER",
      assetId: imported.audio.assetId,
      version: imported.audio.version,
      start: rational(0),
      duration: rational(50),
      sourceOffset: rational(0),
      audio: { gainDb: -7, fadeIn: rational(1), fadeOut: rational(2), muted: false },
    }, "trailer03-insert-audio-0001");
    const view = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.deepEqual(view.composition.layers.map(layer => layer.type), ["VIDEO", "VIDEO", "TEXT", "AUDIO"]);
    const videos = view.composition.layers.filter(layer => layer.type === "VIDEO");
    assert.deepEqual(videos.map(layer => layer.source.takeId), savedTakeIds.slice(0, 2));
    assert.deepEqual(videos.map(layer => layer.start), [rational(0), rational(10)]);
    assert.deepEqual(videos.map(layer => layer.duration), [rational(18), rational(15)]);
    const title = view.composition.layers.find(layer => layer.type === "TEXT");
    assert.deepEqual(title.source, { kind: "TEXT" });
    assert.deepEqual(title.text, { text: "TRAILER-03", fontRef: "ARIAL_REGULAR", fontSizePx: 64, color: "#FFFFFF" });
    const audio = view.composition.layers.find(layer => layer.type === "AUDIO");
    assert.deepEqual(audio.source, { kind: "ASSET", asset: { assetId: imported.audio.assetId, version: 1 }, takeId: null });
    assert.deepEqual(audio.audio, { gainDb: -7, fadeIn: rational(1), fadeOut: rational(2), muted: false });
    assert.equal(audio.opacity, 1);
    assert.deepEqual(audio.transform, defaultLayerTransform());
  });

  await test("10 Unused alternate insertion is reversible without deleting its Asset or Take, and layer use creates no duplicates", async () => {
    const before = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    usingRepository(repository => repository.editEditorialV2Layer({
      operation: "INSERT_TAKE_LAYER",
      projectId,
      expectedRevision: before.revision,
      expectedCompositionRevision: before.composition.revision,
      compositionId,
      requestedAt: now(),
      takeId: savedTakeIds[2],
      start: rational(35),
      duration: rational(10),
      sourceOffset: rational(0),
    }, "trailer03-insert-alternate-0001", actor));
    const inserted = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(inserted.composition.layers.length, 5);
    assert.equal(inserted.composition.layers.at(-1).source.takeId, savedTakeIds[2]);
    usingRepository(repository => repository.navigateEditorialV2History({
      operation: "UNDO_EDITORIAL_EDIT",
      projectId,
      expectedRevision: inserted.revision,
      expectedHeadDigest: inserted.headDigest,
      compositionId,
      expectedCompositionRevision: inserted.composition.revision,
      requestedAt: now(),
    }, "trailer03-undo-alternate-0001", actor));
    const final = usingRepository(repository => ({
      snapshot: repository.load(projectId),
      legacy: repository.reviewEditorial(projectId),
      entry: repository.inspectEditorialV2WorkingCopy(projectId),
      composition: repository.reviewEditorialV2Composition(projectId, compositionId),
    }));
    assert.equal(final.composition.composition.layers.length, 4);
    assert.equal(final.composition.composition.layers.some(layer => layer.source.kind === "ASSET" && layer.source.takeId === savedTakeIds[2]), false);
    assert.equal(final.snapshot.assets.length, 5);
    assert.equal(new Set(final.snapshot.assets.map(asset => `${asset.assetId}:${asset.version}`)).size, 5);
    assert.deepEqual(final.legacy.editorial.content.takes.map(take => take.takeId), savedTakeIds);
    assert.deepEqual(final.entry.takeCatalogue.map(take => take.takeId), savedTakeIds);
    assert.equal(final.entry.audioCatalogue.length, 1);
  });

  await test("11 Fresh repository reopen retains exact working-copy identity, history, source catalogues, and zero-execution boundaries", async () => {
    const before = usingRepository(repository => ({
      snapshot: repository.load(projectId),
      legacy: repository.reviewEditorial(projectId),
      entry: repository.inspectEditorialV2WorkingCopy(projectId),
      selected: repository.reviewEditorialV2Composition(projectId, compositionId),
      audit: repository.auditEditorialV2History(projectId, 64),
    }));
    const after = usingRepository(repository => ({
      snapshot: repository.load(projectId),
      legacy: repository.reviewEditorial(projectId),
      entry: repository.inspectEditorialV2WorkingCopy(projectId),
      selected: repository.reviewEditorialV2Composition(projectId, compositionId),
      audit: repository.auditEditorialV2History(projectId, 64),
    }));
    assert.deepEqual(after, before);
    assert.equal(after.audit.complete, true);
    assert.equal(after.audit.checkedCommits, after.selected.revision);
    assert.equal(after.selected.providerRequests, 0);
    assert.equal(after.selected.generationAllowed, false);
    assert.deepEqual(after.snapshot.jobs, []);
    assert.deepEqual(after.snapshot.costs, []);
    assert.deepEqual(after.snapshot.approvals, []);
    assert.deepEqual(networkAttempts, []);
    writeEvidence("retained-state.json", {
      projectId,
      projectRevision: after.snapshot.project.revision,
      recordDigest: after.snapshot.recordDigest,
      assetRefs: after.snapshot.assets.map(asset => ({ assetId: asset.assetId, version: asset.version, assetType: asset.assetType, contentHash: asset.contentHash })),
      takeIds: after.legacy.editorial.content.takes.map(take => take.takeId),
      workingCopyRevision: after.selected.revision,
      workingCopyHeadDigest: after.selected.headDigest,
      composition: after.selected.composition,
      history: after.selected.history,
      audit: after.audit,
      repositoryReopenVerified: true,
      subprocessRestartNotClaimed: true,
      providerRequests: 0,
      rendererExecutions: 0,
      networkAttempts,
    });
  });
  await test("12 Four independently named AUDIO occurrences reuse one immutable asset without imports", async () => {
    const before = usingRepository(repository => repository.load(projectId));
    for (const [name, start, duration, offset] of [["Voiceover-role signal", 2, 5, 1], ["SFX occurrence A", 4, 1, 2], ["SFX occurrence B", 9, 1, 3]]) {
      usingRepository(repository => {
        const view = repository.reviewEditorialV2Composition(projectId, compositionId);
        repository.editEditorialV2Layer({ operation: "INSERT_AUDIO_LAYER", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId, requestedAt: now(), assetId: imported.audio.assetId, version: 1, start: rational(start), duration: rational(duration), sourceOffset: rational(offset), audio: { gainDb: -12, fadeIn: rational(0), fadeOut: rational(0), muted: false } }, key("trailer06-insert"), actor);
        const inserted = repository.reviewEditorialV2Composition(projectId, compositionId);
        repository.editEditorialV2Layer({ operation: "SET_LAYER_PROPERTIES", projectId, expectedRevision: inserted.revision, expectedCompositionRevision: inserted.composition.revision, compositionId, layerId: inserted.composition.layers.at(-1).layerId, requestedAt: now(), changes: { name } }, key("trailer06-name"), actor);
      });
    }
    const view = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    const audio = view.composition.layers.filter(layer => layer.type === "AUDIO");
    assert.equal(audio.length, 4); assert.equal(new Set(audio.map(layer => layer.layerId)).size, 4);
    assert.deepEqual(audio.slice(1).map(layer => layer.name), ["Voiceover-role signal", "SFX occurrence A", "SFX occurrence B"]);
    assert.ok(audio.every(layer => layer.source.asset.assetId === imported.audio.assetId && layer.source.asset.version === 1));
    assert.deepEqual(usingRepository(repository => repository.load(projectId)), before);
  });

  await test("13 AUDIO timing edits are exact, source-covered, replayable and preserve all other instructions", async () => {
    const before = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId)), layer = before.composition.layers.at(-1);
    const request = { operation: "SET_AUDIO_LAYER_TIMING", projectId, expectedRevision: before.revision, expectedCompositionRevision: before.composition.revision, compositionId, layerId: layer.layerId, requestedAt: now(), start: rational(432001, 48000), duration: rational(47999, 48000), sourceOffset: rational(144001, 48000) };
    const operationKey = key("trailer06-timing");
    const first = usingRepository(repository => repository.editEditorialV2Layer(request, operationKey, actor));
    const second = usingRepository(repository => repository.editEditorialV2Layer(request, operationKey, actor));
    assert.deepEqual(second, first);
    const after = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(after.revision, before.revision + 1); assert.deepEqual(after.composition.duration, before.composition.duration);
    assert.deepEqual(after.composition.layers.slice(0, -1), before.composition.layers.slice(0, -1));
    const changed = after.composition.layers.at(-1);
    assert.deepEqual(changed, { ...layer, start: request.start, duration: request.duration, sourceOffset: request.sourceOffset, updatedAt: request.requestedAt, version: layer.version + 1 });
    assert.throws(() => usingRepository(repository => repository.editEditorialV2Layer({ ...request, requestedAt: now() }, key("trailer06-stale"), actor)), error => error.code === "EDITORIAL_V2_CONFLICT");
    assert.throws(() => usingRepository(repository => repository.editEditorialV2Layer({ ...request, sourceOffset: rational(2) }, operationKey, actor)), error => error.code === "EDITORIAL_V2_CONFLICT");
    assert.deepEqual(usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId)), after);
  });

  await test("14 Invalid AUDIO timing and names publish no head or partial edit", async () => {
    const before = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId)), audio = before.composition.layers.at(-1), visual = before.composition.layers.find(layer => layer.type === "VIDEO");
    const common = { projectId, expectedRevision: before.revision, expectedCompositionRevision: before.composition.revision, compositionId, layerId: audio.layerId };
    for (const changes of [{ start: rational(1, 7), duration: rational(1), sourceOffset: rational(0) }, { start: rational(49), duration: rational(2), sourceOffset: rational(0) }, { start: rational(1), duration: rational(2), sourceOffset: rational(49) }, { start: rational(0), duration: rational(0), sourceOffset: rational(0) }, { start: rational(1), duration: rational(1), sourceOffset: rational(0), layerId: visual.layerId }]) {
      assert.throws(() => usingRepository(repository => repository.editEditorialV2Layer({ operation: "SET_AUDIO_LAYER_TIMING", ...common, requestedAt: now(), ...changes }, key("trailer06-invalid"), actor)));
      assert.deepEqual(usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId)), before);
    }
    for (const name of ["", " ", "x".repeat(161), "bad\nname"]) assert.throws(() => usingRepository(repository => repository.editEditorialV2Layer({ operation: "SET_LAYER_PROPERTIES", ...common, requestedAt: now(), changes: { name } }, key("trailer06-invalid-name"), actor)));
    const faded = before.composition.layers.find(layer => layer.type === "AUDIO" && layer.audio.fadeOut.numerator > 0);
    assert.throws(() => usingRepository(repository => repository.editEditorialV2Layer({ operation: "SET_AUDIO_LAYER_TIMING", ...common, layerId: faded.layerId, requestedAt: now(), start: rational(0), duration: rational(1), sourceOffset: rational(0) }, key("trailer06-fade-coverage"), actor)));
    assert.deepEqual(usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId)), before);
  });

  await test("15 AUDIO timing Undo survives repository reopen and Redo recovers exact saved instructions", async () => {
    const original = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(original.history.undo.targetOperation, "SET_AUDIO_LAYER_TIMING");
    usingRepository(repository => repository.navigateEditorialV2History({ operation: "UNDO_EDITORIAL_EDIT", projectId, expectedRevision: original.revision, expectedHeadDigest: original.headDigest, compositionId, expectedCompositionRevision: original.composition.revision, requestedAt: now() }, key("trailer06-undo"), actor));
    const undone = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    assert.equal(undone.history.redo.available, true); assert.equal(undone.history.redo.targetOperation, "SET_AUDIO_LAYER_TIMING");
    assert.deepEqual(undone.composition.layers.at(-1).start, rational(9));
    usingRepository(repository => repository.navigateEditorialV2History({ operation: "REDO_EDITORIAL_EDIT", projectId, expectedRevision: undone.revision, expectedHeadDigest: undone.headDigest, compositionId, expectedCompositionRevision: undone.composition.revision, requestedAt: now() }, key("trailer06-redo"), actor));
    const restored = usingRepository(repository => repository.reviewEditorialV2Composition(projectId, compositionId));
    for (const field of ["name", "source", "start", "duration", "sourceOffset", "audio", "enabled", "provenance"]) assert.deepEqual(restored.composition.layers.at(-1)[field], original.composition.layers.at(-1)[field], field);
    assert.deepEqual(restored.composition.layers.slice(0, -1), original.composition.layers.slice(0, -1));
    assert.deepEqual(restored.composition.duration, original.composition.duration);
    writeEvidence("trailer06-audio-editor-state.json", { restored, audit: usingRepository(repository => repository.auditEditorialV2History(projectId, 64)), providerRequests: 0, networkAttempts });
  });
} finally {
  const passed = results.filter(result => result.status === "PASS").length;
  const sourceFiles = [...new Set([
    ...loader.loaded,
    "scripts/animation-studio-test-loader.mjs",
    "scripts/test-animation-studio-trailer-03.mjs",
  ])].sort().map(file => ({ path: file, sha256: sha(fs.readFileSync(path.join(frontendRoot, file))) }));
  const result = {
    schemaVersion: 1,
    suite: "animation-studio-trailer-03",
    runId,
    namespace,
    evidenceRoot,
    status: results.length === 15 && passed === 15 && networkAttempts.length === 0 ? "PASS" : "FAIL",
    passed,
    failed: results.filter(result => result.status === "FAIL").length,
    expectedCases: 15,
    results,
    sourceFiles,
    networkAttempts,
    providerRequests: 0,
    rendererExecutions: 0,
    ffmpegExecutions: 0,
    subprocessExecutions: 0,
    retainedFixtures: true,
    limitations: [
      "Media fixtures are synthetic in-memory staged byte sources with qualified technical metadata; no decoder, FFprobe, FFmpeg, renderer, provider, or playback claim is made.",
      "Persistence is verified through a fresh native repository handle in the same Node process; no subprocess restart claim is made by this focused suite.",
      "Rendered UI and human media review remain separate acceptance surfaces.",
    ],
  };
  writeEvidence("result.json", result);
  fs.closeSync(log);
  process.stdout.write(JSON.stringify(result) + "\n");
  if (result.status !== "PASS") process.exitCode = 1;
}
