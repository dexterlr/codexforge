// Source-component unit regression, NOT browser acceptance or a full React renderer.
// Executes the actual transpiled TSX event handlers and React JSX elements with
// deterministic hook, storage, timer and HTTP seams; no real network is allowed.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module from "node:module";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { setImmediate as nextTask } from "node:timers/promises";
import ts from "typescript";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const contract = loader.load("@/lib/codexforge/animation-studio/footage-contract");
const componentPath = "src/lib/codexforge/animation-studio/components/FootageImportPanel.tsx";
const cssPath = "src/lib/codexforge/animation-studio/components/FootageImportPanel.module.css";
const filename = path.join(frontend, componentPath), source = fs.readFileSync(filename, "utf8"), css = fs.readFileSync(path.join(frontend, cssPath), "utf8");
const nativeRequire = Module.createRequire(filename), jsxRuntime = nativeRequire("react/jsx-runtime");
const sha = value => createHash("sha256").update(value).digest("hex");
const runId = randomUUID(), startedAt = new Date().toISOString();
const evidence = path.join(frontend, ".codexforge", "acceptance", `studio-footage-ui-tests-${runId}`);
fs.mkdirSync(evidence, { recursive: true });
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
const sourceBindings = [...new Set([...loader.loaded, componentPath, cssPath, "scripts/animation-studio-test-loader.mjs", "scripts/test-animation-studio-footage-ui.mjs"])]
  .sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
retain("intent.json", { runId, startedAt, scope: "Actual TSX handlers/React JSX runtime with deterministic hooks, sessionStorage, timers and synthetic HTTP; not DOM rendering, browser acceptance, native execution, or a network test.", sourceBindings });

function fixture() {
  return { schemaVersion: 1, project: { projectId: "project_ui_footage", revision: 1 }, shots: [{ shotId: "shot_ui_footage", revision: 1, inputAssets: [], audio: [] }], assets: [], approvals: [], events: [], qcResults: [] };
}
function successfulSnapshot() {
  const value = fixture(); value.project.revision = 2; value.shots[0].revision = 2;
  value.shots[0].inputAssets = [{ assetId: "asset_ui_footage", version: 1 }];
  value.assets = [{ assetId: "asset_ui_footage", version: 1, assetType: "VIDEO", approvalState: "DRAFT", contentHash: "a".repeat(64), rights: { status: "UNKNOWN", license: null, evidence: null }, provenance: { adapterMetadata: { adapterId: "studio-local-footage-v1", settings: { originalName: "synthetic.mp4", sourceLabel: "Synthetic UI-only source" } } } }];
  return value;
}
function children(node) {
  if (Array.isArray(node)) return node.flatMap(children);
  if (!node || typeof node !== "object" || !("props" in node)) return [];
  return [node, ...children(node.props.children)];
}
function words(node) {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (Array.isArray(node)) return node.map(words).join("");
  if (typeof node !== "object") return String(node);
  return words(node.props?.children);
}
function assertBodylessFinalization(call, idempotencyKey) {
  assert.equal(call.method, "PATCH"); assert.equal(call.body, undefined, "UI finalization must omit the body, not serialize null or an empty object.");
  assert.equal(call.headers["Idempotency-Key"], idempotencyKey); assert.equal(call.headers["X-CodexForge-Animation-Studio"], "local-operator-v1");
  const names = Object.keys(call.headers).map(name => name.toLowerCase());
  for (const name of ["content-type", "content-length", "content-encoding", "transfer-encoding"]) assert.equal(names.includes(name), false, `UI finalization must not add ${name}.`);
}
const SESSION_ID = `upload_${"a".repeat(48)}`, CHUNK_BYTES = 8 * 1024 * 1024, MAX_SOURCE_BYTES = 2 * 1024 * 1024 * 1024;
function uploadStatus({ status = "UPLOADING", receivedBytes = 0, acknowledgedChunks = 0, expectedBytes } = {}) {
  return { sessionId: SESSION_ID, status, projectId: "project_ui_footage", mediaType: "VIDEO", originalName: "synthetic.mp4", expectedBytes, receivedBytes, acknowledgedChunks,
    chunkBytes: CHUNK_BYTES, maximumSourceBytes: MAX_SOURCE_BYTES, canUpload: status === "UPLOADING", canFinalize: receivedBytes === expectedBytes, canCancel: !["COMPLETE", "CANCELLED"].includes(status), errorCode: null, completion: null };
}

