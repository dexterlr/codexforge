// Real native-storage checks, with the sole D: root redirected to a fresh C: test library.
// Synthetic framing is not decoder/playback evidence. No real D: access, server or renderer.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(path.resolve(process.cwd()), frontend);
assert.equal(process.platform, 'win32', 'The qualified Windows native addon is required.');
assert.deepEqual(process.argv.slice(2, 3), ['--evidence-root']);
assert.equal(process.argv.length, 4, 'Use --evidence-root with one existing C: evidence directory.');
const parent = fs.realpathSync.native(process.argv[3]);
assert.equal(path.parse(parent).root.toLowerCase(), 'c:\\');
assert.ok(fs.statSync(parent).isDirectory());
const runId = randomUUID(), startedAt = new Date().toISOString();
const evidence = path.join(parent, `studio-compatibility-binding-tests-${runId}`);
fs.mkdirSync(evidence);
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const paths = loader.load('@/lib/codexforge/server-safe-paths/bounded-workspace-path');
const nativeModule = loader.load('@/lib/codexforge/creator/creator-native-filesystem.server');
const actualNative = nativeModule.loadCreatorNativeFilesystem();
const actualPathRoot = paths.CODEXFORGE_PROJECT_ROOT;
const PIN = 'CODEXFORGE_STUDIO_COMPATIBILITY_BINDING_SHA256';
const savedPin = process.env[PIN];
assert.equal(savedPin, undefined, 'A test must not inherit a real compatibility binding.');
const drive = path.join(evidence, 'synthetic-source-drive');
fs.mkdirSync(drive);
const nativeCalls = [];
const mutationMethods = new Set(['ensureDirectory', 'createDirectoryExclusive', 'writeAtomicExclusive', 'writeAtomicReplace', 'compareDeleteExact', 'publishTreeExclusive', 'renameExclusive', 'removeTree', 'removeRoot']);
function owned(target) {
  const relative = path.relative(evidence, path.resolve(target));
  assert.ok(relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative)), 'Only this run\'s C: fixture tree may be accessed.');
  assert.equal(path.parse(path.resolve(target)).root.toLowerCase(), 'c:\\');
}
nativeModule.loadCreatorNativeFilesystem = () => ({
  ...actualNative,
  Root: class {
    constructor(base, segments, mode = 'persistent') {
      const redirected = base === 'D:/CodexForge';
      const selected = redirected ? drive : base;
      // Full-chain staging pins deliberately start at a higher C: ancestor.
      // Permit that real-native traversal only when its exact final root is
      // inside this run's fixture tree; the sole D: base still redirects here.
      owned(redirected ? selected : path.join(selected, ...segments));
      nativeCalls.push({ operation: 'open', requestedBase: redirected ? 'D:/CodexForge' : selected, actualBase: selected, segments: [...segments], mode, redirected });
      const root = new actualNative.Root(selected, segments, mode);
      return new Proxy(root, { get(target, property) {
        const value = Reflect.get(target, property, target);
        if (typeof value !== 'function') return value;
        return (...args) => {
          nativeCalls.push({ operation: String(property), actualBase: selected, segments: Array.isArray(args[0]) ? [...args[0]] : null, mode, redirected, mutation: mutationMethods.has(property) });
          return value.apply(target, args);
        };
      } });
    }
  },
});
const { openStudioRepository, StudioRepository } = loader.load('@/lib/codexforge/animation-studio/store.server');
const { createStudioFootageLibrary } = loader.load('@/lib/codexforge/animation-studio/footage-library.server');
const { localFootageStorageBinding } = loader.load('@/lib/codexforge/animation-studio/footage-contract');
const { serializeJarvisChatCanonicalJson: canonical } = loader.load('@/lib/codexforge/jarvis-chat/jarvis-chat-crypto');
const compatibility = loader.load('@/lib/codexforge/animation-studio/readonly-compatibility-binding.server');
const footageHttp = loader.load('@/lib/codexforge/animation-studio/footage-http.server');
const uploadHttp = loader.load('@/lib/codexforge/animation-studio/footage-upload-http.server');
const outputStorage = loader.load('@/lib/codexforge/animation-studio/editorial-v2-render-output-storage.server');
const sourceBindings = [...new Set([...loader.loaded, 'scripts/test-animation-studio-compatibility-binding.mjs', 'scripts/animation-studio-test-loader.mjs', 'build/Release/codexforge_creator_filesystem.node'])].sort()
  .map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
retain('intent.json', { runId, startedAt, scope: 'C-only synthetic real-native copied-workspace compatibility. D root redirection exists only in this source test loader; no actual D filesystem access. No credentials, subprocesses, renderers, servers, packages or production records.', sourceBindings });

