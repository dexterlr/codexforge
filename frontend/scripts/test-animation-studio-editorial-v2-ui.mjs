// Actual new TSX event handlers with the installed React JSX runtime and narrow
// deterministic hook/session/fetch seams. Not browser, DOM, native or playback evidence.
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
const editorialTime = loader.load('@/lib/codexforge/animation-studio/editorial-time');
const { hashJarvisChatCanonicalJson: digest } = loader.load('@/lib/codexforge/jarvis-chat/jarvis-chat-crypto');
const componentBase = 'src/lib/codexforge/animation-studio/components/';
const componentPaths = ['EditorialWorkspacePanel', 'FoundationCopyPanel', 'BlenderSourcePanel'].map(name => componentBase + name + '.tsx');
const pagePath = 'src/app/animation-studio/page-client.tsx';
componentPaths.push(pagePath);
const componentSources = new Map(componentPaths.map(name => [name, fs.readFileSync(path.join(frontend, name), 'utf8')]));
const sha = value => createHash('sha256').update(value).digest('hex'), clone = value => JSON.parse(JSON.stringify(value));
const runId = randomUUID(), startedAt = new Date().toISOString();
const evidence = path.join(frontend, '.codexforge/acceptance', `studio-editorial-v2-ui-tests-${runId}`);
fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const projectId = 'project_v2_ui', compositionId = 'composition_v2_ui', shotId = 'shot_v2_ui';
const stamp = '2026-09-15T18:00:00.000Z', provenance = { kind: 'EDITORIAL_INSTRUCTION', providerRequests: 0 };
const endpoint = '/api/codexforge/animation-studio/editorial-v2';
const modeKey = `codexforge.studio.editorial.mode.v2.${projectId}`;
const pendingKey = `codexforge.studio.editorial.pending.v2.${projectId}`;
const draftKey = `codexforge.studio.editorial.draft.v2.${projectId}`;
const labels = { enter: 'Use source-bound working copy', leave: 'Return to original editor', create: 'Create working copy', save: 'Save working-copy properties', retry: 'Retry exact working-copy request', load: 'Load selected composition', refresh: 'Refresh source status', consent: 'I understand this copy becomes unavailable if the original changes.' };
const historyTargetLabels = { REPLACE_LAYER_TAKE: 'Take replacement', SET_LAYER_PROPERTIES: 'property change', MOVE_LAYER_TIME: 'move', TRIM_LAYER_TIME: 'trim', SPLIT_LAYER_TIME: 'split' };
function historyAction(command, targetOperation = null, changes = {}) {
  const available = targetOperation !== null;
  return { available, command, label: available ? `${command === 'UNDO_EDITORIAL_EDIT' ? 'Undo' : 'Redo'} ${historyTargetLabels[targetOperation]}` : command === 'UNDO_EDITORIAL_EDIT' ? 'Undo' : 'Redo', description: available ? `The server can ${command === 'UNDO_EDITORIAL_EDIT' ? 'undo' : 'redo'} the next ${historyTargetLabels[targetOperation]} as one new atomic edit.` : `No supported ${command === 'UNDO_EDITORIAL_EDIT' ? 'undo' : 'redo'} action is available at this saved history position.`, targetOperation, compositionId: available ? compositionId : null, compositionRevision: available ? 1 : null, ...changes };
}
function historyState(changes = {}) { return { state: 'ACTIVE', undo: historyAction('UNDO_EDITORIAL_EDIT'), redo: historyAction('REDO_EDITORIAL_EDIT'), ...changes }; }
function composition() {
  const base = { schemaVersion: 1, compositionId, projectId, kind: 'SHOT', shotId, name: 'Independent source-bound test composition', durationUs: 4_000_000, width: 1280, height: 720, revision: 1, approvalState: 'DRAFT', provenance };
  const layer = { schemaVersion: 1, layerId: 'layer_v2_ui', compositionId, name: 'Original source layer', type: 'IMAGE', source: { kind: 'ASSET', asset: { assetId: 'asset_v2_ui', version: 1 }, takeId: null }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 4_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: contract.defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: 'DRAFT', provenance };
  return v2.migrateCompositionV1ToV2({ ...base, layers: [layer, { ...clone(layer), layerId: 'layer_v2_locked', name: 'Saved locked layer', locked: true }] });
}
function sourceState(state = 'READY', persisted = true) { return { projectId, projectRevision: 3, legacyRevision: persisted ? 2 : 0, legacyPersisted: persisted, compositions: [{ compositionId, name: 'Independent source-bound test composition', kind: 'SHOT' }], takeCatalogue: [], audioCatalogue: [], workingCopy: { state, revision: state === 'READY' ? 1 : null, headDigest: state === 'READY' ? 'a'.repeat(64) : null }, providerRequests: 0, generationAllowed: false }; }
const nativePendingKey = `codexforge.studio.blender.pending.v1.${projectId}`;
function nativeSource() { return { assetId: 'asset_blender_source_ui', version: 1, descriptor: { format: 'studio-blender-source-v1', catalogueId: 'approved-fixture', label: 'Explicit v004 technical proxy test source — not character approval', source: { originalPath: 'C:\\synthetic-ui-fixture\\v004-proxy.blend', relativeName: 'v004-proxy.blend', byteLength: 1234, sha256: 'd'.repeat(64) }, dependencies: [], inspection: { schemaVersion: 1, blenderVersion: '4.5.0', supported: true, scenes: [{ name: 'TestScene', cameras: ['LockedCamera'], activeCamera: 'LockedCamera', frameStart: 1, frameEnd: 200, fps: 25, fpsBase: 1 }] } } }; }
function nativeState(jobs = []) { return { projectId, shotId, projectRevision: 3, enabled: true, unavailable: null, inspectionRecovery: false, catalogue: [{ sourceId: 'approved-fixture', label: nativeSource().descriptor.label, version: 1, lineage: 'Synthetic UI-only test, not native evidence' }], sources: [nativeSource()], jobs, previewMode: 'Synthetic UI-only state; no native execution.' }; }
function nativeJob(phase = 'COMPLETED') {
  const tool = { path: 'C:\\synthetic-ui-fixture\\tool.exe', sha256: 'e'.repeat(64) };
  return { jobId: 'job_blender_ui', state: phase === 'COMPLETED' ? 'SUCCEEDED' : phase === 'PREPARED' ? 'QUEUED' : 'RUNNING', execution: { format: 'studio-blender-execution-v1', phase, preparedRevision: 3, progress: null, specDigest: 'c'.repeat(64), spec: { format: 'studio-blender-render-spec-v1', projectId, shotId, source: { assetId: nativeSource().assetId, version: 1 }, descriptorHash: 'f'.repeat(64), blendSha256: nativeSource().descriptor.source.sha256, dependenciesDigest: '1'.repeat(64), settings: { profile: 'BLENDER_PREVIEW_720P25_V1', scene: 'TestScene', camera: 'LockedCamera', frameStart: 76, frameEnd: 150, width: 1280, height: 720, fps: 25, adapterVersion: 'synthetic-ui-only-v1', blender: { ...tool, version: '4.5.0' }, ffmpeg: tool, ffprobe: tool, scriptHashes: { inspect: '2'.repeat(64), render: '3'.repeat(64) }, colourTransform: 'Synthetic UI-only colour description' } } }, active: phase === 'RUNNING', interrupted: false, progress: null, error: null, outputs: phase === 'COMPLETED' ? [{ assetId: 'asset_blender_ui', version: 1 }] : [] };
}
function summary(revision = 1) { return { revision, headDigest: (revision === 1 ? 'a' : 'b').repeat(64), at: stamp, integrityScope: 'HEAD_AND_CURRENT_COMMIT', generationAllowed: false, providerRequests: 0 }; }
function selected(history = historyState()) { return { ...summary(), integrityScope: 'SELECTED_COMPOSITION_DIRECT_REFERENCES_AND_ACTIVE_HISTORY', nestedCompositionResolution: 'NOT_LOADED', composition: composition(), takes: [], media: [{ assetId: 'asset_v2_ui', version: 1, status: 'UNCHECKED' }], history, timelineFrameRate: { numerator: 25, denominator: 1 } }; }
const envelope = result => ({ ok: true, result: clone(result), generation: 'LOCKED', providerRequests: 0 });
const unavailable = { status: 503, payload: { ok: false, error: { code: 'editorial_v2_unavailable', message: 'Synthetic source anchor unavailable; exact recovery remains required.' } } };
const pending = (body = { operation: 'SET_LAYER_PROPERTIES', projectId, expectedRevision: 1, expectedCompositionRevision: 1, compositionId, layerId: 'layer_v2_ui', requestedAt: stamp, changes: { opacity: 0.25, enabled: true, transform: contract.defaultLayerTransform() } }) => ({ projectId, key: randomUUID(), body: JSON.stringify(body) });
function descendants(node) { if (Array.isArray(node)) return node.flatMap(descendants); if (!node || typeof node !== 'object' || !('props' in node)) return []; return [node, ...descendants(node.props.children)]; }
function words(node) { if (node == null || typeof node === 'boolean') return ''; if (Array.isArray(node)) return node.map(words).join(''); if (typeof node !== 'object') return String(node); return words(node.props?.children); }
// A narrow JSX-tree name seam, not a browser accessibility-name computation.
const controlName = node => node.props?.['aria-label'] ?? words(node);
function OriginalSeam() { throw Error('Original editor seam is identified, never executed.'); }
function FoundationSeam() { throw Error('Foundation child seam is identified, never executed.'); }
function ViewerSeam() { throw Error('Viewer child seam is identified, never executed; separately tested.'); }
function SavedHeadRenderSeam() { throw Error('Saved-head render child seam is identified, never executed; separately tested.'); }
function BlenderSourceSeam() { throw Error('Native Blender child seam is identified, never executed; this parent suite grants no render or native-I/O authority.'); }
function ShellSeam() { throw Error('Navigation shell seam is identified, never executed.'); }
function FootageSeam() { throw Error('Import controller seam is identified, never executed; no file transfer.'); }
function EditorialSeam() { throw Error('Editorial controller seam is identified, never executed; separately tested.'); }
const openedPaths = new Set(componentPaths), results = [];
const boundSources = new Map();
function bindSources() {
  for (const name of [...loader.loaded, ...openedPaths, 'scripts/test-animation-studio-editorial-v2-ui.mjs', 'scripts/animation-studio-test-loader.mjs']) {
    if (!boundSources.has(name)) boundSources.set(name, sha(fs.readFileSync(path.join(frontend, name))));
  }
}
bindSources();
retain('intent.json', { runId, startedAt, componentBindings: componentPaths.map(name => ({ path: name, sha256: boundSources.get(name) })), scope: 'Nonformal synthetic UI source-handler regressions only. Fresh retained evidence; no native, browser, provider or production activity.' });
function harness(kind = 'FoundationCopyPanel', options = {}) {
  const session = options.session ?? new Map(), slots = [], effects = [], timers = new Map(), listeners = new Map(), calls = [], busy = [], events = [];
  let cursor = 0, timerId = 0, tree, source = clone(options.source ?? sourceState()), view = clone(options.view ?? selected());
  const faults = options.faults ?? {}, replies = [...(options.replies ?? [])];
  const props = { projectId, shotId, revision: 1, headDigest: 'a'.repeat(64), onTakeUsed() { events.push({ kind: 'take-used' }); }, disabled: false, compositionId: options.compositionId ?? compositionId, onCompositionChange(value) { props.compositionId = value; events.push({ kind: 'composition', value }); }, onBusyChange(value) { busy.push(value); events.push({ kind: 'busy', value }); }, ...options.props };
  const changed = (deps, prior) => !prior || deps.length !== prior.dependencies.length || deps.some((value, index) => !Object.is(value, prior.dependencies[index]));
  const hooks = {
    useState(initial) { const index = cursor++; if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial; return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }]; },
    useRef(initial) { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    useCallback(callback, dependencies) { const index = cursor++; if (changed(dependencies, slots[index])) slots[index] = { dependencies, callback }; return slots[index].callback; },
    useMemo(callback, dependencies) { const index = cursor++; if (changed(dependencies, slots[index])) slots[index] = { dependencies, value: callback() }; return slots[index].value; },
    useEffect(callback, dependencies) { const index = cursor++, previous = slots[index]; if (changed(dependencies, previous)) effects.push(() => { previous?.cleanup?.(); slots[index] = { dependencies, cleanup: callback() }; }); },
  };
  const isPage = kind === 'AnimationStudioPageClient';
  const isNative = kind === 'BlenderSourcePanel';
  // Presentation-only native dialog/ref seam: no DOM, layout or browser focus claim.
  const dialogNode = { open: false, showModal() { this.open = true; events.push({ kind: 'dialog-open' }); }, close() { if (!this.open) return; this.open = false; events.push({ kind: 'dialog-close' }); descendants(tree).find(node => node.type === 'dialog').props.onClose(); } };
  const triggerNode = { focus(options) { events.push({ kind: 'dialog-trigger-focus', options }); } };
  const relative = isPage ? pagePath : componentBase + kind + '.tsx', filename = path.join(frontend, relative), compiled = ts.transpileModule(componentSources.get(relative), { fileName: filename, reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  assert.equal((compiled.diagnostics ?? []).filter(item => item.category === ts.DiagnosticCategory.Error).length, 0);
  const jsxRuntime = Module.createRequire(filename)('react/jsx-runtime'), item = new Module(filename); item.filename = filename;
  item.require = name => {
    if (name === 'react') return hooks;
    if (name === 'react/jsx-runtime') return jsxRuntime;
    if (name === './CompositionPanel') return { CompositionPanel: OriginalSeam };
    if (name === './FoundationCopyPanel') return { FoundationCopyPanel: FoundationSeam };
    if (name === './FoundationCopyViewer') return { FoundationCopyViewer: ViewerSeam };
    if (name === './SavedHeadRenderPanel') return { SavedHeadRenderPanel: SavedHeadRenderSeam };
    if (name === './BlenderSourcePanel') return { BlenderSourcePanel: BlenderSourceSeam };
    if (name === '@/lib/codexforge/navigation-shell/components/CodexForgeAppShell') return { CodexForgeAppShell: ShellSeam };
    if (name === '@/lib/codexforge/animation-studio/components/FootageImportPanel') return { FootageImportPanel: FootageSeam };
    if (name === '@/lib/codexforge/animation-studio/components/EditorialWorkspacePanel') return { EditorialWorkspacePanel: EditorialSeam };
    if (name === '@/lib/codexforge/animation-studio/domain') return loader.load(name);
    if (name.endsWith('.module.css')) { openedPaths.add(path.relative(frontend, path.resolve(path.dirname(filename), name)).split(path.sep).join('/')); return new Proxy({}, { get: (_, key) => String(key) }); }
    if (name.startsWith('../')) return loader.load('@/lib/codexforge/animation-studio/' + name.slice(3));
    throw Error(`Unexpected component dependency: ${name}`);
  };
  item._compile(compiled.outputText, filename);
  bindSources();
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window'), oldSession = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage'), oldLocal = Object.getOwnPropertyDescriptor(globalThis, 'localStorage'), oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document'), blockedFetch = globalThis.fetch;
  globalThis.window = { setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; }, clearTimeout(id) { timers.delete(id); }, setInterval(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; }, clearInterval(id) { timers.delete(id); }, addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); }, removeEventListener(name, callback) { listeners.get(name)?.delete(callback); } };
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: {
    getItem(key) { if (faults.get && (!faults.key || key === faults.key)) throw Error('Synthetic session read denied.'); events.push({ kind: 'get', key }); return session.get(key) ?? null; },
    setItem(key, value) { if (faults.set && (!faults.key || key === faults.key)) throw Error('Synthetic session publication denied.'); session.set(key, value); events.push({ kind: 'set', key, value }); },
    removeItem(key) { if (faults.remove && (!faults.key || key === faults.key)) throw Error('Synthetic session removal denied.'); session.delete(key); events.push({ kind: 'remove', key }); },
  } });
  if (isPage) {
    const local = new Map([['codexforge.studio.selected.v1', projectId]]);
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: key => local.get(key) ?? null, setItem: (key, value) => local.set(key, value) } });
    Object.defineProperty(globalThis, 'document', { configurable: true, value: { addEventListener() {}, removeEventListener() {} } });
  }
  globalThis.fetch = async (url, init = {}) => {
    const parsed = new URL(url, 'http://synthetic.invalid'), method = init.method ?? 'GET';
    assert.equal(parsed.origin, 'http://synthetic.invalid'); assert.equal(parsed.pathname, isPage ? '/api/codexforge/animation-studio' : isNative ? '/api/codexforge/animation-studio/blender' : endpoint); assert.equal(init.credentials, 'same-origin');
    const headers = new Headers(init.headers); assert.equal(headers.get('X-CodexForge-Animation-Studio'), 'local-operator-v1');
    const call = { url, method, headers: Object.fromEntries(headers), body: init.body ?? null, pendingBeforeRequest: session.get(isNative ? nativePendingKey : pendingKey) ?? null }; calls.push(call); events.push({ kind: 'fetch', method });
    if (isNative) {
      if (method === 'GET') { if (options.failNativeGetAfterPost && calls.some(value => value.method === 'POST')) throw Error('Synthetic post-commit status outage.'); return Response.json(envelope(options.nativeState ?? nativeState())); }
      assert.equal(method, 'POST'); assert.ok(replies.length, 'No unexpected or automatic native action is allowed.');
      const retained = JSON.parse(call.pendingBeforeRequest); assert.deepEqual(retained.body, JSON.parse(call.body)); assert.equal(retained.key, headers.get('Idempotency-Key'));
      const reply = replies.shift(); if (reply === 'throw') throw Error('Synthetic lost native response.');
      return Response.json(reply.payload, { status: reply.status ?? 200 });
    }
    if (isPage) {
      assert.equal(method, 'GET', 'Workspace view changes must never publish a project command.');
      if (options.getFailure) return Response.json(options.getFailure.payload, { status: options.getFailure.status });
      const project = { projectId, title: 'Saved synthetic workspace', description: 'Retain this project brief.', revision: 3 };
      return Response.json({ ok: true, result: { projects: [project], snapshot: { project, shots: [], approvals: [], events: [], assets: [], recordDigest: 'a'.repeat(64) }, executionPolicy: {} } });
    }
    if (method === 'GET') {
      assert.equal(parsed.searchParams.get('projectId'), projectId);
      if (options.getOverride) return options.getOverride();
      if (options.getFailure) return Response.json(options.getFailure.payload, { status: options.getFailure.status });
      return Response.json(envelope(parsed.searchParams.has('compositionId') ? view : source));
    }
    assert.equal(method, 'POST'); assert.ok(replies.length, 'Unexpected or automatic POST is forbidden.');
    const retained = JSON.parse(call.pendingBeforeRequest); assert.equal(retained.body, call.body); assert.equal(retained.key, headers.get('Idempotency-Key')); assert.equal(retained.projectId, projectId);
    const reply = replies.shift(); if (reply === 'throw') throw Error('Synthetic lost response.');
    if (reply === 'waitForAbort') return new Promise((resolve, reject) => { assert.ok(init.signal); const abort = () => reject(new DOMException('Synthetic bounded waiting cancelled.', 'AbortError')); if (init.signal.aborted) abort(); else init.signal.addEventListener('abort', abort, { once: true }); });
    if (reply !== 'success') return Response.json(reply.payload, { status: reply.status ?? 200 });
    const body = JSON.parse(call.body);
    assert.equal(body.projectId, projectId); assert.ok(['COPY_V1_TO_V2', 'REPLACE_LAYER_TAKE', 'SET_LAYER_PROPERTIES', 'MOVE_LAYER_TIME', 'TRIM_LAYER_TIME', 'SPLIT_LAYER_TIME', 'UNDO_EDITORIAL_EDIT', 'REDO_EDITORIAL_EDIT'].includes(body.operation));
    const nextRevision = body.operation === 'COPY_V1_TO_V2' ? 1 : view.revision + 1;
    if (body.operation === 'SET_LAYER_PROPERTIES') { assert.equal(body.compositionId, compositionId); const layer = view.composition.layers.find(value => value.layerId === body.layerId); Object.assign(layer, body.changes); layer.version++; layer.updatedAt = body.requestedAt; view.composition.revision++; view.composition = v2.validateCompositionV2(view.composition); }
    if (body.operation === 'MOVE_LAYER_TIME') { assert.equal(body.compositionId, compositionId); const layer = view.composition.layers.find(value => value.layerId === body.layerId); layer.start = clone(body.start); layer.version++; layer.updatedAt = body.requestedAt; view.composition.revision++; view.composition = v2.validateCompositionV2(view.composition); }
    if (body.operation === 'TRIM_LAYER_TIME') { assert.equal(body.compositionId, compositionId); const layer = view.composition.layers.find(value => value.layerId === body.layerId); Object.assign(layer, v2.trimLayerV2Time(layer, body.edge, body.trimPoint)); layer.version++; layer.updatedAt = body.requestedAt; view.composition.revision++; view.composition = v2.validateCompositionV2(view.composition); }
    if (body.operation === 'SPLIT_LAYER_TIME') { assert.equal(body.compositionId, compositionId); const index = view.composition.layers.findIndex(value => value.layerId === body.layerId), layer = view.composition.layers[index], timing = v2.splitLayerV2Time(layer, body.splitPoint); assert.ok(index >= 0); const requestDigest = digest({ format: 'studio-editorial-request-v2', input: body, actor: 'local-studio-editorial-v2-operator' }); const left = { ...layer, ...timing.left, version: layer.version + 1, updatedAt: body.requestedAt }, right = { ...layer, ...timing.right, layerId: `layer_split_${requestDigest}`, version: 1, createdAt: body.requestedAt, updatedAt: body.requestedAt }; view.composition.layers.splice(index, 1, left, right); view.composition.revision++; view.composition = v2.validateCompositionV2(view.composition); }
    if (body.operation === 'REPLACE_LAYER_TAKE') {
      assert.equal(body.expectedHeadDigest, view.headDigest); assert.equal(body.layerId, 'layer_v2_ui'); assert.equal(body.takeId, 'take_replacement_ui_new');
      const layer = view.composition.layers.find(value => value.layerId === body.layerId), ref = { assetId: 'asset_replacement_ui_new', version: 1 };
      layer.source = { kind: 'ASSET', asset: ref, takeId: body.takeId }; layer.version++; layer.updatedAt = body.requestedAt; view.composition.revision++;
      view.takes = [{ schemaVersion: 1, takeId: body.takeId, projectId, shotId, source: ref, name: 'New native version result', createdAt: stamp, review: { state: 'UNREVIEWED', note: '', reviewedAt: null } }];
      view.media.push({ ...ref, status: 'UNCHECKED' }); view.composition = v2.validateCompositionV2(view.composition);
    }
    if (body.operation === 'UNDO_EDITORIAL_EDIT' || body.operation === 'REDO_EDITORIAL_EDIT') { const action = body.operation === 'UNDO_EDITORIAL_EDIT' ? view.history.undo : view.history.redo; assert.equal(body.compositionId, action.compositionId); assert.equal(body.expectedHeadDigest, view.headDigest); assert.equal(body.expectedCompositionRevision, action.compositionRevision); if (body.compositionId === view.composition.compositionId) { view.composition.revision++; view.composition = v2.validateCompositionV2(view.composition); } view.history = clone(options.historyAfter ?? historyState()); }
    else if (body.operation !== 'COPY_V1_TO_V2') view.history = historyState({ undo: historyAction('UNDO_EDITORIAL_EDIT', body.operation, { compositionRevision: view.composition.revision }) });
    const committed = { ...summary(nextRevision), at: body.requestedAt };
    source = sourceState(); source.workingCopy = { state: 'READY', revision: nextRevision, headDigest: committed.headDigest }; view = { ...view, ...committed, integrityScope: 'SELECTED_COMPOSITION_DIRECT_REFERENCES_AND_ACTIVE_HISTORY' };
    return Response.json(envelope(committed));
  };
  function render() { cursor = 0; tree = item.exports[isPage ? 'default' : kind](props); if (isNative) { descendants(tree).find(node => node.type === 'dialog').props.ref.current = dialogNode; descendants(tree).find(node => node.type === 'button' && controlName(node) === 'Open Blender plan').props.ref.current = triggerNode; } while (effects.length) effects.shift()(); return tree; }
  function find(predicate, root = tree) { const matches = descendants(root).filter(predicate); assert.equal(matches.length, 1, `Expected unique selector, found ${matches.length}: ${String(predicate)}`); return matches[0]; }
  const button = label => find(node => node.type === 'button' && controlName(node) === label);
  async function settle() { for (let i = 0; i < 8; i++) { for (const [id, timer] of [...timers]) if (timer.delay === 0) { timers.delete(id); timer.callback(); } await nextTask(); render(); } }
  async function click(label) { const control = button(label); assert.equal(controlDisabled(control), false, `Disabled button: ${label}`); control.props.onClick(); await settle(); }
  function controlDisabled(control, node = tree, inherited = false, seen = new Set()) { if (Array.isArray(node)) { for (const item of node) { const found = controlDisabled(control, item, inherited, seen); if (found !== null) return found; } return null; } if (!node || typeof node !== 'object' || !node.props || seen.has(node)) return null; seen.add(node); const disabled = inherited || Boolean(node.props.disabled); if (node === control) return disabled; return controlDisabled(control, node.props.children ?? null, inherited || (node.type === 'fieldset' && Boolean(node.props.disabled)), seen); }
  function input(label, value) { const control = find(node => ['input', 'select'].includes(node.type) && node.props['aria-label'] === label); assert.equal(controlDisabled(control), false, `Disabled field: ${label}`); control.props.onChange({ target: { value: String(value), valueAsNumber: Number(value), checked: Boolean(value) } }); render(); }
  function checkbox(label, value) { const parent = find(node => node.type === 'label' && words(node) === label); const control = find(node => node.type === 'input' && node.props.type === 'checkbox', parent); assert.equal(Boolean(control.props.disabled), false); control.props.onChange({ target: { checked: value } }); render(); }
  function child(type) { return find(node => node.type === (type === 'original' ? OriginalSeam : FoundationSeam)); }
  async function trigger(name, event = {}) { for (const callback of [...(listeners.get(name) ?? [])]) callback(event); render(); await settle(); }
  function dispose() { for (const slot of slots) slot?.cleanup?.(); globalThis.fetch = blockedFetch; if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow); else delete globalThis.window; if (oldSession) Object.defineProperty(globalThis, 'sessionStorage', oldSession); else delete globalThis.sessionStorage; if (isPage) { if (oldLocal) Object.defineProperty(globalThis, 'localStorage', oldLocal); else delete globalThis.localStorage; if (oldDocument) Object.defineProperty(globalThis, 'document', oldDocument); else delete globalThis.document; } }
  render(); return { render, settle, click, input, checkbox, find, button, child, controlDisabled, props, calls, busy, events, session, faults, trigger, dispose, dialogNode, text: () => words(tree), tree: () => tree, posts: () => calls.filter(value => value.method === 'POST') };
}
async function test(name, run) { try { await run(); results.push({ name, status: 'PASS' }); } catch (error) { results.push({ name, status: 'FAIL', error: { name: error.name, message: error.message, stack: error.stack } }); } }
async function withHarness(kind, options, run) { const h = harness(kind, options); try { await run(h); } finally { h.dispose(); } }
async function loadCopy(h) { await h.settle(); await h.click(labels.load); h.input('Working-copy layer', 'layer_v2_ui'); }

