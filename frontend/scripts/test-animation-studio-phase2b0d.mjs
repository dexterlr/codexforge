// Source-only readiness checks. All configuration values are explicitly synthetic.
// No environment reader, provider request, transport construction or authority acquisition.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { NextRequest } from 'next/server.js';
import { autoImplementMethods } from 'next/dist/server/route-modules/app-route/helpers/auto-implement-methods.js';
import { createStudioTestLoader, blockStudioTestNetwork } from './animation-studio-test-loader.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(path.resolve(process.cwd()), root, 'Run the suite from its exact frontend source root.');
const network = blockStudioTestNetwork(), loader = createStudioTestLoader(root);
const load = name => loader.load('@/lib/codexforge/animation-studio/' + name);
const { createStudioProviderReadinessHandler } = load('operator-http.server');
const { parseHiggsfieldConfiguration } = load('higgsfield-contract.server');
const { openStudioRepository } = load('store.server');
const { sampleProject, sampleSequence, sampleShot } = load('sample');
const { readEstimateIntent, isEstimateJob } = load('higgsfield-estimate-intent');
const { DEFAULT_EXTERNAL_EXECUTION_POLICY } = load('policies');
const sentinel = 'PHASE2B0D_SYNTHETIC_KEY_ONLY:PHASE2B0D_SYNTHETIC_SECRET_ONLY';
const secondSentinel = 'PHASE2B0D_OTHER_SYNTHETIC_KEY:PHASE2B0D_OTHER_SYNTHETIC_SECRET';
const hash = value => createHash('sha256').update(value).digest('hex');
const secretVariants = [...new Set([sentinel, secondSentinel].flatMap(value => [value, ...value.split(':')])
  .flatMap(value => [value, value.slice(0, 12), value.slice(-12), Buffer.from(value).toString('base64'), hash(value)]))];
const endpoint = 'http://127.0.0.1:3317/api/codexforge/animation-studio/provider-readiness';
const kinds = ['native Request', 'NextRequest'];
const results = [], tests = [], responses = [], repositories = [], fixtureEvidence = [];
const test = (name, run) => tests.push({ name, run });
let requestCount = 0, totalLookups = 0, unexpectedCapabilities = 0, fixture;
const evidence = path.join(root, '.codexforge/acceptance/studio-phase2b0d-tests-' + randomUUID());
fs.mkdirSync(evidence, { recursive: true });
const writeEvidence = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const startedAt = new Date().toISOString();
writeEvidence('intent.json', { startedAt, pid: process.pid, command: 'node scripts/test-animation-studio-phase2b0d.mjs', scope: 'Source-only synthetic readiness and isolated PREPARED LIVE_ESTIMATE fixture. No provider contact or authority acquisition.' });