let tick = 0;
const now = () => new Date(Date.UTC(2026, 9, 1, 12, 0, tick++)).toISOString();
const actor = 'local-studio-footage-import';
const scope = { workspace: 'test', namespace: 'compatibility-native-test' };
const segments = ['.codexforge', 'studio-tests', scope.namespace];
const projectId = 'project_readonly_compatibility';
const configSegments = ['.codexforge', 'studio-compatibility', 'readonly-library.json'];
function context(root, pin, operation) {
  const oldCwd = process.cwd(), oldRoot = paths.CODEXFORGE_PROJECT_ROOT, oldPin = process.env[PIN];
  const oldNamespace = process.env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE;
  paths.CODEXFORGE_PROJECT_ROOT = root; process.chdir(root);
  process.env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE = scope.namespace;
  if (pin === null) delete process.env[PIN]; else process.env[PIN] = pin;
  const restore = () => { process.chdir(oldCwd); paths.CODEXFORGE_PROJECT_ROOT = oldRoot; if (oldPin === undefined) delete process.env[PIN]; else process.env[PIN] = oldPin; if (oldNamespace === undefined) delete process.env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE; else process.env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE = oldNamespace; };
  try { const result = operation(); if (result && typeof result.then === 'function') return result.finally(restore); restore(); return result; }
  catch (error) { restore(); throw error; }
}
function withRepository(root, pin, operation) {
  return context(root, pin, () => {
    const repository = openStudioRepository({ ...scope, mediaStorage: 'workspace' });
    try { return operation(repository); } finally { repository.close(); }
  });
}
function inventory(root) {
  owned(root);
  if (!fs.existsSync(root)) return null;
  const entries = [];
  function visit(relative) {
    assert.ok(entries.length < 1000, 'Fixture inventory must remain bounded.');
    const target = path.join(root, relative), stat = fs.lstatSync(target);
    assert.equal(stat.isSymbolicLink(), false);
    entries.push({ path: relative.replaceAll('\\', '/'), kind: stat.isDirectory() ? 'directory' : 'file', ...(stat.isFile() ? { bytes: stat.size, sha256: sha(fs.readFileSync(target)) } : {}) });
    if (stat.isDirectory()) for (const name of fs.readdirSync(target).sort()) visit(path.join(relative, name));
  }
  visit('.'); return entries;
}
function box(type, payload) { const bytes = Buffer.alloc(8 + payload.length); bytes.writeUInt32BE(bytes.length); bytes.write(type, 4, 'ascii'); payload.copy(bytes, 8); return bytes; }
const fixtureBytes = Buffer.concat([box('ftyp', Buffer.from('isom\0\0\0\0isom', 'binary')), box('moov', Buffer.alloc(8)), box('mdat', Buffer.alloc(600_000, 41))]);
function fixture(name, twoAssets = false, container = evidence) {
  owned(container);
  const owner = path.join(container, `${name}-owner`), requester = path.join(container, `${name}-requester`);
  fs.mkdirSync(owner); fs.mkdirSync(requester);
  let asset, secondAsset, input;
  context(owner, null, () => {
    const root = new actualNative.Root(owner, segments, 'persistent');
    const library = createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: scope, importDestination: 'd-drive', availableBytes: () => Number.MAX_SAFE_INTEGER });
    const repository = new StudioRepository(root, library);
    try {
      repository.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: 'Synthetic read-only compatibility', description: 'Synthetic framing only; no provider or decoder.', currency: 'GBP', createdAt: now() }, `create-${name}`, actor);
      const state = repository.load(projectId);
      input = { projectId, shotId: state.shots[0].shotId, expectedProjectRevision: state.project.revision, expectedShotRevision: state.shots[0].revision, requestedAt: now(), originalName: 'synthetic.mp4', sourceLabel: 'Synthetic compatibility fixture', rights: { status: 'UNKNOWN', license: null, evidence: null } };
      repository.importFootage(input, fixtureBytes, `import-${name}-00000001`, actor);
      asset = repository.load(projectId).assets[0];
      if (twoAssets) {
        const state = repository.load(projectId), bytes = Buffer.from(fixtureBytes); bytes[bytes.length - 1] ^= 1;
        const nextInput = { ...input, expectedProjectRevision: state.project.revision, expectedShotRevision: state.shots[0].revision, requestedAt: now() };
        repository.importFootage(nextInput, bytes, `import-${name}-00000002`, actor);
        secondAsset = repository.load(projectId).assets[1];
      }
    } finally { repository.close(); }
  });
  const ownerWorkspace = path.join(owner, ...segments), requesterWorkspace = path.join(requester, ...segments);
  fs.mkdirSync(path.dirname(requesterWorkspace), { recursive: true });
  fs.cpSync(ownerWorkspace, requesterWorkspace, { recursive: true, errorOnExist: true, force: false, dereference: false });
  const ownerRecord = path.join(ownerWorkspace, 'studio', 'projects', projectId, 'manifests', 'project.json');
  const binding = localFootageStorageBinding(asset);
  const tuple = { projectId, assetId: asset.assetId, version: asset.version, sourcePath: asset.sourcePath, contentHash: asset.contentHash, byteLength: fixtureBytes.length };
  const configuration = { format: 'studio-readonly-compatibility-binding-v1', mode: 'read-only', requester: { projectRoot: fs.realpathSync.native(requester).replaceAll('\\', '/'), scope }, owner: { projectRoot: fs.realpathSync.native(owner).replaceAll('\\', '/'), scope, projectId, recordSha256: sha(fs.readFileSync(ownerRecord)) }, libraryId: binding.libraryId, allowedAssets: [tuple] };
  const configBytes = Buffer.from(canonical(configuration) + '\n');
  const configPath = path.join(requester, ...configSegments);
  fs.mkdirSync(path.dirname(configPath), { recursive: true }); fs.writeFileSync(configPath, configBytes, { flag: 'wx' });
  return { name, owner, requester, ownerWorkspace, requesterWorkspace, ownerRecord, asset, secondAsset, input, tuple, binding, configuration, configPath, configBytes, pin: sha(configBytes), libraryPath: path.join(drive, '.codexforge', 'media-libraries', binding.libraryId) };
}
function configure(f, value = f.configuration, bytes = Buffer.from(canonical(value) + '\n')) {
  owned(f.configPath); fs.writeFileSync(f.configPath, bytes); return sha(bytes);
}
function withLibrary(f, operation, pin = f.pin, destination = 'workspace') {
  return context(f.requester, pin, () => {
    const root = new actualNative.Root(f.requester, segments, 'persistent');
    let library;
    try { library = createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: scope, importDestination: destination, availableBytes: () => Number.MAX_SAFE_INTEGER }); return operation(library); }
    finally { library?.close(); root.close(); }
  });
}
const denied = error => ['FOOTAGE_COMPATIBILITY_CONFIGURATION', 'FOOTAGE_COMPATIBILITY_READ_ONLY', 'FOOTAGE_LIBRARY_UNAVAILABLE', 'FOOTAGE_LIBRARY_CONFIGURATION'].includes(error?.code);
function rejectsRead(f, pin = f.pin) {
  assert.throws(() => withRepository(f.requester, pin, repository => repository.readFootage(projectId, f.asset.assetId, f.asset.version)), denied);
}
function assertNoMutation(operation, roots) {
  const before = roots.map(inventory), result = operation();
  roots.forEach((root, index) => assert.deepEqual(inventory(root), before[index])); return result;
}

