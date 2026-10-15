// Focused deterministic hook/session/fetch tests for the first saved-head trailer UI.
// This is not browser, native playback, FFmpeg or responsive-rendering evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { setImmediate as nextTask } from 'node:timers/promises';
import ts from 'typescript';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const contract = loader.load('@/lib/codexforge/animation-studio/composition-contract');
const v2 = loader.load('@/lib/codexforge/animation-studio/editorial-v2-contract');
const componentBase = 'src/lib/codexforge/animation-studio/components/';
const componentNames = ['SavedHeadRenderPanel', 'FoundationCopyPanel', 'FoundationCopyViewer', 'FoundationCopyTimeline', 'EditorialWorkspacePanel'];
const componentSources = new Map(componentNames.map(name => [name, fs.readFileSync(path.join(frontend, componentBase, `${name}.tsx`), 'utf8')]));
const cssPath = path.join(frontend, componentBase, 'CompositionPanel.module.css'), css = fs.readFileSync(cssPath, 'utf8');
const sha = value => createHash('sha256').update(value).digest('hex'), clone = value => JSON.parse(JSON.stringify(value));
const runId = randomUUID(), startedAt = new Date().toISOString(), evidence = path.join(frontend, '.codexforge/acceptance', `studio-trailer-ui-tests-${runId}`);
fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const projectId = 'project_trailer_ui', compositionId = 'composition_trailer_ui', stamp = '2026-09-27T12:00:00.000Z', digestA = 'a'.repeat(64), hashB = 'b'.repeat(64), specHash = 'c'.repeat(64);
const renderEndpoint = '/api/codexforge/animation-studio/editorial-v2/render', outputEndpoint = `${renderEndpoint}/output`, editorialEndpoint = '/api/codexforge/animation-studio/editorial-v2';
const renderPendingKey = `codexforge.studio.render.pending.v1.${projectId}`, editorialPendingKey = `codexforge.studio.editorial.pending.v2.${projectId}`, draftKey = `codexforge.studio.editorial.draft.v2.${projectId}`, durationDraftKey = `codexforge.studio.editorial.duration-draft.v1.${projectId}`;
const savedHead = { headDigest: digestA, workingCopyRevision: 7, compositionRevision: 3 };
const policyMinimum = { numerator: 1, denominator: 25 }, policyMaximum = { numerator: 300, denominator: 1 };
const preset = { presetId: 'TRAILER_720P25_H264_AAC_V1', width: 1280, height: 720, frameRate: { numerator: 25, denominator: 1 }, duration: { numerator: 30, denominator: 1 }, expectedFrames: 750, videoCodec: 'libx264', audioCodec: 'aac', sampleRate: 48000, expectedAudioSamples: 1_440_000, channels: 2, qualifiedDurationRange: { minimum: policyMinimum, maximum: policyMaximum } };
const outputUrl = (assetId, version, contentHash, disposition) => `${outputEndpoint}?${new URLSearchParams({ projectId, assetId, version: String(version), contentHash, disposition })}`;
function output(version = 1) { const assetId = 'asset_trailer_output'; return { assetId, version, jobId: 'job_trailer_ui', headDigest: digestA, contentHash: hashB, byteLength: 123456, createdAt: stamp, video: { codec: 'h264', width: 1280, height: 720, frameRate: '25/1', decodedFrames: 750 }, audio: { codec: 'aac', sampleRate: 48000, channels: 2 }, playbackUrl: outputUrl(assetId, version, hashB, 'inline'), downloadUrl: outputUrl(assetId, version, hashB, 'attachment') }; }
function job(state = 'QUEUED', changes = {}) {
  const complete = state === 'COMPLETED', running = state === 'RUNNING', terminal = ['COMPLETED','FAILED','CANCELLED','INTERRUPTED'].includes(state), result = complete ? output() : null;
  return { jobId: 'job_trailer_ui', state, specDigest: specHash, sourceHeadDigest: digestA, sourceRevision: 7, compositionRevision: 3, targetVersion: 1, progress: { phase: complete ? 'DONE' : running ? 'RENDERING' : state, completed: complete ? 750 : running ? 50 : 0, total: complete || running ? 750 : 0, percent: complete ? 100 : running ? 6.67 : 0 }, createdAt: stamp, startedAt: state === 'QUEUED' ? null : stamp, finishedAt: terminal ? stamp : null, error: ['FAILED','INTERRUPTED'].includes(state) ? { code: `render_${state.toLowerCase()}`, message: 'Synthetic bounded failure.' } : null, output: result, ...changes };
}
function renderResult({ state = null, readiness = 'READY', outputs = null, ledgerRevision = 0 } = {}) {
  const jobs = state ? [job(state)] : [], published = outputs ?? (state === 'COMPLETED' ? [output()] : []);
  const timing = { duration: preset.duration, frameRate: preset.frameRate, expectedFrames: preset.expectedFrames, sampleRate: preset.sampleRate, expectedAudioSamples: preset.expectedAudioSamples, qualifiedMinimumDuration: policyMinimum, qualifiedMaximumDuration: policyMaximum };
  return { projectId, compositionId, current: { headDigest: digestA, revision: 7, compositionRevision: 3 }, preset: clone(preset), readiness: { state: readiness, blockers: readiness === 'READY' ? [] : [{ code: 'SOURCE_UNAVAILABLE', layerId: 'layer_video', property: 'source.asset', message: 'The immutable local source is unavailable.' }], timing }, ledgerRevision, jobs, outputs: published, providerRequests: 0, generationRequests: 0 };
}
const envelope = (result, extra = {}) => ({ ok: true, result: clone(result), ...extra });
function descendants(node) { if (Array.isArray(node)) return node.flatMap(descendants); if (!node || typeof node !== 'object' || !('props' in node)) return []; return [node, ...descendants(node.props.children)]; }
function words(node) { if (node == null || typeof node === 'boolean') return ''; if (Array.isArray(node)) return node.map(words).join(''); if (typeof node !== 'object') return String(node); return words(node.props?.children); }
function changed(deps, prior) { return !prior || deps.length !== prior.dependencies.length || deps.some((value, index) => !Object.is(value, prior.dependencies[index])); }
function BlenderSourceSeam() { throw Error('Native Blender child seam is identified, never executed by saved-head UI tests.'); }