function harness(componentSource, handler, { snapshot = fixture(), stored = {} } = {}) {
  const slots = [], effects = [], timers = new Map(), calls = [], busy = [], imported = [], storage = new Map(Object.entries(stored));
  let cursor = 0, timerId = 0, tree, component, focused = [];
  const props = { snapshot, disabled: false, onBusyChange(value) { busy.push(value); }, onImported(value) { imported.push(value); props.snapshot = value; } };
  const hooks = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === "function" ? initial() : initial;
      return [slots[index], value => { slots[index] = typeof value === "function" ? value(slots[index]) : value; }];
    },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useCallback(callback, dependencies) {
      const index = cursor++, previous = slots[index];
      if (!previous || dependencies.some((value, ordinal) => !Object.is(value, previous.dependencies[ordinal]))) slots[index] = { dependencies, callback };
      return slots[index].callback;
    },
    useEffect(callback, dependencies) {
      const index = cursor++, previous = slots[index];
      if (!previous || dependencies.some((value, ordinal) => !Object.is(value, previous.dependencies[ordinal]))) {
        effects.push(() => { previous?.cleanup?.(); slots[index] = { dependencies, cleanup: callback() }; });
      }
    },
  };
  const compiled = ts.transpileModule(componentSource, { fileName: filename, reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  assert.equal((compiled.diagnostics ?? []).filter(item => item.category === ts.DiagnosticCategory.Error).length, 0);
  const item = new Module(filename); item.filename = filename;
  item.require = specifier => {
    if (specifier === "react") return hooks;
    if (specifier === "react/jsx-runtime") return jsxRuntime;
    if (specifier === "../footage-contract") return contract;
    if (specifier === "./FootageImportPanel.module.css") return new Proxy({}, { get: (_, key) => String(key) });
    throw new Error(`Unexpected component dependency: ${specifier}`);
  };
  item._compile(compiled.outputText, filename); component = item.exports.FootageImportPanel;
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, "window"), blockedFetch = globalThis.fetch;
  globalThis.window = {
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
    sessionStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(String(key), String(value)); },
      removeItem(key) { storage.delete(String(key)); },
    },
  };
  globalThis.fetch = async (url, options = {}) => {
    const call = { url: String(url), method: options.method ?? "GET", body: options.body, headers: { ...options.headers }, signal: options.signal };
    calls.push(call); return handler(call, calls.length - 1);
  };
  function render() {
    cursor = 0; tree = component(props);
    for (const node of children(tree)) if (node.props.ref && typeof node.props.ref === "object" && node.props.ref.current === null) {
      const id = node.props.id ?? node.type; node.props.ref.current = { value: "synthetic selection", focus() { focused.push(id); } };
    }
    while (effects.length) effects.shift()();
    return tree;
  }
  function flushZeroTimers() {
    for (const [id, timer] of [...timers]) if (timer.delay === 0) { timers.delete(id); timer.callback(); }
  }
  function find(predicate) { const matches = children(tree).filter(predicate); assert.equal(matches.length, 1, `Expected one element, found ${matches.length}.`); return matches[0]; }
  function maybe(predicate) { return children(tree).find(predicate) ?? null; }
  function button(label) { return find(node => node.type === "button" && words(node) === label); }
  async function settle(rounds = 20) { for (let index = 0; index < rounds; index++) { await nextTask(); render(); flushZeroTimers(); } }
  function selectFile(size = 55) {
    const file = new File([new Uint8Array(size)], "synthetic.mp4", { type: "video/mp4" });
    find(node => node.props.id === "footage-file").props.onChange({ target: { files: [file] } }); render();
    find(node => node.props.id === "footage-source").props.onChange({ target: { value: "Synthetic UI-only source" } }); render();
    return file;
  }
  async function submit() { find(node => node.type === "form").props.onSubmit({ preventDefault() {} }); await settle(); }
  async function click(label) { const element = button(label); assert.equal(Boolean(element.props.disabled), false, `Button disabled: ${label}`); element.props.onClick(); await settle(); }
  function dispose() {
    for (const slot of slots) if (slot?.cleanup) slot.cleanup();
    globalThis.fetch = blockedFetch;
    if (oldWindow) Object.defineProperty(globalThis, "window", oldWindow); else delete globalThis.window;
  }
  render();
  return { calls, busy, imported, storage, focused: () => focused, selectFile, submit, click, settle, button, maybe, dispose, render, setActive(value) { props.active = value; render(); }, text: () => words(tree), tree: () => tree };
}