const tests = [], results = [];
const test = (name, run) => tests.push({ name, run });
let primary;
test('copied workspace without explicit override still rejects original-library media and changes no source bytes', () => {
  primary = fixture('baseline');
  const ownerBefore = inventory(primary.owner), sourceBefore = inventory(primary.libraryPath), copyBefore = inventory(primary.requester);
  withRepository(primary.requester, null, repository => assert.throws(() => repository.readFootage(projectId, primary.asset.assetId, primary.asset.version), error => error.code === 'FOOTAGE_LIBRARY_UNAVAILABLE'));
  assert.deepEqual(inventory(primary.owner), ownerBefore); assert.deepEqual(inventory(primary.libraryPath), sourceBefore); assert.deepEqual(inventory(primary.requester), copyBefore);
});
test('same copied workspace with exact pinned read-only binding resolves original immutable bytes through the actual repository', () => {
  assert.ok(primary, 'The independently established copied-workspace case is required.');
  const ownerBefore = inventory(primary.owner), sourceBefore = inventory(primary.libraryPath), copyBefore = inventory(primary.requester);
  const callStart = nativeCalls.length;
  withRepository(primary.requester, primary.pin, repository => {
    assert.deepEqual(repository.readFootage(projectId, primary.asset.assetId, primary.asset.version), fixtureBytes);
    const source = repository.openFootage(projectId, primary.asset.assetId, primary.asset.version);
    try { assert.equal(source.reader.byteLength, fixtureBytes.length); assert.equal(source.reader.contentHash, primary.asset.contentHash); assert.deepEqual(source.reader.read(524_280, 32), fixtureBytes.subarray(524_280, 524_312)); }
    finally { source.reader.close(); }
    const state = repository.load(projectId); assert.equal(state.assets.length, 1); assert.equal(state.jobs.length, 0);
  });
  const reads = nativeCalls.slice(callStart).filter(call => call.redirected);
  assert.ok(reads.some(call => call.operation === 'readFile'));
  assert.ok(reads.every(call => call.mode === 'existing' && !call.mutation), 'Compatibility source access may never acquire a mutable D-root facade.');
  assert.deepEqual(inventory(primary.owner), ownerBefore); assert.deepEqual(inventory(primary.libraryPath), sourceBefore); assert.deepEqual(inventory(primary.requester), copyBefore);
});

test('all nine actual native existing-root mutation APIs reject before changing any C-only library entry', () => {
  const f = fixture('native-mutators'), root = new actualNative.Root(drive, ['.codexforge', 'media-libraries', f.binding.libraryId], 'existing');
  const marker = fs.readFileSync(path.join(f.libraryPath, 'media-library.json'));
  const operations = [
    ['ensureDirectory', () => root.ensureDirectory(['forbidden'])],
    ['createDirectoryExclusive', () => root.createDirectoryExclusive(['forbidden'])],
    ['writeAtomicExclusive', () => root.writeAtomicExclusive(['forbidden.bin'], 'forbidden.tmp', Buffer.from('forbidden'))],
    ['writeAtomicReplace', () => root.writeAtomicReplace(['media-library.json'], 'forbidden.tmp', Buffer.from('forbidden'), marker, null, null)],
    ['compareDeleteExact', () => root.compareDeleteExact(['media-library.json'], marker)],
    ['publishTreeExclusive', () => root.publishTreeExclusive(['forbidden'], [[['data.bin'], Buffer.from('forbidden')]])],
    ['renameExclusive', () => root.renameExclusive(['media-library.json'], ['forbidden.bin'])],
    ['removeTree', () => root.removeTree(['studio'])],
    ['removeRoot', () => root.removeRoot()],
  ];
  try { for (const [name, operation] of operations) assertNoMutation(() => assert.throws(operation, error => error.code === 'access_denied', name), [f.libraryPath]); }
  finally { root.close(); }
  assert.equal(operations.length, 9);
});

test('binding hash pin is mandatory authority and wrong or malformed pins fail without source mutation', () => {
  const f = fixture('pin');
  for (const pin of ['0'.repeat(64), '', 'a'.repeat(63), 'A'.repeat(64), '../readonly-library.json']) assertNoMutation(() => rejectsRead(f, pin), [f.owner, f.requester, f.libraryPath]);
});