function componentHarness(name, { props, session = new Map(), fetcher, stubs = {} }) {
  const slots = [], effects = [], timers = new Map(), calls = [], events = []; let cursor = 0, timerId = 0, tree;
  const hooks = {
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useCallback(callback, dependencies) { const index = cursor++; if (changed(dependencies, slots[index])) slots[index] = { dependencies, callback }; return slots[index].callback; },
    useEffect(callback, dependencies) { const index = cursor++, previous = slots[index]; if (changed(dependencies, previous)) effects.push(() => { previous?.cleanup?.(); slots[index] = { dependencies, cleanup: callback() }; }); },
  };
  const relative = path.join(componentBase, `${name}.tsx`), filename = path.join(frontend, relative), compiled = ts.transpileModule(componentSources.get(name), { fileName: filename, reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  const errors = (compiled.diagnostics ?? []).filter(item => item.category === ts.DiagnosticCategory.Error); assert.equal(errors.length, 0, errors.length ? ts.formatDiagnostics(errors, { getCanonicalFileName: value => value, getCurrentDirectory: () => frontend, getNewLine: () => '\n' }) : '');
  const jsxRuntime = Module.createRequire(filename)('react/jsx-runtime'), item = new Module(filename); item.filename = filename;
  item.require = specifier => {
    if (specifier === 'react') return hooks;
    if (specifier === 'react/jsx-runtime') return jsxRuntime;
    if (specifier.endsWith('.module.css')) return new Proxy({}, { get: (_, key) => String(key) });
    if (specifier === './BlenderSourcePanel') return { BlenderSourcePanel: BlenderSourceSeam };
    if (Object.hasOwn(stubs, specifier)) return stubs[specifier];
    if (specifier.startsWith('../')) return loader.load('@/lib/codexforge/animation-studio/' + specifier.slice(3));
    throw Error(`Unexpected component dependency: ${specifier}`);
  };
  item._compile(compiled.outputText, filename);
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window'), oldSession = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage'), blockedFetch = globalThis.fetch;
  globalThis.window = { setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; }, clearTimeout(id) { timers.delete(id); }, addEventListener() {}, removeEventListener() {} };
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: { getItem(key) { events.push({ kind: 'get', key }); return session.get(key) ?? null; }, setItem(key, value) { session.set(key, value); events.push({ kind: 'set', key, value }); }, removeItem(key) { session.delete(key); events.push({ kind: 'remove', key }); } } });
  globalThis.fetch = async (url, init = {}) => { const call = { url: String(url), init, pendingBeforeRequest: session.get(renderPendingKey) ?? session.get(editorialPendingKey) ?? null }; calls.push(call); return fetcher(call); };
  function render() { cursor = 0; tree = item.exports[name](props); while (effects.length) effects.shift()(); return tree; }
  function findAll(predicate, root = tree) { return descendants(root).filter(predicate); }
  function find(predicate, root = tree) { const matches = findAll(predicate, root); assert.equal(matches.length, 1, `Expected one match, found ${matches.length}.`); return matches[0]; }
  const button = label => find(node => node.type === 'button' && (node.props['aria-label'] ?? words(node)) === label);
  async function settle() { for (let pass = 0; pass < 10; pass++) { for (const [id, timer] of [...timers]) if (timer.delay === 0) { timers.delete(id); timer.callback(); } await nextTask(); render(); } }
  async function click(label) { const control = button(label); assert.equal(Boolean(control.props.disabled), false, `Disabled button: ${label}`); control.props.onClick(); await settle(); }
  function controlDisabled(control, node = tree, inherited = false, seen = new Set()) { if (Array.isArray(node)) { for (const item of node) { const found = controlDisabled(control, item, inherited, seen); if (found !== null) return found; } return null; } if (!node || typeof node !== 'object' || !node.props || seen.has(node)) return null; seen.add(node); const disabled = inherited || Boolean(node.props.disabled); if (node === control) return disabled; return controlDisabled(control, node.props.children ?? null, inherited || (node.type === 'fieldset' && Boolean(node.props.disabled)), seen); }
  function input(label, value, checked = Boolean(value)) { const control = find(node => ['input','select'].includes(node.type) && node.props['aria-label'] === label); assert.equal(controlDisabled(control), false, `Disabled field: ${label}`); control.props.onChange({ target: { value: String(value), checked } }); render(); }
  function dispose() { for (const slot of slots) slot?.cleanup?.(); globalThis.fetch = blockedFetch; if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow); else delete globalThis.window; if (oldSession) Object.defineProperty(globalThis, 'sessionStorage', oldSession); else delete globalThis.sessionStorage; }
  return { render, settle, click, input, button, find, findAll, controlDisabled, text: () => words(tree), calls, events, session, timers, dispose };
}