const results = [];
async function test(name, run) {
  try { const details = await run(); results.push({ name, status: "PASS", details }); console.log(`PASS ${name}`); }
  catch (error) { results.push({ name, status: "FAIL", error: { name: error.name, message: error.message, stack: error.stack } }); console.log(`FAIL ${name}: ${error.message}`); }
}

await test("Bounded upload creates once, sends ordered slices, finalizes once and publishes only the returned snapshot", async () => {
  const next = successfulSnapshot(), putOffsets = []; let expectedBytes = 0, acknowledgedChunks = 0;
  const h = harness(source, async call => {
    const url = new URL(call.url, "http://local.test"), method = call.method;
    if (method === "POST") {
      const body = JSON.parse(call.body); expectedBytes = body.expectedBytes; return Response.json(uploadStatus({ expectedBytes }));
    }
    if (method === "PUT") {
      const offset = Number(url.searchParams.get("offset")); putOffsets.push(offset);
      assert.ok(call.body instanceof Blob); assert.ok(call.body.size > 0 && call.body.size <= CHUNK_BYTES);
      acknowledgedChunks++; return Response.json(uploadStatus({ receivedBytes: offset + call.body.size, acknowledgedChunks, expectedBytes }));
    }
    if (method === "PATCH") return Response.json({ ok: true, result: { ...uploadStatus({ status: "COMPLETE", receivedBytes: expectedBytes, acknowledgedChunks, expectedBytes }), snapshot: next } });
    throw new Error(`Unexpected request: ${method} ${url.pathname}`);
  });
  try {
    const file = h.selectFile(CHUNK_BYTES + 7);
    assert.equal(file.size, CHUNK_BYTES + 7); assert.ok(h.text().includes("synthetic.mp4")); assert.ok(h.text().includes("8,388,615 bytes (8.00 MiB)"));
    await h.submit();
    const post = h.calls[0], metadata = JSON.parse(decodeURIComponent(JSON.parse(post.body).metadata));
    assert.equal(post.url, "/api/codexforge/animation-studio/footage/upload"); assert.equal(post.method, "POST");
    assert.equal(JSON.parse(post.body).expectedBytes, file.size); assert.equal(metadata.projectId, "project_ui_footage");
    assert.match(post.headers["Idempotency-Key"], /^[0-9a-f-]{36}$/u); assert.equal(post.headers["X-CodexForge-Animation-Studio"], "local-operator-v1");
    assert.deepEqual(putOffsets, [0, CHUNK_BYTES]); assert.equal(h.calls.filter(call => call.method === "PATCH").length, 1);
    assertBodylessFinalization(h.calls.find(call => call.method === "PATCH"), post.headers["Idempotency-Key"]);
    assert.equal(h.imported.length, 1); assert.deepEqual(h.imported[0], next); assert.equal(h.busy.at(-1), false); assert.equal(h.storage.size, 0);
    assert.ok(h.text().includes("Import complete")); assert.ok(h.text().includes("Complete"));
    return { requests: h.calls.length, chunks: putOffsets.length, offsets: putOffsets, publishedSnapshots: h.imported.length, automaticRetries: 0, finalizationBodyOmitted: true, finalizationContentHeadersAbsent: true };
  } finally { h.dispose(); }
});