test('binding configuration rejects unknown fields noncanonical encoding duplicate keys and wrong modes', () => {
  const f = fixture('schema');
  const values = [
    { ...f.configuration, extra: true }, { ...f.configuration, mode: 'read-write' },
    { ...f.configuration, requester: { ...f.configuration.requester, extra: true } },
    { ...f.configuration, owner: { ...f.configuration.owner, extra: true } },
    { ...f.configuration, allowedAssets: [{ ...f.tuple, extra: true }] },
    { ...f.configuration, requester: { ...f.configuration.requester, scope: { ...scope, extra: true } } },
  ];
  for (const value of values) { const pin = configure(f, value); assertNoMutation(() => rejectsRead(f, pin), [f.owner, f.requester, f.libraryPath]); }
  for (const bytes of [Buffer.from(canonical(f.configuration)), Buffer.from(JSON.stringify(f.configuration, null, 2) + '\n'), Buffer.from('\ufeff' + canonical(f.configuration) + '\n'), Buffer.from(canonical(f.configuration).replace('{', '{"mode":"read-only",') + '\n')]) {
    const pin = configure(f, f.configuration, bytes); assertNoMutation(() => rejectsRead(f, pin), [f.owner, f.requester, f.libraryPath]);
  }
});

test('scope accessors and unknown fields cannot become server-side compatibility authority', () => {
  const f = fixture('scope-shape'); let getterCalls = 0;
  context(f.requester, f.pin, () => {
    const accessor = { workspace: 'test', get namespace() { getterCalls++; return scope.namespace; } };
    for (const candidate of [{ ...scope, extra: true }, accessor, { workspace: 'development', namespace: scope.namespace }]) assert.throws(() => compatibility.readStudioCompatibilityBinding(candidate), denied);
  });
  assert.equal(getterCalls, 0, 'Configuration validation must reject accessor-backed scope objects without invoking them.');
});

test('wrong requesting root namespace and source root fail even with a matching file pin', () => {
  const f = fixture('root-binding');
  const other = path.join(evidence, 'root-binding-other'); fs.mkdirSync(other);
  for (const value of [
    { ...f.configuration, requester: { ...f.configuration.requester, projectRoot: fs.realpathSync.native(other).replaceAll('\\', '/') } },
    { ...f.configuration, requester: { ...f.configuration.requester, scope: { ...scope, namespace: 'other-namespace' } } },
    { ...f.configuration, owner: { ...f.configuration.owner, projectRoot: fs.realpathSync.native(other).replaceAll('\\', '/') } },
    { ...f.configuration, owner: { ...f.configuration.owner, scope: { ...scope, namespace: 'other-namespace' } } },
    { ...f.configuration, libraryId: '0'.repeat(64) },
  ]) { const pin = configure(f, value); assertNoMutation(() => rejectsRead(f, pin), [f.owner, f.requester, f.libraryPath, other]); }
});

test('both original owner and source library marker changes revoke reads without any repair or fallback', () => {
  for (const location of ['owner', 'library']) {
    const f = fixture(`marker-${location}`);
    const markerPath = location === 'owner' ? path.join(f.ownerWorkspace, 'studio', 'media-library.json') : path.join(f.libraryPath, 'media-library.json');
    const original = fs.readFileSync(markerPath); retain(`marker-${location}-original.json`, { bytesBase64: original.toString('base64'), sha256: sha(original) });
    fs.writeFileSync(markerPath, Buffer.from(canonical({ ...JSON.parse(original.toString()), libraryId: '0'.repeat(64) })));
    assertNoMutation(() => rejectsRead(f), [f.owner, f.requester, f.libraryPath]);
  }
});

test('original owner record mismatch and post-construction record revocation reject copied-record authority', () => {
  const f = fixture('owner-record');
  const changedPin = configure(f, { ...f.configuration, owner: { ...f.configuration.owner, recordSha256: '0'.repeat(64) } });
  assertNoMutation(() => rejectsRead(f, changedPin), [f.owner, f.requester, f.libraryPath]);
  configure(f);
  withLibrary(f, library => {
    assert.deepEqual(library.read(f.asset.sourcePath, f.asset.contentHash, fixtureBytes.length, f.binding), fixtureBytes);
    const original = fs.readFileSync(f.ownerRecord); retain('owner-record-before-revocation.json', { sha256: sha(original), bytesBase64: original.toString('base64') });
    fs.writeFileSync(f.ownerRecord, Buffer.concat([original, Buffer.from('\n')]));
    assertNoMutation(() => assert.throws(() => library.read(f.asset.sourcePath, f.asset.contentHash, fixtureBytes.length, f.binding), denied), [f.owner, f.requester, f.libraryPath]);
  });
});

test('read open and verify enforce the same exact permitted tuple and reject existing unapproved versions', () => {
  const f = fixture('asset-set', true);
  withLibrary(f, library => {
    for (const operation of ['read', 'open', 'verify']) {
      const before = inventory(f.libraryPath);
      assert.throws(() => library[operation](f.secondAsset.sourcePath, f.secondAsset.contentHash, fixtureBytes.length, f.binding), denied, operation);
      for (const args of [
        [f.asset.sourcePath, '0'.repeat(64), fixtureBytes.length, f.binding],
        [f.asset.sourcePath, f.asset.contentHash, fixtureBytes.length - 1, f.binding],
        [f.asset.sourcePath, f.asset.contentHash, fixtureBytes.length, { ...f.binding, libraryId: '0'.repeat(64) }],
        [f.asset.sourcePath.replace('/projects/', '/projects/../'), f.asset.contentHash, fixtureBytes.length, f.binding],
      ]) assert.throws(() => library[operation](...args), denied, operation);
      assert.deepEqual(inventory(f.libraryPath), before);
    }
    library.verify(f.asset.sourcePath, f.asset.contentHash, fixtureBytes.length, f.binding);
  });
  withRepository(f.requester, f.pin, repository => assert.throws(() => repository.readFootage(projectId, f.secondAsset.assetId, f.secondAsset.version), denied));
});

