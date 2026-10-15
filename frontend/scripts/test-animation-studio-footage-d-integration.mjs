// Actual native C/D repository integration in fresh synthetic test namespaces.
// No provider, credentials, server, browser, native rebuild, deletion or migration.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { NextRequest } from "next/server.js";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { openStudioRepository, StudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const { createStudioFootageLibrary, StudioFootageLibraryError } = loader.load("@/lib/codexforge/animation-studio/footage-library.server");
const { createStudioFootageHandler } = loader.load("@/lib/codexforge/animation-studio/footage-http.server");
const { localFootageStorageBinding, validateFootageImport, STUDIO_FOOTAGE_D_STORAGE } = loader.load("@/lib/codexforge/animation-studio/footage-contract");
const { validateAssetManifest } = loader.load("@/lib/codexforge/animation-studio/validation");
const { serializeJarvisChatCanonicalJson: canonical } = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");
const sha = value => createHash("sha256").update(value).digest("hex");
const clone = value => JSON.parse(JSON.stringify(value));
const runId = randomUUID(), startedAt = new Date().toISOString();
const namespaces = { mixed: `d-integration-${runId}`, dangling: `d-dangling-${runId}`, cas: `d-cas-${runId}`, fence: `d-fence-${runId}`, acknowledgement: `d-ack-${runId}` };
const evidence = path.join(frontend, ".codexforge", "acceptance", `studio-footage-d-integration-tests-${runId}`);
fs.mkdirSync(evidence, { recursive: true });
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
const bindings = [...new Set([...loader.loaded, "scripts/animation-studio-test-loader.mjs", "scripts/test-animation-studio-footage-d-integration.mjs", "build/Release/codexforge_creator_filesystem.node"])]
  .sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
const appMarker = "D:/CodexForge/.codexforge/ownership/app-root.json";
const appMarkerHash = sha(fs.readFileSync(appMarker));
assert.equal(appMarkerHash, "b202c86143b72af9f3bc7e6d8e07e9a4da20b7c788706be9f75cdaf82fac62ab");
retain("intent.json", { runId, startedAt, namespaces, scope: "Fresh synthetic C/D mixed storage; no historical or production store opened. Corrupt binding uses only this run's owned C marker; outage and CAS faults are explicitly simulated. No deletions/moves or native rebuild.", sourceBindings: bindings, preservedAppMarker: { path: appMarker, sha256: appMarkerHash } });