await test("Interrupted upload retains only lightweight recovery data, never leaks the session id and never retries automatically", async () => {
  let putCalls = 0;
  const h = harness(source, async call => {
    if (call.method === "POST") return Response.json(uploadStatus({ expectedBytes: 55 }));
    if (call.method === "PUT") { putCalls++; throw new TypeError("Synthetic interrupted connection."); }
    throw new Error(`Unexpected ${call.method}`);
  });
  try {
    await h.selectFile(); await h.submit(); const callsAfterFailure = h.calls.length; await h.settle();
    assert.equal(h.calls.length, callsAfterFailure); assert.equal(putCalls, 1); assert.equal(h.busy.at(-1), true);
    assert.ok(h.text().includes("Incomplete upload retained safely")); assert.equal(h.text().includes(SESSION_ID), false);
    const saved = JSON.parse([...h.storage.values()][0]); assert.deepEqual(Object.keys(saved).sort(), ["fileName", "fileSize", "idempotencyKey", "projectId", "sessionId"]);
    assert.equal(saved.fileName, "synthetic.mp4"); assert.equal(saved.fileSize, 55);
    return { syntheticRequests: h.calls.length, automaticRetries: 0, retainedKeys: Object.keys(saved).sort(), sessionIdRendered: false, parentLockRetained: true };
  } finally { h.dispose(); }
});

await test("Reload recovery checks status without resuming and explicit cancellation clears only the incomplete upload", async () => {
  const key = "codexforge.studio.footage-upload.v1.project_ui_footage";
  const saved = { sessionId: SESSION_ID, projectId: "project_ui_footage", fileName: "synthetic.mp4", fileSize: 55, idempotencyKey: "upload-key-recovery-partial" };
  const h = harness(source, async call => {
    if (call.method === "GET") return Response.json(uploadStatus({ status: "INTERRUPTED", receivedBytes: 16, acknowledgedChunks: 1, expectedBytes: 55 }));
    if (call.method === "DELETE") return new Response(null, { status: 204 });
    throw new Error(`Recovery must not ${call.method} source bytes.`);
  }, { stored: { [key]: JSON.stringify(saved) } });
  try {
    await h.settle(); assert.deepEqual(h.calls.map(call => call.method), ["GET"]); assert.ok(h.text().includes("16 bytes (0.00 MiB) safely acknowledged"));
    assert.ok(h.text().includes("cancel and restart explicitly")); assert.equal(h.text().includes(saved.sessionId), false);
    await h.click("Cancel incomplete upload and start over");
    assert.deepEqual(h.calls.map(call => call.method), ["GET", "DELETE"]); assert.equal(h.storage.size, 0); assert.equal(h.busy.at(-1), false);
    assert.ok(h.text().includes("No Asset or Take was published"));
    return { recoveryRequests: 1, uploadRequests: 0, cancellationRequests: 1, recordCleared: true, focusRestored: h.focused().includes("footage-file") };
  } finally { h.dispose(); }
});

await test("Reload recovery explicitly finalizes fully acknowledged bytes without retransmitting the source", async () => {
  const key = "codexforge.studio.footage-upload.v1.project_ui_footage", idempotencyKey = "upload-key-recovery-complete";
  const saved = { sessionId: SESSION_ID, projectId: "project_ui_footage", fileName: "synthetic.mp4", fileSize: 55, idempotencyKey }, next = successfulSnapshot(); let finishFinalization;
  const delayedFinalization = new Promise(resolve => { finishFinalization = resolve; });
  const h = harness(source, async call => {
    if (call.method === "GET") return Response.json(uploadStatus({ status: "INTERRUPTED", receivedBytes: 55, acknowledgedChunks: 1, expectedBytes: 55 }));
    if (call.method === "PATCH") { assertBodylessFinalization(call, idempotencyKey); await delayedFinalization; return Response.json({ ok: true, result: { ...uploadStatus({ status: "COMPLETE", receivedBytes: 55, acknowledgedChunks: 1, expectedBytes: 55 }), snapshot: next } }); }
    throw new Error(`Recovery must not ${call.method} source bytes.`);
  }, { stored: { [key]: JSON.stringify(saved) } });
  try {
    await h.settle(); assert.deepEqual(h.calls.map(call => call.method), ["GET"]); assert.ok(h.text().includes("Upload bytes ready for final validation"));
    await h.click("Finish validation and publication"); assert.deepEqual(h.calls.map(call => call.method), ["GET", "PATCH"]); assert.equal(source.includes("120_000"), false);
    finishFinalization(); await h.settle();
    assert.equal(h.calls.filter(call => call.method === "PUT" || call.method === "POST").length, 0); assert.equal(h.imported.length, 1); assert.equal(h.storage.size, 0); assert.equal(h.busy.at(-1), false);
    assert.ok(h.text().includes("Import complete"));
    return { statusRequests: 1, finalizationRequests: 1, uploadRequests: 0, uploadCreationRequests: 0, recordCleared: true, duplicateAssetAssumed: false, finalizationBodyOmitted: true, finalizationContentHeadersAbsent: true, originalKeyPreserved: true };
  } finally { h.dispose(); }
});