test('self-consistent copied record cannot inject an allowed-looking foreign asset or library', () => {
  const f = fixture('copy-injection', true);
  const recordPath = path.join(f.requesterWorkspace, 'studio', 'projects', projectId, 'manifests', 'project.json');
  const record = JSON.parse(fs.readFileSync(recordPath, 'utf8'));
  record.assets[1].provenance.adapterMetadata.settings.libraryId = '0'.repeat(64);
  const { recordDigest: unused, ...without } = record; void unused;
  record.recordDigest = sha(canonical(without)); fs.writeFileSync(recordPath, canonical(record));
  assertNoMutation(() => withRepository(f.requester, f.pin, repository => {
    // Metadata parsing succeeds; the failure must be the external-library authority check.
    assert.equal(repository.loadManifest(projectId).assets[1].provenance.adapterMetadata.settings.libraryId, '0'.repeat(64));
    assert.throws(() => repository.readFootage(projectId, f.secondAsset.assetId, f.secondAsset.version), denied);
  }), [f.owner, f.requester, f.libraryPath]);
});

test('allowlist additions not present in the pinned original owner record are rejected', () => {
  const f = fixture('allowlist-injection');
  const invented = { ...f.tuple, assetId: 'asset_unapproved', sourcePath: f.tuple.sourcePath.replace(f.tuple.assetId, 'asset_unapproved') };
  const pin = configure(f, { ...f.configuration, allowedAssets: [f.tuple, invented] });
  assertNoMutation(() => rejectsRead(f, pin), [f.owner, f.requester, f.libraryPath]);
});

test('missing source part fails without recreating bytes or falling back to an identical local copy', () => {
  const f = fixture('missing-part');
  const part = path.join(f.libraryPath, path.dirname(f.asset.sourcePath), `${f.asset.contentHash}.part-0000.bin`), retained = part + '.retained';
  owned(part); owned(retained); assert.equal(fs.existsSync(retained), false); fs.renameSync(part, retained);
  const local = path.join(f.requesterWorkspace, f.asset.sourcePath); fs.mkdirSync(path.dirname(local), { recursive: true }); fs.writeFileSync(local, fixtureBytes, { flag: 'wx' });
  assertNoMutation(() => rejectsRead(f), [f.owner, f.requester, f.libraryPath]);
  assert.equal(fs.existsSync(part), false);
});

test('missing source library fails closed without initialization or marker publication', () => {
  const f = fixture('missing-library'), retained = f.libraryPath + '-retained';
  owned(f.libraryPath); owned(retained); assert.equal(fs.existsSync(retained), false);
  fs.renameSync(f.libraryPath, retained);
  assertNoMutation(() => rejectsRead(f), [f.owner, f.requester, drive]);
  assert.equal(fs.existsSync(f.libraryPath), false);
});

test('compatibility destination and both bound and local publication reject before any native write', () => {
  const f = fixture('publication'), before = nativeCalls.length;
  withLibrary(f, library => {
    assertNoMutation(() => {
      assert.throws(() => library.destination(), denied);
      assert.throws(() => library.write(f.asset.sourcePath, fixtureBytes, f.binding), denied);
      assert.throws(() => library.write(f.asset.sourcePath, fixtureBytes, null), denied);
    }, [f.owner, f.requester, f.libraryPath]);
  });
  assert.equal(nativeCalls.slice(before).some(call => call.mutation), false);
  assert.throws(() => withLibrary(f, () => assert.fail('D import destination must not open'), f.pin, 'd-drive'), denied);
});

test('direct import replay new import finalization and reservation reject before canonical mutation', () => {
  const f = fixture('import-reject');
  assertNoMutation(() => withRepository(f.requester, f.pin, repository => {
    const state = repository.loadManifest(projectId), current = { ...f.input, expectedProjectRevision: state.project.revision, expectedShotRevision: state.shots[0].revision, requestedAt: now() };
    const readOnly = error => error.code === 'FOOTAGE_COMPATIBILITY_READ_ONLY';
    assert.throws(() => repository.importFootage(f.input, fixtureBytes, `import-${f.name}-00000001`, actor), readOnly);
    assert.throws(() => repository.importFootage(current, fixtureBytes, 'new-compat-import-0001', actor), readOnly);
    assert.throws(() => repository.assertFootageImportCapacity(current, fixtureBytes.length), readOnly);
    let stagedAccesses = 0;
    const staged = new Proxy({}, { get() { stagedAccesses++; throw new Error('Rejected compatibility import inspected staged transfer bytes.'); } });
    assert.throws(() => repository.importFootageFile(current, staged, 'finalize-compat-0001', actor), readOnly);
    assert.equal(stagedAccesses, 0);
  }), [f.owner, f.requester, f.libraryPath]);
});

