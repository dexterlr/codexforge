// Actual FoundationCopyTimeline TSX trim-handle handlers with deterministic
// React/ref/pointer seams. Synthetic evidence only: no browser, DOM, native
// storage, server, provider or production activity.
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
const r = time.makeEditorialRational, clone = value => JSON.parse(JSON.stringify(value));
const sha = value => createHash('sha256').update(value).digest('hex');
const sourcePath = 'src/lib/codexforge/animation-studio/components/FoundationCopyTimeline.tsx';
const stylePath = 'src/lib/codexforge/animation-studio/components/CompositionPanel.module.css';
const filename = path.join(frontend, sourcePath), source = fs.readFileSync(filename, 'utf8');
const stamp = '2026-09-27T15:00:00.000Z', projectId = 'project_trim_timeline', compositionId = 'composition_trim_timeline';
const provenance = { kind: 'EDITORIAL_INSTRUCTION', providerRequests: 0 };

function baseLayer(layerId, name, changes = {}) {
  return {
    schemaVersion: 1, layerId, compositionId, name, type: 'VIDEO',
    source: { kind: 'ASSET', asset: { assetId: `asset_${layerId}`, version: 1 }, takeId: `take_${layerId}` },
    enabled: true, locked: false, solo: false, startUs: 0, durationUs: 1_000_000, sourceOffsetUs: 0,
    playbackRate: 1, reverse: false, transform: contract.defaultLayerTransform(), opacity: 1, keyframes: [],
    createdAt: stamp, updatedAt: stamp, version: 1, approvalState: 'DRAFT', provenance, ...changes,
  };
}
function composition(focusDuration = r(1, 1), duration = r(5, 1)) {
  const migrated = v2.migrateCompositionV1ToV2({
    schemaVersion: 1, projectId, compositionId, kind: 'SHOT', shotId: 'shot_trim_timeline', name: 'Fresh exact visual trim fixture',
    durationUs: 5_000_000, width: 1280, height: 720, revision: 13, approvalState: 'DRAFT', provenance,
    layers: [
      baseLayer('layer_background', 'Background', { type: 'IMAGE', source: { kind: 'ASSET', asset: { assetId: 'asset_background', version: 1 }, takeId: null }, durationUs: 5_000_000 }),
      baseLayer('layer_focus', 'Bakery clip'),
      baseLayer('layer_same_name', 'Bakery clip'),
      baseLayer('layer_locked', 'Locked clip', { locked: true }),
      baseLayer('layer_nested', 'Nested clip', { type: 'NESTED_COMPOSITION', source: { kind: 'COMPOSITION', compositionId: 'composition_nested' } }),
    ],
  });
  migrated.duration = duration;
  Object.assign(migrated.layers[0], { start: r(0, 1), duration });
  Object.assign(migrated.layers[1], { start: r(1, 3), duration: focusDuration, sourceOffset: r(0, 1) });
  Object.assign(migrated.layers[2], { start: r(2, 1), duration: r(1, 1), sourceOffset: r(1, 1) });
  Object.assign(migrated.layers[3], { start: r(7, 2), duration: r(1, 2), sourceOffset: r(0, 1) });
  Object.assign(migrated.layers[4], { start: r(4, 1), duration: r(1, 2), sourceOffset: r(0, 1) });
  return v2.validateCompositionV2(migrated);
}
function defensiveUnsupported(kind) {
  const value = composition();
  const layer = value.layers.find(item => item.layerId === 'layer_focus');
  if (kind === 'retimed') layer.playbackRate = 2;
  else if (kind === 'reversed') layer.reverse = true;
  else if (kind === 'animated') layer.keyframes = [{ property: 'opacity', timeUs: 0, value: 1, interpolation: 'LINEAR' }];
  else throw Error(`Unknown defensive fixture: ${kind}`);
  return value;
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
  throw Error(`Unexpected trim timeline dependency: ${name}`);
};
item._compile(compiled.outputText, filename);
const { FoundationCopyTimeline } = item.exports;

