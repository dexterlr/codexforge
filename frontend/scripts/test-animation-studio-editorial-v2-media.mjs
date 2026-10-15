// Real v2 media source, native reads and HTTP boundary. Fresh C-only fixtures;
// corruption/interleaving simulations never delete or rewrite historical evidence.
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
const { StudioRepository, openStudioRepository, StudioStoreError } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const { createStudioEditorialV2MediaHandler } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-media-http.server");
const { EditorialV2StoreError } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-store.server");
const { defaultLayerTransform } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { resolveAssetPath } = loader.load("@/lib/codexforge/animation-studio/workspace");
const sha = bytes => createHash("sha256").update(bytes).digest("hex"), runId = randomUUID(), namespace = `editorial-v2-media-${runId}`;
const evidence = path.join(frontend, ".codexforge/acceptance", `studio-editorial-v2-media-tests-${runId}`), rootSegments = [".codexforge", "studio-tests", namespace];
assert.equal(fs.existsSync(path.join(frontend, ...rootSegments)), false); fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
const sourceBindings = [...new Set([...loader.loaded, "scripts/animation-studio-test-loader.mjs", "scripts/test-animation-studio-editorial-v2-media.mjs", "src/app/api/codexforge/animation-studio/editorial-v2/media/route.ts", "build/Release/codexforge_creator_filesystem.node"])].sort().map(file => ({ path: file, sha256: sha(fs.readFileSync(path.join(frontend, file))) }));
assert.equal(sourceBindings.find(item => item.path.endsWith(".node")).sha256, "848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4");
retain("intent.json", { runId, namespace, sourceBindings, scope: "Synthetic native C-only media authority and real HTTP dispatch; no browser, decoding certification, provider, D, native build or deletion." });
let serial = 0;
const now = () => new Date(Date.UTC(2026, 8, 20, 0, 0, serial++)).toISOString(), key = () => `media-test-${serial++}`, actor = "synthetic-v2-media-test";
const using = run => { const repository = openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" }); try { return run(repository); } finally { repository.close(); } };
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4f53hDgAHYgKzs+DUbgAAAABJRU5ErkJggg==", "base64");
function fixture(label, { nested = false, data = png, video = false } = {}) {
  return using(repository => {
    const projectId = `project_media_${label}`; repository.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Synthetic media authority", description: "No generated or production media", currency: "GBP", createdAt: now() }, key(), actor);
    const addAsset = (assetId, bytes) => { const createdAt = now(), contentHash = sha(bytes), asset = { schemaVersion: 1, assetId, projectId, version: 1, sourcePath: "", contentHash, assetType: "IMAGE", approvalState: "DRAFT", provenance: { adapterMetadata: null, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: createdAt, cost: { currency: "GBP", minorUnits: 0 }, contentHash, parentAssets: [], jobId: null, approvalState: "DRAFT", rejectionReason: null }, dependencies: [], rights: { status: "OWNED", license: null, evidence: "Synthetic bytes" }, createdAt, supersededBy: null, lineage: [] }; asset.sourcePath = resolveAssetPath(projectId, asset, "IMAGE", contentHash); repository.registerAsset(asset, bytes, key(), actor, now()); return asset; };
    const indirect = addAsset("asset_media_other", png);
    let asset;
    if (video) {
      const snapshot = repository.load(projectId);
      repository.importFootage({ projectId, shotId: snapshot.shots[0].shotId, expectedProjectRevision: snapshot.project.revision, expectedShotRevision: snapshot.shots[0].revision, requestedAt: now(), originalName: "synthetic.mp4", sourceLabel: "Synthetic container framing, not decoded video", rights: { status: "UNKNOWN", license: null, evidence: null } }, data, key(), actor);
      asset = repository.load(projectId).assets.at(-1);
    } else asset = addAsset("asset_media_direct", data);
    const review = repository.reviewEditorial(projectId), content = review.editorial.content, c = content.compositions[0], at = now();
    c.durationUs = 2_000_000;
    const layer = { schemaVersion: 1, layerId: "layer_media_direct", compositionId: c.compositionId, name: "Synthetic direct layer", type: asset.assetType, source: { kind: "ASSET", asset: { assetId: asset.assetId, version: 1 }, takeId: null }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 2_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: at, updatedAt: at, version: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } };
    c.layers = [layer];
    if (nested) { content.compositions.push({ ...c, compositionId: "composition_media_nested", kind: "PRECOMP", shotId: null, layers: [] }); c.layers.push({ ...layer, layerId: "layer_media_nested", type: "NESTED_COMPOSITION", source: { kind: "COMPOSITION", compositionId: "composition_media_nested" } }); }
    repository.saveEditorial({ projectId, expectedProjectRevision: review.snapshot.project.revision, expectedRevision: 0, requestedAt: now(), content }, key(), actor);
    repository.migrateEditorialV2({ operation: "COPY_V1_TO_V2", projectId, expectedProjectRevision: review.snapshot.project.revision, expectedEditorialRevision: 1, requestedAt: now() }, key(), actor);
    const selected = repository.reviewEditorialV2Composition(projectId, c.compositionId);
    return { projectId, compositionId: c.compositionId, headDigest: selected.headDigest, asset, indirect, selected, data };
  });
}
function read(repository, f, changes = {}) { return repository.readEditorialV2Media(changes.projectId ?? f.projectId, changes.compositionId ?? f.compositionId, changes.headDigest ?? f.headDigest, changes.assetId ?? f.asset.assetId, changes.version ?? 1); }
function observedRead(f, options, run) {
  const native = openCreatorNativeRoot(rootSegments, "persistent"), observed = { mediaReads: 0, writes: 0 };
  const root = new Proxy(native, { get(target, method) {
    if (method === "readFile") return (...args) => {
      if (args[0].join("/") === f.asset.sourcePath) { observed.mediaReads++; if (options.beforeMedia) options.beforeMedia(); if (options.missing) throw Object.assign(Error("synthetic missing media"), { code: "not_found" }); const bytes = target.readFile(...args); return options.corrupt ? Buffer.from("synthetic bad hash") : bytes; }
      return target.readFile(...args);
    };
    if (["writeAtomicExclusive", "writeAtomicReplace", "removeTree", "removeRoot", "compareDeleteExact"].includes(method)) return () => { observed.writes++; throw Error("Media read must not publish or delete"); };
    const value = Reflect.get(target, method); return typeof value === "function" ? value.bind(target) : value;
  } });
  const repository = new StudioRepository(root); try { run(repository, observed); assert.equal(observed.writes, 0); } finally { repository.close(); }
}
const base = "http://127.0.0.1:3351/api/codexforge/animation-studio/editorial-v2/media";
const query = f => new URLSearchParams({ projectId: f.projectId, compositionId: f.compositionId, headDigest: f.headDigest, assetId: f.asset.assetId, version: "1" });
function request(f, changes = {}) {
  const headers = new Headers({ Host: "127.0.0.1:3351", "X-CodexForge-Animation-Studio": "local-operator-v1", "Sec-Fetch-Site": "same-origin" });
  for (const [name, value] of Object.entries(changes.headers ?? {})) { if (value === null) headers.delete(name); else headers.set(name, value); }
  return new Request(changes.url ?? `${base}?${query(f)}`, { method: changes.method ?? "GET", headers, ...(changes.signal ? { signal: changes.signal } : {}) });
}
function harness(options = {}) {
  const bytes = options.bytes ?? png, counts = { opens: 0, mediaOpens: 0, reads: 0, readerCloses: 0, closes: 0 }, readCalls = [];
  const fake = {
    openEditorialV2Media(...args) {
      counts.mediaOpens++; if (options.error) throw options.error;
      const reader = {
        byteLength: bytes.length, contentHash: sha(bytes),
        read(offset, length) { counts.reads++; readCalls.push({ offset, length }); assert.ok(length <= 524_288); if (options.readError) throw options.readError; return bytes.subarray(offset, offset + length); },
        close() { counts.readerCloses++; if (options.readerCloseError) throw options.readerCloseError; },
      };
      return { reader, contentType: options.contentType ?? "image/png", projectId: args[0], compositionId: args[1], headDigest: args[2], assetId: args[3], version: args[4], contentHash: sha(bytes) };
    },
    close() { counts.closes++; if (options.closeError) throw options.closeError; },
  };
  const handler = createStudioEditorialV2MediaHandler({ enabled: options.enabled ?? true, listenerAddresses: () => options.listeners ?? ["127.0.0.1"], openRepository() { counts.opens++; if (options.openError) throw options.openError; return fake; } });
  return { handler, counts, readCalls };
}
const results = [], test = async (name, run) => { try { await run(); results.push({ name, status: "PASS" }); } catch (error) { results.push({ name, status: "FAIL", error: String(error.stack ?? error) }); } };
const code = value => error => error?.code === value;
let main;
await test("Native direct PNG bytes bind exact project composition head asset version and hash without writes", () => { main = fixture("main"); observedRead(main, {}, (repository, observed) => { const media = read(repository, main); assert.deepEqual(media.bytes, png); assert.equal(media.contentHash, sha(png)); assert.equal(media.contentType, "image/png"); for (const field of ["projectId", "compositionId", "headDigest"]) assert.equal(media[field], main[field]); assert.equal(media.assetId, main.asset.assetId); assert.equal(media.version, 1); assert.equal(observed.mediaReads, 1); }); });
await test("Unrelated registered assets missing versions and wrong selected IDs cannot grant byte access", () => { for (const changes of [{ assetId: main.indirect.assetId }, { version: 2 }, { compositionId: "composition_absent" }, { projectId: "project_absent" }, { headDigest: "a".repeat(64) }]) observedRead(main, {}, (repository, observed) => { assert.throws(() => read(repository, main, changes)); assert.equal(observed.mediaReads, 0); }); });
await test("Malformed direct method identities and digest fail before media access", () => { for (const changes of [{ projectId: "../unsafe" }, { assetId: "asset_UPPER" }, { compositionId: "bad" }, { headDigest: "A".repeat(64) }, { version: 0 }, { version: 1.2 }, { version: Number.MAX_SAFE_INTEGER + 1 }]) observedRead(main, {}, (repository, observed) => { assert.throws(() => read(repository, main, changes), code("EDITORIAL_V2_INVALID")); assert.equal(observed.mediaReads, 0); }); });
await test("Nested composition blocks even its otherwise valid direct PNG", () => { const f = fixture("nested", { nested: true }); observedRead(f, {}, (repository, observed) => { assert.throws(() => read(repository, f), code("UNSUPPORTED_EDITORIAL_MEDIA")); assert.equal(observed.mediaReads, 0); }); });
await test("Missing and changed asset bytes fail closed with immutable originals retained", () => { for (const options of [{ missing: true }, { corrupt: true }]) observedRead(main, options, repository => assert.throws(() => read(repository, main))); using(repository => assert.deepEqual(read(repository, main).bytes, png)); });
await test("Unsupported registered payload does not become an image preview", () => { const f = fixture("unsupported", { data: Buffer.from("not an image") }); using(repository => assert.throws(() => read(repository, f), code("UNSUPPORTED_EDITORIAL_MEDIA"))); });
await test("JPEG header contract remains the existing bounded registered-byte contract, not decoding certification", () => { const f = fixture("jpeg", { data: Buffer.from([255, 216, 255, 224]) }); using(repository => assert.equal(read(repository, f).contentType, "image/jpeg")); });
await test("Legacy direct repository MP4 read retains complete verified bytes and exact source hash", () => { const box = (type, payload) => { const value = Buffer.alloc(8 + payload.length); value.writeUInt32BE(value.length); value.write(type, 4, "ascii"); payload.copy(value, 8); return value; }; const data = Buffer.concat([box("ftyp", Buffer.from("isom\0\0\0\0isom", "binary")), box("moov", Buffer.alloc(8)), box("mdat", Buffer.alloc(600_000, 42))]); const f = fixture("mp4", { data, video: true }); using(repository => { const media = repository.readEditorialMedia(f.projectId, f.asset.assetId, 1); assert.equal(media.contentType, "video/mp4"); assert.deepEqual(media.bytes, data); assert.equal(sha(media.bytes), f.asset.contentHash); }); });
await test("Concurrent v2 head advance during native asset read prevents returning bytes", () => { const f = fixture("head_race"); observedRead(f, { beforeMedia() { using(repository => repository.editEditorialV2Layer({ operation: "SET_LAYER_PROPERTIES", projectId: f.projectId, compositionId: f.compositionId, layerId: "layer_media_direct", expectedRevision: 1, expectedCompositionRevision: 1, changes: { opacity: 0.5 }, requestedAt: now() }, key(), actor)); } }, repository => assert.throws(() => read(repository, f), code("EDITORIAL_V2_CONFLICT"))); });
await test("Copied v2 head remains readable when its original editorial anchor advances", () => { const f = fixture("anchor_race"); observedRead(f, { beforeMedia() { using(repository => { const current = repository.reviewEditorial(f.projectId); repository.saveEditorial({ projectId: f.projectId, expectedProjectRevision: current.snapshot.project.revision, expectedRevision: current.editorial.revision, requestedAt: now(), content: current.editorial.content }, key(), actor); }); } }, repository => { const media = read(repository, f); assert.deepEqual(media.bytes, png); assert.equal(media.headDigest, f.headDigest); }); });
await test("Undo restores exact composition content under a new head while the obsolete preview head stays rejected", async () => {
  const f = fixture("history_head"), original = f.selected;
  const result = using(repository => {
    repository.editEditorialV2Layer({ operation: "SET_LAYER_PROPERTIES", projectId: f.projectId, compositionId: f.compositionId, layerId: "layer_media_direct", expectedRevision: original.revision, expectedCompositionRevision: original.composition.revision, changes: { opacity: 0.5 }, requestedAt: now() }, key(), actor);
    const edited = repository.reviewEditorialV2Composition(f.projectId, f.compositionId), undo = edited.history.undo;
    assert.equal(undo.available, true); assert.equal(undo.command, "UNDO_EDITORIAL_EDIT"); assert.equal(undo.targetOperation, "SET_LAYER_PROPERTIES");
    repository.navigateEditorialV2History({ operation: undo.command, projectId: f.projectId, expectedRevision: edited.revision, expectedHeadDigest: edited.headDigest, compositionId: undo.compositionId, expectedCompositionRevision: undo.compositionRevision, requestedAt: now() }, key(), actor);
    return { editedCompositionRevision: edited.composition.revision, restored: repository.reviewEditorialV2Composition(f.projectId, f.compositionId) };
  });
  const { editedCompositionRevision, restored } = result;
  const { revision: originalCompositionRevision, ...originalComposition } = original.composition;
  const { revision: restoredCompositionRevision, ...restoredComposition } = restored.composition;
  assert.deepEqual(restoredComposition, originalComposition);
  assert.equal(editedCompositionRevision, originalCompositionRevision + 1);
  assert.equal(restoredCompositionRevision, editedCompositionRevision + 1);
  assert.notEqual(restored.headDigest, original.headDigest); assert.equal(restored.revision, original.revision + 2);
  using(repository => {
    assert.throws(() => read(repository, f, { headDigest: original.headDigest }), code("EDITORIAL_V2_CONFLICT"));
    const current = read(repository, f, { headDigest: restored.headDigest }); assert.deepEqual(current.bytes, png); assert.equal(current.headDigest, restored.headDigest);
  });
  const handler = createStudioEditorialV2MediaHandler({ enabled: true, listenerAddresses: () => ["127.0.0.1"], openRepository: () => openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" }) });
  const stale = await handler(request(f, { url: `${base}?${query({ ...f, headDigest: original.headDigest })}` })); assert.equal(stale.status, 409);
  const currentFixture = { ...f, headDigest: restored.headDigest }, response = await handler(request(currentFixture)); assert.equal(response.status, 200); assert.deepEqual(Buffer.from(await response.arrayBuffer()), png);
  for (const [name, value] of Object.entries({ "cache-control": "no-store", "x-content-type-options": "nosniff", "content-security-policy": "default-src 'none'; sandbox", "x-codexforge-editorial-head": restored.headDigest, "x-codexforge-content-sha256": sha(png) })) assert.equal(response.headers.get(name), value);
});
await test("HTTP actual native repository returns identity hash and complete-byte safe headers", async () => { const handler = createStudioEditorialV2MediaHandler({ enabled: true, listenerAddresses: () => ["127.0.0.1"], openRepository: () => openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" }) }); for (const next of [false, true]) { const req = request(main), response = await handler(next ? new NextRequest(req) : req); assert.equal(response.status, 200); assert.deepEqual(Buffer.from(await response.arrayBuffer()), png); for (const [name, value] of Object.entries({ "cache-control": "no-store", "x-content-type-options": "nosniff", "content-security-policy": "default-src 'none'; sandbox", "content-type": "image/png", "content-length": String(png.length), "x-codexforge-project-id": main.projectId, "x-codexforge-composition-id": main.compositionId, "x-codexforge-editorial-head": main.headDigest, "x-codexforge-asset-id": main.asset.assetId, "x-codexforge-asset-version": "1", "x-codexforge-content-sha256": sha(png) })) assert.equal(response.headers.get(name), value); assert.equal(response.headers.get("access-control-allow-origin"), null); } });
await test("Missing duplicate and extra query fields reject before repository admission", async () => { for (const name of [...query(main).keys()]) for (const kind of ["missing", "duplicate", "extra"]) { const p = query(main); if (kind === "missing") p.delete(name); else if (kind === "duplicate") p.append(name, p.get(name)); else p.append("unapproved", name); const h = harness(), response = await h.handler(request(main, { url: `${base}?${p}` })); assert.equal(response.status, 400); assert.equal(h.counts.opens, 0); } });
await test("Query identities heads and integer versions require exact canonical values", async () => { for (const [field, values] of Object.entries({ projectId: ["project_UPPER", "../bad", ""], assetId: ["asset_UPPER", "../bad", ""], compositionId: ["composition_UPPER", "../bad", "c".repeat(129)], headDigest: ["A".repeat(64), "a".repeat(63), "g".repeat(64), ""], version: ["0", "-0", "01", "1.0", "1e0", "9007199254740992", " 1", ""] })) for (const value of values) { const p = query(main); p.set(field, value); const h = harness(); assert.equal((await h.handler(request(main, { url: `${base}?${p}` }))).status, 400); assert.equal(h.counts.opens, 0); } const p = query(main); p.set("version", String(Number.MAX_SAFE_INTEGER)); const h = harness(), response = await h.handler(request(main, { url: `${base}?${p}` })); assert.equal(response.status, 200); await response.arrayBuffer(); assert.equal(h.counts.mediaOpens, 1); });
await test("A single 0-11 range opens the reader and returns exact bounded bytes", async () => { const h = harness(), response = await h.handler(request(main, { headers: { Range: "bytes=0-11" } })); assert.equal(response.status, 206); assert.equal(response.headers.get("Accept-Ranges"), "bytes"); assert.equal(response.headers.get("Content-Range"), `bytes 0-11/${png.length}`); assert.equal(response.headers.get("Content-Length"), "12"); assert.deepEqual(Buffer.from(await response.arrayBuffer()), png.subarray(0, 12)); assert.deepEqual(h.readCalls, [{ offset: 0, length: 12 }]); assert.deepEqual(h.counts, { opens: 1, mediaOpens: 1, reads: 1, readerCloses: 1, closes: 1 }); });
await test("Invalid and multiple ranges return 416 only after opening and close without reading", async () => { for (const value of ["bytes=0-1,2-3", "bytes=999-1000", "bytes=-0", "items=0-1"]) { const h = harness(), response = await h.handler(request(main, { headers: { Range: value } })); assert.equal(response.status, 416); assert.equal(response.headers.get("Content-Range"), `bytes */${png.length}`); assert.deepEqual(h.counts, { opens: 1, mediaOpens: 1, reads: 0, readerCloses: 1, closes: 1 }); } });
await test("Body metadata and cancelled requests reject before opening storage", async () => { for (const headers of [{ "Content-Length": "1" }, { "Content-Length": "00" }, { "Transfer-Encoding": "chunked" }, { "Content-Encoding": "identity" }]) { const h = harness(); assert.equal((await h.handler(request(main, { headers }))).status, 400); assert.equal(h.counts.opens, 0); } const controller = new AbortController(); controller.abort(); const h = harness(); assert.equal((await h.handler(request(main, { signal: controller.signal }))).status, 400); assert.equal(h.counts.opens, 0); const accepted = harness(), response = await accepted.handler(request(main, { headers: { "Content-Length": "0" } })); assert.equal(response.status, 200); await response.arrayBuffer(); });
await test("Marker-less native media is admitted only with same-origin fetch metadata", async () => { const admitted = harness(), response = await admitted.handler(request(main, { headers: { "X-CodexForge-Animation-Studio": null } })); assert.equal(response.status, 200); await response.arrayBuffer(); assert.equal(admitted.counts.mediaOpens, 1); for (const site of [null, "cross-site", "same-site"]) { const h = harness(); assert.equal((await h.handler(request(main, { headers: { "X-CodexForge-Animation-Studio": null, "Sec-Fetch-Site": site } }))).status, 403); assert.equal(h.counts.opens, 0); } });
await test("Shared loopback origin proxy and listener checks remain mandatory", async () => { for (const headers of [{ Host: "localhost:3351" }, { Origin: "http://evil.invalid" }, { "Sec-Fetch-Site": "cross-site" }, { "x-forwarded-for": "8.8.8.8" }, { Forwarded: "for=127.0.0.1" }]) { const h = harness(); assert.equal((await h.handler(request(main, { headers }))).status, 403); assert.equal(h.counts.opens, 0); } for (const listeners of [[], ["0.0.0.0"], ["127.0.0.1", "::"]]) { const h = harness({ listeners }); assert.equal((await h.handler(request(main))).status, 503); assert.equal(h.counts.opens, 0); } });
await test("GET completion cancellation and HEAD release reader and repository ownership", async () => { const complete = harness(), completeResponse = await complete.handler(request(main)); assert.equal(complete.counts.closes, 0); await completeResponse.arrayBuffer(); assert.deepEqual(complete.counts, { opens: 1, mediaOpens: 1, reads: 1, readerCloses: 1, closes: 1 }); const cancelled = harness({ bytes: Buffer.alloc(600_000, 7) }), cancelledResponse = await cancelled.handler(request(main)); const reader = cancelledResponse.body.getReader(); await reader.read(); await reader.cancel(); assert.equal(cancelled.counts.readerCloses, 1); assert.equal(cancelled.counts.closes, 1); const head = harness(), headResponse = await head.handler(request(main, { method: "HEAD", headers: { Range: "bytes=0-11" } })); assert.equal(headResponse.status, 206); assert.equal(headResponse.body, null); assert.equal(headResponse.headers.get("Content-Range"), `bytes 0-11/${png.length}`); assert.deepEqual(head.counts, { opens: 1, mediaOpens: 1, reads: 0, readerCloses: 1, closes: 1 }); });
await test("Disabled non-read methods and competing route paths cannot request bytes", async () => { const disabled = harness({ enabled: false }); assert.equal((await disabled.handler(request(main))).status, 503); assert.equal(disabled.counts.opens, 0); for (const method of ["POST", "PUT", "PATCH", "DELETE"]) { const h = harness(); assert.equal((await h.handler(request(main, { method }))).status, 405); assert.equal(h.counts.opens, 0); } for (const route of [base.replace("editorial-v2", "editorial"), base + "/"]) { const h = harness(); assert.equal((await h.handler(request(main, { url: `${route}?${query(main)}` }))).status, 403); assert.equal(h.counts.opens, 0); } });
await test("Primary safe failures survive secondary repository close failure without leaking private diagnostics", async () => { for (const [error, status] of [[new EditorialV2StoreError("EDITORIAL_V2_INVALID", "SECRET"), 400], [new EditorialV2StoreError("EDITORIAL_V2_CONFLICT", "SECRET"), 409], [new EditorialV2StoreError("EDITORIAL_V2_UNAVAILABLE", "SECRET"), 503], [new StudioStoreError("UNSUPPORTED_EDITORIAL_MEDIA", "SECRET"), 415], [Error("SECRET"), 503]]) { const h = harness({ error, closeError: Error("SECRET close") }), response = await h.handler(request(main)); assert.equal(response.status, status); assert.equal((await response.text()).includes("SECRET"), false); assert.deepEqual(h.counts, { opens: 1, mediaOpens: 1, reads: 0, readerCloses: 0, closes: 1 }); } });
await test("Streaming close failure rejects body consumption without retroactively changing 200", async () => { for (const option of ["closeError", "readerCloseError"]) { const h = harness({ [option]: Error("SECRET close") }), response = await h.handler(request(main)); assert.equal(response.status, 200); await assert.rejects(() => response.arrayBuffer(), /SECRET close/); assert.equal(response.status, 200); assert.equal(h.counts.readerCloses, 1); assert.equal(h.counts.closes, 1); } const h = harness({ openError: Error("SECRET open") }), response = await h.handler(request(main)); assert.equal(response.status, 503); assert.equal((await response.text()).includes("SECRET"), false); assert.deepEqual(h.counts, { opens: 1, mediaOpens: 0, reads: 0, readerCloses: 0, closes: 0 }); });
await test("Route is dynamic Node GET and HEAD with existing explicit operator enablement", () => { const route = fs.readFileSync(path.join(frontend, "src/app/api/codexforge/animation-studio/editorial-v2/media/route.ts"), "utf8"); assert.match(route, /runtime = "nodejs"/); assert.match(route, /dynamic = "force-dynamic"/); assert.match(route, /export function GET/); assert.match(route, /export const HEAD = GET/); assert.doesNotMatch(route, /export (?:function|const) (POST|PUT|PATCH|DELETE)/); assert.deepEqual([...route.matchAll(/process\.env\.([A-Z_]+)/g)].map(m => m[1]), ["CODEXFORGE_STUDIO_OPERATOR_ENABLED"]); });
const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256), passed = results.filter(item => item.status === "PASS").length;
const status = passed === results.length && sourceUnchanged && networkAttempts.length === 0 ? "PASS" : "FAIL";
retain("result.json", { runId, namespace, status, planned: results.length, passed, results, sourceBindings, sourceUnchanged, networkAttempts, providerRequests: 0, credentialsRead: 0, nativeRebuilt: false, serverStarted: false, productionMutations: 0, dWrites: 0, historicalEvidenceWrites: 0, limitations: "Synthetic image bytes and injected interleavings. MIME tests do not certify actual media decoding. HTTP uses real source plus native repository for the successful path and explicit doubles for failure timing." });
console.log(JSON.stringify({ status, planned: results.length, passed, failures: results.filter(item => item.status !== "PASS"), evidence, sourceUnchanged, networkAttempts }));
if (status !== "PASS") process.exitCode = 1;
