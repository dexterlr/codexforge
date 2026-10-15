// Actual native editorial persistence, confined to fresh synthetic test namespaces.
// No provider, rendering, browser, production storage, deletion, migration or native rebuild.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const filename = fileURLToPath(import.meta.url), frontend = path.resolve(path.dirname(filename), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { openStudioRepository, StudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const { createStudioFootageLibrary, StudioFootageLibraryError } = loader.load("@/lib/codexforge/animation-studio/footage-library.server");
const { localFootageStorageBinding } = loader.load("@/lib/codexforge/animation-studio/footage-contract");
const { defaultLayerTransform, validateEditorialContent } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { resolveAssetPath } = loader.load("@/lib/codexforge/animation-studio/workspace");
const { serializeJarvisChatCanonicalJson: canonical } = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");
const sha = value => createHash("sha256").update(value).digest("hex"), clone = value => JSON.parse(JSON.stringify(value));
const ACTOR = "synthetic-editorial-persistence", safeEnv = { SystemRoot: "C:\\Windows", WINDIR: "C:\\Windows", PATH: `${path.dirname(process.execPath)};C:\\Windows\\System32` };
for (const method of ["reviewEditorial", "saveEditorial", "readEditorialMedia"]) assert.equal(typeof StudioRepository.prototype[method], "function", `${method} must be implemented before this suite is run.`);

