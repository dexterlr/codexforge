// Actual TSX event-handler checks with real React JSX values and deterministic hook/fetch seams.
// This is NOT a DOM renderer, browser/playback acceptance, native execution or a network test.
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
const footageContract = loader.load('@/lib/codexforge/animation-studio/footage-contract');
const componentPath = 'src/lib/codexforge/animation-studio/components/CompositionPanel.tsx';
const filename = path.join(frontend, componentPath), source = fs.readFileSync(filename, 'utf8');
const jsxRuntime = Module.createRequire(filename)('react/jsx-runtime');
const sha = value => createHash('sha256').update(value).digest('hex');
const clone = value => JSON.parse(JSON.stringify(value));
const runId = randomUUID(), startedAt = new Date().toISOString();
const evidence = path.join(frontend, '.codexforge/acceptance', `studio-composition-ui-tests-${runId}`);
fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const sourceBindings = [...new Set([...loader.loaded, componentPath, componentPath.replace('.tsx', '.module.css'), 'scripts/test-animation-studio-composition-ui.mjs', 'scripts/animation-studio-test-loader.mjs'])].sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
retain('intent.json', { runId, startedAt, scope: 'Actual component source events and installed JSX runtime; synthetic hook/timer/session/fetch seams; fresh sibling evidence; no browser, DOM, decoding, server, native, provider or production claim.', sourceBindings });
const projectId = 'project_composition_ui', shotId = 'shot_composition_ui', compId = 'composition_ui';
const stamp = '2026-09-15T12:00:00.000Z', provenance = { kind: 'EDITORIAL_INSTRUCTION', providerRequests: 0 };
const media = { asset_alpha: Buffer.from([0, 0, 0, 24, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 0, 0, 105, 115, 111, 109, 97, 118, 99, 49]), asset_beta: Buffer.from('synthetic-beta-not-decoding-evidence') };
function fixture(withLayers = false) {
  const assets = [['asset_alpha', 'alpha.mp4', 'VIDEO'], ['asset_beta', 'beta.png', 'IMAGE']].map(([assetId, originalName, assetType]) => ({ assetId, version: 1, projectId, assetType, contentHash: sha(media[assetId]), approvalState: 'DRAFT', rights: { status: 'UNKNOWN', license: null, evidence: null }, provenance: { adapterMetadata: { settings: { originalName } } } }));
  const composition = { schemaVersion: 1, compositionId: compId, projectId, kind: 'SHOT', shotId, name: 'Layered test shot', durationUs: 4_000_000, width: 1280, height: 720, layers: [], revision: 1, approvalState: 'DRAFT', provenance };
  const content = { schemaVersion: 1, projectId, takes: [], selectedTakes: [], compositions: [composition] };
  if (withLayers) for (const asset of assets) {
    const take = { schemaVersion: 1, takeId: `take_${asset.assetId}`, projectId, shotId, source: { assetId: asset.assetId, version: 1 }, name: asset.provenance.adapterMetadata.settings.originalName, createdAt: stamp, review: { state: 'UNREVIEWED', note: '', reviewedAt: null } };
    content.takes.push(take); composition.layers.push(makeLayer(take, asset.assetType));
  }
  return { snapshot: { schemaVersion: 1, project: { projectId, revision: 1 }, shots: [{ shotId, projectId }], assets }, mediaAvailability: assets.map(asset => ({ assetId: asset.assetId, version: 1, status: 'ONLINE', reason: 'VERIFIED_BYTES' })), editorial: { revision: withLayers ? 1 : 0, content } };
}
function makeLayer(take, type) { return { schemaVersion: 1, layerId: `layer_${take.source.assetId}`, compositionId: compId, name: take.name, type, source: { kind: 'ASSET', asset: clone(take.source), takeId: take.takeId }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 4_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: contract.defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: 'DRAFT', provenance }; }
function descendants(node) { if (Array.isArray(node)) return node.flatMap(descendants); if (!node || typeof node !== 'object' || !('props' in node)) return []; return [node, ...descendants(node.props.children)]; }
function words(node) { if (node == null || typeof node === 'boolean') return ''; if (Array.isArray(node)) return node.map(words).join(''); if (typeof node !== 'object') return String(node); return words(node.props?.children); }
const buttonNamed = (node, label) => node.type === 'button' && words(node) === label;
function harness(initial = fixture(), replies = [], session = new Map(), mediaFailure = false, metadataFailure = false) {
  const slots = [], effects = [], timers = new Map(), calls = [], busy = [], createdUrls = [], revokedUrls = [];
  let cursor = 0, timerId = 0, tree, server = clone(initial);
  const props = { projectId, disabled: false, onBusyChange: value => busy.push(value) };
  const changed = (deps, prior) => !prior || deps.length !== prior.dependencies.length || deps.some((value, index) => !Object.is(value, prior.dependencies[index]));
  const hooks = {
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useCallback(callback, dependencies) { const index = cursor++; if (changed(dependencies, slots[index])) slots[index] = { dependencies, callback }; return slots[index].callback; },
    useEffect(callback, dependencies) { const index = cursor++, previous = slots[index]; if (changed(dependencies, previous)) effects.push(() => { previous?.cleanup?.(); slots[index] = { dependencies, cleanup: callback() }; }); },
  };
  const compiled = ts.transpileModule(source, { fileName: filename, reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  assert.equal((compiled.diagnostics ?? []).filter(item => item.category === ts.DiagnosticCategory.Error).length, 0);
  const item = new Module(filename); item.filename = filename;
  item.require = name => { if (name === 'react') return hooks; if (name === 'react/jsx-runtime') return jsxRuntime; if (name === '../composition-contract') return contract; if (name === '../footage-contract') return footageContract; if (name === './CompositionPanel.module.css') return new Proxy({}, { get: (_, key) => String(key) }); throw Error(`Unexpected component dependency: ${name}`); };
  item._compile(compiled.outputText, filename);
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window'), oldSession = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage'), blockedFetch = globalThis.fetch;
  const createUrl = URL.createObjectURL, revokeUrl = URL.revokeObjectURL;
  URL.createObjectURL = blob => { const url = createUrl(blob); createdUrls.push(url); return url; }; URL.revokeObjectURL = url => { revokedUrls.push(url); revokeUrl(url); };
  globalThis.window = { setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; }, clearTimeout(id) { timers.delete(id); }, addEventListener() {}, removeEventListener() {} };
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: { getItem: key => session.get(key) ?? null, setItem: (key, value) => session.set(key, value), removeItem: key => session.delete(key) } });
  globalThis.fetch = async (url, options) => {
    const parsed = new URL(url, 'http://synthetic.invalid'), method = options.method ?? 'GET';
    assert.equal(parsed.origin, 'http://synthetic.invalid'); assert.equal(options.credentials, 'same-origin');
    assert.equal(options.headers['X-CodexForge-Animation-Studio'], 'local-operator-v1');
    calls.push({ url, method, body: options.body, headers: { ...options.headers } });
    if (parsed.pathname.endsWith('/footage') || parsed.pathname.endsWith('/editorial/media')) {
      assert.equal(method, 'GET'); assert.equal(parsed.searchParams.get('projectId'), projectId);
      if (mediaFailure) return Response.json({ ok: false }, { status: 503 });
      const assetId = parsed.searchParams.get('assetId'); assert.ok(media[assetId]);
      if (parsed.pathname.endsWith('/footage')) {
        assert.equal(assetId, 'asset_alpha'); assert.equal(options.headers.Range, 'bytes=0-11');
        return new Response(media[assetId].subarray(0, 12), { status: 206, headers: { 'Content-Type': 'video/mp4', 'Content-Length': '12', 'Content-Range': `bytes 0-11/${media[assetId].length}`, 'X-CodexForge-Content-SHA256': sha(media[assetId]) } });
      }
      return new Response(media[assetId], { headers: { 'Content-Type': assetId === 'asset_alpha' ? 'video/mp4' : 'image/png' } });
    }
    assert.equal(parsed.pathname, '/api/codexforge/animation-studio/editorial');
    if (method === 'GET') return metadataFailure ? Response.json({ ok: false, error: { code: 'editorial_storage_unavailable', message: 'Synthetic missing editorial head.' } }, { status: 503 }) : Response.json({ ok: true, result: clone(server) });
    assert.equal(method, 'POST'); assert.ok(replies.length, 'Unexpected or automatic POST forbidden.');
    const reply = replies.shift();
    if (reply !== 'success') return Response.json({ ok: false, error: reply.error }, { status: reply.status });
    const body = JSON.parse(options.body); contract.validateEditorialContent(body.content, { projectId, shots: server.snapshot.shots, assets: server.snapshot.assets });
    server.editorial = { revision: server.editorial.revision + 1, content: clone(body.content) };
    return Response.json({ ok: true, result: clone(server) });
  };
  function render() { cursor = 0; tree = item.exports.CompositionPanel(props); while (effects.length) effects.shift()(); return tree; }
  function find(predicate, root = tree) { const matches = descendants(root).filter(predicate); assert.equal(matches.length, 1, `Expected unique selector; found ${matches.length}.`); return matches[0]; }
  function button(label, root = tree) { return find(node => buttonNamed(node, label), root); }
  function assetCard(name) { return find(node => node.type === 'article' && words(node).startsWith(name)); }
  function takeCard(name) { return find(node => node.type === 'li' && words(node).startsWith(name) && descendants(node).some(item => buttonNamed(item, 'Insert take as new layer'))); }
  async function settle() { for (let index = 0; index < 8; index++) { for (const [id, timer] of [...timers]) if (timer.delay === 0) { timers.delete(id); timer.callback(); } await nextTask(); render(); } }
  async function click(label, root) { const target = button(label, root); assert.equal(Boolean(target.props.disabled), false, `Disabled button: ${label}`); target.props.onClick(); await settle(); }
  function selectLayer(name) { find(node => node.type === 'button' && node.props['aria-pressed'] !== undefined && words(node).startsWith(name)).props.onClick(); render(); }
  function input(label, value) { const target = find(node => node.type === 'input' && node.props['aria-label'] === label); assert.equal(Boolean(target.props.disabled), false, `Disabled field: ${label}`); target.props.onChange({ target: { value: String(value), valueAsNumber: Number(value) } }); render(); }
  function checkbox(label, checked) { const parent = find(node => node.type === 'label' && words(node) === label); const target = find(node => node.type === 'input' && node.props.type === 'checkbox', parent); assert.equal(Boolean(target.props.disabled), false); target.props.onChange({ target: { checked } }); render(); }
  function dispose() { for (const slot of slots) slot?.cleanup?.(); globalThis.fetch = blockedFetch; URL.createObjectURL = createUrl; URL.revokeObjectURL = revokeUrl; if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow); else delete globalThis.window; if (oldSession) Object.defineProperty(globalThis, 'sessionStorage', oldSession); else delete globalThis.sessionStorage; }
  render(); return { render, settle, click, find, button, input, checkbox, assetCard, takeCard, selectLayer, dispose, calls, busy, session, createdUrls, revokedUrls, text: () => words(tree), posts: () => calls.filter(call => call.method === 'POST'), mediaCalls: () => calls.filter(call => call.url.includes('/editorial/media?') || call.url.includes('/footage?')), body: () => JSON.parse(calls.filter(call => call.method === 'POST').at(-1).body) };
}
const results = [];
async function test(name, action) { try { await action(); results.push({ name, status: 'PASS' }); } catch (error) { results.push({ name, status: 'FAIL', error: { message: error.message, stack: error.stack } }); } }
function emptyFixture() { const initial = fixture(); initial.snapshot.assets = []; initial.mediaAvailability = []; return initial; }
await test('An empty initial workspace requires one explicit save; a confirmed clean workspace cannot no-op save', async () => {
  const h = harness(emptyFixture(), ['success']);
  try {
    await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.mediaCalls().length, 0);
    assert.match(h.text(), /not yet saved/); assert.equal(h.button('Save initial layered workspace').props.disabled, false);
    await h.click('Save initial layered workspace');
    assert.equal(h.posts().length, 1); assert.equal(h.body().expectedRevision, 0); assert.equal(h.body().expectedProjectRevision, 1);
    assert.deepEqual(h.body().content.takes, []); assert.deepEqual(h.body().content.selectedTakes, []); assert.deepEqual(h.body().content.compositions[0].layers, []);
    // The immediate mock receipt intentionally batches transient pending/working:
    // the confirmed revision must release the parent's explicit busy notification.
    assert.match(h.text(), /Layered instructions saved/); assert.equal(h.button('Save layered edits').props.disabled, true); assert.equal(h.busy.at(-1), false);
    h.button('Save layered edits').props.onClick(); await h.settle(); assert.equal(h.posts().length, 1);
  } finally { h.dispose(); }
});
await test('Empty initial save retains an unresolved request and retries only the exact request explicitly', async () => {
  const h = harness(emptyFixture(), [{ status: 503, error: { code: 'editorial_storage_unavailable', message: 'Synthetic first-save failure.' } }, 'success']);
  try {
    await h.settle(); await h.click('Save initial layered workspace');
    const first = h.posts()[0]; assert.equal(h.session.size, 1); assert.equal(h.busy.at(-1), true); assert.equal(h.button('Save initial layered workspace').props.disabled, true);
    h.button('Save initial layered workspace').props.onClick(); await h.settle(); assert.equal(h.posts().length, 1);
    await h.click('Retry exact layered save'); assert.equal(h.posts().length, 2);
    assert.equal(h.posts()[1].body, first.body); assert.equal(h.posts()[1].headers['Idempotency-Key'], first.headers['Idempotency-Key']);
    assert.equal(h.session.size, 0); assert.equal(h.button('Save layered edits').props.disabled, true); assert.equal(h.busy.at(-1), false);
  } finally { h.dispose(); }
});
await test('Initial save remains unavailable before a valid load or when session recovery is unsafe', async () => {
  const unavailable = harness(emptyFixture(), [], new Map(), false, true);
  try { await unavailable.settle(); assert.equal(unavailable.button('Save layered edits').props.disabled, true); unavailable.button('Save layered edits').props.onClick(); await unavailable.settle(); assert.equal(unavailable.posts().length, 0); } finally { unavailable.dispose(); }
  const session = new Map([[`codexforge.studio.editorial.pending.v1.${projectId}`, '{broken']]), unsafe = harness(emptyFixture(), [], session);
  try { await unsafe.settle(); assert.match(unsafe.text(), /Session recovery data could not be read safely/); assert.equal(unsafe.button('Save initial layered workspace').props.disabled, true); unsafe.button('Save initial layered workspace').props.onClick(); await unsafe.settle(); assert.equal(unsafe.posts().length, 0); assert.equal(session.size, 1); } finally { unsafe.dispose(); }
});
await test('Two independent assets become two takes and two coexisting layers; preference changes only selectedTakes', async () => {
  const h = harness(fixture(), ['success']);
  try {
    await h.settle(); assert.equal(h.calls.length, 1); assert.equal(h.mediaCalls().length, 0);
    for (const name of ['alpha.mp4', 'beta.png']) { await h.click('Add asset as take', h.assetCard(name)); await h.click('Insert take as new layer', h.takeCard(name)); }
    await h.click('Prefer this take', h.takeCard('beta.png')); await h.click('Save layered edits');
    const body = h.body(); assert.equal(body.content.takes.length, 2); assert.equal(body.content.compositions[0].layers.length, 2); assert.equal(body.content.selectedTakes.length, 1);
    assert.equal(body.content.takes.find(take => take.takeId === body.content.selectedTakes[0].takeId).name, 'beta.png');
    assert.deepEqual(body.content.compositions[0].layers.map(layer => layer.source.asset.assetId), ['asset_alpha', 'asset_beta']);
    assert.ok(body.content.takes.every(take => take.review.state === 'UNREVIEWED')); assert.equal(h.busy.at(-1), false);
    assert.ok(Buffer.byteLength(h.posts()[0].body) <= 32768); assert.match(h.text(), /no QC pass, asset approval or generation/);
  } finally { h.dispose(); }
});
await test('Actual property/order/enable/solo/lock handlers preserve exact non-destructive instructions in the save body', async () => {
  const h = harness(fixture(true), ['success']);
  try {
    await h.settle(); h.selectLayer('alpha.mp4');
    for (const [label, value] of [['Duration (microseconds)', 1_000_000], ['Start (microseconds)', 500_000], ['Source offset (microseconds)', 200_000], ['Position X', 80], ['Position Y', 30], ['Scale X', 0.5], ['Scale Y', 0.7], ['Rotation (degrees)', 12], ['Anchor X (0–1)', 0.25], ['Anchor Y (0–1)', 0.75], ['Opacity (0–1)', 0.4]]) h.input(label, value);
    await h.click('Move layer up'); h.checkbox('Enabled', false); h.checkbox('Solo', true); h.checkbox('Lock this layer', true); await h.click('Save layered edits');
    const layers = h.body().content.compositions[0].layers; assert.deepEqual(layers.map(layer => layer.name), ['beta.png', 'alpha.mp4']);
    const layer = layers[1]; assert.equal(layer.startUs, 500_000); assert.equal(layer.durationUs, 1_000_000); assert.equal(layer.sourceOffsetUs, 200_000); assert.equal(layer.opacity, 0.4);
    assert.deepEqual(layer.transform, { x: 80, y: 30, scaleX: 0.5, scaleY: 0.7, rotationDeg: 12, anchorX: 0.25, anchorY: 0.75 });
    assert.equal(layer.enabled, false); assert.equal(layer.solo, true); assert.equal(layer.locked, true); assert.deepEqual(layer.source.asset, { assetId: 'asset_alpha', version: 1 }); assert.equal(layer.approvalState, 'DRAFT');
  } finally { h.dispose(); }
});
const unavailable = { status: 503, error: { code: 'editorial_storage_unavailable', message: 'Synthetic storage unavailable.' } };
await test('503 retains exact body/key and parent lock until explicit successful retry; no auto send', async () => {
  const h = harness(fixture(true), [unavailable, 'success']);
  try {
    await h.settle(); h.selectLayer('alpha.mp4'); h.input('Position X', 19); await h.click('Save layered edits');
    const first = h.posts()[0]; assert.equal(h.session.size, 1); assert.equal(h.busy.at(-1), true); await h.settle(); assert.equal(h.posts().length, 1);
    await h.click('Retry exact layered save'); assert.equal(h.posts().length, 2); assert.equal(h.posts()[1].body, first.body); assert.equal(h.posts()[1].headers['Idempotency-Key'], first.headers['Idempotency-Key']); assert.equal(h.session.size, 0); assert.equal(h.busy.at(-1), false);
  } finally { h.dispose(); }
});
await test('Reload restores pending session request and draft without automatically posting', async () => {
  const session = new Map(), initial = fixture(true); let original;
  const first = harness(initial, [unavailable], session);
  try { await first.settle(); first.selectLayer('alpha.mp4'); first.input('Position X', 27); await first.click('Save layered edits'); original = first.posts()[0]; } finally { first.dispose(); }
  const reopened = harness(initial, ['success'], session);
  try {
    await reopened.settle(); assert.equal(reopened.posts().length, 0); assert.equal(reopened.calls.length, 1); assert.equal(reopened.busy.at(-1), true); assert.match(reopened.text(), /exact unresolved save is still retained/);
    await reopened.settle(); assert.equal(reopened.posts().length, 0); await reopened.click('Retry exact layered save');
    assert.equal(reopened.posts()[0].body, original.body); assert.equal(reopened.posts()[0].headers['Idempotency-Key'], original.headers['Idempotency-Key']); assert.equal(session.size, 0);
  } finally { reopened.dispose(); }
});
await test('Offline source remains visible and disabled; failed available source shows an explicit preview notice', async () => {
  const initial = fixture(true); initial.mediaAvailability[1] = { ...initial.mediaAvailability[1], status: 'OFFLINE', reason: 'UNAVAILABLE_OR_INTEGRITY_FAILED' };
  const h = harness(initial, [], new Map(), true);
  try { await h.settle(); assert.match(h.text(), /Source OFFLINE/); assert.equal(h.button('Insert take as new layer', h.takeCard('beta.png')).props.disabled, true); await h.click('Load preview'); assert.equal(h.mediaCalls().length, 1); assert.match(h.text(), /Some sources could not be loaded or verified/); assert.match(h.text(), /Offline — source unavailable/); assert.equal(h.posts().length, 0); } finally { h.dispose(); }
});
await test('Reload with unavailable metadata still permits only explicit exact retained first-save recovery', async () => {
  const session = new Map(), initial = fixture(); let original;
  const first = harness(initial, [unavailable], session);
  try { await first.settle(); await first.click('Add asset as take', first.assetCard('alpha.mp4')); await first.click('Save layered edits'); original = first.posts()[0]; } finally { first.dispose(); }
  const reopened = harness(initial, ['success'], session, false, true);
  try {
    await reopened.settle(); assert.equal(reopened.posts().length, 0); assert.equal(reopened.calls.length, 1); assert.match(reopened.text(), /Synthetic missing editorial head/);
    assert.equal(reopened.button('Retry exact layered save').props.disabled, false); await reopened.settle(); assert.equal(reopened.posts().length, 0);
    await reopened.click('Retry exact layered save'); assert.equal(reopened.posts().length, 1);
    assert.equal(reopened.posts()[0].body, original.body); assert.equal(reopened.posts()[0].headers['Idempotency-Key'], original.headers['Idempotency-Key']);
    assert.equal(session.size, 0); assert.match(reopened.text(), /Layered instructions saved/); assert.equal(reopened.busy.at(-1), false);
  } finally { reopened.dispose(); }
});
await test('Repeated video layers share one bounded range probe and direct same-origin source', async () => {
  const initial = fixture(true); const layers = initial.editorial.content.compositions[0].layers; layers[1] = { ...clone(layers[0]), layerId: 'layer_alpha_again', name: 'Alpha duplicate layer' };
  const h = harness(initial);
  try { await h.settle(); assert.equal(h.mediaCalls().length, 0); await h.click('Load preview'); assert.equal(h.mediaCalls().length, 1); assert.match(h.mediaCalls()[0].url, /\/footage\?/u); assert.equal(h.mediaCalls()[0].headers.Range, 'bytes=0-11'); assert.equal(h.createdUrls.length, 0); await h.click('Close preview'); assert.equal(h.revokedUrls.length, 0); assert.equal(h.posts().length, 0); } finally { h.dispose(); }
});
await test('Definitive rejection after metadata failure cannot discard the only retained exact edit', async () => {
  for (const rejection of [{ status: 400, error: { code: 'invalid_composition', message: 'Synthetic rejected composition.' } }, { status: 409, error: { code: 'editorial_revision_conflict', message: 'Synthetic revision conflict.' } }]) {
    const session = new Map(), initial = fixture(); let original;
    const first = harness(initial, [unavailable], session);
    try { await first.settle(); await first.click('Add asset as take', first.assetCard('alpha.mp4')); await first.click('Save layered edits'); original = first.posts()[0]; } finally { first.dispose(); }
    const retained = [...session.entries()], reopened = harness(initial, [rejection], session, false, true);
    try {
      await reopened.settle(); assert.equal(reopened.posts().length, 0); await reopened.click('Retry exact layered save');
      assert.equal(reopened.posts()[0].body, original.body); assert.equal(reopened.posts()[0].headers['Idempotency-Key'], original.headers['Idempotency-Key']);
      assert.deepEqual([...session.entries()], retained); assert.match(reopened.text(), /exact recovery data is still retained/); assert.doesNotMatch(reopened.text(), /local edits remain available for correction/);
      await reopened.settle(); assert.equal(reopened.posts().length, 1); assert.equal(reopened.busy.at(-1), true);
    } finally { reopened.dispose(); }
  }
});
await test('Malformed retained session envelopes plus unavailable metadata stay locked with zero POSTs', async () => {
  for (const raw of ['{', '{}', JSON.stringify({ projectId, key: 'bad', body: '{}' }), JSON.stringify({ projectId: 'project_other', key: randomUUID(), body: '{}' })]) {
    const session = new Map([[`codexforge.studio.editorial.pending.v1.${projectId}`, raw]]), h = harness(fixture(), [], session, false, true);
    try { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); assert.match(h.text(), /Session recovery data could not be read safely/); assert.equal(session.values().next().value, raw); await h.settle(); assert.equal(h.posts().length, 0); } finally { h.dispose(); }
  }
});
await test('Nested composition is visibly unsupported and stops all preview fetching', async () => {
  const initial = fixture(true), shot = initial.editorial.content.compositions[0], nested = { ...clone(shot), compositionId: 'composition_precomp', kind: 'PRECOMP', shotId: null, name: 'Nested plate', layers: [] };
  shot.layers.push({ ...clone(shot.layers[0]), layerId: 'layer_nested', type: 'NESTED_COMPOSITION', source: { kind: 'COMPOSITION', compositionId: nested.compositionId } }); initial.editorial.content.compositions.push(nested);
  const h = harness(initial);
  try { await h.settle(); assert.match(h.text(), /entire preview is stopped/); assert.equal(h.button('Load preview').props.disabled, true); assert.equal(h.mediaCalls().length, 0); assert.equal(h.posts().length, 0); } finally { h.dispose(); }
});
await test('Adjacent saved lock blocks reorder; unlock must be saved before property edits', async () => {
  const initial = fixture(true); initial.editorial.content.compositions[0].layers[0].locked = true;
  const h = harness(initial, ['success', 'success']);
  try {
    await h.settle(); h.selectLayer('beta.png'); assert.equal(h.button('Move layer down').props.disabled, true);
    h.selectLayer('alpha.mp4'); h.checkbox('Lock this layer', false); assert.match(h.text(), /Save this layer’s unlock before changing its properties or order/);
    assert.equal(h.find(node => node.props['aria-label'] === 'Position X').props.disabled, true); await h.click('Save layered edits');
    assert.equal(h.body().content.compositions[0].layers[0].locked, false); h.input('Position X', 51); await h.click('Save layered edits'); assert.equal(h.body().content.compositions[0].layers[0].transform.x, 51);
  } finally { h.dispose(); }
});
await test('Definitive input rejection clears pending but retains editable local draft', async () => {
  const h = harness(fixture(true), [{ status: 400, error: { code: 'invalid_composition', message: 'Synthetic definitive rejection.' } }]);
  try { await h.settle(); h.selectLayer('alpha.mp4'); h.input('Position X', 31); await h.click('Save layered edits'); assert.equal(h.session.size, 0); assert.equal(h.busy.at(-1), true); assert.equal(h.button('Save layered edits').props.disabled, false); await h.settle(); assert.equal(h.posts().length, 1); assert.match(h.text(), /local edits remain available/); } finally { h.dispose(); }
});
const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const status = results.length === 15 && results.every(item => item.status === 'PASS') && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL';
retain('result.json', { runId, startedAt, finishedAt: new Date().toISOString(), status, total: results.length, passed: results.filter(item => item.status === 'PASS').length, results, sourceBindings, sourceUnchanged, networkAttempts, nativeExecution: false, providerRequests: 0, credentialReads: 0, productionDataMutations: 0, browserAcceptance: false, domRendering: false, decoderAcceptance: false });
console.log(JSON.stringify({ status, total: results.length, passed: results.filter(item => item.status === 'PASS').length, failures: results.filter(item => item.status !== 'PASS'), evidence, sourceUnchanged, networkAttempts }));
if (status !== 'PASS') process.exitCode = 1;