const results = [];
async function test(name, body) { const began = Date.now(); try { await body(); results.push({ name, status: 'PASS', durationMs: Date.now() - began }); process.stdout.write(`PASS ${name}\n`); } catch (error) { results.push({ name, status: 'FAIL', error: error instanceof Error ? error.stack : String(error) }); throw error; } }
async function withHarness(name, options, body) { const h = componentHarness(name, options); try { h.render(); await body(h); } finally { h.dispose(); } }

function renderOptions({ get = renderResult(), gets = null, posts = [], session = new Map(), props: changes = {} } = {}) {
  const getReplies = gets ? [...gets] : [get];
  const recoveries = [], props = { projectId, compositionId, savedHead, startBlocked: false, startBlockedReason: '', onBlockingRecoveryChange(value) { recoveries.push(value); }, ...changes };
  return { props, session, recoveries, fetcher(call) {
    const url = new URL(call.url, 'http://synthetic.invalid'), method = call.init.method ?? 'GET', headers = new Headers(call.init.headers);
    assert.equal(url.origin, 'http://synthetic.invalid'); assert.equal(url.pathname, renderEndpoint); assert.equal(call.init.credentials, 'same-origin'); assert.equal(call.init.cache, 'no-store'); assert.equal(call.init.redirect, 'error'); assert.equal(headers.get('X-CodexForge-Animation-Studio'), 'local-operator-v1');
    if (method === 'GET') { assert.deepEqual([...url.searchParams.keys()].sort(), ['compositionId','headDigest','projectId']); assert.equal(url.searchParams.get('projectId'), projectId); assert.equal(url.searchParams.get('compositionId'), compositionId); assert.equal(url.searchParams.get('headDigest'), digestA); const next = getReplies.length > 1 ? getReplies.shift() : getReplies[0]; if (next === 'throw') throw Error('Synthetic saved-head status GET failure.'); return Response.json(envelope(next)); }
    assert.equal(method, 'POST'); assert.ok(posts.length, 'Unexpected render POST.'); const retained = JSON.parse(call.pendingBeforeRequest); assert.equal(retained.body, call.init.body); assert.equal(retained.key, headers.get('Idempotency-Key')); assert.equal(retained.projectId, projectId); const next = posts.shift(); if (next === 'wait') return new Promise((resolve, reject) => { const stop = () => reject(new DOMException('Synthetic wait stopped.', 'AbortError')); if (call.init.signal.aborted) stop(); else call.init.signal.addEventListener('abort', stop, { once: true }); }); if (next.payload) return Response.json(next.payload, { status: next.status }); return Response.json(envelope(next.result, next.extra), { status: next.status ?? 200 });
  } };
}

await test('Saved-head readiness renders exact preset and disabled explanations without an automatic POST', async () => {
  const options = renderOptions({ get: renderResult({ readiness: 'BLOCKED' }) });
  await withHarness('SavedHeadRenderPanel', options, async h => {
    await h.settle(); assert.equal(h.calls.length, 1); assert.equal(h.calls[0].init.method ?? 'GET', 'GET'); assert.match(h.text(), /TRAILER_720P25_H264_AAC_V1/); assert.match(h.text(), /1280 × 720 · 25 fps · 30 \/ 1 seconds/); assert.match(h.text(), /750 frames/); assert.match(h.text(), /SOURCE_UNAVAILABLE/);
    const start = h.button('Render saved head to MP4'); assert.equal(start.props.disabled, true); const help = h.find(node => node.props?.id === start.props['aria-describedby']); assert.match(words(help), /readiness blocker/); assert.equal(options.recoveries.includes(true), false);
  });
});

await test('One synchronous double click retains one exact START body before transport and accepts one receipt', async () => {
  const running = renderResult({ state: 'RUNNING', ledgerRevision: 1 }), options = renderOptions({ posts: [{ result: running, extra: { scheduled: true } }] });
  await withHarness('SavedHeadRenderPanel', options, async h => {
    await h.settle(); const start = h.button('Render saved head to MP4'); assert.equal(start.props.disabled, false); start.props.onClick(); start.props.onClick(); await h.settle();
    const posts = h.calls.filter(call => call.init.method === 'POST'); assert.equal(posts.length, 1); const body = JSON.parse(posts[0].init.body); assert.deepEqual(Object.keys(body).sort(), ['operation','projectId','compositionId','expectedHeadDigest','expectedRevision','expectedCompositionRevision','presetId','requestedAt'].sort()); assert.equal(body.operation, 'START_RENDER'); assert.equal(body.expectedHeadDigest, digestA); assert.equal(body.expectedRevision, 7); assert.equal(body.expectedCompositionRevision, 3); assert.equal(body.presetId, preset.presetId); assert.ok(posts[0].pendingBeforeRequest); assert.equal(h.session.has(renderPendingKey), false); assert.ok(options.recoveries.includes(true)); assert.equal(options.recoveries.at(-1), false); assert.match(h.text(), /RUNNING/);
  });
});

