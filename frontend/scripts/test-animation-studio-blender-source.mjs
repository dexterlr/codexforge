// Canonical native-store tests only. Synthetic framing is not Blender, FFprobe,
// playback, colour conversion, or browser acceptance. No external process other
// than a clean Node restart reader; no D reads/writes and no network.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const file = fileURLToPath(import.meta.url), frontend = path.resolve(path.dirname(file), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { openStudioRepository, parseAssetManifestJson } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { defaultLayerTransform } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { resolveAssetPath } = loader.load("@/lib/codexforge/animation-studio/workspace");
const { validateBlenderSourceDescriptor, validateBlenderRenderSettings } = loader.load("@/lib/codexforge/animation-studio/blender-source-contract");
const { readBlenderJob, validateBlenderSourceAsset } = loader.load("@/lib/codexforge/animation-studio/blender-source-identity.server");
const { validateBlenderDerivedMediaAsset } = loader.load("@/lib/codexforge/animation-studio/footage-contract");
const { validateAssetManifest } = loader.load("@/lib/codexforge/animation-studio/validation");
const sha = value => createHash("sha256").update(value).digest("hex"), clone = value => JSON.parse(JSON.stringify(value));
const actor = "synthetic-blender-persistence-test", code = expected => error => error?.code === expected;
function open(namespace) { return openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" }); }
if (process.argv[2] === "--restart") {
  const repo = open(process.argv[3]);
  try {
    const projectId = process.argv[4], compositionId = process.argv[5], snapshot = repo.load(projectId);
    console.log(JSON.stringify({ snapshot, view: repo.reviewEditorialV2Composition(projectId, compositionId), catalogue: repo.inspectEditorialV2WorkingCopy(projectId), networkAttempts }));
  } finally { repo.close(); }
} else {
  const namespace = "blender-source-" + randomUUID(), evidence = path.join(frontend, ".codexforge", "acceptance", namespace);
  fs.mkdirSync(evidence, { recursive: false });
  const results = []; let repo = open(namespace), serial = 0;
  const now = () => new Date(Date.UTC(2026, 9, 13, 0, 0, serial++)).toISOString(), key = label => label + "-" + String(serial++).padStart(8, "0");
  const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
  function test(label, action) { action(); results.push({ label, status: "PASS" }); console.log("PASS " + label); }
  const projectId = "project_blender_persistence", originalBytes = Buffer.from("synthetic original source bytes, not decoded media");
  const sourceHash = sha("synthetic native .blend identity, never opened");
  const descriptor = {
    format: "studio-blender-source-v1", catalogueId: "approved-synthetic-source", label: "Synthetic native source",
    source: { originalPath: "D:\\DesignatedReadOnly\\synthetic.blend", relativeName: "synthetic.blend", byteLength: 2048, sha256: sourceHash }, dependencies: [],
    inspection: { schemaVersion: 1, supported: true, unsupported: [], sourceSha256: sourceHash, sourceBytes: 2048, blenderVersion: "5.0.1", dependencies: [], embeddedScripts: [], drivers: [], addons: [], scenes: [{ name: "Scene", cameras: ["Camera"], activeCamera: "Camera", frameStart: 1, frameEnd: 1500, fps: 25, fpsBase: 1, width: 960, height: 540, percentage: 100, engine: "BLENDER_EEVEE_NEXT", viewTransform: "Standard", displayDevice: "sRGB", look: "None", exposure: 0, gamma: 1, filmTransparent: false }], trustBoundary: "Synthetic store test only" },
  };
  const settings = { profile: "BLENDER_PREVIEW_720P25_V1", scene: "Scene", camera: "Camera", frameStart: 76, frameEnd: 150, width: 1280, height: 720, fps: 25, adapterVersion: "synthetic-test-v1", blender: { path: "C:\\SyntheticTools\\blender.exe", sha256: sha("blender"), version: "5.0.1" }, ffmpeg: { path: "C:\\SyntheticTools\\ffmpeg.exe", sha256: sha("ffmpeg") }, ffprobe: { path: "C:\\SyntheticTools\\ffprobe.exe", sha256: sha("ffprobe") }, scriptHashes: { inspect: sha("inspect"), render: sha("render") }, colourTransform: "Synthetic boundary metadata only; no colour proof" };
  const box = (name, payload) => { const bytes = Buffer.alloc(8 + payload.length); bytes.writeUInt32BE(bytes.length); bytes.write(name, 4, "ascii"); payload.copy(bytes, 8); return bytes; };
  const video = Buffer.concat([box("ftyp", Buffer.from("isom\0\0\0\0isom", "binary")), box("moov", Buffer.alloc(8)), box("mdat", Buffer.from("synthetic Blender publication bytes"))]);
  function staged(overrides = {}) {
    return { mediaType: "VIDEO", contentType: "video/mp4", byteLength: video.length, contentHash: sha(video), technical: { schema: "studio-qualified-local-media-v1", mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width: 1280, height: 720, frameRate: { numerator: 25, denominator: 1 }, frameCadence: "CFR_25_EXACT", duration: { numerator: 3, denominator: 1 }, sourceUnits: 75, sourceUnit: "FRAME", timeBase: { numerator: 1, denominator: 12800 }, colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1, probeDigest: sha("synthetic-not-actual-probe") }, read(offset, length) { return Buffer.from(video.subarray(offset, offset + length)); }, close() {}, ...overrides };
  }
  let shotId, compositionId, originalSnapshot, originalEditorial, source, job, acquired, output, admitted, beforeJobView;
  const current = () => repo.reviewEditorialV2Composition(projectId, compositionId);
  const prepare = () => repo.prepareBlenderRender({ projectId, shotId, expectedProjectRevision: repo.load(projectId).project.revision, requestedAt: now(), source, settings }, key("prepare"), actor).value;
  const acquire = value => repo.acquireBlenderRender(projectId, value.jobId, readBlenderJob(value).specDigest, key("acquire"), actor, now());
  const progress = value => repo.checkpointBlenderRender(projectId, value.job.jobId, value.token, { phase: "VALIDATING", completedFrames: 75, totalFrames: 75, process: { pid: 1234, identity: "synthetic-test-identity-not-a-real-process", executableSha256: settings.blender.sha256, startedAt: value.job.startedAt } }, key("progress"), actor, now());
  const admit = ref => { const view = current(); return repo.admitEditorialV2DerivedTake({ operation: "ADMIT_DERIVED_TAKE", projectId, compositionId, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, assetId: ref.assetId, version: ref.version, requestedAt: now() }, key("admit"), actor); };
  function navigate(operation) { const view = current(); return repo.navigateEditorialV2History({ operation, projectId, compositionId, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, expectedCompositionRevision: view.composition.revision, requestedAt: now() }, key("navigate"), actor); }
  try {
    test("00 empty canonical original explicitly saves before an empty working copy and native source", () => {
      const emptyId = "project_blender_empty_initial";
      repo.createDraftProject({ schemaVersion: 1, projectId: emptyId, revision: 1, title: "Empty original first-save regression", description: "No seeded media, Takes or layers", currency: "GBP", createdAt: now() }, key("empty-project"), actor);
      const initial = repo.reviewEditorial(emptyId), snapshot = clone(initial.snapshot), copyBefore = repo.inspectEditorialV2WorkingCopy(emptyId);
      assert.equal(initial.editorial.revision, 0); assert.equal(initial.editorial.persisted, false); assert.equal(copyBefore.legacyPersisted, false);
      assert.deepEqual(snapshot.assets, []); assert.deepEqual(initial.editorial.content.takes, []); assert.deepEqual(initial.editorial.content.selectedTakes, []);
      assert.ok(initial.editorial.content.compositions.length > 0); assert.ok(initial.editorial.content.compositions.every(item => item.layers.length === 0));
      const input = { projectId: emptyId, expectedRevision: 0, expectedProjectRevision: snapshot.project.revision, content: initial.editorial.content, requestedAt: now() }, requestKey = key("empty-save");
      const receipt = repo.saveEditorial(input, requestKey, actor);
      assert.equal(receipt.editorial.revision, 1); assert.equal(receipt.editorial.persisted, true); assert.deepEqual(receipt.editorial.content, initial.editorial.content);
      assert.deepEqual(repo.saveEditorial(input, requestKey, actor), receipt); assert.deepEqual(repo.load(emptyId), snapshot);
      const eligible = repo.inspectEditorialV2WorkingCopy(emptyId); assert.equal(eligible.legacyPersisted, true); assert.equal(eligible.legacyRevision, 1);
      const created = repo.migrateEditorialV2({ operation: "COPY_V1_TO_V2", projectId: emptyId, expectedProjectRevision: snapshot.project.revision, expectedEditorialRevision: 1, requestedAt: now() }, key("empty-copy"), actor);
      assert.equal(created.revision, 1);
      const emptyComp = initial.editorial.content.compositions[0].compositionId, beforeNative = repo.reviewEditorialV2Composition(emptyId, emptyComp);
      assert.deepEqual(beforeNative.composition.layers, []); assert.equal(beforeNative.history.undo.available, false);
      const native = repo.registerBlenderSource({ projectId: emptyId, shotId: snapshot.shots[0].shotId, expectedProjectRevision: snapshot.project.revision, requestedAt: now(), descriptor }, key("empty-native"), actor);
      assert.deepEqual(repo.readBlenderSource(emptyId, native.value.source), descriptor); assert.deepEqual(repo.reviewEditorialV2Composition(emptyId, emptyComp), beforeNative);
      assert.deepEqual(repo.reviewEditorial(emptyId).editorial, receipt.editorial); assert.deepEqual(repo.inspectEditorialV2WorkingCopy(emptyId).takeCatalogue, []);
      assert.deepEqual(repo.load(emptyId).shots, snapshot.shots); assert.deepEqual(repo.load(emptyId).jobs, []);
      repo.close(); repo = open(namespace);
      assert.deepEqual(repo.reviewEditorialV2Composition(emptyId, emptyComp), beforeNative); assert.equal(repo.reviewEditorial(emptyId).editorial.persisted, true);
    });
    test("01 strict descriptor, source/path distinction and bounded profile", () => {
      assert.deepEqual(validateBlenderSourceDescriptor(descriptor), descriptor); assert.deepEqual(validateBlenderRenderSettings(settings, descriptor), settings);
      for (const originalPath of ["\\\\host\\share\\cat.blend", "https://example.test/cat.blend", "D:\\parent\\..\\cat.blend", "D:\\cat.blend:stream"]) assert.throws(() => validateBlenderSourceDescriptor({ ...descriptor, source: { ...descriptor.source, originalPath } }));
      assert.throws(() => validateBlenderSourceDescriptor({ ...descriptor, dependencies: [{ relativePath: "secret", sha256: sourceHash, byteLength: 2 }] }), code("BLENDER_DEPENDENCIES_UNSUPPORTED"));
      assert.throws(() => validateBlenderRenderSettings({ ...settings, frameEnd: 151 }, descriptor));
      assert.throws(() => validateBlenderRenderSettings({ ...settings, camera: "Different" }, descriptor), code("BLENDER_SCENE_BINDING"));
    });
    test("02 existing project, original Take, selection and prior v2 edit", () => {
      repo.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Synthetic Blender lifecycle", description: "Canonical store tests; no actual render", currency: "GBP", createdAt: now() }, key("create"), actor);
      const createdAt = now(), ref = { assetId: "asset_original_retained", version: 1 }, contentHash = sha(originalBytes);
      const asset = { schemaVersion: 1, ...ref, projectId, sourcePath: resolveAssetPath(projectId, ref, "VIDEO", contentHash), contentHash, assetType: "VIDEO", approvalState: "DRAFT", dependencies: [], rights: { status: "UNKNOWN", license: null, evidence: null }, createdAt, supersededBy: null, lineage: [], provenance: { adapterMetadata: null, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: createdAt, cost: { currency: "GBP", minorUnits: 0 }, contentHash, parentAssets: [], jobId: null, approvalState: "DRAFT", rejectionReason: null } };
      repo.registerAsset(asset, originalBytes, key("original"), actor, now());
      originalSnapshot = repo.load(projectId); shotId = originalSnapshot.shots[0].shotId;
      const content = repo.reviewEditorial(projectId).editorial.content; compositionId = content.compositions[0].compositionId; const stamp = now();
      content.takes = [{ schemaVersion: 1, takeId: "take_original_retained", projectId, shotId, source: ref, name: "Original retained Take", createdAt: stamp, review: { state: "UNREVIEWED", note: "", reviewedAt: null } }];
      content.selectedTakes = [{ shotId, takeId: "take_original_retained" }];
      content.compositions[0].layers = [{ schemaVersion: 1, layerId: "layer_original_retained", compositionId, name: "Original", type: "VIDEO", source: { kind: "ASSET", asset: ref, takeId: "take_original_retained" }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 1_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } }];
      repo.saveEditorial({ projectId, expectedRevision: 0, expectedProjectRevision: originalSnapshot.project.revision, content, requestedAt: now() }, key("legacy"), actor);
      originalEditorial = clone(repo.reviewEditorial(projectId).editorial);
      repo.migrateEditorialV2({ operation: "COPY_V1_TO_V2", projectId, expectedProjectRevision: originalSnapshot.project.revision, expectedEditorialRevision: 1, requestedAt: now() }, key("migrate"), actor);
      const view = current(); repo.editEditorialV2Layer({ operation: "SET_LAYER_PROPERTIES", projectId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId, layerId: "layer_original_retained", changes: { name: "Existing prior edit" }, requestedAt: now() }, key("prior-edit"), actor);
      beforeJobView = current(); assert.equal(beforeJobView.history.undo.available, true);
    });
    test("03 native registration stores descriptor hash separately and retains history", () => {
      const input = { projectId, shotId, expectedProjectRevision: repo.load(projectId).project.revision, requestedAt: now(), descriptor }, requestKey = key("register");
      const result = repo.registerBlenderSource(input, requestKey, actor); source = result.value.source;
      assert.deepEqual(repo.registerBlenderSource(input, requestKey, actor), result);
      assert.deepEqual(repo.readBlenderSource(projectId, source), descriptor); assert.notEqual(result.value.descriptorHash, sourceHash);
      const asset = repo.load(projectId).assets.find(item => item.assetId === source.assetId);
      for (const change of [v => v.provenance.promptId = "prompt_false", v => v.provenance.jobId = "job_false", v => v.provenance.adapterMetadata.provider = "invented", v => v.provenance.adapterMetadata.settings.descriptorHash = sourceHash, v => v.provenance.adapterMetadata.settings.blendSha256 = "wrong", v => v.provenance.adapterMetadata.settings.privatePath = "C:\\private", v => v.assetType = "VIDEO"]) { const bad = clone(asset); change(bad); assert.throws(() => validateAssetManifest(bad)); }
      for (const change of [v => v.assetId = "asset_blender_" + "f".repeat(24), v => v.provenance.adapterMetadata.settings.dependenciesDigest = "f".repeat(64), v => v.provenance.adapterMetadata.settings.catalogueId = "different-approved-source"]) {
        const bad = clone(asset); change(bad); bad.sourcePath = resolveAssetPath(projectId, bad, "DOCUMENT", bad.contentHash);
        assert.throws(() => validateBlenderSourceAsset(bad)); assert.throws(() => parseAssetManifestJson(JSON.stringify(bad)));
      }
      assert.deepEqual(current(), beforeJobView);
      assert.deepEqual(repo.load(projectId).shots, originalSnapshot.shots); assert.deepEqual(repo.reviewEditorial(projectId).editorial, originalEditorial);
    });
    test("04 exact prepare, single-use acquisition, failure guards, retained prior edit", () => {
      job = prepare(); const requestKey = key("first-acquire"), stamp = now();
      for (const change of [v => v.checkpoint.blenderExecution.specDigest = "f".repeat(64), v => v.checkpoint.blenderExecution.spec.settings.frameEnd = 149, v => v.inputs[0].version = 2]) { const bad = clone(job); change(bad); assert.throws(() => readBlenderJob(bad)); }
      acquired = repo.acquireBlenderRender(projectId, job.jobId, readBlenderJob(job).specDigest, requestKey, actor, stamp); assert.equal(acquired.acquired, true); assert.match(acquired.token, /^[a-f0-9]{48}$/u);
      const replay = repo.acquireBlenderRender(projectId, job.jobId, readBlenderJob(job).specDigest, requestKey, actor, stamp); assert.equal(replay.acquired, false); assert.equal(replay.token, null);
      assert.throws(() => acquire(job), code("BLENDER_PREPARATION_STALE"));
      assert.throws(() => repo.publishBlenderRenderOutput(projectId, job.jobId, "wrong", staged(), key("bad-token"), actor, now()), code("BLENDER_JOB_NOT_ACTIVE"));
      assert.throws(() => repo.publishBlenderRenderOutput(projectId, job.jobId, acquired.token, staged(), key("no-process"), actor, now()), code("BLENDER_OUTPUT_BINDING"));
      progress(acquired); const wrong = staged(); wrong.technical.colorTransfer = "smpte2084";
      assert.throws(() => repo.publishBlenderRenderOutput(projectId, job.jobId, acquired.token, wrong, key("wrong-colour"), actor, now()));
      assert.deepEqual(current(), beforeJobView);
    });
    test("05 canonical derived publication is one output and never human-upload provenance", () => {
      const requestKey = key("publish"), stamp = now(), result = repo.publishBlenderRenderOutput(projectId, job.jobId, acquired.token, staged(), requestKey, actor, stamp); output = result.value.asset;
      assert.deepEqual(repo.publishBlenderRenderOutput(projectId, job.jobId, acquired.token, staged(), requestKey, actor, stamp), result);
      const snapshot = repo.load(projectId), asset = snapshot.assets.find(item => item.assetId === output.assetId);
      validateBlenderDerivedMediaAsset(asset); assert.equal(asset.provenance.jobId, job.jobId); assert.deepEqual(asset.dependencies, [source]);
      for (const change of [v => v.provenance.jobId = null, v => v.provenance.promptId = "prompt_false", v => v.provenance.adapterMetadata.provider = "invented", v => v.provenance.adapterMetadata.settings.costBasis = "LOCAL_IMPORT_NO_PROVIDER_REQUEST", v => v.provenance.adapterMetadata.settings.acquisition = "HUMAN_FILE_UPLOAD", v => v.provenance.parentAssets = [], v => v.provenance.adapterMetadata.settings.technical.colorTransfer = "smpte2084"]) { const bad = clone(asset); change(bad); assert.throws(() => validateAssetManifest(bad)); }
      assert.equal(asset.provenance.adapterMetadata.settings.acquisition, "SERVER_GENERATED_LOCAL_BLENDER_RENDER");
      assert.equal(Object.hasOwn(asset.provenance.adapterMetadata.settings, "costBasis"), false);
      assert.equal(asset.approvalState, "DRAFT"); assert.equal(snapshot.qcResults.at(-1).result, "REVIEW"); assert.deepEqual(snapshot.approvals, []); assert.deepEqual(snapshot.costs, []);
      assert.deepEqual(repo.readFootage(projectId, output.assetId, output.version), video); assert.deepEqual(snapshot.shots, originalSnapshot.shots);
      assert.deepEqual(current(), beforeJobView); assert.equal(repo.inspectEditorialV2WorkingCopy(projectId).takeCatalogue.length, 1);
      assert.throws(() => repo.registerAsset(asset, video, key("forged-upload"), actor, now()), code("MANAGED_BLENDER_ONLY"));
    });
    test("06 explicit Take admission preserves active history and original selection", () => {
      admitted = admit(output); const view = current(); assert.deepEqual(view.composition, beforeJobView.composition); assert.deepEqual(view.history, beforeJobView.history);
      assert.equal(repo.inspectEditorialV2WorkingCopy(projectId).takeCatalogue.length, 2);
      assert.equal(admit(output).takeId, admitted.takeId); assert.equal(current().headDigest, view.headDigest);
      assert.deepEqual(repo.reviewEditorial(projectId).editorial, originalEditorial);
      navigate("UNDO_EDITORIAL_EDIT"); assert.equal(current().composition.layers[0].name, "Original"); assert.equal(repo.inspectEditorialV2WorkingCopy(projectId).takeCatalogue.length, 2);
      navigate("REDO_EDITORIAL_EDIT"); assert.equal(current().composition.layers[0].name, "Existing prior edit");
    });
    test("07 existing INSERT_TAKE_LAYER plus Undo/Redo retains reusable source", () => {
      const view = current(); repo.editEditorialV2Layer({ operation: "INSERT_TAKE_LAYER", projectId, compositionId, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, takeId: admitted.takeId, start: { numerator: 0, denominator: 1 }, duration: { numerator: 3, denominator: 1 }, sourceOffset: { numerator: 0, denominator: 1 }, requestedAt: now() }, key("insert"), actor);
      assert.equal(current().composition.layers.length, 2); navigate("UNDO_EDITORIAL_EDIT"); assert.equal(current().composition.layers.length, 1);
      assert.equal(repo.inspectEditorialV2WorkingCopy(projectId).takeCatalogue.length, 2); navigate("REDO_EDITORIAL_EDIT"); assert.equal(current().composition.layers.length, 2);
      assert.deepEqual(repo.load(projectId).shots, originalSnapshot.shots);
    });
    test("08 a second render after editor history remains usable and nonduplicate", () => {
      const before = current(), another = acquire(prepare()); progress(another);
      const next = repo.publishBlenderRenderOutput(projectId, another.job.jobId, another.token, staged(), key("second-publish"), actor, now()).value.asset;
      assert.notEqual(next.assetId, output.assetId); assert.deepEqual(current(), before); admit(next);
      assert.equal(repo.inspectEditorialV2WorkingCopy(projectId).takeCatalogue.length, 3); assert.deepEqual(repo.load(projectId).shots, originalSnapshot.shots);
      const snapshot = repo.load(projectId); assert.equal(snapshot.assets.filter(item => item.provenance.adapterMetadata?.adapterId === "studio-blender-derived-video-v1").length, 2);
      assert.equal(snapshot.jobs.filter(item => item.state === "SUCCEEDED").length, 2);
    });
    test("09 native process restart retains assets, job outcomes, selection and Undo/Redo", () => {
      const expectedSnapshot = repo.load(projectId), expectedView = current(); repo.close();
      const child = spawnSync(process.execPath, [file, "--restart", namespace, projectId, compositionId], { cwd: frontend, env: { SystemRoot: "C:\\Windows", WINDIR: "C:\\Windows", PATH: `${path.dirname(process.execPath)};C:\\Windows\\System32` }, windowsHide: true, encoding: "utf8", timeout: 30000, maxBuffer: 2 * 1024 * 1024 });
      assert.equal(child.error, undefined); assert.equal(child.status, 0, child.stderr); const recovered = JSON.parse(child.stdout);
      assert.deepEqual(recovered.networkAttempts, []); assert.deepEqual(recovered.snapshot, expectedSnapshot); assert.deepEqual(recovered.view, expectedView); assert.equal(recovered.catalogue.takeCatalogue.length, 3);
      repo = open(namespace); navigate("UNDO_EDITORIAL_EDIT"); assert.equal(current().composition.layers.length, 1); navigate("REDO_EDITORIAL_EDIT"); assert.equal(current().composition.layers.length, 2);
    });
    test("10 failed and interrupted attempts cannot publish or acquire again", () => {
      for (const phase of ["FAILED", "CANCELLED", "INTERRUPTED"]) {
        const active = acquire(prepare()); repo.terminateBlenderRender(projectId, active.job.jobId, active.token, phase, "SYNTHETIC_BOUNDARY_TEST", key("terminate"), actor, now());
        assert.throws(() => repo.publishBlenderRenderOutput(projectId, active.job.jobId, active.token, staged(), key("late-publish"), actor, now()), code("BLENDER_JOB_NOT_ACTIVE"));
        assert.throws(() => acquire(active.job), code("BLENDER_PREPARATION_STALE")); assert.equal(current().composition.layers.length, 2);
      }
    });
    test("11 stale preparation rejects and only Blender metadata extensions are allowed", () => {
      const stale = prepare(), input = { projectId, shotId, expectedProjectRevision: repo.load(projectId).project.revision, requestedAt: now(), descriptor };
      repo.registerBlenderSource(input, key("same-source"), actor); assert.throws(() => acquire(stale), code("BLENDER_PREPARATION_STALE"));
      assert.equal(current().composition.layers.length, 2);
      const audit = repo.auditEditorialV2History(projectId, 64); assert.equal(audit.complete, true); assert.ok(audit.checkedCommits >= 10);
      const snapshot = repo.load(projectId), old = snapshot.assets[0], bytes = Buffer.from("unrelated asset"), hash = sha(bytes), stamp = now(), asset = { ...clone(old), assetId: "asset_unrelated_extension", contentHash: hash, createdAt: stamp, provenance: { ...clone(old.provenance), contentHash: hash, timestamp: stamp } };
      asset.sourcePath = resolveAssetPath(projectId, asset, "VIDEO", hash); repo.registerAsset(asset, bytes, key("unrelated"), actor, now());
      assert.throws(() => current(), code("EDITORIAL_V2_UNAVAILABLE"));
    });
    assert.deepEqual(networkAttempts, []); retain("result.json", { status: "PASS", results, namespace, evidence, networkAttempts, actualBlenderExecution: false, scope: "SYNTHETIC_CANONICAL_PERSISTENCE_NOT_MEDIA_ACCEPTANCE", sourceBindings: loader.loaded.map(name => ({ name, sha256: sha(fs.readFileSync(path.join(frontend, name))) })) });
    console.log(JSON.stringify({ status: "PASS", passed: results.length, failed: 0, evidence }));
  } catch (error) {
    retain("failure.json", { status: "FAIL", results, namespace, evidence, error: { message: error.message, code: error.code ?? null, stack: error.stack }, networkAttempts }); throw error;
  } finally { repo.close(); }
}
