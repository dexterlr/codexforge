// Dedicated native persistent-history coverage. Only fresh synthetic C namespaces
// and fresh acceptance evidence are written. No D, network, provider, browser,
// production source, historical fixture, package metadata, or native build changes.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const filename = fileURLToPath(import.meta.url), frontend = path.resolve(path.dirname(filename), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { openStudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const {
  migrateStudioEditorialV2: migrate,
  readStudioEditorialV2Composition: read,
  editStudioEditorialV2Layer: edit,
  editStudioEditorialV2CompositionDuration: editDuration,
  navigateStudioEditorialV2History: navigate,
  auditStudioEditorialV2History: audit,
} = loader.load("@/lib/codexforge/animation-studio/editorial-v2-store.server");
const { editorialV2Index } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-index.server");
const { defaultLayerTransform, validateEditorialContent } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { editorialAddTime, editorialSubtractTime } = loader.load("@/lib/codexforge/animation-studio/editorial-time");
const { resolveAssetPath } = loader.load("@/lib/codexforge/animation-studio/workspace");
const { serializeJarvisChatCanonicalJson: canonical } = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");

const sha = value => createHash("sha256").update(value).digest("hex");
const bytes = value => Buffer.from(canonical(value));
const clone = value => JSON.parse(JSON.stringify(value));
const ACTOR = "synthetic-editorial-v2-history";
const NATIVE_SHA = "848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4";
const safeEnv = { SystemRoot: "C:\\Windows", WINDIR: "C:\\Windows", PATH: `${path.dirname(process.execPath)};C:\\Windows\\System32` };
const base = id => ["studio", "projects", id, "manifests"];
const v2 = id => [...base(id), "editorial-v2"];
const headPath = id => [...v2(id), "head.json"];
const objectPath = (id, hash) => [...v2(id), "objects", hash + ".json"];
const commitPath = (id, hash) => [...v2(id), "commits", hash + ".json"];
const errorCode = code => error => error?.code === code;
const unavailable = errorCode("EDITORIAL_V2_UNAVAILABLE");
const conflict = errorCode("EDITORIAL_V2_CONFLICT");
const historyBoundary = errorCode("EDITORIAL_V2_HISTORY_BOUNDARY");
const durationConflict = errorCode("EDITORIAL_V2_DURATION_CONFLICT");

function observedRoot(native, options = {}) {
  const observed = { reads: [], writes: [], statCalls: [], listCalls: [], injected: [], nativeErrors: [] };
  let armed = true;
  const root = new Proxy(native, { get(target, method) {
    if (method === "stat" || method === "listDirectory") return (...args) => {
      observed[method === "stat" ? "statCalls" : "listCalls"].push(args[0].join("/"));
      return target[method](...args);
    };
    if (method === "readFile") return (...args) => {
      const name = args[0].join("/"), actual = target.readFile(...args), entry = { path: name, bytes: actual.length, sha256: sha(actual) };
      try {
        const parsed = JSON.parse(actual); entry.format = parsed.format ?? null;
        if (parsed.format === "studio-editorial-entity-v2") { entry.kind = parsed.kind; entry.entityId = parsed.entityId; }
      } catch { /* Binary and non-JSON source bytes remain opaque. */ }
      observed.reads.push(entry); return actual;
    };
    if (method === "writeAtomicExclusive" || method === "writeAtomicReplace") return (...args) => {
      const entry = { method, path: args[0].join("/"), bytes: args[2].length, sha256: sha(args[2]), succeeded: false };
      try {
        const parsed = JSON.parse(args[2]); entry.format = parsed.format ?? null;
        if (parsed.format === "studio-editorial-entity-v2") { entry.kind = parsed.kind; entry.entityId = parsed.entityId; }
      } catch { /* Native bytes are not modified by observation. */ }
      observed.writes.push(entry);
      const isHead = args[0].at(-1) === "head.json" && args[0].includes("editorial-v2");
      if (isHead) {
        const fenceIndex = method === "writeAtomicReplace" ? 4 : 3;
        assert.deepEqual(args[fenceIndex], [...base(options.id), "project.json"]);
        assert.equal(Buffer.isBuffer(args[fenceIndex + 1]), true);
      }
      if (isHead && armed && (options.beforeHead || options.failBeforeHead)) {
        armed = false; observed.injected.push(options.failBeforeHead ? "before-head-io" : "head-interleaving");
        if (options.failBeforeHead) throw Object.assign(new Error("Simulated pre-head history interruption."), { code: "synthetic_head_io" });
        options.beforeHead(args, target);
      }
      try { const result = target[method](...args); entry.succeeded = true; return result; }
      catch (error) { observed.nativeErrors.push(error.code ?? null); throw error; }
    };
    const value = Reflect.get(target, method); return typeof value === "function" ? value.bind(target) : value;
  } });
  return { root, observed };
}

