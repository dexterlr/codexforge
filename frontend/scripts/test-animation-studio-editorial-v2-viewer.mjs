// Actual pure helpers and TSX handlers with deterministic hooks/media transport.
// Synthetic evidence only: no DOM geometry or browser decoding, native storage or provider use.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import { createHash, randomUUID, webcrypto } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { setImmediate as nextTask } from 'node:timers/promises';
import ts from 'typescript';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const network = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const helper = loader.load('@/lib/codexforge/animation-studio/editorial-v2-viewer');
const contract = loader.load('@/lib/codexforge/animation-studio/composition-contract');
const v2 = loader.load('@/lib/codexforge/animation-studio/editorial-v2-contract');
const time = loader.load('@/lib/codexforge/animation-studio/editorial-time');
const r = time.makeEditorialRational, clone = value => JSON.parse(JSON.stringify(value));
const sha = value => createHash('sha256').update(value).digest('hex');
const sourcePath = 'src/lib/codexforge/animation-studio/components/FoundationCopyViewer.tsx';
const componentStylePath = 'src/lib/codexforge/animation-studio/components/CompositionPanel.module.css';
const workspaceStylePath = 'src/lib/codexforge/animation-studio/components/EditingWorkspace.module.css';
const filename = path.join(frontend, sourcePath), source = fs.readFileSync(filename, 'utf8');
const componentCss = fs.readFileSync(path.join(frontend, componentStylePath), 'utf8');
const workspaceCss = fs.readFileSync(path.join(frontend, workspaceStylePath), 'utf8');
const stamp = '2026-09-15T19:00:00.000Z', projectId = 'project_viewer', compositionId = 'composition_viewer', headDigest = 'a'.repeat(64);
const provenance = { kind: 'EDITORIAL_INSTRUCTION', providerRequests: 0 };
function composition() {
  const layer = { schemaVersion: 1, layerId: 'layer_base', compositionId, name: 'Background', type: 'IMAGE', source: { kind: 'ASSET', asset: { assetId: 'asset_viewer', version: 1 }, takeId: null }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 1_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: contract.defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: 'DRAFT', provenance };
  return v2.migrateCompositionV1ToV2({ schemaVersion: 1, projectId, compositionId, kind: 'SHOT', shotId: 'shot_viewer', name: 'Selected saved composition', durationUs: 2_000_000, width: 1280, height: 720, revision: 1, approvalState: 'DRAFT', provenance, layers: [layer, { ...clone(layer), layerId: 'layer_top', name: 'Foreground', startUs: 500_000 }] });
}
function splitComposition() {
  const value = composition(), left = value.layers[0];
  Object.assign(left, { name: 'Bakery clip — left segment', type: 'VIDEO', start: r(1, 3), duration: r(2, 3), sourceOffset: r(1, 3) });
  const right = { ...clone(left), layerId: 'layer_split_right', name: 'Bakery clip — right segment', start: r(1, 1), duration: r(1, 1), sourceOffset: r(1, 1) };
  value.layers = [left, right];
  return v2.validateCompositionV2(value);
}
const binding = () => helper.v2PreviewCandidates(composition(), headDigest)[0];
const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 99]);
const videoProbe = new Uint8Array([0, 0, 0, 12, 102, 116, 121, 112, 105, 115, 111, 109]);
function response(changes = {}, body = bytes, expected = binding()) {
  const headers = { 'Content-Type': 'image/png', 'Content-Length': String(body.byteLength), 'X-CodexForge-Project-Id': expected.projectId, 'X-CodexForge-Composition-Id': expected.compositionId, 'X-CodexForge-Editorial-Head': expected.headDigest, 'X-CodexForge-Asset-Id': expected.assetId, 'X-CodexForge-Asset-Version': String(expected.version), 'X-CodexForge-Content-SHA256': sha(body), ...changes };
  return new Response(body, { headers });
}
function rangeResponse(changes = {}, body = videoProbe, expected = { ...binding(), type: 'VIDEO' }, status = 206) {
  const headers = { 'Content-Type': 'video/mp4', 'Content-Length': String(body.byteLength), 'Content-Range': 'bytes 0-11/600000', 'X-CodexForge-Project-Id': expected.projectId, 'X-CodexForge-Composition-Id': expected.compositionId, 'X-CodexForge-Editorial-Head': expected.headDigest, 'X-CodexForge-Asset-Id': expected.assetId, 'X-CodexForge-Asset-Version': String(expected.version), 'X-CodexForge-Content-SHA256': 'c'.repeat(64), ...changes };
  return new Response(body, { status, headers });
}
const results = [], runId = randomUUID(), evidence = path.join(frontend, '.codexforge/acceptance', `studio-editorial-v2-viewer-tests-${runId}`);
fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const sourceBindings = new Map([...loader.loaded, sourcePath, componentStylePath, workspaceStylePath, 'scripts/test-animation-studio-editorial-v2-viewer.mjs', 'scripts/animation-studio-test-loader.mjs'].map(name => [name, sha(fs.readFileSync(path.join(frontend, name)))]));
retain('intent.json', { runId, at: new Date().toISOString(), scope: 'Synthetic pure helper, actual TSX handler/registration structure and static CSS contracts; not DOM geometry, browser or native evidence. Actual stage size, text placement and responsive usability require separate rendered acceptance.', sourceBindings: Object.fromEntries(sourceBindings) });
async function test(name, run) { try { await run(); results.push({ name, status: 'PASS' }); } catch (error) { results.push({ name, status: 'FAIL', message: error.message, stack: error.stack }); } }
await test('Fractional frame labels are exact with no microsecond conversion', () => { assert.equal(helper.exactTimeLabel(r(1001, 24000)), '1001/24000 s'); assert.equal(helper.exactTimeLabel(r(0, 1)), '0 s'); assert.throws(() => helper.exactTimeLabel({ numerator: 2, denominator: 4 })); });
await test('Exact layer starts are inclusive and ends exclusive', () => { const c = composition(); c.layers = [c.layers[0]]; c.layers[0].start = r(1001, 24000); c.layers[0].duration = r(1001, 24000); assert.equal(helper.activeV2Layers(c, r(1001, 24000)).length, 1); assert.equal(helper.activeV2Layers(c, r(1001, 12000)).length, 0); assert.equal(helper.activeV2Layers(c, r(1, 24)).length, 0); });
await test('Solo and disabled semantics match the existing contract', () => { const c = composition(); c.layers[1].solo = true; assert.deepEqual(helper.activeV2Layers(c, r(3, 4)).map(l => l.layerId), ['layer_top']); c.layers[1].enabled = false; assert.deepEqual(helper.activeV2Layers(c, r(3, 4)).map(l => l.layerId), ['layer_base']); });
await test('Composition endpoint is empty; out-of-range and invalid rationals reject', () => { assert.equal(helper.activeV2Layers(composition(), r(2, 1)).length, 0); assert.throws(() => helper.activeV2Layers(composition(), r(3, 1))); assert.throws(() => helper.activeV2Layers(composition(), { numerator: -1, denominator: 1 })); });
await test('Source time retains exact fractional offset and interval boundaries', () => { const l = composition().layers[0]; l.start = r(1, 3); l.duration = r(1, 3); l.sourceOffset = r(1, 7); assert.deepEqual(helper.v2SourceTime(l, r(1, 2)), r(13, 42)); assert.throws(() => helper.v2SourceTime(l, r(2, 3))); assert.throws(() => helper.v2SourceTime(l, r(0, 1))); });
await test('Visual percentages never modify exact input objects', () => { const c = composition(), original = JSON.stringify(c); assert.equal(helper.timelinePercent(r(1, 3), r(2, 3)), 50); helper.activeV2Layers(c, r(3, 4)); helper.v2PreviewCandidates(c, headDigest); assert.equal(JSON.stringify(c), original); assert.throws(() => helper.timelinePercent(r(1, 1), r(0, 1))); assert.throws(() => helper.timelinePercent(r(2, 1), r(1, 1))); });
await test('Direct repeated sources deduplicate and disabled/solo sources are excluded', () => { const c = composition(); assert.equal(helper.v2PreviewCandidates(c, headDigest).length, 1); c.layers[1].source.asset.assetId = 'asset_second'; c.layers[1].solo = true; assert.deepEqual(helper.v2PreviewCandidates(c, headDigest).map(x => x.assetId), ['asset_second']); c.layers[1].enabled = false; assert.deepEqual(helper.v2PreviewCandidates(c, headDigest).map(x => x.assetId), ['asset_viewer']); });
await test('Adjacent same-source split segments use half-open activation and preserve exact source continuity', () => {
  const c = splitComposition(), [left, right] = c.layers;
  assert.deepEqual(helper.activeV2Layers(c, r(2, 3)).map(layer => layer.layerId), ['layer_base']);
  assert.deepEqual(helper.activeV2Layers(c, r(1, 1)).map(layer => layer.layerId), ['layer_split_right']);
  assert.deepEqual(time.editorialAddTime(left.start, left.duration), right.start);
  assert.deepEqual(time.editorialAddTime(left.sourceOffset, left.duration), right.sourceOffset);
  assert.deepEqual(helper.v2SourceTime(right, right.start), r(1, 1));
  assert.deepEqual(time.editorialAddTime(right.sourceOffset, right.duration), r(2, 1));
  const candidates = helper.v2PreviewCandidates(c, headDigest); assert.equal(candidates.length, 1); assert.deepEqual({ assetId: candidates[0].assetId, version: candidates[0].version }, { assetId: 'asset_viewer', version: 1 });
});
await test('Even disabled nested composition blocks all preview candidates', () => { const c = composition(); Object.assign(c.layers[1], { type: 'NESTED_COMPOSITION', source: { kind: 'COMPOSITION', compositionId: 'composition_nested' }, enabled: false }); assert.throws(() => helper.v2PreviewCandidates(c, headDigest)); assert.throws(() => helper.v2PreviewCandidates(composition(), 'bad')); });
await test('Exact response identity/hash/length produces one verified blob', async () => { const result = await helper.readV2PreviewResponse(response(), binding(), helper.V2_PREVIEW_TOTAL_BYTES, new AbortController().signal); assert.equal(result.bytes, bytes.byteLength); assert.equal(result.mime, 'image/png'); assert.equal(sha(Buffer.from(await result.blob.arrayBuffer())), sha(bytes)); });
await test('Exact 12-byte MP4 range probe verifies framing and returns the direct source size', async () => { const expected = { ...binding(), type: 'VIDEO' }, result = await helper.readV2PreviewRangeProbe(rangeResponse({}, videoProbe, expected), expected, new AbortController().signal); assert.deepEqual(result, { mime: 'video/mp4', bytes: 600000 }); });
await test('Video range probe rejects wrong status range length identity framing and cancellation', async () => { const expected = { ...binding(), type: 'VIDEO' }; for (const incoming of [rangeResponse({}, videoProbe, expected, 200), rangeResponse({ 'Content-Range': 'bytes 0-10/600000' }, videoProbe, expected), rangeResponse({ 'Content-Length': '11' }, videoProbe, expected), rangeResponse({ 'X-CodexForge-Asset-Id': 'asset_other' }, videoProbe, expected), rangeResponse({}, new Uint8Array(12), expected)]) await assert.rejects(() => helper.readV2PreviewRangeProbe(incoming, expected, new AbortController().signal)); const aborted = new AbortController(); aborted.abort(); await assert.rejects(() => helper.readV2PreviewRangeProbe(rangeResponse({}, videoProbe, expected), expected, aborted.signal)); });
for (const [name, value] of Object.entries({ 'X-CodexForge-Project-Id': 'project_other', 'X-CodexForge-Composition-Id': 'composition_other', 'X-CodexForge-Editorial-Head': 'b'.repeat(64), 'X-CodexForge-Asset-Id': 'asset_other', 'X-CodexForge-Asset-Version': '01', 'X-CodexForge-Content-SHA256': 'b'.repeat(64), 'Content-Type': 'text/html', 'Content-Length': '01' })) await test(`Wrong response ${name} rejects`, () => assert.rejects(() => helper.readV2PreviewResponse(response({ [name]: value }), binding(), helper.V2_PREVIEW_TOTAL_BYTES, new AbortController().signal)));
await test('Missing binding, response error and redirected response reject', async () => { const missing = response(); missing.headers.delete('X-CodexForge-Asset-Id'); await assert.rejects(() => helper.readV2PreviewResponse(missing, binding(), helper.V2_PREVIEW_TOTAL_BYTES, new AbortController().signal)); await assert.rejects(() => helper.readV2PreviewResponse(new Response('no', { status: 503 }), binding(), helper.V2_PREVIEW_TOTAL_BYTES, new AbortController().signal)); const redirected = response(); Object.defineProperty(redirected, 'redirected', { value: true }); await assert.rejects(() => helper.readV2PreviewResponse(redirected, binding(), helper.V2_PREVIEW_TOTAL_BYTES, new AbortController().signal)); });
await test('Over-declared, under-declared, empty and aggregate-excess sources reject', async () => { for (const length of ['0', String(helper.V2_PREVIEW_SOURCE_BYTES + 1), '8', '10']) await assert.rejects(() => helper.readV2PreviewResponse(response({ 'Content-Length': length }), binding(), helper.V2_PREVIEW_TOTAL_BYTES, new AbortController().signal)); await assert.rejects(() => helper.readV2PreviewResponse(response(), binding(), bytes.length - 1, new AbortController().signal)); });
await test('Bounded streaming cancels overflow before exposing bytes', async () => { let cancelled = false; const stream = new ReadableStream({ start(c) { c.enqueue(new Uint8Array(10)); }, cancel() { cancelled = true; } }); const incoming = new Response(stream, { headers: response().headers }); await assert.rejects(() => helper.readV2PreviewResponse(incoming, binding(), helper.V2_PREVIEW_TOTAL_BYTES, new AbortController().signal)); assert.equal(cancelled, true); });
await test('Pre-aborted and stalled-stream cancellation reject', async () => { const aborted = new AbortController(); aborted.abort(); await assert.rejects(() => helper.readV2PreviewResponse(response(), binding(), helper.V2_PREVIEW_TOTAL_BYTES, aborted.signal)); let cancelled = false; const controller = new AbortController(), stalled = new Response(new ReadableStream({ cancel() { cancelled = true; } }), { headers: response().headers }); const reading = helper.readV2PreviewResponse(stalled, binding(), helper.V2_PREVIEW_TOTAL_BYTES, controller.signal); controller.abort(); await assert.rejects(() => reading); assert.equal(cancelled, true); });