await test('A lost START receipt survives remount and only the explicit retry reuses its exact bytes and key', async () => {
  const body = JSON.stringify({ operation: 'START_RENDER', projectId, compositionId, expectedHeadDigest: digestA, expectedRevision: 7, expectedCompositionRevision: 3, presetId: preset.presetId, requestedAt: stamp }), key = randomUUID(), session = new Map([[renderPendingKey, JSON.stringify({ projectId, key, body })]]);
  const first = renderOptions({ session, posts: [] });
  await withHarness('SavedHeadRenderPanel', first, async h => { await h.settle(); assert.equal(h.calls.filter(call => call.init.method === 'POST').length, 0); assert.match(h.text(), /Exact render request retained/); assert.equal(first.recoveries.at(-1), true); });
  const second = renderOptions({ session, posts: [{ result: renderResult({ state: 'QUEUED', ledgerRevision: 1 }), extra: { replayed: true } }] });
  await withHarness('SavedHeadRenderPanel', second, async h => { await h.settle(); await h.click('Retry exact render request'); const call = h.calls.find(value => value.init.method === 'POST'); assert.ok(call); assert.equal(call.init.body, body); assert.equal(new Headers(call.init.headers).get('Idempotency-Key'), key); assert.equal(session.has(renderPendingKey), false); });
});

await test('A running job does not raise the editor recovery lock and cancellation binds the ledger revision', async () => {
  const cancelled = renderResult({ state: 'CANCELLED', ledgerRevision: 10 }), options = renderOptions({ get: renderResult({ state: 'RUNNING', ledgerRevision: 9 }), posts: [{ result: cancelled }] });
  await withHarness('SavedHeadRenderPanel', options, async h => {
    await h.settle(); assert.equal(options.recoveries.includes(true), false, 'A normal running job must not block unrelated editing.'); const cancel = h.button('Cancel this render'); const help = h.find(node => node.props?.id === cancel.props['aria-describedby']); assert.match(words(help), /only this queued or running local job/); await h.click('Cancel this render'); const call = h.calls.find(value => value.init.method === 'POST'), body = JSON.parse(call.init.body); assert.deepEqual(body, { operation: 'CANCEL_RENDER', projectId, compositionId, jobId: 'job_trailer_ui', expectedLedgerRevision: 9, requestedAt: body.requestedAt }); assert.match(h.text(), /CANCELLED/);
  });
});

await test('Saved-head activity separately blocks native execution during checks, requests and running jobs, then releases on completion', async () => {
  const activity = [], options = renderOptions({ gets: [renderResult({ state: 'RUNNING', ledgerRevision: 2 }), renderResult({ state: 'COMPLETED', ledgerRevision: 3 })], props: { onActivityChange(value) { activity.push(value); } } });
  await withHarness('SavedHeadRenderPanel', options, async h => {
    assert.equal(activity.at(-1), true, 'Recovery initialization protects native Start.');
    await h.settle(); assert.equal(activity.at(-1), true, 'A confirmed running export holds the independent activity lock.');
    assert.equal(options.recoveries.at(-1), false, 'Ordinary running export does not acquire the unrelated editing recovery lock.');
    await h.click('Refresh render status'); assert.equal(activity.at(-1), false, 'Confirmed terminal export releases native Start.');
    assert.equal(h.calls.filter(call => call.init.method === 'POST').length, 0);
  });
  const waiting = [], pendingOptions = renderOptions({ posts: ['wait'], props: { onActivityChange(value) { waiting.push(value); } } });
  await withHarness('SavedHeadRenderPanel', pendingOptions, async h => {
    await h.settle(); assert.equal(waiting.at(-1), false);
    h.button('Render saved head to MP4').props.onClick(); await h.settle(); assert.equal(waiting.at(-1), true);
    await h.click('Stop waiting'); assert.equal(waiting.at(-1), true, 'Unknown request outcome remains blocking after waiting stops.');
    assert.equal(h.session.has(renderPendingKey), true); assert.equal(h.calls.filter(call => call.init.method === 'POST').length, 1);
  });
});

await test('Failed export-status GET keeps native actions locked with visible recovery guidance until a verified refresh succeeds', async () => {
  const activity = [], options = renderOptions({ gets: ['throw', renderResult()], props: { onActivityChange(value) { activity.push(value); } } });
  await withHarness('SavedHeadRenderPanel', options, async h => {
    await h.settle(); assert.equal(activity.at(-1), true, 'Failed initial ownership check must not unlock native execution.');
    assert.equal(options.recoveries.at(-1), false, 'Unknown export activity remains separate from editorial recovery.');
    assert.match(h.text(), /Synthetic saved-head status GET failure/);
    const guide = h.find(node => node.props?.role === 'status' && words(node).startsWith('Native Blender actions remain disabled'));
    assert.match(words(guide), /Open Export \/ outputs and choose Refresh render status/);
    assert.equal(h.button('Refresh render status').props.disabled, false, 'A native lock must not lock the status check needed to resolve it.');
    assert.equal(h.calls.length, 1); assert.equal(h.calls.filter(call => call.init.method === 'POST').length, 0);
    await h.click('Refresh render status'); assert.equal(activity.at(-1), false);
    assert.doesNotMatch(h.text(), /Native Blender actions remain disabled/);
    assert.equal(h.calls.length, 2); assert.equal(h.calls.filter(call => call.init.method === 'POST').length, 0);
  });
});