await test('Mode initializes before either child and persisted copy mode never exposes the original editor', async () => {
  for (const value of [null, JSON.stringify({ projectId, mode: 'copy', compositionId })]) {
    const session = new Map(value ? [[modeKey, value]] : []);
    await withHarness('EditorialWorkspacePanel', { session }, async h => {
      assert.equal(descendants(h.tree()).some(node => node.type === OriginalSeam || node.type === FoundationSeam), false);
      await h.settle(); assert.ok(h.child(value ? 'copy' : 'original')); assert.equal(h.calls.length, 0);
      if (value) assert.equal(h.busy.at(-1), true);
    });
  }
});
await test('Entering persists mode before child switch and old cleanup cannot release parent protection', async () => {
  await withHarness('EditorialWorkspacePanel', {}, async h => {
    await h.settle(); const original = h.child('original'); assert.equal(typeof original.props.onReadyChange, 'function'); original.props.onBusyChange(false); h.render(); assert.equal(h.button(labels.enter).props.disabled, true); assert.equal(h.busy.at(-1), true);
    original.props.onReadyChange(true); original.props.onBusyChange(true); h.render(); assert.equal(h.button(labels.enter).props.disabled, true);
    original.props.onBusyChange(false); h.render(); await h.click(labels.enter);
    assert.equal(JSON.parse(h.session.get(modeKey)).mode, 'copy'); assert.ok(h.child('copy')); assert.equal(h.busy.at(-1), true);
    original.props.onBusyChange(false); original.props.onReadyChange(false); h.render(); assert.equal(h.busy.at(-1), true);
    const copyChild = h.child('copy'); copyChild.props.onBusyChange(true); h.render(); assert.equal(h.button(labels.leave).props.disabled, true);
    copyChild.props.onBusyChange(false); h.render(); await h.click(labels.leave); assert.equal(JSON.parse(h.session.get(modeKey)).mode, 'original'); assert.ok(h.child('original'));
  });
});
await test('Retained copy request overrides original mode and an active project operation prevents entry', async () => {
  const raw = JSON.stringify(pending()), session = new Map([[modeKey, JSON.stringify({ projectId, mode: 'original', compositionId })], [pendingKey, raw]]);
  await withHarness('EditorialWorkspacePanel', { session }, async h => { assert.equal(descendants(h.tree()).some(node => node.type === OriginalSeam), false); await h.settle(); assert.ok(h.child('copy')); assert.equal(JSON.parse(session.get(modeKey)).mode, 'copy'); assert.equal(session.get(pendingKey), raw); assert.equal(h.busy.at(-1), true); });
  await withHarness('EditorialWorkspacePanel', { props: { disabled: true } }, async h => { await h.settle(); const original = h.child('original'); original.props.onReadyChange(true); original.props.onBusyChange(false); h.render(); assert.equal(h.button(labels.enter).props.disabled, true); h.button(labels.enter).props.onClick(); await h.settle(); assert.ok(h.child('original')); });
});
await test('Mode storage failure prevents entry and malformed/unreadable modes never mount the original', async () => {
  await withHarness('EditorialWorkspacePanel', { faults: { set: true, key: modeKey } }, async h => { await h.settle(); h.child('original').props.onReadyChange?.(true); h.child('original').props.onBusyChange(false); h.render(); await h.click(labels.enter); assert.ok(h.child('original')); assert.equal(h.session.has(modeKey), false); });
  for (const raw of ['{', '{}', JSON.stringify({ projectId: 'project_other', mode: 'copy', compositionId }), ' '.repeat(2048) + JSON.stringify({ projectId, mode: 'copy', compositionId })]) await withHarness('EditorialWorkspacePanel', { session: new Map([[modeKey, raw]]) }, async h => { await h.settle(); assert.equal(descendants(h.tree()).some(node => node.type === OriginalSeam), false); assert.equal(h.busy.at(-1), true); assert.equal(h.session.get(modeKey), raw); });
  await withHarness('EditorialWorkspacePanel', { faults: { get: true } }, async h => { await h.settle(); assert.equal(descendants(h.tree()).some(node => node.type === OriginalSeam), false); assert.equal(h.busy.at(-1), true); });
});
await test('Creation requires proven absent copy, persisted source and explicit consent; mounting never POSTs', async () => {
  await withHarness('FoundationCopyPanel', { source: sourceState('NOT_CREATED'), replies: ['success'] }, async h => {
    await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.button(labels.create).props.disabled, true);
    h.checkbox(labels.consent, true); await h.click(labels.create); const body = JSON.parse(h.posts()[0].body);
    assert.deepEqual(Object.keys(body).sort(), ['expectedEditorialRevision', 'expectedProjectRevision', 'operation', 'projectId', 'requestedAt']); assert.equal(body.operation, 'COPY_V1_TO_V2'); assert.equal(body.expectedEditorialRevision, 2); assert.equal(body.expectedProjectRevision, 3); assert.equal(h.posts().length, 1);
  });
  for (const source of [sourceState('NOT_CREATED', false), sourceState('UNAVAILABLE')]) await withHarness('FoundationCopyPanel', { source }, async h => { await h.settle(); const create = descendants(h.tree()).filter(node => node.type === 'button' && words(node) === labels.create); assert.ok(create.length === 0 || create[0].props.disabled); assert.equal(h.posts().length, 0); });
});
await test('Supported property save retains exact immutable identity/time and publishes pending bytes before POST', async () => {
  await withHarness('FoundationCopyPanel', { replies: ['success'] }, async h => {
    await loadCopy(h); h.input('Opacity', 0.4); await h.click(labels.save); assert.equal(h.posts().length, 1);
    const call = h.posts()[0], body = JSON.parse(call.body); assert.equal(body.operation, 'SET_LAYER_PROPERTIES'); assert.equal(body.compositionId, compositionId); assert.equal(body.layerId, 'layer_v2_ui'); assert.equal(body.expectedRevision, 1); assert.equal(body.expectedCompositionRevision, 1); assert.equal(body.changes.opacity, 0.4);
    assert.ok(Object.keys(body.changes).every(key => ['opacity', 'enabled', 'transform'].includes(key))); assert.ok(Buffer.byteLength(call.body) <= 32768); assert.equal(h.session.has(pendingKey), false); assert.equal(h.busy.at(-1), false);
  });
});
await test('Invalid numeric draft stays dirty and cannot send a property request', async () => {
  await withHarness('FoundationCopyPanel', {}, async h => { await loadCopy(h); h.input('Opacity', ''); await h.click(labels.save); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); assert.match(h.text(), /Blank values are not zero/); });
});
await test('Saved locked layer exposes no property publication path', async () => {
  await withHarness('FoundationCopyPanel', {}, async h => { await loadCopy(h); h.input('Working-copy layer', 'layer_v2_locked'); assert.equal(h.controlDisabled(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Opacity')), true); assert.equal(h.button(labels.save).props.disabled, true); assert.equal(h.posts().length, 0); });
});
await test('Session publication failure stops a valid request before any POST', async () => {
  await withHarness('FoundationCopyPanel', { faults: { set: true, key: pendingKey } }, async h => { await loadCopy(h); h.input('Opacity', 0.25); await h.click(labels.save); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); });
});
await test('Two synchronous save events produce only one explicit request', async () => {
  await withHarness('FoundationCopyPanel', { replies: [unavailable] }, async h => {
    await loadCopy(h); h.input('Opacity', 0.2); const control = h.button(labels.save); assert.equal(Boolean(control.props.disabled), false);
    control.props.onClick(); control.props.onClick(); await h.settle(); assert.equal(h.posts().length, 1); assert.equal(h.session.has(pendingKey), true);
  });
});
await test('Explicit stop waiting aborts only the wait and retains exact request until explicit retry', async () => {
  await withHarness('FoundationCopyPanel', { replies: ['waitForAbort', 'success'] }, async h => {
    await loadCopy(h); h.input('Opacity', 0.2); await h.click(labels.save); const first = h.posts()[0]; assert.equal(h.busy.at(-1), true);
    await h.click('Stop waiting'); assert.equal(h.posts().length, 1); assert.equal(JSON.parse(h.session.get(pendingKey)).body, first.body); assert.equal(h.busy.at(-1), true);
    await h.click(labels.retry); assert.equal(h.posts()[1].body, first.body); assert.equal(h.posts()[1].headers['idempotency-key'], first.headers['idempotency-key']); assert.equal(h.session.has(pendingKey), false);
  });
});
await test('Successful response followed by session cleanup failure retains exact recovery and parent protection', async () => {
  await withHarness('FoundationCopyPanel', { replies: ['success'], faults: { remove: true, key: pendingKey } }, async h => {
    await loadCopy(h); h.input('Opacity', 0.2); await h.click(labels.save); assert.equal(h.posts().length, 1);
    const operation = JSON.parse(h.session.get(pendingKey)); assert.equal(operation.body, h.posts()[0].body); assert.equal(h.busy.at(-1), true); await h.settle(); assert.equal(h.posts().length, 1);
  });
});
await test('Unsaved draft remains recoverable across remount without automatic publication', async () => {
  const session = new Map();
  await withHarness('FoundationCopyPanel', { session }, async h => { await loadCopy(h); h.input('Opacity', 0.37); await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); assert.equal(session.has(draftKey), true); });
  const retained = session.get(draftKey);
  await withHarness('FoundationCopyPanel', { session }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); assert.equal(session.get(draftKey), retained); assert.equal(Number(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Opacity').props.value), 0.37); });
});
await test('Unavailable save retains exact bytes/key through remount; only explicit retry posts again', async () => {
  const session = new Map(); let original;
  await withHarness('FoundationCopyPanel', { session, replies: [unavailable] }, async h => { await loadCopy(h); h.input('Opacity', 0.3); await h.click(labels.save); original = h.posts()[0]; assert.equal(h.busy.at(-1), true); await h.settle(); assert.equal(h.posts().length, 1); });
  await withHarness('FoundationCopyPanel', { session, replies: ['success'], getFailure: unavailable }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); await h.click(labels.retry); assert.equal(h.posts()[0].body, original.body); assert.equal(h.posts()[0].headers['idempotency-key'], original.headers['idempotency-key']); assert.equal(h.session.has(pendingKey), false); });
});
await test('Every rejected or malformed success retains recovery rather than assuming commitment', async () => {
  const invalidReplies = [unavailable, 'throw', { status: 400, payload: { ok: false, error: { code: 'editorial_v2_invalid', message: 'Synthetic rejected input.' } } }, { status: 409, payload: { ok: false, error: { code: 'editorial_v2_conflict', message: 'Synthetic changed head.' } } }, { payload: {} }, { payload: { ...envelope(summary(2)), generation: 'UNLOCKED' } }, { payload: { ...envelope(summary(2)), providerRequests: 1 } }, { payload: envelope({ ...summary(2), generationAllowed: true }) }];
  for (const reply of invalidReplies) {
    const operation = pending(), raw = JSON.stringify(operation), session = new Map([[pendingKey, raw]]);
    await withHarness('FoundationCopyPanel', { session, replies: [reply] }, async h => { await h.settle(); assert.equal(h.posts().length, 0); await h.click(labels.retry); assert.equal(h.posts()[0].body, operation.body); assert.equal(h.posts()[0].headers['idempotency-key'], operation.key); assert.equal(session.get(pendingKey), raw); assert.equal(h.busy.at(-1), true); await h.settle(); assert.equal(h.posts().length, 1); });
  }
});
await test('Malformed recovery records stay visible, preserved and blocked with zero automatic requests', async () => {
  for (const raw of ['{', '{}', JSON.stringify({ projectId: 'project_other', key: randomUUID(), body: '{}' }), JSON.stringify({ ...pending(), body: '{}' })]) await withHarness('FoundationCopyPanel', { session: new Map([[pendingKey, raw]]), getFailure: unavailable }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.session.get(pendingKey), raw); assert.equal(h.busy.at(-1), true); });
});
await test('Source unavailable is not absence and never enables implicit copying or fallback to original', async () => {
  await withHarness('FoundationCopyPanel', { getFailure: unavailable }, async h => { await h.settle(); await h.click(labels.refresh); assert.equal(h.posts().length, 0); assert.ok(h.calls.every(call => call.url.startsWith(endpoint))); assert.match(h.text(), /unavailable|could not be confirmed/i); });
});
await test('Foreign-project or unlocked metadata cannot become an editable composition', async () => {
  const foreign = selected(); foreign.composition.projectId = 'project_foreign';
  for (const options of [{ view: foreign }, { getFailure: { status: 200, payload: { ...envelope(sourceState()), generation: 'UNLOCKED' } } }, { getFailure: { status: 200, payload: { ...envelope(sourceState()), providerRequests: 1 } } }]) {
    await withHarness('FoundationCopyPanel', options, async h => {
      await h.settle(); const load = descendants(h.tree()).find(node => node.type === 'button' && words(node) === labels.load); if (load && !load.props.disabled) await h.click(labels.load);
      const save = descendants(h.tree()).find(node => node.type === 'button' && controlName(node) === labels.save); assert.ok(!save || save.props.disabled); assert.equal(h.posts().length, 0);
    });
  }
});
await test('Oversized response stream is cancelled at the bound, not drained before validation', async () => {
  let pulls = 0, cancelled = 0;
  const getOverride = () => new Response(new ReadableStream({ pull(controller) { pulls++; controller.enqueue(new Uint8Array(65_536).fill(32)); if (pulls >= 30) controller.close(); }, cancel() { cancelled++; } }), { headers: { 'Content-Type': 'application/json' } });
  await withHarness('FoundationCopyPanel', { getOverride }, async h => { await h.settle(); assert.equal(cancelled, 1); assert.ok(pulls <= 18, `Read ${pulls} chunks instead of stopping at the 1 MiB bound.`); assert.equal(h.posts().length, 0); assert.match(h.text(), /bound|large/i); });
});

