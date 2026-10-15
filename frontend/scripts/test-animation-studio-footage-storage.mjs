// Bounded chunk persistence contract with an in-memory root only. Never load/open native storage.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { writeStudioFootage, writeStudioFootageSource, readStudioFootage, openStudioFootageSource, STUDIO_FOOTAGE_CHUNK_BYTES, STUDIO_FOOTAGE_MAX_CHUNKS, STUDIO_FOOTAGE_INDEX_MAX_BYTES } = loader.load('@/lib/codexforge/animation-studio/footage-storage.server');
const { STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, STUDIO_FOOTAGE_MAX_BYTES, STUDIO_FOOTAGE_PROJECT_MAX_BYTES, STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS } = loader.load('@/lib/codexforge/animation-studio/footage-contract');
const CHUNK = STUDIO_FOOTAGE_CHUNK_BYTES, INDEX_LIMIT = STUDIO_FOOTAGE_INDEX_MAX_BYTES;
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const runId = randomUUID(), startedAt = new Date().toISOString();
const evidence = path.join(frontend, '.codexforge/acceptance', `studio-footage-storage-tests-${runId}`);
fs.mkdirSync(evidence, { recursive: true });
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const sourceBindings = [...loader.loaded, 'scripts/test-animation-studio-footage-storage.mjs', 'scripts/animation-studio-test-loader.mjs'].sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
retain('intent.json', { runId, startedAt, pid: process.pid, command: 'node scripts/test-animation-studio-footage-storage.mjs', scope: 'Source-only chunk storage contract; in-memory root; no native execution, provider, credentials, production data or server interaction.', sourceBindings });
function nativeError(code) { return Object.assign(new Error(`Synthetic storage ${code}`), { code }); }
class MemoryRoot {
  files = new Map(); writes = []; reads = []; beforeWrite = null;
  readFile(segments, maximumBytes) {
    assert.ok(Number.isSafeInteger(maximumBytes) && maximumBytes >= 0 && maximumBytes <= 1_048_576);
    const name = segments.join('/'); this.reads.push({ name, maximumBytes });
    const bytes = this.files.get(name); if (!bytes) throw nativeError('not_found');
    if (bytes.length > maximumBytes) throw nativeError('too_large');
    return Buffer.from(bytes);
  }
  writeAtomicExclusive(segments, temporaryName, bytes) {
    assert.ok(Buffer.isBuffer(bytes) && bytes.length <= 1_048_576);
    assert.match(temporaryName, /^footage-[a-f0-9]{24}\.tmp$/);
    const name = segments.join('/'); this.writes.push({ name, bytes: bytes.length });
    this.beforeWrite?.(name, bytes);
    if (this.files.has(name)) throw nativeError('already_exists');
    this.files.set(name, Buffer.from(bytes));
  }
}
function synthetic(length) {
  const bytes = Buffer.alloc(length);
  for (let offset = 0; offset < length; offset += CHUNK) bytes.fill(1 + offset / CHUNK, offset, Math.min(offset + CHUNK, length));
  return bytes;
}
function fixture(length = CHUNK + 17) {
  const bytes = synthetic(length), hash = sha(bytes), root = new MemoryRoot();
  const assetPath = `studio/projects/project_chunk_test/renders/asset_chunk_test/v1/${hash}.bin`;
  return { root, bytes, hash, assetPath };
}
function write(v) { writeStudioFootage(v.root, v.assetPath, v.bytes); }
function read(v) { return readStudioFootage(v.root, v.assetPath, v.hash, v.bytes.length); }
function index(v) { return JSON.parse(v.root.files.get(v.assetPath).toString('utf8')); }
function replaceIndex(v, value) { v.root.files.set(v.assetPath, Buffer.from(JSON.stringify(value))); }
function partPath(v, ordinal = 0) { return v.assetPath.replace(/\.bin$/, `.part-${String(ordinal).padStart(4, '0')}.bin`); }
function failClosed(fn, code = 'CORRUPT_FOOTAGE') { assert.throws(fn, error => error.code === code); }
const tests = [], results = [];
const test = (name, run) => tests.push({ name, run });