let tick = 0;
const now = () => new Date(Date.UTC(2026, 8, 18, 0, 0, tick++)).toISOString();
const ACTOR = "local-studio-footage-import", mainId = "project_d_mixed", legacyId = "project_c_only";
const cRootPath = namespace => path.join(frontend, ".codexforge", "studio-tests", namespace);
const cRootSegments = namespace => [".codexforge", "studio-tests", namespace];
const dRootPath = binding => path.join("D:/CodexForge/.codexforge/media-libraries", binding.libraryId);
for (const namespace of Object.values(namespaces)) assert.equal(fs.existsSync(cRootPath(namespace)), false, "Test namespace must be fresh.");
function rootFor(namespace) { return openCreatorNativeRoot(cRootSegments(namespace), "persistent"); }
function withRepo(namespace, mediaStorage, operation) {
  const repository = openStudioRepository({ workspace: "test", namespace, mediaStorage });
  try { return operation(repository); } finally { repository.close(); }
}
function destination(namespace) {
  const root = rootFor(namespace), library = createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: { workspace: "test", namespace }, importDestination: "d-drive" });
  try { return library.destination(); } finally { library.close(); root.close(); }
}
function create(repository, projectId) {
  repository.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Synthetic D integration", description: "No real footage or provider execution.", currency: "GBP", createdAt: now() }, `create-${projectId}`, ACTOR);
}
function metadata(repository, projectId, sourceLabel = "Synthetic C/D integration") {
  const state = repository.load(projectId);
  return { projectId, shotId: state.shots[0].shotId, expectedProjectRevision: state.project.revision, expectedShotRevision: state.shots[0].revision, requestedAt: now(), originalName: "synthetic.mp4", sourceLabel, rights: { status: "UNKNOWN", license: null, evidence: null } };
}
function box(type, payload) { const value = Buffer.alloc(8 + payload.length); value.writeUInt32BE(value.length); value.write(type, 4, "ascii"); payload.copy(value, 8); return value; }
function framing(fill) { return Buffer.concat([box("ftyp", Buffer.from("isom\0\0\0\0isom", "binary")), box("moov", Buffer.alloc(8)), box("mdat", Buffer.alloc(600_000, fill))]); }
const firstBytes = framing(41), secondBytes = framing(52);
function inventory(root) {
  if (!fs.existsSync(root)) return null;
  const result = [];
  function visit(relative) {
    assert.ok(result.length < 300, "Only bounded owned test trees may be inspected.");
    const target = path.resolve(root, relative), checked = path.relative(path.resolve(root), target);
    assert.ok(!checked.startsWith("..") && !path.isAbsolute(checked));
    const stat = fs.lstatSync(target); assert.equal(stat.isSymbolicLink(), false);
    result.push({ path: relative, kind: stat.isDirectory() ? "directory" : "file", ...(stat.isFile() ? { bytes: stat.size, sha256: sha(fs.readFileSync(target)) } : {}), mtimeMs: stat.mtimeMs, birthtimeMs: stat.birthtimeMs });
    if (stat.isDirectory()) for (const name of fs.readdirSync(target).sort()) visit(relative === "." ? name : `${relative}/${name}`);
  }
  visit("."); return result;
}
function manifestBytes(namespace, projectId) { return fs.readFileSync(path.join(cRootPath(namespace), "studio", "projects", projectId, "manifests", "project.json")); }
const endpoint = "http://127.0.0.1:3328/api/codexforge/animation-studio/footage";
function handler(namespace, mediaStorage = "workspace", opener) {
  return createStudioFootageHandler({ enabled: true, listenerAddresses: () => ["127.0.0.1"], openRepository: opener ?? (() => openStudioRepository({ workspace: "test", namespace, mediaStorage })) });
}
function post(input, key, bytes) {
  return new NextRequest(endpoint, { method: "POST", headers: { Host: "127.0.0.1:3328", Origin: "http://127.0.0.1:3328", "Sec-Fetch-Site": "same-origin", "X-CodexForge-Animation-Studio": "local-operator-v1", "Content-Type": "application/octet-stream", "Idempotency-Key": key, "X-CodexForge-Footage": encodeURIComponent(JSON.stringify(input)) }, body: bytes });
}
function get(projectId, asset) { return new NextRequest(`${endpoint}?projectId=${projectId}&assetId=${asset.assetId}&version=${asset.version}`, { headers: { Host: "127.0.0.1:3328", "X-CodexForge-Animation-Studio": "local-operator-v1" } }); }
async function jsonResponse(response) { return { status: response.status, body: await response.json() }; }
function assertUnresolved(response) {
  assert.equal(response.status, 503, JSON.stringify(response));
  assert.equal(response.body.ok, false);
  assert.equal(response.body.error.code, "local_storage_unavailable");
  assert.equal(response.status >= 400 && response.status < 500 && ![408, 429].includes(response.status), false, "UI must not release the original key as a definitive rejection.");
}
function instrumented(namespace, importDestination, counters, { unavailable = false, failCas = false, mutateMarkerAtCas = false, loseAcknowledgement = false } = {}) {
  const native = rootFor(namespace); let armed = failCas || mutateMarkerAtCas || loseAcknowledgement;
  const root = new Proxy(native, { get(target, property) {
    if (property === "writeAtomicReplace") return (...args) => {
      if (armed && args[0].at(-1) === "project.json") {
        armed = false; counters.injectedCas++;
        assert.deepEqual(args[4], ["studio", "media-library.json"], "D aggregate must carry the exact C binding fence.");
        const markerPath = ["studio", "media-library.json"], original = target.readFile(markerPath, 4096);
        assert.deepEqual(args[5], original);
        if (failCas) throw Object.assign(new Error("Simulated C aggregate I/O failure after real D publication."), { code: "synthetic_cas_io" });
        if (mutateMarkerAtCas) {
          const bad = Buffer.from(canonical({ ...JSON.parse(original.toString("utf8")), libraryId: "0".repeat(64) }));
          retain("owned-c-binding-final-cas-mutation.json", { namespace, originalBase64: original.toString("base64"), originalSha256: sha(original), replacementBase64: bad.toString("base64"), replacementSha256: sha(bad), injectedAt: "Immediately before real native aggregate CAS" });
          target.writeAtomicReplace(markerPath, `test-marker-fence-${randomUUID()}.tmp`, bad, original, null, null);
          try { target.writeAtomicReplace(...args); }
          catch (error) { counters.nativeFenceRejections++; counters.nativeFenceErrorCode = error.code ?? null; throw error; }
          assert.fail("Actual native aggregate CAS accepted a changed C binding fence.");
        }
        if (loseAcknowledgement) {
          target.writeAtomicReplace(...args); counters.committedBeforeLostAcknowledgement++;
          throw Object.assign(new Error("Simulated acknowledgement loss after successful actual native C aggregate CAS."), { code: "synthetic_lost_acknowledgement" });
        }
      }
      return target.writeAtomicReplace(...args);
    };
    const value = Reflect.get(target, property); return typeof value === "function" ? value.bind(target) : value;
  } });
  const library = createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: { workspace: "test", namespace }, importDestination });
  return new StudioRepository(root, {
    destination() { counters.destination++; return library.destination(); },
    write(...args) { counters.write++; return library.write(...args); },
    read(...args) { if (args[3] !== null) { counters.dReads++; if (unavailable) throw new StudioFootageLibraryError("FOOTAGE_LIBRARY_UNAVAILABLE"); } return library.read(...args); },
    close() { library.close(); },
  });
}
const counters = () => ({ destination: 0, write: 0, dReads: 0, injectedCas: 0, nativeFenceRejections: 0, nativeFenceErrorCode: null, committedBeforeLostAcknowledgement: 0 });
const tests = [], results = [];
const test = (name, run) => tests.push({ name, run });
let firstInput, secondInput, firstAsset, secondAsset, legacyAsset, originalAssetJson, originalCVersion, mixedBinding;
const firstKey = "mixed-first-exact-00000001", secondKey = "mixed-second-exact-00000001";

