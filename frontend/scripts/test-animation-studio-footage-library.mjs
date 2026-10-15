// Isolated fake-native contract checks; --native additionally preserves two small real C/D test libraries.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
assert.ok(process.argv.slice(2).every(arg => arg === '--native'));
const actualNative = process.argv.includes('--native'), networkAttempts = blockStudioTestNetwork();
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const runId = randomUUID(), startedAt = new Date().toISOString();
const acceptance = path.join(frontend, '.codexforge/acceptance');
assert.ok(fs.statSync(acceptance).isDirectory());
const evidence = path.join(acceptance, `footage-library-factory-${runId}`);
fs.mkdirSync(evidence);
const retain = (name, data) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(data, null, 2) + '\n', { flag: 'wx' });
const loader = createStudioTestLoader(frontend);
const nativeModule = loader.load('@/lib/codexforge/creator/creator-native-filesystem.server');
const actualLoad = nativeModule.loadCreatorNativeFilesystem;
let world;
nativeModule.loadCreatorNativeFilesystem = () => { world.calls.push({ op: 'load-native' }); return { Root: world.Root }; };
const { createStudioFootageLibrary, STUDIO_FOOTAGE_PUBLICATION_RESERVE_BYTES } = loader.load('@/lib/codexforge/animation-studio/footage-library.server');
const filesToBind = [...new Set([...loader.loaded, 'scripts/test-animation-studio-footage-library.mjs', 'scripts/animation-studio-test-loader.mjs', 'native/codexforge_creator_filesystem.cc', 'build/Release/codexforge_creator_filesystem.node'])].sort();
const bindings = () => filesToBind.map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
const before = bindings();
retain('intent.json', { runId, startedAt, pid: process.pid, actualNative, scope: 'Fake native binding injection only inside this test loader; optional existing unchanged actual native binary in fresh synthetic C/D scopes. No production reconfiguration, deletion, drive formatting, credentials, packages, providers, network or servers.', sourceBindings: before });
const nativeError = code => Object.assign(new Error(`Synthetic ${code}`), { code });
const unavailable = operation => assert.throws(operation, error => error.code === 'FOOTAGE_LIBRARY_UNAVAILABLE');
const configuration = operation => assert.throws(operation, error => error.code === 'FOOTAGE_LIBRARY_CONFIGURATION');
const D_PARENT = '.codexforge/media-libraries';
const C_MARKER = 'studio/media-library.json';
const markerPath = binding => `${D_PARENT}/${binding.libraryId}/media-library.json`;
const tests = [], results = [], fixtures = [];
const test = (name, run) => tests.push({ name, run });