await test('A definitively rejected stale cancellation retires its request, refreshes status, and permits a newly fenced cancel', async () => {
  const running9 = renderResult({ state: 'RUNNING', ledgerRevision: 9 }), running10 = renderResult({ state: 'RUNNING', ledgerRevision: 10 }), cancelled11 = renderResult({ state: 'CANCELLED', ledgerRevision: 11 });
  const conflict = { status: 409, payload: { ok: false, error: { code: 'render_revision_conflict', message: 'Synthetic stale render ledger.' } } };
  const options = renderOptions({ gets: [running9, running10], posts: [conflict, { result: cancelled11 }] });
  await withHarness('SavedHeadRenderPanel', options, async h => {
    await h.settle(); await h.click('Cancel this render'); const first = h.calls.find(call => call.init.method === 'POST'), firstRetained = JSON.parse(first.pendingBeforeRequest), firstBody = JSON.parse(first.init.body); assert.equal(firstBody.expectedLedgerRevision, 9); assert.equal(h.session.has(renderPendingKey), false); assert.equal(options.recoveries.at(-1), false); assert.match(h.text(), /cannot be safely retried/); assert.match(h.text(), /reconcile its outcome/); assert.doesNotMatch(h.text(), /rejected before application/); assert.match(h.text(), /ledger revision 10/);
    await h.click('Cancel this render'); const postCalls = h.calls.filter(call => call.init.method === 'POST'), secondBody = JSON.parse(postCalls[1].init.body); assert.equal(postCalls.length, 2); assert.equal(secondBody.expectedLedgerRevision, 10); assert.notEqual(new Headers(postCalls[1].init.headers).get('Idempotency-Key'), firstRetained.key); assert.match(h.text(), /CANCELLED/);
  });
});

await test('Every backend-confirmed non-retryable response retires exact bytes and refreshes before replacement', async () => {
  const cases = [['render_invalid_request', 400], ['render_busy', 409], ['render_job_not_cancelable', 409], ['render_not_ready', 422], ['renderer_disabled', 503]];
  for (const [code, status] of cases) {
    const options = renderOptions({ gets: [renderResult({ state: 'RUNNING', ledgerRevision: 9 }), renderResult({ state: 'RUNNING', ledgerRevision: 10 })], posts: [{ status, payload: { ok: false, error: { code, message: `Synthetic ${code}.` } } }] });
    await withHarness('SavedHeadRenderPanel', options, async h => { await h.settle(); await h.click('Cancel this render'); assert.equal(h.session.has(renderPendingKey), false, code); assert.equal(options.recoveries.at(-1), false, code); assert.equal(h.calls.filter(call => (call.init.method ?? 'GET') === 'GET').length, 2, code); assert.match(h.text(), /ledger revision 10/, code); });
  }
});

await test('Storage failures and unconfirmed code/status pairs keep the exact recovery request', async () => {
  const cases = [['render_storage_unavailable', 503], ['render_busy', 503]];
  for (const [code, status] of cases) {
    const options = renderOptions({ get: renderResult({ state: 'RUNNING', ledgerRevision: 9 }), posts: [{ status, payload: { ok: false, error: { code, message: `Synthetic ${code}.` } } }] });
    await withHarness('SavedHeadRenderPanel', options, async h => { await h.settle(); await h.click('Cancel this render'); assert.equal(h.session.has(renderPendingKey), true, code); assert.equal(options.recoveries.at(-1), true, code); assert.equal(h.calls.filter(call => (call.init.method ?? 'GET') === 'GET').length, 1, code); assert.match(h.text(), /Exact render request retained/, code); assert.match(h.text(), /Retry only the retained exact request/, code); });
  }
});

await test('Completed output is mounted only by its explicit toggle and uses fixed same-origin playback and download URLs', async () => {
  const options = renderOptions({ get: renderResult({ state: 'COMPLETED', ledgerRevision: 4 }) });
  await withHarness('SavedHeadRenderPanel', options, async h => {
    await h.settle(); assert.equal(h.findAll(node => node.type === 'video').length, 0); const open = h.button('Open output v1'); assert.equal(open.props['aria-pressed'], false); await h.click('Open output v1');
    const video = h.find(node => node.type === 'video'), link = h.find(node => node.type === 'a' && words(node) === 'Download output v1'); assert.equal(video.props.controls, true); assert.equal(video.props.preload, 'metadata'); assert.equal(video.props.src, outputUrl('asset_trailer_output', 1, hashB, 'inline')); assert.equal(link.props.href, outputUrl('asset_trailer_output', 1, hashB, 'attachment')); assert.equal(new URL(video.props.src, 'http://synthetic.invalid').origin, 'http://synthetic.invalid');
  });
});

await test('Failed and interrupted terminal jobs render bounded states without exposing an output', async () => {
  for (const state of ['FAILED', 'INTERRUPTED']) { const options = renderOptions({ get: renderResult({ state, ledgerRevision: 3 }) }); await withHarness('SavedHeadRenderPanel', options, async h => { await h.settle(); assert.match(h.text(), new RegExp(state)); assert.match(h.text(), new RegExp(`render_${state.toLowerCase()}`)); assert.equal(h.findAll(node => node.type === 'video' || node.type === 'a').length, 0); }); }
});

await test('An external or mismatched output URL fails closed before a player or download is exposed', async () => {
  const result = renderResult({ state: 'COMPLETED' }); result.jobs[0].output.playbackUrl = 'https://example.invalid/leak.mp4'; result.outputs[0].playbackUrl = 'https://example.invalid/leak.mp4'; const options = renderOptions({ get: result });
  await withHarness('SavedHeadRenderPanel', options, async h => { await h.settle(); assert.match(h.text(), /not same-origin/); assert.equal(h.findAll(node => node.type === 'video' || node.type === 'a').length, 0); });
});