function descendants(node) { if (Array.isArray(node)) return node.flatMap(descendants); return !node || typeof node !== 'object' || !node.props ? [] : [node, ...descendants(node.props.children)]; }
function words(node) { if (node == null || typeof node === 'boolean') return ''; return Array.isArray(node) ? node.map(words).join('') : typeof node !== 'object' ? String(node) : words(node.props?.children); }
function TimelineSeam() { throw Error('Timeline seam is identified, never executed; actual TSX handlers have a dedicated harness.'); }
function assertExposedNotice(h, pattern) {
  const notices = h.nodes().filter(node => node.props?.role === 'status' && pattern.test(words(node)));
  assert.equal(notices.length, 1);
  for (const details of h.nodes().filter(node => node.type === 'details')) assert.equal(descendants(details).includes(notices[0]), false, 'An active notice must remain outside routine-preview disclosures.');
}
function harness(overrides = {}, responder = async () => response()) {
  let slots = [], effects = [], cursor = 0, tree, savedKey, component, currentProps, nextElement;
  const calls = [], created = [], revoked = [], selected = [], proposals = [], trimProposals = [], openedTrimControls = [], gestureStates = [], splitInputs = [], props = { projectId, composition: composition(), headDigest, workingCopyRevision: 1, selectedLayerId: '', selectionDisabled: false, previewDisabled: false, dragDisabled: false, timelineFrameRate: r(25, 1), moveDraftStart: null, trimDraft: null, onSelectLayer: id => selected.push(id), onProposeMove: (layerId, start, authority) => proposals.push({ layerId, start, authority }), onProposeTrim: (layerId, edge, trimPoint, authority) => trimProposals.push({ layerId, edge, trimPoint, authority }), onOpenTrimControls: (layerId, edge) => openedTrimControls.push({ layerId, edge }), onGestureActiveChange: active => gestureStates.push(active), onUsePlayheadForSplit: value => splitInputs.push(value), ...overrides };
  const hooks = { useState(initial) { const i = cursor++, owned = slots; if (!(i in owned)) owned[i] = typeof initial === 'function' ? initial() : initial; return [owned[i], value => { owned[i] = typeof value === 'function' ? value(owned[i]) : value; }]; }, useRef(initial) { const i = cursor++; if (!(i in slots)) slots[i] = { current: nextElement ?? initial }; return slots[i]; }, useEffect(callback, deps) { const i = cursor++, previous = slots[i]; if (!previous || deps.some((v, n) => !Object.is(v, previous.deps[n]))) effects.push(() => { previous?.cleanup?.(); slots[i] = { deps, setup: callback, cleanup: callback() }; }); } };
  const compiled = ts.transpileModule(source, { fileName: filename, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }, reportDiagnostics: true });
  assert.equal(compiled.diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  const item = new Module(filename); item.filename = filename; item.require = name => name === 'react' ? hooks : name === 'react/jsx-runtime' ? Module.createRequire(filename)(name) : name === './FoundationCopyTimeline' ? { FoundationCopyTimeline: TimelineSeam } : name.endsWith('.module.css') ? new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) }) : name.startsWith('../') ? loader.load('@/lib/codexforge/animation-studio/' + name.slice(3)) : (() => { throw Error('Unexpected module'); })(); item._compile(compiled.outputText, filename);
  const saved = { fetch: globalThis.fetch, window: Object.getOwnPropertyDescriptor(globalThis, 'window'), create: URL.createObjectURL, revoke: URL.revokeObjectURL };
  globalThis.window = { setTimeout: () => 1, clearTimeout() {} };
  globalThis.fetch = async (url, options) => { calls.push({ url: String(url), options }); return responder(url, options); };
  URL.createObjectURL = blob => { const url = `blob:synthetic/${created.length}`; created.push({ url, blob }); return url; }; URL.revokeObjectURL = url => revoked.push(url);
  function cleanup() { for (const s of slots) s?.cleanup?.(); }
  function render() { const wrapped = item.exports.FoundationCopyViewer(props); if (typeof wrapped.type !== 'function') { tree = wrapped; return tree; } if (savedKey !== wrapped.key) { cleanup(); slots = []; savedKey = wrapped.key; } component = wrapped.type; currentProps = wrapped.props; cursor = 0; tree = component(currentProps); while (effects.length) effects.shift()(); return tree; }
  async function settle() { for (let i = 0; i < 5; i++) { await nextTask(); render(); } }
  const button = name => descendants(tree).find(n => n.type === 'button' && words(n) === name);
  return { calls, created, revoked, selected, proposals, trimProposals, openedTrimControls, gestureStates, splitInputs, props, render, settle, button, text: () => words(tree), nodes: () => descendants(tree), timeline: () => descendants(tree).find(node => node.type === TimelineSeam), frames: () => descendants(tree).filter(node => typeof node.type === 'function' && node.type !== TimelineSeam), async click(name) { const b = button(name); assert.ok(b, name); assert.equal(!!b.props.disabled, false, name); b.props.onClick(); await settle(); }, frame(node, element) { const parentSlots = slots; let leafSlots = [], leafTree; return { render() { slots = leafSlots; cursor = 0; nextElement = element; leafTree = node.type(node.props); while (effects.length) effects.shift()(); leafSlots = slots; slots = parentSlots; nextElement = undefined; return leafTree; }, text: () => words(leafTree), error() { slots = leafSlots; descendants(leafTree).find(n => n.type === 'video').props.onError(); slots = parentSlots; }, replayEffects() { for (const s of leafSlots) if (s?.setup) { s.cleanup?.(); s.cleanup = s.setup(); } }, stop() { for (const s of leafSlots) s?.cleanup?.(); } }; }, stop() { cleanup(); globalThis.fetch = saved.fetch; if (saved.window) Object.defineProperty(globalThis, 'window', saved.window); else delete globalThis.window; URL.createObjectURL = saved.create; URL.revokeObjectURL = saved.revoke; } };
}
await test('Actual viewer mount forwards the exact saved timeline contract without fetching', () => { const h = harness(); try { h.render(); const timeline = h.timeline(), authority = { headDigest, revision: 1, compositionRevision: 1 }; assert.ok(timeline); assert.equal(h.calls.length, 0); assert.match(h.text(), /media preview renders saved instructions only; a local timeline move or inward-trim proposal may appear below but is never previewed or saved implicitly/iu); assert.deepEqual(timeline.props.composition, h.props.composition); assert.equal(timeline.props.headDigest, headDigest); assert.equal(timeline.props.workingCopyRevision, 1); assert.deepEqual(timeline.props.timelineFrameRate, r(25, 1)); assert.equal(timeline.props.moveDraftStart, null); assert.equal(timeline.props.trimDraft, null); timeline.props.onSelectLayer('layer_top'); timeline.props.onProposeMove('layer_top', r(13, 25), authority); timeline.props.onProposeTrim('layer_top', 'IN', r(14, 25), authority); timeline.props.onOpenTrimControls('layer_top', 'OUT'); timeline.props.onGestureActiveChange(true); timeline.props.onUsePlayheadForSplit(r(1, 2)); assert.deepEqual(h.selected, ['layer_top']); assert.deepEqual(h.proposals, [{ layerId: 'layer_top', start: r(13, 25), authority }]); assert.deepEqual(h.trimProposals, [{ layerId: 'layer_top', edge: 'IN', trimPoint: r(14, 25), authority }]); assert.deepEqual(h.openedTrimControls, [{ layerId: 'layer_top', edge: 'OUT' }]); assert.deepEqual(h.gestureStates, [true]); assert.deepEqual(h.splitInputs, [r(1, 2)]); assert.equal(h.calls.length, 0); } finally { h.stop(); } });
await test('Actual viewer exposes adjacent split segments as independently addressable disambiguated controls', () => {
  const h = harness({ composition: splitComposition() });
  try {
    h.render(); const timeline = h.timeline(), layers = [...timeline.props.composition.layers].reverse();
    assert.equal(layers.length, 2); assert.equal(layers[0].name, 'Bakery clip — right segment'); assert.equal(layers[1].name, 'Bakery clip — left segment');
    timeline.props.onSelectLayer(layers[0].layerId); timeline.props.onSelectLayer(layers[1].layerId); assert.deepEqual(h.selected, ['layer_split_right', 'layer_base']); assert.equal(h.calls.length, 0);
  } finally { h.stop(); }
});
await test('Actual image preview uses the bounded blob helper without a Range header and close revokes', async () => { const h = harness(); try { h.render(); await h.click('Load working-copy preview'); assert.equal(h.calls.length, 1); const request = h.calls[0], u = new URL(request.url, 'http://localhost'); assert.equal(u.pathname, '/api/codexforge/animation-studio/editorial-v2/media'); assert.deepEqual(Object.fromEntries(u.searchParams), { projectId, compositionId, headDigest, assetId: 'asset_viewer', version: '1' }); assert.equal(request.options.redirect, 'error'); assert.equal(request.options.method, undefined); assert.equal(request.options.headers.Range, undefined); assert.equal(h.created.length, 1); await h.click('Close working-copy preview'); assert.deepEqual(h.revoked, [h.created[0].url]); assert.equal(h.calls.length, 1); } finally { h.stop(); } });
await test('Actual video preview performs one 12-byte Range probe then gives the media element the direct URL', async () => { const c = composition(); c.layers.forEach(layer => { layer.type = 'VIDEO'; }); const h = harness({ composition: c }, async () => rangeResponse()); try { h.render(); await h.click('Load working-copy preview'); assert.equal(h.calls.length, 1); const request = h.calls[0]; assert.equal(request.options.headers.Range, 'bytes=0-11'); assert.equal(request.options.redirect, 'error'); assert.equal(h.created.length, 0); h.render(); const frames = h.frames(); assert.equal(frames.length, 1); assert.deepEqual(frames[0].props.source, { url: request.url, mime: 'video/mp4' }); await h.click('Close working-copy preview'); assert.deepEqual(h.revoked, []); assert.equal(h.calls.length, 1); } finally { h.stop(); } });
await test('Dirty or unavailable previewDisabled transition revokes loaded bytes and blocks loading', async () => { const h = harness(); try { h.render(); await h.click('Load working-copy preview'); h.props.previewDisabled = true; h.props.selectionDisabled = true; h.props.dragDisabled = true; h.props.trimDraft = { edge: 'IN', trimPoint: r(28, 75) }; h.render(); assert.deepEqual(h.revoked, [h.created[0].url]); assert.equal(h.button('Load working-copy preview').props.disabled, true); assert.equal(h.timeline().props.selectionDisabled, true); assert.equal(h.timeline().props.dragDisabled, true); assert.deepEqual(h.timeline().props.trimDraft, { edge: 'IN', trimPoint: r(28, 75) }); assert.equal(h.calls.length, 1, 'A local trim draft must not trigger a media request.'); } finally { h.stop(); } });
await test('Inactive media retains exact playhead and timeline identity without mounting or fetching media', async () => {
  const h = harness({ mediaActive: false });
  try {
    h.render(); const timeline = h.timeline(), before = JSON.stringify(h.props.composition);
    assert.equal(h.button('Load working-copy preview').props.disabled, true); assert.equal(h.frames().length, 0);
    timeline.props.onPlayheadChange(r(2, 3)); h.render();
    h.props.mediaActive = true; h.render();
    assert.equal(h.timeline().type, timeline.type); assert.equal(h.timeline().key, timeline.key);
    assert.deepEqual(h.timeline().props.playhead, r(2, 3)); assert.equal(h.calls.length, 0);
    assert.equal(JSON.stringify(h.props.composition), before); assert.equal(h.proposals.length, 0); assert.equal(h.trimProposals.length, 0);
  } finally { h.stop(); }
});
await test('Switching viewer mode unloads source bytes and requires a new explicit load on return', async () => {
  const h = harness();
  try {
    h.render(); h.timeline().props.onPlayheadChange(r(2, 3)); h.render(); await h.click('Load working-copy preview');
    assert.ok(h.frames().length > 0); h.props.mediaActive = false; h.render();
    assert.deepEqual(h.revoked, [h.created[0].url]); assert.equal(h.frames().length, 0);
    assert.deepEqual(h.timeline().props.playhead, r(2, 3)); assert.equal(h.calls.length, 1);
    h.props.mediaActive = true; h.render(); assert.equal(h.frames().length, 0); assert.equal(h.calls.length, 1);
    assert.equal(h.button('Load working-copy preview').props.disabled, false);
    await h.click('Load working-copy preview'); assert.equal(h.calls.length, 2);
  } finally { h.stop(); }
});
await test('Draft-only preview blocking preserves the exact playhead and sole timeline through recovery', async () => {
  const h = harness();
  try {
    h.render(); const timeline = h.timeline(); timeline.props.onPlayheadChange(r(13, 24)); h.render();
    await h.click('Load working-copy preview'); h.props.previewDisabled = true; h.render();
    assert.deepEqual(h.timeline().props.playhead, r(13, 24)); assert.equal(h.timeline().key, timeline.key);
    assert.equal(h.nodes().filter(node => node.type === TimelineSeam).length, 1); assert.equal(h.frames().length, 0);
    h.props.previewDisabled = false; h.render(); assert.deepEqual(h.timeline().props.playhead, r(13, 24));
    assert.equal(h.calls.length, 1); assert.equal(h.frames().length, 0);
  } finally { h.stop(); }
});
await test('Layout callback exposes separate working-preview and timeline surfaces from one controller', async () => {
  const layouts = [], h = harness({ renderLayout(surfaces) { layouts.push(surfaces); return { type: 'main', props: { children: [{ type: 'section', props: { 'aria-label': 'Centre', children: surfaces.workingPreview } }, { type: 'section', props: { 'aria-label': 'Bottom', children: surfaces.timeline } }] } }; } });
  try {
    h.render(); assert.deepEqual(Object.keys(layouts.at(-1)).sort(), ['timeline', 'workingPreview']);
    assert.equal(h.nodes().filter(node => node.type === TimelineSeam).length, 1); assert.equal(h.calls.length, 0);
    h.timeline().props.onPlayheadChange(r(1, 3)); h.render(); h.props.mediaActive = false; h.render();
    assert.deepEqual(h.timeline().props.playhead, r(1, 3)); assert.equal(h.calls.length, 0);
  } finally { h.stop(); }
});
await test('Inactive-mode transition aborts one in-flight source request without automatic retry', async () => {
  const h = harness({}, (_url, options) => new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(Error('Stopped')), { once: true })));
  try {
    h.render(); h.button('Load working-copy preview').props.onClick(); await h.settle();
    assert.equal(h.calls.length, 1); h.props.mediaActive = false; h.render();
    assert.equal(h.calls[0].options.signal.aborted, true); await h.settle();
    h.props.mediaActive = true; h.render(); assert.equal(h.calls.length, 1); assert.equal(h.frames().length, 0);
  } finally { h.stop(); }
});
await test('Head switch remounts viewer, revokes previous bytes and never loads automatically', async () => { const h = harness(); try { h.render(); await h.click('Load working-copy preview'); h.props.headDigest = 'b'.repeat(64); h.render(); assert.deepEqual(h.revoked, [h.created[0].url]); assert.equal(h.calls.length, 1); assert.match(h.text(), /Load the working-copy preview explicitly/); } finally { h.stop(); } });
await test('Nested composition blocks actual Load action while retaining timeline', () => { const c = composition(); Object.assign(c.layers[1], { type: 'NESTED_COMPOSITION', source: { kind: 'COMPOSITION', compositionId: 'composition_nested' } }); const h = harness({ composition: c }); try { h.render(); assert.equal(h.button('Load working-copy preview').props.disabled, true); assert.match(h.text(), /entire media preview is blocked/); assert.ok(h.timeline()); assert.equal(h.timeline().props.composition.layers[1].source.compositionId, 'composition_nested'); assert.equal(h.calls.length, 0); } finally { h.stop(); } });
await test('Failure stays visible without blob publication or automatic retry', async () => { const h = harness({}, async () => response({ 'X-CodexForge-Editorial-Head': 'b'.repeat(64) })); try { h.render(); await h.click('Load working-copy preview'); assert.equal(h.created.length, 0); assert.equal(h.calls.length, 1); assert.match(h.text(), /could not be verified/); assertExposedNotice(h, /could not be verified/); await h.settle(); assert.equal(h.calls.length, 1); } finally { h.stop(); } });
await test('Stop loading aborts the in-flight real handler and prevents publication', async () => { const h = harness({}, (_url, options) => new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(Error('Stopped')), { once: true }))); try { h.render(); h.button('Load working-copy preview').props.onClick(); await h.settle(); assert.equal(h.calls.length, 1); assertExposedNotice(h, /Loading explicitly selected/); await h.click('Stop preview loading'); assert.equal(h.calls[0].options.signal.aborted, true); assert.equal(h.created.length, 0); assert.match(h.text(), /loading stopped or timed out/); assertExposedNotice(h, /loading stopped or timed out/); } finally { h.stop(); } });
await test('Blocking transition aborts stalled fetch; unmount revokes loaded bytes', async () => { const h = harness({}, (_url, options) => new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(Error('Stopped')), { once: true }))); try { h.render(); h.button('Load working-copy preview').props.onClick(); await h.settle(); h.props.previewDisabled = true; h.render(); assert.equal(h.calls[0].options.signal.aborted, true); await h.settle(); assert.equal(h.created.length, 0); } finally { h.stop(); } const loaded = harness(); loaded.render(); await loaded.click('Load working-copy preview'); loaded.stop(); assert.deepEqual(loaded.revoked, [loaded.created[0].url]); });
await test('Wrong project and malformed composition fail closed without controls', () => { const h = harness({ projectId: 'project_other' }); try { h.render(); assert.match(h.text(), /cannot be displayed safely/); assert.equal(h.button('Load working-copy preview'), undefined); assert.equal(h.calls.length, 0); } finally { h.stop(); } });
function crossingFractions(type) { const c = composition(); c.duration = r(1, 1); c.layers.forEach(l => { l.type = type; }); c.layers[0].start = r(1, 100000000); c.layers[0].duration = r(1, 100000000); c.layers[1].start = r(2, 100000001); c.layers[1].duration = r(1, 100000001); return c; }
await test('Mounted IMAGE viewer survives exact cross-layer boundary whose source subtraction overflows', async () => { const c = crossingFractions('IMAGE'); v2.validateCompositionV2(c); assert.throws(() => helper.v2SourceTime(c.layers[0], c.layers[1].start)); const h = harness({ composition: c }); try { h.render(); await h.click('Load working-copy preview'); h.timeline().props.onPlayheadChange(r(2, 100000001)); h.render(); assert.equal(h.timeline().props.playhead.numerator, 2); assert.doesNotMatch(h.text(), /cannot be represented/); assert.equal(h.frames().length, 2); } finally { h.stop(); } });
await test('Mounted VIDEO viewer masks an unrepresentable source offset without rounding or crashing', async () => { const h = harness({ composition: crossingFractions('VIDEO') }, async () => rangeResponse()); try { h.render(); await h.click('Load working-copy preview'); h.timeline().props.onPlayheadChange(r(2, 100000001)); h.render(); assert.match(h.text(), /Exact source time cannot be represented/); assert.deepEqual(h.timeline().props.playhead, r(2, 100000001)); assert.equal(h.frames().length, 1); } finally { h.stop(); } });
await test('Actual video frame stays masked through metadata and seek, then exposes decode errors and releases its source', async () => { const c = composition(); c.layers.forEach(l => { l.type = 'VIDEO'; }); const h = harness({ composition: c }, async () => rangeResponse()); let frame; const cleanup = []; try { h.render(); await h.click('Load working-copy preview'); h.timeline().props.onPlayheadChange(r(1, 2)); h.render(); const node = h.frames()[0], events = new Map(); let current = 0; const attributes = new Map([['src', node.props.source.url]]); const element = { readyState: 0, duration: 5, seeking: false, pause() { cleanup.push('pause'); }, getAttribute(name) { return attributes.get(name) ?? null; }, setAttribute(name, value) { attributes.set(name, value); cleanup.push('set:' + name); }, removeAttribute(name) { attributes.delete(name); cleanup.push('remove:' + name); }, load() { cleanup.push('load'); }, addEventListener(name, callback) { events.set(name, callback); }, removeEventListener(name) { events.delete(name); }, get currentTime() { return current; }, set currentTime(value) { current = value; this.seeking = true; } }; frame = h.frame(node, element); frame.render(); assert.match(frame.text(), /Loading browser frame/); element.readyState = 1; events.get('loadedmetadata')(); frame.render(); assert.match(frame.text(), /Seeking browser frame/); assert.equal(current, 0.5); element.readyState = 2; events.get('loadeddata')(); frame.render(); assert.match(frame.text(), /Seeking browser frame/); element.seeking = false; events.get('seeked')(); frame.render(); assert.equal(frame.text(), ''); frame.error(); frame.render(); assert.match(frame.text(), /Browser video decoding failed/); } finally { frame?.stop(); h.stop(); } assert.deepEqual(cleanup.slice(-3), ['pause', 'remove:src', 'load']); });
await test('Still-frame effect replay restores its explicitly loaded source and listeners without autoplay', async () => {
  const c = composition(); c.layers.forEach(layer => { layer.type = 'VIDEO'; });
  const h = harness({ composition: c }, async () => rangeResponse()); let frame;
  try {
    h.render(); await h.click('Load working-copy preview'); const node = h.frames()[0];
    const attributes = new Map([['src', node.props.source.url]]), listeners = new Map(), lifecycle = [];
    const element = { readyState: 0, duration: 5, seeking: false, currentTime: 0,
      pause() { lifecycle.push('pause'); }, getAttribute(name) { return attributes.get(name) ?? null; },
      setAttribute(name, value) { attributes.set(name, value); lifecycle.push('set:' + name); },
      removeAttribute(name) { attributes.delete(name); lifecycle.push('remove:' + name); }, load() { lifecycle.push('load'); },
      addEventListener(name, handler) { listeners.set(name, handler); }, removeEventListener(name) { listeners.delete(name); } };
    frame = h.frame(node, element); const tree = frame.render(); lifecycle.length = 0; frame.replayEffects();
    assert.deepEqual(lifecycle, ['pause', 'remove:src', 'load', 'set:src', 'load', 'pause']);
    assert.equal(element.getAttribute('src'), node.props.source.url); assert.equal(listeners.size, 3);
    assert.equal(descendants(tree).find(item => item.type === 'video').props.autoPlay, undefined);
    assert.equal(h.calls.length, 1); assert.deepEqual(h.created, []);
  } finally { frame?.stop(); h.stop(); }
});
await test('Video and title share one composition-ratio picture and canonical SVG coordinates through view-only rerenders (not DOM geometry)', async () => {
  const c = composition(); c.layers[0].type = 'VIDEO';
  Object.assign(c.layers[0].transform, { x: 128, y: 72 });
  Object.assign(c.layers[1], { type: 'TEXT', source: { kind: 'TEXT' }, text: { text: 'Registered title', fontRef: 'ARIAL_REGULAR', fontSizePx: 64, color: '#FFFFFF' }, opacity: 0.75 });
  Object.assign(c.layers[1].transform, { x: 80, y: -36, rotationDeg: 0, scaleX: 1, scaleY: 1, anchorX: 0.5, anchorY: 0.5 });
  const saved = JSON.stringify(c), h = harness({ composition: c }, async () => rangeResponse());
  try {
    h.render(); h.timeline().props.onPlayheadChange(r(3, 4)); h.render(); await h.click('Load working-copy preview');
    const initialTimeline = h.timeline(), initialCalls = h.calls.length;
    for (const selectedLayerId of ['layer_top', 'layer_base', 'layer_top']) {
      h.props.selectedLayerId = selectedLayerId;
      h.props.renderLayout = surfaces => ({ type: 'main', props: { children: [surfaces.workingPreview, surfaces.timeline] } });
      h.render();
      const stages = h.nodes().filter(node => node.props?.['data-preview-stage'] !== undefined), pictures = h.nodes().filter(node => node.props?.['data-preview-picture'] !== undefined);
      assert.equal(stages.length, 1); assert.equal(pictures.length, 1); assert.ok(descendants(stages[0]).includes(pictures[0]));
      assert.equal(pictures[0].props.style.aspectRatio, '1280/720'); assert.equal(pictures[0].props.style['--preview-ratio'], 1280 / 720);
      const layers = descendants(pictures[0]).filter(node => node.props?.className === 'visualLayer');
      assert.deepEqual(layers.map(node => node.props['data-layer-id']), ['layer_base', 'layer_top']);
      assert.equal(layers[0].props.style.transform, 'translate(10%, 10%) rotate(0deg) scale(1, 1)');
      const videoFrame = descendants(layers[0]).find(node => typeof node.type === 'function'), textFrame = descendants(layers[1]).find(node => typeof node.type === 'function');
      assert.equal(videoFrame.props.source.mime, 'video/mp4'); assert.deepEqual(videoFrame.props.time, r(3, 4));
      const svg = textFrame.type(textFrame.props), group = descendants(svg).find(node => node.type === 'g'), text = descendants(svg).find(node => node.type === 'text');
      assert.equal(svg.type, 'svg'); assert.equal(svg.props.viewBox, '0 0 1280 720'); assert.equal(svg.props.preserveAspectRatio, 'xMidYMid meet');
      assert.equal(group.props.transform, 'translate(720 324) rotate(0) scale(1 1)');
      assert.equal(text.props.fontSize, 64); assert.equal(text.props.textAnchor, 'middle'); assert.equal(text.props.dominantBaseline, 'middle'); assert.equal(words(text), 'Registered title');
      assert.equal(layers[1].props.style.opacity, 0.75); assert.deepEqual(textFrame.props.layer, h.props.composition.layers[1]);
      assert.equal(h.timeline().key, initialTimeline.key); assert.deepEqual(h.timeline().props.playhead, r(3, 4));
      assert.equal(h.calls.length, initialCalls); assert.equal(h.proposals.length, 0); assert.equal(h.trimProposals.length, 0); assert.equal(JSON.stringify(c), saved);
    }
  } finally { h.stop(); }
});

