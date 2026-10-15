// Actual SavedHeadRenderPanel TSX, with deterministic hooks/fetch/session/media refs.
// This proves view-only controller behavior, not Browser playback or responsive layout.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { setImmediate as nextTask } from 'node:timers/promises';
import ts from 'typescript';
import { blockStudioTestNetwork } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const networkAttempts = blockStudioTestNetwork();
const relative = 'src/lib/codexforge/animation-studio/components/SavedHeadRenderPanel.tsx';
const filename = path.join(frontend, relative), source = fs.readFileSync(filename, 'utf8');
const sha = value => createHash('sha256').update(value).digest('hex');
const projectId = 'project_trailer07', compositionId = 'composition_trailer07';
const headA = 'a'.repeat(64), headB = 'b'.repeat(64), hash1 = 'c'.repeat(64), hash2 = 'd'.repeat(64);
const stamp = '2026-10-01T18:00:00.000Z', endpoint = '/api/codexforge/animation-studio/editorial-v2/render';
const outputUrl = (version, hash, disposition) => `${endpoint}/output?${new URLSearchParams({ projectId, assetId: 'asset_trailer07', version: String(version), contentHash: hash, disposition })}`;
const savedHead = { headDigest: headA, workingCopyRevision: 7, compositionRevision: 7 };
function result() {
  const outputs = [1, 2].map(version => ({ assetId: 'asset_trailer07', version, jobId: `job_trailer07_${version}`, headDigest: version === 1 ? headA : headB,
    contentHash: version === 1 ? hash1 : hash2, byteLength: 123456 + version, createdAt: stamp,
    video: { codec: 'h264', width: 1280, height: 720, frameRate: '25/1', decodedFrames: 300 }, audio: { codec: 'aac', sampleRate: 48000, channels: 2 },
    playbackUrl: outputUrl(version, version === 1 ? hash1 : hash2, 'inline'), downloadUrl: outputUrl(version, version === 1 ? hash1 : hash2, 'attachment') }));
  const jobs = outputs.map(output => ({ jobId: output.jobId, state: 'COMPLETED', specDigest: 'e'.repeat(64), sourceHeadDigest: output.headDigest,
    sourceRevision: 7, compositionRevision: 7, targetVersion: output.version, progress: { phase: 'DONE', completed: 300, total: 300, percent: 100 },
    createdAt: stamp, startedAt: stamp, finishedAt: stamp, error: null, output }));
  const duration = { numerator: 12, denominator: 1 }, frameRate = { numerator: 25, denominator: 1 };
  const minimum = { numerator: 1, denominator: 25 }, maximum = { numerator: 300, denominator: 1 };
  const timing = { duration, frameRate, expectedFrames: 300, sampleRate: 48000, expectedAudioSamples: 576000, qualifiedMinimumDuration: minimum, qualifiedMaximumDuration: maximum };
  return { projectId, compositionId, current: { headDigest: headA, revision: 7, compositionRevision: 7 },
    preset: { presetId: 'TRAILER_720P25_H264_AAC_V1', width: 1280, height: 720, frameRate, duration, expectedFrames: 300,
      videoCodec: 'libx264', audioCodec: 'aac', sampleRate: 48000, expectedAudioSamples: 576000, channels: 2, qualifiedDurationRange: { minimum, maximum } },
    readiness: { state: 'READY', blockers: [], timing }, ledgerRevision: 14, jobs, outputs, providerRequests: 0, generationRequests: 0 };
}
function descendants(node) { return Array.isArray(node) ? node.flatMap(descendants) : !node || typeof node !== 'object' || !node.props ? [] : [node, ...descendants(node.props.children)]; }
function words(node) { return node == null || typeof node === 'boolean' ? '' : Array.isArray(node) ? node.map(words).join('') : typeof node !== 'object' ? String(node) : words(node.props?.children); }
function changed(deps, previous) { return !previous || deps.length !== previous.deps.length || deps.some((x, i) => !Object.is(x, previous.deps[i])); }
function harness(overrides = {}, responses = [{ ok: true, result: result() }]) {
  const slots = [], effects = [], calls = [], session = new Map(), sessionWrites = [], timers = new Map(), media = [], layouts = [];
  let cursor = 0, tree, timerId = 0, currentVideo = null;
  const props = { projectId, compositionId, savedHead, startBlocked: false, startBlockedReason: '', onBlockingRecoveryChange() {}, ...overrides };
  const hooks = {
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = typeof initial === 'function' ? initial() : initial; return [slots[i], next => { slots[i] = typeof next === 'function' ? next(slots[i]) : next; }]; },
    useRef(initial) { const i = cursor++; if (!(i in slots)) slots[i] = { current: initial }; return slots[i]; },
    useCallback(callback, deps) { const i = cursor++; if (changed(deps, slots[i])) slots[i] = { deps, callback }; return slots[i].callback; },
    useEffect(callback, deps) { const i = cursor++, previous = slots[i]; if (changed(deps, previous)) effects.push(() => { previous?.cleanup?.(); slots[i] = { deps, setup: callback, cleanup: callback() }; }); },
  };
  const compiled = ts.transpileModule(source, { fileName: filename, reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  assert.equal((compiled.diagnostics ?? []).filter(x => x.category === ts.DiagnosticCategory.Error).length, 0);
  const required = Module.createRequire(filename), item = new Module(filename); item.filename = filename;
  item.require = name => name === 'react' ? hooks : name === 'react/jsx-runtime' ? required(name) : name.endsWith('.module.css') ? new Proxy({}, { get: (_, key) => String(key) }) : (() => { throw Error('Unexpected dependency: ' + name); })();
  item._compile(compiled.outputText, filename);
  const original = { window: Object.getOwnPropertyDescriptor(globalThis, 'window'), session: Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage'), fetch: globalThis.fetch };
  globalThis.window = { setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; }, clearTimeout(id) { timers.delete(id); } };
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: { getItem: key => session.get(key) ?? null,
    setItem(key, value) { sessionWrites.push({ operation: 'set', key, value }); session.set(key, value); }, removeItem(key) { sessionWrites.push({ operation: 'remove', key }); session.delete(key); } } });
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), method: init.method ?? 'GET', init }); assert.equal(init.method ?? 'GET', 'GET', 'Viewer controls cannot dispatch a mutation');
    assert.equal(new URL(String(url), 'http://localhost').pathname, endpoint); assert.equal(init.redirect, 'error');
    assert.equal(init.credentials, 'same-origin'); assert.equal(init.cache, 'no-store');
    const value = responses.length > 1 ? responses.shift() : responses[0];
    if (value === 'waitForAbort') return new Promise((resolve, reject) => {
      const abort = () => reject(new DOMException('Synthetic status wait cancelled.', 'AbortError'));
      if (init.signal.aborted) abort(); else init.signal.addEventListener('abort', abort, { once: true });
    });
    return Response.json(value, { status: value.ok ? 200 : 503 });
  };
  function render() {
    cursor = 0; tree = item.exports.SavedHeadRenderPanel(props);
    const videos = descendants(tree).filter(x => x.type === 'video'); assert.ok(videos.length <= 1, 'Only one completed-output video is mounted');
    const node = videos[0];
    if (!node || currentVideo?.key !== node.key) {
      if (currentVideo) currentVideo.ref.current = null;
      currentVideo = node ? { key: node.key, ref: node.props.ref, element: { attributes: new Map([['src', node.props.src]]), events: [], pause() { this.events.push('pause'); }, getAttribute(name) { return this.attributes.get(name) ?? null; }, setAttribute(name, value) { this.attributes.set(name, value); this.events.push('set:' + name); }, removeAttribute(name) { this.attributes.delete(name); this.events.push('remove:' + name); }, load() { this.events.push('load'); } } } : null;
      if (currentVideo) media.push(currentVideo.element);
    }
    if (currentVideo) currentVideo.ref.current = currentVideo.element;
    while (effects.length) effects.shift()();
    return tree;
  }
  async function settle() { for (let i = 0; i < 8; i++) { for (const [id, timer] of [...timers]) if (timer.delay === 0) { timers.delete(id); timer.callback(); } await nextTask(); render(); } }
  const nodes = () => descendants(tree), button = label => { const found = nodes().filter(x => x.type === 'button' && words(x) === label); assert.equal(found.length, 1, label); return found[0]; };
  async function click(label) { const control = button(label); assert.equal(!!control.props.disabled, false); control.props.onClick(); await settle(); }
  function dispose() { for (const slot of slots) slot?.cleanup?.(); globalThis.fetch = original.fetch;
    if (original.window) Object.defineProperty(globalThis, 'window', original.window); else delete globalThis.window;
    if (original.session) Object.defineProperty(globalThis, 'sessionStorage', original.session); else delete globalThis.sessionStorage; }
  function replayEffectWithDependency(value) { const matching = slots.filter(slot => slot?.setup && slot.deps.includes(value)); assert.equal(matching.length, 1); const effect = matching[0]; effect.cleanup?.(); effect.cleanup = effect.setup(); }
  return { props, calls, session, sessionWrites, timers, media, layouts, render, settle, nodes, button, click, replayEffectWithDependency, text: () => words(tree), dispose };
}

