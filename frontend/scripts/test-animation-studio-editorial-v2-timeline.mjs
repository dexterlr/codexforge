// Actual FoundationCopyTimeline TSX handlers with deterministic React/ref/pointer seams.
// Synthetic evidence only: no browser, DOM, native storage, server or provider activity.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const contract = loader.load('@/lib/codexforge/animation-studio/composition-contract');
const v2 = loader.load('@/lib/codexforge/animation-studio/editorial-v2-contract');
const time = loader.load('@/lib/codexforge/animation-studio/editorial-time');
const viewer = loader.load('@/lib/codexforge/animation-studio/editorial-v2-viewer');
const r = time.makeEditorialRational, clone = value => JSON.parse(JSON.stringify(value));
const sha = value => createHash('sha256').update(value).digest('hex');
const sourcePath = 'src/lib/codexforge/animation-studio/components/FoundationCopyTimeline.tsx';
const stylePath = 'src/lib/codexforge/animation-studio/components/CompositionPanel.module.css';
const filename = path.join(frontend, sourcePath), source = fs.readFileSync(filename, 'utf8');
const stamp = '2026-09-27T12:00:00.000Z', projectId = 'project_timeline', compositionId = 'composition_timeline';
const provenance = { kind: 'EDITORIAL_INSTRUCTION', providerRequests: 0 };

function baseLayer(layerId, name, locked = false) {
  return { schemaVersion: 1, layerId, compositionId, name, type: 'VIDEO', source: { kind: 'ASSET', asset: { assetId: `asset_${layerId}`, version: 1 }, takeId: null }, enabled: true, locked, solo: false, startUs: 0, durationUs: 1_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: contract.defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: 'DRAFT', provenance };
}
function composition(duration = r(5, 1), focusStart = r(1, 3), focusDuration = r(1, 1)) {
  const migrated = v2.migrateCompositionV1ToV2({ schemaVersion: 1, projectId, compositionId, kind: 'SHOT', shotId: 'shot_timeline', name: 'Exact visual timeline', durationUs: 5_000_000, width: 1280, height: 720, revision: 7, approvalState: 'DRAFT', provenance, layers: [
    { ...baseLayer('layer_background', 'Background'), durationUs: 5_000_000 },
    baseLayer('layer_segment_left', 'Bakery clip'),
    baseLayer('layer_segment_right', 'Bakery clip'),
    baseLayer('layer_locked', 'Locked title', true),
  ] });
  migrated.duration = duration;
  Object.assign(migrated.layers[0], { start: r(0, 1), duration });
  Object.assign(migrated.layers[1], { start: focusStart, duration: focusDuration, sourceOffset: r(1, 7) });
  Object.assign(migrated.layers[2], { start: time.editorialAddTime(focusStart, time.editorialAddTime(focusDuration, r(1, 5))), duration: focusDuration, sourceOffset: r(8, 7) });
  Object.assign(migrated.layers[3], { start: time.editorialAddTime(focusStart, time.editorialAddTime(focusDuration, r(7, 5))), duration: r(1, 2) });
  return v2.validateCompositionV2(migrated);
}
function longComposition(seconds) {
  const total = r(seconds, 1), start = r(seconds / 2, 1), value = composition(total, start, r(1, 1));
  return v2.validateCompositionV2(value);
}
function descendants(node) { if (Array.isArray(node)) return node.flatMap(descendants); return !node || typeof node !== 'object' || !node.props ? [] : [node, ...descendants(node.props.children)]; }
function words(node) { if (node == null || typeof node === 'boolean') return ''; return Array.isArray(node) ? node.map(words).join('') : typeof node !== 'object' ? String(node) : words(node.props?.children); }

