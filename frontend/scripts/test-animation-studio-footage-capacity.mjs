// Actual native storage in a fresh retained synthetic namespace. No server, browser,
// native rebuild, provider, credentials, production data, or outbound network.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork();
const loader = createStudioTestLoader(frontend);
const { StudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { createStudioFootageLibrary } = loader.load("@/lib/codexforge/animation-studio/footage-library.server");
const { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const { createStudioFootageHandler } = loader.load("@/lib/codexforge/animation-studio/footage-http.server");
const { validateFootageImport, inspectStudioMp4, STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA } = loader.load("@/lib/codexforge/animation-studio/footage-contract");
const { serializeJarvisChatCanonicalJson: canonical } = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");
const sha = value => createHash("sha256").update(value).digest("hex");
const runId = randomUUID(), startedAt = new Date().toISOString();
const namespace = `footage-capacity-${runId}`;
const rootSegments = [".codexforge", "studio-tests", namespace];
const evidence = path.join(frontend, ".codexforge", "acceptance", `studio-footage-capacity-tests-${runId}`);
fs.mkdirSync(evidence, { recursive: true });
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
const bindings = [...new Set([...loader.loaded, "scripts/animation-studio-test-loader.mjs", "scripts/test-animation-studio-footage-capacity.mjs", "build/Release/codexforge_creator_filesystem.node"])]
  .sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
retain("intent.json", { runId, startedAt, namespace, command: "node scripts/test-animation-studio-footage-capacity.mjs", scope: "Synthetic near-capacity actual-native repository and in-process HTTP handler; no production data, browser, server, network, provider, credential access, native rebuild, or deletion.", sourceBindings: bindings });

const LIMIT = 1_048_576, projectId = "project_synthetic_capacity", actor = "synthetic-footage-capacity";
const operations = [], results = [];
let clock = 0, opened = 0, closed = 0, probe = null, fixture = null;
const time = () => new Date(Date.UTC(2026, 8, 17, 0, 0, clock++)).toISOString();
function tracedRoot() {
  const native = openCreatorNativeRoot(rootSegments, "persistent"); opened++;
  return new Proxy(native, {
    get(target, property) {
      if (property === "writeAtomicExclusive" || property === "writeAtomicReplace") return (...args) => {
        const [segments, , bytes] = args, name = segments.join("/");
        assert.ok(Buffer.isBuffer(bytes) && bytes.length <= LIMIT);
        if (property === "writeAtomicReplace" && probe) {
          probe.bytes = Buffer.from(bytes);
          throw Object.assign(new Error("Synthetic fixture probe: native publication deliberately not invoked."), { code: "fixture_probe" });
        }
        operations.push({ operation: property, path: name, bytes: bytes.length, sha256: sha(bytes) });
        return target[property](...args);
      };
      if (property === "close") return () => { target.close(); closed++; };
      const value = Reflect.get(target, property);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}
const root = tracedRoot(), repository = new StudioRepository(root);
async function syntheticReceiver(request,mediaType){
  assert.equal(mediaType,"VIDEO");const data=Buffer.from(await request.arrayBuffer());inspectStudioMp4(data);
  const technical={schema:STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA,mediaType:"VIDEO",contentType:"video/mp4",container:"mp4",codec:"h264",pixelFormat:"yuv420p",width:1280,height:720,frameRate:{numerator:25,denominator:1},frameCadence:"CFR_25_EXACT",duration:{numerator:1,denominator:1},sourceUnits:25,sourceUnit:"FRAME",timeBase:{numerator:1,denominator:12800},colorPrimaries:"bt709",colorTransfer:"bt709",colorSpace:"bt709",colorRange:"tv",dynamicRange:"SDR_BT709",rotationDegrees:0,streamCount:1,probeDigest:sha(Buffer.from("synthetic-capacity-probe-v1"))};
  let closed=false;return Object.freeze({mediaType:"VIDEO",contentType:"video/mp4",byteLength:data.length,contentHash:sha(data),technical,read(offset,length){assert.equal(closed,false);return Buffer.from(data.subarray(offset,offset+length));},close(){closed=true;}});
}
const handler = createStudioFootageHandler({ enabled: true, openRepository: () => new StudioRepository(tracedRoot()), listenerAddresses: () => ["127.0.0.1"], receiveImport: syntheticReceiver });
function create(projectId) {
  repository.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Synthetic capacity test", description: "Synthetic retained test data only.", createdAt: time(), currency: "GBP" }, `create-${projectId}`, actor);
}
function input(projectId, rights = { status: "UNKNOWN", license: null, evidence: null }) {
  const state = repository.load(projectId);
  return { projectId, shotId: state.shots[0].shotId, expectedProjectRevision: state.project.revision, expectedShotRevision: state.shots[0].revision, requestedAt: time(), originalName: "synthetic.mp4", sourceLabel: "Synthetic framing only; not playback evidence", rights };
}
function box(type, payload) {
  const result = Buffer.alloc(8 + payload.length);
  result.writeUInt32BE(result.length); result.write(type, 4, "ascii"); payload.copy(result, 8);
  return result;
}
const footage = Buffer.concat([box("ftyp", Buffer.from("isom\0\0\0\0isom", "binary")), box("moov", Buffer.alloc(8)), box("mdat", Buffer.alloc(600_000, 71))]);
async function request(metadata, key, bytes = footage) {
  const response = await handler(new Request("http://127.0.0.1:3328/api/codexforge/animation-studio/footage", {
    method: "POST",
    headers: { Host: "127.0.0.1:3328", Origin: "http://127.0.0.1:3328", "Sec-Fetch-Site": "same-origin", "X-CodexForge-Animation-Studio": "local-operator-v1", "Content-Type": "application/octet-stream", "Idempotency-Key": key, "X-CodexForge-Footage": encodeURIComponent(JSON.stringify(metadata)) },
    body: bytes,
  }));
  return { status: response.status, body: await response.json() };
}
const mediaOperations = projectId => operations.filter(item => item.path.startsWith(`studio/projects/${projectId}/renders/`));
async function test(name, run) {
  try { await run(); results.push({ name, status: "PASS" }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, status: "FAIL", error: { name: error.name, code: error.code ?? null, message: error.message, stack: error.stack } }); console.log(`FAIL ${name}: ${error.message}`); }
}

try {
  await test("Build and reopen a valid near-1-MiB project through actual repository publications", () => {
    create(projectId);
    // JSON escapes U+0001 to six bytes: exercise the byte bound without breaching
    // the independent 262,144-character aggregate validation budget.
    let reachedCap = false;
    for (let index = 0; index < 12; index++) {
      const state = repository.load(projectId);
      try { repository.reviseProject(projectId, state.project.revision, state.project.title, "\u0001".repeat(16_384), `capacity-fill-${String(index).padStart(8, "0")}`, actor, time()); }
      catch (error) { assert.equal(error.code, "PROJECT_FULL"); reachedCap = true; break; }
    }
    assert.equal(reachedCap, true, "The fixture must reach the real serialized-byte bound, not another validation limit.");
    const state = repository.load(projectId), requestedAt = time(), operationKey = "capacity-tune-00000001";
    const beforeProbe = operations.length;
    probe = { bytes: null };
    try {
      assert.throws(() => repository.reviseProject(projectId, state.project.revision, state.project.title, "", operationKey, actor, requestedAt), error => error.code === "fixture_probe");
    } finally {
      const measured = probe; probe = null;
      assert.ok(measured.bytes);
      assert.equal(operations.length, beforeProbe, "The fixture probe must never reach native publication.");
      const target = LIMIT - 512;
      const characters = Math.floor((target - measured.bytes.length) / 12);
      assert.ok(characters > 0 && characters <= 16_384);
      repository.reviseProject(projectId, state.project.revision, state.project.title, "\u0001".repeat(characters), operationKey, actor, requestedAt);
    }
    const saved = repository.load(projectId);
    const manifest = root.readFile(["studio", "projects", projectId, "manifests", "project.json"], LIMIT);
    assert.equal(manifest.toString("utf8"), canonical(saved));
    assert.ok(manifest.length > LIMIT - 1_024 && manifest.length <= LIMIT - 512, `Unexpected tuned manifest size: ${manifest.length}`);
    assert.equal(saved.assets.length, 0);
    assert.deepEqual(root.listDirectory(["studio", "projects", projectId, "renders"]), []);
    fixture = { state: saved, manifest, input: input(projectId), key: "capacity-import-exact-00000001" };
    retain("capacity-fixture.json", { projectId, revision: saved.project.revision, manifestBytes: manifest.length, freeBytes: LIMIT - manifest.length, manifestSha256: sha(manifest), recordDigest: saved.recordDigest, events: saved.events.length, receipts: saved.receipts.length, assets: saved.assets.length });
  });

  await test("Full-manifest HTTP import is a definitive 409 with zero media writes or aggregate changes", async () => {
    assert.ok(fixture, "A valid native capacity fixture is required.");
    const before = operations.length;
    const response = await request(fixture.input, fixture.key);
    assert.equal(response.status, 409, JSON.stringify(response));
    assert.equal(response.body.ok, false);
    assert.equal(response.body.error.code, "project_full");
    // Matches the UI's definitive 4xx rejection category: not an ambiguous
    // transport error, timeout, throttling response, or generic storage 503.
    const definitiveClientRejection = response.body.ok === false && typeof response.body.error.code === "string" && response.status >= 400 && response.status < 500 && ![408, 429].includes(response.status);
    assert.equal(definitiveClientRejection, true);
    assert.equal(operations.length, before, "No native write may be attempted for a predictable full-manifest rejection.");
    assert.equal(mediaOperations(projectId).length, 0);
    assert.deepEqual(root.readFile(["studio", "projects", projectId, "manifests", "project.json"], LIMIT), fixture.manifest);
    const after = repository.load(projectId);
    assert.equal(after.recordDigest, fixture.state.recordDigest);
    assert.equal(after.assets.length, 0);
    assert.equal(after.receipts.some(item => item.keyHash === sha(fixture.key)), false);
    assert.deepEqual(root.listDirectory(["studio", "projects", projectId, "renders"]), []);
    retain("capacity-rejection.json", { response, definitiveClientRejection, nativeWriteAttempts: operations.length - before, mediaWriteAttempts: mediaOperations(projectId).length, aggregateUnchanged: true, assetCount: after.assets.length, importReceiptCreated: false });
  });

  await test("Exact retry and a different payload cannot publish unreferenced media into the full project", async () => {
    assert.ok(fixture);
    const before = operations.length, changed = Buffer.from(footage); changed[changed.length - 1] ^= 1;
    const exact = await request(fixture.input, fixture.key);
    const alternate = await request(fixture.input, "capacity-alternate-00000001", changed);
    for (const response of [exact, alternate]) { assert.equal(response.status, 409); assert.equal(response.body.error.code, "project_full"); }
    assert.equal(operations.length, before);
    assert.equal(mediaOperations(projectId).length, 0);
    assert.equal(repository.load(projectId).recordDigest, fixture.state.recordDigest);
    assert.deepEqual(root.listDirectory(["studio", "projects", projectId, "renders"]), []);
    retain("capacity-retry.json", { exact, alternate, nativeWriteAttempts: operations.length - before, mediaWriteAttempts: mediaOperations(projectId).length, aggregateUnchanged: true });
  });

  await test("Multiline licensed rights survive encoded HTTP metadata and actual native persistence", async () => {
    const projectId = "project_synthetic_rights"; create(projectId);
    const rights = { status: "LICENSED", license: "Synthetic license\nSecond line\twith a tab", evidence: "Synthetic reference\r\nSecond evidence line\rThird line" };
    const metadata = input(projectId, rights);
    assert.deepEqual(validateFootageImport(metadata).rights, rights);
    const response = await request(metadata, "multiline-rights-00000001");
    assert.equal(response.status, 200, JSON.stringify(response));
    const state = repository.load(projectId), asset = state.assets[0];
    assert.equal(state.assets.length, 1); assert.deepEqual(asset.rights, rights);
    assert.equal(asset.approvalState, "DRAFT"); assert.deepEqual(state.qcResults.map(item => item.result), ["REVIEW"]);
    assert.deepEqual(repository.readFootage(projectId, asset.assetId, asset.version), footage);
    assert.equal(mediaOperations(projectId).length, 3, "600 KiB media requires two bounded parts and one index.");
    assert.ok(mediaOperations(projectId).every(item => item.bytes <= 524_288));
    retain("multiline-rights.json", { projectId, responseStatus: response.status, rights: asset.rights, approvalState: asset.approvalState, qc: state.qcResults.map(item => item.result), byteExact: true, nativeMediaWrites: mediaOperations(projectId) });
  });

  await test("D destination cannot provision a library or binding before full-aggregate rejection", () => {
    assert.ok(fixture);
    const native = tracedRoot(), library = createStudioFootageLibrary({ workspaceRoot: native, workspaceScope: { workspace: "test", namespace }, importDestination: "d-drive" });
    const dRepository = new StudioRepository(native, library), binding = library.destination();
    const dLeaf = path.join("D:/CodexForge/.codexforge/media-libraries", binding.libraryId);
    assert.equal(fs.existsSync(dLeaf), false);
    const before = operations.length;
    try {
      assert.throws(() => dRepository.importFootage(fixture.input, footage, "capacity-d-import-00000001", actor), error => error.code === "PROJECT_FULL");
      assert.equal(operations.length, before);
      assert.equal(fs.existsSync(dLeaf), false);
      assert.throws(() => native.readFile(["studio", "media-library.json"], 4096), error => error.code === "not_found");
      assert.deepEqual(native.readFile(["studio", "projects", projectId, "manifests", "project.json"], LIMIT), fixture.manifest);
      retain("d-capacity-rejection.json", { binding, dLeaf, libraryCreated: false, workspaceBindingCreated: false, nativeWriteAttempts: 0, aggregateUnchanged: true });
    } finally { dRepository.close(); }
  });

  await test("Whitespace exception stays limited to rights notes and rejects other control characters", () => {
    const metadata = input("project_synthetic_rights", { status: "LICENSED", license: "License", evidence: "Evidence" });
    for (const field of ["sourceLabel", "originalName"]) {
      assert.throws(() => validateFootageImport({ ...metadata, [field]: field === "originalName" ? "two\nlines.mp4" : "two\nlines" }));
    }
    for (const character of ["\u0000", "\u0001", "\u000b", "\u000c", "\u001f", "\u007f"]) {
      for (const field of ["license", "evidence"]) assert.throws(() => validateFootageImport({ ...metadata, rights: { ...metadata.rights, [field]: `note${character}text` } }));
    }
    assert.deepEqual(networkAttempts, []);
  });
} finally {
  repository.close();
}

const sourceUnchanged = bindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const status = results.length === 6 && results.every(item => item.status === "PASS") && networkAttempts.length === 0 && opened === closed && sourceUnchanged ? "PASS" : "FAIL";
retain("result.json", { status, startedAt, finishedAt: new Date().toISOString(), runId, namespace, tests: results, passed: results.filter(item => item.status === "PASS").length, total: results.length, networkAttempts, nativeRootsOpened: opened, nativeRootsClosed: closed, nativeExecution: true, nativeRebuilt: false, providerRequests: 0, credentialReads: 0, productionDataMutations: 0, sourceBindings: bindings, sourceUnchanged, nativeWriteLog: operations, syntheticMediaNotPlaybackEvidence: true, allEvidenceRetained: true });
console.log(JSON.stringify({ status, passed: results.filter(item => item.status === "PASS").length, total: results.length, evidence, namespace, sourceUnchanged, nativeRootsOpened: opened, nativeRootsClosed: closed }));
if (status !== "PASS") process.exitCode = 1;