function target(value = sentinel, changes = {}) {
  const stats = { lookups: 0, listenerCalls: 0 };
  const options = {
    enabled: changes.enabled ?? true,
    lookup: name => { assert.equal(name, 'HF_CREDENTIALS'); stats.lookups++; totalLookups++; return changes.lookup ? changes.lookup(name) : value; },
    listenerAddresses: () => { stats.listenerCalls++; return Object.hasOwn(changes, 'listeners') ? changes.listeners : ['127.0.0.1']; },
  };
  // These are deliberately unavailable capabilities, not fake repository or transport implementations.
  for (const name of ['openRepository', 'liveEstimate', 'testOnlyEstimate', 'transport', 'authorization']) {
    Object.defineProperty(options, name, { get() { unexpectedCapabilities++; throw Error('Readiness accessed an unavailable capability.'); } });
  }
  return { handler: createStudioProviderReadinessHandler(options), stats };
}
function request(kind, changes = {}) {
  const headers = new Headers({ Host: '127.0.0.1:3317', 'X-CodexForge-Animation-Studio': 'local-operator-v1', 'Sec-Fetch-Site': 'same-origin' });
  for (const [name, value] of Object.entries(changes.headers ?? {})) value === null ? headers.delete(name) : headers.set(name, value);
  const native = new Request(changes.url ?? endpoint, { method: changes.method ?? 'GET', headers });
  const result = kind === 'NextRequest' ? new NextRequest(native) : native;
  // Fetch constructors prohibit GET bodies; retain each genuine request's native URL and
  // override only the body accessor to exercise the handler's explicit body-presence gate.
  if (changes.bodyPresent) Object.defineProperty(result, 'body', { get: () => ({ getReader() { throw Error('Readiness must not consume a GET body.'); } }) });
  return result;
}
function assertNoSecret(text) { for (const value of secretVariants) assert.equal(text.includes(value), false, 'A synthetic secret or derivative escaped.'); }
async function call(t, kind, changes = {}) {
  const before = t.stats.lookups, response = await t.handler(request(kind, changes));
  requestCount++;
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('Content-Security-Policy'), "default-src 'none'; sandbox");
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(response.headers.get('Content-Type'), 'application/json');
  for (const name of ['Set-Cookie', 'Location', 'Access-Control-Allow-Origin', 'Authorization', 'WWW-Authenticate']) assert.equal(response.headers.get(name), null);
  const raw = await response.text(), body = JSON.parse(raw);
  assertNoSecret(raw); assertNoSecret(JSON.stringify([...response.headers]));
  if (response.status >= 400) {
    assert.equal(t.stats.lookups, before, 'Every denied request must perform zero configuration lookups.');
    assert.deepEqual(Object.keys(body).sort(), ['error', 'ok']);
    assert.equal(body.ok, false);
    assert.deepEqual(Object.keys(body.error).sort(), ['code', 'message']);
  }
  responses.push({ kind, status: response.status, configuration: body.result?.configuration ?? null, code: body.error?.code ?? null, lookupDelta: t.stats.lookups - before });
  return { status: response.status, body, raw };
}
function expected(configuration) {
  return { ok: true, result: { provider: 'HIGGSFIELD', configuration, remoteAuthentication: 'NOT_VERIFIED', execution: 'EXECUTION_DISABLED', estimateCapability: configuration === 'LOCALLY_CONFIGURED' ? 'READY_LOCALLY' : 'BLOCKED', generation: 'LOCKED' } };
}
async function success(t, kind, configuration = 'LOCALLY_CONFIGURED', changes = {}) {
  const before = t.stats.lookups, answer = await call(t, kind, changes);
  assert.equal(answer.status, 200); assert.deepEqual(answer.body, expected(configuration));
  assert.equal(t.stats.lookups, before + 1); return answer;
}
async function denied(t, kind, changes, status = 403, code = 'request_boundary_rejected') {
  const answer = await call(t, kind, changes); assert.equal(answer.status, status); assert.equal(answer.body.error.code, code);
}
function tree(directory) {
  const output = [];
  function visit(current) {
    for (const name of fs.readdirSync(current).sort()) {
      const absolute = path.join(current, name), stat = fs.lstatSync(absolute), relative = path.relative(directory, absolute).split(path.sep).join('/');
      assert.equal(stat.isSymbolicLink(), false, 'Synthetic fixture must not contain links.');
      if (stat.isDirectory()) { output.push({ path: relative, kind: 'directory' }); visit(absolute); }
      else { assert.equal(stat.isFile(), true); const bytes = fs.readFileSync(absolute); output.push({ path: relative, kind: 'file', bytes: bytes.length, sha256: hash(bytes) }); }
    }
  }
  visit(directory); return output;
}
function preparedFixture() {
  const namespace = 'phase2b0d-' + randomUUID(), suffix = randomUUID().replaceAll('-', '');
  const projectId = 'project_' + suffix, sequenceId = 'sequence_' + suffix, shotId = 'shot_' + suffix;
  const directory = path.join(root, '.codexforge/studio-tests', namespace);
  assert.equal(fs.existsSync(directory), false);
  const repo = openStudioRepository({ workspace: 'test', namespace }); repositories.push(repo);
  const now = '2026-09-14T15:00:00.000Z', actor = 'phase2b0d-synthetic-readiness';
  repo.createProject({ ...sampleProject, projectId, title: 'Synthetic readiness fixture only', description: 'Prepared local estimate; never authorized or executed.', currency: 'USD', createdAt: now }, randomUUID(), actor);
  repo.saveSequence({ ...sampleSequence, projectId, sequenceId }, randomUUID(), actor, now);
  const shot = { ...sampleShot, projectId, sequenceId, shotId,
    description: 'An original matte blue sphere moves across a plain white background.', duration: 2,
    resolution: { width: 480, height: 480 }, aspectRatio: { width: 1, height: 1 }, camera: { ...sampleShot.camera, movement: 'static' },
    preferredEngine: 'HIGGSFIELD', fallbackEngine: null, continuityRequirements: [], identityStrictness: 'FLEXIBLE', generationMethod: 'GENERATIVE',
    costEstimate: { currency: 'USD', minorUnits: 0 }, actualCost: { currency: 'USD', minorUnits: 0 } };
  repo.saveShot(shot, randomUUID(), actor, now);
  const saved = repo.load(projectId);
  const jobId = repo.prepareEstimateIntent(projectId, shotId, saved.project.revision, shot.revision, randomUUID(), actor, now, 'LIVE_ESTIMATE').value.jobId;
  return { namespace, projectId, sequenceId, shotId, jobId, directory, repo };
}