let activeHooks;
const react = {
  useState(...args) { return activeHooks.useState(...args); },
  useRef(...args) { return activeHooks.useRef(...args); },
  useEffect(...args) { return activeHooks.useEffect(...args); },
};
const compiled = ts.transpileModule(source, { fileName: filename, reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
assert.equal((compiled.diagnostics ?? []).filter(item => item.category === ts.DiagnosticCategory.Error).length, 0);
const item = new Module(filename); item.filename = filename;
item.require = name => {
  if (name === 'react') return react;
  if (name === 'react/jsx-runtime') return Module.createRequire(filename)(name);
  if (name.endsWith('.module.css')) return new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) });
  if (name.startsWith('../')) return loader.load('@/lib/codexforge/animation-studio/' + name.slice(3));
  throw Error(`Unexpected timeline dependency: ${name}`);
};
item._compile(compiled.outputText, filename);
const { FoundationCopyTimeline, visibleTimelineTicks } = item.exports;
const runId = randomUUID(), startedAt = new Date().toISOString(), evidence = path.join(frontend, '.codexforge/acceptance', `studio-editorial-v2-timeline-tests-${runId}`);
fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const bindingNames = [...new Set([...loader.loaded, sourcePath, stylePath, 'scripts/test-animation-studio-editorial-v2-timeline.mjs', 'scripts/animation-studio-test-loader.mjs'])].sort();
const sourceBindings = Object.fromEntries(bindingNames.map(name => [name, sha(fs.readFileSync(path.join(frontend, name)))]));
const plannedCases = 20;
retain('intent.json', { runId, startedAt, plannedCases, component: sourcePath, scope: 'Actual timeline TSX handlers with deterministic hook/ref/pointer/ResizeObserver seams. Synthetic widths are supplied by the harness, not measured DOM geometry. No browser, DOM event propagation, server, native, provider or production claim.', sourceBindings });

function harness(overrides = {}) {
  const slots = [], pendingEffects = [], listeners = new Map(), observers = [], selected = [], proposals = [], gestures = [], playheads = [], splits = [];
  let cursor = 0, tree;
  const scroller = { clientWidth: overrides.viewportWidth ?? 500, scrollLeft: 0 };
  const canvas = {};
  const captures = new Set(), pointerTarget = { setPointerCapture(id) { captures.add(id); }, hasPointerCapture(id) { return captures.has(id); }, releasePointerCapture(id) { captures.delete(id); } };
  const props = {
    composition: composition(), headDigest: 'a'.repeat(64), workingCopyRevision: 11, selectedLayerId: 'layer_segment_left', selectionDisabled: false, dragDisabled: false,
    timelineFrameRate: r(25, 1), moveDraftStart: null, playhead: r(0, 1),
    ...overrides,
  };
  props.onSelectLayer ??= id => { selected.push(id); props.selectedLayerId = id; };
  props.onProposeMove ??= (layerId, start, authority) => proposals.push({ layerId, start: clone(start), authority: clone(authority) });
  props.onGestureActiveChange ??= value => gestures.push(value);
  props.onPlayheadChange ??= value => { playheads.push(clone(value)); props.playhead = clone(value); };
  props.onUsePlayheadForSplit ??= value => splits.push(clone(value));
  const changed = (deps, previous) => !previous || deps.length !== previous.deps.length || deps.some((value, index) => !Object.is(value, previous.deps[index]));
  const hooks = {
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useEffect(callback, deps) { const index = cursor++, previous = slots[index]; if (changed(deps, previous)) pendingEffects.push(() => { previous?.cleanup?.(); slots[index] = { deps, cleanup: callback() }; }); },
  };
  const priorWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const priorResizeObserver = Object.getOwnPropertyDescriptor(globalThis, 'ResizeObserver');
  const ResizeObserverSeam = class {
    constructor(callback) { this.callback = callback; this.targets = new Set(); this.disconnected = false; observers.push(this); }
    observe(target) { this.targets.add(target); }
    disconnect() { this.targets.clear(); this.disconnected = true; }
  };
  Object.defineProperty(globalThis, 'ResizeObserver', { configurable: true, writable: true, value: overrides.withoutResizeObserver ? undefined : ResizeObserverSeam });
  globalThis.window = {
    ResizeObserver: globalThis.ResizeObserver,
    addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
  };
  function render() {
    activeHooks = hooks; cursor = 0; tree = FoundationCopyTimeline(props); activeHooks = undefined;
    const nodes = descendants(tree), region = nodes.find(node => node.props?.role === 'region'), canvasNode = nodes.find(node => node.props?.className === 'timelineCanvas');
    if (region?.props.ref) region.props.ref.current = scroller;
    if (canvasNode?.props.ref) canvasNode.props.ref.current = canvas;
    while (pendingEffects.length) pendingEffects.shift()();
    return tree;
  }
  function nodes() { return descendants(tree); }
  function find(predicate) { const matches = nodes().filter(predicate); assert.equal(matches.length, 1, `Expected one timeline node, found ${matches.length}.`); return matches[0]; }
  function button(label) { return find(node => node.type === 'button' && words(node) === label); }
  function bars() { return nodes().filter(node => node.type === 'button' && node.props.className === 'timelineBar'); }
  function bar(layerId) { return find(node => node.type === 'button' && node.props.className === 'timelineBar' && node.props['aria-label'].includes(`ID ${layerId};`)); }
  function pointer(handler, layerId, clientX, pointerId = 17, target = pointerTarget) {
    const event = { button: 0, isPrimary: true, pointerId, clientX, currentTarget: target, prevented: false, preventDefault() { this.prevented = true; } };
    bar(layerId).props[handler](event); render(); return event;
  }
  function click(label) { const control = button(label); assert.equal(Boolean(control.props.disabled), false, `Disabled timeline button: ${label}`); control.props.onClick(); render(); }
  function input(label, value) { const control = find(node => node.type === 'input' && node.props['aria-label'] === label); control.props.onChange({ target: { value: String(value) } }); render(); }
  function trigger(name, event = {}) { for (const callback of [...(listeners.get(name) ?? [])]) callback(event); render(); }
  function resize(width) { scroller.clientWidth = width; for (const observer of observers) if (observer.targets.has(scroller)) observer.callback([{ target: scroller, contentRect: { width } }]); render(); }
  function dispose() { for (const slot of slots) slot?.cleanup?.(); if (priorWindow) Object.defineProperty(globalThis, 'window', priorWindow); else delete globalThis.window; if (priorResizeObserver) Object.defineProperty(globalThis, 'ResizeObserver', priorResizeObserver); else delete globalThis.ResizeObserver; }
  render(); render();
  return { props, scroller, observers, listeners, pointerTarget, captures, selected, proposals, gestures, playheads, splits, render, nodes, find, button, bars, bar, pointer, click, input, trigger, resize, text: () => words(tree), dispose };
}
async function withHarness(overrides, run) { const h = harness(overrides); try { await run(h); } finally { h.dispose(); } }