await test("Legacy recovery records remain cancelable and cannot strand the durable upload claim", async () => {
  const key = "codexforge.studio.footage-upload.v1.project_ui_footage";
  const saved = { sessionId: SESSION_ID, projectId: "project_ui_footage", fileName: "synthetic.mp4", fileSize: 55 };
  const h = harness(source, async call => {
    if (call.method === "GET") return Response.json(uploadStatus({ status: "INTERRUPTED", receivedBytes: 55, acknowledgedChunks: 1, expectedBytes: 55 }));
    if (call.method === "DELETE") return new Response(null, { status: 204 });
    throw new Error(`Legacy recovery must not ${call.method} source bytes or finalize without its original key.`);
  }, { stored: { [key]: JSON.stringify(saved) } });
  try {
    await h.settle(); assert.deepEqual(h.calls.map(call => call.method), ["GET"]); assert.equal(h.maybe(node => node.type === "button" && words(node) === "Discard invalid local recovery record"), null);
    assert.equal(h.maybe(node => node.type === "button" && words(node) === "Finish validation and publication"), null); assert.ok(h.text().includes("earlier interface"));
    await h.click("Cancel incomplete upload and start over"); assert.deepEqual(h.calls.map(call => call.method), ["GET", "DELETE"]); assert.equal(h.storage.size, 0); assert.equal(h.busy.at(-1), false);
    return { legacyRecordAccepted: true, finalizationRequests: 0, cancellationRequests: 1, durableClaimReleased: true };
  } finally { h.dispose(); }
});

await test("Invalid recovery record is fail-closed and can be explicitly discarded without HTTP", async () => {
  const key = "codexforge.studio.footage-upload.v1.project_ui_footage";
  const h = harness(source, async call => { throw new Error(`No HTTP expected: ${call.method}`); }, { stored: { [key]: "{invalid" } });
  try {
    await h.settle();
    assert.ok(h.text().includes("Discard invalid local recovery record")); assert.equal(h.button("Validate and import local media").props.disabled, true);
    await h.click("Discard invalid local recovery record"); assert.equal(h.calls.length, 0); assert.equal(h.storage.size, 0); assert.equal(h.busy.at(-1), false);
    return { httpRequests: 0, failClosed: true, explicitDiscard: true };
  } finally { h.dispose(); }
});

await test("A recovered FAILED session is released honestly without assuming an Asset or Take", async () => {
  const key = "codexforge.studio.footage-upload.v1.project_ui_footage";
  const saved = { sessionId: SESSION_ID, projectId: "project_ui_footage", fileName: "synthetic.mp4", fileSize: 55, idempotencyKey: "upload-key-recovery-failed" };
  const h = harness(source, async call => {
    assert.equal(call.method, "GET"); return Response.json(uploadStatus({ status: "FAILED", receivedBytes: 55, acknowledgedChunks: 1, expectedBytes: 55 }));
  }, { stored: { [key]: JSON.stringify(saved) } });
  try {
    await h.settle(); assert.equal(h.calls.length, 1); assert.equal(h.storage.size, 0); assert.equal(h.busy.at(-1), false); assert.equal(h.imported.length, 0);
    assert.ok(h.text().includes("failed before publication")); assert.ok(h.text().includes("No Asset or Take was created"));
    return { status: "FAILED", recordCleared: true, assetAssumed: false, parentLockReleased: true };
  } finally { h.dispose(); }
});

