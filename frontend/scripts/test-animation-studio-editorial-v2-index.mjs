// Actual v2 index + validator, with immutable content-hash-bound memory IO only.
// No native execution, repository data, media, providers, credentials or network.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { editorialV2Index } = loader.load('@/lib/codexforge/animation-studio/editorial-v2-index.server');
const { serializeJarvisChatCanonicalJson: canonical } = loader.load('@/lib/codexforge/jarvis-chat/jarvis-chat-crypto');
const sha = value => createHash('sha256').update(value).digest('hex');
const clone = value => JSON.parse(JSON.stringify(value));
const HASH = /^[a-f0-9]{64}$/;
const scope = { projectId: 'project_partitioned_index_test', namespace: 'entities' };
const format = 'studio-editorial-index-v2';
const valueHash = key => sha(`immutable-value:${key}`);
const runId = randomUUID(), startedAt = new Date().toISOString();
const acceptance = path.join(frontend, '.codexforge/acceptance');
assert.ok(fs.statSync(acceptance).isDirectory(), 'Use the existing acceptance parent, never a sealed checkpoint.');
const evidence = path.join(acceptance, `studio-editorial-v2-index-tests-${runId}`); fs.mkdirSync(evidence);
const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const sourceBindings = [...new Set([...loader.loaded, 'scripts/animation-studio-test-loader.mjs', 'scripts/test-animation-studio-editorial-v2-index.mjs', 'native/codexforge_creator_filesystem.cc', 'build/Release/codexforge_creator_filesystem.node'])].sort().map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
assert.equal(sourceBindings.find(item => item.path.endsWith('.node')).sha256, '848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4');
assert.equal(sourceBindings.find(item => item.path.endsWith('.cc')).sha256, '793fd1b462632acaf45095ea98f721df7211e8a72b567db1407b0b9d7e456e6c');
retain('intent.json', { runId, startedAt, pid: process.pid, scope: 'Real index and validation code. Immutable hash-checked memory IO. No validator/hash stubs, no full-hash collision claim, native execution, production state, provider, credential, network or old-checkpoint writes.', sourceBindings });

class MemoryIO {
  pages = new Map(); reads = []; stages = []; maximumPageBytes = 0;
  read(hash) {
    assert.match(hash, HASH); this.reads.push(hash);
    const bytes = this.pages.get(hash); if (!bytes) throw Object.assign(Error('Missing synthetic index page'), { code: 'SYNTHETIC_NOT_FOUND' });
    assert.equal(sha(bytes), hash, 'Memory IO must not supply bytes under an incorrect content hash.');
    assert.ok(bytes.length <= 1_048_576); return JSON.parse(bytes.toString('utf8'));
  }
  stage(value) {
    const bytes = Buffer.from(canonical(value)); assert.ok(bytes.length <= 1_048_576, 'Existing native transfer cap is unchanged.');
    const hash = sha(bytes); this.maximumPageBytes = Math.max(this.maximumPageBytes, bytes.length);
    this.stages.push({ hash, value: clone(value), bytes: bytes.length });
    if (this.pages.has(hash)) assert.deepEqual(this.pages.get(hash), bytes); else this.pages.set(hash, bytes);
    return hash;
  }
  reset() { this.reads = []; this.stages = []; }
  operation(callback) {
    this.reset(); const result = callback();
    assert.ok(this.reads.length <= 65, `Read bound exceeded: ${this.reads.length}`);
    assert.ok(this.stages.length <= 65, `Publication bound exceeded: ${this.stages.length}`);
    return result;
  }
}
function leaf(key, changes = {}) { return { format, ...scope, kind: 'leaf', key, keyHash: sha(key), valueHash: valueHash(key), ...changes }; }
function branch(prefix, children, changes = {}) { return { format, ...scope, kind: 'branch', prefix, children, ...changes }; }
function rejects(io, operation) { io.reset(); assert.throws(operation); assert.equal(io.stages.length, 0, 'Rejected pages cannot publish a replacement.'); assert.ok(io.reads.length <= 65); }
function twoKeys() { const a = 'layer:known', hash = sha(a); for (let n = 0; n < 256; n++) { const b = `layer:other:${n}`; if (sha(b)[0] !== hash[0]) return [a, b]; } throw Error('Deterministic two-key fixture search exhausted.'); }
const keys = Array.from({ length: 1024 }, (_, index) => `layer:shared:shot_alpha:${String(index).padStart(5, '0')}`);
let candidatesExamined = 0;
for (; candidatesExamined < 65_536 && keys.length < 1088; candidatesExamined++) { const key = `take:cluster:${candidatesExamined}`; if (sha(key).startsWith('aa')) keys.push(key); }
assert.equal(keys.length, 1088); assert.equal(new Set(keys).size, keys.length);
const results = [], metrics = {};
const tests = [];
const test = (name, run) => tests.push({ name, run });
let populated;