const results = [];
async function test(name, run) { try { await run(); results.push({ name, status: 'PASS' }); } catch (error) { results.push({ name, status: 'FAIL', error: { name: error.name, message: error.message, stack: error.stack } }); } }

await test('Saved exact intervals render top-first without changing canonical layer order', async () => withHarness({}, h => {
  const before = h.props.composition.layers.map(layer => layer.layerId), ids = h.bars().map(node => node.props['aria-label'].match(/ID ([^;]+);/u)[1]);
  assert.deepEqual(ids, [...before].reverse()); assert.deepEqual(h.props.composition.layers.map(layer => layer.layerId), before);
  const bar = h.bar('layer_segment_left'); assert.equal(bar.props.style.left, `${viewer.timelinePercent(r(1, 3), r(5, 1))}%`); assert.equal(bar.props.style.width, '20%');
  assert.match(bar.props['aria-label'], /saved exact start 1\/3 s, end 4\/3 s, duration 1 s/);
}));

await test('Same-name split segments remain independently selectable by stable ID', async () => withHarness({}, h => {
  const labels = h.nodes().filter(node => node.type === 'button' && node.props.className !== 'timelineBar' && node.props['aria-pressed'] !== undefined && /^Bakery clip/u.test(words(node)));
  assert.equal(labels.length, 2); assert.match(words(labels[0]), /layer_segment_right/); assert.match(words(labels[1]), /layer_segment_left/);
  labels[0].props.onClick(); h.render(); labels[1].props.onClick(); h.render(); assert.deepEqual(h.selected, ['layer_segment_right', 'layer_segment_left']);
}));

await test('Five-minute and sixty-minute rulers stay bounded while coordinates remain exact', async () => {
  for (const seconds of [300, 3600]) {
    const ticks = visibleTimelineTicks(r(seconds, 1), 32_768, 16_000, 640); assert.ok(ticks.length > 0 && ticks.length <= 24); assert.ok(ticks.every(tick => tick.left >= 0 && tick.left <= 100));
    await withHarness({ composition: longComposition(seconds) }, h => { assert.equal(h.bar('layer_segment_left').props.style.left, '50%'); assert.ok(h.nodes().filter(node => node.props?.className === 'timelineTick').length <= 24); });
  }
});