const runId = randomUUID(), startedAt = new Date().toISOString();
const evidence = path.join(frontend, '.codexforge/acceptance', `studio-editorial-v2-trim-timeline-tests-${runId}`);
fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const bindingNames = [...new Set([...loader.loaded, sourcePath, stylePath, 'scripts/test-animation-studio-editorial-v2-trim-timeline.mjs', 'scripts/animation-studio-test-loader.mjs'])].sort();
const sourceBindings = Object.fromEntries(bindingNames.map(name => [name, sha(fs.readFileSync(path.join(frontend, name)))]));
const plannedCases = 12;
retain('intent.json', { runId, startedAt, plannedCases, component: sourcePath, scope: 'Actual timeline TSX trim-handle handlers with deterministic hook/ref/pointer/ResizeObserver seams and fresh synthetic cases. Supplied widths are not measured DOM geometry. No browser, DOM event propagation, storage, server, native, provider or production claim.', sourceBindings });

function harness(overrides = {}) {
  const slots = [], pendingEffects = [], listeners = new Map(), observers = [], selected = [], moves = [], trims = [], opened = [], gestures = [], playheads = [], splits = [];
  let cursor = 0, tree;
  const scroller = { clientWidth: overrides.viewportWidth ?? 500, scrollLeft: overrides.initialScrollLeft ?? 0 };
  const canvas = {};
  const captures = new Set();
  const pointerTarget = {
    setPointerCapture(id) { captures.add(id); },
    hasPointerCapture(id) { return captures.has(id); },
    releasePointerCapture(id) { captures.delete(id); },
  };
  const props = {
    composition: composition(), headDigest: 'a'.repeat(64), workingCopyRevision: 17, selectedLayerId: 'layer_focus',
    selectionDisabled: false, dragDisabled: false, timelineFrameRate: r(25, 1), moveDraftStart: null, trimDraft: null, playhead: r(0, 1),
    ...overrides,
  };
  props.onSelectLayer ??= id => { selected.push(id); props.selectedLayerId = id; };
  props.onProposeMove ??= (layerId, start, authority) => moves.push({ layerId, start: clone(start), authority: clone(authority) });
  props.onProposeTrim ??= (layerId, edge, trimPoint, authority) => trims.push({ layerId, edge, trimPoint: clone(trimPoint), authority: clone(authority) });
  props.onOpenTrimControls ??= (layerId, edge) => opened.push({ layerId, edge });
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
  Object.defineProperty(globalThis, 'ResizeObserver', { configurable: true, writable: true, value: class {
    constructor(callback) { this.callback = callback; this.targets = new Set(); this.disconnected = false; observers.push(this); }
    observe(target) { this.targets.add(target); }
    disconnect() { this.targets.clear(); this.disconnected = true; }
  } });
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
  function nodes(root = tree) { return descendants(root); }
  function find(predicate, root = tree) { const matches = nodes(root).filter(predicate); assert.equal(matches.length, 1, `Expected one trim timeline node, found ${matches.length}.`); return matches[0]; }
  function button(label) { return find(node => node.type === 'button' && words(node) === label); }
  function bar(layerId) { return find(node => node.type === 'button' && node.props.className === 'timelineBar' && node.props['aria-label'].includes(`ID ${layerId};`)); }
  function handles(layerId = props.selectedLayerId) { return nodes().filter(node => node.type === 'button' && node.props['data-layer-id'] === layerId && (node.props['data-timeline-edge'] === 'IN' || node.props['data-timeline-edge'] === 'OUT')); }
  function handle(layerId, edge) { return find(node => node.type === 'button' && node.props['data-layer-id'] === layerId && node.props['data-timeline-edge'] === edge); }
  function pointer(node, handler, clientX, pointerId = 41, target = pointerTarget) {
    const event = {
      button: 0, isPrimary: true, pointerId, clientX, currentTarget: target, prevented: 0, stopped: 0,
      preventDefault() { this.prevented++; }, stopPropagation() { this.stopped++; },
    };
    assert.equal(typeof node.props[handler], 'function', `Missing ${handler} handler.`); node.props[handler](event); render(); return event;
  }
  function handlePointer(handler, layerId, edge, clientX, pointerId = 41) { return pointer(handle(layerId, edge), handler, clientX, pointerId); }
  function barPointer(handler, layerId, clientX, pointerId = 42) { return pointer(bar(layerId), handler, clientX, pointerId); }
  function handleClick(layerId, edge) {
    const event = { prevented: 0, stopped: 0, preventDefault() { this.prevented++; }, stopPropagation() { this.stopped++; } };
    const control = handle(layerId, edge); assert.equal(Boolean(control.props.disabled), false); control.props.onClick(event); render(); return event;
  }
  function click(label) { const control = button(label); assert.equal(Boolean(control.props.disabled), false, `Disabled timeline button: ${label}`); control.props.onClick(); render(); }
  function trigger(name, event = {}) { for (const callback of [...(listeners.get(name) ?? [])]) callback(event); render(); }
  function update(next) { Object.assign(props, next); render(); }
  function resize(width) { scroller.clientWidth = width; for (const observer of observers) if (observer.targets.has(scroller)) observer.callback([{ target: scroller, contentRect: { width } }]); render(); }
  function dispose() { for (const slot of slots) slot?.cleanup?.(); if (priorWindow) Object.defineProperty(globalThis, 'window', priorWindow); else delete globalThis.window; if (priorResizeObserver) Object.defineProperty(globalThis, 'ResizeObserver', priorResizeObserver); else delete globalThis.ResizeObserver; }
  render(); render();
  return { props, scroller, observers, pointerTarget, captures, selected, moves, trims, opened, gestures, playheads, splits, render, nodes, find, button, bar, handles, handle, handlePointer, barPointer, handleClick, click, trigger, resize, update, text: () => words(tree), dispose };
}
async function withHarness(overrides, run) { const h = harness(overrides); try { await run(h); } finally { h.dispose(); } }