test('Empty lookups and exact valid key boundaries perform only the necessary publications', () => {
  const io = new MemoryIO(), index = editorialV2Index(io, scope);
  assert.equal(io.operation(() => index.get(null, 'a')), null); assert.equal(io.reads.length, 0); assert.equal(io.stages.length, 0);
  for (const key of ['a', 'entity:take_01-version', 'a'.repeat(160)]) { const root = io.operation(() => index.set(null, key, valueHash(key))); assert.equal(io.stages.length, 1); assert.equal(io.reads.length, 0); assert.equal(io.operation(() => index.get(root, key)), valueHash(key)); }
});
test('Invalid query keys, root hashes and value hashes reject before unsafe IO', () => {
  const io = new MemoryIO(), index = editorialV2Index(io, scope);
  for (const key of ['', 'a'.repeat(161), 'UPPER', '../escape', 'a/b', 'a\\b', 'space key', 'é', null, 42, {}, []]) { rejects(io, () => index.get(null, key)); rejects(io, () => index.set(null, key, 'a'.repeat(64))); assert.equal(io.reads.length, 0); }
  for (const hash of ['', 'a'.repeat(63), 'A'.repeat(64), '../unsafe', 42, undefined]) { rejects(io, () => index.get(hash, 'valid')); rejects(io, () => index.set(null, 'valid', hash)); assert.equal(io.reads.length, 0); }
});
test('1088 independent keys including a real two-nibble SHA prefix cluster roundtrip with bounded operations', () => {
  const io = new MemoryIO(), index = editorialV2Index(io, scope); let root = null, maxReads = 0, maxStages = 0;
  for (const key of keys) { root = io.operation(() => index.set(root, key, valueHash(key))); maxReads = Math.max(maxReads, io.reads.length); maxStages = Math.max(maxStages, io.stages.length); }
  const retainedPages = io.pages.size;
  for (const key of keys) assert.equal(io.operation(() => index.get(root, key)), valueHash(key));
  assert.equal(io.pages.size, retainedPages); assert.equal(io.operation(() => index.get(root, 'layer:missing')), null);
  assert.ok(keys.slice(1024).every(key => sha(key).startsWith('aa')));
  metrics.scale = { keys: keys.length, commonLogicalPrefixKeys: 1024, realHashPrefix: 'aa', realHashPrefixKeys: 64, candidatesExamined, retainedPages, maximumSetReads: maxReads, maximumSetStages: maxStages, maximumPageBytes: io.maximumPageBytes, rootHash: root };
  populated = { io, index, root };
});
test('Canonical final root is independent of forward, reverse and deterministic permuted insertion order', () => {
  const orders = [[...keys].reverse(), keys.map((_, index) => keys[(index * 137) % keys.length])];
  const summaries = [];
  for (const order of orders) {
    assert.equal(new Set(order).size, keys.length); const io = new MemoryIO(), index = editorialV2Index(io, scope); let root = null;
    for (const key of order) root = io.operation(() => index.set(root, key, valueHash(key)));
    assert.equal(root, populated.root); for (const key of keys) assert.equal(io.operation(() => index.get(root, key)), valueHash(key));
    summaries.push({ retainedPages: io.pages.size, rootHash: root, maximumPageBytes: io.maximumPageBytes });
  }
  metrics.insertionOrders = summaries;
});
test('Setting an unchanged value stages zero pages and retains the exact root and immutable page inventory', () => {
  const { io, index, root } = populated, before = [...io.pages.keys()].sort();
  for (const key of [keys[0], keys[500], keys.at(-1)]) { assert.equal(io.operation(() => index.set(root, key, valueHash(key))), root); assert.equal(io.stages.length, 0); }
  assert.deepEqual([...io.pages.keys()].sort(), before);
});
test('Updating one key reads only its prior lookup path, changes one child per ancestor and preserves every other key', () => {
  const { io, index, root } = populated, key = keys.at(-1), replacement = sha('new immutable value');
  assert.equal(io.operation(() => index.get(root, key)), valueHash(key)); const lookupPath = [...io.reads], oldPages = lookupPath.map(hash => JSON.parse(io.pages.get(hash)));
  const next = io.operation(() => index.set(root, key, replacement)); assert.notEqual(next, root); assert.deepEqual(io.reads, lookupPath); assert.equal(io.stages.length, lookupPath.length);
  for (const item of io.stages) if (item.value.kind === 'branch') { const old = oldPages.find(page => page.kind === 'branch' && page.prefix === item.value.prefix); assert.ok(old); assert.equal(old.children.filter((child, ordinal) => child !== item.value.children[ordinal]).length, 1); }
  const changedPathReads = io.reads.length, changedPages = io.stages.length;
  assert.equal(io.operation(() => index.get(root, key)), valueHash(key)); assert.equal(io.operation(() => index.get(next, key)), replacement);
  for (const other of keys.filter(value => value !== key)) assert.equal(io.operation(() => index.get(next, other)), valueHash(other));
  metrics.singleUpdate = { key, changedPathReads, changedPages, unrelatedBranchesReadDuringUpdate: 0, oldRootRetained: true };
});
test('Project and entities/receipts namespace bindings prevent cross-scope page adoption', () => {
  const io = new MemoryIO(), entity = editorialV2Index(io, scope), receipt = editorialV2Index(io, { ...scope, namespace: 'receipts' }), otherProject = editorialV2Index(io, { ...scope, projectId: 'project_other' });
  const key = 'shared:key', root = entity.set(null, key, valueHash(key)), receiptRoot = receipt.set(null, key, valueHash(key)); assert.notEqual(root, receiptRoot);
  for (const index of [receipt, otherProject]) { rejects(io, () => index.get(root, key)); rejects(io, () => index.set(root, key, valueHash(key))); }
  assert.equal(entity.get(root, key), valueHash(key)); assert.equal(receipt.get(receiptRoot, key), valueHash(key));
});
test('Malformed hash-bound leaves reject identity, key hash, value hash, fields, page type and scope changes', () => {
  const key = 'leaf:tested';
  const bad = [null, [], {}, { ...leaf(key), extra: true }, { ...leaf(key), format: 'v1' }, { ...leaf(key), kind: 'unknown' }, { ...leaf(key), key: 'BAD' }, { ...leaf(key), key: 'a'.repeat(161) }, { ...leaf(key), key: 42 }, { ...leaf(key), keyHash: '0'.repeat(64) }, { ...leaf(key), valueHash: 'x'.repeat(64) }, { ...leaf(key), valueHash: 'a'.repeat(63) }, { ...leaf(key), namespace: 'receipts' }, { ...leaf(key), projectId: 'project_other' }];
  const missing = leaf(key); delete missing.valueHash; bad.push(missing);
  for (const page of bad) { const io = new MemoryIO(), hash = io.stage(page), index = editorialV2Index(io, scope); rejects(io, () => index.get(hash, key)); rejects(io, () => index.set(hash, key, valueHash(key))); }
});
test('Malformed hash-bound branches reject prefix, child count/types, insufficient branching and unknown fields', () => {
  const [a, b] = twoKeys();
  const mutations = [page => ({ ...page, prefix: 'f'.repeat(64) }), page => ({ ...page, prefix: 'G' }), page => ({ ...page, prefix: 3 }), page => ({ ...page, children: [] }), page => ({ ...page, children: Array(15).fill(null) }), page => ({ ...page, children: Array(17).fill(null) }), page => ({ ...page, children: Array(16).fill(null) }), page => ({ ...page, children: [page.children.find(Boolean), ...Array(15).fill(null)] }), page => ({ ...page, children: [page.children.find(Boolean), page.children.find(Boolean), ...Array(14).fill(null)] }), page => ({ ...page, children: page.children.map((child, index) => index === 0 ? '../path' : child) }), page => ({ ...page, children: page.children.map((child, index) => index === 0 ? 7 : child) }), page => ({ ...page, children: {} }), page => ({ ...page, key: a })];
  for (const mutate of mutations) { const io = new MemoryIO(), children = Array(16).fill(null); children[parseInt(sha(a)[0], 16)] = io.stage(leaf(a)); children[parseInt(sha(b)[0], 16)] = io.stage(leaf(b)); const root = io.stage(mutate(branch('', children))), index = editorialV2Index(io, scope); rejects(io, () => index.get(root, a)); rejects(io, () => index.set(root, a, valueHash(a))); }
});
test('Wrong child binding and nonprogressing loop-like prefix paths reject without hash or validator stubs', () => {
  const [a, b] = twoKeys(), digit = parseInt(sha(a)[0], 16), other = (digit + 1) % 16;
  for (const mode of ['wrong-leaf', 'nonprogressing-prefix']) {
    const io = new MemoryIO(), aHash = io.stage(leaf(a)), bHash = io.stage(leaf(b)); const childChildren = Array(16).fill(null); childChildren[digit] = aHash; childChildren[other] = bHash;
    const child = mode === 'wrong-leaf' ? bHash : io.stage(branch('', childChildren));
    const rootChildren = Array(16).fill(null); rootChildren[digit] = child; rootChildren[other] = aHash;
    const root = io.stage(branch('', rootChildren)), index = editorialV2Index(io, scope);
    rejects(io, () => index.get(root, a)); assert.equal(io.reads.length, 2); rejects(io, () => index.set(root, a, valueHash(a))); assert.equal(io.reads.length, 2);
  }
});
test('Hash-bound IO rejects corrupted bytes and missing pages instead of fabricating hash loops', () => {
  const io = new MemoryIO(), index = editorialV2Index(io, scope), key = 'hash:integrity', root = io.stage(leaf(key));
  io.pages.set(root, Buffer.from(canonical({ ...leaf(key), valueHash: sha('tampered') }))); rejects(io, () => index.get(root, key));
  rejects(io, () => index.get('f'.repeat(64), key));
  metrics.collisionBoundary = 'No SHA function substitution, full-64-hex key collision, self-hashed page cycle or global-validity claim was used. Incorrect byte/hash bindings fail in IO; nonprogressing paths fail in the real index validator.';
});
test('Lazy lookup leaves an unrelated malformed branch unread and cannot be claimed as a full index audit', () => {
  const io = new MemoryIO(), index = editorialV2Index(io, scope), [a, b] = twoKeys(), children = Array(16).fill(null);
  const good = io.stage(leaf(a)), corrupt = io.stage({ ...leaf(b), valueHash: 'not-a-hash' }); children[parseInt(sha(a)[0], 16)] = good; children[parseInt(sha(b)[0], 16)] = corrupt;
  const root = io.stage(branch('', children)); assert.equal(io.operation(() => index.get(root, a)), valueHash(a)); assert.deepEqual(io.reads, [root, good]); assert.equal(io.reads.includes(corrupt), false);
  rejects(io, () => index.get(root, b)); assert.deepEqual(io.reads, [root, corrupt]); metrics.lazyLookup = { selectedPathPages: 2, unrelatedMalformedPageNotRead: true, selectedMalformedPathRejected: true, fullTreeAuditClaim: false };
});
test('Maximum 65-page selected path remains bounded for get, no-op and one-value update', () => {
  const io = new MemoryIO(), index = editorialV2Index(io, scope), key = 'depth:selected_path', hash = sha(key), original = io.stage(leaf(key)), sibling = io.stage(leaf('depth:unvisited_sibling')); let root = original;
  // All page hashes are real. Deliberately unvisited siblings reuse a leaf and are NOT
  // globally valid bindings: this exercises the selected-path bound, not impossible near-collisions.
  for (let depth = 63; depth >= 0; depth--) { const children = Array(16).fill(null), digit = parseInt(hash[depth], 16); children[digit] = root; children[(digit + 1) % 16] = sibling; root = io.stage(branch(hash.slice(0, depth), children)); }
  assert.equal(io.operation(() => index.get(root, key)), valueHash(key)); assert.equal(io.reads.length, 65);
  assert.equal(io.operation(() => index.set(root, key, valueHash(key))), root); assert.equal(io.reads.length, 65); assert.equal(io.stages.length, 0);
  const next = io.operation(() => index.set(root, key, sha('replacement'))); assert.equal(io.reads.length, 65); assert.equal(io.stages.length, 65); assert.equal(io.operation(() => index.get(next, key)), sha('replacement')); assert.equal(io.reads.length, 65);
  metrics.maximumSelectedPath = { reads: 65, updateStages: 65, combinedUpdatePageIO: 130, noOpStages: 0, genuineHashBoundPages: true, unvisitedSiblingValidityClaim: false, fullHashCollisionClaim: false, maximumPageBytes: io.maximumPageBytes };
});
test('Prefix mismatch misses are read-only and detached pages cannot mutate retained source bytes', () => {
  const io = new MemoryIO(), index = editorialV2Index(io, scope); let root = null;
  for (const key of keys.slice(1024)) root = index.set(root, key, valueHash(key));
  const query = keys.find(key => !sha(key).startsWith('aa')); assert.equal(io.operation(() => index.get(root, query)), null); assert.equal(io.reads.length, 1); assert.equal(io.stages.length, 0);
  const detached = io.read(root), before = Buffer.from(io.pages.get(root)); detached.prefix = 'bad'; assert.deepEqual(io.pages.get(root), before); assert.equal(index.get(root, keys.at(-1)), valueHash(keys.at(-1)));
});
test('No native module, provider or network boundary is executed', () => { assert.deepEqual(networkAttempts, []); assert.equal(loader.loaded.some(name => /creator-native-filesystem|store\.server|provider.*server/.test(name)), false); });

for (const item of tests) { try { item.run(); results.push({ name: item.name, status: 'PASS' }); } catch (error) { results.push({ name: item.name, status: 'FAIL', error: { name: error.name, message: error.message, stack: error.stack } }); } }
const sourceUnchanged = sourceBindings.every(item => sha(fs.readFileSync(path.join(frontend, item.path))) === item.sha256);
const status = results.every(item => item.status === 'PASS') && sourceUnchanged && networkAttempts.length === 0 ? 'PASS' : 'FAIL';
retain('result.json', { runId, startedAt, finishedAt: new Date().toISOString(), status, planned: tests.length, passed: results.filter(item => item.status === 'PASS').length, results, metrics, sourceBindings, sourceUnchanged, networkAttempts, nativeExecution: false, nativeRebuilt: false, providerRequests: 0, credentialReads: 0, productionMutations: 0, maximumNativeTransferBytesUnchanged: 1_048_576 });
console.log(JSON.stringify({ status, planned: tests.length, passed: results.filter(item => item.status === 'PASS').length, failures: results.filter(item => item.status !== 'PASS'), evidence, metrics, sourceUnchanged, networkAttempts }));
if (status !== 'PASS') process.exitCode = 1;