if (process.argv[2] === "--race") {
  const [namespace, id, requestJson, operationKey, gate] = process.argv.slice(3);
  const repository = openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" });
  let snapshot; try { snapshot = repository.load(id); } finally { repository.close(); }
  const native = openCreatorNativeRoot([".codexforge", "studio-tests", namespace], "persistent");
  const wrapped = observedRoot(native, { id, beforeHead() {
    process.send({ ready: true });
    const until = Date.now() + 25_000, wait = new Int32Array(new SharedArrayBuffer(4));
    while (!fs.existsSync(gate)) {
      if (Date.now() > until) throw new Error("Owned history race gate timed out.");
      Atomics.wait(wait, 0, 0, 20);
    }
  } });
  try {
    const result = navigate(wrapped.root, snapshot, JSON.parse(requestJson), operationKey, ACTOR);
    console.log(JSON.stringify({ status: "APPLIED", result, observed: wrapped.observed, networkAttempts }));
  } catch (error) {
    console.log(JSON.stringify({ status: "REJECTED", code: error.code ?? null, message: error.message, observed: wrapped.observed, networkAttempts }));
  } finally { native.close(); process.disconnect(); }
} else {
  const runId = randomUUID(), namespace = `editorial-v2-history-${runId}`, startedAt = new Date().toISOString();
  const rootSegments = [".codexforge", "studio-tests", namespace], rootPath = path.join(frontend, ...rootSegments);
  const acceptance = path.join(frontend, ".codexforge", "acceptance");
  assert.equal(fs.statSync(acceptance).isDirectory(), true); assert.equal(fs.existsSync(rootPath), false);
  const evidence = path.join(acceptance, `studio-editorial-v2-history-tests-${runId}`); fs.mkdirSync(evidence);
  const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
  const sourceBindings = [...new Set([
    ...loader.loaded,
    "scripts/animation-studio-test-loader.mjs",
    "scripts/test-animation-studio-editorial-v2-history.mjs",
    "build/Release/codexforge_creator_filesystem.node",
  ])].sort().map(name => ({ path: name, bytes: fs.statSync(path.join(frontend, name)).size, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
  assert.equal(sourceBindings.find(item => item.path.endsWith(".node")).sha256, NATIVE_SHA);
  retain("intent.json", {
    runId, namespace, startedAt, sourceBindings,
    scope: "Dedicated actual-native persistent editorial history in a fresh synthetic C-only namespace. Network is blocked. No build, old fixture, production source, package metadata, D-drive, provider, or browser mutation.",
  });

  let serial = 0;
  const now = () => new Date(Date.UTC(2026, 8, 26, 0, 0, serial++)).toISOString();
  const key = label => `${label}-${String(serial++).padStart(8, "0")}`;
  const nativeFor = () => openCreatorNativeRoot(rootSegments, "persistent");
  const using = run => { const repository = openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" }); try { return run(repository); } finally { repository.close(); } };
  const withNative = run => { const native = nativeFor(); try { return run(native); } finally { native.close(); } };
  const instrument = (fixtureValue, options, run) => withNative(native => {
    const wrapped = observedRoot(native, { id: fixtureValue.id, ...options });
    const result = run(wrapped.root, wrapped.observed); return { result, observed: wrapped.observed };
  });
  const provenance = () => ({ kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 });
  const mp4Box = (type, payload) => { const value = Buffer.alloc(8 + payload.length); value.writeUInt32BE(value.length); value.write(type, 4, "ascii"); payload.copy(value, 8); return value; };
  const mp4 = Buffer.concat([
    mp4Box("ftyp", Buffer.from("isom\0\0\0\0isom", "binary")),
    mp4Box("moov", Buffer.alloc(8)),
    mp4Box("mdat", Buffer.from("synthetic persistent history source")),
  ]);

  function inventory(target, excludeV2 = false) {
    if (!fs.existsSync(target)) return [];
    const entries = [];
    function visit(relative) {
      assert.ok(entries.length < 20_000);
      const full = path.join(target, relative), stat = fs.lstatSync(full); assert.equal(stat.isSymbolicLink(), false);
      if (stat.isDirectory()) {
        for (const name of fs.readdirSync(full).sort()) if (!(excludeV2 && name === "editorial-v2")) visit(path.join(relative, name));
      } else {
        assert.equal(stat.isFile(), true);
        entries.push({ path: relative.split(path.sep).join("/"), bytes: stat.size, sha256: sha(fs.readFileSync(full)), mtimeMs: stat.mtimeMs, birthtimeMs: stat.birthtimeMs });
      }
    }
    visit(""); return entries;
  }
  const projectFiles = fixtureValue => inventory(path.join(rootPath, "studio", "projects", fixtureValue.id), true);
  const v2Files = fixtureValue => inventory(path.join(rootPath, ...v2(fixtureValue.id)));
  const immutableV2Files = fixtureValue => v2Files(fixtureValue).filter(item => item.path !== "head.json");
  const head = fixtureValue => JSON.parse(fs.readFileSync(path.join(rootPath, ...headPath(fixtureValue.id))));
  const commit = (fixtureValue, hash) => JSON.parse(fs.readFileSync(path.join(rootPath, ...commitPath(fixtureValue.id, hash))));
  const commitFiles = fixtureValue => immutableV2Files(fixtureValue).filter(item => item.path.startsWith("commits/"));
  function assertAppendOnly(before, after) {
    const currentFiles = new Map(after.map(item => [item.path, item]));
    for (const item of before) assert.deepEqual(currentFiles.get(item.path), item, `Immutable history file changed or disappeared: ${item.path}`);
  }
  function entityIndex(fixtureValue, native) {
    const io = {
      read(hash) { return JSON.parse(native.readFile(objectPath(fixtureValue.id, hash), 1_048_576)); },
      stage() { throw new Error("Read-only entity lookup cannot stage."); },
    };
    return editorialV2Index(io, { projectId: fixtureValue.id, namespace: "entities" });
  }
  function entityRecord(fixtureValue, savedHead, keyName) {
    return withNative(native => {
      const hash = entityIndex(fixtureValue, native).get(savedHead.entityRoot, keyName); assert.match(hash, /^[a-f0-9]{64}$/u);
      const data = native.readFile(objectPath(fixtureValue.id, hash), 1_048_576); assert.equal(sha(data), hash);
      return { hash, record: JSON.parse(data) };
    });
  }
  function journalChain(fixtureValue) {
    const chain = []; let cursor = head(fixtureValue);
    while (cursor) {
      const savedCommit = commit(fixtureValue, cursor.journalTip); chain.push({ head: cursor, commit: savedCommit });
      if (savedCommit.previousHeadHash === null) break;
      const data = fs.readFileSync(path.join(rootPath, ...objectPath(fixtureValue.id, savedCommit.previousHeadHash)));
      assert.equal(sha(data), savedCommit.previousHeadHash); cursor = JSON.parse(data);
    }
    return chain.reverse();
  }

  function fixture(label) {
    let fixtureValue;
    using(repository => {
      const id = `project_v2_history_${label}`;
      repository.createDraftProject({ schemaVersion: 1, projectId: id, revision: 1, title: "Synthetic persistent editor history", description: "No provider or source rendering.", currency: "GBP", createdAt: now() }, key("project"), ACTOR);
      const createdAt = now(), contentHash = sha(mp4), asset = { schemaVersion: 1, assetId: `asset_v2_history_${label}`, projectId: id, version: 1, sourcePath: "", contentHash, assetType: "VIDEO", approvalState: "DRAFT", provenance: { adapterMetadata: null, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: createdAt, cost: { currency: "GBP", minorUnits: 0 }, contentHash, parentAssets: [], jobId: null, approvalState: "DRAFT", rejectionReason: null }, dependencies: [], rights: { status: "OWNED", license: null, evidence: "Fixed synthetic MP4 framing" }, createdAt, supersededBy: null, lineage: [] };
      asset.sourcePath = resolveAssetPath(id, asset, "VIDEO", contentHash);
      repository.registerAsset(asset, mp4, key("video"), ACTOR, now());
      const snapshot = repository.load(id), initial = repository.reviewEditorial(id).editorial.content, shotId = snapshot.shots[0].shotId;
      const mainId = initial.compositions[0].compositionId, preA = `composition_history_${label}_a`, preB = `composition_history_${label}_b`, stamp = now();
      const primaryTakeId = `take_history_${label}_primary`, unusedTakeId = `take_history_${label}_unused`;
      const take = (takeId, name) => ({ schemaVersion: 1, takeId, projectId: id, shotId, source: { assetId: asset.assetId, version: 1 }, name, createdAt: stamp, review: { state: "UNREVIEWED", note: "", reviewedAt: null } });
      const primaryTake = take(primaryTakeId, "Referenced retained VIDEO Take"), unusedTake = take(unusedTakeId, "Actual unused retained VIDEO Take");
      const layer = (compositionId, layerId, source = { kind: "ASSET", asset: { assetId: asset.assetId, version: 1 }, takeId: primaryTakeId }) => ({ schemaVersion: 1, layerId, compositionId, name: layerId, type: source.kind === "ASSET" ? "VIDEO" : "NESTED_COMPOSITION", source, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 2_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: defaultLayerTransform(), opacity: 0.625, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: "DRAFT", provenance: provenance() });
      const composition = (compositionId, kind, layers) => ({ schemaVersion: 1, compositionId, projectId: id, kind, shotId: kind === "SHOT" ? shotId : null, name: compositionId, durationUs: 3_000_000, width: 640, height: 360, layers, revision: 1, approvalState: "DRAFT", provenance: provenance() });
      const mainLayers = [
        layer(mainId, "layer_history_main"),
        { ...layer(mainId, "layer_history_nested", { kind: "COMPOSITION", compositionId: preA }), durationUs: 1_000_000 },
      ];
      const content = {
        schemaVersion: 1, projectId: id, takes: [primaryTake, unusedTake], selectedTakes: [{ shotId, takeId: primaryTakeId }],
        compositions: [composition(mainId, "SHOT", mainLayers), composition(preA, "PRECOMP", [layer(preA, `layer_history_${label}_a`)]), composition(preB, "PRECOMP", [layer(preB, `layer_history_${label}_b`)])],
      };
      validateEditorialContent(content, { projectId: id, shots: snapshot.shots, assets: snapshot.assets });
      repository.saveEditorial({ projectId: id, expectedRevision: 0, expectedProjectRevision: snapshot.project.revision, requestedAt: now(), content }, key("legacy-first"), ACTOR);
      const second = repository.reviewEditorial(id); second.editorial.content.compositions[2].name = "Unrelated retained precomposition";
      repository.saveEditorial({ projectId: id, expectedRevision: 1, expectedProjectRevision: snapshot.project.revision, requestedAt: now(), content: second.editorial.content }, key("legacy-second"), ACTOR);
      const view = repository.reviewEditorial(id);
      const persistedPrimaryTake = view.editorial.content.takes.find(item => item.takeId === primaryTakeId), persistedUnusedTake = view.editorial.content.takes.find(item => item.takeId === unusedTakeId);
      assert.ok(persistedPrimaryTake); assert.ok(persistedUnusedTake);
      fixtureValue = { id, snapshot: view.snapshot, legacy: view.editorial, mainId, preA, preB, asset, primaryTake: persistedPrimaryTake, unusedTake: persistedUnusedTake, primaryTakeId, unusedTakeId, media: mp4, migration: { operation: "COPY_V1_TO_V2", projectId: id, expectedProjectRevision: snapshot.project.revision, expectedEditorialRevision: 2, requestedAt: now() }, migrationKey: key("migration") };
    });
    fixtureValue.baseline = projectFiles(fixtureValue);
    fixtureValue.migrated = instrument(fixtureValue, {}, root => migrate(root, fixtureValue.snapshot, fixtureValue.migration, fixtureValue.migrationKey, ACTOR));
    assert.equal(fixtureValue.migrated.result.revision, 1); assert.equal(fixtureValue.migrated.result.providerRequests, 0); assert.equal(fixtureValue.migrated.result.generationAllowed, false);
    return fixtureValue;
  }

  const current = fixtureValue => withNative(root => read(root, fixtureValue.snapshot, fixtureValue.mainId));
  function splitInput(fixtureValue, layerId, splitPoint) {
    const view = current(fixtureValue); return { operation: "SPLIT_LAYER_TIME", projectId: fixtureValue.id, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: fixtureValue.mainId, layerId, requestedAt: now(), splitPoint };
  }
  function trimInput(fixtureValue, layerId, edge, trimPoint) {
    const view = current(fixtureValue); return { operation: "TRIM_LAYER_TIME", projectId: fixtureValue.id, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: fixtureValue.mainId, layerId, requestedAt: now(), edge, trimPoint };
  }
  function moveInput(fixtureValue, layerId, start) {
    const view = current(fixtureValue); return { operation: "MOVE_LAYER_TIME", projectId: fixtureValue.id, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: fixtureValue.mainId, layerId, requestedAt: now(), start };
  }
  function durationInput(fixtureValue, duration) {
    const view = current(fixtureValue); return { operation: "SET_COMPOSITION_DURATION", projectId: fixtureValue.id, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: fixtureValue.mainId, requestedAt: now(), duration };
  }
  function navigationInput(fixtureValue, operation) {
    const view = current(fixtureValue); return { operation, projectId: fixtureValue.id, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, compositionId: fixtureValue.mainId, expectedCompositionRevision: view.composition.revision, requestedAt: now() };
  }

  const beginning = "You are at the beginning of the supported persistent editor history.";
  const end = "You are at the end of the active persistent editor history.";
  const legacyDescription = "This working copy is at its persistent-history boundary. Older edits predate trustworthy operator history and cannot be reconstructed.";
  const unavailableAction = (command, description) => ({ available: false, command, label: command === "UNDO_EDITORIAL_EDIT" ? "Undo" : "Redo", description, targetOperation: null, compositionId: null, compositionRevision: null });
  const operationNoun = operation => operation === "MOVE_LAYER_TIME" ? "move" : operation === "TRIM_LAYER_TIME" ? "trim" : operation === "SPLIT_LAYER_TIME" ? "split" : operation === "SET_COMPOSITION_DURATION" ? "duration change" : "property change";
  const availableAction = (command, operation, compositionId, compositionRevision) => {
    const action = command === "UNDO_EDITORIAL_EDIT" ? "Undo" : "Redo", noun = operationNoun(operation);
    return { available: true, command, label: `${action} ${noun}`, description: `${action} ${noun} in ${compositionId} by restoring the exact saved composition content with a new monotonic working-copy revision.`, targetOperation: operation, compositionId, compositionRevision };
  };
  const activeHistory = (fixtureValue, undo, redo) => ({
    state: "ACTIVE",
    undo: undo ? availableAction("UNDO_EDITORIAL_EDIT", undo.operation, fixtureValue.mainId, undo.revision) : unavailableAction("UNDO_EDITORIAL_EDIT", beginning),
    redo: redo ? availableAction("REDO_EDITORIAL_EDIT", redo.operation, fixtureValue.mainId, redo.revision) : unavailableAction("REDO_EDITORIAL_EDIT", end),
  });
  const legacyHistory = { state: "LEGACY_BOUNDARY", undo: unavailableAction("UNDO_EDITORIAL_EDIT", legacyDescription), redo: unavailableAction("REDO_EDITORIAL_EDIT", legacyDescription) };
  const assertLocked = value => { assert.equal(value.providerRequests, 0); assert.equal(value.generationAllowed, false); };
  const compositionContent = value => { const { revision: _revision, ...content } = value; void _revision; return content; };
  const assertSameCompositionContent = (actual, expected) => assert.deepEqual(compositionContent(actual), compositionContent(expected));

  function applyEdit(fixtureValue, input, operationKey, expectedRevision) {
    const immutableBefore = immutableV2Files(fixtureValue), commitsBefore = commitFiles(fixtureValue);
    const apply = input.operation === "SET_COMPOSITION_DURATION" ? editDuration : edit;
    const applied = instrument(fixtureValue, {}, root => apply(root, fixtureValue.snapshot, input, operationKey, ACTOR));
    assert.equal(applied.result.revision, expectedRevision); assertLocked(applied.result);
    const immutableAfter = immutableV2Files(fixtureValue), commitsAfter = commitFiles(fixtureValue); assertAppendOnly(immutableBefore, immutableAfter);
    assert.equal(commitsAfter.length, commitsBefore.length + 1);
    const added = commitsAfter.filter(item => !commitsBefore.some(before => before.path === item.path)); assert.equal(added.length, 1);
    const savedHead = head(fixtureValue), savedCommit = commit(fixtureValue, savedHead.journalTip); assert.equal(savedCommit.operation, input.operation); assertLocked(savedCommit);
    const beforeReplay = v2Files(fixtureValue), replay = instrument(fixtureValue, {}, root => apply(root, fixtureValue.snapshot, input, operationKey, ACTOR));
    assert.equal(replay.result.revision, expectedRevision); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), beforeReplay);
    return { applied, replay, head: savedHead, commit: savedCommit, view: current(fixtureValue) };
  }

  function applyNavigation(fixtureValue, operation, operationKey, expectedRevision, expectedTargetHash) {
    const input = navigationInput(fixtureValue, operation), immutableBefore = immutableV2Files(fixtureValue), commitsBefore = commitFiles(fixtureValue);
    const applied = instrument(fixtureValue, {}, root => navigate(root, fixtureValue.snapshot, input, operationKey, ACTOR));
    assert.equal(applied.result.revision, expectedRevision); assertLocked(applied.result);
    const immutableAfter = immutableV2Files(fixtureValue), commitsAfter = commitFiles(fixtureValue); assertAppendOnly(immutableBefore, immutableAfter);
    assert.equal(commitsAfter.length, commitsBefore.length + 1);
    const added = commitsAfter.filter(item => !commitsBefore.some(before => before.path === item.path)); assert.equal(added.length, 1);
    const savedHead = head(fixtureValue), savedCommit = commit(fixtureValue, savedHead.journalTip);
    assert.equal(savedCommit.format, "studio-editorial-journal-v4"); assert.equal(savedCommit.operation, operation); assert.equal(savedCommit.historyTargetHash, expectedTargetHash); assertLocked(savedCommit);
    assert.equal(added[0].path, `commits/${savedHead.journalTip}.json`);
    const beforeReplay = v2Files(fixtureValue), replay = instrument(fixtureValue, {}, root => navigate(root, fixtureValue.snapshot, input, operationKey, ACTOR));
    assert.equal(replay.result.revision, expectedRevision); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), beforeReplay);
    return { input, applied, replay, head: savedHead, commit: savedCommit, view: current(fixtureValue) };
  }

  function applyFacadeNavigation(fixtureValue, operation, operationKey, expectedRevision, expectedTargetHash) {
    const input = navigationInput(fixtureValue, operation), immutableBefore = immutableV2Files(fixtureValue), commitsBefore = commitFiles(fixtureValue);
    const result = using(repository => repository.navigateEditorialV2History(input, operationKey, ACTOR));
    assert.equal(result.revision, expectedRevision); assertLocked(result);
    const immutableAfter = immutableV2Files(fixtureValue), commitsAfter = commitFiles(fixtureValue); assertAppendOnly(immutableBefore, immutableAfter); assert.equal(commitsAfter.length, commitsBefore.length + 1);
    const added = commitsAfter.filter(item => !commitsBefore.some(before => before.path === item.path)); assert.equal(added.length, 1);
    const savedHead = head(fixtureValue), savedCommit = commit(fixtureValue, savedHead.journalTip); assert.equal(added[0].path, `commits/${savedHead.journalTip}.json`);
    assert.equal(savedCommit.operation, operation); assert.equal(savedCommit.historyTargetHash, expectedTargetHash); assertLocked(savedCommit);
    const beforeReplay = v2Files(fixtureValue), replay = instrument(fixtureValue, {}, root => navigate(root, fixtureValue.snapshot, input, operationKey, ACTOR));
    assert.equal(replay.result.revision, expectedRevision); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), beforeReplay);
    return { input, result, replay, head: savedHead, commit: savedCommit, view: current(fixtureValue) };
  }

  function assertBoundary(fixtureValue, operation, label) {
    const input = navigationInput(fixtureValue, operation), before = v2Files(fixtureValue);
    const outcome = instrument(fixtureValue, {}, root => assert.throws(() => navigate(root, fixtureValue.snapshot, input, key(label), ACTOR), historyBoundary));
    assert.equal(outcome.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), before); return { input, observed: outcome.observed };
  }

  const tests = [], results = [];
  const test = (name, run) => tests.push({ name, run });
  let main;

  function exactTrimHandleHistoryCase({ label, edge, cut, expected, evidenceName }) {
    const fixtureValue = fixture(label);
    const oneSecond = applyEdit(fixtureValue, trimInput(fixtureValue, "layer_history_main", "OUT", { numerator: 1, denominator: 1 }), key(`${label}-prepare-duration`), 2);
    const prepared = applyEdit(fixtureValue, moveInput(fixtureValue, "layer_history_main", { numerator: 1, denominator: 3 }), key(`${label}-prepare-start`), 3);
    const original = prepared.view, originalLayer = original.composition.layers[0], originalOrder = original.composition.layers.map(layer => layer.layerId), unrelatedLayer = clone(original.composition.layers[1]);
    const originalTiming = { start: { numerator: 1, denominator: 3 }, duration: { numerator: 1, denominator: 1 }, sourceOffset: { numerator: 0, denominator: 1 }, end: { numerator: 4, denominator: 3 } };
    assert.deepEqual({ start: originalLayer.start, duration: originalLayer.duration, sourceOffset: originalLayer.sourceOffset, end: editorialAddTime(originalLayer.start, originalLayer.duration) }, originalTiming);
    assert.equal(originalLayer.type, "VIDEO"); assert.equal(originalLayer.source.kind, "ASSET"); assert.equal(originalLayer.source.asset.assetId, fixtureValue.asset.assetId); assert.equal(originalLayer.source.asset.version, 1); assert.equal(originalLayer.source.takeId, fixtureValue.primaryTakeId);
    assert.deepEqual(edge === "IN" ? editorialSubtractTime(cut, originalLayer.start) : editorialSubtractTime(originalTiming.end, cut), { numerator: 1, denominator: 25 });

    const usedTakeBefore = entityRecord(fixtureValue, head(fixtureValue), `take:${fixtureValue.primaryTakeId}`), unusedTakeBefore = entityRecord(fixtureValue, head(fixtureValue), `take:${fixtureValue.unusedTakeId}`);
    const sourceBefore = clone(originalLayer.source), mediaHashBefore = withNative(root => sha(root.readFile(fixtureValue.asset.sourcePath.split("/"), 1_048_576))), sourceFilesBefore = projectFiles(fixtureValue);
    assert.equal(mediaHashBefore, fixtureValue.asset.contentHash); assert.equal(mediaHashBefore, sha(fixtureValue.media));

    const request = trimInput(fixtureValue, originalLayer.layerId, edge, cut), operationKey = key(`${label}-exact-trim`);
    const trimmed = applyEdit(fixtureValue, request, operationKey, 4), trimCommit = trimmed.head.journalTip, trimmedLayer = trimmed.view.composition.layers[0];
    assert.equal(trimmed.view.composition.revision, 5); assertLocked(trimmed.view);
    assert.deepEqual({ start: trimmedLayer.start, duration: trimmedLayer.duration, sourceOffset: trimmedLayer.sourceOffset, end: editorialAddTime(trimmedLayer.start, trimmedLayer.duration) }, expected);
    assert.deepEqual(trimmedLayer.source, sourceBefore); assert.deepEqual(trimmed.view.composition.layers.map(layer => layer.layerId), originalOrder); assert.deepEqual(trimmed.view.composition.layers[1], unrelatedLayer);
    assert.deepEqual(trimmed.view.takes, [fixtureValue.primaryTake]); assert.deepEqual(entityRecord(fixtureValue, head(fixtureValue), `take:${fixtureValue.primaryTakeId}`), usedTakeBefore); assert.deepEqual(entityRecord(fixtureValue, head(fixtureValue), `take:${fixtureValue.unusedTakeId}`), unusedTakeBefore);
    assert.equal(trimmed.replay.observed.writes.length, 0);

    const reopenedTrimmed = using(repository => repository.reviewEditorialV2Composition(fixtureValue.id, fixtureValue.mainId));
    assert.deepEqual(reopenedTrimmed, trimmed.view); assert.deepEqual(projectFiles(fixtureValue), sourceFilesBefore);
    assert.equal(withNative(root => sha(root.readFile(fixtureValue.asset.sourcePath.split("/"), 1_048_576))), mediaHashBefore);

    const undone = applyNavigation(fixtureValue, "UNDO_EDITORIAL_EDIT", key(`${label}-undo`), 5, trimCommit);
    assert.equal(undone.view.composition.revision, 6); assertSameCompositionContent(undone.view.composition, original.composition); assertLocked(undone.view);
    assert.deepEqual(undone.view.history, activeHistory(fixtureValue, { operation: "MOVE_LAYER_TIME", revision: 6 }, { operation: "TRIM_LAYER_TIME", revision: 6 }));
    const beforeRestart = v2Files(fixtureValue), reopenedUndone = using(repository => repository.reviewEditorialV2Composition(fixtureValue.id, fixtureValue.mainId));
    assert.deepEqual(reopenedUndone, undone.view); assert.deepEqual(v2Files(fixtureValue), beforeRestart); assert.equal(reopenedUndone.history.redo.available, true); assert.equal(reopenedUndone.history.redo.targetOperation, "TRIM_LAYER_TIME");

    const redone = applyFacadeNavigation(fixtureValue, "REDO_EDITORIAL_EDIT", key(`${label}-redo`), 6, trimCommit), redoneLayer = redone.view.composition.layers[0];
    assert.equal(redone.view.composition.revision, 7); assertSameCompositionContent(redone.view.composition, trimmed.view.composition); assertLocked(redone.view);
    assert.deepEqual({ start: redoneLayer.start, duration: redoneLayer.duration, sourceOffset: redoneLayer.sourceOffset, end: editorialAddTime(redoneLayer.start, redoneLayer.duration) }, expected);
    assert.deepEqual(redone.view.composition.layers.map(layer => layer.layerId), originalOrder); assert.deepEqual(redone.view.composition.layers[1], unrelatedLayer); assert.deepEqual(redoneLayer.source, sourceBefore); assert.deepEqual(redone.view.takes, [fixtureValue.primaryTake]);
    assert.deepEqual(entityRecord(fixtureValue, head(fixtureValue), `take:${fixtureValue.primaryTakeId}`), usedTakeBefore); assert.deepEqual(entityRecord(fixtureValue, head(fixtureValue), `take:${fixtureValue.unusedTakeId}`), unusedTakeBefore);
    assert.deepEqual(projectFiles(fixtureValue), sourceFilesBefore); assert.equal(withNative(root => sha(root.readFile(fixtureValue.asset.sourcePath.split("/"), 1_048_576))), mediaHashBefore);

    const chain = journalChain(fixtureValue), auditResult = withNative(root => audit(root, fixtureValue.snapshot, 64));
    assert.deepEqual(chain.map(item => item.commit.operation), ["COPY_V1_TO_V2", "TRIM_LAYER_TIME", "MOVE_LAYER_TIME", "TRIM_LAYER_TIME", "UNDO_EDITORIAL_EDIT", "REDO_EDITORIAL_EDIT"]);
    assert.deepEqual(chain.map(item => item.head.revision), [1, 2, 3, 4, 5, 6]); for (const item of chain) assertLocked(item.commit);
    assert.equal(auditResult.revision, 6); assert.equal(auditResult.checkedCommits, 6); assert.equal(auditResult.complete, true); assertLocked(auditResult);
    retain(evidenceName, { case: { edge, cut, oneFrame: { numerator: 1, denominator: 25 }, original: originalTiming, expected }, preparation: { oneSecond: oneSecond.view, prepared: prepared.view }, request, save: trimmed.view, replayWrites: trimmed.replay.observed.writes, reopenedTrimmed, undo: undone.view, reopenedUndone, redo: redone.view, source: { binding: sourceBefore, contentHash: mediaHashBefore, usedTake: usedTakeBefore, unusedTake: unusedTakeBefore, layerOrder: originalOrder, unrelatedLayer }, chain, auditResult, providerRequests: 0, generationAllowed: false });
  }

  test("Fresh copy starts at the canonical history boundary and lazy reads exclude a real unused Take", () => {
    main = fixture("journey");
    const measured = instrument(main, {}, root => read(root, main.snapshot, main.mainId)), view = measured.result;
    assert.equal(view.revision, 1); assert.equal(view.composition.revision, 2); assertLocked(view);
    assert.deepEqual(view.history, activeHistory(main, null, null));
    assert.deepEqual(view.takes, [main.primaryTake]); assert.ok(!view.takes.some(take => take.takeId === main.unusedTakeId));
    assert.deepEqual(view.composition.layers[0].source, { kind: "ASSET", asset: { assetId: main.asset.assetId, version: 1 }, takeId: main.primaryTakeId });
    assert.deepEqual(view.composition.layers[0].provenance, provenance());
    const entityReads = [...new Set(measured.observed.reads.filter(item => item.format === "studio-editorial-entity-v2").map(item => `${item.kind}:${item.entityId}`))].sort();
    assert.deepEqual(entityReads, [`composition:${main.mainId}`, `take:${main.primaryTakeId}`].sort());
    assert.ok(!measured.observed.reads.some(item => item.entityId === main.unusedTakeId)); assert.equal(measured.observed.writes.length, 0);
    const unused = entityRecord(main, head(main), `take:${main.unusedTakeId}`);
    assert.deepEqual(unused.record, { format: "studio-editorial-entity-v2", projectId: main.id, kind: "take", entityId: main.unusedTakeId, value: main.unusedTake });
    main.initialView = view; main.unusedAtMigration = unused;
    const globalHistory = withNative(root => read(root, main.snapshot, main.preA)).history; assert.deepEqual(globalHistory, view.history);
    const boundary = assertBoundary(main, "UNDO_EDITORIAL_EDIT", "initial-undo-boundary");
    assert.deepEqual(projectFiles(main), main.baseline);
    retain("history-initial-boundary-unused-take.json", { view, entityReads, unused, globalHistory, boundary, migration: main.migrated });
  });

  test("Canonical duration edits extend empty tails, admit 31.04 and 300 seconds, reject an enabled-layer cut, and remain monotonic through history", () => {
    const fixtureValue = fixture("duration"), initial = current(fixtureValue), originalLayers = clone(initial.composition.layers), originalMediaHash = withNative(root => sha(root.readFile(fixtureValue.asset.sourcePath.split("/"), 1_048_576)));
    const extended = applyEdit(fixtureValue, durationInput(fixtureValue, { numerator: 776, denominator: 25 }), key("duration-31-04"), 2);
    assert.deepEqual(extended.view.composition.duration, { numerator: 776, denominator: 25 }); assert.equal(extended.view.composition.revision, 3); assert.deepEqual(extended.view.composition.layers, originalLayers);
    assert.deepEqual(extended.view.history, activeHistory(fixtureValue, { operation: "SET_COMPOSITION_DURATION", revision: 3 }, null));
    const extensionCommit = extended.head.journalTip;
    const undone = applyNavigation(fixtureValue, "UNDO_EDITORIAL_EDIT", key("duration-undo"), 3, extensionCommit);
    assert.equal(undone.view.composition.revision, 4); assertSameCompositionContent(undone.view.composition, initial.composition); assert.deepEqual(undone.view.composition.layers, originalLayers);
    assert.deepEqual(undone.view.history, activeHistory(fixtureValue, null, { operation: "SET_COMPOSITION_DURATION", revision: 4 }));
    const redone = applyNavigation(fixtureValue, "REDO_EDITORIAL_EDIT", key("duration-redo"), 4, extensionCommit);
    assert.equal(redone.view.composition.revision, 5); assertSameCompositionContent(redone.view.composition, extended.view.composition); assert.deepEqual(redone.view.composition.layers, originalLayers);
    const fiveMinutes = applyEdit(fixtureValue, durationInput(fixtureValue, { numerator: 300, denominator: 1 }), key("duration-300"), 5);
    assert.deepEqual(fiveMinutes.view.composition.duration, { numerator: 300, denominator: 1 }); assert.equal(fiveMinutes.view.composition.revision, 6); assert.deepEqual(fiveMinutes.view.composition.layers, originalLayers);
    const shortened = applyEdit(fixtureValue, durationInput(fixtureValue, { numerator: 2, denominator: 1 }), key("duration-short-safe"), 6);
    assert.deepEqual(shortened.view.composition.duration, { numerator: 2, denominator: 1 }); assert.equal(shortened.view.composition.revision, 7); assert.deepEqual(shortened.view.composition.layers, originalLayers);
    const rejectedRequest = durationInput(fixtureValue, { numerator: 199, denominator: 100 }), rejectedKey = key("duration-short-enabled-layer"), beforeRejected = v2Files(fixtureValue);
    const rejected = instrument(fixtureValue, {}, root => assert.throws(() => editDuration(root, fixtureValue.snapshot, rejectedRequest, rejectedKey, ACTOR), durationConflict));
    assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), beforeRejected); assert.deepEqual(current(fixtureValue), shortened.view);
    const stale = { ...durationInput(fixtureValue, { numerator: 4, denominator: 1 }), expectedRevision: shortened.view.revision - 1 }, beforeStale = v2Files(fixtureValue);
    const staleResult = instrument(fixtureValue, {}, root => assert.throws(() => editDuration(root, fixtureValue.snapshot, stale, key("duration-stale"), ACTOR), conflict));
    assert.equal(staleResult.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), beforeStale);
    const shrinkCommit = shortened.head.journalTip, restored = applyNavigation(fixtureValue, "UNDO_EDITORIAL_EDIT", key("duration-undo-shrink"), 7, shrinkCommit);
    assert.equal(restored.view.composition.revision, 8); assertSameCompositionContent(restored.view.composition, fiveMinutes.view.composition); assert.deepEqual(restored.view.composition.layers, originalLayers);
    assert.equal(withNative(root => sha(root.readFile(fixtureValue.asset.sourcePath.split("/"), 1_048_576))), originalMediaHash); assert.deepEqual(projectFiles(fixtureValue), fixtureValue.baseline);
    const auditResult = withNative(root => audit(root, fixtureValue.snapshot, 64)); assert.equal(auditResult.checkedCommits, 7); assert.equal(auditResult.complete, true); assertLocked(auditResult);
    retain("canonical-duration-history.json", { initial, extended: extended.view, undone: undone.view, redone: redone.view, fiveMinutes: fiveMinutes.view, shortened: shortened.view, rejected: rejected.observed, stale: staleResult.observed, restored: restored.view, auditResult, mediaHash: originalMediaHash });
  });

  test("Split, trim right, move right, three undos and three redos restore exact content while composition and head revisions advance", () => {
    const initial = main.initialView, originalLayer = clone(initial.composition.layers[0]), originalOrder = initial.composition.layers.map(layer => layer.layerId);
    const immutableAtStart = immutableV2Files(main);

    const splitRequest = splitInput(main, originalLayer.layerId, { numerator: 1, denominator: 1 }), splitKey = key("journey-split");
    const split = applyEdit(main, splitRequest, splitKey, 2), splitCommit = split.head.journalTip;
    assert.equal(split.view.composition.revision, 3); assert.deepEqual(split.view.history, activeHistory(main, { operation: "SPLIT_LAYER_TIME", revision: 3 }, null));
    const [left, right, ...afterSplitRest] = split.view.composition.layers, rightId = right.layerId;
    assert.equal(left.layerId, originalLayer.layerId); assert.match(rightId, /^layer_split_[a-f0-9]{64}$/u); assert.notEqual(rightId, left.layerId);
    assert.deepEqual(afterSplitRest.map(layer => layer.layerId), originalOrder.slice(1));
    assert.deepEqual({ start: left.start, duration: left.duration, sourceOffset: left.sourceOffset }, { start: { numerator: 0, denominator: 1 }, duration: { numerator: 1, denominator: 1 }, sourceOffset: { numerator: 0, denominator: 1 } });
    assert.deepEqual({ start: right.start, duration: right.duration, sourceOffset: right.sourceOffset }, { start: { numerator: 1, denominator: 1 }, duration: { numerator: 1, denominator: 1 }, sourceOffset: { numerator: 1, denominator: 1 } });
    for (const field of ["compositionId", "name", "type", "source", "enabled", "locked", "solo", "playbackRate", "reverse", "transform", "opacity", "keyframes", "approvalState", "provenance"]) {
      assert.deepEqual(left[field], originalLayer[field], `left ${field}`); assert.deepEqual(right[field], originalLayer[field], `right ${field}`);
    }
    assert.equal(left.version, originalLayer.version + 1); assert.equal(right.version, 1);

    const trimRequest = trimInput(main, rightId, "OUT", { numerator: 3, denominator: 2 }), trimKey = key("journey-trim-right");
    const trimmed = applyEdit(main, trimRequest, trimKey, 3), trimCommit = trimmed.head.journalTip;
    assert.equal(trimmed.view.composition.revision, 4); assert.deepEqual(trimmed.view.history, activeHistory(main, { operation: "TRIM_LAYER_TIME", revision: 4 }, null));
    assert.deepEqual(trimmed.view.composition.layers.map(layer => layer.layerId), split.view.composition.layers.map(layer => layer.layerId));
    assert.deepEqual({ start: trimmed.view.composition.layers[1].start, duration: trimmed.view.composition.layers[1].duration, sourceOffset: trimmed.view.composition.layers[1].sourceOffset }, { start: { numerator: 1, denominator: 1 }, duration: { numerator: 1, denominator: 2 }, sourceOffset: { numerator: 1, denominator: 1 } });
    assert.deepEqual(trimmed.view.composition.layers[1].source, right.source); assert.deepEqual(trimmed.view.composition.layers[1].provenance, right.provenance);
    const staleUndo = navigationInput(main, "UNDO_EDITORIAL_EDIT"), staleKey = key("journey-stale-undo");

    const moveRequest = moveInput(main, rightId, { numerator: 2, denominator: 1 }), moveKey = key("journey-move-right");
    const moved = applyEdit(main, moveRequest, moveKey, 4), moveCommit = moved.head.journalTip;
    assert.equal(moved.view.composition.revision, 5); assert.deepEqual(moved.view.history, activeHistory(main, { operation: "MOVE_LAYER_TIME", revision: 5 }, null));
    assert.deepEqual(moved.view.composition.layers.map(layer => layer.layerId), split.view.composition.layers.map(layer => layer.layerId));
    assert.deepEqual({ start: moved.view.composition.layers[1].start, duration: moved.view.composition.layers[1].duration, sourceOffset: moved.view.composition.layers[1].sourceOffset }, { start: { numerator: 2, denominator: 1 }, duration: { numerator: 1, denominator: 2 }, sourceOffset: { numerator: 1, denominator: 1 } });
    assert.deepEqual(moved.view.composition.layers[1].source, right.source); assert.deepEqual(moved.view.composition.layers[1].provenance, right.provenance);

    const beforeStale = v2Files(main), stale = instrument(main, {}, root => {
      assert.throws(() => navigate(root, main.snapshot, staleUndo, staleKey, ACTOR), conflict);
      assert.throws(() => navigate(root, main.snapshot, staleUndo, staleKey, ACTOR), conflict);
    });
    assert.equal(stale.observed.writes.length, 0); assert.deepEqual(v2Files(main), beforeStale);
    const endBeforeUndo = assertBoundary(main, "REDO_EDITORIAL_EDIT", "end-before-undo");

    const undoMove = applyNavigation(main, "UNDO_EDITORIAL_EDIT", key("undo-move"), 5, moveCommit);
    assert.equal(undoMove.view.composition.revision, 6); assertSameCompositionContent(undoMove.view.composition, trimmed.view.composition); assert.deepEqual(undoMove.view.takes, trimmed.view.takes);
    assert.deepEqual(undoMove.view.history, activeHistory(main, { operation: "TRIM_LAYER_TIME", revision: 6 }, { operation: "MOVE_LAYER_TIME", revision: 6 }));
    const undoTrim = applyNavigation(main, "UNDO_EDITORIAL_EDIT", key("undo-trim"), 6, trimCommit);
    assert.equal(undoTrim.view.composition.revision, 7); assertSameCompositionContent(undoTrim.view.composition, split.view.composition); assert.deepEqual(undoTrim.view.takes, split.view.takes);
    assert.deepEqual(undoTrim.view.history, activeHistory(main, { operation: "SPLIT_LAYER_TIME", revision: 7 }, { operation: "TRIM_LAYER_TIME", revision: 7 }));
    const undoSplit = applyNavigation(main, "UNDO_EDITORIAL_EDIT", key("undo-split"), 7, splitCommit);
    assert.equal(undoSplit.view.composition.revision, 8); assertSameCompositionContent(undoSplit.view.composition, initial.composition); assert.deepEqual(undoSplit.view.takes, initial.takes);
    assert.deepEqual(undoSplit.view.history, activeHistory(main, null, { operation: "SPLIT_LAYER_TIME", revision: 8 }));
    const beginningAfterUndo = assertBoundary(main, "UNDO_EDITORIAL_EDIT", "beginning-after-undo");

    const beforeRestart = v2Files(main), reopenedUndone = using(repository => repository.reviewEditorialV2Composition(main.id, main.mainId));
    assert.deepEqual(reopenedUndone, undoSplit.view); assert.deepEqual(v2Files(main), beforeRestart);
    const redoSplit = applyNavigation(main, "REDO_EDITORIAL_EDIT", key("redo-split"), 8, splitCommit);
    assert.equal(redoSplit.view.composition.revision, 9); assertSameCompositionContent(redoSplit.view.composition, split.view.composition); assert.equal(redoSplit.view.composition.layers[1].layerId, rightId);
    assert.deepEqual(redoSplit.view.history, activeHistory(main, { operation: "SPLIT_LAYER_TIME", revision: 9 }, { operation: "TRIM_LAYER_TIME", revision: 9 }));
    const redoTrim = applyNavigation(main, "REDO_EDITORIAL_EDIT", key("redo-trim"), 9, trimCommit);
    assert.equal(redoTrim.view.composition.revision, 10); assertSameCompositionContent(redoTrim.view.composition, trimmed.view.composition);
    assert.deepEqual(redoTrim.view.history, activeHistory(main, { operation: "TRIM_LAYER_TIME", revision: 10 }, { operation: "MOVE_LAYER_TIME", revision: 10 }));
    const redoMove = applyNavigation(main, "REDO_EDITORIAL_EDIT", key("redo-move"), 10, moveCommit);
    assert.equal(redoMove.view.composition.revision, 11); assertSameCompositionContent(redoMove.view.composition, moved.view.composition); assert.deepEqual(redoMove.view.takes, moved.view.takes);
    assert.deepEqual(redoMove.view.history, activeHistory(main, { operation: "MOVE_LAYER_TIME", revision: 11 }, null));
    const endAfterRedo = assertBoundary(main, "REDO_EDITORIAL_EDIT", "end-after-redo");

    const globalHistory = withNative(root => read(root, main.snapshot, main.preA)).history; assert.deepEqual(globalHistory, redoMove.view.history);
    const directAudit = withNative(root => audit(root, main.snapshot, 64)), facadeAudit = using(repository => repository.auditEditorialV2History(main.id, 64));
    assert.deepEqual(facadeAudit, directAudit); assert.equal(directAudit.revision, 10); assert.equal(directAudit.checkedCommits, 10); assert.equal(directAudit.complete, true); assert.equal(directAudit.remainingHeadHash, null); assertLocked(directAudit);
    const chain = journalChain(main), expectedOperations = ["COPY_V1_TO_V2", "SPLIT_LAYER_TIME", "TRIM_LAYER_TIME", "MOVE_LAYER_TIME", "UNDO_EDITORIAL_EDIT", "UNDO_EDITORIAL_EDIT", "UNDO_EDITORIAL_EDIT", "REDO_EDITORIAL_EDIT", "REDO_EDITORIAL_EDIT", "REDO_EDITORIAL_EDIT"];
    assert.deepEqual(chain.map(item => item.commit.operation), expectedOperations); assert.deepEqual(chain.map(item => item.head.revision), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.deepEqual(chain.slice(4).map(item => item.commit.historyTargetHash), [moveCommit, trimCommit, splitCommit, splitCommit, trimCommit, moveCommit]);
    assert.equal(commitFiles(main).length, 10); for (const item of chain) assertLocked(item.commit); assertAppendOnly(immutableAtStart, immutableV2Files(main));
    const unusedAtEnd = entityRecord(main, head(main), `take:${main.unusedTakeId}`); assert.deepEqual(unusedAtEnd, main.unusedAtMigration);
    const finalLazy = instrument(main, {}, root => read(root, main.snapshot, main.mainId));
    assert.deepEqual(finalLazy.result.takes, [main.primaryTake]); assert.ok(!finalLazy.observed.reads.some(item => item.entityId === main.unusedTakeId)); assert.equal(finalLazy.observed.writes.length, 0);
    assert.deepEqual(projectFiles(main), main.baseline); assert.equal(withNative(root => sha(root.readFile(main.asset.sourcePath.split("/"), 1_048_576))), sha(main.media));
    retain("canonical-nine-step-history-journey.json", { splitRequest, trimRequest, moveRequest, snapshots: { initial, split: split.view, trimmed: trimmed.view, moved: moved.view, undoMove: undoMove.view, undoTrim: undoTrim.view, undoSplit: undoSplit.view, redoSplit: redoSplit.view, redoTrim: redoTrim.view, redoMove: redoMove.view }, commits: { splitCommit, trimCommit, moveCommit }, navigationJournals: [undoMove.commit, undoTrim.commit, undoSplit.commit, redoSplit.commit, redoTrim.commit, redoMove.commit], boundaries: { endBeforeUndo, beginningAfterUndo, endAfterRedo }, stale: stale.observed, restartedWhileUndone: reopenedUndone, chain, directAudit, globalHistory, unusedAtEnd, immutableFiles: immutableV2Files(main) });
  });

  test("Restart while undone preserves redo, and a new edit clears only the active redo path while old immutable evidence remains", () => {
    const fixtureValue = fixture("branch"), initial = current(fixtureValue);
    const split = applyEdit(fixtureValue, splitInput(fixtureValue, "layer_history_main", { numerator: 1, denominator: 1 }), key("branch-split"), 2);
    const rightId = split.view.composition.layers[1].layerId;
    const trimmed = applyEdit(fixtureValue, trimInput(fixtureValue, rightId, "OUT", { numerator: 3, denominator: 2 }), key("branch-trim"), 3);
    const trimCommit = trimmed.head.journalTip, undone = applyNavigation(fixtureValue, "UNDO_EDITORIAL_EDIT", key("branch-undo-trim"), 4, trimCommit);
    assert.equal(undone.view.composition.revision, 5); assertSameCompositionContent(undone.view.composition, split.view.composition);
    assert.deepEqual(undone.view.history, activeHistory(fixtureValue, { operation: "SPLIT_LAYER_TIME", revision: 5 }, { operation: "TRIM_LAYER_TIME", revision: 5 }));
    const redoRoot = head(fixtureValue).history.redoRoot; assert.match(redoRoot, /^[a-f0-9]{64}$/u);
    const redoNodePath = `objects/${redoRoot}.json`, beforeRestart = v2Files(fixtureValue);
    const reopened = using(repository => repository.reviewEditorialV2Composition(fixtureValue.id, fixtureValue.mainId));
    assert.deepEqual(reopened, undone.view); assert.deepEqual(v2Files(fixtureValue), beforeRestart);
    const staleRedo = navigationInput(fixtureValue, "REDO_EDITORIAL_EDIT"), staleRedoKey = key("branch-stale-redo");
    const immutableBeforeBranch = immutableV2Files(fixtureValue), oldRedoNode = immutableBeforeBranch.find(item => item.path === redoNodePath), oldTrimCommit = immutableBeforeBranch.find(item => item.path === `commits/${trimCommit}.json`);
    assert.ok(oldRedoNode); assert.ok(oldTrimCommit);
    const branched = applyEdit(fixtureValue, moveInput(fixtureValue, "layer_history_main", { numerator: 1, denominator: 4 }), key("branch-new-move"), 5);
    assert.equal(branched.view.composition.revision, 6); assert.equal(head(fixtureValue).history.redoRoot, null);
    assert.deepEqual(branched.view.history, activeHistory(fixtureValue, { operation: "MOVE_LAYER_TIME", revision: 6 }, null));
    assertAppendOnly(immutableBeforeBranch, immutableV2Files(fixtureValue));
    assert.deepEqual(immutableV2Files(fixtureValue).find(item => item.path === redoNodePath), oldRedoNode);
    assert.deepEqual(immutableV2Files(fixtureValue).find(item => item.path === `commits/${trimCommit}.json`), oldTrimCommit);
    const beforeStale = v2Files(fixtureValue), rejected = instrument(fixtureValue, {}, root => {
      assert.throws(() => navigate(root, fixtureValue.snapshot, staleRedo, staleRedoKey, ACTOR), conflict);
      assert.throws(() => navigate(root, fixtureValue.snapshot, staleRedo, staleRedoKey, ACTOR), conflict);
    });
    assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), beforeStale);
    const savedAudit = withNative(root => audit(root, fixtureValue.snapshot, 64)); assert.equal(savedAudit.checkedCommits, 5); assert.equal(savedAudit.complete, true); assertLocked(savedAudit);
    assert.deepEqual(journalChain(fixtureValue).map(item => item.commit.operation), ["COPY_V1_TO_V2", "SPLIT_LAYER_TIME", "TRIM_LAYER_TIME", "UNDO_EDITORIAL_EDIT", "MOVE_LAYER_TIME"]);
    assert.deepEqual(projectFiles(fixtureValue), fixtureValue.baseline);
    retain("restart-undone-and-branch-invalidation.json", { initial, split: split.view, trimmed: trimmed.view, undone: undone.view, reopened, redoRoot, trimCommit, branched: branched.view, rejected: rejected.observed, savedAudit, immutableBeforeBranch, immutableAfterBranch: immutableV2Files(fixtureValue) });
  });

  test("A genuine compatible head-v2 reports the legacy boundary, then one supported edit starts only new trustworthy history", () => {
    const fixtureValue = fixture("legacy_boundary"), currentBytes = fs.readFileSync(path.join(rootPath, ...headPath(fixtureValue.id))), currentHead = JSON.parse(currentBytes);
    assert.equal(currentHead.format, "studio-editorial-head-v3");
    const { history: omittedHistory, ...withoutHistory } = currentHead; void omittedHistory;
    const legacyHead = { ...withoutHistory, format: "studio-editorial-head-v2" }, legacyBytes = bytes(legacyHead);
    withNative(root => root.writeAtomicReplace(headPath(fixtureValue.id), `history-legacy-${randomUUID()}.tmp`, legacyBytes, currentBytes, [...base(fixtureValue.id), "project.json"], bytes(fixtureValue.snapshot)));
    const legacyView = current(fixtureValue); assert.equal(legacyView.revision, 1); assert.equal(legacyView.composition.revision, 2); assert.deepEqual(legacyView.history, legacyHistory); assertLocked(legacyView);
    const legacyBoundary = assertBoundary(fixtureValue, "UNDO_EDITORIAL_EDIT", "legacy-v2-boundary");
    const editResult = applyEdit(fixtureValue, moveInput(fixtureValue, "layer_history_main", { numerator: 1, denominator: 4 }), key("legacy-first-supported-edit"), 2);
    assert.equal(editResult.head.format, "studio-editorial-head-v3"); assert.equal(editResult.head.history.boundary, "LEGACY_BOUNDARY");
    assert.equal(editResult.view.composition.revision, 3); assert.deepEqual(editResult.view.history, activeHistory(fixtureValue, { operation: "MOVE_LAYER_TIME", revision: 3 }, null));
    const undone = applyNavigation(fixtureValue, "UNDO_EDITORIAL_EDIT", key("legacy-undo-first-supported-edit"), 3, editResult.head.journalTip);
    assert.equal(undone.head.history.boundary, "LEGACY_BOUNDARY"); assert.equal(undone.view.composition.revision, 4); assertSameCompositionContent(undone.view.composition, legacyView.composition);
    const legacyFloorHistory = { state: "LEGACY_BOUNDARY", undo: unavailableAction("UNDO_EDITORIAL_EDIT", legacyDescription), redo: availableAction("REDO_EDITORIAL_EDIT", "MOVE_LAYER_TIME", fixtureValue.mainId, 4) };
    assert.deepEqual(undone.view.history, legacyFloorHistory); assert.match(undone.view.history.undo.description, /older edits.*cannot be reconstructed/iu);
    const beforeRestart = v2Files(fixtureValue), restartedAtFloor = using(repository => repository.reviewEditorialV2Composition(fixtureValue.id, fixtureValue.mainId));
    assert.deepEqual(restartedAtFloor, undone.view); assert.deepEqual(v2Files(fixtureValue), beforeRestart);
    const redone = applyFacadeNavigation(fixtureValue, "REDO_EDITORIAL_EDIT", key("legacy-redo-first-supported-edit"), 4, editResult.head.journalTip);
    assert.equal(redone.view.composition.revision, 5); assertSameCompositionContent(redone.view.composition, editResult.view.composition); assert.deepEqual(redone.view.history, activeHistory(fixtureValue, { operation: "MOVE_LAYER_TIME", revision: 5 }, null));
    const savedAudit = withNative(root => audit(root, fixtureValue.snapshot, 64)); assert.equal(savedAudit.checkedCommits, 4); assert.equal(savedAudit.complete, true);
    assert.deepEqual(projectFiles(fixtureValue), fixtureValue.baseline);
    retain("compatible-legacy-v2-boundary.json", { replacedSyntheticHeadOnly: true, originalHeadSha256: sha(currentBytes), legacyHead, legacyView, legacyBoundary, editResult: { head: editResult.head, commit: editResult.commit, view: editResult.view }, undone: undone.view, legacyFloorHistory, restartedAtFloor, redone: redone.view, savedAudit });
  });

  test("Injected pre-head navigation failure exposes no restored snapshot and exact retry recovers from append-only intent", () => {
    const fixtureValue = fixture("prehead"), initial = current(fixtureValue);
    const split = applyEdit(fixtureValue, splitInput(fixtureValue, "layer_history_main", { numerator: 1, denominator: 1 }), key("prehead-split"), 2), splitCommit = split.head.journalTip;
    const request = navigationInput(fixtureValue, "UNDO_EDITORIAL_EDIT"), operationKey = key("prehead-undo"), oldHeadBytes = fs.readFileSync(path.join(rootPath, ...headPath(fixtureValue.id))), immutableBefore = immutableV2Files(fixtureValue), commitsBefore = commitFiles(fixtureValue);
    const failed = instrument(fixtureValue, { failBeforeHead: true }, root => assert.throws(() => navigate(root, fixtureValue.snapshot, request, operationKey, ACTOR), unavailable));
    assert.deepEqual(fs.readFileSync(path.join(rootPath, ...headPath(fixtureValue.id))), oldHeadBytes); assert.deepEqual(current(fixtureValue).composition, split.view.composition);
    const immutableAfterFailure = immutableV2Files(fixtureValue), commitsAfterFailure = commitFiles(fixtureValue); assertAppendOnly(immutableBefore, immutableAfterFailure); assert.equal(commitsAfterFailure.length, commitsBefore.length + 1);
    const recovered = instrument(fixtureValue, {}, root => navigate(root, fixtureValue.snapshot, request, operationKey, ACTOR)); assert.equal(recovered.result.revision, 3); assertLocked(recovered.result);
    assert.equal(current(fixtureValue).composition.revision, 4); assertSameCompositionContent(current(fixtureValue).composition, initial.composition); assert.equal(head(fixtureValue).history.redoRoot !== null, true);
    assert.equal(commitFiles(fixtureValue).length, commitsAfterFailure.length); assertAppendOnly(immutableAfterFailure, immutableV2Files(fixtureValue));
    const afterRecovery = v2Files(fixtureValue), replay = instrument(fixtureValue, {}, root => navigate(root, fixtureValue.snapshot, request, operationKey, ACTOR));
    assert.equal(replay.result.revision, 3); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), afterRecovery);
    const savedCommit = commit(fixtureValue, head(fixtureValue).journalTip); assert.equal(savedCommit.operation, "UNDO_EDITORIAL_EDIT"); assert.equal(savedCommit.historyTargetHash, splitCommit); assertLocked(savedCommit);
    const savedAudit = withNative(root => audit(root, fixtureValue.snapshot, 64)); assert.equal(savedAudit.checkedCommits, 3); assert.equal(savedAudit.complete, true);
    assert.deepEqual(projectFiles(fixtureValue), fixtureValue.baseline);
    retain("pre-head-history-atomic-recovery.json", { initial, split: split.view, request, failed: failed.observed, immutableAfterFailure, recovered, replay: replay.observed, savedCommit, savedAudit });
  });

  test("Two actual callers race the same undo through native CAS; one wins, winner replays and loser stays stale", async () => {
    const fixtureValue = fixture("race");
    const split = applyEdit(fixtureValue, splitInput(fixtureValue, "layer_history_main", { numerator: 1, denominator: 1 }), key("race-split"), 2);
    const rightId = split.view.composition.layers[1].layerId;
    const trimmed = applyEdit(fixtureValue, trimInput(fixtureValue, rightId, "OUT", { numerator: 3, denominator: 2 }), key("race-trim"), 3);
    applyEdit(fixtureValue, moveInput(fixtureValue, rightId, { numerator: 2, denominator: 1 }), key("race-move"), 4);
    const requests = [navigationInput(fixtureValue, "UNDO_EDITORIAL_EDIT"), navigationInput(fixtureValue, "UNDO_EDITORIAL_EDIT")], keys = [key("race-left"), key("race-right")];
    const gate = path.join(evidence, "history-race-release.json"), immutableBefore = immutableV2Files(fixtureValue), commitsBefore = commitFiles(fixtureValue); let ready = 0;
    const child = index => new Promise((resolve, reject) => {
      const processHandle = spawn(process.execPath, [filename, "--race", namespace, fixtureValue.id, JSON.stringify(requests[index]), keys[index], gate], { cwd: frontend, env: safeEnv, windowsHide: true, stdio: ["ignore", "pipe", "pipe", "ipc"] });
      let stdout = "", stderr = ""; const timer = setTimeout(() => { processHandle.kill(); reject(new Error("Owned history race process timed out.")); }, 35_000);
      processHandle.on("message", message => { if (message.ready && ++ready === 2) fs.writeFileSync(gate, JSON.stringify({ releasedAt: new Date().toISOString(), ready: 2 }), { flag: "wx" }); });
      processHandle.stdout.on("data", chunk => stdout += chunk); processHandle.stderr.on("data", chunk => stderr += chunk); processHandle.on("error", reject);
      processHandle.on("close", code => { clearTimeout(timer); if (code !== 0 || stderr) reject(new Error(stderr || `Child exit ${code}`)); else { try { resolve(JSON.parse(stdout)); } catch (error) { reject(error); } } });
    });
    const outcomes = await Promise.all([child(0), child(1)]); assert.equal(ready, 2); assert.equal(outcomes.filter(item => item.status === "APPLIED").length, 1); assert.equal(outcomes.filter(item => item.status === "REJECTED").length, 1);
    assert.ok(outcomes.every(item => item.networkAttempts.length === 0)); assert.ok(outcomes.some(item => item.observed.nativeErrors.includes("compare_mismatch")));
    const winner = outcomes.findIndex(item => item.status === "APPLIED"), loser = 1 - winner; assert.equal(outcomes[winner].result.revision, 5); assert.equal(outcomes[loser].code, "EDITORIAL_V2_UNAVAILABLE");
    const afterRaceView = current(fixtureValue); assert.equal(afterRaceView.composition.revision, 6); assertSameCompositionContent(afterRaceView.composition, trimmed.view.composition);
    assert.deepEqual(afterRaceView.history, activeHistory(fixtureValue, { operation: "TRIM_LAYER_TIME", revision: 6 }, { operation: "MOVE_LAYER_TIME", revision: 6 }));
    const beforeRetries = v2Files(fixtureValue), winnerReplay = instrument(fixtureValue, {}, root => navigate(root, fixtureValue.snapshot, requests[winner], keys[winner], ACTOR));
    assert.equal(winnerReplay.result.revision, 5); assert.equal(winnerReplay.observed.writes.length, 0);
    const loserRetry = instrument(fixtureValue, {}, root => assert.throws(() => navigate(root, fixtureValue.snapshot, requests[loser], keys[loser], ACTOR), conflict));
    assert.equal(loserRetry.observed.writes.length, 0); assert.deepEqual(v2Files(fixtureValue), beforeRetries);
    assertAppendOnly(immutableBefore, immutableV2Files(fixtureValue)); assert.equal(commitFiles(fixtureValue).length, commitsBefore.length + 2);
    const savedAudit = withNative(root => audit(root, fixtureValue.snapshot, 64)); assert.equal(savedAudit.checkedCommits, 5); assert.equal(savedAudit.complete, true); assertLocked(savedAudit);
    assert.deepEqual(journalChain(fixtureValue).map(item => item.commit.operation), ["COPY_V1_TO_V2", "SPLIT_LAYER_TIME", "TRIM_LAYER_TIME", "MOVE_LAYER_TIME", "UNDO_EDITORIAL_EDIT"]);
    assert.deepEqual(projectFiles(fixtureValue), fixtureValue.baseline);
    retain("native-history-cas-race.json", { actualTwoProcessesAndNativeCAS: true, requests, keys, outcomes, winner, loser, winnerReplay, loserRetry: loserRetry.observed, afterRaceView, savedAudit, immutableFiles: immutableV2Files(fixtureValue) });
  });

  test("Visual trim Case A persists exact IN plus one 25 fps frame and survives replay Undo restart and Redo", () => {
    exactTrimHandleHistoryCase({
      label: "visual_trim_in_25fps",
      edge: "IN",
      cut: { numerator: 28, denominator: 75 },
      expected: { start: { numerator: 28, denominator: 75 }, duration: { numerator: 24, denominator: 25 }, sourceOffset: { numerator: 1, denominator: 25 }, end: { numerator: 4, denominator: 3 } },
      evidenceName: "visual-trim-in-25fps-canonical-history.json",
    });
  });

  test("Visual trim Case B persists exact OUT minus one 25 fps frame and survives replay Undo restart and Redo", () => {
    exactTrimHandleHistoryCase({
      label: "visual_trim_out_25fps",
      edge: "OUT",
      cut: { numerator: 97, denominator: 75 },
      expected: { start: { numerator: 1, denominator: 3 }, duration: { numerator: 24, denominator: 25 }, sourceOffset: { numerator: 0, denominator: 1 }, end: { numerator: 97, denominator: 75 } },
      evidenceName: "visual-trim-out-25fps-canonical-history.json",
    });
  });

  test("The dedicated run leaves source authority, original v1, media and generation locks unchanged", () => {
    assert.deepEqual(projectFiles(main), main.baseline);
    using(repository => { assert.deepEqual(repository.load(main.id), main.snapshot); assert.deepEqual(repository.reviewEditorial(main.id).editorial, main.legacy); });
    assert.equal(withNative(root => sha(root.readFile(main.asset.sourcePath.split("/"), 1_048_576))), sha(main.media));
    const chain = journalChain(main); for (const item of chain) assertLocked(item.commit);
    assert.deepEqual(networkAttempts, []);
    retain("final-authority-and-generation-lock.json", { projectFiles: projectFiles(main), v2Files: v2Files(main), v1StillActive: main.legacy, originalSnapshot: main.snapshot, journalCount: chain.length, providerRequests: 0, generationAllowed: false, networkAttempts });
  });

  for (const item of tests) {
    try { await item.run(); results.push({ name: item.name, status: "PASS" }); }
    catch (error) { results.push({ name: item.name, status: "FAIL", error: { name: error.name, code: error.code ?? null, message: error.message, stack: error.stack } }); break; }
  }
  const afterBindings = sourceBindings.map(item => ({ path: item.path, bytes: fs.statSync(path.join(frontend, item.path)).size, sha256: sha(fs.readFileSync(path.join(frontend, item.path))) }));
  const sourceUnchanged = canonical(afterBindings) === canonical(sourceBindings);
  const status = results.length === tests.length && results.every(item => item.status === "PASS") && networkAttempts.length === 0 && sourceUnchanged ? "PASS" : "FAIL";
  retain("result.json", { status, runId, namespace, rootPath, startedAt, finishedAt: new Date().toISOString(), planned: tests.length, completed: results.length, passed: results.filter(item => item.status === "PASS").length, tests: results, sourceBindings, afterBindings, sourceUnchanged, networkAttempts, nativeExecution: true, nativeRebuilt: false, actualProviderExecutions: 0, actualBrowserExecutions: 0, productionMutations: 0, dDriveMutations: 0, deletions: 0, allTestDataRetained: true });
  console.log(JSON.stringify({ status, planned: tests.length, completed: results.length, passed: results.filter(item => item.status === "PASS").length, failures: results.filter(item => item.status === "FAIL"), sourceUnchanged, evidence, namespace, testSha256: sha(fs.readFileSync(filename)), nativeSha256: NATIVE_SHA, providerRequests: 0, networkAttempts: networkAttempts.length }));
  if (status !== "PASS") process.exitCode = 1;
}
