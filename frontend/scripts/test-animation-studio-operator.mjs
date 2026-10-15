// Actual HTTP boundary and retained-handle store; isolated synthetic data only, no network.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { NextRequest } from "next/server.js";
import { NextRequestAdapter } from "next/dist/server/web/spec-extension/adapters/next-request.js";
import { addRequestMeta } from "next/dist/server/request-meta.js";
import { createStudioTestLoader, blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontendRoot);
const networkAttempts = blockStudioTestNetwork();
const loader = createStudioTestLoader(frontendRoot);
const { createStudioOperatorHandler, STUDIO_OPERATOR_MAX_BODY_BYTES } = loader.load("@/lib/codexforge/animation-studio/operator-http.server");
const { openStudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const runId = randomUUID(), namespace = `operator-${runId}`;
const evidenceRoot = path.join(frontendRoot, ".codexforge", "acceptance", `studio-operator-tests-${runId}`);
fs.mkdirSync(evidenceRoot, { recursive: true });
const log = fs.openSync(path.join(evidenceRoot, "test.log"), "wx"), results = [];
const url = "http://127.0.0.1:3317/api/codexforge/animation-studio";
let opens = 0;
const opener = () => { opens++; return openStudioRepository({ workspace: "test", namespace }); };
const handler = createStudioOperatorHandler({ enabled: true, openRepository: opener, listenerAddresses: () => ["127.0.0.1"] });
const fixedTime = second => new Date(Date.parse("2026-09-13T12:00:00.000Z") + second * 1000).toISOString();
const create = { action: "create", projectId: "project_operator", title: "Synthetic operator project", description: "Planning only", durationSeconds: 50, requestedAt: fixedTime(0) };
const request = (input, changes = {}) => {
  const method = input === undefined ? "GET" : "POST";
  const headers = new Headers({ Host: "127.0.0.1:3317", "X-CodexForge-Animation-Studio": "local-operator-v1", "Sec-Fetch-Site": "same-origin", ...(method === "POST" ? { Origin: "http://127.0.0.1:3317", "Content-Type": "application/json", "Idempotency-Key": "request-default-0001" } : {}) });
  for (const [key, value] of Object.entries(changes.headers ?? {})) { if (value === null) headers.delete(key); else headers.set(key, value); }
  return new Request(changes.url ?? url, { method: changes.method ?? method, headers, ...(method === "POST" ? { body: changes.raw ?? JSON.stringify(input) } : {}) });
};
async function call(input, changes = {}, target = handler) { const answer = await target(request(input, changes)); return { status: answer.status, headers: answer.headers, body: await answer.json() }; }
function snapshot() { const repo = opener(); try { return repo.load(create.projectId); } finally { repo.close(); } }
async function test(label, run) {
  try { await run(); results.push({ label, status: "PASS" }); fs.writeSync(log, `PASS ${label}\n`); process.stderr.write(`PASS ${label}\n`); }
  catch (error) { results.push({ label, status: "FAIL", error: { name: error.name, message: error.message, stack: error.stack } }); fs.writeSync(log, `FAIL ${label}: ${error.message}\n`); process.stderr.write(`FAIL ${label}: ${error.message}\n`); }
}
const key = value => ({ headers: { "Idempotency-Key": value } });
let original, shotEdit;
try {
  await test("01 Disabled route never opens storage and GET succeeds without an Origin header", async () => {
    const disabled = createStudioOperatorHandler({ enabled: false, openRepository: opener, listenerAddresses: () => ["127.0.0.1"] });
    const count = opens; assert.equal((await call(undefined, {}, disabled)).status, 503); assert.equal(opens, count);
    const read = await call(); assert.equal(read.status, 200); assert.deepEqual(read.body.result.projects, []); assert.equal(read.body.result.snapshot, null);
    assert.equal(read.headers.get("cache-control"), "no-store"); assert.equal(read.headers.get("access-control-allow-origin"), null);
  });
  await test("02 Direct loopback listener, authority, client marker and same-origin boundaries deny before storage", async () => {
    const count = opens;
    for (const listeners of [null, [], ["0.0.0.0"], ["::"], ["127.0.0.1", "192.0.2.1"]]) {
      const target = createStudioOperatorHandler({ enabled: true, openRepository: opener, listenerAddresses: () => listeners });
      assert.equal((await call(undefined, {}, target)).status, 503);
    }
    for (const headers of [
      { Host: "evil.invalid:3317" }, { Host: "localhost:3317" }, { Host: "127.0.0.1:3318" }, { Host: "2130706433:3317" }, { Host: "127.0.0.1.:3317" },
      { "X-CodexForge-Animation-Studio": null }, { "X-CodexForge-Animation-Studio": "local-operator-v1, forged" },
      { Origin: "http://evil.invalid" }, { Origin: "null" }, { Origin: "http://127.0.0.1:3317/" }, { Origin: "http://127.0.0.1:3318" },
      { "Sec-Fetch-Site": "cross-site" }, { "Sec-Fetch-Site": "same-site" }, { Forwarded: "host=127.0.0.1:3317" },
      { "X-Forwarded-Host": "evil.invalid" }, { "X-Forwarded-For": "127.0.0.1, 192.0.2.1" }, { "X-Forwarded-Proto": "https" }, { "X-Forwarded-Port": "3000" },
      { "X-Forwarded-Unknown": "anything" }, { "X-Real-IP": "127.0.0.1" }, { Via: "proxy" }, { "X-Original-URL": "/" },
    ]) assert.equal((await call(undefined, { headers })).status, 403, JSON.stringify(headers));
    assert.equal((await call(create, { headers: { Origin: null } })).status, 403);
    assert.equal(opens, count);
  });
  await test("03 Next canonical synthesized headers grant no extra authority and route/query IDs are bounded", async () => {
    const frameworkGet = new NextRequest(request());
    assert.equal(new URL(frameworkGet.url).hostname, "localhost", "Installed Next normalizes the visible URL getter.");
    assert.equal(new URL(Object.getOwnPropertyDescriptor(Request.prototype, "url").get.call(frameworkGet)).hostname, "127.0.0.1", "Native request retains the original exact authority.");
    assert.equal((await handler(frameworkGet)).status, 200, "Actual NextRequest must pass, not only a native Request fixture.");
    for (const Host of ["localhost:3317", "127.0.0.1:3318", "evil.invalid:3317"]) assert.equal((await handler(new NextRequest(request(undefined, { headers: { Host } })))).status, 403, "Framework normalization must not permit Host aliases or different ports.");
    assert.equal((await call(undefined, { headers: { "X-Forwarded-Host": "127.0.0.1:3317", "X-Forwarded-Port": "3317", "X-Forwarded-Proto": "http", "X-Forwarded-For": "127.0.0.1" } })).status, 200);
    const count = opens;
    for (const query of ["?projectId=project_x&projectId=project_x", "?limit=100", "?projectId=project_..%2Foutside", "?projectId=project_C%3Adrive", "?projectId=project_UPPER", "?projectId="]) assert.equal((await call(undefined, { url: url + query })).status, 400);
    assert.equal((await call(undefined, { url: url + "/unknown" })).status, 403);
    assert.equal((await call(undefined, { method: "DELETE" })).status, 405);
    assert.equal((await call(create, { url: url + "?extra=1" })).status, 400);
    assert.equal(opens, count);
  });
  await test("04 JSON format, byte count, duplicates, BOM, invalid UTF-8 and depth all fail before storage", async () => {
    const count = opens;
    for (const raw of ['{"action":"create","action":"dry-run"}', "\uFEFF" + JSON.stringify(create), "{", "null", "[]", " ", "[".repeat(33) + "0" + "]".repeat(33), Uint8Array.from([0xff])]) assert.equal((await call(create, { raw })).status, 400);
    assert.equal((await call(create, { raw: "x".repeat(STUDIO_OPERATOR_MAX_BODY_BYTES + 1) })).status, 413);
    for (const length of ["32769", "-1", "01", "1e2"]) assert.equal((await call(create, { headers: { "Content-Length": length } })).status, 413);
    assert.equal((await call(create, { headers: { "Content-Length": "1" } })).status, 400);
    for (const type of [null, "text/plain", "application/json; charset=ascii"]) assert.equal((await call(create, { headers: { "Content-Type": type } })).status, 415);
    assert.equal((await call(create, { headers: { "Idempotency-Key": null } })).status, 400);
    const stalled = new Request(url, { method: "POST", headers: request(create).headers, body: new ReadableStream({ start() {} }), duplex: "half" });
    assert.equal((await handler(stalled)).status, 408, "An unfinished input stream must reach its bounded terminal timeout.");
    assert.equal(opens, count);
  });
  await test("05 Unknown actions and authority-bearing fields cannot enable execution or choose filesystem paths", async () => {
    const count = opens;
    for (const input of [
      { ...create, action: "generate" }, { ...create, actor: "admin" }, { ...create, externalGenerationEnabled: true }, { ...create, currency: "USD" },
      { ...create, workspace: "production" }, { ...create, projectId: "project_../../escape" }, { ...create, title: " " }, { ...create, requestedAt: "2026-02-30T12:00:00.000Z" },
      Object.fromEntries(Object.entries(create).filter(([field]) => field !== "durationSeconds")),
      { ...create, durationSeconds: 44 }, { ...create, durationSeconds: 61 }, { ...create, durationSeconds: 45.5 }, { ...create, durationSeconds: "50" },
    ]) assert.equal((await call(input)).status, 400);
    assert.equal(opens, count);
  });
  await test("06 Create atomically persists one project, sequence and empty 720p25 draft shot with zero execution", async () => {
    const answer = await call(create, key("operator-create-0001")); assert.equal(answer.status, 200); original = answer.body.result.snapshot;
    assert.equal(original.project.revision, 1); assert.equal(original.sequences.length, 1); assert.equal(original.shots.length, 1);
    assert.equal(original.shots[0].duration, create.durationSeconds); assert.equal(original.shots[0].fps, 25); assert.deepEqual(original.shots[0].resolution, { width: 1280, height: 720 });
    for (const field of ["props", "audio", "sourceReferences", "inputAssets", "outputAssets"]) assert.deepEqual(original.shots[0][field], [], `${field} must start empty`);
    assert.equal(original.shots[0].selectedVersion, null); assert.equal(original.shots[0].action, "No media is placed yet.");
    assert.equal(original.events.length, 1); assert.equal(original.receipts.length, 1); assert.equal(original.events[0].type, "PROJECT_CREATED"); assert.equal(original.events[0].details.result.code, "DRAFT_PROJECT_CREATED");
    assert.equal(original.events[0].actor, "local-studio-operator"); assert.deepEqual(original.jobs, []); assert.deepEqual(original.costs, []); assert.deepEqual(original.approvals, []);
    assert.ok(Object.values(answer.body.result.executionPolicy).every(value => value === false));
  });
  await test("07 Exact create replay does not duplicate an event or draft, and a new repository reloads it", async () => {
    const frameworkPost = await handler(new NextRequest(request(create, key("operator-create-0001"))));
    assert.equal(frameworkPost.status, 200, "Actual NextRequest mutation retains the exact same-origin contract.");
    assert.equal((await frameworkPost.json()).result.snapshot.recordDigest, original.recordDigest);
    assert.equal((await handler(new NextRequest(request(create, { headers: { Origin: "http://localhost:3317" } })))).status, 403);
    const replay = await call(create, key("operator-create-0001")); assert.equal(replay.status, 200); assert.equal(replay.body.result.snapshot.recordDigest, original.recordDigest);
    const read = await call(undefined, { url: url + "?projectId=" + create.projectId }); assert.equal(read.status, 200); assert.deepEqual(read.body.result.snapshot, original);
    assert.deepEqual(snapshot(), original);
    assert.equal((await call({ ...create, title: "Conflicting title" }, key("operator-create-0001"))).status, 409);
    assert.equal((await call({ ...create, durationSeconds: 51 }, key("operator-create-0001"))).status, 409);
    assert.equal(snapshot().recordDigest, original.recordDigest);
  });
  await test("08 Project metadata edit is revision-bound, preserves the original event and invalidates old approval scope", async () => {
    let repo = opener(); let scope; try { scope = repo.approvalScope(create.projectId); } finally { repo.close(); }
    const input = { action: "revise-project", projectId: create.projectId, expectedRevision: 1, title: "Edited planning title", description: "User-authored brief", requestedAt: fixedTime(1) };
    const answer = await call(input, key("operator-project-edit-0001")); assert.equal(answer.status, 200);
    const state = answer.body.result.snapshot; assert.equal(state.project.revision, 2); assert.equal(state.project.title, input.title); assert.deepEqual(state.events[0], original.events[0]);
    assert.equal(state.events[1].type, "PROJECT_REVISED"); assert.equal(state.events[1].details.previousProject.title, original.project.title);
    repo = opener(); try { assert.notEqual(repo.approvalScope(create.projectId), scope); } finally { repo.close(); }
    assert.equal((await call(input, key("operator-project-edit-0001"))).body.result.snapshot.recordDigest, state.recordDigest);
    assert.equal((await call({ ...input, requestedAt: fixedTime(2) }, key("operator-stale-project-0001"))).status, 409);
  });
  await test("09 Shot edits preserve previous immutable manifest in the audit and reset derived status", async () => {
    const shot = snapshot().shots[0];
    shotEdit = { action: "revise-shot", projectId: create.projectId, shotId: shot.shotId, expectedRevision: 1, changes: { description: "User-authored scene", storyPurpose: "Test saved planning edits", action: "The sphere pauses beside the arch.", duration: 8, notes: ["Keep my note", "A second independent note"] }, requestedAt: fixedTime(2) };
    const answer = await call(shotEdit, key("operator-shot-edit-0001")); assert.equal(answer.status, 200);
    const state = answer.body.result.snapshot; assert.equal(state.shots[0].revision, 2); assert.equal(state.shots[0].description, shotEdit.changes.description);
    assert.deepEqual(state.events.at(-1).details.previousShot, shot); assert.equal(state.events.at(-1).type, "SHOT_REVISED");
    assert.equal(state.shots[0].status, "DRAFT"); assert.equal(state.shots[0].approvalState, "DRAFT"); assert.deepEqual(state.shots[0].outputAssets, []); assert.deepEqual(state.shots[0].qcResults, []);
    assert.deepEqual(state.events[0], original.events[0]); assert.deepEqual(state.jobs, []);
  });
  await test("10 Shot replay, conflicting reuse and a competing stale editor cannot overwrite the saved revision", async () => {
    const before = snapshot();
    assert.equal((await call(shotEdit, key("operator-shot-edit-0001"))).body.result.snapshot.recordDigest, before.recordDigest);
    assert.equal((await call({ ...shotEdit, changes: { ...shotEdit.changes, action: "Conflicting edit" } }, key("operator-shot-edit-0001"))).status, 409);
    assert.equal((await call({ ...shotEdit, requestedAt: fixedTime(3) }, key("operator-stale-shot-0001"))).status, 409);
    assert.equal(snapshot().recordDigest, before.recordDigest);
  });
  await test("11 Dry-run uses the saved shot and absent capability evidence, without events, jobs, costs or provider requests", async () => {
    const before = snapshot();
    const answer = await call({ action: "dry-run", projectId: create.projectId, shotId: before.shots[0].shotId, requestedAt: fixedTime(3) }, key("operator-dry-run-0001"));
    assert.equal(answer.status, 200); const dry = answer.body.result.dryRun;
    assert.equal(dry.executionAllowed, false); assert.equal(dry.route.status, "BLOCKED"); assert.deepEqual(dry.capabilityObservations, []);
    assert.equal(dry.shotRevision, 2); assert.equal(dry.projectRevision, before.project.revision); assert.equal(dry.providerRequests, 0); assert.equal(dry.jobsCreated, 0);
    assert.equal(answer.body.result.snapshot.recordDigest, before.recordDigest); assert.equal(snapshot().recordDigest, before.recordDigest);
  });
  await test("12 User notes survive reload and planning, and nested authority or malformed edits are rejected", async () => {
    const before = snapshot(); assert.deepEqual(before.shots[0].notes, ["Keep my note", "A second independent note"]);
    for (const changes of [{ ...shotEdit.changes, status: "COMPLETE" }, { ...shotEdit.changes, duration: 0 }, { ...shotEdit.changes, notes: [""] }, { ...shotEdit.changes, notes: Array(33).fill("note") }, { ...shotEdit.changes, description: "" }]) assert.equal((await call({ ...shotEdit, expectedRevision: 2, changes, requestedAt: fixedTime(4) }, key("operator-invalid-shot-0001"))).status, 400);
    assert.equal(snapshot().recordDigest, before.recordDigest);
  });
  await test("13 Storage failure messages do not leak paths and a close failure does not replace the original conflict", async () => {
    const broken = createStudioOperatorHandler({ enabled: true, openRepository: () => { throw new Error("C:\\private\\secret-path"); }, listenerAddresses: () => ["127.0.0.1"] });
    const failure = await call(undefined, {}, broken); assert.equal(failure.status, 503); assert.ok(!JSON.stringify(failure.body).includes("secret-path"));
    const closing = createStudioOperatorHandler({ enabled: true, openRepository: () => { const repo = opener(), close = repo.close.bind(repo); repo.close = () => { close(); throw new Error("Secondary close failure"); }; return repo; }, listenerAddresses: () => ["127.0.0.1"] });
    const conflict = await call({ ...create, title: "Conflict while closing" }, key("operator-create-0001"), closing);
    assert.equal(conflict.status, 409); assert.equal(conflict.body.error.code, "revision_conflict");
  });
  await test("14 Missing shot is readable, saved projects remain distinct and final source-bound execution counters stay zero", async () => {
    const before = snapshot();
    assert.equal((await call({ action: "dry-run", projectId: create.projectId, shotId: "shot_missing", requestedAt: fixedTime(4) }, key("operator-missing-shot-0001"))).status, 404);
    const lower = await call({ ...create, projectId: "project_second", durationSeconds: 45, requestedAt: fixedTime(4) }, key("operator-second-project-0001"));
    const upper = await call({ ...create, projectId: "project_third", durationSeconds: 60, requestedAt: fixedTime(5) }, key("operator-third-project-0001"));
    assert.equal(lower.status, 200); assert.equal(lower.body.result.snapshot.shots[0].duration, 45);
    assert.equal(upper.status, 200); assert.equal(upper.body.result.snapshot.shots[0].duration, 60);
    const listed = await call(); assert.equal(listed.body.result.projects.length, 3); assert.equal(snapshot().recordDigest, before.recordDigest);
    assert.deepEqual(networkAttempts, []); assert.deepEqual(snapshot().jobs, []); assert.deepEqual(snapshot().costs, []);
    fs.writeFileSync(path.join(evidenceRoot, "saved-snapshot.json"), JSON.stringify(snapshot(), null, 2) + "\n", { flag: "wx" });
  });
  await test("15 Capacity rejects project 101 before publication and preserves existing reads, edits and exact replay", async () => {
    const capacityNamespace = `operator-capacity-${runId}`;
    const capacityOpener = () => openStudioRepository({ workspace: "test", namespace: capacityNamespace });
    const capacityHandler = createStudioOperatorHandler({ enabled: true, openRepository: capacityOpener, listenerAddresses: () => ["127.0.0.1"] });
    const inputs = Array.from({ length: 100 }, (_, index) => ({ ...create, projectId: `project_capacity_${String(index).padStart(3, "0")}`, title: `Synthetic capacity project ${index}` }));
    let repository = capacityOpener();
    let before;
    try {
      inputs.forEach((input, index) => repository.createDraftProject({ schemaVersion: 1, projectId: input.projectId, revision: 1, title: input.title, description: input.description, createdAt: input.requestedAt, currency: "GBP" }, `capacity-project-${String(index).padStart(3, "0")}`, "local-studio-operator", { duration: input.durationSeconds, fps: 25, width: 1280, height: 720, emptyOperatorTimeline: true }));
      assert.equal(repository.listProjects().length, 100);
      before = inputs.map(input => ({ projectId: input.projectId, digest: repository.load(input.projectId).recordDigest }));
    } finally { repository.close(); }
    const rejectedId = "project_capacity_rejected";
    const denied = await call({ ...create, projectId: rejectedId }, key("capacity-project-101"), capacityHandler);
    assert.equal(denied.status, 409); assert.equal(denied.body.error.code, "project_limit");
    assert.equal(fs.existsSync(path.join(frontendRoot, ".codexforge", "studio-tests", capacityNamespace, "studio", "projects", rejectedId)), false);
    const replay = await call(inputs[0], key("capacity-project-000"), capacityHandler);
    assert.equal(replay.status, 200); assert.equal(replay.body.result.projects.length, 100); assert.equal(replay.body.result.snapshot.recordDigest, before[0].digest);
    repository = capacityOpener();
    try { assert.deepEqual(inputs.map(input => ({ projectId: input.projectId, digest: repository.load(input.projectId).recordDigest })), before); }
    finally { repository.close(); }
    const edited = await call({ action: "revise-project", projectId: inputs[0].projectId, expectedRevision: 1, title: "Existing project still editable at capacity", description: inputs[0].description, requestedAt: fixedTime(1) }, key("capacity-edit-existing"), capacityHandler);
    assert.equal(edited.status, 200); assert.equal(edited.body.result.snapshot.project.revision, 2); assert.equal(edited.body.result.projects.length, 100);
    fs.writeFileSync(path.join(evidenceRoot, "capacity-evidence.json"), JSON.stringify({ capacityNamespace, maximumProjects: 100, rejection: denied.body, rejectedDirectoryCreated: false, exactReplayPreserved: true, originalRecordsUnchangedBeforeExplicitEdit: before, existingProjectEditRevision: 2, executionScope: "Single-process synchronous local operator; no cross-process quota claim." }, null, 2) + "\n", { flag: "wx" });
  });
  await test("16 Installed Node-to-Next adapter cannot turn forwarded HTTPS metadata into direct transport authority", async () => {
    const saved = snapshot(), shotId = saved.shots[0].shotId;
    const adapted = (method, protocol) => {
      const nodeRequest = {
        method, url: "/api/codexforge/animation-studio",
        headers: { host: "127.0.0.1:3317", "x-codexforge-animation-studio": "local-operator-v1", "sec-fetch-site": "same-origin", "x-forwarded-host": "127.0.0.1:3317", "x-forwarded-port": "3317", "x-forwarded-proto": protocol, "x-forwarded-for": "127.0.0.1", ...(method === "POST" ? { origin: `${protocol}://127.0.0.1:3317`, "content-type": "application/json", "idempotency-key": "scheme-boundary-test" } : {}) },
        body: method === "POST" ? JSON.stringify({ action: "dry-run", projectId: create.projectId, shotId, requestedAt: fixedTime(40) }) : null,
      };
      // Next attachRequestMeta derives initURL from x-forwarded-proto before this real adapter.
      // Reproduce that observed input state, rather than giving a Request an independent HTTP URL.
      addRequestMeta(nodeRequest, "initURL", `${protocol}://127.0.0.1:3317${nodeRequest.url}`);
      const output = NextRequestAdapter.fromNodeNextRequest(nodeRequest, new AbortController().signal);
      assert.equal(Object.getOwnPropertyDescriptor(Request.prototype, "url").get.call(output), `${protocol}://127.0.0.1:3317${nodeRequest.url}`);
      return output;
    };
    for (const method of ["GET", "POST"]) {
      const opened = opens, response = await handler(adapted(method, "https"));
      assert.equal(response.status, 403, `${method}: poisoned native HTTPS URL must not establish HTTP transport authority`);
      assert.equal((await response.json()).error.code, "request_boundary_rejected");
      assert.equal(opens, opened, `${method}: reject before opening storage`);
    }
    for (const method of ["GET", "POST"]) assert.equal((await handler(adapted(method, "http"))).status, 200, `${method}: real direct HTTP contract remains available`);
    assert.deepEqual(snapshot(), saved, "Transport checks and planning preserve the exact native snapshot");
  });
  await test("17 Missing local projects and shots retain operation-specific wording without estimate-execution claims", async () => {
    const before = snapshot();
    const responses = [
      await call(undefined, { url: url + "?projectId=project_missing" }),
      await call({ action: "dry-run", projectId: create.projectId, shotId: "shot_missing", requestedAt: fixedTime(41) }, key("operator-local-missing-shot")),
      await call({ action: "revise-project", projectId: "project_missing", expectedRevision: 1, title: "Missing local project", description: "No publication expected", requestedAt: fixedTime(41) }, key("operator-local-missing-project")),
    ];
    for (const answer of responses) {
      assert.equal(answer.status, 404); assert.equal(answer.body.error.code, "not_found");
      assert.equal(answer.body.error.message, "The saved project or shot was not found. Refresh the project list.");
      assert.equal(Object.hasOwn(answer.body, "executionOutcome"), false);
      assert.doesNotMatch(answer.body.error.message, /provider|transport|claim|attempt|generation/i);
    }
    assert.deepEqual(snapshot(), before, "Rejected reads, planning and edits preserve the native saved state");
  });
  await test("18 Local response-close failures stay local while execute-estimate failures retain their no-retry outcome", async () => {
    const before = snapshot();
    const closing = createStudioOperatorHandler({ enabled: true, openRepository: () => { const repo = opener(), close = repo.close.bind(repo); repo.close = () => { close(); throw new Error("Synthetic response-close failure"); }; return repo; }, listenerAddresses: () => ["127.0.0.1"] });
    const local = await call(undefined, {}, closing);
    assert.equal(local.status, 503); assert.equal(local.body.error.code, "local_storage_unavailable");
    assert.equal(local.body.error.message, "The local studio store could not complete this request safely. Reload saved state; no automatic retry is allowed.");
    assert.equal(Object.hasOwn(local.body, "executionOutcome"), false);
    const input = { action: "execute-estimate", projectId: create.projectId, shotId: before.shots[0].shotId, expectedProjectRevision: before.project.revision, expectedShotRevision: before.shots[0].revision, requestedAt: fixedTime(42) };
    let transportCalls = 0;
    const rejectTransport = () => { transportCalls++; throw new Error("The missing-project test must never reach transport"); };
    const missingEstimateHandler = createStudioOperatorHandler({ enabled: true, openRepository: opener, listenerAddresses: () => ["127.0.0.1"], testOnlyEstimate: { now: () => fixedTime(42), transport: { kind: "MOCK", submit: rejectTransport, status: rejectTransport, cancel: rejectTransport, estimate: rejectTransport, createUpload: rejectTransport, upload: rejectTransport, download: rejectTransport } } });
    const missingEstimate = await call({ ...input, projectId: "project_missing" }, key("operator-estimate-missing-project"), missingEstimateHandler);
    assert.equal(missingEstimate.status, 404); assert.equal(missingEstimate.body.error.code, "not_found");
    assert.match(missingEstimate.body.error.message, /This execution did not enter provider transport/, "The operation, not its not_found code, selects execution wording");
    assert.equal(missingEstimate.body.executionOutcome.externalExecution, "NOT_ATTEMPTED");
    assert.equal(missingEstimate.body.executionOutcome.retryAllowed, false); assert.equal(transportCalls, 0);
    for (const target of [handler, closing]) {
      const answer = await call(input, key("operator-estimate-disabled-wording"), target);
      assert.equal(answer.status, 503); assert.equal(answer.body.error.code, "estimate_execution_disabled");
      assert.match(answer.body.error.message, /This execution did not enter provider transport/);
      assert.match(answer.body.error.message, /does not grant permission to retry/);
      assert.deepEqual(answer.body.executionOutcome, { externalExecution: "NOT_ATTEMPTED", transportPhase: "BEFORE_TRANSPORT", outcome: "NOT_STARTED", persistence: "NOT_STARTED", reconciliationRequired: false, retryAllowed: false, response: null });
    }
    assert.deepEqual(snapshot(), before); assert.deepEqual(networkAttempts, []);
  });
} finally {
  const passed = results.filter(result => result.status === "PASS").length;
  const sourceFiles = [...loader.loaded, "src/app/api/codexforge/animation-studio/route.ts", "scripts/test-animation-studio-operator.mjs", "scripts/animation-studio-test-loader.mjs"].map(file => ({ path: file, sha256: createHash("sha256").update(fs.readFileSync(path.join(frontendRoot, file))).digest("hex") }));
  const frameworkBindings = ["node_modules/next/dist/server/web/spec-extension/adapters/next-request.js", "node_modules/next/dist/server/request-meta.js"].map(file => ({ path: file, sha256: createHash("sha256").update(fs.readFileSync(path.join(frontendRoot, file))).digest("hex") }));
  const result = { schemaVersion: 1, suite: "animation-studio-operator", runId, namespace, evidenceRoot, status: results.length === 18 && passed === 18 && networkAttempts.length === 0 ? "PASS" : "FAIL", passed, failed: results.filter(item => item.status === "FAIL").length, expectedCases: 18, results, sourceFiles, frameworkBindings, networkAttempts, actualProviderExecutions: 0, actualRendererExecutions: 0, retainedFixtures: true, limitations: ["Factory uses explicit synthetic loopback listener observations; actual Next transport and UI require separate browser acceptance.", "All projects are isolated synthetic test data; no provider or rendering execution is exercised.", "Project-capacity admission is synchronous within the single local server process; no multi-process quota guarantee is claimed."] };
  fs.writeFileSync(path.join(evidenceRoot, "result.json"), JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
  fs.closeSync(log); process.stdout.write(JSON.stringify(result) + "\n"); if (result.status !== "PASS") process.exitCode = 1;
}