class MemoryRoot {
  constructor(state, prefix, mode = 'persistent', tag = 'C') { this.state = state; this.prefix = prefix; this.mode = mode; this.tag = tag; this.closed = false; }
  key(segments) { assert.equal(this.closed, false); return [this.prefix, ...segments].filter(Boolean).join('/'); }
  readFile(segments, max) {
    const key = this.key(segments); assert.ok(max <= 1_048_576);
    this.state.calls.push({ op: 'read', tag: this.tag, key, max });
    this.state.beforeRead?.(this, key);
    const value = this.state.files.get(key); if (!value) throw nativeError('not_found');
    if (value.length > max) throw nativeError('too_large');
    return Buffer.from(value);
  }
  writeAtomicExclusive(segments, temporary, bytes, fenceSegments, fenceBytes) {
    const key = this.key(segments); assert.notEqual(this.mode, 'existing'); assert.ok(bytes.length <= 1_048_576);
    this.state.calls.push({ op: 'write', tag: this.tag, key, fence: fenceSegments?.join('/') ?? null });
    this.state.beforeWrite?.(this, key, bytes);
    if (fenceSegments && !this.readFile(fenceSegments, 4096).equals(fenceBytes)) throw nativeError('fence_mismatch');
    if (this.state.files.has(key)) throw nativeError('already_exists');
    this.state.files.set(key, Buffer.from(bytes));
    this.state.afterWrite?.(this, key, bytes);
  }
  publishTreeExclusive(segments, entries) {
    const key = this.key(segments); assert.notEqual(this.mode, 'existing');
    this.state.calls.push({ op: 'tree', tag: this.tag, key });
    this.state.beforeTree?.(this, key, entries);
    if (this.state.dirs.has(key)) throw nativeError('already_exists');
    this.state.dirs.add(key);
    for (const [relative, bytes] of entries) this.state.files.set(`${key}/${relative.join('/')}`, Buffer.from(bytes));
  }
  close() { assert.equal(this.closed, false); this.closed = true; this.state.calls.push({ op: 'close', tag: this.tag, prefix: this.prefix, mode: this.mode }); }
}
function newWorld() {
  const state = { files: new Map(), dirs: new Set(), calls: [], handles: [], beforeRead: null, beforeWrite: null, afterWrite: null, beforeTree: null, beforeOpen: null };
  state.Root = class extends MemoryRoot {
    constructor(base, segments, mode) {
      assert.equal(base, 'D:/CodexForge'); assert.deepEqual(segments.slice(0, 2), ['.codexforge', 'media-libraries']);
      const prefix = segments.join('/'); state.calls.push({ op: 'open', base, prefix, mode }); state.beforeOpen?.(prefix, mode);
      if (mode === 'existing' && !state.dirs.has(prefix)) throw nativeError('not_found');
      if (mode !== 'existing') state.dirs.add(prefix);
      super(state, prefix, mode, 'D'); state.handles.push(this);
    }
  };
  return state;
}
function fixture(destination = 'd-drive', namespace = `factory-${runId}`) {
  world = newWorld(); const workspaceRoot = new MemoryRoot(world, 'workspace');
  const options = { workspaceRoot, workspaceScope: { workspace: 'test', namespace }, importDestination: destination, availableBytes: () => Number.MAX_SAFE_INTEGER };
  const library = createStudioFootageLibrary(options), binding = library.destination();
  const bytes = Buffer.alloc(524_305, 37), hash = sha(bytes);
  const assetPath = `studio/projects/project_library_test/renders/asset_library_test/v1/${hash}.bin`;
  return { state: world, workspaceRoot, options, library, binding, bytes, hash, assetPath };
}
const write = f => f.library.write(f.assetPath, f.bytes, f.binding);
const read = f => f.library.read(f.assetPath, f.hash, f.bytes.length, f.binding);
const open = f => f.library.open(f.assetPath, f.hash, f.bytes.length, f.binding);
const filesSnapshot = state => [...state.files].map(([name, bytes]) => ({ name, bytes: bytes.length, sha256: sha(bytes) })).sort((a, b) => a.name.localeCompare(b.name));
const assertClosed = f => { assert.ok(f.state.handles.every(root => root.closed)); assert.equal(f.workspaceRoot.closed, false); };

