import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { NextRequestAdapter } from "next/dist/server/web/spec-extension/adapters/next-request.js";
import { createStudioTestLoader, blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontendRoot);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontendRoot);
const {
  createStudioFootageUploadHandler, STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES,
  STUDIO_FOOTAGE_UPLOAD_MAX_BYTES, STUDIO_FOOTAGE_UPLOAD_STORAGE_RESERVE_BYTES,
} = loader.load("@/lib/codexforge/animation-studio/footage-upload-http.server");
const {
  assertStudioEditorialV2MediaRequest, assertStudioEditorialV2NativeMediaRequest,
  assertStudioFootageMediaRequest, assertStudioFootageRequest,
} = loader.load("@/lib/codexforge/animation-studio/operator-http.server");
const { StudioMediaImportError } = loader.load("@/lib/codexforge/animation-studio/footage-import.server");
const { StudioStoreError } = loader.load("@/lib/codexforge/animation-studio/store.server");

const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const evidenceRoot = path.join(frontendRoot, ".codexforge", "acceptance", `studio-footage-upload-session-tests-${randomUUID()}`);
const workRoot = path.join(evidenceRoot, "work");
fs.mkdirSync(workRoot, { recursive: true });
const configuration = Object.freeze({
  enabled: true, rendererVersion: "upload-session-test", workRoot,
  ffmpeg: { path: "C:\\qualified\\ffmpeg.exe", sha256: "1".repeat(64) },
  ffprobe: { path: "C:\\qualified\\ffprobe.exe", sha256: "2".repeat(64) },
  font: { path: "C:\\Windows\\Fonts\\arial.ttf", sha256: "3".repeat(64), ref: "ARIAL_REGULAR" },
});
const baseUrl = "http://127.0.0.1:3379/api/codexforge/animation-studio/footage/upload";
let clockTick = 0, importCalls = 0, capacityCalls = 0, qualifierCalls = 0;
let nextImportFailure = null, nextQualifierFailure = null, failManifestOnceFor = null, nextQualifierGate = null;
const receipts = new Map();
const now = () => new Date(Date.UTC(2026, 8, 28, 20, 0, clockTick++)).toISOString();
const metadata = (suffix, mediaType = "VIDEO") => encodeURIComponent(JSON.stringify({
  projectId: `project_upload_${suffix}`, shotId: `shot_upload_${suffix}`,
  expectedProjectRevision: 1, expectedShotRevision: 1, requestedAt: now(),
  originalName: mediaType === "VIDEO" ? `${suffix}.mp4` : `${suffix}.wav`, sourceLabel: `Synthetic ${suffix}`,
  rights: { status: "OWNED", license: "Created locally", evidence: "Focused upload-session regression" }, mediaType,
}));
const repositories = [];
function openRepository() {
  const repository = {
    assertFootageImportCapacity(input, expectedBytes) { capacityCalls++; assert.match(input.projectId, /^project_/); assert.ok(expectedBytes >= 1 && expectedBytes <= STUDIO_FOOTAGE_UPLOAD_MAX_BYTES); },
    importFootageFile(input, staged, key, actor) {
      if (nextImportFailure) { const failure = nextImportFailure; nextImportFailure = null; throw failure; }
      if (receipts.has(key)) return receipts.get(key);
      importCalls++; assert.equal(actor, "local-studio-footage-upload-session");
      const blocks = [];
      for (let offset = 0; offset < staged.byteLength; offset += 3) blocks.push(staged.read(offset, Math.min(3, staged.byteLength - offset)));
      const bytes = Buffer.concat(blocks); assert.equal(bytes.length, staged.byteLength); assert.equal(sha(bytes), staged.contentHash);
      const result = { status: "APPLIED", code: "LOCAL_MEDIA_IMPORTED_REVIEW_REQUIRED", revision: 2, value: { projectId: input.projectId } };
      receipts.set(key, result); return result;
    },
    loadManifest(projectId) {
      if (failManifestOnceFor === projectId) { failManifestOnceFor = null; throw new Error("Injected readback failure after publication."); }
      return { schemaVersion: 1, project: { projectId, revision: 2 }, shots: [], assets: [], approvals: [], events: [], qcResults: [] };
    },
    close() { this.closed = true; },
  };
  repositories.push(repository); return repository;
}
async function qualifyImport(input) {
  if (nextQualifierFailure) { const failure = nextQualifierFailure; nextQualifierFailure = null; throw failure; }
  qualifierCalls++; const bytes = fs.readFileSync(input.sourcePath);
  assert.equal(bytes.length, input.expectedBytes); assert.equal(sha(bytes), input.expectedHash);
  if (nextQualifierGate) { const gate = nextQualifierGate; nextQualifierGate = null; await gate(); }
  let closed = false;
  return Object.freeze({
    mediaType: input.mediaType, contentType: input.mediaType === "VIDEO" ? "video/mp4" : "audio/wav", byteLength: bytes.length, contentHash: input.expectedHash,
    technical: input.mediaType === "VIDEO"
      ? { schema: "studio-qualified-local-media-v1", mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width: 1280, height: 720, frameRate: { numerator: 25, denominator: 1 }, frameCadence: "CFR_25_EXACT", duration: { numerator: 1, denominator: 1 }, sourceUnits: 25, sourceUnit: "FRAME", timeBase: { numerator: 1, denominator: 12800 }, colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1, probeDigest: sha("probe") }
      : { schema: "studio-qualified-local-media-v1", mediaType: "AUDIO", contentType: "audio/wav", container: "wav", codec: "pcm_s16le", sampleFormat: "s16", sampleRate: 48000, channels: 2, channelLayout: "stereo", duration: { numerator: 1, denominator: 1 }, sourceUnits: 48000, sourceUnit: "SAMPLE", timeBase: { numerator: 1, denominator: 48000 }, streamCount: 1, probeDigest: sha("probe") },
    read(offset, length) { assert.equal(closed, false); return Buffer.from(bytes.subarray(offset, offset + length)); }, close() { closed = true; },
  });
}
const handler = createStudioFootageUploadHandler({ enabled: true, openRepository, listenerAddresses: () => ["127.0.0.1"], now, configuration: () => configuration, qualifyImport });
const results = [];
async function test(label, run) {
  try { await run(); results.push({ label, status: "PASS" }); console.log(`PASS ${label}`); }
  catch (error) { results.push({ label, status: "FAIL", error: { name: error.name, message: error.message, stack: error.stack } }); console.log(`FAIL ${label}: ${error.message}`); }
}
function headers(extra = {}) {
  return new Headers({ Host: "127.0.0.1:3379", Origin: "http://127.0.0.1:3379", "Sec-Fetch-Site": "same-origin", "X-CodexForge-Animation-Studio": "local-operator-v1", ...extra });
}
async function call(method, query = "", body = null, extra = {}) {
  const requestHeaders = headers(extra.headers ?? {}), init = { method, headers: requestHeaders };
  if (body !== null) init.body = body;
  const response = await handler(new Request(baseUrl + query, init));
  return { status: response.status, body: await response.json() };
}
function adapterBody(bytes = null) {
  return new ReadableStream({ start(controller) { if (bytes) controller.enqueue(bytes); controller.close(); } });
}
async function adapterCall(method, query = "", body = adapterBody(), extra = {}) {
  const requestHeaders = headers(extra.headers ?? {});
  const response = await handler(new Request(baseUrl + query, { method, headers: requestHeaders, body, duplex: "half", ...(extra.signal ? { signal: extra.signal } : {}) }));
  return { status: response.status, body: await response.json() };
}
async function nextAdapterCall(method, query, chunks, extraHeaders = {}) {
  const request = NextRequestAdapter.fromNodeNextRequest({ method, url: baseUrl + query, headers: Object.fromEntries(headers(extraHeaders)), body: Readable.from(chunks) }, new AbortController().signal);
  assert.notEqual(request.body, null, "Installed Next adapter supplies a stream even when the Node stream is empty.");
  const response = await handler(request);
  return { status: response.status, body: await response.json() };
}
async function create(label, expectedBytes, key = `upload-key-${label}`, encoded = metadata(label)) {
  return call("POST", "", JSON.stringify({ metadata: encoded, expectedBytes }), { headers: { "Content-Type": "application/json", "Idempotency-Key": key } });
}
async function withStaged(label, run, expectedBytes = 4, bytes = Buffer.from("data")) {
  const key = `upload-key-${label}`, created = await create(label, expectedBytes, key);
  assert.equal(created.status, 201, JSON.stringify(created.body));
  const session = created.body.result.sessionId, query = `?sessionId=${session}`;
  try {
    assert.equal((await call("PUT", `${query}&offset=0`, bytes, { headers: { "Content-Type": "application/octet-stream" } })).status, 200);
    await run({ session, key, query });
  } finally {
    const state = JSON.parse(fs.readFileSync(path.join(workRoot, "footage-upload-sessions-v1", session, "state.json"), "utf8"));
    if (state.status !== "COMPLETE") assert.equal((await call("DELETE", query)).status, 200, "Only this synthetic test session is cancelled after its assertions.");
  }
}
function stagedIdentity(session) {
  const directory = path.join(workRoot, "footage-upload-sessions-v1", session), source = fs.readFileSync(path.join(directory, "source.mp4"));
  return { bytes: source.length, sha256: sha(source), stateSha256: sha(fs.readFileSync(path.join(directory, "state.json"))), importCalls, qualifierCalls, receipts: receipts.size };
}
async function assertRejectedWithoutMutation(session, requestResult, expectedStatus = 400, expectedCode = "unexpected_upload_body") {
  const before = stagedIdentity(session), result = await requestResult();
  assert.equal(result.status, expectedStatus, JSON.stringify(result.body)); assert.equal(result.body.error.code, expectedCode);
  assert.deepEqual(stagedIdentity(session), before, "Rejected request must preserve the exact staged bytes, durable acknowledgement, and publication counters.");
}