await test('Viewer receives only the validated saved composition and is blocked during local drafts and unresolved saves', async () => {
  await withHarness('FoundationCopyPanel', { replies: ['waitForAbort'] }, async h => {
    await loadCopy(h);
    let viewer = h.find(node => node.type === ViewerSeam);
    assert.equal(viewer.props.projectId, projectId); assert.equal(viewer.props.headDigest, 'a'.repeat(64));
    assert.deepEqual(viewer.props.composition, selected().composition); assert.equal(viewer.props.previewDisabled, false); assert.equal(viewer.props.dragDisabled, false); assert.equal(viewer.props.workingCopyRevision, 1); assert.deepEqual(viewer.props.timelineFrameRate, { numerator: 25, denominator: 1 }); assert.equal(viewer.props.moveDraftStart, null); assert.equal(viewer.props.trimDraft, null); assert.equal(typeof viewer.props.onProposeMove, 'function'); assert.equal(typeof viewer.props.onProposeTrim, 'function'); assert.equal(typeof viewer.props.onOpenTrimControls, 'function'); assert.equal(typeof viewer.props.onGestureActiveChange, 'function'); assert.equal(typeof viewer.props.onUsePlayheadForSplit, 'function');
    viewer.props.onSelectLayer('layer_v2_locked'); h.render();
    assert.equal(h.find(node => node.type === ViewerSeam).props.selectedLayerId, 'layer_v2_locked');
    h.input('Working-copy layer', 'layer_v2_ui'); h.input('Opacity', 0.37);
    viewer = h.find(node => node.type === ViewerSeam);
    assert.equal(viewer.props.previewDisabled, true); assert.equal(viewer.props.selectionDisabled, true); assert.equal(viewer.props.dragDisabled, true);
    assert.equal(viewer.props.composition.layers[0].opacity, 1, 'A draft must not masquerade as saved preview instructions');
    viewer.props.onSelectLayer('layer_v2_locked'); h.render();
    assert.equal(h.find(node => node.type === ViewerSeam).props.selectedLayerId, 'layer_v2_ui');
    await h.click(labels.save); assert.equal(h.find(node => node.type === ViewerSeam).props.previewDisabled, true);
    await h.click('Stop waiting'); assert.equal(h.find(node => node.type === ViewerSeam).props.previewDisabled, true);
  });
});