test('HTTP import and upload operations reject before receiver configuration reservation or source reads', async () => {
  const f = fixture('http-import'), before = [f.owner, f.requester, f.libraryPath].map(inventory);
  await context(f.requester, f.pin, async () => {
    let receivers = 0, configurations = 0, repositories = 0;
    const openRepository = () => { repositories++; return openStudioRepository({ ...scope, mediaStorage: 'workspace' }); };
    const direct = footageHttp.createStudioFootageHandler({ enabled: true, listenerAddresses: () => ['127.0.0.1'], openRepository, receiveImport: async () => { receivers++; throw new Error('Transfer receiver must not start.'); } });
    const sessions = uploadHttp.createStudioFootageUploadHandler({ enabled: true, listenerAddresses: () => ['127.0.0.1'], openRepository, configuration: () => { configurations++; throw new Error('Upload storage must not open.'); } });
    const origin = 'http://127.0.0.1:3397';
    const headers = { Host: '127.0.0.1:3397', Origin: origin, 'Sec-Fetch-Site': 'same-origin', 'X-CodexForge-Animation-Studio': 'local-operator-v1', 'Idempotency-Key': 'compat-http-import-0001', 'Content-Type': 'application/octet-stream', 'X-CodexForge-Footage': encodeURIComponent(JSON.stringify(f.input)) };
    const response = await direct(new Request(origin + '/api/codexforge/animation-studio/footage', { method: 'POST', headers, body: fixtureBytes }));
    assert.ok(response.status >= 400); assert.match(JSON.stringify(await response.json()), /FOOTAGE_COMPATIBILITY_READ_ONLY/u);
    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
      const result = await sessions(new Request(origin + uploadHttp.STUDIO_FOOTAGE_UPLOAD_ENDPOINT, { method, headers, ...(method === 'POST' ? { body: '{}' } : {}) }));
      assert.ok(result.status >= 400); assert.match(JSON.stringify(await result.json()), /FOOTAGE_COMPATIBILITY_READ_ONLY/u);
    }
    assert.equal(receivers, 0); assert.equal(configurations, 0); assert.equal(repositories, 0);
  });
  [f.owner, f.requester, f.libraryPath].forEach((root, index) => assert.deepEqual(inventory(root), before[index]));
});

test('isolated work-root guard accepts only descendants of the authorized requesting workspace', () => {
  const f = fixture('work-root'), work = path.join(f.requester, 'work'); fs.mkdirSync(work);
  context(f.requester, f.pin, () => {
    compatibility.assertStudioCompatibilityWorkRoot(work);
    for (const wrong of [f.owner, f.ownerWorkspace, f.libraryPath, evidence, path.join(evidence, 'absent-work-root')]) assert.throws(() => compatibility.assertStudioCompatibilityWorkRoot(wrong), denied);
  });
  context(f.requester, null, () => { compatibility.assertStudioCompatibilityImportAllowed(); });
});

test('native staging pin prevents work-root and ancestor renames for the retained server lifetime', () => {
  const f = fixture('work-root-pin'), ancestor = path.join(f.requester, 'staging-parent'), work = path.join(ancestor, 'work');
  fs.mkdirSync(ancestor); fs.mkdirSync(work);
  fs.writeFileSync(path.join(work, 'preserved.bin'), Buffer.from('synthetic pinned staging identity'), { flag: 'wx' });
  const before = [f.owner, f.requester, f.libraryPath].map(inventory);
  context(f.requester, f.pin, () => {
    compatibility.pinStudioCompatibilityWorkRoot(work);
    // The same tuple is reusable; a retained pin must not be released when a
    // validation call returns or when an equivalent caller obtains it again.
    compatibility.pinStudioCompatibilityWorkRoot(work);
  });
  for (const source of [work, ancestor]) {
    const destination = source + '-renamed'; owned(source); owned(destination);
    assert.equal(fs.existsSync(destination), false);
    assert.throws(() => fs.renameSync(source, destination), error => ['EPERM', 'EACCES', 'EBUSY'].includes(error?.code), 'Native no-delete-sharing handles must reject the ordinary rename, not merely notice it afterward.');
    assert.equal(fs.existsSync(destination), false);
  }
  [f.owner, f.requester, f.libraryPath].forEach((root, index) => assert.deepEqual(inventory(root), before[index]));
});

test('native job pin blocks job and evidence-ancestor renames until close while default mode remains unpinned', () => {
  // This fresh envelope is an ancestor above requester, separate from the
  // earlier lifetime-pin fixture. It can therefore prove release independently
  // without closing or weakening any other live staging guard.
  const envelope = path.join(evidence, 'job-pin-evidence-envelope'); fs.mkdirSync(envelope);
  const f = fixture('job-directory-pin', false, envelope), work = path.join(f.requester, 'work'), job = path.join(work, 'job-owned');
  fs.mkdirSync(work); fs.mkdirSync(job);
  fs.writeFileSync(path.join(job, 'preserved.bin'), Buffer.from('synthetic independently pinned job'), { flag: 'wx' });
  const before = [envelope, f.libraryPath].map(inventory), callStart = nativeCalls.length;
  context(f.requester, null, () => assert.equal(compatibility.pinStudioCompatibilityJobDirectory(work, job), null));
  assert.equal(nativeCalls.length, callStart, 'Default mode must not acquire a compatibility native guard.');
  let guard;
  try {
    context(f.requester, f.pin, () => { guard = compatibility.pinStudioCompatibilityJobDirectory(work, job); });
    assert.ok(guard && typeof guard.close === 'function');
    for (const source of [job, envelope]) {
      const destination = source + '-renamed'; owned(source); owned(destination);
      assert.equal(fs.existsSync(destination), false);
      assert.throws(() => fs.renameSync(source, destination), error => ['EPERM', 'EACCES', 'EBUSY'].includes(error?.code), 'The full native chain must pin the job and its evidence ancestor.');
      assert.equal(fs.existsSync(destination), false);
    }
    [envelope, f.libraryPath].forEach((root, index) => assert.deepEqual(inventory(root), before[index]));
  } finally { guard?.close(); }
  // These controlled rename-and-return operations prove that the earlier
  // failures were held-handle protection, not a permanently unwritable fixture.
  for (const source of [job, envelope]) {
    const destination = source + '-renamed'; owned(source); owned(destination);
    assert.equal(fs.existsSync(destination), false);
    fs.renameSync(source, destination);
    assert.equal(fs.existsSync(source), false); assert.equal(fs.existsSync(destination), true);
    fs.renameSync(destination, source);
    assert.equal(fs.existsSync(destination), false);
  }
  [envelope, f.libraryPath].forEach((root, index) => assert.deepEqual(inventory(root), before[index]));
});