function editorialComposition() {
  const provenance = { kind: 'EDITORIAL_INSTRUCTION', providerRequests: 0 }, transform = contract.defaultLayerTransform(), common = { schemaVersion: 1, compositionId, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 30_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform, opacity: 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: 'DRAFT', provenance };
  return v2.migrateCompositionV1ToV2({ schemaVersion: 1, compositionId, projectId, kind: 'SHOT', shotId: 'shot_trailer_ui', name: 'Trailer cut', durationUs: 30_000_000, width: 1280, height: 720, revision: 3, approvalState: 'DRAFT', provenance, layers: [
    { ...common, layerId: 'layer_title', name: 'Trailer title', type: 'TEXT', source: { kind: 'TEXT' }, text: { text: 'Original title', fontRef: 'ARIAL_REGULAR', fontSizePx: 64, color: '#FFFFFF' } },
    { ...common, layerId: 'layer_audio', name: 'Trailer mix', type: 'AUDIO', source: { kind: 'ASSET', asset: { assetId: 'asset_trailer_audio', version: 1 }, takeId: null }, audio: { gainDb: 0, fadeInUs: 0, fadeOutUs: 0, muted: false } },
  ] });
}
const unavailableHistory = command => ({ available: false, command, label: command === 'UNDO_EDITORIAL_EDIT' ? 'Undo' : 'Redo', description: `No supported ${command === 'UNDO_EDITORIAL_EDIT' ? 'undo' : 'redo'} action is available at this saved history position.`, targetOperation: null, compositionId: null, compositionRevision: null });
function selectedEditorial() { return { revision: 7, headDigest: digestA, at: stamp, integrityScope: 'SELECTED_COMPOSITION_DIRECT_REFERENCES_AND_ACTIVE_HISTORY', generationAllowed: false, providerRequests: 0, composition: editorialComposition(), takes: [], media: [{ assetId: 'asset_trailer_audio', version: 1, status: 'UNCHECKED' }], nestedCompositionResolution: 'NOT_LOADED', history: { state: 'ACTIVE', undo: unavailableHistory('UNDO_EDITORIAL_EDIT'), redo: unavailableHistory('REDO_EDITORIAL_EDIT') }, timelineFrameRate: { numerator: 25, denominator: 1 } }; }
const editorialSource = { projectId, projectRevision: 4, legacyRevision: 3, legacyPersisted: true, compositions: [{ compositionId, name: 'Trailer cut', kind: 'SHOT' }], takeCatalogue: [], audioCatalogue: [], workingCopy: { state: 'READY', revision: 7, headDigest: digestA }, providerRequests: 0, generationAllowed: false };
function editorialOptions() {
  const posts = [], busy = [], renderProps = [], props = { projectId, disabled: false, compositionId, onCompositionChange() {}, onBusyChange(value) { busy.push(value); } };
  function ViewerSeam() { throw Error('Viewer seam must not execute.'); } function RenderSeam(received) { renderProps.push(received); throw Error('Render seam must not execute.'); }
  return { props, posts, busy, renderProps, session: new Map(), stubs: { './FoundationCopyViewer': { FoundationCopyViewer: ViewerSeam }, './SavedHeadRenderPanel': { SavedHeadRenderPanel: RenderSeam } }, fetcher(call) {
    const url = new URL(call.url, 'http://synthetic.invalid'), method = call.init.method ?? 'GET', headers = new Headers(call.init.headers); assert.equal(url.pathname, editorialEndpoint); assert.equal(headers.get('X-CodexForge-Animation-Studio'), 'local-operator-v1');
    if (method === 'GET') return Response.json({ ok: true, result: clone(url.searchParams.has('compositionId') ? selectedEditorial() : editorialSource), generation: 'LOCKED', providerRequests: 0 });
    assert.equal(method, 'POST'); const retained = JSON.parse(call.pendingBeforeRequest); assert.equal(retained.body, call.init.body); assert.equal(retained.key, headers.get('Idempotency-Key')); const body = JSON.parse(call.init.body); posts.push(body); return Response.json({ ok: true, result: { revision: 8, headDigest: 'd'.repeat(64), at: body.requestedAt, integrityScope: 'HEAD_AND_CURRENT_COMMIT', generationAllowed: false, providerRequests: 0 }, generation: 'LOCKED', providerRequests: 0 });
  } };
}
async function loadEditorial(h) { await h.settle(); await h.click('Load selected composition'); }

await test('The existing working-copy editor publishes canonical TEXT settings and mounts one integrated render panel', async () => {
  const options = editorialOptions();
  await withHarness('FoundationCopyPanel', options, async h => {
    await loadEditorial(h); assert.equal(h.findAll(node => node.type?.name === 'RenderSeam').length, 1); const render = h.find(node => node.type === options.stubs['./SavedHeadRenderPanel'].SavedHeadRenderPanel); assert.deepEqual(render.props.savedHead, savedHead);
    h.input('Working-copy layer', 'layer_title'); h.input('Title text', 'A Local Premiere'); h.input('Title size in pixels', '72'); h.input('Title colour', '#F0C040'); assert.equal(h.find(node => node.type === 'select' && node.props['aria-label'] === 'Title font').props.value, 'ARIAL_REGULAR'); await h.click('Save working-copy properties');
    assert.equal(options.posts.length, 1); assert.equal(options.posts[0].operation, 'SET_LAYER_PROPERTIES'); assert.equal(options.posts[0].layerId, 'layer_title'); assert.deepEqual(options.posts[0].changes.text, { text: 'A Local Premiere', fontRef: 'ARIAL_REGULAR', fontSizePx: 72, color: '#F0C040' }); assert.equal(options.posts[0].changes.audio, undefined); assert.equal(h.session.has(editorialPendingKey), false); assert.equal(h.session.has(draftKey), false);
  });
});