function movable() { const view = selected(); view.composition.layers[0].duration = { numerator: 2, denominator: 1 }; return view; }
function timelineMovable() { const view = movable(); view.composition.layers[0].start = { numerator: 1, denominator: 3 }; return view; }
const moveLabel = 'Save move';
await test('Exact-time move posts only canonical start and preserves saved preview until explicit reload', async () => {
  await withHarness('FoundationCopyPanel', { view: timelineMovable(), replies: ['success'] }, async h => {
    await loadCopy(h); const viewer = h.find(node => node.type === ViewerSeam), authority = { headDigest: 'a'.repeat(64), revision: 1, compositionRevision: 1 };
    viewer.props.onGestureActiveChange(true); h.render(); assert.equal(h.posts().length, 0); assert.equal(h.controlDisabled(h.find(node => node.type === 'select' && node.props['aria-label'] === 'Working-copy layer')), true); assert.match(h.text(), /Timeline gesture in progress/);
    viewer.props.onGestureActiveChange(false); viewer.props.onProposeMove('layer_v2_ui', { numerator: 28, denominator: 75 }, { ...authority, revision: 2 }); h.render(); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), false); assert.match(h.text(), /head changed during the gesture/);
    viewer.props.onProposeMove('layer_v2_ui', { numerator: 28, denominator: 75 }, authority); h.render();
    const proposedViewer = h.find(node => node.type === ViewerSeam); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), true); assert.equal(proposedViewer.props.previewDisabled, true); assert.equal(proposedViewer.props.dragDisabled, true); assert.deepEqual(proposedViewer.props.moveDraftStart, { numerator: 28, denominator: 75 }); assert.deepEqual(proposedViewer.props.composition.layers[0].start, { numerator: 1, denominator: 3 }); assert.match(h.text(), /Saved: start 1 \/ 3 seconds/); assert.match(h.text(), /Proposed move — not saved: start 28 \/ 75 seconds/);
    assert.equal(h.button(labels.save).props.disabled, true); await h.click(moveLabel);
    const call = h.posts()[0], body = JSON.parse(call.body);
    assert.equal(body.operation, 'MOVE_LAYER_TIME'); assert.deepEqual(body.start, { numerator: 28, denominator: 75 });
    assert.deepEqual(Object.keys(body).sort(), ['operation','projectId','expectedRevision','expectedCompositionRevision','compositionId','layerId','requestedAt','start'].sort());
    assert.equal(body.expectedRevision, 1); assert.equal(body.expectedCompositionRevision, 1);
    assert.equal(h.session.has(pendingKey), false); assert.equal(h.session.has(draftKey), false); assert.equal(h.busy.at(-1), false);
    await h.click(labels.load); const moved = h.find(node => node.type === ViewerSeam).props.composition.layers[0];
    assert.deepEqual(moved.start, { numerator: 28, denominator: 75 }); assert.deepEqual(moved.duration, { numerator: 2, denominator: 1 }); assert.deepEqual(moved.sourceOffset, { numerator: 0, denominator: 1 }); assert.deepEqual(moved.source, timelineMovable().composition.layers[0].source);
  });
});
await test('Timing form rejects incomplete noncanonical unsafe unchanged and out-of-composition positions before POST', async () => {
  for (const [numerator, denominator] of [['','1'],['-1','1'],['1','0'],['2','4'],['1e0','3'],['01','3'],['9007199254740992','1'],['0','1'],['3','1']]) {
    await withHarness('FoundationCopyPanel', { view: movable() }, async h => { await loadCopy(h); h.input('Start time numerator', numerator); h.input('Start time denominator', denominator); await h.click(moveLabel); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); assert.equal(h.session.has(draftKey), true); });
  }
  const recovery = new Map(); let raw;
  await withHarness('FoundationCopyPanel', { view: movable(), session: recovery }, async h => { await loadCopy(h); h.input('Start time numerator', '3'); assert.match(h.text(), /outside the composition.*rejected as a visual proposal/); const viewer = h.find(node => node.type === ViewerSeam); assert.equal(viewer.props.moveDraftStart, null); assert.equal(viewer.props.previewDisabled, true); await h.click(moveLabel); assert.equal(h.posts().length, 0); raw = recovery.get(draftKey); assert.ok(raw); });
  await withHarness('FoundationCopyPanel', { view: movable(), session: recovery }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(recovery.get(draftKey), raw); assert.match(h.text(), /outside the composition.*rejected as a visual proposal/); const viewer = h.find(node => node.type === ViewerSeam); assert.equal(viewer.props.moveDraftStart, null); assert.equal(viewer.props.previewDisabled, true); await h.click(moveLabel); assert.equal(h.posts().length, 0); assert.equal(recovery.get(draftKey), raw); });
});
await test('Property drafts and timing drafts cannot be mixed or silently discarded by the other save', async () => {
  await withHarness('FoundationCopyPanel', { view: movable() }, async h => { await loadCopy(h); h.input('Opacity', '0.4'); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Start time numerator')), true); h.button(moveLabel).props.onClick(); await h.settle(); assert.equal(h.posts().length, 0); });
  await withHarness('FoundationCopyPanel', { view: movable() }, async h => { await loadCopy(h); h.input('Start time numerator', '1'); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Opacity')), true); h.button(labels.save).props.onClick(); await h.settle(); assert.equal(h.posts().length, 0); });
});
await test('Timing draft remount preserves raw incomplete fields and legacy timeline proposals without automatic move', async () => {
  const session = new Map();
  await withHarness('FoundationCopyPanel', { view: movable(), session }, async h => { await loadCopy(h); h.input('Start time numerator', ''); });
  const raw = session.get(draftKey);
  await withHarness('FoundationCopyPanel', { view: movable(), session }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(session.get(draftKey), raw); assert.equal(h.find(node=>node.type==='input'&&node.props['aria-label']==='Start time numerator').props.value, ''); assert.equal(h.busy.at(-1), true); });
  const timelineSession = new Map();
  await withHarness('FoundationCopyPanel', { view: timelineMovable(), session: timelineSession }, async h => { await loadCopy(h); const viewer = h.find(node => node.type === ViewerSeam); viewer.props.onProposeMove('layer_v2_ui', { numerator: 28, denominator: 75 }, { headDigest: 'a'.repeat(64), revision: 1, compositionRevision: 1 }); h.render(); assert.equal(h.posts().length, 0); });
  const legacy = JSON.parse(timelineSession.get(draftKey)); delete legacy.view.timelineFrameRate; const legacyRaw = JSON.stringify(legacy); timelineSession.set(draftKey, legacyRaw);
  await withHarness('FoundationCopyPanel', { view: timelineMovable(), session: timelineSession }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(timelineSession.get(draftKey), legacyRaw); const viewer = h.find(node => node.type === ViewerSeam); assert.equal(viewer.props.timelineFrameRate, null); assert.deepEqual(viewer.props.moveDraftStart, { numerator: 28, denominator: 75 }); assert.equal(viewer.props.previewDisabled, true); assert.equal(h.busy.at(-1), true); });
});
await test('Timing cancellation and remount retain exact bytes and key until explicit receipt retry', async () => {
  const session = new Map(); let first;
  await withHarness('FoundationCopyPanel', { view: movable(), session, replies: ['waitForAbort'] }, async h => { await loadCopy(h); h.input('Start time numerator', '1'); await h.click(moveLabel); first = h.posts()[0]; await h.click('Stop waiting'); assert.equal(h.posts().length, 1); assert.equal(JSON.parse(session.get(pendingKey)).body, first.body); });
  await withHarness('FoundationCopyPanel', { view: movable(), session, replies: ['success'], getFailure: unavailable }, async h => { await h.settle(); assert.equal(h.posts().length, 0); await h.click(labels.retry); assert.equal(h.posts()[0].body, first.body); assert.equal(h.posts()[0].headers['idempotency-key'], first.headers['idempotency-key']); assert.equal(session.has(pendingKey), false); });
  const conflict = { status: 409, payload: { ok: false, error: { code: 'editorial_v2_revision_conflict', message: 'Synthetic stale timeline move revision.' } } }, conflictSession = new Map(); let conflicted;
  await withHarness('FoundationCopyPanel', { view: timelineMovable(), session: conflictSession, replies: [conflict] }, async h => { await loadCopy(h); const viewer = h.find(node => node.type === ViewerSeam); viewer.props.onProposeMove('layer_v2_ui', { numerator: 28, denominator: 75 }, { headDigest: 'a'.repeat(64), revision: 1, compositionRevision: 1 }); h.render(); assert.equal(h.posts().length, 0); await h.click(moveLabel); conflicted = h.posts()[0]; assert.equal(conflictSession.has(pendingKey), true); assert.equal(conflictSession.has(draftKey), true); assert.match(h.text(), /revision or exact request differs/); });
  await withHarness('FoundationCopyPanel', { view: timelineMovable(), session: conflictSession, replies: [conflict] }, async h => { await h.settle(); assert.equal(h.posts().length, 0); await h.click(labels.retry); assert.equal(h.posts()[0].body, conflicted.body); assert.equal(h.posts()[0].headers['idempotency-key'], conflicted.headers['idempotency-key']); assert.equal(conflictSession.has(pendingKey), true); assert.equal(conflictSession.has(draftKey), true); });
});
await test('Timing publication storage failure and locked layer block transport', async () => {
  await withHarness('FoundationCopyPanel', { view: movable(), faults: { set: true, key: pendingKey } }, async h => { await loadCopy(h); h.input('Start time numerator', '1'); await h.click(moveLabel); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); });
  await withHarness('FoundationCopyPanel', { view: movable() }, async h => { await loadCopy(h); h.input('Working-copy layer', 'layer_v2_locked'); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Start time numerator')), true); assert.equal(h.button(moveLabel).props.disabled, true); });
});
await test('Two synchronous timing clicks cannot publish two requests', async () => {
  await withHarness('FoundationCopyPanel', { view: movable(), replies: [unavailable] }, async h => { await loadCopy(h); h.input('Start time numerator', '1'); const button = h.button(moveLabel); button.props.onClick(); button.props.onClick(); await h.settle(); assert.equal(h.posts().length, 1); assert.equal(h.session.has(pendingKey), true); });
});
await test('Retained mixed property-and-timing draft fails closed without rewriting either value', async () => {
  const session = new Map();
  await withHarness('FoundationCopyPanel', { view: movable(), session }, async h => { await loadCopy(h); h.input('Start time numerator', '1'); });
  const mixed = JSON.parse(session.get(draftKey)); mixed.values.opacity = '0.5'; const raw = JSON.stringify(mixed); session.set(draftKey, raw);
  await withHarness('FoundationCopyPanel', { session }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(session.get(draftKey), raw); assert.equal(h.busy.at(-1), true); assert.match(h.text(), /recovery data could not be read safely/); });
});

await test('Explicit timing-draft discard removes only unsaved draft and cannot discard an unresolved request', async () => {
  await withHarness('FoundationCopyPanel', { view: timelineMovable() }, async h => { await loadCopy(h); const viewer = h.find(node => node.type === ViewerSeam); viewer.props.onProposeMove('layer_v2_ui', { numerator: 28, denominator: 75 }, { headDigest: 'a'.repeat(64), revision: 1, compositionRevision: 1 }); h.render(); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), true); await h.click('Discard local edits'); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), false); assert.equal(h.busy.at(-1), false); assert.match(h.text(), /Only the unsaved local draft was discarded/); });
  await withHarness('FoundationCopyPanel', { view: movable(), replies: [unavailable] }, async h => { await loadCopy(h); h.input('Start time numerator', '1'); await h.click(moveLabel); assert.equal(h.button('Discard local edits').props.disabled, true); const raw = h.session.get(pendingKey); h.button('Discard local edits').props.onClick(); await h.settle(); assert.equal(h.session.get(pendingKey), raw); });
});

function trimmable(type = 'VIDEO') { const view = movable(); view.composition.layers[0].type = type; return view; }
function visualTrimmable() {
  const view = trimmable(); Object.assign(view.composition.layers[0], { start: { numerator: 1, denominator: 3 }, duration: { numerator: 1, denominator: 1 }, sourceOffset: { numerator: 0, denominator: 1 } });
  view.composition = v2.validateCompositionV2(view.composition); view.history = historyState({ undo: historyAction('UNDO_EDITORIAL_EDIT', 'MOVE_LAYER_TIME') }); return view;
}
const trimLabel = 'Trim layer to exact point';
await test('Visual IN and OUT callbacks retain exact local trim drafts without transport, then one explicit Save publishes the existing command', async () => {
  const examples = [
    { edge: 'IN', cut: { numerator: 28, denominator: 75 }, expected: { start: { numerator: 28, denominator: 75 }, duration: { numerator: 24, denominator: 25 }, sourceOffset: { numerator: 1, denominator: 25 }, end: { numerator: 4, denominator: 3 } } },
    { edge: 'OUT', cut: { numerator: 97, denominator: 75 }, expected: { start: { numerator: 1, denominator: 3 }, duration: { numerator: 24, denominator: 25 }, sourceOffset: { numerator: 0, denominator: 1 }, end: { numerator: 97, denominator: 75 } } },
  ];
  for (const example of examples) await withHarness('FoundationCopyPanel', { view: visualTrimmable(), replies: ['success'] }, async h => {
    await loadCopy(h); let viewer = h.find(node => node.type === ViewerSeam), focusCount = 0, loadFocusCount = 0; const trimFocusArguments = [];
    const trimInput = h.find(node => node.type === 'input' && node.props['aria-label'] === 'Trim point numerator'); trimInput.props.ref.current = { disabled: false, focus(...args) { focusCount++; trimFocusArguments.push(args); } };
    viewer.props.onGestureActiveChange(true); h.render(); viewer = h.find(node => node.type === ViewerSeam); viewer.props.onGestureActiveChange(false); viewer.props.onOpenTrimControls('layer_v2_ui', example.edge); await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), false); assert.ok(focusCount >= 1, 'A zero-frame release must focus numeric trim controls even when the callback came from the gesture-active render.'); assert.ok(trimFocusArguments.every(args => args.length === 0), 'Trim focus must allow normal browser scrolling so the focused exact input remains visible.'); assert.equal(h.find(node => node.type === 'select' && node.props['aria-label'] === 'Trim edge').props.value, example.edge);
    viewer = h.find(node => node.type === ViewerSeam); viewer.props.onProposeTrim('layer_v2_ui', example.edge, example.cut, { headDigest: 'a'.repeat(64), revision: 2, compositionRevision: 1 }); h.render(); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), false); assert.match(h.text(), /head changed during the trim gesture/);
    const focusCountBeforeProposal = focusCount; viewer.props.onProposeTrim('layer_v2_ui', example.edge, example.cut, { headDigest: 'a'.repeat(64), revision: 1, compositionRevision: 1 }); await h.settle(); viewer = h.find(node => node.type === ViewerSeam);
    assert.ok(focusCount > focusCountBeforeProposal, 'A retained visual trim proposal must reveal and focus the exact numeric trim input.'); assert.ok(trimFocusArguments.every(args => args.length === 0), 'Both trim focus paths must allow normal browser scrolling.');
    assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), true); assert.deepEqual(viewer.props.trimDraft, { edge: example.edge, trimPoint: example.cut }); assert.equal(viewer.props.previewDisabled, true); assert.equal(viewer.props.dragDisabled, true); assert.deepEqual(viewer.props.composition.layers[0].start, { numerator: 1, denominator: 3 });
    assert.match(h.text(), new RegExp(`Proposed ${example.edge === 'IN' ? 'In' : 'Out'} trim — not saved`)); assert.match(h.text(), new RegExp(`cut ${example.cut.numerator} \/ ${example.cut.denominator} seconds`)); assert.match(h.text(), new RegExp(`duration ${example.expected.duration.numerator} \/ ${example.expected.duration.denominator} seconds`)); assert.match(h.text(), new RegExp(`source offset ${example.expected.sourceOffset.numerator} \/ ${example.expected.sourceOffset.denominator} seconds`));
    for (const label of ['Opacity','Start time numerator','Split composition time numerator']) assert.equal(h.controlDisabled(h.find(node => node.type === 'input' && node.props['aria-label'] === label)), true); assert.equal(h.button('Undo move').props.disabled, true);
    h.button(labels.load).props.ref.current = { disabled: false, focus() { loadFocusCount++; } }; await h.click(trimLabel); assert.equal(h.posts().length, 1);
    const body = JSON.parse(h.posts()[0].body); assert.deepEqual(Object.keys(body).sort(), ['operation','projectId','expectedRevision','expectedCompositionRevision','compositionId','layerId','requestedAt','edge','trimPoint'].sort()); assert.equal(body.operation, 'TRIM_LAYER_TIME'); assert.equal(body.edge, example.edge); assert.deepEqual(body.trimPoint, example.cut); assert.equal('start' in body || 'duration' in body || 'sourceOffset' in body, false); assert.equal(h.session.has(draftKey), false); assert.ok(loadFocusCount >= 1);
    await h.click(labels.load); const saved = h.find(node => node.type === ViewerSeam).props.composition.layers[0]; assert.deepEqual({ start: saved.start, duration: saved.duration, sourceOffset: saved.sourceOffset }, { start: example.expected.start, duration: example.expected.duration, sourceOffset: example.expected.sourceOffset }); assert.deepEqual(editorialTime.editorialAddTime(saved.start, saved.duration), example.expected.end);
  });
});
await test('Exact inward trim posts only edge and canonical point, then requires explicit reload of derived saved timing', async () => {
  for (const [edge, numerator, expected] of [
    ['IN', '1', { start: { numerator: 1, denominator: 3 }, duration: { numerator: 5, denominator: 3 }, sourceOffset: { numerator: 1, denominator: 3 } }],
    ['OUT', '3', { start: { numerator: 0, denominator: 1 }, duration: { numerator: 3, denominator: 2 }, sourceOffset: { numerator: 0, denominator: 1 } }],
  ]) await withHarness('FoundationCopyPanel', { view: trimmable(), replies: ['success'] }, async h => {
    await loadCopy(h); if (edge === 'OUT') h.input('Trim edge', 'OUT'); h.input('Trim point denominator', edge === 'IN' ? '3' : '2'); h.input('Trim point numerator', numerator);
    const before = h.find(node => node.type === ViewerSeam); assert.equal(before.props.previewDisabled, true); assert.deepEqual(before.props.composition.layers[0].start, { numerator: 0, denominator: 1 });
    assert.equal(h.button(labels.save).props.disabled, true); assert.equal(h.button(moveLabel).props.disabled, true); await h.click(trimLabel);
    const call = h.posts()[0], body = JSON.parse(call.body); assert.equal(body.operation, 'TRIM_LAYER_TIME'); assert.equal(body.edge, edge); assert.deepEqual(body.trimPoint, { numerator: Number(numerator), denominator: edge === 'IN' ? 3 : 2 });
    assert.deepEqual(Object.keys(body).sort(), ['operation','projectId','expectedRevision','expectedCompositionRevision','compositionId','layerId','requestedAt','edge','trimPoint'].sort());
    assert.equal(body.expectedRevision, 1); assert.equal(body.expectedCompositionRevision, 1); assert.equal(h.session.has(pendingKey), false); assert.equal(h.session.has(draftKey), false);
    await h.click(labels.load); const saved = h.find(node => node.type === ViewerSeam).props.composition.layers[0]; assert.deepEqual({ start: saved.start, duration: saved.duration, sourceOffset: saved.sourceOffset }, expected); assert.deepEqual(saved.source, trimmable().composition.layers[0].source);
  });
});
await test('Trim rejects incomplete, noncanonical, unsafe, boundary and outward points before POST', async () => {
  for (const [numerator, denominator] of [['','1'],['-1','1'],['1','0'],['2','4'],['1e0','3'],['01','3'],['9007199254740992','1'],['0','1'],['2','1'],['3','1']]) {
    await withHarness('FoundationCopyPanel', { view: trimmable() }, async h => { await loadCopy(h); h.input('Trim point numerator', numerator); h.input('Trim point denominator', denominator); await h.click(trimLabel); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); assert.equal(h.session.has(draftKey), true); });
  }
});
await test('Property, move and trim drafts are mutually exclusive and locked layers expose no trim publication path', async () => {
  await withHarness('FoundationCopyPanel', { view: trimmable() }, async h => { await loadCopy(h); h.input('Opacity', '0.4'); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Trim point numerator')), true); assert.equal(h.button(trimLabel).props.disabled, true); });
  await withHarness('FoundationCopyPanel', { view: trimmable() }, async h => { await loadCopy(h); h.input('Start time numerator', '1'); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Trim point numerator')), true); });
  await withHarness('FoundationCopyPanel', { view: trimmable() }, async h => { await loadCopy(h); h.input('Trim point numerator', '1'); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Opacity')), true); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Start time numerator')), true); });
  await withHarness('FoundationCopyPanel', { view: trimmable() }, async h => { await loadCopy(h); h.input('Working-copy layer', 'layer_v2_locked'); assert.equal(h.controlDisabled(h.find(node=>node.type==='input'&&node.props['aria-label']==='Trim point numerator')), true); assert.equal(h.button(trimLabel).props.disabled, true); assert.equal(h.posts().length, 0); });
});
await test('Every editable field group has a programmatically associated disabled-state explanation', async () => {
  await withHarness('FoundationCopyPanel', { view: trimmable() }, async h => { await loadCopy(h); const nodes = descendants(h.tree()), fields = nodes.filter(node => node.type === 'fieldset'); assert.equal(fields.length, 7); for (const field of fields) { assert.equal(typeof field.props['aria-describedby'], 'string'); const explanation = nodes.filter(node => node.props?.id === field.props['aria-describedby']); assert.equal(explanation.length, 1); assert.ok(words(explanation[0]).trim().length > 20); } });
});
await test('Raw trim draft and exact unresolved trim request survive remount without automatic publication', async () => {
  const draftSession = new Map();
  await withHarness('FoundationCopyPanel', { view: trimmable(), session: draftSession }, async h => { await loadCopy(h); h.input('Trim point numerator', ''); });
  const rawDraft = draftSession.get(draftKey);
  await withHarness('FoundationCopyPanel', { view: trimmable(), session: draftSession }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(draftSession.get(draftKey), rawDraft); assert.equal(h.find(node=>node.type==='input'&&node.props['aria-label']==='Trim point numerator').props.value, ''); assert.equal(h.busy.at(-1), true); });
  const pendingSession = new Map(); let first;
  await withHarness('FoundationCopyPanel', { view: trimmable(), session: pendingSession, replies: ['waitForAbort'] }, async h => { await loadCopy(h); h.input('Trim point denominator', '3'); h.input('Trim point numerator', '1'); await h.click(trimLabel); first = h.posts()[0]; await h.click('Stop waiting'); assert.equal(JSON.parse(pendingSession.get(pendingKey)).body, first.body); });
  await withHarness('FoundationCopyPanel', { view: trimmable(), session: pendingSession, replies: ['success'], getFailure: unavailable }, async h => { await h.settle(); assert.equal(h.posts().length, 0); await h.click(labels.retry); assert.equal(h.posts()[0].body, first.body); assert.equal(h.posts()[0].headers['idempotency-key'], first.headers['idempotency-key']); });
  const conflict = { status: 409, payload: { ok: false, error: { code: 'editorial_v2_revision_conflict', message: 'Synthetic stale visual trim revision.' } } }, conflictSession = new Map(); let conflicted;
  await withHarness('FoundationCopyPanel', { view: visualTrimmable(), session: conflictSession, replies: [conflict] }, async h => { await loadCopy(h); const viewer = h.find(node => node.type === ViewerSeam); viewer.props.onProposeTrim('layer_v2_ui', 'IN', { numerator: 28, denominator: 75 }, { headDigest: 'a'.repeat(64), revision: 1, compositionRevision: 1 }); h.render(); assert.equal(h.posts().length, 0); await h.click(trimLabel); conflicted = h.posts()[0]; assert.equal(conflictSession.has(pendingKey), true); assert.equal(conflictSession.has(draftKey), true); assert.match(h.text(), /revision or exact request differs/); });
  await withHarness('FoundationCopyPanel', { view: visualTrimmable(), session: conflictSession, replies: [conflict] }, async h => { await h.settle(); assert.equal(h.posts().length, 0); await h.click(labels.retry); assert.equal(h.posts()[0].body, conflicted.body); assert.equal(h.posts()[0].headers['idempotency-key'], conflicted.headers['idempotency-key']); assert.equal(conflictSession.has(pendingKey), true); assert.equal(conflictSession.has(draftKey), true); });
});
await test('Mixed trim recovery records fail closed without rewriting retained bytes', async () => {
  const session = new Map();
  await withHarness('FoundationCopyPanel', { view: trimmable(), session }, async h => { await loadCopy(h); h.input('Trim point numerator', '1'); });
  const mixed = JSON.parse(session.get(draftKey)); mixed.values.timelineStart = { numerator: '1', denominator: '3' }; const raw = JSON.stringify(mixed); session.set(draftKey, raw);
  await withHarness('FoundationCopyPanel', { session }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(session.get(draftKey), raw); assert.equal(h.busy.at(-1), true); assert.match(h.text(), /recovery data could not be read safely/); });
});