test("Legacy C import has exact old settings and does not provision a D library", () => {
  withRepo(namespaces.mixed, "workspace", repository => {
    create(repository, mainId); firstInput = metadata(repository, mainId);
    repository.importFootage(firstInput, firstBytes, firstKey, ACTOR);
    firstAsset = repository.load(mainId).assets[0]; originalAssetJson = canonical(firstAsset);
    assert.equal(localFootageStorageBinding(firstAsset), null);
    assert.equal(Object.hasOwn(firstAsset.provenance.adapterMetadata.settings, "storageLocation"), false);
    assert.equal(Object.hasOwn(firstAsset.provenance.adapterMetadata.settings, "libraryId"), false);
    create(repository, legacyId); const input = metadata(repository, legacyId);
    repository.importFootage(input, firstBytes, "legacy-only-import-00000001", ACTOR); legacyAsset = repository.load(legacyId).assets[0];
  });
  mixedBinding = destination(namespaces.mixed);
  assert.equal(inventory(dRootPath(mixedBinding)), null);
  assert.equal(fs.existsSync(path.join(cRootPath(namespaces.mixed), "studio/media-library.json")), false);
  originalCVersion = inventory(path.dirname(path.join(cRootPath(namespaces.mixed), firstAsset.sourcePath)));
});
test("Committed C exact replay after D opt-in never selects or writes a new destination", () => {
  const before = inventory(cRootPath(namespaces.mixed)), observed = counters();
  const repository = instrumented(namespaces.mixed, "d-drive", observed);
  try { repository.importFootage(firstInput, firstBytes, firstKey, ACTOR); assert.equal(repository.load(mainId).project.revision, 2); }
  finally { repository.close(); }
  assert.equal(observed.destination, 0); assert.equal(observed.write, 0); assert.equal(observed.dReads, 0);
  assert.deepEqual(inventory(cRootPath(namespaces.mixed)), before);
  assert.equal(inventory(dRootPath(mixedBinding)), null);
  retain("legacy-replay.json", observed);
});
test("New version uses D parts while C metadata and original C asset remain unchanged", () => {
  withRepo(namespaces.mixed, "d-drive", repository => {
    secondInput = metadata(repository, mainId, "Synthetic D version"); repository.importFootage(secondInput, secondBytes, secondKey, ACTOR);
    const state = repository.load(mainId); secondAsset = state.assets[1];
    assert.equal(canonical(state.assets[0]), originalAssetJson);
    assert.deepEqual(localFootageStorageBinding(secondAsset), mixedBinding);
    assert.equal(secondAsset.version, 2); assert.equal(secondAsset.assetId, firstAsset.assetId);
    assert.deepEqual(secondAsset.lineage, [{ assetId: firstAsset.assetId, version: 1 }]);
  });
  assert.deepEqual(inventory(path.dirname(path.join(cRootPath(namespaces.mixed), firstAsset.sourcePath))), originalCVersion);
  assert.equal(fs.existsSync(path.join(cRootPath(namespaces.mixed), secondAsset.sourcePath)), false);
  assert.equal(fs.existsSync(path.join(dRootPath(mixedBinding), secondAsset.sourcePath)), true);
  const cMarker = fs.readFileSync(path.join(cRootPath(namespaces.mixed), "studio/media-library.json"));
  const dMarker = fs.readFileSync(path.join(dRootPath(mixedBinding), "media-library.json"));
  assert.deepEqual(cMarker, dMarker);
  assert.equal(fs.existsSync(path.join(dRootPath(mixedBinding), "studio/projects", mainId, "manifests/project.json")), false);
  const dFiles = inventory(dRootPath(mixedBinding)).filter(item => item.kind === "file");
  assert.equal(dFiles.length, 4); assert.ok(dFiles.every(item => item.bytes <= 524_288));
  retain("mixed-placement.json", { binding: mixedBinding, cMarkerSha256: sha(cMarker), dMarkerSha256: sha(dMarker), cAggregateSha256: sha(manifestBytes(namespaces.mixed, mainId)), originalCAssetUnchanged: true, dFiles });
});
test("D committed exact replay after workspace switch causes no selection, publication or revision", () => {
  const beforeC = inventory(cRootPath(namespaces.mixed)), beforeD = inventory(dRootPath(mixedBinding)), observed = counters();
  const repository = instrumented(namespaces.mixed, "workspace", observed);
  try { repository.importFootage(secondInput, secondBytes, secondKey, ACTOR); assert.equal(repository.load(mainId).project.revision, 3); }
  finally { repository.close(); }
  assert.equal(observed.destination, 0); assert.equal(observed.write, 0); assert.ok(observed.dReads > 0);
  assert.deepEqual(inventory(cRootPath(namespaces.mixed)), beforeC); assert.deepEqual(inventory(dRootPath(mixedBinding)), beforeD);
  retain("d-replay.json", observed);
});
test("Reopened workspace-configured handler previews both immutable C and D versions exactly", async () => {
  const target = handler(namespaces.mixed, "workspace");
  for (const [asset, bytes] of [[firstAsset, firstBytes], [secondAsset, secondBytes]]) {
    const response = await target(get(mainId, asset)); assert.equal(response.status, 200);
    assert.equal(response.headers.get("Content-Type"), "video/mp4"); assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes);
  }
  withRepo(namespaces.mixed, "workspace", repository => {
    const state = repository.load(mainId);
    assert.equal(state.project.revision, 3); assert.equal(state.shots[0].revision, 3);
    assert.equal(state.jobs.length, 0); assert.equal(state.costs.length, 0); assert.equal(state.approvals.length, 0);
    assert.deepEqual(state.qcResults.map(item => item.result), ["REVIEW", "REVIEW"]);
    for (const asset of state.assets) { assert.equal(asset.approvalState, "DRAFT"); assert.equal(asset.provenance.jobId, null); assert.equal(asset.provenance.promptId, null); assert.equal(asset.provenance.cost.minorUnits, 0); assert.equal(asset.provenance.adapterMetadata.settings.originalAcquisitionCost, "UNKNOWN"); }
  });
});
test("Partial or forged storage field shapes reject before persistence and cannot enter request metadata", () => {
  for (const change of [settings => delete settings.libraryId, settings => delete settings.storageLocation, settings => settings.storageLocation = "workspace", settings => settings.storageLocation = "D:/other", settings => settings.libraryId = "../other", settings => settings.libraryId = "a".repeat(63), settings => settings.libraryId = "A".repeat(64), settings => settings.path = "D:/other"]) {
    const asset = clone(secondAsset); change(asset.provenance.adapterMetadata.settings);
    assert.throws(() => validateAssetManifest(asset)); assert.throws(() => localFootageStorageBinding(asset));
  }
  assert.equal(STUDIO_FOOTAGE_D_STORAGE, "codexforge-media-d-v1");
  assert.throws(() => validateFootageImport({ ...firstInput, storageLocation: STUDIO_FOOTAGE_D_STORAGE }));
  assert.throws(() => validateFootageImport({ ...firstInput, libraryId: mixedBinding.libraryId }));
});
test("Simulated unavailable D read yields unresolved 503 while actual C-only project remains readable", async () => {
  const beforeC = inventory(cRootPath(namespaces.mixed)), beforeD = inventory(dRootPath(mixedBinding)), observed = counters();
  const target = handler(namespaces.mixed, "workspace", () => instrumented(namespaces.mixed, "workspace", observed, { unavailable: true }));
  const preview = await jsonResponse(await target(get(mainId, secondAsset))); assertUnresolved(preview);
  const replay = await jsonResponse(await target(post(secondInput, secondKey, secondBytes))); assertUnresolved(replay);
  const dCalls = observed.dReads, legacy = await target(get(legacyId, legacyAsset));
  assert.equal(legacy.status, 200); assert.deepEqual(Buffer.from(await legacy.arrayBuffer()), firstBytes); assert.equal(observed.dReads, dCalls);
  assert.equal(observed.write, 0); assert.equal(observed.destination, 0);
  assert.deepEqual(inventory(cRootPath(namespaces.mixed)), beforeC); assert.deepEqual(inventory(dRootPath(mixedBinding)), beforeD);
  retain("simulated-unavailable.json", { simulated: true, preview, replay, counters: observed, legacyCPreviewSucceeded: true, noNewDReadsForLegacy: true });
});
test("Corruption of this run's C binding fails as 503 without affecting its C-only project or D bytes", async () => {
  const root = rootFor(namespaces.mixed), segments = ["studio", "media-library.json"], original = root.readFile(segments, 4096);
  const bad = Buffer.from(canonical({ ...JSON.parse(original.toString("utf8")), libraryId: "0".repeat(64) }));
  retain("owned-c-binding-before-corruption.json", { originalBase64: original.toString("base64"), originalSha256: sha(original), replacementBase64: bad.toString("base64"), replacementSha256: sha(bad), scope: namespaces.mixed });
  const beforeManifest = manifestBytes(namespaces.mixed, mainId), beforeD = inventory(dRootPath(mixedBinding));
  try { root.writeAtomicReplace(segments, `integration-corrupt-${randomUUID()}.tmp`, bad, original, null, null); } finally { root.close(); }
  const target = handler(namespaces.mixed, "workspace");
  const preview = await jsonResponse(await target(get(mainId, secondAsset))); assertUnresolved(preview);
  const replay = await jsonResponse(await target(post(secondInput, secondKey, secondBytes))); assertUnresolved(replay);
  const legacy = await target(get(legacyId, legacyAsset)); assert.equal(legacy.status, 200); assert.deepEqual(Buffer.from(await legacy.arrayBuffer()), firstBytes);
  assert.deepEqual(manifestBytes(namespaces.mixed, mainId), beforeManifest); assert.deepEqual(inventory(dRootPath(mixedBinding)), beforeD);
  retain("corrupt-c-binding-result.json", { preview, replay, legacyCPreviewSucceeded: true, originalBytesRetainedInEvidence: true, aggregateAndDUnchanged: true });
});
test("Valid dangling C binding never reprovisions absent D; legacy C reads require no D library", async () => {
  const namespace = namespaces.dangling, projectId = "project_d_dangling"; let asset, input;
  withRepo(namespace, "workspace", repository => { create(repository, projectId); input = metadata(repository, projectId); repository.importFootage(input, firstBytes, "dangling-first-00000001", ACTOR); asset = repository.load(projectId).assets[0]; input = metadata(repository, projectId); });
  const binding = destination(namespace), dPath = dRootPath(binding); assert.equal(inventory(dPath), null);
  const marker = Buffer.from(canonical({ format: "studio-footage-library-v1", ...binding }));
  const root = rootFor(namespace);
  try { root.writeAtomicExclusive(["studio", "media-library.json"], `synthetic-dangling-${randomUUID()}.tmp`, marker); } finally { root.close(); }
  const before = inventory(cRootPath(namespace)), target = handler(namespace, "d-drive");
  const legacy = await target(get(projectId, asset)); assert.equal(legacy.status, 200); assert.deepEqual(Buffer.from(await legacy.arrayBuffer()), firstBytes);
  assert.equal(inventory(dPath), null);
  const rejected = await jsonResponse(await target(post(input, "dangling-new-d-00000001", secondBytes))); assertUnresolved(rejected);
  assert.equal(inventory(dPath), null); assert.deepEqual(inventory(cRootPath(namespace)), before);
  retain("dangling-binding-result.json", { namespace, binding, simulatedPreviouslyBoundMarker: true, actualMissingDPath: dPath, dRootNeverCreated: true, legacyCPreviewSucceeded: true, rejected });
});
test("Simulated C publication failure leaves real D orphans and exact retry commits one version", async () => {
  const namespace = namespaces.cas, projectId = "project_d_cas"; let input;
  withRepo(namespace, "workspace", repository => { create(repository, projectId); input = metadata(repository, projectId); });
  const binding = destination(namespace), dPath = dRootPath(binding), before = manifestBytes(namespace, projectId), observed = counters();
  const interrupted = handler(namespace, "d-drive", () => instrumented(namespace, "d-drive", observed, { failCas: true }));
  const failure = await jsonResponse(await interrupted(post(input, "d-cas-exact-00000001", secondBytes))); assertUnresolved(failure);
  assert.equal(observed.injectedCas, 1); assert.deepEqual(manifestBytes(namespace, projectId), before);
  withRepo(namespace, "workspace", repository => assert.equal(repository.load(projectId).assets.length, 0));
  const orphanFiles = inventory(dPath).filter(item => item.kind === "file"); assert.equal(orphanFiles.length, 4);
  const recovered = await jsonResponse(await handler(namespace, "d-drive")(post(input, "d-cas-exact-00000001", secondBytes))); assert.equal(recovered.status, 200);
  withRepo(namespace, "workspace", repository => { const state = repository.load(projectId); assert.equal(state.project.revision, 2); assert.equal(state.assets.length, 1); assert.deepEqual(localFootageStorageBinding(state.assets[0]), binding); assert.deepEqual(repository.readFootage(projectId, state.assets[0].assetId, 1), secondBytes); });
  const projection = items => items.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 }));
  assert.deepEqual(projection(inventory(dPath).filter(item => item.kind === "file")), projection(orphanFiles));
  retain("simulated-cas-recovery.json", { simulatedCFailure: true, actualDNativePublication: true, failure, recoveredStatus: recovered.status, counters: observed, preservedOrphanFiles: orphanFiles, recoveredExactlyOnce: true });
});