test('01 Construction performs no lookup or unavailable capability access', () => {
  for (const changes of [{}, { enabled: false }, { lookup: () => { throw Error(sentinel); } }]) {
    const t = target(sentinel, changes); assert.equal(t.stats.lookups, 0); assert.equal(t.stats.listenerCalls, 0);
  }
  assert.equal(unexpectedCapabilities, 0);
});
test('02 Undefined null and empty injected values are NOT_CONFIGURED', async () => {
  for (const value of [undefined, null, '']) for (const kind of kinds) await success(target(null, { lookup: () => value }), kind, 'NOT_CONFIGURED');
});
test('03 Valid synthetic credentials mean local format only', async () => {
  for (const value of [sentinel, secondSentinel, 'k:s']) for (const kind of kinds) await success(target(value), kind);
});
test('04 Non-string injected values are INVALID_LOCAL_FORMAT', async () => {
  for (const value of [false, 0, 1, {}, [], [sentinel], new String(sentinel), Symbol('synthetic'), 1n]) for (const kind of kinds) await success(target(value), kind, 'INVALID_LOCAL_FORMAT');
});
test('05 Missing empty or multiple credential separators are invalid', async () => {
  for (const value of ['synthetic', ':synthetic', 'synthetic:', 'synthetic:key:secret', ':']) for (const kind of kinds) await success(target(value), kind, 'INVALID_LOCAL_FORMAT');
});
test('06 Whitespace control and DEL characters are rejected without trimming', async () => {
  for (const value of [' key:secret', 'key:secret ', 'key :secret', 'key:sec ret', 'key:\tsecret', 'key:secret\n', 'key:sec\u0000ret', 'key:sec\u001fret', 'key:sec\u007fret', 'key:sec\u00a0ret']) for (const kind of kinds) await success(target(value), kind, 'INVALID_LOCAL_FORMAT');
});
test('07 Canonical parser bounds are retained at 1 and 512 characters', async () => {
  for (const [value, configuration] of [['a:b', 'LOCALLY_CONFIGURED'], ['a'.repeat(512) + ':' + 'b'.repeat(512), 'LOCALLY_CONFIGURED'], ['a'.repeat(513) + ':b', 'INVALID_LOCAL_FORMAT'], ['a:' + 'b'.repeat(513), 'INVALID_LOCAL_FORMAT']]) {
    assert.equal(parseHiggsfieldConfiguration(value).configuration, configuration);
    for (const kind of kinds) await success(target(value), kind, configuration);
  }
});
test('08 Lookup exceptions become a redacted invalid-format observation', async () => {
  for (const error of [Error(sentinel), sentinel, { message: sentinel, code: sentinel }]) for (const kind of kinds) await success(target(null, { lookup: () => { throw error; } }), kind, 'INVALID_LOCAL_FORMAT');
});
test('09 Parser does not coerce inspect or serialize hostile opaque values', async () => {
  let accesses = 0;
  const value = new Proxy({}, { get() { accesses++; throw Error(sentinel); }, ownKeys() { accesses++; throw Error(sentinel); }, getPrototypeOf() { accesses++; throw Error(sentinel); } });
  for (const kind of kinds) await success(target(value), kind, 'INVALID_LOCAL_FORMAT');
  assert.equal(accesses, 0);
});
test('10 Public payload has exact enum keys and no secret metadata or derivatives', async () => {
  for (const kind of kinds) {
    const first = await success(target(sentinel), kind), second = await success(target(secondSentinel), kind);
    assert.equal(first.raw, second.raw);
    assert.deepEqual(Object.keys(first.body.result).sort(), ['configuration', 'estimateCapability', 'execution', 'generation', 'provider', 'remoteAuthentication']);
    assert.ok(Object.values(first.body.result).every(value => typeof value === 'string'));
  }
});
test('11 Refresh and concurrent requests inspect once each without caching authority', async () => {
  const t = target();
  for (const kind of kinds) for (let n = 0; n < 3; n++) await success(t, kind);
  await Promise.all(kinds.flatMap(kind => Array.from({ length: 3 }, () => call(t, kind)))).then(answers => answers.forEach(answer => assert.deepEqual(answer.body, expected('LOCALLY_CONFIGURED'))));
  assert.equal(t.stats.lookups, 12);
});
test('12 Restarted handlers re-observe injected configuration and never upgrade execution', async () => {
  let value = null;
  for (const kind of kinds) {
    const t = target(null, { lookup: () => value });
    value = null; await success(t, kind, 'NOT_CONFIGURED'); value = sentinel; await success(t, kind); value = 'malformed'; await success(t, kind, 'INVALID_LOCAL_FORMAT');
    await success(target(secondSentinel), kind); await success(target(null), kind, 'NOT_CONFIGURED');
  }
});
test('13 Disabled requests reject before configuration and listener inspection', async () => {
  const t = target(sentinel, { enabled: false });
  for (const kind of kinds) for (const changes of [{}, { method: 'POST' }, { headers: { Host: 'external.invalid' } }, { url: endpoint + '?configuration=LOCALLY_CONFIGURED' }]) await denied(t, kind, changes, 503, 'studio_disabled');
  assert.equal(t.stats.listenerCalls, 0);
});
test('14 POST PUT PATCH DELETE HEAD and OPTIONS are method-denied before lookup', async () => {
  const t = target();
  for (const kind of kinds) for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']) await denied(t, kind, { method }, 405, 'method_not_allowed');
  assert.equal(t.stats.listenerCalls, 0);
});
test('15 Absent wildcard or mixed listeners reject before lookup', async () => {
  for (const listeners of [null, [], ['0.0.0.0'], ['::'], ['127.0.0.1', '0.0.0.0'], ['192.0.2.10']]) for (const kind of kinds) await denied(target(sentinel, { listeners }), kind, {}, 503, 'loopback_listener_required');
  for (const listeners of [['127.0.0.1'], ['::1'], ['127.0.0.1', '::1']]) for (const kind of kinds) await success(target(sentinel, { listeners }), kind);
});
test('16 Only the exact provider-readiness route is accepted', async () => {
  for (const suffix of ['', '/provider-readiness/', '/provider-readiness/execute', '/provider-Readiness', '/provider%2dreadiness', '/other']) for (const kind of kinds) await denied(target(), kind, { url: 'http://127.0.0.1:3317/api/codexforge/animation-studio' + suffix });
});
test('17 Direct HTTP loopback authority is required and canonical local aliases work', async () => {
  for (const host of ['127.0.0.1:3317', 'localhost:3317', '[::1]:3317']) for (const kind of kinds) await success(target(), kind, 'LOCALLY_CONFIGURED', { url: `http://${host}/api/codexforge/animation-studio/provider-readiness`, headers: { Host: host } });
  for (const url of [endpoint.replace('http:', 'https:'), endpoint.replace('127.0.0.1', 'external.invalid'), endpoint.replace('127.0.0.1', '0.0.0.0'), endpoint + '#synthetic']) for (const kind of kinds) await denied(target(), kind, { url });
});
test('18 Host must match exact local URL authority', async () => {
  for (const Host of [null, 'localhost:3317', '127.0.0.1:3318', 'external.invalid', '127.0.0.1:3317,external.invalid', '127.0.0.1:03317', '127.0.0.1:3317.']) for (const kind of kinds) await denied(target(), kind, { headers: { Host } });
});
test('19 Missing or forged studio marker rejects before lookup', async () => {
  for (const value of [null, '', 'local-operator-v2', 'local-operator-v1, local-operator-v1', sentinel]) for (const kind of kinds) await denied(target(), kind, { headers: { 'X-CodexForge-Animation-Studio': value } });
});
test('20 GET Origin may be absent or exactly same-origin only', async () => {
  for (const kind of kinds) for (const Origin of [null, 'http://127.0.0.1:3317']) await success(target(), kind, 'LOCALLY_CONFIGURED', { headers: { Origin } });
  for (const Origin of ['null', 'http://localhost:3317', 'https://127.0.0.1:3317', 'http://127.0.0.1:3318', 'http://external.invalid', 'http://127.0.0.1:3317/', 'http://127.0.0.1:3317, http://external.invalid']) for (const kind of kinds) await denied(target(), kind, { headers: { Origin } });
});
test('21 Fetch-site permits absent or same-origin and rejects every other value', async () => {
  for (const kind of kinds) for (const value of [null, 'same-origin']) await success(target(), kind, 'LOCALLY_CONFIGURED', { headers: { 'Sec-Fetch-Site': value } });
  for (const value of ['cross-site', 'same-site', 'none', 'same-origin, cross-site', '']) for (const kind of kinds) await denied(target(), kind, { headers: { 'Sec-Fetch-Site': value } });
});
test('22 Independently matching Next forwarding headers grant no extra authority', async () => {
  for (const kind of kinds) for (const address of ['127.0.0.1', '::1']) await success(target(null), kind, 'NOT_CONFIGURED', { headers: { 'X-Forwarded-Host': '127.0.0.1:3317', 'X-Forwarded-Port': '3317', 'X-Forwarded-Proto': 'http', 'X-Forwarded-For': address } });
});
test('23 Proxy chains mismatching forwarding and alternate proxy metadata reject', async () => {
  const headers = [{ Forwarded: 'for=127.0.0.1' }, { 'X-Forwarded-For': '127.0.0.1, 8.8.8.8' }, { 'X-Forwarded-For': '8.8.8.8' }, { 'X-Forwarded-Host': 'localhost:3317' }, { 'X-Forwarded-Host': 'external.invalid' }, { 'X-Forwarded-Port': '80' }, { 'X-Forwarded-Proto': 'https' }, { 'X-Forwarded-Prefix': '/' }, { 'X-Real-IP': '127.0.0.1' }, { Via: 'synthetic' }, { 'X-Original-URL': endpoint }, { 'X-Rewrite-URL': endpoint }];
  for (const item of headers) for (const kind of kinds) await denied(target(), kind, { headers: item });
});
test('24 Every query field including credentials and execution forgery rejects', async () => {
  for (const query of ['projectId=project_synthetic', 'provider=HIGGSFIELD', 'configuration=LOCALLY_CONFIGURED', 'credentials=' + encodeURIComponent(sentinel), 'HF_CREDENTIALS=' + encodeURIComponent(sentinel), 'remoteAuthentication=VERIFIED', 'estimateCapability=READY_LOCALLY', 'execution=ENABLED', 'generation=UNLOCKED', 'authorization=forged', 'action=execute-estimate', 'a=1&a=2']) for (const kind of kinds) await denied(target(), kind, { url: endpoint + '?' + query }, 400, 'invalid_request');
});
test('25 GET bodies nonzero noncanonical lengths and transfer encoding reject', async () => {
  for (const kind of kinds) {
    await success(target(), kind, 'LOCALLY_CONFIGURED', { headers: { 'Content-Length': '0' } });
    await denied(target(), kind, { bodyPresent: true }, 400, 'invalid_request');
    for (const value of ['1', '00', '-1', '0, 0', '1e2', '32769', 'invalid', '']) await denied(target(), kind, { headers: { 'Content-Length': value } }, 400, 'invalid_request');
    for (const value of ['chunked', 'identity', '']) await denied(target(), kind, { headers: { 'Transfer-Encoding': value } }, 400, 'invalid_request');
  }
});
test('26 Client-supplied credential readiness and authority headers cannot forge results', async () => {
  for (const kind of kinds) {
    const headers = { Authorization: `Key ${sentinel}`, 'HF_CREDENTIALS': sentinel, Cookie: 'HF_CREDENTIALS=' + sentinel, 'X-Configuration': 'LOCALLY_CONFIGURED', 'X-Remote-Authentication': 'VERIFIED', 'X-Estimate-Capability': 'READY_LOCALLY', 'X-Execution': 'ENABLED', 'X-Generation': 'UNLOCKED', 'X-Authorization': 'forged', 'Idempotency-Key': randomUUID() };
    await success(target(null), kind, 'NOT_CONFIGURED', { headers });
    await success(target('invalid'), kind, 'INVALID_LOCAL_FORMAT', { headers });
  }
});
test('27 Production exports defeat Next automatic OPTIONS and retain lazy canonical lookup', async () => {
  const source = fs.readFileSync(path.join(root, 'src/lib/codexforge/animation-studio/operator-http.server.ts'), 'utf8');
  const readiness = source.slice(source.indexOf('export function createStudioProviderReadinessHandler'), source.indexOf('export function createStudioOperatorHandler'));
  assert.match(readiness, /readHiggsfieldConfiguration\(options\.lookup\)/u);
  assert.doesNotMatch(readiness, /openStudioRepository|openRepository|authorizeEstimateIntent|acquireLiveEstimateDispatch|executeHiggsfieldEstimate|RealHiggsfield|fetch\(|process\.env/u);
  const route = fs.readFileSync(path.join(root, 'src/app/api/codexforge/animation-studio/provider-readiness/route.ts'), 'utf8');
  assert.match(route, /function handle\(request: Request\)/u);
  assert.match(route, /lookup:\s*name\s*=>\s*process\.env\[name\]/u);
  assert.doesNotMatch(route.slice(0, route.indexOf('function handle')), /process\.env/u);
  assert.doesNotMatch(route, /openRepository|openStudioRepository|RealHiggsfield|authorizeEstimateIntent|acquireLiveEstimateDispatch|executeHiggsfieldEstimate/u);
  // Import the real source route without invoking its production environment closure.
  // Feed its exact exported method set, bound to the synthetic constructor seam,
  // through Next's real dispatcher to catch an automatic permissive OPTIONS 204.
  const exported = loader.load('@/app/api/codexforge/animation-studio/provider-readiness/route');
  const methods = ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'];
  assert.deepEqual(Object.keys(exported).sort(), [...methods, 'runtime', 'dynamic'].sort());
  assert.equal(exported.runtime, 'nodejs'); assert.equal(exported.dynamic, 'force-dynamic');
  for (const method of methods) assert.equal(exported[method], exported.GET);
  for (const kind of kinds) {
    const t = target(), dispatched = autoImplementMethods(Object.fromEntries(methods.map(method => [method, t.handler])));
    await success({ handler: dispatched.GET, stats: t.stats }, kind);
    for (const method of methods.filter(method => method !== 'GET')) await denied({ handler: dispatched[method], stats: t.stats }, kind, { method }, 405, 'method_not_allowed');
  }
});
test('28 Real PREPARED LIVE_ESTIMATE state and every fixture file stay byte-identical', async () => {
  fixture = preparedFixture();
  const before = fixture.repo.load(fixture.projectId), beforeTree = tree(fixture.directory);
  assert.ok(beforeTree.some(entry => entry.kind === 'file'));
  const job = before.jobs.find(item => item.jobId === fixture.jobId), intent = readEstimateIntent(job);
  assert.equal(intent.executionMode, 'LIVE_ESTIMATE'); assert.equal(intent.phase, 'PREPARED'); assert.equal(intent.authorization, null); assert.equal(job.attempt, 0);
  writeEvidence('fixture-before.json', { namespace: fixture.namespace, snapshot: before, files: beforeTree });
  for (const value of [null, sentinel, 'malformed']) {
    const t = target(value), configuration = parseHiggsfieldConfiguration(value).configuration;
    for (const kind of kinds) {
      for (let n = 0; n < 3; n++) await success(t, kind, configuration);
      await success(target(value), kind, configuration);
      await denied(t, kind, { url: endpoint + '?projectId=' + fixture.projectId }, 400, 'invalid_request');
      await denied(t, kind, { headers: { 'X-CodexForge-Animation-Studio': null } });
    }
  }
  const after = fixture.repo.load(fixture.projectId), afterTree = tree(fixture.directory);
  assert.deepEqual(after, before); assert.deepEqual(afterTree, beforeTree);
  fixture.repo.close(); repositories.splice(repositories.indexOf(fixture.repo), 1);
  fixture.repo = openStudioRepository({ workspace: 'test', namespace: fixture.namespace }); repositories.push(fixture.repo);
  assert.deepEqual(fixture.repo.load(fixture.projectId), before); assert.deepEqual(tree(fixture.directory), beforeTree);
  assert.equal(beforeTree.some(entry => /single-test-claim/u.test(entry.path)), false);
  const record = { namespace: fixture.namespace, unchanged: true, recordDigestBefore: before.recordDigest, recordDigestAfter: after.recordDigest, filesBefore: beforeTree, filesAfter: afterTree };
  fixtureEvidence.push(record); writeEvidence('fixture-after.json', { ...record, snapshot: after });
});
test('29 Generation costs approvals jobs and network remain untouched and locked', () => {
  const saved = fixture.repo.load(fixture.projectId), job = saved.jobs.find(item => item.jobId === fixture.jobId), intent = readEstimateIntent(job);
  assert.equal(saved.jobs.length, 1); assert.ok(saved.jobs.every(isEstimateJob));
  assert.deepEqual(saved.approvals, []); assert.deepEqual(saved.costs, []); assert.deepEqual(saved.shots[0].generationAttempts, []);
  assert.equal(saved.shots[0].actualCost.minorUnits, 0); assert.equal(job.actualCost.minorUnits, 0);
  assert.equal(job.attempt, 0); assert.equal(intent.phase, 'PREPARED'); assert.equal(intent.authorization, null);
  assertNoSecret(JSON.stringify(saved));
  assert.deepEqual(DEFAULT_EXTERNAL_EXECUTION_POLICY, { externalGenerationEnabled: false, paidGenerationEnabled: false, adobeAutomationEnabled: false, blenderRenderEnabled: false });
  assert.deepEqual(network, []); assert.equal(unexpectedCapabilities, 0);
});

assert.equal(tests.length, 29);
for (const item of tests) {
  try { await item.run(); results.push({ name: item.name, status: 'PASS' }); }
  catch (error) {
    let message = error instanceof Error ? error.message : 'Unknown synthetic test failure';
    for (const value of secretVariants) message = message.replaceAll(value, '[REDACTED_SYNTHETIC]');
    results.push({ name: item.name, status: 'FAIL', error: message }); console.error('FAIL: ' + item.name + ': ' + message); process.exitCode = 1; break;
  }
}
for (const repo of repositories) repo.close();
const summary = {
  startedAt, finishedAt: new Date().toISOString(), pid: process.pid, command: 'node scripts/test-animation-studio-phase2b0d.mjs',
  status: results.length === tests.length && results.every(item => item.status === 'PASS') && network.length === 0 ? 'PASS' : 'FAIL',
  testCount: results.length, planned: tests.length, results, requestCount, injectedConfigurationLookups: totalLookups,
  responses, fixtureEvidence, namespaces: fixture ? [fixture.namespace] : [], networkAttempts: network,
  realCredentialReads: 0, providerRequests: 0, authorityAcquisitions: 0, paidRequests: 0, productionDataMutations: 0, unavailableCapabilityAccesses: unexpectedCapabilities,
  sourceBindings: [...new Set([...loader.loaded, 'scripts/animation-studio-test-loader.mjs', 'scripts/test-animation-studio-phase2b0d.mjs', 'src/app/api/codexforge/animation-studio/provider-readiness/route.ts', 'node_modules/next/dist/server/route-modules/app-route/helpers/auto-implement-methods.js'])].map(name => ({ path: name, sha256: hash(fs.readFileSync(path.join(root, name))) })),
};
writeEvidence('result.json', summary);
console.log(JSON.stringify({ evidence, status: summary.status, tests: results.length, planned: tests.length, requests: requestCount, networkAttempts: network.length, fileHash: hash(fs.readFileSync(fileURLToPath(import.meta.url))) }));
if (summary.status !== 'PASS') process.exitCode = 1;