await test("Preview performs a 12-byte range probe then binds the media element to the same-origin route", async () => {
  const bytes = new Uint8Array([0, 0, 0, 12, 102, 116, 121, 112, 105, 115, 111, 109]);
  const h = harness(source, async call => {
    assert.equal(call.method, "GET"); assert.equal(call.headers.Range, "bytes=0-11"); assert.equal(call.headers["X-CodexForge-Animation-Studio"], "local-operator-v1");
    return new Response(bytes, { status: 206, headers: { "Content-Type": "video/mp4", "Content-Length": "12", "Content-Range": "bytes 0-11/120" } });
  }, { snapshot: successfulSnapshot() });
  try {
    await h.click("Preview synthetic.mp4"); const video = h.maybe(node => node.type === "video"); assert.ok(video);
    assert.equal(video.props.src, "/api/codexforge/animation-studio/footage?projectId=project_ui_footage&assetId=asset_ui_footage&version=1");
    assert.equal(video.props.preload, "metadata"); assert.equal(source.includes("URL.createObjectURL"), false); assert.equal(source.includes("response.blob"), false);
    return { range: h.calls[0].headers.Range, responseBytes: 12, directSameOriginRoute: true, blobUrl: false };
  } finally { h.dispose(); }
});

await test("Operator copy and responsive styles expose exact limits, lifecycle and mobile stacking", async () => {
  assert.ok(source.includes("up to 2 GiB")); assert.ok(source.includes("up to 16 GiB"));
  for (const label of ["Uploading", "Verifying", "Probing", "Publishing", "Complete"]) assert.ok(source.includes(`\"${label}\"`));
  assert.ok(source.includes("No Asset, Take or completion is assumed")); assert.match(css, /@media \(max-width: 600px\)/u); assert.match(css, /\.steps\s*\{[^}]*grid-template-columns:\s*1fr/su);
  return { exactFileLimit: true, exactProjectLimit: true, orderedLifecycle: true, honestInterruptedState: true, mobileStacking: true };
});

await test("Hidden setup unloads its selected preview while preserving input metadata and errors; reopening does not fetch", async () => {
  const bytes = new Uint8Array([0, 0, 0, 12, 102, 116, 121, 112, 105, 115, 111, 109]);
  const h = harness(source, async call => {
    assert.equal(call.method, "GET");
    return new Response(bytes, { status: 206, headers: { "Content-Type": "video/mp4", "Content-Length": "12", "Content-Range": "bytes 0-11/120" } });
  }, { snapshot: successfulSnapshot() });
  try {
    h.selectFile(); h.maybe(node => node.props.id === "footage-license").props.onChange({ target: { value: "Retained ownership note" } }); h.render();
    await h.click("Preview synthetic.mp4"); const video = h.maybe(node => node.type === "video"); assert.ok(video);
    const attributes = new Map([["src", video.props.src]]), mediaActions = [];
    const element = { getAttribute: name => attributes.get(name) ?? null, setAttribute(name, value) { attributes.set(name, value); }, removeAttribute(name) { attributes.delete(name); mediaActions.push(`remove:${name}`); }, pause() { mediaActions.push("pause"); }, load() { mediaActions.push("load"); } };
    video.props.ref(element); video.props.ref(null); video.props.ref(element);
    assert.equal(attributes.get("src"), video.props.src, "A React ref detach/reattach restores only the selected source");
    mediaActions.length = 0;
    video.props.onError(); h.setActive(false); video.props.ref(null); await h.settle();
    assert.deepEqual(mediaActions, ["pause", "remove:src", "load"]); assert.equal(attributes.has("src"), false);
    assert.equal(h.maybe(node => node.type === "video" || node.type === "audio"), null);
    assert.equal(h.maybe(node => node.props.id === "footage-source").props.value, "Synthetic UI-only source");
    assert.equal(h.maybe(node => node.props.id === "footage-license").props.value, "Retained ownership note");
    assert.match(h.text(), /synthetic\.mp4/); assert.match(h.text(), /could not decode the admitted video/);
    const count = h.calls.length; h.setActive(true); await h.settle(); assert.equal(h.calls.length, count);
    assert.equal(h.maybe(node => node.type === "video" || node.type === "audio"), null);
    await h.click("Preview synthetic.mp4"); assert.equal(h.calls.length, count + 1); assert.ok(h.maybe(node => node.type === "video"));
    return { viewChangeRequests: 0, mediaUnloaded: true, inputMetadataPreserved: true, activeErrorPreserved: true, explicitReloadRequired: true, refLifecycle: "Synthetic callback seam, not browser playback" };
  } finally { h.dispose(); }
});