await test("01 fixed policy exposes 2 GiB source, 8 MiB chunk and 4 GiB reserve bounds", () => {
  assert.equal(STUDIO_FOOTAGE_UPLOAD_MAX_BYTES, 2_147_483_648);
  assert.equal(STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES, 8_388_608);
  assert.equal(STUDIO_FOOTAGE_UPLOAD_STORAGE_RESERVE_BYTES, 4_294_967_296);
});
await test("02 native-media assertions omit only the marker and retain same-origin fetch metadata", () => {
  const mediaHeaders = new Headers({ Host: "127.0.0.1:3379", "Sec-Fetch-Site": "same-origin" });
  assert.doesNotThrow(() => assertStudioFootageMediaRequest(new Request("http://127.0.0.1:3379/api/codexforge/animation-studio/footage", { headers: mediaHeaders }), ["127.0.0.1"]));
  assert.doesNotThrow(() => assertStudioEditorialV2NativeMediaRequest(new Request("http://127.0.0.1:3379/api/codexforge/animation-studio/editorial-v2/media", { headers: mediaHeaders }), ["127.0.0.1"]));
  assert.throws(() => assertStudioFootageRequest(new Request("http://127.0.0.1:3379/api/codexforge/animation-studio/footage", { headers: mediaHeaders }), ["127.0.0.1"]));
  assert.doesNotThrow(() => assertStudioEditorialV2MediaRequest(new Request("http://127.0.0.1:3379/api/codexforge/animation-studio/editorial-v2/media", { headers: new Headers({ Host: "127.0.0.1:3379", "X-CodexForge-Animation-Studio": "local-operator-v1" }) }), ["127.0.0.1"]));
  assert.throws(() => assertStudioEditorialV2NativeMediaRequest(new Request("http://127.0.0.1:3379/api/codexforge/animation-studio/editorial-v2/media", { headers: new Headers({ Host: "127.0.0.1:3379" }) }), ["127.0.0.1"]));
});
let primarySession, primaryKey = "upload-key-primary-0001", primaryMetadata = metadata("primary");
await test("03 create is idempotent, validates capacity first and rejects changed reuse", async () => {
  const first = await create("primary", 10, primaryKey, primaryMetadata); assert.equal(first.status, 201, JSON.stringify(first.body)); primarySession = first.body.result.sessionId;
  assert.match(primarySession, /^upload_[a-f0-9]{48}$/); assert.equal(first.body.result.status, "UPLOADING"); assert.equal(capacityCalls, 1);
  const replay = await create("primary", 10, primaryKey, primaryMetadata); assert.equal(replay.status, 200); assert.equal(replay.body.replayed, true); assert.equal(replay.body.result.sessionId, primarySession); assert.equal(capacityCalls, 1);
  const conflict = await create("primary", 11, primaryKey, primaryMetadata); assert.equal(conflict.status, 409); assert.equal(conflict.body.error.code, "idempotency_conflict");
});
await test("04 bounded sequential chunks acknowledge exact duplicates and reject conflicting replacement or offsets", async () => {
  const first = Buffer.from("abcdef"), second = Buffer.from("ghij");
  let response = await call("PUT", `?sessionId=${primarySession}&offset=0`, first, { headers: { "Content-Type": "application/octet-stream", "Content-Length": String(first.length) } });
  assert.equal(response.status, 200, JSON.stringify(response.body)); assert.equal(response.body.result.receivedBytes, 6); assert.equal(response.body.duplicate, false);
  response = await call("PUT", `?sessionId=${primarySession}&offset=0`, first, { headers: { "Content-Type": "application/octet-stream" } }); assert.equal(response.status, 200); assert.equal(response.body.duplicate, true);
  response = await call("PUT", `?sessionId=${primarySession}&offset=0`, Buffer.from("ABCDEF"), { headers: { "Content-Type": "application/octet-stream" } }); assert.equal(response.status, 409);
  response = await call("PUT", `?sessionId=${primarySession}&offset=7`, second, { headers: { "Content-Type": "application/octet-stream" } }); assert.equal(response.status, 409);
  response = await call("PUT", `?sessionId=${primarySession}&offset=6`, second, { headers: { "Content-Type": "application/octet-stream" } }); assert.equal(response.status, 200); assert.equal(response.body.result.receivedBytes, 10); assert.equal(response.body.result.acknowledgedChunks, 2);
});
await test("05 finalize hashes actual bytes, probes once, publishes once, cleans staging and replays completion", async () => {
  let response = await call("GET", `?sessionId=${primarySession}`);
  assert.equal(response.status, 200); assert.equal(response.body.result.status, "INTERRUPTED"); assert.equal(response.body.result.canUpload, false); assert.equal(response.body.result.canFinalize, true);
  response = await call("PATCH", `?sessionId=${primarySession}`, null, { headers: { "Idempotency-Key": primaryKey } });
  assert.equal(response.status, 200, JSON.stringify(response.body)); assert.equal(response.body.result.status, "COMPLETE"); assert.equal(response.body.result.snapshot.project.projectId, "project_upload_primary");
  assert.equal(importCalls, 1); assert.equal(qualifierCalls, 1);
  response = await call("PATCH", `?sessionId=${primarySession}`, null, { headers: { "Idempotency-Key": primaryKey } });
  assert.equal(response.status, 200); assert.equal(response.body.replayed, true); assert.equal(importCalls, 1); assert.equal(qualifierCalls, 1);
  const sessionDir = path.join(workRoot, "footage-upload-sessions-v1", primarySession);
  assert.equal(fs.existsSync(path.join(sessionDir, "source.mp4")), false); assert.equal(fs.existsSync(path.join(sessionDir, "state.json")), true);
});
await test("06 status inspection cannot interrupt an in-flight bounded chunk write", async () => {
  const key = "upload-key-inflight-write", created = await create("inflight_write", 4, key); assert.equal(created.status, 201, JSON.stringify(created.body)); const session = created.body.result.sessionId;
  let controller;
  const body = new ReadableStream({ start(value) { controller = value; } });
  const request = new Request(`${baseUrl}?sessionId=${session}&offset=0`, { method: "PUT", headers: headers({ "Content-Type": "application/octet-stream" }), body, duplex: "half" });
  const pending = handler(request);
  const inspected = await call("GET", `?sessionId=${session}`);
  assert.equal(inspected.status, 200); assert.equal(inspected.body.result.status, "UPLOADING"); assert.equal(inspected.body.result.receivedBytes, 0);
  controller.enqueue(Buffer.from("data")); controller.close();
  const response = await pending; assert.equal(response.status, 200); const result = await response.json(); assert.equal(result.result.receivedBytes, 4);
  assert.equal((await call("DELETE", `?sessionId=${session}`)).status, 200);
});
await test("07 one durable active claim blocks another session; recovery is honest and explicit cancel releases it", async () => {
  const first = await create("interrupt", 4); assert.equal(first.status, 201); const session = first.body.result.sessionId;
  const blocked = await create("blocked", 4); assert.equal(blocked.status, 409); assert.equal(blocked.body.error.code, "import_busy");
  const inspected = await call("GET", `?sessionId=${session}`); assert.equal(inspected.status, 200); assert.equal(inspected.body.result.status, "INTERRUPTED"); assert.equal(inspected.body.result.canUpload, false);
  const append = await call("PUT", `?sessionId=${session}&offset=0`, Buffer.from("abcd"), { headers: { "Content-Type": "application/octet-stream" } }); assert.equal(append.status, 409);
  const cancelled = await call("DELETE", `?sessionId=${session}`); assert.equal(cancelled.status, 200); assert.equal(cancelled.body.result.status, "CANCELLED");
  const after = await create("after_cancel", 4); assert.equal(after.status, 201); await call("DELETE", `?sessionId=${after.body.result.sessionId}`);
});
await test("08 source-size and per-request chunk boundaries reject before allocation or publication", async () => {
  assert.equal((await create("zero", 0)).status, 413);
  assert.equal((await create("over", STUDIO_FOOTAGE_UPLOAD_MAX_BYTES + 1)).status, 413);
  const maximum = await create("maximum", STUDIO_FOOTAGE_UPLOAD_MAX_BYTES); assert.equal(maximum.status, 201); const session = maximum.body.result.sessionId;
  const tooLargeHeader = await call("PUT", `?sessionId=${session}&offset=0`, Buffer.from("x"), { headers: { "Content-Type": "application/octet-stream", "Content-Length": String(STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES + 1) } }); assert.equal(tooLargeHeader.status, 413);
  await call("DELETE", `?sessionId=${session}`);
});
await test("09 repository import conflicts remain recoverable 409s and retain owned bytes until explicit cancellation", async () => {
  for (const code of ["ACTIVE_SHOT_JOB", "IMPORT_METADATA_CONFLICT"]) {
    const key = `upload-key-${code.toLowerCase()}`, created = await create(code.toLowerCase(), 4, key);
    assert.equal(created.status, 201); const session = created.body.result.sessionId;
    assert.equal((await call("PUT", `?sessionId=${session}&offset=0`, Buffer.from("data"), { headers: { "Content-Type": "application/octet-stream" } })).status, 200);
    nextImportFailure = new StudioStoreError(code, `Injected ${code} conflict.`);
    const rejected = await call("PATCH", `?sessionId=${session}`, null, { headers: { "Idempotency-Key": key } });
    assert.equal(rejected.status, 409); assert.equal(rejected.body.error.code, code);
    const inspected = await call("GET", `?sessionId=${session}`); assert.equal(inspected.body.result.status, "INTERRUPTED");
    assert.equal(fs.existsSync(path.join(workRoot, "footage-upload-sessions-v1", session, "source.mp4")), true);
    assert.equal((await call("DELETE", `?sessionId=${session}`)).status, 200);
  }
});
await test("10 deterministic qualification rejection is terminal, cleans its owned source and releases the claim", async () => {
  const key = "upload-key-terminal-rejection", created = await create("terminal_rejection", 4, key); assert.equal(created.status, 201); const session = created.body.result.sessionId;
  assert.equal((await call("PUT", `?sessionId=${session}&offset=0`, Buffer.from("data"), { headers: { "Content-Type": "application/octet-stream" } })).status, 200);
  nextQualifierFailure = new StudioMediaImportError("UNSUPPORTED_MEDIA", 415, "Injected deterministic media rejection.");
  const rejected = await call("PATCH", `?sessionId=${session}`, null, { headers: { "Idempotency-Key": key } });
  assert.equal(rejected.status, 415); assert.equal(rejected.body.error.code, "UNSUPPORTED_MEDIA");
  const inspected = await call("GET", `?sessionId=${session}`); assert.equal(inspected.body.result.status, "FAILED");
  assert.equal(fs.existsSync(path.join(workRoot, "footage-upload-sessions-v1", session, "source.mp4")), false);
  const after = await create("after_rejection", 1); assert.equal(after.status, 201); await call("DELETE", `?sessionId=${after.body.result.sessionId}`);
});
await test("11 exact-key retry reconciles publication completed before durable completion state", async () => {
  const key = "upload-key-publication-replay", created = await create("publication_replay", 4, key); assert.equal(created.status, 201); const session = created.body.result.sessionId;
  assert.equal((await call("PUT", `?sessionId=${session}&offset=0`, Buffer.from("data"), { headers: { "Content-Type": "application/octet-stream" } })).status, 200);
  const publicationsBefore = importCalls; failManifestOnceFor = "project_upload_publication_replay";
  const interrupted = await call("PATCH", `?sessionId=${session}`, null, { headers: { "Idempotency-Key": key } }); assert.equal(interrupted.status, 503); assert.equal(importCalls, publicationsBefore + 1);
  const inspected = await call("GET", `?sessionId=${session}`); assert.equal(inspected.body.result.status, "INTERRUPTED"); assert.equal(inspected.body.result.canFinalize, true);
  const recovered = await call("PATCH", `?sessionId=${session}`, null, { headers: { "Idempotency-Key": key } }); assert.equal(recovered.status, 200); assert.equal(recovered.body.result.status, "COMPLETE");
  assert.equal(importCalls, publicationsBefore + 1); assert.equal(fs.existsSync(path.join(workRoot, "footage-upload-sessions-v1", session, "source.mp4")), false);
});
await test("12 local authority, mutation Origin and operator marker remain mandatory", async () => {
  const body = JSON.stringify({ metadata: metadata("boundary"), expectedBytes: 1 });
  for (const mutation of [{ Origin: null }, { "X-CodexForge-Animation-Studio": null }, { "Sec-Fetch-Site": "cross-site" }, { Host: "localhost:3379" }]) {
    const requestHeaders = headers({ "Content-Type": "application/json", "Idempotency-Key": "boundary-key-0001" });
    for (const [name, value] of Object.entries(mutation)) { if (value === null) requestHeaders.delete(name); else requestHeaders.set(name, value); }
    const response = await handler(new Request(baseUrl, { method: "POST", headers: requestHeaders, body })); assert.equal(response.status, 403);
  }
});
await test("13 explicit zero-length framework-style body permits PATCH finalization", async () => {
  const key = "upload-key-adapter-finalize", created = await create("adapter_finalize", 4, key); assert.equal(created.status, 201); const session = created.body.result.sessionId;
  assert.equal((await call("PUT", `?sessionId=${session}&offset=0`, Buffer.from("data"), { headers: { "Content-Type": "application/octet-stream" } })).status, 200);
  let finalized;
  try {
    finalized = await adapterCall("PATCH", `?sessionId=${session}`, adapterBody(), { headers: { "Content-Length": "0", "Idempotency-Key": key } });
    assert.equal(finalized.status, 200, JSON.stringify(finalized.body)); assert.equal(finalized.body.result.status, "COMPLETE");
  } finally {
    if (finalized?.status !== 200) await call("DELETE", `?sessionId=${session}`);
  }
});
await test("14 explicit zero-length framework-style body permits DELETE cancellation", async () => {
  const created = await create("adapter_cancel", 1); assert.equal(created.status, 201); const session = created.body.result.sessionId;
  let cancelled;
  try {
    cancelled = await adapterCall("DELETE", `?sessionId=${session}`, adapterBody(), { headers: { "Content-Length": "0" } });
    assert.equal(cancelled.status, 200, JSON.stringify(cancelled.body)); assert.equal(cancelled.body.result.status, "CANCELLED");
  } finally {
    if (cancelled?.status !== 200) await call("DELETE", `?sessionId=${session}`);
  }
});
await test("15 invalid framing and content headers remain rejected independently of empty stream detection", async () => {
  const created = await create("adapter_rejection", 1); assert.equal(created.status, 201); const session = created.body.result.sessionId;
  const rejected = [
    await adapterCall("DELETE", `?sessionId=${session}`, adapterBody(Buffer.from("x")), { headers: { "Content-Length": "1" } }),
    await adapterCall("DELETE", `?sessionId=${session}`, adapterBody(), { headers: { "Content-Length": "00" } }),
    await adapterCall("DELETE", `?sessionId=${session}`, adapterBody(), { headers: { "Content-Length": "0", "Transfer-Encoding": "chunked" } }),
    await adapterCall("DELETE", `?sessionId=${session}`, adapterBody(), { headers: { "Content-Length": "0", "Content-Encoding": "gzip" } }),
    await adapterCall("DELETE", `?sessionId=${session}`, adapterBody(), { headers: { "Content-Length": "0", "Content-Type": "application/octet-stream" } }),
  ];
  for (const result of rejected) { assert.equal(result.status, 400); assert.equal(result.body.error.code, "unexpected_upload_body"); }
  assert.equal((await adapterCall("DELETE", `?sessionId=${session}`, adapterBody(), { headers: { "Content-Length": "0" } })).status, 200);
});
await test("16 terminal-session retention stays bounded without lifetime upload exhaustion", async () => {
  for (let index = 0; index < 130; index++) {
    const label = `retention_${String(index).padStart(3, "0")}`, created = await create(label, 1, `upload-key-${label}`);
    assert.equal(created.status, 201, JSON.stringify(created.body));
    assert.equal((await call("DELETE", `?sessionId=${created.body.result.sessionId}`)).status, 200);
  }
  const sessions = fs.readdirSync(path.join(workRoot, "footage-upload-sessions-v1")).filter(name => /^upload_[a-f0-9]{48}$/.test(name));
  assert.ok(sessions.length <= 128); assert.ok(sessions.length > 0);
  const after = await create("retention_after", 1, "upload-key-retention-after"); assert.equal(after.status, 201, JSON.stringify(after.body));
  assert.equal((await call("DELETE", `?sessionId=${after.body.result.sessionId}`)).status, 200);
});
await test("17 empty stream without Content-Length completes through the installed Node-to-Next adapter", async () => {
  await withStaged("next_adapter_empty", async ({ key, query }) => {
    const before = importCalls, result = await nextAdapterCall("PATCH", query, [], { "Idempotency-Key": key });
    assert.equal(result.status, 200, JSON.stringify(result.body)); assert.equal(result.body.result.status, "COMPLETE"); assert.equal(importCalls, before + 1);
    const replay = await nextAdapterCall("PATCH", query, [], { "Content-Length": "0", "Idempotency-Key": key });
    assert.equal(replay.status, 200); assert.equal(replay.body.replayed, true); assert.equal(importCalls, before + 1);
  });
});
await test("18 generic empty and zero-byte-chunk streams complete without Content-Length", async () => {
  for (const [label, body] of [["empty_stream", () => adapterBody()], ["empty_chunk", () => adapterBody(new Uint8Array(0))]]) {
    await withStaged(label, async ({ key, query }) => {
      const result = await adapterCall("PATCH", query, body(), { headers: { "Idempotency-Key": key } });
      assert.equal(result.status, 200, JSON.stringify(result.body)); assert.equal(result.body.result.status, "COMPLETE");
    });
  }
  const created = await create("empty_cancel", 1); assert.equal(created.status, 201);
  const cancelled = await adapterCall("DELETE", `?sessionId=${created.body.result.sessionId}`);
  assert.equal(cancelled.status, 200, JSON.stringify(cancelled.body)); assert.equal(cancelled.body.result.status, "CANCELLED");
});
await test("19 content bytes reject even with false zero Content-Length and preserve acknowledged staging", async () => {
  await withStaged("body_rejection", async ({ session, key, query }) => {
    for (const text of ["{}", "null", " ", "\r\n\t", "x"]) {
      for (const framing of [{}, { "Content-Length": "0" }]) {
        await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, adapterBody(Buffer.from(text)), { headers: { ...framing, "Idempotency-Key": key } }));
        await assertRejectedWithoutMutation(session, () => nextAdapterCall("PATCH", query, [Buffer.from(text)], { ...framing, "Idempotency-Key": key }));
      }
    }
    const laterBytes = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(0)); controller.enqueue(Buffer.from("{}")); controller.close(); } });
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, laterBytes, { headers: { "Idempotency-Key": key } }));
    let pulls = 0, cancelled = false;
    const unboundedContent = new ReadableStream({ pull(controller) { pulls++; controller.enqueue(Buffer.from("x")); }, cancel() { cancelled = true; } }, { highWaterMark: 0 });
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, unboundedContent, { headers: { "Idempotency-Key": key } }));
    assert.equal(pulls, 1, "Reject on the first non-empty chunk without accumulating the rest of the request."); assert.equal(cancelled, true);
  });
});
await test("20 malformed framing and invalid stream chunks fail closed without publication", async () => {
  await withStaged("invalid_framing", async ({ session, key, query }) => {
    for (const invalid of [{ "Content-Length": "00" }, { "Content-Length": "-1" }, { "Content-Length": "1" }, { "Content-Length": "NaN" }, { "Content-Type": "application/json" }, { "Content-Encoding": "gzip" }, { "Transfer-Encoding": "chunked" }]) {
      await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, adapterBody(), { headers: { ...invalid, "Idempotency-Key": key } }));
    }
    const malformed = new ReadableStream({ start(controller) { controller.enqueue("not a byte array"); controller.close(); } });
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, malformed, { headers: { "Idempotency-Key": key } }));
  });
});
await test("21 aborted, unreadable, locked and consumed requests cannot publish acknowledged bytes", async () => {
  await withStaged("unreadable_body", async ({ session, key, query }) => {
    const preAborted = new AbortController(); preAborted.abort();
    for (const body of [null, adapterBody()]) {
      await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, body, { headers: { "Idempotency-Key": key }, signal: preAborted.signal }), 408, "upload_body_interrupted");
    }
    const midRead = new AbortController();
    const waiting = new ReadableStream({ pull() { queueMicrotask(() => midRead.abort()); } });
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, waiting, { headers: { "Idempotency-Key": key }, signal: midRead.signal }), 408, "upload_body_interrupted");
    const unreadable = new ReadableStream({ start(controller) { controller.error(new Error("Synthetic unreadable request stream.")); } });
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, unreadable, { headers: { "Idempotency-Key": key } }), 408, "upload_body_interrupted");
    const invoke = async request => { const response = await handler(request); return { status: response.status, body: await response.json() }; };
    const locked = new Request(baseUrl + query, { method: "PATCH", headers: headers({ "Idempotency-Key": key }), body: adapterBody(), duplex: "half" });
    const reader = locked.body.getReader();
    try { await assertRejectedWithoutMutation(session, () => invoke(locked), 408, "upload_body_interrupted"); } finally { reader.releaseLock(); }
    const consumed = new Request(baseUrl + query, { method: "PATCH", headers: headers({ "Idempotency-Key": key }), body: adapterBody(), duplex: "half" });
    await consumed.arrayBuffer();
    await assertRejectedWithoutMutation(session, () => invoke(consumed), 408, "upload_body_interrupted");
  });
});
await test("22 no-body inspection bounds silent and endless zero-byte streams", async () => {
  await withStaged("bounded_empty", async ({ session, key, query }) => {
    let pulls = 0, emptyCancelled = false;
    const endless = new ReadableStream({ pull(controller) { pulls++; controller.enqueue(new Uint8Array(0)); }, cancel() { emptyCancelled = true; } }, { highWaterMark: 0 });
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, endless, { headers: { "Idempotency-Key": key } }));
    assert.ok(pulls <= 17, `Empty-stream inspection must be bounded, observed ${pulls} pulls.`); assert.equal(emptyCancelled, true);
    let silentCancelled = false;
    const silent = new ReadableStream({ cancel() { silentCancelled = true; } }), started = Date.now();
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, silent, { headers: { "Idempotency-Key": key } }), 408, "upload_body_interrupted");
    assert.ok(Date.now() - started < 15_000, "A no-body request must not wait indefinitely for EOF."); assert.equal(silentCancelled, true);
  });
});
await test("23 incomplete acknowledged staging remains ineligible for finalization", async () => {
  await withStaged("partial_source", async ({ session, key, query }) => {
    await assertRejectedWithoutMutation(session, () => adapterCall("PATCH", query, adapterBody(), { headers: { "Idempotency-Key": key } }), 409, "upload_incomplete");
    const inspected = await call("GET", query); assert.equal(inspected.status, 200); assert.equal(inspected.body.result.receivedBytes, 4); assert.equal(inspected.body.result.expectedBytes, 8); assert.equal(inspected.body.result.canFinalize, false);
  }, 8);
});
await test("24 finalization retains origin, marker, authority, exact query and original key protections", async () => {
  await withStaged("patch_security", async ({ session, key, query }) => {
    for (const mutation of [{ Origin: null }, { Origin: "http://localhost:3379" }, { "X-CodexForge-Animation-Studio": null }, { "Sec-Fetch-Site": "cross-site" }, { Host: "localhost:3379" }]) {
      await assertRejectedWithoutMutation(session, async () => {
        const requestHeaders = headers({ "Idempotency-Key": key });
        for (const [name, value] of Object.entries(mutation)) { if (value === null) requestHeaders.delete(name); else requestHeaders.set(name, value); }
        const response = await handler(new Request(baseUrl + query, { method: "PATCH", headers: requestHeaders }));
        return { status: response.status, body: await response.json() };
      }, 403, "request_boundary_rejected");
    }
    await assertRejectedWithoutMutation(session, () => call("PATCH", query, null, { headers: { "Idempotency-Key": "upload-wrong-key-0001" } }), 409, "idempotency_conflict");
    await assertRejectedWithoutMutation(session, () => call("PATCH", `${query}&unexpected=1`, null, { headers: { "Idempotency-Key": key } }), 400, "invalid_upload_query");
  });
});
await test("25 concurrent finalization and completed replay publish at most once", async () => {
  await withStaged("concurrent_finalize", async ({ session, key, query }) => {
    let entered, release;
    const enteredGate = new Promise(resolve => { entered = resolve; }), held = new Promise(resolve => { release = resolve; });
    const beforeImports = importCalls, beforeQualification = qualifierCalls;
    nextQualifierGate = async () => { entered(); await held; };
    const pending = adapterCall("PATCH", query, adapterBody(), { headers: { "Idempotency-Key": key } });
    let first;
    try {
      await Promise.race([enteredGate, pending.then(result => { throw new Error(`Finalization returned ${result.status} before reaching the controlled qualification gate.`); })]);
      const competing = await adapterCall("PATCH", query, adapterBody(), { headers: { "Idempotency-Key": key } });
      assert.equal(competing.status, 409); assert.ok(["upload_incomplete", "upload_busy"].includes(competing.body.error.code));
      assert.equal(importCalls, beforeImports); assert.equal(qualifierCalls, beforeQualification + 1);
    } finally { release(); first = await pending; nextQualifierGate = null; }
    assert.equal(first.status, 200, JSON.stringify(first.body)); assert.equal(first.body.result.status, "COMPLETE");
    assert.equal(importCalls, beforeImports + 1); assert.equal(qualifierCalls, beforeQualification + 1);
    const stateFile = path.join(workRoot, "footage-upload-sessions-v1", session, "state.json"), completedStateHash = sha(fs.readFileSync(stateFile));
    const replay = await adapterCall("PATCH", query, adapterBody(), { headers: { "Idempotency-Key": key } });
    assert.equal(replay.status, 200); assert.equal(replay.body.replayed, true); assert.equal(importCalls, beforeImports + 1); assert.equal(qualifierCalls, beforeQualification + 1);
    const rejected = await adapterCall("PATCH", query, adapterBody(Buffer.from("{}")), { headers: { "Idempotency-Key": key } });
    assert.equal(rejected.status, 400); assert.equal(rejected.body.error.code, "unexpected_upload_body"); assert.equal(sha(fs.readFileSync(stateFile)), completedStateHash);
  });
});
await test("26 no provider, model or external network operation is reachable", () => { assert.deepEqual(networkAttempts, []); });

const failed = results.filter(item => item.status === "FAIL");
const frameworkPath = "node_modules/next/dist/server/web/spec-extension/adapters/next-request.js";
const result = { suite: "animation-studio-footage-upload-session", passed: results.length - failed.length, failed: failed.length, results, counters: { capacityCalls, importCalls, qualifierCalls, networkAttempts }, loadedSource: loader.loaded.sort(), frameworkBindings: [{ path: frameworkPath, sha256: sha(fs.readFileSync(path.join(frontendRoot, frameworkPath))) }], limitations: ["Installed Next adapter and real staged-session storage; repository publication and media probing use deterministic test seams.", "Not actual listening Next route or Browser acceptance; those require independent isolated integration evidence."] };
fs.writeFileSync(path.join(evidenceRoot, "result.json"), JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
if (failed.length) { console.error(JSON.stringify(result, null, 2)); process.exitCode = 1; }
else console.log(`Animation Studio footage upload-session tests passed (${result.passed}/${results.length}). Evidence: ${evidenceRoot}`);