if (process.argv[2] === "--restart" || process.argv[2] === "--race") {
  const namespace = process.argv[3], projectId = process.argv[4], repository = openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" });
  try {
    if (process.argv[2] === "--race") {
      try { const result = repository.saveEditorial(JSON.parse(process.argv[5]), process.argv[6], ACTOR); console.log(JSON.stringify({ status: "APPLIED", revision: result.editorial.revision, networkAttempts })); }
      catch (error) { console.log(JSON.stringify({ status: "REJECTED", code: error.code ?? null, message: error.message, networkAttempts })); }
    } else {
      const view = repository.reviewEditorial(projectId);
      const media = view.snapshot.assets.map(asset => { const result = repository.readEditorialMedia(projectId, asset.assetId, asset.version); return { assetId: asset.assetId, version: asset.version, contentType: result.contentType, sha256: sha(result.bytes) }; });
      console.log(JSON.stringify({ editorial: view.editorial, snapshotDigest: view.snapshot.recordDigest, mediaAvailability: view.mediaAvailability, media, networkAttempts }));
    }
  } finally { repository.close(); }
} else {
  const runId = randomUUID(), namespace = `editorial-${runId}`, startedAt = new Date().toISOString();
  const rootPath = path.join(frontend, ".codexforge", "studio-tests", namespace), rootSegments = [".codexforge", "studio-tests", namespace];
  const evidence = path.join(frontend, ".codexforge", "acceptance", `studio-editorial-persistence-tests-${runId}`);
  assert.equal(fs.existsSync(rootPath), false, "Namespace must be fresh."); fs.mkdirSync(evidence, { recursive: true });
  const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
  const sourceBindings = [...new Set([...loader.loaded, "scripts/animation-studio-test-loader.mjs", "scripts/test-animation-studio-editorial-persistence.mjs", "build/Release/codexforge_creator_filesystem.node"])].sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
  assert.equal(sourceBindings.find(item => item.path.endsWith(".node")).sha256, "848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4");
  retain("intent.json", { runId, namespace, startedAt, sourceBindings, scope: "Fresh synthetic native project/media/editorial data only. All fixtures and intentionally corrupted original bytes retained. Fault timing and drive outage are simulated; writes and CAS remain actual native." });
  let serial = 0;
  const now = () => new Date(Date.UTC(2026, 8, 19, 0, 0, serial++)).toISOString(), key = label => `${label}-${String(serial++).padStart(8, "0")}`;
  const open = (mediaStorage = "workspace") => openStudioRepository({ workspace: "test", namespace, mediaStorage });
  const rootFor = () => openCreatorNativeRoot(rootSegments, "persistent");
  const using = (operation, mediaStorage = "workspace") => { const repository = open(mediaStorage); try { return operation(repository); } finally { repository.close(); } };
  const provenance = () => ({ kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 });
  const ref = asset => ({ assetId: asset.assetId, version: asset.version });
  function box(type, payload) { const value = Buffer.alloc(8 + payload.length); value.writeUInt32BE(value.length); value.write(type, 4, "ascii"); payload.copy(value, 8); return value; }
  const video = fill => Buffer.concat([box("ftyp", Buffer.from("isom\0\0\0\0isom", "binary")), box("moov", Buffer.alloc(8)), box("mdat", Buffer.alloc(600_000, fill))]);
  // Fixed original synthetic PNG; unlike the MP4 framing fixture it is a complete tiny image.
  const imageBytes = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4f53hDgAHYgKzs+DUbgAAAABJRU5ErkJggg==", "base64");
  function create(repository, label) { const projectId = `project_editorial_${label}`; repository.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Synthetic editorial", description: "No source rendering or provider execution.", currency: "GBP", createdAt: now() }, key("create"), ACTOR); return projectId; }
  function importVideo(repository, projectId, bytes) { const state = repository.load(projectId); repository.importFootage({ projectId, shotId: state.shots[0].shotId, expectedProjectRevision: state.project.revision, expectedShotRevision: state.shots[0].revision, requestedAt: now(), originalName: "synthetic.mp4", sourceLabel: "Synthetic editorial test bytes", rights: { status: "UNKNOWN", license: null, evidence: null } }, bytes, key("import"), ACTOR); return repository.load(projectId).assets.at(-1); }
  function registerImage(repository, projectId) {
    const createdAt = now(), contentHash = sha(imageBytes), asset = { schemaVersion: 1, assetId: "asset_editorial_png", projectId, version: 1, sourcePath: "", contentHash, assetType: "IMAGE", approvalState: "DRAFT", provenance: { adapterMetadata: null, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: createdAt, cost: { currency: "GBP", minorUnits: 0 }, contentHash, parentAssets: [], jobId: null, approvalState: "DRAFT", rejectionReason: null }, dependencies: [], rights: { status: "OWNED", license: null, evidence: "Original fixed synthetic PNG fixture" }, createdAt, supersededBy: null, lineage: [] };
    asset.sourcePath = resolveAssetPath(projectId, asset, "IMAGE", contentHash); repository.registerAsset(asset, imageBytes, key("register-image"), ACTOR, now()); return asset;
  }
  function makeContent(state) {
    const projectId = state.project.projectId, shotId = state.shots[0].shotId, createdAt = now(), compositionId = `composition_${sha(canonical({ shotId })).slice(0, 24)}`, videos = state.assets.filter(asset => asset.assetType === "VIDEO"), png = state.assets.find(asset => asset.assetType === "IMAGE");
    const takes = videos.map((asset, index) => ({ schemaVersion: 1, takeId: `take_${index + 1}`, projectId, shotId, source: ref(asset), name: `Retained Take ${index + 1}`, createdAt, review: { state: "UNREVIEWED", note: "", reviewedAt: null } }));
    const layer = (asset, index, takeId) => ({ schemaVersion: 1, layerId: `layer_${index}`, compositionId, name: asset.assetType === "IMAGE" ? "Image overlay" : "Source video", type: asset.assetType, source: { kind: "ASSET", asset: ref(asset), takeId }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 2_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: defaultLayerTransform(), opacity: 1, keyframes: [], createdAt, updatedAt: createdAt, version: 1, approvalState: "DRAFT", provenance: provenance() });
    return { schemaVersion: 1, projectId, takes, selectedTakes: takes.length ? [{ shotId, takeId: takes[0].takeId }] : [], compositions: [{ schemaVersion: 1, compositionId, projectId, kind: "SHOT", shotId, name: "Two-layer shot", durationUs: 3_000_000, width: 640, height: 360, layers: [...(videos.length ? [layer(videos[0], "video", takes[0].takeId)] : []), ...(png ? [layer(png, "image", null)] : [])], revision: 1, approvalState: "DRAFT", provenance: provenance() }] };
  }
  function input(repository, projectId, content) { const view = repository.reviewEditorial(projectId); return { projectId, expectedRevision: view.editorial.revision, expectedProjectRevision: view.snapshot.project.revision, requestedAt: now(), content: content ?? clone(view.editorial.content) }; }
  function inventory(target) {
    if (!fs.existsSync(target)) return null; const result = [];
    function visit(relative) { assert.ok(result.length < 800); const full = path.resolve(target, relative), checked = path.relative(path.resolve(target), full); assert.ok(!checked.startsWith("..") && !path.isAbsolute(checked)); const stat = fs.lstatSync(full); assert.equal(stat.isSymbolicLink(), false); result.push({ path: relative, kind: stat.isDirectory() ? "directory" : "file", ...(stat.isFile() ? { bytes: stat.size, sha256: sha(fs.readFileSync(full)) } : {}), mtimeMs: stat.mtimeMs, birthtimeMs: stat.birthtimeMs }); if (stat.isDirectory()) for (const name of fs.readdirSync(full).sort()) visit(relative === "." ? name : `${relative}/${name}`); } visit("."); return result;
  }
  const manifestsPath = projectId => path.join(rootPath, "studio", "projects", projectId, "manifests"), aggregate = projectId => fs.readFileSync(path.join(manifestsPath(projectId), "project.json"));
  const recordInventory = projectId => inventory(path.join(manifestsPath(projectId), "editorial"));
  const headSegments = projectId => ["studio", "projects", projectId, "manifests", "editorial-head.json"];
  const recordSegments = (projectId, digest) => ["studio", "projects", projectId, "manifests", "editorial", `${digest}.json`];
  function savedRecord(projectId) { const headBytes = fs.readFileSync(path.join(rootPath, ...headSegments(projectId))), head = JSON.parse(headBytes); const bytes = fs.readFileSync(path.join(rootPath, ...recordSegments(projectId, head.recordDigest))); return { head, headBytes, bytes, record: JSON.parse(bytes) }; }
  function verifyRecord(projectId) {
    const { head, bytes, record } = savedRecord(projectId), { recordDigest, ...body } = record;
    assert.equal(recordDigest, head.recordDigest); assert.equal(sha(canonical(body)), recordDigest); assert.equal(canonical(record), bytes.toString("utf8")); assert.equal(record.projectId, projectId); assert.equal(record.events.length, record.revision); assert.equal(record.receipts.length, record.revision);
    let previous = null;
    record.events.forEach((event, index) => { const { eventHash, ...eventBody } = event; assert.equal(eventHash, sha(canonical(eventBody))); assert.equal(event.previousHash, previous); assert.equal(event.revision, index + 1); assert.equal(event.providerRequests, 0); assert.equal(event.generationAllowed, false); assert.equal(event.normalization, "SERVER_OWNED_VERSIONS_AND_TIMESTAMPS"); assert.equal(record.receipts[index].keyHash, event.keyHash); assert.equal(record.receipts[index].requestDigest, event.requestDigest); previous = eventHash; });
    assert.equal(record.events.at(-1).contentDigest, sha(canonical(record.content))); return record;
  }
  function emptyFixture(label) { let id, request; using(repository => { id = create(repository, label); request = input(repository, id); request.content.compositions[0].name = `Synthetic ${label}`; }); return { id, request }; }
  function replaceOwned(segments, replacement, label) {
    const root = rootFor(); try { const original = root.readFile(segments, 1_048_576); retain(`${label}-original.json`, { segments, originalBase64: original.toString("base64"), originalSha256: sha(original), replacementBase64: replacement.toString("base64"), replacementSha256: sha(replacement) }); root.writeAtomicReplace(segments, `editorial-corrupt-${randomUUID()}.tmp`, replacement, original, null, null); } finally { root.close(); }
  }
  function installCorruptRecord(projectId, mutate, label) {
    const stored = savedRecord(projectId), corrupt = clone(stored.record); mutate(corrupt); const { recordDigest: omitted, ...body } = corrupt; void omitted; corrupt.recordDigest = sha(canonical(body));
    const bytes = Buffer.from(canonical(corrupt)), headBytes = Buffer.from(canonical({ ...stored.head, recordDigest: corrupt.recordDigest }));
    retain(`${label}-original.json`, { headBase64: stored.headBytes.toString("base64"), recordBase64: stored.bytes.toString("base64"), originalHead: stored.head, corruptRecordDigest: corrupt.recordDigest });
    const root = rootFor(); try { root.writeAtomicExclusive(recordSegments(projectId, corrupt.recordDigest), `editorial-forged-${randomUUID()}.tmp`, bytes); root.writeAtomicReplace(headSegments(projectId), `editorial-forged-head-${randomUUID()}.tmp`, headBytes, stored.headBytes, null, null); } finally { root.close(); }
  }
  const counters = () => ({ nativeWrites: 0, mediaWrites: 0, footageWrites: 0, headCalls: 0, injected: 0, nativeErrorCode: null });
  function instrumented(observed, options = {}) {
    const native = rootFor(); let armed = true;
    const root = new Proxy(native, { get(target, property) {
      if (property === "readFile" && options.hideEditorialHeadRead) return (...args) => { if (args[0].at(-1) === "editorial-head.json") throw Object.assign(new Error("Simulated missing head read; original native file retained."), { code: "not_found" }); return target.readFile(...args); };
      if (property === "writeAtomicExclusive" || property === "writeAtomicReplace") return (...args) => {
        observed.nativeWrites++; if (!args[0].includes("manifests") && args[0].at(-1) !== "media-library.json") observed.mediaWrites++;
        if (args[0].at(-1) === "editorial-head.json") {
          observed.headCalls++;
          const fencePath = property === "writeAtomicReplace" ? args[4] : args[3], expectedFence = property === "writeAtomicReplace" ? args[5] : args[4];
          assert.deepEqual(fencePath, ["studio", "projects", options.projectId, "manifests", "project.json"], "Every editorial head publication must fence the canonical project aggregate.");
          assert.deepEqual(expectedFence, target.readFile(fencePath, 1_048_576));
          if (armed && (options.failBeforeHead || options.loseAcknowledgement || options.beforeHead)) {
            armed = false; observed.injected++;
            if (options.failBeforeHead) throw Object.assign(new Error("Simulated head publication I/O interruption."), { code: "synthetic_head_io" });
            if (options.beforeHead) options.beforeHead();
            try { const result = target[property](...args); if (options.loseAcknowledgement) throw Object.assign(new Error("Simulated lost acknowledgement after real native head CAS."), { code: "synthetic_head_lost_ack" }); return result; }
            catch (error) { observed.nativeErrorCode = error.code ?? null; throw error; }
          }
        }
        return target[property](...args);
      };
      const value = Reflect.get(target, property); return typeof value === "function" ? value.bind(target) : value;
    } });
    const library = createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: { workspace: "test", namespace }, importDestination: "workspace" });
    return new StudioRepository(root, { destination: () => library.destination(), write(...args) { observed.footageWrites++; return library.write(...args); }, read(...args) { if (options.offlineD && args[3] !== null) throw new StudioFootageLibraryError("FOOTAGE_LIBRARY_UNAVAILABLE"); return library.read(...args); }, close: () => library.close() });
  }
  const tests = [], results = []; const test = (name, run) => tests.push({ name, run });
  let projectId, firstAsset, secondAsset, pngAsset, baselineAggregate, baselineSources, firstInput, firstKey, firstView, latestView, dPath;

  test("C PNG plus imported C/D video versions remain immutable sources and empty editorial review writes nothing", () => {
    using(repository => { projectId = create(repository, "main"); firstAsset = importVideo(repository, projectId, video(11)); pngAsset = registerImage(repository, projectId); });
    using(repository => { secondAsset = importVideo(repository, projectId, video(22)); }, "d-drive");
    const binding = localFootageStorageBinding(secondAsset); dPath = path.join("D:/CodexForge/.codexforge/media-libraries", binding.libraryId);
    const beforeC = inventory(rootPath), beforeD = inventory(dPath);
    using(repository => { const view = repository.reviewEditorial(projectId); assert.equal(view.editorial.revision, 0); assert.equal(view.editorial.persisted, false); assert.deepEqual(view.editorial.content.takes, []); assert.equal(view.editorial.content.compositions.length, view.snapshot.shots.length); assert.ok(view.editorial.content.compositions.every(item => item.layers.length === 0)); assert.ok(view.mediaAvailability.every(item => item.status === "ONLINE")); baselineAggregate = aggregate(projectId); baselineSources = view.snapshot.assets.map(asset => ({ asset: canonical(asset), contentHash: asset.contentHash })); });
    assert.deepEqual(inventory(rootPath), beforeC); assert.deepEqual(inventory(dPath), beforeD); assert.equal(recordInventory(projectId), null);
  });

  test("First editorial save binds retained Takes and multiple source layers without any media or aggregate writes", () => {
    const observed = counters(), repository = instrumented(observed, { projectId });
    const beforeD = inventory(dPath);
    try {
      const state = repository.load(projectId), content = makeContent(state); validateEditorialContent(content, { projectId, shots: state.shots, assets: state.assets });
      for (const take of content.takes) take.createdAt = "2000-01-01T00:00:00.000Z";
      for (const layer of content.compositions[0].layers) { layer.createdAt = "2000-01-01T00:00:00.000Z"; layer.updatedAt = layer.createdAt; layer.version = 77; }
      content.compositions[0].revision = 88;
      firstInput = input(repository, projectId, content); firstKey = key("editorial-first"); firstView = repository.saveEditorial(firstInput, firstKey, ACTOR); latestView = firstView;
      assert.equal(firstView.editorial.revision, 1); assert.equal(firstView.editorial.persisted, true); assert.equal(firstView.editorial.content.takes.length, 2); assert.equal(firstView.editorial.content.compositions[0].layers.length, 2);
      assert.ok(firstView.editorial.content.takes.every(item => item.createdAt === firstInput.requestedAt)); assert.ok(firstView.editorial.content.compositions[0].layers.every(item => item.version === 1 && item.createdAt === firstInput.requestedAt && item.updatedAt === firstInput.requestedAt));
    } finally { repository.close(); }
    assert.equal(observed.headCalls, 1); assert.equal(observed.mediaWrites, 0); assert.equal(observed.footageWrites, 0); assert.deepEqual(aggregate(projectId), baselineAggregate); assert.deepEqual(inventory(dPath), beforeD);
    assert.equal(recordInventory(projectId).filter(item => item.kind === "file").length, 1); verifyRecord(projectId); retain("first-editorial-save.json", { counters: observed, editorial: firstView.editorial });
  });

  test("Layer order timing transform opacity enablement and Take preference/review persist while other Takes survive", () => {
    const observed = counters(), repository = instrumented(observed, { projectId });
    try {
      const changed = clone(latestView.editorial.content), previousTake = canonical(changed.takes[1]);
      const composition = changed.compositions[0], videoLayer = composition.layers[0], imageLayer = composition.layers[1];
      videoLayer.startUs = 100_000; videoLayer.durationUs = 1_500_000; videoLayer.sourceOffsetUs = 20_000; videoLayer.transform = { ...videoLayer.transform, x: 24, y: -13, scaleX: 0.8, scaleY: 1.2, rotationDeg: 15 }; videoLayer.opacity = 0.65;
      imageLayer.enabled = false; imageLayer.opacity = 0.4; composition.layers = [imageLayer, videoLayer];
      changed.selectedTakes[0].takeId = changed.takes[1].takeId; changed.takes[0].review = { state: "ACCEPTED", note: "Editorial preference only; no asset approval.", reviewedAt: now() };
      const save = input(repository, projectId, changed); latestView = repository.saveEditorial(save, key("editorial-edit"), ACTOR);
      const saved = latestView.editorial.content, savedComposition = saved.compositions[0];
      assert.equal(latestView.editorial.revision, 2); assert.deepEqual(savedComposition.layers.map(item => item.layerId), ["layer_image", "layer_video"]); assert.equal(savedComposition.layers[0].enabled, false); assert.equal(savedComposition.layers[1].opacity, 0.65); assert.deepEqual(savedComposition.layers[1].transform, videoLayer.transform); assert.equal(savedComposition.layers[1].startUs, 100_000); assert.equal(savedComposition.layers[1].sourceOffsetUs, 20_000);
      assert.equal(saved.selectedTakes[0].takeId, "take_2"); assert.equal(saved.takes[0].review.state, "ACCEPTED"); assert.equal(saved.takes[0].review.reviewedAt, save.requestedAt); assert.equal(canonical(saved.takes[1]), previousTake); assert.equal(savedComposition.revision, firstView.editorial.content.compositions[0].revision + 1); assert.equal(savedComposition.layers[0].version, 2); assert.equal(savedComposition.layers[1].version, 2);
      assert.equal(savedComposition.layers[1].createdAt, firstView.editorial.content.compositions[0].layers[0].createdAt); assert.equal(savedComposition.layers[1].updatedAt, save.requestedAt);
      assert.deepEqual(latestView.snapshot.assets.map(asset => ({ asset: canonical(asset), contentHash: asset.contentHash })), baselineSources); assert.equal(latestView.snapshot.jobs.length, 0); assert.equal(latestView.snapshot.costs.length, 0); assert.equal(latestView.snapshot.approvals.length, 0); assert.ok(latestView.snapshot.assets.every(asset => asset.approvalState === "DRAFT"));
    } finally { repository.close(); }
    assert.equal(observed.mediaWrites, 0); assert.equal(observed.footageWrites, 0); assert.deepEqual(aggregate(projectId), baselineAggregate); const record = verifyRecord(projectId); assert.equal(record.revision, 2); assert.equal(record.events[0].projectRecordDigest, record.events[1].projectRecordDigest);
  });

  test("Old exact receipt replay precedes revision checks and adds no head record timestamp or write", () => {
    const beforeC = inventory(rootPath), beforeD = inventory(dPath), observed = counters(), repository = instrumented(observed, { projectId });
    try { const replay = repository.saveEditorial(firstInput, firstKey, ACTOR); assert.equal(replay.editorial.revision, latestView.editorial.revision); assert.deepEqual(replay.editorial.content, latestView.editorial.content); assert.throws(() => repository.saveEditorial({ ...firstInput, content: { ...firstInput.content, selectedTakes: [] } }, firstKey, ACTOR)); }
    finally { repository.close(); }
    assert.equal(observed.nativeWrites, 0); assert.equal(observed.footageWrites, 0); assert.deepEqual(inventory(rootPath), beforeC); assert.deepEqual(inventory(dPath), beforeD);
  });

  test("New keys with stale editorial or project revisions are definite conflicts before any publication", () => {
    const beforeC = inventory(rootPath), beforeD = inventory(dPath), observed = counters(), repository = instrumented(observed, { projectId });
    try {
      const request = input(repository, projectId);
      for (const stale of [{ ...request, expectedRevision: 0 }, { ...request, expectedProjectRevision: request.expectedProjectRevision - 1 }]) assert.throws(() => repository.saveEditorial(stale, key("stale-revision"), ACTOR), error => error.code === "EDITORIAL_CONFLICT");
    } finally { repository.close(); }
    assert.equal(observed.nativeWrites, 0); assert.deepEqual(inventory(rootPath), beforeC); assert.deepEqual(inventory(dPath), beforeD);
  });

  test("Actual child-process restart restores saved instructions and verified C PNG/C video/D video bytes", () => {
    const child = spawnSync(process.execPath, [filename, "--restart", namespace, projectId], { cwd: frontend, env: safeEnv, encoding: "utf8", windowsHide: true, timeout: 30_000, maxBuffer: 1_048_576 });
    retain("restart.json", { status: child.status, stdout: child.stdout, stderr: child.stderr, error: child.error?.message ?? null }); assert.equal(child.status, 0, child.stderr || child.error?.message); const restored = JSON.parse(child.stdout);
    assert.deepEqual(restored.editorial, latestView.editorial); assert.deepEqual(restored.media.map(item => item.sha256).sort(), [sha(video(11)), sha(video(22)), sha(imageBytes)].sort()); assert.ok(restored.mediaAvailability.every(item => item.status === "ONLINE")); assert.deepEqual(restored.networkAttempts, []);
  });

  test("Simulated D outage preserves all instructions marks only affected D version offline and leaves C media readable", () => {
    const beforeC = inventory(rootPath), beforeD = inventory(dPath), observed = counters(), repository = instrumented(observed, { projectId, offlineD: true });
    try { const view = repository.reviewEditorial(projectId); assert.deepEqual(view.editorial, latestView.editorial); assert.deepEqual(view.mediaAvailability.filter(item => item.status === "OFFLINE").map(item => ref(item)), [ref(secondAsset)]); assert.throws(() => repository.load(projectId)); assert.deepEqual(repository.readEditorialMedia(projectId, pngAsset.assetId, 1).bytes, imageBytes); assert.deepEqual(repository.readEditorialMedia(projectId, firstAsset.assetId, 1).bytes, video(11)); assert.throws(() => repository.readEditorialMedia(projectId, secondAsset.assetId, 2)); }
    finally { repository.close(); }
    using(repository => assert.ok(repository.reviewEditorial(projectId).mediaAvailability.every(item => item.status === "ONLINE")));
    assert.equal(observed.nativeWrites, 0); assert.deepEqual(inventory(rootPath), beforeC); assert.deepEqual(inventory(dPath), beforeD); retain("simulated-d-outage.json", { simulated: true, realDriveUntouched: true, savedInstructionsPreserved: true, onlyDVersionOffline: true, unaffectedCMediaVerified: true, restoredReadVerifiedOnline: true });
  });

  test("Persisted Take source and composition ownership cannot be replaced or removed", () => {
    const beforeC = inventory(rootPath), beforeD = inventory(dPath), observed = counters(), repository = instrumented(observed, { projectId });
    try {
      for (const mutate of [content => content.takes.splice(0, 1), content => { content.takes[0].source = ref(secondAsset); content.compositions[0].layers.find(layer => layer.source.takeId === "take_1").source.asset = ref(secondAsset); }, content => content.compositions = [], content => { content.compositions[0].kind = "PRECOMP"; content.compositions[0].shotId = null; }]) {
        const changed = clone(latestView.editorial.content); mutate(changed); assert.throws(() => repository.saveEditorial(input(repository, projectId, changed), key("immutable-reject"), ACTOR));
      }
    } finally { repository.close(); }
    assert.equal(observed.nativeWrites, 0); assert.deepEqual(inventory(rootPath), beforeC); assert.deepEqual(inventory(dPath), beforeD);
  });

  test("Competing actual child-process saves commit one expected editorial revision and winner replay writes nothing", async () => {
    const fixture = emptyFixture("race"), requests = [clone(fixture.request), clone(fixture.request)], keys = [key("race-left"), key("race-right")]; requests[0].content.compositions[0].name = "Left edit"; requests[1].content.compositions[0].name = "Right edit";
    const child = index => new Promise((resolve, reject) => { const processHandle = spawn(process.execPath, [filename, "--race", namespace, fixture.id, JSON.stringify(requests[index]), keys[index]], { cwd: frontend, env: safeEnv, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] }); let stdout = "", stderr = ""; const timer = setTimeout(() => { processHandle.kill(); reject(new Error("Owned editorial race child timed out.")); }, 30_000); processHandle.stdout.on("data", chunk => stdout += chunk); processHandle.stderr.on("data", chunk => stderr += chunk); processHandle.on("error", reject); processHandle.on("close", code => { clearTimeout(timer); if (code !== 0 || stderr) reject(new Error(stderr || `Child exited ${code}`)); else resolve(JSON.parse(stdout)); }); });
    const outcomes = await Promise.all([child(0), child(1)]); retain("actual-native-race.json", { outcomes }); assert.equal(outcomes.filter(item => item.status === "APPLIED").length, 1); assert.ok(outcomes.every(item => item.networkAttempts.length === 0));
    const winner = outcomes.findIndex(item => item.status === "APPLIED"), before = inventory(manifestsPath(fixture.id)), observed = counters(), repository = instrumented(observed, { projectId: fixture.id });
    try { const replay = repository.saveEditorial(requests[winner], keys[winner], ACTOR); assert.equal(replay.editorial.revision, 1); assert.equal(replay.editorial.content.compositions[0].name, requests[winner].content.compositions[0].name); } finally { repository.close(); }
    assert.equal(observed.nativeWrites, 0); assert.deepEqual(inventory(manifestsPath(fixture.id)), before); verifyRecord(fixture.id);
  });

  test("Interruption after immutable editorial record before head leaves retained orphan and exact retry publishes once", () => {
    const fixture = emptyFixture("interruption"); using(repository => { repository.saveEditorial(fixture.request, key("interruption-seed"), ACTOR); fixture.request = input(repository, fixture.id); fixture.request.content.compositions[0].name = "Interrupted replacement"; });
    const operationKey = key("head-interrupt"), before = aggregate(fixture.id), oldHead = savedRecord(fixture.id).headBytes, observed = counters(), repository = instrumented(observed, { projectId: fixture.id, failBeforeHead: true });
    try { assert.throws(() => repository.saveEditorial(fixture.request, operationKey, ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.equal(repository.reviewEditorial(fixture.id).editorial.revision, 1); } finally { repository.close(); }
    assert.equal(observed.injected, 1); assert.deepEqual(savedRecord(fixture.id).headBytes, oldHead); assert.deepEqual(aggregate(fixture.id), before); const orphan = recordInventory(fixture.id); assert.equal(orphan.filter(item => item.kind === "file").length, 2);
    using(repository => { const recovered = repository.saveEditorial(fixture.request, operationKey, ACTOR); assert.equal(recovered.editorial.revision, 2); });
    assert.deepEqual(recordInventory(fixture.id).filter(item => item.kind === "file"), orphan.filter(item => item.kind === "file")); verifyRecord(fixture.id); retain("interrupted-head-recovery.json", { simulatedInterruption: true, actualNativeRecordAndRecovery: true, counters: observed, preservedOrphan: orphan, recoveredExactlyOnce: true });
  });

  test("Lost acknowledgement after actual native editorial head publication is resolved by write-free exact replay", () => {
    const fixture = emptyFixture("lost_ack"); using(repository => { repository.saveEditorial(fixture.request, key("acknowledgement-seed"), ACTOR); fixture.request = input(repository, fixture.id); fixture.request.content.compositions[0].name = "Committed replacement with lost acknowledgement"; });
    const operationKey = key("lost-ack"), observed = counters(), repository = instrumented(observed, { projectId: fixture.id, loseAcknowledgement: true });
    try { assert.throws(() => repository.saveEditorial(fixture.request, operationKey, ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.equal(repository.reviewEditorial(fixture.id).editorial.revision, 2); } finally { repository.close(); }
    assert.equal(observed.injected, 1); const before = inventory(manifestsPath(fixture.id)), replayObserved = counters(), replay = instrumented(replayObserved, { projectId: fixture.id });
    try { assert.equal(replay.saveEditorial(fixture.request, operationKey, ACTOR).editorial.revision, 2); } finally { replay.close(); }
    assert.equal(replayObserved.nativeWrites, 0); assert.deepEqual(inventory(manifestsPath(fixture.id)), before); verifyRecord(fixture.id); retain("lost-head-acknowledgement.json", { simulatedAcknowledgementLoss: true, actualNativeHeadCommit: true, counters: observed, replayCounters: replayObserved, bytesAndTimestampsUnchangedByReplay: true });
  });

  test("Missing first head blocks reads and different requests; only exact original first publication recovers", () => {
    const fixture = emptyFixture("first_head_interrupted"), operationKey = key("first-head-original"), observed = counters(), repository = instrumented(observed, { projectId: fixture.id, failBeforeHead: true });
    try { assert.throws(() => repository.saveEditorial(fixture.request, operationKey, ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"); } finally { repository.close(); }
    const before = inventory(manifestsPath(fixture.id)), records = recordInventory(fixture.id), rejected = counters(), rejector = instrumented(rejected, { projectId: fixture.id });
    assert.equal(records.filter(item => item.kind === "file").length, 1); assert.equal(fs.existsSync(path.join(rootPath, ...headSegments(fixture.id))), false);
    try {
      assert.throws(() => rejector.saveEditorial(fixture.request, key("disconnected-new-key"), ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE");
      const changed = clone(fixture.request); changed.content.compositions[0].name = "Not the original request";
      assert.throws(() => rejector.saveEditorial(changed, operationKey, ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE");
    } finally { rejector.close(); }
    assert.equal(rejected.nativeWrites, 0); assert.deepEqual(inventory(manifestsPath(fixture.id)), before);
    const recoveryCounters = counters(), recovery = instrumented(recoveryCounters, { projectId: fixture.id });
    try { assert.equal(recovery.saveEditorial(fixture.request, operationKey, ACTOR).editorial.revision, 1); } finally { recovery.close(); }
    assert.equal(recoveryCounters.nativeWrites, 1); assert.equal(recoveryCounters.headCalls, 1); assert.deepEqual(recordInventory(fixture.id), records); verifyRecord(fixture.id);
    retain("missing-first-head-exact-recovery.json", { failureCounters: observed, rejectionCounters: rejected, recoveryCounters, immutableRecordInventory: records, exactFirstRequestRecovered: true, disconnectedNewRequestsRejectedWithoutWrites: true });
  });

  test("Sole committed first head can be recovered only by its original request while original head evidence is retained", () => {
    const fixture = emptyFixture("sole_head_lost"), operationKey = key("sole-head-original"); using(repository => repository.saveEditorial(fixture.request, operationKey, ACTOR));
    const stored = savedRecord(fixture.id), source = headSegments(fixture.id), retained = [...source.slice(0, -1), `editorial-head-preserved-${randomUUID()}.json`];
    const root = rootFor(); try { assert.equal(root.stat(source), "file"); root.renameExclusive(source, retained); assert.deepEqual(root.readFile(retained, 4096), stored.headBytes); } finally { root.close(); }
    const records = recordInventory(fixture.id); using(repository => { assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.throws(() => repository.saveEditorial(fixture.request, key("sole-head-wrong-key"), ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.equal(repository.saveEditorial(fixture.request, operationKey, ACTOR).editorial.revision, 1); });
    assert.deepEqual(savedRecord(fixture.id).headBytes, stored.headBytes); assert.deepEqual(recordInventory(fixture.id), records); assert.deepEqual(fs.readFileSync(path.join(rootPath, ...retained)), stored.headBytes);
    retain("sole-head-loss-preserved-evidence.json", { originalPath: path.join(rootPath, ...source), retainedOriginalPath: path.join(rootPath, ...retained), originalSha256: sha(stored.headBytes), originalRecordDigest: stored.head.recordDigest, restoredOnlyExactOriginal: true, deletedFiles: 0 });
  });

  test("Missing head with multiple retained revisions cannot rewind or accept a disconnected new save", () => {
    const fixture = emptyFixture("head_lost_multiple"), firstKey = key("multiple-first");
    using(repository => { repository.saveEditorial(fixture.request, firstKey, ACTOR); const next = input(repository, fixture.id); next.content.compositions[0].name = "Second revision must not rewind"; repository.saveEditorial(next, key("multiple-second"), ACTOR); });
    const before = inventory(manifestsPath(fixture.id)), observed = counters(), repository = instrumented(observed, { projectId: fixture.id, hideEditorialHeadRead: true });
    try { assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.throws(() => repository.saveEditorial(fixture.request, firstKey, ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.throws(() => repository.saveEditorial(fixture.request, key("multiple-new-key"), ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); } finally { repository.close(); }
    assert.equal(observed.nativeWrites, 0); assert.deepEqual(inventory(manifestsPath(fixture.id)), before); assert.equal(savedRecord(fixture.id).record.revision, 2);
    retain("multiple-record-head-loss.json", { simulatedMissingRead: true, actualHeadPreserved: true, counters: observed, noHistoryRewind: true });
  });

  test("Empty editorial directory and corrupt sole first record fail closed without new publications", () => {
    for (const mode of ["empty", "corrupt"]) {
      const fixture = emptyFixture(`head_evidence_${mode}`), operationKey = key(`head-${mode}`);
      if (mode === "empty") { const root = rootFor(); try { root.ensureDirectory([...headSegments(fixture.id).slice(0, -1), "editorial"]); } finally { root.close(); } }
      else {
        const observed = counters(), repository = instrumented(observed, { projectId: fixture.id, failBeforeHead: true });
        try { assert.throws(() => repository.saveEditorial(fixture.request, operationKey, ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); } finally { repository.close(); }
        const entry = recordInventory(fixture.id).find(item => item.kind === "file"); replaceOwned([...headSegments(fixture.id).slice(0, -1), "editorial", entry.path], Buffer.from("{}"), "corrupt-sole-first-record");
      }
      const before = inventory(manifestsPath(fixture.id)), rejected = counters(), repository = instrumented(rejected, { projectId: fixture.id });
      try { assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.throws(() => repository.saveEditorial(fixture.request, operationKey, ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); } finally { repository.close(); }
      assert.equal(rejected.nativeWrites, 0); assert.deepEqual(inventory(manifestsPath(fixture.id)), before);
    }
  });

  test("Actual native project fence rejects a project revision changed immediately before editorial head publication", () => {
    const fixture = emptyFixture("project_fence"), observed = counters(), beforeHead = () => using(repository => { const snapshot = repository.load(fixture.id); repository.reviseProject(fixture.id, snapshot.project.revision, "Competing synthetic title", snapshot.project.description, key("project-change"), ACTOR, now()); });
    const repository = instrumented(observed, { projectId: fixture.id, beforeHead });
    try { assert.throws(() => repository.saveEditorial(fixture.request, key("fenced-save"), ACTOR), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"); assert.equal(repository.load(fixture.id).project.revision, 2); } finally { repository.close(); }
    assert.equal(observed.nativeErrorCode, "fence_mismatch"); assert.equal(fs.existsSync(path.join(rootPath, ...headSegments(fixture.id))), false); assert.equal(recordInventory(fixture.id).filter(item => item.kind === "file").length, 1); retain("actual-native-project-fence.json", { simulatedInterleaving: true, actualNativeProjectMutation: true, actualNativeFenceMismatch: true, counters: observed, retainedOrphan: recordInventory(fixture.id) });
  });

  test("Current editorial record corruption fails closed while original bytes are retained", () => {
    const fixture = emptyFixture("corrupt_record"); using(repository => repository.saveEditorial(fixture.request, key("corrupt-seed"), ACTOR)); const stored = savedRecord(fixture.id), corrupt = clone(stored.record); corrupt.content.compositions[0].name = "Tampered without digest";
    replaceOwned(recordSegments(fixture.id, stored.head.recordDigest), Buffer.from(canonical(corrupt)), "current-record-corruption"); using(repository => assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"));
  });

  test("Digest-consistent forged event and receipt records fail internal audit-chain checks", () => {
    for (const [label, mutate] of [["bad_event", record => { record.events[0].actor = "Tampered event actor"; }], ["bad_receipt", record => { record.receipts[0].requestDigest = "0".repeat(64); }], ["generation_claim", record => { record.events[0].providerRequests = 1; const { eventHash, ...body } = record.events[0]; void eventHash; record.events[0].eventHash = sha(canonical(body)); }]]) {
      const fixture = emptyFixture(label); using(repository => repository.saveEditorial(fixture.request, key("audit-seed"), ACTOR)); installCorruptRecord(fixture.id, mutate, label); using(repository => assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"));
    }
  });

  test("Noncanonical duplicate-key editorial head fails closed without falling back to empty instructions", () => {
    const fixture = emptyFixture("corrupt_head"); using(repository => repository.saveEditorial(fixture.request, key("head-seed"), ACTOR)); const head = savedRecord(fixture.id).head;
    replaceOwned(headSegments(fixture.id), Buffer.from(`{"format":"studio-editorial-head-v1","format":"studio-editorial-head-v1","projectId":"${fixture.id}","revision":1,"recordDigest":"${head.recordDigest}"}`), "duplicate-head-corruption"); using(repository => assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"));
  });

  test("Corruption of a retained historical editorial record is rejected even when the current record is intact", () => {
    const fixture = emptyFixture("historical_corruption"); using(repository => { repository.saveEditorial(fixture.request, key("history-first"), ACTOR); const next = input(repository, fixture.id); next.content.compositions[0].name = "Second intact content"; repository.saveEditorial(next, key("history-second"), ACTOR); });
    const stored = savedRecord(fixture.id), oldSegments = recordSegments(fixture.id, stored.record.previousRecordDigest), historicalBytes = fs.readFileSync(path.join(rootPath, ...oldSegments)), corrupt = JSON.parse(historicalBytes); corrupt.content.compositions[0].name = "Tampered retained history";
    replaceOwned(oldSegments, Buffer.from(canonical(corrupt)), "historical-record-corruption"); using(repository => assert.throws(() => repository.reviewEditorial(fixture.id), error => error.code === "EDITORIAL_UNAVAILABLE"));
  });
  for (const item of tests) { try { await item.run(); results.push({ name: item.name, status: "PASS" }); } catch (error) { results.push({ name: item.name, status: "FAIL", error: { name: error.name, code: error.code ?? null, message: error.message, stack: error.stack } }); break; } }
  const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256), status = results.length === tests.length && results.every(item => item.status === "PASS") && networkAttempts.length === 0 && sourceUnchanged ? "PASS" : "FAIL";
  retain("result.json", { status, runId, namespace, startedAt, finishedAt: new Date().toISOString(), sourceBindings, sourceUnchanged, tests: results, planned: tests.length, passed: results.filter(item => item.status === "PASS").length, networkAttempts, nativeExecution: true, nativeRebuilt: false, actualProviderExecutions: 0, actualRenderExecutions: 0, actualBrowserExecutions: 0, productionMutations: 0, deletions: 0, allTestDataRetained: true });
  console.log(JSON.stringify({ status, planned: tests.length, completed: results.length, passed: results.filter(item => item.status === "PASS").length, failures: results.filter(item => item.status === "FAIL"), sourceUnchanged, evidence, providerRequests: 0 })); if (status !== "PASS") process.exitCode = 1;
}