test('construction and destination are pure; legacy workspace bytes never access D or binding metadata', () => {
  const f = fixture('workspace'); assert.equal(f.binding, null); assert.deepEqual(f.state.calls, []);
  write(f); assert.deepEqual(read(f), f.bytes);
  assert.equal(f.state.calls.some(call => call.tag === 'D' || call.op === 'load-native'), false);
  assert.equal(f.state.files.has(`workspace/${C_MARKER}`), false);
  assert.deepEqual(Object.keys(f.library).sort(), ['close', 'destination', 'open', 'read', 'verify', 'write']);
  f.library.close(); f.library.close(); unavailable(() => f.library.destination()); assertClosed(f);
});
test('D destination performs no I/O and returns copied deterministic scope-bound 64-hex identity', () => {
  const f = fixture(); assert.deepEqual(f.state.calls, []); assert.match(f.binding.libraryId, /^[a-f0-9]{64}$/);
  assert.deepEqual(createStudioFootageLibrary(f.options).destination(), f.binding);
  assert.notEqual(createStudioFootageLibrary({ ...f.options, workspaceScope: { workspace: 'test', namespace: `other-${runId}` } }).destination().libraryId, f.binding.libraryId);
  assert.notEqual(createStudioFootageLibrary({ ...f.options, workspaceScope: { workspace: 'development' } }).destination().libraryId, f.binding.libraryId);
  f.binding.libraryId = '0'.repeat(64); assert.notEqual(f.library.destination().libraryId, f.binding.libraryId);
});
test('canonical Windows real root normalizes case and separator aliases and separates other roots', () => {
  const f = fixture();
  const pathsModule = loader.load('@/lib/codexforge/server-safe-paths/bounded-workspace-path');
  const original = pathsModule.CODEXFORGE_PROJECT_ROOT;
  try {
    for (const alias of [frontend, frontend.replaceAll('\\', '/'), frontend.toUpperCase(), frontend.toLowerCase()]) {
      pathsModule.CODEXFORGE_PROJECT_ROOT = alias;
      assert.deepEqual(createStudioFootageLibrary(f.options).destination(), f.binding);
    }
    pathsModule.CODEXFORGE_PROJECT_ROOT = path.dirname(frontend);
    assert.notEqual(createStudioFootageLibrary(f.options).destination().libraryId, f.binding.libraryId);
  } finally { pathsModule.CODEXFORGE_PROJECT_ROOT = original; }
  assert.deepEqual(f.state.calls, []);
});
test('invalid scopes, configuration and accessors reject before native access', () => {
  const f = fixture();
  for (const workspaceScope of [null, {}, [], { workspace: 'other' }, { workspace: 'development', namespace: 'not-allowed' }, { workspace: 'test' }, { workspace: 'test', namespace: '../escape' }, { workspace: 'test', namespace: 'short' }, { workspace: 'test', namespace: 'A'.repeat(10) }, { workspace: 'test', namespace: 'a'.repeat(65) }, { workspace: 'development', extra: true }]) configuration(() => createStudioFootageLibrary({ ...f.options, workspaceScope }));
  configuration(() => createStudioFootageLibrary({ ...f.options, importDestination: 'E:/elsewhere' }));
  configuration(() => createStudioFootageLibrary({ ...f.options, availableBytes: 1 }));
  configuration(() => createStudioFootageLibrary({ ...f.options, get extra() { throw Error('getter executed'); } }));
  assert.deepEqual(f.state.calls, []);
});
test('invalid or foreign binding rejects without reading either location', () => {
  const f = fixture();
  for (const binding of [undefined, {}, [], { ...f.binding, libraryId: '0'.repeat(64) }, { ...f.binding, extra: true }, { ...f.binding, storageLocation: 'elsewhere' }]) {
    unavailable(() => f.library.write(f.assetPath, f.bytes, binding)); unavailable(() => f.library.read(f.assetPath, f.hash, f.bytes.length, binding));
    unavailable(() => f.library.open(f.assetPath, f.hash, f.bytes.length, binding)); unavailable(() => f.library.verify(f.assetPath, f.hash, f.bytes.length, binding));
  }
  assert.deepEqual(f.state.calls, []);
});
test('fixed 4 GiB post-publication reserve rejects workspace and D writes before storage access', () => {
  assert.equal(STUDIO_FOOTAGE_PUBLICATION_RESERVE_BYTES, 4 * 1024 * 1024 * 1024);
  for (const destination of ['workspace', 'd-drive']) {
    const f = fixture(destination); const prior = filesSnapshot(f.state), observed = [];
    f.library = createStudioFootageLibrary({ ...f.options, availableBytes: selected => { observed.push(selected); return f.bytes.length + STUDIO_FOOTAGE_PUBLICATION_RESERVE_BYTES - 1; } });
    unavailable(() => write(f)); assert.deepEqual(observed, [destination]); assert.deepEqual(filesSnapshot(f.state), prior); assert.deepEqual(f.state.calls, []);
  }
});
test('workspace bounded open/read/verify closes logically without opening D', () => {
  const f = fixture('workspace'); write(f); f.state.calls.length = 0;
  const reader = open(f); assert.equal(reader.byteLength, f.bytes.length); assert.equal(reader.contentHash, f.hash);
  assert.deepEqual(reader.read(524_280, 25), f.bytes.subarray(524_280, 524_305)); reader.verify();
  assert.ok(f.state.calls.every(call => call.tag !== 'D')); reader.close(); reader.close();
  assert.throws(() => reader.read(0, 1), error => error.code === 'INVALID_FOOTAGE_BYTES');
  f.library.verify(f.assetPath, f.hash, f.bytes.length, null); f.library.close(); assertClosed(f);
});
test('D bounded reader retains the marker-fenced existing handle until close and library close owns stragglers', () => {
  const f = fixture(); write(f); f.state.calls.length = 0;
  const reader = open(f), guard = f.state.handles.at(-1); assert.equal(guard.mode, 'existing'); assert.equal(guard.closed, false);
  assert.deepEqual(reader.read(524_280, 25), f.bytes.subarray(524_280, 524_305)); reader.verify(); assert.equal(guard.closed, false);
  reader.close(); assert.equal(guard.closed, true);
  const straggler = open(f), nextGuard = f.state.handles.at(-1); f.library.close(); assert.equal(nextGuard.closed, true);
  assert.throws(() => straggler.read(0, 1), error => error.code === 'INVALID_FOOTAGE_BYTES'); assertClosed(f);
});
test('invalid D payload and canonical path reject before provisioning', () => {
  const f = fixture();
  for (const bytes of [Buffer.alloc(0), Buffer.alloc(16 * 1024 * 1024 + 1), new Uint8Array(1)]) unavailable(() => f.library.write(f.assetPath, bytes, f.binding));
  for (const location of [null, '../' + f.assetPath, f.assetPath.replace('/renders/', '/generation/'), f.assetPath.replace('/v1/', '/v01/'), f.assetPath.replace(f.hash, '0'.repeat(64))]) unavailable(() => f.library.write(location, f.bytes, f.binding));
  assert.deepEqual(f.state.calls, []);
});
test('missing C binding read fails without accessing or creating D', () => {
  const f = fixture(); unavailable(() => read(f)); assert.equal(f.state.calls.length, 1); assert.equal(f.state.calls[0].tag, 'C'); assert.equal(f.state.files.size, 0);
});
test('first publication orders atomic D tree-marker, exact C binding, fenced parts and index', () => {
  const f = fixture(); const fence = write(f); assert.deepEqual(read(f), f.bytes);
  assert.deepEqual(fence.path, ['studio', 'media-library.json']); assert.deepEqual(fence.expected, f.state.files.get(`workspace/${C_MARKER}`));
  fence.path[0] = 'tampered'; fence.expected[0] ^= 255;
  const next = write(f); assert.deepEqual(next.path, ['studio', 'media-library.json']); assert.deepEqual(next.expected, f.state.files.get(`workspace/${C_MARKER}`));
  const mutations = f.state.calls.filter(call => call.op === 'tree' || call.op === 'write');
  assert.equal(mutations[0].op, 'tree'); assert.equal(mutations[1].key, `workspace/${C_MARKER}`);
  assert.ok(mutations.slice(2).every(call => call.fence === 'media-library.json'));
  assert.ok(mutations.at(-1).key.endsWith(f.assetPath));
  assert.deepEqual(f.state.files.get(markerPath(f.binding)), f.state.files.get(`workspace/${C_MARKER}`));
  assertClosed(f);
});
test('existing guard remains pinned when persistent writer opens and closes after writer', () => {
  const f = fixture(); write(f); f.state.calls.length = 0;
  f.state.beforeOpen = (prefix, mode) => { if (mode === 'persistent') assert.ok(f.state.handles.some(root => root.prefix === prefix && root.mode === 'existing' && !root.closed)); };
  write(f); const closures = f.state.calls.filter(call => call.op === 'close');
  assert.deepEqual(closures.map(call => call.mode), ['persistent', 'existing']); assertClosed(f);
});
test('byte-exact replay and reopened factory preserve all stored bytes', () => {
  const f = fixture(); write(f); const before = filesSnapshot(f.state); f.library.close(); f.library = createStudioFootageLibrary(f.options);
  write(f); assert.deepEqual(read(f), f.bytes); assert.deepEqual(filesSnapshot(f.state), before); assertClosed(f);
});
test('D asset remains readable/writable after new-import destination changes to workspace', () => {
  const f = fixture(); write(f); f.library = createStudioFootageLibrary({ ...f.options, importDestination: 'workspace' });
  assert.equal(f.library.destination(), null); write(f); assert.deepEqual(read(f), f.bytes); assertClosed(f);
});
test('present C binding with missing D root never opens persistent storage or recreates it', () => {
  const f = fixture(); write(f); f.state.dirs.delete(`${D_PARENT}/${f.binding.libraryId}`); f.state.calls.length = 0;
  unavailable(() => write(f)); unavailable(() => read(f));
  assert.equal(f.state.calls.some(call => call.mode === 'persistent' || call.op === 'tree' || call.op === 'write'), false); assertClosed(f);
});
test('present C binding with missing D marker never republishes it', () => {
  const f = fixture(); write(f); f.state.files.delete(markerPath(f.binding)); f.state.calls.length = 0;
  unavailable(() => write(f)); unavailable(() => read(f));
  assert.equal(f.state.calls.some(call => call.mode === 'persistent' || call.op === 'tree' || call.op === 'write'), false); assertClosed(f);
});
test('pre-existing empty or nonempty markerless D leaf is never adopted', () => {
  for (const nonempty of [false, true]) {
    const f = fixture(); f.state.dirs.add(`${D_PARENT}/${f.binding.libraryId}`);
    if (nonempty) f.state.files.set(`${D_PARENT}/${f.binding.libraryId}/unowned.txt`, Buffer.from('preserve'));
    const prior = filesSnapshot(f.state); unavailable(() => write(f)); assert.deepEqual(filesSnapshot(f.state), prior);
    assert.equal(f.state.calls.some(call => call.op === 'tree' || call.op === 'write'), false); assertClosed(f);
  }
});
test('malformed, unknown-field, duplicate-key, oversized and foreign C/D markers fail closed', () => {
  for (const target of ['C', 'D']) for (const bytes of [Buffer.from('{}'), Buffer.from('\ufeff{}'), Buffer.from('{"format":"x","format":"y"}'), Buffer.from('{"path":"../elsewhere"}'), Buffer.alloc(4097), Buffer.from('wrong-library')]) {
    const f = fixture(); write(f); f.state.files.set(target === 'C' ? `workspace/${C_MARKER}` : markerPath(f.binding), bytes); f.state.calls.length = 0;
    unavailable(() => read(f)); unavailable(() => write(f)); assert.equal(f.state.calls.some(call => call.op === 'tree' || call.op === 'write'), false); assertClosed(f);
  }
});
test('C publication failure before commit preserves only the exact D marker and retry recovers', () => {
  const f = fixture(); f.state.beforeWrite = root => { if (root.tag === 'C') throw nativeError('interruption'); };
  unavailable(() => write(f)); assert.equal(f.state.files.size, 1); assert.ok(f.state.files.has(markerPath(f.binding))); assertClosed(f);
  f.state.beforeWrite = null; write(f); assert.deepEqual(read(f), f.bytes); assert.equal(f.state.calls.filter(call => call.op === 'tree').length, 1); assertClosed(f);
});
test('lost acknowledgement after C commit remains unresolved and exact retry recovers', () => {
  const f = fixture(); f.state.afterWrite = root => { if (root.tag === 'C') throw nativeError('lost_acknowledgement'); };
  unavailable(() => write(f)); assert.equal(f.state.files.size, 2); assertClosed(f);
  f.state.afterWrite = null; write(f); assert.deepEqual(read(f), f.bytes); assertClosed(f);
});
test('competing C publication accepts only exact bytes; conflict stops before media', () => {
  for (const exact of [true, false]) {
    const f = fixture(); f.state.beforeWrite = (root, key, bytes) => { if (root.tag === 'C') f.state.files.set(key, exact ? Buffer.from(bytes) : Buffer.from('{}')); };
    if (exact) { write(f); assert.deepEqual(read(f), f.bytes); }
    else { unavailable(() => write(f)); assert.equal(f.state.files.size, 2); }
    assertClosed(f);
  }
});
test('atomic first-publication race accepts matching marked winner but rejects markerless winner', () => {
  for (const marked of [true, false]) {
    const f = fixture(); f.state.beforeTree = (root, key, entries) => {
      f.state.dirs.add(key); if (marked) f.state.files.set(`${key}/media-library.json`, Buffer.from(entries[0][1]));
    };
    if (marked) { write(f); assert.deepEqual(read(f), f.bytes); }
    else { unavailable(() => write(f)); assert.equal(f.state.files.size, 0); }
    assertClosed(f);
  }
});
test('changed marker between parts is rejected by the native fence before index publication', () => {
  const f = fixture(); let parts = 0;
  f.state.afterWrite = (root, key) => { if (root.tag === 'D' && key.includes('.part-') && ++parts === 1) f.state.files.set(markerPath(f.binding), Buffer.from('{}')); };
  unavailable(() => write(f)); assert.equal(f.state.files.has(`${D_PARENT}/${f.binding.libraryId}/${f.assetPath}`), false);
  assert.equal([...f.state.files.keys()].filter(name => name.includes('.part-')).length, 1); assertClosed(f);
});
test('native unsafe, busy, access and unknown failures become unavailable without fallback', () => {
  for (const code of ['unsafe_reparse', 'unsafe_hardlink', 'busy', 'access_denied', 'not_found', 'unexpected']) {
    const f = fixture(); write(f); f.state.calls.length = 0;
    f.state.beforeRead = (root, key) => { if (key === markerPath(f.binding)) throw nativeError(code); };
    unavailable(() => write(f)); unavailable(() => read(f));
    assert.equal(f.state.calls.some(call => call.op === 'write' || call.op === 'tree'), false); assertClosed(f);
  }
});
test('missing or corrupt D media never falls back to a same-path C asset', () => {
  const f = fixture(); write(f); f.library.write(f.assetPath, f.bytes, null);
  f.state.files.delete(`${D_PARENT}/${f.binding.libraryId}/${f.assetPath}`); unavailable(() => read(f));
  assert.deepEqual(f.library.read(f.assetPath, f.hash, f.bytes.length, null), f.bytes); assertClosed(f);
});