test("Actual native final aggregate fence rejects a binding changed after D publication", async () => {
  const namespace = namespaces.fence, projectId = "project_d_fence"; let input;
  withRepo(namespace, "workspace", repository => { create(repository, projectId); input = metadata(repository, projectId); });
  const binding = destination(namespace), dPath = dRootPath(binding), before = manifestBytes(namespace, projectId), observed = counters();
  const target = handler(namespace, "d-drive", () => instrumented(namespace, "d-drive", observed, { mutateMarkerAtCas: true }));
  const failure = await jsonResponse(await target(post(input, "d-fence-exact-00000001", secondBytes))); assertUnresolved(failure);
  assert.equal(observed.injectedCas, 1); assert.equal(observed.nativeFenceRejections, 1);
  assert.deepEqual(manifestBytes(namespace, projectId), before);
  withRepo(namespace, "workspace", repository => { const state = repository.load(projectId); assert.equal(state.project.revision, 1); assert.equal(state.assets.length, 0); });
  const orphanFiles = inventory(dPath).filter(item => item.kind === "file"); assert.equal(orphanFiles.length, 4);
  const beforeC = inventory(cRootPath(namespace)), beforeD = inventory(dPath);
  const retry = await jsonResponse(await handler(namespace, "d-drive")(post(input, "d-fence-exact-00000001", secondBytes))); assertUnresolved(retry);
  assert.deepEqual(inventory(cRootPath(namespace)), beforeC); assert.deepEqual(inventory(dPath), beforeD);
  retain("native-c-binding-fence-result.json", { simulatedInterleaving: true, actualNativeMarkerMutation: true, actualNativeAggregateFenceRejection: true, failure, retry, counters: observed, noAggregateCommit: true, preservedOrphanFiles: orphanFiles });
});

