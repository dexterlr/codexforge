// Actual native v2 persistence tests. Only fresh synthetic C namespaces are mutated.
// Fault timing/read failures are explicitly simulated; no D, provider, browser or native build.
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
const { migrateStudioEditorialV2: migrate, inspectStudioEditorialV2WorkingCopy: inspectCopy, readStudioEditorialV2Composition: read, editStudioEditorialV2Layer: edit, auditStudioEditorialV2History: audit } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-store.server");
const { editorialV2Index } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-index.server");
const { compositionV2ToV1Exact } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-contract");
const { defaultLayerTransform, validateEditorialContent } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { StudioValidationError } = loader.load("@/lib/codexforge/animation-studio/validation");
const { resolveAssetPath } = loader.load("@/lib/codexforge/animation-studio/workspace");
const { serializeJarvisChatCanonicalJson: canonical } = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");
const sha = value => createHash("sha256").update(value).digest("hex"), bytes = value => Buffer.from(canonical(value)), clone = value => JSON.parse(JSON.stringify(value));
const ACTOR = "synthetic-editorial-v2-persistence", NATIVE_SHA = "848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4";
const safeEnv = { SystemRoot: "C:\\Windows", WINDIR: "C:\\Windows", PATH: `${path.dirname(process.execPath)};C:\\Windows\\System32` };
const base = id => ["studio", "projects", id, "manifests"], v2 = id => [...base(id), "editorial-v2"], headPath = id => [...v2(id), "head.json"];
const objectPath = (id, hash) => [...v2(id), "objects", hash + ".json"], commitPath = (id, hash) => [...v2(id), "commits", hash + ".json"];
const errorCode = code => error => error?.code === code;
const unavailable = errorCode("EDITORIAL_V2_UNAVAILABLE");
function observedRoot(native, options = {}) {
  const observed = { reads: [], writes: [], statCalls: [], listCalls: [], injected: [], nativeErrors: [] };
  let armed = true;
  const root = new Proxy(native, { get(target, method) {
    if (method === "stat" || method === "listDirectory") return (...args) => {
      observed[method === "stat" ? "statCalls" : "listCalls"].push(args[0].join("/"));
      if (method === "stat" && options.hideHead && args[0].join("/") === headPath(options.id).join("/")) throw Object.assign(new Error("Simulated missing head; real file retained."), { code: "not_found" });
      if (method === "listDirectory" && options.hideCommits && args[0].join("/") === [...v2(options.id), "commits"].join("/")) throw Object.assign(new Error("Simulated missing commit directory; real evidence retained."), { code: "not_found" });
      return target[method](...args);
    };
    if (method === "readFile") return (...args) => {
      const name = args[0].join("/"); observed.reads.push({ path: name });
      if (options.hideHead && name === headPath(options.id).join("/")) throw Object.assign(new Error("Simulated missing head; real file retained."), { code: "not_found" });
      if (options.beforeRead) options.beforeRead(args, target);
      const actual = target.readFile(...args), value = options.afterRead ? options.afterRead(args, actual, target) : actual, entry = observed.reads.at(-1); entry.bytes = value.length; entry.sha256 = sha(value);
      try { const parsed = JSON.parse(value); entry.format = parsed.format ?? null; if (parsed.format === "studio-editorial-entity-v2") { entry.kind = parsed.kind; entry.entityId = parsed.entityId; } } catch { /* Binary/noncanonical bytes are left to product validation. */ }
      return value;
    };
    if (method === "writeAtomicExclusive" || method === "writeAtomicReplace") return (...args) => {
      const entry = { method, path: args[0].join("/"), bytes: args[2].length, sha256: sha(args[2]), succeeded: false }; observed.writes.push(entry);
      try { const parsed = JSON.parse(args[2]); entry.format = parsed.format ?? null; if (parsed.format === "studio-editorial-entity-v2") { entry.kind = parsed.kind; entry.entityId = parsed.entityId; } } catch { /* No product bytes are changed by instrumentation. */ }
      const isHead = args[0].at(-1) === "head.json" && args[0].includes("editorial-v2");
      if (isHead) {
        const fenceIndex = method === "writeAtomicReplace" ? 4 : 3;
        assert.deepEqual(args[fenceIndex], [...base(options.id), "project.json"]);
        assert.equal(Buffer.isBuffer(args[fenceIndex + 1]), true);
      }
      if (isHead && armed && (options.beforeHead || options.failBeforeHead || options.afterHead || options.loseAck)) {
        armed = false; observed.injected.push(options.failBeforeHead ? "before-head-io" : options.loseAck ? "post-head-lost-ack" : "head-interleaving");
        if (options.failBeforeHead) throw Object.assign(new Error("Simulated pre-head publication interruption."), { code: "synthetic_head_io" });
        if (options.beforeHead) options.beforeHead(args, target);
        try { const result = target[method](...args); entry.succeeded = true; if (options.afterHead) options.afterHead(args, target); if (options.loseAck) throw Object.assign(new Error("Simulated lost acknowledgement after actual native commit."), { code: "synthetic_lost_ack" }); return result; }
        catch (error) { observed.nativeErrors.push(error.code ?? null); throw error; }
      }
      try { const result = target[method](...args); entry.succeeded = true; return result; }
      catch (error) { observed.nativeErrors.push(error.code ?? null); throw error; }
    };
    const value = Reflect.get(target, method); return typeof value === "function" ? value.bind(target) : value;
  } });
  return { root, observed };
}