await test('Composition duration uses one recoverable explicit draft and publishes an exact saved-head command', async () => {
  const options = editorialOptions();
  await withHarness('FoundationCopyPanel', options, async h => {
    await loadEditorial(h); h.input('Composition duration numerator', '776'); h.input('Composition duration denominator', '25');
    assert.equal(h.session.has(durationDraftKey), true); const render = h.find(node => node.type === options.stubs['./SavedHeadRenderPanel'].SavedHeadRenderPanel); assert.equal(render.props.startBlocked, true); assert.match(render.props.startBlockedReason, /Save or discard/); assert.match(h.text(), /exactly 776 video frames/);
    await h.click('Save duration'); assert.equal(options.posts.length, 1); assert.deepEqual(options.posts[0].duration, { numerator: 776, denominator: 25 }); assert.equal(options.posts[0].operation, 'SET_COMPOSITION_DURATION'); assert.equal(options.posts[0].expectedRevision, 7); assert.equal(options.posts[0].expectedCompositionRevision, 3); assert.equal(h.session.has(durationDraftKey), false); assert.equal(h.session.has(editorialPendingKey), false);
  });
});

await test('Shortening before enabled content ends is rejected locally without clipping or transport', async () => {
  const options = editorialOptions();
  await withHarness('FoundationCopyPanel', options, async h => {
    await loadEditorial(h); h.input('Composition duration numerator', '29'); await h.click('Save duration'); assert.equal(options.posts.length, 0); assert.equal(h.session.has(durationDraftKey), true); assert.match(h.text(), /ends after the proposed duration/); assert.match(h.text(), /never clips, retimes, moves or deletes layers/);
  });
});

await test('The same editor publishes bounded AUDIO gain mute and independent exact fades without visual-property controls', async () => {
  const options = editorialOptions();
  await withHarness('FoundationCopyPanel', options, async h => {
    await loadEditorial(h); h.input('Working-copy layer', 'layer_audio'); assert.equal(h.findAll(node => node.type === 'input' && node.props['aria-label'] === 'Opacity').length, 0); h.input('Audio gain in decibels', '-6'); h.input('Mute audio layer', '', true); h.input('Fade in numerator', '20'); h.input('Fade in denominator', '1'); h.input('Fade out numerator', '20'); h.input('Fade out denominator', '1'); await h.click('Save working-copy properties');
    assert.equal(options.posts.length, 1); assert.equal(options.posts[0].layerId, 'layer_audio'); assert.deepEqual(options.posts[0].changes.audio, { gainDb: -6, fadeIn: { numerator: 20, denominator: 1 }, fadeOut: { numerator: 20, denominator: 1 }, muted: true }); assert.equal(options.posts[0].changes.text, undefined); assert.equal(options.posts[0].changes.opacity, undefined); assert.equal(options.posts[0].changes.transform, undefined); assert.equal(options.posts[0].changes.name, 'Trailer mix');
  });
});

await test('Audio occurrence names use existing property saves and saved participation stays authoritative while dirty', async () => {
  const options = editorialOptions();
  await withHarness('FoundationCopyPanel', options, async h => {
    await loadEditorial(h); h.input('Working-copy layer', 'layer_audio'); h.input('Audio occurrence name', 'Voiceover-role signal');
    assert.match(words(h.find(node => node.props?.['aria-label'] === 'Saved audio export participation')), /Trailer mix/);
    assert.equal(h.find(node => node.type === options.stubs['./SavedHeadRenderPanel'].SavedHeadRenderPanel).props.startBlocked, true);
    await h.click('Save working-copy properties'); assert.equal(options.posts.length, 1); assert.equal(options.posts[0].changes.name, 'Voiceover-role signal'); assert.equal(options.posts[0].operation, 'SET_LAYER_PROPERTIES');
  });
});

await test('Exact AUDIO start duration and source offset publish one sample-aligned command and retain dirty-render exclusion', async () => {
  const options = editorialOptions();
  await withHarness('FoundationCopyPanel', options, async h => {
    await loadEditorial(h); h.input('Working-copy layer', 'layer_audio');
    h.input('Audio start numerator', '96001'); h.input('Audio start denominator', '48000'); h.input('Audio duration numerator', '5'); h.input('Audio source offset numerator', '1');
    assert.equal(h.session.has(draftKey), true); assert.equal(h.find(node => node.type === options.stubs['./SavedHeadRenderPanel'].SavedHeadRenderPanel).props.startBlocked, true);
    const save = h.button('Save exact audio timing'); assert.match(words(h.find(node => node.props?.id === save.props['aria-describedby'])), /48,000 samples/);
    await h.click('Save exact audio timing'); assert.equal(options.posts.length, 1);
    assert.deepEqual(options.posts[0], { operation: 'SET_AUDIO_LAYER_TIMING', projectId, expectedRevision: 7, expectedCompositionRevision: 3, compositionId, layerId: 'layer_audio', requestedAt: options.posts[0].requestedAt, start: { numerator: 96001, denominator: 48000 }, duration: { numerator: 5, denominator: 1 }, sourceOffset: { numerator: 1, denominator: 1 } });
    assert.equal(h.session.has(draftKey), false); assert.equal(h.session.has(editorialPendingKey), false);
  });
});