await test('Zoom fit and scrolling are local view state with no edit proposal', async () => withHarness({}, h => {
  const width = () => h.find(node => node.props?.className === 'timelineCanvas').props.style.width;
  const ruler = () => h.find(node => node.props?.className === 'timelineRuler');
  assert.equal(width(), '500px'); h.click('Zoom in'); assert.equal(width(), '1000px'); assert.equal(ruler().props.style.width, width());
  h.scroller.scrollLeft = 125; h.find(node => node.props?.role === 'region').props.onScroll({ currentTarget: h.scroller }); h.render();
  assert.equal(ruler().props.style.transform, 'translateX(-125px)', 'The separated ruler tracks the same saved horizontal view state as the layer canvas.');
  h.click('Fit composition'); assert.equal(width(), '500px'); assert.equal(ruler().props.style.width, width()); assert.equal(ruler().props.style.transform, 'translateX(0px)'); assert.equal(h.scroller.scrollLeft, 0); assert.equal(h.proposals.length, 0); assert.equal(h.gestures.length, 0);
}));

await test('Ruler and exact playhead controls change view state and split input only explicitly', async () => withHarness({}, h => {
  const original = JSON.stringify(h.props.composition); h.input('Playhead numerator', '1'); h.input('Playhead denominator', '3'); h.click('Set playhead'); assert.deepEqual(h.playheads.at(-1), r(1, 3)); assert.equal(h.splits.length, 0);
  const ruler = h.find(node => node.props?.className === 'timelineRuler'); ruler.props.onPointerDown({ button: 0, clientX: 250, currentTarget: { getBoundingClientRect: () => ({ left: 0, width: 500 }) } }); h.render(); assert.deepEqual(h.playheads.at(-1), r(5, 2));
  h.click('Use playhead for split input'); assert.deepEqual(h.splits, [r(5, 2)]); h.click('Go to composition end'); assert.deepEqual(h.playheads.at(-1), r(5, 1)); assert.equal(JSON.stringify(h.props.composition), original);
}));

await test('One-frame release creates one exact local proposal with snapshotted authority', async () => withHarness({}, h => {
  const down = h.pointer('onPointerDown', 'layer_segment_left', 100); assert.equal(down.prevented, true); assert.deepEqual(h.gestures, [true]); assert.equal(h.proposals.length, 0); assert.equal(h.captures.has(17), true);
  h.pointer('onPointerMove', 'layer_segment_left', 104); assert.equal(h.proposals.length, 0); assert.match(h.text(), /Local ghost: \+1 frame; proposed exact start 28\/75 s/);
  h.pointer('onPointerUp', 'layer_segment_left', 104); assert.deepEqual(h.proposals, [{ layerId: 'layer_segment_left', start: r(28, 75), authority: { headDigest: 'a'.repeat(64), revision: 11, compositionRevision: 7 } }]); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.captures.size, 0); assert.match(h.text(), /No request was sent by the gesture/);
}));

await test('Pointer movement is recomputed from the immutable gesture origin rather than accumulated', async () => withHarness({}, h => {
  const before = clone(h.props.composition.layers[1]); h.pointer('onPointerDown', 'layer_segment_left', 100); h.pointer('onPointerMove', 'layer_segment_left', 104); h.pointer('onPointerMove', 'layer_segment_left', 108); h.pointer('onPointerUp', 'layer_segment_left', 108);
  assert.deepEqual(h.proposals[0].start, r(31, 75)); assert.deepEqual(h.props.composition.layers[1], before); assert.deepEqual(h.props.composition.layers[1].sourceOffset, r(1, 7));
}));

await test('Zero-frame release creates neither a draft proposal nor a save', async () => withHarness({}, h => {
  h.pointer('onPointerDown', 'layer_segment_left', 100); h.pointer('onPointerUp', 'layer_segment_left', 101); assert.equal(h.proposals.length, 0); assert.deepEqual(h.gestures, [true, false]); assert.match(h.text(), /Zero-frame gesture.*No draft was created/);
}));

await test('Out-of-bounds movement rejects without clamping or proposal', async () => withHarness({}, h => {
  h.pointer('onPointerDown', 'layer_segment_left', 100); h.pointer('onPointerMove', 'layer_segment_left', -100); assert.match(h.text(), /Rejected ghost.*Nothing was clamped or saved/); h.pointer('onPointerUp', 'layer_segment_left', -100); assert.equal(h.proposals.length, 0); assert.match(h.text(), /rejected without clamping, a draft or a save/);
}));