await test("Hidden setup aborts only an outstanding preview probe and requires another explicit preview action", async () => {
  const h = harness(source, call => new Promise((resolve, reject) => {
    assert.equal(call.method, "GET"); call.signal.addEventListener("abort", () => reject(new DOMException("Preview suspended", "AbortError")), { once: true });
  }), { snapshot: successfulSnapshot() });
  try {
    await h.click("Preview synthetic.mp4"); assert.equal(h.calls.length, 1); assert.equal(h.calls[0].signal.aborted, false);
    h.setActive(false); await h.settle(); assert.equal(h.calls[0].signal.aborted, true); assert.equal(h.maybe(node => node.type === "video" || node.type === "audio"), null);
    h.setActive(true); await h.settle(); assert.equal(h.calls.length, 1); assert.equal(h.button("Preview synthetic.mp4").props.disabled, false);
    return { previewAborted: true, automaticRetry: false, requestCount: 1 };
  } finally { h.dispose(); }
});

await test("Hiding setup preserves an ongoing upload and its exact recovery record through completion", async () => {
  let finishChunk;
  const chunkWait = new Promise(resolve => { finishChunk = resolve; });
  const h = harness(source, async call => {
    if (call.method === "POST") return Response.json(uploadStatus({ expectedBytes: 55 }));
    if (call.method === "PUT") { await chunkWait; return Response.json(uploadStatus({ expectedBytes: 55, receivedBytes: 55, acknowledgedChunks: 1 })); }
    if (call.method === "PATCH") return Response.json({ ok: true, result: { ...uploadStatus({ status: "COMPLETE", expectedBytes: 55, receivedBytes: 55, acknowledgedChunks: 1 }), snapshot: successfulSnapshot() } });
    throw Error(`Unexpected hidden upload request: ${call.method}`);
  });
  try {
    h.selectFile(); await h.submit(); assert.deepEqual(h.calls.map(call => call.method), ["POST", "PUT"]);
    const saved = [...h.storage.entries()], uploadSignal = h.calls[1].signal; assert.equal(saved.length, 1);
    h.setActive(false); await h.settle(); assert.equal(uploadSignal.aborted, false); assert.deepEqual([...h.storage.entries()], saved); assert.equal(h.busy.at(-1), true);
    finishChunk(); await h.settle(); assert.equal(uploadSignal.aborted, false); assert.equal(h.imported.length, 1); assert.equal(h.storage.size, 0);
    assert.deepEqual(h.calls.map(call => call.method), ["POST", "PUT", "PATCH"]); assert.equal(h.busy.at(-1), false);
    return { uploadAborted: false, recoveryPreservedUntilReceipt: true, duplicateUpload: false, publishedSnapshots: 1 };
  } finally { h.dispose(); }
});

const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const status = results.length === 12 && results.every(item => item.status === "PASS") && networkAttempts.length === 0 && sourceUnchanged ? "PASS" : "FAIL";
retain("result.json", { status, runId, startedAt, finishedAt: new Date().toISOString(), tests: results, passed: results.filter(item => item.status === "PASS").length, total: results.length, sourceBindings, sourceUnchanged, runtime: "Actual TSX event handlers and installed React JSX runtime; deterministic hook/sessionStorage/timer/fetch seams.", notBrowserAcceptance: true, nativeExecution: false, nativeRebuilt: false, networkAttempts, providerRequests: 0, credentialReads: 0, productionDataMutations: 0 });
console.log(JSON.stringify({ status, passed: results.filter(item => item.status === "PASS").length, total: results.length, evidence, sourceUnchanged, networkAttempts }));
if (status !== "PASS") process.exitCode = 1;