function splitViewA() { const view = trimmable(); Object.assign(view.composition.layers[0], { start: { numerator: 1, denominator: 3 }, duration: { numerator: 5, denominator: 3 }, sourceOffset: { numerator: 1, denominator: 3 } }); return v2.validateCompositionV2(view.composition) && view; }
function splitViewB() { const view = trimmable(); Object.assign(view.composition.layers[0], { start: { numerator: 1, denominator: 1 }, duration: { numerator: 3, denominator: 2 }, sourceOffset: { numerator: 1, denominator: 2 } }); return v2.validateCompositionV2(view.composition) && view; }
const splitLabel = 'Save exact layer split';
await test('Example A shows an exact unsaved proposal, posts only the cut command, clears the view, and reloads two independently addressable segments', async () => {
  await withHarness('FoundationCopyPanel', { view: splitViewA(), replies: ['success'] }, async h => {
    await loadCopy(h); h.input('Split composition time numerator', '1'); h.input('Split composition time denominator', '1');
    const viewer = h.find(node => node.type === ViewerSeam); assert.equal(viewer.props.previewDisabled, true); assert.equal(viewer.props.composition.layers.length, 2);
    assert.match(h.text(), /Proposed exact split — not saved/); assert.match(h.text(), /Left: start 1 \/ 3 seconds; duration 2 \/ 3 seconds; source offset 1 \/ 3 seconds/); assert.match(h.text(), /Right: start 1 \/ 1 seconds; duration 1 \/ 1 seconds; source offset 1 \/ 1 seconds/);
    assert.equal(h.button(labels.save).props.disabled, true); assert.equal(h.button(moveLabel).props.disabled, true); assert.equal(h.button(trimLabel).props.disabled, true);
    await h.click(splitLabel); const call = h.posts()[0], body = JSON.parse(call.body);
    assert.equal(body.operation, 'SPLIT_LAYER_TIME'); assert.deepEqual(body.splitPoint, { numerator: 1, denominator: 1 }); assert.deepEqual(Object.keys(body).sort(), ['operation','projectId','expectedRevision','expectedCompositionRevision','compositionId','layerId','requestedAt','splitPoint'].sort());
    assert.equal('left' in body || 'right' in body || 'newLayerId' in body || 'duration' in body || 'sourceOffset' in body, false); assert.equal(h.session.has(pendingKey), false); assert.equal(h.session.has(draftKey), false); assert.equal(descendants(h.tree()).some(node => node.type === ViewerSeam), false);
    await h.click(labels.load); const saved = h.find(node => node.type === ViewerSeam).props.composition, [left, right, locked] = saved.layers;
    assert.equal(saved.layers.length, 3); assert.equal(left.layerId, 'layer_v2_ui'); assert.match(right.layerId, /^layer_split_[a-f0-9]{64}$/u); assert.equal(locked.layerId, 'layer_v2_locked'); assert.deepEqual(left.source, right.source); assert.equal(left.name, right.name);
    assert.deepEqual({ start: left.start, duration: left.duration, sourceOffset: left.sourceOffset }, { start: { numerator: 1, denominator: 3 }, duration: { numerator: 2, denominator: 3 }, sourceOffset: { numerator: 1, denominator: 3 } }); assert.deepEqual({ start: right.start, duration: right.duration, sourceOffset: right.sourceOffset }, { start: { numerator: 1, denominator: 1 }, duration: { numerator: 1, denominator: 1 }, sourceOffset: { numerator: 1, denominator: 1 } });
    const options = descendants(h.tree()).filter(node => node.type === 'option' && [left.layerId, right.layerId].includes(node.props.value)); assert.equal(options.length, 2); assert.notEqual(words(options[0]), words(options[1]));
    h.input('Working-copy layer', left.layerId); assert.equal(h.find(node => node.type === ViewerSeam).props.selectedLayerId, left.layerId); h.input('Working-copy layer', right.layerId); assert.equal(h.find(node => node.type === ViewerSeam).props.selectedLayerId, right.layerId); assert.equal(h.controlDisabled(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Start time numerator')), false); assert.equal(h.controlDisabled(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Trim point numerator')), false);
  });
});
await test('Example B proposal uses exact composition coordinates and preserves the complete source interval without transport', async () => {
  await withHarness('FoundationCopyPanel', { view: splitViewB() }, async h => { await loadCopy(h); h.input('Split composition time numerator', '7'); h.input('Split composition time denominator', '4'); assert.match(h.text(), /Left: start 1 \/ 1 seconds; duration 3 \/ 4 seconds; source offset 1 \/ 2 seconds/); assert.match(h.text(), /Right: start 7 \/ 4 seconds; duration 3 \/ 4 seconds; source offset 5 \/ 4 seconds/); assert.equal(h.posts().length, 0); });
});
await test('Split retains incomplete raw drafts, never shows a stale proposal, and rejects boundaries and malformed fractions before POST', async () => {
  for (const [numerator, denominator] of [['','1'],['-1','1'],['1','0'],['2','4'],['1e0','1'],['01','1'],['9007199254740992','1'],['1','3'],['2','1'],['3','1']]) {
    await withHarness('FoundationCopyPanel', { view: splitViewA() }, async h => { await loadCopy(h); h.input('Split composition time numerator', numerator); h.input('Split composition time denominator', denominator); assert.doesNotMatch(h.text(), /Proposed exact split — not saved/); assert.equal(h.button(splitLabel).props.disabled, true); h.button(splitLabel).props.onClick(); await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), true); });
  }
  const session = new Map(); await withHarness('FoundationCopyPanel', { view: splitViewA(), session }, async h => { await loadCopy(h); h.input('Split composition time numerator', ''); }); const raw = session.get(draftKey);
  await withHarness('FoundationCopyPanel', { view: splitViewA(), session }, async h => { await h.settle(); assert.equal(h.posts().length, 0); assert.equal(session.get(draftKey), raw); assert.equal(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Split composition time numerator').props.value, ''); await h.click('Discard local edits'); assert.equal(session.has(draftKey), false); assert.match(h.text(), /Only the unsaved local draft was discarded/); });
});
await test('Split is mutually exclusive and unsupported image, nested, locked, and full-capacity layers expose clear disabled explanations', async () => {
  await withHarness('FoundationCopyPanel', { view: splitViewA() }, async h => { await loadCopy(h); h.input('Split composition time numerator', '1'); h.input('Split composition time denominator', '1'); for (const label of ['Opacity','Start time numerator','Trim point numerator']) assert.equal(h.controlDisabled(h.find(node => node.type === 'input' && node.props['aria-label'] === label)), true); });
  for (const type of ['IMAGE','NESTED_COMPOSITION']) { const unsupported = trimmable(type); if (type === 'NESTED_COMPOSITION') unsupported.composition.layers[0].source = { kind: 'COMPOSITION', compositionId: 'composition_nested_ui' }; await withHarness('FoundationCopyPanel', { view: unsupported }, async h => { await loadCopy(h); const input = h.find(node => node.type === 'input' && node.props['aria-label'] === 'Split composition time numerator'); assert.equal(h.controlDisabled(input), true); assert.equal(h.button(splitLabel).props.disabled, true); assert.match(h.text(), /direct-asset video layer/); }); }
  await withHarness('FoundationCopyPanel', { view: splitViewA() }, async h => { await loadCopy(h); h.input('Working-copy layer', 'layer_v2_locked'); assert.equal(h.controlDisabled(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Split composition time numerator')), true); assert.match(h.text(), /locked.*split/i); });
  const full = splitViewA(); while (full.composition.layers.length < 32) full.composition.layers.push({ ...clone(full.composition.layers[0]), layerId: `layer_capacity_${full.composition.layers.length}` }); full.composition = v2.validateCompositionV2(full.composition);
  await withHarness('FoundationCopyPanel', { view: full }, async h => { await loadCopy(h); assert.equal(h.controlDisabled(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Split composition time numerator')), true); assert.match(h.text(), /32-layer composition limit/); });
});
await test('Unresolved split request bytes survive stale 409 and exact retry without rebase or automatic publication', async () => {
  const conflict = { status: 409, payload: { ok: false, error: { code: 'editorial_v2_revision_conflict', message: 'Synthetic stale revision.' } } }, session = new Map(); let first;
  await withHarness('FoundationCopyPanel', { view: splitViewA(), session, replies: [conflict] }, async h => { await loadCopy(h); h.input('Split composition time numerator', '1'); h.input('Split composition time denominator', '1'); await h.click(splitLabel); first = h.posts()[0]; assert.equal(session.has(pendingKey), true); assert.equal(session.has(draftKey), true); assert.match(h.text(), /revision or exact request differs/); });
  await withHarness('FoundationCopyPanel', { view: splitViewA(), session, replies: [conflict] }, async h => { await h.settle(); assert.equal(h.posts().length, 0); await h.click(labels.retry); assert.equal(h.posts().length, 1); assert.equal(h.posts()[0].body, first.body); assert.equal(h.posts()[0].headers['idempotency-key'], first.headers['idempotency-key']); assert.equal(session.has(pendingKey), true); assert.equal(session.has(draftKey), true); });
});
await test('Split publication storage failure and two synchronous clicks cannot dispatch duplicate commands', async () => {
  await withHarness('FoundationCopyPanel', { view: splitViewA(), faults: { set: true, key: pendingKey } }, async h => { await loadCopy(h); h.input('Split composition time numerator', '1'); h.input('Split composition time denominator', '1'); await h.click(splitLabel); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true); });
  await withHarness('FoundationCopyPanel', { view: splitViewA(), replies: [unavailable] }, async h => { await loadCopy(h); h.input('Split composition time numerator', '1'); h.input('Split composition time denominator', '1'); const button = h.button(splitLabel); button.props.onClick(); button.props.onClick(); await h.settle(); assert.equal(h.posts().length, 1); assert.equal(h.session.has(pendingKey), true); });
});
await test('Canonical history labels and descriptions drive one exact navigation request, then require explicit reload', async () => {
  const initialHistory = historyState({
    undo: historyAction('UNDO_EDITORIAL_EDIT', 'SPLIT_LAYER_TIME', { label: 'Undo split — canonical server action', description: 'Restore the exact pre-split composition as one new saved revision.' }),
    redo: historyAction('REDO_EDITORIAL_EDIT'),
  });
  const afterHistory = historyState({
    state: 'LEGACY_BOUNDARY',
    undo: historyAction('UNDO_EDITORIAL_EDIT', null, { description: 'The supported history beginning has been reached.' }),
    redo: historyAction('REDO_EDITORIAL_EDIT', 'SPLIT_LAYER_TIME', { compositionRevision: 2, label: 'Redo split — canonical server action', description: 'Restore the same accepted split identities as one new saved revision.' }),
  });
  await withHarness('FoundationCopyPanel', { view: selected(initialHistory), historyAfter: afterHistory, replies: ['success'] }, async h => {
    await loadCopy(h);
    const undo = h.button('Undo split — canonical server action'), redo = h.button('Redo');
    assert.equal(Boolean(undo.props.disabled), false); assert.equal(redo.props.disabled, true);
    const undoDescription = h.find(node => node.props?.id === undo.props['aria-describedby']);
    assert.equal(words(undoDescription), initialHistory.undo.description);
    let loadFocusCount = 0; h.button(labels.load).props.ref.current = { focus() { loadFocusCount++; } };
    await h.click('Undo split — canonical server action');
    assert.equal(h.posts().length, 1); const body = JSON.parse(h.posts()[0].body);
    assert.deepEqual(Object.keys(body).sort(), ['operation','projectId','expectedRevision','expectedHeadDigest','compositionId','expectedCompositionRevision','requestedAt'].sort());
    assert.deepEqual({ operation: body.operation, projectId: body.projectId, expectedRevision: body.expectedRevision, expectedHeadDigest: body.expectedHeadDigest, compositionId: body.compositionId, expectedCompositionRevision: body.expectedCompositionRevision }, { operation: 'UNDO_EDITORIAL_EDIT', projectId, expectedRevision: 1, expectedHeadDigest: 'a'.repeat(64), compositionId, expectedCompositionRevision: 1 });
    assert.equal('targetOperation' in body || 'snapshot' in body || 'targetHeadDigest' in body, false);
    assert.equal(descendants(h.tree()).some(node => node.type === ViewerSeam), false); assert.match(h.text(), /Load a composition explicitly to continue/);
    assert.equal(loadFocusCount, 1, 'A committed history action restores focus to the explicit reload control.');
    await h.click(labels.load); const reloadedRedo = h.button('Redo split — canonical server action');
    assert.equal(Boolean(reloadedRedo.props.disabled), false); assert.equal(words(h.find(node => node.props?.id === reloadedRedo.props['aria-describedby'])), afterHistory.redo.description);
  });
});
await test('A canonical global history action can target another composition and posts that server-provided identity and revision', async () => {
  const targetCompositionId = 'composition_history_other', targetCompositionRevision = 7;
  const view = selected(historyState({ undo: historyAction('UNDO_EDITORIAL_EDIT', 'TRIM_LAYER_TIME', { compositionId: targetCompositionId, compositionRevision: targetCompositionRevision, label: 'Undo trim in Other composition' }) }));
  await withHarness('FoundationCopyPanel', { view, replies: ['success'] }, async h => {
    await loadCopy(h); await h.click('Undo trim in Other composition'); assert.equal(h.posts().length, 1);
    const body = JSON.parse(h.posts()[0].body); assert.equal(body.operation, 'UNDO_EDITORIAL_EDIT'); assert.equal(body.compositionId, targetCompositionId); assert.equal(body.expectedCompositionRevision, targetCompositionRevision); assert.equal(body.expectedRevision, 1); assert.equal(body.expectedHeadDigest, 'a'.repeat(64));
    assert.equal('selectedCompositionId' in body || 'targetOperation' in body || 'snapshot' in body, false); assert.equal(descendants(h.tree()).some(node => node.type === ViewerSeam), false);
  });
});
await test('Every property, move, trim and split draft blocks history without discarding it and directly describes the remedy', async () => {
  const scenarios = [
    { view: () => selected(), edit: h => h.input('Opacity', '0.4') },
    { view: movable, edit: h => h.input('Start time numerator', '1') },
    { view: trimmable, edit: h => h.input('Trim point numerator', '1') },
    { view: splitViewA, edit: h => h.input('Split composition time numerator', '1') },
  ];
  for (const scenario of scenarios) {
    const view = scenario.view(); view.history = historyState({ undo: historyAction('UNDO_EDITORIAL_EDIT', 'SPLIT_LAYER_TIME', { compositionRevision: view.composition.revision }) });
    await withHarness('FoundationCopyPanel', { view }, async h => {
      await loadCopy(h); scenario.edit(h); const undo = h.button('Undo split');
      assert.equal(Boolean(undo.props.disabled), true); assert.equal(h.session.has(draftKey), true);
      const explanation = h.find(node => node.props?.id === undo.props['aria-describedby']); assert.match(words(explanation), /Save or discard the current unsaved edit/);
      undo.props.onClick(); await h.settle(); assert.equal(h.posts().length, 0); assert.equal(h.session.has(draftKey), true);
      await h.click('Discard local edits'); assert.equal(h.session.has(draftKey), false); assert.equal(descendants(h.tree()).some(node => node.type === ViewerSeam), false);
      await h.click(labels.load); assert.equal(Boolean(h.button('Undo split').props.disabled), false);
    });
  }
});
await test('History activation is single-flight and a stale conflict retains exact bytes for explicit retry without rebase', async () => {
  const conflict = { status: 409, payload: { ok: false, error: { code: 'editorial_v2_revision_conflict', message: 'Synthetic stale history revision.' } } }, session = new Map();
  const view = movable(); view.history = historyState({ undo: historyAction('UNDO_EDITORIAL_EDIT', 'MOVE_LAYER_TIME') }); let first, loadFocusCount = 0;
  await withHarness('FoundationCopyPanel', { view, session, replies: [conflict, conflict] }, async h => {
    await loadCopy(h); h.button(labels.load).props.ref.current = { focus() { loadFocusCount++; } }; const undo = h.button('Undo move'); undo.props.onClick(); undo.props.onClick(); await h.settle();
    assert.equal(h.posts().length, 1); first = h.posts()[0]; assert.equal(JSON.parse(session.get(pendingKey)).body, first.body); assert.equal(session.has(draftKey), false);
    const blocked = h.button('Undo move'); assert.equal(Boolean(blocked.props.disabled), true); assert.match(words(h.find(node => node.props?.id === blocked.props['aria-describedby'])), /Resolve the retained exact request/);
    await h.click(labels.retry); assert.equal(h.posts().length, 2); assert.equal(h.posts()[1].body, first.body); assert.equal(h.posts()[1].headers['idempotency-key'], first.headers['idempotency-key']); assert.equal(session.has(pendingKey), true); assert.match(h.text(), /revision or exact request differs/); assert.equal(loadFocusCount, 0, 'A rejected stale history request must not move focus.');
  });
});
await test('Malformed or mismatched canonical history metadata fails closed before controls or transport', async () => {
  const available = historyAction('UNDO_EDITORIAL_EDIT', 'TRIM_LAYER_TIME');
  const cases = [
    { ...historyState(), extra: true },
    historyState({ undo: { ...available, command: 'REDO_EDITORIAL_EDIT' } }),
    historyState({ undo: { ...available, targetOperation: null } }),
    historyState({ undo: { ...historyAction('UNDO_EDITORIAL_EDIT'), targetOperation: 'TRIM_LAYER_TIME' } }),
    historyState({ undo: { ...available, compositionId: 'composition_UPPER' } }),
    historyState({ undo: { ...available, compositionRevision: 0 } }),
    historyState({ undo: { ...available, targetOperation: 'COPY_V1_TO_V2' } }),
    historyState({ undo: { ...available, label: '' } }),
  ];
  for (const history of cases) await withHarness('FoundationCopyPanel', { view: selected(history) }, async h => {
    await h.settle(); await h.click(labels.load); assert.equal(h.posts().length, 0); assert.equal(descendants(h.tree()).some(node => node.type === ViewerSeam), false); assert.equal(descendants(h.tree()).some(node => node.type === 'button' && /^Undo|^Redo/u.test(words(node))), false); assert.match(h.text(), /history|unsupported shape|identity|revision/i);
  });
});
await test('T07 panel and viewer-mode changes preserve loaded identity, exact draft bytes, selected layer and canonical Redo metadata', async () => {
  const history = historyState({ redo: historyAction('REDO_EDITORIAL_EDIT', 'SET_LAYER_PROPERTIES') });
  await withHarness('FoundationCopyPanel', { view: selected(history) }, async h => {
    await loadCopy(h);
    const initialViewer = h.find(node => node.type === ViewerSeam), initialRender = h.find(node => node.type === SavedHeadRenderSeam);
    assert.equal(Boolean(h.button('Redo property change').props.disabled), false);
    h.input('Opacity', '0.3700'); await h.settle();
    const draftBytes = h.session.get(draftKey), retainedSession = [...h.session], requests = clone(h.calls);
    assert.equal(typeof draftBytes, 'string');
    const redoDescription = words(h.find(node => node.props?.id === h.button('Redo property change').props['aria-describedby']));
    for (const label of ['Media', 'Inspector', 'Export / outputs', 'Rendered output', 'Working preview', 'Media', 'Inspector']) {
      await h.click(label);
      await h.trigger('resize'); // Synthetic event only; browser acceptance owns actual responsive geometry.
      const viewer = h.find(node => node.type === ViewerSeam), render = h.find(node => node.type === SavedHeadRenderSeam);
      assert.equal(viewer.key, initialViewer.key); assert.equal(viewer.props.composition, initialViewer.props.composition);
      assert.equal(viewer.props.headDigest, initialViewer.props.headDigest); assert.equal(viewer.props.selectedLayerId, 'layer_v2_ui');
      assert.equal(render.type, initialRender.type); assert.equal(render.key, initialRender.key); assert.deepEqual(render.props.savedHead, initialRender.props.savedHead);
      assert.equal(h.session.get(draftKey), draftBytes); assert.deepEqual([...h.session], retainedSession); assert.deepEqual(h.calls, requests);
      assert.equal(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Opacity').props.value, '0.3700');
      assert.equal(Boolean(h.button('Redo property change').props.disabled), true);
      assert.equal(words(h.find(node => node.props?.id === h.button('Redo property change').props['aria-describedby'])), redoDescription);
      assert.equal(descendants(h.tree()).filter(node => node.type === ViewerSeam).length, 1);
      assert.equal(descendants(h.tree()).filter(node => node.type === SavedHeadRenderSeam).length, 1);
    }
    assert.equal(h.find(node => node.props?.id === 'studio-layer-inspector').props.hidden, false);
    assert.equal(h.posts().length, 0);
  });
});
await test('T07 clean view-only toggles preserve available Redo and never refresh, reload or publish implicitly', async () => {
  await withHarness('FoundationCopyPanel', { view: selected(historyState({ redo: historyAction('REDO_EDITORIAL_EDIT', 'MOVE_LAYER_TIME') })) }, async h => {
    await loadCopy(h); const requests = clone(h.calls), session = [...h.session];
    for (const label of ['Rendered output', 'Export / outputs', 'Inspector', 'Media', 'Working preview']) {
      await h.click(label); await h.trigger('resize'); assert.equal(Boolean(h.button('Redo move').props.disabled), false);
      assert.deepEqual(h.calls, requests); assert.deepEqual([...h.session], session);
    }
  });
});
await test('T07 workspace visibility forwards mutually exclusive media activity without replacing saved controllers or retained drafts', async () => {
  let returns = 0;
  await withHarness('FoundationCopyPanel', { props: { workspaceActive: true, projectName: 'Readable project name', onReturnToProject: () => returns++ } }, async h => {
    await loadCopy(h); h.input('Opacity', '0.37'); await h.settle();
    const initial = h.find(node => node.type === ViewerSeam), draftBytes = h.session.get(draftKey), requests = clone(h.calls);
    assert.equal(initial.props.mediaActive, true); assert.equal(h.find(node => node.type === SavedHeadRenderSeam).props.reviewActive, false);
    await h.click('Rendered output');
    assert.equal(h.find(node => node.type === ViewerSeam).props.mediaActive, false); assert.equal(h.find(node => node.type === SavedHeadRenderSeam).props.reviewActive, true);
    for (const active of [false, true, false, true]) {
      h.props.workspaceActive = active; h.render(); await h.settle();
      const viewer = h.find(node => node.type === ViewerSeam), render = h.find(node => node.type === SavedHeadRenderSeam);
      assert.equal(viewer.key, initial.key); assert.equal(viewer.props.composition, initial.props.composition);
      assert.equal(viewer.props.mediaActive, false); assert.equal(render.props.reviewActive, active); assert.equal(render.props.hasUnsavedDraft, true);
      assert.equal(h.session.get(draftKey), draftBytes); assert.deepEqual(h.calls, requests);
    }
    await h.click('Working preview'); await h.click('Return to project');
    assert.equal(returns, 1); assert.equal(h.session.get(draftKey), draftBytes); assert.deepEqual(h.calls, requests);
    assert.match(h.text(), /Readable project name/);
  });
});
await test('T07 panel changes retain a rejected request verbatim and never retry its idempotency key', async () => {
  const conflict = { status: 409, payload: { ok: false, error: { code: 'editorial_v2_revision_conflict', message: 'Synthetic stale editing head.' } } };
  await withHarness('FoundationCopyPanel', { replies: [conflict] }, async h => {
    await loadCopy(h); h.input('Opacity', '0.37'); await h.click(labels.save);
    const requestBytes = h.session.get(pendingKey), draftBytes = h.session.get(draftKey), requests = clone(h.calls), retained = JSON.parse(requestBytes);
    for (const label of ['Media', 'Rendered output', 'Inspector', 'Working preview', 'Export / outputs']) {
      await h.click(label); assert.equal(h.session.get(pendingKey), requestBytes); assert.equal(h.session.get(draftKey), draftBytes); assert.deepEqual(h.calls, requests);
      assert.match(h.text(), /revision or exact request differs/); assert.equal(h.busy.at(-1), true);
      const alert = h.find(node => node.props?.role === 'alert'), pending = h.find(node => node.props?.['aria-label'] === 'Unresolved working-copy request');
      for (const details of descendants(h.tree()).filter(node => node.type === 'details')) {
        assert.equal(descendants(details).includes(alert), false, 'Request errors must not be tucked into routine status disclosures.');
        assert.equal(descendants(details).includes(pending), false, 'Retained request recovery must stay outside collapsible guidance.');
      }
    }
    assert.equal(h.posts().length, 1); assert.equal(h.posts()[0].body, retained.body); assert.equal(h.posts()[0].headers['idempotency-key'], retained.key);
  });
});
await test('T07 workspace visibility and Return to project never leave copy mode or release the parent lock', async () => {
  const session = new Map([[modeKey, JSON.stringify({ projectId, mode: 'copy', compositionId })], [pendingKey, JSON.stringify(pending())]]);
  let returns = 0;
  await withHarness('EditorialWorkspacePanel', { session, props: { workspaceActive: true, projectName: 'Preserved project', onReturnToProject: () => returns++ } }, async h => {
    await h.settle(); const first = h.child('copy'), retained = [...session];
    for (const active of [false, true, false, true]) {
      h.props.workspaceActive = active; h.render(); await h.settle(); const child = h.child('copy');
      assert.equal(child.key, first.key); assert.equal(child.type, first.type); assert.equal(child.props.compositionId, compositionId);
      assert.equal(child.props.workspaceActive, active); assert.equal(child.props.projectName, 'Preserved project');
      assert.equal(child.props.onReturnToProject, first.props.onReturnToProject); assert.deepEqual([...session], retained);
      assert.equal(descendants(h.tree()).some(node => node.type === OriginalSeam), false); assert.equal(h.busy.at(-1), true); assert.equal(h.calls.length, 0);
    }
    h.child('copy').props.onReturnToProject(); h.render(); assert.equal(returns, 1); assert.deepEqual([...session], retained); assert.ok(h.child('copy'));
    h.child('copy').props.onBusyChange(false); h.render(); assert.equal(h.busy.at(-1), true, 'A clean child cannot unlock the original while copy mode remains selected.');
  });
});
function positionOf(target, node, position = []) {
  if (node === target) return position;
  const children = Array.isArray(node) ? node : node && typeof node === 'object' && node.props ? [node.props.children] : [];
  for (let index = 0; index < children.length; index++) { const found = positionOf(target, children[index], [...position, index]); if (found !== null) return found; }
  return null;
}
await test('T07 actual page view changes preserve one editor position/key, project drafts, import form and parent protection without requests', async () => {
  await withHarness('AnimationStudioPageClient', {}, async h => {
    await h.settle(); assert.equal(h.calls.length, 1);
    const loadedNotice = () => h.find(node => node.props?.role === 'status' && words(node) === 'Loaded the saved local project.');
    assert.equal(loadedNotice().props.hidden, false);
    const editor = h.find(node => node.type === EditorialSeam), editorPosition = positionOf(editor, h.tree()), imported = h.find(node => node.type === FootageSeam);
    h.find(node => node.type === 'input' && node.props.id === 'project-title').props.onChange({ target: { value: 'Unsaved exact project title' } }); h.render();
    const requests = clone(h.calls); let focusCount = 0;
    h.button('Project & imports').props.ref.current = { focus() { focusCount++; } };
    for (const label of ['Editing workspace', 'Project & imports', 'Editing workspace']) {
      await h.click(label); const next = h.find(node => node.type === EditorialSeam), footage = h.find(node => node.type === FootageSeam);
      assert.deepEqual(positionOf(next, h.tree()), editorPosition); assert.equal(next.key, editor.key); assert.equal(next.type, editor.type);
      assert.equal(next.props.workspaceActive, label === 'Editing workspace'); assert.equal(footage.props.active, label !== 'Editing workspace');
      assert.equal(loadedNotice().props.hidden, label === 'Editing workspace', 'Only the initial routine loaded-project notice is compacted in editing mode.');
      assert.equal(footage.key, imported.key); assert.equal(h.find(node => node.type === 'input' && node.props.id === 'project-title').props.value, 'Unsaved exact project title');
      assert.equal(descendants(h.tree()).filter(node => node.type === EditorialSeam).length, 1); assert.equal(descendants(h.tree()).filter(node => node.type === FootageSeam).length, 1);
      assert.equal(descendants(h.tree()).filter(node => node.type === 'h1').length, 1); assert.deepEqual(h.calls, requests);
    }
    assert.equal(focusCount, 1); h.find(node => node.type === EditorialSeam).props.onBusyChange(true); h.render();
    h.find(node => node.type === EditorialSeam).props.onReturnToProject(); await h.settle();
    assert.equal(h.find(node => node.type === EditorialSeam).props.workspaceActive, false); assert.equal(h.button('Reload saved').props.disabled, true);
    assert.equal(loadedNotice().props.hidden, false);
    assert.equal(h.find(node => node.type === 'input' && node.props.id === 'project-title').props.value, 'Unsaved exact project title'); assert.deepEqual(h.calls, requests); assert.equal(focusCount, 2);
  });
});
await test('T07 actual page retains project errors and import recovery while exposing only safe workspace navigation', async () => {
  const options = {};
  await withHarness('AnimationStudioPageClient', options, async h => {
    await h.settle(); h.find(node => node.type === FootageSeam).props.onBusyChange(true); h.render();
    const editing = h.button('Editing workspace'); assert.equal(editing.props.disabled, true);
    assert.match(words(h.find(node => node.props?.id === editing.props['aria-describedby'])), /resolve the retained import/);
    h.find(node => node.type === FootageSeam).props.onBusyChange(false); h.render();
    await h.click('Refresh list'); await h.click('Editing workspace');
    const refreshed = h.find(node => node.props?.role === 'status' && words(node) === 'Project list refreshed. Your open edits were preserved.');
    assert.equal(refreshed.props.hidden, false, 'A different operation notice must remain exposed in editing mode.');
    options.getFailure = { status: 404, payload: { ok: false, error: { code: 'not_found', message: 'The saved project or shot was not found. Refresh the project list.' } } };
    await h.click('Refresh list'); const alert = h.find(node => node.props?.role === 'alert'), alertText = words(alert), requests = clone(h.calls);
    assert.match(alertText, /not_found.*saved project or shot was not found/); assert.doesNotMatch(alertText, /provider|execution/i);
    await h.click('Editing workspace'); await h.click('Project & imports');
    assert.equal(words(h.find(node => node.props?.role === 'alert')), alertText); assert.deepEqual(h.calls, requests); assert.equal(h.posts().length, 0);
  });
});
await test('R1 compact action text retains full history and edit names with associated guidance and no automatic requests', async () => {
  await withHarness('FoundationCopyPanel', { view: selected(historyState({ undo: historyAction('UNDO_EDITORIAL_EDIT', 'SPLIT_LAYER_TIME'), redo: historyAction('REDO_EDITORIAL_EDIT', 'SET_LAYER_PROPERTIES') })) }, async h => {
    await loadCopy(h); const requests = clone(h.calls);
    for (const [name, visible] of [['Undo split', 'Undo'], ['Redo property change', 'Redo'], [labels.save, 'Save'], ['Discard local edits', 'Discard']]) {
      const button = h.button(name); assert.equal(words(button), visible); assert.equal(button.props['aria-label'], name);
    }
    const details = h.find(node => node.type === 'details' && descendants(node).some(child => child.type === 'summary' && words(child) === 'History and capability details'));
    for (const name of ['Undo split', 'Redo property change']) {
      const help = h.find(node => node.props?.id === h.button(name).props['aria-describedby']); assert.ok(descendants(details).includes(help)); assert.ok(words(help).length > 0);
    }
    h.input('Opacity', '0.3700'); await h.settle();
    assert.equal(h.button('Undo split').props.disabled, true); assert.equal(h.button('Redo property change').props.disabled, true);
    assert.match(h.text(), /Unsaved draft/); assert.deepEqual(h.calls, requests); assert.equal(h.posts().length, 0);
  });
});
await test('R1 selecting a canonical layer reveals its inspector and closes the catalogue without history or media commands', async () => {
  await withHarness('FoundationCopyPanel', { view: selected(historyState({ redo: historyAction('REDO_EDITORIAL_EDIT', 'MOVE_LAYER_TIME') })) }, async h => {
    await loadCopy(h); assert.equal(h.find(node => node.props?.id === 'studio-media-catalogue').props.hidden, true);
    const first = h.find(node => node.type === ViewerSeam), requests = clone(h.calls), session = [...h.session];
    await h.click('Media'); assert.equal(h.find(node => node.props?.id === 'studio-media-catalogue').props.hidden, false);
    first.props.onSelectLayer('layer_v2_locked'); h.render(); await h.settle();
    assert.equal(h.find(node => node.props?.id === 'studio-media-catalogue').props.hidden, true);
    assert.equal(h.find(node => node.props?.id === 'studio-layer-inspector').props.hidden, false);
    const viewer = h.find(node => node.type === ViewerSeam); assert.equal(viewer.props.selectedLayerId, 'layer_v2_locked'); assert.equal(viewer.key, first.key);
    assert.equal(h.find(node => node.type === 'select' && node.props['aria-label'] === 'Working-copy layer').props.value, 'layer_v2_locked');
    assert.equal(h.button('Redo move').props.disabled, false); assert.deepEqual(h.calls, requests); assert.deepEqual([...h.session], session); assert.equal(h.posts().length, 0);
  });
});
await test('R1 trim and split handoffs close the shared catalogue slot and reveal exact controls without transport', async () => {
  for (const action of ['open-trim', 'propose-trim', 'split-input']) await withHarness('FoundationCopyPanel', { view: visualTrimmable() }, async h => {
    await loadCopy(h); await h.click('Media');
    assert.equal(h.find(node => node.props?.id === 'studio-media-catalogue').props.hidden, false);
    const viewer = h.find(node => node.type === ViewerSeam), requests = clone(h.calls), saved = clone(viewer.props.composition), focusCalls = [];
    h.find(node => node.type === 'input' && node.props['aria-label'] === 'Trim point numerator').props.ref.current = { disabled: false, focus(...args) { focusCalls.push(args); } };
    if (action === 'open-trim') viewer.props.onOpenTrimControls('layer_v2_ui', 'OUT');
    else if (action === 'propose-trim') viewer.props.onProposeTrim('layer_v2_ui', 'IN', { numerator: 28, denominator: 75 }, { headDigest: 'a'.repeat(64), revision: 1, compositionRevision: 1 });
    else viewer.props.onUsePlayheadForSplit({ numerator: 2, denominator: 3 });
    h.render(); await h.settle();
    assert.equal(h.find(node => node.props?.id === 'studio-media-catalogue').props.hidden, true, 'The catalogue must not obscure the inspector in its responsive shared slot.');
    const inspector = h.find(node => node.props?.id === 'studio-layer-inspector'); assert.equal(inspector.props.hidden, false);
    const precision = h.find(node => node.type === 'details' && descendants(node).some(child => child.type === 'summary' && words(child) === 'Exact timing · move, trim and split'), inspector);
    assert.equal(precision.props.open, true);
    if (action !== 'split-input') {
      assert.ok(focusCalls.length >= 1, 'Trim handoff focuses the exact input after revealing its inspector.'); assert.ok(focusCalls.every(args => args.length === 0), 'Normal focus scrolling remains allowed.');
      assert.equal(h.find(node => node.type === 'select' && node.props['aria-label'] === 'Trim edge').props.value, action === 'open-trim' ? 'OUT' : 'IN');
    } else {
      assert.equal(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Split composition time numerator').props.value, '2');
      assert.equal(h.find(node => node.type === 'input' && node.props['aria-label'] === 'Split composition time denominator').props.value, '3');
    }
    assert.equal(h.session.has(draftKey), action !== 'open-trim');
    assert.equal(h.find(node => node.type === ViewerSeam).props.selectedLayerId, 'layer_v2_ui');
    assert.deepEqual(h.find(node => node.type === ViewerSeam).props.composition, saved); assert.deepEqual(h.calls, requests); assert.equal(h.posts().length, 0);
  });
});
await test('R1 first load focuses the source summary before compacting its single selector while active draft feedback stays exposed', async () => {
  await withHarness('FoundationCopyPanel', {}, async h => {
    await h.settle();
    const sourceDetails = () => h.find(node => node.type === 'details' && descendants(node).some(child => child.type === 'summary' && words(child) === 'Source status'));
    const selector = () => h.find(node => node.type === 'select' && node.props['aria-label'] === 'Working-copy composition');
    const focusCalls = [], initialRequests = h.calls.length;
    h.find(node => node.type === 'summary' && words(node) === 'Source status').props.ref.current = { focus(...args) { focusCalls.push(args); } };
    assert.equal(sourceDetails().props.open, true); assert.ok(descendants(sourceDetails()).includes(selector())); assert.ok(descendants(sourceDetails()).includes(h.button(labels.load)));
    await h.click(labels.load); h.input('Working-copy layer', 'layer_v2_ui');
    assert.deepEqual(focusCalls, [[{ preventScroll: true }]], 'First successful load hands focus to the still-visible summary before closing the details containing its load button.');
    assert.equal(h.calls.length, initialRequests + 1, 'Only the explicit composition GET is added; the focus handoff must not fetch media or reload.'); assert.ok(h.calls.every(call => call.method === 'GET'));
    assert.deepEqual(h.find(node => node.type === ViewerSeam).props.composition, selected().composition);
    assert.equal(sourceDetails().props.open, undefined, 'The routine source disclosure closes after a validated composition is loaded.');
    const routine = h.find(node => node.props?.role === 'status' && words(node).startsWith('Only the selected composition and its direct references were loaded.'));
    assert.ok(descendants(sourceDetails()).includes(routine)); assert.ok(descendants(sourceDetails()).includes(selector())); assert.ok(descendants(sourceDetails()).includes(h.button(labels.load)));
    assert.equal(descendants(h.tree()).filter(node => node.type === ViewerSeam).length, 1); assert.equal(descendants(h.tree()).filter(node => node.type === SavedHeadRenderSeam).length, 1);
    const requests = clone(h.calls); h.input('Opacity', '0.3700'); await h.settle();
    const draftNotice = h.find(node => node.props?.role === 'status' && words(node).startsWith('Local edit draft retained.'));
    for (const details of descendants(h.tree()).filter(node => node.type === 'details')) assert.equal(descendants(details).includes(draftNotice), false);
    assert.equal(descendants(h.tree()).filter(node => node.props?.role === 'status' && words(node).startsWith('Only the selected composition')).length, 0);
    assert.equal(selector().props.disabled, true); assert.equal(h.session.has(draftKey), true); assert.deepEqual(h.calls, requests); assert.equal(h.posts().length, 0);
    assert.equal(focusCalls.length, 1, 'A local draft must not repeat the first-load focus handoff.');
    assert.equal(descendants(h.tree()).filter(node => node.type === ViewerSeam).length, 1); assert.equal(descendants(h.tree()).filter(node => node.type === SavedHeadRenderSeam).length, 1);
  });
});
await test('Native recovery fails closed on unreadable or malformed retained requests without replacing them', async () => {
  for (const options of [{ session: new Map([[nativePendingKey, '{broken']]) }, { faults: { get: true, key: nativePendingKey } }]) {
    await withHarness('BlenderSourcePanel', options, async h => {
      await h.settle(); assert.equal(h.busy.at(-1), true); assert.match(h.text(), /recovery could not be read/i);
      const form = h.find(node => node.type === 'fieldset' && words(node).includes('Register a server-approved source'));
      assert.equal(form.props.disabled, true); assert.equal(h.posts().length, 0);
      h.find(node => node.type === 'select' && descendants(form).includes(node)).props.onChange({ target: { value: 'approved-fixture' } }); h.render();
      h.button('Inspect and register native source').props.onClick(); await h.settle();
      assert.equal(h.posts().length, 0); assert.equal(h.events.some(event => event.kind === 'set'), false);
      if (options.session) assert.equal(options.session.get(nativePendingKey), '{broken');
    });
  }
});
await test('Successful native Take admission invalidates parent even when subsequent native status is unavailable', async () => {
  const receipt = { revision: 2, headDigest: 'b'.repeat(64), at: stamp, takeId: 'take_blender_' + 'd'.repeat(24) };
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob()]), replies: [{ payload: envelope(receipt) }], failNativeGetAfterPost: true }, async h => {
    await h.settle(); await h.click('Use as Take');
    assert.equal(h.events.filter(event => event.kind === 'take-used').length, 1, 'Confirmed admission must invalidate the stale v2 head without relying on another GET.');
    assert.equal(h.session.has(nativePendingKey), false); assert.equal(h.posts().length, 1);
    assert.equal(h.calls.filter(call => call.method === 'GET').length, 1, 'Parent admission handoff must not wait for or depend on a redundant native status GET.');
  });
});
await test('Malformed native Take receipt retains exact recovery and never announces parent admission', async () => {
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob()]), replies: [{ payload: envelope({}) }] }, async h => {
    await h.settle(); await h.click('Use as Take');
    assert.equal(h.events.some(event => event.kind === 'take-used'), false); assert.equal(h.session.has(nativePendingKey), true); assert.equal(h.busy.at(-1), true);
  });
});
await test('Lost native response retries only its exact token and never automatically resubmits', async () => {
  const receipt = { revision: 2, headDigest: 'b'.repeat(64), at: stamp, takeId: 'take_blender_' + 'd'.repeat(24) };
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob()]), replies: ['throw', { payload: envelope(receipt) }] }, async h => {
    await h.settle(); await h.click('Use as Take'); const retained = h.session.get(nativePendingKey);
    assert.ok(retained); assert.equal(h.posts().length, 1); await h.settle(); assert.equal(h.posts().length, 1);
    await h.click('Check by retrying exact native request'); assert.equal(h.posts().length, 2);
    assert.equal(h.posts()[0].body, h.posts()[1].body); assert.equal(h.posts()[0].headers['idempotency-key'], h.posts()[1].headers['idempotency-key']);
    assert.equal(h.events.filter(event => event.kind === 'take-used').length, 1);
  });
});
await test('Take handoff cannot unmount the native activity lock while a second Blender job is running', async () => {
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob(), { ...nativeJob('RUNNING'), jobId: 'job_blender_second' }]) }, async h => {
    await h.settle(); assert.equal(h.busy.at(-1), true); assert.equal(h.button('Use as Take').props.disabled, true);
    assert.equal(h.button('Cancel owned Blender preview').props.disabled, false); assert.equal(h.posts().length, 0);
  });
});
await test('Native activity blocks saved-head export and export activity or recovery blocks native actions without self-deadlock', async () => {
  await withHarness('FoundationCopyPanel', {}, async h => {
    await loadCopy(h);
    const native = () => h.find(node => node.type === BlenderSourceSeam), exporter = () => h.find(node => node.type === SavedHeadRenderSeam);
    assert.equal(native().props.disabled, false); assert.equal(exporter().props.startBlocked, false);
    native().props.onBusyChange(true); h.render(); assert.equal(exporter().props.startBlocked, true); assert.match(exporter().props.startBlockedReason, /native|Blender/i);
    assert.equal(native().props.disabled, false, 'An active native job must retain its own cancel/recovery controls.');
    native().props.onBusyChange(false); h.render(); exporter().props.onActivityChange(true); h.render(); assert.equal(native().props.disabled, true);
    exporter().props.onActivityChange(false); exporter().props.onBlockingRecoveryChange(true); h.render(); assert.equal(native().props.disabled, true);
    exporter().props.onBlockingRecoveryChange(false); h.render(); assert.equal(native().props.disabled, false); assert.equal(exporter().props.startBlocked, false);
    assert.equal(h.posts().length, 0);
  });
});
const nativeApproval = 'I approve this exact bounded local Blender preview.';
function nativeField(h, label, value) {
  const parent = h.find(node => node.type === 'label' && words(node).startsWith(label));
  const control = h.find(node => node.type === 'input' || node.type === 'select', parent);
  assert.equal(h.controlDisabled(control), false);
  control.props.onChange({ target: { value: String(value), valueAsNumber: Number(value) } }); h.render();
}
function describedText(h, control) {
  assert.equal(typeof control.props['aria-describedby'], 'string');
  return control.props['aria-describedby'].split(' ').map(id => words(h.find(node => node.props.id === id))).join(' ');
}
await test('Native dialog open/close retains the same plan, approval and preparation draft without a request or controller reset', async () => {
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob('PREPARED')]) }, async h => {
    await h.settle(); const calls = clone(h.calls), initialBusyEvents = h.busy.length;
    const trigger = h.button('Open Blender plan'), dialog = h.find(node => node.type === 'dialog');
    assert.equal(trigger.props['aria-haspopup'], 'dialog'); assert.equal(trigger.props['aria-controls'], dialog.props.id);
    assert.equal(words(h.find(node => node.props.id === dialog.props['aria-labelledby'])), 'Native Blender preview plan');
    await h.click('Open Blender plan'); assert.equal(h.dialogNode.open, true);
    nativeField(h, 'Registered Blender source', `${nativeSource().assetId}:1`);
    nativeField(h, 'Last source frame (inclusive)', 149);
    h.checkbox(nativeApproval, true); assert.equal(h.button('Start approved Blender preview').props.disabled, false);
    await h.click('Close Blender plan'); assert.equal(h.dialogNode.open, false);
    assert.deepEqual(h.events.filter(event => event.kind === 'dialog-trigger-focus').at(-1).options, { preventScroll: true });
    await h.click('Open Blender plan'); assert.equal(h.button('Start approved Blender preview').props.disabled, false);
    const last = h.find(node => node.type === 'label' && words(node).startsWith('Last source frame (inclusive)'));
    assert.equal(h.find(node => node.type === 'input', last).props.value, 149);
    assert.match(h.text(), /Frames 76–150 inclusive · 75 frames/);
    h.dialogNode.close(); h.render(); // Native Escape/close event seam; actual keyboard behavior is a Browser gate.
    assert.equal(h.events.filter(event => event.kind === 'dialog-trigger-focus').length, 2);
    assert.equal(descendants(h.tree()).filter(node => node.type === 'dialog').length, 1);
    assert.deepEqual(h.calls, calls); assert.equal(h.posts().length, 0); assert.equal(h.busy.length, initialBusyEvents);
  });
});
await test('Saved native plan exposes complete exact source/settings/destination before setup and associates Start guidance', async () => {
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob('PREPARED')]) }, async h => {
    await h.settle(); await h.click('Open Blender plan');
    for (const expected of [nativeSource().descriptor.label, 'v004-proxy.blend', nativeSource().assetId, 'TestScene', 'LockedCamera', 'Frames 76–150 inclusive · 75 frames', '3 seconds · 1280×720 · 25 fps · video only', '0 external dependencies', shotId, nativeSource().descriptor.source.sha256]) assert.ok(h.text().includes(expected), expected);
    const nodes = descendants(h.tree());
    assert.ok(nodes.indexOf(h.button('Close Blender plan')) < nodes.indexOf(h.button('Start approved Blender preview')));
    assert.ok(nodes.indexOf(h.button('Start approved Blender preview')) < nodes.indexOf(h.button('Inspect and register native source')));
    assert.equal(h.button('Start approved Blender preview').props.disabled, true);
    assert.match(describedText(h, h.button('Start approved Blender preview')), /Tick the exact-plan approval/);
    assert.equal(h.posts().length, 0);
  });
});
await test('Native Start still requires one explicit exact-plan approval and preserves response-loss recovery through dialog closure', async () => {
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob('PREPARED')]), replies: ['throw'] }, async h => {
    await h.settle(); await h.click('Open Blender plan'); assert.equal(h.posts().length, 0);
    h.checkbox(nativeApproval, true);
    const start = h.button('Start approved Blender preview'); start.props.onClick(); start.props.onClick(); await h.settle();
    assert.equal(h.posts().length, 1);
    const request = JSON.parse(h.posts()[0].body), retained = h.session.get(nativePendingKey);
    assert.equal(request.action, 'start'); assert.equal(request.jobId, nativeJob('PREPARED').jobId); assert.equal(request.specDigest, nativeJob('PREPARED').execution.specDigest);
    assert.equal('frameEnd' in request, false, 'Start cannot substitute editable preparation fields for the saved plan.');
    assert.ok(retained); assert.equal(h.busy.at(-1), true);
    await h.click('Close Blender plan'); await h.click('Open Blender plan');
    assert.equal(h.session.get(nativePendingKey), retained); assert.equal(h.posts().length, 1);
    assert.equal(h.button('Start approved Blender preview').props.disabled, true);
    assert.equal(h.button('Check by retrying exact native request').props.disabled, false);
    assert.equal(h.button('Close Blender plan').props.disabled, undefined);
  });
});
await test('Native disabled Start and invalid preparation retain programmatically associated explanations without hiding Close', async () => {
  for (const options of [
    { nativeState: { ...nativeState([nativeJob('PREPARED')]), enabled: false, unavailable: 'Pinned local tool unavailable.' }, expected: /Pinned local tool unavailable/ },
    { nativeState: { ...nativeState([nativeJob('PREPARED')]), sources: [] }, expected: /exact registered source is unavailable/ },
    { nativeState: nativeState([nativeJob('PREPARED')]), props: { disabled: true }, expected: /editor\/export activity/ },
  ]) await withHarness('BlenderSourcePanel', options, async h => {
    await h.settle(); await h.click('Open Blender plan'); const start = h.button('Start approved Blender preview');
    assert.equal(start.props.disabled, true); assert.match(describedText(h, start), options.expected);
    await h.click('Close Blender plan'); assert.equal(h.dialogNode.open, false); assert.equal(h.posts().length, 0);
  });
  await withHarness('BlenderSourcePanel', { nativeState: nativeState() }, async h => {
    await h.settle(); await h.click('Open Blender plan');
    nativeField(h, 'Registered Blender source', `${nativeSource().assetId}:1`);
    nativeField(h, 'Last source frame (inclusive)', 151);
    assert.equal(h.button('Prepare preview plan').props.disabled, true);
    assert.match(describedText(h, h.button('Prepare preview plan')), /1–75 whole frames/);
    nativeField(h, 'Last source frame (inclusive)', 150); assert.equal(h.button('Prepare preview plan').props.disabled, false);
    assert.equal(h.posts().length, 0);
  });
});
await test('Closing a running native dialog does not cancel; reopening preserves the explicit cancel action and activity lock', async () => {
  await withHarness('BlenderSourcePanel', { nativeState: nativeState([nativeJob('RUNNING')]), replies: [{ payload: envelope({ cancelled: true }) }] }, async h => {
    await h.settle(); await h.click('Open Blender plan'); assert.equal(h.busy.at(-1), true);
    assert.equal(h.button('Cancel owned Blender preview').props.disabled, false);
    await h.click('Close Blender plan'); assert.equal(h.posts().length, 0); assert.equal(h.busy.at(-1), true);
    await h.click('Open Blender plan'); await h.click('Cancel owned Blender preview');
    assert.equal(h.posts().length, 1); assert.equal(JSON.parse(h.posts()[0].body).action, 'cancel');
    assert.equal(JSON.parse(h.posts()[0].body).jobId, nativeJob('RUNNING').jobId);
  });
});
function replacementFixture() {
  const view = selected(), source = sourceState();
  view.composition.layers[0].type = 'VIDEO'; view.composition.layers[0].duration = { numerator: 2, denominator: 1 }; view.composition.layers[0].sourceOffset = { numerator: 1, denominator: 1 };
  const take = (name, duration) => ({ takeId: `take_replacement_ui_${name}`, shotId, name: `${name} native version result`, sourceLabel: `Native ${name} source`, mediaType: 'VIDEO', library: 'PROJECT_LOCAL_C', duration: { numerator: duration, denominator: 1 }, eligibility: 'READY', reason: null });
  source.takeCatalogue = [take('new', 3), take('short', 2)];
  return { view, source };
}
await test('Native replacement choice is view-only, head/layer-bound, and explicit activation retains only the exact typed command', async () => {
  const fixture = replacementFixture();
  await withHarness('FoundationCopyPanel', { ...fixture, replies: ['success'] }, async h => {
    await loadCopy(h); h.input('Replacement video Take', 'take_replacement_ui_new');
    assert.equal(h.posts().length, 0); assert.match(describedText(h, h.button('Replace selected layer with Take')), /start, duration, source offset, ordering and visual properties stay unchanged/);
    const replace = h.button('Replace selected layer with Take'); assert.equal(h.controlDisabled(replace), false);
    replace.props.onClick(); replace.props.onClick(); await h.settle();
    assert.equal(h.posts().length, 1); const body = JSON.parse(h.posts()[0].body);
    assert.deepEqual(Object.keys(body).sort(), ['operation', 'projectId', 'expectedRevision', 'expectedHeadDigest', 'expectedCompositionRevision', 'compositionId', 'layerId', 'takeId', 'requestedAt'].sort());
    assert.equal(body.operation, 'REPLACE_LAYER_TAKE'); assert.equal(body.expectedHeadDigest, fixture.view.headDigest); assert.equal(body.layerId, 'layer_v2_ui'); assert.equal(body.takeId, 'take_replacement_ui_new');
    assert.equal(h.session.has(pendingKey), false); assert.ok(h.text().includes('Working-copy revision 2 confirmed'));
    await h.click(labels.load); assert.equal(h.button('Undo Take replacement').props.disabled, false);
    const viewer = h.find(node => node.type === ViewerSeam), layer = viewer.props.composition.layers[0];
    for (const field of ['start', 'duration', 'sourceOffset', 'name', 'transform', 'opacity']) assert.deepEqual(layer[field], fixture.view.composition.layers[0][field], field);
  });
});
await test('Replacement rejects short coverage and locked or non-video targets with associated guidance and no request', async () => {
  await withHarness('FoundationCopyPanel', replacementFixture(), async h => {
    await loadCopy(h); h.input('Replacement video Take', 'take_replacement_ui_short');
    assert.equal(h.button('Replace selected layer with Take').props.disabled, true); assert.match(describedText(h, h.button('Replace selected layer with Take')), /too short.*no trimming, stretching, looping/);
    h.input('Working-copy layer', 'layer_v2_locked'); assert.equal(h.button('Replace selected layer with Take').props.disabled, true); assert.match(describedText(h, h.button('Replace selected layer with Take')), /locked/);
    h.input('Working-copy layer', 'layer_v2_ui'); assert.equal(h.find(node => node.type === 'select' && node.props['aria-label'] === 'Replacement video Take').props.value, '');
    assert.equal(h.posts().length, 0);
  });
  await withHarness('FoundationCopyPanel', {}, async h => { await loadCopy(h); assert.equal(h.button('Replace selected layer with Take').props.disabled, true); assert.match(describedText(h, h.button('Replace selected layer with Take')), /direct-asset video/); assert.equal(h.posts().length, 0); });
});
await test('Replacement cannot publish during a retained draft, native activity or export activity', async () => {
  for (const block of ['draft', 'native', 'export']) await withHarness('FoundationCopyPanel', replacementFixture(), async h => {
    await loadCopy(h); h.input('Replacement video Take', 'take_replacement_ui_new');
    if (block === 'draft') h.input('Opacity', '0.5');
    if (block === 'native') { h.find(node => node.type === BlenderSourceSeam).props.onBusyChange(true); h.render(); }
    if (block === 'export') { h.find(node => node.type === SavedHeadRenderSeam).props.onActivityChange(true); h.render(); }
    const button = h.button('Replace selected layer with Take'); assert.equal(h.controlDisabled(button), true); assert.ok(describedText(h, button).length > 0);
    button.props.onClick(); await h.settle(); assert.equal(h.posts().length, 0);
  });
});
await test('Lost replacement response survives remount and retries only its original exact bytes without automatic replacement', async () => {
  const session = new Map(), fixture = replacementFixture(); let originalRequest;
  await withHarness('FoundationCopyPanel', { ...fixture, session, replies: ['throw'] }, async h => {
    await loadCopy(h); h.input('Replacement video Take', 'take_replacement_ui_new'); await h.click('Replace selected layer with Take');
    assert.equal(h.posts().length, 1); originalRequest = h.posts()[0]; assert.ok(session.has(pendingKey));
  });
  await withHarness('FoundationCopyPanel', { ...fixture, session, replies: ['success'] }, async h => {
    await h.settle(); assert.equal(h.posts().length, 0); await h.click(labels.retry); assert.equal(h.posts().length, 1);
    assert.equal(h.posts()[0].body, originalRequest.body); assert.equal(h.posts()[0].headers['idempotency-key'], originalRequest.headers['idempotency-key']); assert.equal(session.has(pendingKey), false);
  });
});
const sourceBindings = [...boundSources].sort(([a], [b]) => a.localeCompare(b)).map(([name, hash]) => ({ path: name, sha256: hash }));
const componentSourceUnchanged = [...componentSources].every(([name, content]) => fs.readFileSync(path.join(frontend, name), 'utf8') === content);
const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const status = results.every(value => value.status === 'PASS') && componentSourceUnchanged && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL';
retain('result.json', { runId, startedAt, finishedAt: new Date().toISOString(), status, planned: results.length, passed: results.filter(value => value.status === 'PASS').length, results, sourceBindings, componentSourceUnchanged, sourceUnchanged, networkAttempts, scope: 'Actual new TSX handlers and installed JSX runtime; deterministic hook/session/fetch seams; original child implementation tested separately. No browser/DOM/event-bubbling/decoding/native/server/provider or production claim.', browserAcceptance: false, domRendering: false, domGeometryMeasured: false, nativeExecution: false, providerRequests: 0, credentialReads: 0, productionDataMutations: 0 });
console.log(JSON.stringify({ status, planned: results.length, passed: results.filter(value => value.status === 'PASS').length, failures: results.filter(value => value.status !== 'PASS'), evidence, componentSourceUnchanged, networkAttempts }));
if (status !== 'PASS') process.exitCode = 1;