const results = [];
async function test(name, run) { try { await run(); results.push({ name, status: 'PASS' }); } catch (error) { results.push({ name, status: 'FAIL', error: { name: error.name, message: error.message, stack: error.stack } }); } }
const authority = { headDigest: 'a'.repeat(64), revision: 17, compositionRevision: 13 };

await test('Selected eligible same-name layer exposes two stable-ID sibling trim handles without changing saved order', async () => withHarness({}, h => {
  const before = h.props.composition.layers.map(layer => layer.layerId), controls = h.handles('layer_focus');
  assert.equal(controls.length, 2); assert.deepEqual(controls.map(node => node.props['data-timeline-edge']).sort(), ['IN', 'OUT']);
  assert.equal(h.handles('layer_same_name').length, 0); assert.deepEqual(h.props.composition.layers.map(layer => layer.layerId), before);
  for (const control of controls) { assert.equal(h.nodes(h.bar('layer_focus')).includes(control), false, 'Handle buttons must be siblings, never nested inside the body button.'); }
  const labels = h.nodes().filter(node => node.type === 'button' && node.props.className !== 'timelineBar' && node.props['aria-pressed'] !== undefined && /^Bakery clip/u.test(words(node)));
  assert.equal(labels.length, 2); labels.find(node => words(node).includes('layer_same_name')).props.onClick(); h.render();
  assert.deepEqual(h.selected, ['layer_same_name']); assert.equal(h.handles('layer_focus').length, 0); assert.equal(h.handles('layer_same_name').length, 2);
}));