test('removable native job guard cleans only its pinned job without close-then-path deletion', () => {
  const f = fixture('job-exact-cleanup'), work = path.join(f.requester, 'work'), job = path.join(work, 'job-owned'), sibling = path.join(work, 'job-sibling');
  fs.mkdirSync(work); fs.mkdirSync(job); fs.mkdirSync(sibling);
  fs.mkdirSync(path.join(job, 'nested'));
  fs.writeFileSync(path.join(job, 'child.bin'), Buffer.from('owned direct child'), { flag: 'wx' });
  fs.writeFileSync(path.join(job, 'nested', 'child.bin'), Buffer.from('owned nested child'), { flag: 'wx' });
  fs.writeFileSync(path.join(sibling, 'preserved.bin'), Buffer.from('sibling must survive exact-root cleanup'), { flag: 'wx' });
  const protectedRoots = [sibling, f.owner, f.libraryPath, f.requesterWorkspace], protectedBefore = protectedRoots.map(inventory);
  const configBefore = sha(fs.readFileSync(f.configPath));
  const expectedWork = inventory(work).filter(entry => entry.path !== 'job-owned' && !entry.path.startsWith('job-owned/'));
  let guard, removed = false;
  try {
    context(f.requester, f.pin, () => { guard = compatibility.pinStudioCompatibilityJobDirectory(work, job); });
    assert.ok(guard && typeof guard.removeRoot === 'function');
    const renamed = job + '-renamed'; owned(job); owned(renamed); assert.equal(fs.existsSync(renamed), false);
    assert.throws(() => fs.renameSync(job, renamed), error => ['EPERM', 'EACCES', 'EBUSY'].includes(error?.code));
    assert.equal(fs.existsSync(renamed), false);
    // Cleanup uses the already pinned removable native handle. Never release
    // the authority and then resolve/delete a potentially substituted path.
    guard.removeRoot(); removed = true;
    assert.equal(fs.existsSync(job), false);
    assert.deepEqual(inventory(work), expectedWork);
    protectedRoots.forEach((root, index) => assert.deepEqual(inventory(root), protectedBefore[index]));
    assert.equal(sha(fs.readFileSync(f.configPath)), configBefore);
  } finally {
    // A failed test releases its handle but retains all surviving test files.
    // Successful removeRoot already closes its exact-root authority.
    if (!removed) guard?.close();
  }
});

test('isolated project history and queued job writes survive repository reopening without source changes or replay', () => {
  const f = fixture('local-state'), ownerBefore = inventory(f.owner), libraryBefore = inventory(f.libraryPath);
  let expected;
  withRepository(f.requester, f.pin, repository => {
    const state = repository.load(projectId);
    repository.reviseProject(projectId, state.project.revision, 'Changed only in isolated copy', state.project.description, 'isolated-project-revision-0001', actor, now());
    const job = { schemaVersion: 1, jobId: 'job_isolated_pending', type: 'QC', projectId, shotId: null, dependencies: [], state: 'QUEUED', attempt: 0, maxAttempts: 1, createdAt: now(), startedAt: null, finishedAt: null, adapterMetadata: null, inputs: [{ assetId: f.asset.assetId, version: f.asset.version }], outputs: [], error: null, checkpoint: {}, costEstimate: { currency: 'GBP', minorUnits: 0 }, actualCost: { currency: 'GBP', minorUnits: 0 }, externalActions: [], requiredGates: [], approvalSubjectHash: repository.approvalScope(projectId), dispatch: null };
    repository.createJob(job, 'isolated-queued-job-0001', actor); expected = repository.load(projectId);
  });
  const copyBeforeReopen = inventory(f.requester);
  withRepository(f.requester, f.pin, repository => { const actual = repository.load(projectId); assert.deepEqual(actual, expected); assert.equal(actual.jobs[0].state, 'QUEUED'); assert.equal(actual.jobs[0].attempt, 0); assert.equal(actual.jobs[0].dispatch, null); });
  assert.deepEqual(inventory(f.requester), copyBeforeReopen); assert.deepEqual(inventory(f.owner), ownerBefore); assert.deepEqual(inventory(f.libraryPath), libraryBefore);
});