test("Lost post-CAS acknowledgement preserves unresolved outcome and exact replay without any new write", async () => {
  const namespace = namespaces.acknowledgement, projectId = "project_d_ack"; let input;
  withRepo(namespace, "workspace", repository => { create(repository, projectId); input = metadata(repository, projectId); });
  const binding = destination(namespace), dPath = dRootPath(binding), observed = counters();
  const target = handler(namespace, "d-drive", () => instrumented(namespace, "d-drive", observed, { loseAcknowledgement: true }));
  const failure = await jsonResponse(await target(post(input, "d-lost-ack-exact-00000001", secondBytes))); assertUnresolved(failure);
  assert.equal(observed.injectedCas, 1); assert.equal(observed.committedBeforeLostAcknowledgement, 1);
  withRepo(namespace, "workspace", repository => { const state = repository.load(projectId); assert.equal(state.project.revision, 2); assert.equal(state.assets.length, 1); assert.deepEqual(localFootageStorageBinding(state.assets[0]), binding); assert.deepEqual(repository.readFootage(projectId, state.assets[0].assetId, 1), secondBytes); });
  const beforeC = inventory(cRootPath(namespace)), beforeD = inventory(dPath), replayObserved = counters();
  const recovered = await jsonResponse(await handler(namespace, "workspace", () => instrumented(namespace, "workspace", replayObserved))(post(input, "d-lost-ack-exact-00000001", secondBytes)));
  assert.equal(recovered.status, 200); assert.equal(recovered.body.result.snapshot.project.revision, 2); assert.equal(recovered.body.result.snapshot.assets.length, 1);
  assert.equal(replayObserved.destination, 0); assert.equal(replayObserved.write, 0); assert.ok(replayObserved.dReads > 0);
  assert.deepEqual(inventory(cRootPath(namespace)), beforeC); assert.deepEqual(inventory(dPath), beforeD);
  retain("lost-acknowledgement-replay-result.json", { simulatedLostAcknowledgement: true, actualNativeAggregateCommit: true, failure, recoveredStatus: recovered.status, counters: observed, replayCounters: replayObserved, cAndDBytesAndTimestampsUnchangedByReplay: true });
});