await test('IN handle plus one frame creates only the exact local 28/75 proposal from an immutable saved interval', async () => withHarness({}, h => {
  const saved = clone(h.props.composition.layers.find(layer => layer.layerId === 'layer_focus')), savedStyle = clone(h.bar('layer_focus').props.style);
  const down = h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); assert.ok(down.prevented > 0); assert.ok(down.stopped > 0); assert.deepEqual(h.gestures, [true]); assert.equal(h.captures.has(41), true); assert.equal(h.trims.length, 0);
  h.handlePointer('onPointerMove', 'layer_focus', 'IN', 104); assert.equal(h.trims.length, 0); assert.match(h.text(), /28\s*\/\s*75/); assert.deepEqual(h.bar('layer_focus').props.style, savedStyle);
  h.handlePointer('onPointerUp', 'layer_focus', 'IN', 104); assert.deepEqual(h.trims, [{ layerId: 'layer_focus', edge: 'IN', trimPoint: r(28, 75), authority }]);
  assert.deepEqual(h.gestures, [true, false]); assert.equal(h.captures.size, 0); assert.deepEqual(h.props.composition.layers.find(layer => layer.layerId === 'layer_focus'), saved);
  assert.deepEqual(v2.trimLayerV2Time(saved, 'IN', r(28, 75)), { start: r(28, 75), duration: r(24, 25), sourceOffset: r(1, 25) }); assert.equal(h.moves.length, 0); assert.equal(h.playheads.length, 0); assert.equal(h.opened.length, 0);
}));

await test('OUT handle minus one frame creates only the exact local 97/75 proposal and preserves the original start and source-in', async () => withHarness({}, h => {
  const saved = clone(h.props.composition.layers.find(layer => layer.layerId === 'layer_focus'));
  h.handlePointer('onPointerDown', 'layer_focus', 'OUT', 100); h.handlePointer('onPointerMove', 'layer_focus', 'OUT', 96); assert.match(h.text(), /97\s*\/\s*75/);
  h.handlePointer('onPointerUp', 'layer_focus', 'OUT', 96); assert.deepEqual(h.trims, [{ layerId: 'layer_focus', edge: 'OUT', trimPoint: r(97, 75), authority }]);
  assert.deepEqual(v2.trimLayerV2Time(saved, 'OUT', r(97, 75)), { start: r(1, 3), duration: r(24, 25), sourceOffset: r(0, 1) }); assert.deepEqual(h.props.composition.layers.find(layer => layer.layerId === 'layer_focus'), saved); assert.equal(h.moves.length, 0); assert.equal(h.playheads.length, 0);
}));

await test('Shared nearest-even rounding uses the immutable origin at fit and zoomed-scrolled coordinates', async () => {
  for (const [edge, delta] of [['IN', 2], ['OUT', -2]]) await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', edge, 100); h.handlePointer('onPointerUp', 'layer_focus', edge, 100 + delta); assert.equal(h.trims.length, 0, 'An exact half-frame rounds to even zero.'); });
  for (const [edge, delta, point] of [['IN', 6, r(31, 75)], ['OUT', -6, r(94, 75)]]) await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', edge, 100); h.handlePointer('onPointerUp', 'layer_focus', edge, 100 + delta); assert.deepEqual(h.trims[0].trimPoint, point, 'An exact one-and-a-half frame displacement rounds symmetrically to two frames.'); });
  await withHarness({}, h => {
    h.click('Zoom in'); h.click('Zoom in'); h.scroller.scrollLeft = 240; h.find(node => node.props?.role === 'region').props.onScroll({ currentTarget: h.scroller }); h.render();
    h.handlePointer('onPointerDown', 'layer_focus', 'IN', 310); h.handlePointer('onPointerMove', 'layer_focus', 'IN', 326); h.handlePointer('onPointerMove', 'layer_focus', 'IN', 342); h.handlePointer('onPointerMove', 'layer_focus', 'IN', 326); h.handlePointer('onPointerUp', 'layer_focus', 'IN', 326);
    assert.deepEqual(h.trims[0].trimPoint, r(28, 75), 'Every event is recomputed from the captured origin; rounded deltas never accumulate.');
  });
});