await test('Compact viewer discloses only routine loaded success while closed-preview notice and active warning remain outside', async () => {
  const h = harness();
  try {
    h.render(); const toolbar = h.nodes().find(node => node.props?.['data-preview-toolbar'] !== undefined), details = h.nodes().find(node => node.props?.['data-preview-details'] !== undefined);
    assert.ok(toolbar); assert.equal(details?.type, 'details'); assert.ok(descendants(toolbar).includes(h.button('Load working-copy preview')));
    assert.equal(descendants(toolbar).some(node => node.props?.['data-preview-picture'] !== undefined), false);
    assert.match(words(details), /1280.*720/); assert.match(words(details), /saved instructions only/iu); assert.match(words(details), /silent|synchronized playback/iu);
    await h.click('Load working-copy preview');
    const loadedDetails = h.nodes().find(node => node.props?.['data-preview-details'] !== undefined), notice = h.nodes().find(node => node.props?.role === 'status');
    assert.ok(notice); assert.equal(descendants(loadedDetails).includes(notice), true); assert.match(words(notice), /no autoplay or generation/);
    assert.equal(h.nodes().filter(node => node.props?.role === 'status').length, 1, 'Routine success appears once inside details, not in a second live region.');
    await h.click('Close working-copy preview');
    const closedNotice = h.nodes().find(node => node.props?.role === 'status');
    assert.match(words(closedNotice), /Preview closed/); assert.equal(descendants(h.nodes().find(node => node.props?.['data-preview-details'] !== undefined)).includes(closedNotice), false);
    h.props.previewDisabled = true; h.render();
    const warning = h.nodes().find(node => node.props?.className === 'warning'); assert.ok(warning); assert.equal(descendants(h.nodes().find(node => node.props?.['data-preview-details'] !== undefined)).includes(warning), false);
    assert.equal(h.button('Load working-copy preview').props.disabled, true); assert.equal(h.calls.length, 1);
  } finally { h.stop(); }
});