await test('Locked unsupported-rate selected-disabled and edit-disabled bars cannot start dragging', async () => {
  for (const [overrides, layerId, pattern] of [
    [{}, 'layer_locked', /locked; it cannot be dragged/],
    [{ timelineFrameRate: null }, 'layer_segment_left', /no unambiguous supported saved frame rate/],
    [{ selectionDisabled: true }, 'layer_segment_left', /Finish, save or discard/],
    [{ dragDisabled: true }, 'layer_segment_left', /Finish, save or discard/],
  ]) await withHarness(overrides, h => { h.pointer('onPointerDown', layerId, 100); assert.equal(h.proposals.length, 0); assert.equal(h.gestures.length, 0); assert.equal(h.captures.size, 0); assert.match(h.text(), pattern); });
});

await test('Pointer cancellation releases capture and leaves no proposal', async () => withHarness({}, h => {
  h.pointer('onPointerDown', 'layer_segment_left', 100); h.pointer('onPointerMove', 'layer_segment_left', 104); h.pointer('onPointerCancel', 'layer_segment_left', 104); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0); assert.equal(h.captures.size, 0); assert.match(h.text(), /Pointer interaction was cancelled/);
}));

await test('Escape cancels the active gesture without publishing its ghost', async () => withHarness({}, h => {
  h.pointer('onPointerDown', 'layer_segment_left', 100); let prevented = 0; h.trigger('keydown', { key: 'Escape', preventDefault() { prevented++; } }); assert.equal(prevented, 1); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0); assert.equal(h.captures.size, 0); assert.match(h.text(), /cancelled with Escape/);
}));

await test('Lost pointer capture cancels the active gesture', async () => withHarness({}, h => {
  h.pointer('onPointerDown', 'layer_segment_left', 100); h.pointer('onLostPointerCapture', 'layer_segment_left', 104); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0); assert.equal(h.captures.size, 0); assert.match(h.text(), /Pointer capture was lost/);
}));

await test('Scroll during a gesture cancels rather than changing its scale basis', async () => withHarness({}, h => {
  h.pointer('onPointerDown', 'layer_segment_left', 100); h.scroller.scrollLeft = 20; h.find(node => node.props?.role === 'region').props.onScroll({ currentTarget: h.scroller }); h.render(); h.pointer('onPointerUp', 'layer_segment_left', 104); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0); assert.match(h.text(), /timeline scrolled/);
}));

await test('Zoom and viewport resize each cancel an in-flight gesture', async () => {
  await withHarness({}, h => { const zoom = h.button('Zoom in'); h.pointer('onPointerDown', 'layer_segment_left', 100); zoom.props.onClick(); h.render(); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0); assert.match(h.text(), /zoom changed/); });
  await withHarness({}, h => { h.pointer('onPointerDown', 'layer_segment_left', 100); h.scroller.clientWidth = 480; h.trigger('resize'); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0); assert.match(h.text(), /viewport changed/); });
});

await test('Timeline exposes keyboard controls linked help live status and focusable short bars without network', async () => withHarness({}, h => {
  const section = h.find(node => node.type === 'section' && node.props['aria-label'] === 'Layer timeline');
  for (const id of section.props['aria-describedby'].split(' ')) assert.equal(h.nodes().filter(node => node.props?.id === id).length, 1);
  assert.equal(h.find(node => node.props?.role === 'region').props.tabIndex, 0); assert.equal(h.find(node => node.props?.['aria-live'] === 'polite').props.role, 'status');
  for (const bar of h.bars()) { assert.equal(bar.type, 'button'); assert.equal(typeof bar.props.onPointerDown, 'function'); assert.equal(typeof bar.props.onLostPointerCapture, 'function'); assert.equal(typeof bar.props['aria-pressed'], 'boolean'); for (const id of bar.props['aria-describedby'].split(' ')) assert.equal(h.nodes().filter(node => node.props?.id === id).length, 1); }
  assert.equal(networkAttempts.length, 0);
}));