await test('Edge gestures are separated from body movement ruler seeking and post-drag handle clicks', async () => {
  await withHarness({}, h => {
    const down = h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.handlePointer('onPointerUp', 'layer_focus', 'IN', 104); assert.ok(down.stopped > 0); assert.equal(h.trims.length, 1); assert.equal(h.moves.length, 0); assert.equal(h.playheads.length, 0);
    const suppressed = h.handleClick('layer_focus', 'IN'); assert.ok(suppressed.stopped > 0); assert.equal(h.opened.length, 0, 'The synthetic click following a completed drag is suppressed.');
    const tap = h.handleClick('layer_focus', 'IN'); assert.ok(tap.stopped > 0); assert.deepEqual(h.opened, [{ layerId: 'layer_focus', edge: 'IN' }]); assert.equal(h.trims.length, 1);
  });
  await withHarness({}, h => {
    h.barPointer('onPointerDown', 'layer_focus', 100); h.barPointer('onPointerMove', 'layer_focus', 104); h.barPointer('onPointerUp', 'layer_focus', 104); assert.equal(h.moves.length, 1); assert.equal(h.trims.length, 0);
    const ruler = h.find(node => node.props?.className === 'timelineRuler'); ruler.props.onPointerDown({ button: 0, clientX: 250, currentTarget: { getBoundingClientRect: () => ({ left: 0, width: 500 }) } }); h.render(); assert.equal(h.playheads.length, 1); assert.equal(h.trims.length, 0);
  });
});

await test('No-op outward and crossing gestures reject without clamping while an invalid ghost can return to a valid exact point', async () => {
  for (const [edge, endX] of [['IN', 100], ['OUT', 100], ['IN', 96], ['OUT', 104], ['IN', 200], ['OUT', 0]]) await withHarness({}, h => {
    h.handlePointer('onPointerDown', 'layer_focus', edge, 100); h.handlePointer('onPointerMove', 'layer_focus', edge, endX); h.handlePointer('onPointerUp', 'layer_focus', edge, endX); assert.equal(h.trims.length, 0); assert.equal(h.moves.length, 0); assert.match(h.text(), endX === 100 ? /No (?:trim )?draft was created/iu : /rejected|outside|cross/iu);
  });
  await withHarness({}, h => {
    h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.handlePointer('onPointerMove', 'layer_focus', 'IN', 200); assert.match(h.text(), /rejected|cross/iu); h.handlePointer('onPointerMove', 'layer_focus', 'IN', 104); assert.match(h.text(), /28\s*\/\s*75/); h.handlePointer('onPointerUp', 'layer_focus', 'IN', 104); assert.deepEqual(h.trims[0].trimPoint, r(28, 75));
  });
});

await test('Visual handles enforce selected direct-video eligibility while unsupported rates retain the numeric-control path', async () => {
  await withHarness({ selectedLayerId: 'layer_locked' }, h => { const controls = h.handles('layer_locked'); assert.equal(controls.length, 2); assert.ok(controls.every(control => control.props['aria-disabled'] === undefined && control.props['data-drag-disabled'] === 'true')); h.handlePointer('onPointerDown', 'layer_locked', 'IN', 100); assert.equal(h.gestures.length, 0); assert.equal(h.trims.length, 0); assert.match(h.text(), /locked/iu); });
  for (const layerId of ['layer_nested', 'layer_background']) await withHarness({ selectedLayerId: layerId }, h => { assert.equal(h.handles(layerId).length, 0); assert.match(h.text(), /selected supported video|exact numeric/iu); });
  for (const kind of ['retimed', 'reversed', 'animated']) await withHarness({ composition: defensiveUnsupported(kind) }, h => { const controls = h.handles('layer_focus'); assert.equal(controls.length, 2); assert.ok(controls.every(control => control.props['aria-disabled'] === undefined && control.props['data-drag-disabled'] === 'true')); h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); assert.equal(h.gestures.length, 0); assert.equal(h.trims.length, 0); assert.match(h.text(), /retimed|reversed|animated|exact numeric/iu); });
  for (const overrides of [{ dragDisabled: true }, { selectionDisabled: true }, { dragDisabled: true, trimDraft: { edge: 'IN', trimPoint: r(28, 75) } }]) await withHarness(overrides, h => {
    assert.equal(h.handles('layer_focus').length, 2); h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); assert.equal(h.gestures.length, 0); assert.equal(h.trims.length, 0); assert.equal(h.captures.size, 0); assert.match(h.text(), /finish|save|discard|operation|draft/iu);
  });
  await withHarness({ timelineFrameRate: null }, h => {
    const controls = h.handles('layer_focus'); assert.equal(controls.length, 2); for (const control of controls) assert.equal(control.props['aria-disabled'], undefined); for (const control of controls) assert.equal(control.props['data-drag-disabled'], 'true');
    h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); assert.equal(h.gestures.length, 0); assert.equal(h.trims.length, 0); assert.match(h.text(), /no unambiguous supported saved frame rate|exact numeric/iu);
    const click = h.handleClick('layer_focus', 'IN'); assert.ok(click.stopped > 0); assert.deepEqual(h.opened, [{ layerId: 'layer_focus', edge: 'IN' }]);
  });
});