await test('Unaligned AUDIO timing is retained locally without sending and restores after remount', async () => {
  const options = editorialOptions();
  await withHarness('FoundationCopyPanel', options, async h => {
    await loadEditorial(h); h.input('Working-copy layer', 'layer_audio'); h.input('Audio duration numerator', '1'); h.input('Audio start numerator', '1'); h.input('Audio start denominator', '7'); await h.click('Save exact audio timing');
    assert.equal(options.posts.length, 0); assert.equal(h.session.has(draftKey), true); assert.match(h.text(), /align exactly to the 48 kHz sample clock/);
  });
  const restored = editorialOptions(); restored.session = options.session;
  await withHarness('FoundationCopyPanel', restored, async h => {
    await h.settle(); assert.equal(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Audio start denominator').props.value, '7'); assert.equal(restored.posts.length, 0); assert.match(h.text(), /Exact audio timing draft/);
  });
});

await test('Completed new mix reports are optional for historical outputs and display only bounded objective checks', async () => {
  const result = renderResult({ state: 'COMPLETED' }), validation = { format: 'studio-audio-unclamped-pcm-check-v1', frames: 1440000, bytes: 11520000, channels: 2, sampleRate: 48000, peakAbsolute: 0.3, rms: 0.1, nonzeroSamples: 2800000 };
  result.outputs[0].audioMixValidation = validation; result.jobs[0].output.audioMixValidation = validation;
  await withHarness('SavedHeadRenderPanel', renderOptions({ get: result }), async h => { await h.settle(); assert.match(h.text(), /Unclamped audio check/); assert.match(h.text(), /no true-peak or subjective listening approval/); });
  const invalid = clone(result); invalid.outputs[0].audioMixValidation.peakAbsolute = 1.1;
  await withHarness('SavedHeadRenderPanel', renderOptions({ get: invalid }), async h => { await h.settle(); assert.match(h.text(), /invalid unclamped audio check/); assert.equal(h.findAll(node => node.type === 'video' || node.type === 'a').length, 0); });
});

await test('Out-of-range audio and noncanonical title colour remain local drafts and never reach transport', async () => {
  for (const [layerId, label, value] of [['layer_audio', 'Audio gain in decibels', '13'], ['layer_title', 'Title colour', '#abcdef']]) {
    const options = editorialOptions(); await withHarness('FoundationCopyPanel', options, async h => { await loadEditorial(h); h.input('Working-copy layer', layerId); h.input(label, value); await h.click('Save working-copy properties'); assert.equal(options.posts.length, 0); assert.equal(h.session.has(draftKey), true); assert.match(h.text(), /outside (?:its supported range|their supported bounds)|invalid/i); });
  }
});

await test('Accessibility and responsive source contracts retain associated explanations, explicit player toggle and stacked mobile actions', async () => {
  const renderSource = componentSources.get('SavedHeadRenderPanel'), panelSource = componentSources.get('FoundationCopyPanel'), viewerSource = componentSources.get('FoundationCopyViewer'), timelineSource = componentSources.get('FoundationCopyTimeline'), workspaceSource = componentSources.get('EditorialWorkspacePanel');
  assert.match(renderSource, /aria-describedby=\{startHelpId\}/); assert.match(renderSource, /aria-describedby=\{refreshHelpId\}/); assert.match(renderSource, /aria-pressed=\{isOpen\}/); assert.match(renderSource, /controls playsInline preload="metadata"/); assert.match(renderSource, /credentials: "same-origin"/); assert.match(renderSource, /automaticPollLimit/); assert.match(renderSource, /pendingRef\.current/);
  assert.match(panelSource, /Composition duration numerator/); assert.match(panelSource, /Title text/); assert.match(panelSource, /Audio gain in decibels/); assert.match(panelSource, /<SavedHeadRenderPanel/); assert.equal((panelSource.match(/<SavedHeadRenderPanel/g) ?? []).length, 1); assert.match(viewerSource, /TextFrame/); assert.match(timelineSource, /Layer timeline/); assert.match(workspaceSource, /codexforge\.studio\.editorial\.duration-draft\.v1/); assert.match(workspaceSource, /codexforge\.studio\.render\.pending\.v1/);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.presetGrid \{ grid-template-columns: minmax\(0, 1fr\); \}/); assert.match(css, /@media \(max-width: 420px\)[\s\S]*\.renderPanel \.actions > button[\s\S]*width: 100%/); assert.match(css, /\.renderPanel \.actions > button, \.renderPanel \.actions > a \{ min-height: 44px; \}/); assert.match(css, /\.hash[\s\S]*overflow-wrap: anywhere/);
});

assert.deepEqual(networkAttempts, []);
const failed = results.filter(result => result.status !== 'PASS');
retain('results.json', { runId, startedAt, finishedAt: new Date().toISOString(), totals: { total: results.length, passed: results.length - failed.length, failed: failed.length }, networkAttempts, files: [...componentNames.map(name => `${componentBase}${name}.tsx`), `${componentBase}CompositionPanel.module.css`].map(relative => ({ path: relative, sha256: sha(fs.readFileSync(path.join(frontend, relative))) })), results });
process.stdout.write(`EVIDENCE ${evidence}\n`);
if (failed.length) process.exitCode = 1;
