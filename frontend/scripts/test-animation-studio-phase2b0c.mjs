// Synthetic credentials and fake REST only. No production environment lookup.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { NextRequest } from 'next/server.js';
import { createStudioTestLoader, blockStudioTestNetwork } from './animation-studio-test-loader.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const network = blockStudioTestNetwork(), loader = createStudioTestLoader(root);
const load = name => loader.load('@/lib/codexforge/animation-studio/' + name);
const { openStudioRepository } = load('store.server');
const { sampleProject, sampleSequence, sampleShot } = load('sample');
const { readEstimateIntent, liveEstimateAuthorization, isEstimateJob } = load('higgsfield-estimate-intent');
const { executeHiggsfieldEstimateLive } = load('higgsfield-estimate.server');
const { RealHiggsfieldEstimateTransport } = load('higgsfield-estimate-transport.server');
const { acquireLiveEstimateDispatch } = load('higgsfield-estimate-authority.server');
const { HiggsfieldTransportError } = load('higgsfield-transport.server');
const { buildHiggsfieldRequest, validateHiggsfieldRequest } = load('higgsfield-contract.server');
const { projectEstimateViews } = load('generation-preparation.server');
const { createStudioOperatorHandler } = load('operator-http.server');
const { DEFAULT_EXTERNAL_EXECUTION_POLICY } = load('policies');
const sentinel = 'PHASE2B0C_SYNTHETIC_KEY:PHASE2B0C_SYNTHETIC_SECRET';
const now = '2026-09-14T13:00:00.000Z', actor = 'phase2b0c-synthetic-operator', key = () => randomUUID();
const repos = [], fixtures = [], children = [], results = [], tests = [];
const test = (name, run) => tests.push({ name, run });
function open(namespace) { const repo = openStudioRepository({ workspace: 'test', namespace }); repos.push(repo); return repo; }
class FakeHiggsfieldTransport extends RealHiggsfieldEstimateTransport {
  constructor(credential = sentinel) {
    const stats = { calls: [], lookups: 0, handler: null };
    super(name => { assert.equal(name, 'HF_CREDENTIALS'); stats.lookups++; return credential; }, async (url, init) => {
      assert.equal(init.headers.Authorization, `Key ${sentinel}`);
      assert.equal(url, 'https://api.higgsfield.ai/estimate/bytedance/seedance/v1/lite/text-to-video');
      assert.equal(init.method, 'POST'); assert.equal(init.redirect, 'error'); assert.equal(init.credentials, 'omit');
      stats.calls.push({ url, method: init.method, input: JSON.parse(init.body) });
      return stats.handler ? stats.handler(init) : Response.json({ credits: '1.25', usd: '0.012345' }, { headers: { 'X-Correlation-ID': 'phase2b0c-correlation' } });
    });
    this.stats = stats;
  }
}
function setup(credential = sentinel) {
  const namespace = 'phase2b0c-' + randomUUID(), suffix = randomUUID().replaceAll('-', '');
  const value = { namespace, projectId: 'project_' + suffix, sequenceId: 'sequence_' + suffix, shotId: 'shot_' + suffix, repo: open(namespace), fake: new FakeHiggsfieldTransport(credential) };
  value.repo.createProject({ ...sampleProject, projectId: value.projectId, title: 'Original synthetic estimate only', description: 'Phase 2B.0C local fake wire', currency: 'USD', createdAt: now }, key(), actor);
  value.repo.saveSequence({ ...sampleSequence, projectId: value.projectId, sequenceId: value.sequenceId }, key(), actor, now);
  const shot = { ...sampleShot, projectId: value.projectId, sequenceId: value.sequenceId, shotId: value.shotId,
    description: 'An original matte blue sphere moves slowly across a plain white background.', duration: 2,
    resolution: { width: 480, height: 480 }, aspectRatio: { width: 1, height: 1 }, camera: { ...sampleShot.camera, movement: 'static' },
    preferredEngine: 'HIGGSFIELD', fallbackEngine: null, continuityRequirements: [], identityStrictness: 'FLEXIBLE', generationMethod: 'GENERATIVE',
    costEstimate: { currency: 'USD', minorUnits: 0 }, actualCost: { currency: 'USD', minorUnits: 0 } };
  value.repo.saveShot(shot, key(), actor, now);
  const saved = state(value);
  value.jobId = value.repo.prepareEstimateIntent(value.projectId, value.shotId, saved.project.revision, shot.revision, key(), actor, now, 'LIVE_ESTIMATE').value.jobId;
  fixtures.push(value); return value;
}
const state = v => v.repo.load(v.projectId);
const job = v => state(v).jobs.find(x => x.jobId === v.jobId);
const intent = v => readEstimateIntent(job(v));
function authorize(v, descriptor = liveEstimateAuthorization(intent(v))) { v.repo.authorizeEstimateIntent(v.projectId, v.jobId, key(), actor, now, descriptor); return v; }
const execute = (v, changes = {}) => executeHiggsfieldEstimateLive({ repository: v.repo, transport: v.fake, actor, now: () => now, timeoutMs: 1000, ...changes }, v.projectId, v.jobId, key());
const count = v => v.fake.stats.calls.length;
function revise(v, changes = {}) { const shot = state(v).shots[0]; v.repo.reviseShot(v.projectId, v.shotId, shot.revision, { description: shot.description, storyPurpose: shot.storyPurpose, action: shot.action, duration: shot.duration, notes: shot.notes, ...changes }, key(), actor, now); }
const endpoint = 'http://127.0.0.1:3317/api/codexforge/animation-studio';
function http(v, listeners = ['127.0.0.1']) {
  return { handler: createStudioOperatorHandler({ enabled: true, openRepository: () => openStudioRepository({ workspace: 'test', namespace: v.namespace }), listenerAddresses: () => listeners,
    liveEstimate: { transport: v.fake, now: () => now, timeoutMs: 1000 } }) };
}
function operation(v) { const saved = state(v); return { action: 'execute-estimate', projectId: v.projectId, shotId: v.shotId, expectedProjectRevision: saved.project.revision, expectedShotRevision: saved.shots[0].revision, requestedAt: now }; }
async function call(target, input, changes = {}) {
  const headers = new Headers({ Host: '127.0.0.1:3317', 'X-CodexForge-Animation-Studio': 'local-operator-v1', 'Sec-Fetch-Site': 'same-origin', ...(input ? { Origin: 'http://127.0.0.1:3317', 'Content-Type': 'application/json', 'Idempotency-Key': changes.key ?? key() } : {}) });
  for (const [name, value] of Object.entries(changes.headers ?? {})) { if (value === null) headers.delete(name); else headers.set(name, value); }
  const request = new NextRequest(new Request(changes.url ?? endpoint, { method: input ? 'POST' : 'GET', headers, ...(input ? { body: changes.raw ?? JSON.stringify(input) } : {}) }));
  const response = await target.handler(request), body = await response.json();
  for (const part of sentinel.split(':')) assert.equal(JSON.stringify(body).includes(part), false);
  return { status: response.status, body };
}
async function child(v, operation = 'execute') {
  const env = Object.fromEntries(['SystemRoot', 'WINDIR', 'PATH', 'TEMP', 'TMP', 'COMSPEC'].filter(k => process.env[k] !== undefined).map(k => [k, process.env[k]]));
  return new Promise((resolve, reject) => {
    const startedAt = new Date().toISOString(), p = spawn(process.execPath, [fileURLToPath(import.meta.url), '--child', v.namespace, v.projectId, v.jobId, operation], { cwd: root, env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = ''; p.stdout.on('data', x => { out += x; }); p.stderr.on('data', x => { err += x; });
    p.once('error', reject); p.once('close', code => { children.push({ pid: p.pid, startedAt, finishedAt: new Date().toISOString(), exitCode: code, closed: true }); try { assert.equal(code, 0, err); resolve(JSON.parse(out)); } catch (e) { reject(e); } });
  });
}
if (process.argv[2] === '--child') {
  const [, , , namespace, projectId, jobId, operation] = process.argv;
  const v = { namespace, projectId, jobId, repo: open(namespace), fake: new FakeHiggsfieldTransport() };
  try { if (operation === 'acquire') acquireLiveEstimateDispatch(v.repo, projectId, jobId, key(), actor, () => now); else await execute(v); } catch { /* A race loser never gets permission. */ }
  assert.deepEqual(network, []); console.log(JSON.stringify({ count: count(v), attempt: job(v).attempt, phase: intent(v).phase })); v.repo.close();
} else {
  test('startup and configured transport construction perform zero lookups and requests', () => { const v = setup(); assert.equal(v.fake.stats.lookups, 0); assert.equal(count(v), 0); assert.equal(intent(v).phase, 'PREPARED'); });
  test('credential present alone cannot call real transport; forged permit is blocked', async () => { const v = setup(); for (const authority of [undefined, {}, liveEstimateAuthorization(intent(v))]) await assert.rejects(() => v.fake.estimate(intent(v).request, { signal: new AbortController().signal, authority }), e => e.code === 'ESTIMATE_EXECUTION_NOT_AUTHORIZED'); assert.equal(v.fake.stats.lookups, 0); assert.equal(count(v), 0); });
  for (const [label, credential] of [['absent', null], ['malformed', 'malformed']]) test(`credential ${label} is definite pre-send failure; acquired attempt remains consumed`, async () => { const v = authorize(setup(credential)); await execute(v); assert.equal(intent(v).phase, 'FAILED'); assert.equal(intent(v).failure.transmitted, false); assert.equal(intent(v).failure.code, 'ESTIMATE_BEFORE_SEND_FAILED'); assert.equal(job(v).attempt, 1); assert.equal(count(v), 0); await execute(v); assert.equal(v.fake.stats.lookups, 1); });
  test('live authorization cannot be granted with the mock authorization call', () => { const v = setup(); assert.throws(() => v.repo.authorizeEstimateIntent(v.projectId, v.jobId, key(), actor, now), e => e.code === 'ESTIMATE_EXECUTION_NOT_AUTHORIZED'); assert.equal(job(v).attempt, 0); });
  for (const field of ['estimateIntentId', 'projectId', 'sequenceId', 'shotId', 'shotRevision', 'provider', 'model', 'endpoint', 'requestDigest', 'operationDigest', 'attempt', 'maxAttempts', 'createdAt', 'executionMode', 'operation']) test(`wrong ${field} authority rejected`, () => { const v = setup(); const grant = liveEstimateAuthorization(intent(v)); grant[field] = typeof grant[field] === 'number' ? 2 : 'forged'; assert.throws(() => authorize(v, grant)); assert.equal(intent(v).authorization, null); assert.equal(job(v).attempt, 0); });
  test('unknown authority fields rejected', () => { const v = setup(); assert.throws(() => authorize(v, { ...liveEstimateAuthorization(intent(v)), extra: true })); });
  test('exact authorization acquires once; consumed authorization cannot be renewed', async () => { const v = authorize(setup()); await execute(v); assert.equal(count(v), 1); assert.equal(job(v).attempt, 1); assert.throws(() => authorize(v)); await execute(v); assert.equal(count(v), 1); });
  test('expired and future-dated authority cannot acquire', async () => { for (const at of ['2026-09-14T13:10:00.001Z', '2026-09-14T12:59:59.000Z']) { const v = authorize(setup()); await assert.rejects(() => execute(v, { now: () => at })); assert.equal(job(v).attempt, 0); assert.equal(count(v), 0); } });
  test('double click / simultaneous service calls produce one wire invocation', async () => { const v = authorize(setup()); await Promise.all([execute(v), execute(v), execute(v)]); assert.equal(count(v), 1); });
  test('two operating-system processes race through native claim: one winner', async () => { const v = authorize(setup()); const answers = await Promise.all([child(v), child(v)]); assert.equal(answers.reduce((n, a) => n + a.count, 0), 1); assert.equal(job(v).attempt, 1); });
  test('restart after acquisition never recreates dispatch capability', async () => { const v = authorize(setup()); await child(v, 'acquire'); const next = await child(v); assert.equal(next.count, 0); assert.equal(next.attempt, 1); assert.equal(next.phase, 'EXECUTION_STARTED'); });
  test('opaque permit is one-use even before success publication', async () => { const v = authorize(setup()); const permit = acquireLiveEstimateDispatch(v.repo, v.projectId, v.jobId, key(), actor, () => now); const options = { authority: permit.authority, signal: new AbortController().signal }; await v.fake.estimate(intent(v).request, options); await assert.rejects(() => v.fake.estimate(intent(v).request, options)); assert.equal(count(v), 1); });
  test('active acquired shot cannot mutate before dispatch; no credential lookup on acquisition', () => { const v = authorize(setup()); acquireLiveEstimateDispatch(v.repo, v.projectId, v.jobId, key(), actor, () => now); assert.throws(() => revise(v)); assert.equal(v.fake.stats.lookups, 0); assert.equal(count(v), 0); });
  test('fake REST success preserves credits USD correlation and live provenance', async () => { const v = authorize(setup()); await execute(v); const i = intent(v), r = i.result; assert.equal(i.phase, 'SUCCEEDED'); assert.equal(r.credits, '1.25'); assert.equal(r.usd, '0.012345'); assert.equal(r.correlationId, 'phase2b0c-correlation'); assert.equal(r.synthetic, false); for (const f of ['projectId', 'sequenceId', 'shotId', 'shotRevision', 'provider', 'model', 'requestDigest']) assert.equal(r[f], i.request[f]); assert.equal(r.estimateIntentId, v.jobId); assert.equal(r.attempt, 1); assert.equal(r.estimatedAt, now); const view = projectEstimateViews(state(v))[0]; assert.equal(view.result.synthetic, false); assert.equal(view.executionMode, 'LIVE_ESTIMATE'); assert.equal(view.liveAuthorization, 'CONSUMED'); assert.deepEqual(v.fake.stats.calls[0].input, buildHiggsfieldRequest(state(v).shots[0]).input); });
  test('missing provider correlation remains null', async () => { const v = authorize(setup()); v.fake.stats.handler = () => Response.json({ credits: '0', usd: '0' }); await execute(v); assert.equal(intent(v).result.correlationId, null); });
  test('provider correlation cannot echo credential sentinel', async () => { const v = authorize(setup()); v.fake.stats.handler = () => Response.json({ credits: '0', usd: '0' }, { headers: { 'X-Correlation-ID': sentinel.split(':')[1] } }); await execute(v); assert.equal(intent(v).result.correlationId, null); });
  for (const body of [{ credits: 'NaN', usd: '0' }, { credits: '-1', usd: '0' }, { credits: 'Infinity', usd: '0' }, { credits: 1, usd: '0' }, { credits: '1', usd: '-1' }, { credits: '1', usd: 'NaN' }, { credits: '1', usd: '0', extra: true }]) test('malformed official decimal response fails safely: ' + JSON.stringify(body), async () => { const v = authorize(setup()); v.fake.stats.handler = () => Response.json(body); await execute(v); assert.equal(intent(v).phase, 'RESULT_UNKNOWN'); assert.equal(job(v).attempt, 1); });
  test('oversized response duplicate keys and malformed UTF-8 fail closed', async () => { for (const body of [' '.repeat(16385), '{"credits":"1","credits":"2","usd":"0"}', new Uint8Array([0xff])]) { const v = authorize(setup()); v.fake.stats.handler = () => new Response(body); await execute(v); assert.equal(intent(v).phase, 'RESULT_UNKNOWN'); } });
  for (const status of [401, 403, 404, 422, 429, 500, 503]) test(`HTTP ${status} normalized terminal without secret detail or retry`, async () => { const v = authorize(setup()); v.fake.stats.handler = () => Response.json({ detail: sentinel }, { status }); await execute(v); assert.equal(intent(v).phase, 'FAILED'); assert.equal(intent(v).failure.httpStatus, status); assert.equal(intent(v).failure.retryable, false); await execute(v); assert.equal(count(v), 1); });
  test('redirect is a definite failure and cannot produce alternate route or retry', async () => { const v = authorize(setup()); v.fake.stats.handler = () => new Response(null, { status: 302, headers: { Location: 'https://provider.invalid/alternate' } }); await execute(v); assert.equal(intent(v).phase, 'FAILED'); assert.equal(intent(v).failure.httpStatus, 302); assert.equal(intent(v).failure.transmitted, true); assert.equal(intent(v).failure.retryable, false); assert.equal(count(v), 1); });
  test('definite failure before submission stays FAILED transmitted false', async () => { const v = authorize(setup()); await execute(v, { transport: { kind: 'LIVE_ESTIMATE', estimate: async () => { throw new HiggsfieldTransportError(null, false); } } }); assert.equal(intent(v).failure.transmitted, false); assert.equal(intent(v).phase, 'FAILED'); assert.equal(job(v).attempt, 1); assert.equal(count(v), 0); });
  test('response lost persists RESULT_UNKNOWN across refresh restart second process', async () => { const v = authorize(setup()); v.fake.stats.handler = () => { throw Error(sentinel); }; await execute(v); assert.equal(intent(v).phase, 'RESULT_UNKNOWN'); assert.equal(intent(v).failure.transmitted, true); await execute(v); assert.equal(count(v), 1); const saved = state(v); assert.deepEqual(open(v.namespace).load(v.projectId), saved); const next = await child(v); assert.equal(next.count, 0); assert.equal(next.phase, 'RESULT_UNKNOWN'); assert.equal(next.attempt, 1); await call(http(v)); assert.equal(count(v), 1); });
  test('timeout remains consumed and late completion cannot replace unknown', async () => { const v = authorize(setup()); let release; v.fake.stats.handler = () => new Promise(resolve => { release = resolve; }); await execute(v, { timeoutMs: 20 }); assert.equal(intent(v).phase, 'RESULT_UNKNOWN'); release(Response.json({ credits: '1', usd: '0.01' })); await new Promise(resolve => setTimeout(resolve, 10)); assert.equal(intent(v).phase, 'RESULT_UNKNOWN'); assert.equal(count(v), 1); });
  for (const changes of [{}, { description: 'A changed original scene.' }, { duration: 3 }]) test('shot mutation blocks authority and marks historical quote stale: ' + JSON.stringify(changes), async () => { const v = authorize(setup()); await execute(v); revise(v, changes); assert.equal(projectEstimateViews(state(v))[0].stale, true); assert.equal(count(v), 1); });
  test('stale unconsumed revision rejected before transport', async () => { const v = authorize(setup()); revise(v); await assert.rejects(() => execute(v)); assert.equal(job(v).attempt, 0); });
  test('all provider input settings and references remain canonically digest-bound', () => { const v = setup(), request = intent(v).request; for (const input of [{ prompt: 'Changed' }, { duration: 3 }, { resolution: '720' }, { aspect_ratio: '16:9' }, { camera_fixed: false }]) assert.throws(() => validateHiggsfieldRequest({ ...request, input: { ...request.input, ...input } })); assert.throws(() => validateHiggsfieldRequest({ ...request, model: 'other' })); assert.throws(() => buildHiggsfieldRequest({ ...state(v).shots[0], sourceReferences: ['forged'] })); assert.deepEqual(buildHiggsfieldRequest(state(v).shots[0]), request); });
  test('unauthorized production HTTP action blocks with structured error and no lookup', async () => { const v = setup(), response = await call(http(v), operation(v)); assert.equal(response.status, 403); assert.equal(response.body.error.code, 'ESTIMATE_EXECUTION_NOT_AUTHORIZED'); assert.equal(v.fake.stats.lookups, 0); assert.equal(count(v), 0); });
  test('duplicate HTTP request / second click invokes fake wire once', async () => { const v = authorize(setup()), target = http(v), input = operation(v), id = key(); const first = await call(target, input, { key: id }); assert.equal(first.status, 200); assert.equal((await call(target, input, { key: id })).status, 409); await call(target, operation(v)); assert.equal(count(v), 1); });
  test('GET refresh and handler restart never execute authorized prepared estimate', async () => { const v = authorize(setup()); for (let n = 0; n < 3; n++) assert.equal((await call(http(v))).status, 200); assert.equal(count(v), 0); assert.equal(job(v).attempt, 0); assert.equal(v.fake.stats.lookups, 0); });
  for (const field of ['authorization', 'estimateIntentId', 'requestDigest', 'credits', 'usd', 'attempt', 'maxAttempts', 'correlationId', 'providerStatus', 'provider', 'model', 'testOnlyEstimate', 'liveEstimate', 'credentials']) test(`HTTP cannot forge ${field}`, async () => { const v = authorize(setup()); assert.equal((await call(http(v), { ...operation(v), [field]: 'forged' })).status, 400); assert.equal(count(v), 0); });
  test('HTTP Origin Host forwarding same-origin marker protections hold for live mutation', async () => { const v = authorize(setup()); for (const headers of [{ Origin: null }, { Origin: 'http://other.invalid' }, { Host: 'localhost:3317' }, { 'X-Forwarded-Proto': 'https' }, { Forwarded: 'for=other' }, { 'X-Forwarded-Host': 'other.invalid' }, { 'X-Forwarded-Port': '9999' }, { 'X-Forwarded-For': '8.8.8.8' }, { 'Sec-Fetch-Site': 'cross-site' }, { 'X-CodexForge-Animation-Studio': null }]) assert.equal((await call(http(v), operation(v), { headers })).status, 403); assert.equal((await call(http(v, ['0.0.0.0']), operation(v))).status, 503); assert.equal(count(v), 0); });
  test('HTTP body schema size duplicate keys UTF-8 and query injection fail before dispatch', async () => { const v = authorize(setup()); for (const raw of ['{', '{"action":"execute-estimate","action":"create"}', ' '.repeat(32769), new Uint8Array([0xff])]) assert.notEqual((await call(http(v), operation(v), { raw })).status, 200); assert.equal((await call(http(v), operation(v), { url: endpoint + '?mock=true' })).status, 400); assert.equal(count(v), 0); });
  test('HTTP stale expected revisions cannot execute', async () => { const v = authorize(setup()); assert.equal((await call(http(v), { ...operation(v), expectedShotRevision: 2 })).status, 409); assert.equal(count(v), 0); });
  test('every real non-estimate primitive remains unreachable even on successful estimate', async () => { const v = authorize(setup()); await execute(v); for (const name of ['submit', 'status', 'cancel', 'createUpload', 'upload', 'download']) await assert.rejects(() => v.fake[name]()); assert.equal(count(v), 1); });
  test('Generate page and browser controls cannot authorize or invoke live transport', () => { const page = fs.readFileSync(path.join(root, 'src/app/animation-studio/projects/[projectId]/generate/page-client.tsx'), 'utf8'); assert.equal(page.includes('RealHiggsfieldEstimateTransport'), false); assert.equal(page.includes('HF_CREDENTIALS'), false); assert.ok(page.includes('result?.estimateExecution?.mode === "TEST_ONLY_MOCK" && <button')); assert.ok(page.includes('RE-ESTIMATE REQUIRED')); const route = fs.readFileSync(path.join(root, 'src/app/api/codexforge/animation-studio/route.ts'), 'utf8'); assert.equal(route.includes('testOnlyEstimate'), false); assert.equal(route.includes('authorizeEstimateIntent'), false); });
  test('all fixtures preserve generation separation and credential-free provenance', () => { for (const v of fixtures) { const s = state(v); assert.deepEqual(s.approvals, []); assert.ok(s.jobs.every(isEstimateJob)); assert.deepEqual(s.shots[0].generationAttempts, []); assert.equal(s.costs.some(c => c.kind === 'ACTUAL'), false); for (const part of sentinel.split(':')) assert.equal(JSON.stringify(s).includes(part), false); } assert.deepEqual(DEFAULT_EXTERNAL_EXECUTION_POLICY, { externalGenerationEnabled: false, paidGenerationEnabled: false, adobeAutomationEnabled: false, blenderRenderEnabled: false }); });
  test('provider network tripwire records zero attempted connections', () => assert.deepEqual(network, []));
  const evidence = path.join(root, '.codexforge/acceptance/studio-phase2b0c-tests-' + randomUUID()); fs.mkdirSync(evidence, { recursive: true });
  const startedAt = new Date().toISOString();
  for (const t of tests) { try { await t.run(); results.push({ name: t.name, status: 'PASS' }); } catch (e) { results.push({ name: t.name, status: 'FAIL', error: e.message }); console.error('FAIL: ' + t.name + ': ' + e.message); process.exitCode = 1; break; } }
  for (const repo of repos) repo.close();
  const summary = { startedAt, finishedAt: new Date().toISOString(), pid: process.pid, command: 'node scripts/test-animation-studio-phase2b0c.mjs', results, testCount: results.length, planned: tests.length, children, namespaces: fixtures.map(v => v.namespace), networkAttempts: network, realCredentialReads: 0, providerRequests: 0, sourceBindings: loader.loaded.map(p => ({ path: p, sha256: createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex') })), status: process.exitCode ? 'FAIL' : 'PASS' };
  fs.writeFileSync(path.join(evidence, 'result.json'), JSON.stringify(summary, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify({ evidence, status: summary.status, tests: results.length, planned: tests.length, networkAttempts: network.length }));
}