await test('Escape pointercancel lost capture and unmount release ownership without a trim proposal', async () => {
  await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.handlePointer('onPointerMove', 'layer_focus', 'IN', 104); h.handlePointer('onPointerCancel', 'layer_focus', 'IN', 104); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.equal(h.captures.size, 0); });
  await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', 'OUT', 100); let prevented = 0; h.trigger('keydown', { key: 'Escape', preventDefault() { prevented++; } }); assert.equal(prevented, 1); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.equal(h.captures.size, 0); });
  await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.handlePointer('onLostPointerCapture', 'layer_focus', 'IN', 104); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.equal(h.captures.size, 0); });
  const h = harness(); h.handlePointer('onPointerDown', 'layer_focus', 'OUT', 100); h.dispose(); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.equal(h.captures.size, 0);
});

await test('Scroll zoom resize selection and authority changes cancel captured coordinate or publication authority', async () => {
  await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.scroller.scrollLeft = 20; h.find(node => node.props?.role === 'region').props.onScroll({ currentTarget: h.scroller }); h.render(); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.match(h.text(), /scrolled/iu); });
  await withHarness({}, h => { const zoom = h.button('Zoom in'); h.handlePointer('onPointerDown', 'layer_focus', 'OUT', 100); zoom.props.onClick(); h.render(); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.match(h.text(), /zoom/iu); });
  await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.scroller.clientWidth = 480; h.trigger('resize'); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.match(h.text(), /viewport/iu); });
  await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', 'OUT', 100); h.update({ selectedLayerId: 'layer_same_name' }); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.match(h.text(), /selection|selected layer/iu); });
  await withHarness({}, h => { h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.update({ headDigest: 'b'.repeat(64), workingCopyRevision: 18 }); assert.deepEqual(h.gestures, [true, false]); assert.equal(h.trims.length, 0); assert.match(h.text(), /head|authority|revision/iu); });
});

await test('Handles expose linked edge and coordinate names plus a usable short-bar numeric path without network', async () => withHarness({ composition: composition(r(1, 1000), r(3600, 1)) }, h => {
  const section = h.find(node => node.type === 'section' && node.props['aria-label'] === 'Layer timeline'), controls = h.handles('layer_focus'); assert.equal(controls.length, 2);
  for (const id of section.props['aria-describedby'].split(' ')) assert.equal(h.nodes().filter(node => node.props?.id === id).length, 1);
  for (const control of controls) {
    assert.match(control.props['aria-label'], /Bakery clip/); assert.match(control.props['aria-label'], /layer_focus/); assert.match(control.props['aria-label'], /IN|OUT/); assert.match(control.props['aria-label'], /inward/iu); assert.match(control.props['aria-label'], /composition/iu);
    assert.equal(typeof control.props['aria-describedby'], 'string'); for (const id of control.props['aria-describedby'].split(' ')) assert.equal(h.nodes().filter(node => node.props?.id === id).length, 1);
  }
  const fallback = h.find(node => node.type === 'span' && node.props['data-short-bar-fallback'] === 'true');
  assert.equal(fallback.props.style.width, '48px'); assert.match(fallback.props.style.left, /^clamp\(0px, calc\(.+% - 24px\), calc\(100% - 48px\)\)$/u); assert.match(fallback.props.className, /timelineTrimShort/u);
  assert.ok(controls.every(control => control.props['data-short-bar-fallback'] === 'true' && control.props['data-drag-disabled'] === 'true' && control.props['aria-disabled'] === undefined));
  assert.ok(controls.every(control => /Visual dragging is unavailable/iu.test(control.props['aria-label'])));
  const body = h.bar('layer_focus'); assert.equal(h.nodes(body).some(node => controls.includes(node)), false); assert.equal(body.type, 'button');
  h.handleClick('layer_focus', 'IN'); h.handleClick('layer_focus', 'OUT'); assert.deepEqual(h.opened, [{ layerId: 'layer_focus', edge: 'IN' }, { layerId: 'layer_focus', edge: 'OUT' }]); assert.equal(h.trims.length, 0); assert.equal(networkAttempts.length, 0);
}));