await test('Compact actual timeline groups view controls separately from paired canonical track rows (structure, not geometry)', async () => withHarness({}, h => {
  const toolbar = h.find(node => node.props?.['data-timeline-toolbar'] !== undefined), tracks = h.find(node => node.props?.['data-timeline-tracks'] !== undefined);
  assert.equal(descendants(toolbar).some(node => node.props?.className === 'timelineRuler'), false);
  assert.equal(descendants(tracks).filter(node => node.props?.className === 'timelineRuler').length, 1);
  assert.equal(descendants(toolbar).filter(node => node.type === 'details').length, 3, 'Help, exact playhead and boundaries stay available in compact disclosures.');
  for (const layer of h.props.composition.layers) {
    const pair = descendants(tracks).filter(node => node.props?.['data-timeline-row'] === layer.layerId);
    assert.equal(pair.length, 2, 'Each canonical layer has one label and one lane sharing a row identity.');
    assert.deepEqual(pair.map(node => node.props.className).sort(), ['timelineLabel', 'timelineLane']);
  }
  assert.equal(h.proposals.length, 0); assert.equal(h.playheads.length, 0);
}));

await test('Observed panel-width change updates the timeline without a window event and cancels only a changed gesture scale', async () => withHarness({}, h => {
  const saved = JSON.stringify(h.props.composition);
  assert.equal(h.observers.length, 1); assert.equal(h.observers[0].targets.has(h.scroller), true);
  h.pointer('onPointerDown', 'layer_segment_left', 100); h.resize(500);
  assert.deepEqual(h.gestures, [true], 'An initial same-width observer notification must not cancel a gesture.');
  h.resize(1000); h.pointer('onPointerUp', 'layer_segment_left', 108);
  assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0); assert.equal(h.captures.size, 0);
  assert.equal(h.find(node => node.props?.className === 'timelineCanvas').props.style.width, '1000px');
  assert.match(h.text(), /viewport changed/); assert.equal(JSON.stringify(h.props.composition), saved);
}));

await test('A new move after observed resize uses the new exact frame scale without changing saved instructions', async () => {
  for (const [width, oneFramePixels] of [[250, 2], [1000, 8]]) await withHarness({}, h => {
    const saved = JSON.stringify(h.props.composition); h.resize(width);
    assert.equal(h.proposals.length, 0); assert.equal(h.gestures.length, 0); assert.equal(h.playheads.length, 0);
    h.pointer('onPointerDown', 'layer_segment_left', 100); h.pointer('onPointerUp', 'layer_segment_left', 100 + oneFramePixels);
    assert.deepEqual(h.proposals, [{ layerId: 'layer_segment_left', start: r(28, 75), authority: { headDigest: 'a'.repeat(64), revision: 11, compositionRevision: 7 } }]);
    assert.equal(JSON.stringify(h.props.composition), saved); assert.equal(networkAttempts.length, 0);
  });
});

await test('Timeline observer and window listeners release on unmount and unsupported observers retain the resize fallback', async () => {
  const h = harness(); h.pointer('onPointerDown', 'layer_segment_left', 100); h.dispose();
  assert.equal(h.observers.length, 1); assert.equal(h.observers[0].disconnected, true); assert.equal(h.observers[0].targets.size, 0);
  assert.ok([...h.listeners.values()].every(handlers => handlers.size === 0)); assert.equal(h.captures.size, 0); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.proposals.length, 0);
  await withHarness({ withoutResizeObserver: true }, fallback => {
    assert.equal(fallback.observers.length, 0); fallback.scroller.clientWidth = 640; fallback.trigger('resize');
    assert.equal(fallback.find(node => node.props?.className === 'timelineCanvas').props.style.width, '640px'); assert.equal(fallback.proposals.length, 0);
  });
});

assert.equal(results.length, plannedCases);
const sourceUnchanged = bindingNames.every(name => sha(fs.readFileSync(path.join(frontend, name))) === sourceBindings[name]);
const status = results.every(result => result.status === 'PASS') && results.length === plannedCases && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL';
retain('result.json', { runId, startedAt, finishedAt: new Date().toISOString(), status, planned: plannedCases, total: results.length, passed: results.filter(result => result.status === 'PASS').length, results, sourceUnchanged, sourceBindings, networkAttempts, browserExecution: false, domRendering: false, domGeometryMeasured: false, nativeExecution: false, providerRequests: 0, productionDataMutations: 0 });
console.log(JSON.stringify({ status, planned: plannedCases, total: results.length, passed: results.filter(result => result.status === 'PASS').length, evidence, sourceUnchanged, networkAttempts }));
if (status !== 'PASS') { console.error(JSON.stringify(results.filter(result => result.status !== 'PASS'), null, 2)); process.exitCode = 1; }