const evidence = path.join(frontend, '.codexforge/acceptance', `studio-trailer07-render-view-tests-${randomUUID()}`), tests = [];
fs.mkdirSync(evidence);
async function test(name, body) { try { await body(); tests.push({ name, status: 'PASS' }); } catch (error) { tests.push({ name, status: 'FAIL', error: error.stack || String(error) }); } }
async function run(options, body, responses) { const h = harness(options, responses); try { h.render(); await h.settle(); await body(h); } finally { h.dispose(); } }

await test('Inactive output mode has one status controller and no media or mutation', () => run({ reviewActive: false }, async h => {
  assert.equal(h.calls.length, 1); assert.equal(h.nodes().filter(x => x.type === 'video').length, 0); assert.deepEqual(h.sessionWrites, []);
  h.props.reviewActive = true; h.render(); h.props.reviewActive = false; h.render(); await h.settle();
  assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []); assert.equal(h.timers.size, 0);
}));
await test('Explicit review request selects one existing version without fetching or rendering again', () => {
  let requests = 0;
  return run({ reviewActive: false, onReviewRequested() { requests++; } }, async h => {
    await h.click('Open output v2'); assert.equal(requests, 1); assert.equal(h.nodes().filter(x => x.type === 'video').length, 0);
    assert.match(h.text(), /Completed MP4 output v2/); assert.match(h.text(), /historical render, not the current composition/);
    h.props.reviewActive = true; h.render();
    const video = h.nodes().find(x => x.type === 'video'); assert.ok(video); assert.equal(video.props.src, outputUrl(2, hash2, 'inline'));
    assert.equal(video.props.autoPlay, undefined); assert.equal(video.props.controls, true); assert.equal(video.props.preload, 'metadata');
    assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
  });
});
await test('Output identity label distinguishes matching saved head and unsaved draft exclusion', () => run({}, async h => {
  await h.click('Open output v1'); assert.match(h.text(), /Matches the loaded saved head\./);
  h.props.hasUnsavedDraft = true; h.props.startBlocked = true; h.props.startBlockedReason = 'Save or discard the draft.'; h.render();
  assert.match(h.text(), /Unsaved changes are not included in this completed output/); assert.equal(h.calls.length, 1);
  assert.equal(h.nodes().filter(x => x.type === 'video').length, 1); assert.deepEqual(h.sessionWrites, []);
  assert.ok(h.nodes().some(x => x.type === 'p' && words(x) === 'Source head: ' + headA));
}));
await test('Output mode departure pauses and releases the old source while preserving selection', () => run({}, async h => {
  await h.click('Open output v1'); const old = h.media[0]; assert.ok(old);
  h.props.reviewActive = false; h.render(); assert.deepEqual(old.events, ['pause', 'remove:src', 'load']);
  assert.equal(h.nodes().filter(x => x.type === 'video').length, 0); assert.match(h.text(), /Completed MP4 output v1/);
  h.props.reviewActive = true; h.render(); assert.equal(h.nodes().filter(x => x.type === 'video').length, 1);
  assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
}));
await test('Changing selected output releases the previous player and preserves fixed attachment routes', () => run({}, async h => {
  await h.click('Open output v1'); const first = h.media[0]; await h.click('Open output v2');
  assert.deepEqual(first.events, ['pause', 'remove:src', 'load']); assert.equal(h.nodes().filter(x => x.type === 'video').length, 1);
  const link = h.nodes().find(x => x.type === 'a' && words(x) === 'Download output v2'); assert.equal(link.props.href, outputUrl(2, hash2, 'attachment'));
  assert.equal(h.calls.length, 1); await h.click('Close output v2'); assert.equal(h.nodes().filter(x => x.type === 'video').length, 0);
  assert.deepEqual(h.media[1].events, ['pause', 'remove:src', 'load']);
}));
await test('Output media effect replay restores only the selected validated source without autoplay', () => run({}, async h => {
  await h.click('Open output v1'); const element = h.media[0], url = outputUrl(1, hash1, 'inline');
  h.replayEffectWithDependency(url);
  assert.deepEqual(element.events, ['pause', 'remove:src', 'load', 'set:src', 'load']);
  assert.equal(element.getAttribute('src'), url); assert.equal(h.nodes().find(x => x.type === 'video').props.autoPlay, undefined);
  assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
}));
await test('View-only layout callback receives one controls surface, output review and separate feedback', () => {
  const received = [];
  return run({ renderLayout(surfaces) { received.push(surfaces); return { type: 'main', props: { children: [surfaces.feedback, { type: 'section', props: { children: surfaces.outputReview } }, { type: 'aside', props: { children: surfaces.exportControls } }] } }; } }, async h => {
    assert.deepEqual(Object.keys(received.at(-1)).sort(), ['exportControls', 'feedback', 'outputReview']);
    assert.equal(descendants(received.at(-1).exportControls).filter(x => x.props['aria-label'] === 'Local export status and recovery').length, 0);
    assert.equal(received.at(-1).feedback, null, 'Routine successful status does not consume a separate active-feedback surface.');
    assert.equal(h.nodes().filter(x => x.props['aria-label'] === 'Local export status and recovery').length, 0);
    await h.click('Open output v1'); assert.equal(h.nodes().filter(x => x.type === 'video').length, 1);
    assert.equal(h.nodes().filter(x => x.props['aria-label'] === 'Saved-head local export').length, 1);
    assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
  });
});
await test('Routine successful refresh notice appears once in preset details without adding a status controller or media', () => {
  let current;
  return run({ renderLayout(surfaces) { current = surfaces; return { type: 'main', props: { children: [surfaces.feedback, surfaces.outputReview, surfaces.exportControls] } }; } }, async h => {
    for (const active of [true, false, true]) {
      h.props.reviewActive = active; h.render(); await h.settle();
      const details = descendants(current.exportControls).find(node => node.type === 'details' && descendants(node).some(child => child.type === 'summary' && words(child) === 'Preset and saved-head details'));
      const notices = h.nodes().filter(node => node.props.role === 'status' && words(node).startsWith('Saved-head render readiness and job ownership refreshed.'));
      assert.equal(notices.length, 1); assert.ok(descendants(details).includes(notices[0])); assert.equal(current.feedback, null);
      assert.equal(h.nodes().filter(node => node.props['aria-label'] === 'Saved-head local export').length, 1);
      assert.equal(h.nodes().filter(node => node.type === 'video').length, 0);
    }
    assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
  });
});
await test('Stopping an explicit status wait leaves its active notice and error outside preset details in independent feedback', () => {
  let current;
  return run({ renderLayout(surfaces) { current = surfaces; return { type: 'main', props: { children: [surfaces.feedback, surfaces.outputReview, { type: 'aside', props: { hidden: true, children: surfaces.exportControls } }] } }; } }, async h => {
    h.button('Refresh render status').props.onClick(); await h.settle();
    await h.click('Stop waiting');
    for (const active of [true, false]) {
      h.props.reviewActive = active; h.render(); await h.settle();
      assert.match(words(current.feedback), /Stopped waiting in this browser/); assert.match(words(current.feedback), /Stopped waiting for render status/);
      assert.doesNotMatch(words(current.exportControls), /Stopped waiting in this browser|Stopped waiting for render status/);
      const statuses = descendants(current.feedback).filter(node => node.props.role === 'status');
      assert.equal(statuses.length, 2);
      assert.equal(statuses.filter(node => words(node).startsWith('Stopped waiting in this browser')).length, 1);
      assert.equal(statuses.filter(node => words(node).startsWith('Native Blender actions remain disabled while export job status is unresolved.')).length, 1);
      assert.equal(descendants(current.feedback).filter(node => node.props.role === 'alert').length, 1);
      assert.equal(h.nodes().filter(node => node.props['aria-label'] === 'Local export status and recovery').length, 1);
    }
    assert.equal(h.calls.length, 2); assert.deepEqual(h.sessionWrites, []); assert.equal(h.nodes().filter(node => node.type === 'video').length, 0);
  }, [{ ok: true, result: result() }, 'waitForAbort']);
});
await test('A failed refresh remains in independent feedback through both viewer modes without retry', () => {
  let current;
  return run({ renderLayout(surfaces) { current = surfaces; return { type: 'main', props: { children: [surfaces.feedback, surfaces.outputReview, { type: 'aside', props: { hidden: true, children: surfaces.exportControls } }] } }; } }, async h => {
    await h.click('Open output v1'); await h.click('Refresh render status');
    const safeMessage = 'Local render storage is unavailable or failed integrity checks.';
    for (const active of [true, false, true]) {
      h.props.reviewActive = active; h.render(); h.props.hasUnsavedDraft = true; h.render(); await h.settle();
      assert.ok(words(current.feedback).includes(safeMessage));
      assert.equal(words(current.exportControls).includes(safeMessage), false);
      assert.equal(h.nodes().filter(x => x.props.role === 'alert' && words(x) === safeMessage).length, 1);
      assert.match(h.text(), /Completed MP4 output v1/); assert.doesNotMatch(h.text(), /Synthetic status unavailable/);
    }
    assert.equal(h.calls.length, 2); assert.deepEqual(h.sessionWrites, []);
  }, [{ ok: true, result: result() }, { ok: false, error: { code: 'render_storage_unavailable', message: 'Synthetic status unavailable.' } }]);
});
await test('Retained exact-request recovery is outside export controls in both viewer modes without resubmission', async () => {
  let current;
  const h = harness({ renderLayout(surfaces) { current = surfaces; return { type: 'main', props: { children: [surfaces.feedback, surfaces.outputReview, { type: 'aside', props: { hidden: true, children: surfaces.exportControls } }] } }; } });
  const retained = JSON.stringify({ projectId, key: '11111111-2222-4333-8444-555555555555', body: JSON.stringify({ operation: 'START_RENDER', projectId, compositionId,
    expectedHeadDigest: headA, expectedRevision: 7, expectedCompositionRevision: 7, presetId: 'TRAILER_720P25_H264_AAC_V1', requestedAt: stamp }) });
  h.session.set(`codexforge.studio.render.pending.v1.${projectId}`, retained);
  try {
    h.render(); await h.settle();
    for (const active of [true, false, true]) {
      h.props.reviewActive = active; h.render(); await h.settle();
      assert.match(words(current.feedback), /Exact render request retained/);
      assert.equal(descendants(current.feedback).filter(x => x.type === 'button' && words(x) === 'Retry exact render request').length, 1);
      assert.doesNotMatch(words(current.exportControls), /Retry exact render request/);
      assert.equal(h.button('Render saved head to MP4').props.disabled, true);
    }
    assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
    assert.equal(h.session.get(`codexforge.studio.render.pending.v1.${projectId}`), retained);
  } finally { h.dispose(); }
});
await test('Unsafe recovery data remains in independent feedback with no panel-change request', async () => {
  let current;
  const h = harness({ renderLayout(surfaces) { current = surfaces; return { type: 'main', props: { children: [surfaces.feedback, surfaces.outputReview, { type: 'aside', props: { hidden: true, children: surfaces.exportControls } }] } }; } });
  h.session.set(`codexforge.studio.render.pending.v1.${projectId}`, '{');
  try {
    h.render(); await h.settle();
    for (const active of [false, true]) {
      h.props.reviewActive = active; h.render(); await h.settle();
      assert.match(words(current.feedback), /Saved render recovery data could not be read safely/);
      assert.doesNotMatch(words(current.exportControls), /Saved render recovery data could not be read safely/);
      assert.equal(h.button('Render saved head to MP4').props.disabled, true);
    }
    assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
  } finally { h.dispose(); }
});
await test('Feedback surface is null after recovery checks when no notice, error or request exists', () => {
  let current;
  return run({ compositionId: '', savedHead: null, renderLayout(surfaces) { current = surfaces; return { type: 'main', props: { children: [surfaces.feedback, surfaces.exportControls, surfaces.outputReview] } }; } }, async h => {
    assert.equal(current.feedback, null); assert.equal(h.calls.length, 0); assert.deepEqual(h.sessionWrites, []);
  });
});
await test('Unmount releases a mounted completed output without a request or session mutation', async () => {
  const h = harness(); let media;
  try { h.render(); await h.settle(); await h.click('Open output v1'); media = h.media[0]; } finally { h.dispose(); }
  assert.deepEqual(media.events, ['pause', 'remove:src', 'load']); assert.equal(h.calls.length, 1); assert.deepEqual(h.sessionWrites, []);
});
const sourceUnchanged = sha(fs.readFileSync(filename, 'utf8')) === sha(source);
const report = { status: tests.every(x => x.status === 'PASS') && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL',
  total: tests.length, passed: tests.filter(x => x.status === 'PASS').length, failed: tests.filter(x => x.status === 'FAIL').length,
  scope: 'Actual TSX with deterministic browser-boundary doubles; not Browser playback or geometry evidence', tests, sourceUnchanged, networkAttempts,
  sources: [relative, 'scripts/test-animation-studio-trailer07-render-view.mjs'].map(p => ({ path: p, sha256: sha(fs.readFileSync(path.join(frontend, p))) })) };
fs.writeFileSync(path.join(evidence, 'result.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify({ status: report.status, passed: report.passed, failed: report.failed, evidence }));
if (report.status !== 'PASS') process.exitCode = 1;