function knownInventory(base, binding, assetPath) {
  const paths = [path.join(base, 'media-library.json')];
  const directory = path.join(base, path.dirname(assetPath));
  for (const name of fs.readdirSync(directory)) { assert.match(name, /^[a-f0-9]{64}(?:\.part-\d{4})?\.bin$/); paths.push(path.join(directory, name)); }
  assert.ok(paths.length <= 34);
  return paths.map(filename => { const stat = fs.lstatSync(filename); assert.ok(stat.isFile() && !stat.isSymbolicLink() && stat.size <= 1_048_576); const bytes = fs.readFileSync(filename); return { path: filename, bytes: bytes.length, sha256: sha(bytes) }; });
}
if (actualNative) test('actual unchanged native D library roundtrip/reopen/replay and interrupted C setup recovery (synthetic scopes only)', () => {
  assert.equal(process.platform, 'win32');
  for (const instructions of ['D:/AGENTS.md', 'D:/CodexForge/AGENTS.md']) assert.equal(fs.existsSync(instructions), false, 'New D instructions require manual review before this probe.');
  const baseStat = fs.lstatSync('D:/CodexForge'); assert.ok(baseStat.isDirectory() && !baseStat.isSymbolicLink());
  const validationMarker = 'D:/CodexForge/.codexforge/ownership/app-root.json';
  const appMarkerBefore = fs.readFileSync(validationMarker); assert.equal(sha(appMarkerBefore), 'b202c86143b72af9f3bc7e6d8e07e9a4da20b7c788706be9f75cdaf82fac62ab');
  nativeModule.loadCreatorNativeFilesystem = actualLoad;
  const native = actualLoad();
  for (const interrupted of [false, true]) {
    const namespace = `library-${interrupted ? 'recover' : 'roundtrip'}-${runId}`;
    const rootSegments = ['.codexforge', 'studio-tests', namespace];
    assert.equal(native.rootExists(frontend, rootSegments), false);
    const workspaceRoot = new native.Root(frontend, rootSegments, 'persistent');
    let fail = interrupted;
    const cFacade = new Proxy(workspaceRoot, { get(root, property) {
      if (property === 'writeAtomicExclusive') return (...args) => { if (fail && args[0].join('/') === C_MARKER) throw nativeError('injected_before_c_publication'); return root.writeAtomicExclusive(...args); };
      const value = Reflect.get(root, property); return typeof value === 'function' ? value.bind(root) : value;
    } });
    const options = { workspaceRoot: cFacade, workspaceScope: { workspace: 'test', namespace }, importDestination: 'd-drive' };
    const library = createStudioFootageLibrary(options), binding = library.destination();
    const driveSegments = ['.codexforge', 'media-libraries', binding.libraryId];
    assert.equal(native.rootExists('D:/CodexForge', driveSegments), false);
    const bytes = Buffer.alloc(786_449, interrupted ? 62 : 61), hash = sha(bytes);
    const assetPath = `studio/projects/project_library_native/renders/asset_library_native/v1/${hash}.bin`;
    const drivePath = path.join('D:/CodexForge', ...driveSegments);
    const fixtureInfo = { namespace, libraryId: binding.libraryId, cRoot: path.join(frontend, ...rootSegments), dRoot: drivePath, assetPath, contentHash: hash, byteLength: bytes.length, simulatedCFailure: interrupted };
    fixtures.push(fixtureInfo); retain(`native-fixture-${interrupted ? 'recovery' : 'roundtrip'}-intent.json`, fixtureInfo);
    try {
      if (interrupted) {
        unavailable(() => library.write(assetPath, bytes, binding));
        assert.deepEqual(fs.readdirSync(drivePath), ['media-library.json']);
        assert.throws(() => workspaceRoot.readFile(['studio', 'media-library.json'], 4096), error => error.code === 'not_found');
        fail = false;
      }
      library.write(assetPath, bytes, binding); assert.deepEqual(library.read(assetPath, hash, bytes.length, binding), bytes);
      const inventory = knownInventory(drivePath, binding, assetPath);
      library.write(assetPath, bytes, binding); assert.deepEqual(knownInventory(drivePath, binding, assetPath), inventory);
      library.close();
      const reopened = createStudioFootageLibrary({ ...options, importDestination: 'workspace' });
      try { assert.deepEqual(reopened.read(assetPath, hash, bytes.length, binding), bytes); reopened.write(assetPath, bytes, binding); } finally { reopened.close(); }
      const cMarker = path.join(frontend, ...rootSegments, C_MARKER);
      fixtureInfo.files = [...inventory, { path: cMarker, bytes: fs.statSync(cMarker).size, sha256: sha(fs.readFileSync(cMarker)) }];
      fixtureInfo.preserved = true;
    } finally { library.close(); workspaceRoot.close(); }
  }
  assert.deepEqual(fs.readFileSync(validationMarker), appMarkerBefore);
  assert.ok(fixtures.flatMap(item => item.files).reduce((sum, item) => sum + item.bytes, 0) < 3 * 1024 * 1024);
});
test('all network/provider boundaries remain untouched', () => { assert.deepEqual(networkAttempts, []); });
for (const item of tests) {
  try { item.run(); results.push({ name: item.name, status: 'PASS' }); }
  catch (error) { results.push({ name: item.name, status: 'FAIL', error: error instanceof Error ? error.message : 'Unknown failure', stack: error?.stack }); process.exitCode = 1; break; }
}
nativeModule.loadCreatorNativeFilesystem = actualLoad;
const after = bindings();
const sourceUnchanged = JSON.stringify(before) === JSON.stringify(after);
const status = results.length === tests.length && results.every(item => item.status === 'PASS') && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL';
retain('result.json', { runId, startedAt, finishedAt: new Date().toISOString(), status, planned: tests.length, testCount: results.length, results, actualNative, fixtures, before, after, sourceUnchanged, networkAttempts, providerRequests: 0, credentialReads: 0, productionReconfiguration: false, deletedFiles: 0, preservedAllFixtures: true });
console.log(JSON.stringify({ evidence, status, planned: tests.length, testCount: results.length, failures: results.filter(item => item.status !== 'PASS'), actualNative, sourceUnchanged, networkAttempts: networkAttempts.length }));
if (status !== 'PASS') process.exitCode = 1;