test('verified source bytes materialize only into isolated C staging and output storage remains independently writable', () => {
  const f = fixture('local-output'), ownerBefore = inventory(f.owner), sourceBefore = inventory(f.libraryPath), work = path.join(f.requester, 'work'); fs.mkdirSync(work);
  const stagedPath = path.join(work, 'synthetic-output.mp4');
  withRepository(f.requester, f.pin, repository => {
    const opened = repository.openFootage(projectId, f.asset.assetId, f.asset.version), handle = fs.openSync(stagedPath, 'wx'), hash = createHash('sha256'); let total = 0;
    try { while (total < opened.reader.byteLength) { const bytes = opened.reader.read(total, Math.min(524_288, opened.reader.byteLength - total)); hash.update(bytes); fs.writeSync(handle, bytes); total += bytes.length; } fs.fsyncSync(handle); }
    finally { fs.closeSync(handle); opened.reader.close(); }
    assert.equal(total, fixtureBytes.length); assert.equal(hash.digest('hex'), f.asset.contentHash); assert.equal(sha(fs.readFileSync(stagedPath)), f.asset.contentHash);
  });
  context(f.requester, f.pin, () => {
    compatibility.assertStudioCompatibilityWorkRoot(work);
    const root = new actualNative.Root(f.requester, segments, 'persistent');
    try {
      // Storage-only evidence: these synthetic bytes are never labelled a validated render.
      const output = outputStorage.publishStudioRenderOutput(root, { projectId, stagedPath, workRoot: work, output: { assetId: 'asset_synthetic_storage_output', version: 1, jobId: 'job_synthetic_storage_output', headDigest: '1'.repeat(64), createdAt: now(), video: { codec: 'h264', width: 1280, height: 720, frameRate: '25/1', decodedFrames: 1 }, audio: { codec: 'aac', sampleRate: 48_000, channels: 2 }, probeDigest: '2'.repeat(64) } });
      assert.equal(output.contentHash, f.asset.contentHash); assert.equal(output.byteLength, fixtureBytes.length);
      const reader = outputStorage.openStudioRenderOutput(root, projectId, output); assert.deepEqual(reader.read(0), fixtureBytes.subarray(0, outputStorage.STUDIO_RENDER_OUTPUT_CHUNK_BYTES));
      retain('storage-only-output.json', { output, validatedRender: false, syntheticFraming: true });
    } finally { root.close(); }
  });
  assert.deepEqual(inventory(f.owner), ownerBefore); assert.deepEqual(inventory(f.libraryPath), sourceBefore);
});

test('metadata caches cannot grant default copied-root access or confuse explicit binding and write contexts', () => {
  const f = fixture('cache'); let ownerDigest, compatibilityDigest;
  withRepository(f.owner, null, repository => { ownerDigest = repository.renderCacheScopeDigest; const snapshot = repository.loadManifest(projectId); assert.equal(repository.renderSourceDescriptor(snapshot, f.asset).byteLength, fixtureBytes.length); });
  withRepository(f.requester, null, repository => {
    assert.notEqual(repository.renderCacheScopeDigest, ownerDigest, 'Actual writable root must participate in cache context.');
    assert.throws(() => repository.renderSourceDescriptor(repository.loadManifest(projectId), f.asset));
  });
  withRepository(f.requester, f.pin, repository => { compatibilityDigest = repository.renderCacheScopeDigest; assert.notEqual(compatibilityDigest, ownerDigest); assert.equal(repository.renderSourceDescriptor(repository.loadManifest(projectId), f.asset).byteLength, fixtureBytes.length); });
  withRepository(f.requester, null, repository => { assert.notEqual(repository.renderCacheScopeDigest, compatibilityDigest); assert.throws(() => repository.renderSourceDescriptor(repository.loadManifest(projectId), f.asset)); });
  const other = fixture('cache-other');
  withRepository(other.requester, other.pin, repository => assert.notEqual(repository.renderCacheScopeDigest, compatibilityDigest));
});

test('default owner reads and destination behavior remain unchanged when compatibility override is absent', () => {
  const f = fixture('ordinary'), beforeOwner = inventory(f.owner), beforeSource = inventory(f.libraryPath);
  withRepository(f.owner, null, repository => assert.deepEqual(repository.readFootage(projectId, f.asset.assetId, f.asset.version), fixtureBytes));
  context(f.owner, null, () => {
    assert.equal(compatibility.readStudioCompatibilityBinding(scope), null);
    compatibility.assertStudioCompatibilityImportAllowed();
    const root = new actualNative.Root(f.owner, segments, 'persistent');
    try {
      const normal = createStudioFootageLibrary({ workspaceRoot: root, workspaceScope: scope, importDestination: 'd-drive', availableBytes: () => Number.MAX_SAFE_INTEGER });
      try { assert.deepEqual(normal.destination(), f.binding); } finally { normal.close(); }
    } finally { root.close(); }
  });
  assert.deepEqual(inventory(f.owner), beforeOwner); assert.deepEqual(inventory(f.libraryPath), beforeSource);
});

try {
  for (const item of tests) {
    try { await item.run(); results.push({ name: item.name, status: 'PASS' }); }
    catch (error) { results.push({ name: item.name, status: 'FAIL', error: { name: error.name, code: error.code ?? null, message: error.message, stack: error.stack } }); }
  }
} finally {
  process.chdir(frontend); paths.CODEXFORGE_PROJECT_ROOT = actualPathRoot;
  if (savedPin === undefined) delete process.env[PIN]; else process.env[PIN] = savedPin;
}
const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const status = results.length === tests.length && results.every(item => item.status === 'PASS') && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL';
retain('native-calls.json', nativeCalls);
retain('result.json', { status, runId, startedAt, finishedAt: new Date().toISOString(), planned: tests.length, passed: results.filter(item => item.status === 'PASS').length, failed: results.filter(item => item.status === 'FAIL').length, tests: results, sourceBindings, sourceUnchanged, networkAttempts, actualNative: true, nativeRebuilt: false, realDriveAccess: 0, providerRequests: 0, credentialReads: 0, subprocesses: 0, allCreatedTestDataRetained: true, syntheticFramingNotPlaybackEvidence: true });
console.log(JSON.stringify({ status, planned: tests.length, passed: results.filter(item => item.status === 'PASS').length, failures: results.filter(item => item.status === 'FAIL'), evidence, sourceUnchanged, realDriveAccess: 0 }));
if (status !== 'PASS') process.exitCode = 1;