await test('Shared-stage CSS defines one responsive fit for media and SVG; these static contracts do not establish measured picture size', () => {
  function declarations(css, selector) { const escaped = selector.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'); const found = css.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`, 'u')); assert.ok(found, `Missing CSS rule ${selector}`); return found[1]; }
  const layer = declarations(componentCss, '.visualLayer'), media = declarations(componentCss, '.media'), text = declarations(componentCss, '.textPreview');
  assert.match(layer, /position:\s*absolute/u); assert.match(layer, /inset:\s*0/u);
  for (const css of [layer, media, text]) { assert.match(css, /width:\s*100%/u); assert.match(css, /height:\s*100%/u); }
  assert.match(media, /object-fit:\s*contain/u);
  const stage = declarations(workspaceCss, '.centre [data-preview-stage]'), picture = declarations(workspaceCss, '.centre [data-preview-picture]');
  assert.match(stage, /container-type:\s*size/u); assert.match(picture, /100cqw/u); assert.match(picture, /100cqh/u); assert.match(picture, /var\(--preview-ratio\)/u);
  const rowHeight = declarations(workspaceCss, '.timeline [data-timeline-row]').match(/(?:min-)?height:\s*(\d+(?:\.\d+)?)px/u);
  assert.ok(rowHeight && Number(rowHeight[1]) >= 40, 'The authored shared row rule must reserve at least 40 CSS px; only Browser evidence establishes its computed size.');
  assert.match(declarations(workspaceCss, '.timeline [data-timeline-scroll]'), /overflow-y:\s*auto/u);
  assert.match(workspaceCss, /@media\s*\(max-width:\s*600px\)/u); assert.match(workspaceCss, /prefers-reduced-motion:\s*reduce/u);
});

const sourceUnchanged = [...sourceBindings].every(([name, hash]) => sha(fs.readFileSync(path.join(frontend, name))) === hash);
assert.equal(typeof webcrypto.subtle.digest, 'function');
const result = { runId, finishedAt: new Date().toISOString(), status: results.every(r => r.status === 'PASS') && sourceUnchanged && network.length === 0 ? 'PASS' : 'FAIL', total: results.length, passed: results.filter(r => r.status === 'PASS').length, sourceUnchanged, networkAttempts: network, providerRequests: 0, nativeCalls: 0, browserExecution: false, domGeometryMeasured: false, sourceBindings: Object.fromEntries(sourceBindings), results };
retain('result.json', result);
console.log(JSON.stringify({ status: result.status, total: result.total, passed: result.passed, sourceUnchanged, evidence }));
if (result.status !== 'PASS') { console.error(JSON.stringify(results.filter(r => r.status !== 'PASS'), null, 2)); process.exitCode = 1; }