for (const length of [1, CHUNK, CHUNK + 1, 2 * 1024 * 1024 + 17, 16 * 1024 * 1024]) test(`byte-exact chunk roundtrip at ${length} bytes`, () => {
  assert.equal(STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, 16 * 1024 * 1024);
  assert.equal(STUDIO_FOOTAGE_MAX_BYTES, 2 * 1024 * 1024 * 1024);
  assert.equal(STUDIO_FOOTAGE_PROJECT_MAX_BYTES, 16 * 1024 * 1024 * 1024);
  assert.equal(STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS, 8);
  assert.equal(STUDIO_FOOTAGE_MAX_CHUNKS, 4096); assert.equal(INDEX_LIMIT, 512 * 1024);
  const v = fixture(length); write(v); assert.deepEqual(read(v), v.bytes);
  const metadata = index(v), count = Math.ceil(length / CHUNK);
  assert.equal(metadata.format, 'studio-footage-chunks-v1'); assert.equal(metadata.contentHash, v.hash);
  assert.equal(metadata.byteLength, length); assert.equal(metadata.chunkBytes, CHUNK); assert.equal(metadata.chunks.length, count);
  assert.equal(v.root.files.size, count + 1); assert.equal(v.root.writes.at(-1).name, v.assetPath);
  assert.ok(v.root.writes.slice(0, -1).every(item => item.bytes <= CHUNK)); assert.ok(v.root.writes.at(-1).bytes <= INDEX_LIMIT);
  assert.ok(v.root.reads.every(item => item.maximumBytes <= CHUNK));
});
test('empty and over-limit uploads reject before any publication', () => {
  for (const bytes of [Buffer.alloc(0), Buffer.alloc(STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES + 1), new Uint8Array([1]), null]) {
    const v = fixture(1); failClosed(() => writeStudioFootage(v.root, v.assetPath, bytes), 'INVALID_FOOTAGE_BYTES'); assert.equal(v.root.writes.length, 0);
  }
});
test('canonical video path rejects traversal, alternate areas, invalid IDs, versions and hash', () => {
  const v = fixture(1);
  for (const assetPath of [v.assetPath.replace('studio/', '../studio/'), `C:/${v.assetPath}`, v.assetPath.replace('/renders/', '/generation/'), v.assetPath.replace('project_chunk_test', 'project_bad-name'), v.assetPath.replace('asset_chunk_test', 'asset_' + 'a'.repeat(129)), v.assetPath.replace('/v1/', '/v01/'), v.assetPath.replace('/v1/', '/v9007199254740992/'), v.assetPath.replace(v.hash, '0'.repeat(64)), v.assetPath + '/extra', v.assetPath.replaceAll('/', '\\'), null]) {
    failClosed(() => writeStudioFootage(v.root, assetPath, v.bytes), 'INVALID_FOOTAGE_PATH');
    failClosed(() => readStudioFootage(v.root, assetPath, v.hash, 1), 'INVALID_FOOTAGE_PATH');
  }
  assert.equal(v.root.writes.length, 0); assert.equal(v.root.reads.length, 0);
});
test('expected bytes and hash are checked before unsafe reads', () => {
  const v = fixture(); write(v);
  for (const length of [0, -1, 1.5, NaN, Infinity, STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES + 1, STUDIO_FOOTAGE_MAX_BYTES + 1, '1', null]) failClosed(() => readStudioFootage(v.root, v.assetPath, v.hash, length));
  failClosed(() => readStudioFootage(v.root, v.assetPath, '0'.repeat(64), v.bytes.length), 'INVALID_FOOTAGE_PATH');
  assert.equal(v.root.reads.length, 0);
  failClosed(() => readStudioFootage(v.root, v.assetPath, v.hash, v.bytes.length - 1));
});
test('a 4096-part v1 index opens without allocating or reading a 2 GiB payload; 4097 parts reject before reads', () => {
  const root = new MemoryRoot(), hash = 'a'.repeat(64), byteLength = CHUNK * STUDIO_FOOTAGE_MAX_CHUNKS;
  const assetPath = `studio/projects/project_chunk_test/renders/asset_chunk_test/v1/${hash}.bin`;
  const chunk = { bytes: CHUNK, sha256: 'b'.repeat(64) };
  const indexBytes = Buffer.from(JSON.stringify({ format: 'studio-footage-chunks-v1', contentHash: hash, byteLength, chunkBytes: CHUNK, chunks: Array.from({ length: STUDIO_FOOTAGE_MAX_CHUNKS }, () => chunk) }));
  assert.ok(indexBytes.length < INDEX_LIMIT); root.files.set(assetPath, indexBytes);
  const reader = openStudioFootageSource(root, assetPath, hash, byteLength);
  assert.equal(reader.byteLength, byteLength); assert.equal(reader.contentHash, hash); assert.equal(root.reads.length, 1); reader.close();
  const over = byteLength + 1, overHash = 'c'.repeat(64), overPath = assetPath.replace(hash, overHash);
  failClosed(() => openStudioFootageSource(root, overPath, overHash, over));
  failClosed(() => writeStudioFootageSource(root, overPath, { byteLength: over, contentHash: overHash, read: () => { throw Error('must not read'); } }), 'INVALID_FOOTAGE_BYTES');
  assert.equal(root.reads.length, 1); assert.equal(root.writes.length, 0);
});
test('streamed source publication exceeds the separate 16 MiB whole-buffer compatibility limit', () => {
  const byteLength = STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES + 1, block = Buffer.alloc(CHUNK, 73), tail = Buffer.alloc(1, 91);
  const digest = createHash('sha256');
  for (let offset = 0; offset < byteLength; offset += CHUNK) digest.update(offset + CHUNK <= byteLength ? block : tail);
  const hash = digest.digest('hex'), root = new MemoryRoot();
  const assetPath = `studio/projects/project_chunk_test/renders/asset_chunk_test/v1/${hash}.bin`;
  let largestRead = 0;
  writeStudioFootageSource(root, assetPath, { byteLength, contentHash: hash, read(offset, length) {
    largestRead = Math.max(largestRead, length); return offset + length === byteLength ? tail : block;
  } });
  assert.equal(largestRead, CHUNK); assert.equal(index({ root, assetPath }).chunks.length, 33);
  const reader = openStudioFootageSource(root, assetPath, hash, byteLength); reader.verify(); reader.close();
});
test('bounded reader supports a cross-part range, streaming verification and close enforcement', () => {
  const v = fixture(2 * CHUNK + 19); write(v); v.root.reads.length = 0;
  const reader = openStudioFootageSource(v.root, v.assetPath, v.hash, v.bytes.length);
  assert.equal(reader.byteLength, v.bytes.length); assert.equal(reader.contentHash, v.hash);
  assert.deepEqual(reader.read(CHUNK - 8, 32), v.bytes.subarray(CHUNK - 8, CHUNK + 24));
  assert.deepEqual(reader.read(v.bytes.length, 0), Buffer.alloc(0));
  failClosed(() => reader.read(0, CHUNK + 1), 'INVALID_FOOTAGE_BYTES');
  reader.verify();
  assert.ok(v.root.reads.every(item => item.maximumBytes <= CHUNK));
  reader.close(); reader.close(); failClosed(() => reader.read(0, 1), 'INVALID_FOOTAGE_BYTES');
});
test('identical replay keeps exactly the same immutable stored bytes', () => {
  const v = fixture(); write(v); const before = new Map([...v.root.files].map(([name, bytes]) => [name, Buffer.from(bytes)]));
  write(v); assert.deepEqual(v.root.files, before); assert.deepEqual(read(v), v.bytes);
});
test('interruption after the first part leaves no readable index; identical retry completes', () => {
  const v = fixture(3 * CHUNK + 19); let publications = 0;
  v.root.beforeWrite = () => { if (++publications === 2) throw nativeError('injected_interruption'); };
  failClosed(() => write(v), 'injected_interruption'); assert.equal(v.root.files.size, 1); assert.equal(v.root.files.has(v.assetPath), false);
  failClosed(() => read(v), 'not_found'); v.root.beforeWrite = null; write(v); assert.deepEqual(read(v), v.bytes);
});
test('interruption immediately before index publication preserves parts and allows retry', () => {
  const v = fixture(); v.root.beforeWrite = name => { if (name === v.assetPath) throw nativeError('injected_interruption'); };
  failClosed(() => write(v), 'injected_interruption'); assert.equal(v.root.files.size, 2); assert.equal(v.root.files.has(v.assetPath), false);
  v.root.beforeWrite = null; write(v); assert.deepEqual(read(v), v.bytes);
});
test('conflicting existing part is never overwritten and prevents index publication', () => {
  const v = fixture(); v.root.files.set(partPath(v), Buffer.alloc(CHUNK, 99));
  failClosed(() => write(v)); assert.equal(v.root.files.has(v.assetPath), false); assert.deepEqual(v.root.files.get(partPath(v)), Buffer.alloc(CHUNK, 99));
});
test('conflicting existing index is never overwritten', () => {
  const v = fixture(); v.root.files.set(v.assetPath, Buffer.from('{}'));
  failClosed(() => write(v)); assert.equal(v.root.files.get(v.assetPath).toString(), '{}');
});
test('native safety, contention and authorization failures are not swallowed as replay', () => {
  for (const code of ['unsafe_reparse', 'unsafe_hardlink', 'busy', 'access_denied', 'conflict']) {
    const v = fixture(); v.root.beforeWrite = () => { throw nativeError(code); }; failClosed(() => write(v), code); assert.equal(v.root.files.size, 0);
  }
});
test('missing, truncated, oversized or byte-corrupted part fails closed', () => {
  for (const kind of ['missing', 'truncated', 'oversized', 'corrupted']) {
    const v = fixture(); write(v); const name = partPath(v);
    if (kind === 'missing') v.root.files.delete(name);
    else if (kind === 'truncated') v.root.files.set(name, v.root.files.get(name).subarray(1));
    else if (kind === 'oversized') v.root.files.set(name, Buffer.alloc(CHUNK + 1));
    else v.root.files.get(name)[0] ^= 255;
    failClosed(() => read(v), kind === 'missing' ? 'not_found' : kind === 'oversized' ? 'too_large' : 'CORRUPT_FOOTAGE');
  }
});
test('forged per-part hash matching tampered bytes still fails whole-file hash', () => {
  const v = fixture(); write(v); v.root.files.get(partPath(v))[0] ^= 255;
  const metadata = index(v); metadata.chunks[0].sha256 = sha(v.root.files.get(partPath(v))); replaceIndex(v, metadata);
  const reader = openStudioFootageSource(v.root, v.assetPath, v.hash, v.bytes.length);
  assert.deepEqual(reader.read(0, 32), v.root.files.get(partPath(v)).subarray(0, 32)); failClosed(() => reader.verify()); reader.close();
  failClosed(() => read(v));
});
test('part order is bound by fixed ordinal names and whole-file hash', () => {
  const v = fixture(2 * CHUNK); write(v); const first = v.root.files.get(partPath(v)), second = v.root.files.get(partPath(v, 1));
  v.root.files.set(partPath(v), second); v.root.files.set(partPath(v, 1), first);
  const metadata = index(v); metadata.chunks.reverse(); replaceIndex(v, metadata); failClosed(() => read(v));
});
test('index rejects unknown fields, supplied paths and invalid shape before reading parts', () => {
  const mutations = [
    value => ({ ...value, path: '../escape' }), value => ({ ...value, format: 'other' }), value => ({ ...value, chunkBytes: CHUNK + 1 }),
    value => ({ ...value, contentHash: '0'.repeat(64) }), value => ({ ...value, byteLength: value.byteLength + 1 }),
    value => ({ ...value, chunks: [] }), value => ({ ...value, chunks: Array.from({ length: 4097 }, () => value.chunks[0]) }),
    value => ({ ...value, chunks: value.chunks.slice(0, 1) }), value => ({ ...value, chunks: {} }), value => ({ ...value, chunks: [null, value.chunks[1]] }),
    value => ({ ...value, chunks: [{ ...value.chunks[0], filename: '../escape' }, value.chunks[1]] }),
    value => ({ ...value, chunks: [{ ...value.chunks[0], bytes: CHUNK - 1 }, value.chunks[1]] }),
    value => ({ ...value, chunks: [{ ...value.chunks[0], bytes: String(CHUNK) }, value.chunks[1]] }),
    value => ({ ...value, chunks: [{ ...value.chunks[0], sha256: 'a'.repeat(63) }, value.chunks[1]] }),
    value => ({ ...value, chunks: [value.chunks[0], { ...value.chunks[1], bytes: 17.5 }] }),
    () => [], () => null,
  ];
  for (const mutate of mutations) {
    const v = fixture(); write(v); replaceIndex(v, mutate(index(v))); failClosed(() => read(v));
    assert.equal(v.root.reads.length, 1); assert.equal(v.root.reads[0].name, v.assetPath);
  }
});
test('index rejects duplicate keys including escaped equivalents at top and chunk levels', () => {
  for (const transform of [text => text.replace('{', '{"format":"studio-footage-chunks-v1",'), text => text.replace('{', '{"for\\u006dat":"studio-footage-chunks-v1",'), text => text.replace('"chunks":[{', '"chunks":[{"bytes":524288,')]) {
    const v = fixture(); write(v); v.root.files.set(v.assetPath, Buffer.from(transform(v.root.files.get(v.assetPath).toString()))); failClosed(() => read(v)); assert.equal(v.root.reads.length, 1);
  }
});
test('index rejects invalid UTF-8, BOM, excessive depth, malformed/trailing JSON and oversized bytes', () => {
  for (const bad of [Buffer.from([0xc3, 0x28]), Buffer.from('\ufeff{}'), Buffer.from('{"nested":' + '['.repeat(200) + '0' + ']'.repeat(200) + '}'), Buffer.from('{'), Buffer.from('{}{}'), Buffer.from('null'), Buffer.alloc(0), Buffer.alloc(INDEX_LIMIT + 1, 32)]) {
    const v = fixture(); write(v); v.root.files.set(v.assetPath, bad); failClosed(() => read(v), bad.length > INDEX_LIMIT ? 'too_large' : 'CORRUPT_FOOTAGE'); assert.equal(v.root.reads.length, 1);
  }
});
test('footage test never imports a native binding or provider code and trips no network boundary', () => {
  assert.equal(loader.loaded.some(name => /creator-native-filesystem|higgsfield.*server|store\.server/.test(name)), false); assert.deepEqual(networkAttempts, []);
});

for (const item of tests) {
  try { item.run(); results.push({ name: item.name, status: 'PASS' }); }
  catch (error) { results.push({ name: item.name, status: 'FAIL', error: error instanceof Error ? error.message : 'Unknown test failure' }); process.exitCode = 1; break; }
}
const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const summary = { startedAt, finishedAt: new Date().toISOString(), runId, status: results.length === tests.length && results.every(item => item.status === 'PASS') && networkAttempts.length === 0 && sourceUnchanged ? 'PASS' : 'FAIL', planned: tests.length, testCount: results.length, results, networkAttempts, nativeRootsOpened: 0, nativeExecution: false, providerRequests: 0, credentialReads: 0, productionDataMutations: 0, sourceBindings, sourceUnchanged };
retain('result.json', summary);
console.log(JSON.stringify({ evidence, status: summary.status, planned: tests.length, testCount: results.length, failures: results.filter(item => item.status !== 'PASS'), networkAttempts: networkAttempts.length, nativeExecution: false }));
if (summary.status !== 'PASS') process.exitCode = 1;