for (const item of tests) {
  try { await item.run(); results.push({ name: item.name, status: "PASS" }); }
  catch (error) { results.push({ name: item.name, status: "FAIL", error: { name: error.name, code: error.code ?? null, message: error.message, stack: error.stack } }); break; }
}
const sourceUnchanged = bindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const appMarkerUnchanged = sha(fs.readFileSync(appMarker)) === appMarkerHash;
const status = results.length === tests.length && results.every(item => item.status === "PASS") && sourceUnchanged && appMarkerUnchanged && networkAttempts.length === 0 ? "PASS" : "FAIL";
retain("result.json", { status, runId, startedAt, finishedAt: new Date().toISOString(), namespaces, planned: tests.length, tests: results, passed: results.filter(item => item.status === "PASS").length, sourceBindings: bindings, sourceUnchanged, appMarkerUnchanged, networkAttempts, nativeExecution: true, nativeRebuilt: false, providerRequests: 0, credentialReads: 0, productionDataMutations: 0, deletions: 0, migrations: 0, port3000Actions: 0, allCreatedTestDataRetained: true, syntheticFramingNotPlaybackEvidence: true, explicitSimulations: ["read-facade drive unavailability", "valid C marker with absent D root", "C aggregate publication I/O failure after real D writes", "C binding mutation interleaving immediately before native aggregate CAS", "lost acknowledgement after successful native C aggregate CAS"] });
console.log(JSON.stringify({ status, planned: tests.length, completed: results.length, passed: results.filter(item => item.status === "PASS").length, failures: results.filter(item => item.status === "FAIL"), evidence, sourceUnchanged, appMarkerUnchanged, providerRequests: 0 }));
if (status !== "PASS") process.exitCode = 1;