await test('Panel-driven timeline resize cancels an in-flight trim without a window event or hidden publication', async () => withHarness({}, h => {
  const saved = JSON.stringify(h.props.composition);
  assert.equal(h.observers.length, 1); assert.equal(h.observers[0].targets.has(h.scroller), true);
  h.handlePointer('onPointerDown', 'layer_focus', 'IN', 100); h.resize(500);
  assert.deepEqual(h.gestures, [true], 'A same-width notification must retain gesture ownership.');
  h.resize(1000); h.handlePointer('onPointerUp', 'layer_focus', 'IN', 108);
  assert.deepEqual(h.gestures, [true, false]); assert.equal(h.captures.size, 0); assert.equal(h.trims.length, 0); assert.equal(h.moves.length, 0); assert.equal(h.opened.length, 0);
  assert.match(h.text(), /viewport changed/); assert.equal(JSON.stringify(h.props.composition), saved);
}));

await test('New IN and OUT gestures after observed resize keep exact one-frame trim timing and original source identity', async () => {
  for (const [width, pixels] of [[250, 2], [1000, 8]]) for (const [edge, direction, point] of [['IN', 1, r(28, 75)], ['OUT', -1, r(97, 75)]]) await withHarness({}, h => {
    const saved = JSON.stringify(h.props.composition); h.resize(width);
    assert.equal(h.find(node => node.props?.className === 'timelineCanvas').props.style.width, `${width}px`);
    h.handlePointer('onPointerDown', 'layer_focus', edge, 100); h.handlePointer('onPointerUp', 'layer_focus', edge, 100 + direction * pixels);
    assert.deepEqual(h.trims, [{ layerId: 'layer_focus', edge, trimPoint: point, authority }]);
    assert.equal(h.moves.length, 0); assert.equal(h.playheads.length, 0); assert.equal(h.opened.length, 0); assert.equal(JSON.stringify(h.props.composition), saved); assert.equal(networkAttempts.length, 0);
  });
});

assert.equal(results.length, plannedCases);
const sourceUnchanged = bindingNames.every(name => sha(fs.readFileSync(path.join(frontend, name))) === sourceBindings[name]);
const status = results.every(result => result.status === 'PASS') && results.length === plannedCases && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL';
retain('result.json', { runId, startedAt, finishedAt: new Date().toISOString(), status, planned: plannedCases, total: results.length, passed: results.filter(result => result.status === 'PASS').length, results, sourceUnchanged, sourceBindings, networkAttempts, browserExecution: false, domRendering: false, domGeometryMeasured: false, nativeExecution: false, providerRequests: 0, productionDataMutations: 0 });
console.log(JSON.stringify({ status, planned: plannedCases, total: results.length, passed: results.filter(result => result.status === 'PASS').length, evidence, sourceUnchanged, networkAttempts }));
if (status !== 'PASS') { console.error(JSON.stringify(results.filter(result => result.status !== 'PASS'), null, 2)); process.exitCode = 1; }