if (process.argv[2] === "--race") {
  const [namespace, id, requestJson, key, gate] = process.argv.slice(3), repository = openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" });
  let snapshot; try { snapshot = repository.load(id); } finally { repository.close(); }
  const native = openCreatorNativeRoot([".codexforge", "studio-tests", namespace], "persistent");
  const wrapped = observedRoot(native, { id, beforeHead() {
    process.send({ ready: true }); const until = Date.now() + 25_000, wait = new Int32Array(new SharedArrayBuffer(4));
    while (!fs.existsSync(gate)) { if (Date.now() > until) throw new Error("Owned race gate timed out."); Atomics.wait(wait, 0, 0, 20); }
  } });
  try { const result = edit(wrapped.root, snapshot, JSON.parse(requestJson), key, ACTOR); console.log(JSON.stringify({ status: "APPLIED", result, observed: wrapped.observed, networkAttempts })); }
  catch (error) { console.log(JSON.stringify({ status: "REJECTED", code: error.code ?? null, message: error.message, observed: wrapped.observed, networkAttempts })); }
  finally { native.close(); process.disconnect(); }
} else {
  const runId = randomUUID(), namespace = `editorial-v2-${runId}`, startedAt = new Date().toISOString();
  const rootSegments = [".codexforge", "studio-tests", namespace], rootPath = path.join(frontend, ...rootSegments);
  const acceptance = path.join(frontend, ".codexforge", "acceptance");
  assert.equal(fs.statSync(acceptance).isDirectory(), true); assert.equal(fs.existsSync(rootPath), false);
  const evidence = path.join(acceptance, `studio-editorial-v2-persistence-tests-${runId}`); fs.mkdirSync(evidence);
  const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
  const sourceBindings = [...new Set([...loader.loaded, "scripts/animation-studio-test-loader.mjs", "scripts/test-animation-studio-editorial-v2-persistence.mjs", "build/Release/codexforge_creator_filesystem.node"])].sort().map(name => ({ path: name, bytes: fs.statSync(path.join(frontend, name)).size, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
  assert.equal(sourceBindings.find(item => item.path.endsWith(".node")).sha256, NATIVE_SHA);
  retain("intent.json", { runId, namespace, startedAt, sourceBindings, scope: "Actual native persistence in fresh synthetic C-only namespace. Interleavings/read loss/acknowledgement loss are simulated. No old fixtures or evidence changed. All data retained." });
  let serial = 0;
  const now = () => new Date(Date.UTC(2026, 8, 20, 0, 0, serial++)).toISOString(), key = label => `${label}-${String(serial++).padStart(8, "0")}`;
  const nativeFor = () => openCreatorNativeRoot(rootSegments, "persistent");
  const using = run => { const repository = openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" }); try { return run(repository); } finally { repository.close(); } };
  const withNative = run => { const native = nativeFor(); try { return run(native); } finally { native.close(); } };
  const instrument = (fixture, options, run) => withNative(native => { const wrapped = observedRoot(native, { id: fixture.id, ...options }); const result = run(wrapped.root, wrapped.observed); return { result, observed: wrapped.observed }; });
  const provenance = () => ({ kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 });
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4f53hDgAHYgKzs+DUbgAAAABJRU5ErkJggg==", "base64");
  const mp4Box = (type, payload) => { const value = Buffer.alloc(8 + payload.length); value.writeUInt32BE(value.length); value.write(type, 4, "ascii"); payload.copy(value, 8); return value; };
  const mp4 = Buffer.concat([mp4Box("ftyp", Buffer.from("isom\0\0\0\0isom", "binary")), mp4Box("moov", Buffer.alloc(8)), mp4Box("mdat", Buffer.from("synthetic exact split source"))]);
  function inventory(target, excludeV2 = false) {
    if (!fs.existsSync(target)) return []; const entries = [];
    function visit(relative) {
      assert.ok(entries.length < 20_000); const full = path.join(target, relative), stat = fs.lstatSync(full); assert.equal(stat.isSymbolicLink(), false);
      if (stat.isDirectory()) { for (const name of fs.readdirSync(full).sort()) if (!(excludeV2 && name === "editorial-v2")) visit(path.join(relative, name)); }
      else { assert.equal(stat.isFile(), true); entries.push({ path: relative.split(path.sep).join("/"), bytes: stat.size, sha256: sha(fs.readFileSync(full)), mtimeMs: stat.mtimeMs, birthtimeMs: stat.birthtimeMs }); }
    }
    visit(""); return entries;
  }
  const projectFiles = f => inventory(path.join(rootPath, "studio", "projects", f.id), true);
  const v2Files = f => inventory(path.join(rootPath, ...v2(f.id)));
  const head = f => JSON.parse(fs.readFileSync(path.join(rootPath, ...headPath(f.id))));
  function fixture(label, migration = true, unchangedSecondSave = false, options = {}) {
    let f;
    using(repository => {
      const id = `project_v2_${label}`; repository.createDraftProject({ schemaVersion: 1, projectId: id, revision: 1, title: "Synthetic partitioned editorial", description: "No provider or source rendering.", currency: "GBP", createdAt: now() }, key("project"), ACTOR);
      const media = options.video ? mp4 : png, assetType = options.video ? "VIDEO" : "IMAGE", takeId = options.video ? "take_v2_video" : "take_v2_png";
      const createdAt = now(), contentHash = sha(media), asset = { schemaVersion: 1, assetId: options.video ? "asset_v2_video" : "asset_v2_png", projectId: id, version: 1, sourcePath: "", contentHash, assetType, approvalState: "DRAFT", provenance: { adapterMetadata: null, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: createdAt, cost: { currency: "GBP", minorUnits: 0 }, contentHash, parentAssets: [], jobId: null, approvalState: "DRAFT", rejectionReason: null }, dependencies: [], rights: { status: "OWNED", license: null, evidence: options.video ? "Fixed synthetic MP4 framing" : "Fixed synthetic PNG" }, createdAt, supersededBy: null, lineage: [] };
      asset.sourcePath = resolveAssetPath(id, asset, assetType, contentHash); repository.registerAsset(asset, media, key(options.video ? "video" : "image"), ACTOR, now());
      const snapshot = repository.load(id), initial = repository.reviewEditorial(id).editorial.content, shotId = snapshot.shots[0].shotId;
      const mainId = initial.compositions[0].compositionId, preA = "composition_pre_a", preB = "composition_pre_b", stamp = now();
      const layer = (compositionId, layerId, locked = false) => ({ schemaVersion: 1, layerId, compositionId, name: layerId, type: assetType, source: { kind: "ASSET", asset: { assetId: asset.assetId, version: 1 }, takeId }, enabled: true, locked, solo: false, startUs: options.startUs ?? 125_000, durationUs: options.durationUs ?? 1_750_000, sourceOffsetUs: options.sourceOffsetUs ?? 0, playbackRate: 1, reverse: false, transform: defaultLayerTransform(), opacity: options.opacity ?? 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: "DRAFT", provenance: provenance() });
      const composition = (compositionId, kind, layers) => ({ schemaVersion: 1, compositionId, projectId: id, kind, shotId: kind === "SHOT" ? shotId : null, name: compositionId, durationUs: options.compositionDurationUs ?? 3_000_000, width: 640, height: 360, layers, revision: 1, approvalState: "DRAFT", provenance: provenance() });
      const nested = { ...layer(mainId, "layer_nested"), type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: preA } };
      const mainLayers = [layer(mainId, "layer_main"), layer(mainId, "layer_locked", true), nested];
      if (options.fillMainToLimit) while (mainLayers.length < 32) mainLayers.push(layer(mainId, `layer_capacity_${mainLayers.length}`));
      const content = { schemaVersion: 1, projectId: id, takes: [{ schemaVersion: 1, takeId, projectId: id, shotId, source: { assetId: asset.assetId, version: 1 }, name: options.video ? "Retained VIDEO Take" : "Retained PNG Take", createdAt: stamp, review: { state: "UNREVIEWED", note: "", reviewedAt: null } }], selectedTakes: [{ shotId, takeId }], compositions: [composition(mainId, "SHOT", mainLayers), composition(preA, "PRECOMP", [layer(preA, "layer_pre_a")]), composition(preB, "PRECOMP", [layer(preB, "layer_pre_b")])] };
      validateEditorialContent(content, { projectId: id, shots: snapshot.shots, assets: snapshot.assets });
      repository.saveEditorial({ projectId: id, expectedRevision: 0, expectedProjectRevision: snapshot.project.revision, requestedAt: now(), content }, key("legacy-first"), ACTOR);
      const second = repository.reviewEditorial(id); if (!unchangedSecondSave) second.editorial.content.compositions[2].name = "Unrelated retained precomp";
      repository.saveEditorial({ projectId: id, expectedRevision: 1, expectedProjectRevision: snapshot.project.revision, requestedAt: now(), content: second.editorial.content }, key("legacy-second"), ACTOR);
      const view = repository.reviewEditorial(id);
      f = { id, snapshot: view.snapshot, legacy: view.editorial, mainId, preA, preB, asset, takeId, media, migration: { operation: "COPY_V1_TO_V2", projectId: id, expectedProjectRevision: snapshot.project.revision, expectedEditorialRevision: 2, requestedAt: now() }, migrationKey: key("migration") };
    });
    f.baseline = projectFiles(f);
    if (migration) f.migrated = instrument(f, {}, root => migrate(root, f.snapshot, f.migration, f.migrationKey, ACTOR));
    return f;
  }
  function editInput(f, changes, extra = {}) { const view = withNative(root => read(root, f.snapshot, f.mainId)); return { operation: "SET_LAYER_PROPERTIES", projectId: f.id, expectedRevision: view.revision, expectedCompositionRevision: view.composition.revision, compositionId: f.mainId, layerId: "layer_main", requestedAt: now(), changes, ...extra }; }
  function timingInput(f) { const input = editInput(f, {}); delete input.changes; return input; }
  function moveInput(f, start, extra = {}) { return { ...timingInput(f), operation: "MOVE_LAYER_TIME", start, ...extra }; }
  function trimInput(f, edge, trimPoint, extra = {}) { return { ...timingInput(f), operation: "TRIM_LAYER_TIME", edge, trimPoint, ...extra }; }
  function splitInput(f, splitPoint, extra = {}) { return { ...timingInput(f), operation: "SPLIT_LAYER_TIME", splitPoint, ...extra }; }
  function entityIndex(f, native, planned = new Map()) {
    const io = { read(hash) { return JSON.parse(planned.get(hash) ?? native.readFile(objectPath(f.id, hash), 1_048_576)); }, stage(value) { const data = bytes(value), hash = sha(data); planned.set(hash, data); return hash; } };
    return { io, planned, entities: editorialV2Index(io, { projectId: f.id, namespace: "entities" }), receipts: editorialV2Index(io, { projectId: f.id, namespace: "receipts" }) };
  }
  function replaceOwned(segments, replacement, label) {
    withNative(root => { const original = root.readFile(segments, 1_048_576); retain(`${label}-${randomUUID()}.json`, { segments, originalBase64: original.toString("base64"), originalSha256: sha(original), replacementBase64: replacement.toString("base64"), replacementSha256: sha(replacement) }); root.writeAtomicReplace(segments, `owned-corruption-${randomUUID()}.tmp`, replacement, original, null, null); });
  }
  function advanceLegacy(f) { using(repository => { const current = repository.reviewEditorial(f.id); current.editorial.content.compositions[2].name = "Competing valid legacy edit"; repository.saveEditorial({ projectId: f.id, expectedRevision: current.editorial.revision, expectedProjectRevision: current.snapshot.project.revision, requestedAt: now(), content: current.editorial.content }, key("legacy-race"), ACTOR); }); }
  const tests = [], results = []; const test = (name, run) => tests.push({ name, run });
  let main;

  test("Read-only entry inspection distinguishes truly absent storage from a ready copy without reading media or creating anything", () => {
    const f = fixture("inspect_absent", false), before = projectFiles(f);
    const absent = instrument(f, {}, root => inspectCopy(root, f.snapshot));
    assert.deepEqual(absent.result.workingCopy, { state: "NOT_CREATED", revision: null, headDigest: null });
    assert.equal(absent.result.legacyPersisted, true); assert.equal(absent.result.legacyRevision, 2); assert.equal(absent.result.projectRevision, f.snapshot.project.revision);
    assert.deepEqual(absent.result.compositions, f.legacy.content.compositions.map(({ compositionId, name, kind }) => ({ compositionId, name, kind })));
    assert.equal(absent.observed.writes.length, 0); assert.ok(absent.observed.reads.every(x => x.path !== f.asset.sourcePath));
    assert.equal(fs.existsSync(path.join(rootPath, ...v2(f.id))), false); assert.deepEqual(projectFiles(f), before);
    withNative(root => migrate(root, f.snapshot, f.migration, f.migrationKey, ACTOR));
    const ready = instrument(f, {}, root => inspectCopy(root, f.snapshot));
    assert.equal(ready.result.workingCopy.state, "READY"); assert.equal(ready.result.workingCopy.revision, 1);
    assert.equal(ready.result.workingCopy.headDigest, sha(fs.readFileSync(path.join(rootPath, ...headPath(f.id)))));
    assert.equal(ready.observed.writes.length, 0); assert.ok(ready.observed.reads.every(x => x.path !== f.asset.sourcePath));
    using(repository => assert.deepEqual(repository.inspectEditorialV2WorkingCopy(f.id), ready.result));
    retain("working-copy-entry-inspection.json", { absent, ready, originalUnchanged: true });
  });
  test("Entry inspection never reports missing-head or partial v2 storage as permission to create another copy", () => {
    const f = fixture("inspect_missing_head"), before = v2Files(f);
    const missing = instrument(f, { hideHead: true }, root => inspectCopy(root, f.snapshot));
    assert.deepEqual(missing.result.workingCopy, { state: "UNAVAILABLE", revision: null, headDigest: null });
    assert.equal(missing.observed.writes.length, 0); assert.deepEqual(v2Files(f), before);
    const partial = fixture("inspect_partial", false);
    withNative(root => root.ensureDirectory(v2(partial.id)));
    const blocked = instrument(partial, {}, root => inspectCopy(root, partial.snapshot));
    assert.equal(blocked.result.workingCopy.state, "UNAVAILABLE"); assert.equal(blocked.observed.writes.length, 0);
    retain("working-copy-entry-partial.json", { missing, blocked });
  });
  test("A later original edit marks its source-bound copy unavailable without rebasing or changing copy history", () => {
    const f = fixture("inspect_stale"), before = v2Files(f); advanceLegacy(f);
    const observed = instrument(f, {}, root => inspectCopy(root, f.snapshot));
    assert.equal(observed.result.legacyRevision, 3); assert.equal(observed.result.workingCopy.state, "UNAVAILABLE");
    assert.equal(observed.observed.writes.length, 0); assert.deepEqual(v2Files(f), before);
    using(repository => assert.equal(repository.inspectEditorialV2WorkingCopy(f.id).workingCopy.state, "UNAVAILABLE"));
    retain("working-copy-entry-stale.json", observed);
  });

  test("Explicit migration copies full validated v1 content to independent entities without changing v1, media, assets or active API", () => {
    main = fixture("main", false); const initial = instrument(main, {}, root => assert.throws(() => read(root, main.snapshot, main.mainId), unavailable)); assert.equal(initial.observed.writes.length, 0);
    const migrated = instrument(main, {}, root => migrate(root, main.snapshot, main.migration, main.migrationKey, ACTOR)); assert.equal(migrated.result.revision, 1);
    assert.deepEqual(projectFiles(main), main.baseline);
    withNative(root => {
      const saved = head(main), a = entityIndex(main, root);
      for (const c of main.legacy.content.compositions) { const selected = read(root, main.snapshot, c.compositionId); assert.deepEqual(compositionV2ToV1Exact(selected.composition), c); }
      for (const t of main.legacy.content.takes) assert.deepEqual(a.io.read(a.entities.get(saved.entityRoot, "take:" + t.takeId)).value, t);
      for (const s of main.legacy.content.selectedTakes) assert.deepEqual(a.io.read(a.entities.get(saved.entityRoot, "selection:" + s.shotId)).value, s);
      assert.equal(saved.anchor.legacyContentDigest, sha(canonical(main.legacy.content))); assert.equal(saved.anchor.legacyRevision, 2);
    });
    using(repository => { assert.deepEqual(repository.reviewEditorial(main.id).editorial, main.legacy); assert.deepEqual(repository.load(main.id), main.snapshot); });
    assert.ok(migrated.observed.writes.every(item => item.path.includes("/editorial-v2/"))); assert.equal(migrated.observed.writes.filter(item => item.format === "studio-editorial-entity-v2").length, 5);
    retain("migration-copy.json", { sourceContentDigest: sha(canonical(main.legacy.content)), migrated, v1AndMediaFilesBefore: main.baseline, v1AndMediaFilesAfter: projectFiles(main) });
  });
  test("Scoped reads load selected composition/direct Take only, no nested/unrelated entity payloads, older journals, v1 history or media", () => {
    const measured = instrument(main, {}, root => read(root, main.snapshot, main.mainId));
    assert.deepEqual(measured.result.media, [{ assetId: main.asset.assetId, version: 1, status: "UNCHECKED" }]); assert.equal(measured.result.nestedCompositionResolution, "NOT_LOADED"); assert.deepEqual(measured.result.timelineFrameRate, { numerator: 24, denominator: 1 });
    assert.deepEqual([...new Set(measured.observed.reads.filter(item => item.format === "studio-editorial-entity-v2").map(item => `${item.kind}:${item.entityId}`))].sort(), [`composition:${main.mainId}`, "take:take_v2_png"].sort());
    assert.ok(measured.observed.reads.every(item => !item.path.includes("/editorial/") && item.path !== main.asset.sourcePath)); assert.equal(measured.observed.writes.length, 0);
    assert.equal(instrument(main, {}, root => read(root, main.snapshot, main.preA)).result.timelineFrameRate, null);
    retain("scoped-read.json", measured);
  });
  test("Migration cannot predate an unchanged v1 save's event tip even when every layer timestamp is older", () => {
    const f = fixture("migration_event_time", false, true), legacyHead = JSON.parse(fs.readFileSync(path.join(rootPath, ...base(f.id), "editorial-head.json")));
    const current = JSON.parse(fs.readFileSync(path.join(rootPath, ...base(f.id), "editorial", legacyHead.recordDigest + ".json")));
    const previous = JSON.parse(fs.readFileSync(path.join(rootPath, ...base(f.id), "editorial", current.previousRecordDigest + ".json")));
    assert.equal(current.revision, 2); assert.deepEqual(current.content, previous.content, "The second save must advance only the editorial event/receipt history.");
    const oldLayerTime = Math.max(...current.content.compositions.flatMap(c => c.layers.map(layer => Date.parse(layer.updatedAt)))), tipTime = Date.parse(current.events.at(-1).at);
    assert.ok(tipTime > oldLayerTime + 1); const between = new Date(Math.floor((oldLayerTime + tipTime) / 2)).toISOString();
    assert.ok(Date.parse(between) > oldLayerTime && Date.parse(between) < tipTime);
    const rejected = instrument(f, {}, root => {
      assert.throws(() => migrate(root, f.snapshot, { ...f.migration, requestedAt: between }, key("migration-before-tip"), ACTOR), errorCode("EDITORIAL_V2_INVALID"));
      assert.throws(() => migrate(root, f.snapshot, { ...f.migration, expectedProjectRevision: -0 }, key("migration-negative-zero"), ACTOR), errorCode("EDITORIAL_V2_INVALID"));
      assert.throws(() => migrate(root, f.snapshot, { ...f.migration, unexpected: true }, key("migration-unknown-field"), ACTOR), errorCode("EDITORIAL_V2_INVALID"));
    });
    assert.equal(rejected.observed.writes.length, 0); assert.equal(fs.existsSync(path.join(rootPath, ...v2(f.id))), false); assert.deepEqual(projectFiles(f), f.baseline);
    const accepted = instrument(f, {}, root => migrate(root, f.snapshot, f.migration, f.migrationKey, ACTOR)); assert.equal(accepted.result.revision, 1); assert.deepEqual(projectFiles(f), f.baseline);
    retain("migration-event-tip-boundary.json", { unchangedSecondContent: true, oldLayerUpdatedAt: new Date(oldLayerTime).toISOString(), rejectedMigrationAt: between, validatedLegacyTipAt: current.events.at(-1).at, acceptedMigrationAt: f.migration.requestedAt, rejection: rejected.observed, accepted });
  });
  test("Opacity/transform/enabled command rewrites one composition plus bounded radix paths, keeps every other entity and approval immutable", () => {
    const before = head(main), input = editInput(main, { opacity: 0.45, enabled: false, transform: { ...defaultLayerTransform(), x: 241, rotationDeg: 8 } });
    const outcome = instrument(main, {}, root => edit(root, main.snapshot, input, key("edit-main"), ACTOR)), after = head(main);
    assert.equal(outcome.result.revision, 2); const entityWrites = outcome.observed.writes.filter(item => item.format === "studio-editorial-entity-v2"); assert.equal(entityWrites.length, 1); assert.equal(entityWrites[0].entityId, main.mainId); assert.ok(outcome.observed.writes.length < 25);
    withNative(root => { const a = entityIndex(main, root); for (const name of [`composition:${main.preA}`, `composition:${main.preB}`, "take:take_v2_png", `selection:${main.snapshot.shots[0].shotId}`]) assert.equal(a.entities.get(before.entityRoot, name), a.entities.get(after.entityRoot, name)); const selected = read(root, main.snapshot, main.mainId); const layer = selected.composition.layers[0]; assert.equal(layer.opacity, 0.45); assert.equal(layer.enabled, false); assert.equal(layer.transform.x, 241); assert.equal(layer.approvalState, "DRAFT"); assert.equal(layer.provenance.providerRequests, 0); assert.equal(selected.composition.approvalState, "DRAFT"); assert.deepEqual(layer.source, main.legacy.content.compositions[0].layers[0].source); });
    assert.deepEqual(projectFiles(main), main.baseline); retain("single-composition-edit.json", { before, after, input, outcome });
  });
  test("Second legacy-record timestamp read remains bound to the already verified pointer despite injected body/digest changes", () => {
    for (const mode of ["changed-body-original-digest", "recomputed-digest-original-pointer"]) {
      const f = fixture(mode === "changed-body-original-digest" ? "second_read_body" : "second_read_digest", false, true), legacyHeadPath = [...base(f.id), "editorial-head.json"], originalHead = fs.readFileSync(path.join(rootPath, ...legacyHeadPath)), pointer = JSON.parse(originalHead);
      const recordPath = [...base(f.id), "editorial", pointer.recordDigest + ".json"], original = fs.readFileSync(path.join(rootPath, ...recordPath)), record = JSON.parse(original);
      const earlier = record.events[0].at, later = record.events.at(-1).at, requestedAt = new Date(Math.floor((Date.parse(earlier) + Date.parse(later)) / 2)).toISOString();
      assert.ok(Date.parse(requestedAt) > Date.parse(earlier) && Date.parse(requestedAt) < Date.parse(later));
      const changed = JSON.parse(original); changed.events.at(-1).at = earlier;
      if (mode === "recomputed-digest-original-pointer") {
        changed.events.at(-1).eventHash = sha(canonical(Object.fromEntries(Object.entries(changed.events.at(-1)).filter(([name]) => name !== "eventHash"))));
        changed.recordDigest = sha(canonical(Object.fromEntries(Object.entries(changed).filter(([name]) => name !== "recordDigest"))));
        assert.notEqual(changed.recordDigest, pointer.recordDigest);
      }
      const injectedBytes = bytes(changed); let latestRecordReads = 0, injectedReads = 0;
      const rejected = instrument(f, { afterRead(args, actual) {
        if (args[0].join("/") === recordPath.join("/") && ++latestRecordReads === 2) { injectedReads++; return injectedBytes; }
        return actual;
      } }, root => assert.throws(() => migrate(root, f.snapshot, { ...f.migration, requestedAt }, f.migrationKey, ACTOR), unavailable));
      assert.equal(latestRecordReads, 2); assert.equal(injectedReads, 1); assert.equal(rejected.observed.writes.length, 0); assert.equal(fs.existsSync(path.join(rootPath, ...v2(f.id))), false);
      const reads = rejected.observed.reads.filter(item => item.path === recordPath.join("/")); assert.equal(reads[0].sha256, sha(original)); assert.equal(reads[1].sha256, sha(injectedBytes));
      assert.deepEqual(fs.readFileSync(path.join(rootPath, ...legacyHeadPath)), originalHead); assert.deepEqual(fs.readFileSync(path.join(rootPath, ...recordPath)), original); assert.deepEqual(projectFiles(f), f.baseline);
      retain(`second-legacy-read-${mode}.json`, { simulatedSecondReadOnly: true, originalNativeHeadAndRecordRetained: true, requestedAt, genuineTipAt: later, injectedTipAt: earlier, originalHeadBase64: originalHead.toString("base64"), originalRecordBase64: original.toString("base64"), injectedRecordBase64: injectedBytes.toString("base64"), latestRecordReads, injectedReads, observed: rejected.observed });
    }
  });
  test("Exact migration and edit receipt replay performs zero native writes; changed request/key payload conflicts", () => {
    const input = editInput(main, { opacity: 0.7 }), operationKey = key("replay"); withNative(root => edit(root, main.snapshot, input, operationKey, ACTOR)); const before = v2Files(main);
    const result = instrument(main, {}, root => { assert.equal(edit(root, main.snapshot, input, operationKey, ACTOR).revision, 3); assert.equal(migrate(root, main.snapshot, main.migration, main.migrationKey, ACTOR).revision, 3); assert.throws(() => edit(root, main.snapshot, { ...input, changes: { opacity: 0.2 } }, operationKey, ACTOR), errorCode("EDITORIAL_V2_CONFLICT")); });
    assert.equal(result.observed.writes.length, 0); assert.deepEqual(v2Files(main), before); retain("write-free-replay.json", result.observed);
  });
  test("Locked layer and unsupported identity/approval properties reject without publication", () => {
    const baseInput = editInput(main, { opacity: 0.1 }), before = v2Files(main);
    const outcome = instrument(main, {}, root => { for (const request of [{ ...baseInput, layerId: "layer_locked" }, { ...baseInput, changes: { source: {} } }, { ...baseInput, changes: { approvalState: "APPROVED" } }, { ...baseInput, changes: { locked: false } }]) assert.throws(() => edit(root, main.snapshot, request, key("invalid-edit"), ACTOR)); });
    assert.equal(outcome.observed.writes.length, 0); assert.deepEqual(v2Files(main), before); retain("locked-and-identity-rejections.json", outcome.observed);
  });
  test("Fresh native roots reopen exact state and bounded history reports partial coverage honestly", () => {
    const first = withNative(root => read(root, main.snapshot, main.mainId)), second = withNative(root => read(root, main.snapshot, main.mainId)); assert.deepEqual(second, first);
    const partial = instrument(main, {}, root => audit(root, main.snapshot, 1)), full = instrument(main, {}, root => audit(root, main.snapshot, 64));
    assert.equal(partial.result.checkedCommits, 1); assert.equal(partial.result.complete, false); assert.match(partial.result.remainingHeadHash, /^[a-f0-9]{64}$/); assert.equal(full.result.checkedCommits, 3); assert.equal(full.result.complete, true); assert.equal(full.result.scope, "COMMIT_INDEX_TRANSITIONS_NOT_ALL_ENTITY_BYTES");
    assert.equal(partial.observed.writes.length + full.observed.writes.length, 0); assert.ok(full.observed.reads.every(item => item.format !== "studio-editorial-entity-v2")); withNative(root => assert.throws(() => audit(root, main.snapshot, 65), errorCode("EDITORIAL_V2_INVALID")));
    const lazy = instrument(main, {}, root => read(root, main.snapshot, main.mainId)); assert.deepEqual([...new Set(lazy.observed.reads.filter(item => item.path.includes("/commits/")).map(item => path.basename(item.path)))], [head(main).journalTip + ".json"]);
    retain("reopen-and-bounded-history.json", { first, second, partial, full, lazyReadAfterThreeCommits: lazy.observed });
  });
  test("Actual simultaneous child-process head CAS has one winner and winner receipt replay writes nothing", async () => {
    const f = fixture("race"), requests = [editInput(f, { opacity: 0.2 }), editInput(f, { opacity: 0.8 })], keys = [key("race-left"), key("race-right")], gate = path.join(evidence, "race-release.json"); let ready = 0;
    const child = index => new Promise((resolve, reject) => {
      const processHandle = spawn(process.execPath, [filename, "--race", namespace, f.id, JSON.stringify(requests[index]), keys[index], gate], { cwd: frontend, env: safeEnv, windowsHide: true, stdio: ["ignore", "pipe", "pipe", "ipc"] });
      let stdout = "", stderr = ""; const timer = setTimeout(() => { processHandle.kill(); reject(new Error("Owned race process timed out.")); }, 35_000);
      processHandle.on("message", message => { if (message.ready && ++ready === 2) fs.writeFileSync(gate, JSON.stringify({ releasedAt: new Date().toISOString(), ready: 2 }), { flag: "wx" }); });
      processHandle.stdout.on("data", chunk => stdout += chunk); processHandle.stderr.on("data", chunk => stderr += chunk); processHandle.on("error", reject);
      processHandle.on("close", code => { clearTimeout(timer); if (code !== 0 || stderr) reject(new Error(stderr || `Child exit ${code}`)); else { try { resolve(JSON.parse(stdout)); } catch (error) { reject(error); } } });
    });
    const outcomes = await Promise.all([child(0), child(1)]); retain("native-race.json", { simulatedGate: true, actualTwoProcessesAndNativeCAS: true, outcomes });
    assert.equal(ready, 2); assert.equal(outcomes.filter(item => item.status === "APPLIED").length, 1); assert.ok(outcomes.every(item => item.networkAttempts.length === 0)); assert.ok(outcomes.some(item => item.observed.nativeErrors.includes("compare_mismatch")));
    const winner = outcomes.findIndex(item => item.status === "APPLIED"), before = v2Files(f), replay = instrument(f, {}, root => edit(root, f.snapshot, requests[winner], keys[winner], ACTOR)); assert.equal(replay.result.revision, 2); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(f), before); assert.deepEqual(projectFiles(f), f.baseline);
  });
  test("Pre-head first-migration interruption retains immutable evidence; only exact request recovers", () => {
    const f = fixture("migration_interrupted", false), failed = instrument(f, { failBeforeHead: true }, root => assert.throws(() => migrate(root, f.snapshot, f.migration, f.migrationKey, ACTOR), unavailable));
    assert.equal(fs.existsSync(path.join(rootPath, ...headPath(f.id))), false); const before = v2Files(f);
    const rejected = instrument(f, {}, root => { assert.throws(() => read(root, f.snapshot, f.mainId), unavailable); assert.throws(() => migrate(root, f.snapshot, f.migration, key("different-migration"), ACTOR), unavailable); });
    assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(v2Files(f), before);
    const recovered = instrument(f, {}, root => migrate(root, f.snapshot, f.migration, f.migrationKey, ACTOR)); assert.equal(recovered.result.revision, 1); assert.equal(recovered.observed.writes.filter(item => item.succeeded).length, 1); assert.deepEqual(v2Files(f).filter(item => item.path !== "head.json"), before); assert.deepEqual(projectFiles(f), f.baseline);
    retain("first-migration-recovery.json", { failure: failed.observed, rejection: rejected.observed, recovery: recovered, retainedBeforeRecovery: before });
  });
  test("Lost acknowledgement after real native head CAS resolves solely through reachable committed receipt", () => {
    const f = fixture("lost_ack"), input = editInput(f, { opacity: 0.6 }), operationKey = key("lost-ack");
    const failed = instrument(f, { loseAck: true }, root => assert.throws(() => edit(root, f.snapshot, input, operationKey, ACTOR), unavailable)); assert.equal(head(f).revision, 2);
    const before = v2Files(f), replay = instrument(f, {}, root => edit(root, f.snapshot, input, operationKey, ACTOR)); assert.equal(replay.result.revision, 2); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(f), before); retain("lost-ack-recovery.json", { failure: failed.observed, replay });
  });
  test("Simulated missing head after later commit cannot rewind migration or create a disconnected history", () => {
    const f = fixture("missing_later"); withNative(root => edit(root, f.snapshot, editInput(f, { opacity: 0.6 }), key("second-commit"), ACTOR)); const before = v2Files(f);
    const hidden = instrument(f, { hideHead: true }, root => { assert.throws(() => read(root, f.snapshot, f.mainId), unavailable); assert.throws(() => migrate(root, f.snapshot, f.migration, f.migrationKey, ACTOR), unavailable); });
    assert.equal(hidden.observed.writes.length, 0); assert.deepEqual(v2Files(f), before); assert.equal(head(f).revision, 2); retain("missing-head-later-history.json", { simulatedMissingReadOnly: true, actualHeadPreserved: true, observed: hidden.observed });
  });
  test("Actual project mutation at final publication trips native fence and preserves old v2 head", () => {
    const f = fixture("project_fence"), input = editInput(f, { opacity: 0.5 }), before = fs.readFileSync(path.join(rootPath, ...headPath(f.id)));
    const outcome = instrument(f, { beforeHead() { using(repository => { const state = repository.load(f.id); repository.reviseProject(f.id, state.project.revision, "Competing project title", state.project.description, key("project-race"), ACTOR, now()); }); } }, root => assert.throws(() => edit(root, f.snapshot, input, key("fenced-edit"), ACTOR), unavailable));
    assert.ok(outcome.observed.nativeErrors.includes("fence_mismatch")); assert.deepEqual(fs.readFileSync(path.join(rootPath, ...headPath(f.id))), before); withNative(root => assert.throws(() => read(root, f.snapshot, f.mainId), unavailable)); retain("project-fence-race.json", { simulatedTiming: true, actualNativeProjectMutationAndFence: true, outcome: outcome.observed, preservedHeadSha256: sha(before) });
  });
  test("Simulated missing head and commit directory with retained objects never masquerades as a fresh migration", () => {
    const f = fixture("missing_commits"), before = v2Files(f);
    const hidden = instrument(f, { hideHead: true, hideCommits: true }, root => assert.throws(() => migrate(root, f.snapshot, f.migration, f.migrationKey, ACTOR), unavailable));
    assert.equal(hidden.observed.writes.length, 0); assert.deepEqual(v2Files(f), before); retain("missing-head-and-commit-evidence.json", { simulatedMissingReadOnly: true, actualAllFilesPreserved: true, observed: hidden.observed });
  });
  test("Legacy precheck mutation rejects before writes; post-CAS legacy advance leaves preserved but unavailable stale branch", () => {
    const beforeFixture = fixture("legacy_pre"), input = editInput(beforeFixture, { opacity: 0.4 }), beforeHead = fs.readFileSync(path.join(rootPath, ...headPath(beforeFixture.id))); advanceLegacy(beforeFixture);
    const rejected = instrument(beforeFixture, {}, root => assert.throws(() => edit(root, beforeFixture.snapshot, input, key("legacy-pre"), ACTOR), unavailable)); assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(fs.readFileSync(path.join(rootPath, ...headPath(beforeFixture.id))), beforeHead);
    const afterFixture = fixture("legacy_post"), postInput = editInput(afterFixture, { opacity: 0.4 }), postKey = key("legacy-post");
    const failed = instrument(afterFixture, { afterHead() { advanceLegacy(afterFixture); } }, root => assert.throws(() => edit(root, afterFixture.snapshot, postInput, postKey, ACTOR), unavailable)); assert.equal(head(afterFixture).revision, 2);
    const retained = v2Files(afterFixture), retry = instrument(afterFixture, {}, root => { assert.throws(() => read(root, afterFixture.snapshot, afterFixture.mainId), unavailable); assert.throws(() => edit(root, afterFixture.snapshot, postInput, postKey, ACTOR), unavailable); }); assert.equal(retry.observed.writes.length, 0); assert.deepEqual(v2Files(afterFixture), retained);
    retain("legacy-anchor-races.json", { simulatedInterleavingsWithActualNativeLegacyWrites: true, atomicDoubleFenceClaimed: false, precheck: rejected.observed, postCommit: failed.observed, retry: retry.observed });
  });
  test("Selected immutable payload hash corruption and BOM fail closed; original synthetic bytes are retained", () => {
    for (const mode of ["hash", "bom"]) { const f = fixture(`corrupt_${mode}`); const selected = withNative(root => { const a = entityIndex(f, root); return a.entities.get(head(f).entityRoot, "composition:" + f.mainId); }); const original = fs.readFileSync(path.join(rootPath, ...objectPath(f.id, selected)));
      replaceOwned(objectPath(f.id, selected), mode === "bom" ? Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), original]) : Buffer.from("{}"), `selected-${mode}`);
      const failed = instrument(f, {}, root => assert.throws(() => read(root, f.snapshot, f.mainId), unavailable)); assert.equal(failed.observed.writes.length, 0);
    }
  });
  test("Digest-consistent forged selected entity project identity is rejected after full index/head reconstruction", () => {
    const f = fixture("foreign_identity"), saved = head(f), oldHeadBytes = fs.readFileSync(path.join(rootPath, ...headPath(f.id)));
    withNative(root => {
      const a = entityIndex(f, root), priorHash = a.entities.get(saved.entityRoot, "composition:" + f.mainId), entity = a.io.read(priorHash); entity.value.projectId = "project_foreign";
      const entityHash = a.io.stage(entity), entityRoot = a.entities.set(saved.entityRoot, "composition:" + f.mainId, entityHash), originalJournalBytes = root.readFile(commitPath(f.id, saved.journalTip), 1_048_576), j = JSON.parse(originalJournalBytes); j.afterEntityRoot = entityRoot;
      const journalBytes = bytes(j), journalHash = sha(journalBytes), receiptRoot = a.receipts.set(null, j.keyHash, journalHash), newHead = { ...saved, entityRoot, receiptRoot, journalTip: journalHash };
      retain("foreign-identity-original.json", { originalHeadBase64: oldHeadBytes.toString("base64"), originalJournalBase64: originalJournalBytes.toString("base64"), originalEntityHash: priorHash, forgedEntityHash: entityHash, forgedJournalHash: journalHash, forgedHead: newHead });
      for (const [hash, data] of a.planned) { try { root.writeAtomicExclusive(objectPath(f.id, hash), `forged-${randomUUID()}.tmp`, data); } catch (error) { if (error.code !== "already_exists" || !root.readFile(objectPath(f.id, hash), 1_048_576).equals(data)) throw error; } }
      root.writeAtomicExclusive(commitPath(f.id, journalHash), `forged-journal-${randomUUID()}.tmp`, journalBytes); root.writeAtomicReplace(headPath(f.id), `forged-head-${randomUUID()}.tmp`, bytes(newHead), oldHeadBytes, null, null);
    });
    const rejected = instrument(f, {}, root => assert.throws(() => read(root, f.snapshot, f.mainId), unavailable)); assert.equal(rejected.observed.writes.length, 0); retain("foreign-identity-rejection.json", rejected.observed);
  });
  test("Actual repository facade migrates, reviews, edits and audits bounded v2 state that survives reopen without legacy cutover", () => {
    const f = fixture("repository_facade", false), operationKey = key("facade-edit"); let request, savedView, partialAudit, completeAudit;
    using(repository => {
      for (const method of ["migrateEditorialV2", "reviewEditorialV2Composition", "editEditorialV2Layer", "auditEditorialV2History"]) assert.equal(typeof repository[method], "function");
      assert.throws(() => repository.reviewEditorialV2Composition(f.id, f.mainId), unavailable);
      const migrated = repository.migrateEditorialV2(f.migration, f.migrationKey, ACTOR); assert.equal(migrated.revision, 1); assert.equal(migrated.providerRequests, 0); assert.equal(migrated.generationAllowed, false);
      const selected = repository.reviewEditorialV2Composition(f.id, f.mainId); assert.equal(selected.revision, 1); assert.deepEqual(compositionV2ToV1Exact(selected.composition), f.legacy.content.compositions[0]); assert.equal(selected.media[0].status, "UNCHECKED");
      request = { operation: "SET_LAYER_PROPERTIES", projectId: f.id, expectedRevision: selected.revision, expectedCompositionRevision: selected.composition.revision, compositionId: f.mainId, layerId: "layer_main", requestedAt: now(), changes: { opacity: 0.35, enabled: false } };
      const edited = repository.editEditorialV2Layer(request, operationKey, ACTOR); assert.equal(edited.revision, 2); assert.equal(edited.providerRequests, 0); assert.equal(edited.generationAllowed, false);
      savedView = repository.reviewEditorialV2Composition(f.id, f.mainId); assert.equal(savedView.revision, 2); assert.equal(savedView.composition.revision, selected.composition.revision + 1); assert.equal(savedView.composition.layers[0].opacity, 0.35); assert.equal(savedView.composition.layers[0].enabled, false);
      partialAudit = repository.auditEditorialV2History(f.id, 1); assert.equal(partialAudit.checkedCommits, 1); assert.equal(partialAudit.complete, false); assert.match(partialAudit.remainingHeadHash, /^[a-f0-9]{64}$/);
      completeAudit = repository.auditEditorialV2History(f.id, 64); assert.equal(completeAudit.checkedCommits, 2); assert.equal(completeAudit.complete, true); assert.equal(completeAudit.remainingHeadHash, null); assert.equal(completeAudit.scope, "COMMIT_INDEX_TRANSITIONS_NOT_ALL_ENTITY_BYTES");
      const beforeRejectedAndReplay = v2Files(f);
      assert.throws(() => repository.auditEditorialV2History(f.id, 65), errorCode("EDITORIAL_V2_INVALID"));
      assert.throws(() => repository.editEditorialV2Layer({ ...request, changes: { opacity: 0.9 } }, key("facade-stale"), ACTOR), errorCode("EDITORIAL_V2_CONFLICT"));
      assert.equal(repository.editEditorialV2Layer(request, operationKey, ACTOR).revision, 2); assert.deepEqual(v2Files(f), beforeRejectedAndReplay);
      assert.deepEqual(repository.reviewEditorial(f.id).editorial, f.legacy); assert.deepEqual(repository.load(f.id), f.snapshot);
    });
    const beforeReopen = v2Files(f);
    using(repository => { assert.deepEqual(repository.reviewEditorialV2Composition(f.id, f.mainId), savedView); assert.deepEqual(repository.auditEditorialV2History(f.id, 64), completeAudit); assert.equal(repository.editEditorialV2Layer(request, operationKey, ACTOR).revision, 2); assert.deepEqual(repository.reviewEditorial(f.id).editorial, f.legacy); assert.deepEqual(repository.load(f.id), f.snapshot); });
    assert.deepEqual(v2Files(f), beforeReopen); assert.deepEqual(projectFiles(f), f.baseline);
    retain("repository-facade-reopen.json", { actualOpenStudioRepository: true, closedAndReopened: true, savedView, partialAudit, completeAudit, v1AndMediaUnchanged: true, replayAndRejectedRequestsPreservedAllV2BytesAndTimestamps: true, finalV2Files: beforeReopen });
  });
  test("Exact rational move changes only one layer start and revision metadata; facade reopen and receipt replay preserve immutable source and history", () => {
    const f = fixture("move_exact"), before = withNative(root => read(root, f.snapshot, f.mainId)), savedHead = head(f), input = moveInput(f, { numerator: 1, denominator: 3 }), operationKey = key("move-exact");
    const outcome = instrument(f, {}, root => edit(root, f.snapshot, input, operationKey, ACTOR));
    assert.equal(outcome.result.revision, 2); assert.equal(outcome.result.providerRequests, 0); assert.equal(outcome.result.generationAllowed, false);
    const after = withNative(root => read(root, f.snapshot, f.mainId)), expected = JSON.parse(JSON.stringify(before.composition));
    expected.layers[0].start = input.start; expected.layers[0].version++; expected.layers[0].updatedAt = input.requestedAt; expected.revision++;
    assert.deepEqual(after.composition, expected); assert.deepEqual(after.takes, before.takes); assert.deepEqual(after.media, before.media);
    assert.equal(outcome.observed.writes.filter(item => item.format === "studio-editorial-entity-v2").length, 1);
    withNative(root => { const a = entityIndex(f, root); for (const name of [`composition:${f.preA}`, `composition:${f.preB}`, "take:take_v2_png", `selection:${f.snapshot.shots[0].shotId}`]) assert.equal(a.entities.get(savedHead.entityRoot, name), a.entities.get(head(f).entityRoot, name)); });
    const journal = JSON.parse(fs.readFileSync(path.join(rootPath, ...commitPath(f.id, head(f).journalTip)))); assert.equal(journal.operation, "MOVE_LAYER_TIME"); assert.equal(journal.providerRequests, 0);
    const immutableFiles = v2Files(f), retry = instrument(f, {}, root => edit(root, f.snapshot, input, operationKey, ACTOR)); assert.equal(retry.result.revision, 2); assert.equal(retry.observed.writes.length, 0);
    using(repository => { assert.deepEqual(repository.reviewEditorialV2Composition(f.id, f.mainId), after); assert.equal(repository.editEditorialV2Layer(input, operationKey, ACTOR).revision, 2); const full = repository.auditEditorialV2History(f.id, 64); assert.equal(full.complete, true); assert.equal(full.checkedCommits, 2); });
    assert.deepEqual(v2Files(f), immutableFiles); assert.deepEqual(projectFiles(f), f.baseline);
    retain("move-exact-reopen-replay.json", { input, before, after, journal, outcome, retry, sourceAndOriginalUnchanged: true });
  });
  test("Move rejects malformed noncanonical no-op out-of-bounds locked stale and identity-changing requests without writes", () => {
    const f = fixture("move_rejected"), input = moveInput(f, { numerator: 1, denominator: 3 }), before = v2Files(f);
    const bad = [null, [], {}, { numerator: 1, denominator: 0 }, { numerator: -1, denominator: 3 }, { numerator: 1.5, denominator: 3 }, { numerator: 2, denominator: 6 }, { numerator: 0, denominator: 3 }, { numerator: "1", denominator: 3 }, { numerator: 1, denominator: 3, extra: 0 }, { numerator: 1, denominator: 8 }, { numerator: 2, denominator: 1 }].map(start => ({ ...input, start }));
    bad.push({ ...input, layerId: "layer_locked" }, { ...input, layerId: "layer_missing" }, { ...input, changes: { opacity: 0 } }, { ...input, sourceOffset: { numerator: 0, denominator: 1 } }, { ...input, requestedAt: "2026-01-01T00:00:00.000Z" });
    const rejected = instrument(f, {}, root => { for (const body of bad) assert.throws(() => edit(root, f.snapshot, body, key("move-bad"), ACTOR), errorCode("EDITORIAL_V2_INVALID")); for (const changes of [{ expectedRevision: 2 }, { expectedCompositionRevision: 99 }]) assert.throws(() => edit(root, f.snapshot, { ...input, ...changes }, key("move-stale"), ACTOR), errorCode("EDITORIAL_V2_CONFLICT")); });
    assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(v2Files(f), before); assert.deepEqual(projectFiles(f), f.baseline);
    // request() first snapshots the entire untrusted JSON value. Its documented
    // fail-fast numeric-range guard rejects unsafe values before operation-specific
    // rational validation or any native storage access; retain that distinct class.
    const early = instrument(f, {}, root => {
      for (const field of ["numerator", "denominator"]) assert.throws(() => edit(root, f.snapshot, { ...input, start: { ...input.start, [field]: 9007199254740992 } }, key("move-unsafe-number"), ACTOR), error => {
        assert.ok(error instanceof StudioValidationError);
        assert.deepEqual(error.issues.map(({ path, code }) => ({ path, code })), [{ path: `$["start"]["${field}"]`, code: "INVALID_NUMBER" }]); return true;
      });
    });
    assert.deepEqual(early.observed, { reads: [], writes: [], statCalls: [], listCalls: [], injected: [], nativeErrors: [] }); assert.deepEqual(v2Files(f), before);
    // Exact last legal start is composition 3 minus unchanged duration 7/4 = 5/4.
    const edge = { ...input, start: { numerator: 5, denominator: 4 } }; using(repository => assert.equal(repository.editEditorialV2Layer(edge, key("move-edge"), ACTOR).revision, 2));
    const after = v2Files(f); withNative(root => assert.throws(() => edit(root, f.snapshot, input, key("move-old-revision"), ACTOR), errorCode("EDITORIAL_V2_CONFLICT"))); assert.deepEqual(v2Files(f), after);
    retain("move-rejection-boundaries.json", { rejectedCases: bad.length + 4, rejected: rejected.observed, earliestUnsafeNumericRejections: { cases: 2, errorClass: "StudioValidationError", issueCode: "INVALID_NUMBER", nativeAccess: early.observed }, exactEndBoundary: edge.start, originalUnchanged: true });
  });
  test("Moved layer lost acknowledgement recovers via exact receipt only and changed same-key requests conflict", () => {
    const f = fixture("move_lost_ack"), input = moveInput(f, { numerator: 0, denominator: 1 }), operationKey = key("move-ack");
    const failure = instrument(f, { loseAck: true }, root => assert.throws(() => edit(root, f.snapshot, input, operationKey, ACTOR), unavailable)); assert.equal(head(f).revision, 2);
    const before = v2Files(f), replay = instrument(f, {}, root => { assert.equal(edit(root, f.snapshot, input, operationKey, ACTOR).revision, 2); assert.throws(() => edit(root, f.snapshot, { ...input, start: { numerator: 1, denominator: 3 } }, operationKey, ACTOR), errorCode("EDITORIAL_V2_CONFLICT")); });
    assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(f), before); assert.deepEqual(projectFiles(f), f.baseline); retain("move-lost-ack.json", { failure: failure.observed, replay: replay.observed });
  });
  test("Actual competing move processes publish one native CAS winner; exact winning request replays without writes", async () => {
    const f = fixture("move_race"), requests = [moveInput(f, { numerator: 1, denominator: 3 }), moveInput(f, { numerator: 1, denominator: 2 })], keys = [key("move-race-left"), key("move-race-right")], gate = path.join(evidence, "move-race-release.json"); let ready = 0;
    const child = index => new Promise((resolve, reject) => {
      const processHandle = spawn(process.execPath, [filename, "--race", namespace, f.id, JSON.stringify(requests[index]), keys[index], gate], { cwd: frontend, env: safeEnv, windowsHide: true, stdio: ["ignore", "pipe", "pipe", "ipc"] });
      let stdout = "", stderr = ""; const timer = setTimeout(() => { processHandle.kill(); reject(new Error("Owned move race process timed out.")); }, 35_000);
      processHandle.on("message", message => { if (message.ready && ++ready === 2) fs.writeFileSync(gate, JSON.stringify({ releasedAt: new Date().toISOString(), ready: 2 }), { flag: "wx" }); });
      processHandle.stdout.on("data", chunk => stdout += chunk); processHandle.stderr.on("data", chunk => stderr += chunk); processHandle.on("error", reject);
      processHandle.on("close", code => { clearTimeout(timer); if (code !== 0 || stderr) reject(new Error(stderr || `Child exit ${code}`)); else { try { resolve(JSON.parse(stdout)); } catch (error) { reject(error); } } });
    });
    const outcomes = await Promise.all([child(0), child(1)]); retain("move-native-race.json", { simulatedGate: true, actualTwoProcessesAndNativeCAS: true, outcomes });
    assert.equal(ready, 2); assert.equal(outcomes.filter(item => item.status === "APPLIED").length, 1); assert.ok(outcomes.every(item => item.networkAttempts.length === 0)); assert.ok(outcomes.some(item => item.observed.nativeErrors.includes("compare_mismatch")));
    const winner = outcomes.findIndex(item => item.status === "APPLIED"), before = v2Files(f), replay = instrument(f, {}, root => edit(root, f.snapshot, requests[winner], keys[winner], ACTOR));
    assert.equal(replay.result.revision, 2); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(withNative(root => read(root, f.snapshot, f.mainId)).composition.layers[0].start, requests[winner].start); assert.deepEqual(v2Files(f), before); assert.deepEqual(projectFiles(f), f.baseline);
  });
  test("Move retains original project fence and fails closed against a changed legacy source anchor", () => {
    const f = fixture("move_source_stale"), input = moveInput(f, { numerator: 1, denominator: 3 }), before = v2Files(f); advanceLegacy(f);
    const rejected = instrument(f, {}, root => assert.throws(() => edit(root, f.snapshot, input, key("move-stale-source"), ACTOR), unavailable)); assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(v2Files(f), before);
    const fenced = fixture("move_project_fence"), request = moveInput(fenced, { numerator: 1, denominator: 3 }), oldHead = fs.readFileSync(path.join(rootPath, ...headPath(fenced.id)));
    const race = instrument(fenced, { beforeHead() { using(repository => { const state = repository.load(fenced.id); repository.reviseProject(fenced.id, state.project.revision, "Synthetic competing move project", state.project.description, key("move-fence"), ACTOR, now()); }); } }, root => assert.throws(() => edit(root, fenced.snapshot, request, key("move-fenced"), ACTOR), unavailable));
    assert.ok(race.observed.nativeErrors.includes("fence_mismatch")); assert.deepEqual(fs.readFileSync(path.join(rootPath, ...headPath(fenced.id))), oldHead); retain("move-source-and-project-fences.json", { source: rejected.observed, nativeProjectFence: race.observed });
  });
  test("Exact IN and OUT trims publish one composition while preserving retained source identity and replaying without writes", () => {
    const cases = [
      { label: "trim_in", edge: "IN", trimPoint: { numerator: 1, denominator: 2 }, layerId: "layer_nested", timing: { start: { numerator: 1, denominator: 2 }, duration: { numerator: 11, denominator: 8 }, sourceOffset: { numerator: 3, denominator: 8 } } },
      { label: "trim_out", edge: "OUT", trimPoint: { numerator: 3, denominator: 2 }, layerId: "layer_main", timing: { start: { numerator: 1, denominator: 8 }, duration: { numerator: 11, denominator: 8 }, sourceOffset: { numerator: 0, denominator: 1 } } },
    ];
    for (const item of cases) {
      const f = fixture(item.label), before = withNative(root => read(root, f.snapshot, f.mainId)), savedHead = head(f), input = trimInput(f, item.edge, item.trimPoint, { layerId: item.layerId }), operationKey = key(item.label);
      const priorLayer = before.composition.layers.find(layer => layer.layerId === item.layerId), priorSource = clone(priorLayer.source), outcome = instrument(f, {}, root => edit(root, f.snapshot, input, operationKey, ACTOR));
      assert.equal(outcome.result.revision, 2); assert.equal(outcome.result.providerRequests, 0); assert.equal(outcome.result.generationAllowed, false);
      const after = withNative(root => read(root, f.snapshot, f.mainId)), expected = clone(before.composition), expectedLayer = expected.layers.find(layer => layer.layerId === item.layerId);
      Object.assign(expectedLayer, clone(item.timing)); expectedLayer.version++; expectedLayer.updatedAt = input.requestedAt; expected.revision++;
      assert.deepEqual(after.composition, expected); assert.deepEqual(after.takes, before.takes); assert.deepEqual(after.media, before.media);
      const savedLayer = after.composition.layers.find(layer => layer.layerId === item.layerId); assert.deepEqual(savedLayer.source, priorSource); assert.equal(savedLayer.locked, priorLayer.locked); assert.equal(savedLayer.approvalState, priorLayer.approvalState); assert.deepEqual(savedLayer.keyframes, priorLayer.keyframes);
      assert.equal(outcome.observed.writes.filter(entry => entry.format === "studio-editorial-entity-v2").length, 1);
      withNative(root => { const a = entityIndex(f, root); for (const name of [`composition:${f.preA}`, `composition:${f.preB}`, "take:take_v2_png", `selection:${f.snapshot.shots[0].shotId}`]) assert.equal(a.entities.get(savedHead.entityRoot, name), a.entities.get(head(f).entityRoot, name)); });
      const savedJournal = JSON.parse(fs.readFileSync(path.join(rootPath, ...commitPath(f.id, head(f).journalTip)))); assert.equal(savedJournal.operation, "TRIM_LAYER_TIME"); assert.equal(savedJournal.providerRequests, 0); assert.equal(savedJournal.generationAllowed, false);
      const immutableFiles = v2Files(f), replay = instrument(f, {}, root => { assert.equal(edit(root, f.snapshot, input, operationKey, ACTOR).revision, 2); assert.throws(() => edit(root, f.snapshot, { ...input, trimPoint: { numerator: 2, denominator: 3 } }, operationKey, ACTOR), errorCode("EDITORIAL_V2_CONFLICT")); });
      assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(f), immutableFiles); assert.deepEqual(projectFiles(f), f.baseline);
      using(repository => { assert.deepEqual(repository.reviewEditorialV2Composition(f.id, f.mainId), after); assert.equal(repository.editEditorialV2Layer(input, operationKey, ACTOR).revision, 2); const full = repository.auditEditorialV2History(f.id, 64); assert.equal(full.complete, true); assert.equal(full.checkedCommits, 2); });
      retain(`${item.label}-exact-reopen-replay.json`, { input, before, after, journal: savedJournal, outcome, replay, originalAndSourceIdentityUnchanged: true });
    }
  });
  test("Trim rejects non-internal malformed locked stale and identity-changing requests without native writes", () => {
    const f = fixture("trim_rejected"), input = trimInput(f, "IN", { numerator: 1, denominator: 2 }, { layerId: "layer_nested" }), before = v2Files(f);
    const bad = [
      { ...input, edge: "START" }, { ...input, edge: "in" }, { ...input, edge: null },
      ...[null, [], {}, { numerator: 1 }, { numerator: 1, denominator: 0 }, { numerator: -1, denominator: 2 }, { numerator: 1.5, denominator: 2 }, { numerator: 2, denominator: 4 }, { numerator: 0, denominator: 2 }, { numerator: "1", denominator: 2 }, { numerator: 1, denominator: "2" }, { numerator: 1, denominator: 2, extra: 0 }, { numerator: 0, denominator: 1 }, { numerator: 1, denominator: 8 }, { numerator: 15, denominator: 8 }, { numerator: 2, denominator: 1 }].map(trimPoint => ({ ...input, trimPoint })),
      { ...input, edge: "OUT", trimPoint: { numerator: 1, denominator: 8 } }, { ...input, edge: "OUT", trimPoint: { numerator: 15, denominator: 8 } },
      { ...input, layerId: "layer_locked" }, { ...input, layerId: "layer_missing" }, { ...input, start: { numerator: 0, denominator: 1 } }, { ...input, duration: { numerator: 1, denominator: 1 } }, { ...input, sourceOffset: { numerator: 0, denominator: 1 } }, { ...input, requestedAt: "2026-01-01T00:00:00.000Z" },
    ];
    const rejected = instrument(f, {}, root => { for (const body of bad) assert.throws(() => edit(root, f.snapshot, body, key("trim-bad"), ACTOR), errorCode("EDITORIAL_V2_INVALID")); for (const changes of [{ expectedRevision: 2 }, { expectedCompositionRevision: 99 }]) assert.throws(() => edit(root, f.snapshot, { ...input, ...changes }, key("trim-stale"), ACTOR), errorCode("EDITORIAL_V2_CONFLICT")); });
    assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(v2Files(f), before); assert.deepEqual(projectFiles(f), f.baseline);
    const early = instrument(f, {}, root => { for (const field of ["numerator", "denominator"]) assert.throws(() => edit(root, f.snapshot, { ...input, trimPoint: { ...input.trimPoint, [field]: 9007199254740992 } }, key("trim-unsafe-number"), ACTOR), error => { assert.ok(error instanceof StudioValidationError); assert.deepEqual(error.issues.map(({ path, code }) => ({ path, code })), [{ path: `$["trimPoint"]["${field}"]`, code: "INVALID_NUMBER" }]); return true; }); });
    assert.deepEqual(early.observed, { reads: [], writes: [], statCalls: [], listCalls: [], injected: [], nativeErrors: [] }); assert.deepEqual(v2Files(f), before);
    retain("trim-rejection-boundaries.json", { rejectedCases: bad.length + 4, rejected: rejected.observed, earliestUnsafeNumericRejections: { cases: 2, errorClass: "StudioValidationError", issueCode: "INVALID_NUMBER", nativeAccess: early.observed }, strictSavedInterval: { start: { numerator: 1, denominator: 8 }, end: { numerator: 15, denominator: 8 } }, originalUnchanged: true });
  });
  test("Example A reaches the accepted trim timing, then atomically splits one VIDEO into exact adjacent source-continuous segments", () => {
    const f = fixture("split_example_a", true, false, { video: true, startUs: 0, durationUs: 2_000_000, sourceOffsetUs: 0, opacity: 0.625 });
    const trimRequest = trimInput(f, "IN", { numerator: 1, denominator: 3 }), trimKey = key("split-a-prerequisite-trim");
    withNative(root => edit(root, f.snapshot, trimRequest, trimKey, ACTOR));
    const acceptedTrim = withNative(root => read(root, f.snapshot, f.mainId)), original = clone(acceptedTrim.composition.layers[0]);
    assert.deepEqual({ start: original.start, duration: original.duration, sourceOffset: original.sourceOffset }, { start: { numerator: 1, denominator: 3 }, duration: { numerator: 5, denominator: 3 }, sourceOffset: { numerator: 1, denominator: 3 } });
    const splitRequest = splitInput(f, { numerator: 1, denominator: 1 }), splitKey = key("split-a"), beforeHead = head(f), beforeV2 = v2Files(f);
    const applied = instrument(f, {}, root => edit(root, f.snapshot, splitRequest, splitKey, ACTOR));
    assert.equal(applied.result.revision, 3); assert.equal(applied.result.providerRequests, 0); assert.equal(applied.result.generationAllowed, false);
    assert.equal(applied.observed.writes.filter(entry => entry.format === "studio-editorial-entity-v2").length, 1);
    const reopened = withNative(root => read(root, f.snapshot, f.mainId)), layers = reopened.composition.layers, left = layers[0], right = layers[1];
    assert.deepEqual(layers.map(layer => layer.layerId).slice(2), acceptedTrim.composition.layers.slice(1).map(layer => layer.layerId));
    assert.equal(left.layerId, original.layerId); assert.match(right.layerId, /^layer_[a-z0-9]+(?:_[a-z0-9]+)*$/u); assert.notEqual(right.layerId, left.layerId); assert.equal(new Set(layers.map(layer => layer.layerId)).size, layers.length);
    assert.deepEqual({ start: left.start, duration: left.duration, sourceOffset: left.sourceOffset }, { start: { numerator: 1, denominator: 3 }, duration: { numerator: 2, denominator: 3 }, sourceOffset: { numerator: 1, denominator: 3 } });
    assert.deepEqual({ start: right.start, duration: right.duration, sourceOffset: right.sourceOffset }, { start: { numerator: 1, denominator: 1 }, duration: { numerator: 1, denominator: 1 }, sourceOffset: { numerator: 1, denominator: 1 } });
    for (const field of ["compositionId", "name", "type", "source", "enabled", "locked", "solo", "playbackRate", "reverse", "transform", "opacity", "keyframes", "approvalState", "provenance"]) { assert.deepEqual(left[field], original[field], `left ${field}`); assert.deepEqual(right[field], original[field], `right ${field}`); }
    assert.equal(left.createdAt, original.createdAt); assert.equal(left.updatedAt, splitRequest.requestedAt); assert.equal(left.version, original.version + 1); assert.equal(right.createdAt, splitRequest.requestedAt); assert.equal(right.updatedAt, splitRequest.requestedAt); assert.equal(right.version, 1);
    assert.deepEqual(reopened.takes, acceptedTrim.takes); assert.deepEqual(reopened.media, acceptedTrim.media); assert.deepEqual(reopened.composition.duration, acceptedTrim.composition.duration); assert.equal(reopened.composition.revision, acceptedTrim.composition.revision + 1);
    const journal = JSON.parse(fs.readFileSync(path.join(rootPath, ...commitPath(f.id, head(f).journalTip)))); assert.equal(journal.operation, "SPLIT_LAYER_TIME"); assert.equal(journal.change.key, `composition:${f.mainId}`); assert.equal(journal.beforeEntityRoot, beforeHead.entityRoot); assert.equal(journal.providerRequests, 0); assert.equal(journal.generationAllowed, false);
    const afterSplitFiles = v2Files(f), replay = instrument(f, {}, root => edit(root, f.snapshot, splitRequest, splitKey, ACTOR)); assert.equal(replay.result.revision, 3); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(f), afterSplitFiles); assert.equal(withNative(root => read(root, f.snapshot, f.mainId)).composition.layers.length, layers.length);
    const staleKey = key("split-a-stale"); const stale = instrument(f, {}, root => { assert.throws(() => edit(root, f.snapshot, splitRequest, staleKey, ACTOR), errorCode("EDITORIAL_V2_CONFLICT")); assert.throws(() => edit(root, f.snapshot, splitRequest, staleKey, ACTOR), errorCode("EDITORIAL_V2_CONFLICT")); }); assert.equal(stale.observed.writes.length, 0);
    const moveRight = moveInput(f, { numerator: 3, denominator: 2 }, { layerId: right.layerId }), movedResult = withNative(root => edit(root, f.snapshot, moveRight, key("split-a-move-right"), ACTOR)); assert.equal(movedResult.revision, 4);
    const afterMove = withNative(root => read(root, f.snapshot, f.mainId)); assert.deepEqual(afterMove.composition.layers[0], left); assert.deepEqual(afterMove.composition.layers[1].start, { numerator: 3, denominator: 2 });
    const trimLeft = trimInput(f, "OUT", { numerator: 2, denominator: 3 }, { layerId: left.layerId }); withNative(root => edit(root, f.snapshot, trimLeft, key("split-a-trim-left"), ACTOR));
    const independentlyEdited = withNative(root => read(root, f.snapshot, f.mainId)); assert.deepEqual(independentlyEdited.composition.layers[1], afterMove.composition.layers[1]); assert.deepEqual(independentlyEdited.composition.layers[0].duration, { numerator: 1, denominator: 3 });
    using(repository => { assert.deepEqual(repository.reviewEditorial(f.id).editorial, f.legacy); const history = repository.auditEditorialV2History(f.id, 64); assert.equal(history.complete, true); assert.equal(history.checkedCommits, 5); });
    withNative(root => assert.equal(sha(root.readFile(f.asset.sourcePath.split("/"), 1_048_576)), sha(f.media)));
    assert.deepEqual(projectFiles(f), f.baseline); retain("split-example-a-atomic-reopen-replay.json", { trimRequest, splitRequest, acceptedTrim, reopened, applied, replay, stale, independentlyEdited, sourceSha256: sha(f.media), beforeV2Files: beforeV2.length, afterV2Files: afterSplitFiles.length });
  });
  test("Example B preserves the complete source interval after the accepted OUT trim and exact split", () => {
    const f = fixture("split_example_b", true, false, { video: true, startUs: 1_000_000, durationUs: 2_000_000, sourceOffsetUs: 500_000 });
    const trimRequest = trimInput(f, "OUT", { numerator: 5, denominator: 2 }); withNative(root => edit(root, f.snapshot, trimRequest, key("split-b-prerequisite-trim"), ACTOR));
    const acceptedTrim = withNative(root => read(root, f.snapshot, f.mainId)), original = clone(acceptedTrim.composition.layers[0]);
    assert.deepEqual({ start: original.start, duration: original.duration, sourceOffset: original.sourceOffset }, { start: { numerator: 1, denominator: 1 }, duration: { numerator: 3, denominator: 2 }, sourceOffset: { numerator: 1, denominator: 2 } });
    const request = splitInput(f, { numerator: 7, denominator: 4 }), result = withNative(root => edit(root, f.snapshot, request, key("split-b"), ACTOR)); assert.equal(result.revision, 3);
    const reopened = withNative(root => read(root, f.snapshot, f.mainId)), [left, right] = reopened.composition.layers;
    assert.deepEqual({ start: left.start, duration: left.duration, sourceOffset: left.sourceOffset }, { start: { numerator: 1, denominator: 1 }, duration: { numerator: 3, denominator: 4 }, sourceOffset: { numerator: 1, denominator: 2 } });
    assert.deepEqual({ start: right.start, duration: right.duration, sourceOffset: right.sourceOffset }, { start: { numerator: 7, denominator: 4 }, duration: { numerator: 3, denominator: 4 }, sourceOffset: { numerator: 5, denominator: 4 } });
    assert.deepEqual(right.source, original.source); assert.equal(right.name, original.name); assert.equal(reopened.composition.layers[2].layerId, "layer_locked"); assert.equal(reopened.composition.layers[3].layerId, "layer_nested");
    using(repository => assert.deepEqual(repository.reviewEditorial(f.id).editorial, f.legacy)); withNative(root => assert.equal(sha(root.readFile(f.asset.sourcePath.split("/"), 1_048_576)), sha(f.media)));
    assert.deepEqual(projectFiles(f), f.baseline); retain("split-example-b-reopen.json", { trimRequest, request, acceptedTrim, reopened, sourceSha256: sha(f.media) });
  });
  test("Split rejects unsupported, locked, boundary, stale and capacity cases and pre-head failure exposes no half-split", () => {
    const f = fixture("split_rejections", true, false, { video: true, startUs: 0, durationUs: 2_000_000, sourceOffsetUs: 0 }), input = splitInput(f, { numerator: 1, denominator: 1 }), before = v2Files(f);
    const rejected = instrument(f, {}, root => {
      for (const point of [{ numerator: 0, denominator: 1 }, { numerator: 2, denominator: 1 }, { numerator: 3, denominator: 1 }]) assert.throws(() => edit(root, f.snapshot, { ...input, splitPoint: point }, key("split-boundary"), ACTOR), errorCode("EDITORIAL_V2_INVALID"));
      assert.throws(() => edit(root, f.snapshot, { ...input, layerId: "layer_locked" }, key("split-locked"), ACTOR), errorCode("EDITORIAL_V2_INVALID"));
      assert.throws(() => edit(root, f.snapshot, { ...input, layerId: "layer_nested" }, key("split-nested"), ACTOR), errorCode("EDITORIAL_V2_UNSUPPORTED"));
      for (const changes of [{ expectedRevision: 99 }, { expectedCompositionRevision: 99 }]) assert.throws(() => edit(root, f.snapshot, { ...input, ...changes }, key("split-stale"), ACTOR), errorCode("EDITORIAL_V2_CONFLICT"));
    });
    assert.equal(rejected.observed.writes.length, 0); assert.deepEqual(v2Files(f), before);
    const image = fixture("split_image_unsupported"), imageBefore = v2Files(image), imageRequest = splitInput(image, { numerator: 1, denominator: 1 }); const imageRejected = instrument(image, {}, root => assert.throws(() => edit(root, image.snapshot, imageRequest, key("split-image"), ACTOR), errorCode("EDITORIAL_V2_UNSUPPORTED"))); assert.equal(imageRejected.observed.writes.length, 0); assert.deepEqual(v2Files(image), imageBefore);
    const capacity = fixture("split_capacity", true, false, { video: true, startUs: 0, durationUs: 2_000_000, fillMainToLimit: true }), capacityBefore = v2Files(capacity); const capacityRejected = instrument(capacity, {}, root => assert.throws(() => edit(root, capacity.snapshot, splitInput(capacity, { numerator: 1, denominator: 1 }), key("split-capacity"), ACTOR), errorCode("EDITORIAL_V2_INVALID"))); assert.equal(capacityRejected.observed.writes.length, 0); assert.deepEqual(v2Files(capacity), capacityBefore);
    const atomic = fixture("split_atomic", true, false, { video: true, startUs: 0, durationUs: 2_000_000 }), atomicRequest = splitInput(atomic, { numerator: 1, denominator: 1 }), atomicKey = key("split-atomic"), oldHead = fs.readFileSync(path.join(rootPath, ...headPath(atomic.id))), oldComposition = withNative(root => read(root, atomic.snapshot, atomic.mainId)).composition;
    const interrupted = instrument(atomic, { failBeforeHead: true }, root => assert.throws(() => edit(root, atomic.snapshot, atomicRequest, atomicKey, ACTOR), unavailable)); assert.deepEqual(fs.readFileSync(path.join(rootPath, ...headPath(atomic.id))), oldHead); assert.deepEqual(withNative(root => read(root, atomic.snapshot, atomic.mainId)).composition, oldComposition);
    const recovered = instrument(atomic, {}, root => edit(root, atomic.snapshot, atomicRequest, atomicKey, ACTOR)); assert.equal(recovered.result.revision, 2); assert.equal(withNative(root => read(root, atomic.snapshot, atomic.mainId)).composition.layers.length, oldComposition.layers.length + 1);
    const lost = fixture("split_lost_ack", true, false, { video: true, startUs: 0, durationUs: 2_000_000 }), lostRequest = splitInput(lost, { numerator: 1, denominator: 1 }), lostKey = key("split-lost-ack"); const lostAck = instrument(lost, { loseAck: true }, root => assert.throws(() => edit(root, lost.snapshot, lostRequest, lostKey, ACTOR), unavailable)); const committedFiles = v2Files(lost), replay = instrument(lost, {}, root => edit(root, lost.snapshot, lostRequest, lostKey, ACTOR)); assert.equal(replay.result.revision, 2); assert.equal(replay.observed.writes.length, 0); assert.deepEqual(v2Files(lost), committedFiles); assert.equal(withNative(root => audit(root, lost.snapshot, 64)).checkedCommits, 2);
    retain("split-rejection-atomic-recovery.json", { rejected: rejected.observed, imageRejected: imageRejected.observed, capacityRejected: capacityRejected.observed, interrupted: interrupted.observed, recovered: recovered.observed, lostAck: lostAck.observed, replay: replay.observed });
  });
  test("No tests alter original asset bytes, approvals, jobs, cost, provider records or any v1 files except declared race fixtures", () => {
    assert.deepEqual(projectFiles(main), main.baseline); using(repository => { const state = repository.load(main.id); assert.deepEqual(state, main.snapshot); assert.equal(sha(repository.readEditorialMedia(main.id, main.asset.assetId, 1).bytes), sha(png)); assert.deepEqual(repository.reviewEditorial(main.id).editorial, main.legacy); });
    assert.deepEqual(networkAttempts, []); retain("main-final-files.json", { files: inventory(path.join(rootPath, "studio", "projects", main.id)), snapshot: main.snapshot, v1StillActive: main.legacy });
  });
  for (const item of tests) { try { await item.run(); results.push({ name: item.name, status: "PASS" }); } catch (error) { results.push({ name: item.name, status: "FAIL", error: { name: error.name, code: error.code ?? null, message: error.message, stack: error.stack } }); break; } }
  const afterBindings = sourceBindings.map(item => ({ path: item.path, bytes: fs.statSync(path.join(frontend, item.path)).size, sha256: sha(fs.readFileSync(path.join(frontend, item.path))) }));
  const sourceUnchanged = canonical(afterBindings) === canonical(sourceBindings), status = results.length === tests.length && results.every(item => item.status === "PASS") && networkAttempts.length === 0 && sourceUnchanged ? "PASS" : "FAIL";
  retain("result.json", { status, runId, namespace, rootPath, startedAt, finishedAt: new Date().toISOString(), planned: tests.length, passed: results.filter(item => item.status === "PASS").length, tests: results, sourceBindings, afterBindings, sourceUnchanged, networkAttempts, nativeExecution: true, nativeRebuilt: false, actualProviderExecutions: 0, actualBrowserExecutions: 0, productionMutations: 0, dDriveMutations: 0, deletions: 0, allTestDataRetained: true });
  console.log(JSON.stringify({ status, planned: tests.length, completed: results.length, passed: results.filter(item => item.status === "PASS").length, failures: results.filter(item => item.status === "FAIL"), sourceUnchanged, evidence, testSha256: sha(fs.readFileSync(filename)), nativeSha256: NATIVE_SHA, providerRequests: 0 })); if (status !== "PASS") process.exitCode = 1;
}
